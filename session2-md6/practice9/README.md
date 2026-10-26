# [Bài tập 9 - Mức độ: Sáng tạo] Trung tâm điều phối giao hàng thời gian thực

> **Khóa học:** [FJS-MD6] Professional Backend Development & Optimization (Mã: `175`)
> **Session:** Realtime Communication with WebSocket (`session2-md6`)
> **Mã bài tập trên Portal:** `10227`
> **Mức độ:** Sáng tạo
> **Đường dẫn nộp bài Portal:** [Link Portal](https://portal.rikkei.edu.vn/learn/175/homework/10227)

---

**\[Bài tập 9 - Mức độ: Sáng tạo\] Trung tâm điều phối giao hàng thời gian thực**

**1\. Mục tiêu**

-   Làm chủ vòng đời phát triển một tính năng realtime hoàn chỉnh.

-   Tự định nghĩa bài toán từ một nhu cầu mở.

-   Thiết kế kiến trúc sự kiện và luồng dữ liệu cho nhiều nhóm người dùng.

**2\. Mô tả**

**Vấn đề**

Giám đốc vận hành ShopFast nói: "Tôi muốn nhìn một màn hình là biết đơn nào đang tắc ở đâu, tài xế nào đang rảnh, và can thiệp được ngay khi cần." Yêu cầu dừng ở đó - phần còn lại do bạn định nghĩa.

**Ràng buộc kỹ thuật**

-   Hệ thống phục vụ đồng thời 3 nhóm người dùng với quyền khác nhau: khách hàng, tài xế và điều phối viên. Mỗi nhóm chỉ được nhận đúng dữ liệu thuộc phạm vi của mình.

-   Phải có ít nhất 6 loại sự kiện, trong đó tối thiểu 2 sự kiện đi từ client lên server.

-   Mọi kết nối đều phải xác thực tại thời điểm bắt tay; không có kênh nào mở tự do.

-   Mã nguồn tổ chức theo Clean Code: tách riêng gateway, tầng nghiệp vụ và phần định nghĩa hợp đồng sự kiện.

-   Hệ thống phải chịu được việc client mất kết nối bất ngờ mà không rò rỉ tài nguyên.

    **Yêu cầu đầu ra**

-   Thiết kế kiến trúc: sơ đồ các module và luồng dữ liệu, kèm bảng hợp đồng sự kiện đầy đủ (tên sự kiện, chiều gửi, dữ liệu kèm theo, ai được nhận).

-   Bản đặc tả ngắn: bạn đã thu hẹp yêu cầu mở của giám đốc thành những tình huống cụ thể nào, và vì sao chọn những tình huống đó.

-   Sản phẩm hoàn chỉnh: mã nguồn xử lý mượt mọi ngoại lệ, không crash; kèm kịch bản demo có ít nhất 3 vai người dùng hoạt động đồng thời.

**3\. Đánh giá**

Để hoàn thành bài thực hành, học viên cần:

-   Demo chạy được với đủ 3 vai người dùng mở song song, mỗi vai chỉ thấy dữ liệu thuộc phạm vi của mình.

-   Bảng hợp đồng sự kiện đầy đủ và khớp với mã nguồn thực tế.

-   Ngắt đột ngột một client bất kỳ: hệ thống vẫn chạy bình thường, tài nguyên được dọn sạch.

-   Kết nối không kèm token bị từ chối ngay tại bước bắt tay.

-   Đưa mã nguồn lên GitHub và dán link repository lên phần nộp bài trên hệ thống.
