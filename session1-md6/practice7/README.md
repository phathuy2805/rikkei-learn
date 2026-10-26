# [Bài tập 7 - Mức độ: Vận dụng chuyên sâu] Agent tự phục vụ đổi địa chỉ giao hàng

> **Khóa học:** [FJS-MD6] Professional Backend Development & Optimization (Mã: `175`)
> **Session:** AI Agent Fundamentals: Flow, Tools & Prompting (`session1-md6`)
> **Mã bài tập trên Portal:** `10220`
> **Mức độ:** Vận dụng chuyên sâu
> **Đường dẫn nộp bài Portal:** [Link Portal](https://portal.rikkei.edu.vn/learn/175/homework/10220)

---

**\[Bài tập 7 - Mức độ: Vận dụng chuyên sâu\] Agent tự phục vụ đổi địa chỉ giao hàng**

**1\. Mục tiêu**

-   Dịch một quy trình nghiệp vụ thực tế sang luồng agent.

-   Thiết kế bộ tool tối thiểu đủ dùng, không thừa không thiếu.

-   Bảo vệ thao tác ghi dữ liệu bằng điều kiện nghiệp vụ.

**2\. Mô tả**

**Bối cảnh & vấn đề**

Mỗi ngày ShopFast nhận ~400 yêu cầu đổi địa chỉ giao hàng. Nhân viên phải mở 3 màn hình để xử lý một yêu cầu, trung bình mất 4 phút. Ban vận hành muốn một agent tự làm việc này qua hội thoại.

**Yêu cầu nghiệp vụ**

-   Chỉ đơn ở trạng thái  `CHO\_XAC\_NHAN`  hoặc  `DANG\_CHUAN\_BI`  mới được đổi địa chỉ.

-   Đơn đã ở trạng thái  `DANG\_GIAO`  hoặc  `DA\_GIAO`  thì từ chối, và hướng dẫn khách liên hệ tổng đài.

-   Địa chỉ mới phải cùng tỉnh/thành với địa chỉ cũ; khác tỉnh thì phải huỷ đơn và đặt lại.

-   Mỗi đơn chỉ được đổi địa chỉ tối đa 1 lần.

    **Ràng buộc & bẫy dữ liệu**

-   Khách nhập địa chỉ chỉ có mỗi khoảng trắng, hoặc thiếu tên tỉnh/thành.

-   Khách yêu cầu đổi địa chỉ cho một đơn không thuộc về họ - agent phải kiểm tra quyền sở hữu trước khi ghi dữ liệu.

    **Yêu cầu đầu ra**

    **A. Báo cáo phân tích và thiết kế giải pháp**

-   Phân tích bài toán (I/O): liệt kê dữ liệu đầu vào cần có, kiểu dữ liệu của từng trường, và kết quả đầu ra mong đợi ở cả nhánh thành công lẫn nhánh từ chối.

-   Đề xuất giải pháp: trình bày ngắn gọn ý tưởng logic - agent cần bao nhiêu tool, mỗi tool chịu trách nhiệm gì, tool nào chỉ đọc và tool nào ghi dữ liệu.

-   Thiết kế các bước: vẽ lưu đồ hoặc gạch đầu dòng tuần tự luồng xử lý từ lúc khách nhắn tới lúc agent xác nhận, thể hiện rõ các điểm rẽ nhánh theo trạng thái đơn.

**B. Triển khai và chống lỗi**

-   Source code hoàn chỉnh, logic phải khớp với các bước đã thiết kế ở phần A.

-   Có đoạn mã cụ thể chặn từng bẫy dữ liệu đã nêu, kèm thông báo thân thiện cho khách.

**3\. Đánh giá**

Để hoàn thành bài thực hành, học viên cần:

-   Báo cáo phân tích có đủ 3 mục I/O, đề xuất giải pháp và thiết kế các bước.

-   Luồng code chạy đúng với bản thiết kế đã nộp (đối chiếu được từng bước).

-   Đơn  `DANG\_GIAO`  bị từ chối đổi địa chỉ với thông báo rõ ràng.

-   Địa chỉ khác tỉnh và địa chỉ rỗng đều bị chặn, hệ thống không crash.

-   Đơn đã đổi 1 lần thì lần thứ hai bị từ chối.

-   Đưa mã nguồn lên GitHub và dán link repository lên phần nộp bài trên hệ thống.
