import rateLimit from 'express-rate-limit';

// Middleware giới hạn số lượng request đăng nhập (chống tấn công Brute-force)
export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 phút
  max: 5, // Tối đa 5 request từ một IP trong 15 phút
  standardHeaders: true, // Trả về thông tin RateLimit-* trong header response
  legacyHeaders: false, // Tắt header X-RateLimit-* cũ
  message: {
    success: false,
    statusCode: 429,
    message: 'Quá nhiều lần thử đăng nhập từ IP này. Vui lòng thử lại sau 15 phút!'
  }
});
