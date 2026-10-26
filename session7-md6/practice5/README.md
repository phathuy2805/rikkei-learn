# [Bài tập 5 - Mức độ: Vận dụng cơ bản] Vá lỗi chính sách IAM cấp quyền quá rộng

> **Khóa học:** [FJS-MD6] Professional Backend Development & Optimization (Mã: `175`)
> **Session:** AWS Account & IAM Management (`session7-md6`)
> **Mã bài tập trên Portal:** `10248`
> **Mức độ:** Vận dụng cơ bản
> **Đường dẫn nộp bài Portal:** [Link Portal](https://portal.rikkei.edu.vn/learn/175/homework/10248)

---

**\[Bài tập 5 - Mức độ: Vận dụng cơ bản\] Vá lỗi chính sách IAM cấp quyền quá rộng**

**1\. Mục tiêu**

-   Đọc hiểu chính sách IAM viết bằng JSON và dò được phạm vi thực tế của nó.

-   Phát hiện các lỗ hổng phân quyền nghiêm trọng.

-   Chứng minh lỗ hổng bằng tình huống cụ thể trước khi sửa.

**2\. Mô tả**

**Bối cảnh nghiệp vụ**

Quy tắc đúng: nhóm lập trình viên chỉ được đọc ghi đối tượng trong các bucket phát triển có tiền tố  `shopfast-dev-` , được xem danh sách máy chủ và tuyệt đối không được thao tác gì với dịch vụ quản lý truy cập.

**Vấn đề hiện tại**

Kiểm toán bảo mật phát hiện một lập trình viên đã vô tình xoá bucket chứa sao lưu cơ sở dữ liệu sản xuất, và một lập trình viên khác tự cấp cho mình quyền quản trị mà không ai phê duyệt.

**Hiện trường**

*Chính sách đang gắn cho nhóm shopfast-developer:*

 `{` 

 `"Version": "2012-10-17",` 

 `"Statement": \[` 

 `{` 

 `"Sid": "DeveloperAccess",` 

 `"Effect": "Allow",` 

 `"Action": "s3:\*",` 

 `"Resource": "\*"` 

 `},` 

 `{` 

 `"Sid": "ViewInfrastructure",` 

 `"Effect": "Allow",` 

 `"Action": \[` 

 `"ec2:\*",` 

 `"iam:\*"` 

 `\],` 

 `"Resource": "\*"` 

 `}` 

 `\]` 

 `}` 

**Yêu cầu đầu ra**

-   Phần 1 - Chỉ ra lỗi bằng dữ liệu: nêu ít nhất 4 khiếm khuyết, mỗi khiếm khuyết kèm một tình huống cụ thể mô tả kẻ xấu hoặc người dùng bất cẩn có thể làm gì với quyền đang được cấp.

-   Phần 2 - Chính sách đã sửa: nộp tệp JSON mới tuân thủ đúng nguyên tắc đặc quyền tối thiểu theo mô tả nghiệp vụ.

-   Nộp kèm kết quả mô phỏng chính sách cho ít nhất 4 tình huống, chứng minh chính sách mới chặn đúng những gì cần chặn.

    Gợi ý phạm vi soi: ký tự đại diện trong phần hành động, ký tự đại diện trong phần tài nguyên, và việc cấp quyền cho dịch vụ quản lý truy cập có ý nghĩa gì.

**3\. Đánh giá**

Để hoàn thành bài thực hành, học viên cần:

-   Bản phân tích chỉ ra được ít nhất 4 lỗi, mỗi lỗi có tình huống khai thác cụ thể.

-   Chính sách mới giới hạn đúng phạm vi bucket có tiền tố quy định.

-   Chính sách mới không cấp bất kỳ quyền nào thuộc dịch vụ quản lý truy cập.

-   Chính sách mới cho phép xem danh sách máy chủ nhưng từ chối các hành động dừng và xoá.

-   Kết quả mô phỏng chứng minh được 4 tình huống chặn đúng.

-   Nộp mã nguồn và tài liệu lên GitHub, dán link repository lên phần nộp bài.
