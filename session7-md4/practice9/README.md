# Bài thực hành: Xây dựng Middleware Chốt chặn (Authentication)

Bài thực hành này minh họa việc xây dựng **Authentication Middleware** trong Express.js để kiểm tra và xác minh danh tính người dùng (*"Bạn là ai?"*) thông qua chuỗi **JSON Web Token (JWT)** gửi kèm trong Header trước khi cho phép truy cập vào các tài nguyên nội bộ được bảo vệ.

---

## 1. Luồng Hoạt động của Middleware (`middlewares/authMiddleware.js`)

```javascript
import jwt from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // 1. Kiểm tra sự tồn tại của header Authorization
    if (!authHeader) {
      return res.status(401).json({
        success: false,
        statusCode: 401,
        message: 'Truy cập bị từ chối. Không tìm thấy token xác thực (Missing Authorization Header)'
      });
    }

    // 2. Bóc tách tiền tố Bearer
    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      return res.status(401).json({
        success: false,
        statusCode: 401,
        message: 'Định dạng token không hợp lệ (Phải có dạng: Bearer <token>)'
      });
    }

    const token = parts[1];

    // 3. Xác minh tính hợp lệ và chữ ký của JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 4. Gán payload đã giải mã vào request object và đi tiếp
    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        statusCode: 401,
        message: 'Token xác thực đã hết hạn. Vui lòng đăng nhập lại!'
      });
    }

    return res.status(401).json({
      success: false,
      statusCode: 401,
      message: 'Token không hợp lệ hoặc đã bị chỉnh sửa (Invalid Signature)'
    });
  }
};
```

---

## 2. Hướng dẫn Cài đặt & Chạy ứng dụng

1. Di chuyển vào thư mục bài tập:
   ```bash
   cd session7-md4/practice9
   ```
2. Cài đặt các gói thư viện phụ thuộc:
   ```bash
   npm install
   ```
3. Tạo file `.env` từ `.env.example`:
   ```bash
   cp .env.example .env
   ```
4. Khởi động server:
   ```bash
   node app.js
   ```
5. Chạy script kiểm thử tự động toàn bộ 4 kịch bản xác thực:
   ```bash
   node test_auth_middleware.js
   ```

---

## 3. Kết quả Kiểm thử Chi tiết 4 Kịch bản

```text
==================================================================
KIỂM THỬ MIDDLEWARE CHỐT CHẶN XÁC THỰC DANH TÍNH (AUTHENTICATION)
==================================================================

--- [KỊCH BẢN 1: KHÔNG GỬI TOKEN] ---
HTTP Status: 401 (Unauthorized)
Response Body: {
  "success": false,
  "statusCode": 401,
  "message": "Truy cập bị từ chối. Không tìm thấy token xác thực (Missing Authorization Header)"
}
------------------------------------------------------------------

--- [KỊCH BẢN 2: SAI ĐỊNH DẠNG HEADER] ---
HTTP Status: 401 (Unauthorized)
Response Body: {
  "success": false,
  "statusCode": 401,
  "message": "Định dạng token không hợp lệ (Phải có dạng: Bearer <token>)"
}
------------------------------------------------------------------

--- [KỊCH BẢN 3: TOKEN GIẢ MẠO / CHỮ KÝ KHÔNG HỢP LỆ] ---
HTTP Status: 401 (Unauthorized)
Response Body: {
  "success": false,
  "statusCode": 401,
  "message": "Token không hợp lệ hoặc đã bị chỉnh sửa (Invalid Signature)"
}
------------------------------------------------------------------

--- [KỊCH BẢN 4: ĐĂNG NHẬP VÀ DÙNG TOKEN HỢP LỆ ĐỂ TRUY CẬP] ---
=> Đã đăng nhập và nhận JWT: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ...
HTTP Status: 200 (OK)
Response Body (Được giải mã và cho phép truy cập): {
  "success": true,
  "message": "Lấy thông tin tài khoản thành công!",
  "user": {
    "userId": "usr_123456",
    "email": "user@example.com",
    "role": "member",
    "fullName": "Nguyễn Văn B",
    "iat": 1787114895,
    "exp": 1787118495
  }
}
```
