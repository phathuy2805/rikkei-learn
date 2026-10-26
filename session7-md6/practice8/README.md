# [Bài tập 8 - Mức độ: Phân tích] Chọn cơ chế xác thực cho ứng dụng chạy trên máy chủ

> **Khóa học:** [FJS-MD6] Professional Backend Development & Optimization (Mã: `175`)
> **Session:** AWS Account & IAM Management (`session7-md6`)
> **Mã bài tập trên Portal:** `10251`
> **Mức độ:** Phân tích
> **Đường dẫn nộp bài Portal:** [Link Portal](https://portal.rikkei.edu.vn/learn/175/homework/10251)

---

**\[Bài tập 8 - Mức độ: Phân tích\] Chọn cơ chế xác thực cho ứng dụng chạy trên máy chủ**

**1\. Mục tiêu**

-   Nhìn bài toán quản lý thông tin xác thực dưới nhiều góc độ.

-   Đánh giá đánh đổi giữa mức độ an toàn, độ phức tạp và chi phí vận hành.

-   Ra quyết định có căn cứ định lượng.

**2\. Mô tả**

**Bối cảnh & yêu cầu bài toán**

Ứng dụng ShopFast chạy trên máy chủ trong cloud, cần truy cập kho lưu trữ đối tượng để ghi hoá đơn PDF và cần đọc bí mật kết nối cơ sở dữ liệu. Đội ngũ đang tranh luận nên dùng cơ chế xác thực nào.

**Quy tắc nghiệp vụ**

-   Nếu máy chủ bị xâm nhập, thiệt hại phải giới hạn ở mức thấp nhất có thể.

-   Không được để việc xoay vòng thông tin xác thực gây gián đoạn dịch vụ.

-   Đội chỉ có 3 kỹ sư vận hành, không đủ người cho quy trình thủ công phức tạp.

    **Ràng buộc & bẫy dữ liệu**

-   Ứng dụng cũng cần chạy được trên máy cá nhân của lập trình viên để phát triển.

-   Có một tác vụ chạy định kỳ trên máy chủ ngoài cloud, không thể gắn Role trực tiếp.

    **Yêu cầu đầu ra**

    **A. Phân tích & đề xuất đa giải pháp**

-   Xác định rõ đầu vào / đầu ra và liệt kê đầy đủ các nơi ứng dụng cần thông tin xác thực.

-   Đưa ra tối thiểu 2 giải pháp khả thi. Gợi ý hướng: (a) khoá truy cập dài hạn trong biến môi trường, (b) Role gắn vào máy chủ, (c) dịch vụ quản lý bí mật tập trung, (d) kết hợp Role với dịch vụ quản lý bí mật.

**B. So sánh & lựa chọn**

-   Lập bảng so sánh ưu điểm - nhược điểm theo ít nhất 4 tiêu chí: mức độ thiệt hại khi máy chủ bị xâm nhập, công sức xoay vòng thông tin xác thực, khả năng dùng chung cho cả môi trường phát triển, chi phí và độ phức tạp vận hành.

-   Chốt lựa chọn một giải pháp phù hợp nhất với 3 ràng buộc nghiệp vụ, giải thích căn cứ - đặc biệt là ràng buộc chỉ có 3 kỹ sư vận hành.

**C. Thiết kế & triển khai**

-   Thiết kế các bước thực hiện cho giải pháp đã chọn, nêu rõ cách xử lý cả hai bẫy dữ liệu.

-   Triển khai cấu hình hoàn chỉnh kèm mã nguồn minh hoạ cách ứng dụng lấy thông tin xác thực.

**3\. Đánh giá**

Để hoàn thành bài thực hành, học viên cần:

-   Liệt kê đầy đủ các nơi cần thông tin xác thực, bao gồm cả trường hợp máy chủ ngoài cloud.

-   Trình bày được ít nhất 2 giải pháp thực sự khác nhau về nguyên lý.

-   Bảng so sánh có tối thiểu 4 tiêu chí với nhận định cụ thể.

-   Lựa chọn cuối cùng biện luận được dựa trên ràng buộc nhân lực vận hành hạn chế.

-   Có phương án rõ ràng cho môi trường phát triển cục bộ và cho máy chủ ngoài cloud.
