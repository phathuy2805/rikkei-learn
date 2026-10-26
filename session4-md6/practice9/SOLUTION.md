# Báo Cáo Giải Bài Tập 9 (Session 4): Tầng Tăng Tốc Cho Toàn Bộ ShopFast (Two-Tier Caching)

**Học viên:** [FJS-MD6] Professional Backend Development & Optimization  
**Mã bài tập:** `homeworkId: 10237` | `session4-md6/practice9`  
**Mức độ:** Sáng tạo  

---

## 1. THIẾT KẾ KIẾN TRÚC TWO-TIER CACHE (L1 MEMORY + L2 REDIS)

Hệ thống tăng tốc gồm 2 tầng:
1. **L1 Cache (In-process LRU Memory):** Phản hồi siêu tốc **< 0.1ms**, không tốn I/O network, lưu trữ dữ liệu siêu nóng (Top 1.000 sản phẩm).
2. **L2 Cache (Distributed Redis Cluster):** Phản hồi **1-3ms**, chia sẻ dùng chung giữa tất cả các pods backend.
3. **Cơ chế đồng bộ L1 Invalidations qua Redis Pub/Sub:** Khi bất kỳ node backend nào cập nhật dữ liệu ở L2, nó sẽ publish sự kiện `cache:evict`. Tất cả các pod còn lại lắng nghe và tự động xoá L1 của mình để tránh trả về dữ liệu lệch.
