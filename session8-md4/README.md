# 📚 ĐỒ ÁN BÀI TẬP LỚN: TASK MANAGEMENT WEB APP (BACKEND RESTful API)

Dự án Backend hoàn chỉnh phục vụ hệ thống **Quản lý công việc nhóm**, được xây dựng trên nền tảng **Node.js, Express.js, MySQL** và **Sequelize ORM** theo mô hình kiến trúc phân tầng chuyên nghiệp **Layered MVC (Model - View/Route - Controller + Service Layer)**.

---

## 📁 Tài Liệu Hướng Dẫn & Đặc Tả Kỹ Thuật

Toàn bộ tài liệu chi tiết đã được chuẩn bị đầy đủ trong thư mục `docs/`:

1. 📄 [Tài Liệu Đặc Tả Yêu Cầu SRS](docs/SRS.md): Mô tả đầy đủ các yêu cầu chức năng (F01 -> F06) và phi chức năng.
2. 🗄️ [Thiết Kế Cơ Sở Dữ Liệu & ERD](docs/DATABASE_DESIGN.md): Sơ đồ quan hệ thực thể (ERD), cấu trúc 6 bảng, khóa ngoại và ràng buộc cascade.
3. 🌐 [Đặc Tả API Endpoints](docs/API_SPECIFICATION.md): Danh sách toàn bộ endpoints `/api/v1/...`, HTTP methods, request payload và response mẫu.
4. 🚀 [Lộ Trình & Checklist Tự Code Từng Bước](docs/ROADMAP_GUIDE.md): Bản đồ lộ trình 6 giai đoạn giúp bạn tự tay lập trình từng tính năng từ A đến Z.

---

## 🏛️ Cấu Trúc Thư Mục Chuẩn Phân Tầng

```text
session8-md4/
├── docs/                     # Tài liệu đặc tả SRS, ERD, API Specs, Roadmap
│   ├── SRS.md
│   ├── DATABASE_DESIGN.md
│   ├── API_SPECIFICATION.md
│   └── ROADMAP_GUIDE.md
├── src/
│   ├── config/               # Cấu hình kết nối MySQL qua Sequelize
│   │   └── database.js
│   ├── models/               # Định nghĩa Sequelize Models & Associations
│   │   ├── index.js
│   │   ├── user.model.js
│   │   ├── project.model.js
│   │   ├── projectMember.model.js
│   │   └── task.model.js
│   ├── middlewares/          # Auth JWT, Error Handler, Joi Validator
│   │   ├── auth.middleware.js
│   │   ├── error.middleware.js
│   │   └── validate.middleware.js
│   ├── utils/                # Helper Response JSON, JWT sign/verify
│   │   ├── response.util.js
│   │   └── jwt.util.js
│   ├── services/             # [BẠN TỰ CODE] Tầng xử lý 100% Business Logic
│   │   ├── auth.service.js
│   │   ├── project.service.js
│   │   ├── task.service.js
│   │   └── stat.service.js
│   ├── controllers/          # [BẠN TỰ CODE] Tầng điều phối Request/Response
│   │   ├── auth.controller.js
│   │   ├── project.controller.js
│   │   ├── task.controller.js
│   │   └── stat.controller.js
│   ├── routes/               # [BẠN TỰ CODE] Khai báo các API Endpoints
│   │   ├── index.js
│   │   ├── auth.routes.js
│   │   ├── project.routes.js
│   │   ├── task.routes.js
│   │   └── stat.routes.js
│   └── app.js                # Điểm khởi động Express Server
├── .env.example
├── .gitignore
└── package.json
```

---

## ⚡ Hướng Dẫn Khởi Chạy

### 1. Cài đặt thư viện
```bash
npm install
```

### 2. Cấu hình biến môi trường
Tạo file `.env` từ `.env.example` và cấu hình thông số kết nối MySQL của máy bạn:
```env
PORT=5000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASS=your_mysql_password
DB_NAME=task_management_db
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=7d
```

### 3. Tạo Database trên MySQL
```sql
CREATE DATABASE IF NOT EXISTS task_management_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 4. Chạy Server ở chế độ Development (Nodemon)
```bash
npm run dev
```

Server sẽ khởi chạy tại: `http://localhost:5000` và tự động đồng bộ hóa bảng CSDL vào MySQL.
