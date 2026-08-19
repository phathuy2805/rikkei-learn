# Bài thực hành: Truy vấn với Logic Operators phức tạp (Mongoose)

Bài thực hành này minh họa việc sử dụng kết hợp các toán tử logic (`$or`, `$in`) và toán tử so sánh (`$lt`) trong Mongoose ODM để lọc ra các tài liệu (Documents) thỏa mãn đồng thời nhiều tiêu chí phức tạp.

---

## 1. Yêu cầu Truy vấn & Toán tử sử dụng

*   **Điều kiện 1**: Thuộc danh mục `"Laptop"` HOẶC `"Mobile"` (Sử dụng toán tử logic `$or` hoặc `$in`).
*   **Điều kiện 2**: Có giá bán nhỏ hơn `20.000` (Sử dụng toán tử so sánh `$lt`).

### Đoạn mã truy vấn Mongoose:
```javascript
const products = await Product.find({
  $or: [
    { category: 'Laptop' },
    { category: 'Mobile' }
  ],
  price: { $lt: 20000 }
});
```
*(Hoặc có thể viết ngắn gọn bằng `$in`: `Product.find({ category: { $in: ['Laptop', 'Mobile'] }, price: { $lt: 20000 } })`).*

---

## 2. Hướng dẫn Cài đặt & Chạy ứng dụng

1. Di chuyển vào thư mục bài tập:
   ```bash
   cd session6-md4/practice7
   ```
2. Cài đặt các gói thư viện:
   ```bash
   npm install
   ```
3. Chạy file truy vấn (Sử dụng `mongodb-memory-server` chạy in-memory tự động):
   ```bash
   node app.js
   ```

---

## 3. Kết quả Chạy Thực tế trên Console

```text
=> Danh sách Sản phẩm (Laptop / Mobile) có giá < 20.000:
[
  {
    _id: new ObjectId('6a852adaf85b61ed6b551f84'),
    name: 'Dell XPS 13',
    price: 15000,
    category: 'Laptop',
    __v: 0,
    createdAt: 2026-08-19T04:02:34.494Z,
    updatedAt: 2026-08-19T04:02:34.494Z
  },
  {
    _id: new ObjectId('6a852adaf85b61ed6b551f85'),
    name: 'iPhone 14 Pro',
    price: 18000,
    category: 'Mobile',
    __v: 0,
    createdAt: 2026-08-19T04:02:34.496Z,
    updatedAt: 2026-08-19T04:02:34.496Z
  }
]
```
