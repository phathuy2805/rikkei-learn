import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import Store from './Store.js';

async function main() {
  let mongoServer;
  try {
    // Khởi tạo MongoDB in-memory server
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();

    await mongoose.connect(uri);

    console.log('--- ĐANG TẠO MỚI CỬA HÀNG ---\n');

    // Tạo mới một cửa hàng áp dụng cấu trúc lồng nhau (Embedded Document)
    const newStore = new Store({
      name: 'Cửa hàng Tiện lợi 24/7',
      location: {
        street: '123 Đường Nguyễn Huệ',
        district: 'Quận 1',
        city: 'Hồ Chí Minh'
      }
    });

    const savedStore = await newStore.save();

    console.log('=> Tạo thành công! Cấu trúc JSON trả về thể hiện rõ quan hệ cha-con:');
    console.log(savedStore.toObject ? savedStore.toObject() : savedStore);
    console.log();

  } catch (error) {
    console.error('Lỗi khi tạo cửa hàng:', error);
  } finally {
    await mongoose.disconnect();
    if (mongoServer) {
      await mongoServer.stop();
    }
    console.log('Đã đóng kết nối MongoDB.');
  }
}

main();
