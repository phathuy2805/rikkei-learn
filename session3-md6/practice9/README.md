# [Bài tập 9 - Mức độ: Sáng tạo] Lá chắn chống lạm dụng cho ngày hội mua sắm

> **Khóa học:** [FJS-MD6] Professional Backend Development & Optimization (Mã: `175`)
> **Session:** API Rate Limiting in Nest.js (`session3-md6`)
> **Mã bài tập trên Portal:** `10232`
> **Mức độ:** Sáng tạo
> **Đường dẫn nộp bài Portal:** [Link Portal](https://portal.rikkei.edu.vn/learn/175/homework/10232)

---

**\[Bài tập 9 - Mức độ: Sáng tạo\] Lá chắn chống lạm dụng cho ngày hội mua sắm**

**1\. Mục tiêu**

-   Làm chủ vòng đời phát triển một hệ thống phòng thủ hoàn chỉnh.

-   Tự định nghĩa bài toán từ một nhu cầu mở.

-   Thiết kế kiến trúc nhiều lớp phòng thủ và luồng dữ liệu.

**2\. Mô tả**

**Vấn đề**

Giám đốc kỹ thuật ShopFast nói: "Ngày 11/11 năm ngoái, 40% đơn flash sale rơi vào tay bot. Khách thật thì không mua được, còn hệ thống thì sập 20 phút. Năm nay tôi không muốn lặp lại." Yêu cầu dừng ở đó - phần còn lại do bạn định nghĩa.

**Ràng buộc kỹ thuật**

-   Hệ thống phải có tối thiểu 3 lớp phòng thủ độc lập, mỗi lớp chặn một loại hành vi lạm dụng khác nhau.

-   Khách hàng thật tuyệt đối không được chặn oan; phải có cơ chế đo và báo cáo tỉ lệ chặn nhầm.

-   Mọi lần chặn đều phải ghi log đủ thông tin để đội vận hành truy vết và điều chỉnh ngưỡng.

-   Ngưỡng chặn phải thay đổi được lúc đang chạy, không cần khởi động lại dịch vụ.

-   Mã nguồn tổ chức theo Clean Code: tách riêng chính sách, cơ chế thực thi và tầng lưu trữ bộ đếm.

    **Yêu cầu đầu ra**

-   Thiết kế kiến trúc: sơ đồ các lớp phòng thủ và luồng một request đi qua chúng, kèm bảng liệt kê từng lớp với hành vi nó chặn, ngưỡng áp dụng và phản hồi trả về.

-   Bản đặc tả ngắn: bạn đã thu hẹp yêu cầu mở thành những kịch bản lạm dụng cụ thể nào, và vì sao chọn những kịch bản đó.

-   Sản phẩm hoàn chỉnh: mã nguồn xử lý mượt mọi ngoại lệ, không crash; kèm kịch bản demo mô phỏng ít nhất 3 loại hành vi lạm dụng và 1 luồng khách hàng thật.

**3\. Đánh giá**

Để hoàn thành bài thực hành, học viên cần:

-   Demo chặn được cả 3 loại hành vi lạm dụng do bạn thiết kế.

-   Luồng khách hàng thật đi qua trọn vẹn, không bị chặn oan lần nào.

-   Ngưỡng thay đổi được lúc đang chạy, chứng minh bằng demo trực tiếp.

-   Log đủ thông tin để truy vết một lần chặn cụ thể.

-   Đưa mã nguồn lên GitHub và dán link repository lên phần nộp bài trên hệ thống.
