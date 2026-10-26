# [Bài tập 6 - Mức độ: Vận dụng cơ bản] Điền khuyết cơ chế chống dồn dập khi khoá hết hạn

> **Khóa học:** [FJS-MD6] Professional Backend Development & Optimization (Mã: `175`)
> **Session:** Redis Caching Fundamentals (`session4-md6`)
> **Mã bài tập trên Portal:** `10234`
> **Mức độ:** Vận dụng cơ bản
> **Đường dẫn nộp bài Portal:** [Link Portal](https://portal.rikkei.edu.vn/learn/175/homework/10234)

---

**\[Bài tập 6 - Mức độ: Vận dụng cơ bản\] Điền khuyết cơ chế chống dồn dập khi khoá hết hạn**

**1\. Mục tiêu**

-   Hiểu hiện tượng nhiều request cùng dựng lại một khoá vừa hết hạn.

-   Bổ sung khoá phân tán và độ lệch ngẫu nhiên cho thời gian sống.

**2\. Mô tả**

**Bối cảnh nghiệp vụ**

Quy tắc đúng: tại một thời điểm, với một khoá bộ nhớ đệm, chỉ được phép có tối đa một request xuống cơ sở dữ liệu để dựng lại giá trị.

**Vấn đề hiện tại**

Sản phẩm flash sale có 5.000 người xem cùng lúc. Mỗi khi khoá hết hạn, cơ sở dữ liệu nhận gần 200 truy vấn giống hệt nhau trong một giây và thời gian phản hồi vọt lên 3 giây.

**Hiện trường**

*Hàm đọc sản phẩm hiện tại - hãy điền vào 5 chỗ khuyết được đánh dấu:*

 `async getProductWithLock(id: string) {` 

 `const key = \`shopfast:product:${id}\`;` 

 `const cached = await this.redis.get(key);` 

 `if (cached) return JSON.parse(cached);` 

 `// (1) thieu buoc gianh khoa phan tan truoc khi xuong DB` 

 `// (2) thieu nhanh xu ly khi KHONG gianh duoc khoa (cho roi doc lai cache)` 

 `const product = await this.repo.findById(id);` 

 `// (3) thieu do lech ngau nhien cho thoi gian song` 

 `await this.redis.set(key, JSON.stringify(product), "EX", 300);` 

 `// (4) thieu buoc giai phong khoa phan tan` 

 `// (5) thieu bao dam giai phong khoa ca khi truy van DB nem loi` 

 `return product;` 

 `}` 

**Yêu cầu đầu ra**

-   Hoàn thiện đủ 5 chỗ khuyết. Khoá phân tán phải tự hết hạn sau một khoảng ngắn để hệ thống không kẹt vĩnh viễn nếu tiến trình giữ khoá bị chết.

-   Nộp kèm kết quả đo tải chứng minh số truy vấn cơ sở dữ liệu tại thời điểm khoá hết hạn giảm từ khoảng 200 xuống còn 1 hoặc 2.

    **Bẫy dữ liệu**

-   Truy vấn cơ sở dữ liệu ném lỗi giữa chừng - khoá phân tán vẫn phải được giải phóng, nếu không mọi request sau đều bị chặn cho tới khi khoá tự hết hạn.

-   Request chờ đọc lại bộ nhớ đệm nhưng khoá vẫn chưa được dựng xong - phải có giới hạn số lần chờ, không lặp vô tận.

**3\. Đánh giá**

Để hoàn thành bài thực hành, học viên cần:

-   Kết quả đo tải cho thấy số truy vấn cơ sở dữ liệu giảm về 1 hoặc 2 tại thời điểm hết hạn.

-   Thời gian sống của các khoá cùng loại lệch nhau ngẫu nhiên, kiểm chứng bằng lệnh xem thời gian sống.

-   Mô phỏng truy vấn cơ sở dữ liệu ném lỗi: khoá phân tán vẫn được giải phóng.

-   Nhánh chờ có giới hạn số lần, không lặp vô tận.

-   Đưa mã nguồn lên GitHub và dán link repository lên phần nộp bài trên hệ thống.
