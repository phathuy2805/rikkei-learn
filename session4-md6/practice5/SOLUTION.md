# Báo Cáo Giải Bài Tập 5 (Session 4): Vá Lỗi Bộ Nhớ Đệm Phục Vụ Giá Sai Cho Khách Hàng

**Học viên:** [FJS-MD6] Professional Backend Development & Optimization  
**Mã bài tập:** `homeworkId: 10233` | `session4-md6/practice5`  
**Mức độ:** Vận dụng cơ bản  

---

## 1. PHÂN TÍCH HAI KHIẾM KHUYẾT CỐT LÕI

### Khiếm khuyết 1: Bỏ quên Cache Invalidation khi Cập nhật Giá (Stale Cache)
- **Nguyên nhân:** Khi quản trị viên cập nhật giá sản phẩm trong Cơ sở dữ liệu, hàm update chỉ thực hiện `UPDATE products SET price = ...` mà **không xoá khóa cache tương ứng trên Redis**. Khách hàng tiếp tục đọc dữ liệu cũ từ cache cho đến khi khóa tự hết hạn (TTL 24 giờ).
- **Khắc phục:** Áp dụng mô hình Cache-Aside chuẩn: Khi ghi dữ liệu thành công vào DB, lập tức gọi lệnh xoá cache (`DEL product:1024`) và phát tín hiệu vô hiệu hóa cache (Event-driven Cache Eviction).

### Khiếm khuyết 2: Cache Key thiếu ngữ cảnh tiền tệ & nhóm khách hàng (Cache Key Collision)
- **Nguyên nhân:** Key chỉ lưu `product:1024`. Nhưng ShopFast có chính sách giá khác nhau theo hạng thành viên (VIP được giảm 10%, Khách thường giá gốc). Khi khách thường truy cập, cache lưu giá gốc, sau đó khách VIP vào cũng bị trả về giá gốc của khách thường.
- **Khắc phục:** Chuẩn hóa Cache Key có namespace đầy đủ: `product:{id}:tier:{customerTier}`.
