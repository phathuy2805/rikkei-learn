# Bài thực hành: API Đăng nhập và Khởi tạo JWT (Access Token & Refresh Token)

Bài thực hành này triển khai phương pháp xác thực hiện đại dựa trên **Token-based Authentication (JWT)**. Hệ thống tạo ra một cặp token với vòng đời khác nhau:
*   **Access Token**: Tuổi thọ ngắn (**15 phút**), mang thông tin cơ bản của người dùng (`userId`, `email`, `role`) dùng để truy cập các tài nguyên cần quyền hạn.
*   **Refresh Token**: Tuổi thọ dài (**7 ngày**), mang thông tin định danh `userId` dùng để cấp lại Access Token mới khi hết hạn mà không cần người dùng nhập lại mật khẩu.

---

## 1. Khai báo Hàm Tạo JWT (`utils/jwt.js`)

```javascript
import jwt from 'jsonwebtoken';

// Access Token: 15 phút, Payload chỉ chứa thông tin an toàn (tuyệt đối không chứa mật khẩu)
export const generateAccessToken = (user) => {
  return jwt.sign(
    { userId: user.id, email: user.email, role: user.role },
    process.env.JWT_ACCESS_SECRET,
    { expiresIn: process.env.JWT_ACCESS_EXPIRES_IN || '15m' }
  );
};

// Refresh Token: 7 ngày
export const generateRefreshToken = (user) => {
  return jwt.sign(
    { userId: user.id },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d' }
  );
};
```

---

## 2. Hướng dẫn Cài đặt & Chạy ứng dụng

1. Di chuyển vào thư mục bài tập:
   ```bash
   cd session7-md4/practice8
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
5. Chạy script kiểm thử tự động toàn bộ kịch bản đăng nhập & giải mã token:
   ```bash
   node test_login_jwt.js
   ```

---

## 3. Kết quả Kiểm thử Chi tiết 3 Kịch bản

### Kịch bản 1: Đăng nhập Thành công & Cấu trúc Token

*   **Endpoint**: `POST http://localhost:3000/api/auth/login`
*   **Payload**: `{ "email": "user@example.com", "password": "Password123@" }`
*   **Mã phản hồi HTTP**: `200 OK`
*   **Dữ liệu trả về**:
    ```json
    {
      "success": true,
      "message": "Đăng nhập thành công!",
      "data": {
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ1c3JfOThhNzJiMWMiLCJlbWFpbCI6InVzZXJAZXhhbXBsZS5jb20iLCJyb2xlIjoidXNlciIsImlhdCI6MTc4NzExNDIzNCwiZXhwIjoxNzg3MTE1MTM0fQ.lqbj0WO8knEBvJeXMMizPuYsHgGM2m5IROGoOf6aRU0",
        "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ1c3JfOThhNzJiMWMiLCJpYXQiOjE3ODcxMTQyMzQsImV4cCI6MTc4NzcxOTAzNH0.uvI9HrFblZCX1M6tfXXpk6HjaVic82eRniTvR4qOY7A",
        "user": {
          "id": "usr_98a72b1c",
          "email": "user@example.com",
          "role": "user",
          "name": "Nguyễn Văn A"
        }
      }
    }
    ```

*   **Phân tích Payload Access Token**:
    ```json
    {
      "userId": "usr_98a72b1c",
      "email": "user@example.com",
      "role": "user",
      "iat": 1787114234,
      "exp": 1787115134
    }
    ```
    *Thời hạn sống: 900 giây (15 phút).*

*   **Phân tích Payload Refresh Token**:
    ```json
    {
      "userId": "usr_98a72b1c",
      "iat": 1787114234,
      "exp": 1787719034
    }
    ```
    *Thời hạn sống: 604800 giây (7 ngày).*

---

### Kịch bản 2: Đăng nhập Sai Mật khẩu

*   **Payload**: `{ "email": "user@example.com", "password": "WrongPassword999@" }`
*   **Mã phản hồi HTTP**: `401 Unauthorized`
*   **Dữ liệu trả về**:
    ```json
    {
      "success": false,
      "message": "Email hoặc mật khẩu không chính xác"
    }
    ```

---

### Kịch bản 3: Thiếu Trường Dữ liệu

*   **Payload**: `{ "email": "user@example.com" }`
*   **Mã phản hồi HTTP**: `400 Bad Request`
*   **Dữ liệu trả về**:
    ```json
    {
      "success": false,
      "message": "Vui lòng cung cấp đầy đủ email và mật khẩu"
    }
    ```
