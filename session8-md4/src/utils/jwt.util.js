import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'default_jwt_secret_key_change_me';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

/**
 * Ký tạo JSON Web Token
 * @param {Object} payload Dữ liệu đính kèm vào token (id, email)
 * @returns {String} token chuỗi mã hóa
 */
export const generateToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

/**
 * Xác thực và giải mã Token
 * @param {String} token
 * @returns {Object} payload đã giải mã
 */
export const verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
};
