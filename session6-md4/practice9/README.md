# Bài thực hành: Thiết kế quan hệ 1-N và Populate dữ liệu (Mongoose)

Bài thực hành này minh họa việc thiết kế quan hệ tham chiếu 1-N giữa hai Collection **`orders`** và **`products`** trong Mongoose, đồng thời sử dụng phương thức **`.populate('product_id')`** để tự động nạp toàn bộ thông tin chi tiết của sản phẩm vào đối tượng đơn hàng thay vì chỉ hiển thị mã `ObjectId`.

---

## 1. Khai báo Schema Tham chiếu (`Order.js`)

```javascript
import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    required: true
  },
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product', // Tham chiếu trực tiếp tới Model Product
    required: true
  },
  quantity: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
});

const Order = mongoose.model('Order', OrderSchema);

export default Order;
```

---

## 2. Hướng dẫn Cài đặt & Chạy ứng dụng

1. Di chuyển vào thư mục bài tập:
   ```bash
   cd session6-md4/practice9
   ```
2. Cài đặt các gói thư viện:
   ```bash
   npm install
   ```
3. Chạy file kiểm thử (Sử dụng `mongodb-memory-server` chạy in-memory tự động):
   ```bash
   node app.js
   ```

---

## 3. Kết quả Chạy Thực tế trên Console

```text
--- ĐANG TẠO DỮ LIỆU MẪU ---
=> Đã tạo Sản phẩm: iPhone 15 Pro Max
=> Đã tạo Đơn hàng: ORD-2023-001

--- [1] KẾT QUẢ KHI KHÔNG DÙNG POPULATE ---
{
  _id: new ObjectId('6a852cf4ae1789ff52f6a69c'),
  orderNumber: 'ORD-2023-001',
  product_id: new ObjectId('6a852cf4ae1789ff52f6a69a'),
  quantity: 2,
  createdAt: 2026-08-19T04:11:32.288Z,
  updatedAt: 2026-08-19T04:11:32.288Z,
  __v: 0
}

--- [2] KẾT QUẢ SAU KHI DÙNG POPULATE (BÀI 11) ---
{
  _id: new ObjectId('6a852cf4ae1789ff52f6a69c'),
  orderNumber: 'ORD-2023-001',
  product_id: {
    _id: new ObjectId('6a852cf4ae1789ff52f6a69a'),
    name: 'iPhone 15 Pro Max',
    price: 30000,
    category: 'Mobile',
    createdAt: 2026-08-19T04:11:32.174Z,
    updatedAt: 2026-08-19T04:11:32.174Z,
    __v: 0
  },
  quantity: 2,
  createdAt: 2026-08-19T04:11:32.288Z,
  updatedAt: 2026-08-19T04:11:32.288Z,
  __v: 0
}
```
