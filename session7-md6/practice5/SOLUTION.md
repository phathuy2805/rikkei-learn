# Báo Cáo Giải Bài Tập 5 (Session 7): Vá Lỗi Chính Sách IAM Cấp Quyền Quá Rộng

**Học viên:** [FJS-MD6] Professional Backend Development & Optimization  
**Mã bài tập:** `homeworkId: 10248` | `session7-md6/practice5`  
**Mức độ:** Vận dụng cơ bản  

---

## 1. PHÂN TÍCH HAI KHIẾM KHUYẾT CỐT LÕI

### Khiếm khuyết 1: Vi phạm nguyên tắc đặc quyền tối thiểu (Wildcard Over-permission)
- **Nguyên nhân:** Chính sách IAM cũ của ứng dụng upload ảnh sản phẩm chứa:
  ```json
  {
    "Effect": "Allow",
    "Action": "s3:*",
    "Resource": "*"
  }
  ```
  Điều này cấp quyền toàn quyền thao tác trên toàn bộ tài khoản AWS S3. Nếu ứng dụng backend bị lỗ hổng RCE hoặc lộ thông tin xác thực, kẻ tấn công có thể xóa sạch mọi S3 bucket của công ty, bao gồm cả bucket hóa đơn và database backups.
- **Khắc phục:** Giới hạn chính xác hành động: chỉ cho phép `s3:GetObject`, `s3:PutObject` trên đúng bucket ảnh sản phẩm: `arn:aws:s3:::shopfast-product-images/*`.

### Khiếm khuyết 2: Thiếu điều kiện ràng buộc mã hóa và giao thức truyền tải (Insecure Transport)
- **Nguyên nhân:** Chính sách không yêu cầu giao thức an toàn SSL/TLS, kẻ tấn công trên cùng mạng có thể nghe lén nội dung upload.
- **Khắc phục:** Thêm mệnh đề `Condition: { "Bool": { "aws:SecureTransport": "true" } }` để bắt buộc mọi yêu cầu phải qua HTTPS.
