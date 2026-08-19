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

    // Nạp dữ liệu mẫu
    await Product.insertMany([
      {
        name: 'Dell XPS 13',
        price: 15000,
        category: 'Laptop'
      },
      {
        name: 'iPhone 14 Pro',
        price: 18000,
        category: 'Mobile'
      },
      {
        name: 'MacBook Pro 16',
        price: 35000,
        category: 'Laptop' // Bị loại vì giá >= 20000
      },
      {
        name: 'iPad Pro M2',
        price: 14000,
        category: 'Tablet' // Bị loại vì không thuộc Laptop/Mobile
      }
    ]);

    // Thực hiện truy vấn logic phức tạp: Danh mục 'Laptop' hoặc 'Mobile' VÀ giá < 20000
    const products = await Product.find({
      $or: [
        { category: 'Laptop' },
        { category: 'Mobile' }
      ],
      price: { $lt: 20000 }
    });

    console.log('=> Danh sách Sản phẩm (Laptop / Mobile) có giá < 20.000:');
    console.log(products);

  } catch (error) {
    console.error('Lỗi khi truy vấn:', error);
  } finally {
    await mongoose.disconnect();
    if (mongoServer) {
      await mongoServer.stop();
    }
  }
}

main();
