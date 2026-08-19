import express from 'express';
import { sequelize, Product, Order, OrderItem } from './models/index.js';

const app = express();
app.use(express.json());

// API kiểm tra trạng thái bảng dữ liệu hiện tại (phục vụ đối chiếu trước/sau khi gọi API)
app.get('/api/v1/state', async (req, res) => {
  try {
    const products = await Product.findAll();
    const orders = await Order.findAll({
      include: [
        {
          model: OrderItem,
          include: [Product]
        }
      ]
    });
    const orderItems = await OrderItem.findAll();

    res.status(200).json({
      success: true,
      data: {
        products,
        orders,
        orderItemsCount: orderItems.length,
        orderItems
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Endpoint POST /api/v1/orders xử lý Transaction đặt hàng
app.post('/api/v1/orders', async (req, res) => {
  const { items } = req.body;

  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({
      success: false,
      message: 'Danh sách sản phẩm (items) không hợp lệ hoặc đang để trống'
    });
  }

  // Khởi tạo Transaction duy nhất
  const t = await sequelize.transaction();

  try {
    const productMap = new Map();

    // Bước 1: Kiểm tra tồn kho của từng sản phẩm trong danh sách items
    for (const item of items) {
      if (!item.productId || !item.qty || item.qty <= 0) {
        await t.rollback();
        return res.status(400).json({
          success: false,
          message: 'Thông tin productId hoặc số lượng (qty) không hợp lệ'
        });
      }

      const product = await Product.findByPk(item.productId, { transaction: t });

      if (!product) {
        await t.rollback();
        return res.status(404).json({
          success: false,
          message: `Không tìm thấy sản phẩm có ID = ${item.productId}`
        });
      }

      // Nếu có bất kỳ sản phẩm nào không đủ tồn kho, rollback và trả về 409
      if (product.stock < item.qty) {
        await t.rollback();
        return res.status(409).json({
          success: false,
          message: `Sản phẩm "${product.name}" không đủ số lượng tồn kho (Còn lại: ${product.stock}, Yêu cầu: ${item.qty})`,
          productName: product.name,
          availableStock: product.stock,
          requestedQty: item.qty
        });
      }

      productMap.set(item.productId, product);
    }

    // Tính tổng tiền đơn hàng
    let totalAmount = 0;
    for (const item of items) {
      const product = productMap.get(item.productId);
      totalAmount += product.price * item.qty;
    }

    // Bước 2: Tạo bản ghi trong bảng orders
    const newOrder = await Order.create({
      total: totalAmount
    }, { transaction: t });

    // Bước 3 & Bước 4: Tạo các bản ghi order_items tương ứng và trừ stock của từng product bằng decrement
    const createdItems = [];
    for (const item of items) {
      const product = productMap.get(item.productId);

      const orderItem = await OrderItem.create({
        orderId: newOrder.id,
        productId: product.id,
        qty: item.qty,
        price: product.price
      }, { transaction: t });

      // Trừ stock bằng decrement
      await product.decrement('stock', { by: item.qty, transaction: t });

      createdItems.push({
        orderItemId: orderItem.id,
        productId: product.id,
        productName: product.name,
        qty: item.qty,
        unitPrice: product.price,
        subtotal: product.price * item.qty
      });
    }

    // Cam kết hoàn tất Transaction
    await t.commit();

    return res.status(201).json({
      success: true,
      message: 'Đặt hàng thành công',
      data: {
        orderId: newOrder.id,
        total: totalAmount,
        items: createdItems
      }
    });

  } catch (error) {
    if (t && !t.finished) {
      await t.rollback();
    }
    console.error('Lỗi khi xử lý đơn hàng:', error);
    return res.status(500).json({
      success: false,
      message: 'Đã xảy ra lỗi máy chủ trong quá trình xử lý đơn hàng'
    });
  }
});

// Khởi tạo Database và nạp dữ liệu mẫu
export const initDB = async () => {
  try {
    await sequelize.sync({ force: true });
    
    // Nạp dữ liệu sản phẩm mẫu có cấu hình tồn kho cụ thể
    const sampleProducts = [
      { id: 1, name: 'Laptop Dell XPS 15', price: 25000000, stock: 10 },
      { id: 2, name: 'Bàn phím cơ Keychron K2', price: 1800000, stock: 2 },
      { id: 3, name: 'Chuột Logitech MX Master 3S', price: 2200000, stock: 5 },
      { id: 4, name: 'Màn hình Dell UltraSharp 27', price: 8500000, stock: 3 },
      { id: 5, name: 'Tai nghe Sony WH-1000XM5', price: 7000000, stock: 1 }
    ];

    await Product.bulkCreate(sampleProducts);
    console.log('Database synced & sample products seeded successfully.');
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
