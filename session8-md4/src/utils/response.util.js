/**
 * Utility chuẩn hóa phản hồi API (Unified API Response Helper)
 */

export const sendSuccess = (
  res,
  message = 'Thao tác thành công',
  data = null,
  statusCode = 200,
  pagination = null
) => {
  const response = {
    success: true,
    message,
    ...(data !== null && { data }),
    ...(pagination && { pagination }),
  };

  return res.status(statusCode).json(response);
};

export const sendError = (
  res,
  message = 'Đã có lỗi xảy ra',
  statusCode = 500,
  errors = null
) => {
  const response = {
    success: false,
    message,
    ...(errors && { errors }),
  };

  return res.status(statusCode).json(response);
};
