import * as Employee from '../models/Employee.js';
import AppError from '../utils/AppError.js';
import upload from '../middlewares/upload.js';
import multer from 'multer';

export function getEmployees(req, res, next) {
  try {
    const allEmployees = Employee.getAll();
    res.status(200).json(allEmployees);
  } catch (error) {
    next(error);
  }
}

export function createEmployee(req, res, next) {
  try {
    const { name, email } = req.body;
    if (!name || !email) {
      return next(new AppError('Thiếu trường name hoặc email', 400));
    }
    const existing = Employee.findByEmail(email);
    if (existing) {
      return next(new AppError('Email đã tồn tại', 409));
    }
    const newEmployee = Employee.create({ name, email });
    res.status(201).json(newEmployee);
  } catch (error) {
    next(error);
  }
}

export function getEmployeeById(req, res, next) {
  try {
    const { id } = req.params;
    const employee = Employee.findById(id);
    if (!employee) {
      return next(new AppError('Không tìm thấy nhân viên', 404));
    }
    res.status(200).json(employee);
  } catch (error) {
    next(error);
  }
}

export function uploadAvatar(req, res, next) {
  const { id } = req.params;
  const employee = Employee.findById(id);
  if (!employee) {
    return next(new AppError('Không tìm thấy nhân viên để upload avatar', 404));
  }

  upload.single('avatar')(req, res, (err) => {
    if (err) {
      if (err instanceof multer.MulterError && err.code === 'LIMIT_FILE_SIZE') {
        return next(new AppError('File vượt quá dung lượng cho phép (2MB)', 400));
      }
      if (err.message === 'LIMIT_UNSUPPORTED_TYPE') {
        return next(new AppError('Chỉ chấp nhận file ảnh', 400));
      }
      return next(new AppError(err.message, 400));
    }

    if (!req.file) {
      return next(new AppError('Vui lòng chọn file để upload', 400));
    }

    const avatarUrl = `/uploads/${req.file.filename}`;
    const updatedEmployee = Employee.updateAvatar(id, avatarUrl);
    
    res.status(200).json({
      message: 'Cập nhật avatar thành công',
      employee: updatedEmployee
    });
  });
}
