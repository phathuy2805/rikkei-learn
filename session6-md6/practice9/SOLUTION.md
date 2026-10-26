# Báo Cáo Giải Bài Tập 9 (Session 6): Nền Tảng Triển Khai Tự Động Cho ShopFast (Self-Healing Platform)

**Học viên:** [FJS-MD6] Professional Backend Development & Optimization  
**Mã bài tập:** `homeworkId: 10247` | `session6-md6/practice9`  
**Mức độ:** Sáng tạo  

---

## 1. THIẾT KẾ NỀN TẢNG TỰ PHỤC HỒI (SELF-HEALING DEPLOYMENT)

Hệ thống tích hợp:
1. **Liveness & Readiness Probes:** Kiểm tra sức khỏe container mỗi 5 giây.
2. **Auto-Recovery:** Tự động kill và khởi động lại container nếu không phản hồi trong 3 lần liên tiếp.
3. **Automated Canary Rollback:** Sau khi deploy bản mới, nếu tỷ lệ lỗi HTTP 5xx vượt quá 2% trong 2 phút đầu, hệ thống tự động hoàn tác (Rollback) về phiên bản trước đó và gửi cảnh báo khẩn cấp.
