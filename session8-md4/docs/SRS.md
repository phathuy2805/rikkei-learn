# TÀI LIỆU ĐẶC TẢ YÊU CẦU PHẦN MỀM (SRS)
## Dự án: Task Management Web App (Quản lý công việc nhóm)

---

## 1. Giới thiệu chung (Introduction)
- **Mục đích:** Đặc tả các yêu cầu chức năng và phi chức năng cho hệ thống "Quản lý công việc nhóm". Hệ thống cung cấp các RESTful API cho phép người dùng tạo dự án, thêm thành viên, giao việc, cập nhật trạng thái công việc và theo dõi tiến độ làm việc của cả nhóm.
- **Phạm vi dự án:** Tập trung vào **Back-end**: xây dựng API server bằng **Node.js/Express.js** theo mô hình **MVC + Service Layer** và lưu trữ dữ liệu trên **MySQL** thông qua ORM (Sequelize). Hệ thống được kiểm thử qua **Postman**.

---

## 2. Mô tả tổng quan (Overall Description)
### Đối tượng người dùng (User Classes):
1. **Thành viên (Member):**
   - Người dùng đã đăng nhập.
   - Được tạo dự án của riêng mình.
   - Xem các dự án được mời tham gia.
   - Cập nhật trạng thái các công việc được giao và theo dõi tiến độ.
2. **Chủ dự án (Project Owner):**
   - Thành viên đã tạo ra dự án.
   - Có toàn quyền trên dự án: sửa/xóa dự án, thêm/gỡ thành viên, tạo công việc và phân công cho thành viên.
3. **Quản trị viên (Admin - Định hướng tương lai):**
   - Quản lý danh sách người dùng toàn hệ thống, khóa hoặc mở khóa tài khoản.

---

## 3. Yêu cầu chức năng (Functional Requirements)

### F01 - Xác thực & Phân quyền (Authentication & Authorization)
- **Đăng ký (Register):** Họ tên, email (duy nhất), mật khẩu (mã hóa bcrypt trước khi lưu).
- **Đăng nhập (Login):** Trả về JWT token chứa thông tin định danh `userId`, `email`.
- **Middleware xác thực (Auth Middleware):** Bảo vệ các API nghiệp vụ bằng cách kiểm tra và giải mã JWT token từ Header `Authorization: Bearer <token>`.
- **Middleware kiểm tra quyền (Permission Middleware):** Chỉ chủ dự án (`Project Owner`) mới được quyền sửa, xóa dự án, thêm/xóa thành viên và phân công công việc.

### F02 - Quản lý Dự án (Project Management)
- **CRUD Dự án:** Thêm, Sửa, Xóa và Xem chi tiết dự án (Tên dự án, mô tả, ngày bắt đầu, ngày kết thúc dự kiến, chủ dự án).
- **Quản lý thành viên:** Chủ dự án thêm hoặc gỡ thành viên khỏi dự án.
  - Quan hệ nhiều - nhiều giữa User và Project thông qua bảng trung gian `project_members`.
- **Phân quyền truy cập:** Người dùng chỉ xem được các dự án mà mình tạo hoặc được mời tham gia.

### F03 - Quản lý Công việc (Task Management)
- **Thông tin công việc:** Tiêu đề, mô tả, trạng thái (`todo` / `doing` / `done`), mức ưu tiên (`low` / `medium` / `high`), hạn hoàn thành (`dueDate`), người được giao (`assigneeId`), dự án (`projectId`).
- **Ràng buộc:** Công việc bắt buộc thuộc về 1 dự án và người được giao phải là thành viên của dự án đó.
- **Thao tác:** Thêm, Sửa, Xóa công việc và API riêng để cập nhật nhanh trạng thái (`PATCH /api/v1/tasks/:id/status`).

### F04 - Tìm kiếm, Lọc & Phân trang (Filter & Pagination)
- **Lọc (Filter):** Lọc theo `status`, `priority`, `assigneeId`.
- **Tìm kiếm (Search):** Tìm kiếm theo `title` (sử dụng toán tử `LIKE / Op.like`).
- **Sắp xếp (Sort):** Sắp xếp theo `createdAt` hoặc `dueDate` (`ASC` / `DESC`).
- **Phân trang (Pagination):** Tham số `?page=1&limit=10`, phản hồi kèm `totalRecords`, `totalPages`, `currentPage`, `limit`.

### F05 - Thống kê & Báo cáo (Statistics)
- **Thống kê theo dự án (`GET /api/v1/projects/:id/stats`):**
  - Tổng số công việc trong dự án.
  - Số lượng công việc theo từng trạng thái (`todo`, `doing`, `done`).
  - Số lượng công việc đã quá hạn (Overdue tasks).
- **Thống kê cá nhân (`GET /api/v1/users/me/stats`):**
  - Tổng số công việc được giao cho user đang đăng nhập.
  - Số công việc đã hoàn thành (`done`) và đang thực hiện (`doing`).

### F06 - Bình luận & Tệp đính kèm (Mở rộng)
- **Bình luận (Comments):** Thành viên trong dự án có thể bình luận trao đổi trên từng công việc.
- **Tệp đính kèm (Attachments):** Upload file tài liệu / hình ảnh đính kèm vào công việc qua Multer.

---

## 4. Yêu cầu phi chức năng (Non-functional Requirements)
1. **Kiến trúc phân tầng (Layered MVC):**
   - `Routes` -> `Middlewares` -> `Controllers` -> `Services` -> `Models` (Sequelize).
   - Controller không chứa câu truy vấn Database trực tiếp.
2. **Chuẩn thiết kế RESTful API:**
   - Tiền tố: `/api/v1/`
   - Dùng danh từ số nhiều: `/api/v1/projects`, `/api/v1/tasks`, `/api/v1/users`.
   - Đúng HTTP Methods: `GET`, `POST`, `PUT`, `PATCH`, `DELETE`.
   - Cấu trúc phản hồi thống nhất:
     ```json
     {
       "success": true,
       "message": "Thông điệp phản hồi",
       "data": {},
       "pagination": {}
     }
     ```
   - Đúng HTTP Status Codes: `200 OK`, `201 Created`, `400 Bad Request`, `401 Unauthorized`, `403 Forbidden`, `404 Not Found`, `500 Internal Server Error`.
3. **Bảo mật & Toàn vẹn:**
   - Mật khẩu mã hóa `bcrypt` với Salt Rounds >= 10.
   - Không trả về trường `password` trong bất kỳ response nào.
   - Cấu hình qua `.env`.
   - Xóa dự án (Cascade Delete) xử lý toàn bộ công việc và thành viên liên quan, không để dữ liệu mồ côi.
4. **Xử lý lỗi tập trung (Centralized Error Handling):**
   - Middleware `errorHandler` bắt mọi lỗi đồng bộ và bất đồng bộ, trả về JSON chuẩn, không làm crash server.
