# Bài thực hành: Query Builder với Knex.js: migration và truy vấn thống kê

Bài thực hành này sử dụng Knex.js để tạo cấu trúc bảng cơ sở dữ liệu (`users` và `orders`) thông qua Migrations, nạp dữ liệu mẫu (Seeding), và truy vấn thống kê thông tin chi tiêu của người dùng sử dụng chuỗi hàm Query Builder duy nhất.

---

## 1. Hướng dẫn cài đặt và Chạy thử nghiệm

1. Di chuyển vào thư mục bài tập:
   ```bash
   cd session5-md4/practice7
   ```
2. Cài đặt các gói thư viện cần thiết:
   ```bash
   npm install
   ```
3. Chạy các tệp Migrations để tạo bảng:
   ```bash
   npx knex migrate:latest
   ```
4. Thực hiện nạp dữ liệu mẫu vào cơ sở dữ liệu:
   ```bash
   npx knex seed:run
   ```
5. Chạy báo cáo thống kê:
   ```bash
   node report.js
   ```

*Để kiểm tra tính toàn vẹn của migrations và rollback:*
```bash
npx knex migrate:rollback --all
npx knex migrate:latest
```

---

## 2. Câu lệnh SQL được tạo ra từ Knex.js (`.toString()`)

Dưới đây là mã SQL được tự động sinh ra bởi trình dựng truy vấn Knex.js chạy trên SQLite:

```sql
select `users`.`name`, COUNT(orders.id) as order_count, SUM(orders.total) as total_spent from `users` left join `orders` on `users`.`id` = `orders`.`user_id` group by `users`.`id`, `users`.`name` having COUNT(orders.id) >= 2 order by `total_spent` desc limit 3
```

---

## 3. Kết quả truy vấn thống kê (`report.js`)

Bảng thống kê 3 người dùng chi tiêu nhiều nhất (chỉ tính những người dùng có **từ 2 đơn hàng trở lên**):

| Thứ tự | Tên người dùng (name) | Số lượng đơn hàng (order_count) | Tổng tiền chi tiêu (total_spent) |
| :---: | :--- | :---: | :---: |
| **1** | Nguyen Van A | 4 | 1,000,000 |
| **2** | Tran Thi B | 3 | 750,000 |
| **3** | Le Van C | 3 | 300,000 |

*Ghi chú: Thành viên `Hoang Thi E` chi tiêu `500,000` nhưng chỉ có `1` đơn hàng nên đã bị loại trừ chính xác bởi điều kiện lọc `HAVING COUNT(orders.id) >= 2`.*
