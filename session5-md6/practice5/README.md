# [Bài tập 5 - Mức độ: Vận dụng cơ bản] Vá lỗi khách hàng nhận 5 email xác nhận cho một đơn

> **Khóa học:** [FJS-MD6] Professional Backend Development & Optimization (Mã: `175`)
> **Session:** Background Jobs & BullMQ (`session5-md6`)
> **Mã bài tập trên Portal:** `10238`
> **Mức độ:** Vận dụng cơ bản
> **Đường dẫn nộp bài Portal:** [Link Portal](https://portal.rikkei.edu.vn/learn/175/homework/10238)

---

**\[Bài tập 5 - Mức độ: Vận dụng cơ bản\] Vá lỗi khách hàng nhận 5 email xác nhận cho một đơn**

**1\. Mục tiêu**

-   Đọc hiểu mã nguồn xử lý hàng đợi có sẵn và dò được luồng thực thi.

-   Phát hiện lỗi khiến công việc bị lặp và lỗi khiến hàng đợi phình vô hạn.

-   Chứng minh lỗi bằng test case cụ thể trước khi sửa.

**2\. Mô tả**

**Bối cảnh nghiệp vụ**

Quy tắc đúng: mỗi đơn hàng chỉ được gửi đúng một email xác nhận, dù công việc có bị thử lại bao nhiêu lần. Công việc đã hoàn tất phải được dọn khỏi Redis để hàng đợi không phình ra.

**Vấn đề hiện tại**

CSKH nhận phản ánh khách nhận 5 email giống hệt nhau cho một đơn. Đội hạ tầng thì báo bộ nhớ Redis tăng đều 200MB mỗi ngày và không bao giờ giảm.

**Hiện trường**

*Đoạn mã đang chạy trên môi trường thật của ShopFast:*

 `// email.processor.ts - chay duoc, khong loi cu phap, nhung sai logic` 

 `@Processor("order-email")` 

 `export class EmailProcessor extends WorkerHost {` 

 `constructor(private mailer: MailerService) { super(); }` 

 `async process(job: Job<{ orderId: string; email: string }>) {` 

 `await this.mailer.sendConfirmation(job.data.email, job.data.orderId);` 

 `return { sent: true };` 

 `}` 

 `}` 

 `// order.service.ts` 

 `async createOrder(dto: CreateOrderDto) {` 

 `const order = await this.repo.save(dto);` 

 `await this.emailQueue.add("send-confirmation", {` 

 `orderId: order.id,` 

 `email: dto.email,` 

 `}, {` 

 `attempts: 5,` 

 `});` 

 `return order;` 

 `}` 

**Yêu cầu đầu ra**

-   Phần 1 - Chỉ ra lỗi bằng dữ liệu: nêu ít nhất 3 khiếm khuyết, mỗi khiếm khuyết kèm một test case cụ thể (làm gì, quan sát gì, kết quả thực tế so với kết quả đúng).

-   Phần 2 - Source code đã sửa: nộp bản mã nguồn bảo đảm mỗi đơn chỉ gửi một email và Redis không phình vô hạn.

    Gợi ý phạm vi soi: điều gì xảy ra khi một công việc được thử lại, chuyện gì xảy ra với công việc sau khi nó hoàn tất, và chiến lược chờ giữa các lần thử.

**3\. Đánh giá**

Để hoàn thành bài thực hành, học viên cần:

-   Bản phân tích chỉ ra được ít nhất 3 lỗi, mỗi lỗi có test case tái hiện.

-   Sau khi sửa: cho việc gửi email thất bại 4 lần rồi thành công, khách chỉ nhận đúng 1 email.

-   Sau khi sửa: chạy 1.000 công việc rồi kiểm tra, số bản ghi tồn đọng trong Redis nằm trong giới hạn đã cấu hình.

-   Có chiến lược giãn dần thời gian chờ giữa các lần thử thay vì thử lại dồn dập.

-   Đưa mã nguồn lên GitHub và dán link repository lên phần nộp bài trên hệ thống.
