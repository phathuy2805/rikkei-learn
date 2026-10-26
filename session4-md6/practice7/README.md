# [Bài tập 7 - Mức độ: Vận dụng chuyên sâu] Tầng bộ nhớ đệm cho trang danh mục có bộ lọc

> **Khóa học:** [FJS-MD6] Professional Backend Development & Optimization (Mã: `175`)
> **Session:** Redis Caching Fundamentals (`session4-md6`)
> **Mã bài tập trên Portal:** `10235`
> **Mức độ:** Vận dụng chuyên sâu
> **Đường dẫn nộp bài Portal:** [Link Portal](https://portal.rikkei.edu.vn/learn/175/homework/10235)

---

**\[Bài tập 7 - Mức độ: Vận dụng chuyên sâu\] Tầng bộ nhớ đệm cho trang danh mục có bộ lọc**

**1\. Mục tiêu**

-   Dịch một yêu cầu hiển thị phức tạp sang chiến lược lưu đệm.

-   Thiết kế cấu trúc khoá cho dữ liệu có nhiều tham số.

-   Xử lý vô hiệu hoá theo nhóm khi dữ liệu nguồn thay đổi.

**2\. Mô tả**

**Bối cảnh & vấn đề**

Trang danh mục ShopFast cho phép lọc theo danh mục, khoảng giá, thương hiệu và sắp xếp theo 3 tiêu chí, có phân trang. Mỗi lần tải mất 800 mili giây vì truy vấn tổng hợp nặng. Lưu lượng giờ cao điểm là 3.000 lượt xem mỗi phút.

**Yêu cầu nghiệp vụ**

-   Kết quả lọc phải được lưu đệm để lần sau trả về dưới 20 mili giây.

-   Khi một sản phẩm thay đổi giá hoặc tồn kho, mọi kết quả lọc chứa sản phẩm đó phải được làm mới.

-   Chỉ lưu đệm 3 trang đầu của mỗi tổ hợp lọc; từ trang 4 trở đi truy vấn thẳng cơ sở dữ liệu vì rất ít người xem.

-   Dữ liệu tồn kho được phép trễ tối đa 60 giây; giá thì phải chính xác tuyệt đối.

    **Ràng buộc & bẫy dữ liệu**

-   Người dùng gửi tham số lọc theo thứ tự khác nhau nhưng nội dung giống hệt - phải nhận ra là cùng một truy vấn, không tạo hai bản ghi đệm khác nhau.

-   Kẻ tấn công gửi hàng nghìn tổ hợp lọc vô nghĩa để làm phình bộ nhớ đệm.

    **Yêu cầu đầu ra**

    **A. Báo cáo phân tích và thiết kế giải pháp**

-   Phân tích bài toán (I/O): xác định rõ dữ liệu đầu vào ảnh hưởng tới kết quả, kiểu dữ liệu từng tham số, và cấu trúc dữ liệu đầu ra được lưu đệm.

-   Đề xuất giải pháp: trình bày ngắn gọn ý tưởng logic - cách sinh khoá từ tập tham số, thời gian sống cho từng loại dữ liệu, cách nhóm khoá để vô hiệu hoá hàng loạt.

-   Thiết kế các bước: vẽ lưu đồ hoặc gạch đầu dòng tuần tự luồng xử lý một request danh mục, và luồng xử lý khi một sản phẩm được cập nhật.

**B. Triển khai và chống lỗi**

-   Source code hoàn chỉnh, logic phải khớp với bản thiết kế ở phần A.

-   Có đoạn mã cụ thể chặn từng bẫy dữ liệu đã nêu, kèm cơ chế giới hạn tổng số khoá được sinh ra.

**3\. Đánh giá**

Để hoàn thành bài thực hành, học viên cần:

-   Báo cáo phân tích có đủ 3 mục I/O, đề xuất giải pháp và thiết kế các bước.

-   Lần gọi thứ hai với cùng bộ lọc trả về dưới 20 mili giây, đo bằng công cụ tạo tải.

-   Cập nhật giá một sản phẩm làm mới đúng các kết quả lọc chứa sản phẩm đó.

-   Gửi cùng bộ lọc với thứ tự tham số khác nhau cho ra cùng một khoá, kiểm chứng bằng lệnh liệt kê khoá.

-   Trang 4 trở đi không sinh ra bản ghi đệm nào.

-   Đưa mã nguồn lên GitHub và dán link repository lên phần nộp bài trên hệ thống.
