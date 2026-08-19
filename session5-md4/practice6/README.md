# Bài thực hành: Phân trang, lọc và sắp xếp với findAndCountAll (Sequelize & SQLite)

Bài thực hành này nâng cấp endpoint `GET /api/v1/products` để hỗ trợ phân trang (`page`, `limit`), lọc theo từ khóa (`keyword`) và sắp xếp (`sort`) bằng việc sử dụng Sequelize `findAndCountAll` và toán tử `Op`.

## 1. Cài đặt và Chạy ứng dụng

1. Di chuyển vào thư mục bài tập (nếu chưa ở đây):
   ```bash
   cd session5-md4/practice6
   ```
2. Cài đặt các thư viện phụ thuộc:
   ```bash
   npm install
   ```
3. Chạy server:
   ```bash
   node app.js
   ```

*Hệ thống sử dụng cơ sở dữ liệu SQLite chạy trong bộ nhớ (in-memory) và tự động tạo ngẫu nhiên 50 sản phẩm mẫu (bao gồm các loại Sách, Vở, Bút, Thước, Tẩy) khi khởi chạy.*

---

## 2. Kết quả chạy thử nghiệm 4 Request Test

Dưới đây là kết quả của 4 kịch bản kiểm thử API bắt buộc:

### Kịch bản 1: Đủ tham số (page=2, limit=5, keyword=Sách, sort=price_asc)
*   **Request URL**: `GET http://localhost:3000/api/v1/products?page=2&limit=5&keyword=Sách&sort=price_asc`
*   **Response**:
    ```json
    {
      "success": true,
      "data": [
        { "id": 26, "name": "Sách học sinh lớp 6 - Tập 26", "price": 260000 },
        { "id": 31, "name": "Sách học sinh lớp 7 - Tập 31", "price": 310000 },
        { "id": 36, "name": "Sách học sinh lớp 8 - Tập 36", "price": 360000 },
        { "id": 41, "name": "Sách học sinh lớp 9 - Tập 41", "price": 410000 },
        { "id": 46, "name": "Sách học sinh lớp 10 - Tập 46", "price": 460000 }
      ],
      "meta": {
        "page": 2,
        "limit": 5,
        "total": 10,
        "totalPages": 2
      }
    }
    ```

### Kịch bản 2: Chỉ có keyword (keyword=Sách)
*   **Request URL**: `GET http://localhost:3000/api/v1/products?keyword=Sách`
*   **Response**:
    ```json
    {
      "success": true,
      "data": [
        { "id": 46, "name": "Sách học sinh lớp 10 - Tập 46", "price": 460000 },
        { "id": 41, "name": "Sách học sinh lớp 9 - Tập 41", "price": 410000 },
        { "id": 36, "name": "Sách học sinh lớp 8 - Tập 36", "price": 360000 },
        { "id": 31, "name": "Sách học sinh lớp 7 - Tập 31", "price": 310000 },
        { "id": 26, "name": "Sách học sinh lớp 6 - Tập 26", "price": 260000 },
        { "id": 21, "name": "Sách học sinh lớp 5 - Tập 21", "price": 210000 },
        { "id": 16, "name": "Sách học sinh lớp 4 - Tập 16", "price": 160000 },
        { "id": 11, "name": "Sách học sinh lớp 3 - Tập 11", "price": 110000 },
        { "id": 6, "name": "Sách học sinh lớp 2 - Tập 6", "price": 60000 },
        { "id": 1, "name": "Sách học sinh lớp 1 - Tập 1", "price": 10000 }
      ],
      "meta": {
        "page": 1,
        "limit": 10,
        "total": 10,
        "totalPages": 1
      }
    }
    ```

### Kịch bản 3: Chỉ sắp xếp (sort=price_desc)
*   **Request URL**: `GET http://localhost:3000/api/v1/products?sort=price_desc`
*   **Response**:
    ```json
    {
      "success": true,
      "data": [
        { "id": 50, "name": "Tẩy học sinh lớp 10 - Tập 50", "price": 500000 },
        { "id": 49, "name": "Thước học sinh lớp 10 - Tập 49", "price": 490000 },
        { "id": 48, "name": "Bút học sinh lớp 10 - Tập 48", "price": 480000 },
        { "id": 47, "name": "Vở học sinh lớp 10 - Tập 47", "price": 470000 },
        { "id": 46, "name": "Sách học sinh lớp 10 - Tập 46", "price": 460000 },
        { "id": 45, "name": "Tẩy học sinh lớp 9 - Tập 45", "price": 450000 },
        { "id": 44, "name": "Thước học sinh lớp 9 - Tập 44", "price": 440000 },
        { "id": 43, "name": "Bút học sinh lớp 9 - Tập 43", "price": 430000 },
        { "id": 42, "name": "Vở học sinh lớp 9 - Tập 42", "price": 420000 },
        { "id": 41, "name": "Sách học sinh lớp 9 - Tập 41", "price": 410000 }
      ],
      "meta": {
        "page": 1,
        "limit": 10,
        "total": 50,
        "totalPages": 5
      }
    }
    ```

### Kịch bản 4: Không truyền tham số (Sử dụng cấu hình mặc định)
*   **Request URL**: `GET http://localhost:3000/api/v1/products`
*   **Response**:
    ```json
    {
      "success": true,
      "data": [
        { "id": 50, "name": "Tẩy học sinh lớp 10 - Tập 50", "price": 500000 },
        { "id": 49, "name": "Thước học sinh lớp 10 - Tập 49", "price": 490000 },
        { "id": 48, "name": "Bút học sinh lớp 10 - Tập 48", "price": 480000 },
        { "id": 47, "name": "Vở học sinh lớp 10 - Tập 47", "price": 470000 },
        { "id": 46, "name": "Sách học sinh lớp 10 - Tập 46", "price": 460000 },
        { "id": 45, "name": "Tẩy học sinh lớp 9 - Tập 45", "price": 450000 },
        { "id": 44, "name": "Thước học sinh lớp 9 - Tập 44", "price": 440000 },
        { "id": 43, "name": "Bút học sinh lớp 9 - Tập 43", "price": 430000 },
        { "id": 42, "name": "Vở học sinh lớp 9 - Tập 42", "price": 420000 },
        { "id": 41, "name": "Sách học sinh lớp 9 - Tập 41", "price": 410000 }
      ],
      "meta": {
        "page": 1,
        "limit": 10,
        "total": 50,
        "totalPages": 5
      }
    }
    ```
