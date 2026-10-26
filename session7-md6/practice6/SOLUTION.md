# Báo Cáo Giải Bài Tập 6 (Session 7): Điền Khuyết Role Cho Pipeline CI/CD (OIDC Authentication)

**Học viên:** [FJS-MD6] Professional Backend Development & Optimization  
**Mã bài tập:** `homeworkId: 10249` | `session7-md6/practice6`  
**Mức độ:** Vận dụng cơ bản  

---

## 1. HOÀN THIỆN CƠ CHẾ XÁC THỰC OIDC KHÔNG DÙNG LONG-TERM KEYS

1. **Vấn đề của Long-term Access Keys:** Lưu `AWS_ACCESS_KEY_ID` và `AWS_SECRET_ACCESS_KEY` trong GitHub Secrets tiềm ẩn nguy cơ rò rỉ khi repository bị lộ hoặc action độc hại in log.
2. **Giải pháp GitHub OIDC với AWS IAM Role:**
   - Cấu hình Identity Provider `token.actions.githubusercontent.com`.
   - Mệnh đề Trust Relationship bắt buộc kiểm tra claim `sub` (Subject):
     `"token.actions.githubusercontent.com:sub": "repo:phathuy2805/rikkei-learn:ref:refs/heads/master"`
   - Chỉ cho phép nhánh `master` của chính repository đó assume role lấy token ngắn hạn (15 phút), không cần lưu bất kỳ secret key nào!
