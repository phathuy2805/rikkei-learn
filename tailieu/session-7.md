# Session 07: Responsive UI Development with Tailwind CSS

---

## 1. Vấn đề: Nỗi ám ảnh "Context Switching"

Khi viết CSS truyền thống, lập trình viên thường gặp phải 3 vấn đề lớn:

| Vấn đề                        | Mô tả                                                                               |
|-------------------------------|-------------------------------------------------------------------------------------|
| **Chuyển đổi file liên tục**  | Phải nhảy qua lại giữa `index.html` và `style.css` mỗi khi muốn thay đổi giao diện  |
| **Đặt tên class phức tạp**    | Lãng phí thời gian nghĩ tên class như `.card-container-outer`, `.btn-primary-large` |
| **CSS phình to, khó bảo trì** | File CSS ngày càng dài, class chồng chéo, khó kiểm soát khi dự án lớn dần           |

> Tailwind CSS ra đời để giải quyết trọn vẹn 3 vấn đề trên.

---

## 2. Tailwind CSS là gì?

**Tailwind CSS** là một **utility-first CSS framework** — nghĩa là nó cung cấp sẵn hàng ngàn **class tiện ích nhỏ** (utility classes), mỗi class chỉ làm **một việc duy nhất**.

- `flex` → `display: flex`
- `pt-4` → `padding-top: 1rem`
- `text-center` → `text-align: center`
- `rotate-90` → `transform: rotate(90deg)`

**Cách dùng:** Kết hợp các class này trực tiếp trong HTML, **không cần viết file CSS riêng**.

```html
<!-- CSS truyền thống -->
<div class="card-container">...</div>
<!-- + file style.css với .card-container { display: flex; padding: 1rem; ... } -->

<!-- Tailwind CSS -->
<div class="flex p-4 rounded-lg shadow-md">...</div>
<!-- Không cần file CSS riêng! -->
```

---

## 3. Triết lý Utility-First

> Xây dựng mọi thiết kế **trực tiếp trong HTML** bằng các class tiện ích có sẵn, **không cần đặt tên class** phức tạp hay chuyển đổi qua lại giữa các file.

**So sánh nhanh:**

| Cách truyền thống                                        | Utility-First (Tailwind)                   |
|----------------------------------------------------------|--------------------------------------------|
| Viết HTML → đặt tên class → chuyển sang CSS → viết style | Viết HTML + gắn class utility ngay tại chỗ |
| Phải suy nghĩ naming convention                          | Không cần đặt tên, dùng class có sẵn       |
| CSS phình to theo thời gian                              | CSS chỉ chứa những gì thực sự dùng         |

---

## 4. Tối ưu CSS Bundle (Performance)

> *"Ship faster and smaller"*

- Tailwind **tự động loại bỏ** toàn bộ CSS không sử dụng (tree-shaking / purge) khi build production.
- **Kết quả thực tế:** Đa số dự án Tailwind có file CSS cuối cùng chỉ **dưới 10kB** (so với hàng trăm kB của CSS truyền thống).

**Cách hoạt động:**
1. Bạn viết code HTML sử dụng các class Tailwind
2. Khi build production, Tailwind quét toàn bộ file HTML/JS
3. Chỉ giữ lại CSS tương ứng với các class **thực sự xuất hiện** trong code
4. Loại bỏ hết phần còn lại → file CSS cực nhỏ

---

## 5. Typography — Định dạng văn bản

Thay đổi kích thước, độ dày, màu sắc văn bản **ngay lập tức** chỉ bằng class:

| Thuộc tính         | Class ví dụ                              | Tương đương CSS                               |
|--------------------|------------------------------------------|-----------------------------------------------|
| **Kích thước chữ** | `text-sm`, `text-lg`, `text-3xl`         | `font-size: 0.875rem`, `1.125rem`, `1.875rem` |
| **Độ dày chữ**     | `font-light`, `font-bold`, `font-black`  | `font-weight: 300`, `700`, `900`              |
| **Màu chữ**        | `text-red-500`, `text-gray-700`          | `color: #ef4444`, `#374151`                   |
| **Căn chỉnh**      | `text-left`, `text-center`, `text-right` | `text-align: left/center/right`               |
| **Kiểu chữ**       | `italic`, `underline`, `line-through`    | `font-style: italic`, `text-decoration: ...`  |

```html
<h1 class="text-3xl font-bold text-blue-600">Tiêu đề lớn màu xanh</h1>
<p class="text-sm text-gray-500 italic">Đoạn văn nhỏ, xám, nghiêng</p>
```

---

## 6. Hệ thống màu sắc (Color System)

Tailwind cung cấp một bảng màu **P3 Wide Gamut** rực rỡ với các sắc độ từ **50** (sáng nhất) đến **950** (tối nhất).

**Công thức đặt tên:**
```
{thuộc-tính}-{tên-màu}-{sắc-độ}
```

**Ví dụ:**

| Class              | Ý nghĩa                               |
|--------------------|---------------------------------------|
| `bg-blue-500`      | Nền màu xanh dương, sắc độ trung bình |
| `text-red-700`     | Chữ màu đỏ đậm                        |
| `border-green-300` | Viền màu xanh lá nhạt                 |
| `bg-white`         | Nền trắng (không cần sắc độ)          |
| `text-black`       | Chữ đen                               |

**Thang sắc độ:** `50` → `100` → `200` → `300` → `400` → `500` → `600` → `700` → `800` → `900` → `950`

- **50–200:** Sáng, pastel — thường dùng cho nền (background)
- **300–500:** Trung bình — dùng cho viền, icon
- **600–950:** Đậm, tối — dùng cho chữ, nền nổi bật

---

## 7. Spacing & Sizing — Khoảng cách và Kích thước

Tailwind dùng **hệ thống tỷ lệ đồng nhất** (spacing scale) cho margin, padding, width, height.

**Quy tắc:** Mỗi đơn vị = **0.25rem (4px)**

| Class  | Giá trị   | Pixel |
|--------|-----------|-------|
| `p-0`  | `0`       | 0px   |
| `p-1`  | `0.25rem` | 4px   |
| `p-2`  | `0.5rem`  | 8px   |
| `p-4`  | `1rem`    | 16px  |
| `p-8`  | `2rem`    | 32px  |
| `p-16` | `4rem`    | 64px  |

**Các tiền tố:**

| Tiền tố                    | Ý nghĩa                                  |
|----------------------------|------------------------------------------|
| `p-`                       | padding (tất cả các phía)                |
| `px-`                      | padding trái + phải                      |
| `py-`                      | padding trên + dưới                      |
| `pt-`, `pr-`, `pb-`, `pl-` | padding từng phía                        |
| `m-`                       | margin (tương tự padding)                |
| `w-`                       | width                                    |
| `h-`                       | height                                   |
| `gap-`                     | khoảng cách giữa các phần tử (Flex/Grid) |

```html
<div class="p-6 m-4 w-64 h-32">
  <!-- padding 24px, margin 16px, rộng 256px, cao 128px -->
</div>
```

---

## 8. Borders, Shadows & Filters — Tạo chiều sâu

Bo góc, đổ bóng và bộ lọc CSS phức tạp chỉ bằng **một class**:

### Bo góc (Border Radius)

| Class          | Hiệu ứng                        |
|----------------|---------------------------------|
| `rounded`      | Bo nhẹ (4px)                    |
| `rounded-md`   | Bo vừa (6px)                    |
| `rounded-lg`   | Bo lớn (8px)                    |
| `rounded-xl`   | Bo rất lớn (12px)               |
| `rounded-full` | Tròn hoàn toàn (hình tròn/oval) |

### Đổ bóng (Box Shadow)

| Class       | Hiệu ứng      |
|-------------|---------------|
| `shadow-sm` | Bóng nhẹ      |
| `shadow`    | Bóng mặc định |
| `shadow-md` | Bóng vừa      |
| `shadow-lg` | Bóng lớn      |
| `shadow-xl` | Bóng rất lớn  |

### Bộ lọc (Filters)

| Class              | Hiệu ứng                            |
|--------------------|-------------------------------------|
| `blur-sm`          | Làm mờ nhẹ                          |
| `brightness-75`    | Giảm độ sáng 75%                    |
| `grayscale`        | Chuyển ảnh xám                      |
| `backdrop-blur-md` | Làm mờ nền phía sau (glassmorphism) |

```html
<div class="rounded-lg shadow-md p-6 bg-white">
  Card có bo góc lớn và đổ bóng vừa
</div>
```

---

## 9. Flexbox — Bố cục ngang

Xây dựng **layout dạng hàng ngang** cực kỳ dễ dàng:

| Class             | Tương đương CSS                  | Mục đích                           |
|-------------------|----------------------------------|------------------------------------|
| `flex`            | `display: flex`                  | Bật Flexbox                        |
| `flex-row`        | `flex-direction: row`            | Sắp xếp theo hàng ngang (mặc định) |
| `flex-col`        | `flex-direction: column`         | Sắp xếp theo cột dọc               |
| `items-center`    | `align-items: center`            | Căn giữa theo trục phụ             |
| `justify-between` | `justify-content: space-between` | Dàn đều, đẩy 2 đầu                 |
| `justify-center`  | `justify-content: center`        | Căn giữa theo trục chính           |
| `gap-4`           | `gap: 1rem`                      | Khoảng cách giữa các phần tử       |
| `flex-wrap`       | `flex-wrap: wrap`                | Cho phép xuống dòng                |

```html
<!-- Navbar đơn giản -->
<nav class="flex items-center justify-between p-4 bg-white shadow">
  <div class="text-xl font-bold">Logo</div>
  <div class="flex gap-6">
    <a href="#">Home</a>
    <a href="#">About</a>
    <a href="#">Contact</a>
  </div>
</nav>
```

---

## 10. CSS Grid Layout — Bố cục dạng lưới

Xây dựng **layout dạng lưới** trực quan ngay trong HTML:

| Class         | Tương đương CSS                         | Mục đích           |
|---------------|-----------------------------------------|--------------------|
| `grid`        | `display: grid`                         | Bật Grid           |
| `grid-cols-2` | `grid-template-columns: repeat(2, 1fr)` | 2 cột đều nhau     |
| `grid-cols-3` | `grid-template-columns: repeat(3, 1fr)` | 3 cột đều nhau     |
| `grid-cols-4` | `...repeat(4, 1fr)`                     | 4 cột đều nhau     |
| `gap-4`       | `gap: 1rem`                             | Khoảng cách giữa ô |
| `col-span-2`  | `grid-column: span 2`                   | Chiếm 2 cột        |

```html
<!-- Grid 3 cột cho danh sách sản phẩm -->
<div class="grid grid-cols-3 gap-6">
  <div class="p-4 bg-white shadow rounded">Sản phẩm 1</div>
  <div class="p-4 bg-white shadow rounded">Sản phẩm 2</div>
  <div class="p-4 bg-white shadow rounded">Sản phẩm 3</div>
</div>
```

---

## 11. Responsive Design — Mobile-First

Tailwind áp dụng nguyên tắc **Mobile-First**:

- **Class không có tiền tố** → áp dụng cho **tất cả màn hình** (bắt đầu từ mobile)
- **Thêm tiền tố breakpoint** → chỉ áp dụng từ kích thước đó **trở lên**

### Bảng Breakpoints mặc định

| Tiền tố      | Kích thước tối thiểu | Thiết bị tương ứng        |
|--------------|----------------------|---------------------------|
| *(không có)* | `0px`                | Mobile (mặc định)         |
| `sm:`        | `640px`              | Mobile ngang / Tablet nhỏ |
| `md:`        | `768px`              | Tablet                    |
| `lg:`        | `1024px`             | Laptop                    |
| `xl:`        | `1280px`             | Desktop                   |
| `2xl:`       | `1536px`             | Màn hình lớn              |

### Cách đọc

```html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
```

Nghĩa là:
- **Mobile** (`0px+`): 1 cột
- **Tablet** (`768px+`): 2 cột
- **Laptop** (`1024px+`): 3 cột

### Ví dụ thực tế: Card responsive

```html
<!-- Card: dọc trên Mobile, ngang trên Tablet -->
<div class="flex flex-col md:flex-row gap-4 p-4 bg-white shadow rounded-lg">
  <img src="..." class="w-full md:w-48 rounded" />
  <div>
    <h3 class="text-lg font-bold">Tiêu đề</h3>
    <p class="text-gray-600">Mô tả ngắn...</p>
  </div>
</div>
```

---

## 12. Hover, Focus & Transitions — Tương tác và chuyển động

Tailwind cho phép xử lý **pseudo-classes** và **transition** trực tiếp bằng tiền tố:

### Pseudo-class states

| Tiền tố     | Khi nào kích hoạt                           |
|-------------|---------------------------------------------|
| `hover:`    | Khi di chuột vào                            |
| `focus:`    | Khi phần tử được focus (click vào input...) |
| `active:`   | Khi đang nhấn giữ                           |
| `disabled:` | Khi phần tử bị disabled                     |
| `first:`    | Phần tử đầu tiên trong danh sách            |
| `last:`     | Phần tử cuối cùng                           |

### Transition

| Class            | Mục đích                                                                          |
|------------------|-----------------------------------------------------------------------------------|
| `transition`     | Bật hiệu ứng chuyển đổi (mặc định: color, bg, border, shadow, opacity, transform) |
| `transition-all` | Chuyển đổi tất cả thuộc tính                                                      |
| `duration-300`   | Thời gian chuyển đổi 300ms                                                        |
| `ease-in-out`    | Kiểu chuyển đổi mượt mà                                                           |

```html
<button class="bg-blue-500 text-white px-6 py-2 rounded-lg
               hover:bg-blue-700
               transition duration-300 ease-in-out
               hover:scale-105">
  Hover vào tôi!
</button>
```

---

## 13. Dark Mode — Giao diện tối

Chỉ cần thêm tiền tố `dark:` trước bất kỳ class nào để áp dụng trong giao diện tối:

```html
<div class="bg-white dark:bg-gray-900
            text-black dark:text-white
            p-6 rounded-lg shadow">
  <h2 class="text-xl font-bold text-gray-800 dark:text-gray-100">
    Tiêu đề
  </h2>
  <p class="text-gray-600 dark:text-gray-400">
    Nội dung tự động đổi màu theo chế độ sáng/tối
  </p>
</div>
```

**Cách hoạt động:** Tailwind dựa vào class `dark` trên thẻ `<html>` hoặc `prefers-color-scheme` của hệ điều hành để kích hoạt Dark Mode.

---

## 14. Quản lý rủi ro: HTML "Quá tải" class

### Vấn đề

Khi dùng Tailwind, HTML có thể trở nên **rất dài** vì mỗi phần tử gắn rất nhiều class:

```html
<!-- Lặp lại 10 lần như thế này = ác mộng bảo trì -->
<div class="flex items-center gap-4 p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition">
  ...
</div>
```

Copy-paste hàng tá class **không phải là cách bền vững**.

### Giải pháp: Tư duy Component

Tách các phần UI lặp lại thành **component tái sử dụng**:

- **Với framework (React, Vue, Angular):** Tạo component riêng
  ```jsx
  // React component
  function Card({ title, description }) {
    return (
      <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-md">
        <h3 className="font-bold">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    );
  }
  ```

- **Với HTML thuần:** Sử dụng `@apply` trong CSS để gom nhóm class
  ```css
  /* style.css */
  .card {
    @apply flex items-center gap-4 p-4 bg-white rounded-lg shadow-md;
  }
  ```

---

## 15. Tailwind Plus & UI Blocks — Tăng tốc phát triển

- Hàng trăm **component UI chuyên nghiệp** được thiết kế sẵn, tương thích 100% với Tailwind
- **Templates** xây dựng sẵn bằng React và Next.js
- Không cần bắt đầu từ con số không — chọn template, tuỳ chỉnh, và ship!

---

## Tóm tắt nhanh — Cheat Sheet

| Chủ đề            | Class quan trọng                                                       |
|-------------------|------------------------------------------------------------------------|
| **Typography**    | `text-{size}`, `font-{weight}`, `text-{color}-{shade}`                 |
| **Màu sắc**       | `bg-{color}-{shade}`, `text-{color}-{shade}`, `border-{color}-{shade}` |
| **Spacing**       | `p-{n}`, `m-{n}`, `px-`, `py-`, `gap-{n}`                              |
| **Sizing**        | `w-{n}`, `h-{n}`, `w-full`, `h-screen`                                 |
| **Border/Shadow** | `rounded-{size}`, `shadow-{size}`, `border`                            |
| **Flexbox**       | `flex`, `flex-row/col`, `items-center`, `justify-between`              |
| **Grid**          | `grid`, `grid-cols-{n}`, `gap-{n}`, `col-span-{n}`                     |
| **Responsive**    | `sm:`, `md:`, `lg:`, `xl:`, `2xl:`                                     |
| **States**        | `hover:`, `focus:`, `active:`, `dark:`                                 |
| **Transition**    | `transition`, `duration-{ms}`, `ease-in-out`                           |
