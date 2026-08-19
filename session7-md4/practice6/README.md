# Bài thực hành: Thiết lập biến môi trường và cấu hình bảo mật

Bài thực hành này minh họa việc tách biệt các khóa bí mật (**Secret Keys**) và các thông số cấu hình nhạy cảm ra khỏi mã nguồn bằng thư viện **`dotenv`**, đồng thời thiết lập file mẫu **`.env.example`** và bảo vệ thông tin với **`.gitignore`**.

---

## 1. Cấu hình File Môi trường (`.env`)

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/be-std

JWT_ACCESS_SECRET=secret123
JWT_REFRESH_SECRET=secret456
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d
```

> [!IMPORTANT]
> File `.env` chứa các thông tin nhạy cảm (như connection string và secret key) nên được thêm vào `.gitignore` để không bao giờ bị lộ lên hệ thống quản lý phiên bản Git.
> Thay vào đó, dự án cung cấp file [`.env.example`](file:///d:/code-project/Rikkeiedu/all-practices/session7-md4/practice6/.env.example) làm mẫu cho các lập trình viên khác khi triển khai.

---

## 2. Hướng dẫn Cài đặt & Chạy ứng dụng

1. Di chuyển vào thư mục bài tập:
   ```bash
   cd session7-md4/practice6
   ```
2. Cài đặt các gói thư viện:
   ```bash
   npm install
   ```
3. Tạo file `.env` từ file mẫu `.env.example` (nếu chưa có):
   ```bash
   cp .env.example .env
   ```
4. Khởi động server (Môi trường dev với `nodemon` hoặc lệnh thường):
   ```bash
   npm run dev
   # hoặc: node src/index.js
   ```

---

## 3. Kết quả Chạy Thực tế trên Console

```text
[nodemon] 3.1.9
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,cjs,json
[nodemon] starting `node src/index.js`
Server is running on http://localhost:3000
```
