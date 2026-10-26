# Báo Cáo Giải Bài Tập 9 (Session 2): Trung Tâm Điều Phối Giao Hàng Thời Gian Thực

**Học viên:** [FJS-MD6] Professional Backend Development & Optimization  
**Mã bài tập:** `homeworkId: 10227` | `session2-md6/practice9`  
**Mức độ:** Sáng tạo  

---

## 1. THIẾT KẾ HỆ THỐNG TRUNG TÂM ĐIỀU PHỐI (DISPATCH HUB)

Hệ thống điều phối tài xế thời gian thực dựa trên Geofencing và WebSocket:
1. **Theo dõi vị trí (Driver Geotracking):** Tài xế gửi tọa độ mỗi 3-5 giây.
2. **Ghép đơn thông minh (Auto Matching):** Khi có đơn hàng mới, server xác định bán kính 3km và bắn tín hiệu cho tối đa 5 tài xế gần nhất.
3. **Cơ chế chống nhận trùng (Atomic Lock):** Tài xế đầu tiên bấm "Nhận đơn" sẽ giành quyền xử lý, server lập tức rút đơn khỏi màn hình của các tài xế còn lại.
