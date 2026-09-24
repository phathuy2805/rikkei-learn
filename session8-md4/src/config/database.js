import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME || 'task_management_db',
  process.env.DB_USER || 'root',
  process.env.DB_PASS || '',
  {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3306', 10),
    dialect: 'mysql',
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    define: {
      timestamps: true,
      underscored: false,
    },
  }
);

export const testDbConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Kết nối Cơ sở dữ liệu MySQL qua Sequelize thành công!');
  } catch (error) {
    console.error('❌ Không thể kết nối tới Cơ sở dữ liệu MySQL:', error.message);
  }
};

export default sequelize;
