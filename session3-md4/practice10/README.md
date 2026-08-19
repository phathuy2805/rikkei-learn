# Hệ thống Blog phân quyền nhiều vai trò

Hệ thống cung cấp các API quản lý bài viết (Post) và bình luận (Comment) với phân quyền người dùng và cơ chế xóa dây chuyền (cascade delete) các bình luận liên quan khi bài viết bị xóa.

---

## 1. Danh sách Endpoints & Middlewares áp dụng

| Thực thể | Phương thức | Endpoint | Mô tả | Middlewares áp dụng |
| :--- | :--- | :--- | :--- | :--- |
| **Post** | `GET` | `/api/posts` | Lấy danh sách toàn bộ bài viết | *Không có* |
| **Post** | `POST` | `/api/posts` | Tạo bài viết mới (kèm file ảnh thumbnail) | *Không có* (gọi Multer nội bộ để bắt lỗi validate) |
| **Post** | `GET` | `/api/posts/:id` | Lấy chi tiết bài viết kèm danh sách bình luận liên quan | *Không có* |
| **Post** | `DELETE` | `/api/posts/:id` | Xóa bài viết (đồng thời tự động xóa toàn bộ bình luận của bài đó) | `authenticate` -> `authorize('admin')` |
| **Comment**| `GET` | `/api/comments` | Lấy tất cả bình luận hiện có (phục vụ việc kiểm tra) | *Không có* |
| **Comment**| `POST` | `/api/comments` | Tạo bình luận mới cho một bài viết | `authenticate` |

---

## 2. Kịch bản kiểm thử (Test Scenarios)

### Kịch bản 1: Thêm bình luận khi chưa đăng nhập
* **Mô tả hành vi**: Gửi request tạo bình luận không kèm header `Authorization`.
* **Method & Endpoint**: `POST /api/comments`
* **Headers**: *Không có*
* **Body**: `{ "postId": 1, "content": "Bình luận thử nghiệm" }`
* **Mã lỗi mong đợi**: `401 Unauthorized`
* **Kết quả trả về**: `{"success":false,"message":"Chưa đăng nhập"}`

### Kịch bản 2: Thêm bình luận thành công (Đã đăng nhập)
* **Mô tả hành vi**: Gửi request tạo bình luận kèm theo quyền của thành viên thường (`user`).
* **Method & Endpoint**: `POST /api/comments`
* **Headers**: `Authorization: user`
* **Body**: `{ "postId": 1, "content": "Bài viết rất hay!" }`
* **Mã trạng thái mong đợi**: `201 Created`

### Kịch bản 3: Thêm bình luận cho bài viết không tồn tại
* **Mô tả hành vi**: Gửi bình luận liên kết tới `postId` không nằm trong danh sách bài viết.
* **Method & Endpoint**: `POST /api/comments`
* **Headers**: `Authorization: user`
* **Body**: `{ "postId": 999, "content": "Bình luận lỗi" }`
* **Mã lỗi mong đợi**: `404 Not Found`
* **Kết quả trả về**: `{"success":false,"message":"Không tìm thấy bài viết để bình luận"}`

### Kịch bản 4: Xóa bài viết bằng tài khoản không đủ quyền (Member thường)
* **Mô tả hành vi**: Gửi request xóa bài viết nhưng cung cấp header `Authorization: user`.
* **Method & Endpoint**: `DELETE /api/posts/1`
* **Headers**: `Authorization: user`
* **Mã lỗi mong đợi**: `403 Forbidden`
* **Kết quả trả về**: `{"success":false,"message":"Không đủ quyền truy cập"}`

### Kịch bản 5: Xóa bài viết thành công bằng quyền Admin (Cascade Delete)
* **Mô tả hành vi**: Gửi request xóa bài viết với header `Authorization: admin`.
* **Method & Endpoint**: `DELETE /api/posts/1`
* **Headers**: `Authorization: admin`
* **Mã trạng thái mong đợi**: `200 OK`
* **Tính toàn vẹn**: Sau khi xóa, danh sách bình luận liên kết với `postId = 1` sẽ tự động biến mất khỏi bộ nhớ.
