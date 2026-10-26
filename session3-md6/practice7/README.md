# [Bài tập 7 - Mức độ: Vận dụng chuyên sâu] Hệ thống hạn mức phân tầng theo gói dịch vụ

> **Khóa học:** [FJS-MD6] Professional Backend Development & Optimization (Mã: `175`)
> **Session:** API Rate Limiting in Nest.js (`session3-md6`)
> **Mã bài tập trên Portal:** `10230`
> **Mức độ:** Vận dụng chuyên sâu
> **Đường dẫn nộp bài Portal:** [Link Portal](https://portal.rikkei.edu.vn/learn/175/homework/10230)

---

**\[Bài tập 7 - Mức độ: Vận dụng chuyên sâu\] Hệ thống hạn mức phân tầng theo gói dịch vụ**

**1\. Mục tiêu**

-   Dịch một chính sách kinh doanh sang quy tắc kỹ thuật.

-   Thiết kế cơ chế hạn mức nhiều tầng cùng lúc.

-   Bảo vệ tài nguyên đắt tiền bằng ràng buộc phù hợp.

**2\. Mô tả**

**Bối cảnh & vấn đề**

ShopFast mở API cho nhà bán hàng tích hợp hệ thống riêng. Phòng kinh doanh chia làm 3 gói và cần hệ thống kỹ thuật thực thi đúng chính sách này, đồng thời không để một nhà bán hàng nào làm ảnh hưởng tới người khác.

**Yêu cầu nghiệp vụ**

-   Gói Free: 60 request/phút và 5.000 request/ngày.

-   Gói Pro: 600 request/phút và 200.000 request/ngày.

-   Gói Enterprise: 6.000 request/phút, không giới hạn theo ngày.

-   Riêng endpoint xuất báo cáo tốn tài nguyên: mọi gói đều chỉ được 10 request/giờ.

-   Nhà bán hàng phải luôn biết mình còn bao nhiêu hạn mức thông qua tiêu đề phản hồi.

    **Ràng buộc & bẫy dữ liệu**

-   Nhà bán hàng nâng cấp gói giữa chừng - hạn mức mới phải có hiệu lực ngay, không phải chờ hết chu kỳ.

-   Request không mang khoá API hoặc mang khoá đã bị thu hồi - phải bị chặn ở hạn mức thấp nhất, không được hưởng gói cao.

    **Yêu cầu đầu ra**

    **A. Báo cáo phân tích và thiết kế giải pháp**

-   Phân tích bài toán (I/O): xác định rõ dữ liệu đầu vào cần có để quyết định cho qua hay chặn, kiểu dữ liệu từng trường, và phản hồi trả ra trong cả hai nhánh.

-   Đề xuất giải pháp: trình bày ngắn gọn ý tưởng logic - lưu bộ đếm ở đâu, khoá định danh gồm những thành phần nào, xử lý nhiều tầng hạn mức cùng lúc ra sao.

-   Thiết kế các bước: vẽ lưu đồ hoặc gạch đầu dòng tuần tự các bước từ khi request tới cho tới khi trả về phản hồi, thể hiện rõ các điểm rẽ nhánh.

**B. Triển khai và chống lỗi**

-   Source code hoàn chỉnh, logic phải khớp với bản thiết kế ở phần A.

-   Có đoạn mã cụ thể chặn từng bẫy dữ liệu đã nêu, kèm thông báo rõ ràng cho nhà bán hàng.

**3\. Đánh giá**

Để hoàn thành bài thực hành, học viên cần:

-   Báo cáo phân tích có đủ 3 mục I/O, đề xuất giải pháp và thiết kế các bước.

-   Cả 4 quy tắc hạn mức đều thực thi đúng, chứng minh bằng kịch bản kiểm thử cho từng gói.

-   Endpoint xuất báo cáo bị chặn ở lần thứ 11 trong một giờ, kể cả với gói Enterprise.

-   Nâng cấp gói giữa chừng có hiệu lực ngay lập tức.

-   Request thiếu khoá hoặc khoá bị thu hồi bị chặn ở hạn mức thấp nhất.

-   Đưa mã nguồn lên GitHub và dán link repository lên phần nộp bài trên hệ thống.
