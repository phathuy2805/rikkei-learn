import { sendError } from '../utils/response.util.js';

/**
 * Middleware bọc Joi schema validation
 * @param {Object} schema Joi Schema object
 * @param {'body' | 'query' | 'params'} property Thuộc tính cần validate của request
 */
export const validate = (schema, property = 'body') => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req[property], {
      abortEarly: false, // Trả về tất cả các lỗi thay vì dừng ở lỗi đầu tiên
      stripUnknown: true, // Loại bỏ các trường không được định nghĩa
    });

    if (error) {
      const errorDetails = error.details.map((detail) => detail.message);
      return sendError(res, 'Dữ liệu đầu vào không hợp lệ', 400, errorDetails);
    }

    req[property] = value;
    next();
  };
};
