# Báo Cáo Giải Bài Tập 6 (Session 4): Điền Khuyết Cơ Chế Chống Dồn Dập Khi Khóa Hết Hạn (Cache Stampede)

**Học viên:** [FJS-MD6] Professional Backend Development & Optimization  
**Mã bài tập:** `homeworkId: 10234` | `session4-md6/practice6`  
**Mức độ:** Vận dụng cơ bản  

---

## 1. HOÀN THIỆN CƠ CHẾ MUTEX DISTRIBUTED LOCK

Khi một khóa cache của trang chủ hết hạn vào đúng thời điểm có 10.000 users đang truy cập:
1. **Thiếu Mutex Lock:** Cả 10.000 requests đồng loạt thấy Cache Miss và cùng lúc query xuống MySQL -> Sập Database trong tích tắc (Cache Stampede / Dog-piling effect).
2. **Giải pháp với Mutex Lock (`SETNX`):**
   - Chỉ duy nhất request đầu tiên lấy được khóa Mutex (`SET lock:home:feed "1" NX EX 5`).
   - Request này đại diện truy vấn Database và nạp dữ liệu mới vào Cache.
   - 9.999 requests còn lại không lấy được lock sẽ tạm dừng chờ (sleep 50ms) rồi đọc lại Cache vừa được nạp.
