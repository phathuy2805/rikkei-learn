# [Bài tập 9 - Mức độ: Sáng tạo] Trợ lý vận hành ShopFast

> **Khóa học:** [FJS-MD6] Professional Backend Development & Optimization (Mã: `175`)
> **Session:** AI Agent Fundamentals: Flow, Tools & Prompting (`session1-md6`)
> **Mã bài tập trên Portal:** `10222`
> **Mức độ:** Sáng tạo
> **Đường dẫn nộp bài Portal:** [Link Portal](https://portal.rikkei.edu.vn/learn/175/homework/10222)

---

**\[Bài tập 9 - Mức độ: Sáng tạo\] Trợ lý vận hành ShopFast**

**1\. Mục tiêu**

-   Làm chủ vòng đời phát triển một tính năng agent từ đầu tới cuối.

-   Tự định nghĩa bài toán từ một nhu cầu mở của khách hàng.

-   Thiết kế kiến trúc module và luồng dữ liệu cho hệ thống.

**2\. Mô tả**

**Vấn đề**

Giám đốc vận hành ShopFast nói: "Buổi sáng tôi mất một tiếng để biết đêm qua có gì bất thường. Tôi muốn hỏi một câu là ra vấn đề, và nếu cần thì xử lý luôn." Yêu cầu dừng ở đó - phần còn lại do bạn định nghĩa.

**Ràng buộc kỹ thuật**

-   Agent phải có tối thiểu 4 tool, trong đó ít nhất 1 tool ghi dữ liệu và ít nhất 1 tool tổng hợp số liệu.

-   Mọi thao tác ghi dữ liệu phải đi qua một bước xác nhận của con người trước khi thực hiện.

-   Mã nguồn tổ chức theo Clean Code: tách riêng phần định nghĩa tool, phần thực thi nghiệp vụ và phần điều phối agent.

-   Agent không được chạy quá 8 vòng lặp cho một yêu cầu.

    **Yêu cầu đầu ra**

-   Thiết kế kiến trúc: sơ đồ các module cần có và luồng dữ liệu giữa chúng, kèm bảng liệt kê từng tool với mục đích, tham số vào và dữ liệu ra.

-   Bản đặc tả ngắn: bạn đã thu hẹp yêu cầu mở của giám đốc thành những tình huống cụ thể nào, và vì sao chọn những tình huống đó.

-   Sản phẩm hoàn chỉnh: mã nguồn xử lý mượt mọi ngoại lệ, không crash, giao tiếp thân thiện; kèm kịch bản demo gồm ít nhất 3 câu hỏi khác nhau.

**3\. Đánh giá**

Để hoàn thành bài thực hành, học viên cần:

-   Agent trả lời trọn vẹn cả 3 kịch bản demo do bạn thiết kế.

-   Thao tác ghi dữ liệu luôn chờ xác nhận, không tự động thực hiện.

-   Cấu trúc thư mục tách bạch định nghĩa tool / nghiệp vụ / điều phối.

-   Thử nhập một câu hỏi vô nghĩa hoặc rỗng, hệ thống vẫn phản hồi lịch sự và không crash.

-   Đưa mã nguồn lên GitHub và dán link repository lên phần nộp bài trên hệ thống.
