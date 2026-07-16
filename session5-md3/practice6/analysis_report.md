# Báo Cáo Phân Tích: So Sánh Phương Thức PUT vs PATCH

Báo cáo này phân tích sự khác biệt cốt lõi giữa hai phương thức HTTP `PUT` và `PATCH` trong thiết kế RESTful API, tập trung vào tính chất **Idempotency** (tính độc lập/lặp lại), cấu trúc payload, và rủi ro thực tế khi cập nhật dữ liệu.

---

## 1. Định nghĩa & Bản chất Kỹ thuật

| Đặc điểm | HTTP PUT | HTTP PATCH |
| :--- | :--- | :--- |
| **Mục đích** | Thay thế/Ghi đè hoàn toàn một tài nguyên (Replace/Overwrite) | Cập nhật một phần của tài nguyên (Partial Update) |
| **Payload gửi đi** | Chứa đầy đủ tất cả các trường thông tin của tài nguyên | Chỉ chứa các trường cần sửa đổi |
| **Tính Idempotent**| **Có (Idempotent)**. Gửi cùng một yêu cầu PUT nhiều lần luôn mang lại cùng một trạng thái tài nguyên. | **Không bắt buộc (Non-idempotent)**. Kết quả có thể thay đổi tùy thuộc vào cách server xử lý (ví dụ: thao tác cộng dồn, append mảng). |
| **Độ phức tạp Server**| Thấp. Server chỉ cần nhận toàn bộ và lưu đè. | Cao hơn. Server phải merge dữ liệu mới với dữ liệu hiện tại trước khi lưu. |

---

## 2. Bản chất Idempotency (Tính Lặp Lại)

- **Idempotency (Tính khả định)** nghĩa là khi bạn thực hiện một yêu cầu HTTP giống nhau nhiều lần, kết quả cuối cùng trên hệ thống là giống hệt như khi thực hiện một lần duy nhất.
- **PUT là Idempotent**:
  - Nếu bạn gửi yêu cầu `PUT /users/1` với thông tin `{ "id": 1, "name": "Nam", "phone": "0912" }` 1 lần hay 100 lần, trạng thái của user 1 trên server vẫn luôn là `{ "id": 1, "name": "Nam", "phone": "0912" }`.
- **PATCH không bắt buộc Idempotent**:
  - Mặc dù nhiều REST API triển khai PATCH như một hoạt động idempotent (chỉ merge object), nhưng theo tiêu chuẩn HTTP (RFC 5789), PATCH có thể chứa các chỉ thị thay đổi (ví dụ: `JSON Patch` với thao tác `add`, `remove`, `move`).
  - Ví dụ: Yêu cầu PATCH gửi payload `[{"op": "add", "path": "/logs", "value": "login"}]` mỗi lần gọi sẽ thêm một bản ghi log mới. Gọi 5 lần sẽ tạo ra 5 dòng log khác nhau. Trạng thái hệ thống đã thay đổi sau mỗi lần gọi.

---

## 3. Bẫy Nghiệp Vụ: Sự Đánh Đổi & Hậu Quả Của "Thiếu Trường" Trong PUT

### Bẫy Dữ Liệu Thực Tế (Missing Fields Trap)
Nếu bạn sử dụng phương thức `PUT` trên một máy chủ RESTful tiêu chuẩn nhưng **chỉ truyền vào một phần dữ liệu** (ví dụ: chỉ truyền `{ "phone": "0999888777" }` để cập nhật số điện thoại):

- **Hậu quả**: Tất cả các trường còn lại không được truyền lên (như `fullName`, `email`, `address`, `salary`,...) sẽ bị coi là không được cung cấp và sẽ bị **ghi đè bằng giá trị mặc định (thường là `null` hoặc rỗng)** hoặc bị **xóa bỏ** khỏi tài nguyên.
- **Tại sao xảy ra?**: Vì bản chất của `PUT` là thay thế tài nguyên cũ bằng tài nguyên hoàn toàn mới được định nghĩa bởi payload gửi lên.

### Bảng So Sánh Kịch Bản Cập Nhật

Giả sử tài nguyên gốc trên máy chủ:
```json
{
  "id": 1,
  "name": "Nguyễn Văn Trỗi",
  "phone": "0987654321",
  "role": "Senior Developer"
}
```

#### Kịch bản 1: Cập nhật số điện thoại bằng PATCH
- **Payload**: `{ "phone": "0123456789" }`
- **Kết quả trên Server**:
  ```json
  {
    "id": 1,
    "name": "Nguyễn Văn Trỗi",
    "phone": "0123456789", // Đã cập nhật
    "role": "Senior Developer"
  }
  ```

#### Kịch bản 2: Cập nhật số điện thoại bằng PUT (Gửi thiếu trường)
- **Payload**: `{ "phone": "0123456789" }`
- **Kết quả trên Server (RESTful chuẩn)**:
  ```json
  {
    "id": 1,
    "name": null,          // Bị mất dữ liệu!
    "phone": "0123456789", // Đã cập nhật
    "role": null           // Bị mất dữ liệu!
  }
  ```

---

## 4. Quản trị Rủi ro & Khuyến nghị Thiết kế

1. **Khi nào dùng PATCH (Khuyến nghị hàng đầu cho Cập nhật Form)**:
   - Khi giao diện người dùng cho phép chỉnh sửa từng trường đơn lẻ hoặc một nhóm trường nhỏ (ví dụ: Chỉ cập nhật mật khẩu, chỉ sửa số điện thoại).
   - Tiết kiệm băng thông do kích thước payload nhỏ.
   - Tránh rủi ro ghi đè nhầm hoặc làm mất dữ liệu khi có nhiều người cùng chỉnh sửa một tài nguyên đồng thời (Race Condition).

2. **Khi nào dùng PUT**:
   - Khi bạn muốn thay thế hoàn toàn tài nguyên hoặc tạo mới tài nguyên tại một URI xác định trước (ví dụ: Upload tệp đè lên file cũ).
   - Khi bạn chắc chắn Client đang giữ bản chụp trạng thái mới nhất và hoàn chỉnh nhất của tài nguyên.

3. **Lưu ý với json-server**:
   - Mặc dù `json-server` phiên bản mới có cơ chế tự động giữ lại các trường cũ cho PUT nếu thiếu (non-standard behavior để hỗ trợ kiểm thử tiện lợi), nhưng trong môi trường **Backend Production tiêu chuẩn** (như Spring Boot, ASP.NET Core, NestJS,...), lệnh `PUT` sẽ trực tiếp map body vào Entity và lưu đè xuống DB, gây mất mát dữ liệu nghiêm trọng nếu gửi thiếu trường. Giao diện thực hành của chúng ta sẽ mô phỏng hành vi tiêu chuẩn này để cảnh báo lập trình viên.
