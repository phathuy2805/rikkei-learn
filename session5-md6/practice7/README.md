# [Bài tập 7 - Mức độ: Vận dụng chuyên sâu] Dây chuyền xử lý đơn hàng nhiều bước

> **Khóa học:** [FJS-MD6] Professional Backend Development & Optimization (Mã: `175`)
> **Session:** Background Jobs & BullMQ (`session5-md6`)
> **Mã bài tập trên Portal:** `10240`
> **Mức độ:** Vận dụng chuyên sâu
> **Đường dẫn nộp bài Portal:** [Link Portal](https://portal.rikkei.edu.vn/learn/175/homework/10240)

---

**\[Bài tập 7 - Mức độ: Vận dụng chuyên sâu\] Dây chuyền xử lý đơn hàng nhiều bước**

**1\. Mục tiêu**

-   Dịch một quy trình nghiệp vụ nhiều bước sang chuỗi công việc nền.

-   Thiết kế phụ thuộc giữa các công việc và xử lý thất bại từng bước.

-   Bảo đảm trạng thái đơn hàng luôn phản ánh đúng tiến độ thực tế.

**2\. Mô tả**

**Bối cảnh & vấn đề**

Sau khi khách đặt hàng thành công, ShopFast cần chạy một dây chuyền 5 bước ở nền. Hiện tại toàn bộ đang chạy tuần tự trong một hàm khổng lồ, một bước lỗi là cả dây chuyền dừng và không ai biết nó dừng ở đâu.

**Yêu cầu nghiệp vụ**

-   Bước 1 - giữ hàng trong kho. Nếu hết hàng thì huỷ đơn và hoàn tiền, các bước sau không chạy.

-   Bước 2 - xác nhận thanh toán với cổng thanh toán. Thất bại thì trả hàng về kho rồi huỷ đơn.

-   Bước 3 - xuất hoá đơn điện tử. Thất bại thì thử lại tối đa 5 lần, vẫn hỏng thì báo kế toán xử lý tay nhưng đơn vẫn tiếp tục.

-   Bước 4 - gửi email và tin nhắn cho khách. Thất bại không ảnh hưởng tới đơn.

-   Bước 5 - đẩy đơn sang hệ thống vận chuyển của đối tác.

-   Trạng thái đơn hàng phải được cập nhật sau mỗi bước để khách tra cứu được tiến độ.

    **Ràng buộc & bẫy dữ liệu**

-   Bước 2 gọi cổng thanh toán bị hết thời gian chờ nhưng thực tế tiền đã bị trừ - không được trừ tiền lần hai khi thử lại.

-   Toàn bộ tiến trình xử lý bị khởi động lại giữa dây chuyền - phải tiếp tục được từ bước đang dở, không chạy lại từ đầu.

    **Yêu cầu đầu ra**

    **A. Báo cáo phân tích và thiết kế giải pháp**

-   Phân tích bài toán (I/O): lập bảng cho từng bước, ghi rõ dữ liệu đầu vào, kết quả đầu ra, hành động khi thành công và hành động khi thất bại.

-   Đề xuất giải pháp: trình bày ngắn gọn ý tưởng logic - dùng bao nhiêu hàng đợi, các bước nối với nhau bằng cách nào, trạng thái đơn được cập nhật ở đâu.

-   Thiết kế các bước: vẽ lưu đồ hoặc gạch đầu dòng tuần tự toàn bộ dây chuyền, thể hiện rõ các nhánh rẽ khi từng bước thất bại.

**B. Triển khai và chống lỗi**

-   Source code hoàn chỉnh, logic phải khớp với bản thiết kế ở phần A.

-   Có đoạn mã cụ thể chặn từng bẫy dữ liệu đã nêu, đặc biệt là cơ chế chống trừ tiền hai lần.

**3\. Đánh giá**

Để hoàn thành bài thực hành, học viên cần:

-   Báo cáo phân tích có đủ bảng 5 bước, đề xuất giải pháp và thiết kế các bước.

-   Kịch bản hết hàng ở bước 1: đơn bị huỷ, các bước sau không chạy, khách được hoàn tiền.

-   Kịch bản lỗi ở bước 4: đơn vẫn hoàn tất và đẩy được sang hệ thống vận chuyển.

-   Gọi thanh toán bị hết thời gian chờ rồi thử lại: tiền chỉ bị trừ đúng một lần.

-   Khởi động lại tiến trình giữa dây chuyền: quá trình tiếp tục từ bước đang dở.

-   Trạng thái đơn tra cứu được và phản ánh đúng bước hiện tại.

-   Đưa mã nguồn lên GitHub và dán link repository lên phần nộp bài trên hệ thống.
