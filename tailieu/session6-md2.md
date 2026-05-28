# Session 06: Modern JavaScript (ES6) Features

> Tài liệu ôn tập lại các tính năng JavaScript hiện đại thường dùng trong dự án thực tế: **Module**, **Rest Parameters**, **Spread Operator**, **Template String**, **Destructuring** và **Async/Await**.

---

## Mục lục

1. [Module trong JavaScript](#1-module-trong-javascript)
2. [Export và Import](#2-export-và-import)
3. [Rest Parameters](#3-rest-parameters)
4. [Spread Operator](#4-spread-operator)
5. [So sánh Spread và Rest](#5-so-sánh-spread-và-rest)
6. [Template String](#6-template-string)
7. [Object Destructuring](#7-object-destructuring)
8. [Array Destructuring](#8-array-destructuring)
9. [Asynchronous JavaScript](#9-asynchronous-javascript)
10. [Async/Await](#10-asyncawait)
11. [Xử lý bất đồng bộ thực tế với try/catch](#11-xử-lý-bất-đồng-bộ-thực-tế-với-trycatch)
12. [Tổng kết nhanh](#12-tổng-kết-nhanh)
13. [Bài tập tự luyện](#13-bài-tập-tự-luyện)

---

# 1. Module trong JavaScript

## 1.1. Module là gì?

**Module** là cách chia nhỏ mã nguồn JavaScript thành nhiều file riêng biệt.

Thay vì viết toàn bộ code trong một file lớn, ta tách code thành các file nhỏ theo chức năng.

Ví dụ:

```txt
project/
├── index.html
├── main.js
├── math.js
├── user.js
└── product.js
```

Trong đó:

- `math.js`: chứa các hàm tính toán.
- `user.js`: chứa logic liên quan đến người dùng.
- `product.js`: chứa logic liên quan đến sản phẩm.
- `main.js`: file chính để import và sử dụng các module khác.

---

## 1.2. Vì sao cần dùng Module?

Module giúp code:

| Lợi ích | Ý nghĩa |
|---|---|
| Dễ quản lý | Code được chia nhỏ theo từng chức năng |
| Dễ bảo trì | Sửa lỗi ở file nào thì tìm đúng file đó |
| Dễ tái sử dụng | Một hàm có thể export ra và dùng ở nhiều nơi |
| Dễ làm việc nhóm | Mỗi người có thể phụ trách một module riêng |
| Tránh file quá dài | Không phải viết mọi thứ trong một file `main.js` |

Ví dụ thực tế:

```js
// math.js
export function sum(a, b) {
  return a + b;
}

// main.js
import { sum } from './math.js';

console.log(sum(10, 20)); // 30
```

---

## 1.3. Lưu ý khi dùng Module trong trình duyệt

Khi dùng module trong HTML, cần thêm `type="module"`:

```html
<script type="module" src="./main.js"></script>
```

Nếu không có `type="module"`, trình duyệt sẽ không hiểu cú pháp `import` và `export`.

---

# 2. Export và Import

Trong JavaScript Module, để file này sử dụng được code từ file khác, ta cần:

- **Export**: xuất dữ liệu ra khỏi file.
- **Import**: nhập dữ liệu từ file khác vào.

---

## 2.1. Named Export

**Named Export** dùng để export nhiều biến, hàm hoặc class trong cùng một file.

### Cách 1: Export trực tiếp khi khai báo

```js
// math.js
export const PI = 3.14;

export function sum(a, b) {
  return a + b;
}

export function multiply(a, b) {
  return a * b;
}
```

Import ở file khác:

```js
// main.js
import { PI, sum, multiply } from './math.js';

console.log(PI); // 3.14
console.log(sum(2, 3)); // 5
console.log(multiply(2, 3)); // 6
```

---

### Cách 2: Khai báo trước, export sau

```js
// math.js
const PI = 3.14;

function sum(a, b) {
  return a + b;
}

function multiply(a, b) {
  return a * b;
}

export { PI, sum, multiply };
```

---

## 2.2. Đặc điểm của Named Export

Khi dùng **Named Export**:

- Một file có thể export nhiều giá trị.
- Khi import phải dùng đúng tên đã export.
- Khi import cần dùng dấu ngoặc nhọn `{ }`.

Ví dụ đúng:

```js
import { sum } from './math.js';
```

Ví dụ sai:

```js
import sum from './math.js';
```

Lý do sai: `sum` là named export nên phải import bằng `{ sum }`.

---

## 2.3. Default Export

**Default Export** là giá trị export mặc định của một file.

Mỗi file chỉ được có **một default export**.

Ví dụ:

```js
// logger.js
export default function logMessage(message) {
  console.log('Log:', message);
}
```

Import ở file khác:

```js
// main.js
import logMessage from './logger.js';

logMessage('Hello JavaScript');
```

---

## 2.4. Đặc điểm của Default Export

Khi dùng **Default Export**:

- Một file chỉ có một default export.
- Khi import không dùng `{ }`.
- Khi import có thể đặt tên tùy ý.

Ví dụ:

```js
// logger.js
export default function logMessage(message) {
  console.log(message);
}
```

Các cách import đều hợp lệ:

```js
import logMessage from './logger.js';
import logger from './logger.js';
import printLog from './logger.js';
```

Cả 3 tên `logMessage`, `logger`, `printLog` đều trỏ tới default export của `logger.js`.

---

## 2.5. So sánh Named Export và Default Export

| Tiêu chí | Named Export | Default Export |
|---|---|---|
| Số lượng export trong một file | Nhiều | Chỉ một |
| Khi import có dùng `{ }` không? | Có | Không |
| Có cần đúng tên không? | Có | Không |
| Có thể đổi tên khi import không? | Có, dùng `as` | Có thể đặt tên tùy ý |
| Phù hợp khi nào? | File có nhiều hàm/biến cần export | File có một chức năng chính |

---

## 2.6. Import đổi tên bằng Alias

Khi tên export quá dài hoặc bị trùng tên, ta có thể dùng `as` để đổi tên.

```js
// math.js
export function calculateTotalPrice(price, quantity) {
  return price * quantity;
}
```

```js
// main.js
import { calculateTotalPrice as calcTotal } from './math.js';

console.log(calcTotal(10000, 3)); // 30000
```

---

## 2.7. Import tất cả bằng dấu `*`

Có thể gom tất cả named export vào một object.

```js
// math.js
export const PI = 3.14;

export function sum(a, b) {
  return a + b;
}

export function multiply(a, b) {
  return a * b;
}
```

```js
// main.js
import * as MathUtils from './math.js';

console.log(MathUtils.PI); // 3.14
console.log(MathUtils.sum(1, 2)); // 3
console.log(MathUtils.multiply(2, 3)); // 6
```

---

## 2.8. Import Default và Named cùng lúc

Một file có thể có cả default export và named export.

```js
// user.js
export const role = 'admin';

export function getUserName(user) {
  return user.name;
}

export default function createUser(name) {
  return {
    name,
    role: 'user'
  };
}
```

Import:

```js
// main.js
import createUser, { role, getUserName } from './user.js';

const user = createUser('Huy');

console.log(user); // { name: 'Huy', role: 'user' }
console.log(role); // admin
console.log(getUserName(user)); // Huy
```

Ghi nhớ:

```js
import defaultName, { namedExport } from './file.js';
```

---

# 3. Rest Parameters

## 3.1. Rest Parameters là gì?

**Rest Parameters** cho phép một hàm nhận số lượng đối số không giới hạn.

Cú pháp:

```js
function functionName(...params) {
  // params là một array
}
```

Dấu `...` trong trường hợp này có nghĩa là: **gom nhiều giá trị riêng lẻ lại thành một mảng**.

---

## 3.2. Ví dụ cơ bản

```js
function sumAll(...numbers) {
  console.log(numbers);
}

sumAll(1, 2, 3); // [1, 2, 3]
sumAll(10, 20, 30, 40); // [10, 20, 30, 40]
```

`numbers` là một mảng thật sự, nên có thể dùng các array method như `forEach`, `map`, `filter`, `reduce`.

```js
function sumAll(...numbers) {
  return numbers.reduce(function(total, number) {
    return total + number;
  }, 0);
}

console.log(sumAll(1, 2, 3)); // 6
console.log(sumAll(10, 20, 30, 40)); // 100
```

Viết bằng arrow function:

```js
const sumAll = (...numbers) => {
  return numbers.reduce((total, number) => total + number, 0);
};

console.log(sumAll(1, 2, 3)); // 6
```

---

## 3.3. Rest Parameters thay thế `arguments`

Trước ES6, JavaScript có object đặc biệt tên là `arguments`.

```js
function showArguments() {
  console.log(arguments);
}

showArguments(1, 2, 3);
```

Tuy nhiên, `arguments` có một số nhược điểm:

- Không phải array thật sự.
- Không dùng trực tiếp được nhiều array method.
- Không tồn tại trong arrow function.

Ví dụ arrow function không có `arguments` riêng:

```js
const demo = () => {
  console.log(arguments); // Không nên dùng
};
```

Vì vậy, với JavaScript hiện đại, nên dùng rest parameters:

```js
const demo = (...args) => {
  console.log(args);
};

demo('a', 'b', 'c'); // ['a', 'b', 'c']
```

---

## 3.4. Rest Parameters phải đứng cuối

Rest parameter luôn phải là tham số cuối cùng trong danh sách tham số.

Đúng:

```js
function showInfo(name, ...scores) {
  console.log(name);
  console.log(scores);
}

showInfo('Huy', 8, 9, 10);
```

Sai:

```js
function showInfo(...scores, name) {
  // SyntaxError
}
```

Lý do: JavaScript không biết phần nào thuộc về `scores`, phần nào thuộc về `name`.

---

## 3.5. Ví dụ thực tế với Rest Parameters

### Tính tổng giỏ hàng

```js
function calculateCartTotal(...prices) {
  return prices.reduce((total, price) => total + price, 0);
}

console.log(calculateCartTotal(10000, 20000, 5000)); // 35000
```

### Nhận user và nhiều quyền

```js
function createUserRole(username, ...roles) {
  return {
    username,
    roles
  };
}

console.log(createUserRole('huy', 'admin', 'editor', 'viewer'));
// { username: 'huy', roles: ['admin', 'editor', 'viewer'] }
```

---

# 4. Spread Operator

## 4.1. Spread Operator là gì?

**Spread Operator** cũng dùng dấu `...`, nhưng ý nghĩa khác với Rest.

Spread dùng để **trải**, **mở rộng**, hoặc **phá vỡ cấu trúc** của array/object thành các phần tử riêng lẻ.

Cú pháp:

```js
const newArray = [...oldArray];
const newObject = { ...oldObject };
```

---

## 4.2. Sao chép mảng

Không nên copy array bằng cách gán trực tiếp:

```js
const arr1 = [1, 2, 3];
const arr2 = arr1;

arr2.push(4);

console.log(arr1); // [1, 2, 3, 4]
console.log(arr2); // [1, 2, 3, 4]
```

Lý do: `arr1` và `arr2` cùng trỏ tới một vùng nhớ.

Cách tốt hơn là dùng spread:

```js
const arr1 = [1, 2, 3];
const arr2 = [...arr1];

arr2.push(4);

console.log(arr1); // [1, 2, 3]
console.log(arr2); // [1, 2, 3, 4]
```

---

## 4.3. Gộp mảng

```js
const frontend = ['HTML', 'CSS'];
const javascript = ['JavaScript', 'React'];

const skills = [...frontend, ...javascript];

console.log(skills);
// ['HTML', 'CSS', 'JavaScript', 'React']
```

Có thể thêm phần tử mới khi gộp:

```js
const skills = ['HTML', 'CSS'];
const newSkills = ['Git', ...skills, 'JavaScript'];

console.log(newSkills);
// ['Git', 'HTML', 'CSS', 'JavaScript']
```

---

## 4.4. Truyền array vào function

Ví dụ hàm cần nhiều tham số riêng lẻ:

```js
function sum(a, b, c) {
  return a + b + c;
}

const numbers = [1, 2, 3];

console.log(sum(...numbers)); // 6
```

Không dùng spread:

```js
sum(numbers); // Sai logic vì a nhận cả array
```

Dùng spread:

```js
sum(...numbers); // Tương đương sum(1, 2, 3)
```

---

## 4.5. Sao chép object

```js
const user = {
  name: 'Huy',
  age: 22
};

const copiedUser = { ...user };

console.log(copiedUser);
// { name: 'Huy', age: 22 }
```

---

## 4.6. Gộp object

```js
const user = {
  name: 'Huy',
  age: 22
};

const address = {
  city: 'Ho Chi Minh',
  country: 'Vietnam'
};

const fullUser = {
  ...user,
  ...address
};

console.log(fullUser);
// { name: 'Huy', age: 22, city: 'Ho Chi Minh', country: 'Vietnam' }
```

---

## 4.7. Ghi đè giá trị object

Khi gộp object, nếu có key trùng nhau, giá trị phía sau sẽ ghi đè giá trị phía trước.

```js
const defaultConfig = {
  theme: 'light',
  language: 'en',
  showSidebar: true
};

const userConfig = {
  theme: 'dark'
};

const finalConfig = {
  ...defaultConfig,
  ...userConfig
};

console.log(finalConfig);
// { theme: 'dark', language: 'en', showSidebar: true }
```

Nếu đổi thứ tự:

```js
const finalConfig = {
  ...userConfig,
  ...defaultConfig
};

console.log(finalConfig);
// { theme: 'light', language: 'en', showSidebar: true }
```

Ghi nhớ: **object phía sau có quyền ghi đè object phía trước**.

---

## 4.8. Spread chỉ copy nông - Shallow Copy

Spread chỉ copy lớp đầu tiên của object/array.

```js
const user = {
  name: 'Huy',
  address: {
    city: 'Ho Chi Minh'
  }
};

const copiedUser = { ...user };

copiedUser.address.city = 'Ha Noi';

console.log(user.address.city); // Ha Noi
```

Lý do: object `address` bên trong vẫn dùng chung vùng nhớ.

Với dữ liệu lồng nhau, cần cẩn thận hơn:

```js
const copiedUser = {
  ...user,
  address: {
    ...user.address
  }
};
```

---

# 5. So sánh Spread và Rest

Spread và Rest đều dùng dấu `...`, nhưng khác nhau ở **ngữ cảnh sử dụng**.

---

## 5.1. Spread

Spread dùng để **trải dữ liệu ra**.

### Đặc điểm

- Mở rộng array/object thành các phần tử riêng lẻ.
- Dùng khi gọi hàm hoặc gán giá trị.
- Thường dùng để copy array/object, gộp array/object, truyền tham số cho hàm.

Ví dụ:

```js
const numbers = [1, 2, 3];
console.log(...numbers); // 1 2 3
```

```js
const arr1 = [1, 2];
const arr2 = [3, 4];

const result = [...arr1, ...arr2];
console.log(result); // [1, 2, 3, 4]
```

---

## 5.2. Rest

Rest dùng để **gom dữ liệu lại**.

### Đặc điểm

- Gom nhiều giá trị riêng lẻ thành một array.
- Dùng khi khai báo function hoặc destructuring.
- Thường dùng khi function nhận số lượng tham số không cố định.

Ví dụ:

```js
function showNumbers(...numbers) {
  console.log(numbers);
}

showNumbers(1, 2, 3); // [1, 2, 3]
```

---

## 5.3. Bảng so sánh

| Tiêu chí | Spread | Rest |
|---|---|---|
| Ý nghĩa | Trải dữ liệu ra | Gom dữ liệu lại |
| Cú pháp | `...array`, `...object` | `...params` |
| Ngữ cảnh | Khi gọi hàm, tạo array/object mới | Khi khai báo function, destructuring |
| Kết quả | Các giá trị riêng lẻ | Một array/object phần còn lại |
| Ví dụ | `sum(...numbers)` | `function sum(...numbers)` |

---

## 5.4. Cách nhớ nhanh

```js
// Rest: gom vào
function demo(...items) {
  console.log(items); // array
}

demo(1, 2, 3);
```

```js
// Spread: bung ra
const items = [1, 2, 3];
console.log(...items); // 1 2 3
```

Câu nhớ:

> **Rest gom lại, Spread bung ra.**

---

# 6. Template String

## 6.1. Template String là gì?

**Template String** hay **Template Literal** là cách viết chuỗi hiện đại trong JavaScript.

Thay vì dùng dấu nháy đơn `' '` hoặc nháy kép `" "`, template string dùng dấu **backtick**:

```js
const message = `Hello JavaScript`;
```

Backtick nằm ở phím phía dưới `Esc` trên bàn phím máy tính.

---

## 6.2. Vấn đề khi nối chuỗi kiểu cũ

Trước ES6, ta thường nối chuỗi bằng toán tử `+`.

```js
const name = 'Huy';
const age = 22;

const message = 'My name is ' + name + ' and I am ' + age + ' years old.';

console.log(message);
```

Cách này có nhược điểm:

- Dễ nhầm dấu cách.
- Rườm rà khi có nhiều biến.
- Khó đọc khi chuỗi dài.
- Khó viết chuỗi nhiều dòng.

---

## 6.3. Nội suy biến - Interpolation

Template String cho phép chèn biến, biểu thức hoặc gọi hàm trực tiếp vào chuỗi bằng cú pháp `${}`.

```js
const name = 'Huy';
const age = 22;

const message = `My name is ${name} and I am ${age} years old.`;

console.log(message);
// My name is Huy and I am 22 years old.
```

---

## 6.4. Chèn biểu thức vào chuỗi

```js
const price = 10000;
const quantity = 3;

const message = `Total price: ${price * quantity} VND`;

console.log(message);
// Total price: 30000 VND
```

---

## 6.5. Gọi hàm trong Template String

```js
function formatName(name) {
  return name.toUpperCase();
}

const username = 'huy';

console.log(`Hello, ${formatName(username)}!`);
// Hello, HUY!
```

---

## 6.6. Viết chuỗi nhiều dòng - Multi-line String

Không cần dùng `\n` như cách cũ.

```js
const html = `
  <div class="card">
    <h2>Product Name</h2>
    <p>Price: 10000 VND</p>
  </div>
`;

console.log(html);
```

Cách này thường dùng khi tạo HTML bằng JavaScript.

Ví dụ:

```js
const product = {
  name: 'Laptop',
  price: 15000000
};

const productHTML = `
  <div class="product-card">
    <h2>${product.name}</h2>
    <p>Price: ${product.price} VND</p>
  </div>
`;
```

---

# 7. Object Destructuring

## 7.1. Object Destructuring là gì?

**Object Destructuring** là cú pháp giúp “bóc tách” dữ liệu từ object ra thành các biến riêng.

Ví dụ object:

```js
const user = {
  name: 'Huy',
  age: 22,
  email: 'huy@example.com'
};
```

Cách cũ:

```js
const name = user.name;
const age = user.age;
const email = user.email;
```

Cách dùng destructuring:

```js
const { name, age, email } = user;

console.log(name); // Huy
console.log(age); // 22
console.log(email); // huy@example.com
```

---

## 7.2. Anatomy of Code

```js
const { name, age } = user;
```

Ý nghĩa:

| Thành phần | Ý nghĩa |
|---|---|
| `user` | Object nguồn |
| `{ name, age }` | Các key muốn lấy ra |
| `const` | Khai báo biến mới |
| `name`, `age` | Tên biến được tạo ra |

Điều quan trọng:

> Tên biến trong destructuring phải trùng với tên key của object, nếu không đổi tên bằng alias.

---

## 7.3. Đổi tên biến khi destructuring

Nếu muốn lấy `name` nhưng đặt tên biến là `nameUser`, dùng cú pháp:

```js
const user = {
  name: 'Huy',
  age: 22
};

const { name: nameUser } = user;

console.log(nameUser); // Huy
```

Lưu ý:

```js
const { name: nameUser } = user;
```

Ở đây:

- `name` là key trong object.
- `nameUser` là tên biến mới.

Sau dòng trên, biến `name` không được tạo ra, chỉ có biến `nameUser`.

```js
console.log(nameUser); // Huy
console.log(name); // ReferenceError nếu chưa khai báo name ở nơi khác
```

---

## 7.4. Giá trị mặc định

Nếu object không có key cần lấy, biến sẽ nhận giá trị `undefined`.

```js
const user = {
  name: 'Huy'
};

const { age } = user;

console.log(age); // undefined
```

Có thể đặt giá trị mặc định:

```js
const user = {
  name: 'Huy'
};

const { age = 22 } = user;

console.log(age); // 22
```

Nếu object đã có giá trị, giá trị mặc định sẽ không được dùng:

```js
const user = {
  name: 'Huy',
  age: 25
};

const { age = 22 } = user;

console.log(age); // 25
```

---

## 7.5. Kết hợp đổi tên và giá trị mặc định

```js
const user = {
  name: 'Huy'
};

const { age: userAge = 22 } = user;

console.log(userAge); // 22
```

Ý nghĩa:

- Lấy key `age` từ object `user`.
- Đổi tên biến thành `userAge`.
- Nếu không có `age`, dùng giá trị mặc định là `22`.

---

## 7.6. Destructuring object lồng nhau

```js
const user = {
  name: 'Huy',
  address: {
    city: 'Ho Chi Minh',
    district: 'District 1'
  }
};

const {
  address: { city, district }
} = user;

console.log(city); // Ho Chi Minh
console.log(district); // District 1
```

Lưu ý: Với cú pháp trên, biến `address` không được tạo ra, chỉ có `city` và `district`.

Nếu muốn lấy cả `address` và `city`:

```js
const {
  address,
  address: { city }
} = user;

console.log(address); // { city: 'Ho Chi Minh', district: 'District 1' }
console.log(city); // Ho Chi Minh
```

---

## 7.7. Destructuring trong tham số function

Rất thường gặp trong dự án thực tế.

Cách bình thường:

```js
function showUser(user) {
  console.log(user.name);
  console.log(user.age);
}
```

Dùng destructuring:

```js
function showUser({ name, age }) {
  console.log(name);
  console.log(age);
}

const user = {
  name: 'Huy',
  age: 22
};

showUser(user);
```

Ví dụ với giá trị mặc định:

```js
function createUser({ name, age = 18, role = 'user' }) {
  return {
    name,
    age,
    role
  };
}

const user = createUser({ name: 'Huy' });

console.log(user);
// { name: 'Huy', age: 18, role: 'user' }
```

---

## 7.8. Rest trong Object Destructuring

Có thể lấy một số key ra, phần còn lại gom vào object khác.

```js
const user = {
  id: 1,
  name: 'Huy',
  age: 22,
  email: 'huy@example.com'
};

const { id, ...userInfo } = user;

console.log(id); // 1
console.log(userInfo);
// { name: 'Huy', age: 22, email: 'huy@example.com' }
```

Ở đây `...userInfo` là Rest, vì nó gom phần còn lại vào một object mới.

---

# 8. Array Destructuring

## 8.1. Array Destructuring là gì?

**Array Destructuring** là cú pháp bóc tách phần tử trong array ra thành các biến riêng.

Ví dụ:

```js
const numbers = [10, 20, 30];

const [a, b, c] = numbers;

console.log(a); // 10
console.log(b); // 20
console.log(c); // 30
```

Khác với object destructuring:

- Object destructuring dựa vào tên key.
- Array destructuring dựa vào vị trí index.

---

## 8.2. Bỏ qua phần tử không cần lấy

```js
const colors = ['red', 'green', 'blue'];

const [firstColor, , thirdColor] = colors;

console.log(firstColor); // red
console.log(thirdColor); // blue
```

Dấu phẩy trống `, ,` dùng để bỏ qua phần tử ở giữa.

---

## 8.3. Giá trị mặc định trong Array Destructuring

```js
const numbers = [10];

const [a, b = 20] = numbers;

console.log(a); // 10
console.log(b); // 20
```

Nếu array có giá trị thật thì default không được dùng:

```js
const numbers = [10, 99];

const [a, b = 20] = numbers;

console.log(b); // 99
```

---

## 8.4. Hoán đổi giá trị hai biến

Không cần biến tạm.

```js
let a = 1;
let b = 2;

[a, b] = [b, a];

console.log(a); // 2
console.log(b); // 1
```

---

## 8.5. Rest trong Array Destructuring

```js
const numbers = [1, 2, 3, 4, 5];

const [first, second, ...restNumbers] = numbers;

console.log(first); // 1
console.log(second); // 2
console.log(restNumbers); // [3, 4, 5]
```

Ở đây `...restNumbers` gom phần còn lại của array.

---

## 8.6. Ví dụ thực tế

### Lấy dữ liệu từ mảng trả về

```js
function getUserInfo() {
  return ['Huy', 22, 'huy@example.com'];
}

const [name, age, email] = getUserInfo();

console.log(name); // Huy
console.log(age); // 22
console.log(email); // huy@example.com
```

### Duyệt mảng object với destructuring

```js
const users = [
  { id: 1, name: 'Huy' },
  { id: 2, name: 'An' }
];

users.forEach(({ id, name }) => {
  console.log(`${id} - ${name}`);
});
```

---

# 9. Asynchronous JavaScript

## 9.1. Asynchronous là gì?

**Asynchronous** nghĩa là **bất đồng bộ**.

Trong JavaScript, bất đồng bộ giúp chương trình xử lý các tác vụ mất thời gian mà không làm treo giao diện.

Các tác vụ thường mất thời gian:

- Gọi API từ server.
- Đọc file.
- Gửi dữ liệu lên server.
- Chờ timer.
- Truy vấn database.

---

## 9.2. Vì sao cần Async?

JavaScript chạy trên trình duyệt và thường tương tác trực tiếp với giao diện người dùng.

Nếu một tác vụ mất 5 giây mà JavaScript phải chờ xong mới chạy tiếp, giao diện sẽ bị đơ.

Ví dụ:

```txt
Người dùng click button
→ JavaScript gọi API mất 5 giây
→ Nếu code bị blocking, giao diện đứng yên 5 giây
→ Trải nghiệm người dùng rất tệ
```

Bất đồng bộ giúp JavaScript:

```txt
Gọi API
→ Trong lúc chờ API, giao diện vẫn hoạt động
→ Khi API trả kết quả, JavaScript xử lý tiếp
```

Đây gọi là **Non-blocking UI**.

---

## 9.3. Ví dụ bất đồng bộ với setTimeout

```js
console.log('Start');

setTimeout(() => {
  console.log('Run after 2 seconds');
}, 2000);

console.log('End');
```

Kết quả:

```txt
Start
End
Run after 2 seconds
```

Giải thích:

- `Start` chạy trước.
- `setTimeout` được đưa đi chờ 2 giây.
- JavaScript không đứng chờ mà chạy tiếp `End`.
- Sau 2 giây, callback trong `setTimeout` mới chạy.

---

## 9.4. Promise là gì?

**Promise** là một object đại diện cho kết quả của một tác vụ bất đồng bộ trong tương lai.

Promise có 3 trạng thái chính:

| Trạng thái | Ý nghĩa |
|---|---|
| `pending` | Đang chờ xử lý |
| `fulfilled` | Thành công |
| `rejected` | Thất bại |

Ví dụ:

```js
const promise = new Promise((resolve, reject) => {
  const isSuccess = true;

  if (isSuccess) {
    resolve('Success data');
  } else {
    reject('Something went wrong');
  }
});

promise
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.log(error);
  });
```

---

## 9.5. Nhược điểm khi dùng nhiều `.then()`

Khi có nhiều tác vụ phụ thuộc nhau, code `.then()` có thể dài và khó đọc.

```js
fetchUser()
  .then((user) => {
    return fetchPosts(user.id);
  })
  .then((posts) => {
    return fetchComments(posts[0].id);
  })
  .then((comments) => {
    console.log(comments);
  })
  .catch((error) => {
    console.log(error);
  });
```

ES6+ cung cấp `async/await` để viết code bất đồng bộ dễ đọc hơn.

---

# 10. Async/Await

## 10.1. Async/Await là gì?

**Async/Await** là cú pháp giúp viết code bất đồng bộ nhìn giống code đồng bộ.

Nó là “syntactic sugar” bọc ngoài Promise.

Hiểu đơn giản:

- `async`: khai báo một hàm bất đồng bộ.
- `await`: tạm dừng trong hàm `async` cho đến khi Promise xử lý xong.

---

## 10.2. Cú pháp cơ bản

```js
async function getData() {
  const result = await somePromise();
  console.log(result);
}
```

Hoặc dùng arrow function:

```js
const getData = async () => {
  const result = await somePromise();
  console.log(result);
};
```

---

## 10.3. `async` luôn trả về Promise

Dù bên trong return giá trị thường, hàm `async` vẫn trả về Promise.

```js
async function getNumber() {
  return 10;
}

console.log(getNumber());
// Promise { 10 }
```

Muốn lấy giá trị `10`, cần dùng `await` hoặc `.then()`.

```js
async function main() {
  const number = await getNumber();
  console.log(number); // 10
}

main();
```

Hoặc:

```js
getNumber().then((number) => {
  console.log(number); // 10
});
```

---

## 10.4. `await` chỉ dùng trực tiếp trong hàm `async`

Đúng:

```js
async function main() {
  const data = await fetchData();
  console.log(data);
}
```

Sai:

```js
function main() {
  const data = await fetchData(); // SyntaxError
}
```

Lý do: `await` cần nằm trong function có từ khóa `async`.

Ghi chú: Trong một số môi trường hiện đại có hỗ trợ **top-level await**, nhưng khi học cơ bản, nên nhớ quy tắc: **await dùng trong async function**.

---

## 10.5. So sánh Promise `.then()` và Async/Await

### Dùng `.then()`

```js
function getUser() {
  return fetch('https://jsonplaceholder.typicode.com/users/1')
    .then((response) => response.json())
    .then((user) => {
      console.log(user);
    })
    .catch((error) => {
      console.log(error);
    });
}
```

### Dùng `async/await`

```js
async function getUser() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
    const user = await response.json();

    console.log(user);
  } catch (error) {
    console.log(error);
  }
}
```

Cách `async/await` thường dễ đọc hơn vì code chạy từ trên xuống dưới.

---

## 10.6. Fetch API với Async/Await

Ví dụ gọi API lấy danh sách users:

```js
async function fetchUsers() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const users = await response.json();

    console.log(users);
  } catch (error) {
    console.log('Error:', error);
  }
}

fetchUsers();
```

Giải thích:

```js
const response = await fetch(url);
```

- Gửi request tới API.
- Chờ server trả response.

```js
const users = await response.json();
```

- Chuyển response body từ JSON string/object stream thành dữ liệu JavaScript.
- Việc parse JSON cũng là tác vụ bất đồng bộ nên cần `await`.

---

## 10.7. Kiểm tra lỗi HTTP khi dùng fetch

`fetch` chỉ reject khi có lỗi mạng, không tự reject khi status là `404` hoặc `500`.

Vì vậy nên kiểm tra `response.ok`.

```js
async function fetchUserById(id) {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const user = await response.json();
    return user;
  } catch (error) {
    console.log('Failed to fetch user:', error.message);
    return null;
  }
}
```

---

# 11. Xử lý bất đồng bộ thực tế với try/catch

## 11.1. Vì sao cần try/catch?

Khi dùng `await`, lỗi có thể xảy ra ở nhiều dòng:

- API bị lỗi.
- Server không phản hồi.
- Mất mạng.
- Dữ liệu trả về không đúng format.
- Code xử lý sau khi nhận data bị lỗi.

`try/catch` giúp bắt lỗi cục bộ và xử lý rõ ràng.

---

## 11.2. Cấu trúc try/catch với async/await

```js
async function main() {
  try {
    // Các dòng có thể dùng await
    const data = await fetchData();
    console.log(data);
  } catch (error) {
    // Xử lý lỗi nếu có lỗi xảy ra trong try
    console.log(error);
  }
}
```

---

## 11.3. Thêm finally

`finally` luôn chạy dù thành công hay thất bại.

Thường dùng để:

- Tắt loading.
- Unlock button.
- Reset trạng thái UI.

Ví dụ:

```js
async function loadProducts() {
  try {
    console.log('Loading...');

    const response = await fetch('/api/products');
    const products = await response.json();

    console.log(products);
  } catch (error) {
    console.log('Load products failed:', error);
  } finally {
    console.log('Done loading');
  }
}
```

---

## 11.4. Ví dụ thực tế: submit form bằng async/await

```js
const form = document.querySelector('#register-form');

form.addEventListener('submit', async function(event) {
  event.preventDefault();

  const email = form.email.value.trim();
  const password = form.password.value.trim();

  try {
    const response = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      })
    });

    if (!response.ok) {
      throw new Error('Register failed');
    }

    const data = await response.json();

    console.log('Register success:', data);
  } catch (error) {
    console.log('Error:', error.message);
  }
});
```

Các bước chính:

1. Chặn hành vi submit mặc định bằng `event.preventDefault()`.
2. Lấy dữ liệu từ form.
3. Gửi request lên server bằng `fetch`.
4. Dùng `await` để chờ response.
5. Kiểm tra `response.ok`.
6. Parse JSON.
7. Dùng `catch` để xử lý lỗi.

---

## 11.5. Chạy nhiều Promise cùng lúc với Promise.all

Nếu nhiều tác vụ không phụ thuộc nhau, không nên await tuần tự.

Chưa tối ưu:

```js
const users = await fetchUsers();
const products = await fetchProducts();
const orders = await fetchOrders();
```

Ba tác vụ trên chạy lần lượt.

Tối ưu hơn:

```js
const [users, products, orders] = await Promise.all([
  fetchUsers(),
  fetchProducts(),
  fetchOrders()
]);
```

Ba tác vụ được chạy song song, thời gian chờ có thể ngắn hơn.

---

# 12. Tổng kết nhanh

## 12.1. Module

```js
// Named export
export function sum(a, b) {
  return a + b;
}

// Named import
import { sum } from './math.js';
```

```js
// Default export
export default function logger(message) {
  console.log(message);
}

// Default import
import logger from './logger.js';
```

Ghi nhớ:

- Named export/import: dùng `{ }`, cần đúng tên.
- Default export/import: không dùng `{ }`, được đặt tên tùy ý.

---

## 12.2. Rest Parameters

```js
function sumAll(...numbers) {
  return numbers.reduce((total, number) => total + number, 0);
}
```

Ghi nhớ:

- Rest dùng khi khai báo function.
- Rest gom nhiều argument thành một array.
- Rest parameter phải đứng cuối.

---

## 12.3. Spread Operator

```js
const arr2 = [...arr1];
const merged = [...arr1, ...arr2];
const newUser = { ...user, role: 'admin' };
```

Ghi nhớ:

- Spread dùng để bung array/object ra.
- Hay dùng để copy/gộp array/object.
- Object phía sau ghi đè object phía trước nếu trùng key.

---

## 12.4. Template String

```js
const message = `Hello ${name}, your age is ${age}`;
```

Ghi nhớ:

- Dùng backtick.
- Chèn biến bằng `${}`.
- Hỗ trợ chuỗi nhiều dòng.

---

## 12.5. Destructuring

```js
const { name, age } = user;
const [first, second] = numbers;
```

Ghi nhớ:

- Object destructuring dựa vào key.
- Array destructuring dựa vào vị trí.
- Có thể đổi tên, đặt default value, dùng rest.

---

## 12.6. Async/Await

```js
async function getData() {
  try {
    const response = await fetch('/api/data');
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}
```

Ghi nhớ:

- `async` làm function trả về Promise.
- `await` chờ Promise xử lý xong.
- Nên dùng `try/catch` để bắt lỗi.
- Với `fetch`, nên kiểm tra `response.ok`.

---

# 13. Bài tập tự luyện

## Bài 1: Module

Tạo 2 file:

```txt
math.js
main.js
```

Yêu cầu:

- Trong `math.js`, export named function `sum`, `subtract`, `multiply`, `divide`.
- Trong `main.js`, import các hàm đó và in kết quả ra console.

Gợi ý:

```js
// math.js
export function sum(a, b) {
  return a + b;
}
```

---

## Bài 2: Default Export

Tạo file `logger.js`.

Yêu cầu:

- Export default một hàm `logger(message)`.
- Import vào `main.js` với tên bất kỳ.
- Gọi hàm để in ra thông báo.

---

## Bài 3: Rest Parameters

Viết hàm `calculateAverage(...scores)` nhận vào nhiều điểm số và trả về điểm trung bình.

Ví dụ:

```js
calculateAverage(8, 9, 10); // 9
calculateAverage(5, 6, 7, 8); // 6.5
```

---

## Bài 4: Spread Operator

Cho mảng:

```js
const oldSkills = ['HTML', 'CSS'];
const newSkills = ['JavaScript', 'React'];
```

Yêu cầu:

- Gộp thành mảng `allSkills` bằng spread.
- Thêm `'Git'` vào đầu mảng.
- In kết quả ra console.

---

## Bài 5: Object Spread

Cho object:

```js
const user = {
  name: 'Huy',
  age: 22
};
```

Yêu cầu tạo object mới có thêm:

```js
role: 'admin'
isActive: true
```

Không được sửa trực tiếp object ban đầu.

---

## Bài 6: Template String

Cho dữ liệu:

```js
const product = {
  name: 'Keyboard',
  price: 500000,
  quantity: 2
};
```

Yêu cầu in ra chuỗi:

```txt
Product: Keyboard
Price: 500000
Quantity: 2
Total: 1000000
```

Dùng template string.

---

## Bài 7: Object Destructuring

Cho object:

```js
const student = {
  name: 'An',
  age: 20,
  scores: {
    math: 9,
    english: 8
  }
};
```

Yêu cầu:

- Lấy `name`, `age`.
- Lấy `math`, `english` từ object lồng nhau.
- Đổi tên `name` thành `studentName`.

---

## Bài 8: Array Destructuring

Cho mảng:

```js
const numbers = [10, 20, 30, 40, 50];
```

Yêu cầu:

- Lấy phần tử đầu tiên vào biến `first`.
- Lấy phần tử thứ hai vào biến `second`.
- Gom các phần tử còn lại vào biến `restNumbers`.

---

## Bài 9: Async/Await

Viết function `getUsers`:

- Gọi API `https://jsonplaceholder.typicode.com/users`.
- Dùng `async/await`.
- Dùng `try/catch`.
- Kiểm tra `response.ok`.
- In danh sách users ra console.

---

# Checklist ôn tập

Sau khi học xong Session 06, bạn nên tự trả lời được các câu hỏi sau:

- Module dùng để làm gì?
- Khác nhau giữa named export và default export là gì?
- Khi nào import cần dùng `{ }`?
- Rest Parameters dùng để làm gì?
- Spread Operator dùng để làm gì?
- Vì sao `...` có lúc là rest, có lúc là spread?
- Template String dùng dấu gì?
- `${}` trong template string có tác dụng gì?
- Object destructuring khác array destructuring ở điểm nào?
- Làm sao đổi tên biến khi destructuring object?
- `async` có tác dụng gì?
- `await` có tác dụng gì?
- Vì sao nên dùng `try/catch` với async/await?
- Vì sao khi dùng `fetch` nên kiểm tra `response.ok`?

---

# Ghi nhớ cuối bài

```txt
Module        → Chia nhỏ code thành nhiều file
Export        → Xuất dữ liệu ra khỏi file
Import        → Nhập dữ liệu từ file khác vào
Rest          → Gom nhiều giá trị thành array
Spread        → Bung array/object ra
Template      → Viết chuỗi dễ đọc bằng backtick
Destructuring → Bóc tách dữ liệu từ object/array
Async/Await   → Viết code bất đồng bộ dễ đọc hơn Promise .then()
try/catch     → Bắt lỗi khi xử lý bất đồng bộ
```

Câu nhớ nhanh:

```txt
Rest gom lại, Spread bung ra.
Named import có ngoặc nhọn, Default import không có ngoặc nhọn.
Object destructuring theo key, Array destructuring theo vị trí.
Async tạo Promise, Await chờ Promise.
```
