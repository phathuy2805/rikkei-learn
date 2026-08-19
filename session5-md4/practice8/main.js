import { PrismaClient } from '@prisma/client';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import 'dotenv/config';

const adapter = new PrismaBetterSqlite3({ url: process.env.DATABASE_URL || 'file:./dev.db' });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('=== BẮT ĐẦU THỰC HIỆN CÁC THAO TÁC CRUD VỚI PRISMA CLIENT (PRISMA 7) ===\n');

  try {
    // 1. Tạo một Author kèm hai Book trong một lời gọi prisma.author.create() duy nhất (Nested Write)
    console.log('--- 1. TẠO AUTHOR KÈM 2 BOOK (NESTED WRITE) ---');
    const newAuthor = await prisma.author.create({
      data: {
        name: 'Nguyễn Nhật Ánh',
        books: {
          create: [
            {
              title: 'Mắt Biếc',
              price: 110000
            },
            {
              title: 'Tôi Thấy Hoa Vàng Trên Cỏ Xanh',
              price: 125000
            }
          ]
        }
      },
      include: {
        books: true
      }
    });
    console.log('Đã tạo Author và 2 Book thành công:');
    console.dir(newAuthor, { depth: null });
    console.log();

    // 2. Đọc Author kèm toàn bộ Book bằng include
    console.log('--- 2. ĐỌC AUTHOR KÈM TOÀN BỘ BOOK BẰNG INCLUDE ---');
    const authorWithBooks = await prisma.author.findUnique({
      where: { id: newAuthor.id },
      include: {
        books: true
      }
    });
    console.log(`Thông tin tác giả ID ${newAuthor.id} cùng danh sách sách:`);
    console.dir(authorWithBooks, { depth: null });
    console.log();

    // 3. Cập nhật giá của một Book
    const bookToUpdate = newAuthor.books[0];
    console.log(`--- 3. CẬP NHẬT GIÁ CHO BOOK (ID: ${bookToUpdate.id} - ${bookToUpdate.title}) ---`);
    const updatedBook = await prisma.book.update({
      where: { id: bookToUpdate.id },
      data: {
        price: 150000
      }
    });
    console.log(`Đã cập nhật giá sách "${updatedBook.title}" từ ${bookToUpdate.price} lên ${updatedBook.price} VNĐ:`);
    console.dir(updatedBook, { depth: null });
    console.log();

    // 4. Xóa một Book
    const bookToDelete = newAuthor.books[1];
    console.log(`--- 4. XÓA MỘT BOOK (ID: ${bookToDelete.id} - ${bookToDelete.title}) ---`);
    const deletedBook = await prisma.book.delete({
      where: { id: bookToDelete.id }
    });
    console.log(`Đã xóa thành công sách "${deletedBook.title}" (ID: ${deletedBook.id})`);
    console.log();

    // 5. Bắt lỗi khi delete một Book ID không tồn tại
    const nonExistentId = 99999;
    console.log(`--- 5. BẮT LỖI KHI XÓA BOOK CÓ ID KHÔNG TỒN TẠI (ID: ${nonExistentId}) ---`);
    try {
      await prisma.book.delete({
        where: { id: nonExistentId }
      });
    } catch (error) {
      console.log(`[ĐÃ BẮT LỖI AN TOÀN] Không thể xóa sách ID ${nonExistentId}:`);
      console.log(`-> Mã lỗi: ${error.code || 'UNKNOWN'}`);
      console.log(`-> Thông báo: Không tìm thấy bản ghi sách với ID ${nonExistentId} để xóa.`);
    }

    console.log('\n=== TẤT CẢ CÁC THAO TÁC CRUD ĐÃ HOÀN TẤT THÀNH CÔNG ===');
  } catch (err) {
    console.error('Lỗi trong quá trình thực thi:', err);
  } finally {
    await prisma.$disconnect();
  }
}

main();
