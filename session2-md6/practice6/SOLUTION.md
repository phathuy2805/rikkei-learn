# Báo Cáo Giải Bài Tập 6 (Session 2): Điền Khuyết Cơ Chế Kết Nối Lại Cho Ứng Dụng Giao Hàng

**Học viên:** [FJS-MD6] Professional Backend Development & Optimization  
**Mã bài tập:** `homeworkId: 10224` | `session2-md6/practice6`  
**Mức độ:** Vận dụng cơ bản  

---

## 1. HOÀN THIỆN 5 CHỖ KHUYẾT

1. **Chỗ khuyết (1) - Bật tự động kết nối lại:**
   - `reconnection: true`
2. **Chỗ khuyết (2) - Giới hạn số lần thử & giãn dần thời gian (Exponential Backoff with Jitter):**
   - `reconnectionAttempts: 10`
   - `reconnectionDelay: 1000` (bắt đầu từ 1s)
   - `reconnectionDelayMax: 5000` (tối đa 5s)
   - `randomizationFactor: 0.5` (chống bão kết nối Thundering Herd khi mạng chập chờn)
3. **Chỗ khuyết (3) - Đăng ký lại các room sau khi nối lại:**
   - Khi sự kiện `connect` kích hoạt, nếu trước đó tài xế đang ở các room nào (ví dụ `driver:zone:HN_CAUGIAY`), ứng dụng tự động gửi sự kiện `rejoin_rooms` để khôi phục luồng nhận đơn.
4. **Chỗ khuyết (4) - Bắt sự kiện mất kết nối và thông báo UI cho tài xế:**
   - Bắt các sự kiện: `disconnect`, `reconnect_attempt`, `reconnect_failed` để hiển thị thanh thông báo màu vàng/đỏ: *"Mất kết nối mạng, đang tự động kết nối lại..."*
5. **Chỗ khuyết (5) - Cấu hình heartbeat phía server:**
   - `pingInterval: 10000` (mỗi 10s server gửi ping 1 lần)
   - `pingTimeout: 15000` (sau 15s không nhận được pong thì ngắt kết nối và đánh dấu tài xế offline).
