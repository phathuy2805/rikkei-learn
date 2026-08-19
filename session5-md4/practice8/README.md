# Bài thực hành: Prisma: schema, migrate, generate và CRUD với Prisma Client

Bài thực hành này hướng dẫn khai báo schema Prisma có quan hệ 1-N giữa `Author` và `Book`, cấu hình Prisma 7 (`prisma.config.js`), thực hiện migration, sinh Prisma Client, và thực hiện 4 thao tác CRUD (trong đó có Nested Write và xử lý bắt lỗi an toàn khi xóa bản ghi không tồn tại) cùng giao diện quản trị Prisma Studio.

---

## 1. Cấu trúc Schema & Config (Prisma 7)

### `prisma/schema.prisma`
```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
}

model Author {
  id    Int    @id @default(autoincrement())
  name  String
  books Book[]
}

model Book {
  id       Int    @id @default(autoincrement())
  title    String
  price    Int
  author   Author @relation(fields: [authorId], references: [id], onDelete: Cascade)
  authorId Int
}
```

### `prisma.config.js`
```javascript
import 'dotenv/config';
import { defineConfig } from 'prisma/config';

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  datasource: {
    url: process.env.DATABASE_URL || 'file:./dev.db',
  },
});
```

*(Lưu ý: Nếu sử dụng MySQL, đổi datasource sang `provider = "mysql"` và cấu hình biến môi trường `DATABASE_URL="mysql://user:pass@localhost:3306/dbname"` trong file `.env`).*

---

## 2. Hướng dẫn Cài đặt và Chạy thử nghiệm

1. Di chuyển vào thư mục bài tập:
   ```bash
   cd session5-md4/practice8
   ```
2. Cài đặt các gói thư viện phụ thuộc:
   ```bash
   npm install
   ```
3. Chạy migration để đồng bộ schema vào cơ sở dữ liệu:
   ```bash
   npx prisma migrate dev --name init
   ```
4. Sinh mã Prisma Client:
   ```bash
   npx prisma generate
   ```
5. Chạy file mã nguồn thực hiện 4 thao tác CRUD:
   ```bash
   node main.js
   ```
6. (Tùy chọn) Mở giao diện quản trị Prisma Studio:
   ```bash
   npx prisma studio
   ```

---

## 3. Kết quả Thực thi Thao tác CRUD (`node main.js`)

```text
=== BẮT ĐẦU THỰC HIỆN CÁC THAO TÁC CRUD VỚI PRISMA CLIENT (PRISMA 7) ===

--- 1. TẠO AUTHOR KÈM 2 BOOK (NESTED WRITE) ---
Đã tạo Author và 2 Book thành công:
{
  id: 1,
  name: 'Nguyễn Nhật Ánh',
  books: [
    { id: 1, title: 'Mắt Biếc', price: 110000, authorId: 1 },
    {
      id: 2,
      title: 'Tôi Thấy Hoa Vàng Trên Cỏ Xanh',
      price: 125000,
      authorId: 1
    }
  ]
}

--- 2. ĐỌC AUTHOR KÈM TOÀN BỘ BOOK BẰNG INCLUDE ---
Thông tin tác giả ID 1 cùng danh sách sách:
{
  id: 1,
  name: 'Nguyễn Nhật Ánh',
  books: [
    { id: 1, title: 'Mắt Biếc', price: 110000, authorId: 1 },
    {
      id: 2,
      title: 'Tôi Thấy Hoa Vàng Trên Cỏ Xanh',
      price: 125000,
      authorId: 1
    }
  ]
}

--- 3. CẬP NHẬT GIÁ CHO BOOK (ID: 1 - Mắt Biếc) ---
Đã cập nhật giá sách "Mắt Biếc" từ 110000 lên 150000 VNĐ:
{ id: 1, title: 'Mắt Biếc', price: 150000, authorId: 1 }

--- 4. XÓA MỘT BOOK (ID: 2 - Tôi Thấy Hoa Vàng Trên Cỏ Xanh) ---
Đã xóa thành công sách "Tôi Thấy Hoa Vàng Trên Cỏ Xanh" (ID: 2)

--- 5. BẮT LỖI KHI XÓA BOOK CÓ ID KHÔNG TỒN TẠI (ID: 99999) ---
[ĐÃ BẮT LỖI AN TOÀN] Không thể xóa sách ID 99999:
-> Mã lỗi: P2025
-> Thông báo: Không tìm thấy bản ghi sách với ID 99999 để xóa.

=== TẤT CẢ CÁC THAO TÁC CRUD ĐÃ HOÀN TẤT THÀNH CÔNG ===
```

---

## 4. Hình ảnh Giao diện Prisma Studio

Dưới đây là hình ảnh chụp giao diện quản lý thực tế trên Prisma Studio:

![Prisma Studio Interface](prisma_studio.png)
