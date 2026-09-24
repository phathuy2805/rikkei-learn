# 🚀 LỘ TRÌNH CHI TIẾT TỰ HỌC & TỰ CODE ĐỒ ÁN TASK MANAGEMENT API (MVC)

> **Mục tiêu:** Giúp bạn tự tay xây dựng 100% hệ thống RESTful API Quản lý công việc nhóm hoàn chỉnh từ con số 0 theo chuẩn kiến trúc chuyên nghiệp: **Express.js + Sequelize ORM + MySQL**.

---

## 🏛️ 1. Hiểu Về Luồng Dữ Liệu Chuẩn MVC + Service Layer

Mỗi khi có một Request từ Client (Postman / Frontend) gửi đến, luồng xử lý sẽ đi qua các tầng theo thứ tự sau:

```text
[Client (Postman)] 
        ⬇ (1) Gửi HTTP Request (VD: POST /api/v1/tasks)
[src/routes/task.routes.js] (Định tuyến endpoint & gắn middleware)
        ⬇ (2) Chạy qua Auth Middleware & Validate Middleware (Kiểm tra token, validate body)
[src/controllers/task.controller.js] (Nhận req, trích xuất req.body/params/query, gọi Service)
        ⬇ (3) Gọi taskService.createTask(...)
[src/services/task.service.js] (Nơi chứa 100% BUSINESS LOGIC: check quyền, tính toán, kiểm tra quan hệ)
        ⬇ (4) Gọi Task.create(), ProjectMember.findOne()
[src/models/ (Sequelize Models)] (Giao tiếp với MySQL Database)
        ⬇ (5) MySQL thực thi & trả kết quả về Service
[src/services/task.service.js] (Xử lý dữ liệu trả về hoặc ném Exception nếu có lỗi)
        ⬇ (6) Trả kết quả về Controller
[src/controllers/task.controller.js] (Dùng sendSuccess(res, message, data, 201) trả về Client)
        ⬇ (7) Gửi HTTP JSON Response
[Client (Postman)] Nhận kết quả
```

> **Nguyên tắc vàng:**
> 1. **Controller:** Cực kỳ mỏng (Skinny Controller), KHÔNG viết truy vấn DB hay logic phức tạp ở đây. Chỉ làm nhiệm vụ nhận `req`, gọi `service`, và trả `res`.
> 2. **Service:** Nơi tập trung toàn bộ logic nghiệp vụ (Fat Service).
> 3. **Model:** Chỉ định nghĩa bảng, kiểu dữ liệu và mối quan hệ (Associations).

---

## 🗺️ 2. Lộ Trình 6 Giai Đoạn Chi Tiết (Milestones)

---

### 🔹 GIAI ĐOẠN 1: Khởi Tạo Môi Trường & Cơ Sở Dữ Liệu (Database Setup)
**Mục tiêu:** Kết nối MySQL thành công và tạo các bảng tự động thông qua Sequelize.

1. **Bước 1.1: Tạo Database trên MySQL**
   - Mở MySQL Workbench / XAMPP / Terminal và chạy:
     ```sql
     CREATE DATABASE IF NOT EXISTS task_management_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
     ```
2. **Bước 1.2: Cấu hình biến môi trường (`.env`)**
   - Copy file `.env.example` thành `.env` và điền `DB_NAME`, `DB_USER`, `DB_PASS`, `PORT=5000`, `JWT_SECRET`.
3. **Bước 1.3: Định nghĩa Models (`src/models/`)**
   - `user.model.js`: `id`, `fullName`, `email`, `password`, `avatar`.
   - `project.model.js`: `id`, `name`, `description`, `startDate`, `endDate`, `ownerId`.
   - `projectMember.model.js`: Bảng trung gian `projectId`, `userId`, `joinedAt`.
   - `task.model.js`: `id`, `title`, `description`, `status` (`todo`/`doing`/`done`), `priority` (`low`/`medium`/`high`), `dueDate`, `projectId`, `assigneeId`.
4. **Bước 1.4: Thiết lập Associations trong `src/models/index.js`**
   - `User.hasMany(Project, { foreignKey: 'ownerId', as: 'ownedProjects' })`
   - `Project.belongsTo(User, { foreignKey: 'ownerId', as: 'owner' })`
   - `Project.belongsToMany(User, { through: ProjectMember, foreignKey: 'projectId', as: 'members' })`
   - `User.belongsToMany(Project, { through: ProjectMember, foreignKey: 'userId', as: 'joinedProjects' })`
   - `Project.hasMany(Task, { foreignKey: 'projectId', as: 'tasks', onDelete: 'CASCADE' })`
   - `Task.belongsTo(Project, { foreignKey: 'projectId', as: 'project' })`
   - `User.hasMany(Task, { foreignKey: 'assigneeId', as: 'assignedTasks' })`
   - `Task.belongsTo(User, { foreignKey: 'assigneeId', as: 'assignee' })`
5. **Bước 1.5: Khởi động Server & Đồng bộ DB**
   - Viết hàm `sequelize.sync({ alter: true })` trong file khởi động để kiểm tra bảng được tạo đầy đủ trên MySQL.

---

### 🔹 GIAI ĐOẠN 2: Module Xác Thực & Phân Quyền (Authentication & JWT)
**Mục tiêu:** Đăng ký, Đăng nhập, Băm mật khẩu, Ký JWT và bảo vệ API bằng Middleware.

1. **Bước 2.1: Utility & Validation**
   - `src/validations/auth.validation.js`: Dùng `Joi` validate form đăng ký (họ tên required, email format, password min 6 ký tự).
   - `src/utils/jwt.util.js`: Viết 2 hàm `generateToken(payload)` và `verifyToken(token)`.
2. **Bước 2.2: Viết `src/services/auth.service.js`**
   - **`register(data)`**:
     - Kiểm tra email: `await User.findOne({ where: { email } })`. Nếu tồn tại -> ném lỗi `Email đã được đăng ký`.
     - Mã hóa mật khẩu: `const hashedPassword = await bcrypt.hash(password, 10)`.
     - Lưu user: `await User.create({ fullName, email, password: hashedPassword })`.
     - Trả về thông tin user (loại bỏ trường `password`).
   - **`login(email, password)`**:
     - Tìm user theo email. Nếu không thấy -> ném lỗi `Email hoặc mật khẩu không chính xác`.
     - So khớp mật khẩu: `await bcrypt.compare(password, user.password)`. Nếu sai -> ném lỗi.
     - Tạo JWT token: `generateToken({ id: user.id, email: user.email })`.
     - Trả về `{ token, user }`.
3. **Bước 2.3: Viết `src/controllers/auth.controller.js`**
   - Gọi `authService.register` / `authService.login`.
   - Bọc trong `try...catch` chuyển lỗi sang `next(error)` hoặc dùng `sendSuccess(res, ...)`.
4. **Bước 2.4: Viết `src/middlewares/auth.middleware.js`**
   - Lấy chuỗi token từ header: `req.headers.authorization?.split(' ')[1]`.
   - Nếu không có token -> trả về `401 Unauthorized`.
   - Dùng `verifyToken(token)` giải mã. Lấy `user` từ database và gán vào `req.user = user`.
5. **🧪 Test Postman:** Test `POST /api/v1/auth/register` và `POST /api/v1/auth/login`.

---

### 🔹 GIAI ĐOẠN 3: Module Quản Lý Dự Án (Project Management)
**Mục tiêu:** CRUD Dự án, thêm/gỡ thành viên, chỉ cho phép Chủ dự án (Owner) chỉnh sửa/xóa.

1. **Bước 3.1: Viết `src/services/project.service.js`**
   - **`createProject(userId, projectData)`**:
     - Tạo project với `ownerId: userId`.
     - Tự động thêm owner vào bảng `ProjectMember` để owner cũng là member.
   - **`getAllUserProjects(userId)`**:
     - Lấy danh sách các dự án mà user là Owner HOẶC là Member (dùng `Project.findAll({ include: [...] })`).
   - **`getProjectById(projectId, userId)`**:
     - Lấy chi tiết dự án kèm thông tin Owner (`as: 'owner'`), danh sách Members (`as: 'members'`), và Tasks.
     - Kiểm tra nếu user không thuộc dự án -> ném lỗi `403 Không có quyền truy cập`.
   - **`updateProject(projectId, userId, updateData)`**:
     - Kiểm tra `project.ownerId === userId`. Nếu không phải -> ném lỗi `403`.
     - Tiến hành cập nhật `project.update(updateData)`.
   - **`deleteProject(projectId, userId)`**:
     - Kiểm tra quyền Owner -> Thực hiện xóa `project.destroy()`. Các task liên quan sẽ tự cascade xóa.
   - **`addMember(projectId, ownerId, targetUserId)`**:
     - Kiểm tra quyền Owner của `ownerId`.
     - Kiểm tra `targetUserId` có tồn tại trong hệ thống không.
     - Thêm bản ghi vào `ProjectMember`.
   - **`removeMember(projectId, ownerId, targetUserId)`**:
     - Kiểm tra quyền Owner.
     - Xóa bản ghi trong `ProjectMember`.
2. **Bước 3.2: Viết `project.controller.js` & `project.routes.js`**
   - Đặt `authMiddleware` bảo vệ toàn bộ router dự án.
3. **🧪 Test Postman:** Tạo 2 user khác nhau để test quyền: User A tạo dự án -> User B không sửa được -> User A thêm User B vào dự án -> User B xem được dự án.

---

### 🔹 GIAI ĐOẠN 4: Module Quản Lý Công Việc (Task Management)
**Mục tiêu:** CRUD Task, gán việc cho thành viên, cập nhật nhanh trạng thái (`PATCH`).

1. **Bước 4.1: Viết `src/services/task.service.js`**
   - **`createTask(userId, taskData)`**:
     - Kiểm tra xem `taskData.projectId` có tồn tại không.
     - Kiểm tra xem người tạo (`userId`) có thuộc dự án không.
     - Nếu có `assigneeId`: Kiểm tra xem người được giao có phải là thành viên của dự án không!
     - Tạo task: `await Task.create(taskData)`.
   - **`updateTask(taskId, userId, updateData)`**:
     - Kiểm tra task tồn tại.
     - Kiểm tra quyền (chủ dự án hoặc người được giao mới được sửa).
     - Thực hiện cập nhật.
   - **`updateTaskStatus(taskId, userId, status)`**:
     - Chỉ cập nhật riêng trường `status` (`todo` -> `doing` -> `done`).
   - **`deleteTask(taskId, userId)`**:
     - Kiểm tra quyền chủ dự án trước khi xóa.
2. **Bước 4.2: Viết `task.controller.js` & `task.routes.js`**
3. **🧪 Test Postman:** Tạo task, thử gán task cho một user lạ (không thuộc project) xem service có chặn đúng không, test update status.

---

### 🔹 GIAI ĐOẠN 5: Tìm Kiếm, Lọc & Phân Trang (Filter, Search & Pagination)
**Mục tiêu:** Xây dựng API `GET /api/v1/tasks` mạnh mẽ với các query params: `?page=1&limit=10&status=doing&priority=high&search=keyword&sortBy=dueDate&order=ASC`.

1. **Bước 5.1: Xử lý Query Params trong `task.service.js`**
   - Dùng `Op` từ `sequelize`: `import { Op } from 'sequelize';`
   - Xây dựng object `where`:
     ```javascript
     const where = {};
     if (projectId) where.projectId = projectId;
     if (status) where.status = status;
     if (priority) where.priority = priority;
     if (assigneeId) where.assigneeId = assigneeId;
     if (search) {
       where.title = { [Op.like]: `%${search}%` };
     }
     ```
   - Xử lý phân trang:
     ```javascript
     const pageNum = parseInt(page, 10) || 1;
     const limitNum = parseInt(limit, 10) || 10;
     const offset = (pageNum - 1) * limitNum;
     ```
   - Truy vấn bằng `Task.findAndCountAll`:
     ```javascript
     const { count, rows } = await Task.findAndCountAll({
       where,
       limit: limitNum,
       offset,
       order: [[sortBy || 'createdAt', order || 'DESC']],
       include: [
         { model: User, as: 'assignee', attributes: ['id', 'fullName', 'email', 'avatar'] },
         { model: Project, as: 'project', attributes: ['id', 'name'] }
       ]
     });
     ```
   - Trả về dữ liệu kèm pagination metadata: `totalPages = Math.ceil(count / limitNum)`.
2. **🧪 Test Postman:** Thêm 15 tasks mẫu và test phân trang `?page=1&limit=5`, `?page=2&limit=5`, search theo tiêu đề.

---

### 🔹 GIAI ĐOẠN 6: Thống Kê & Báo Cáo (Statistics & Analytics)
**Mục tiêu:** Thống kê tiến độ dự án và năng suất cá nhân.

1. **Bước 6.1: Viết `src/services/stat.service.js`**
   - **`getProjectStats(projectId, userId)`**:
     - Kiểm tra quyền truy cập dự án.
     - Tổng task: `await Task.count({ where: { projectId } })`.
     - Đếm theo từng trạng thái (`todo`, `doing`, `done`):
       ```javascript
       const todoCount = await Task.count({ where: { projectId, status: 'todo' } });
       const doingCount = await Task.count({ where: { projectId, status: 'doing' } });
       const doneCount = await Task.count({ where: { projectId, status: 'done' } });
       ```
     - Đếm task quá hạn (Overdue): `dueDate < hôm nay` VÀ `status != 'done'`:
       ```javascript
       const overdueCount = await Task.count({
         where: {
           projectId,
           status: { [Op.ne]: 'done' },
           dueDate: { [Op.lt]: new Date() }
         }
       });
       ```
   - **`getUserStats(userId)`**:
     - Đếm số task được giao cho user: `assigneeId = userId`.
     - Đếm số task đã hoàn thành (`done`) và đang làm (`doing`).
2. **Bước 6.2: Viết `stat.controller.js` & `stat.routes.js`**
3. **🧪 Test Postman:** Kiểm tra các con số thống kê trả về có khớp chính xác với database không.

---

## 🛠️ 3. Bảng Tổng Hợp Files Cần Tự Viết

| Thư mục | Tên File | Chức năng chính |
| :--- | :--- | :--- |
| `src/config/` | `database.js` | Kết nối Sequelize với MySQL |
| `src/utils/` | `response.util.js` | Chuẩn hóa format response JSON |
| `src/utils/` | `jwt.util.js` | Hàm `sign` và `verify` token |
| `src/middlewares/` | `auth.middleware.js` | Kiểm tra JWT token từ Header |
| `src/middlewares/` | `error.middleware.js` | Bắt lỗi tập trung (Error Handler) |
| `src/middlewares/` | `validate.middleware.js` | Bọc schema Joi để validate request |
| `src/models/` | `user.model.js`, `project.model.js`, `projectMember.model.js`, `task.model.js`, `index.js` | Định nghĩa bảng & quan hệ |
| `src/services/` | `auth.service.js`, `project.service.js`, `task.service.js`, `stat.service.js` | Chứa 100% Business Logic |
| `src/controllers/`| `auth.controller.js`, `project.controller.js`, `task.controller.js`, `stat.controller.js` | Điều phối Request & Response |
| `src/routes/` | `auth.routes.js`, `project.routes.js`, `task.routes.js`, `stat.routes.js`, `index.js` | Khai báo API Endpoints |
| `src/` | `app.js` | Khởi chạy Express Server |

---

## 💡 Mẹo & Lưu Ý Quan Trọng Khi Tự Code
1. **Luôn dùng `try...catch` trong Controller** và gọi `next(error)` để chuyển lỗi xuống `error.middleware.js` xử lý.
2. **Không bao giờ lưu mật khẩu dạng plain text**: Luôn `await bcrypt.hash(password, 10)`.
3. **Không trả về `password`** khi response thông tin user ra ngoài.
4. **Kiểm tra kỹ quan hệ Foreign Key**: Khi xóa Project, các Task và ProjectMember phải tự động xóa nhờ `{ onDelete: 'CASCADE' }`.
