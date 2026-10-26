# Báo Cáo Giải Bài Tập 8 (Session 2): Chọn Kỹ Thuật Cập Nhật Cho Bảng Điều Khiển Vận Hành

**Học viên:** [FJS-MD6] Professional Backend Development & Optimization  
**Mã bài tập:** `homeworkId: 10226` | `session2-md6/practice8`  
**Mức độ:** Phân tích  

---

## 1. SO SÁNH 3 KỸ THUẬT: SHORT POLLING VS SSE VS WEBSOCKET

Quy mô bài toán: **500 màn hình dashboard vận hành mở liên tục 12 tiếng/ngày**, tần suất thay đổi dữ liệu ~3-5 giây/lần.

| Tiêu chí | Short Polling (mỗi 3s) | SSE (Server-Sent Events) [CHỌN] | Full WebSocket |
| :--- | :--- | :--- | :--- |
| **Chi phí hạ tầng & băng thông** | Rất cao (~7.2 triệu request/ngày, tràn ngập HTTP headers thừa) | **Thấp nhất** (1 kết nối HTTP streaming duy nhất, không header thừa) | Thấp (Duy trì 500 socket duplex) |
| **Độ trễ trung bình** | 1.5 – 3.0 giây | **< 100ms** (Server đẩy ngay khi có sự kiện) | < 100ms |
| **Tải CPU/Memory máy chủ** | Cực cao (7.2M handshake TCP/SSL) | **Rất nhẹ** (Tương thích chuẩn HTTP/2, native proxy) | Trung bình (Tốn memory quản lý 2 chiều) |
| **Độ phức tạp bảo trì** | Thấp | **Rất thấp** (Native trình duyệt, tự động reconnect) | Cao (Cần gateway quản lý kết nối 2 chiều) |

### Căn cứ lựa chọn SSE (Server-Sent Events):
Dashboard vận hành là bài toán **dữ liệu 1 chiều** (Server đẩy số liệu cho màn hình hiển thị, màn hình không gửi ngược lại dữ liệu liên tục). Do đó, SSE là kiến trúc tối ưu nhất: vừa có độ trễ tức thời (< 100ms), vừa tương thích hoàn hảo với Load Balancer (Nginx/Cloudflare) qua HTTP/2 mà không gặp các lỗi ngắt kết nối WebSocket phức tạp.
