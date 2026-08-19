import express from 'express';
import { loginLimiter } from './middlewares/rateLimiter.js';

const app = express();
app.use(express.json());

// API Đăng nhập có gắn chốt chặn rate limit chống brute-force
app.post('/api/v1/auth/login', loginLimiter, (req, res) => {
  const { email, password } = req.body;

  if (email === 'admin@example.com' && password === 'SecretPassword123@') {
    return res.status(200).json({
      success: true,
      message: 'Đăng nhập thành công!',
      token: 'mock-jwt-token-xyz789'
    });
  }

  return res.status(401).json({
    success: false,
    message: 'Email hoặc mật khẩu không chính xác'
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
