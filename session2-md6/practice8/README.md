# [Bài tập 8 - Mức độ: Phân tích] Chọn kỹ thuật cập nhật cho bảng điều khiển vận hành

> **Khóa học:** [FJS-MD6] Professional Backend Development & Optimization (Mã: `175`)
> **Session:** Realtime Communication with WebSocket (`session2-md6`)
> **Mã bài tập trên Portal:** `10226`
> **Mức độ:** Phân tích
> **Đường dẫn nộp bài Portal:** [Link Portal](https://portal.rikkei.edu.vn/learn/175/homework/10226)

---

**\[Bài tập 8 - Mức độ: Phân tích\] Chọn kỹ thuật cập nhật cho bảng điều khiển vận hành**

**1\. Mục tiêu**

-   Nhìn bài toán cập nhật dữ liệu dưới nhiều góc độ kỹ thuật.

-   Đánh giá đánh đổi giữa độ trễ, chi phí hạ tầng và độ phức tạp.

-   Ra quyết định có căn cứ định lượng.

**2\. Mô tả**

**Bối cảnh & yêu cầu bài toán**

ShopFast cần một bảng điều khiển hiển thị số đơn mới, doanh thu và cảnh báo tồn kho cho 40 nhân viên vận hành. Dữ liệu chỉ đi một chiều từ server xuống; nhân viên không gửi gì lên qua kênh này. Số liệu thay đổi trung bình 5 giây một lần vào giờ cao điểm và 2 phút một lần vào ban đêm.

**Quy tắc nghiệp vụ**

-   Cảnh báo hết hàng phải tới tay nhân viên trong vòng 10 giây kể từ khi phát sinh.

-   Bảng điều khiển chạy suốt 24/7 trên màn hình lớn trong kho, không có người thao tác.

-   Hạ tầng hiện tại đứng sau một bộ cân bằng tải có giới hạn thời gian giữ kết nối là 60 giây.

    **Ràng buộc & bẫy dữ liệu**

-   Ban đêm gần như không có thay đổi nào trong hàng giờ liền.

-   Mạng nội bộ kho thỉnh thoảng rớt vài giây rồi tự phục hồi.

    **Yêu cầu đầu ra**

    **A. Phân tích & đề xuất đa giải pháp**

-   Xác định rõ đầu vào / đầu ra và đặc điểm quan trọng nhất của luồng dữ liệu này.

-   Đưa ra tối thiểu 2 giải pháp khả thi. Gợi ý hướng: (a) polling theo chu kỳ, (b) luồng sự kiện một chiều từ server, (c) kết nối song công đầy đủ.

**B. So sánh & lựa chọn**

-   Lập bảng so sánh ưu điểm - nhược điểm theo ít nhất 4 tiêu chí: độ trễ, số kết nối và tài nguyên server tiêu tốn, khả năng tự phục hồi khi rớt mạng, độ phức tạp triển khai và vận hành.

-   Chốt lựa chọn một giải pháp phù hợp nhất với 3 ràng buộc nghiệp vụ đã nêu, giải thích căn cứ - đặc biệt là ràng buộc 60 giây của bộ cân bằng tải.

**C. Thiết kế & triển khai**

-   Thiết kế các bước thực hiện cho giải pháp đã chọn.

-   Triển khai mã nguồn hoàn chỉnh, xử lý được cả hai bẫy dữ liệu nêu trên.

**3\. Đánh giá**

Để hoàn thành bài thực hành, học viên cần:

-   Trình bày được ít nhất 2 giải pháp khác nhau về bản chất kỹ thuật.

-   Bảng so sánh có tối thiểu 4 tiêu chí với nhận định cụ thể, không nói chung chung.

-   Lựa chọn cuối cùng biện luận được dựa trên đặc điểm một chiều của dữ liệu và giới hạn 60 giây.

-   Có phương án giữ kết nối sống qua ngưỡng 60 giây và tự phục hồi sau khi rớt mạng.

-   Đưa mã nguồn lên GitHub và dán link repository lên phần nộp bài trên hệ thống.
