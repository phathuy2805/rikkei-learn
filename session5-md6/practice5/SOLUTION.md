# Báo Cáo Giải Bài Tập 5 (Session 5): Vá Lỗi Khách Hàng Nhận 5 Email Xác Nhận Cho Một Đơn

**Học viên:** [FJS-MD6] Professional Backend Development & Optimization  
**Mã bài tập:** `homeworkId: 10238` | `session5-md6/practice5`  
**Mức độ:** Vận dụng cơ bản  

---

## 1. PHÂN TÍCH HAI KHIẾM KHUYẾT CỐT LÕI

### Khiếm khuyết 1: Thiếu Tính Bất Biến (Idempotency Key / Custom JobId)
- **Nguyên nhân:** Khi controller đẩy job vào hàng đợi BullMQ: `await emailQueue.add("send_order_email", data)`, BullMQ tự động sinh ngẫu nhiên một số tự tăng làm Job ID. Khi user bấm nút đặt hàng nhiều lần hoặc frontend retry do mạng lag, 5 job độc lập được tạo ra và worker gửi đi 5 email.
- **Khắc phục:** Sử dụng `jobId` mang tính định danh nghiệp vụ duy nhất: `jobId: "send_order_confirmation:" + orderId`. BullMQ sẽ tự động từ chối các job trùng lặp có cùng ID trong cùng thời điểm.

### Khiếm khuyết 2: Cơ chế Retry mù quáng khi gặp lỗi tạm thời (Blind Retry without Exponential Backoff)
- **Nguyên nhân:** Worker bắn lỗi SMTP nhưng không kiểm tra trạng thái email đã gửi thực sự chưa, kết hợp cấu hình retry 5 lần ngay lập tức khiến khách hàng nhận liên tiếp nhiều email.
- **Khắc phục:** Lưu trạng thái idempotency vào Redis (`SET email:sent:1024 "1" EX 86400 NX`) trước khi thực hiện gửi email thật, đồng thời áp dụng Exponential Backoff.
