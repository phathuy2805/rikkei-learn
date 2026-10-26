# [Bài tập 7 - Mức độ: Vận dụng chuyên sâu] Pipeline nhiều môi trường cho ShopFast

> **Khóa học:** [FJS-MD6] Professional Backend Development & Optimization (Mã: `175`)
> **Session:** Docker & CI/CD Pipeline (`session6-md6`)
> **Mã bài tập trên Portal:** `10245`
> **Mức độ:** Vận dụng chuyên sâu
> **Đường dẫn nộp bài Portal:** [Link Portal](https://portal.rikkei.edu.vn/learn/175/homework/10245)

---

**\[Bài tập 7 - Mức độ: Vận dụng chuyên sâu\] Pipeline nhiều môi trường cho ShopFast**

**1\. Mục tiêu**

-   Dịch một quy trình làm việc của đội sang cấu hình tự động hoá.

-   Thiết kế luồng triển khai phân tầng theo nhánh.

-   Bảo đảm khả năng quay lui khi có sự cố.

**2\. Mô tả**

**Bối cảnh & vấn đề**

Đội ShopFast có 6 lập trình viên, mỗi ngày tạo khoảng 10 yêu cầu hợp nhất mã. Hiện mọi thứ đều triển khai bằng tay và không ai dám triển khai vào chiều thứ Sáu. Trưởng nhóm muốn một quy trình tự động cho ba môi trường.

**Yêu cầu nghiệp vụ**

-   Mọi yêu cầu hợp nhất mã đều phải chạy kiểm tra định dạng, kiểm thử đơn vị và kiểm thử tích hợp; thất bại thì khoá nút hợp nhất.

-   Mã hợp nhất vào nhánh phát triển thì tự động triển khai lên môi trường thử nghiệm.

-   Mã hợp nhất vào nhánh chính thì build image, đẩy lên kho và chờ một người có thẩm quyền phê duyệt trước khi triển khai lên môi trường thật.

-   Mọi image đều phải gắn thẻ theo mã commit để quay lui được về bất kỳ phiên bản nào.

-   Phải có quy trình quay lui chạy được trong dưới 3 phút.

    **Ràng buộc & bẫy dữ liệu**

-   Hai yêu cầu hợp nhất mã được gộp gần như cùng lúc - không được để hai lần triển khai chạy chồng lên nhau.

-   Bước chạy chuyển đổi cấu trúc cơ sở dữ liệu thất bại giữa chừng - phải có phương án xử lý, không để hệ thống ở trạng thái nửa vời.

    **Yêu cầu đầu ra**

    **A. Báo cáo phân tích và thiết kế giải pháp**

-   Phân tích bài toán (I/O): lập bảng liệt kê từng sự kiện kích hoạt (đẩy mã lên nhánh nào, tạo yêu cầu hợp nhất), các công việc được chạy tương ứng và kết quả đầu ra mong đợi.

-   Đề xuất giải pháp: trình bày ngắn gọn ý tưởng logic - chia bao nhiêu công việc, phụ thuộc giữa chúng ra sao, quản lý bí mật và biến môi trường theo từng môi trường thế nào.

-   Thiết kế các bước: vẽ lưu đồ hoặc gạch đầu dòng tuần tự toàn bộ luồng từ lúc lập trình viên đẩy mã tới lúc mã chạy trên môi trường thật, thể hiện rõ các điểm rẽ nhánh và điểm chờ phê duyệt.

**B. Triển khai và chống lỗi**

-   Source code hoàn chỉnh của tệp cấu hình quy trình, logic phải khớp với bản thiết kế ở phần A.

-   Có cấu hình cụ thể chặn từng bẫy dữ liệu đã nêu, kèm tài liệu mô tả quy trình quay lui.

**3\. Đánh giá**

Để hoàn thành bài thực hành, học viên cần:

-   Báo cáo phân tích có đủ bảng sự kiện kích hoạt, đề xuất giải pháp và thiết kế các bước.

-   Yêu cầu hợp nhất mã có kiểm thử thất bại bị khoá nút hợp nhất.

-   Hợp nhất vào nhánh phát triển tự động triển khai lên môi trường thử nghiệm.

-   Hợp nhất vào nhánh chính dừng lại chờ phê duyệt trước khi triển khai môi trường thật.

-   Mọi image đều có thẻ theo mã commit, chứng minh bằng danh sách image trên kho lưu trữ.

-   Thực hiện được một lần quay lui trong dưới 3 phút và ghi lại thời gian.

-   Đưa mã nguồn lên GitHub và dán link repository lên phần nộp bài trên hệ thống.
