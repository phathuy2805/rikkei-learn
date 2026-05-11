# Session 02: JavaScript Fundamentals and Flowchart

## Mục tiêu buổi học
- Hiểu Flowchart và cách biểu diễn thuật toán theo luồng.
- Nắm các khái niệm JavaScript nền tảng: biến, kiểu dữ liệu, toán tử.
- Phân biệt rõ `var`, `let`, `const`, `undefined`, `null`.
- Biết cách nhập và xuất dữ liệu cơ bản trên trình duyệt.

---

## 1. Flowchart là gì?
Flowchart (lưu đồ) là biểu đồ mô tả các bước xử lý của một quy trình, hệ thống hoặc thuật toán theo thứ tự logic.

### 1.1 Mục đích của Flowchart
- Giúp hình dung bài toán trước khi viết code.
- Dễ trao đổi với người khác (đồng đội, giảng viên, khách hàng).
- Dễ phát hiện thiếu bước hoặc sai logic.

### 1.2 Ký hiệu tiêu chuẩn
- Hình tròn/oval: Bắt đầu - Kết thúc.
- Hình bình hành: Nhập dữ liệu - Xuất dữ liệu.
- Hình chữ nhật: Xử lý/tính toán.
- Hình thoi: Rẽ nhánh điều kiện (Đúng/Sai).
- Mũi tên: Chỉ hướng luồng xử lý.

### 1.3 Quy trình I-P-O
- Input: Dữ liệu đầu vào.
- Process: Xử lý dữ liệu.
- Output: Kết quả đầu ra.

Mô hình tổng quát: `INPUT -> PROCESS -> OUTPUT`.

Ví dụ:
- Input: nhập điểm trung bình.
- Process: so sánh điểm với mốc đạt/trượt.
- Output: in ra "Đạt" hoặc "Trượt".

---

## 2. JavaScript là gì?
JavaScript là ngôn ngữ lập trình phổ biến trên web, chạy trực tiếp trong trình duyệt và cả môi trường máy chủ (như Node.js).

### 2.1 JavaScript dùng để làm gì?
- Tính toán, xử lý dữ liệu.
- Kiểm tra hợp lệ dữ liệu (validation).
- Cập nhật nội dung HTML (DOM).
- Thay đổi CSS động.
- Ẩn/hiện phần tử, xử lý tương tác người dùng.

### 2.2 Cách nhúng JavaScript
- Internal script (nhúng trực tiếp trong HTML): dùng được, nhưng khó quản lý khi dự án lớn.
- External script (tách file `.js` riêng): khuyến nghị, dễ bảo trì và tái sử dụng.

Best practice:
- Ưu tiên tách file JavaScript riêng.
- Đặt script cuối `body` hoặc dùng `defer` để tối ưu tải trang.

---

## 3. Biến trong JavaScript (Variable)
Biến là vùng nhớ có tên, dùng để lưu dữ liệu và có thể dùng lại trong chương trình.

### 3.1 Cú pháp khai báo biến
```js
let variableName = value;
```

Trong đó:
- `var`, `let`, `const`: từ khóa khai báo.
- `variableName`: tên biến.
- `value`: giá trị gán cho biến.

### 3.2 Quy tắc đặt tên biến
- Dùng camelCase: ví dụ `studentName`, `totalScore`.
- Không bắt đầu bằng số.
- Không dùng khoảng trắng và ký tự đặc biệt (trừ `_` và `$`).
- Không dùng từ khóa của JavaScript.
- Nên đặt tên có ý nghĩa theo ngữ cảnh.

### 3.3 Scope (phạm vi hoạt động)
- `var`: function scope (phạm vi hàm).
- `let`, `const`: block scope (phạm vi khối `{}` ).

```js
if (true) {
	var a = 10;
	let b = 20;
}

console.log(a); // 10
console.log(b); // ReferenceError
```

### 3.4 Hoisting
Hoisting là cơ chế JavaScript đưa phần khai báo lên đầu phạm vi trước khi chạy.

- `var`: được hoist và khởi tạo mặc định `undefined`.
- `let`, `const`: được hoist nhưng nằm trong Temporal Dead Zone (TDZ), truy cập trước khai báo sẽ lỗi.

```js
console.log(x); // undefined
var x = 5;

console.log(y); // ReferenceError
let y = 10;
```

### 3.5 Gán lại và khai báo lại
- `var`: cho phép gán lại, cho phép khai báo lại.
- `let`: cho phép gán lại, không cho khai báo lại trong cùng scope.
- `const`: không cho gán lại.

Lưu ý quan trọng với `const`:
- Không đổi được tham chiếu.
- Nhưng nếu giá trị là object/array thì vẫn đổi được thuộc tính/phần tử bên trong.

```js
const user = { name: "An" };
user.name = "Binh"; // hop le

// user = {} // loi
```

### 3.6 Bảng so sánh `var`, `let`, `const`
| Tiêu chí                | `var`                           | `let`               | `const`             |
|-------------------------|---------------------------------|---------------------|---------------------|
| Phạm vi                 | Function scope                  | Block scope         | Block scope         |
| Hoisting                | Có, giá trị ban đầu `undefined` | Có, nhưng trong TDZ | Có, nhưng trong TDZ |
| Gán lại giá trị         | Có                              | Có                  | Không               |
| Khai báo lại cùng scope | Có                              | Không               | Không               |

Khuyến nghị thực tế:
- Ưu tiên `const` mặc định.
- Dùng `let` khi chắc chắn cần thay đổi giá trị.
- Hạn chế dùng `var` trong code hiện đại.

---

## 4. Kiểu dữ liệu cơ bản (Data Types)

### 4.1 Các kiểu dữ liệu thường gặp
- `Number`: số nguyên và số thực.
- `String`: chuỗi ký tự.
- `Boolean`: giá trị đúng/sai (`true`/`false`).
- `Undefined`: biến đã khai báo nhưng chưa gán giá trị.
- `Null`: giá trị rỗng có chủ đích.

Ví dụ:
```js
let age = 20;           // Number
let name = "Minh";     // String
let isStudent = true;   // Boolean
let address;            // Undefined
let selectedItem = null; // Null
```

### 4.2 Phân biệt `undefined` và `null`
- `undefined`: hệ thống chưa có giá trị cho biến.
- `null`: lập trình viên chủ động gán "không có gì".

Ví dụ tư duy:
- `undefined`: bạn chưa điền dữ liệu.
- `null`: bạn xác nhận trường này không có dữ liệu.

---

## 5. Toán tử trong JavaScript (Operators)
Toán tử dùng để thao tác với dữ liệu và biểu thức.

### 5.1 Toán tử số học
- `+` cộng
- `-` trừ
- `*` nhân
- `/` chia
- `%` chia lấy dư

```js
let a = 10;
let b = 3;
console.log(a % b); // 1
```

### 5.2 Toán tử so sánh
- `==`: so sánh bằng (có ép kiểu)
- `!=`: so sánh khác (có ép kiểu)
- `===`: so sánh nghiêm ngặt (không ép kiểu)
- `!==`: so sánh khác nghiêm ngặt (không ép kiểu)
- `>`, `<`, `>=`, `<=`

Khuyến nghị:
- Ưu tiên `===` và `!==` để tránh lỗi do ép kiểu ngoài ý muốn.

```js
console.log(5 == "5");  // true
console.log(5 === "5"); // false
```

### 5.3 Toán tử logic
- `&&` (AND): đúng khi cả hai vế đều đúng
- `||` (OR): đúng khi có ít nhất một vế đúng
- `!` (NOT): đảo ngược giá trị logic

```js
let isAdult = true;
let hasTicket = false;

console.log(isAdult && hasTicket); // false
console.log(isAdult || hasTicket); // true
console.log(!isAdult); // false
```

---

## 6. Nhập và xuất dữ liệu cơ bản

### 6.1 Nhập dữ liệu
- `prompt()`: mở hộp thoại cho người dùng nhập văn bản.

```js
let userName = prompt("Nhap ten cua ban:");
```

### 6.2 Xác nhận
- `confirm()`: mở hộp thoại xác nhận, trả về `true` hoặc `false`.

```js
let agree = confirm("Ban co dong y khong?");
```

### 6.3 Xuất dữ liệu
- `console.log()`: in ra Console (DevTools), phù hợp debug.
- `alert()`: hiển thị thông báo popup trên trình duyệt.

```js
console.log("Xin chao");
alert("Hoan thanh!");
```

---

## 7. Tổng kết nhanh
- Flowchart giúp bạn thiết kế logic trước khi viết code.
- JavaScript là nền tảng cho tương tác web hiện đại.
- Nắm chắc `var`, `let`, `const`, scope, hoisting để tránh lỗi khó tìm.
- Dùng đúng kiểu dữ liệu và toán tử giúp code chính xác, dễ đọc.
- Bắt đầu với bài tập nhỏ: nhập dữ liệu, xử lý điều kiện, in kết quả.