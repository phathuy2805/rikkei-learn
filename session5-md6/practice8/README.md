# [Bài tập 8 - Mức độ: Phân tích] Chọn kiến trúc xử lý cho 500.000 email chiến dịch

> **Khóa học:** [FJS-MD6] Professional Backend Development & Optimization (Mã: `175`)
> **Session:** Background Jobs & BullMQ (`session5-md6`)
> **Mã bài tập trên Portal:** `10241`
> **Mức độ:** Phân tích
> **Đường dẫn nộp bài Portal:** [Link Portal](https://portal.rikkei.edu.vn/learn/175/homework/10241)

---

**\[Bài tập 8 - Mức độ: Phân tích\] Chọn kiến trúc xử lý cho 500.000 email chiến dịch**

**1\. Mục tiêu**

-   Nhìn bài toán xử lý hàng loạt dưới nhiều góc độ kỹ thuật.

-   Đánh giá đánh đổi giữa thông lượng, chi phí hạ tầng và độ phức tạp.

-   Ra quyết định có căn cứ định lượng.

**2\. Mô tả**

**Bối cảnh & yêu cầu bài toán**

ShopFast chạy chiến dịch khuyến mãi, cần gửi 500.000 email cá nhân hoá trong tối đa 2 giờ. Nhà cung cấp dịch vụ email giới hạn 100 email mỗi giây và tính phí theo số lần gọi, gọi vượt ngưỡng bị chặn 10 phút.

**Quy tắc nghiệp vụ**

-   Mỗi khách chỉ được nhận đúng một email của chiến dịch, tuyệt đối không trùng.

-   Chiến dịch phải theo dõi được tiến độ theo thời gian thực và dừng được giữa chừng nếu phát hiện sai sót.

-   Không được ảnh hưởng tới việc gửi email giao dịch thông thường như xác nhận đơn hàng, vốn phải đi ngay.

    **Ràng buộc & bẫy dữ liệu**

-   Trong danh sách 500.000 khách có khoảng 3% địa chỉ email sai định dạng hoặc không tồn tại.

-   Hạ tầng chỉ cho phép chạy tối đa 4 tiến trình xử lý song song.

    **Yêu cầu đầu ra**

    **A. Phân tích & đề xuất đa giải pháp**

-   Xác định rõ đầu vào / đầu ra và tính xem cần thông lượng tối thiểu bao nhiêu email mỗi giây để hoàn thành trong 2 giờ.

-   Đưa ra tối thiểu 2 giải pháp khả thi. Gợi ý hướng: (a) một hàng đợi duy nhất với nhiều tiến trình xử lý, (b) tách hàng đợi theo mức ưu tiên, (c) chia lô và xử lý theo nhóm, (d) kết hợp hàng đợi ưu tiên với giới hạn tốc độ ở tầng xử lý.

**B. So sánh & lựa chọn**

-   Lập bảng so sánh ưu điểm - nhược điểm theo ít nhất 4 tiêu chí: thông lượng đạt được, khả năng không làm chậm email giao dịch, độ khó khi cần dừng giữa chừng, chi phí hạ tầng và độ phức tạp vận hành.

-   Chốt lựa chọn một giải pháp phù hợp nhất với 3 ràng buộc nghiệp vụ, giải thích căn cứ - đặc biệt là ràng buộc 100 email mỗi giây của nhà cung cấp.

**C. Thiết kế & triển khai**

-   Thiết kế các bước thực hiện cho giải pháp đã chọn, nêu rõ cách bảo đảm không gửi trùng và cách theo dõi tiến độ.

-   Triển khai mã nguồn hoàn chỉnh, xử lý được cả hai bẫy dữ liệu nêu trên.

**3\. Đánh giá**

Để hoàn thành bài thực hành, học viên cần:

-   Có phép tính thông lượng tối thiểu cần đạt, đối chiếu với giới hạn 100 email mỗi giây.

-   Trình bày được ít nhất 2 giải pháp thực sự khác nhau về kiến trúc.

-   Bảng so sánh có tối thiểu 4 tiêu chí với nhận định cụ thể, có số liệu ước tính.

-   Lựa chọn cuối cùng biện luận được dựa trên việc không làm chậm email giao dịch.

-   Mô phỏng 10.000 email: không có địa chỉ nào nhận hai lần, email sai định dạng được tách riêng.

-   Đưa mã nguồn lên GitHub và dán link repository lên phần nộp bài trên hệ thống.
