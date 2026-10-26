# Báo Cáo Giải Bài Tập 8 (Session 6): Chọn Chiến Lược Triển Khai Cho Giờ Cao Điểm

**Học viên:** [FJS-MD6] Professional Backend Development & Optimization  
**Mã bài tập:** `homeworkId: 10246` | `session6-md6/practice8`  
**Mức độ:** Phân tích  

---

## 1. SO SÁNH 4 CHIẾN LƯỢC DEPLOY: RECREATE VS ROLLING UPDATE VS BLUE/GREEN VS CANARY

| Tiêu chí | Recreate (Dừng cũ bật mới) | Rolling Update (Lăn dần) | Blue/Green Deployment [CHỌN] | Canary Deployment |
| :--- | :--- | :--- | :--- | :--- |
| **Thời gian Downtime** | 1 – 3 phút (Mất khách) | 0s | **0s (Chuyển router tức thì)** | 0s |
| **Xung đột phiên bản (Dual Version)** | Không | **Có** (50% user thấy bản mới, 50% thấy cũ) | **Không (Chuyển đồng loạt 100% qua môi trường Green)** | Có (Chia % traffic) |
| **Tốc độ Rollback khi có lỗi** | Chậm (Phải deploy lại) | Chậm (Phải rolling ngược lại) | **Tức thì (< 1 giây, chỉ cần trỏ lại Load Balancer)** | Nhanh |
| **Chi phí hạ tầng** | Thấp | Thấp | Tốn x2 tài nguyên trong 10 phút deploy | Trung bình |

### Căn cứ lựa chọn Blue/Green:
Vào giờ cao điểm Flash Sale, hệ thống không thể chấp nhận rủi ro xung đột dữ liệu khi 2 phiên bản chạy song song (như Rolling Update). **Blue/Green** cho phép test toàn bộ môi trường Green trước khi đóng điện. Nếu phiên bản mới phát sinh lỗi, ta chỉ mất **đúng 1 giây chuyển router về môi trường Blue cũ**, bảo vệ 100% doanh thu.
