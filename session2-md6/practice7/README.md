# [Bài tập 7 - Mức độ: Vận dụng chuyên sâu] Khung chat hỗ trợ khách hàng thời gian thực

> **Khóa học:** [FJS-MD6] Professional Backend Development & Optimization (Mã: `175`)
> **Session:** Realtime Communication with WebSocket (`session2-md6`)
> **Mã bài tập trên Portal:** `10225`
> **Mức độ:** Vận dụng chuyên sâu
> **Đường dẫn nộp bài Portal:** [Link Portal](https://portal.rikkei.edu.vn/learn/175/homework/10225)

---

**\[Bài tập 7 - Mức độ: Vận dụng chuyên sâu\] Khung chat hỗ trợ khách hàng thời gian thực**

**1\. Mục tiêu**

-   Dịch một quy trình hội thoại thực tế sang mô hình sự kiện hai chiều.

-   Thiết kế bộ sự kiện tối thiểu đủ dùng cho một phiên chat.

-   Xử lý các trạng thái trung gian của một cuộc trò chuyện.

**2\. Mô tả**

**Bối cảnh & vấn đề**

ShopFast muốn thay khung chat cũ (tải lại tin nhắn mỗi 5 giây) bằng chat thời gian thực. Mỗi phiên chat gồm một khách hàng và một nhân viên CSKH; nhân viên có thể phụ trách nhiều phiên cùng lúc.

**Yêu cầu nghiệp vụ**

-   Khách mở khung chat thì tạo phiên mới hoặc nối lại phiên đang mở của chính khách đó.

-   Tin nhắn gửi đi phải hiện ngay ở cả hai phía trong vòng dưới 1 giây.

-   Hiển thị trạng thái "đang soạn tin" khi phía bên kia gõ phím, tự tắt sau 3 giây không gõ.

-   Hiển thị dấu "đã xem" khi phía bên kia thực sự mở khung chat.

-   Nhân viên rời phiên thì khách nhận thông báo và phiên chuyển về hàng chờ.

    **Ràng buộc & bẫy dữ liệu**

-   Khách gửi tin nhắn rỗng hoặc chỉ có khoảng trắng, hoặc tin nhắn dài 20.000 ký tự.

-   Khách mở khung chat trên 2 thiết bị cùng lúc - tin nhắn phải đồng bộ trên cả hai, không bị nhân đôi.

    **Yêu cầu đầu ra**

    **A. Báo cáo phân tích và thiết kế giải pháp**

-   Phân tích bài toán (I/O): lập bảng liệt kê mọi sự kiện, ghi rõ chiều gửi (client tới server hay ngược lại), dữ liệu kèm theo và kiểu dữ liệu của từng trường.

-   Đề xuất giải pháp: trình bày ngắn gọn ý tưởng logic - dùng room như thế nào, lưu trạng thái phiên ở đâu, xử lý nhiều thiết bị của cùng một người ra sao.

-   Thiết kế các bước: vẽ lưu đồ hoặc gạch đầu dòng tuần tự vòng đời một phiên chat, từ lúc khách bấm mở tới lúc phiên đóng.

**B. Triển khai và chống lỗi**

-   Source code hoàn chỉnh, logic phải khớp với bản thiết kế ở phần A.

-   Có đoạn mã cụ thể chặn từng bẫy dữ liệu đã nêu, kèm thông báo thân thiện cho người dùng.

**3\. Đánh giá**

Để hoàn thành bài thực hành, học viên cần:

-   Báo cáo phân tích có đủ bảng sự kiện, đề xuất giải pháp và thiết kế các bước.

-   Chat hai chiều hoạt động với độ trễ dưới 1 giây, đo bằng mốc thời gian trong log.

-   Trạng thái "đang soạn tin" hiện và tự tắt đúng sau 3 giây.

-   Tin nhắn rỗng bị chặn; tin nhắn 20.000 ký tự bị từ chối với thông báo rõ ràng.

-   Mở chat trên 2 tab: tin nhắn xuất hiện đủ ở cả hai và không bị nhân đôi.

-   Đưa mã nguồn lên GitHub và dán link repository lên phần nộp bài trên hệ thống.
