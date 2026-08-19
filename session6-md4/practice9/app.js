import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import Product from './models/Product.js';
import Order from './models/Order.js';

async function main() {
  let mongoServer;
  try {
    // Khởi tạo MongoDB in-memory server
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();

    await mongoose.connect(uri);

    console.log('--- ĐANG TẠO DỮ LIỆU MẪU ---');

    // 1. Tạo sản phẩm mẫu
    const product = new Product({
      name: 'iPhone 15 Pro Max',
      price: 30000,
      category: 'Mobile'
    });
    const savedProduct = await product.save();
    console.log(`=> Đã tạo Sản phẩm: ${savedProduct.name}`);

    // 2. Tạo đơn hàng tham chiếu tới sản phẩm vừa tạo
    const order = new Order({
      orderNumber: 'ORD-2023-001',
      product_id: savedProduct._id,
      quantity: 2
    });
    const savedOrder = await order.save();
    console.log(`=> Đã tạo Đơn hàng: ${savedOrder.orderNumber}\n`);

    // --- [1] KẾT QUẢ KHI KHÔNG DÙNG POPULATE ---
    console.log('--- [1] KẾT QUẢ KHI KHÔNG DÙNG POPULATE ---');
    const orderWithoutPopulate = await Order.findOne({ orderNumber: 'ORD-2023-001' });
    console.log(orderWithoutPopulate);
    console.log();

    // --- [2] KẾT QUẢ SAU KHI DÙNG POPULATE ---
    console.log('--- [2] KẾT QUẢ SAU KHI DÙNG POPULATE (BÀI 11) ---');
    const orderWithPopulate = await Order.findOne({ orderNumber: 'ORD-2023-001' }).populate('product_id');
    console.log(orderWithPopulate);

  } catch (error) {
    console.error('Lỗi trong quá trình xử lý:', error);
  } finally {
    await mongoose.disconnect();
    if (mongoServer) {
      await mongoServer.stop();
    }
  }
}

main();
