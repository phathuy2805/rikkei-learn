import express from 'express';
import dotenv from 'dotenv';
import { signAccessToken, signRefreshToken, verifyRefreshToken } from './utils/jwt.js';

dotenv.config();

const app = express();
app.use(express.json());

// Database giả lập danh sách người dùng
const USERS_DB = [
  { id: 'usr_001', username: 'hung', password: 'hung123', role: 'admin' },
  { id: 'usr_002', username: 'john', password: 'john123', role: 'user' }
];

// Cơ sở dữ liệu lưu trữ Refresh Token hợp lệ (hỗ trợ kiểm tra và thu hồi khi logout)
const REFRESH_TOKENS_DB = new Set();

// 1. API Đăng nhập: POST /api/auth/login
app.post('/api/auth/login', (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        status: 400,
        message: 'MISSING_CREDENTIALS',
        error: 'Vui lòng cung cấp đầy đủ username và password'
      });
    }

    const user = USERS_DB.find(u => u.username === username && u.password === password);
    if (!user) {
      return res.status(401).json({
        status: 401,
        message: 'INVALID_CREDENTIALS',
        error: 'Tài khoản hoặc mật khẩu không chính xác'
      });
    }

    // Khởi tạo Access Token và Refresh Token
    const rawAccessToken = signAccessToken(user);
    const rawRefreshToken = signRefreshToken(user);

    // Lưu trữ Refresh Token vào cơ sở dữ liệu
    REFRESH_TOKENS_DB.add(rawRefreshToken);

    // Trả về đúng định dạng theo ảnh Postman mẫu (kèm tiền tố Bearer)
    return res.status(200).json({
      status: 200,
      message: 'LOGIN_SUCCESSFUL',
      data: {
        accessToken: `Bearer ${rawAccessToken}`,
        refreshToken: `Bearer ${rawRefreshToken}`
      }
    });
  } catch (error) {
    return res.status(500).json({ status: 500, message: 'SERVER_ERROR', error: error.message });
  }
});

// 2. API Cấp lại Access Token: POST /api/auth/refresh-token
app.post('/api/auth/refresh-token', (req, res) => {
  try {
    let { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({
        status: 400,
        message: 'MISSING_REFRESH_TOKEN',
        error: 'Vui lòng cung cấp refreshToken'
      });
    }

    // Bóc tách tiền tố 'Bearer ' nếu có
    if (refreshToken.startsWith('Bearer ')) {
      refreshToken = refreshToken.slice(7);
    }

    // 1. Kiểm tra Refresh Token có tồn tại trong Database hay không (chống token đã bị thu hồi/hết hiệu lực)
    if (!REFRESH_TOKENS_DB.has(refreshToken)) {
      return res.status(403).json({
        status: 403,
        message: 'REFRESH_TOKEN_REVOKED_OR_NOT_FOUND',
        error: 'Refresh Token không tồn tại trong hệ thống hoặc đã bị thu hồi'
      });
    }

    // 2. Xác thực tính hợp lệ & chữ ký của Refresh Token
    let decoded;
    try {
      decoded = verifyRefreshToken(refreshToken);
    } catch (err) {
      // Nếu hết hạn hoặc sai chữ ký, xóa khỏi DB
      REFRESH_TOKENS_DB.delete(refreshToken);
      return res.status(401).json({
        status: 401,
        message: 'INVALID_OR_EXPIRED_REFRESH_TOKEN',
        error: 'Refresh Token không hợp lệ hoặc đã hết hạn'
      });
    }

    // 3. Tìm thông tin người dùng tương ứng
    const user = USERS_DB.find(u => u.id === decoded.userId);
    if (!user) {
      return res.status(404).json({
        status: 404,
        message: 'USER_NOT_FOUND',
        error: 'Người dùng không tồn tại'
      });
    }

    // 4. Ký và cấp phát một Access Token hoàn toàn mới
    const newAccessToken = signAccessToken(user);

    // Trả về đúng định dạng theo ảnh Postman mẫu
    return res.status(200).json({
      status: 200,
      message: 'SUCCESS',
      data: {
        accessToken: newAccessToken
      }
    });
  } catch (error) {
    return res.status(500).json({ status: 500, message: 'SERVER_ERROR', error: error.message });
  }
});

// 3. API Đăng xuất (Thu hồi Refresh Token): POST /api/auth/logout
app.post('/api/auth/logout', (req, res) => {
  let { refreshToken } = req.body;
  if (refreshToken) {
    if (refreshToken.startsWith('Bearer ')) {
      refreshToken = refreshToken.slice(7);
    }
    REFRESH_TOKENS_DB.delete(refreshToken);
  }

  return res.status(200).json({
    status: 200,
    message: 'LOGOUT_SUCCESSFUL'
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
