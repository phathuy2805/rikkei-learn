import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || 'default_access_secret';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'default_refresh_secret';
const JWT_ACCESS_EXPIRES_IN = process.env.JWT_ACCESS_EXPIRES_IN || '15m';
const JWT_REFRESH_EXPIRES_IN = process.env.JWT_REFRESH_EXPIRES_IN || '7d';

/**
 * Tạo Access Token có vòng đời ngắn (15m)
 * Payload chỉ chứa dữ liệu cần thiết: userId, email, role (Tuyệt đối không chứa mật khẩu)
 */
export const generateAccessToken = (user) => {
  const payload = {
    userId: user.id,
    email: user.email,
    role: user.role
  };
  return jwt.sign(payload, JWT_ACCESS_SECRET, {
    expiresIn: JWT_ACCESS_EXPIRES_IN
  });
};

/**
 * Tạo Refresh Token có vòng đời dài (7d)
 */
export const generateRefreshToken = (user) => {
  const payload = {
    userId: user.id
  };
  return jwt.sign(payload, JWT_REFRESH_SECRET, {
    expiresIn: JWT_REFRESH_EXPIRES_IN
  });
};

/**
 * Xác thực và giải mã Access Token
 */
export const verifyAccessToken = (token) => {
  return jwt.verify(token, JWT_ACCESS_SECRET);
};

/**
 * Xác thực và giải mã Refresh Token
 */
export const verifyRefreshToken = (token) => {
  return jwt.verify(token, JWT_REFRESH_SECRET);
};
