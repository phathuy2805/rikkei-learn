import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'default_jwt_secret';

/**
 * Middleware xác thực danh tính người dùng (Authentication Middleware)
 * 1. Bóc tách JWT từ Header: Authorization: Bearer <token>
 * 2. Xác thực token với jwt.verify()
 * 3. Nếu lỗi/hết hạn: Từ chối với mã 401 Unauthorized
 * 4. Nếu hợp lệ: Gán req.user = decoded và gọi next()
 */
export const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // Kiểm tra sự tồn tại của header Authorization
    if (!authHeader) {
      return res.status(401).json({
        success: false,
        statusCode: 401,
        message: 'Truy cập bị từ chối. Không tìm thấy token xác thực (Missing Authorization Header)'
      });
    }

    // Kiểm tra định dạng chuẩn 'Bearer <token>'
    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      return res.status(401).json({
        success: false,
        statusCode: 401,
        message: 'Định dạng token không hợp lệ (Phải có dạng: Bearer <token>)'
      });
    }

    const token = parts[1];

    // Xác minh tính hợp lệ và chữ ký của token
    const decoded = jwt.verify(token, JWT_SECRET);

    // Gán thông tin đã giải mã vào req.user
    req.user = decoded;

    // Chuyển tiếp xử lý sang Controller
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        statusCode: 401,
        message: 'Token xác thực đã hết hạn. Vui lòng đăng nhập lại!'
      });
    }

    return res.status(401).json({
      success: false,
      statusCode: 401,
      message: 'Token không hợp lệ hoặc đã bị chỉnh sửa (Invalid Signature)'
    });
  }
};
