# Báo Cáo Giải Bài Tập 9 (Session 5): Trung Tâm Điều Hành Tác Vụ Nền Của ShopFast

**Học viên:** [FJS-MD6] Professional Backend Development & Optimization  
**Mã bài tập:** `homeworkId: 10242` | `session5-md6/practice9`  
**Mức độ:** Sáng tạo  

---

## 1. THIẾT KẾ TRUNG TÂM GIÁM SÁT TÁC VỤ NỀN (JOB MONITOR HUB)

Trung tâm giám sát tích hợp các tính năng:
1. **Metrics Dashboard:** Thống kê thời gian thực 4 trạng thái: Waiting, Active, Completed, Failed.
2. **Dead Letter Queue (DLQ) Inspector:** Tự động gom các job thất bại quá 5 lần vào kho lưu trữ lỗi kèm Stacktrace.
3. **Smart Alerting:** Gửi cảnh báo Slack/Telegram khi tỷ lệ lỗi vượt quá 5% tổng số tác vụ.
