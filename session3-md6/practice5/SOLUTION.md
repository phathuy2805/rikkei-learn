# Báo Cáo Giải Bài Tập 5 (Session 3): Vá Lỗi Hàng Rào Giới Hạn Bị Bot Vượt Qua Dễ Dàng

**Học viên:** [FJS-MD6] Professional Backend Development & Optimization  
**Mã bài tập:** `homeworkId: 10228` | `session3-md6/practice5`  
**Mức độ:** Vận dụng cơ bản  

---

## 1. PHÂN TÍCH HAI KHIẾM KHUYẾT CỐT LÕI

### Khiếm khuyết 1: Giả mạo IP qua Header `x-forwarded-for` (IP Spoofing Vulnerability)
- **Nguyên nhân:** Guard cũ tin tưởng tuyệt đối header `req.headers['x-forwarded-for']` do client gửi lên. Kẻ tấn công hoặc bot chỉ cần đổi giá trị header này trong mỗi request (`X-Forwarded-For: 1.1.1.1`, `X-Forwarded-For: 1.1.1.2`) là dễ dàng vượt qua bộ đếm giới hạn.
- **Khắc phục:** Chỉ tin cậy IP từ Socket Remote Address hoặc cấu hình `trust proxy` chính xác của Nginx/Cloudflare, kết hợp định danh người dùng theo `apiKey` hoặc JWT Token thay vì chỉ dùng IP.

### Khiếm khuyết 2: Đếm cục bộ trên bộ nhớ đơn máy (In-Memory Map Isolation)
- **Nguyên nhân:** Lưu trữ bộ đếm trong `Map<string, number>` của tiến trình Node.js. Khi chạy nhiều container (Cluster / Kubernetes), mỗi pod có 1 bộ nhớ riêng khiến bot gửi request phân tán qua Load Balancer sẽ có hạn mức gấp N lần số pod.
- **Khắc phục:** Sử dụng kho lưu trữ tập trung (Redis) với khóa nguyên tử (`INCR` + `EXPIRE`) để đồng bộ hạn mức trên toàn cụm.
