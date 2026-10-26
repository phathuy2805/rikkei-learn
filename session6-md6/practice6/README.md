# [Bài tập 6 - Mức độ: Vận dụng cơ bản] Điền khuyết pipeline CI/CD bị thiếu bước bảo vệ

> **Khóa học:** [FJS-MD6] Professional Backend Development & Optimization (Mã: `175`)
> **Session:** Docker & CI/CD Pipeline (`session6-md6`)
> **Mã bài tập trên Portal:** `10244`
> **Mức độ:** Vận dụng cơ bản
> **Đường dẫn nộp bài Portal:** [Link Portal](https://portal.rikkei.edu.vn/learn/175/homework/10244)

---

**\[Bài tập 6 - Mức độ: Vận dụng cơ bản\] Điền khuyết pipeline CI/CD bị thiếu bước bảo vệ**

**1\. Mục tiêu**

-   Hiểu vai trò của từng bước trong một quy trình tự động.

-   Bổ sung các bước kiểm soát chất lượng và bảo mật còn thiếu.

**2\. Mô tả**

**Bối cảnh nghiệp vụ**

Quy tắc đúng: chỉ mã nguồn đã qua kiểm thử mới được đóng gói; chỉ nhánh chính mới được đẩy image lên kho; khoá bí mật không bao giờ xuất hiện trong tệp cấu hình.

**Vấn đề hiện tại**

Tuần trước, một nhánh đang làm dở được đẩy nhầm image lên kho và bị triển khai ra môi trường thật, gây lỗi 45 phút. Ngoài ra mỗi lần chạy quy trình mất 8 phút vì cài lại phụ thuộc từ đầu.

**Hiện trường**

*Tệp cấu hình quy trình hiện tại - hãy điền vào 5 chỗ khuyết được đánh dấu:*

 `name: CI/CD` 

 `on: push` 

 `jobs:` 

 `build-and-push:` 

 `runs-on: ubuntu-latest` 

 `steps:` 

 `\- uses: actions/checkout@v4` 

 `\- uses: actions/setup-node@v4` 

 `with:` 

 `node-version: "20"` 

 `\# (1) thieu buoc bat bo nho dem cho thu muc phu thuoc` 

 `\- run: npm install` 

 `\# (2) thieu buoc chay kiem thu truoc khi dong goi` 

 `\- run: docker build -t ghcr.io/shopfast/api:latest .` 

 `\- run: docker login ghcr.io -u user -p MatKhauCuaToi123` 

 `\# (3) khoa bi mat viet thang vao tep cau hinh` 

 `\- run: docker push ghcr.io/shopfast/api:latest` 

 `\# (4) thieu dieu kien chi chay khi o nhanh chinh` 

 `\# (5) thieu the phien ban theo ma commit, chi co the "latest"` 

**Yêu cầu đầu ra**

-   Hoàn thiện đủ 5 chỗ khuyết: bật bộ nhớ đệm phụ thuộc, thêm bước kiểm thử làm điều kiện tiên quyết, chuyển khoá bí mật sang cơ chế bí mật của nền tảng, giới hạn việc đẩy image chỉ ở nhánh chính, và gắn thẻ phiên bản theo mã commit.

-   Nộp kèm ảnh chụp hai lần chạy quy trình: một lần trên nhánh phụ (không đẩy image) và một lần trên nhánh chính (có đẩy image).

    **Bẫy dữ liệu**

-   Kiểm thử tích hợp cần cơ sở dữ liệu và Redis - quy trình phải cung cấp được hai dịch vụ này.

-   Nếu chỉ dùng thẻ mới nhất thì không thể quay lui về phiên bản trước khi có sự cố - phải có thẻ cố định theo từng lần build.

**3\. Đánh giá**

Để hoàn thành bài thực hành, học viên cần:

-   Chạy trên nhánh phụ: kiểm thử vẫn chạy nhưng không có image nào được đẩy lên.

-   Chạy trên nhánh chính: image được đẩy lên với cả thẻ mã commit và thẻ mới nhất.

-   Cố tình làm một kiểm thử thất bại: bước đóng gói không được thực thi.

-   Không có khoá bí mật nào xuất hiện dạng văn bản thuần trong tệp cấu hình.

-   Lần chạy thứ hai nhanh hơn lần đầu rõ rệt nhờ bộ nhớ đệm.

-   Đưa mã nguồn lên GitHub và dán link repository lên phần nộp bài trên hệ thống.
