import express from 'express';
import dotenv from 'dotenv';

// Nạp các biến môi trường từ file .env
dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;
const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
const JWT_ACCESS_EXPIRES_IN = process.env.JWT_ACCESS_EXPIRES_IN;
const JWT_REFRESH_EXPIRES_IN = process.env.JWT_REFRESH_EXPIRES_IN;

app.get('/', (req, res) => {
  res.json({
    message: 'Server is running with secure environment config',
    config: {
      port: PORT,
      mongoUri: MONGO_URI,
      jwtAccessExpiresIn: JWT_ACCESS_EXPIRES_IN,
      jwtRefreshExpiresIn: JWT_REFRESH_EXPIRES_IN
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
