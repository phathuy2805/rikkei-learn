# [Bài tập 9 - Mức độ: Sáng tạo] Nền tảng triển khai tự động cho ShopFast

> **Khóa học:** [FJS-MD6] Professional Backend Development & Optimization (Mã: `175`)
> **Session:** Docker & CI/CD Pipeline (`session6-md6`)
> **Mã bài tập trên Portal:** `10247`
> **Mức độ:** Sáng tạo
> **Đường dẫn nộp bài Portal:** [Link Portal](https://portal.rikkei.edu.vn/learn/175/homework/10247)

---

**\[Bài tập 9 - Mức độ: Sáng tạo\] Nền tảng triển khai tự động cho ShopFast**

**1\. Mục tiêu**

-   Làm chủ vòng đời thiết kế một hệ thống tự động hoá hoàn chỉnh.

-   Tự định nghĩa bài toán từ một nhu cầu mở.

-   Thiết kế kiến trúc pipeline và luồng dữ liệu từ mã nguồn tới môi trường thật.

**2\. Mô tả**

**Vấn đề**

Giám đốc kỹ thuật ShopFast nói: "Mỗi lần triển khai là một buổi tối căng thẳng, và không ai dám đụng vào hệ thống chiều thứ Sáu. Tôi muốn triển khai trở thành việc nhàm chán." Yêu cầu dừng ở đó - phần còn lại do bạn định nghĩa.

**Ràng buộc kỹ thuật**

-   Pipeline phải có tối thiểu 5 giai đoạn riêng biệt, mỗi giai đoạn có tiêu chí thành công rõ ràng.

-   Phải có ít nhất một cổng kiểm soát chất lượng tự động chặn mã không đạt chuẩn, ví dụ ngưỡng độ phủ kiểm thử hoặc quét lỗ hổng bảo mật.

-   Mọi bí mật đều phải quản lý bằng cơ chế bí mật của nền tảng, không có giá trị nhạy cảm nào trong mã nguồn.

-   Phải có cơ chế quay lui tự động khi phát hiện lỗi sau triển khai, kèm tiêu chí phát hiện lỗi cụ thể.

-   Toàn bộ pipeline chạy xong trong dưới 10 phút.

-   Cấu hình tổ chức rõ ràng: tách phần dùng chung, phần riêng cho từng môi trường và phần biến số.

    **Yêu cầu đầu ra**

-   Thiết kế kiến trúc: sơ đồ toàn bộ pipeline từ commit tới môi trường thật, kèm bảng liệt kê từng giai đoạn với đầu vào, đầu ra, tiêu chí thành công và hành động khi thất bại.

-   Bản đặc tả ngắn: bạn đã thu hẹp yêu cầu mở thành những giai đoạn và cổng kiểm soát nào, và vì sao chọn những thứ đó.

-   Sản phẩm hoàn chỉnh: cấu hình pipeline chạy được thật; kèm kịch bản demo gồm một lần triển khai thành công, một lần bị cổng kiểm soát chặn, và một lần quay lui tự động.

**3\. Đánh giá**

Để hoàn thành bài thực hành, học viên cần:

-   Đủ 5 giai đoạn với tiêu chí thành công rõ ràng cho từng giai đoạn.

-   Demo được cả ba kịch bản: triển khai thành công, bị chặn bởi cổng kiểm soát, và quay lui tự động.

-   Toàn bộ pipeline chạy xong dưới 10 phút, chứng minh bằng lịch sử chạy thật.

-   Không có giá trị nhạy cảm nào trong mã nguồn, kiểm chứng bằng công cụ quét bí mật.

-   Đưa mã nguồn lên GitHub và dán link repository lên phần nộp bài trên hệ thống.
