import express from 'express';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { generateAccessToken, generateRefreshToken } from './utils/jwt.js';

dotenv.config();

const app = express();
app.use(express.json());

// Giả lập Database với mật khẩu đã được băm an toàn bằng bcrypt
const USERS_DB = [
  {
    id: 'usr_98a72b1c',
    email: 'user@example.com',
    passwordHash: bcrypt.hashSync('Password123@', 10), // Mật khẩu thực: Password123@
    role: 'user',
    name: 'Nguyễn Văn A'
  },
  {
    id: 'usr_admin001',
    email: 'admin@example.com',
    passwordHash: bcrypt.hashSync('AdminSecure2026@', 10), // Mật khẩu thực: AdminSecure2026@
    role: 'admin',
    name: 'Quản Trị Viên'
  }
];

// Endpoint: POST /api/auth/login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Vui lòng cung cấp đầy đủ email và mật khẩu'
      });
    }

    // 1. Tìm user theo email
    const user = USERS_DB.find(u => u.email === email);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Email hoặc mật khẩu không chính xác'
      });
    }

    // 2. Đối chiếu mật khẩu bằng bcrypt.compare
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Email hoặc mật khẩu không chính xác'
      });
    }

    // 3. Khởi tạo cặp Token chuẩn (Access Token: 15m, Refresh Token: 7d)
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    // 4. Trả về kết quả (chỉ chứa thông tin an toàn, tuyệt đối không chứa password)
    return res.status(200).json({
      success: true,
      message: 'Đăng nhập thành công!',
      data: {
        accessToken,
        refreshToken,
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
          name: user.name
        }
      }
    });
  } catch (error) {
    console.error('Lỗi khi xử lý đăng nhập:', error);
    return res.status(500).json({
      success: false,
      message: 'Đã xảy ra lỗi máy chủ nội bộ'
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
