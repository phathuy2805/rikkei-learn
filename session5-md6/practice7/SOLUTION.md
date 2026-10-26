# Báo Cáo Giải Bài Tập 7 (Session 5): Dây Chuyền Xử Lý Đơn Hàng Nhiều Bước

**Học viên:** [FJS-MD6] Professional Backend Development & Optimization  
**Mã bài tập:** `homeworkId: 10240` | `session5-md6/practice7`  
**Mức độ:** Vận dụng chuyên sâu  

---

## 1. THIẾT KẾ DÂY CHUYỀN (SAGA PATTERN WITH FLOW PRODUCER)

Dây chuyền gồm 4 bước phụ thuộc tuần tự:
`[Bước 1: Trừ tồn kho] -> [Bước 2: Thanh toán thẻ] -> [Bước 3: Tạo vận đơn xuất kho] -> [Bước 4: Bắn email]`

### Cơ chế giao dịch bù (Compensating Transaction):
- Nếu Bước 2 (Thanh toán thẻ) thất bại (thẻ hết tiền/bị khóa): Dây chuyền lập tức kích hoạt bước bù `compensate_inventory` để hoàn trả lại số lượng tồn kho đã trừ ở Bước 1, đảm bảo tính nhất quán dữ liệu (Data Consistency).
