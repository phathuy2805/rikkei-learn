# Session 1 – HTML Cơ bản

---

## 1. HTML là gì?

**HTML (HyperText Markup Language)** là ngôn ngữ **đánh dấu** siêu văn bản, dùng để tạo cấu trúc và trình bày nội dung trang web.

> **Lưu ý:** HTML **không phải** ngôn ngữ lập trình — nó không có logic, vòng lặp, hay điều kiện. HTML chỉ **mô tả** nội dung hiển thị.

---

## 2. Cấu trúc cơ bản (Boilerplate)

Mọi file HTML đều bắt đầu với cấu trúc khung sườn này:

```html
<!DOCTYPE html>           <!-- Khai báo: "Đây là file HTML5" -->
<html lang="vi">          <!-- Thẻ gốc bao toàn bộ trang -->

    <head>                <!-- Phần "hậu trường" — không hiển thị trên trang -->
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Tiêu đề tab trình duyệt</title>
    </head>

    <body>                <!-- Phần hiển thị — người dùng nhìn thấy -->
        <h1>Xin chào</h1>
        <p>Nội dung trang web ở đây</p>
    </body>

</html>
```

### Vai trò từng phần

| Thành phần        | Vai trò                                    | Hiển thị cho người dùng?    |
|-------------------|--------------------------------------------|-----------------------------|
| `<!DOCTYPE html>` | Báo trình duyệt đây là HTML5               | ❌                           |
| `<html>`          | Thẻ gốc — bọc toàn bộ trang                | ❌                           |
| `<head>`          | Chứa metadata: tiêu đề, link CSS, viewport | ❌ (chỉ thấy title trên tab) |
| `<body>`          | Chứa nội dung hiển thị trực tiếp (UI)      | ✅                           |

### Các thẻ meta phổ biến trong `<head>`

| Thẻ                                        | Tác dụng                            |
|--------------------------------------------|-------------------------------------|
| `<meta charset="UTF-8">`                   | Hỗ trợ tiếng Việt và ký tự đặc biệt |
| `<meta name="viewport" ...>`               | Trang hiển thị đúng trên điện thoại |
| `<title>`                                  | Tiêu đề hiện trên tab trình duyệt   |
| `<link rel="stylesheet" href="style.css">` | Liên kết file CSS                   |

---

## 3. Cú pháp HTML (Syntax)

### 3.1. Cấu trúc một thẻ HTML

```
  Thẻ mở        Thuộc tính         Nội dung      Thẻ đóng
    ↓               ↓                 ↓             ↓
  <a         href="https://..."    >Click tôi     </a>
```

Một thẻ HTML có thể gồm:
- **Thẻ mở** `<tên_thẻ>` — bắt đầu phần tử
- **Thuộc tính** `tên="giá_trị"` — thông tin bổ sung (không bắt buộc)
- **Nội dung** — văn bản hoặc thẻ con bên trong
- **Thẻ đóng** `</tên_thẻ>` — kết thúc phần tử

```html
<p class="intro">Đây là đoạn văn.</p>
↑ thẻ mở          ↑ nội dung        ↑ thẻ đóng
   ↑ thuộc tính
```

### 3.2. Thẻ tự đóng (Self-closing Tags / Void Elements)

Một số thẻ **không có nội dung bên trong** → không cần thẻ đóng:

```html
<img src="photo.jpg" alt="Ảnh" />
<br />
<hr />
<input type="text" />
<meta charset="UTF-8" />
<link rel="stylesheet" href="style.css" />
```

> **Nhớ nhanh:** Thẻ tự đóng = thẻ **không bọc nội dung** → kết thúc bằng `/>`.

---

## 4. HTML Semantic (Ngữ nghĩa)

### 4.1. Semantic là gì?

**Semantic** = thẻ HTML có **ý nghĩa rõ ràng**, cho biết nội dung bên trong là gì.

| Non-semantic (không ngữ nghĩa) | Semantic (có ngữ nghĩa) | Khác biệt                                             |
|--------------------------------|-------------------------|-------------------------------------------------------|
| `<div>`                        | `<header>`              | Trình duyệt biết đây là **phần đầu trang**            |
| `<div>`                        | `<nav>`                 | Trình duyệt biết đây là **menu điều hướng**           |
| `<div>`                        | `<main>`                | Trình duyệt biết đây là **nội dung chính**            |
| `<div>`                        | `<footer>`              | Trình duyệt biết đây là **phần chân trang**           |
| `<div>`                        | `<article>`             | Trình duyệt biết đây là **bài viết độc lập**          |
| `<div>`                        | `<section>`             | Trình duyệt biết đây là **nhóm nội dung** cùng chủ đề |

> `<div>` chỉ là "hộp chứa" vô nghĩa — trình duyệt, Google Bot, Screen Reader đều **không biết** bên trong là gì.

### 4.2. Tại sao nên dùng Semantic?

| Lợi ích                  | Giải thích                                                                       |
|--------------------------|----------------------------------------------------------------------------------|
| **SEO Friendly**         | Google Bot hiểu cấu trúc trang → index chính xác hơn → xếp hạng tìm kiếm tốt hơn |
| **Accessibility (A11y)** | Screen Reader (phần mềm đọc màn hình) đọc được cấu trúc → hỗ trợ người khiếm thị |
| **Maintainability**      | Code dễ đọc, dễ sửa → tối ưu cho làm việc nhóm                                   |

### 4.3. Standard Layout (Bố cục chuẩn)

Trang web chuẩn thường có cấu trúc:

```html
<body>
    <header>        <!-- Logo, menu trên cùng -->
        <nav>       <!-- Thanh điều hướng -->
            <a href="/">Trang chủ</a>
            <a href="/about">Giới thiệu</a>
        </nav>
    </header>

    <main>          <!-- Nội dung chính (chỉ 1 thẻ main / trang) -->
        <article>   <!-- Bài viết / sản phẩm -->
            <section>...</section>
            <section>...</section>
        </article>
        <aside>     <!-- Nội dung phụ: sidebar, quảng cáo -->
        </aside>
    </main>

    <footer>        <!-- Chân trang: bản quyền, liên hệ -->
    </footer>
</body>
```

```
┌──────────────────────────────────┐
│           <header>               │
│   ┌──────────────────────────┐   │
│   │         <nav>            │   │
│   └──────────────────────────┘   │
├──────────────────────────────────┤
│              <main>              │
│  ┌────────────────────┐ ┌─────┐ │
│  │    <article>       │ │<aside│ │
│  │  ┌──────────────┐  │ │     │ │
│  │  │  <section>   │  │ │     │ │
│  │  └──────────────┘  │ │     │ │
│  │  ┌──────────────┐  │ │     │ │
│  │  │  <section>   │  │ │     │ │
│  │  └──────────────┘  │ │     │ │
│  └────────────────────┘ └─────┘ │
├──────────────────────────────────┤
│           <footer>               │
└──────────────────────────────────┘
```

### 4.4. `<article>` vs `<section>`

|                                   | `<article>`                             | `<section>`                                    |
|-----------------------------------|-----------------------------------------|------------------------------------------------|
| Ý nghĩa                           | Nội dung **độc lập**, tự đứng vững      | Nhóm nội dung **cùng chủ đề**                  |
| Tách ra riêng có hiểu được không? | ✅ Có — như 1 bài báo riêng lẻ           | ❌ Cần ngữ cảnh xung quanh                      |
| Ví dụ                             | Blog post, tin tức, sản phẩm, bình luận | Chương sách, phần "Giới thiệu", phần "Liên hệ" |
| Heading                           | Nên có `<h2>` – `<h6>`                  | **Luôn đi kèm** Heading                        |

```html
<!-- article: Bài viết blog — đọc riêng vẫn hiểu -->
<article>
    <h2>10 Quán Cafe Đẹp Nhất Sài Gòn</h2>
    <p>Bài viết giới thiệu các quán cafe...</p>
</article>

<!-- section: Các phần trong 1 trang — cần ngữ cảnh -->
<section>
    <h2>Giới thiệu</h2>
    <p>Chúng tôi là công ty...</p>
</section>
<section>
    <h2>Dịch vụ</h2>
    <p>Chúng tôi cung cấp...</p>
</section>
```

> **Mẹo phân biệt:** Nếu copy nội dung đó dán sang trang khác mà **vẫn đọc hiểu** → dùng `<article>`. Nếu **chỉ có ý nghĩa khi nằm trong trang** → dùng `<section>`.

---

## 5. Heading & Paragraph

### 5.1. Heading (Tiêu đề h1 – h6)

HTML có 6 cấp tiêu đề, từ `<h1>` (lớn nhất) đến `<h6>` (nhỏ nhất):

```html
<h1>Tiêu đề chính của trang</h1>       <!-- Chỉ 1 thẻ h1 / trang -->
    <h2>Đề mục lớn</h2>
        <h3>Tiêu đề phụ</h3>
            <h4>Chi tiết nhỏ</h4>
```

| Cấp           | Vai trò                     | Ghi chú                                                                   |
|---------------|-----------------------------|---------------------------------------------------------------------------|
| `<h1>`        | Tiêu đề **chính** của trang | ⚠️ **Chỉ dùng 1 lần / trang** — Google Bot quét H1 để hiểu nội dung chính |
| `<h2>`        | Đề mục lớn                  | Các phần chính của trang                                                  |
| `<h3>`        | Tiêu đề phụ                 | Chia nhỏ bên trong h2                                                     |
| `<h4>`–`<h6>` | Chi tiết nhỏ                | Hiếm dùng, chỉ khi cần phân cấp sâu                                       |

> ⚠️ **Quan trọng:** Heading phải theo **thứ tự phân cấp** — không nhảy từ h1 xuống h4. Google Bot quét dàn ý trang dựa trên hierarchy của Heading.
>
> ❌ **Sai:** Dùng Heading chỉ để làm chữ to/nhỏ → hãy dùng CSS `font-size` thay vì lạm dụng Heading.

### 5.2. Paragraph & Định dạng văn bản

**Thẻ `<p>` — Đoạn văn:**

```html
<p>Đây là đoạn văn thứ nhất.</p>
<p>Đây là đoạn văn thứ hai.</p>
<!-- Trình duyệt tự thêm khoảng trắng trên/dưới mỗi <p> -->
```

**Thẻ nhấn mạnh (Semantic):**

| Thẻ Semantic | Hiển thị     | Thẻ Non-semantic tương đương | Nên dùng?                                    |
|--------------|--------------|------------------------------|----------------------------------------------|
| `<strong>`   | **In đậm**   | `<b>`                        | ✅ `<strong>` — có ngữ nghĩa "quan trọng"     |
| `<em>`       | *In nghiêng* | `<i>`                        | ✅ `<em>` — có ngữ nghĩa "nhấn mạnh ngữ điệu" |

```html
<p>Học HTML là <strong>rất quan trọng</strong> và cần <em>thực hành nhiều</em>.</p>
<!--              ↑ đậm + nghĩa "quan trọng"          ↑ nghiêng + nghĩa "nhấn mạnh" -->
```

> ⚠️ **Hạn chế** dùng `<b>` và `<i>` — chúng chỉ thay đổi **hình thức** (non-semantic), không mang ý nghĩa. Screen Reader không phân biệt được `<b>` với chữ thường.

---

## 6. Thẻ hình ảnh (`<img>`)

### 6.1. Cú pháp

```html
<img src="photo.jpg" alt="Mô tả ảnh" width="500" height="300" />
```

| Thuộc tính         | Vai trò                     | Bắt buộc?                             |
|--------------------|-----------------------------|---------------------------------------|
| `src`              | Đường dẫn đến file ảnh      | ✅ Có                                  |
| `alt`              | Mô tả ảnh bằng văn bản      | ✅ Có (quan trọng SEO + Accessibility) |
| `width` / `height` | Kích thước hiển thị (pixel) | ⚠️ Nên có — ngăn Layout Shift         |

### 6.2. Thuộc tính `alt` quan trọng thế nào?

```html
<!-- Ảnh load được → hiển thị ảnh bình thường -->
<img src="./images/logo.jpg" alt="Logo công ty ABC" />

<!-- Ảnh bị lỗi → trình duyệt hiện chữ alt thay thế -->
<img src="./images/anh-bi-loi.jpg" alt="Logo công ty ABC" />
<!--                                      ↑ hiện ra khi ảnh lỗi -->
```

- **SEO:** Google Bot không "nhìn" được ảnh → đọc `alt` để hiểu ảnh về gì
- **Accessibility:** Screen Reader đọc `alt` cho người khiếm thị
- **Fallback:** Khi ảnh lỗi, văn bản `alt` hiện thay thế

### 6.3. Layout Shift (CLS) — Tại sao nên khai báo `width` / `height`?

Khi trình duyệt chưa tải ảnh xong:
- **Không có** `width`/`height` → trình duyệt không biết ảnh to cỡ nào → ảnh load xong đẩy nội dung nhảy lung tung (Layout Shift)
- **Có** `width`/`height` → trình duyệt giữ chỗ sẵn → nội dung ổn định

---

## 7. Đường dẫn (Path)

### 7.1. Tuyệt đối vs Tương đối

| Loại                     | Cú pháp                     | Khi nào dùng                                  |
|--------------------------|-----------------------------|-----------------------------------------------|
| **Tuyệt đối** (Absolute) | `https://site.com/logo.png` | Link đến **website khác**                     |
| **Tương đối** (Relative) | `./images/logo.png`         | Link **nội bộ** trong dự án ✅ **Khuyên dùng** |

### 7.2. Các ký hiệu đường dẫn tương đối

| Ký hiệu  | Ý nghĩa                   | Ví dụ                                                     |
|----------|---------------------------|-----------------------------------------------------------|
| `./`     | Thư mục **hiện tại**      | `./style.css` — file CSS cùng thư mục                     |
| `../`    | **Lùi 1 cấp** thư mục cha | `../images/logo.png` — lùi ra 1 cấp rồi vào folder images |
| `../../` | **Lùi 2 cấp**             | Lùi ra 2 thư mục cha                                      |

Ví dụ cấu trúc thư mục:

```
project/
├── index.html          ← đang ở đây
├── css/
│   └── style.css
└── images/
    └── logo.png
```

```html
<!-- Từ index.html muốn link đến: -->
<link rel="stylesheet" href="./css/style.css" />
<img src="./images/logo.png" alt="Logo" />
```

---

## 8. Thẻ liên kết (`<a>`)

### 8.1. Cú pháp cơ bản

```html
<a href="url" target="...">Nội dung hiển thị</a>
```

| Thuộc tính | Vai trò                           | Bắt buộc?                |
|------------|-----------------------------------|--------------------------|
| `href`     | **Đích đến** — URL hoặc đường dẫn | ✅ Có                     |
| `target`   | Mở ở đâu (tab hiện tại / tab mới) | Không (mặc định `_self`) |

### 8.2. Các giá trị `target`

| Giá trị   | Hành vi                            | Khi nào dùng              |
|-----------|------------------------------------|---------------------------|
| `_self`   | Mở tại **tab hiện tại** (mặc định) | Link nội bộ trong website |
| `_blank`  | Mở **tab mới**                     | Link ra website bên ngoài |
| `_parent` | Mở tại frame cha (nếu có iframe)   | Hiếm dùng                 |
| `_top`    | Mở toàn bộ cửa sổ trình duyệt      | Hiếm dùng                 |

```html
<!-- Link nội bộ — mở cùng tab -->
<a href="/about">Giới thiệu</a>

<!-- Link ra ngoài — mở tab mới -->
<a href="https://google.com" target="_blank">Google</a>
```

### 8.3. `href` đặc biệt

| Loại           | Cú pháp                           | Tác dụng                                           |
|----------------|-----------------------------------|----------------------------------------------------|
| **Email**      | `href="mailto:email@example.com"` | Mở ứng dụng email mặc định                         |
| **Điện thoại** | `href="tel:+84123456789"`         | Mở ứng dụng gọi điện (hữu ích trên mobile)         |
| **Neo trang**  | `href="#section-id"`              | Cuộn đến phần tử có `id` tương ứng trên cùng trang |

```html
<!-- Gửi email -->
<a href="mailto:contact@coffee.vn">Liên hệ qua Email</a>

<!-- Gọi điện -->
<a href="tel:+84901234567">Hotline: 0901 234 567</a>

<!-- Cuộn xuống phần Liên hệ trên cùng trang -->
<a href="#lien-he">Đi đến phần Liên hệ</a>
...
<section id="lien-he">
    <h2>Liên hệ</h2>
</section>
```
