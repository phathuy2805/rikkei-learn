# Báo Cáo Giải Bài Tập 8 (Session 4): Chọn Chiến Lược Ghi Cho Tồn Kho Thời Gian Thực

**Học viên:** [FJS-MD6] Professional Backend Development & Optimization  
**Mã bài tập:** `homeworkId: 10236` | `session4-md6/practice8`  
**Mức độ:** Phân tích  

---

## 1. SO SÁNH 3 CHIẾN LƯỢC GHI: WRITE-THROUGH VS WRITE-BACK VS CACHE-ASIDE

Quy mô: **10.000 lượt trừ tồn kho / phút** trong giờ mở bán Flash Sale.

| Tiêu chí | Cache-Aside (Lazy) | Write-Through | Write-Back (Write-Behind) [CHỌN] |
| :--- | :--- | :--- | :--- |
| **Độ trễ ghi (Write Latency)** | Cao (Ghi DB trước, xoá Cache) | Trung bình (Ghi Cache + DB đồng bộ) | **Cực thấp (< 2ms, chỉ ghi Redis in-memory)** |
| **Thông lượng chịu tải (Throughput)** | Thấp (< 1.500 TPS do nghẽn DB Lock) | Thấp (< 1.500 TPS) | **Cực cao (> 20.000 TPS nhờ batching xuống DB)** |
| **Rủi ro mất dữ liệu** | Gần như không | Không | Có rủi ro nếu Redis crash trước khi batch sync |
| **Giải pháp an toàn dữ liệu** | Không cần | Không cần | **Dùng Redis AOF (appendfsync everysec) + Redis Streams WAL** |

### Căn cứ lựa chọn Write-Back:
Trong bài toán trừ tồn kho Flash Sale, nếu bắt buộc ghi thẳng vào MySQL cho từng lượt click, DB sẽ bị deadlocks hàng loạt và sập hệ thống. Chiến lược **Write-Back** trừ tồn kho tức thì trên Redis bằng lệnh nguyên tử `DECRBY`. Định kỳ mỗi 2 giây, một Worker gom cụm (Batch Update) đồng bộ xuống MySQL, đảm bảo hệ thống đạt độ trễ 2ms và không bao giờ bán vượt quá tồn kho (Over-selling).
