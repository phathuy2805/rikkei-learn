import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import Product from './Product.js';

async function main() {
  let mongoServer;
  try {
    // Khởi tạo MongoDB Memory Server để chạy trực tiếp không cần daemon ngoài
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();

    await mongoose.connect(uri);
    console.log('Kết nối MongoDB thành công!\n');

    // --- TEST 1: LƯU SẢN PHẨM HỢP LỆ ---
    console.log('--- TEST 1: LƯU SẢN PHẨM HỢP LỆ ---');
    const validProduct = new Product({
      name: 'Bàn phím cơ Keychron K2',
      price: 1800000,
      category: 'Phụ kiện máy tính'
    });

    const savedProduct = await validProduct.save();
    console.log('=> Lưu THÀNH CÔNG sản phẩm hợp lệ:');
    console.log(`ID: ${savedProduct._id}`);
    console.log(`Tạo lúc: ${savedProduct.createdAt}\n`);

    // --- TEST 2: LƯU SẢN PHẨM VI PHẠM VALIDATION ---
    console.log('--- TEST 2: LƯU SẢN PHẨM VI PHẠM VALIDATION ---');
    console.log('=> Đang cố gắng lưu sản phẩm lỗi vào DB...\n');

    const invalidProduct = new Product({
      name: 'Áo',       // Vi phạm: ngắn hơn 5 ký tự
      price: -50000,    // Vi phạm: số âm < 0
      category: 'Thời trang'
    });

    try {
      await invalidProduct.save();
      console.log('=> Lưu sản phẩm thành công (Không mong đợi)');
    } catch (error) {
      if (error.name === 'ValidationError') {
        console.log('[!] BẮT ĐƯỢC LỖI VALIDATION:');
        for (const field in error.errors) {
          console.log(`- Lỗi ở trường '${field}': ${error.errors[field].message}`);
        }
      } else {
        console.error('Lỗi không xác định:', error);
      }
    }

    console.log();
  } catch (err) {
    console.error('Lỗi kết nối hoặc thực thi:', err);
  } finally {
    await mongoose.disconnect();
    if (mongoServer) {
      await mongoServer.stop();
    }
    console.log('Đã đóng kết nối MongoDB.');
  }
}

main();
