# Bài thực hành: Transaction và Many-to-Many: Đặt hàng có trừ tồn kho

Bài thực hành này xây dựng hệ thống đặt hàng sử dụng **Sequelize ORM** với quan hệ nhiều-nhiều (Many-to-Many) giữa `Order` và `Product` thông qua bảng trung gian `order_items`. Toàn bộ thao tác kiểm tra tồn kho, tạo đơn hàng, tạo chi tiết đơn hàng và trừ số lượng tồn kho (`stock`) đều được thực thi trong một **Database Transaction** duy nhất nhằm bảo đảm tính toàn vẹn dữ liệu.

---

## 1. Khai báo Quan hệ Many-to-Many trong Sequelize

```javascript
// Thiết lập quan hệ nhiều - nhiều ở cả hai chiều thông qua bảng trung gian order_items
Order.belongsToMany(Product, { through: OrderItem, foreignKey: 'orderId' });
Product.belongsToMany(Order, { through: OrderItem, foreignKey: 'productId' });

Order.hasMany(OrderItem, { foreignKey: 'orderId' });
OrderItem.belongsTo(Order, { foreignKey: 'orderId' });

Product.hasMany(OrderItem, { foreignKey: 'productId' });
OrderItem.belongsTo(Product, { foreignKey: 'productId' });
```

---

## 2. Hướng dẫn Cài đặt & Chạy ứng dụng

1. Di chuyển vào thư mục bài tập:
   ```bash
   cd session5-md4/practice9
   ```
2. Cài đặt các gói thư viện phụ thuộc:
   ```bash
   npm install
   ```
3. Khởi động server (Sử dụng SQLite in-memory, tự động đồng bộ bảng và nạp 5 sản phẩm mẫu):
   ```bash
   node app.js
   ```
4. Chạy script kiểm thử tự động 2 kịch bản:
   ```bash
   node test_order.js
   ```

---

## 3. Kết quả Kiểm thử Chi tiết 2 Kịch bản

### Kịch bản 1: Đặt hàng Thành công (Đủ tồn kho)

*   **Endpoint**: `POST http://localhost:3000/api/v1/orders`
*   **Request Body**:
    ```json
    {
      "items": [
        { "productId": 1, "qty": 2 },
        { "productId": 5, "qty": 1 }
      ]
    }
    ```
*   **Mã phản hồi HTTP**: `201 Created`
*   **Dữ liệu trả về**:
    ```json
    {
      "success": true,
      "message": "Đặt hàng thành công",
      "data": {
        "orderId": 1,
        "total": 57000000,
        "items": [
          {
            "orderItemId": 1,
            "productId": 1,
            "productName": "Laptop Dell XPS 15",
            "qty": 2,
            "unitPrice": 25000000,
            "subtotal": 50000000
          },
          {
            "orderItemId": 2,
            "productId": 5,
            "productName": "Tai nghe Sony WH-1000XM5",
            "qty": 1,
            "unitPrice": 7000000,
            "subtotal": 7000000
          }
        ]
      }
    }
    ```
*   **Thay đổi dữ liệu trong Database**:
    *   `Product 1 (Laptop Dell XPS 15)`: Tồn kho giảm từ `10` -> `8`.
    *   `Product 5 (Tai nghe Sony WH-1000XM5)`: Tồn kho giảm từ `1` -> `0`.
    *   Số lượng đơn hàng (`orders`): Tăng từ `0` -> `1`.
    *   Số lượng chi tiết đơn (`order_items`): Tăng từ `0` -> `2`.

---

### Kịch bản 2: Đặt hàng Thiếu tồn kho (Kiểm chứng Transaction Rollback)

*   **Endpoint**: `POST http://localhost:3000/api/v1/orders`
*   **Request Body**:
    ```json
    {
      "items": [
        { "productId": 2, "qty": 1 },
        { "productId": 5, "qty": 2 }
      ]
    }
    ```
*   **Mã phản hồi HTTP**: `409 Conflict`
*   **Dữ liệu trả về**:
    ```json
    {
      "success": false,
      "message": "Sản phẩm \"Tai nghe Sony WH-1000XM5\" không đủ số lượng tồn kho (Còn lại: 0, Yêu cầu: 2)",
      "productName": "Tai nghe Sony WH-1000XM5",
      "availableStock": 0,
      "requestedQty": 2
    }
    ```
*   **Chứng minh tính toàn vẹn (Rollback)**:
    *   `Product 2 (Bàn phím cơ Keychron K2)`: Tồn kho **giữ nguyên là 2**, không bị trừ oan.
    *   Bảng `orders`: **Giữ nguyên 1 đơn hàng**, không có dòng mới phát sinh.
    *   Bảng `order_items`: **Giữ nguyên 2 dòng**, không có dòng mồ côi nào được tạo ra.

---

## 4. Bảng Đối chiếu Dữ liệu Trước và Sau các Thao tác

| Bảng dữ liệu | Trạng thái Ban đầu | Sau khi Đặt hàng Thành công (KB 1) | Sau khi Bị lỗi & Rollback (KB 2) |
| :--- | :---: | :---: | :---: |
| **Product 1 (Stock)** | `10` | `8` *(đã trừ 2)* | `8` |
| **Product 2 (Stock)** | `2` | `2` | **`2` (Không bị trừ)** |
| **Product 5 (Stock)** | `1` | `0` *(đã trừ 1)* | **`0` (Hết hàng)** |
| **Tổng số Orders** | `0` | `1` | **`1` (Không tăng thêm)** |
| **Tổng số OrderItems** | `0` | `2` | **`2` (Không tăng thêm)** |
