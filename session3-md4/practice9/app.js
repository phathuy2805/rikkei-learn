import express from 'express';
import employeeRoutes from './routes/employeeRoutes.js';

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  console.log(`[LOGGER] ${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

app.use('/api/employees', employeeRoutes);

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
