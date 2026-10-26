# [Bài tập 7 - Mức độ: Vận dụng chuyên sâu] Thiết lập quản trị truy cập cho đội ShopFast mở rộng

> **Khóa học:** [FJS-MD6] Professional Backend Development & Optimization (Mã: `175`)
> **Session:** AWS Account & IAM Management (`session7-md6`)
> **Mã bài tập trên Portal:** `10250`
> **Mức độ:** Vận dụng chuyên sâu
> **Đường dẫn nộp bài Portal:** [Link Portal](https://portal.rikkei.edu.vn/learn/175/homework/10250)

---

**\[Bài tập 7 - Mức độ: Vận dụng chuyên sâu\] Thiết lập quản trị truy cập cho đội ShopFast mở rộng**

**1\. Mục tiêu**

-   Dịch một cơ cấu tổ chức thực tế sang mô hình phân quyền.

-   Thiết kế hệ thống nhóm, chính sách và Role đầy đủ.

-   Bảo vệ các thao tác nguy hiểm bằng nhiều lớp kiểm soát.

**2\. Mô tả**

**Bối cảnh & vấn đề**

ShopFast mở rộng đội kỹ thuật lên 15 người và thuê thêm một đối tác bên ngoài. Hiện tại tất cả đang dùng chung một tài khoản IAM có quyền quản trị, không ai truy vết được ai làm gì.

**Yêu cầu nghiệp vụ**

-   6 lập trình viên backend: đọc ghi tài nguyên môi trường phát triển, chỉ đọc trên môi trường thật.

-   3 kỹ sư vận hành: toàn quyền hạ tầng ở cả hai môi trường, nhưng mọi thao tác xoá tài nguyên trên môi trường thật đều phải xác thực hai lớp trong phiên hiện tại.

-   2 kỹ sư dữ liệu: chỉ đọc kho lưu trữ đối tượng chứa dữ liệu phân tích, không truy cập được gì khác.

-   1 kế toán: chỉ xem được thông tin chi phí và hoá đơn.

-   3 người đối tác bên ngoài: quyền tối thiểu, chỉ đọc log của đúng một dịch vụ, và quyền tự động hết hạn sau 90 ngày.

-   Mọi hành động của mọi người đều phải ghi lại được để truy vết.

    **Ràng buộc & bẫy dữ liệu**

-   Một nhân viên nghỉ việc - phải thu hồi được toàn bộ quyền trong dưới 5 phút và chứng minh được không còn đường truy cập nào.

-   Một người thuộc hai nhóm có quyền mâu thuẫn nhau - kết quả cuối cùng phải xác định được và giải thích được.

    **Yêu cầu đầu ra**

    **A. Báo cáo phân tích và thiết kế giải pháp**

-   Phân tích bài toán (I/O): lập ma trận phân quyền đầy đủ với các cột gồm vai trò, dịch vụ được truy cập, hành động được phép, phạm vi tài nguyên và điều kiện bổ sung.

-   Đề xuất giải pháp: trình bày ngắn gọn ý tưởng logic - dùng bao nhiêu nhóm, chính sách nào tự viết và chính sách nào dùng sẵn, chỗ nào dùng Role thay cho người dùng.

-   Thiết kế các bước: gạch đầu dòng tuần tự quy trình cấp quyền cho một nhân viên mới và quy trình thu hồi quyền khi nghỉ việc.

**B. Triển khai và chống lỗi**

-   Nộp toàn bộ tệp chính sách JSON, logic phải khớp với ma trận phân quyền ở phần A.

-   Có cấu hình cụ thể chặn từng bẫy dữ liệu đã nêu, kèm kết quả mô phỏng chính sách cho ít nhất 8 tình huống.

**3\. Đánh giá**

Để hoàn thành bài thực hành, học viên cần:

-   Ma trận phân quyền đầy đủ 5 vai trò với đủ các cột yêu cầu.

-   Thao tác xoá tài nguyên môi trường thật bị chặn khi phiên không có xác thực hai lớp.

-   Quyền của đối tác bên ngoài có cơ chế hết hạn sau 90 ngày.

-   Quy trình thu hồi quyền chứng minh được hoàn tất trong dưới 5 phút.

-   Kết quả mô phỏng đủ 8 tình huống, trong đó có tình huống quyền mâu thuẫn với giải thích đúng.

-   Nộp mã nguồn và tài liệu lên GitHub, dán link repository lên phần nộp bài.
