# Session 2 – Danh sách & Bảng trong HTML

---

## 1. Ba loại danh sách cốt lõi

| Loại             | Thẻ    | Mục đích chính                        |
|------------------|--------|---------------------------------------|
| Unordered List   | `<ul>` | Danh sách **không** quan trọng thứ tự |
| Ordered List     | `<ol>` | Danh sách **có** thứ tự               |
| Description List | `<dl>` | Danh sách mô tả / định nghĩa          |

---

## 2. So sánh `<ul>` và `<ol>`

### `<ul>` – Danh sách không thứ tự

- Dùng cho: menu điều hướng, danh sách liệt kê
- Khi nào dùng: thứ tự các mục **không quan trọng**

### `<ol>` – Danh sách có thứ tự

- Dùng cho: hướng dẫn quy trình, bảng xếp hạng
- Khi nào dùng: thứ tự các mục **quan trọng**
- Thuộc tính hỗ trợ:
  - `type` – kiểu đánh số (`1`, `a`, `A`, `i`, `I`)
  - `start` – giá trị bắt đầu (VD: `start="3"` → bắt đầu từ 3)

### ⚠️ Quy tắc lồng (Nesting Rule)

> Thẻ con **trực tiếp** của `<ul>` và `<ol>` **bắt buộc phải là** `<li>`.

```html
<!-- ✅ Đúng -->
<ul>
    <li>Mục 1</li>
    <li>Mục 2</li>
</ul>

<!-- ❌ Sai – không được đặt thẻ khác trực tiếp bên trong ul/ol -->
<ul>
    <p>Đoạn văn</p>
</ul>
```

---

## 3. `<dl>` – Description List (Danh sách mô tả)

Gồm 2 thẻ con:

| Thẻ    | Tên đầy đủ             | Vai trò             |
|--------|------------------------|---------------------|
| `<dt>` | Description **Term**   | Thuật ngữ / Tiêu đề |
| `<dd>` | Description **Detail** | Mô tả / Giải thích  |

### Ví dụ

```html
<dl>
    <dt>HTML</dt>
    <dd>Ngôn ngữ đánh dấu siêu văn bản, dùng để tạo cấu trúc trang web.</dd>

    <dt>CSS</dt>
    <dd>Ngôn ngữ tạo kiểu, dùng để trang trí và bố cục trang web.</dd>

    <dt>JavaScript</dt>
    <dd>Ngôn ngữ lập trình, dùng để tạo tương tác cho trang web.</dd>
</dl>
```

---

## 4. Table – Bảng trong HTML

### Các thẻ cấu thành bảng

| Thẻ         | Vai trò                                                   |
|-------------|-----------------------------------------------------------|
| `<table>`   | Thẻ cha – bọc toàn bộ bảng                                |
| `<caption>` | Tiêu đề của bảng                                          |
| `<tr>`      | **Table Row** – định nghĩa một hàng                       |
| `<th>`      | **Table Header** – ô tiêu đề (in đậm, canh giữa mặc định) |
| `<td>`      | **Table Data** – ô dữ liệu thông thường                   |

### Cấu trúc lồng nhau

```
<table>
  ├── <caption>       ← Tiêu đề bảng
  ├── <tr>            ← Hàng tiêu đề
  │     ├── <th>      ← Ô tiêu đề cột 1
  │     └── <th>      ← Ô tiêu đề cột 2
  └── <tr>            ← Hàng dữ liệu
        ├── <td>      ← Ô dữ liệu 1
        └── <td>      ← Ô dữ liệu 2
```

### Ví dụ

```html
<table>
    <caption>Bảng điểm sinh viên</caption>
    <tr>
        <th>Họ tên</th>
        <th>Điểm</th>
    </tr>
    <tr>
        <td>Nguyễn Văn A</td>
        <td>9.0</td>
    </tr>
    <tr>
        <td>Trần Thị B</td>
        <td>8.5</td>
    </tr>
</table>
```

---

## 5. HTML Forms – Biểu mẫu

### Cơ chế hoạt động

Thẻ `<form>` bọc toàn bộ biểu mẫu, có 2 thuộc tính quan trọng:

| Thuộc tính | Vai trò          | Ví dụ                                |
|------------|------------------|--------------------------------------|
| `action`   | URL nhận dữ liệu | `action="https://example.com/login"` |
| `method`   | Phương thức gửi  | `method="GET"` hoặc `method="POST"`  |

### So sánh GET vs POST

|            | **GET**                                | **POST**                        |
|------------|----------------------------------------|---------------------------------|
| Dữ liệu    | Hiện trên URL (`?keyword=html&page=1`) | Ẩn trong body request           |
| Dùng cho   | Tìm kiếm, lọc dữ liệu                  | Đăng nhập, đăng ký, upload file |
| Bookmark   | ✅ Được                                 | ❌ Không                         |
| Bảo mật    | ❌ Lộ trên URL                          | ✅ Bảo mật hơn                   |
| Dung lượng | ❌ Giới hạn ~2048 ký tự                 | ✅ Không giới hạn                |

---

### 5.1. Thẻ `<label>` – Nhãn cho ô nhập

- Mô tả ô nhập dùng để làm gì
- Rất quan trọng cho **accessibility** và **SEO**

**2 cách liên kết `<label>` với `<input>`:**

> Quy tắc: `for` của `<label>` **phải trùng** với `id` của `<input>`

```html
<!-- Cách 1: Dùng for + id (✅ KHUYẾN NGHỊ) -->
<label for="email">Email:</label>
<input type="email" id="email" name="email" />

<!-- Cách 2: Bọc input bên trong label -->
<label>
  Email:
  <input type="email" name="email" />
</label>
```

---

### 5.2. Thẻ `<input>` – Ô nhập liệu

Thẻ tự đóng, thay đổi thuộc tính `type` để tạo nhiều dạng ô nhập khác nhau.

#### Các dạng input phổ biến

| Nhóm           | Type                                      | Mô tả                                        |
|----------------|-------------------------------------------|----------------------------------------------|
| **Thông dụng** | `text`, `password`, `email`, `tel`, `url` | Nhập văn bản cơ bản                          |
| **Lựa chọn**   | `radio`                                   | Chọn **1** trong nhiều (cần chung `name`)    |
|                | `checkbox`                                | Chọn **nhiều** tùy ý                         |
| **Hiện đại**   | `number`, `date`, `time`                  | Trình duyệt mobile tự đổi bàn phím theo type |

---

### 5.3. Dropdown, Textarea & File Upload

#### `<select>` – Dropdown

```html
<label for="city">Thành phố:</label>
<select id="city" name="city">
  <option value="">-- Chọn thành phố --</option>
  <option value="hcm">TP. Hồ Chí Minh</option>
  <option value="hn">Hà Nội</option>
  <option value="dn">Đà Nẵng</option>
</select>
```

Dùng `<optgroup>` để nhóm các option:

```html
<select name="language">
  <optgroup label="Front-end">
    <option value="html">HTML</option>
    <option value="css">CSS</option>
    <option value="js">JavaScript</option>
  </optgroup>
  <optgroup label="Back-end">
    <option value="python">Python</option>
    <option value="java">Java</option>
  </optgroup>
</select>
```

#### `<textarea>` – Ô nhập nhiều dòng

```html
<label for="message">Lời nhắn:</label>
<textarea id="message" name="message"
  rows="5" cols="40"
  placeholder="Nhập lời nhắn của bạn...">
</textarea>
```

#### File Upload

> ⚠️ **Bắt buộc** thêm `enctype="multipart/form-data"` vào `<form>` để gửi file.

```html
<form enctype="multipart/form-data">
  <input type="file" name="avatar" />
</form>
```

---

### 5.4. `<fieldset>` & `<legend>` – Gom nhóm dữ liệu

```html
<form>
  <fieldset>
    <legend>Thông tin cá nhân</legend>
    <label for="name">Họ tên:</label><br />
    <input type="text" id="name" name="name" /><br /><br />
    <label for="email">Email:</label><br />
    <input type="email" id="email" name="email" />
  </fieldset>

  <fieldset>
    <legend>Tài khoản</legend>
    <label for="user">Tên đăng nhập:</label><br />
    <input type="text" id="user" name="user" /><br /><br />
    <label for="pass">Mật khẩu:</label><br />
    <input type="password" id="pass" name="pass" />
  </fieldset>
</form>
```

---

### ⚠️ Ghi nhớ quan trọng

> Thuộc tính `name` là **bắt buộc** trên mọi input — không có `name` thì dữ liệu **sẽ bị bỏ qua** khi gửi form.
