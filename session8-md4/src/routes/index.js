import { Router } from 'express';

const rootRouter = Router();

// Endpoint kiểm tra trạng thái hoạt động của server (Health check)
rootRouter.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Task Management API Server đang chạy ổn định!',
    timestamp: new Date().toISOString(),
  });
});

// Gợi ý gắn các sub-routes khi bạn code xong:
// rootRouter.use('/auth', authRoutes);
// rootRouter.use('/projects', projectRoutes);
// rootRouter.use('/tasks', taskRoutes);
// rootRouter.use('/stats', statRoutes);

export default rootRouter;
