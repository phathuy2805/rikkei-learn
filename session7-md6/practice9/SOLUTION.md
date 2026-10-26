# Báo Cáo Giải Bài Tập 9 (Session 7): Nền Tảng Quản Trị Truy Cập Cloud Cho ShopFast

**Học viên:** [FJS-MD6] Professional Backend Development & Optimization  
**Mã bài tập:** `homeworkId: 10252` | `session7-md6/practice9`  
**Mức độ:** Sáng tạo  

---

## 1. THIẾT KẾ NỀN TẢNG KIỂM TOÁN TỰ ĐỘNG (CLOUD ACCESS GOVERNANCE HUB)

Nền tảng tự động quét và giám sát tài nguyên Cloud:
1. **Phát hiện Access Key quá 90 ngày (Stale Key Detector):** Bắt buộc xoay vòng.
2. **Cảnh báo Root Account Usage:** Bắn chuông khẩn cấp nếu phát hiện tài khoản Root đăng nhập.
3. **Phát hiện Wildcard Policies:** Tự động gắn cờ đỏ các policy chứa `Action: *`.
