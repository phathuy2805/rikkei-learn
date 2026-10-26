# [Bài tập 9 - Mức độ: Sáng tạo] Trung tâm điều hành tác vụ nền của ShopFast

> **Khóa học:** [FJS-MD6] Professional Backend Development & Optimization (Mã: `175`)
> **Session:** Background Jobs & BullMQ (`session5-md6`)
> **Mã bài tập trên Portal:** `10242`
> **Mức độ:** Sáng tạo
> **Đường dẫn nộp bài Portal:** [Link Portal](https://portal.rikkei.edu.vn/learn/175/homework/10242)

---

**\[Bài tập 9 - Mức độ: Sáng tạo\] Trung tâm điều hành tác vụ nền của ShopFast**

**1\. Mục tiêu**

-   Làm chủ vòng đời thiết kế một hệ thống xử lý nền hoàn chỉnh.

-   Tự định nghĩa bài toán từ một nhu cầu mở.

-   Thiết kế kiến trúc hàng đợi và luồng dữ liệu cho nhiều loại tác vụ.

**2\. Mô tả**

**Vấn đề**

Giám đốc kỹ thuật ShopFast nói: "Chúng ta có hàng chục việc chạy nền nhưng không ai biết cái nào đang chạy, cái nào đã chết. Tháng trước mất 3 ngày mới phát hiện job đồng bộ tồn kho đã dừng từ lâu." Yêu cầu dừng ở đó - phần còn lại do bạn định nghĩa.

**Ràng buộc kỹ thuật**

-   Hệ thống phải quản lý tối thiểu 4 hàng đợi có đặc tính khác nhau: việc gấp cần đi ngay, việc nặng chạy lâu, việc chạy theo lịch định kỳ, và việc xử lý hàng loạt số lượng lớn.

-   Mỗi hàng đợi có cấu hình riêng về số lần thử, chiến lược giãn dần, mức độ song song và giới hạn tốc độ, kèm lý giải.

-   Phải có bảng theo dõi hiển thị số công việc đang chờ, đang chạy, đã hoàn tất và đã thất bại của từng hàng đợi.

-   Phải có cơ chế cảnh báo khi một hàng đợi ùn tắc quá ngưỡng hoặc khi tỉ lệ thất bại vượt mức cho phép.

-   Mọi tác vụ đều phải bất biến khi lặp: chạy lại một công việc không được gây tác dụng phụ nhân đôi.

-   Mã nguồn tổ chức theo Clean Code: tách riêng định nghĩa hàng đợi, logic nghiệp vụ và phần cấu hình.

    **Yêu cầu đầu ra**

-   Thiết kế kiến trúc: sơ đồ các hàng đợi và luồng dữ liệu, kèm bảng liệt kê từng hàng đợi với mục đích, cấu hình và lý do lựa chọn cấu hình đó.

-   Bản đặc tả ngắn: bạn đã thu hẹp yêu cầu mở thành những tác vụ cụ thể nào, và vì sao chọn những tác vụ đó.

-   Sản phẩm hoàn chỉnh: mã nguồn xử lý mượt mọi ngoại lệ, không crash; kèm kịch bản demo cho thấy bảng theo dõi hoạt động và cảnh báo được kích hoạt khi hàng đợi ùn tắc.

**3\. Đánh giá**

Để hoàn thành bài thực hành, học viên cần:

-   Đủ 4 hàng đợi với cấu hình riêng biệt và lý giải thuyết phục cho từng lựa chọn.

-   Bảng theo dõi hiển thị đúng số liệu của cả 4 hàng đợi theo thời gian thực.

-   Demo kích hoạt được cảnh báo bằng cách cố tình làm ùn tắc một hàng đợi.

-   Chạy lại bất kỳ công việc nào cũng không gây tác dụng phụ nhân đôi.

-   Tắt tiến trình xử lý giữa chừng: không có công việc nào bị mất.

-   Đưa mã nguồn lên GitHub và dán link repository lên phần nộp bài trên hệ thống.
