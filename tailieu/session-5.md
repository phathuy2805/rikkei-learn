# Session 05: Responsive Layout Design with Flexbox

---

## 1. Hạn chế của Layout truyền thống

Layout truyền thống xây dựng bằng `float`, `inline-block` hoặc `position`. Mỗi cách đều có **nhược điểm riêng**:

### 1.1. Float — Phá vỡ layout

```
┌─ Parent ──────────────────┐
│  (trống — cao = 0!)       │  ← Parent không biết con float cao bao nhiêu
└───────────────────────────┘
  [Float left]  [Float right]   ← Bay ra ngoài luồng
  [Content tràn lên đè]         ← Phải dùng clearfix / overflow: hidden
```

- Phần tử float **thoát khỏi luồng** → parent cao = 0
- Phải dùng **thủ thuật** clear float (`clearfix`, `overflow: hidden`)
- Khó chia cột đều nhau, khó căn giữa theo chiều dọc

### 1.2. Inline-block — Khoảng trắng ma

```html
<div class="col">A</div>
<div class="col">B</div>   ← Dấu xuống dòng = ~4px khoảng trắng!
<div class="col">C</div>

<!-- 3 × 33.33% + khoảng trắng > 100% → VỠ LAYOUT -->
```

- Khoảng trắng trong HTML tạo **gap không mong muốn** (~4px)
- Phải dùng trick `font-size: 0` trên parent
- Khó kiểm soát căn chỉnh dọc giữa các item khác chiều cao

### 1.3. Position — Cứng nhắc

```css
.sidebar { position: absolute; left: 0; width: 250px; }
.main    { margin-left: 250px; }  /* Phải tính tay! */
```

- Phải **tính toán thủ công** kích thước, vị trí
- Không tự co giãn theo màn hình
- Phần tử `absolute` thoát luồng hoàn toàn → khó responsive

### 1.4. Bảng tổng hợp hạn chế

| Kỹ thuật       | Hạn chế chính                              | Trick phải dùng                |
|----------------|--------------------------------------------|--------------------------------|
| `float`        | Parent cao = 0, nội dung tràn              | `clearfix`, `overflow: hidden` |
| `inline-block` | Khoảng trắng ~4px, vỡ layout               | `font-size: 0`                 |
| `position`     | Cứng nhắc, tính tay                        | `margin-left` bù trừ           |
| **Chung**      | Khó căn giữa dọc, khó chia đều khoảng cách | Không có giải pháp gọn         |

### 1.5. Flexbox khắc phục tất cả

| Vấn đề               | Truyền thống                                 | Flexbox                          |
|----------------------|----------------------------------------------|----------------------------------|
| Căn giữa dọc         | `line-height` hack, `position` + `transform` | `align-items: center`            |
| Chia đều khoảng cách | Tính tay `margin`, `calc()`                  | `justify-content: space-between` |
| Cột cao bằng nhau    | Không thể (trừ trick)                        | Tự động mặc định                 |
| Clear float          | `clearfix`, `overflow: hidden`               | **Không cần** — không dùng float |
| Khoảng trắng inline  | `font-size: 0`                               | **Không có** vấn đề này          |
| Responsive           | Viết nhiều code override                     | Đổi `flex-direction` là xong     |

---

## 2. Khái niệm về Flexbox

> **Flexbox** (Flexible Box) là mô hình CSS Layout linh hoạt, thiết kế để tối ưu hóa việc sắp xếp, căn chỉnh và phân bổ không gian **theo một chiều** (1D Layout).

### 2.1. Hai trục nền tảng

```
flex-direction: row (mặc định)

Main Axis (Trục chính) →
┌──────────────────────────────┐
│ [Item 1]  [Item 2]  [Item 3] │  ↕ Cross Axis (Trục chéo)
└──────────────────────────────┘

flex-direction: column

Cross Axis (Trục chéo) →
┌────────────┐
│  [Item 1]  │  ↕ Main Axis (Trục chính)
│  [Item 2]  │
│  [Item 3]  │
└────────────┘
```

- **Main Axis (Trục chính)**: Hướng sắp xếp các item
- **Cross Axis (Trục chéo)**: Luôn **vuông góc** với trục chính

> Mọi căn chỉnh và phân bổ không gian đều xoay quanh 2 trục này.

### 2.2. Flex Container & Flex Item

```
┌─ Flex Container (display: flex) ──────────┐
│                                            │
│  ┌─ Item ─┐  ┌─ Item ─┐  ┌─ Item ─┐      │
│  │        │  │        │  │        │      │
│  └────────┘  └────────┘  └────────┘      │
│                                            │
└────────────────────────────────────────────┘
```

- **Container**: Phần tử cha, khởi tạo môi trường Flexbox bằng `display: flex`
- **Item**: Các phần tử **con trực tiếp** của Container
- **Nguyên tắc**: Thuộc tính Container ≠ Thuộc tính Item → áp dụng đúng chỗ

### 2.3. So sánh Layout truyền thống vs Flexbox

| Đặc điểm          | Truyền thống (Block/Inline/Float)     | Flexbox                             |
|-------------------|---------------------------------------|-------------------------------------|
| **Chiều**         | Khối từ trên xuống dưới               | Layout 1 chiều (hàng/cột) linh hoạt |
| **Căn giữa**      | Phức tạp (`margin: auto`, `position`) | Đơn giản, tự động                   |
| **Chiều cao cột** | Các cột độc lập, cột ngắn nội dung ít | Tự động cao bằng nhau               |
| **Thứ tự**        | Ràng buộc bởi HTML                    | Có thể đảo vị trí hiển thị          |

---

## 3. Thuộc tính của Flex Container

### Khởi tạo

```css
.container {
    display: flex;    /* Bắt đầu Flexbox */
}
```

### 3.1. `flex-direction` — Hướng sắp xếp

| Giá trị          | Hướng             |
|------------------|-------------------|
| `row` (mặc định) | → Trái sang phải  |
| `row-reverse`    | ← Phải sang trái  |
| `column`         | ↓ Trên xuống dưới |
| `column-reverse` | ↑ Dưới lên trên   |

### 3.2. `flex-wrap` — Xuống dòng

| Giá trị             | Hành vi                          |
|---------------------|----------------------------------|
| `nowrap` (mặc định) | Tất cả trên 1 dòng (có thể tràn) |
| `wrap`              | Tự động xuống dòng khi đầy       |
| `wrap-reverse`      | Xuống dòng theo chiều ngược      |

### 3.3. `justify-content` — Căn chỉnh trên **Main Axis**

```
flex-start:      [A][B][C]                 
flex-end:                         [A][B][C]
center:               [A][B][C]            
space-between:   [A]       [B]       [C]   
space-around:     [A]     [B]     [C]      
space-evenly:      [A]    [B]    [C]       
```

### 3.4. `align-items` — Căn chỉnh trên **Cross Axis**

| Giá trị              | Hành vi                               |
|----------------------|---------------------------------------|
| `stretch` (mặc định) | Kéo giãn item lấp đầy chiều cao/rộng  |
| `center`             | Căn giữa theo chiều vuông góc         |
| `flex-start`         | Ép sát lề trên (hoặc trái nếu column) |
| `flex-end`           | Ép sát lề dưới (hoặc phải nếu column) |

### 3.5. `align-content` — Căn chỉnh **nhiều dòng** trên Cross Axis

- Chỉ hoạt động khi có `flex-wrap: wrap` và **nhiều dòng**
- Giá trị giống `justify-content`: `flex-start`, `center`, `space-between`...

---

## 4. Thuộc tính của Flex Item

> Viết trực tiếp trên phần tử **con**. Kiểm soát co giãn, kích thước, vị trí từng item **độc lập**.

### 4.1. `order` — Thứ tự hiển thị

```css
/* Mặc định tất cả order: 0 */
.item-a { order: 2; }   /* Hiển thị sau cùng */
.item-b { order: -1; }  /* Hiển thị đầu tiên */
.item-c { order: 0; }   /* Ở giữa */
```

- Sắp xếp từ **thấp đến cao** (số âm lên trước)
- Thay đổi vị trí hiển thị **mà không sửa HTML**

### 4.2. `flex-grow` — Tỷ lệ **giãn ra**

```
Container: [==== trống ====]

flex-grow: 0 (mặc định):   [A][B][C]         ← không giãn
flex-grow: 1 (tất cả):     [A======][B======][C======]  ← giãn đều
Item B flex-grow: 2:        [A===][B============][C===]  ← B giãn gấp đôi
```

### 4.3. `flex-shrink` — Tỷ lệ **co lại**

| Giá trị        | Hành vi                                    |
|----------------|--------------------------------------------|
| `1` (mặc định) | Cho phép item tự động co lại khi thiếu chỗ |
| `0`            | **Giữ nguyên** kích thước, không co        |

### 4.4. `flex-basis` — Kích thước **ban đầu**

```css
.item {
    flex-basis: 200px;   /* Kích thước ban đầu trên trục chính */
}
```

- Chấp nhận: `px`, `rem`, `%`, `auto`
- Được **ưu tiên hơn** `width` / `height`

### 4.5. `align-self` — Tự căn chỉnh riêng

```
align-items: flex-start (Container)

┌──────────────────────────┐
│ [A]  [B]  [     ]        │
│            [ C  ]        │  ← C có align-self: center
│            [     ]        │
└──────────────────────────┘
```

- **Ghi đè** `align-items` của Container cho **1 item cụ thể**
- Giá trị: `auto`, `flex-start`, `flex-end`, `center`, `stretch`

---

## 5. Responsive với Flexbox

Flexbox kết hợp Media Queries để tạo layout responsive:

```css
/* Mobile: xếp dọc */
.container {
    display: flex;
    flex-direction: column;
}

/* Desktop: xếp ngang */
@media (min-width: 769px) {
    .container {
        flex-direction: row;
    }
}
```

### Các kỹ thuật chính:

| Kỹ thuật                               | Mô tả                                          |
|----------------------------------------|------------------------------------------------|
| `flex-wrap: wrap`                      | Tự động xuống dòng khi thu nhỏ màn hình        |
| Đổi `flex-direction` trong Media Query | Chuyển `row` (Desktop) ↔ `column` (Mobile)     |
| `flex-grow` / `flex-basis`             | Tỷ lệ co giãn linh hoạt theo không gian có sẵn |

