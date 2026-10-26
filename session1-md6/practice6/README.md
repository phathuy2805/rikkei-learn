# [Bài tập 6 - Mức độ: Vận dụng cơ bản] Điền khuyết lược đồ tool khiến agent gọi sai tham số

> **Khóa học:** [FJS-MD6] Professional Backend Development & Optimization (Mã: `175`)
> **Session:** AI Agent Fundamentals: Flow, Tools & Prompting (`session1-md6`)
> **Mã bài tập trên Portal:** `10219`
> **Mức độ:** Vận dụng cơ bản
> **Đường dẫn nộp bài Portal:** [Link Portal](https://portal.rikkei.edu.vn/learn/175/homework/10219)

---

**\[Bài tập 6 - Mức độ: Vận dụng cơ bản\] Điền khuyết lược đồ tool khiến agent gọi sai tham số**

**1\. Mục tiêu**

-   Hiểu vai trò của  `description`  và  `input\_schema`  trong việc điều hướng model.

-   Bổ sung ràng buộc để model sinh tham số hợp lệ.

**2\. Mô tả**

**Bối cảnh nghiệp vụ**

ShopFast có tool tạo phiếu hoàn tiền. Quy tắc: chỉ hoàn theo 3 lý do được duyệt ( `HANG\_LOI` ,  `GIAO\_CHAM` ,  `TRU\_TIEN\_2\_LAN` ), số tiền hoàn không vượt quá 5.000.000đ.

**Vấn đề hiện tại**

Kế toán báo có phiếu hoàn với lý do "khách không thích màu" và một phiếu 50.000.000đ lọt vào hệ thống. Model đang tự do bịa giá trị vì lược đồ tool quá lỏng.

**Hiện trường**

*Lược đồ tool hiện tại - hãy điền vào 5 chỗ khuyết được đánh dấu:*

 `const createRefundTool = {` 

 `name: "create\_refund",` 

 `description: "Tao phieu hoan tien", // (1) mo ta qua so sai` 

 `input\_schema: {` 

 `type: "object",` 

 `properties: {` 

 `orderId: { type: "string" },` 

 `amount: { type: "number" }, // (2) khong gioi han` 

 `reason: { type: "string" }, // (3) khong rang buoc gia tri` 

 `},` 

 `// (4) thieu khai bao truong bat buoc` 

 `// (5) thieu chan truong la` 

 `},` 

 `};` 

**Yêu cầu đầu ra**

-   Hoàn thiện đủ 5 chỗ khuyết: mô tả tool đầy đủ ngữ cảnh nghiệp vụ, giới hạn giá trị  `amount` , ràng buộc  `reason`  vào đúng 3 lý do được duyệt, khai báo trường bắt buộc và chặn trường lạ.

-   Bật chế độ kiểm tra lược đồ nghiêm ngặt của tool để bảo đảm tham số model sinh ra luôn hợp lệ.

-   Nộp kèm log của 2 lần chạy thử: một yêu cầu hợp lệ và một yêu cầu "hoàn 50 triệu vì khách không thích màu".

    **Bẫy dữ liệu**

-   Khách viết "cho tôi hoàn 5tr" - hệ thống phải xử lý được đơn vị rút gọn hoặc từ chối rõ ràng, không được ngầm hiểu thành 5 đồng.

**3\. Đánh giá**

Để hoàn thành bài thực hành, học viên cần:

-   Yêu cầu hoàn 50 triệu với lý do ngoài danh mục bị chặn, có thông báo rõ nguyên nhân.

-   Yêu cầu hợp lệ vẫn tạo được phiếu bình thường.

-   Lược đồ có đủ  `required` , chặn trường lạ và giới hạn giá trị số.

-   Đưa mã nguồn lên GitHub và dán link repository lên phần nộp bài trên hệ thống.
