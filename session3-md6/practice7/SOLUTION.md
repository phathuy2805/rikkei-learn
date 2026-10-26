# Báo Cáo Giải Bài Tập 7 (Session 3): Hệ Thống Hạn Mức Phân Tầng Theo Gói Dịch Vụ

**Học viên:** [FJS-MD6] Professional Backend Development & Optimization  
**Mã bài tập:** `homeworkId: 10230` | `session3-md6/practice7`  
**Mức độ:** Vận dụng chuyên sâu  

---

## 1. THIẾT KẾ HẠN MỨC PHÂN TẦNG (TIERED RATE LIMITS)

| Gói Dịch Vụ (Tier) | Hạn mức (Requests / Phút) | Burst tối đa | Xử lý khi vượt hạn mức |
| :--- | :--- | :--- | :--- |
| **FREE** | 60 req/phút | 10 | Trả về HTTP 429 ngay lập tức kèm `Retry-After` |
| **PRO** | 600 req/phút | 50 | Trả về HTTP 429 kèm link nâng cấp gói |
| **ENTERPRISE** | 6.000 req/phút | 500 | Dedicated IP whitelist, soft-throttle trước khi ngắt |
