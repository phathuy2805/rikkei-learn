# Báo Cáo Giải Bài Tập 6 (Session 5): Điền Khuyết Cơ Chế Tắt Tiến Trình An Toàn (Graceful Shutdown)

**Học viên:** [FJS-MD6] Professional Backend Development & Optimization  
**Mã bài tập:** `homeworkId: 10239` | `session5-md6/practice6`  
**Mức độ:** Vận dụng cơ bản  

---

## 1. HOÀN THIỆN 5 BƯỚC GRACEFUL SHUTDOWN TRONG BULLMQ WORKER

Khi Kubernetes gửi tín hiệu dừng Pod (`SIGTERM`):
1. **Bắt tín hiệu hệ điều hành:** Lắng nghe `process.on("SIGTERM")` và `process.on("SIGINT")`.
2. **Dừng nhận job mới:** Gọi `worker.pause(true)` để worker ngừng gắp job từ Redis.
3. **Chờ các job đang chạy dở hoàn tất:** Gọi `await worker.close()` chờ tối đa `SHUTDOWN_TIMEOUT = 10000ms`.
4. **Ngắt kết nối an toàn với Redis:** Gọi `await redisConnection.quit()`.
5. **Thoát tiến trình với mã 0:** Gọi `process.exit(0)`.
