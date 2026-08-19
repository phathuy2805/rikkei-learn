# Kiểm thử API bằng Postman Collection

Báo cáo kiểm thử tự động API bằng **Newman CLI (Postman Collection Runner)** với tỷ lệ **100% PASS** (10/10 assertions thành công).

---

## 1. Kết quả chạy Collection Runner

```text
Practice 6 API Collection

→ GET User 1 Orders - No Params
  GET http://localhost:3000/api/v1/users/1/orders [200 OK, 482B, 43ms]
  √  Status code là 200
  √  Response đúng cấu trúc đã thiết kế

→ GET User 2 Orders - Filter Status Paid
  GET http://localhost:3000/api/v1/users/2/orders?status=paid [200 OK, 378B, 3ms]
  √  Status code là 200
  √  Response đúng cấu trúc đã thiết kế

→ GET User 2 Orders - Limit 2
  GET http://localhost:3000/api/v1/users/2/orders?limit=2 [200 OK, 378B, 3ms]
  √  Status code là 200
  √  Response đúng cấu trúc đã thiết kế

→ GET User 3 Orders - Status Pending and Limit 1
  GET http://localhost:3000/api/v1/users/3/orders?status=pending&limit=1 [200 OK, 332B, 2ms]
  √  Status code là 200
  √  Response đúng cấu trúc đã thiết kế

→ GET User 99 Orders - User Not Found
  GET http://localhost:3000/api/v1/users/99/orders [404 Not Found, 310B, 2ms]
  √  Status code là 404
  √  Response đúng cấu trúc lỗi
```

### Bảng tổng quan thống kê (Statistics Summary)

| Loại kiểm thử | Đã chạy (Executed) | Thất bại (Failed) |
| :--- | :---: | :---: |
| **Số lần lặp (Iterations)** | 1 | 0 |
| **Yêu cầu gửi đi (Requests)** | 5 | 0 |
| **Kịch bản kiểm thử (Test-scripts)** | 5 | 0 |
| **Khẳng định kết quả (Assertions)** | 10 | 0 |

* **Tổng thời gian chạy**: 464ms
* **Tốc độ phản hồi trung bình**: 10ms
* **Kết quả**: **100% PASS**
