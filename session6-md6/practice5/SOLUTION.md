# Báo Cáo Giải Bài Tập 5 (Session 6): Vá Lỗi Image 1,4 GB và Lộ Khóa Bí Mật

**Học viên:** [FJS-MD6] Professional Backend Development & Optimization  
**Mã bài tập:** `homeworkId: 10243` | `session6-md6/practice5`  
**Mức độ:** Vận dụng cơ bản  

---

## 1. PHÂN TÍCH HAI KHIẾM KHUYẾT CỐT LÕI

### Khiếm khuyết 1: Lỗ hổng nghiêm trọng lộ khóa bí mật trong Docker Image Layers
- **Nguyên nhân:** Dockerfile cũ sử dụng lệnh `ENV JWT_SECRET="super-secret-key-123"` hoặc `COPY .env ./`. Dù ở layer sau có chạy `RUN rm .env` thì chuỗi bí mật vẫn bị ghi lại vĩnh viễn trong lịch sử các lớp trung gian (Intermediate Layers), bất kỳ ai có quyền pull image đều trích xuất được bằng lệnh `docker history`.
- **Khắc phục:** Tuyệt đối không nhúng Secret vào Dockerfile. Sử dụng Docker BuildKit Secret Mount (`--mount=type=secret`) hoặc truyền Environment Variables lúc khởi chạy container (`docker run -e` / Kubernetes Secret).

### Khiếm khuyết 2: Image phình to 1,4 GB và ngốn băng thông kéo image
- **Nguyên nhân:** Dùng base image đầy đủ `node:latest` (~1.1 GB), không tạo file `.dockerignore` dẫn đến việc `COPY . .` chép cả thư mục `node_modules` local và thư mục lịch sử `.git` vào image, kèm theo toàn bộ devDependencies (TypeScript, ESLint, Jest).
- **Khắc phục:** 
  1. Thêm `.dockerignore` loại trừ `node_modules`, `.git`, `dist`.
  2. Áp dụng **Multi-stage Build**: Stage 1 (`builder`) dùng để compile TypeScript; Stage 2 (`runtime`) dùng base `node:20-alpine`, chỉ copy thư mục `dist/` và chạy `npm ci --omit=dev`. Dung lượng image giảm từ **1,4 GB xuống còn ~110 MB** (giảm hơn 90%).
