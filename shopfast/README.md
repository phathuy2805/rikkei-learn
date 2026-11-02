# ⚡ ShopFast - E-Commerce Web Application (AWS Ready)

Hệ thống sàn thương mại điện tử ShopFast được xây dựng tinh gọn, ổn định và tối ưu hoá để triển khai nhanh lên máy chủ đám mây **AWS EC2**.

---

## 🌟 1. Tính năng nổi bật

- **Xác thực người dùng (Auth):**
  - Đăng ký, Đăng nhập, Đăng xuất với bảo mật JWT.
  - Tự động nạp tài khoản demo (`customer@shopfast.vn` / `Customer@123`) khi khởi động.
- **Danh mục & Bộ lọc sản phẩm (Catalog & Filters):**
  - Xem danh mục sản phẩm theo tag (Điện thoại, Laptop, Phụ kiện, Đồng hồ).
  - Tìm kiếm theo từ khoá (tên sản phẩm, mô tả).
  - Lọc theo các khoảng giá (dưới 5tr, 5-15tr, 15-30tr, trên 30tr).
  - Sắp xếp theo giá tăng dần, giá giảm dần, mới nhất hoặc đánh giá cao nhất.
  - Sẵn 9+ sản phẩm demo có ảnh HD và mô tả chi tiết.
- **Giỏ hàng & Đặt hàng (Cart & Orders):**
  - Thêm vào giỏ hàng, cập nhật số lượng `+ / -`, xoá sản phẩm.
  - Tự động trừ tồn kho khi thanh toán.
  - Đặt hàng với địa chỉ & số điện thoại nhận hàng.
  - Xem lịch sử đơn hàng của cá nhân.
- **Giao diện Web UI hiện đại:**
  - Được xây dựng bằng HTML5, CSS3 hiện đại, Vanilla JS.
  - Phục vụ trực tiếp từ server (NestJS ServeStatic), đóng gói 1 container duy nhất.
- **Sẵn sàng triển khai AWS (AWS Ready):**
  - `Dockerfile` multi-stage tối ưu dung lượng (Node 20 Alpine).
  - `docker-compose.yml` (Backend + PostgreSQL 16) chạy trong 1 lệnh duy nhất.
  - Endpoint kiểm tra sức khoẻ: `/api/health` cho AWS ALB / Target Group.
  - Swagger API tài liệu tự động: `/api/docs`.

---

## 🚀 2. Chạy thử cục bộ (Local Development)

Hệ thống hỗ trợ cơ chế **Dual-Database**: Mặc định chạy SQLite không cần cài đặt hay cấu hình mật khẩu database phức tạp.

```bash
# 1. Cài đặt thư viện
npm install

# 2. Khởi chạy ở chế độ dev
npm run start:dev
```

Sau khi chạy lệnh trên:
- 🌐 **Giao diện Web:** [http://localhost:3000](http://localhost:3000)
- 📑 **Swagger API:** [http://localhost:3000/api/docs](http://localhost:3000/api/docs)
- ❤️ **Health Check:** [http://localhost:3000/api/health](http://localhost:3000/api/health)

> **Tài khoản dùng thử có sẵn:**
> - **Email:** `customer@shopfast.vn`
> - **Mật khẩu:** `Customer@123`
> *(Có nút bấm 1-click điền sẵn trên form đăng nhập)*

---

## ☁️ 3. Hướng dẫn triển khai lên AWS EC2

### Bước 1: Khởi tạo máy chủ EC2
1. Đăng nhập vào AWS Console, vào dịch vụ **EC2** -> **Launch Instance**.
2. Chọn AMI: **Ubuntu Server 24.04 LTS** (hoặc Amazon Linux 2023).
3. Instance Type: **t3.micro** hoặc **t2.micro** (nằm trong Free Tier).
4. Security Group: Mở các cổng sau:
   - **Port 22 (SSH):** Chỉ IP của bạn hoặc 0.0.0.0/0
   - **Port 80 (HTTP):** 0.0.0.0/0
   - **Port 443 (HTTPS):** 0.0.0.0/0
   - **Port 3000 (App - tuỳ chọn nếu không dùng Nginx):** 0.0.0.0/0

### Bước 2: Cài đặt Docker & Docker Compose trên EC2
SSH vào máy chủ EC2 của bạn:
```bash
ssh -i "your-key.pem" ubuntu@<EC2-PUBLIC-IP>
```

Cài đặt Docker:
```bash
sudo apt-get update
sudo apt-get install -y docker.io docker-compose-v2 git
sudo usermod -aG docker $USER
newgrp docker
```

### Bước 3: Đưa mã nguồn lên EC2 và Chạy ứng dụng
Clone dự án từ GitHub của bạn:
```bash
git clone <URL_REPO_CUA_BAN> shopfast
cd shopfast
```

Khởi chạy bằng Docker Compose:
```bash
docker compose up -d --build
```

Kiểm tra container đang chạy:
```bash
docker compose ps
docker compose logs -f app
```

Bây giờ bạn có thể truy cập ngay: `http://<EC2-PUBLIC-IP>:3000/`

---

### Bước 4 (Khuyên dùng): Cấu hình Nginx Reverse Proxy & HTTPS miễn phí

Để truy cập qua cổng chuẩn 80/443 và gắn tên miền:

1. **Cài Nginx & Certbot:**
   ```bash
   sudo apt install -y nginx certbot python3-certbot-nginx
   ```

2. **Cấu hình Nginx Reverse Proxy:**
   Tạo file `/etc/nginx/sites-available/shopfast`:
   ```nginx
   server {
       server_name your-domain.com www.your-domain.com; # Hoặc IP nếu chưa có domain

       location / {
           proxy_pass http://127.0.0.1:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
       }
   }
   ```

   Kích hoạt site:
   ```bash
   sudo ln -s /etc/nginx/sites-available/shopfast /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx
   ```

3. **Kích hoạt SSL HTTPS miễn phí với Let's Encrypt:**
   ```bash
   sudo certbot --nginx -d your-domain.com
   ```

---

## 🛠️ 4. Danh sách API chính

| Phương thức | Đường dẫn | Mô tả |
|---|---|---|
| `GET` | `/api/health` | Kiểm tra trạng thái máy chủ (Uptime, Status) |
| `POST` | `/api/auth/register` | Đăng ký tài khoản khách hàng |
| `POST` | `/api/auth/login` | Đăng nhập lấy JWT Access Token |
| `GET` | `/api/auth/me` | Lấy thông tin tài khoản đang đăng nhập |
| `GET` | `/api/categories` | Lấy danh mục ngành hàng |
| `GET` | `/api/products` | Lấy danh sách sản phẩm (có lọc theo giá, danh mục, tìm kiếm, sắp xếp) |
| `GET` | `/api/products/:id` | Xem chi tiết 1 sản phẩm |
| `GET` | `/api/cart` | Lấy giỏ hàng của người dùng |
| `POST` | `/api/cart/items` | Thêm sản phẩm vào giỏ hàng |
| `PATCH` | `/api/cart/items/:id` | Cập nhật số lượng sản phẩm trong giỏ |
| `DELETE`| `/api/cart/items/:id` | Xoá sản phẩm khỏi giỏ |
| `POST` | `/api/orders/checkout` | Đặt hàng từ giỏ hàng (tự động trừ tồn kho) |
| `GET` | `/api/orders/my` | Xem danh sách đơn hàng đã mua |
