# Session 06: Responsive UI Development with Bootstrap

---

## 1. Bootstrap 5 là gì?

> **Bootstrap** là bộ công cụ (framework) mã nguồn mở Frontend **phổ biến nhất thế giới**, giúp xây dựng giao diện web nhanh chóng, đẹp mắt và **tự động đáp ứng** (Responsive) trên mọi kích thước màn hình.

### 1.1. Bootstrap gồm 3 thành phần chính

| Thành phần     | Vai trò             | Ví dụ                                        |
|----------------|---------------------|----------------------------------------------|
| **HTML**       | Cấu trúc nội dung   | Các class dựng sẵn cho grid, card, navbar... |
| **CSS**        | Định dạng giao diện | Hệ thống lưới 12 cột, typography, spacing... |
| **JavaScript** | Tương tác động      | Modal, Dropdown, Carousel, Collapse...       |

### 1.2. Hiểu đơn giản

Thay vì viết CSS từ đầu cho mọi thứ:

```css
/* Không dùng Bootstrap — phải viết tay */
.btn {
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    background-color: #0d6efd;
    color: white;
    cursor: pointer;
}
.btn:hover { background-color: #0b5ed7; }
```

Với Bootstrap chỉ cần **thêm class**:

```html
<!-- Dùng Bootstrap — 1 dòng là xong -->
<button class="btn btn-primary">Click me</button>
```

Bootstrap đã viết sẵn hàng trăm class CSS như vậy, giúp ta **lắp ghép giao diện** nhanh chóng mà không cần viết CSS thủ công.

### 1.3. Under the Hood — Tại sao thêm class lại đổi được CSS?

#### Bước 1: Trình duyệt đọc CSS như thế nào?

Khi ta viết HTML, trình duyệt đọc từ trên xuống dưới. Gặp thẻ `<link>` hoặc `<style>`, nó sẽ **tải file CSS về** và xây dựng một bảng quy tắc:

```
File CSS được tải về → Trình duyệt phân tích → Bảng quy tắc (Rules)

Quy tắc 1:  .btn          → { padding: 8px 16px; border-radius: 4px; ... }
Quy tắc 2:  .btn-primary  → { background-color: #0d6efd; color: #fff; ... }
Quy tắc 3:  .text-center  → { text-align: center; }
Quy tắc 4:  .mt-3         → { margin-top: 1rem; }
... (hàng nghìn quy tắc khác)
```

#### Bước 2: Class HTML = "chìa khóa" tra bảng quy tắc

Khi trình duyệt gặp một phần tử HTML, nó **đem class đi tra bảng** quy tắc CSS:

```html
<button class="btn btn-primary">Click me</button>
```

```
Trình duyệt thấy class="btn btn-primary"
  │
  ├── Tra "btn"         → Tìm thấy! Áp dụng: padding, border-radius, cursor...
  ├── Tra "btn-primary" → Tìm thấy! Áp dụng: background-color, color, border...
  │
  └── Kết quả cuối cùng: GỘP tất cả CSS lại → Hiển thị nút xanh, bo góc, có padding
```

> **Bản chất**: Class không "tạo ra" CSS — class chỉ là **cái tên** để trình duyệt **tìm đúng quy tắc CSS** đã được viết sẵn.

#### Bước 3: Bootstrap = File CSS khổng lồ đã viết sẵn

Khi ta thêm thẻ `<link>` CDN vào `<head>`:

```html
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
      rel="stylesheet">
```

Trình duyệt **tải về 1 file CSS ~230KB** chứa hàng nghìn quy tắc có sẵn:

```css
/* Bên trong bootstrap.min.css (đã được viết sẵn bởi đội ngũ Bootstrap) */

/* Hệ thống Grid */
.container { width: 100%; padding-right: 0.75rem; padding-left: 0.75rem; margin: auto; }
.row { display: flex; flex-wrap: wrap; }
.col-6 { flex: 0 0 auto; width: 50%; }
.col-12 { flex: 0 0 auto; width: 100%; }

/* Buttons */
.btn { padding: .375rem .75rem; border-radius: .375rem; cursor: pointer; }
.btn-primary { background-color: #0d6efd; border-color: #0d6efd; color: #fff; }
.btn-danger { background-color: #dc3545; border-color: #dc3545; color: #fff; }

/* Spacing */
.mt-1 { margin-top: 0.25rem; }
.mt-2 { margin-top: 0.5rem; }
.mt-3 { margin-top: 1rem; }
.p-3 { padding: 1rem; }

/* Typography */
.text-center { text-align: center; }
.fw-bold { font-weight: 700; }

/* ... hàng nghìn class khác ... */
```

#### Bước 4: Quy trình hoàn chỉnh

```
                    ┌─────────────────────────────┐
Bước 1: <link>  →  │ Tải bootstrap.min.css (230KB) │
                    │ → Xây bảng ~10,000 quy tắc   │
                    └──────────────┬──────────────┘
                                   │
Bước 2: HTML    →  <button class="btn btn-primary">
                                   │
                    ┌──────────────▼──────────────┐
Bước 3: Tra bảng → │ "btn"         → có! áp dụng  │
                    │ "btn-primary" → có! áp dụng  │
                    └──────────────┬──────────────┘
                                   │
Bước 4: Render  →  ┌──────────────▼──────────────┐
                    │  [ Click me ]  ← Nút xanh    │
                    │  (padding, bo góc, màu xanh)  │
                    └───────────────────────────────┘
```

#### Tóm lại

| Câu hỏi                         | Trả lời                                                                          |
|---------------------------------|----------------------------------------------------------------------------------|
| Bootstrap là gì?                | Một **file CSS cực lớn** chứa hàng nghìn class đã viết sẵn                       |
| Tại sao thêm class là có style? | Vì trình duyệt **tra tên class** trong file CSS đó và tìm thấy quy tắc tương ứng |
| Nếu không thêm `<link>` CDN?    | Không có file CSS → tra class không thấy → **không có style** gì cả              |
| Class có phải phép màu?         | Không — chỉ là **cái tên** để map đến CSS. Bản chất vẫn là CSS thuần             |

---

## 2. Tại sao chọn Bootstrap?

### 2.1. Ba lý do chính

| Lợi ích                            | Giải thích dễ hiểu                                                                                                    |
|------------------------------------|-----------------------------------------------------------------------------------------------------------------------|
| **Phát triển cực nhanh**           | Không cần viết CSS từ đầu — chỉ thêm class có sẵn như `btn`, `card`, `row`, `col`... là đã có giao diện đẹp           |
| **Đồng nhất trên mọi trình duyệt** | Bootstrap đã xử lý sẵn các khác biệt giữa Chrome, Firefox, Safari, Edge → giao diện hiển thị **giống nhau** ở mọi nơi |
| **Responsive tích hợp sẵn**        | Mặc định giao diện tự co giãn phù hợp từ điện thoại đến desktop mà **không cần viết thêm media query**                |

### 2.2. So sánh: Có và không có Bootstrap

| Tác vụ            | Không Bootstrap                 | Có Bootstrap                                 |
|-------------------|---------------------------------|----------------------------------------------|
| Tạo layout 2 cột  | Viết flexbox/grid + media query | `<div class="row"><div class="col-md-6">...` |
| Tạo nút bấm       | Tự viết `.btn` + hover + active | `class="btn btn-primary"`                    |
| Responsive navbar | ~50 dòng CSS + JS               | `class="navbar navbar-expand-lg"`            |
| Form đẹp          | Tự style input/label/validation | `class="form-control"`, `form-label`         |

---

## 3. Triết lý Mobile-First

> **Mobile-First** = Thiết kế cho **màn hình nhỏ nhất** (điện thoại) trước, sau đó **mở rộng dần** lên tablet rồi desktop.

```
Điện thoại (mặc định)  →  Tablet (≥768px)  →  Desktop (≥992px)
    ┌─────┐              ┌──────────┐         ┌────────────────┐
    │ 1   │              │  1  │  2 │         │  1  │  2  │  3 │
    │ 2   │              │─────│────│         │─────│─────│────│
    │ 3   │              │  3       │         │                │
    └─────┘              └──────────┘         └────────────────┘
```

**Tại sao Mobile-First?**
- Hơn **60%** lưu lượng web đến từ thiết bị di động
- Thiết kế cho nhỏ trước → đảm bảo **nội dung cốt lõi** luôn hiển thị tốt
- Mở rộng lên lớn dễ hơn thu nhỏ xuống nhỏ

Trong Bootstrap, các class **không có breakpoint** sẽ áp dụng cho **tất cả** kích thước (từ nhỏ nhất):

```html
<!-- col-12: mặc định chiếm 12 cột (toàn bộ) trên mọi màn hình -->
<!-- col-md-6: từ ≥768px trở lên → chiếm 6 cột (50%) -->
<div class="col-12 col-md-6">Nội dung</div>
```

---

## 4. Tích hợp Bootstrap qua CDN

### 4.1. CDN là gì?

> **CDN** (Content Delivery Network) = **Mạng phân phối nội dung** — một hệ thống gồm hàng trăm máy chủ đặt ở khắp nơi trên thế giới, chuyên lưu trữ và phân phối các file tĩnh (CSS, JS, hình ảnh...).

#### Không có CDN — Tải file từ 1 máy chủ gốc

```
Người dùng (Việt Nam) ──── kết nối xuyên đại dương ────→ Máy chủ gốc (Mỹ)
                           ↑ CHẬM (khoảng cách xa)        │
                           └───────── nhận file ───────────┘
```

#### Có CDN — Tải file từ máy chủ gần nhất

```
                        ┌── CDN Server (Singapore) ← gần nhất!
                        │
Người dùng (Việt Nam) ──┤── CDN Server (Nhật Bản)
                        │
                        └── CDN Server (Mỹ)

→ CDN tự động chọn server GẦN NHẤT → tải file NHANH hơn rất nhiều
```

#### Tại sao dùng CDN cho Bootstrap?

| Lợi ích               | Giải thích                                                                                                                  |
|-----------------------|-----------------------------------------------------------------------------------------------------------------------------|
| **Nhanh**             | File Bootstrap được tải từ server gần người dùng nhất, không cần hosting trên máy chủ riêng                                 |
| **Cache trình duyệt** | Nếu người dùng đã truy cập trang web khác cũng dùng Bootstrap CDN → trình duyệt đã **lưu sẵn file** → **không cần tải lại** |
| **Không cần tải về**  | Chỉ cần dán 2 dòng link vào HTML là xong, không cần download hay cài đặt gì                                                 |
| **Luôn sẵn sàng**     | CDN lớn (jsDelivr, cdnjs) có uptime ~99.99%, gần như không bao giờ sập                                                      |

### 4.2. Cách tích hợp — Từng bước chi tiết

#### Bước 1: Thêm CSS vào `<head>`

```html
<head>
    <!-- Thẻ này BẮT BUỘC cho responsive -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!-- Nạp file CSS của Bootstrap từ CDN -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
          rel="stylesheet">
</head>
```

**Chuyện gì xảy ra?**

```
Trình duyệt đọc <link href="...bootstrap.min.css">
  │
  ├── Gửi HTTP request đến cdn.jsdelivr.net
  ├── CDN trả về file bootstrap.min.css (~230KB)
  ├── Trình duyệt parse file → xây bảng ~10,000 quy tắc CSS
  │
  └── Từ giờ, mọi class Bootstrap (btn, row, col...) đều có style!
```

#### Bước 2: Thêm JS vào cuối `<body>`

```html
<body>
    <!-- ... nội dung trang ... -->

    <!-- Nạp file JS của Bootstrap (đặt cuối body) -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js">
    </script>
</body>
```

**Tại sao đặt cuối `<body>`?**

```
Đặt trong <head>:                    Đặt cuối <body>:
┌──────────────────┐                  ┌──────────────────┐
│ 1. Tải CSS  ✓    │                  │ 1. Tải CSS  ✓    │
│ 2. Tải JS   ⏳   │ ← CHẶN!         │ 2. Hiển thị HTML │ ← Người dùng thấy ngay!
│    (chờ tải xong) │    Trang trắng   │ 3. Tải JS  ⏳    │ ← Tải ngầm phía sau
│ 3. Hiển thị HTML │                  │ 4. JS sẵn sàng   │
└──────────────────┘                  └──────────────────┘

→ Đặt cuối body = trang hiển thị NHANH hơn, JS tải song song
```

**`bundle.min.js` là gì?**
- `bundle` = đã gộp sẵn thư viện **Popper.js** (dùng cho Dropdown, Tooltip, Popover)
- `min` = đã nén (minified), bỏ hết khoảng trắng và comment → file nhỏ hơn
- Nếu chỉ dùng `bootstrap.min.js` (không có bundle) → phải thêm Popper.js riêng

### 4.3. Template hoàn chỉnh — Copy & Paste

```html
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Trang Bootstrap</title>

    <!-- 1. CSS của Bootstrap -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
          rel="stylesheet">

    <!-- 2. CSS tùy chỉnh của bạn (đặt SAU Bootstrap để ghi đè) -->
    <link rel="stylesheet" href="style.css">
</head>
<body>

    <div class="container mt-5">
        <h1 class="text-center text-primary">Hello Bootstrap!</h1>
        <button class="btn btn-success">Nút xanh lá</button>
    </div>

    <!-- 3. JavaScript của Bootstrap (đặt cuối body) -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js">
    </script>
</body>
</html>
```

### 4.4. Thứ tự file CSS rất quan trọng!

```html
<head>
    <!-- 1. Bootstrap CSS trước -->
    <link href="...bootstrap.min.css" rel="stylesheet">

    <!-- 2. CSS của bạn SAU → để ghi đè Bootstrap -->
    <link href="style.css" rel="stylesheet">
</head>
```

```
CSS đọc từ trên xuống, quy tắc SAU sẽ GHI ĐÈ quy tắc TRƯỚC (cùng độ ưu tiên):

bootstrap.min.css:   .btn { border-radius: .375rem; }     ← Đọc trước
style.css:           .btn { border-radius: 20px; }         ← Đọc sau → GHI ĐÈ!

Kết quả: .btn có border-radius: 20px (lấy từ style.css của bạn)
```

> Nếu đặt `style.css` **TRƯỚC** Bootstrap → Bootstrap sẽ ghi đè lại CSS của bạn → mất hết tùy chỉnh!

### 4.5. Các cách tích hợp Bootstrap khác (ngoài CDN)

| Cách               | Mô tả                                          | Khi nào dùng                                          |
|--------------------|------------------------------------------------|-------------------------------------------------------|
| **CDN** (đang học) | Dán link trực tiếp vào HTML                    | Học tập, prototype, dự án nhỏ                         |
| **npm install**    | `npm install bootstrap` → import trong project | Dự án lớn dùng build tool (Webpack, Vite)             |
| **Download**       | Tải file .zip về, đặt trong thư mục dự án      | Khi cần làm việc offline                              |
| **Sass source**    | Import file `.scss` gốc của Bootstrap          | Khi cần tùy biến sâu (đổi biến, bỏ module không dùng) |

> **Trong khóa học này** ta dùng **CDN** vì nhanh nhất, không cần cài đặt gì.

### 4.6. Tổng kết quy trình CDN

```
Bạn viết HTML                CDN Server               Trình duyệt người dùng
─────────────                ──────────               ──────────────────────
                                                       1. Mở trang web
                                                          │
<link href="cdn...">  ──────────────────────────────→  2. Gặp <link> → gửi request
                             │                            │
                             ├── Trả file CSS (~230KB) ──→│
                             │                            3. Parse CSS → bảng quy tắc
                                                          │
<div class="btn">     ──────────────────────────────→  4. Tra class → áp dụng style
                                                          │
<script src="cdn..."> ──────────────────────────────→  5. Gặp <script> → tải JS
                             │                            │
                             ├── Trả file JS (~80KB)  ──→│
                                                          6. Modal, Dropdown... sẵn sàng!
```

---

## 5. Nền móng Layout: Container

> **Container** là phần tử bao bọc ngoài cùng, có nhiệm vụ **chứa, căn lề và đệm** nội dung cho trang web. Mọi layout Bootstrap đều bắt đầu từ Container.

### 5.1. Tại sao cần Container?

Nếu không có Container, nội dung sẽ **dính sát mép** trình duyệt:

```
Không có Container:                  Có Container:
┌─────────────────────────┐          ┌─────────────────────────┐
│Chữ dính sát mép trái    │          │   ┌─────────────────┐   │
│không có khoảng trống     │          │   │ Chữ được căn lề  │   │
│khó đọc và xấu           │          │   │ có padding 2 bên │   │
│                         │          │   │ dễ đọc và đẹp    │   │
└─────────────────────────┘          │   └─────────────────┘   │
                                     └─────────────────────────┘
                                          ↑ padding ↑ padding
```

Container tự động thêm **padding trái/phải** và **căn giữa** nội dung trên trang.

### 5.2. Ba loại Container — Giải thích chi tiết

#### Loại 1: `.container` — Chiều rộng cố định, nhảy bậc theo breakpoint

```html
<div class="container">
    <p>Nội dung ở giữa trang</p>
</div>
```

Chiều rộng **thay đổi theo từng mốc** (breakpoint), không phải mượt mà liên tục:

```
Kéo trình duyệt rộng dần:

< 576px:   ████████████████████████████████  ← 100% (full width)
≥ 576px:   ░░░░████████████████████░░░░░░░  ← nhảy xuống 540px
≥ 768px:   ░░░░░█████████████████████░░░░░  ← nhảy lên 720px
≥ 992px:   ░░░░░░████████████████████████░  ← nhảy lên 960px
≥ 1200px:  ░░░░░░░█████████████████████░░░  ← nhảy lên 1140px
≥ 1400px:  ░░░░░░░░████████████████████░░░  ← nhảy lên 1320px

████ = nội dung    ░░░░ = khoảng trống 2 bên (auto margin)
```

| Kích thước màn hình | Chiều rộng container | Hành vi                 |
|---------------------|----------------------|-------------------------|
| < 576px             | 100%                 | Full width (điện thoại) |
| ≥ 576px             | **540px**            | Căn giữa, 2 bên trống   |
| ≥ 768px             | **720px**            | Rộng hơn                |
| ≥ 992px             | **960px**            | Rộng hơn nữa            |
| ≥ 1200px            | **1140px**           | Desktop                 |
| ≥ 1400px            | **1320px**           | Màn hình lớn            |

**Khi nào dùng?** → Đa số trang web thông thường: blog, trang sản phẩm, trang giới thiệu. Nội dung căn giữa, không trải rộng hết màn hình.

#### Loại 2: `.container-fluid` — Luôn 100% chiều rộng

```html
<div class="container-fluid">
    <p>Nội dung trải rộng toàn bộ màn hình</p>
</div>
```

```
Bất kể màn hình bao nhiêu px:

< 576px:   ████████████████████████████████  ← 100%
≥ 576px:   ████████████████████████████████  ← 100%
≥ 768px:   ████████████████████████████████  ← 100%
≥ 1400px:  ████████████████████████████████  ← vẫn 100%!

→ Luôn chiếm TOÀN BỘ chiều rộng, chỉ có padding trái/phải nhẹ
```

**Khi nào dùng?** → Banner full-width, hero section, bản đồ Google Maps, dashboard admin.

#### Loại 3: `.container-{breakpoint}` — Kết hợp cả hai

Ví dụ `.container-md`:

```html
<div class="container-md">
    <p>100% khi mobile, cố định khi tablet trở lên</p>
</div>
```

```
< 768px:   ████████████████████████████████  ← 100% (giống fluid)
≥ 768px:   ░░░░░█████████████████████░░░░░  ← 720px (giống container)
≥ 992px:   ░░░░░░████████████████████████░  ← 960px
≥ 1200px:  ░░░░░░░█████████████████████░░░  ← 1140px

→ "Fluid" cho đến breakpoint md, sau đó "nhảy bậc" như .container
```

| Class            | 100% width cho đến... | Sau đó cố định từ... |
|------------------|-----------------------|----------------------|
| `.container-sm`  | < 576px               | ≥ 576px              |
| `.container-md`  | < 768px               | ≥ 768px              |
| `.container-lg`  | < 992px               | ≥ 992px              |
| `.container-xl`  | < 1200px              | ≥ 1200px             |
| `.container-xxl` | < 1400px              | ≥ 1400px             |

**Khi nào dùng?** → Khi muốn full-width trên mobile nhưng căn giữa trên desktop. Rất phổ biến cho layout hiện đại.

### 5.3. So sánh trực quan 3 loại

```
Màn hình 1400px:

.container:       ░░░░░░░░████████████████████░░░░░░░░  (1320px, căn giữa)
.container-fluid: ████████████████████████████████████  (100%)
.container-lg:    ░░░░░░░░████████████████████░░░░░░░░  (1320px, căn giữa)

Màn hình 600px:

.container:       ░░████████████████████████████████░░  (540px, căn giữa)
.container-fluid: ████████████████████████████████████  (100%)
.container-lg:    ████████████████████████████████████  (100%, vì < 992px)
```

### 5.4. Ví dụ thực tế — Kết hợp nhiều Container

```html
<!-- Hero banner full width -->
<div class="container-fluid bg-primary text-white p-5">
    <h1 class="text-center">Chào mừng đến với Website!</h1>
</div>

<!-- Nội dung chính căn giữa -->
<div class="container mt-4">
    <div class="row">
        <div class="col-md-8">Bài viết...</div>
        <div class="col-md-4">Sidebar</div>
    </div>
</div>

<!-- Footer full width -->
<div class="container-fluid bg-dark text-white p-4">
    <p class="text-center">© 2026 My Website</p>
</div>
```

```
┌──────────────── container-fluid (100%) ──────────────────┐
│              Chào mừng đến với Website!                   │  ← Hero (full)
├──────────────────────────────────────────────────────────┤
│    ░░░░ ┌── container (fixed width) ──┐ ░░░░            │
│    ░░░░ │ Bài viết...    │ Sidebar    │ ░░░░            │  ← Nội dung (căn giữa)
│    ░░░░ └─────────────────────────────┘ ░░░░            │
├──────────────────────────────────────────────────────────┤
│                   © 2026 My Website                      │  ← Footer (full)
└──────────────────────────────────────────────────────────┘
```

### 5.5. Lỗi thường gặp

| Lỗi                                | Vấn đề                                           | Cách sửa                                               |
|------------------------------------|--------------------------------------------------|--------------------------------------------------------|
| Lồng container trong container     | Layout bị padding kép, nội dung hẹp lại          | **Không bao giờ** lồng `.container` trong `.container` |
| Không dùng container               | Nội dung dính sát mép, grid system hoạt động sai | Luôn bọc nội dung trong 1 loại container               |
| Nhầm lẫn `-fluid` với `.container` | Layout bị rộng/hẹp không mong muốn               | Chọn đúng loại theo mục đích                           |

---

## 6. Hệ thống lưới 12 cột (Grid System)

> Không gian hiển thị được chia thành **12 phần bằng nhau**. Ta có thể gộp các phần lại với nhau để tạo bố cục linh hoạt.

### 6.1. Tại sao là 12?

Số 12 chia hết cho **1, 2, 3, 4, 6, 12** → dễ dàng tạo mọi kiểu bố cục:

```
12 cột:  |1|1|1|1|1|1|1|1|1|1|1|1|   → 12 cột đều nhau
 6 cột:  |  2  |  2  |  2  |  2  |  2  |  2  |   → 6 phần
 4 cột:  |   3   |   3   |   3   |   3   |   → 4 phần
 3 cột:  |    4    |    4    |    4    |   → 3 phần
 2 cột:  |      6      |      6      |   → 2 phần đều
 1 cột:  |            12             |   → Toàn bộ chiều rộng
```

### 6.2. Kết hợp Row và Column

Các cột (`.col`) **luôn phải** được đặt trực tiếp bên trong các hàng (`.row`):

```html
<!-- Chia đều 2 cột -->
<div class="row">
    <div class="col">Nội dung 1</div>
    <div class="col">Nội dung 2</div>
</div>

<!-- Chỉ định số cột cụ thể -->
<div class="row">
    <div class="col-8">Nội dung chính (8/12 = 66.7%)</div>
    <div class="col-4">Sidebar (4/12 = 33.3%)</div>
</div>
```

### 6.3. Lưới lồng nhau (Nested Grid)

Có thể đặt `.row` bên trong một `.col` để tạo lưới con:

```html
<div class="row">
    <div class="col-8">
        <!-- Lưới lồng bên trong -->
        <div class="row">
            <div class="col-6">Level 2 - A</div>
            <div class="col-6">Level 2 - B</div>
        </div>
    </div>
    <div class="col-4">Level 1 - Sidebar</div>
</div>
```

```
┌─────────────────────────────────────────┐
│  col-8                      │  col-4    │
│  ┌──────────┬──────────┐    │           │
│  │ Level 2A │ Level 2B │    │  Sidebar  │
│  └──────────┴──────────┘    │           │
└─────────────────────────────────────────┘
```

---

## 7. Điểm ngắt thiết bị (Breakpoints)

> **Breakpoints** là các mốc kích thước màn hình mà tại đó layout sẽ **tự động thay đổi cấu trúc**.

### 7.1. Bảng Breakpoints của Bootstrap 5

| Breakpoint  | Prefix class | Kích thước | Thiết bị         |
|-------------|--------------|------------|------------------|
| Extra small | _(không có)_ | < 576px    | Điện thoại dọc   |
| Small       | `sm`         | ≥ 576px    | Điện thoại ngang |
| Medium      | `md`         | ≥ 768px    | Tablet           |
| Large       | `lg`         | ≥ 992px    | Laptop           |
| Extra large | `xl`         | ≥ 1200px   | Desktop          |
| XXL         | `xxl`        | ≥ 1400px   | Màn hình lớn     |

### 7.2. Lưới Responsive trong thực tế

Sử dụng **nhiều class cùng lúc** để điều khiển giao diện trên từng thiết bị:

```html
<div class="row">
    <div class="col-12 col-sm-6 col-lg-4">Card 1</div>
    <div class="col-12 col-sm-6 col-lg-4">Card 2</div>
    <div class="col-12 col-sm-6 col-lg-4">Card 3</div>
</div>
```

Cách đọc class `col-12 col-sm-6 col-lg-4`:

| Màn hình | Class áp dụng | Số cột       | Hiển thị        |
|----------|---------------|--------------|-----------------|
| < 576px  | `col-12`      | 12/12 = 100% | **1 card/hàng** |
| ≥ 576px  | `col-sm-6`    | 6/12 = 50%   | **2 card/hàng** |
| ≥ 992px  | `col-lg-4`    | 4/12 = 33.3% | **3 card/hàng** |

```
< 576px (Mobile)     ≥ 576px (Tablet)     ≥ 992px (Desktop)
┌──────────┐         ┌─────┬─────┐        ┌───┬───┬───┐
│  Card 1  │         │  1  │  2  │        │ 1 │ 2 │ 3 │
├──────────┤         ├─────┴─────┤        └───┴───┴───┘
│  Card 2  │         │     3     │
├──────────┤         └───────────┘
│  Card 3  │
└──────────┘
```

---

## 8. Utility Classes: Căn chỉnh & Hiển thị

> Bootstrap cung cấp sẵn các **Utility Classes** để tinh chỉnh khoảng cách, flexbox, hiển thị... mà **không cần viết CSS custom**.

### 8.1. Spacing — Khoảng cách (Margin & Padding)

**Cú pháp**: `{property}{sides}-{size}`

| Ký hiệu               | Ý nghĩa                                                                     |
|-----------------------|-----------------------------------------------------------------------------|
| `m`                   | margin                                                                      |
| `p`                   | padding                                                                     |
| `t` / `b` / `s` / `e` | top / bottom / start (left) / end (right)                                   |
| `x` / `y`             | trái+phải / trên+dưới                                                       |
| `0-5`                 | kích thước (0 = 0, 1 = 0.25rem, 2 = 0.5rem, 3 = 1rem, 4 = 1.5rem, 5 = 3rem) |
| `auto`                | tự động (thường dùng để căn giữa)                                           |

```html
<div class="mt-3">        <!-- margin-top: 1rem -->
<div class="px-4">        <!-- padding-left + padding-right: 1.5rem -->
<div class="mb-0">        <!-- margin-bottom: 0 -->
<div class="mx-auto">     <!-- margin-left + margin-right: auto → căn giữa -->
<div class="p-5">         <!-- padding: 3rem (tất cả các hướng) -->
```

### 8.2. Display — Hiển thị

```html
<div class="d-none">             <!-- Ẩn hoàn toàn -->
<div class="d-block">            <!-- display: block -->
<div class="d-flex">             <!-- display: flex -->
<div class="d-none d-md-block">  <!-- Ẩn trên mobile, hiện từ tablet trở lên -->
<div class="d-md-none">          <!-- Hiện trên mobile, ẩn từ tablet trở lên -->
```

### 8.3. Flex Utilities

```html
<div class="d-flex justify-content-center">         <!-- Căn giữa theo trục ngang -->
<div class="d-flex align-items-center">              <!-- Căn giữa theo trục dọc -->
<div class="d-flex justify-content-between">         <!-- Đẩy 2 đầu -->
<div class="d-flex flex-column">                     <!-- Sắp xếp theo cột -->
<div class="d-flex flex-wrap">                       <!-- Cho phép xuống dòng -->
```

### 8.4. Text & Color

```html
<p class="text-center">         <!-- Căn giữa chữ -->
<p class="text-start">          <!-- Căn trái -->
<p class="text-end">            <!-- Căn phải -->
<p class="text-primary">        <!-- Màu xanh dương (primary) -->
<p class="text-danger">         <!-- Màu đỏ (danger) -->
<p class="text-muted">          <!-- Màu xám nhạt -->
<p class="fw-bold">             <!-- In đậm -->
<p class="fs-4">                <!-- Font-size cỡ 4 (h4) -->
```

---

## 9. Định dạng văn bản (Typography)

> Bootstrap cung cấp các class để **nhanh chóng** định dạng tiêu đề, văn bản nổi bật và màu sắc ngữ cảnh.

### 9.1. Headings & Display

```html
<!-- Heading mặc định -->
<h1>Tiêu đề h1</h1>

<!-- Display heading — to và nhẹ hơn -->
<h1 class="display-1">Tiêu đề cực lớn</h1>
<h1 class="display-4">Tiêu đề lớn vừa</h1>

<!-- Kết hợp nhiều class -->
<h1 class="display-1 text-center text-danger">Tiêu đề nổi bật</h1>
```

| Class                                           | Tác dụng                                |
|-------------------------------------------------|-----------------------------------------|
| `display-1` → `display-6`                       | Tiêu đề kích thước lớn, font-weight nhẹ |
| `text-center`                                   | Căn giữa văn bản                        |
| `text-primary` / `text-danger` / `text-success` | Màu sắc ngữ cảnh                        |
| `fw-bold` / `fw-light`                          | Độ đậm chữ                              |
| `lead`                                          | Đoạn văn nổi bật (font lớn, nhẹ hơn)    |

### 9.2. Màu sắc ngữ cảnh (Contextual Colors)

| Class            | Màu           | Ý nghĩa            |
|------------------|---------------|--------------------|
| `text-primary`   | 🔵 Xanh dương | Hành động chính    |
| `text-secondary` | ⚫ Xám         | Phụ, ít quan trọng |
| `text-success`   | 🟢 Xanh lá    | Thành công         |
| `text-danger`    | 🔴 Đỏ         | Lỗi, nguy hiểm     |
| `text-warning`   | 🟡 Vàng       | Cảnh báo           |
| `text-info`      | 🔵 Xanh nhạt  | Thông tin          |

---

## 10. Xử lý hình ảnh Responsive

> Đảm bảo hình ảnh luôn **tự động co giãn** vừa vặn với vùng chứa, không bị tràn ra ngoài.

### 10.1. Các class hình ảnh

| Class             | Tác dụng                                                      |
|-------------------|---------------------------------------------------------------|
| `.img-fluid`      | `max-width: 100%; height: auto;` → ảnh co giãn theo container |
| `.rounded`        | Bo góc nhẹ                                                    |
| `.rounded-circle` | Bo tròn thành hình tròn                                       |
| `.img-thumbnail`  | Viền nhẹ + padding (kiểu ảnh thumbnail)                       |

### 10.2. Ví dụ

```html
<!-- Không có class → ảnh có thể tràn ra ngoài container -->
<img src="photo.jpg" alt="Ảnh">

<!-- Responsive + bo góc → luôn vừa vặn -->
<img src="photo.jpg" alt="Ảnh" class="img-fluid rounded">
```

```
Không có .img-fluid:           Có .img-fluid:
┌── Container ──┐              ┌── Container ──┐
│ ┌──────────────────┐         │ ┌────────────┐ │
│ │  Ảnh tràn ra ────│──→      │ │ Ảnh vừa vặn│ │
│ └──────────────────┘         │ └────────────┘ │
└───────────────┘              └────────────────┘
```

---

## 11. Trình bày Bảng biểu (Tables)

> Chuyển đổi bảng HTML thành giao diện **hiện đại, dễ đọc** chỉ với vài class.

### 11.1. Các class cho bảng

| Class               | Tác dụng                              |
|---------------------|---------------------------------------|
| `.table`            | Style cơ bản cho bảng                 |
| `.table-striped`    | Tô màu xen kẽ các hàng (sọc ngựa vằn) |
| `.table-hover`      | Highlight hàng khi di chuột           |
| `.table-bordered`   | Viền đầy đủ tất cả ô                  |
| `.table-sm`         | Bảng compact (padding nhỏ hơn)        |
| `.table-responsive` | Cuộn ngang trên màn hình nhỏ          |

### 11.2. Ví dụ

```html
<div class="table-responsive">
    <table class="table table-striped table-hover">
        <thead>
            <tr>
                <th>ID</th>
                <th>Tên</th>
                <th>Trạng thái</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>001</td>
                <td>Sản phẩm A</td>
                <td><span class="badge bg-success">Hoạt động</span></td>
            </tr>
            <tr>
                <td>002</td>
                <td>Sản phẩm B</td>
                <td><span class="badge bg-warning">Tạm dừng</span></td>
            </tr>
            <tr>
                <td>003</td>
                <td>Sản phẩm C</td>
                <td><span class="badge bg-danger">Đã bán</span></td>
            </tr>
        </tbody>
    </table>
</div>
```

---

## 12. Tùy biến với CSS Variables

> **Ghi đè các biến toàn cục** (CSS Custom Properties) để đồng bộ màu sắc thương hiệu cho toàn bộ trang web.

### 12.1. CSS Variables là gì?

CSS Variables (hay CSS Custom Properties) là các **biến** do ta tự đặt tên, dùng để lưu giá trị (màu, khoảng cách, font...) và **tái sử dụng** ở nhiều nơi.

```css
/* Khai báo biến */
:root {
    --mau-chinh: #0d6efd;
}

/* Sử dụng biến */
.btn {
    background-color: var(--mau-chinh);    /* → #0d6efd */
}
.header {
    border-bottom: 2px solid var(--mau-chinh);  /* → cũng #0d6efd */
}
```

> `:root` = phần tử gốc (thẻ `<html>`) → biến khai báo ở đây sẽ **dùng được ở mọi nơi** trong trang.

### 12.2. Bootstrap dùng CSS Variables như thế nào?

Bên trong file `bootstrap.min.css`, Bootstrap đã **khai báo sẵn** hàng loạt biến:

```css
/* Bootstrap tự khai báo (bạn KHÔNG cần viết phần này) */
:root {
    --bs-primary: #0d6efd;       /* Xanh dương */
    --bs-secondary: #6c757d;     /* Xám */
    --bs-success: #198754;       /* Xanh lá */
    --bs-danger: #dc3545;        /* Đỏ */
    --bs-warning: #ffc107;       /* Vàng */
    --bs-info: #0dcaf0;          /* Xanh nhạt */
    --bs-light: #f8f9fa;
    --bs-dark: #212529;
    /* ... và nhiều biến khác */
}
```

Sau đó, các class Bootstrap **dùng biến này** để tạo style:

```css
/* Bên trong Bootstrap (đã viết sẵn) */
.btn-primary {
    background-color: var(--bs-primary);    /* → lấy giá trị từ biến */
    border-color: var(--bs-primary);
}
.text-primary {
    color: var(--bs-primary);
}
.bg-primary {
    background-color: var(--bs-primary);
}
```

### 12.3. Viết ở đâu để ghi đè?

Viết trong file **CSS riêng của bạn** (ví dụ `style.css`), đặt **SAU** link Bootstrap:

```html
<head>
    <!-- 1. Bootstrap CSS (có sẵn --bs-primary: #0d6efd) -->
    <link href="...bootstrap.min.css" rel="stylesheet">

    <!-- 2. CSS của bạn — GHI ĐÈ biến ở đây -->
    <link href="style.css" rel="stylesheet">
</head>
```

Trong file `style.css`:

```css
/* style.css — ghi đè biến Bootstrap */
:root {
    --bs-primary: #C8102E;      /* Đổi xanh dương → Đỏ thương hiệu */
    --bs-secondary: #333333;
    --bs-success: #28A745;
}
```

Hoặc viết trực tiếp trong thẻ `<style>` (cũng đặt SAU link Bootstrap):

```html
<head>
    <link href="...bootstrap.min.css" rel="stylesheet">

    <style>
        :root {
            --bs-primary: #C8102E;
        }
    </style>
</head>
```

### 12.4. Quy trình diễn ra thế nào?

```
Bước 1: Trình duyệt đọc bootstrap.min.css
         :root { --bs-primary: #0d6efd; }          ← Xanh dương (gốc)

Bước 2: Trình duyệt đọc style.css (của bạn)
         :root { --bs-primary: #C8102E; }           ← Đỏ (GHI ĐÈ!)

Bước 3: Trình duyệt gặp <button class="btn btn-primary">
         .btn-primary { background-color: var(--bs-primary); }
                                              │
                                              ▼
                               Tra biến → --bs-primary = #C8102E (đỏ)
                                              │
                                              ▼
                               Nút hiển thị MÀU ĐỎ thay vì xanh!
```

### 12.5. Ví dụ thực tế — Đổi toàn bộ theme

**Trước** (Bootstrap mặc định):

```
[  Mua ngay  ]  ← btn-primary: Xanh dương (#0d6efd)
  Đăng nhập    ← text-primary: Xanh dương
━━━━━━━━━━━━━  ← bg-primary: Xanh dương
```

**Sau** (ghi đè `--bs-primary: #C8102E`):

```
[  Mua ngay  ]  ← btn-primary: Đỏ (#C8102E) ← TỰ ĐỘNG đổi!
  Đăng nhập    ← text-primary: Đỏ            ← TỰ ĐỘNG đổi!
━━━━━━━━━━━━━  ← bg-primary: Đỏ              ← TỰ ĐỘNG đổi!
```

> Chỉ sửa **1 dòng** `--bs-primary` → **tất cả** nút, text, nền dùng primary đều đổi theo.

### 12.6. Danh sách biến thường ghi đè

| Biến                    | Mặc định Bootstrap            | Ý nghĩa                          |
|-------------------------|-------------------------------|----------------------------------|
| `--bs-primary`          | `#0d6efd` (xanh dương)        | Màu chính — nút, link, highlight |
| `--bs-secondary`        | `#6c757d` (xám)               | Màu phụ                          |
| `--bs-success`          | `#198754` (xanh lá)           | Thành công                       |
| `--bs-danger`           | `#dc3545` (đỏ)                | Lỗi, cảnh báo nguy hiểm          |
| `--bs-warning`          | `#ffc107` (vàng)              | Cảnh báo nhẹ                     |
| `--bs-info`             | `#0dcaf0` (xanh nhạt)         | Thông tin                        |
| `--bs-body-font-family` | `system-ui, -apple-system...` | Font toàn trang                  |
| `--bs-body-font-size`   | `1rem`                        | Cỡ chữ mặc định                  |
| `--bs-body-color`       | `#212529`                     | Màu chữ mặc định                 |
| `--bs-body-bg`          | `#fff`                        | Màu nền trang                    |

### 12.7. Tóm lại

| Câu hỏi                      | Trả lời                                                    |
|------------------------------|------------------------------------------------------------|
| Viết ở đâu?                  | Trong file CSS **riêng** của bạn, hoặc trong thẻ `<style>` |
| Đặt trước hay sau Bootstrap? | **SAU** — để ghi đè giá trị Bootstrap                      |
| Cú pháp?                     | `:root { --bs-primary: #mã_màu; }`                         |
| Ảnh hưởng gì?                | **Tất cả** class Bootstrap dùng biến đó đều tự động đổi    |
| Có cần sửa HTML?             | **Không** — chỉ sửa CSS, HTML giữ nguyên                   |

---

## 13. Nút bấm và Huy hiệu (Buttons & Badges)

### 13.1. Buttons

```html
<!-- Nút đặc (filled) -->
<button class="btn btn-primary">Primary</button>
<button class="btn btn-success">Success</button>
<button class="btn btn-danger">Danger</button>
<button class="btn btn-warning">Warning</button>

<!-- Nút viền (outline) -->
<button class="btn btn-outline-primary">Outline</button>

<!-- Kích thước -->
<button class="btn btn-primary btn-lg">Lớn</button>
<button class="btn btn-primary btn-sm">Nhỏ</button>

<!-- Nút block (chiếm toàn bộ chiều rộng) -->
<div class="d-grid">
    <button class="btn btn-primary">Full Width</button>
</div>
```

### 13.2. Badges (Huy hiệu)

```html
<span class="badge bg-primary">New</span>
<span class="badge bg-danger">3</span>
<span class="badge rounded-pill bg-success">Hoạt động</span>

<!-- Badge trong button -->
<button class="btn btn-primary">
    Thông báo <span class="badge bg-danger">4</span>
</button>
```

---

## 14. Card — Thẻ nội dung

> **Card** là thành phần linh hoạt nhất của Bootstrap, dùng để hiển thị nội dung trong một khung có cấu trúc.

```html
<div class="card" style="width: 18rem;">
    <img src="image.jpg" class="card-img-top" alt="...">
    <div class="card-body">
        <h5 class="card-title">Tiêu đề</h5>
        <p class="card-text">Mô tả ngắn về nội dung.</p>
        <a href="#" class="btn btn-primary">Xem thêm</a>
    </div>
</div>
```

```
┌──────────────────┐
│    [Hình ảnh]    │  ← .card-img-top
├──────────────────┤
│  Tiêu đề         │  ← .card-title
│  Mô tả ngắn...   │  ← .card-text
│  [Xem thêm]      │  ← .btn
└──────────────────┘
```

---

## 15. Thanh điều hướng (Navbar)

> Navbar tự động **thu gọn** menu thành nút "Hamburger" ☰ trên màn hình di động.

### 15.1. Cấu trúc cơ bản

```html
<nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container">
        <!-- Logo / Tên trang -->
        <a class="navbar-brand" href="#">MyBrand</a>

        <!-- Nút hamburger (hiện trên mobile) -->
        <button class="navbar-toggler" type="button"
                data-bs-toggle="collapse" data-bs-target="#navMenu">
            <span class="navbar-toggler-icon"></span>
        </button>

        <!-- Menu chính -->
        <div class="collapse navbar-collapse" id="navMenu">
            <ul class="navbar-nav ms-auto">
                <li class="nav-item">
                    <a class="nav-link active" href="#">Trang chủ</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Sản phẩm</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Giới thiệu</a>
                </li>
            </ul>
        </div>
    </div>
</nav>
```

### 15.2. Giải thích các class

| Class                      | Tác dụng                                  |
|----------------------------|-------------------------------------------|
| `navbar-expand-lg`         | Menu ngang từ ≥992px, thu gọn khi nhỏ hơn |
| `navbar-light`             | Icon và text màu tối (dùng với nền sáng)  |
| `navbar-dark`              | Icon và text màu sáng (dùng với nền tối)  |
| `navbar-toggler`           | Nút hamburger ☰                           |
| `collapse navbar-collapse` | Ẩn/hiện menu khi toggle                   |
| `ms-auto`                  | Đẩy menu sang bên phải                    |

```
Desktop (≥992px):            Mobile (<992px):
┌─────────────────────────┐  ┌─────────────────┐
│ Brand  Home  Products   │  │ Brand        [☰] │
└─────────────────────────┘  │─────────────────│
                              │ Home            │  ← Mở khi nhấn ☰
                              │ Products        │
                              │ About           │
                              └─────────────────┘
```

---

## 16. Biểu mẫu nhập liệu (Forms)

> Bootstrap giúp tạo form **đẹp và nhất quán** mà không cần tự viết CSS cho input.

### 16.1. Ví dụ Form đăng nhập

```html
<form class="p-4" style="max-width: 400px;">
    <h3 class="mb-3">Đăng nhập</h3>

    <div class="mb-3">
        <label for="email" class="form-label">Email Address</label>
        <input type="email" class="form-control" id="email"
               placeholder="Nhập email của bạn...">
    </div>

    <div class="mb-3">
        <label for="password" class="form-label">Mật khẩu</label>
        <input type="password" class="form-control" id="password"
               placeholder="*********">
    </div>

    <button type="submit" class="btn btn-primary w-100">Đăng nhập</button>
</form>
```

### 16.2. Các class Form quan trọng

| Class               | Tác dụng                                                     |
|---------------------|--------------------------------------------------------------|
| `.form-control`     | Style cho `<input>`, `<textarea>` — full-width, bo góc, viền |
| `.form-label`       | Style cho `<label>` — margin-bottom nhẹ                      |
| `.form-select`      | Style cho `<select>` dropdown                                |
| `.form-check`       | Nhóm checkbox/radio                                          |
| `.form-check-input` | Style checkbox/radio                                         |
| `.form-floating`    | Label nổi bên trong input                                    |
| `.input-group`      | Nhóm input + addon (icon, button)                            |

---

## 17. Tương tác JS không cần viết code (Data Attributes)

> Bootstrap cho phép kích hoạt các thành phần JavaScript **chỉ bằng HTML attributes**, không cần viết 1 dòng JS nào.

### 17.1. Modal (Hộp thoại)

```html
<!-- Nút mở modal -->
<button class="btn btn-primary"
        data-bs-toggle="modal" data-bs-target="#myModal">
    Mở Modal
</button>

<!-- Modal -->
<div class="modal fade" id="myModal">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Tiêu đề</h5>
                <button class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
                <p>Nội dung modal...</p>
            </div>
            <div class="modal-footer">
                <button class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                <button class="btn btn-primary">Lưu</button>
            </div>
        </div>
    </div>
</div>
```

### 17.2. Alert tự đóng

```html
<div class="alert alert-success alert-dismissible fade show">
    Thao tác thành công!
    <button class="btn-close" data-bs-dismiss="alert"></button>
</div>
```

### 17.3. Collapse (Thu gọn/Mở rộng)

```html
<button class="btn btn-primary" data-bs-toggle="collapse" data-bs-target="#demo">
    Toggle nội dung
</button>
<div class="collapse" id="demo">
    <div class="card card-body mt-2">
        Nội dung ẩn/hiện ở đây...
    </div>
</div>
```

### 17.4. Các Data Attributes phổ biến

| Attribute                   | Tác dụng                 |
|-----------------------------|--------------------------|
| `data-bs-toggle="modal"`    | Mở/đóng modal            |
| `data-bs-toggle="collapse"` | Thu gọn/mở rộng nội dung |
| `data-bs-toggle="dropdown"` | Mở dropdown menu         |
| `data-bs-toggle="tab"`      | Chuyển tab               |
| `data-bs-dismiss="modal"`   | Đóng modal               |
| `data-bs-dismiss="alert"`   | Đóng alert               |
| `data-bs-target="#id"`      | Chỉ định phần tử đích    |

---

## 18. Tổng hợp — Bảng Class thường dùng

| Nhóm        | Class                                   | Tác dụng         |
|-------------|-----------------------------------------|------------------|
| **Layout**  | `container`, `row`, `col-*`             | Hệ thống lưới    |
| **Spacing** | `m-*`, `p-*`, `mx-auto`                 | Margin, Padding  |
| **Display** | `d-flex`, `d-none`, `d-block`           | Hiển thị         |
| **Flex**    | `justify-content-*`, `align-items-*`    | Căn chỉnh flex   |
| **Text**    | `text-center`, `fw-bold`, `fs-*`        | Văn bản          |
| **Color**   | `text-primary`, `bg-danger`             | Màu sắc          |
| **Button**  | `btn`, `btn-primary`, `btn-outline-*`   | Nút bấm          |
| **Image**   | `img-fluid`, `rounded`                  | Hình ảnh         |
| **Table**   | `table`, `table-striped`, `table-hover` | Bảng             |
| **Form**    | `form-control`, `form-label`            | Biểu mẫu         |
| **Navbar**  | `navbar`, `navbar-expand-lg`            | Thanh điều hướng |
| **Card**    | `card`, `card-body`, `card-title`       | Thẻ nội dung     |
