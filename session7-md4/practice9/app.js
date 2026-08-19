import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { authMiddleware } from './middlewares/authMiddleware.js';

dotenv.config();

const app = express();
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET || 'default_jwt_secret';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';

// 1. Endpoint Đăng nhập để cấp JWT
app.post('/api/v1/auth/login', (req, res) => {
  const { email, password } = req.body;

  if (email === 'user@example.com' && password === 'Password123@') {
    const token = jwt.sign(
      {
        userId: 'usr_123456',
        email: 'user@example.com',
        role: 'member',
        fullName: 'Nguyễn Văn B'
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    return res.status(200).json({
      success: true,
      message: 'Đăng nhập thành công!',
      token
    });
  }

  return res.status(401).json({
    success: false,
    message: 'Email hoặc mật khẩu không chính xác'
  });
});

// 2. Endpoint Profile được bảo vệ bởi authMiddleware
app.get('/api/v1/users/profile', authMiddleware, (req, res) => {
  return res.status(200).json({
    success: true,
    message: 'Lấy thông tin tài khoản thành công!',
    user: req.user
  });
});

// 3. Endpoint Dashboard bảo mật
app.get('/api/v1/dashboard', authMiddleware, (req, res) => {
  return res.status(200).json({
    success: true,
    message: `Chào mừng ${req.user.fullName} đến với khu vực quản trị!`,
    accessTime: new Date().toISOString()
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
