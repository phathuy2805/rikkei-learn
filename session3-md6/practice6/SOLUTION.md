# Báo Cáo Giải Bài Tập 6 (Session 3): Điền Khuyết Bộ Đếm Cửa Sổ Trượt (Sliding Window Log)

**Học viên:** [FJS-MD6] Professional Backend Development & Optimization  
**Mã bài tập:** `homeworkId: 10229` | `session3-md6/practice6`  
**Mức độ:** Vận dụng cơ bản  

---

## 1. HOÀN THIỆN THUẬT TOÁN SLIDING WINDOW BẰNG REDIS SORTED SET

1. **Xóa bỏ các bản ghi cũ quá thời gian cửa sổ:**
   `ZREMRANGEBYSCORE key 0 (now - windowMs)`
2. **Thêm request hiện tại vào Sorted Set với timestamp làm điểm số (score):**
   `ZADD key now now`
3. **Đếm số lượng request còn lại trong cửa sổ trượt:**
   `ZCARD key`
4. **Gia hạn thời gian sống (TTL) của khóa:**
   `EXPIRE key windowSeconds`
5. **Trả về response headers chuẩn IETF:**
   `X-RateLimit-Limit`, `X-RateLimit-Remaining`, `Retry-After`.
