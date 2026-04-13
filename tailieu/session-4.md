# Session 4: CSS Box Model, Display & Media Queries

---

## 1. Mọi thứ trên Web đều là "Khối hộp"

Cách chúng ta quản lý kích thước, luồng chảy (flow) và phản ứng của các khối hộp sẽ tạo nên toàn bộ **Bố cục (Layout)** của trang web.

Quy trình xây dựng layout đi theo 4 bước nối tiếp nhau:

```
Box Model  →  Display  →  Alignment  →  Responsive
   ↑             ↑            ↑              ↑
 Hiểu kích    Quyết định   Căn chỉnh     Thích nghi
 thước hộp    cách hiển    vị trí các    với mọi
 (padding,    thị (block,  phần tử       kích thước
 border,      inline,      (giữa, trái,  màn hình
 margin)      inline-      phải...)
              block...)
```

- **Box Model**: Nền tảng — hiểu mỗi phần tử chiếm bao nhiêu không gian.
- **Display**: Quyết định phần tử xếp dọc (block), xếp ngang (inline), hay kết hợp cả hai (inline-block).
- **Alignment**: Căn chỉnh vị trí phần tử trên trang (giữa, trái, phải...).
- **Responsive**: Làm cho layout tự co giãn theo màn hình (PC, tablet, mobile).

---

## 2. Mô hình hộp (Box Model) là gì?

Trình duyệt nhìn **mọi phần tử HTML** dưới dạng một hình chữ nhật. Box Model quy định cách tính toán không gian và kích thước của hình chữ nhật đó.

```
┌─────────────────────────────────────────────────┐
│                   MARGIN                        │
│   ┌─────────────────────────────────────────┐   │
│   │               BORDER                    │   │
│   │   ┌─────────────────────────────────┐   │   │
│   │   │           PADDING               │   │   │
│   │   │   ┌─────────────────────────┐   │   │   │
│   │   │   │                         │   │   │   │
│   │   │   │        CONTENT          │   │   │   │
│   │   │   │   (Chữ, ảnh, video...)  │   │   │   │
│   │   │   │                         │   │   │   │
│   │   │   └─────────────────────────┘   │   │   │
│   │   │                                 │   │   │
│   │   └─────────────────────────────────┘   │   │
│   │                                         │   │
│   └─────────────────────────────────────────┘   │
│                                                 │
└─────────────────────────────────────────────────┘
```

---

## 3. Chi tiết 4 thành phần Box Model

### 3.1. Content (Nội dung — lớp trong cùng)

Là vùng chứa nội dung thực sự: chữ, hình ảnh, video...
Kích thước được quy định bởi `width` và `height`.

```css
.box {
    width: 300px;    /* chiều rộng vùng nội dung */
    height: 200px;   /* chiều cao vùng nội dung */
}
```

### 3.2. Padding (Đệm bên trong — bao quanh Content)

Khoảng cách từ **nội dung** đến **đường viền**. Padding **có hiển thị màu nền** của phần tử.

```css
.box {
    padding: 20px;              /* đều 4 phía */
    padding: 10px 20px;         /* trên-dưới 10px, trái-phải 20px */
    padding: 10px 20px 15px 5px; /* trên, phải, dưới, trái (chiều kim đồng hồ) */
}
```

### 3.3. Border (Đường viền — bao quanh Padding)

Viền bao quanh phần tử, nằm giữa padding và margin.

```css
.box {
    border: 2px solid #333;     /* độ dày | kiểu | màu */
    border-radius: 8px;         /* bo tròn góc */
}
```

### 3.4. Margin (Khoảng cách bên ngoài — ngoài cùng)

Khoảng cách từ **đường viền** đến **các phần tử khác**. Margin **hoàn toàn trong suốt**, không có màu nền.

```css
.box {
    margin: 20px;               /* đều 4 phía */
    margin: 0 auto;             /* trên-dưới 0, trái-phải tự động → căn giữa */
}
```

---

## 4. Phân biệt Padding và Margin

| Tiêu chí     | Padding                       | Margin                     |
|--------------|-------------------------------|----------------------------|
| **Vị trí**   | Bên trong đường viền (Border) | Bên ngoài đường viền       |
| **Tác dụng** | Đẩy nội dung xa khỏi viền     | Đẩy các phần tử khác ra xa |
| **Màu nền**  | Hiển thị màu nền của phần tử  | Hoàn toàn trong suốt       |

```
Ví dụ thực tế — một cái nút bấm:

┌──────── margin: đẩy nút ra xa các phần tử xung quanh
│
│  ┌───────────────────────┐  ← border: viền nút
│  │                       │
│  │   ┌───────────────┐   │  ← padding: tạo khoảng thoáng
│  │   │  Đăng ký ngay │   │     giữa chữ và viền
│  │   └───────────────┘   │
│  │                       │
│  └───────────────────────┘
│
```

---

## 5. "Cú lừa" của kích thước mặc định & Giải pháp box-sizing

### Vấn đề: content-box (mặc định)

Mặc định, `width` chỉ tính phần **Content**. Padding và Border sẽ **cộng dồn** ra ngoài, làm phình to hộp.

```css
.box {
    width: 100px;
    padding: 20px;     /* cộng 20×2 = 40px */
    border: 2px solid; /* cộng 2×2 = 4px */
}
/* Kích thước THỰC TẾ trên màn hình = 100 + 40 + 4 = 144px */
```

### Tại sao content-box gây rắc rối?

**Ví dụ thực tế:** Bạn muốn 2 cột nằm cạnh nhau, mỗi cột 50%:

```css
/* content-box (mặc định) */
.col {
    width: 50%;
    padding: 20px;
    border: 2px solid black;
}
```

```
Cột 1: 50% + 40px padding + 4px border
Cột 2: 50% + 40px padding + 4px border
────────────────────────────────────────
Tổng = 100% + 88px → TRÀN! Cột 2 rớt xuống dòng dưới
```

Bạn phải tự tính trừ: `width: calc(50% - 44px)` — rất dễ sai và khó bảo trì.

### Giải pháp: border-box

```css
* {
    box-sizing: border-box;  /* Luôn đặt ở đầu file CSS */
}
```

`border-box` ép padding + border **co vào trong** width đã khai báo:

```
content-box:                    border-box:
width = Content ONLY            width = Content + Padding + Border

┌──────────────────────┐        ┌──────────────────┐
│border                │        │border            │
│ ┌──────────────────┐ │        │ ┌──────────────┐ │
│ │padding           │ │        │ │padding       │ │
│ │ ┌──────────────┐ │ │        │ │ ┌──────────┐ │ │
│ │ │content 100px │ │ │        │ │ │content   │ │ │
│ │ └──────────────┘ │ │        │ │ │  56px    │ │ │
│ │                  │ │        │ │ └──────────┘ │ │
│ └──────────────────┘ │        │ └──────────────┘ │
└──────────────────────┘        └──────────────────┘
← ────── 144px ──────→         ← ──── 100px ────→
     Set 100, ra 144!              Set 100, đúng 100!
```

---

## 6. Bản chất luồng hiển thị (Normal Flow)

Trình duyệt mặc định đọc HTML và sắp xếp các phần tử **từ trên xuống dưới, từ trái qua phải**. Thuộc tính `display` quyết định cách phần tử tham gia vào luồng này.

---

## 7. Thuộc tính Display

### 7.1. display: block

- Chiếm **100% chiều rộng** của thẻ cha.
- Luôn **bắt đầu trên một dòng mới**.
- **Có thể** thiết lập `width` và `height`.
- Đại diện: `<div>`, `<p>`, `<h1>`, `<section>`, `<header>`

```
┌──────────────────────────────────┐
│           Block 1 (div)          │  ← chiếm hết dòng
└──────────────────────────────────┘
┌──────────────────────────────────┐
│           Block 2 (p)            │  ← xuống dòng mới
└──────────────────────────────────┘
```

### 7.2. display: inline

- Chỉ chiếm không gian **vừa đủ chứa nội dung**.
- Nằm **san sát nhau** trên cùng một dòng.
- **KHÔNG THỂ** thiết lập `width` và `height`.
- Đại diện: `<span>`, `<a>`, `<strong>`, `<em>`

```
┌──────┐┌────┐┌─────────┐
│ span ││ a  ││ strong  │  ← tất cả trên cùng 1 dòng
└──────┘└────┘└─────────┘
```

### 7.3. display: inline-block — Sự kết hợp hoàn hảo

Nằm trên **cùng 1 dòng** (như inline), nhưng **CÓ THỂ thiết lập kích thước** (như block).

```
┌───────────┐ ┌───────────┐ ┌───────────┐
│  200px    │ │  200px    │ │  200px    │  ← nằm ngang
│  150px    │ │  150px    │ │  150px    │  ← có width/height
└───────────┘ └───────────┘ └───────────┘
```

Đây là giải pháp chia cột trước khi có Flexbox/Grid.

|                           | `block` | `inline`                | `inline-block` |
|---------------------------|---------|-------------------------|----------------|
| Chiếm hết dòng            | Có      | Không                   | Không          |
| Xuống dòng mới            | Có      | Không                   | Không          |
| Set width/height          | Có      | Không                   | Có             |
| Set margin/padding đầy đủ | Có      | Không (trên-dưới thiếu) | Có             |

### 7.4. Ẩn phần tử: display: none vs visibility: hidden

|           | `display: none`         | `visibility: hidden`              |
|-----------|-------------------------|-----------------------------------|
| Hiển thị  | Biến mất hoàn toàn      | Tàng hình (vẫn thấy khoảng trống) |
| Chiếm chỗ | Không — xóa khỏi layout | Có — vẫn giữ nguyên không gian    |

```
Bình thường:        display: none:       visibility: hidden:
┌─────┐             ┌─────┐              ┌─────┐
│  A  │             │  A  │              │  A  │
├─────┤             ├─────┤              ├─────┤
│  B  │  ← ẩn B     │  C  │ ← C dồn lên  │     │ ← khoảng trống
├─────┤             └─────┘              ├─────┤
│  C  │                                  │  C  │
└─────┘                                  └─────┘
```

---

## 8. Các kỹ thuật căn chỉnh (Alignment)

### 8.1. Căn giữa nội dung văn bản & inline

Sử dụng `text-align: center` trên phần tử **cha (block)** để căn giữa tất cả nội dung con bên trong (text, inline, inline-block).

```css
.parent {
    text-align: center;  /* căn giữa mọi thứ inline bên trong */
}
```

### 8.2. Căn giữa phần tử Block

Phải khai báo `width` cụ thể rồi dùng `margin: 0 auto`:

```css
.box {
    width: 400px;       /* bắt buộc có width */
    margin: 0 auto;     /* trái-phải tự động → căn giữa */
}
```

### 8.3. Căn dọc cơ bản (Vertical Alignment)

**Cách 1 — Căn giữa chữ 1 dòng:** Đặt `line-height` bằng `height`:

```css
.button {
    height: 50px;
    line-height: 50px;  /* chữ nằm giữa theo chiều dọc */
}
```

**Cách 2 — Căn icon/ảnh với chữ:**

```css
img {
    vertical-align: middle;  /* ảnh ngang hàng với chữ */
}
```

---

## 9. Kỹ thuật Float

### Float sinh ra để làm gì?

Ban đầu `float` được tạo ra với **mục đích duy nhất**: làm nội dung chữ **bao quanh hình ảnh** (text wrap), giống như tạp chí/báo giấy.

```css
img {
    float: left;   /* ảnh trôi sang trái, chữ bao quanh bên phải */
}
```

```
┌──────────────────────────────────┐
│ ┌───────┐ Lorem ipsum dolor sit  │
│ │  IMG  │ amet, consectetur      │
│ │       │ adipiscing elit. Sed   │
│ └───────┘ do eiusmod tempor      │
│ incididunt ut labore et dolore   │
│ magna aliqua.                    │
└──────────────────────────────────┘
```

### Giá trị float

| Giá trị        | Hiệu ứng                                                 |
|----------------|----------------------------------------------------------|
| `float: left`  | Phần tử trôi sang trái, nội dung khác bao quanh bên phải |
| `float: right` | Phần tử trôi sang phải, nội dung khác bao quanh bên trái |
| `float: none`  | Mặc định, không float                                    |

### Vấn đề: phần tử cha bị "sập" chiều cao

Khi con float, phần tử cha không nhận ra chiều cao con → cha co lại thành 0:

```
Bình thường:           Khi con float:
┌──────────────┐       ┌──────────────┐ ← cha cao 0px!
│ ┌────┐┌────┐ │       └──────────────┘
│ │ A  ││ B  │ │       ┌────┐┌────┐
│ └────┘└────┘ │       │ A  ││ B  │  ← con "rơi" ra ngoài
└──────────────┘       └────┘└────┘
```

### Giải pháp: Clearfix

```css
.parent::after {
    content: '';
    display: block;
    clear: both;    /* ép cha bao lấy các con float */
}
```

### Float từng được dùng chia cột (trước Flexbox)

```css
.col {
    float: left;
    width: 33.33%;
}
```

Ngày nay đã có Flexbox và Grid mạnh mẽ hơn, nên **float chỉ nên dùng cho text wrap**. Chia cột thì dùng Flexbox/Grid.

---

## 10. Thiết kế đáp ứng (Responsive Web Design)

Trang web tự động thích nghi với **mọi kích thước màn hình** (PC, Tablet, Mobile) mà không làm vỡ giao diện.

### Thẻ meta viewport — BẮT BUỘC

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
```

Không có thẻ này → trình duyệt mobile sẽ thu nhỏ trang như đang xem bản PC → chữ siêu nhỏ, phải zoom.

---

## 11. Media Queries & Breakpoints

### Media Query là gì?

Là cách viết CSS **có điều kiện**: chỉ áp dụng khi màn hình thỏa mãn một tiêu chí nhất định.

```css
/* CSS mặc định — luôn chạy */
.container {
    width: 100%;
    padding: 1rem;
}

/* CSS CHỈ chạy khi màn hình >= 768px */
@media (min-width: 768px) {
    .container {
        width: 750px;
        margin: 0 auto;
    }
}
```

### Breakpoint là gì?

Là **điểm ngắt** — mốc kích thước màn hình mà tại đó layout thay đổi.

Các breakpoint phổ biến:

```
         Mobile          Tablet           Laptop          Desktop
  |<--------------->|<--------------->|<--------------->|<--------------->|
  0               576px            768px           1024px          1200px+
```

| Breakpoint      | Thiết bị   | Ví dụ           |
|-----------------|------------|-----------------|
| < 576px         | Mobile nhỏ | iPhone SE       |
| 576px - 767px   | Mobile lớn | iPhone 14 ngang |
| 768px - 1023px  | Tablet     | iPad dọc        |
| 1024px - 1199px | Laptop     | Laptop 13 inch  |
| >= 1200px       | Desktop    | Màn hình lớn    |

### Mobile-First vs Desktop-First

#### Mobile-First (xu hướng hiện nay — khuyến nghị)

Code cho **mobile trước** (CSS mặc định), rồi dùng `min-width` **nâng cấp lên** cho màn hình lớn hơn.

```css
/* Mặc định: Mobile — 1 cột */
.card {
    width: 100%;
}

/* Tablet trở lên: 2 cột */
@media (min-width: 768px) {
    .card {
        width: 50%;
        display: inline-block;
    }
}

/* Desktop trở lên: 3 cột */
@media (min-width: 1200px) {
    .card {
        width: 33.33%;
    }
}
```

```
Mobile (< 768px):     Tablet (>= 768px):    Desktop (>= 1200px):
┌──────────────┐      ┌──────┐┌──────┐      ┌────┐┌────┐┌────┐
│    Card 1    │      │  1   ││  2   │      │ 1  ││ 2  ││ 3  │
├──────────────┤      ├──────┤├──────┤      └────┘└────┘└────┘
│    Card 2    │      │  3   ││      │
├──────────────┤      └──────┘└──────┘
│    Card 3    │
└──────────────┘
```

#### Desktop-First

Code cho **PC trước**, rồi dùng `max-width` **thu gọn xuống** cho màn hình nhỏ.

```css
/* Mặc định: Desktop — 3 cột */
.card {
    width: 33.33%;
    display: inline-block;
}

/* Tablet trở xuống: 2 cột */
@media (max-width: 1024px) {
    .card {
        width: 50%;
    }
}

/* Mobile trở xuống: 1 cột */
@media (max-width: 767px) {
    .card {
        width: 100%;
        display: block;
    }
}
```

### So sánh

|              | Mobile-First (min-width) | Desktop-First (max-width) |
|--------------|--------------------------|---------------------------|
| Hướng tư duy | Nhỏ → lớn (nâng cấp lên) | Lớn → nhỏ (thu gọn xuống) |
| CSS mặc định | Dành cho mobile          | Dành cho desktop          |
| Xu hướng     | Được khuyến nghị         | Vẫn dùng được             |
| Lý do ưu tiên | 60%+ người dùng xem web trên mobile trước |
