# 🏢 HRM - Human Resource Management System

Hệ thống quản lý nhân sự chuyên nghiệp được xây dựng bằng **React 19**, **TypeScript**, và **Vite**. Ứng dụng cung cấp các chức năng quản lý danh sách nhân viên, tìm kiếm/lọc thông tin, phân trang, xác thực người dùng và được kiểm thử toàn diện với **Vitest**.

---

## 🚀 Tính năng nổi bật

### 🔐 1. Xác thực & Phân quyền (Authentication & Authorization)
- **Đăng nhập hệ thống**: Kiểm tra mật khẩu đã được mã hóa (hashing với `bcryptjs`).
- **Bảo vệ đường dẫn (Protected Routes)**: Chỉ người dùng đã đăng nhập mới có thể truy cập vào Dashboard quản lý.
- **Quản lý trạng thái đăng nhập**: Sử dụng Zustand lưu giữ thông tin phiên làm việc.

### 👥 2. Quản lý Nhân sự (Employee Management)
- **Danh sách nhân viên**: Hiển thị dạng bảng (Table) với thông tin chi tiết (Họ tên, Email, Số điện thoại, Chức vụ, Phòng ban, Trạng thái, Ngày bắt đầu).
- **Tìm kiếm thông minh**: Hỗ trợ tìm kiếm theo tên/phòng ban/chức vụ kể cả khi gõ tiếng Việt không dấu.
- **Lọc theo trạng thái**: Phân loại nhân viên theo các tab (Tất cả, Đang hoạt động `ACTIVE`, Tạm ngừng `INACTIVE`, Nghỉ phép `ON_LEAVE`).
- **Phân trang (Pagination)**: Tự động chia danh sách nhân viên theo trang (5 nhân viên / trang).
- **Thêm / Chỉnh sửa nhân viên**: Modal form với kiểm tra dữ liệu đầu vào chuẩn xác (Validate bằng Zod + React Hook Form).
- **Xóa nhân viên**: Xóa có xác nhận qua Dialog để tránh thao tác nhầm.
- **Cập nhật tức thì (Real-time updates)**: Tự động refetch và đồng bộ dữ liệu nhờ **React Query (@tanstack/react-query)**.

### 🧪 3. Kiểm thử & Chất lượng mã nguồn (Testing & Quality)
- Unit test & Integration test cho các Zod Schemas, Helper functions, Protected Routes, và Zustand Auth Store.
- Linter cực nhanh với **Oxlint**.

---

## 🛠️ Công nghệ sử dụng (Tech Stack)

| Phân loại | Công nghệ / Thư viện |
| :--- | :--- |
| **Core** | React 19, TypeScript, Vite |
| **Styling & UI** | Tailwind CSS v4, Lucide React (Icons), Custom UI Components (Button, Modal, Input, Badge, Table, Skeleton, Card) |
| **State Management** | Zustand (Auth State), React Query v5 (Server State & Caching) |
| **Form & Validation** | React Hook Form, Zod, @hookform/resolvers |
| **HTTP Client & Mock Server** | Axios, JSON Server (`db.json`) |
| **Security & Utilities** | BcryptJS (Password hashing), Jose (JWT/Token handling) |
| **Testing & Linting** | Vitest, React Testing Library, JSDOM, Oxlint |

---

## 📁 Cấu trúc thư mục (Project Structure)

```text
react-project/
├── public/                 # Assets tĩnh
├── scripts/
│   └── seed.mjs            # Script khởi tạo dữ liệu mẫu với password hash bcrypt
├── src/
│   ├── apis/               # Cấu hình Axios client & các API calls (Employee, User)
│   ├── components/         # Các UI component tái sử dụng (Button, Modal, Input, Table...)
│   ├── hooks/              # Custom React Hooks
│   ├── interfaces/         # TypeScript Interfaces (Employee, User...)
│   ├── pages/              # Các trang chính
│   │   ├── auth/           # LoginPage
│   │   └── dashboard/      # DashboardLayout & EmployeesPage (Form, Delete Dialog)
│   ├── routes/             # Định tuyến với React Router & ProtectedRoute
│   ├── schema/             # Validation Schemas (Zod: employee.schema, login.schema)
│   ├── stores/             # Global stores (Zustand: authStore)
│   ├── test/               # File kiểm thử (Vitest / React Testing Library)
│   └── utils/              # Helper functions (removeVietnameseTones, formatters...)
├── db.json                 # Cơ sở dữ liệu mock cho JSON Server
├── package.json            # Khai báo dependencies & npm scripts
└── vite.config.ts          # Cấu hình Vite & Vitest
```

---

## ⚡ Hướng dẫn Cài đặt & Khởi chạy

### 1. Yêu cầu tiên quyết
- **Node.js**: >= 18.x
- **npm** hoặc **yarn** / **pnpm**

### 2. Cài đặt Dependencies
Mở terminal tại thư mục project và chạy:
```bash
npm install
```

### 3. Tạo dữ liệu mẫu (Seed Data)
Chạy script để khởi tạo dữ liệu mặc định vào file `db.json` (bao gồm mật khẩu đã được mã hóa):
```bash
npm run seed
```

### 4. Khởi chạy Mock Server (JSON Server)
Mở một cửa sổ terminal mới và chạy JSON Server tại cổng `3000`:
```bash
npm run sv
```
*(Server sẽ chạy tại: `http://localhost:3000`)*

### 5. Khởi chạy ứng dụng Web (Vite Dev Server)
Tại cửa sổ terminal chính, chạy:
```bash
npm run dev
```
*(Ứng dụng sẽ chạy tại địa chỉ được hiển thị ở terminal, mặc định `http://localhost:5173`)*

---

## 🔑 Tài khoản đăng nhập mẫu (Demo Credentials)

Sau khi chạy `npm run seed`, bạn có thể sử dụng các tài khoản sau để đăng nhập vào ứng dụng:

| Email | Mật khẩu | Vai trò (Role) |
| :--- | :--- | :--- |
| `admin@hrm.com` | `Admin@123` | **ADMIN** |
| `huong@hrm.com` | `Huong@123` | **EMPLOYEE** |
| `tuan@hrm.com` | `Tuan@123` | **EMPLOYEE** |

---

## 📜 Các câu lệnh NPM (Scripts)

| Lệnh | Mô tả |
| :--- | :--- |
| `npm run dev` | Khởi chạy server phát triển Vite HMR |
| `npm run build` | Biên dịch TypeScript & Build sản phẩm tĩnh cho Production |
| `npm run preview` | Xem trước bản build Production tại local |
| `npm run sv` | Khởi chạy REST API Mock Server với JSON Server (`http://localhost:3000`) |
| `npm run seed` | Tạo mới/reset dữ liệu mẫu `db.json` |
| `npm run test` | Chạy bộ kiểm thử tự động (Unit/Integration Tests) 1 lần |
| `npm run test:watch` | Chạy kiểm thử ở chế độ theo dõi thay đổi (Watch Mode) |
| `npm run test:coverage` | Chạy kiểm thử và tạo báo cáo độ phủ mã nguồn (Coverage Report) |
| `npm run lint` | Kiểm tra lỗi cú pháp và code quality bằng Oxlint |

---

## 🧪 Chạy Kiểm thử (Testing)

Dự án được tích hợp Vitest và React Testing Library. Để thực hiện kiểm thử:

```bash
# Chạy tất cả các test cases
npm run test

# Chạy test với báo cáo coverage
npm run test:coverage
```

Các kịch bản test bao gồm:
- Valid/Invalid Form Validation schemas (`employeeSchema.test.ts`, `loginSchema.test.ts`)
- Helper utilities test (`helperUtils.test.ts`)
- Zustand Store state changes (`authStore.test.ts`)
- Component & Route protection (`ProtectedRoute.test.tsx`)
