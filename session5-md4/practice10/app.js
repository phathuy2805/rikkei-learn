import express from 'express';
import sequelize, { asyncLocalStorage } from './db.js';
import { Category, Product } from './models/index.js';

const app = express();
app.use(express.json());

// Middleware đo lường số lượng truy vấn SQL và thời gian xử lý của mỗi request
app.use((req, res, next) => {
  const store = { queryCount: 0, startTime: Date.now() };
  asyncLocalStorage.run(store, () => {
    next();
  });
});

// Endpoint chậm: Bị lỗi N+1 query (1 query lấy categories + 50 queries lấy products theo từng category = 51 queries)
app.get('/api/v1/report/slow', async (req, res) => {
  try {
    const categories = await Category.findAll({
      order: [['id', 'ASC']]
    });
    const data = [];

    // Vòng lặp N lần gây ra N+1 query
    for (const cat of categories) {
      const products = await Product.findAll({
        where: { categoryId: cat.id },
        order: [['id', 'ASC']]
      });

      data.push({
        id: cat.id,
        name: cat.name,
        Products: products.map(p => ({
          id: p.id,
          name: p.name,
          price: p.price,
          categoryId: p.categoryId
        }))
      });
    }

    const store = asyncLocalStorage.getStore();
    const durationMs = Date.now() - store.startTime;

    return res.status(200).json({
      success: true,
      data,
      meta: {
        queryCount: store.queryCount,
        durationMs
      }
    });
  } catch (error) {
    console.error('Error in /report/slow:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
});

// Endpoint nhanh: Khắc phục bằng Eager Loading (chỉ 1 query duy nhất có JOIN)
app.get('/api/v1/report/fast', async (req, res) => {
  try {
    const categories = await Category.findAll({
      order: [
        ['id', 'ASC'],
        [Product, 'id', 'ASC']
      ],
      include: [
        {
          model: Product,
          attributes: ['id', 'name', 'price', 'categoryId']
        }
      ]
    });

    const data = categories.map(cat => ({
      id: cat.id,
      name: cat.name,
      Products: (cat.Products || []).map(p => ({
        id: p.id,
        name: p.name,
        price: p.price,
        categoryId: p.categoryId
      }))
    }));

    const store = asyncLocalStorage.getStore();
    const durationMs = Date.now() - store.startTime;

    return res.status(200).json({
      success: true,
      data,
      meta: {
        queryCount: store.queryCount,
        durationMs
      }
    });
  } catch (error) {
    console.error('Error in /report/fast:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
});

// Khởi tạo Database và nạp 50 Category (mỗi Category có 10 Product, tổng cộng 500 Product)
export const initDB = async () => {
  try {
    await sequelize.sync({ force: true });

    // Tạo 50 Categories
    const categoriesData = [];
    for (let i = 1; i <= 50; i++) {
      categoriesData.push({ id: i, name: `Danh mục ${i}` });
    }
    await Category.bulkCreate(categoriesData);

    // Tạo 500 Products (10 products cho mỗi category)
    const productsData = [];
    let pId = 1;
    for (let cId = 1; cId <= 50; cId++) {
      for (let j = 1; j <= 10; j++) {
        productsData.push({
          id: pId++,
          name: `Sản phẩm ${j} thuộc Danh mục ${cId}`,
          price: j * 10000 + cId * 1000,
          categoryId: cId
        });
      }
    }
    await Product.bulkCreate(productsData);

    console.log('Database synced & 50 categories (500 products) seeded successfully.');
  } catch (err) {
    console.error('Failed to init DB:', err);
  }
};

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  await initDB();
  console.log(`Server is running on port ${PORT}`);
});

export default app;
