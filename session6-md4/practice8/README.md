# Bài thực hành: Lưu trữ cấu trúc lồng nhau (Embedded Document trong Mongoose)

Bài thực hành này minh họa thiết kế Schema **Store (Cửa hàng)** chứa một tài liệu nhúng (**Embedded Document**) là `location` (gồm `street`, `district`, `city`) theo triết lý NoSQL nhằm gom nhóm dữ liệu liên quan vào cùng một document, giảm thiểu tối đa các phép JOIN tốn kém.

---

## 1. Khai báo Schema Cửa hàng (`Store.js`)

```javascript
import mongoose from 'mongoose';

const StoreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  location: {
    street: { type: String, required: true },
    district: { type: String, required: true },
    city: { type: String, required: true }
  }
}, {
  timestamps: true
});

const Store = mongoose.model('Store', StoreSchema);

export default Store;
```

---

## 2. Hướng dẫn Cài đặt & Chạy ứng dụng

1. Di chuyển vào thư mục bài tập:
   ```bash
   cd session6-md4/practice8
   ```
2. Cài đặt các gói thư viện:
   ```bash
   npm install
   ```
3. Chạy file tạo mới cửa hàng (Sử dụng `mongodb-memory-server` chạy in-memory tự động):
   ```bash
   node app.js
   ```

---

## 3. Kết quả Chạy Thực tế trên Console

```text
--- ĐANG TẠO MỚI CỬA HÀNG ---

=> Tạo thành công! Cấu trúc JSON trả về thể hiện rõ quan hệ cha-con:
{
  name: 'Cửa hàng Tiện lợi 24/7',
  location: {
    street: '123 Đường Nguyễn Huệ',
    district: 'Quận 1',
    city: 'Hồ Chí Minh'
  },
  _id: new ObjectId('6a852c2f11e91cecd5dd9914'),
  createdAt: 2026-08-19T04:08:15.536Z,
  updatedAt: 2026-08-19T04:08:15.536Z,
  __v: 0
}

Đã đóng kết nối MongoDB.
```
