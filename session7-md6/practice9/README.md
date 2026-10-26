# [Bài tập 9 - Mức độ: Sáng tạo] Nền tảng quản trị truy cập cloud cho ShopFast

> **Khóa học:** [FJS-MD6] Professional Backend Development & Optimization (Mã: `175`)
> **Session:** AWS Account & IAM Management (`session7-md6`)
> **Mã bài tập trên Portal:** `10252`
> **Mức độ:** Sáng tạo
> **Đường dẫn nộp bài Portal:** [Link Portal](https://portal.rikkei.edu.vn/learn/175/homework/10252)

---

**\[Bài tập 9 - Mức độ: Sáng tạo\] Nền tảng quản trị truy cập cloud cho ShopFast**

**1\. Mục tiêu**

-   Làm chủ vòng đời thiết kế một hệ thống quản trị truy cập hoàn chỉnh.

-   Tự định nghĩa bài toán từ một nhu cầu mở.

-   Thiết kế kiến trúc phân quyền và quy trình vận hành.

**2\. Mô tả**

**Vấn đề**

Giám đốc kỹ thuật ShopFast nói: "Tháng trước một bạn thực tập xoá nhầm bucket sao lưu, và chúng ta mất 4 tiếng mới biết ai làm. Tôi muốn hệ thống mà một người mới vào không thể phá được thứ gì quan trọng." Yêu cầu dừng ở đó - phần còn lại do bạn định nghĩa.

**Ràng buộc kỹ thuật**

-   Phải có tối thiểu 4 vai trò với ranh giới quyền rõ ràng, tuân thủ nguyên tắc đặc quyền tối thiểu.

-   Mọi thao tác phá huỷ dữ liệu trên môi trường thật đều phải qua ít nhất hai lớp kiểm soát.

-   Không được có khoá truy cập dài hạn nào cho ứng dụng và cho pipeline.

-   Phải có cơ chế ghi nhật ký hành động và phát hiện được hành vi bất thường trong dưới 15 phút.

-   Phải có quy trình cấp quyền và thu hồi quyền chuẩn hoá, viết thành tài liệu chạy được.

-   Cấu hình tổ chức rõ ràng: tách phần chính sách, phần vai trò và phần quy trình.

    **Yêu cầu đầu ra**

-   Thiết kế kiến trúc: sơ đồ mô hình phân quyền và luồng một yêu cầu truy cập được đánh giá, kèm ma trận phân quyền đầy đủ cho mọi vai trò.

-   Bản đặc tả ngắn: bạn đã thu hẹp yêu cầu mở thành những vai trò và lớp kiểm soát nào, và vì sao chọn những thứ đó.

-   Sản phẩm hoàn chỉnh: toàn bộ tệp chính sách và cấu hình chạy được thật; kèm kịch bản demo gồm một thao tác được phép, một thao tác bị chặn bởi đặc quyền tối thiểu, và một thao tác bị chặn bởi lớp kiểm soát bổ sung.

**3\. Đánh giá**

Để hoàn thành bài thực hành, học viên cần:

-   Đủ 4 vai trò với ranh giới quyền rõ ràng và lý giải thuyết phục.

-   Demo được cả ba kịch bản: thao tác được phép, bị chặn bởi đặc quyền tối thiểu, bị chặn bởi lớp kiểm soát bổ sung.

-   Không tồn tại khoá truy cập dài hạn nào cho ứng dụng và pipeline, chứng minh bằng danh sách khoá.

-   Có cơ chế ghi nhật ký hành động và mô tả được cách phát hiện hành vi bất thường.

-   Tài liệu quy trình cấp và thu hồi quyền đủ chi tiết để người khác thực hiện theo được.

-   Nộp mã nguồn và tài liệu lên GitHub, dán link repository lên phần nộp bài.
