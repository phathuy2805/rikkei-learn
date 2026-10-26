# [Bài tập 5 - Mức độ: Vận dụng cơ bản] Vá lỗi image 1,4 GB và lộ khoá bí mật

> **Khóa học:** [FJS-MD6] Professional Backend Development & Optimization (Mã: `175`)
> **Session:** Docker & CI/CD Pipeline (`session6-md6`)
> **Mã bài tập trên Portal:** `10243`
> **Mức độ:** Vận dụng cơ bản
> **Đường dẫn nộp bài Portal:** [Link Portal](https://portal.rikkei.edu.vn/learn/175/homework/10243)

---

**\[Bài tập 5 - Mức độ: Vận dụng cơ bản\] Vá lỗi image 1,4 GB và lộ khoá bí mật**

**1\. Mục tiêu**

-   Đọc hiểu Dockerfile có sẵn và dò được từng tầng được tạo ra.

-   Phát hiện các lỗi làm phình image, làm chậm build và làm lộ thông tin nhạy cảm.

-   Chứng minh lỗi bằng số liệu cụ thể trước khi sửa.

**2\. Mô tả**

**Bối cảnh nghiệp vụ**

Quy tắc đúng: image chạy production chỉ chứa những gì cần để chạy, không chứa mã nguồn TypeScript, không chứa phụ thuộc phát triển, không chứa khoá bí mật, và không chạy bằng quyền quản trị.

**Vấn đề hiện tại**

Đội hạ tầng báo image ShopFast nặng 1,4 GB khiến mỗi lần triển khai mất 6 phút chỉ để tải image. Đội bảo mật thì phát hiện khoá kết nối cơ sở dữ liệu nằm trong lịch sử tầng của image công khai.

**Hiện trường**

*Dockerfile đang dùng để build image production của ShopFast:*

 `\# Dockerfile - build duoc, chay duoc, nhung sai nhieu cho` 

 `FROM node:20` 

 `WORKDIR /app` 

 `COPY . .` 

 `RUN npm install` 

 `ENV DATABASE\_URL=postgres://admin:MatKhau123@db:5432/shopfast` 

 `ENV JWT\_SECRET=shopfast-secret-key-2026` 

 `RUN npm run build` 

 `EXPOSE 3000` 

 `CMD \["npm", "run", "start:dev"\]` 

**Yêu cầu đầu ra**

-   Phần 1 - Chỉ ra lỗi bằng dữ liệu: nêu ít nhất 5 khiếm khuyết, mỗi khiếm khuyết kèm bằng chứng cụ thể (dung lượng đo được, thời gian build, hoặc lệnh chứng minh khoá bí mật bị lộ).

-   Phần 2 - Source code đã sửa: nộp Dockerfile mới đạt các tiêu chí trong bảng đánh giá bên dưới.

    Gợi ý phạm vi soi: thứ tự các lệnh ảnh hưởng tới bộ nhớ đệm tầng thế nào, những gì bị sao chép vào image, biến môi trường được cố định lúc build, người dùng chạy tiến trình, và lệnh khởi chạy có phù hợp với môi trường thật không.

**3\. Đánh giá**

Để hoàn thành bài thực hành, học viên cần:

-   Bản phân tích chỉ ra được ít nhất 5 lỗi, mỗi lỗi có bằng chứng số liệu hoặc lệnh kiểm chứng.

-   Image sau khi sửa nhỏ hơn 250 MB.

-   Sửa một dòng mã nguồn rồi build lại mất dưới 20 giây.

-   Lệnh kiểm tra lịch sử tầng của image không tìm thấy chuỗi khoá bí mật nào.

-   Container chạy bằng người dùng không có quyền quản trị và dùng lệnh khởi chạy của môi trường thật.

-   Đưa mã nguồn lên GitHub và dán link repository lên phần nộp bài trên hệ thống.
