# Báo Cáo Giải Bài Tập 8 (Session 3): Chọn Thuật Toán Giới Hạn Cho Cổng Thanh Toán

**Học viên:** [FJS-MD6] Professional Backend Development & Optimization  
**Mã bài tập:** `homeworkId: 10231` | `session3-md6/practice8`  
**Mức độ:** Phân tích  

---

## 1. SO SÁNH 4 THUẬT TOÁN CHO CỔNG THANH TOÁN (PAYMENT GATEWAY)

| Tiêu chí | Fixed Window | Sliding Window Log | Token Bucket | Leaky Bucket [CHỌN] |
| :--- | :--- | :--- | :--- | :--- |
| **Xử lý đột biến (Burst)** | Dễ sập ở biên | Chặn burst chuẩn | Cho phép burst theo dung lượng bucket | **Làm mịn burst hoàn hảo (Smooth Rate)** |
| **Bảo vệ cổng thanh toán đối tác** | Kém | Trung bình | Có thể gây quá tải downstream nếu burst lớn | **Tuyệt đối an toàn (Đẩy request đều đặn theo hằng số)** |
| **Chi phí bộ nhớ** | Rất thấp (1 key) | Rất cao (Lưu timestamps) | Thấp (2 giá trị) | **Thấp (1 hàng đợi hoặc timestamp rò rỉ)** |
| **Độ trễ trung bình** | < 1ms | 2-5ms (Redis ZSET) | < 1ms | < 2ms |

### Căn cứ lựa chọn Leaky Bucket:
Cổng thanh toán đối tác (VNPay, Momo, Stripe) có giới hạn nghiêm ngặt về số lượng giao dịch đồng thời (TPS). Nếu dùng Token Bucket, 100 request burst vào cùng 1 giây sẽ được thông qua ngay lập tức và làm nghẽn/từ chối từ phía ngân hàng. **Leaky Bucket** ép luồng request chảy ra với tốc độ cố định đều đặn (ví dụ đúng 10 req/s), bảo vệ 100% cổng thanh toán không bao giờ bị lỗi quá tải.
