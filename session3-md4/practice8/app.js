import express from 'express';
import AppError from './utils/AppError.js';

const app = express();
app.use(express.json());

const users = [
  { id: 1, name: 'Alice', email: 'alice@example.com' }
];

app.get('/users/secret', (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return next(new AppError('Chưa xác thực', 401));
  }
  res.status(200).json({ success: true, message: 'Chào mừng bạn đến với khu vực bí mật!' });
});

app.get('/users/:id', (req, res, next) => {
  const { id } = req.params;
  const user = users.find(u => u.id === Number(id));
  if (!user) {
    return next(new AppError('Không tìm thấy user', 404));
  }
  res.status(200).json({ success: true, data: user });
});

app.post('/users', (req, res, next) => {
  const { name, email } = req.body;
  if (!email) {
    return next(new AppError('Thiếu trường email', 400));
  }
  const newUser = { id: users.length + 1, name, email };
  users.push(newUser);
  res.status(201).json({ success: true, data: newUser });
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
