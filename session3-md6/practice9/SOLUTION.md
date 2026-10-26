# Báo Cáo Giải Bài Tập 9 (Session 3): Lá Chắn Chống Lạm Dụng Cho Ngày Hội Mua Sắm

**Học viên:** [FJS-MD6] Professional Backend Development & Optimization  
**Mã bài tập:** `homeworkId: 10232` | `session3-md6/practice9`  
**Mức độ:** Sáng tạo  

---

## 1. THIẾT KẾ LÁ CHẮN THÍCH ỨNG (ADAPTIVE DDOS SHIELD)

Vào các dịp Flash Sale / Siêu sale 11.11, lưu lượng tăng gấp 20 lần. Lá chắn ShopFast hoạt động theo 3 chế độ thích ứng:
1. **NORMAL MODE (CPU < 60%):** Hạn mức tiêu chuẩn theo gói dịch vụ.
2. **HIGH LOAD MODE (60% <= CPU <= 85%):** Tự động siết 50% hạn mức của các tài khoản FREE, ưu tiên giữ ổn định cho luồng checkout thanh toán.
3. **CRITICAL SHIELD MODE (CPU > 85% hoặc phát hiện Bot Attack):** Bật Proof-of-Work (PoW) captcha, chuyển toàn bộ user chưa đăng nhập vào phòng chờ ảo (Virtual Waiting Room).
