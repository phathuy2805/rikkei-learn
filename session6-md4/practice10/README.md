# Bài thực hành: Xử lý dữ liệu khuyết thiếu (Missing Fields trong Mongoose)

Bài thực hành này minh họa việc thực hiện **Database Migration** trong MongoDB / Mongoose để quét toàn bộ các tài liệu (Documents) cũ chưa từng có trường `stock` (dùng toán tử `$exists: false`) và cập nhật giá trị mặc định `stock: 10` (dùng `updateMany` kết hợp `$set`).

---

## 1. Đoạn mã Migration Cập nhật Dữ liệu

```javascript
// Quét và cập nhật tất cả document chưa có trường 'stock'
await Product.updateMany(
  { stock: { $exists: false } },
  { $set: { stock: 10 } }
);
```

---

## 2. Hướng dẫn Cài đặt & Chạy ứng dụng

1. Di chuyển vào thư mục bài tập:
   ```bash
   cd session6-md4/practice10
   ```
2. Cài đặt các gói thư viện:
   ```bash
   npm install
   ```
3. Chạy script xử lý migration dữ liệu (Sử dụng `mongodb-memory-server` chạy in-memory tự động):
   ```bash
   node app.js
   ```

---

## 3. Kết quả Chạy Thực tế trên Console

```text
[1] TRƯỚC KHI CHẠY SCRIPT (Bạn sẽ thấy 2 sản phẩm đầu không có trường "stock"):
[
  {
    _id: new ObjectId('6a852dc48f4a8ddd0bd3de6f'),
    name: 'Laptop Dell Cũ',
    price: 10000,
    category: 'Laptop',
    createdAt: 2026-03-19T08:32:36.377Z,
    updatedAt: 2026-03-19T08:32:36.377Z,
    __v: 0
  },
  {
    _id: new ObjectId('6a852dc48f4a8ddd0bd3de70'),
    name: 'iPhone 12 Pro Cũ',
    price: 15000,
    category: 'Mobile',
    createdAt: 2026-03-19T08:32:36.378Z,
    updatedAt: 2026-03-19T08:32:36.378Z,
    __v: 0
  }
]

[2] SAU KHI CHẠY SCRIPT (Tất cả sản phẩm cũ đã được bổ sung "stock: 10"):
[
  {
    _id: new ObjectId('6a852dc48f4a8ddd0bd3de6f'),
    name: 'Laptop Dell Cũ',
    price: 10000,
    category: 'Laptop',
    createdAt: 2026-03-19T08:32:36.377Z,
    updatedAt: 2026-08-19T04:15:00.144Z,
    __v: 0,
    stock: 10
  },
  {
    _id: new ObjectId('6a852dc48f4a8ddd0bd3de70'),
    name: 'iPhone 12 Pro Cũ',
    price: 15000,
    category: 'Mobile',
    createdAt: 2026-03-19T08:32:36.378Z,
    updatedAt: 2026-08-19T04:15:00.144Z,
    __v: 0,
    stock: 10
  }
]
```
