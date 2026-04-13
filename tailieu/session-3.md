# Session 3 – CSS Cơ bản

---

## 1. CSS là gì?

**CSS (Cascading Style Sheets)** là ngôn ngữ định dạng kiểu, dùng để mô tả cách trình bày các tài liệu viết bằng HTML.

|         | HTML                  | CSS                          |
|---------|-----------------------|------------------------------|
| Vai trò | Khung sườn / Cấu trúc | Giao diện / Màu sắc / Bố cục |

### Tại sao cần tách biệt HTML và CSS?

- **Dễ bảo trì** — sửa giao diện không ảnh hưởng cấu trúc
- **Tái sử dụng** — 1 file CSS dùng chung cho nhiều trang
- **Tối ưu hiệu suất** — trình duyệt cache file CSS, tải trang nhanh hơn
- **Tập trung** — HTML lo nội dung, CSS lo hiển thị

---

## 2. Ba cách nhúng CSS vào HTML

### 2.1. Inline CSS

Viết trực tiếp trong thuộc tính `style` của thẻ HTML:

```html
<p style="color: red; font-size: 16px;">Xin chào</p>
```

### 2.2. Internal CSS

Viết trong thẻ `<style>` đặt trong `<head>`:

```html
<head>
    <style>
        p { color: red; }
    </style>
</head>
```

### 2.3. External CSS

Viết trong file `.css` riêng, liên kết qua thẻ `<link>`:

```html
<head>
    <link rel="stylesheet" href="style.css" />
</head>
```

### So sánh 3 cách nhúng

| Kỹ thuật     | Phạm vi ảnh hưởng    | Mức ưu tiên   | Đánh giá                                                                           |
|--------------|----------------------|---------------|------------------------------------------------------------------------------------|
| **Inline**   | Chỉ 1 thẻ duy nhất   | ⭐⭐⭐ Cao nhất  | ❌ **Hạn chế tối đa** — khó bảo trì, lặp code, ghi đè mọi thứ nên rất khó kiểm soát |
| **Internal** | 1 trang HTML         | ⭐⭐ Trung bình | ⚠️ OK cho trang đơn lẻ                                                             |
| **External** | Nhiều trang cùng lúc | ⭐ Thấp nhất   | ✅ **Khuyến nghị** — chuẩn thực tế                                                  |

> **Quy tắc ưu tiên:** Inline > Internal > External. Khi cùng thuộc tính bị trùng, cách có mức ưu tiên cao hơn sẽ thắng.
>
> **Lưu ý:** Ưu tiên cao ≠ nên dùng nhiều. Inline ưu tiên cao nhất → ghi đè tất cả → muốn sửa lại phải vào từng thẻ → nên **hạn chế tối đa**.

---

## 3. Cấu trúc một CSS Rule

```css
selector {
    property: value;
}
```

```
  selector      property    value
    ↓              ↓          ↓
    p      {   color    :   red;   }
```

- **Selector** — chọn phần tử HTML nào sẽ bị ảnh hưởng
- **Property** — thuộc tính muốn thay đổi (màu, cỡ chữ, v.v.)
- **Value** — giá trị gán cho thuộc tính đó

---

## 4. Selectors (Bộ chọn)

### 4.1. Basic Selectors

| Selector      | Cú pháp      | Chọn gì                          | Ví dụ                          |
|---------------|--------------|----------------------------------|--------------------------------|
| **Universal** | `*`          | Tất cả phần tử trên trang        | `* { margin: 0; padding: 0; }` |
| **Tag**       | `tên_thẻ`    | Tất cả thẻ cùng tên              | `p { font-family: Verdana; }`  |
| **Class**     | `.tên_class` | Phần tử có `class="..."`         | `.highlight { color: red; }`   |
| **ID**        | `#tên_id`    | Phần tử có `id="..."` (duy nhất) | `#header { font-size: 24px; }` |

### 4.2. Combinators (Bộ kết hợp)

Dùng để chọn phần tử dựa trên **vị trí / quan hệ** của nó với phần tử khác trong HTML.

Lấy cấu trúc HTML này làm ví dụ xuyên suốt:

```html
<div>
    <p>Đoạn 1</p>              <!-- con trực tiếp của div -->
    <section>
        <p>Đoạn 2</p>          <!-- cháu của div (nằm trong section) -->
    </section>
</div>
<p>Đoạn 3</p>                  <!-- anh em liền kề ngay sau div -->
<p>Đoạn 4</p>                  <!-- anh em nhưng KHÔNG liền kề -->
```

---

#### 1) `div p` — Descendant (khoảng trắng): Chọn tất cả con + cháu

> "Tìm mọi `<p>` nằm **bên trong** `<div>`, bất kể sâu bao nhiêu cấp"

- Đoạn 1 ✅ (con trực tiếp)
- Đoạn 2 ✅ (cháu — nằm trong section, mà section nằm trong div)
- Đoạn 3 ❌ (nằm ngoài div)
- Đoạn 4 ❌ (nằm ngoài div)

---

#### 2) `div > p` — Child (`>`): Chỉ chọn con trực tiếp cấp 1

> "Tìm `<p>` là con **ruột** của `<div>`, không lấy cháu"

- Đoạn 1 ✅ (con trực tiếp)
- Đoạn 2 ❌ (cháu — cha ruột là section, không phải div)
- Đoạn 3 ❌
- Đoạn 4 ❌

---

#### 3) `div + p` — Adjacent Sibling (`+`): Anh em liền kề ngay phía sau

> "Tìm `<p>` đứng **ngay sát sau** `<div>`, cùng cấp"

- Đoạn 1 ❌ (nằm trong div)
- Đoạn 2 ❌ (nằm trong div)
- Đoạn 3 ✅ (ngay sát sau div, cùng cấp)
- Đoạn 4 ❌ (cùng cấp nhưng không liền kề — bị Đoạn 3 chen giữa)

---

#### 4) `div ~ p` — General Sibling (`~`): Tất cả anh em phía sau

> "Tìm **mọi** `<p>` đứng sau `<div>`, cùng cấp"

- Đoạn 1 ❌ (nằm trong div)
- Đoạn 2 ❌ (nằm trong div)
- Đoạn 3 ✅ (cùng cấp, đứng sau div)
- Đoạn 4 ✅ (cùng cấp, đứng sau div)

---

#### Tóm tắt nhanh

| Ký hiệu              | Tên              | Nhớ nhanh                 |
|----------------------|------------------|---------------------------|
| `A B` (khoảng trắng) | Descendant       | Tất cả con cháu bên trong |
| `A > B`              | Child            | Chỉ con ruột cấp 1        |
| `A + B`              | Adjacent Sibling | 1 anh em sát ngay sau     |
| `A ~ B`              | General Sibling  | Mọi anh em phía sau       |

### 4.3. Pseudo-classes & Pseudo-elements

#### Pseudo-classes (Lớp giả — bắt đầu bằng `:`)

Chọn phần tử dựa trên **trạng thái** (đang hover, đang click...) hoặc **vị trí** (thứ mấy, đầu tiên, cuối cùng...).

Nói đơn giản: phần tử **vẫn nằm đó** trong HTML, nhưng chỉ bị ảnh hưởng khi **điều kiện xảy ra**.

Lấy HTML này làm ví dụ:

```html
<ul>
    <li>Mục 1</li>
    <li>Mục 2</li>
    <li>Mục 3</li>
</ul>
<button>Click tôi</button>
<input type="text" placeholder="Nhập gì đó..." />
```

**Nhóm 1: Trạng thái tương tác (người dùng thao tác)**

| Pseudo-class | Khi nào xảy ra                   | Ví dụ                                                                 |
|--------------|----------------------------------|-----------------------------------------------------------------------|
| `:hover`     | Di chuột vào phần tử             | `button:hover { background: green; }` → nút đổi màu khi rê chuột vào  |
| `:active`    | Đang giữ click chuột             | `button:active { background: red; }` → nút đỏ lúc nhấn giữ            |
| `:focus`     | Ô input đang được chọn (đang gõ) | `input:focus { border: 2px solid blue; }` → viền xanh khi click vào ô |

**Nhóm 2: Vị trí thứ tự (không cần tương tác, áp dụng ngay)**

| Pseudo-class       | Chọn phần tử nào              | Kết quả với ví dụ trên |
|--------------------|-------------------------------|------------------------|
| `:first-child`     | Con **đầu tiên**              | Mục 1 bị ảnh hưởng     |
| `:last-child`      | Con **cuối cùng**             | Mục 3 bị ảnh hưởng     |
| `:nth-child(2)`    | Con **thứ 2**                 | Mục 2 bị ảnh hưởng     |
| `:nth-child(odd)`  | Các con **lẻ** (1, 3, 5...)   | Mục 1, Mục 3           |
| `:nth-child(even)` | Các con **chẵn** (2, 4, 6...) | Mục 2                  |

```css
/* Ví dụ: Tô màu xen kẽ cho danh sách */
li:nth-child(odd)  { background: #f0f0f0; }  /* hàng lẻ: xám nhạt */
li:nth-child(even) { background: #ffffff; }  /* hàng chẵn: trắng */
```

---

#### Pseudo-elements (Thành phần giả — bắt đầu bằng `::`)

Khác với pseudo-class, pseudo-element tạo ra **phần tử ảo không có trong HTML** — bạn không viết nó trong file `.html` nhưng nó vẫn xuất hiện trên trang.

Lấy HTML này:

```html
<p>Xin chào các bạn</p>
```

| Pseudo-element   | Tác dụng                    | CSS                                    | Kết quả hiển thị                        |
|------------------|-----------------------------|----------------------------------------|-----------------------------------------|
| `::before`       | Chèn nội dung **trước** chữ | `p::before { content: "→ "; }`         | → Xin chào các bạn                      |
| `::after`        | Chèn nội dung **sau** chữ   | `p::after { content: " ✓"; }`          | Xin chào các bạn ✓                      |
| `::first-letter` | Style **chữ cái đầu** tiên  | `p::first-letter { font-size: 200%; }` | **X**in chào các bạn (chữ X to gấp đôi) |
| `::first-line`   | Style **dòng đầu** tiên     | `p::first-line { font-weight: bold; }` | Dòng 1 in đậm, các dòng sau bình thường |

> **Lưu ý:** `::before` và `::after` **bắt buộc** phải có `content: "..."` — không có thì không hiển thị gì.

---

#### Phân biệt nhanh Pseudo-class vs Pseudo-element

|              | Pseudo-class `:`                          | Pseudo-element `::`                        |
|--------------|-------------------------------------------|--------------------------------------------|
| Là gì        | Chọn phần tử **đã có** khi thỏa điều kiện | Tạo phần tử **ảo mới** không có trong HTML |
| Ví dụ dễ nhớ | `:hover` = "khi rê chuột vào nút"         | `::before` = "chèn mũi tên trước đoạn văn" |
| Dấu hiệu     | Bắt đầu bằng **1 dấu** `:`                | Bắt đầu bằng **2 dấu** `::`                |

---

## 5. Typography (Kiểu chữ)

### 5.1. Font Family & Fallback

```css
body {
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
}
/*              ↑ ưu tiên 1       ↑ dự phòng 2  ↑ dự phòng 3  ↑ chốt chặn */
```

> **Nguyên tắc:** Luôn kết thúc bằng **Generic font family** (`sans-serif`, `serif`, `monospace`) làm chốt chặn cuối cùng.

### 5.2. Font Size — Đơn vị đo kích thước chữ

> ⚠️ **Rất quan trọng:** Chọn sai đơn vị → layout vỡ, chữ quá to/nhỏ, responsive hỏng. Phải hiểu rõ sự khác nhau.

#### 3 đơn vị phổ biến nhất

| Đơn vị | Tên đầy đủ | Tính theo cái gì                     | Cố định hay linh hoạt                |
|--------|------------|--------------------------------------|--------------------------------------|
| `px`   | Pixel      | Màn hình — 1px = 1 điểm ảnh          | **Cố định** — luôn giữ nguyên        |
| `em`   | Em         | **Thẻ cha** trực tiếp                | **Linh hoạt** — thay đổi theo cha    |
| `rem`  | Root Em    | **Thẻ `<html>` gốc** (mặc định 16px) | **Linh hoạt** — nhất quán toàn trang |

#### Cách tính cụ thể

**`px` — Đơn giản nhất, ghi bao nhiêu là bấy nhiêu:**

```css
p { font-size: 20px; }   /* Chữ luôn 20px, không đổi */
```

**`em` — Nhân với font-size của thẻ CHA:**

```html
<div style="font-size: 20px;">        <!-- cha = 20px -->
    <p style="font-size: 1.5em;">     <!-- 1.5 × 20px = 30px -->
        Chữ này 30px
        <span style="font-size: 1.5em;">  <!-- 1.5 × 30px = 45px ⚠️ -->
            Chữ này 45px!
        </span>
    </p>
</div>
```

> ⚠️ **Bẫy của `em`:** Khi lồng nhiều cấp, kích thước **nhân dồn** (20 → 30 → 45 → ...) → rất khó kiểm soát!

**`rem` — Luôn nhân với font-size của `<html>` gốc (mặc định 16px):**

```css
html { font-size: 16px; }  /* gốc = 16px */
```

```html
<div style="font-size: 20px;">
    <p style="font-size: 1.5rem;">       <!-- 1.5 × 16px = 24px -->
        Chữ này 24px
        <span style="font-size: 1.5rem;">  <!-- 1.5 × 16px = 24px ✅ -->
            Chữ cũng 24px!
        </span>
    </p>
</div>
```

> ✅ `rem` **không bị nhân dồn** — dù lồng bao nhiêu cấp, kết quả luôn giống nhau vì chỉ nhìn vào `<html>`.

#### Bảng quy đổi nhanh (khi html = 16px)

| rem        | px   |
|------------|------|
| `0.75rem`  | 12px |
| `0.875rem` | 14px |
| `1rem`     | 16px |
| `1.125rem` | 18px |
| `1.25rem`  | 20px |
| `1.5rem`   | 24px |
| `2rem`     | 32px |

> **Mẹo tính nhẩm:** `rem × 16 = px`. Ví dụ: `1.25rem × 16 = 20px`

#### Khi nào dùng cái nào?

| Tình huống                                   | Nên dùng | Lý do                                                 |
|----------------------------------------------|----------|-------------------------------------------------------|
| Kích thước chữ bình thường                   | `rem` ✅  | Nhất quán, dễ responsive, không nhân dồn              |
| `border`, `box-shadow`, chi tiết nhỏ cố định | `px`     | Cần chính xác tuyệt đối, không cần co giãn            |
| Muốn phần tử con tỉ lệ theo cha              | `em`     | Hiếm dùng — chỉ khi cần tỉ lệ tương đối với container |

> **Kết luận:** Mặc định hãy dùng **`rem`** cho `font-size`. Chỉ dùng `px` cho những thứ cần cố định tuyệt đối. Tránh `em` trừ khi hiểu rõ cơ chế nhân dồn.

### 5.3. Font Weight

| Thuộc tính    | Vai trò        | Giá trị phổ biến                                  |
|---------------|----------------|---------------------------------------------------|
| `font-weight` | Độ đậm nét chữ | `normal` (400), `bold` (700), hoặc số `100`–`900` |

### 5.5. Căn lề & Khoảng cách

| Thuộc tính       | Vai trò                    | Giá trị phổ biến                     | Ghi chú              |
|------------------|----------------------------|--------------------------------------|----------------------|
| `text-align`     | Căn ngang văn bản          | `left`, `right`, `center`, `justify` |                      |
| `line-height`    | Giãn cách giữa các dòng    | `1.5`, `1.6`                         | Chuẩn readability    |
| `letter-spacing` | Khoảng cách giữa các ký tự | `1px`, `2px`                         | Hay dùng cho heading |

### 5.6. Trang trí & Biến đổi văn bản

| Thuộc tính        | Giá trị        | Hiệu ứng                          |
|-------------------|----------------|-----------------------------------|
| `text-decoration` | `none`         | Bỏ gạch chân (hay dùng cho `<a>`) |
|                   | `underline`    | Gạch chân                         |
|                   | `line-through` | ~~Gạch ngang chữ~~                |
| `text-transform`  | `uppercase`    | IN HOA TOÀN BỘ                    |
|                   | `lowercase`    | in thường toàn bộ                 |
|                   | `capitalize`   | In Hoa Chữ Cái Đầu                |

---

## 6. Màu sắc trong CSS

### 6.1. Các hệ màu

| Hệ màu         | Cú pháp            | Ví dụ                              | Ghi chú                      |
|----------------|--------------------|------------------------------------|------------------------------|
| **Color Name** | `tên_màu`          | `red`, `tomato`, `lightblue`       | Dễ đọc, ít lựa chọn          |
| **Hex**        | `#RRGGBB`          | `#ffffff` (trắng), `#000000` (đen) | Phổ biến nhất trong thiết kế |
| **RGB**        | `rgb(R, G, B)`     | `rgb(255, 0, 0)` (đỏ)              | Giá trị 0–255                |
| **RGBA**       | `rgba(R, G, B, A)` | `rgba(255, 0, 0, 0.5)` (đỏ mờ 50%) | A = độ trong suốt (0–1)      |
| **HSL**        | `hsl(H, S%, L%)`   | `hsl(0, 100%, 50%)` (đỏ)           | Gần tư duy thiết kế tự nhiên |

### 6.2. Màu chữ & Màu nền

| Thuộc tính         | Vai trò             | Ví dụ                        |
|--------------------|---------------------|------------------------------|
| `color`            | Màu **văn bản**     | `color: #333;`               |
| `background-color` | Màu **nền** phần tử | `background-color: #f5f5f5;` |

> ⚠️ **Lưu ý UI/UX:** Đảm bảo đủ **độ tương phản** (contrast) giữa `color` và `background-color` để dễ đọc.

---

## 7. Background Image

### Các thuộc tính riêng lẻ

| Thuộc tính            | Vai trò        | Giá trị phổ biến                                               |
|-----------------------|----------------|----------------------------------------------------------------|
| `background-image`    | Nhúng ảnh nền  | `url("img.png")`                                               |
| `background-size`     | Kích thước ảnh | `cover` (lấp đầy, có thể cắt) / `contain` (vừa vặn, không cắt) |
| `background-position` | Vị trí ảnh     | `center`, `top left`, `bottom right`                           |
| `background-repeat`   | Lặp ảnh        | `no-repeat`, `repeat-x`, `repeat-y`                            |

### Shorthand (Viết gọn)

Gộp tất cả vào 1 dòng, thứ tự: **color → image → repeat → position**

```css
/* Cách dài */
background-color: #ffffff;
background-image: url("img.png");
background-repeat: no-repeat;
background-position: right top;

/* Cách shorthand — tương đương */
background: #ffffff url("img.png") no-repeat right top;
```
