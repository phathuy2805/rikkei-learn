# HATEOAS - Richardson Maturity Model Level 3

Báo cáo kết quả kiểm thử API `GET /api/v2/orders/:id` tích hợp HATEOAS (`_links`) động theo trạng thái đơn hàng.

---

## 1. Kết quả kiểm thử Đơn hàng 17 (Trạng thái: `pending`)
* **Hành vi mong đợi**: Có đầy đủ link `self`, `customer` và link `cancel` để cho phép hủy đơn.
* **Response Body**:
```json
{
  "success": true,
  "data": {
    "id": 17,
    "userId": 3,
    "status": "pending",
    "total": 1000
  },
  "_links": {
    "self": {
      "href": "/api/v2/orders/17",
      "method": "GET"
    },
    "customer": {
      "href": "/api/v2/users/3",
      "method": "GET"
    },
    "cancel": {
      "href": "/api/v2/orders/17/cancellation",
      "method": "POST"
    }
  }
}
```

---

## 2. Kết quả kiểm thử Đơn hàng 18 (Trạng thái: `cancelled`)
* **Hành vi mong đợi**: Chỉ có link `self` và `customer`. Đường dẫn `cancel` bị ẩn đi do đơn hàng đã bị hủy.
* **Response Body**:
```json
{
  "success": true,
  "data": {
    "id": 18,
    "userId": 3,
    "status": "cancelled",
    "total": 500
  },
  "_links": {
    "self": {
      "href": "/api/v2/orders/18",
      "method": "GET"
    },
    "customer": {
      "href": "/api/v2/users/3",
      "method": "GET"
    }
  }
}
```

---

## 3. Giải thích: Khối `_links` (HATEOAS) giúp API đạt Level 3 như thế nào so với Level 2?

* **Richardson Level 2 (HTTP Verbs & Status Codes)**: 
  Ở cấp độ này, API đã biết sử dụng các URI định danh tài nguyên (Resources) kết hợp với các phương thức HTTP thích hợp (`GET`, `POST`, `PUT`, `DELETE`) cùng các mã trạng thái phản hồi chuẩn (`200`, `201`, `400`, `404`). Tuy nhiên, client vẫn phải tự mò mẫm hoặc đọc tài liệu viết tay để biết được các đường dẫn tiếp theo cần gọi (ví dụ: làm sao để hủy đơn, xem thông tin khách hàng ở đâu).
  
* **Richardson Level 3 (HATEOAS - Hypermedia As The Engine Of Application State)**: 
  Khi tích hợp khối `_links`, API đã đạt đến Level 3. Phản hồi trả về từ server không chỉ chứa dữ liệu thuần túy mà còn tự động cung cấp danh sách các hành động hợp lệ tiếp theo mà client có thể thực hiện tại thời điểm đó dưới dạng các siêu liên kết (hyperlinks). Client không cần phải hardcode các đường dẫn URL khác nữa, mà chỉ cần đọc trường `_links` và thực thi. Điều này giúp giảm thiểu sự phụ thuộc chặt chẽ (decoupling) giữa Client và Server, đồng thời cho phép Server thay đổi cấu trúc URL nội bộ mà không làm hỏng ứng dụng của Client.
