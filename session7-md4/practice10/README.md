# Bài thực hành: Vòng đời Token & API Refresh Token

Bài thực hành này xây dựng hệ thống quản lý **Vòng đời Token (Token Lifecycle)** nhằm duy trì trạng thái đăng nhập liên tục của người dùng mà không bắt họ phải đăng nhập lại nhiều lần, tăng cường trải nghiệm người dùng (UX) và bảo đảm tính bảo mật cao (nhờ thu hồi token và Access Token tuổi thọ ngắn).

---

## 1. Kiến trúc Vòng đời Token (Token Lifecycle)

```
+-------------------------------------------------------------------------------+
|  1. Đăng nhập: POST /api/auth/login                                           |
|     --> Trả về Access Token (15 phút) & Refresh Token (7 ngày)               |
+---------------------------------------+---------------------------------------+
                                        |
                   (Khi Access Token hết hạn sau 15m)
                                        |
+---------------------------------------v---------------------------------------+
|  2. Làm mới Token: POST /api/auth/refresh-token                               |
|     --> Gửi Refresh Token                                                     |
|     --> Server kiểm tra chữ ký & sự tồn tại trong DB (chưa bị thu hồi)        |
|     --> Cấp phát Access Token hoàn toàn mới                                   |
+---------------------------------------+---------------------------------------+
                                        |
                               (Khi người dùng Đăng xuất)
                                        |
+---------------------------------------v---------------------------------------+
|  3. Đăng xuất: POST /api/auth/logout                                          |
|     --> Server xóa / thu hồi Refresh Token khỏi DB                           |
|     --> Mọi yêu cầu Refresh Token bằng token cũ đều bị từ chối (403 Forbidden)|
+-------------------------------------------------------------------------------+
```

---

## 2. Hướng dẫn Cài đặt & Chạy ứng dụng

1. Di chuyển vào thư mục bài tập:
   ```bash
   cd session7-md4/practice10
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
5. Chạy script kiểm thử tự động toàn bộ vòng đời Token:
   ```bash
   node test_refresh_token.js
   ```

---

## 3. Kết quả Kiểm thử Chi tiết Thực tế (Khớp 100% Ảnh Postman Đề bài)

### Bước 1: Đăng nhập (`POST /api/auth/login`)

*   **Request Body**:
    ```json
    {
      "username": "hung",
      "password": "hung123"
    }
    ```
*   **Response Body**:
    ```json
    {
      "status": 200,
      "message": "LOGIN_SUCCESSFUL",
      "data": {
        "accessToken": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
        "refreshToken": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
      }
    }
    ```

---

### Bước 2: Cấp lại Access Token (`POST /api/auth/refresh-token`)

*   **Request Body**:
    ```json
    {
      "refreshToken": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
    ```
*   **Response Body**:
    ```json
    {
      "status": 200,
      "message": "SUCCESS",
      "data": {
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
      }
    }
    ```

---

### Bước 3 & 4: Đăng xuất & Kiểm tra Từ chối Token đã Thu hồi

*   **Đăng xuất**: `POST /api/auth/logout` -> `200 LOGOUT_SUCCESSFUL` (Xóa token khỏi DB).
*   **Tái sử dụng Token đã hủy**: `POST /api/auth/refresh-token` -> `403 Forbidden` (`REFRESH_TOKEN_REVOKED_OR_NOT_FOUND`).
