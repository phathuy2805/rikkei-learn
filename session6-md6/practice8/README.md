# [Bài tập 8 - Mức độ: Phân tích] Chọn chiến lược triển khai cho giờ cao điểm

> **Khóa học:** [FJS-MD6] Professional Backend Development & Optimization (Mã: `175`)
> **Session:** Docker & CI/CD Pipeline (`session6-md6`)
> **Mã bài tập trên Portal:** `10246`
> **Mức độ:** Phân tích
> **Đường dẫn nộp bài Portal:** [Link Portal](https://portal.rikkei.edu.vn/learn/175/homework/10246)

---

**\[Bài tập 8 - Mức độ: Phân tích\] Chọn chiến lược triển khai cho giờ cao điểm**

**1\. Mục tiêu**

-   Nhìn bài toán triển khai dưới nhiều góc độ kỹ thuật.

-   Đánh giá đánh đổi giữa thời gian gián đoạn, chi phí hạ tầng và độ phức tạp.

-   Ra quyết định có căn cứ định lượng.

**2\. Mô tả**

**Bối cảnh & yêu cầu bài toán**

ShopFast cần triển khai bản vá gấp lúc 20h - đúng giờ cao điểm với 8.000 người dùng đang thao tác. Hiện tại API chạy trên 4 container sau một bộ cân bằng tải, mỗi container mất 25 giây để khởi động và sẵn sàng nhận request.

**Quy tắc nghiệp vụ**

-   Không được có khoảng thời gian nào mà toàn bộ hệ thống không phục vụ được.

-   Nếu phiên bản mới có lỗi, phải quay lui được trong dưới 2 phút.

-   Ngân sách hạ tầng chỉ cho phép tăng tối đa gấp đôi số container trong thời gian triển khai.

    **Ràng buộc & bẫy dữ liệu**

-   Phiên bản mới có thay đổi cấu trúc cơ sở dữ liệu, và trong lúc triển khai sẽ có cả phiên bản cũ lẫn mới cùng chạy.

-   Người dùng đang có kết nối realtime mở - triển khai không được làm mất kết nối đột ngột của họ.

    **Yêu cầu đầu ra**

    **A. Phân tích & đề xuất đa giải pháp**

-   Xác định rõ đầu vào / đầu ra và tính xem mỗi chiến lược cần bao nhiêu container và mất bao lâu để hoàn tất.

-   Đưa ra tối thiểu 2 giải pháp khả thi. Gợi ý hướng: (a) dừng hết rồi khởi động bản mới, (b) thay thế cuốn chiếu từng container, (c) dựng song song hai môi trường rồi chuyển luồng, (d) phát hành dần cho một phần nhỏ người dùng trước.

**B. So sánh & lựa chọn**

-   Lập bảng so sánh ưu điểm - nhược điểm theo ít nhất 4 tiêu chí: thời gian gián đoạn dịch vụ, số container cần thêm, thời gian quay lui, mức độ phức tạp khi có thay đổi cấu trúc cơ sở dữ liệu.

-   Chốt lựa chọn một giải pháp phù hợp nhất với 3 ràng buộc nghiệp vụ, giải thích căn cứ - đặc biệt là ràng buộc ngân sách tăng tối đa gấp đôi.

**C. Thiết kế & triển khai**

-   Thiết kế các bước thực hiện cho giải pháp đã chọn, nêu rõ cách xử lý thay đổi cấu trúc cơ sở dữ liệu khi hai phiên bản cùng chạy.

-   Triển khai cấu hình hoàn chỉnh, xử lý được cả hai bẫy dữ liệu nêu trên.

**3\. Đánh giá**

Để hoàn thành bài thực hành, học viên cần:

-   Có phép tính cụ thể về số container cần thêm và thời gian hoàn tất cho từng chiến lược.

-   Trình bày được ít nhất 2 chiến lược thực sự khác nhau về nguyên lý.

-   Bảng so sánh có tối thiểu 4 tiêu chí với nhận định cụ thể.

-   Lựa chọn cuối cùng biện luận được dựa trên ràng buộc ngân sách và yêu cầu quay lui dưới 2 phút.

-   Có phương án rõ ràng cho việc thay đổi cấu trúc cơ sở dữ liệu tương thích ngược khi hai phiên bản cùng chạy.

-   Đưa mã nguồn lên GitHub và dán link repository lên phần nộp bài trên hệ thống.
