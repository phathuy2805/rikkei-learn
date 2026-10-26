# Báo Cáo Giải Bài Tập 6 (Session 6): Điền Khuyết Pipeline CI/CD Bị Thiếu Bước Bảo Vệ

**Học viên:** [FJS-MD6] Professional Backend Development & Optimization  
**Mã bài tập:** `homeworkId: 10244` | `session6-md6/practice6`  
**Mức độ:** Vận dụng cơ bản  

---

## 1. HOÀN THIỆN 5 BƯỚC BẢO VỆ TRONG GITHUB ACTIONS PIPELINE

1. **Bước 1 - Linter & Type-Check:** Chặn code lỗi cú pháp hoặc sai TypeScript Types ngay từ đầu.
2. **Bước 2 - Unit & Integration Test:** Bắt buộc 100% test cases pass, ngưỡng code coverage >= 80%.
3. **Bước 3 - Quét lỗ hổng bảo mật (Security Vulnerability Scan):** Chạy `npm audit --audit-level=high` và Trivy scan lỗ hổng của image.
4. **Bước 4 - Gắn nhãn Docker Tag chuẩn (Immutable Tagging):** Gắn nhãn bằng Git Commit SHA (`ghcr.io/shopfast/backend:${{ github.sha }}`), tuyệt đối cấm dùng tag cố định `latest` cho production.
5. **Bước 5 - Cơ chế Rollback tự động:** Tự động kích hoạt rollback phiên bản cũ nếu deploy container gặp crash loop.
