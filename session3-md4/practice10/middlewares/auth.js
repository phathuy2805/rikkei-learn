import AppError from '../utils/AppError.js';

export function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return next(new AppError('Chưa đăng nhập', 401));
  }
  const role = authHeader.trim().toLowerCase();
  req.user = { id: 1, role };
  next();
}

export function authorize(role) {
  return (req, res, next) => {
    if (!req.user || req.user.role !== role) {
      return next(new AppError('Không đủ quyền truy cập', 403));
    }
    next();
  };
}
