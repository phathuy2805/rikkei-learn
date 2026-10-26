# [Bài tập 6 - Mức độ: Vận dụng cơ bản] Điền khuyết cơ chế kết nối lại cho ứng dụng giao hàng

> **Khóa học:** [FJS-MD6] Professional Backend Development & Optimization (Mã: `175`)
> **Session:** Realtime Communication with WebSocket (`session2-md6`)
> **Mã bài tập trên Portal:** `10224`
> **Mức độ:** Vận dụng cơ bản
> **Đường dẫn nộp bài Portal:** [Link Portal](https://portal.rikkei.edu.vn/learn/175/homework/10224)

---

**\[Bài tập 6 - Mức độ: Vận dụng cơ bản\] Điền khuyết cơ chế kết nối lại cho ứng dụng giao hàng**

**1\. Mục tiêu**

-   Hiểu vòng đời kết nối và các tình huống mất kết nối ngoài ý muốn.

-   Bổ sung cấu hình kết nối lại và khôi phục trạng thái sau khi nối lại.

**2\. Mô tả**

**Bối cảnh nghiệp vụ**

Ứng dụng của tài xế giao hàng ShopFast chạy trên điện thoại, liên tục đi qua vùng sóng yếu. Quy tắc: mất kết nối là bình thường, nhưng ứng dụng phải tự nối lại và tiếp tục nhận đơn mới mà tài xế không cần thao tác gì.

**Vấn đề hiện tại**

Tài xế phản ánh: đi qua hầm xong là ứng dụng "chết", phải tắt mở lại mới nhận được đơn. Đội vận hành cũng thấy có tài xế bị tính là đang online dù đã tắt máy từ lâu.

**Hiện trường**

*Mã nguồn hiện tại - hãy điền vào 5 chỗ khuyết được đánh dấu:*

 `// driver-client.ts` 

 `const socket = io("https://api.shopfast.vn", {` 

 `auth: { token },` 

 `// (1) thieu cau hinh tu dong ket noi lai` 

 `// (2) thieu gioi han so lan thu lai va do tre giua cac lan` 

 `});` 

 `socket.on("connect", () => {` 

 `console.log("da ket noi");` 

 `// (3) thieu buoc dang ky lai cac room sau khi noi lai` 

 `});` 

 `// (4) thieu xu ly su kien mat ket noi de bao cho tai xe biet` 

 `// --- phia server ---` 

 `// (5) thieu cau hinh khoang thoi gian cho truoc khi coi la mat ket noi` 

**Yêu cầu đầu ra**

-   Hoàn thiện đủ 5 chỗ khuyết: bật kết nối lại tự động, đặt giới hạn số lần thử cùng cơ chế giãn dần thời gian chờ, đăng ký lại room sau khi nối lại, hiển thị trạng thái mất kết nối cho tài xế, và cấu hình ngưỡng chờ phía server.

-   Nộp kèm log của một lần chạy thử có ngắt mạng giữa chừng rồi bật lại, thể hiện rõ chuỗi mất kết nối và nối lại thành công.

    **Bẫy dữ liệu**

-   Mạng chập chờn bật tắt liên tục 10 lần trong 30 giây - cơ chế thử lại không được biến thành bão request làm sập server.

**3\. Đánh giá**

Để hoàn thành bài thực hành, học viên cần:

-   Ngắt mạng 15 giây rồi bật lại: ứng dụng tự nối lại và nhận được đơn mới mà không cần khởi động lại.

-   Sau khi nối lại, tài xế vẫn ở đúng các room như trước khi mất kết nối.

-   Thời gian chờ giữa các lần thử lại giãn dần chứ không cố định.

-   Tắt hẳn ứng dụng: sau khoảng thời gian chờ đã cấu hình, server đánh dấu tài xế offline.

-   Đưa mã nguồn lên GitHub và dán link repository lên phần nộp bài trên hệ thống.
