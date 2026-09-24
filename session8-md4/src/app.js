import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { testDbConnection } from './config/database.js';
import { sequelize } from './models/index.js';
import rootRouter from './routes/index.js';
import { errorHandler, notFoundHandler } from './middlewares/error.middleware.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// 1. Global Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 2. API Routes
app.use('/api/v1', rootRouter);

// 3. 404 Not Found & Error Handler Middlewares
app.use(notFoundHandler);
app.use(errorHandler);

// 4. Khởi động Server & Đồng bộ CSDL
const startServer = async () => {
  try {
    // Kiểm tra kết nối DB
    await testDbConnection();

    // Đồng bộ cấu trúc bảng (chỉ tạo/cập nhật bảng chưa có)
    await sequelize.sync({ alter: true });
    console.log('📦 Đồng bộ hóa Sequelize Models với Database thành công!');

    app.listen(PORT, () => {
      console.log(`🚀 Server đang chạy tại: http://localhost:${PORT}`);
      console.log(`📑 Health check: http://localhost:${PORT}/api/v1/health`);
    });
  } catch (error) {
    console.error('❌ Lỗi khi khởi động Server:', error.message);
    process.exit(1);
  }
};

startServer();

export default app;
