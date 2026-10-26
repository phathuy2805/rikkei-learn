# [Bài tập 8 - Mức độ: Phân tích] Chọn kiến trúc cho bộ định tuyến ticket 3.000 lượt/ngày

> **Khóa học:** [FJS-MD6] Professional Backend Development & Optimization (Mã: `175`)
> **Session:** AI Agent Fundamentals: Flow, Tools & Prompting (`session1-md6`)
> **Mã bài tập trên Portal:** `10221`
> **Mức độ:** Phân tích
> **Đường dẫn nộp bài Portal:** [Link Portal](https://portal.rikkei.edu.vn/learn/175/homework/10221)

---

**\[Bài tập 8 - Mức độ: Phân tích\] Chọn kiến trúc cho bộ định tuyến ticket 3.000 lượt/ngày**

**1\. Mục tiêu**

-   Nhìn một bài toán dưới nhiều góc độ kỹ thuật khác nhau.

-   Đánh giá sự đánh đổi giữa chi phí, độ trễ và độ chính xác.

-   Ra quyết định kiến trúc có căn cứ định lượng.

**2\. Mô tả**

**Bối cảnh & yêu cầu bài toán**

ShopFast cần hệ thống định tuyến 3.000 ticket/ngày về 4 đội xử lý. Khoảng 70% ticket chỉ cần gán nhãn; 30% còn lại cần tra cứu dữ liệu đơn hàng rồi mới quyết định được.

**Quy tắc nghiệp vụ**

-   Ticket gán sai đội phải được chuyển tiếp thủ công, tốn trung bình 6 phút nhân sự.

-   Thời gian phản hồi cho khách không được vượt quá 5 giây.

-   Ngân sách vận hành cho phần này tối đa 4 triệu đồng/tháng.

    **Ràng buộc & bẫy dữ liệu**

-   Có ticket dài 4.000 từ do khách dán cả lịch sử chat vào.

-   Có ticket chứa 2 vấn đề khác nhau trong cùng một nội dung (vừa hỏi tồn kho vừa khiếu nại thanh toán).

    **Yêu cầu đầu ra**

    **A. Phân tích & đề xuất đa giải pháp**

-   Xác định rõ đầu vào / đầu ra của hệ thống định tuyến.

-   Đưa ra tối thiểu 2 giải pháp khả thi. Gợi ý hướng: (a) một lời gọi model đơn lẻ chỉ để phân loại, (b) agent đầy đủ có tool tra cứu, (c) kiến trúc lai - phân loại trước, chỉ đẩy sang agent những ticket cần tra cứu.

**B. So sánh & lựa chọn**

-   Lập bảng so sánh rõ ràng ưu điểm - nhược điểm của từng giải pháp theo ít nhất 4 tiêu chí: chi phí ước tính/tháng, độ trễ trung bình, độ chính xác dự kiến, độ phức tạp bảo trì.

-   Chốt lựa chọn một giải pháp phù hợp nhất với 3 ràng buộc nghiệp vụ đã nêu, giải thích căn cứ.

**C. Thiết kế & triển khai**

-   Thiết kế các bước thực hiện cho giải pháp đã chọn.

-   Triển khai mã nguồn hoàn chỉnh, xử lý được cả hai bẫy dữ liệu nêu trên.

**3\. Đánh giá**

Để hoàn thành bài thực hành, học viên cần:

-   Trình bày được ít nhất 2 giải pháp thực sự khác nhau về kiến trúc, không phải hai biến thể của một cách.

-   Bảng so sánh có tối thiểu 4 tiêu chí, số liệu chi phí có cách tính kèm theo.

-   Lựa chọn cuối cùng được biện luận dựa trên ràng buộc 5 giây và 4 triệu đồng/tháng.

-   Ticket 4.000 từ và ticket đa vấn đề đều được xử lý, không làm hỏng luồng.

-   Đưa mã nguồn lên GitHub và dán link repository lên phần nộp bài trên hệ thống.
