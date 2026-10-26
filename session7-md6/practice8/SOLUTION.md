# Báo Cáo Giải Bài Tập 8 (Session 7): Chọn Cơ Chế Xác Thực Cho Ứng Dụng Chạy Trên Máy Chủ

**Học viên:** [FJS-MD6] Professional Backend Development & Optimization  
**Mã bài tập:** `homeworkId: 10251` | `session7-md6/practice8`  
**Mức độ:** Phân tích  

---

## 1. SO SÁNH 3 CƠ CHẾ XÁC THỰC CHO MÁY CHỦ ỨNG DỤNG

| Tiêu chí | Long-term Access Keys | AWS Secrets Manager | IAM Roles (Instance Profile / IRSA) [CHỌN] |
| :--- | :--- | :--- | :--- |
| **Bảo mật (Zero Credential on Disk)** | Rất kém (File `~/.aws/credentials` dễ bị đánh cắp) | Khá (Lấy qua API, vẫn cần key ban đầu) | **Tuyệt đối an toàn (Không lưu bất kỳ key nào trên đĩa)** |
| **Cơ chế xoay vòng (Key Rotation)** | Phải làm thủ công hoặc viết script phức tạp | Tự động xoay vòng qua Lambda | **AWS tự động cấp phát và xoay token ngắn hạn mỗi 1 giờ** |
| **Chi phí bổ sung** | 0$ | ~$0.40/secret/tháng + API call | **0$ (Hoàn toàn miễn phí theo IAM Role)** |
| **Độ phức tạp tích hợp** | Thấp | Trung bình | **Rất thấp (AWS SDK tự động gắp credential từ Metadata Service)** |

### Căn cứ lựa chọn IAM Roles:
IAM Roles (Instance Profile cho EC2 hoặc IRSA cho EKS) là Best Practice số 1 của AWS Well-Architected Framework: không lưu bất kỳ access key nào trên máy chủ, token tạm thời được cấp qua AWS Instance Metadata Service (IMDSv2) và tự động xoay vòng, loại bỏ 100% rủi ro lộ khóa.
