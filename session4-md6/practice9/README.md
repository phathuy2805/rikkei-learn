# [Bài tập 9 - Mức độ: Sáng tạo] Tầng tăng tốc cho toàn bộ ShopFast

> **Khóa học:** [FJS-MD6] Professional Backend Development & Optimization (Mã: `175`)
> **Session:** Redis Caching Fundamentals (`session4-md6`)
> **Mã bài tập trên Portal:** `10237`
> **Mức độ:** Sáng tạo
> **Đường dẫn nộp bài Portal:** [Link Portal](https://portal.rikkei.edu.vn/learn/175/homework/10237)

---

**\[Bài tập 9 - Mức độ: Sáng tạo\] Tầng tăng tốc cho toàn bộ ShopFast**

**1\. Mục tiêu**

-   Làm chủ vòng đời thiết kế một tầng tăng tốc hoàn chỉnh.

-   Tự định nghĩa bài toán từ một nhu cầu mở.

-   Thiết kế kiến trúc và luồng dữ liệu cho nhiều loại dữ liệu khác nhau.

**2\. Mô tả**

**Vấn đề**

Giám đốc kỹ thuật ShopFast nói: "Chi phí cơ sở dữ liệu tháng này tăng 60%, mà trang vẫn chậm vào giờ cao điểm. Tôi muốn giảm cả hai, nhưng tuyệt đối không được để khách nhìn thấy giá sai." Yêu cầu dừng ở đó - phần còn lại do bạn định nghĩa.

**Ràng buộc kỹ thuật**

-   Phải xử lý tối thiểu 4 loại dữ liệu có đặc tính khác nhau, ví dụ: dữ liệu hầu như không đổi, dữ liệu đổi thường xuyên, dữ liệu riêng của từng người dùng, và dữ liệu tổng hợp tốn tài nguyên.

-   Mỗi loại dữ liệu phải có chiến lược riêng về thời gian sống và cách vô hiệu hoá, kèm lý giải.

-   Phải có cơ chế đo và báo cáo tỉ lệ trúng bộ nhớ đệm cho từng loại dữ liệu.

-   Hệ thống phải hoạt động bình thường khi Redis không sẵn sàng, chỉ chậm đi chứ không được sập.

-   Mã nguồn tổ chức theo Clean Code: tách riêng chính sách lưu đệm, lớp truy cập Redis và tầng nghiệp vụ.

    **Yêu cầu đầu ra**

-   Thiết kế kiến trúc: sơ đồ các module và luồng dữ liệu, kèm bảng liệt kê từng loại dữ liệu với mẫu khoá, thời gian sống, điều kiện vô hiệu hoá và lý do lựa chọn.

-   Bản đặc tả ngắn: bạn đã thu hẹp yêu cầu mở thành những phần nào của hệ thống, và vì sao ưu tiên những phần đó.

-   Sản phẩm hoàn chỉnh: mã nguồn xử lý mượt mọi ngoại lệ, không crash; kèm báo cáo đo hiệu năng trước và sau, và bảng tỉ lệ trúng bộ nhớ đệm theo từng loại dữ liệu.

**3\. Đánh giá**

Để hoàn thành bài thực hành, học viên cần:

-   Đủ 4 loại dữ liệu được xử lý với chiến lược riêng biệt, có lý giải thuyết phục.

-   Báo cáo hiệu năng cho thấy cải thiện rõ rệt và có số liệu tỉ lệ trúng cho từng loại.

-   Tắt Redis: hệ thống vẫn phục vụ được, chỉ chậm hơn, không trả lỗi 500.

-   Cập nhật giá sản phẩm: không có kịch bản nào khiến khách nhìn thấy giá cũ.

-   Đưa mã nguồn lên GitHub và dán link repository lên phần nộp bài trên hệ thống.
