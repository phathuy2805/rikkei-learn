import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import Product from './Product.js';

async function main() {
  let mongoServer;
  try {
    // Khởi tạo MongoDB in-memory server
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();

    await mongoose.connect(uri);

    // 1. Nạp dữ liệu các sản phẩm CŨ (hoàn toàn chưa có trường 'stock')
    await Product.collection.insertMany([
      {
        name: 'Laptop Dell Cũ',
        price: 10000,
        category: 'Laptop',
        createdAt: new Date('2026-03-19T08:32:36.377Z'),
        updatedAt: new Date('2026-03-19T08:32:36.377Z'),
        __v: 0
      },
      {
        name: 'iPhone 12 Pro Cũ',
        price: 15000,
        category: 'Mobile',
        createdAt: new Date('2026-03-19T08:32:36.378Z'),
        updatedAt: new Date('2026-03-19T08:32:36.378Z'),
        __v: 0
      }
    ]);

    // [1] TRƯỚC KHI CHẠY SCRIPT
    console.log('[1] TRƯỚC KHI CHẠY SCRIPT (Bạn sẽ thấy 2 sản phẩm đầu không có trường "stock"):');
    const beforeProducts = await Product.find().lean();
    console.log(beforeProducts);
    console.log();

    // Thực thi script quét và bổ sung trường khuyết thiếu: Tìm tài liệu thiếu 'stock' ($exists: false) và $set stock: 10
    await Product.updateMany(
      { stock: { $exists: false } },
      { $set: { stock: 10 } }
    );

    // [2] SAU KHI CHẠY SCRIPT
    console.log('[2] SAU KHI CHẠY SCRIPT (Tất cả sản phẩm cũ đã được bổ sung "stock: 10"):');
    const afterProducts = await Product.find().lean();
    console.log(afterProducts);

  } catch (error) {
    console.error('Lỗi khi xử lý migration dữ liệu:', error);
  } finally {
    await mongoose.disconnect();
    if (mongoServer) {
      await mongoServer.stop();
    }
  }
}

main();
