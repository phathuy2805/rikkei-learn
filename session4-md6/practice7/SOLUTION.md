# Báo Cáo Giải Bài Tập 7 (Session 4): Tầng Bộ Nhớ Đệm Cho Trang Danh Mục Có Bộ Lọc

**Học viên:** [FJS-MD6] Professional Backend Development & Optimization  
**Mã bài tập:** `homeworkId: 10235` | `session4-md6/practice7`  
**Mức độ:** Vận dụng chuyên sâu  

---

## 1. THIẾT KẾ DETERMINISTIC CACHE KEY & INVALIDATION

Trang danh mục có nhiều query parameters: `?brand=Nike&size=42&sort=price_asc&page=1`.
1. **Chuẩn hóa Query (Deterministic Key):** Sắp xếp các tham số theo thứ tự alphabet trước khi băm key để `?brand=Nike&size=42` và `?size=42&brand=Nike` dùng chung 1 khóa cache duy nhất.
2. **Category Tag Invalidation:** Lưu danh sách các cache key thuộc category vào một Redis Set (`category:tags:shoes`). Khi danh mục giày có sản phẩm mới, chỉ cần xóa toàn bộ key trong Set đó.
