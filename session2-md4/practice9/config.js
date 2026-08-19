import dotenv from 'dotenv';
dotenv.config();

const config = {
  PROCESSING_DELAY_MS: parseInt(process.env.PROCESSING_DELAY_MS, 10) || 2000,
  LOG_TIMEZONE: process.env.LOG_TIMEZONE || 'UTC'
};

export default config;
