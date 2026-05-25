# Session 04: JavaScript Arrays & Functions

> Mục tiêu: Ôn tập lại kiến thức nền tảng về **Array** và **Function** trong JavaScript, bao gồm cách lưu trữ dữ liệu bằng mảng, thao tác với mảng, sử dụng các array methods phổ biến và viết hàm để tái sử dụng logic trong chương trình.

---

## Mục lục

1. [Array là gì?](#1-array-là-gì)
2. [Các khái niệm quan trọng trong Array](#2-các-khái-niệm-quan-trọng-trong-array)
3. [Truy vấn và duyệt mảng](#3-truy-vấn-và-duyệt-mảng)
4. [Thêm phần tử vào mảng](#4-thêm-phần-tử-vào-mảng)
5. [Cập nhật phần tử trong mảng](#5-cập-nhật-phần-tử-trong-mảng)
6. [Tìm kiếm phần tử trong mảng](#6-tìm-kiếm-phần-tử-trong-mảng)
7. [Xóa phần tử khỏi mảng](#7-xóa-phần-tử-khỏi-mảng)
8. [Một số phương thức Array cơ bản khác](#8-một-số-phương-thức-array-cơ-bản-khác)
9. [Các Array Method quan trọng](#9-các-array-method-quan-trọng)
10. [Function là gì?](#10-function-là-gì)
11. [Parameter và Argument](#11-parameter-và-argument)
12. [Từ khóa return](#12-từ-khóa-return)
13. [Các loại Function trong JavaScript](#13-các-loại-function-trong-javascript)
14. [So sánh nhanh Function Declaration, Expression và Arrow Function](#14-so-sánh-nhanh-function-declaration-expression-và-arrow-function)
15. [Tổng kết kiến thức cần nhớ](#15-tổng-kết-kiến-thức-cần-nhớ)
16. [Bài tập tự luyện](#16-bài-tập-tự-luyện)

---

# 1. Array là gì?

**Array**, hay còn gọi là **mảng**, là một loại đối tượng trong JavaScript được dùng để lưu trữ nhiều giá trị trong cùng một biến.

Thay vì tạo nhiều biến riêng lẻ như:

```javascript
let student1 = "An";
let student2 = "Bình";
let student3 = "Chi";
```

Ta có thể dùng một mảng:

```javascript
let students = ["An", "Bình", "Chi"];
```

Mảng giúp dữ liệu được tổ chức gọn gàng, dễ truy xuất, dễ duyệt và dễ xử lý hơn.

---

# 2. Các khái niệm quan trọng trong Array

## 2.1. Element là gì?

**Element** là phần tử trong mảng, tức là từng giá trị được lưu trữ bên trong mảng.

Ví dụ:

```javascript
let numbers = [10, 20, 30];
```

Trong mảng trên:

- `10` là phần tử thứ nhất
- `20` là phần tử thứ hai
- `30` là phần tử thứ ba

---

## 2.2. Index là gì?

**Index** là vị trí của phần tử trong mảng.

Trong JavaScript, index bắt đầu từ **0**, không phải từ 1.

```javascript
let fruits = ["apple", "banana", "orange"];
```

| Phần tử | Index |
|---|---:|
| `"apple"` | `0` |
| `"banana"` | `1` |
| `"orange"` | `2` |

Ví dụ truy xuất:

```javascript
console.log(fruits[0]); // apple
console.log(fruits[1]); // banana
console.log(fruits[2]); // orange
```

---

## 2.3. Độ dài của mảng

Dùng thuộc tính `.length` để lấy số lượng phần tử trong mảng.

```javascript
let fruits = ["apple", "banana", "orange"];

console.log(fruits.length); // 3
```

Lưu ý:

```javascript
let lastIndex = fruits.length - 1;
console.log(fruits[lastIndex]); // orange
```

Vì index bắt đầu từ `0`, nên phần tử cuối cùng luôn có index bằng:

```javascript
array.length - 1
```

---

# 3. Truy vấn và duyệt mảng

## 3.1. Truy vấn phần tử trong mảng

Cú pháp:

```javascript
array[index]
```

Ví dụ:

```javascript
let colors = ["red", "green", "blue"];

console.log(colors[0]); // red
console.log(colors[1]); // green
console.log(colors[2]); // blue
```

Nếu truy cập vào index không tồn tại, kết quả sẽ là `undefined`.

```javascript
console.log(colors[10]); // undefined
```

---

## 3.2. Duyệt mảng bằng vòng lặp `for`

Duyệt mảng nghĩa là đi qua từng phần tử trong mảng để xử lý.

Ví dụ:

```javascript
let numbers = [1, 2, 3, 4, 5];

for (let i = 0; i < numbers.length; i++) {
  console.log(numbers[i]);
}
```

Giải thích:

- `i = 0`: bắt đầu từ index đầu tiên
- `i < numbers.length`: lặp khi `i` còn nhỏ hơn độ dài mảng
- `i++`: sau mỗi lần lặp, tăng `i` lên 1
- `numbers[i]`: lấy phần tử tại vị trí hiện tại

---

## 3.3. Duyệt mảng bằng `for...of`

`for...of` dùng để lấy trực tiếp từng giá trị trong mảng.

```javascript
let fruits = ["apple", "banana", "orange"];

for (let fruit of fruits) {
  console.log(fruit);
}
```

Cách này ngắn gọn và dễ đọc hơn khi ta chỉ cần lấy giá trị, không cần dùng index.

---

# 4. Thêm phần tử vào mảng

Có nhiều cách để thêm phần tử vào mảng. Hai cách thường dùng là `push()` và `splice()`.

---

## 4.1. Thêm phần tử vào cuối mảng bằng `push()`

Cú pháp:

```javascript
array.push(element1, element2, ...);
```

Ví dụ:

```javascript
let students = ["An", "Bình"];

students.push("Chi");

console.log(students); // ["An", "Bình", "Chi"]
```

Có thể thêm nhiều phần tử cùng lúc:

```javascript
students.push("Dũng", "Hà");

console.log(students); // ["An", "Bình", "Chi", "Dũng", "Hà"]
```

`push()` làm thay đổi mảng ban đầu.

---

## 4.2. Thêm phần tử tại vị trí bất kỳ bằng `splice()`

Cú pháp:

```javascript
array.splice(start, deleteCount, item1, item2, ...);
```

Trong đó:

| Thành phần | Ý nghĩa |
|---|---|
| `start` | Vị trí bắt đầu thao tác |
| `deleteCount` | Số phần tử muốn xóa |
| `item1, item2, ...` | Các phần tử muốn thêm vào |

Ví dụ thêm phần tử mà không xóa phần tử nào:

```javascript
let numbers = [1, 2, 4, 5];

numbers.splice(2, 0, 3);

console.log(numbers); // [1, 2, 3, 4, 5]
```

Giải thích:

```javascript
numbers.splice(2, 0, 3);
```

Nghĩa là:

- Bắt đầu tại index `2`
- Xóa `0` phần tử
- Thêm số `3` vào vị trí đó

---

# 5. Cập nhật phần tử trong mảng

Cập nhật phần tử nghĩa là thay đổi giá trị của một phần tử đã tồn tại trong mảng.

---

## 5.1. Cập nhật khi biết index

Cú pháp:

```javascript
array[index] = newValue;
```

Ví dụ:

```javascript
let fruits = ["apple", "banana", "orange"];

fruits[1] = "mango";

console.log(fruits); // ["apple", "mango", "orange"]
```

Ở ví dụ trên, phần tử tại index `1` là `"banana"` đã được đổi thành `"mango"`.

---

## 5.2. Cập nhật bằng `splice()`

Cú pháp:

```javascript
array.splice(start, 1, newValue);
```

Ví dụ:

```javascript
let fruits = ["apple", "banana", "orange"];

fruits.splice(1, 1, "mango");

console.log(fruits); // ["apple", "mango", "orange"]
```

Giải thích:

```javascript
fruits.splice(1, 1, "mango");
```

Nghĩa là:

- Bắt đầu tại index `1`
- Xóa `1` phần tử
- Thêm `"mango"` vào vị trí đó

---

# 6. Tìm kiếm phần tử trong mảng

## 6.1. Tìm vị trí phần tử bằng `indexOf()`

`indexOf()` dùng để tìm vị trí xuất hiện đầu tiên của một phần tử trong mảng.

Cú pháp:

```javascript
array.indexOf(searchElement, fromIndex);
```

Trong đó:

| Thành phần | Ý nghĩa |
|---|---|
| `searchElement` | Giá trị cần tìm |
| `fromIndex` | Vị trí bắt đầu tìm kiếm, có thể bỏ qua |

Ví dụ:

```javascript
let fruits = ["apple", "banana", "orange", "banana"];

console.log(fruits.indexOf("banana")); // 1
```

Kết quả là `1` vì `"banana"` xuất hiện đầu tiên tại index `1`.

---

## 6.2. Khi không tìm thấy phần tử

Nếu không tìm thấy phần tử, `indexOf()` trả về `-1`.

```javascript
let fruits = ["apple", "banana", "orange"];

console.log(fruits.indexOf("mango")); // -1
```

Ta có thể dùng điều này để kiểm tra phần tử có tồn tại hay không:

```javascript
let fruits = ["apple", "banana", "orange"];

if (fruits.indexOf("banana") !== -1) {
  console.log("Có banana trong mảng");
} else {
  console.log("Không có banana trong mảng");
}
```

---

## 6.3. Kiểm tra tồn tại bằng `includes()`

Nếu chỉ cần biết phần tử có tồn tại hay không, nên dùng `includes()` vì dễ đọc hơn.

```javascript
let fruits = ["apple", "banana", "orange"];

console.log(fruits.includes("banana")); // true
console.log(fruits.includes("mango"));  // false
```

---

# 7. Xóa phần tử khỏi mảng

## 7.1. Xóa phần tử khi biết vị trí bằng `splice()`

Cú pháp:

```javascript
array.splice(start, deleteCount);
```

Ví dụ:

```javascript
let fruits = ["apple", "banana", "orange"];

fruits.splice(1, 1);

console.log(fruits); // ["apple", "orange"]
```

Giải thích:

```javascript
fruits.splice(1, 1);
```

Nghĩa là:

- Bắt đầu tại index `1`
- Xóa `1` phần tử

---

## 7.2. Xóa nhiều phần tử

```javascript
let numbers = [1, 2, 3, 4, 5];

numbers.splice(1, 3);

console.log(numbers); // [1, 5]
```

Ở ví dụ trên:

- Bắt đầu xóa từ index `1`
- Xóa `3` phần tử: `2`, `3`, `4`

---

# 8. Một số phương thức Array cơ bản khác

## 8.1. `pop()`

`pop()` dùng để xóa phần tử cuối cùng của mảng và trả về phần tử đã bị xóa.

```javascript
let fruits = ["apple", "banana", "orange"];

let removedFruit = fruits.pop();

console.log(removedFruit); // orange
console.log(fruits);       // ["apple", "banana"]
```

---

## 8.2. `shift()`

`shift()` dùng để xóa phần tử đầu tiên của mảng và trả về phần tử đã bị xóa.

```javascript
let fruits = ["apple", "banana", "orange"];

let removedFruit = fruits.shift();

console.log(removedFruit); // apple
console.log(fruits);       // ["banana", "orange"]
```

---

## 8.3. `slice()`

`slice()` dùng để trích xuất một phần của mảng và trả về một mảng mới.

Cú pháp:

```javascript
array.slice(start, end);
```

Lưu ý:

- Lấy từ index `start`
- Dừng trước index `end`
- Không làm thay đổi mảng ban đầu

Ví dụ:

```javascript
let numbers = [1, 2, 3, 4, 5];

let result = numbers.slice(1, 4);

console.log(result);  // [2, 3, 4]
console.log(numbers); // [1, 2, 3, 4, 5]
```

---

## 8.4. `concat()`

`concat()` dùng để nối các mảng lại với nhau và trả về một mảng mới.

```javascript
let arr1 = [1, 2];
let arr2 = [3, 4];
let arr3 = [5, 6];

let result = arr1.concat(arr2, arr3);

console.log(result); // [1, 2, 3, 4, 5, 6]
```

`concat()` không làm thay đổi mảng ban đầu.

---

## 8.5. `includes()`

`includes()` kiểm tra mảng có chứa phần tử nào đó hay không.

```javascript
let numbers = [1, 2, 3, 4, 5];

console.log(numbers.includes(3)); // true
console.log(numbers.includes(9)); // false
```

---

## 8.6. Bảng tổng hợp phương thức cơ bản

| Phương thức | Cú pháp | Mô tả | Có làm đổi mảng gốc không? |
|---|---|---|---|
| `push()` | `array.push(item)` | Thêm phần tử vào cuối mảng | Có |
| `pop()` | `array.pop()` | Xóa phần tử cuối mảng | Có |
| `shift()` | `array.shift()` | Xóa phần tử đầu mảng | Có |
| `splice()` | `array.splice(start, deleteCount, item)` | Thêm, xóa hoặc cập nhật phần tử | Có |
| `slice()` | `array.slice(start, end)` | Cắt một phần mảng và trả về mảng mới | Không |
| `concat()` | `array.concat(array2)` | Nối mảng và trả về mảng mới | Không |
| `indexOf()` | `array.indexOf(item)` | Tìm vị trí đầu tiên của phần tử | Không |
| `includes()` | `array.includes(item)` | Kiểm tra phần tử có tồn tại không | Không |

---

# 9. Các Array Method quan trọng

Các phương thức dưới đây thường được dùng khi xử lý dữ liệu trong JavaScript hiện đại.

Bao gồm:

- `forEach()`
- `map()`
- `filter()`
- `reduce()`

---

## 9.1. `forEach()`

`forEach()` dùng để duyệt qua từng phần tử trong mảng và thực hiện một hành động nào đó.

Cú pháp:

```javascript
array.forEach(function(element, index) {
  // code xử lý
});
```

Ví dụ:

```javascript
let fruits = ["apple", "banana", "orange"];

fruits.forEach(function(fruit, index) {
  console.log(index + ": " + fruit);
});
```

Kết quả:

```text
0: apple
1: banana
2: orange
```

Đặc điểm:

- Dùng để duyệt mảng
- Không trả về mảng mới
- Thường dùng khi muốn in dữ liệu, render giao diện hoặc thực hiện hành động phụ

Ví dụ với arrow function:

```javascript
fruits.forEach((fruit) => {
  console.log(fruit);
});
```

---

## 9.2. `map()`

`map()` dùng để duyệt qua mảng và tạo ra một mảng mới có cùng độ dài với mảng ban đầu, nhưng giá trị có thể được thay đổi.

Cú pháp:

```javascript
let newArray = array.map(function(element, index) {
  return newValue;
});
```

Ví dụ:

```javascript
let numbers = [1, 2, 3, 4];

let doubledNumbers = numbers.map(function(number) {
  return number * 2;
});

console.log(doubledNumbers); // [2, 4, 6, 8]
```

Ví dụ với arrow function:

```javascript
let doubledNumbers = numbers.map(number => number * 2);
```

Đặc điểm:

- Trả về mảng mới
- Mảng mới có độ dài bằng mảng cũ
- Không làm thay đổi mảng ban đầu

Khi nào dùng `map()`?

Dùng khi muốn biến đổi từng phần tử trong mảng thành giá trị mới.

Ví dụ:

```javascript
let products = [
  { name: "Áo", price: 100000 },
  { name: "Quần", price: 200000 },
  { name: "Giày", price: 500000 }
];

let productNames = products.map(product => product.name);

console.log(productNames); // ["Áo", "Quần", "Giày"]
```

---

## 9.3. `filter()`

`filter()` dùng để lọc các phần tử thỏa mãn điều kiện và trả về một mảng mới.

Cú pháp:

```javascript
let newArray = array.filter(function(element, index) {
  return condition;
});
```

Ví dụ:

```javascript
let numbers = [1, 2, 3, 4, 5, 6];

let evenNumbers = numbers.filter(function(number) {
  return number % 2 === 0;
});

console.log(evenNumbers); // [2, 4, 6]
```

Ví dụ với arrow function:

```javascript
let evenNumbers = numbers.filter(number => number % 2 === 0);
```

Đặc điểm:

- Trả về mảng mới
- Chỉ giữ lại phần tử thỏa điều kiện
- Không làm thay đổi mảng ban đầu
- Mảng mới có thể ngắn hơn mảng cũ

Khi nào dùng `filter()`?

Dùng khi muốn lọc dữ liệu theo điều kiện.

Ví dụ:

```javascript
let students = [
  { name: "An", score: 8 },
  { name: "Bình", score: 5 },
  { name: "Chi", score: 9 }
];

let passedStudents = students.filter(student => student.score >= 6);

console.log(passedStudents);
// [
//   { name: "An", score: 8 },
//   { name: "Chi", score: 9 }
// ]
```

---

## 9.4. `reduce()`

`reduce()` dùng để duyệt qua mảng và tích lũy dữ liệu để trả về một giá trị duy nhất.

Giá trị trả về có thể là:

- Một số
- Một chuỗi
- Một object
- Một array mới

Cú pháp:

```javascript
let result = array.reduce(function(accumulator, currentValue) {
  return newAccumulator;
}, initialValue);
```

Trong đó:

| Thành phần | Ý nghĩa |
|---|---|
| `accumulator` | Biến tích lũy kết quả sau mỗi lần lặp |
| `currentValue` | Phần tử hiện tại đang được xử lý |
| `initialValue` | Giá trị khởi tạo ban đầu cho accumulator |

Ví dụ tính tổng:

```javascript
let numbers = [1, 2, 3, 4, 5];

let total = numbers.reduce(function(sum, number) {
  return sum + number;
}, 0);

console.log(total); // 15
```

Ví dụ với arrow function:

```javascript
let total = numbers.reduce((sum, number) => sum + number, 0);
```

Giải thích từng bước:

| Lần lặp | `sum` | `number` | Kết quả trả về |
|---:|---:|---:|---:|
| 1 | 0 | 1 | 1 |
| 2 | 1 | 2 | 3 |
| 3 | 3 | 3 | 6 |
| 4 | 6 | 4 | 10 |
| 5 | 10 | 5 | 15 |

Khi nào dùng `reduce()`?

Dùng khi muốn gom nhiều phần tử thành một kết quả duy nhất.

Ví dụ tính tổng tiền:

```javascript
let cart = [
  { name: "Áo", price: 100000, quantity: 2 },
  { name: "Quần", price: 200000, quantity: 1 },
  { name: "Giày", price: 500000, quantity: 1 }
];

let totalPrice = cart.reduce((total, item) => {
  return total + item.price * item.quantity;
}, 0);

console.log(totalPrice); // 900000
```

---

## 9.5. Bảng so sánh `forEach`, `map`, `filter`, `reduce`

| Method | Mục đích | Có trả về mảng mới không? | Kết quả thường gặp |
|---|---|---|---|
| `forEach()` | Duyệt mảng để thực hiện hành động | Không | `undefined` |
| `map()` | Biến đổi từng phần tử | Có | Mảng mới cùng độ dài |
| `filter()` | Lọc phần tử theo điều kiện | Có | Mảng mới có các phần tử thỏa điều kiện |
| `reduce()` | Gom mảng thành một giá trị | Không nhất thiết | Một giá trị duy nhất |

Ghi nhớ nhanh:

- Dùng `forEach()` khi chỉ muốn lặp qua mảng để làm gì đó.
- Dùng `map()` khi muốn biến đổi dữ liệu.
- Dùng `filter()` khi muốn lọc dữ liệu.
- Dùng `reduce()` khi muốn tính toán hoặc gom dữ liệu thành một kết quả.

---

# 10. Function là gì?

**Function**, hay còn gọi là **hàm**, là một khối mã có thể tái sử dụng để thực hiện một tác vụ cụ thể.

Thay vì viết đi viết lại cùng một đoạn code nhiều lần, ta có thể đưa đoạn code đó vào một hàm và gọi lại khi cần.

Ví dụ chưa dùng hàm:

```javascript
console.log("Xin chào An");
console.log("Xin chào Bình");
console.log("Xin chào Chi");
```

Dùng hàm:

```javascript
function sayHello(name) {
  console.log("Xin chào " + name);
}

sayHello("An");
sayHello("Bình");
sayHello("Chi");
```

---

## 10.1. Vì sao cần dùng Function?

Function giúp:

- Tái sử dụng code
- Tránh viết lặp lại
- Chia chương trình thành các phần nhỏ dễ quản lý
- Dễ sửa lỗi
- Dễ đọc và dễ bảo trì hơn

---

# 11. Parameter và Argument

Hai khái niệm này rất quan trọng khi học function.

---

## 11.1. Parameter là gì?

**Parameter**, hay **tham số**, là biến đại diện được khai báo trong phần định nghĩa hàm.

Nó giống như một “chỗ trống” để nhận giá trị thật khi hàm được gọi.

Ví dụ:

```javascript
function greet(name) {
  console.log("Hello " + name);
}
```

Trong ví dụ trên, `name` là parameter.

---

## 11.2. Argument là gì?

**Argument**, hay **đối số**, là giá trị thật được truyền vào khi gọi hàm.

Ví dụ:

```javascript
greet("An");
```

Trong ví dụ trên, `"An"` là argument.

Khi hàm chạy, giá trị `"An"` sẽ được gán cho tham số `name`.

---

## 11.3. Ví dụ phân biệt Parameter và Argument

```javascript
function sum(a, b) {
  return a + b;
}

let result = sum(5, 10);

console.log(result); // 15
```

Trong đoạn code trên:

| Thành phần | Vai trò |
|---|---|
| `a`, `b` | Parameter / Tham số |
| `5`, `10` | Argument / Đối số |

---

# 12. Từ khóa return

`return` là từ khóa dùng bên trong function để trả về một giá trị sau khi hàm xử lý xong.

Ví dụ:

```javascript
function sum(a, b) {
  return a + b;
}

let result = sum(3, 4);

console.log(result); // 7
```

Ở đây, hàm `sum()` trả về kết quả `a + b`.

---

## 12.1. Hàm sẽ dừng khi gặp `return`

Khi JavaScript gặp `return`, hàm sẽ dừng ngay lập tức.

```javascript
function test() {
  console.log("Dòng 1");
  return;
  console.log("Dòng 2");
}

test();
```

Kết quả:

```text
Dòng 1
```

`Dòng 2` không được in ra vì hàm đã dừng ở `return`.

---

## 12.2. Nếu không có `return`

Nếu một hàm không có `return`, hàm đó tự động trả về `undefined`.

```javascript
function sayHello() {
  console.log("Hello");
}

let result = sayHello();

console.log(result); // undefined
```

---

## 12.3. `console.log()` khác gì `return`?

Đây là lỗi rất thường gặp khi mới học JavaScript.

| `console.log()` | `return` |
|---|---|
| Chỉ in dữ liệu ra màn hình console | Trả dữ liệu ra ngoài hàm |
| Không dùng được để lưu kết quả xử lý | Có thể gán kết quả cho biến |
| Chủ yếu dùng để kiểm tra/debug | Dùng để tạo kết quả thật của hàm |

Ví dụ:

```javascript
function sum1(a, b) {
  console.log(a + b);
}

let result1 = sum1(2, 3);
console.log(result1); // undefined
```

```javascript
function sum2(a, b) {
  return a + b;
}

let result2 = sum2(2, 3);
console.log(result2); // 5
```

---

# 13. Các loại Function trong JavaScript

JavaScript có nhiều cách khai báo function. Ba loại phổ biến là:

1. Function Declaration
2. Function Expression
3. Arrow Function

---

## 13.1. Function Declaration

Function Declaration là cách khai báo hàm truyền thống.

Cú pháp:

```javascript
function functionName(parameters) {
  // code xử lý
}
```

Ví dụ:

```javascript
function sayHello(name) {
  return "Hello " + name;
}

console.log(sayHello("An")); // Hello An
```

Đặc điểm quan trọng:

- Có hỗ trợ **hoisting**
- Có thể gọi hàm trước khi khai báo

Ví dụ:

```javascript
console.log(sum(2, 3)); // 5

function sum(a, b) {
  return a + b;
}
```

Đoạn code trên vẫn chạy được vì Function Declaration được hoisting.

---

## 13.2. Function Expression

Function Expression là cách tạo hàm rồi gán hàm đó vào một biến.

Cú pháp:

```javascript
const functionName = function(parameters) {
  // code xử lý
};
```

Ví dụ:

```javascript
const sayHello = function(name) {
  return "Hello " + name;
};

console.log(sayHello("Bình")); // Hello Bình
```

Đặc điểm:

- Không thể gọi trước khi khai báo biến
- Thường dùng khi muốn truyền hàm như một giá trị
- Có thể dùng làm callback

Ví dụ lỗi:

```javascript
console.log(sum(2, 3)); // Error

const sum = function(a, b) {
  return a + b;
};
```

---

## 13.3. Arrow Function

Arrow Function là cú pháp viết hàm ngắn gọn hơn, thường dùng trong JavaScript hiện đại.

Cú pháp:

```javascript
const functionName = (parameters) => {
  // code xử lý
};
```

Ví dụ:

```javascript
const sum = (a, b) => {
  return a + b;
};

console.log(sum(2, 3)); // 5
```

Nếu hàm chỉ có một dòng trả về, có thể viết ngắn hơn:

```javascript
const sum = (a, b) => a + b;
```

Nếu chỉ có một tham số, có thể bỏ dấu ngoặc:

```javascript
const square = number => number * number;

console.log(square(5)); // 25
```

Đặc điểm:

- Cú pháp ngắn gọn
- Thường dùng làm callback
- Không có `this` riêng, mà kế thừa `this` từ phạm vi bên ngoài
- Không phù hợp trong một số trường hợp cần `this` riêng, ví dụ method trong object hoặc event handler phức tạp

---

# 14. So sánh nhanh Function Declaration, Expression và Arrow Function

| Tiêu chí | Function Declaration | Function Expression | Arrow Function |
|---|---|---|---|
| Cú pháp | `function name() {}` | `const name = function() {}` | `const name = () => {}` |
| Hoisting | Có | Không dùng được trước khi gán | Không dùng được trước khi gán |
| Độ ngắn gọn | Trung bình | Trung bình | Ngắn gọn nhất |
| Phù hợp làm callback | Có thể | Có | Rất phù hợp |
| `this` | Có `this` riêng | Có `this` riêng | Kế thừa `this` từ bên ngoài |

---

## 14.1. Callback là gì?

**Callback** là một hàm được truyền vào một hàm khác như một đối số để được gọi lại sau.

Ví dụ:

```javascript
function processUserInput(callback) {
  let name = "An";
  callback(name);
}

processUserInput(function(userName) {
  console.log("Hello " + userName);
});
```

Arrow Function thường được dùng làm callback trong các array methods:

```javascript
let numbers = [1, 2, 3, 4];

let doubled = numbers.map(number => number * 2);

console.log(doubled); // [2, 4, 6, 8]
```

---

# 15. Tổng kết kiến thức cần nhớ

## 15.1. Array

Array dùng để lưu trữ nhiều giá trị trong một biến.

Ví dụ:

```javascript
let scores = [8, 9, 10];
```

Các thao tác chính với mảng:

| Nhóm thao tác | Phương thức / cú pháp thường dùng |
|---|---|
| Truy vấn | `array[index]` |
| Duyệt mảng | `for`, `for...of`, `forEach()` |
| Thêm phần tử | `push()`, `splice()` |
| Cập nhật phần tử | `array[index] = value`, `splice()` |
| Tìm kiếm | `indexOf()`, `includes()` |
| Xóa phần tử | `splice()`, `pop()`, `shift()` |
| Biến đổi dữ liệu | `map()` |
| Lọc dữ liệu | `filter()` |
| Tính toán / gom dữ liệu | `reduce()` |

---

## 15.2. Function

Function là khối mã có thể tái sử dụng.

Ví dụ:

```javascript
function multiply(a, b) {
  return a * b;
}

console.log(multiply(3, 4)); // 12
```

Các điểm cần nhớ:

- Parameter là biến đại diện trong định nghĩa hàm.
- Argument là giá trị thật truyền vào khi gọi hàm.
- `return` dùng để trả kết quả ra ngoài hàm.
- Nếu không có `return`, hàm trả về `undefined`.
- Function Declaration có hoisting.
- Function Expression và Arrow Function không nên gọi trước khi khai báo.
- Arrow Function thường dùng nhiều với callback và array methods.

---

# 16. Bài tập tự luyện

## Bài 1: Truy xuất phần tử

Tạo một mảng gồm 5 tên học viên. In ra:

- Phần tử đầu tiên
- Phần tử cuối cùng
- Độ dài của mảng

Gợi ý:

```javascript
let students = ["An", "Bình", "Chi", "Dũng", "Hà"];
```

---

## Bài 2: Thêm, sửa, xóa phần tử

Cho mảng:

```javascript
let fruits = ["apple", "banana", "orange"];
```

Yêu cầu:

1. Thêm `"mango"` vào cuối mảng.
2. Đổi `"banana"` thành `"grape"`.
3. Xóa `"orange"` khỏi mảng.
4. In mảng cuối cùng ra console.

---

## Bài 3: Lọc số chẵn

Cho mảng:

```javascript
let numbers = [1, 2, 3, 4, 5, 6, 7, 8];
```

Dùng `filter()` để tạo mảng mới chỉ chứa các số chẵn.

Kết quả mong muốn:

```javascript
[2, 4, 6, 8]
```

---

## Bài 4: Nhân đôi giá trị

Cho mảng:

```javascript
let numbers = [1, 2, 3, 4];
```

Dùng `map()` để tạo mảng mới có giá trị gấp đôi.

Kết quả mong muốn:

```javascript
[2, 4, 6, 8]
```

---

## Bài 5: Tính tổng

Cho mảng:

```javascript
let numbers = [10, 20, 30, 40];
```

Dùng `reduce()` để tính tổng các phần tử trong mảng.

Kết quả mong muốn:

```javascript
100
```

---

## Bài 6: Viết function tính diện tích hình chữ nhật

Viết hàm `calculateRectangleArea(width, height)` nhận vào chiều rộng và chiều cao, sau đó trả về diện tích hình chữ nhật.

Ví dụ:

```javascript
calculateRectangleArea(5, 10); // 50
```

---

## Bài 7: Kết hợp Function và Array

Cho mảng sản phẩm:

```javascript
let products = [
  { name: "Áo", price: 100000 },
  { name: "Quần", price: 200000 },
  { name: "Giày", price: 500000 }
];
```

Yêu cầu:

1. Viết function nhận vào mảng sản phẩm.
2. Dùng `reduce()` để tính tổng giá tiền.
3. Trả về tổng giá tiền.

Gợi ý:

```javascript
function calculateTotal(products) {
  // code tại đây
}
```

---

# Ghi nhớ nhanh

```javascript
// Tạo mảng
let arr = [1, 2, 3];

// Lấy phần tử
arr[0];

// Thêm cuối mảng
arr.push(4);

// Xóa cuối mảng
arr.pop();

// Xóa đầu mảng
arr.shift();

// Thêm, xóa, sửa bằng splice
arr.splice(1, 1, 99);

// Kiểm tra tồn tại
arr.includes(2);

// Tìm vị trí
arr.indexOf(3);

// Duyệt mảng
arr.forEach(item => console.log(item));

// Tạo mảng mới bằng cách biến đổi dữ liệu
let doubled = arr.map(item => item * 2);

// Lọc dữ liệu
let even = arr.filter(item => item % 2 === 0);

// Gom dữ liệu thành một kết quả
let total = arr.reduce((sum, item) => sum + item, 0);

// Function Declaration
function sum(a, b) {
  return a + b;
}

// Function Expression
const minus = function(a, b) {
  return a - b;
};

// Arrow Function
const multiply = (a, b) => a * b;
```

---

# Checklist ôn tập

Sau khi học xong Session 04, bạn nên tự trả lời được các câu hỏi sau:

- Array dùng để làm gì?
- Index trong mảng bắt đầu từ số mấy?
- Làm sao để lấy phần tử đầu tiên và phần tử cuối cùng trong mảng?
- Khác nhau giữa `push()`, `pop()`, `shift()` và `splice()` là gì?
- `slice()` và `splice()` khác nhau như thế nào?
- Khi nào dùng `forEach()`?
- Khi nào dùng `map()`?
- Khi nào dùng `filter()`?
- Khi nào dùng `reduce()`?
- Function dùng để làm gì?
- Parameter và argument khác nhau như thế nào?
- `return` dùng để làm gì?
- Nếu function không có `return`, kết quả trả về là gì?
- Function Declaration khác Function Expression ở điểm nào?
- Arrow Function phù hợp dùng trong trường hợp nào?

---

# Tóm tắt một câu

**Array** giúp lưu trữ và xử lý danh sách dữ liệu, còn **Function** giúp đóng gói logic thành các khối mã có thể tái sử dụng nhiều lần.
