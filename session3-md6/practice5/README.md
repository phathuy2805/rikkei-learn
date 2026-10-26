# [Bài tập 5 - Mức độ: Vận dụng cơ bản] Vá lỗi hàng rào giới hạn bị bot vượt qua dễ dàng

> **Khóa học:** [FJS-MD6] Professional Backend Development & Optimization (Mã: `175`)
> **Session:** API Rate Limiting in Nest.js (`session3-md6`)
> **Mã bài tập trên Portal:** `10228`
> **Mức độ:** Vận dụng cơ bản
> **Đường dẫn nộp bài Portal:** [Link Portal](https://portal.rikkei.edu.vn/learn/175/homework/10228)

---

**\[Bài tập 5 - Mức độ: Vận dụng cơ bản\] Vá lỗi hàng rào giới hạn bị bot vượt qua dễ dàng**

**1\. Mục tiêu**

-   Đọc hiểu cấu hình giới hạn tần suất có sẵn và dò được luồng thực thi.

-   Phát hiện lỗ hổng khiến hàng rào mất tác dụng.

-   Chứng minh lỗi bằng kịch bản kiểm thử cụ thể.

**2\. Mô tả**

**Bối cảnh nghiệp vụ**

Quy tắc đúng: mỗi tài khoản chỉ được đặt tối đa 3 đơn flash sale trong 60 giây. Endpoint gửi OTP chỉ được gọi 3 lần trong 5 phút vì mỗi tin nhắn tốn phí thật.

**Vấn đề hiện tại**

Đợt flash sale vừa rồi, một tài khoản đặt được 180 đơn trong 1 phút. Hoá đơn SMS tháng này cũng tăng gấp 12 lần so với tháng trước.

**Hiện trường**

*Cấu hình đang chạy trên môi trường thật của ShopFast:*

 `// app.module.ts` 

 `@Module({` 

 `imports: \[` 

 `ThrottlerModule.forRoot(\[{ ttl: 60000, limit: 3 }\]),` 

 `\],` 

 `// (khong dang ky ThrottlerGuard o pham vi toan ung dung)` 

 `})` 

 `export class AppModule {}` 

 `// order.controller.ts` 

 `@Controller("orders")` 

 `export class OrderController {` 

 `@Post("flash-sale")` 

 `createFlashSaleOrder(@Body() dto: CreateOrderDto) { ... }` 

 `}` 

 `// auth.controller.ts` 

 `@Controller("auth")` 

 `export class AuthController {` 

 `@SkipThrottle()` 

 `@Post("send-otp")` 

 `sendOtp(@Body() dto: SendOtpDto) { ... }` 

 `}` 

**Yêu cầu đầu ra**

-   Phần 1 - Chỉ ra lỗi bằng dữ liệu: nêu ít nhất 2 khiếm khuyết, mỗi khiếm khuyết kèm một kịch bản kiểm thử cụ thể (gọi endpoint nào, bao nhiêu lần, kết quả thực tế so với kết quả đúng phải là gì).

-   Phần 2 - Source code đã sửa: nộp cấu hình và mã nguồn chặn đúng cả hai lỗ hổng trên.

    Gợi ý phạm vi soi: bộ bảo vệ đã thực sự được kích hoạt chưa, và decorator nào đang vô hiệu hoá chính hàng rào mà ta cần nhất.

**3\. Đánh giá**

Để hoàn thành bài thực hành, học viên cần:

-   Bản phân tích chỉ ra được ít nhất 2 lỗi, mỗi lỗi có kịch bản tái hiện rõ ràng.

-   Sau khi sửa: lần đặt đơn flash sale thứ 4 trong 60 giây bị trả về 429.

-   Sau khi sửa: lần gọi gửi OTP thứ 4 trong 5 phút bị trả về 429.

-   Đưa mã nguồn lên GitHub và dán link repository lên phần nộp bài trên hệ thống.
