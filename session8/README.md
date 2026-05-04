# Báo Cáo Dự Án: FitLife – Premium Fitness Club Website

**Môn học:** Fullstack JavaScript  
**Đơn vị:** Rikkei Education  
**Năm:** 2026

---

## 1. Giới Thiệu Dự Án

**FitLife** là website giới thiệu phòng gym cao cấp, được xây dựng bằng HTML và Tailwind CSS v4. Dự án mô phỏng một sản phẩm thực tế gồm 4 trang hoàn chỉnh, thiết kế theo phong cách tối (dark theme), có khả năng responsive trên nhiều thiết bị.

---

## 2. Công Nghệ Sử Dụng

| Công nghệ     | Phiên bản | Mục đích                    |
|---------------|-----------|-----------------------------|
| HTML5         | —         | Cấu trúc trang              |
| Tailwind CSS  | v4.2.4    | Styling toàn bộ giao diện   |
| Font Awesome  | 6.5.1     | Icon hệ thống               |
| Node.js / npm | —         | Build tool (CLI watch mode) |

### Cấu hình Tailwind (`src/input.css`)

```css
@import 'tailwindcss';

@theme {
    --color-header: #1f2937;
    --color-gym_primary: #111827;
    --color-rose: #e11d48;
    --color-light_rose: #f43f5e;
    --color-deep_gray: #9ca3af;
}

@custom-variant hover (&:hover);
```

> `@custom-variant hover (&:hover)` được thêm để đảm bảo hiệu ứng hover hoạt động trên cả thiết bị cảm ứng (mobile), vì Tailwind v4 mặc định bọc hover trong `@media (hover: hover)`.

### Build command

```bash
npm run dev
# = tailwindcss -i ./src/input.css -o ./src/output.css --watch
```

---

## 3. Cấu Trúc Dự Án

```
session8/
├── package.json
├── README.md
└── src/
    ├── input.css           ← Tailwind config & custom theme
    ├── output.css          ← CSS đã compile (auto-generated)
    ├── index.html          ← Trang chủ
    ├── assets/
    │   └── images/
    │       ├── hero_fitness.png
    │       ├── weight_lifting.png
    │       ├── yoga_class.png
    │       ├── tang_co_tham_my.png
    │       └── services_hero.jpg
    ├── services/
    │   └── index.html      ← Trang Dịch vụ
    ├── lessons/
    │   └── index.html      ← Trang Lớp học
    └── about/
        └── index.html      ← Trang Liên hệ / Đăng ký
```

---

## 4. Mô Tả Các Trang

### 4.1 Trang Chủ (`src/index.html`)

**Mục đích:** Trang landing chính, giới thiệu tổng quan về phòng gym.

**Các section:**
- **Header (sticky):** Logo FitLife + nav desktop (ẩn trên mobile) + nút CTA "Tham gia ngay"
- **Hero:** Ảnh nền fullwidth với overlay tối, tiêu đề lớn, mô tả, nút CTA và 3 thống kê (500+ thành viên, 15+ PT, 24/7)
- **Tại sao chọn chúng tôi:** 3 card icon – Thiết bị hiện đại, PT Chuyên nghiệp, Mở cửa 24/7
- **Khóa học nổi bật:** 3 card khóa học (Lột Xác 30 Ngày, Yoga Trị Liệu, Tăng Cơ Thẩm Mỹ) với badge, ảnh, mô tả và link tư vấn
- **Footer:** Logo, nav, thông tin liên hệ, mạng xã hội

**Responsive:** Hero text scale (`text-4xl md:text-6xl`), cards xếp dọc mobile (`flex-col md:flex-row`), footer 4 cột → 1 cột (`flex-col md:flex-row`).

---

### 4.2 Trang Dịch Vụ (`src/services/index.html`)

**Mục đích:** Giới thiệu các dịch vụ và bảng giá.

**Các section:**
- **Hero:** Ảnh nền `services_hero.jpg`, tiêu đề + mô tả
- **Dịch Vụ Nổi Bật:** Grid 6 card dịch vụ (Gym Cá Nhân, Cardio & HIIT, Yoga & Thiền, Tư Vấn Dinh Dưỡng, Bể Bơi & Phục Hồi, Thi Đấu & Thể Hình) – mỗi card có icon, tiêu đề hover đổi màu, mô tả và link
- **Bảng Giá Dịch Vụ:** 3 gói (Basic 1.999k, Pro 3.999k – nổi bật, VIP 5.999k) với danh sách tính năng và nút đăng ký
- **CTA Section:** Kêu gọi đăng ký tập thử miễn phí

**Responsive:** Grid `grid-cols-1 md:grid-cols-3`, bảng giá `flex-col md:flex-row`, gói Pro `md:scale-105`.

---

### 4.3 Trang Lớp Học (`src/lessons/index.html`)

**Mục đích:** Giới thiệu lớp học, lịch học và đội ngũ HLV.

**Các section:**
- **Lớp Học Tiêu Biểu:** 2 card nằm ngang (ảnh + nội dung) giới thiệu Thể Hình Sức Mạnh và Yoga Thiền Định
- **Lịch Học Tuần Này:** Bảng lịch (4 cột: Thời gian, Thứ Hai, Thứ Tư, Thứ Sáu) với `overflow-x-auto` để scroll ngang trên mobile
- **Đội Ngũ Huấn Luyện Viên:** 3 card PT (Marcus, Elena, David) với ảnh, chuyên môn, mô tả và social links

**Responsive:** Cards lớp học `flex-col md:flex-row`, trainer cards `flex-col md:flex-row`, table scroll ngang.

---

### 4.4 Trang Liên Hệ (`src/about/index.html`)

**Mục đích:** Form đăng ký và thông tin liên hệ.

**Các section:**
- **Hero:** Banner với tiêu đề liên hệ
- **Thông tin liên hệ:** Cards icon (địa chỉ, phone, email, giờ mở cửa) + mạng xã hội
- **Form đăng ký:** Họ tên, email, số điện thoại, mục tiêu (select), tin nhắn (textarea), checkbox đồng ý, nút gửi
- **Google Maps embed:** Bản đồ nhúng

**Responsive:** Layout 2 cột (thông tin + form) → 1 cột trên mobile.

---

## 5. Các Kỹ Thuật Nổi Bật

### Dark Theme nhất quán
Toàn bộ dùng 2 màu nền chính: `bg-gym_primary` (#111827) và `bg-header` (#1F2937), tạo chiều sâu phân cấp layout.

### Group Hover
Dùng `group` trên container + `group-hover:` trên child elements để tạo hiệu ứng đồng bộ (ảnh zoom + tiêu đề đổi màu + gạch chân link khi hover vào card).

```html
<article class="group border border-transparent hover:border-rose ...">
    <img class="group-hover:scale-110 ..." />
    <h3 class="group-hover:text-rose ..." />
</article>
```

### Card chiều cao đều nhau (`flex-col` + `mt-auto`)
```html
<article class="flex flex-col ...">
    <div class="p-6">...</div>
    <hr class="mt-auto" />   ← đẩy footer card xuống đáy
    <div class="flex justify-between ...">...</div>
</article>
```

### Background image trong Tailwind v4
URL ảnh nền phải tính từ vị trí `output.css`, không phải từ HTML file:
```html
<!-- Luôn dùng ./assets/images/... dù HTML ở thư mục con -->
bg-[url('./assets/images/hero_fitness.png')]
```

### Responsive Mobile-first
| Màn hình | Prefix       | Breakpoint |
|----------|--------------|------------|
| Mobile   | _(không có)_ | < 768px    |
| Desktop  | `md:`        | ≥ 768px    |

---

## 6. Vấn Đề Gặp Phải & Cách Giải Quyết

| Vấn đề                                          | Nguyên nhân                                    | Giải pháp                                                 |
|-------------------------------------------------|------------------------------------------------|-----------------------------------------------------------|
| `hover:` không hoạt động trên mobile            | Tailwind v4 wrap trong `@media (hover: hover)` | Thêm `@custom-variant hover (&:hover)` vào `input.css`    |
| Ảnh nền `bg-[url()]` không hiển thị ở trang con | URL tính từ `output.css`, không phải HTML      | Dùng `./assets/images/...` thay vì `../assets/images/...` |
| Card chiều cao không đều                        | Content khác nhau                              | Dùng `flex flex-col` + `mt-auto` trên divider             |
| `text-md` không hợp lệ                          | Class không tồn tại trong Tailwind             | Thay bằng `text-base` hoặc `text-sm`                      |
| Table tràn màn hình mobile                      | Bảng có nhiều cột cố định                      | Bọc trong `div` có `overflow-x-auto`                      |

---

## 7. Kết Quả

Website FitLife hoàn thành đầy đủ 4 trang với:
- Giao diện dark theme chuyên nghiệp, thống nhất
- Responsive trên mobile và desktop
- Hiệu ứng hover mượt mà (transition, scale, màu sắc)
- Cấu trúc HTML semantic rõ ràng
- Custom color theme qua Tailwind CSS v4 `@theme`
