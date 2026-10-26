# [Bài tập 6 - Mức độ: Vận dụng cơ bản] Điền khuyết Role cho pipeline CI/CD

> **Khóa học:** [FJS-MD6] Professional Backend Development & Optimization (Mã: `175`)
> **Session:** AWS Account & IAM Management (`session7-md6`)
> **Mã bài tập trên Portal:** `10249`
> **Mức độ:** Vận dụng cơ bản
> **Đường dẫn nộp bài Portal:** [Link Portal](https://portal.rikkei.edu.vn/learn/175/homework/10249)

---

**\[Bài tập 6 - Mức độ: Vận dụng cơ bản\] Điền khuyết Role cho pipeline CI/CD**

**1\. Mục tiêu**

-   Hiểu cấu trúc quan hệ tin cậy của một Role.

-   Bổ sung các điều kiện giới hạn phạm vi còn thiếu.

**2\. Mô tả**

**Bối cảnh nghiệp vụ**

Quy tắc đúng: chỉ pipeline chạy trên kho mã  `shopfast/backend`  và chỉ ở nhánh  `main`  mới được phép đảm nhận Role để đẩy image lên kho lưu trữ container. Không được dùng khoá truy cập dài hạn.

**Vấn đề hiện tại**

Đội bảo mật cảnh báo: với cấu hình hiện tại, bất kỳ ai tạo một kho mã công khai cũng có thể đảm nhận Role của ShopFast và đẩy image độc hại lên kho lưu trữ.

**Hiện trường**

*Quan hệ tin cậy hiện tại của Role - hãy điền vào 5 chỗ khuyết:*

 `{` 

 `"Version": "2012-10-17",` 

 `"Statement": \[` 

 `{` 

 `"Effect": "Allow",` 

 `"Principal": {` 

 `"Federated": "arn:aws:iam::123456789012:oidc-provider/<nha-cung-cap>"` 

 `},` 

 `"Action": "sts:AssumeRoleWithWebIdentity"` 

 `// (1) thieu khoi Condition hoan toan` 

 `// (2) thieu dieu kien kiem tra doi tuong nhan token` 

 `// (3) thieu dieu kien gioi han dung to chuc va kho ma` 

 `// (4) thieu dieu kien gioi han dung nhanh main` 

 `}` 

 `\]` 

 `}` 

 `// (5) thieu chinh sach quyen: Role nay duoc phep lam gi` 

**Yêu cầu đầu ra**

-   Hoàn thiện đủ 5 chỗ khuyết: thêm khối điều kiện, kiểm tra đối tượng nhận token, giới hạn đúng tổ chức và kho mã, giới hạn đúng nhánh, và viết chính sách quyền tối thiểu chỉ đủ để đẩy image lên kho lưu trữ container.

-   Nộp kèm cấu hình pipeline sử dụng Role này thay cho khoá truy cập dài hạn.

    **Bẫy dữ liệu**

-   Dùng phép so sánh có ký tự đại diện cho phần định danh kho mã mà không neo chặt phần đầu chuỗi - kẻ xấu có thể tạo tổ chức tên gần giống để lách qua.

-   Chính sách quyền cấp toàn quyền trên kho lưu trữ container - phải giới hạn đúng những hành động cần thiết để đẩy image.

**3\. Đánh giá**

Để hoàn thành bài thực hành, học viên cần:

-   Quan hệ tin cậy có đủ điều kiện kiểm tra đối tượng nhận token, tổ chức, kho mã và nhánh.

-   Điều kiện giới hạn kho mã neo chặt phần đầu chuỗi, không thể lách bằng tên gần giống.

-   Chính sách quyền chỉ chứa các hành động cần thiết để đẩy image, không cấp toàn quyền.

-   Cấu hình pipeline không còn khoá truy cập dài hạn nào.

-   Nộp mã nguồn và tài liệu lên GitHub, dán link repository lên phần nộp bài.
