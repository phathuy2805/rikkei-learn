# Bài thực hành: Phát hiện và khắc phục N+1 query có đo lường

Bài thực hành này minh họa việc nhận diện lỗi **N+1 query** bằng số liệu cụ thể (`queryCount`, `durationMs`) và khắc phục bằng kỹ thuật **Eager Loading** trong Sequelize, đồng thời giải thích bản chất bộ nhớ của câu lệnh JOIN và trường hợp sử dụng `separate: true`.

---

## 1. Hướng dẫn Cài đặt & Chạy ứng dụng

1. Di chuyển vào thư mục bài tập:
   ```bash
   cd session5-md4/practice10
   ```
2. Cài đặt các gói thư viện phụ thuộc:
   ```bash
   npm install
   ```
3. Khởi động server (Tự động nạp 50 Category và 500 Product):
   ```bash
   node app.js
   ```
4. Chạy script đo lường và so sánh hiệu năng:
   ```bash
   node test_benchmark.js
   ```

---

## 2. Bảng So sánh Hiệu năng giữa 2 Endpoint

| Tiêu chí | Endpoint Chậm (`/api/v1/report/slow`) | Endpoint Nhanh (`/api/v1/report/fast`) | Đánh giá & Nhận xét |
| :--- | :---: | :---: | :--- |
| **Kỹ thuật áp dụng** | Lazy Loading trong vòng lặp (N+1) | Eager Loading (`include`) | `include` kết hợp JOIN dữ liệu ở tầng CSDL |
| **Số câu SQL (`queryCount`)** | **`51` queries** *(1 Category + 50 Products)* | **`1` query duy nhất** | Giảm thiểu **98%** số lượng truy vấn gửi tới CSDL |
| **Thời gian thực thi (`durationMs`)** | **`86 ms`** | **`40 ms`** | Tốc độ phản hồi nhanh hơn gấp **2 lần** |
| **Độ đồng nhất dữ liệu** | Hoàn toàn giống nhau 100% | Hoàn toàn giống nhau 100% | Đảm bảo đúng định dạng `data` và `meta` |

---

## 3. Phân tích Kỹ thuật: Bộ nhớ của Eager Loading và `separate: true`

### 3.1. Vì sao Endpoint nhanh (`/fast`) vẫn có thể tốn nhiều bộ nhớ hơn?

Khi sử dụng `Category.findAll({ include: [Product] })`, Sequelize sẽ thực thi một câu lệnh `LEFT OUTER JOIN`:
```sql
SELECT `Category`.*, `Products`.* FROM `categories` AS `Category`
LEFT OUTER JOIN `products` AS `Products` ON `Category`.`id` = `Products`.`categoryId`;
```

*   **Tích Descartes (Cartesian Product / Data Duplication)**: CSDL sẽ trả về một bảng kết quả phẳng (flat result set) gồm 500 dòng. Trong 500 dòng này, thông tin của 50 danh mục (như `id`, `name`, `description`,...) sẽ bị **lặp lại 10 lần** cho mỗi sản phẩm tương ứng.
*   **Chi phí xử lý tại Node.js (Object Mapping)**: Toàn bộ 500 dòng dữ liệu chứa các bản ghi lặp lại này phải truyền qua mạng và nạp toàn bộ vào RAM của ứng dụng Node.js. Sau đó, Sequelize phải duyệt qua mảng kết quả phẳng này trong bộ nhớ để bóc tách, khử trùng lặp và nhóm lại thành cấu trúc JSON dạng cây lồng nhau (`Category.Products = [...]`). 
*   Nếu bảng cha (`Category`) chứa nhiều trường dữ liệu lớn (Text, JSON, Base64), dung lượng RAM cần để lưu mảng kết quả phẳng từ câu lệnh JOIN có thể tăng đột biến gấp nhiều lần so với dung lượng dữ liệu thực tế.

---

### 3.2. Khi nào nên dùng `separate: true`?

`separate: true` là tùy chọn trong `include` của Sequelize cho phép tách truy vấn liên kết thành các câu lệnh `SELECT` độc lập thay vì sử dụng `LEFT OUTER JOIN`.

```javascript
Category.findAll({
  include: [
    {
      model: Product,
      separate: true, // Chạy truy vấn riêng với WHERE categoryId IN (...)
      limit: 5,       // Giới hạn 5 sản phẩm trên mỗi danh mục
      order: [['price', 'DESC']]
    }
  ]
});
```

**Các trường hợp bắt buộc hoặc nên dùng `separate: true`:**
1. **Tránh bùng nổ dữ liệu khi có nhiều quan hệ 1-N hoặc N-N lồng nhau**:
   Khi một Category có 100 Products và 50 Tags, câu lệnh JOIN sẽ sinh ra `100 x 50 = 5,000` dòng kết quả phẳng cho mỗi Category. Dùng `separate: true` sẽ chỉ cần 3 câu truy vấn độc lập và trả về đúng tổng số lượng phần tử thực tế (`1 + 100 + 50`), tiết kiệm đáng kể RAM.
2. **Cần phân trang (`limit`, `offset`) hoặc sắp xếp riêng trên bảng con**:
   Trong câu lệnh `JOIN` thông thường, mệnh đề `LIMIT 5` ở bảng con sẽ làm sai lệch kết quả (nó sẽ giới hạn toàn bộ kết quả trả về của cả bảng cha). Khi bật `separate: true`, Sequelize sẽ thực thi truy vấn con độc lập, cho phép áp dụng chính xác `limit: 5` sản phẩm cho **từng** danh mục riêng biệt.
