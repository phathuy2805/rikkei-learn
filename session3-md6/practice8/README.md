# [Bài tập 8 - Mức độ: Phân tích] Chọn thuật toán giới hạn cho cổng thanh toán

> **Khóa học:** [FJS-MD6] Professional Backend Development & Optimization (Mã: `175`)
> **Session:** API Rate Limiting in Nest.js (`session3-md6`)
> **Mã bài tập trên Portal:** `10231`
> **Mức độ:** Phân tích
> **Đường dẫn nộp bài Portal:** [Link Portal](https://portal.rikkei.edu.vn/learn/175/homework/10231)

---

**\[Bài tập 8 - Mức độ: Phân tích\] Chọn thuật toán giới hạn cho cổng thanh toán**

**1\. Mục tiêu**

-   Nhìn bài toán giới hạn dưới nhiều góc độ thuật toán.

-   Đánh giá đánh đổi giữa độ chính xác, bộ nhớ và khả năng chịu tải đột biến.

-   Ra quyết định có căn cứ định lượng.

**2\. Mô tả**

**Bối cảnh & yêu cầu bài toán**

Cổng thanh toán của ShopFast xử lý 2.000 request/giây vào giờ bình thường. Đối tác ngân hàng quy định ShopFast không được gửi quá 3.000 request/giây sang hệ thống của họ, vượt ngưỡng sẽ bị cắt kết nối trong 15 phút.

**Quy tắc nghiệp vụ**

-   Tuyệt đối không được vượt 3.000 request/giây trong bất kỳ giây nào.

-   Giao dịch bị từ chối vì quá tải gây thiệt hại doanh thu, nên cần giảm thiểu tối đa số lần chặn oan.

-   Hệ thống chạy trên 6 tiến trình phân tán sau bộ cân bằng tải.

    **Ràng buộc & bẫy dữ liệu**

-   Khung 20h-22h có đợt tăng đột biến ngắn lên tới 2,5 lần lưu lượng bình thường trong khoảng 30 giây.

-   Bộ nhớ cấp cho tiến trình giới hạn tần suất chỉ có 256MB.

    **Yêu cầu đầu ra**

    **A. Phân tích & đề xuất đa giải pháp**

-   Xác định rõ đầu vào / đầu ra và đặc điểm quan trọng nhất của bài toán này.

-   Đưa ra tối thiểu 2 giải pháp khả thi. Gợi ý hướng: (a) cửa sổ cố định, (b) nhật ký cửa sổ trượt, (c) bộ đếm cửa sổ trượt, (d) gáo token, (e) gáo rò.

**B. So sánh & lựa chọn**

-   Lập bảng so sánh ưu điểm - nhược điểm theo ít nhất 4 tiêu chí: độ chính xác tại biên, bộ nhớ tiêu tốn cho 100.000 khoá, khả năng cho phép tăng đột biến ngắn, độ phức tạp khi chạy phân tán.

-   Chốt lựa chọn một giải pháp phù hợp nhất với 3 ràng buộc nghiệp vụ đã nêu, giải thích căn cứ - đặc biệt là đợt tăng đột biến 20h-22h và giới hạn 256MB.

**C. Thiết kế & triển khai**

-   Thiết kế các bước thực hiện cho giải pháp đã chọn, nêu rõ cách đồng bộ bộ đếm giữa 6 tiến trình.

-   Triển khai mã nguồn hoàn chỉnh, xử lý được cả hai bẫy dữ liệu nêu trên.

**3\. Đánh giá**

Để hoàn thành bài thực hành, học viên cần:

-   Trình bày được ít nhất 2 thuật toán thực sự khác nhau về nguyên lý hoạt động.

-   Bảng so sánh có tối thiểu 4 tiêu chí; phần bộ nhớ có phép tính ước lượng cụ thể.

-   Lựa chọn cuối cùng biện luận được dựa trên yêu cầu chịu tăng đột biến và giới hạn bộ nhớ.

-   Có phương án rõ ràng cho việc đồng bộ bộ đếm giữa 6 tiến trình.

-   Đưa mã nguồn lên GitHub và dán link repository lên phần nộp bài trên hệ thống.
