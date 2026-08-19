import express from 'express';
import { Op } from 'sequelize';
import sequelize from './db.js';
import Product from './Product.js';

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Hello from Practice 6!' });
});

// GET /api/v1/products
app.get('/api/v1/products', async (req, res) => {
  try {
    const { page, limit, keyword, sort } = req.query;

    // Parse and validate page
    let pageNum = 1;
    if (page !== undefined) {
      pageNum = parseInt(page, 10);
      if (isNaN(pageNum) || pageNum <= 0) {
        return res.status(400).json({
          success: false,
          message: 'Page parameter must be a positive integer greater than 0'
        });
      }
    }

    // Parse and validate limit
    let limitNum = 10;
    if (limit !== undefined) {
      limitNum = parseInt(limit, 10);
      if (isNaN(limitNum) || limitNum <= 0) {
        return res.status(400).json({
          success: false,
          message: 'Limit parameter must be a positive integer greater than 0'
        });
      }
    }

    // Enforce maximum limit of 50
    if (limitNum > 50) {
      limitNum = 50;
    }

    // Build filter criteria
    const where = {};
    if (keyword) {
      where.name = {
        [Op.like]: `%${keyword}%`
      };
    }

    // Build sorting order
    let order = [['id', 'DESC']];
    if (sort === 'price_asc') {
      order = [['price', 'ASC']];
    } else if (sort === 'price_desc') {
      order = [['price', 'DESC']];
    }

    // Query database using findAndCountAll
    const offset = (pageNum - 1) * limitNum;
    const { count, rows } = await Product.findAndCountAll({
      where,
      order,
      limit: limitNum,
      offset
    });

    const totalPages = Math.ceil(count / limitNum);

    return res.status(200).json({
      success: true,
      data: rows,
      meta: {
        page: pageNum,
        limit: limitNum,
        total: count,
        totalPages
      }
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error'
    });
  }
});

// Database Synchronization and Seeding
const initDB = async () => {
  try {
    await sequelize.sync({ force: true });
    const count = await Product.count();
    if (count === 0) {
      const categories = ['Sách', 'Vở', 'Bút', 'Thước', 'Tẩy'];
      const seedData = Array.from({ length: 50 }, (_, i) => {
        const category = categories[i % categories.length];
        return {
          name: `${category} học sinh lớp ${Math.floor(i / 5) + 1} - Tập ${i + 1}`,
          price: (i + 1) * 10000
        };
      });
      await Product.bulkCreate(seedData);
      console.log('Database synced and seeded 50 products successfully.');
    }
  } catch (err) {
    console.error('Failed to sync and seed database:', err);
  }
};

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  await initDB();
  console.log(`Server is running on port ${PORT}`);
});

export default app;
