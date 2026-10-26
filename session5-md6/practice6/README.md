# [Bài tập 6 - Mức độ: Vận dụng cơ bản] Điền khuyết cơ chế tắt tiến trình an toàn

> **Khóa học:** [FJS-MD6] Professional Backend Development & Optimization (Mã: `175`)
> **Session:** Background Jobs & BullMQ (`session5-md6`)
> **Mã bài tập trên Portal:** `10239`
> **Mức độ:** Vận dụng cơ bản
> **Đường dẫn nộp bài Portal:** [Link Portal](https://portal.rikkei.edu.vn/learn/175/homework/10239)

---

**\[Bài tập 6 - Mức độ: Vận dụng cơ bản\] Điền khuyết cơ chế tắt tiến trình an toàn**

**1\. Mục tiêu**

-   Hiểu điều gì xảy ra với công việc đang chạy khi tiến trình bị dừng.

-   Bổ sung cơ chế dừng có trật tự để không mất công việc.

**2\. Mô tả**

**Bối cảnh nghiệp vụ**

Quy tắc đúng: mỗi lần triển khai mã mới, tiến trình xử lý phải hoàn tất các công việc đang chạy dở rồi mới thoát. Không được để công việc bị cắt ngang giữa chừng.

**Vấn đề hiện tại**

Mỗi lần triển khai mã mới, đội vận hành ghi nhận khoảng 30 hoá đơn bị hỏng: tệp PDF tạo ra dở dang, và công việc bị treo ở trạng thái đang xử lý mãi không thoát ra.

**Hiện trường**

*Mã nguồn hiện tại - hãy điền vào 5 chỗ khuyết được đánh dấu:*

 `// main.ts` 

 `async function bootstrap() {` 

 `const app = await NestFactory.create(AppModule);` 

 `// (1) thieu bat che do lang nghe tin hieu tat ung dung` 

 `await app.listen(3000);` 

 `}` 

 `// invoice.processor.ts` 

 `@Processor("invoice-export")` 

 `export class InvoiceProcessor extends WorkerHost {` 

 `async process(job: Job) {` 

 `const pdf = await this.renderPdf(job.data); // mat ~1200 ms` 

 `await this.storage.upload(pdf);` 

 `return { ok: true };` 

 `}` 

 `// (2) thieu hook chay khi module bi huy de dong worker` 

 `// (3) thieu cau hinh thoi gian cho worker xu ly not viec dang chay` 

 `}` 

 `// queue config` 

 `// (4) thieu cau hinh khoang thoi gian coi mot job la bi bo roi` 

 `// (5) thieu co che gia han khoa khi job chay lau hon nguong tren` 

**Yêu cầu đầu ra**

-   Hoàn thiện đủ 5 chỗ khuyết: bật lắng nghe tín hiệu tắt, đóng tiến trình xử lý có trật tự, đặt thời gian chờ hoàn tất, cấu hình ngưỡng coi công việc bị bỏ rơi và cơ chế gia hạn cho công việc chạy lâu.

-   Nộp kèm log của một lần chạy thử: gửi tín hiệu tắt trong lúc đang có 5 công việc chạy dở, thể hiện rõ cả 5 công việc đều hoàn tất trước khi tiến trình thoát.

    **Bẫy dữ liệu**

-   Một công việc chạy quá lâu vượt cả thời gian chờ tắt - phải có phương án xử lý, không để tiến trình treo vĩnh viễn.

-   Tiến trình bị buộc dừng ngay lập tức không kịp dọn dẹp - công việc đang chạy dở phải được hệ thống nhận lại và giao cho tiến trình khác.

**3\. Đánh giá**

Để hoàn thành bài thực hành, học viên cần:

-   Gửi tín hiệu tắt khi có 5 công việc đang chạy: cả 5 hoàn tất rồi tiến trình mới thoát.

-   Buộc dừng tiến trình đột ngột: công việc dở dang được nhận lại và xử lý bởi tiến trình khác sau khi vượt ngưỡng bỏ rơi.

-   Công việc chạy lâu hơn ngưỡng vẫn không bị coi là bỏ rơi nhờ cơ chế gia hạn.

-   Đưa mã nguồn lên GitHub và dán link repository lên phần nộp bài trên hệ thống.
