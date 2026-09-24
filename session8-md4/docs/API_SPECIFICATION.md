# TÀI LIỆU ĐẶC TẢ API (RESTful API SPECIFICATION)
## Base URL: `http://localhost:5000/api/v1`

---

## 1. Cấu trúc Response chuẩn

### Success Response Format:
```json
{
  "success": true,
  "message": "Thao tác thành công",
  "data": {},
  "pagination": {
    "totalRecords": 100,
    "totalPages": 10,
    "currentPage": 1,
    "limit": 10
  }
}
```

### Error Response Format:
```json
{
  "success": false,
  "message": "Thông điệp lỗi chi tiết",
  "errors": []
}
```

---

## 2. Danh sách API Endpoints

### 2.1. Xác thực (Authentication)
| Method | Endpoint | Quyền | Mô tả |
| :--- | :--- | :--- | :--- |
| `POST` | `/auth/register` | Public | Đăng ký tài khoản mới |
| `POST` | `/auth/login` | Public | Đăng nhập nhận JWT Token |
| `GET` | `/auth/me` | Logged In | Lấy thông tin user hiện tại |

#### Chi tiết Request/Response:
- **POST `/auth/register`**
  - **Body:**
    ```json
    {
      "fullName": "Nguyễn Văn A",
      "email": "nguyenvana@gmail.com",
      "password": "Password123@"
    }
    ```
  - **Response (201 Created):**
    ```json
    {
      "success": true,
      "message": "Đăng ký tài khoản thành công",
      "data": {
        "id": 1,
        "fullName": "Nguyễn Văn A",
        "email": "nguyenvana@gmail.com"
      }
    }
    ```

- **POST `/auth/login`**
  - **Body:**
    ```json
    {
      "email": "nguyenvana@gmail.com",
      "password": "Password123@"
    }
    ```
  - **Response (200 OK):**
    ```json
    {
      "success": true,
      "message": "Đăng nhập thành công",
      "data": {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI...",
        "user": {
          "id": 1,
          "fullName": "Nguyễn Văn A",
          "email": "nguyenvana@gmail.com"
        }
      }
    }
    ```

---

### 2.2. Quản lý Dự án (Project Management)
*Yêu cầu Header:* `Authorization: Bearer <token>`

| Method | Endpoint | Quyền | Mô tả |
| :--- | :--- | :--- | :--- |
| `GET` | `/projects` | Logged In | Lấy danh sách dự án user tham gia / sở hữu |
| `POST` | `/projects` | Logged In | Tạo mới một dự án (User trở thành Owner) |
| `GET` | `/projects/:id` | Member/Owner | Xem chi tiết dự án & danh sách thành viên |
| `PUT` | `/projects/:id` | Owner | Cập nhật thông tin dự án |
| `DELETE` | `/projects/:id` | Owner | Xóa dự án (Cascade xóa toàn bộ task) |
| `POST` | `/projects/:id/members` | Owner | Thêm thành viên vào dự án |
| `DELETE` | `/projects/:id/members/:userId` | Owner | Xóa thành viên khỏi dự án |

#### Ví dụ Body:
- **POST `/projects`**:
  ```json
  {
    "name": "Hệ thống Quản lý Bán hàng E-Commerce",
    "description": "Xây dựng backend NodeJS & ExpressJS",
    "startDate": "2026-09-01",
    "endDate": "2026-12-31"
  }
  ```
- **POST `/projects/:id/members`**:
  ```json
  {
    "userId": 2
  }
  ```

---

### 2.3. Quản lý Công việc (Task Management)
*Yêu cầu Header:* `Authorization: Bearer <token>`

| Method | Endpoint | Quyền | Mô tả |
| :--- | :--- | :--- | :--- |
| `GET` | `/tasks` | Logged In | Lọc, tìm kiếm, phân trang danh sách task |
| `POST` | `/tasks` | Owner/Member | Tạo công việc mới thuộc dự án |
| `GET` | `/tasks/:id` | Project Member | Xem chi tiết công việc |
| `PUT` | `/tasks/:id` | Owner/Assignee | Sửa thông tin công việc |
| `PATCH` | `/tasks/:id/status` | Assignee/Owner | Cập nhật nhanh trạng thái (`todo` / `doing` / `done`) |
| `DELETE` | `/tasks/:id` | Project Owner | Xóa công việc |

#### Tham số Query cho `GET /tasks`:
- `?projectId=1`: Lọc theo dự án
- `?status=doing`: Lọc theo trạng thái (`todo`, `doing`, `done`)
- `?priority=high`: Lọc theo độ ưu tiên (`low`, `medium`, `high`)
- `?assigneeId=2`: Lọc theo người được giao
- `?search=database`: Tìm kiếm theo từ khóa trong tiêu đề
- `?sortBy=createdAt&order=DESC`: Sắp xếp theo ngày tạo hoặc `dueDate`
- `?page=1&limit=10`: Phân trang

- **PATCH `/tasks/:id/status` Body**:
  ```json
  {
    "status": "done"
  }
  ```

---

### 2.4. Thống kê & Báo cáo (Statistics)
*Yêu cầu Header:* `Authorization: Bearer <token>`

| Method | Endpoint | Mô tả |
| :--- | :--- | :--- |
| `GET` | `/projects/:id/stats` | Thống kê số task theo trạng thái & task quá hạn của dự án |
| `GET` | `/users/me/stats` | Thống kê công việc cá nhân của user đang đăng nhập |

#### Ví dụ Response `GET /projects/:id/stats`:
```json
{
  "success": true,
  "message": "Lấy thống kê dự án thành công",
  "data": {
    "projectId": 1,
    "totalTasks": 25,
    "byStatus": {
      "todo": 10,
      "doing": 8,
      "done": 7
    },
    "overdueTasks": 3
  }
}
```
