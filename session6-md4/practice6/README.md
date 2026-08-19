# Bài thực hành: Thiết lập Schema Validation chặt chẽ (Mongoose)

Bài thực hành này xây dựng Schema `Product` cho hệ thống thương mại điện tử bằng **Mongoose ODM** với các quy tắc validation chặt chẽ và tự động ghi nhận thời gian (`timestamps`).

---

## 1. Yêu cầu Schema

*   **`name`**: Bắt buộc phải có (`required: true`), độ dài tối thiểu 5 ký tự (`minLength: 5`).
*   **`price`**: Bắt buộc phải có (`required: true`), phải là số dương tối thiểu là 0 (`min: 0`).
*   **`category`**: Bắt buộc phải có (`required: true`).
*   **`timestamps`**: Bật tính năng tự động ghi nhận thời gian tạo (`createdAt`) và cập nhật (`updatedAt`).

```javascript
import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Tên sản phẩm là bắt buộc'],
    minLength: [5, 'Tên sản phẩm phải có tối thiểu 5 ký tự']
  },
  price: {
    type: Number,
    required: [true, 'Giá sản phẩm là bắt buộc'],
    min: [0, 'Giá sản phẩm không được là số âm']
  },
  category: {
    type: String,
    required: [true, 'Danh mục là bắt buộc']
  }
}, {
  timestamps: true
});

const Product = mongoose.model('Product', ProductSchema);

export default Product;
```

---

## 2. Hướng dẫn Cài đặt & Chạy ứng dụng

1. Di chuyển vào thư mục bài tập:
   ```bash
   cd session6-md4/practice6
   ```
2. Cài đặt các gói thư viện:
   ```bash
   npm install
   ```
3. Chạy file kiểm thử (Sử dụng `mongodb-memory-server` chạy trực tiếp không cần cài MongoDB ngoài):
   ```bash
   node app.js
   ```

---

## 3. Kết quả Chạy Kiểm thử Console Thực tế

```text
Kết nối MongoDB thành công!

--- TEST 1: LƯU SẢN PHẨM HỢP LỆ ---
=> Lưu THÀNH CÔNG sản phẩm hợp lệ:
ID: 6a8529ff743f86d7d35271af
Tạo lúc: Wed Aug 19 2026 10:58:55 GMT+0700 (Indochina Time)

--- TEST 2: LƯU SẢN PHẨM VI PHẠM VALIDATION ---
=> Đang cố gắng lưu sản phẩm lỗi vào DB...

[!] BẮT ĐƯỢC LỖI VALIDATION:
- Lỗi ở trường 'name': Tên sản phẩm phải có tối thiểu 5 ký tự
- Lỗi ở trường 'price': Giá sản phẩm không được là số âm

Đã đóng kết nối MongoDB.
```
