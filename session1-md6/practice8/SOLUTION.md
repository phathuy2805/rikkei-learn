# Báo Cáo Giải Bài Tập 8: Chọn Kiến Trúc Cho Bộ Định Tuyến Ticket 3.000 Lượt/Ngày

**Học viên:** [FJS-MD6] Professional Backend Development & Optimization  
**Mã bài tập:** `homeworkId: 10221` | `session1-md6/practice8`  
**Mức độ:** Phân tích  

---

## PHẦN A: PHÂN TÍCH & ĐỀ XUẤT ĐA GIẢI PHÁP

### 1. Phân tích Đầu vào & Đầu ra (I/O Analysis)
- **Đầu vào (Input):**
  - `ticketId`: Mã định danh ticket.
  - `customerId`: Khách hàng gửi yêu cầu.
  - `rawContent`: Toàn bộ nội dung khiếu nại/thắc mắc của khách hàng (có thể chứa lịch sử chat dài đến 4.000 từ).
  - `channel`: Kênh tiếp nhận (Web Chat, App, Email).
- **Đầu ra (Output):**
  - `primaryTeam`: Đội xử lý chính (1 trong 4 đội: `TECH_SUPPORT`, `ORDER_DELIVERY`, `PAYMENT_REFUND`, `PRODUCT_CONSULT`).
  - `secondaryTeam`: Đội phối hợp (dành cho ticket đa vấn đề).
  - `confidenceScore`: Độ tin cậy của quyết định phân loại (0.0 -> 1.0).
  - `priority`: Mức độ ưu tiên (`URGENT`, `HIGH`, `MEDIUM`, `LOW`).
  - `cleanSummary`: Tóm tắt cốt lõi 1-2 câu của ticket.

---

### 2. Ba Đề Xuất Kiến Trúc Khả Thi

#### 🔹 Giải pháp 1: Single Fast-LLM Call (Zero-Shot Classifier)
- **Mô tả:** Sử dụng một model gọn nhẹ (Claude 3.5 Haiku hoặc GPT-4o-mini) gọi 1 lượt duy nhất để phân loại nhãn dựa trên ngữ nghĩa văn bản.
- **Hạn chế cốt tử:** Không có quyền truy cập dữ liệu thực tế. Với 30% ticket cần tra cứu thông tin đơn hàng (ví dụ: *"Đơn của tôi đã xuất kho chưa?"*), model chỉ đoán mò dẫn tới tỷ lệ gán sai cao, vi phạm quy tắc tốn 6 phút nhân sự chuyển tiếp thủ công.

#### 🔹 Giải pháp 2: Full Agent with Tool Calling (100% Ticket chạy qua Agent)
- **Mô tả:** 100% ticket đều được đưa vào Agent đầy đủ với quyền gọi các tool tra cứu database đơn hàng, kiểm tra tài khoản, đối soát giao dịch.
- **Hạn chế cốt tử:** Quá tải tài nguyên và vượt ngân sách. 70% ticket chỉ là hỏi thông tin chung (hỏi size, hỏi địa chỉ cửa hàng) không cần tra cứu dữ liệu nhưng vẫn tốn chi phí gọi tool và vòng lặp Agent kéo dài độ trễ.

#### 🔹 Giải pháp 3: Kiến trúc lai phân tầng (Hybrid Tier-Routing) [ĐƯỢC CHỌN]
- **Tầng 1 (Tier 1 - Fast Classifier & Routing Gate):**
  - Tiếp nhận ticket, cắt tỉa văn bản dài (xử lý bẫy 4.000 từ), phân loại nhãn ban đầu và đánh giá cờ `needsDataLookup`.
  - **70% ticket** đơn giản không cần tra cứu -> Định tuyến ngay lập tức về đội phụ trách (Độ trễ < 1 giây).
- **Tầng 2 (Tier 2 - Specialized Agent with Tools):**
  - **30% ticket** phức tạp có cờ `needsDataLookup = true` -> Đẩy sang Agent có tool tra cứu database đơn hàng, kiểm tra trạng thái thanh toán rồi mới chốt đội xử lý.

---

## PHẦN B: SO SÁNH & RA QUYẾT ĐỊNH CÓ CĂN CỨ ĐỊNH LƯỢNG

### Bảng So Sánh Theo 4 Tiêu Chí Bắt Buộc

Quy mô tính toán: **3.000 ticket/ngày × 30 ngày = 90.000 ticket/tháng**.  
Đơn giá quy đổi: 1 USD ≈ 25.000 VND.

| Tiêu chí | Giải pháp 1: Single Fast Call | Giải pháp 2: Full Agent 100% | Giải pháp 3: Hybrid Routing (Được chọn) |
| :--- | :--- | :--- | :--- |
| **Chi phí ước tính / tháng** | ~650.000 VND (~$26) | ~9.200.000 VND (~$368) *(Vượt ngân sách!)* | **~3.210.000 VND (~$128.4)** *(Đạt ngân sách!)* |
| **Độ trễ trung bình** | ~0.8 giây | ~3.8 – 4.8 giây (Rủi ro sát 5s) | **~1.5 giây** (70% đạt 0.8s, 30% đạt 3.0s) |
| **Độ chính xác dự kiến** | ~72% (Kém ở 30% cần tra cứu) | ~94% | **~93.5%** |
| **Độ phức tạp bảo trì** | Thấp | Cao | Trung bình (Dễ mở rộng theo tầng) |
| **Chi phí nhân sự do gán sai (6p/lỗi)** | Rất cao (~25.000 ticket sai = 2.500 giờ) | Thấp (~5.400 ticket sai) | Thấp (~5.800 ticket sai) |

### Chi tiết cách tính chi phí cho Giải pháp 3 (Hybrid):
1. **70% ticket phân loại nhanh tại Tier 1 (63.000 ticket):**
   - Trung bình 600 input tokens + 100 output tokens / ticket với model giá rẻ ($0.25/M input, $1.25/M output):
   - Chi phí: `63.000 × (0.0006 × 0.25 + 0.0001 × 1.25) = $17.3`
2. **30% ticket chạy qua Tier 2 Agent có Tool (27.000 ticket):**
   - Trung bình 2.500 tokens / lượt agent (kèm tool schema & tool result):
   - Chi phí: `27.000 × $0.0041 = $111.1`
3. **Tổng chi phí hàng tháng:** `$17.3 + $111.1 = $128.4 ≈ 3.210.000 VND`  
   -> **Nằm hoàn toàn trong hạn mức ngân sách 4.000.000 VND/tháng!**

### Biện luận đáp ứng 3 ràng buộc nghiệp vụ:
1. **Ràng buộc thời gian phản hồi <= 5 giây:**
   - 70% ticket phân loại tại Tier 1 phản hồi trong **0.8 giây**.
   - 30% ticket tại Tier 2 hoàn thành tối đa 2 vòng lặp tool trong **2.8 – 3.5 giây**, luôn nhỏ hơn ngưỡng 5 giây.
2. **Ràng buộc ngân sách <= 4 triệu đồng/tháng:** Chi phí thực tế ~3.21 triệu đồng, còn dư 20% ngân sách dự phòng.
3. **Giảm thiểu thời gian chuyển tiếp thủ công:** Nhờ tra cứu đúng dữ liệu ở 30% ca khó, độ chính xác tăng từ 72% lên gần 94%, tiết kiệm hơn 1.900 giờ làm việc của nhân viên mỗi tháng.

---

## PHẦN C: THIẾT KẾ & TRIỂN KHAI MÃ NGUỒN

Mã nguồn được cài đặt trong `ticketRouter.ts` với giải pháp triệt để cho 2 bẫy dữ liệu:
1. **Bẫy 1: Ticket dài 4.000 từ (Lịch sử chat):**
   - Tự động áp dụng chiến lược **Head-Tail Truncation**: Giữ lại 300 từ đầu tiên (ngữ cảnh ban đầu) và 600 từ cuối cùng (yêu cầu gần nhất của khách), bỏ qua phần trao đổi rườm rà ở giữa.
2. **Bẫy 2: Ticket đa vấn đề (Hỏi tồn kho + Khiếu nại thanh toán):**
   - Phân tích và tách thành 2 nhãn: Đặt `primaryTeam = "PAYMENT_REFUND"` (độ ưu tiên rủi ro tài chính cao hơn) và ghi nhận `secondaryTeam = "PRODUCT_CONSULT"` để hệ thống tự động gắn cờ phối hợp giữa 2 đội.
