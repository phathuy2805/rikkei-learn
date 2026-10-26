# Báo Cáo Giải Bài Tập 7 (Session 7): Thiết Lập Quản Trị Truy Cập Cho Đội ShopFast Mở Rộng

**Học viên:** [FJS-MD6] Professional Backend Development & Optimization  
**Mã bài tập:** `homeworkId: 10250` | `session7-md6/practice7`  
**Mức độ:** Vận dụng chuyên sâu  

---

## 1. THIẾT KẾ PHÂN QUYỀN ĐA TẦNG (RBAC & PERMISSION BOUNDARIES)

| Nhóm người dùng (Group) | Quyền hạn cho phép | Permission Boundary (Ngăn leo thang đặc quyền) |
| :--- | :--- | :--- |
| **Developers** | CloudWatch Logs, S3 Dev Bucket | Tuyệt đối cấm thao tác trên Production DB & IAM changes |
| **DevOps / SRE** | Quản trị EKS Cluster, Docker ECR | Giới hạn chỉ được assume các role có tiền tố `ShopFast-*` |
| **Security Auditor** | Read-only toàn bộ AWS Config & CloudTrail | Không có bất kỳ quyền ghi (Write) nào |
