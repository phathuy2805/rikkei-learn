# [Bài tập 5 - Mức độ: Vận dụng cơ bản] Vá lỗi khách hàng nhận được đơn hàng của người khác

> **Khóa học:** [FJS-MD6] Professional Backend Development & Optimization (Mã: `175`)
> **Session:** Realtime Communication with WebSocket (`session2-md6`)
> **Mã bài tập trên Portal:** `10223`
> **Mức độ:** Vận dụng cơ bản
> **Đường dẫn nộp bài Portal:** [Link Portal](https://portal.rikkei.edu.vn/learn/175/homework/10223)

---

**\[Bài tập 5 - Mức độ: Vận dụng cơ bản\] Vá lỗi khách hàng nhận được đơn hàng của người khác**

**1\. Mục tiêu**

-   Đọc hiểu mã nguồn gateway có sẵn và dò được luồng phát sự kiện.

-   Phát hiện lỗ hổng phát tán dữ liệu sai người nhận.

-   Chứng minh lỗi bằng kịch bản kiểm thử cụ thể.

**2\. Mô tả**

**Bối cảnh nghiệp vụ**

Quy tắc đúng: khi một đơn hàng đổi trạng thái, chỉ những client đang theo dõi \*chính đơn đó\* mới được nhận thông báo.

**Vấn đề hiện tại**

Bộ phận pháp chế cảnh báo: khách hàng phản ánh thấy thông báo về đơn hàng không phải của mình hiện lên màn hình. Ngoài ra, khách để tab mở lâu thì trình duyệt ngày càng chậm.

**Hiện trường**

*Đoạn mã đang chạy trên môi trường staging của ShopFast:*

 `// order.gateway.ts - chay duoc, khong loi cu phap, nhung sai logic` 

 `@WebSocketGateway({ cors: { origin: "\*" } })` 

 `export class OrderGateway {` 

 `@WebSocketServer() server: Server;` 

 `private tracked = new Map<string, string>();` 

 `@SubscribeMessage("order:track")` 

 `handleTrack(@MessageBody() orderId: string,` 

 `@ConnectedSocket() client: Socket) {` 

 `this.tracked.set(client.id, orderId);` 

 `return { ok: true };` 

 `}` 

 `notifyStatusChanged(orderId: string, status: string) {` 

 `this.server.emit("order:updated", { orderId, status });` 

 `}` 

 `handleDisconnect(client: Socket) {` 

 `console.log("client roi di:", client.id);` 

 `}` 

 `}` 

**Yêu cầu đầu ra**

-   Phần 1 - Chỉ ra lỗi bằng dữ liệu: nêu ít nhất 2 khiếm khuyết, mỗi khiếm khuyết kèm một kịch bản kiểm thử cụ thể (mở mấy tab, theo dõi đơn nào, cập nhật đơn nào, kết quả thực tế so với kết quả đúng).

-   Phần 2 - Source code đã sửa: nộp bản  `order.gateway.ts`  phát sự kiện đúng người nhận và không rò rỉ tài nguyên.

    Gợi ý phạm vi soi: phạm vi mà lời gọi phát sự kiện tác động tới, và những gì còn sót lại sau khi một client rời đi.

**3\. Đánh giá**

Để hoàn thành bài thực hành, học viên cần:

-   Bản phân tích chỉ ra được ít nhất 2 lỗi, mỗi lỗi có kịch bản tái hiện rõ ràng.

-   Sau khi sửa: client theo dõi đơn 2048 không còn nhận sự kiện của đơn 1024.

-   Mở rồi đóng 50 kết nối liên tiếp, cấu trúc lưu trạng thái trên server trở về rỗng.

-   Đưa mã nguồn lên GitHub và dán link repository lên phần nộp bài trên hệ thống.
