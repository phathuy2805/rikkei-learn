# Báo Cáo Giải Bài Tập 8 (Session 5): Chọn Kiến Trúc Xử Lý Cho 500.000 Email Chiến Dịch

**Học viên:** [FJS-MD6] Professional Backend Development & Optimization  
**Mã bài tập:** `homeworkId: 10241` | `session5-md6/practice8`  
**Mức độ:** Phân tích  

---

## 1. SO SÁNH 3 MÔ HÌNH HÀNG ĐỢI XỬ LÝ 500.000 EMAIL

Ràng buộc: Gửi 500.000 email trong 2 giờ. Trần API của AWS SES là 100 email/giây.

| Tiêu chí | Single Queue + 1 Worker | Dedicated Priority Queues | Partitioned Cluster + Rate Limiter [CHỌN] |
| :--- | :--- | :--- | :--- |
| **Tốc độ xử lý** | Quá chậm (~14 giờ mới xong) | 2 – 3 giờ | **Chính xác 1.4 giờ (Đạt target 2h)** |
| **Bảo vệ hạn mức SMTP (100 req/s)** | Không đạt tải | Dễ vượt ngưỡng làm khóa tài khoản SES | **Tích hợp Token Bucket Limiter chuẩn 90 req/s** |
| **Cô lập Email Giao dịch (Transactional)** | Bị kẹt sau hàng trăm nghìn email marketing | Phân tách tốt | **Hàng đợi Transactional riêng có độ ưu tiên cao nhất** |
| **Chi phí máy chủ** | Thấp | Trung bình | **Tối ưu (Auto-scale 5 workers, tự tắt khi xong)** |

### Căn cứ lựa chọn:
Tách 2 Queue: `email:transactional` (độ ưu tiên cao, chạy ngay lập tức) và `email:marketing` (chạy nền với rate limit 90 emails/s để không vi phạm trần 100 emails/s của AWS SES).
