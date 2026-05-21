# Session 03: Conditions & Loops

> Mục tiêu: Ôn lại cách dùng **cấu trúc điều kiện** và **vòng lặp** trong lập trình, đặc biệt với JavaScript.

---

## 1. Cấu trúc điều kiện — Conditional Statements

### 1.1. Cấu trúc điều kiện là gì?

**Câu lệnh điều kiện** cho phép chương trình thực hiện các hành động khác nhau tùy theo điều kiện đúng hoặc sai.

Nói đơn giản:

- Nếu điều kiện **đúng** → chạy một đoạn code.
- Nếu điều kiện **sai** → chạy đoạn code khác hoặc bỏ qua.

Ví dụ thực tế:

```js
let age = 18;

if (age >= 18) {
  console.log("Bạn đủ tuổi.");
} else {
  console.log("Bạn chưa đủ tuổi.");
}
```

Ở ví dụ trên:

- `age >= 18` là điều kiện.
- Nếu `age` lớn hơn hoặc bằng `18`, chương trình in ra `"Bạn đủ tuổi."`.
- Ngược lại, chương trình in ra `"Bạn chưa đủ tuổi."`.

---

## 1.2. Cú pháp `if...else`

### Cú pháp chung

```js
if (condition) {
  // Mã được thực thi khi điều kiện đúng
} else {
  // Mã được thực thi khi điều kiện sai
}
```

### Giải thích

| Thành phần  | Ý nghĩa                                                    |
|-------------|------------------------------------------------------------|
| `if`        | Bắt đầu một điều kiện                                      |
| `condition` | Biểu thức điều kiện, kết quả thường là `true` hoặc `false` |
| `{ }`       | Chứa khối code cần chạy                                    |
| `else`      | Chạy khi điều kiện trong `if` sai                          |

### Ví dụ

```js
let score = 7;

if (score >= 5) {
  console.log("Đậu");
} else {
  console.log("Rớt");
}
```

Kết quả:

```txt
Đậu
```

Vì `score = 7`, điều kiện `score >= 5` là đúng.

---

## 1.3. Câu lệnh `if...else if...else`

Khi có nhiều điều kiện cần kiểm tra, ta dùng `else if`.

### Cú pháp

```js
if (condition1) {
  // Chạy khi condition1 đúng
} else if (condition2) {
  // Chạy khi condition1 sai và condition2 đúng
} else {
  // Chạy khi tất cả điều kiện phía trên đều sai
}
```

### Ví dụ: Xếp loại điểm

```js
let score = 8;

if (score >= 9) {
  console.log("Xuất sắc");
} else if (score >= 8) {
  console.log("Giỏi");
} else if (score >= 6.5) {
  console.log("Khá");
} else if (score >= 5) {
  console.log("Trung bình");
} else {
  console.log("Yếu");
}
```

Kết quả:

```txt
Giỏi
```

### Cách chương trình kiểm tra

Với `score = 8`:

1. Kiểm tra `score >= 9` → sai.
2. Kiểm tra `score >= 8` → đúng.
3. Chạy `console.log("Giỏi")`.
4. Bỏ qua các nhánh còn lại.

> Lưu ý: Khi một điều kiện đúng, các phần `else if` và `else` phía sau sẽ không chạy nữa.

---

## 1.4. Điều kiện lồng nhau — Nested Conditions

Điều kiện lồng nhau là việc đặt một câu lệnh `if` bên trong một câu lệnh `if` khác.

### Ví dụ

```js
let age = 20;
let hasTicket = true;

if (age >= 18) {
  if (hasTicket) {
    console.log("Được vào rạp.");
  } else {
    console.log("Bạn cần mua vé.");
  }
} else {
  console.log("Bạn chưa đủ tuổi.");
}
```

### Vấn đề của lồng nhau quá sâu

Nếu code bị lồng quá nhiều tầng, chương trình sẽ khó đọc và khó bảo trì.

Ví dụ không nên viết:

```js
if (user) {
  if (user.isActive) {
    if (user.hasPermission) {
      console.log("Cho phép truy cập");
    }
  }
}
```

Code trên có nhiều tầng lồng nhau, làm giảm **readability** — khả năng đọc hiểu code.

---

## 1.5. Áp dụng clean code khi viết điều kiện

### Cách 1: Gộp điều kiện

Thay vì viết:

```js
if (user) {
  if (user.isActive) {
    if (user.hasPermission) {
      console.log("Cho phép truy cập");
    }
  }
}
```

Có thể viết gọn hơn:

```js
if (user && user.isActive && user.hasPermission) {
  console.log("Cho phép truy cập");
}
```

---

### Cách 2: Dùng return sớm — Guard Clause

Ví dụ:

```js
function canAccess(user) {
  if (!user) {
    return false;
  }

  if (!user.isActive) {
    return false;
  }

  if (!user.hasPermission) {
    return false;
  }

  return true;
}
```

Cách này giúp tránh code bị lồng quá sâu.

---

## 1.6. Cấu trúc `switch...case`

`switch...case` dùng để chọn một hoặc nhiều khối code để thực thi dựa trên giá trị của một biểu thức.

Thường dùng khi cần so sánh **một biến với nhiều giá trị cụ thể**.

### Cú pháp

```js
switch (expression) {
  case value1:
    // Code chạy khi expression === value1
    break;

  case value2:
    // Code chạy khi expression === value2
    break;

  default:
    // Code chạy khi không có case nào khớp
}
```

### Giải thích

| Thành phần           | Ý nghĩa                                        |
|----------------------|------------------------------------------------|
| `switch(expression)` | Giá trị cần đem đi so sánh                     |
| `case`               | Một trường hợp cụ thể                          |
| `break`              | Thoát khỏi `switch` sau khi chạy xong một case |
| `default`            | Chạy khi không có case nào khớp                |

---

### Ví dụ

```js
let day = 2;

switch (day) {
  case 1:
    console.log("Thứ hai");
    break;

  case 2:
    console.log("Thứ ba");
    break;

  case 3:
    console.log("Thứ tư");
    break;

  default:
    console.log("Không hợp lệ");
}
```

Kết quả:

```txt
Thứ ba
```

Vì `day = 2`, chương trình chạy vào `case 2`.

---

## 1.7. Lưu ý quan trọng về `break`

Nếu quên `break`, chương trình có thể chạy tiếp sang các `case` bên dưới.

Ví dụ:

```js
let day = 2;

switch (day) {
  case 1:
    console.log("Thứ hai");

  case 2:
    console.log("Thứ ba");

  case 3:
    console.log("Thứ tư");

  default:
    console.log("Không hợp lệ");
}
```

Kết quả:

```txt
Thứ ba
Thứ tư
Không hợp lệ
```

Lý do: Vì không có `break`, chương trình bị rơi tiếp xuống các case phía dưới. Hiện tượng này gọi là **fall-through**.

---

## 1.8. Khi nào dùng `switch`, khi nào dùng `if...else`?

| Tiêu chí      | `switch`                                   | `if...else`                                               |
|---------------|--------------------------------------------|-----------------------------------------------------------|
| Loại logic    | So sánh với các giá trị cụ thể             | Biểu thức phức tạp                                        |
| Cú pháp       | Gọn gàng khi có nhiều case                 | Linh hoạt hơn                                             |
| Cách dùng     | Khi có nhiều trường hợp rõ ràng            | Khi cần so sánh lớn hơn, nhỏ hơn, kết hợp nhiều điều kiện |
| Ví dụ phù hợp | Menu, ngày trong tuần, trạng thái đơn hàng | Kiểm tra điểm số, tuổi, nhiều điều kiện logic             |

### Ví dụ nên dùng `switch`

```js
let role = "admin";

switch (role) {
  case "admin":
    console.log("Toàn quyền");
    break;

  case "editor":
    console.log("Có quyền chỉnh sửa");
    break;

  case "viewer":
    console.log("Chỉ được xem");
    break;

  default:
    console.log("Vai trò không hợp lệ");
}
```

### Ví dụ nên dùng `if...else`

```js
let score = 8.5;

if (score >= 9) {
  console.log("Xuất sắc");
} else if (score >= 8) {
  console.log("Giỏi");
} else if (score >= 5) {
  console.log("Đậu");
} else {
  console.log("Rớt");
}
```

Ở ví dụ này nên dùng `if...else` vì có các điều kiện so sánh như `>=`.

---

# 2. Vòng lặp — Loops

## 2.1. Vòng lặp là gì?

**Vòng lặp** dùng để chạy đi chạy lại cùng một đoạn code nhiều lần.

Vòng lặp rất hữu ích khi:

- Muốn in các số từ 1 đến 10.
- Muốn duyệt qua từng phần tử trong mảng.
- Muốn lặp cho đến khi người dùng nhập đúng dữ liệu.
- Muốn thực hiện một tác vụ nhiều lần với giá trị khác nhau.

Ví dụ:

```js
for (let i = 1; i <= 5; i++) {
  console.log(i);
}
```

Kết quả:

```txt
1
2
3
4
5
```

---

## 2.2. Tư duy hoạt động của vòng lặp

Ví dụ muốn in số từ `1` đến `10`:

```js
let i = 1;

while (i <= 10) {
  console.log(i);
  i = i + 1;
}
```

### Luồng chạy

1. Bắt đầu với `i = 1`.
2. Kiểm tra `i <= 10`.
3. Nếu đúng, chạy `console.log(i)`.
4. Tăng `i` lên 1.
5. Quay lại kiểm tra điều kiện.
6. Khi `i = 11`, điều kiện `i <= 10` sai.
7. Kết thúc vòng lặp.

---

# 3. Vòng lặp `for`

## 3.1. Cú pháp

```js
for (initialization; condition; updation) {
  // Khối mã được thực thi
}
```

### Giải thích

| Thành phần       | Ý nghĩa                                      |
|------------------|----------------------------------------------|
| `initialization` | Khởi tạo biến đếm, chỉ chạy một lần đầu tiên |
| `condition`      | Điều kiện để vòng lặp tiếp tục chạy          |
| `updation`       | Cập nhật giá trị sau mỗi lần lặp             |
| `{ }`            | Thân vòng lặp                                |

---

## 3.2. Ví dụ

```js
for (let i = 1; i <= 5; i++) {
  console.log(i);
}
```

### Thứ tự thực thi

```txt
Bước 1: let i = 1
Bước 2: Kiểm tra i <= 5
Bước 3: Chạy console.log(i)
Bước 4: Chạy i++
Bước 5: Quay lại bước 2
```

### Chi tiết từng vòng

| Lần lặp | Giá trị `i` | Điều kiện `i <= 5` | Kết quả       |
|---------|------------:|--------------------|---------------|
| 1       |           1 | Đúng               | In ra 1       |
| 2       |           2 | Đúng               | In ra 2       |
| 3       |           3 | Đúng               | In ra 3       |
| 4       |           4 | Đúng               | In ra 4       |
| 5       |           5 | Đúng               | In ra 5       |
| 6       |           6 | Sai                | Dừng vòng lặp |

---

## 3.3. Khi nào dùng `for`?

Dùng `for` khi biết trước số lần lặp.

Ví dụ:

```js
for (let i = 0; i < 10; i++) {
  console.log("Hello");
}
```

Đoạn code trên chạy đúng 10 lần.

---

# 4. Vòng lặp `while`

## 4.1. Cú pháp

```js
while (condition) {
  // Khối mã được thực thi
}
```

Vòng lặp `while` sẽ chạy miễn là điều kiện còn đúng.

---

## 4.2. Ví dụ

```js
let i = 1;

while (i <= 5) {
  console.log(i);
  i++;
}
```

Kết quả:

```txt
1
2
3
4
5
```

---

## 4.3. Khi nào dùng `while`?

Dùng `while` khi chưa biết chính xác số lần lặp, chỉ biết điều kiện để dừng.

Ví dụ:

```js
let password = "";

while (password !== "123456") {
  password = prompt("Nhập mật khẩu:");
}
```

Vòng lặp chỉ dừng khi người dùng nhập đúng mật khẩu `"123456"`.

---

# 5. Vòng lặp `do...while`

## 5.1. Cú pháp

```js
do {
  // Khối mã được thực thi
} while (condition);
```

Khác với `while`, vòng lặp `do...while` luôn chạy thân vòng lặp ít nhất một lần trước khi kiểm tra điều kiện.

---

## 5.2. Ví dụ

```js
let i = 1;

do {
  console.log(i);
  i++;
} while (i <= 5);
```

Kết quả:

```txt
1
2
3
4
5
```

---

## 5.3. Điểm đặc biệt của `do...while`

Ví dụ:

```js
let i = 10;

do {
  console.log(i);
  i++;
} while (i <= 5);
```

Kết quả:

```txt
10
```

Dù điều kiện `i <= 5` sai, code vẫn chạy một lần vì `do...while` kiểm tra điều kiện sau.

---

# 6. So sánh `for`, `while` và `do...while`

| Đặc điểm              | `for`                                 | `while`                                 | `do...while`                                   |
|-----------------------|---------------------------------------|-----------------------------------------|------------------------------------------------|
| Số lần lặp            | Thường dùng khi biết trước số lần lặp | Thường dùng khi chưa biết rõ số lần lặp | Tương tự `while`, nhưng cần chạy ít nhất 1 lần |
| Kiểm tra điều kiện    | Trước khi chạy thân vòng lặp          | Trước khi chạy thân vòng lặp            | Sau khi chạy thân vòng lặp                     |
| Số lần chạy tối thiểu | 0 lần                                 | 0 lần                                   | Ít nhất 1 lần                                  |
| Cấu trúc              | Gọn khi có biến đếm                   | Phù hợp với điều kiện linh hoạt         | Phù hợp khi cần chạy trước rồi mới kiểm tra    |

---

# 7. Từ khóa `break`

## 7.1. `break` là gì?

`break` dùng để kết thúc vòng lặp ngay lập tức.

Khi gặp `break`, chương trình thoát hoàn toàn khỏi vòng lặp hiện tại.

---

## 7.2. Ví dụ

```js
for (let i = 1; i <= 10; i++) {
  if (i === 5) {
    break;
  }

  console.log(i);
}
```

Kết quả:

```txt
1
2
3
4
```

Khi `i === 5`, chương trình gặp `break` và dừng vòng lặp.

---

## 7.3. Khi nào dùng `break`?

Dùng `break` khi:

- Đã tìm được kết quả cần tìm.
- Muốn dừng vòng lặp sớm.
- Không cần chạy tiếp các lần lặp còn lại.

Ví dụ tìm số đầu tiên chia hết cho 7:

```js
for (let i = 1; i <= 100; i++) {
  if (i % 7 === 0) {
    console.log("Số đầu tiên chia hết cho 7 là:", i);
    break;
  }
}
```

---

# 8. Từ khóa `continue`

## 8.1. `continue` là gì?

`continue` dùng để bỏ qua lần lặp hiện tại và chuyển sang lần lặp tiếp theo.

Khác với `break`:

- `break` dừng hẳn vòng lặp.
- `continue` chỉ bỏ qua vòng hiện tại, vòng lặp vẫn tiếp tục.

---

## 8.2. Ví dụ

```js
for (let i = 1; i <= 5; i++) {
  if (i === 3) {
    continue;
  }

  console.log(i);
}
```

Kết quả:

```txt
1
2
4
5
```

Khi `i === 3`, chương trình gặp `continue`, bỏ qua `console.log(i)` và chuyển sang lần lặp tiếp theo.

---

## 8.3. Ví dụ thực tế: In số lẻ

```js
for (let i = 1; i <= 10; i++) {
  if (i % 2 === 0) {
    continue;
  }

  console.log(i);
}
```

Kết quả:

```txt
1
3
5
7
9
```

Nếu `i` là số chẵn, chương trình bỏ qua lần lặp đó.

---

# 9. Vòng lặp vô hạn — Infinite Loop

## 9.1. Vòng lặp vô hạn là gì?

Vòng lặp vô hạn xảy ra khi điều kiện lặp luôn đúng và không bao giờ dừng.

Điều này có thể gây:

- Treo trình duyệt.
- Treo ứng dụng.
- Tốn CPU và bộ nhớ.
- Làm chương trình không phản hồi.

---

## 9.2. Ví dụ vòng lặp vô hạn

```js
let i = 1;

while (i <= 10) {
  console.log(i);
}
```

Lỗi ở đây là thiếu bước cập nhật `i`.

Vì `i` luôn bằng `1`, điều kiện `i <= 10` luôn đúng.

---

## 9.3. Cách sửa

```js
let i = 1;

while (i <= 10) {
  console.log(i);
  i++;
}
```

Bây giờ sau mỗi lần lặp, `i` tăng lên 1. Khi `i = 11`, điều kiện sai và vòng lặp dừng.

---

## 9.4. Một số nguyên nhân gây vòng lặp vô hạn

| Nguyên nhân                           | Ví dụ                              |
|---------------------------------------|------------------------------------|
| Quên cập nhật biến đếm                | Quên `i++`                         |
| Điều kiện luôn đúng                   | `while (true)` mà không có `break` |
| Cập nhật sai hướng                    | Muốn `i` tăng nhưng lại viết `i--` |
| Điều kiện dừng không bao giờ đạt được | Logic sai trong điều kiện          |

---

# 10. Tổng kết nhanh

## Cấu trúc điều kiện

| Cấu trúc              | Dùng khi nào                                    |
|-----------------------|-------------------------------------------------|
| `if`                  | Chỉ cần kiểm tra một điều kiện                  |
| `if...else`           | Có hai hướng xử lý: đúng hoặc sai               |
| `if...else if...else` | Có nhiều điều kiện khác nhau                    |
| `switch...case`       | So sánh một giá trị với nhiều trường hợp cụ thể |

---

## Vòng lặp

| Vòng lặp     | Dùng khi nào                                         |
|--------------|------------------------------------------------------|
| `for`        | Biết trước số lần lặp                                |
| `while`      | Chưa biết số lần lặp, kiểm tra điều kiện trước       |
| `do...while` | Muốn chạy ít nhất một lần rồi mới kiểm tra điều kiện |

---

## `break` và `continue`

| Từ khóa    | Ý nghĩa                                     |
|------------|---------------------------------------------|
| `break`    | Dừng hẳn vòng lặp                           |
| `continue` | Bỏ qua lần lặp hiện tại, sang lần tiếp theo |

---

# 11. Bài tập tự luyện

## Bài 1

Viết chương trình kiểm tra một số là số chẵn hay số lẻ.

Gợi ý:

```js
let n = 7;

if (n % 2 === 0) {
  console.log("Số chẵn");
} else {
  console.log("Số lẻ");
}
```

---

## Bài 2

Viết chương trình xếp loại học sinh theo điểm:

| Điểm     | Xếp loại   |
|----------|------------|
| `>= 9`   | Xuất sắc   |
| `>= 8`   | Giỏi       |
| `>= 6.5` | Khá        |
| `>= 5`   | Trung bình |
| `< 5`    | Yếu        |

---

## Bài 3

Dùng vòng lặp `for` để in các số từ 1 đến 100.

---

## Bài 4

Dùng vòng lặp để tính tổng các số từ 1 đến 100.

Gợi ý:

```js
let sum = 0;

for (let i = 1; i <= 100; i++) {
  sum = sum + i;
}

console.log(sum);
```

---

## Bài 5

In ra các số lẻ từ 1 đến 20.

Gợi ý:

```js
for (let i = 1; i <= 20; i++) {
  if (i % 2 === 0) {
    continue;
  }

  console.log(i);
}
```

---

# 12. Ghi nhớ quan trọng

- Điều kiện dùng để quyết định chương trình chạy theo hướng nào.
- `if...else` phù hợp với logic so sánh linh hoạt.
- `switch...case` phù hợp khi có nhiều giá trị cụ thể.
- Vòng lặp giúp lặp lại một đoạn code nhiều lần.
- `for` thường dùng khi biết trước số lần lặp.
- `while` thường dùng khi chưa biết trước số lần lặp.
- `do...while` luôn chạy ít nhất một lần.
- `break` dùng để dừng vòng lặp.
- `continue` dùng để bỏ qua lần lặp hiện tại.
- Luôn đảm bảo vòng lặp có điều kiện dừng để tránh vòng lặp vô hạn.
