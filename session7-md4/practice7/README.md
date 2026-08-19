# Bài thực hành: Ngăn chặn tấn công Brute-force với Rate Limit

Bài thực hành này minh họa việc áp dụng kỹ thuật bảo mật **Rate Limiting** bằng thư viện **`express-rate-limit`** để giới hạn số lượng request gửi tới API xác thực (`/api/v1/auth/login`), ngăn chặn kẻ tấn công thực hiện kỹ thuật dò mật khẩu tự động (**Brute-force attack**).

---

## 1. Cấu hình Middleware Rate Limiter (`middlewares/rateLimiter.js`)

```javascript
import rateLimit from 'express-rate-limit';

// Giới hạn tối đa 5 lần gửi request trong vòng 15 phút từ cùng một IP
export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 phút
  max: 5, // Tối đa 5 requests
  standardHeaders: true, // Trả về thông tin RateLimit-* trong response header
  legacyHeaders: false,
  message: {
    success: false,
    statusCode: 429,
    message: 'Quá nhiều lần thử đăng nhập từ IP này. Vui lòng thử lại sau 15 phút!'
  }
});
```

---

## 2. Hướng dẫn Cài đặt & Chạy ứng dụng

1. Di chuyển vào thư mục bài tập:
   ```bash
   cd session7-md4/practice7
   ```
2. Cài đặt các gói thư viện:
   ```bash
   npm install
   ```
3. Khởi động server:
   ```bash
   node app.js
   ```
4. Chạy script kiểm thử tự động gửi 6 request liên tiếp:
   ```bash
   node test_ratelimit.js
   ```

---

## 3. Kết quả Kiểm thử Tự động Thực tế

```text
==================================================================
KIỂM THỬ CHỐT CHẶN RATE LIMIT CHỐNG TẤN CÔNG BRUTE-FORCE LOGIN
Quy tắc: Cho phép tối đa 5 lần thử trong 15 phút
==================================================================

---> [LẦN GỬI THỨ 1] Gửi request đăng nhập với mật khẩu sai...
HTTP Status: 401 (Unauthorized)
Header RateLimit: Limit=5, Remaining=4
Response Body: {"success":false,"message":"Email hoặc mật khẩu không chính xác"}
------------------------------------------------------------------
---> [LẦN GỬI THỨ 2] Gửi request đăng nhập với mật khẩu sai...
HTTP Status: 401 (Unauthorized)
Header RateLimit: Limit=5, Remaining=3
Response Body: {"success":false,"message":"Email hoặc mật khẩu không chính xác"}
------------------------------------------------------------------
---> [LẦN GỬI THỨ 3] Gửi request đăng nhập với mật khẩu sai...
HTTP Status: 401 (Unauthorized)
Header RateLimit: Limit=5, Remaining=2
Response Body: {"success":false,"message":"Email hoặc mật khẩu không chính xác"}
------------------------------------------------------------------
---> [LẦN GỬI THỨ 4] Gửi request đăng nhập với mật khẩu sai...
HTTP Status: 401 (Unauthorized)
Header RateLimit: Limit=5, Remaining=1
Response Body: {"success":false,"message":"Email hoặc mật khẩu không chính xác"}
------------------------------------------------------------------
---> [LẦN GỬI THỨ 5] Gửi request đăng nhập với mật khẩu sai...
HTTP Status: 401 (Unauthorized)
Header RateLimit: Limit=5, Remaining=0
Response Body: {"success":false,"message":"Email hoặc mật khẩu không chính xác"}
------------------------------------------------------------------
---> [LẦN GỬI THỨ 6] Gửi request đăng nhập với mật khẩu sai...
HTTP Status: 429 (Too Many Requests)
Header RateLimit: Limit=5, Remaining=0
Response Body: {"success":false,"statusCode":429,"message":"Quá nhiều lần thử đăng nhập từ IP này. Vui lòng thử lại sau 15 phút!"}
------------------------------------------------------------------
```
