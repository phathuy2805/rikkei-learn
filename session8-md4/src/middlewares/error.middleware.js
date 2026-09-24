import { sendError } from '../utils/response.util.js';

/**
 * Middleware xử lý lỗi tập trung toàn ứng dụng
 */
export const errorHandler = (err, req, res, next) => {
  console.error('🔥 [ERROR LOG]:', err);

  // Xử lý lỗi Sequelize Unique Constraint (trùng email,...)
  if (err.name === 'SequelizeUniqueConstraintError') {
    const errorDetails = err.errors.map((e) => e.message);
    return sendError(res, 'Dữ liệu đã tồn tại trong hệ thống (Duplicate Entry)', 409, errorDetails);
  }

  // Xử lý lỗi Sequelize Validation
  if (err.name === 'SequelizeValidationError') {
    const errorDetails = err.errors.map((e) => e.message);
    return sendError(res, 'Dữ liệu không hợp lệ', 400, errorDetails);
  }

  // Xử lý lỗi JWT
  if (err.name === 'JsonWebTokenError') {
    return sendError(res, 'Token không hợp lệ hoặc đã bị thay đổi', 401);
  }
  if (err.name === 'TokenExpiredError') {
    return sendError(res, 'Token đã hết hạn, vui lòng đăng nhập lại', 401);
  }

  // Mã trạng thái tùy chỉnh hoặc mặc định 500
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Lỗi máy chủ nội bộ (Internal Server Error)';

  return sendError(res, message, statusCode, process.env.NODE_ENV === 'development' ? err.stack : null);
};

/**
 * Middleware xử lý route không tìm thấy (404 Not Found)
 */
export const notFoundHandler = (req, res, next) => {
  return sendError(res, `Không tìm thấy tài nguyên: ${req.method} ${req.originalUrl}`, 404);
};
