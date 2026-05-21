# Session 05: JavaScript DOM Fundamentals & Form Validation

> Tài liệu ôn tập kiến thức về **DOM**, **DOM Event** và **xử lý Form Validation** bằng JavaScript.

---

## Mục tiêu buổi học

Sau bài này, bạn cần nắm được:

- DOM là gì và vì sao JavaScript có thể thay đổi giao diện web.
- Cách truy xuất phần tử HTML bằng `id`, `class`, `tag name` và CSS selector.
- Cách thay đổi nội dung, thuộc tính, style và class của phần tử.
- Cách duyệt cây DOM theo quan hệ cha, con, anh, em.
- Cách thêm và xóa phần tử khỏi DOM.
- Cách lắng nghe và xử lý sự kiện trên trang web.
- Cách kiểm soát hành vi mặc định của form bằng `preventDefault()`.
- Cách lấy dữ liệu từ form và kiểm tra dữ liệu nhập vào trước khi gửi.

---

## Mục lục

1. [Tổng quan về DOM](#1-tổng-quan-về-dom)
2. [Truy xuất phần tử trong DOM](#2-truy-xuất-phần-tử-trong-dom)
3. [Thao tác với nội dung phần tử](#3-thao-tác-với-nội-dung-phần-tử)
4. [Thao tác với Attribute](#4-thao-tác-với-attribute)
5. [Điều chỉnh Style và Class](#5-điều-chỉnh-style-và-class)
6. [DOM Traversal - Duyệt cây DOM](#6-dom-traversal---duyệt-cây-dom)
7. [Thêm và xóa phần tử khỏi DOM](#7-thêm-và-xóa-phần-tử-khỏi-dom)
8. [DOM Event](#8-dom-event)
9. [Các cách gắn sự kiện](#9-các-cách-gắn-sự-kiện)
10. [Form Event và preventDefault](#10-form-event-và-preventdefault)
11. [Trích xuất dữ liệu từ Form](#11-trích-xuất-dữ-liệu-từ-form)
12. [Event Flow và stopPropagation](#12-event-flow-và-stoppropagation)
13. [Form Validation](#13-form-validation)
14. [Ví dụ tổng hợp](#14-ví-dụ-tổng-hợp)
15. [Cheat Sheet ôn nhanh](#15-cheat-sheet-ôn-nhanh)
16. [Bài tập luyện tập](#16-bài-tập-luyện-tập)

---

# 1. Tổng quan về DOM

## 1.1. DOM là gì?

**DOM** là viết tắt của **Document Object Model**.

Hiểu đơn giản, DOM là mô hình biểu diễn tài liệu HTML dưới dạng các đối tượng mà JavaScript có thể đọc, thay đổi và tương tác.

Khi trình duyệt tải một file HTML, nó không chỉ hiển thị nội dung ra màn hình. Trình duyệt sẽ chuyển cấu trúc HTML thành một cây gồm nhiều **node**.

Ví dụ HTML:

```html
<body>
  <h1>Hello</h1>
  <p>Welcome to JavaScript DOM</p>
</body>
```

Có thể được hiểu thành cây DOM như sau:

```text
document
└── html
    └── body
        ├── h1
        │   └── "Hello"
        └── p
            └── "Welcome to JavaScript DOM"
```

## 1.2. Vì sao DOM quan trọng?

DOM là cầu nối giữa **HTML/CSS** và **JavaScript**.

Nhờ DOM, JavaScript có thể:

- Lấy nội dung của một phần tử HTML.
- Thay đổi chữ, hình ảnh, liên kết.
- Thay đổi màu sắc, kích thước, class CSS.
- Thêm hoặc xóa phần tử trên giao diện.
- Phản hồi lại hành động của người dùng như click, nhập liệu, submit form.

Ví dụ:

```html
<h1 id="title">Xin chào</h1>

<script>
  const title = document.getElementById("title");
  title.textContent = "Xin chào JavaScript DOM";
</script>
```

Kết quả: nội dung của thẻ `h1` được thay đổi bằng JavaScript.

---

# 2. Truy xuất phần tử trong DOM

Truy xuất phần tử nghĩa là dùng JavaScript để tìm một hoặc nhiều phần tử HTML trong trang.

## 2.1. Truy xuất bằng ID

Dùng `document.getElementById()` để lấy một phần tử có `id` cụ thể.

```html
<h1 id="main-title">DOM Lesson</h1>
```

```js
const title = document.getElementById("main-title");
console.log(title);
```

Đặc điểm:

- Trả về **một phần tử duy nhất**.
- Nếu không tìm thấy, trả về `null`.
- Phù hợp khi phần tử có `id` rõ ràng.

---

## 2.2. Truy xuất bằng class

Dùng `document.getElementsByClassName()` để lấy các phần tử có cùng class.

```html
<p class="item">Item 1</p>
<p class="item">Item 2</p>
<p class="item">Item 3</p>
```

```js
const items = document.getElementsByClassName("item");
console.log(items);
```

Đặc điểm:

- Trả về một danh sách dạng `HTMLCollection`.
- Có thể truy cập từng phần tử bằng chỉ số index.

```js
console.log(items[0]); // phần tử đầu tiên
```

---

## 2.3. Truy xuất bằng tag name

Dùng `document.getElementsByTagName()` để lấy các phần tử theo tên thẻ HTML.

```html
<p>Đoạn 1</p>
<p>Đoạn 2</p>
```

```js
const paragraphs = document.getElementsByTagName("p");
console.log(paragraphs);
```

Đặc điểm:

- Trả về danh sách các phần tử có cùng tên thẻ.
- Ít cụ thể hơn so với ID hoặc class.

---

## 2.4. Truy xuất bằng CSS Selector

CSS Selector là cách truy xuất hiện đại và linh hoạt hơn.

### `querySelector()`

Dùng để lấy **phần tử đầu tiên** khớp với selector.

```js
const firstItem = document.querySelector(".item");
const title = document.querySelector("#main-title");
const paragraph = document.querySelector("p");
```

### `querySelectorAll()`

Dùng để lấy **tất cả phần tử** khớp với selector.

```js
const allItems = document.querySelectorAll(".item");
console.log(allItems);
```

Đặc điểm:

- Trả về `NodeList`.
- Có thể dùng `forEach()` để lặp.

```js
allItems.forEach(function(item) {
  console.log(item.textContent);
});
```

## 2.5. So sánh nhanh các cách truy xuất

| Cách truy xuất | Trả về | Khi nào dùng? |
|---|---|---|
| `getElementById("id")` | 1 phần tử hoặc `null` | Khi phần tử có ID duy nhất |
| `getElementsByClassName("class")` | `HTMLCollection` | Khi muốn lấy nhiều phần tử theo class |
| `getElementsByTagName("tag")` | `HTMLCollection` | Khi muốn lấy phần tử theo tên thẻ |
| `querySelector("selector")` | Phần tử đầu tiên hoặc `null` | Khi muốn dùng cú pháp giống CSS |
| `querySelectorAll("selector")` | `NodeList` | Khi muốn lấy tất cả phần tử theo CSS selector |

---

# 3. Thao tác với nội dung phần tử

Sau khi truy xuất được phần tử, ta có thể đọc hoặc thay đổi nội dung bên trong phần tử đó.

Ba thuộc tính thường gặp:

- `innerText`
- `textContent`
- `innerHTML`

---

## 3.1. `innerText`

`innerText` lấy hoặc thay đổi phần chữ đang hiển thị cho người dùng nhìn thấy.

```html
<p id="message">Hello</p>
```

```js
const message = document.getElementById("message");
message.innerText = "Xin chào";
```

Đặc điểm:

- Chỉ lấy nội dung văn bản hiển thị.
- Không lấy nội dung bị ẩn bởi `display: none`.
- Có thể chậm hơn vì trình duyệt cần tính toán layout hiển thị.

---

## 3.2. `textContent`

`textContent` lấy hoặc thay đổi toàn bộ nội dung văn bản bên trong node và các node con.

```js
message.textContent = "Nội dung mới";
```

Đặc điểm:

- Lấy cả nội dung bị ẩn.
- Không render HTML.
- An toàn hơn `innerHTML` vì không thực thi thẻ HTML.
- Hiệu năng tốt.

Ví dụ:

```html
<div id="box">
  Hello <span style="display: none">Hidden text</span>
</div>
```

```js
const box = document.getElementById("box");
console.log(box.textContent);
```

Kết quả có thể bao gồm cả `Hidden text`.

---

## 3.3. `innerHTML`

`innerHTML` lấy hoặc thay đổi toàn bộ cấu trúc HTML bên trong phần tử.

```js
message.innerHTML = "<strong>Xin chào</strong>";
```

Kết quả: chữ “Xin chào” được in đậm vì trình duyệt render thẻ `<strong>`.

Đặc điểm:

- Có thể thêm HTML động.
- Trình duyệt sẽ render các thẻ HTML.
- Cần cẩn thận vì có nguy cơ bị tấn công **XSS** nếu đưa dữ liệu người dùng nhập trực tiếp vào `innerHTML`.

Ví dụ không nên làm:

```js
const userInput = "<img src=x onerror=alert('XSS')>";
box.innerHTML = userInput;
```

Cách an toàn hơn:

```js
box.textContent = userInput;
```

---

## 3.4. Bảng so sánh `innerText`, `textContent`, `innerHTML`

| Thuộc tính | Cú pháp | Chức năng | Đặc điểm |
|---|---|---|---|
| `innerText` | `el.innerText = "Hello";` | Lấy hoặc thay đổi nội dung văn bản hiển thị | Không lấy nội dung bị ẩn bởi `display: none`; có thể chậm hơn |
| `textContent` | `el.textContent = "Hello";` | Lấy hoặc thay đổi toàn bộ text trong node | Lấy cả chữ bị ẩn; hiệu năng tốt; an toàn vì không render HTML |
| `innerHTML` | `el.innerHTML = "<b>Hello</b>";` | Lấy hoặc thay đổi HTML bên trong phần tử | Render thẻ HTML; cần cẩn thận vì dễ gây XSS |

## 3.5. Nên dùng cái nào?

- Dùng `textContent` khi chỉ cần thay đổi chữ.
- Dùng `innerText` khi cần lấy đúng phần chữ đang hiển thị trên giao diện.
- Dùng `innerHTML` khi thật sự cần thêm cấu trúc HTML.

---

# 4. Thao tác với Attribute

**Attribute** là thuộc tính nằm trực tiếp trong thẻ HTML.

Ví dụ:

```html
<img src="avatar.png" alt="Avatar" id="avatar">
<a href="https://example.com" id="link">Website</a>
<input type="text" value="Nguyen Van A">
```

Các attribute trong ví dụ trên gồm: `src`, `alt`, `id`, `href`, `type`, `value`.

---

## 4.1. Lấy giá trị attribute

Dùng `getAttribute()`.

```js
const link = document.getElementById("link");
const hrefValue = link.getAttribute("href");

console.log(hrefValue);
```

---

## 4.2. Thêm hoặc thay đổi attribute

Dùng `setAttribute()`.

```js
link.setAttribute("href", "https://google.com");
link.setAttribute("target", "_blank");
```

Kết quả:

```html
<a href="https://google.com" target="_blank" id="link">Website</a>
```

---

## 4.3. Ví dụ đổi ảnh bằng JavaScript

```html
<img id="avatar" src="old-avatar.png" alt="Avatar cũ">
<button id="changeBtn">Đổi ảnh</button>
```

```js
const avatar = document.getElementById("avatar");
const changeBtn = document.getElementById("changeBtn");

changeBtn.addEventListener("click", function() {
  avatar.setAttribute("src", "new-avatar.png");
  avatar.setAttribute("alt", "Avatar mới");
});
```

---

# 5. Điều chỉnh Style và Class

Có hai cách phổ biến để thay đổi giao diện bằng JavaScript:

1. Thay đổi CSS inline bằng `.style`.
2. Thêm, xóa, bật/tắt class bằng `classList`.

---

## 5.1. Điều chỉnh CSS inline bằng `.style`

Cú pháp:

```js
element.style.cssProperty = "value";
```

Ví dụ:

```html
<p id="text">Nội dung cần đổi màu</p>
```

```js
const text = document.getElementById("text");

text.style.color = "red";
text.style.fontSize = "24px";
text.style.backgroundColor = "yellow";
```

Lưu ý:

- Tên CSS có dấu gạch ngang sẽ đổi sang dạng camelCase trong JavaScript.

| CSS | JavaScript |
|---|---|
| `background-color` | `backgroundColor` |
| `font-size` | `fontSize` |
| `border-radius` | `borderRadius` |
| `margin-top` | `marginTop` |

---

## 5.2. Quản lý class bằng `classList`

`classList` là cách hiện đại và dễ bảo trì hơn so với thay đổi nhiều style inline.

HTML:

```html
<div id="box" class="card">Box content</div>
```

CSS:

```css
.card {
  padding: 16px;
  border: 1px solid #ccc;
}

.active {
  background-color: lightgreen;
  color: darkgreen;
}

.hidden {
  display: none;
}
```

JavaScript:

```js
const box = document.getElementById("box");

box.classList.add("active");      // thêm class
box.classList.remove("card");     // xóa class
box.classList.toggle("hidden");   // có thì xóa, chưa có thì thêm
box.classList.contains("active"); // kiểm tra true/false
```

---

## 5.3. Các phương thức thường dùng của `classList`

| Phương thức | Ý nghĩa | Ví dụ |
|---|---|---|
| `.add("class")` | Thêm class mới | `box.classList.add("active")` |
| `.remove("class")` | Xóa class hiện có | `box.classList.remove("active")` |
| `.toggle("class")` | Có thì xóa, chưa có thì thêm | `box.classList.toggle("hidden")` |
| `.contains("class")` | Kiểm tra class có tồn tại không | `box.classList.contains("active")` |

## 5.4. Khi nào dùng `.style`, khi nào dùng `classList`?

Nên dùng `.style` khi:

- Chỉ thay đổi một vài thuộc tính đơn giản.
- Giá trị style được tính toán động bằng JavaScript.

Nên dùng `classList` khi:

- Giao diện có nhiều thuộc tính CSS.
- Muốn code dễ đọc, dễ bảo trì.
- Muốn tách riêng logic JavaScript và giao diện CSS.

Ví dụ nên dùng `classList`:

```js
button.addEventListener("click", function() {
  menu.classList.toggle("open");
});
```

---

# 6. DOM Traversal - Duyệt cây DOM

**DOM Traversal** là thao tác di chuyển qua lại giữa các phần tử trong cây DOM dựa trên quan hệ cha, con, anh, em.

Ưu điểm:

- Không cần gọi lại `querySelector()` nhiều lần.
- Hữu ích khi xử lý các phần tử nằm gần nhau trong cấu trúc HTML.

---

## 6.1. Duyệt node cha

Dùng `parentElement` để lấy phần tử cha.

```html
<ul id="list">
  <li class="item">Item 1</li>
</ul>
```

```js
const item = document.querySelector(".item");
const parent = item.parentElement;

console.log(parent); // ul#list
```

---

## 6.2. Duyệt node con

Các thuộc tính thường dùng:

```js
element.children;
element.firstElementChild;
element.lastElementChild;
```

Ví dụ:

```html
<ul id="menu">
  <li>Home</li>
  <li>About</li>
  <li>Contact</li>
</ul>
```

```js
const menu = document.getElementById("menu");

console.log(menu.children);           // danh sách các thẻ li
console.log(menu.firstElementChild);  // li đầu tiên
console.log(menu.lastElementChild);   // li cuối cùng
```

Lưu ý:

- `children` chỉ lấy các node là thẻ HTML.
- Không lấy text node như khoảng trắng hoặc xuống dòng.

---

## 6.3. Duyệt node anh em

Dùng để truy cập phần tử liền kề trong cùng một thẻ cha.

```js
element.nextElementSibling;
element.previousElementSibling;
```

Ví dụ:

```html
<ul>
  <li>Item 1</li>
  <li id="current">Item 2</li>
  <li>Item 3</li>
</ul>
```

```js
const current = document.getElementById("current");

console.log(current.previousElementSibling); // Item 1
console.log(current.nextElementSibling);     // Item 3
```

---

## 6.4. Tóm tắt DOM Traversal

| Quan hệ | Thuộc tính |
|---|---|
| Node cha | `element.parentElement` |
| Danh sách node con | `element.children` |
| Node con đầu tiên | `element.firstElementChild` |
| Node con cuối cùng | `element.lastElementChild` |
| Node anh em kế tiếp | `element.nextElementSibling` |
| Node anh em phía trước | `element.previousElementSibling` |

---

# 7. Thêm và xóa phần tử khỏi DOM

JavaScript có thể tạo phần tử mới, cấu hình nội dung/class/sự kiện, sau đó chèn vào trang web.

Quy trình gồm 3 bước:

1. **Create**: tạo phần tử mới trong bộ nhớ.
2. **Configure**: cấu hình nội dung, class, attribute hoặc sự kiện.
3. **Append**: chèn phần tử vào DOM để hiển thị.

---

## 7.1. Tạo phần tử mới

Dùng `document.createElement()`.

```js
const newItem = document.createElement("li");
```

Lúc này phần tử mới chỉ tồn tại trong bộ nhớ, chưa xuất hiện trên giao diện.

---

## 7.2. Cấu hình phần tử

```js
newItem.textContent = "Item mới";
newItem.classList.add("item");
```

Có thể thêm attribute:

```js
newItem.setAttribute("data-id", "1");
```

Có thể gắn sự kiện:

```js
newItem.addEventListener("click", function() {
  console.log("Bạn vừa click vào item mới");
});
```

---

## 7.3. Chèn phần tử vào DOM

Dùng `append()` hoặc `appendChild()`.

```html
<ul id="todoList"></ul>
```

```js
const todoList = document.getElementById("todoList");
const newItem = document.createElement("li");

newItem.textContent = "Học DOM";
todoList.append(newItem);
```

Kết quả:

```html
<ul id="todoList">
  <li>Học DOM</li>
</ul>
```

---

## 7.4. Xóa phần tử khỏi DOM

### Cách hiện đại: `remove()`

```js
newItem.remove();
```

### Cách cũ: `removeChild()`

```js
const parent = newItem.parentElement;
parent.removeChild(newItem);
```

Nên dùng `remove()` nếu không cần hỗ trợ trình duyệt quá cũ.

---

# 8. DOM Event

## 8.1. Event là gì?

**Event** là sự kiện xảy ra trong trình duyệt.

Ví dụ:

- Người dùng click chuột.
- Người dùng nhập dữ liệu vào ô input.
- Người dùng nhấn phím.
- Form được submit.
- Trang web tải xong.
- Người dùng cuộn trang.

JavaScript có thể lắng nghe các sự kiện này và thực thi code để phản hồi.

Ví dụ:

```html
<button id="btn">Click me</button>
```

```js
const btn = document.getElementById("btn");

btn.addEventListener("click", function() {
  alert("Bạn vừa click vào button");
});
```

---

## 8.2. Event Listener là gì?

**Event Listener** là cơ chế giúp JavaScript lắng nghe một sự kiện cụ thể trên một phần tử.

Cú pháp phổ biến:

```js
element.addEventListener("eventName", callbackFunction);
```

Ví dụ:

```js
button.addEventListener("click", function() {
  console.log("Button clicked");
});
```

Trong đó:

- `button`: phần tử cần lắng nghe sự kiện.
- `click`: tên sự kiện.
- `function() { ... }`: hàm sẽ chạy khi sự kiện xảy ra.

---

## 8.3. Event Object là gì?

Khi một sự kiện xảy ra, trình duyệt tự động tạo một đối tượng chứa thông tin chi tiết về sự kiện đó. Đối tượng này gọi là **Event Object**.

Hàm callback sẽ tự động nhận event object ở tham số đầu tiên.

Thường viết là `e` hoặc `event`.

```js
button.addEventListener("click", function(e) {
  console.log(e);
  console.log(e.target);
});
```

Một số thông tin thường dùng trong event object:

| Thuộc tính / phương thức | Ý nghĩa |
|---|---|
| `e.target` | Phần tử thật sự phát sinh sự kiện |
| `e.currentTarget` | Phần tử đang được gắn listener |
| `e.preventDefault()` | Chặn hành vi mặc định của trình duyệt |
| `e.stopPropagation()` | Ngăn sự kiện lan truyền lên phần tử cha |
| `e.key` | Phím được nhấn trong sự kiện bàn phím |

---

## 8.4. Các loại sự kiện phổ biến

| Nhóm sự kiện | Ví dụ | Ý nghĩa |
|---|---|---|
| Chuột | `click`, `dblclick`, `mouseover` | Nhấp, nhấp đôi, rê chuột |
| Bàn phím | `keydown`, `keyup`, `keypress` | Nhấn hoặc thả phím |
| Form | `submit`, `change` | Gửi biểu mẫu, thay đổi giá trị input/select |
| Nhập liệu | `input` | Người dùng nhập dữ liệu vào ô input |
| Tài liệu / Trình duyệt | `load`, `scroll`, `resize` | Trang tải xong, cuộn trang, thay đổi kích thước |

Lưu ý:

- `keydown`: xảy ra khi phím được nhấn xuống.
- `keyup`: xảy ra khi phím được thả ra.
- `input`: xảy ra ngay khi giá trị trong input thay đổi.
- `change`: thường xảy ra khi input thay đổi và mất focus, hoặc khi select/checkbox thay đổi.

---

# 9. Các cách gắn sự kiện

Có 3 cách phổ biến để gắn sự kiện trong JavaScript:

1. Inline Event.
2. Event Handler Properties.
3. `addEventListener()`.

---

## 9.1. Inline Event

Inline Event là cách gắn trực tiếp JavaScript vào thẻ HTML thông qua các thuộc tính bắt đầu bằng `on`.

Ví dụ:

```html
<button onclick="alert('Clicked')">Click me</button>
```

Ưu điểm:

- Viết nhanh.
- Dễ hiểu với ví dụ rất nhỏ.

Nhược điểm:

- Trộn lẫn HTML và JavaScript.
- Khó bảo trì khi dự án lớn.
- Không gắn được nhiều hành động độc lập cho cùng một sự kiện một cách rõ ràng.

Không khuyến khích dùng trong code thực tế.

---

## 9.2. Event Handler Properties

Đây là cách gán hàm xử lý trực tiếp vào thuộc tính sự kiện của DOM object.

```html
<button id="btn">Click me</button>
```

```js
const btn = document.getElementById("btn");

btn.onclick = function() {
  console.log("Clicked");
};
```

Ưu điểm:

- Tách JavaScript khỏi HTML.
- Dễ viết.

Nhược điểm:

- Chỉ gắn được một hàm cho một sự kiện.
- Nếu gán lại, hàm cũ sẽ bị ghi đè.

Ví dụ:

```js
btn.onclick = function() {
  console.log("Hành động 1");
};

btn.onclick = function() {
  console.log("Hành động 2");
};
```

Khi click, chỉ in ra:

```text
Hành động 2
```

---

## 9.3. `addEventListener()`

Đây là phương thức tiêu chuẩn và mạnh mẽ nhất để đăng ký sự kiện.

```js
btn.addEventListener("click", function() {
  console.log("Hành động 1");
});

btn.addEventListener("click", function() {
  console.log("Hành động 2");
});
```

Khi click, cả hai hàm đều được chạy.

Ưu điểm:

- Không ghi đè hàm cũ.
- Có thể gắn nhiều hàm cho cùng một sự kiện.
- Tách biệt HTML và JavaScript.
- Có thể gỡ sự kiện bằng `removeEventListener()`.

Ví dụ gỡ sự kiện:

```js
function handleClick() {
  console.log("Clicked");
}

btn.addEventListener("click", handleClick);
btn.removeEventListener("click", handleClick);
```

Lưu ý: muốn gỡ được sự kiện thì hàm callback nên là hàm có tên, không nên là anonymous function.

---

## 9.4. So sánh 3 phương pháp gắn sự kiện

| Cách gắn sự kiện | Ví dụ | Ưu điểm | Nhược điểm | Khuyến nghị |
|---|---|---|---|---|
| Inline Event | `<button onclick="...">` | Nhanh, dễ viết với demo nhỏ | Trộn HTML và JS, khó bảo trì | Hạn chế dùng |
| Event Handler Property | `btn.onclick = fn` | Tách JS khỏi HTML | Chỉ gắn được 1 hàm, dễ bị ghi đè | Có thể dùng cho ví dụ nhỏ |
| `addEventListener()` | `btn.addEventListener("click", fn)` | Mạnh mẽ, gắn được nhiều hàm, dễ bảo trì | Cú pháp dài hơn một chút | Nên dùng trong thực tế |

---

# 10. Form Event và preventDefault

## 10.1. Hành vi mặc định của form

Khi người dùng bấm nút `Submit` hoặc nhấn `Enter` trong form, trình duyệt sẽ thực hiện hành vi mặc định:

1. Thu thập dữ liệu trong form.
2. Gửi dữ liệu tới URL được khai báo trong `action`.
3. Tải lại trang hoặc chuyển trang.

Ví dụ:

```html
<form action="/login" method="post">
  <input type="text" name="username">
  <button type="submit">Đăng nhập</button>
</form>
```

Vấn đề:

- Trang bị reload.
- Mất trạng thái giao diện hiện tại.
- JavaScript chưa kịp kiểm tra lỗi nếu không chặn hành vi mặc định.

---

## 10.2. `preventDefault()` là gì?

`preventDefault()` là phương thức dùng để hủy hành vi mặc định của trình duyệt đối với một sự kiện.

Trong form, ta thường dùng `preventDefault()` để chặn việc reload trang.

```js
form.addEventListener("submit", function(e) {
  e.preventDefault();

  console.log("Form đã được submit nhưng trang không reload");
});
```

Ý nghĩa:

- Form vẫn bắt được sự kiện `submit`.
- Nhưng trình duyệt không tự động gửi form và không reload trang.
- Ta có thể kiểm tra dữ liệu trước khi quyết định gửi.

---

# 11. Trích xuất dữ liệu từ Form

## 11.1. Vai trò của thuộc tính `name`

Để lấy dữ liệu form dễ dàng, mỗi input nên có thuộc tính `name`.

```html
<form id="loginForm">
  <input type="text" name="username">
  <input type="password" name="password">
  <button type="submit">Login</button>
</form>
```

Có thể truy cập input qua object form:

```js
const form = document.getElementById("loginForm");

form.addEventListener("submit", function(e) {
  e.preventDefault();

  const username = form.username.value;
  const password = form.password.value;

  console.log(username);
  console.log(password);
});
```

Lưu ý:

- `form.username` hoạt động vì input có `name="username"`.
- Nếu thiếu `name`, việc lấy dữ liệu theo cách này sẽ khó hơn.

---

## 11.2. Lấy dữ liệu bằng `FormData`

`FormData` là cách tiện lợi để lấy dữ liệu từ form.

```js
const formData = new FormData(form);

const username = formData.get("username");
const password = formData.get("password");
```

Ví dụ đầy đủ:

```js
form.addEventListener("submit", function(e) {
  e.preventDefault();

  const formData = new FormData(form);
  const username = formData.get("username");
  const password = formData.get("password");

  console.log(username, password);
});
```

Ưu điểm của `FormData`:

- Dễ lấy dữ liệu theo `name`.
- Hữu ích khi form có nhiều trường.
- Có thể dùng để gửi dữ liệu qua `fetch()`.

---

# 12. Event Flow và stopPropagation

## 12.1. Event Flow là gì?

Sự kiện không chỉ xảy ra trên đúng một phần tử. Khi một phần tử được click, sự kiện có thể lan truyền qua cây DOM.

Ví dụ:

```html
<div id="parent">
  <button id="child">Click me</button>
</div>
```

Nếu click vào button, sự kiện có thể ảnh hưởng tới cả:

- `button`
- `div#parent`
- các phần tử cha phía trên

---

## 12.2. Event Bubbling

**Event Bubbling** là cơ chế sự kiện lan truyền từ phần tử con lên phần tử cha.

```js
const parent = document.getElementById("parent");
const child = document.getElementById("child");

parent.addEventListener("click", function() {
  console.log("Parent clicked");
});

child.addEventListener("click", function() {
  console.log("Child clicked");
});
```

Khi click vào `child`, kết quả có thể là:

```text
Child clicked
Parent clicked
```

Vì sự kiện click xảy ra ở button, sau đó nổi lên div cha.

---

## 12.3. `stopPropagation()` là gì?

`stopPropagation()` dùng để ngăn sự kiện tiếp tục lan truyền lên phần tử cha.

```js
child.addEventListener("click", function(e) {
  e.stopPropagation();
  console.log("Child clicked");
});
```

Lúc này, khi click vào `child`, chỉ in ra:

```text
Child clicked
```

`parent` không bị kích hoạt nữa.

---

# 13. Form Validation

## 13.1. Form Validation là gì?

**Form Validation** là quá trình kiểm tra dữ liệu người dùng nhập vào form trước khi chấp nhận hoặc gửi dữ liệu.

Ví dụ cần kiểm tra:

- Tên không được để trống.
- Email phải đúng định dạng.
- Mật khẩu phải đủ độ dài.
- Số điện thoại chỉ gồm chữ số.
- Xác nhận mật khẩu phải trùng với mật khẩu.

---

## 13.2. Vì sao cần Form Validation?

Form Validation giúp:

- Tránh dữ liệu rỗng hoặc sai định dạng.
- Cải thiện trải nghiệm người dùng.
- Hiển thị lỗi ngay trên giao diện.
- Giảm dữ liệu sai gửi lên server.

Lưu ý quan trọng:

> Validation ở phía client bằng JavaScript giúp trải nghiệm tốt hơn, nhưng không thay thế validation ở server. Dữ liệu gửi lên server vẫn phải được kiểm tra lại.

---

## 13.3. Quy trình validate form cơ bản

Khi form được submit:

1. Bắt sự kiện `submit`.
2. Gọi `e.preventDefault()` để chặn reload trang.
3. Lấy dữ liệu từ input.
4. Kiểm tra từng điều kiện.
5. Nếu có lỗi, hiển thị thông báo lỗi.
6. Nếu không có lỗi, xử lý dữ liệu hoặc gửi lên server.

Mẫu cơ bản:

```js
form.addEventListener("submit", function(e) {
  e.preventDefault();

  const username = form.username.value.trim();

  if (username === "") {
    console.log("Username không được để trống");
    return;
  }

  console.log("Dữ liệu hợp lệ");
});
```

---

## 13.4. Một số kỹ thuật validate thường dùng

### Kiểm tra rỗng

```js
if (username.trim() === "") {
  console.log("Tên không được để trống");
}
```

### Kiểm tra độ dài

```js
if (password.length < 6) {
  console.log("Mật khẩu phải có ít nhất 6 ký tự");
}
```

### Kiểm tra email đơn giản

```js
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (!emailPattern.test(email)) {
  console.log("Email không hợp lệ");
}
```

### Kiểm tra hai giá trị có trùng nhau không

```js
if (password !== confirmPassword) {
  console.log("Mật khẩu xác nhận không khớp");
}
```

---

## 13.5. Hiển thị lỗi trên giao diện

HTML:

```html
<div class="form-group">
  <label for="email">Email</label>
  <input type="text" id="email" name="email">
  <small class="error-message"></small>
</div>
```

JavaScript:

```js
const emailInput = document.getElementById("email");
const errorMessage = emailInput.nextElementSibling;

errorMessage.textContent = "Email không hợp lệ";
emailInput.classList.add("error");
```

CSS:

```css
.error {
  border-color: red;
}

.error-message {
  color: red;
  font-size: 14px;
}
```

---

# 14. Ví dụ tổng hợp

Ví dụ sau tổng hợp các kiến thức:

- Truy xuất DOM.
- Gắn sự kiện bằng `addEventListener()`.
- Chặn reload form bằng `preventDefault()`.
- Lấy dữ liệu form.
- Validate dữ liệu.
- Hiển thị lỗi.
- Thêm class bằng `classList`.

---

## 14.1. HTML

```html
<form id="registerForm">
  <div class="form-group">
    <label for="username">Tên người dùng</label>
    <input type="text" id="username" name="username">
    <small class="error-message"></small>
  </div>

  <div class="form-group">
    <label for="email">Email</label>
    <input type="text" id="email" name="email">
    <small class="error-message"></small>
  </div>

  <div class="form-group">
    <label for="password">Mật khẩu</label>
    <input type="password" id="password" name="password">
    <small class="error-message"></small>
  </div>

  <button type="submit">Đăng ký</button>
</form>
```

---

## 14.2. CSS

```css
.form-group {
  margin-bottom: 12px;
}

input {
  display: block;
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

input.error {
  border-color: red;
}

input.success {
  border-color: green;
}

.error-message {
  color: red;
  font-size: 13px;
}
```

---

## 14.3. JavaScript

```js
const form = document.getElementById("registerForm");

const usernameInput = document.getElementById("username");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

function showError(input, message) {
  const formGroup = input.parentElement;
  const errorMessage = formGroup.querySelector(".error-message");

  input.classList.remove("success");
  input.classList.add("error");
  errorMessage.textContent = message;
}

function showSuccess(input) {
  const formGroup = input.parentElement;
  const errorMessage = formGroup.querySelector(".error-message");

  input.classList.remove("error");
  input.classList.add("success");
  errorMessage.textContent = "";
}

function isValidEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

form.addEventListener("submit", function(e) {
  e.preventDefault();

  const username = usernameInput.value.trim();
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  let isValid = true;

  if (username === "") {
    showError(usernameInput, "Tên người dùng không được để trống");
    isValid = false;
  } else {
    showSuccess(usernameInput);
  }

  if (email === "") {
    showError(emailInput, "Email không được để trống");
    isValid = false;
  } else if (!isValidEmail(email)) {
    showError(emailInput, "Email không đúng định dạng");
    isValid = false;
  } else {
    showSuccess(emailInput);
  }

  if (password === "") {
    showError(passwordInput, "Mật khẩu không được để trống");
    isValid = false;
  } else if (password.length < 6) {
    showError(passwordInput, "Mật khẩu phải có ít nhất 6 ký tự");
    isValid = false;
  } else {
    showSuccess(passwordInput);
  }

  if (isValid) {
    alert("Đăng ký thành công");
    form.reset();
  }
});
```

---

## 14.4. Giải thích luồng chạy

Khi người dùng bấm nút **Đăng ký**:

1. Form phát sinh sự kiện `submit`.
2. JavaScript gọi `e.preventDefault()` để chặn reload trang.
3. Lấy giá trị từ các input.
4. Dùng `trim()` để loại bỏ khoảng trắng thừa ở đầu và cuối.
5. Kiểm tra từng trường dữ liệu.
6. Nếu lỗi:
   - Thêm class `error`.
   - Hiển thị thông báo lỗi trong thẻ `small`.
7. Nếu hợp lệ:
   - Thêm class `success`.
   - Xóa thông báo lỗi.
8. Nếu toàn bộ form hợp lệ:
   - Thông báo đăng ký thành công.
   - Reset form.

---

# 15. Cheat Sheet ôn nhanh

## 15.1. Truy xuất DOM

```js
document.getElementById("id");
document.getElementsByClassName("class");
document.getElementsByTagName("tag");
document.querySelector("selector");
document.querySelectorAll("selector");
```

## 15.2. Nội dung

```js
el.innerText = "Text hiển thị";
el.textContent = "Text an toàn";
el.innerHTML = "<strong>HTML</strong>";
```

## 15.3. Attribute

```js
el.getAttribute("href");
el.setAttribute("href", "https://example.com");
```

## 15.4. Style

```js
el.style.color = "red";
el.style.fontSize = "20px";
el.style.backgroundColor = "yellow";
```

## 15.5. Class

```js
el.classList.add("active");
el.classList.remove("active");
el.classList.toggle("hidden");
el.classList.contains("active");
```

## 15.6. DOM Traversal

```js
el.parentElement;
el.children;
el.firstElementChild;
el.lastElementChild;
el.nextElementSibling;
el.previousElementSibling;
```

## 15.7. Tạo, thêm, xóa phần tử

```js
const item = document.createElement("li");
item.textContent = "Item mới";
list.append(item);
item.remove();
```

## 15.8. Event

```js
el.addEventListener("click", function(e) {
  console.log(e.target);
});
```

## 15.9. Form submit

```js
form.addEventListener("submit", function(e) {
  e.preventDefault();
  const username = form.username.value.trim();
});
```

## 15.10. Chặn sự kiện lan truyền

```js
child.addEventListener("click", function(e) {
  e.stopPropagation();
});
```

---

# 16. Bài tập luyện tập

## Bài 1: Đổi nội dung bằng DOM

Yêu cầu:

- Tạo một thẻ `h1` có nội dung ban đầu là `Hello`.
- Tạo một button `Đổi nội dung`.
- Khi click button, đổi nội dung `h1` thành `Xin chào DOM`.

Gợi ý:

```js
const title = document.getElementById("title");
const btn = document.getElementById("btn");

btn.addEventListener("click", function() {
  title.textContent = "Xin chào DOM";
});
```

---

## Bài 2: Bật/tắt class

Yêu cầu:

- Tạo một hộp `div`.
- Tạo class `.active` trong CSS.
- Khi click button, dùng `classList.toggle()` để bật/tắt giao diện active.

---

## Bài 3: Thêm item vào danh sách

Yêu cầu:

- Tạo một input để nhập tên công việc.
- Tạo button `Thêm`.
- Khi click button:
  - Lấy giá trị input.
  - Tạo thẻ `li` mới.
  - Gán nội dung cho `li`.
  - Thêm `li` vào `ul`.

---

## Bài 4: Xóa item khỏi danh sách

Yêu cầu:

- Mỗi item trong danh sách có một nút `Xóa`.
- Khi click nút `Xóa`, xóa item tương ứng khỏi DOM.

Gợi ý:

```js
deleteBtn.addEventListener("click", function() {
  li.remove();
});
```

---

## Bài 5: Validate form đăng ký

Yêu cầu:

Tạo form gồm:

- Username.
- Email.
- Password.

Điều kiện:

- Username không được để trống.
- Email không được để trống và phải đúng định dạng.
- Password không được để trống và phải có ít nhất 6 ký tự.
- Nếu lỗi, hiển thị thông báo dưới input.
- Nếu hợp lệ, thông báo `Đăng ký thành công`.

---

# Tổng kết

Trong session này, bạn cần nhớ 3 nhóm kiến thức chính:

## 1. DOM Manipulation

DOM cho phép JavaScript đọc và thay đổi HTML/CSS trên trang.

Các thao tác quan trọng:

- Truy xuất phần tử.
- Đổi nội dung.
- Đổi attribute.
- Đổi style/class.
- Duyệt cây DOM.
- Thêm/xóa phần tử.

## 2. DOM Event

Event giúp trang web phản hồi hành động của người dùng.

Cần nhớ:

- Nên dùng `addEventListener()`.
- Callback có thể nhận event object `e`.
- `e.target` cho biết phần tử phát sinh sự kiện.
- `e.preventDefault()` chặn hành vi mặc định.
- `e.stopPropagation()` chặn sự kiện lan lên cha.

## 3. Form Validation

Form validation giúp kiểm tra dữ liệu trước khi gửi.

Quy trình cơ bản:

```text
submit form
→ preventDefault()
→ lấy dữ liệu
→ kiểm tra dữ liệu
→ hiển thị lỗi hoặc xử lý thành công
```

---

## Ghi nhớ nhanh

> Khi làm việc với DOM, hãy nghĩ theo thứ tự: **Tìm phần tử → Thay đổi phần tử → Gắn sự kiện → Xử lý logic**.

