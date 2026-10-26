# Báo Cáo Giải Bài Tập 6: Điền Khuyết Lược Đồ Tool Khiến Agent Gọi Sai Tham Số

**Học viên:** [FJS-MD6] Professional Backend Development & Optimization  
**Mã bài tập:** `homeworkId: 10219` | `session1-md6/practice6`  
**Mức độ:** Vận dụng cơ bản  

---

## 1. PHÂN TÍCH 5 CHỖ KHUYẾT TRONG LƯỢC ĐỒ TOOL BAN ĐẦU

Đoạn mã hiện trường ban đầu của ShopFast:
```javascript
const createRefundTool = {
  name: "create_refund",
  description: "Tao phieu hoan tien", // (1) mo ta qua so sai
  input_schema: {
    type: "object",
    properties: {
      orderId: { type: "string" },
      amount:   { type: "number" },       // (2) khong gioi han
      reason:   { type: "string" },       // (3) khong rang buoc gia tri
    },
    // (4) thieu khai bao truong bat buoc
    // (5) thieu chan truong la
  },
};
```

### Chi tiết 5 lỗ hổng và cách khắc phục:
1. **Chỗ khuyết (1) - `description` quá sơ sài:**
   - *Hậu quả:* Model không hiểu rõ nghiệp vụ, không nắm được chính sách hoàn tiền tối đa 5.000.000đ và các lý do hợp lệ, dẫn tới việc tự ý suy đoán khi người dùng yêu cầu phi lý.
   - *Khắc phục:* Viết mô tả chi tiết quy định kinh doanh, đơn vị tiền tệ bắt buộc (VND), trần tiền hoàn (5.000.000 VND), và chỉ thị rõ không tạo phiếu nếu lý do ngoài danh mục.
2. **Chỗ khuyết (2) - `amount` không giới hạn:**
   - *Hậu quả:* Model có thể sinh ra số tiền âm, số tiền 0 đồng, hoặc số tiền khổng lồ (như 50.000.000đ) mà JSON Schema không hề ngăn chặn.
   - *Khắc phục:* Bổ sung ràng buộc schema: `minimum: 1000`, `maximum: 5000000`, kiểu dữ liệu `integer` (tiền tệ Việt Nam Đồng không có số lẻ thập phân).
3. **Chỗ khuyết (3) - `reason` không ràng buộc giá trị:**
   - *Hậu quả:* Model cho phép truyền bất kỳ chuỗi tự do nào, ví dụ "khách không thích màu", gây sai phạm quy chế tài chính.
   - *Khắc phục:* Khai báo `enum: ["HANG_LOI", "GIAO_CHAM", "TRU_TIEN_2_LAN"]` kèm mô tả ngữ nghĩa của từng mã lý do.
4. **Chỗ khuyết (4) - Thiếu khai báo trường bắt buộc (`required`):**
   - *Hậu quả:* Model có thể sinh ra payload thiếu một trong các thông tin then chốt (như thiếu `orderId` hoặc thiếu `amount`).
   - *Khắc phục:* Khai báo `required: ["orderId", "amount", "reason"]`.
5. **Chỗ khuyết (5) - Thiếu chặn trường lạ (`additionalProperties`):**
   - *Hậu quả:* Kẻ tấn công hoặc model bị ảo giác có thể chèn các tham số độc hại như `isAdmin: true`, `overrideApproval: true`.
   - *Khắc phục:* Thiết lập `additionalProperties: false`.

---

## 2. XỬ LÝ BẪY DỮ LIỆU: ĐƠN VỊ RÚT GỌN ("5tr", "5k", "5 triệu")

- **Hiện tượng:** Khách hàng thường viết *"cho tôi hoàn 5tr"* hoặc *"hoàn 500k"*.
- **Giải pháp:** Xây dựng hàm tiền xử lý / chuẩn hóa số tiền (`normalizeAmount`).
  - Hỗ trợ các hậu tố tiếng Việt phổ biến: `tr`, `triệu`, `k`, `nghìn`, `m`.
  - Nếu khách nhập "5tr" -> Chuyển thành `5000000`.
  - Nếu đầu vào không xác định được hoặc là chuỗi vô nghĩa -> Từ chối rõ ràng và yêu cầu nhập số tiền cụ thể, tuyệt đối không ngầm định "5tr" thành 5 VND.

---

## 3. LOG HAI LẦN CHẠY THỬ NGHIỆM

### Lần chạy 1: Yêu cầu hợp lệ
- **Đầu vào:** Khách gửi yêu cầu hoàn 2.000.000đ cho đơn #1024 do hàng lỗi.
- **Payload sinh ra:** `{ orderId: "1024", amount: 2000000, reason: "HANG_LOI" }`
- **Kết quả:** `[THÀNH CÔNG] Đã tạo phiếu hoàn tiền REF-1024-xxx thành công.`

### Lần chạy 2: Yêu cầu không hợp lệ (Hoàn 50 triệu vì khách không thích màu)
- **Đầu vào:** Khách yêu cầu hoàn 50 triệu cho đơn #1024 với lý do "khách không thích màu".
- **Kết quả chặn:**
  - Lỗi 1: `amount` (50.000.000) vượt quá giới hạn tối đa cho phép (5.000.000 VND).
  - Lỗi 2: `reason` ("khách không thích màu") không thuộc danh mục được duyệt [HANG_LOI, GIAO_CHAM, TRU_TIEN_2_LAN].
- **Thông báo trả về:** `[TỪ CHỐI] Yêu cầu bị chặn: Số tiền hoàn vượt quá trần 5.000.000 VND và lý do không nằm trong chính sách hoàn tiền.`
