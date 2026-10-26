# [Bài tập 8 - Mức độ: Phân tích] Chọn chiến lược ghi cho tồn kho thời gian thực

> **Khóa học:** [FJS-MD6] Professional Backend Development & Optimization (Mã: `175`)
> **Session:** Redis Caching Fundamentals (`session4-md6`)
> **Mã bài tập trên Portal:** `10236`
> **Mức độ:** Phân tích
> **Đường dẫn nộp bài Portal:** [Link Portal](https://portal.rikkei.edu.vn/learn/175/homework/10236)

---

**\[Bài tập 8 - Mức độ: Phân tích\] Chọn chiến lược ghi cho tồn kho thời gian thực**

**1\. Mục tiêu**

-   Nhìn bài toán đồng bộ dữ liệu dưới nhiều góc độ kỹ thuật.

-   Đánh giá đánh đổi giữa độ trễ, tính nhất quán và rủi ro mất dữ liệu.

-   Ra quyết định có căn cứ định lượng.

**2\. Mô tả**

**Bối cảnh & yêu cầu bài toán**

Tồn kho ShopFast thay đổi rất nhanh trong đợt flash sale: 400 lượt trừ kho mỗi giây cho cùng một sản phẩm. Cơ sở dữ liệu quan hệ chỉ chịu được khoảng 150 lượt ghi mỗi giây trên cùng một dòng dữ liệu.

**Quy tắc nghiệp vụ**

-   Tuyệt đối không được bán vượt số lượng tồn kho thực tế.

-   Khách phải thấy phản hồi đặt hàng trong vòng 500 mili giây.

-   Sau khi chiến dịch kết thúc, số liệu tồn kho trong cơ sở dữ liệu phải khớp tuyệt đối với thực tế đã bán.

    **Ràng buộc & bẫy dữ liệu**

-   Redis có thể bị khởi động lại giữa chiến dịch.

-   Có đơn hàng bị huỷ giữa chừng, phải hoàn lại số lượng vào tồn kho.

    **Yêu cầu đầu ra**

    **A. Phân tích & đề xuất đa giải pháp**

-   Xác định rõ đầu vào / đầu ra và đâu là ràng buộc khó thoả mãn nhất trong ba quy tắc nghiệp vụ.

-   Đưa ra tối thiểu 2 giải pháp khả thi. Gợi ý hướng: (a) ghi thẳng cơ sở dữ liệu, (b) ghi đồng thời cả bộ nhớ đệm và cơ sở dữ liệu, (c) ghi vào bộ nhớ đệm trước rồi đồng bộ xuống cơ sở dữ liệu theo lô.

**B. So sánh & lựa chọn**

-   Lập bảng so sánh ưu điểm - nhược điểm theo ít nhất 4 tiêu chí: độ trễ cảm nhận của khách, khả năng chịu 400 lượt ghi mỗi giây, rủi ro mất dữ liệu khi Redis khởi động lại, độ phức tạp cài đặt và vận hành.

-   Chốt lựa chọn một giải pháp phù hợp nhất với 3 ràng buộc nghiệp vụ, giải thích căn cứ - đặc biệt là yêu cầu không bán vượt tồn kho.

**C. Thiết kế & triển khai**

-   Thiết kế các bước thực hiện cho giải pháp đã chọn, nêu rõ cách bảo đảm thao tác trừ kho là nguyên tử.

-   Triển khai mã nguồn hoàn chỉnh, xử lý được cả hai bẫy dữ liệu nêu trên.

**3\. Đánh giá**

Để hoàn thành bài thực hành, học viên cần:

-   Trình bày được ít nhất 2 chiến lược ghi thực sự khác nhau về nguyên lý.

-   Bảng so sánh có tối thiểu 4 tiêu chí với nhận định cụ thể, có số liệu ước tính.

-   Lựa chọn cuối cùng biện luận được dựa trên ràng buộc không bán vượt tồn kho.

-   Có phương án rõ ràng cho việc khôi phục khi Redis khởi động lại và cho đơn hàng bị huỷ.

-   Mô phỏng 400 lượt trừ kho đồng thời cho ra kết quả tồn kho chính xác, không âm.

-   Đưa mã nguồn lên GitHub và dán link repository lên phần nộp bài trên hệ thống.
