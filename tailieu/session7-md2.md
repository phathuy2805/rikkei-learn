# Session 07: TypeScript Essentials - TypeScript Core & OOP

## Mục tiêu buổi học

Sau session này, bạn cần nắm được:

1. TypeScript là gì và vì sao nên dùng TypeScript thay vì chỉ dùng JavaScript.
2. Cách cài đặt môi trường TypeScript cơ bản.
3. Cách khai báo biến và sử dụng các kiểu dữ liệu cơ bản trong TypeScript.
4. Cách dùng các kiểu nâng cao như `Union`, `Intersection`, `Enum`, `Tuple`.
5. Cách dùng `Interface` và `Type Alias` để định nghĩa cấu trúc dữ liệu.
6. Hiểu các khái niệm cốt lõi của lập trình hướng đối tượng: `class`, `object`, `encapsulation`, `inheritance`, `polymorphism`, `abstract class`.
7. Hiểu và áp dụng được `Generic` trong function, class và interface.

---

# 1. TypeScript là gì?

## 1.1. Khái niệm

**TypeScript** là một ngôn ngữ lập trình được phát triển bởi Microsoft.

Có thể hiểu đơn giản:

> TypeScript = JavaScript + Type System

TypeScript là phiên bản mở rộng của JavaScript, bổ sung thêm khả năng kiểm tra kiểu dữ liệu ngay khi viết code.

JavaScript vốn là ngôn ngữ **kiểu động**. Điều đó nghĩa là một biến có thể nhận nhiều kiểu dữ liệu khác nhau trong quá trình chạy chương trình.

Ví dụ JavaScript:

```js
let age = 20;
age = "twenty"; // JavaScript vẫn cho phép
```

Với TypeScript, ta có thể khai báo rõ biến `age` chỉ được nhận kiểu `number`:

```ts
let age: number = 20;
age = "twenty"; // Error: Type 'string' is not assignable to type 'number'
```

Nhờ vậy, TypeScript giúp phát hiện lỗi sớm hơn trước khi chương trình chạy thật.

---

## 1.2. TypeScript dùng để làm gì?

TypeScript có thể được dùng trong cả:

- **Client-side**: phát triển giao diện web, ví dụ Angular, React, Vue.
- **Server-side**: phát triển backend với Node.js, Express, NestJS.
- **Dự án lớn**: nơi cần code rõ ràng, dễ bảo trì, dễ làm việc nhóm.

TypeScript không chạy trực tiếp trên trình duyệt. Code TypeScript sẽ được **biên dịch** sang JavaScript trước khi chạy.

---

# 2. So sánh JavaScript và TypeScript

| Tiêu chí              | JavaScript                   | TypeScript                                           |
|-----------------------|------------------------------|------------------------------------------------------|
| Bản chất              | Kiểu động, gán dữ liệu tự do | Kiểu tĩnh, khai báo kiểu rõ ràng                     |
| Phát hiện lỗi         | Khi chạy chương trình        | Ngay khi viết code hoặc khi compile                  |
| Hỗ trợ IDE            | Gợi ý cơ bản                 | Gợi ý thông minh, refactor an toàn, bắt lỗi tức thời |
| Quy mô phù hợp        | Dự án nhỏ, script đơn giản   | Dự án vừa/lớn, làm việc nhóm                         |
| Chạy trên trình duyệt | Chạy trực tiếp               | Cần compile sang JavaScript                          |

Ví dụ lỗi JavaScript chỉ phát hiện khi chạy:

```js
function calculateTotal(price, quantity) {
  return price * quantity;
}

calculateTotal("100", 2); // Có thể chạy nhưng dữ liệu không rõ ràng
```

Với TypeScript:

```ts
function calculateTotal(price: number, quantity: number): number {
  return price * quantity;
}

calculateTotal("100", 2); // Error ngay khi viết code
```

---

# 3. Cài đặt môi trường TypeScript

## 3.1. Cài Node.js và npm

Node.js là nền tảng cần thiết để chạy các công cụ JavaScript/TypeScript.

Sau khi cài Node.js, kiểm tra bằng lệnh:

```bash
node -v
npm -v
```

Nếu terminal hiển thị version, nghĩa là đã cài thành công.

Ví dụ:

```bash
node -v
# v20.x.x

npm -v
# 10.x.x
```

---

## 3.2. Cài TypeScript Compiler

TypeScript Compiler thường được gọi là `tsc`. Công cụ này dùng để biên dịch file `.ts` sang `.js`.

Cài global:

```bash
npm install -g typescript
```

Kiểm tra cài đặt:

```bash
tsc -v
```

---

# 4. Biên dịch TypeScript code

## 4.1. Khởi tạo project

Tạo file `package.json`:

```bash
npm init -y
```

File `package.json` dùng để quản lý thông tin project, dependencies và scripts.

---

## 4.2. Tạo file cấu hình TypeScript

Chạy lệnh:

```bash
tsc --init
```

Lệnh này tạo file:

```text
tsconfig.json
```

File `tsconfig.json` quy định TypeScript sẽ compile như thế nào.

---

## 4.3. Cấu trúc thư mục cơ bản

Nên tổ chức project như sau:

```text
project-name/
├── src/
│   └── demo.ts
├── dist/
├── package.json
└── tsconfig.json
```

Ý nghĩa:

| Thư mục / file  | Vai trò                              |
|-----------------|--------------------------------------|
| `src/`          | Chứa code TypeScript gốc             |
| `dist/`         | Chứa file JavaScript sau khi compile |
| `package.json`  | Quản lý project                      |
| `tsconfig.json` | Cấu hình TypeScript compiler         |

---

## 4.4. Cấu hình `tsconfig.json`

Một cấu hình cơ bản thường dùng:

```json
{
  "compilerOptions": {
    "target": "ES2016",
    "module": "CommonJS",
    "rootDir": "./src",
    "outDir": "./dist",
    "strict": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "skipLibCheck": true
  },
  "include": ["src"]
}
```

Giải thích nhanh:

| Thuộc tính | Ý nghĩa                                       |
|------------|-----------------------------------------------|
| `target`   | Phiên bản JavaScript đầu ra                   |
| `module`   | Kiểu module được sử dụng                      |
| `rootDir`  | Thư mục chứa file TypeScript gốc              |
| `outDir`   | Thư mục chứa file JavaScript sau compile      |
| `strict`   | Bật kiểm tra kiểu nghiêm ngặt                 |
| `include`  | Chỉ định thư mục/file được TypeScript compile |

---

## 4.5. Viết file TypeScript đầu tiên

File `src/demo.ts`:

```ts
let nameUser: string = "Dev";
let age: number = 20;
let isActive: boolean = true;

console.log(nameUser, age, isActive);
```

Compile toàn bộ project:

```bash
tsc
```

Sau khi compile, TypeScript sẽ tạo file JavaScript trong thư mục `dist`.

---

# 5. Biến và kiểu dữ liệu cơ bản trong TypeScript

## 5.1. Cú pháp khai báo biến có kiểu dữ liệu

Cú pháp:

```ts
let variableName: type = value;
```

Ví dụ:

```ts
let color: string = "red";
let quantity: number = 10;
let isLogin: boolean = false;
```

Trong đó:

| Thành phần | Ý nghĩa                   |
|------------|---------------------------|
| `let`      | Từ khóa khai báo biến     |
| `color`    | Tên biến                  |
| `: string` | Kiểu dữ liệu của biến     |
| `= "red"`  | Giá trị được gán cho biến |

---

## 5.2. Type Inference - TypeScript tự suy luận kiểu

Không phải lúc nào cũng cần ghi kiểu rõ ràng. TypeScript có thể tự suy luận kiểu từ giá trị ban đầu.

```ts
let city = "Hà Nội";
// TypeScript tự hiểu city là string

city = 20; // Error
```

Nên dùng type annotation khi:

- Biến chưa có giá trị ban đầu.
- Function parameter.
- Function return type quan trọng.
- Object phức tạp.

Ví dụ:

```ts
let score: number;
score = 100;
```

---

# 6. Kiểu dữ liệu tham chiếu: Array

## 6.1. Array trong TypeScript

Mảng trong TypeScript thường yêu cầu các phần tử có cùng kiểu dữ liệu.

Ví dụ:

```ts
let numbers: number[] = [1, 2, 3, 4, 5];
let names: string[] = ["Phong", "Linh"];
```

Nếu thêm sai kiểu, TypeScript sẽ báo lỗi:

```ts
let numbers: number[] = [1, 2, 3];

numbers.push(4);   // OK
numbers.push("A"); // Error
```

---

## 6.2. Hai cách khai báo Array

### Cách 1: Cú pháp ngắn gọn

```ts
let numbers: number[] = [1, 2, 3];
let names: string[] = ["An", "Bình"];
```

### Cách 2: Cú pháp Generic

```ts
let flags: Array<boolean> = [true, false, true];
let scores: Array<number> = [8, 9, 10];
```

Hai cách trên đều đúng. Trong thực tế, `number[]`, `string[]` thường được dùng nhiều hơn vì ngắn gọn.

---

# 7. Kiểu dữ liệu tham chiếu: Object

## 7.1. Khai báo object trực tiếp

```ts
let teacher: { name: string; age: number } = {
  name: "Tommy",
  age: 40,
};
```

Object trên bắt buộc phải có:

- `name` kiểu `string`
- `age` kiểu `number`

Nếu thêm thuộc tính chưa khai báo:

```ts
teacher.phone = "123456"; // Error
```

Nếu cập nhật sai kiểu:

```ts
teacher.age = "forty"; // Error
```

---

## 7.2. Nhược điểm khi khai báo object trực tiếp

Cách này ổn với object nhỏ, nhưng khi object phức tạp hoặc tái sử dụng nhiều nơi, code sẽ bị lặp.

Ví dụ không tối ưu:

```ts
let user1: { name: string; age: number } = {
  name: "An",
  age: 20,
};

let user2: { name: string; age: number } = {
  name: "Bình",
  age: 21,
};
```

Lúc này nên dùng `interface` hoặc `type alias`.

---

# 8. Interface

## 8.1. Interface là gì?

`interface` dùng để định nghĩa hình dạng/cấu trúc của một object.

Nói đơn giản:

> Interface giống như bản hợp đồng quy định object phải có những thuộc tính nào và kiểu dữ liệu ra sao.

Ví dụ:

```ts
interface Person {
  name: string;
  age: number;
}

let teacher: Person = {
  name: "Tommy",
  age: 40,
};
```

Object `teacher` phải tuân theo cấu trúc của `Person`.

---

## 8.2. Optional Property

Có thể dùng dấu `?` để đánh dấu thuộc tính không bắt buộc.

```ts
interface User {
  id: number;
  name: string;
  email?: string;
}

const user1: User = {
  id: 1,
  name: "Huy",
};

const user2: User = {
  id: 2,
  name: "Nam",
  email: "nam@example.com",
};
```

`email` có thể có hoặc không.

---

## 8.3. Readonly Property

`readonly` dùng để ngăn không cho sửa lại giá trị sau khi object được tạo.

```ts
interface Product {
  readonly id: number;
  name: string;
  price: number;
}

const product: Product = {
  id: 1,
  name: "Keyboard",
  price: 500000,
};

product.name = "Mouse"; // OK
product.id = 2; // Error
```

---

# 9. Union Type

## 9.1. Union Type là gì?

`Union Type` cho phép một biến nhận một trong nhiều kiểu dữ liệu khác nhau.

Cú pháp:

```ts
let variable: type1 | type2;
```

Ví dụ:

```ts
let id: string | number;

id = "DEV_01"; // OK
id = 12345;    // OK
id = true;     // Error
```

---

## 9.2. Khi nào dùng Union Type?

Dùng khi một dữ liệu có thể có nhiều dạng hợp lệ.

Ví dụ ID có thể là string hoặc number:

```ts
type ID = string | number;

function printId(id: ID): void {
  console.log("ID:", id);
}

printId(1001);
printId("USER_1001");
```

---

## 9.3. Cần kiểm tra kiểu trước khi xử lý

Khi dùng union, TypeScript yêu cầu bạn xử lý an toàn.

```ts
function formatId(id: string | number): string {
  if (typeof id === "string") {
    return id.toUpperCase();
  }

  return id.toString();
}
```

Nếu không kiểm tra kiểu, có thể gặp lỗi:

```ts
function formatId(id: string | number): string {
  return id.toUpperCase();
  // Error: number không có method toUpperCase
}
```

---

# 10. Type Alias

## 10.1. Type Alias là gì?

`type` dùng để đặt tên tùy chỉnh cho một kiểu dữ liệu.

Giúp code:

- Ngắn gọn hơn.
- Dễ đọc hơn.
- Dễ tái sử dụng hơn.
- Tránh lặp code.

Ví dụ chưa tối ưu:

```ts
let userId: string | number;
let orderId: string | number;
let transactionId: string | number;
```

Tối ưu bằng Type Alias:

```ts
type ID = string | number;

let userId: ID;
let orderId: ID;
let transactionId: ID;
```

---

## 10.2. Type Alias cho Object

```ts
type Student = {
  id: number;
  name: string;
  age: number;
};

const student: Student = {
  id: 1,
  name: "Huy",
  age: 20,
};
```

---

## 10.3. Type Alias cho Function

```ts
type Calculator = (a: number, b: number) => number;

const add: Calculator = (a, b) => {
  return a + b;
};

const multiply: Calculator = (a, b) => {
  return a * b;
};
```

---

# 11. Intersection Type

## 11.1. Intersection Type là gì?

`Intersection Type` dùng toán tử `&` để gộp nhiều kiểu thành một kiểu duy nhất.

Khác với Union `|` là “hoặc”, Intersection `&` là “và”.

Ví dụ:

```ts
interface HasName {
  name: string;
}

interface HasAge {
  age: number;
}

type Person = HasName & HasAge;

const person: Person = {
  name: "Huy",
  age: 20,
};
```

`Person` bắt buộc phải có cả `name` và `age`.

---

## 11.2. So sánh Union và Intersection

| Kiểu         | Toán tử | Ý nghĩa              | Ví dụ              |
|--------------|---------|----------------------|--------------------|
| Union        | `|`     | Một trong nhiều kiểu | `string | number`  |
| Intersection | `&`     | Gộp nhiều kiểu lại   | `HasName & HasAge` |

Ví dụ dễ nhớ:

```ts
// Union: id có thể là string hoặc number
type ID = string | number;

// Intersection: employee phải có cả thông tin cá nhân và thông tin công việc
type PersonalInfo = {
  name: string;
  age: number;
};

type JobInfo = {
  position: string;
  salary: number;
};

type Employee = PersonalInfo & JobInfo;
```

---

# 12. So sánh Type Alias và Interface

| Tiêu chí            | Interface                | Type Alias                      |
|---------------------|--------------------------|---------------------------------|
| Cú pháp             | `interface Name { ... }` | `type Name = ...`               |
| Phù hợp nhất cho    | Object, class contract   | Union, Tuple, Primitive, Object |
| Kế thừa             | Dùng `extends`           | Dùng `&`                        |
| Declaration Merging | Có, tự gộp nếu trùng tên | Không, trùng tên sẽ lỗi         |
| Khai báo primitive  | Không phù hợp            | Có thể                          |
| Khai báo union      | Không                    | Có                              |

## Nên dùng cái nào?

Gợi ý thực tế:

- Dùng `interface` khi định nghĩa cấu trúc object/class và có khả năng mở rộng.
- Dùng `type` khi cần union, intersection, tuple, function type hoặc primitive alias.

Ví dụ dùng `interface`:

```ts
interface User {
  id: number;
  name: string;
}
```

Ví dụ dùng `type`:

```ts
type Status = "pending" | "success" | "failed";
type ID = string | number;
```

---

# 13. Kiểu dữ liệu đặc biệt

## 13.1. `void` - không trả về giá trị

`void` thường dùng cho function không trả về dữ liệu.

```ts
function logMessage(message: string): void {
  console.log(message);
}
```

Nếu function có return giá trị, sẽ lỗi:

```ts
function logMessage(message: string): void {
  return message; // Error
}
```

---

## 13.2. `any` - bỏ qua kiểm tra kiểu

`any` cho phép biến nhận bất kỳ kiểu dữ liệu nào.

```ts
let value: any = "hello";

value = 42;
value = true;
value = { name: "Huy" };
```

Nhược điểm:

- Mất lợi ích kiểm tra kiểu của TypeScript.
- Dễ gây lỗi runtime.
- Không nên lạm dụng.

Ví dụ nguy hiểm:

```ts
let value: any = 123;

console.log(value.toUpperCase());
// Runtime Error vì number không có toUpperCase
```

---

## 13.3. `unknown` - phiên bản an toàn hơn của `any`

`unknown` cũng cho phép nhận mọi kiểu dữ liệu, nhưng bắt buộc phải kiểm tra kiểu trước khi sử dụng.

```ts
let value: unknown = "hello";

if (typeof value === "string") {
  console.log(value.toUpperCase());
}
```

So sánh nhanh:

| Kiểu      | Có thể gán mọi thứ? | Có thể dùng trực tiếp?    | Độ an toàn |
|-----------|---------------------|---------------------------|------------|
| `any`     | Có                  | Có                        | Thấp       |
| `unknown` | Có                  | Không, phải kiểm tra kiểu | Cao hơn    |

---

## 13.4. `never` - không bao giờ trả về kết quả

`never` dùng cho function không bao giờ kết thúc bình thường.

Ví dụ function luôn ném lỗi:

```ts
function throwError(): never {
  throw new Error("Lỗi hệ thống!");
}
```

Ví dụ vòng lặp vô hạn:

```ts
function infiniteLoop(): never {
  while (true) {
    console.log("Running...");
  }
}
```

---

# 14. Enum và Tuple

## 14.1. Enum - tập hợp hằng số

`enum` dùng để nhóm các trạng thái/hằng số liên quan lại với nhau.

Ví dụ:

```ts
enum Status {
  Pending,
  Success,
  Failed,
}

let currentStatus: Status = Status.Success;
```

Code trên dễ đọc hơn so với việc dùng số hoặc chuỗi rời rạc.

Ví dụ thực tế:

```ts
enum OrderStatus {
  Pending = "PENDING",
  Shipping = "SHIPPING",
  Completed = "COMPLETED",
  Cancelled = "CANCELLED",
}

const status: OrderStatus = OrderStatus.Shipping;
```

Lợi ích:

- Tránh viết sai chuỗi.
- Code có ý nghĩa hơn.
- Dễ quản lý danh sách trạng thái.

---

## 14.2. Tuple - mảng cố định

`Tuple` là mảng bị cố định số lượng phần tử và kiểu dữ liệu ở từng vị trí.

Ví dụ:

```ts
let point: [number, number] = [10, 20];
```

Mảng trên bắt buộc có đúng 2 phần tử, cả 2 đều là number.

Sai số lượng phần tử:

```ts
point = [10, 20, 30]; // Error
```

Sai kiểu dữ liệu:

```ts
point = [10, "20"]; // Error
```

Ví dụ tuple thường gặp:

```ts
let userInfo: [number, string, boolean] = [1, "Huy", true];
```

Ý nghĩa:

- Vị trí 0: `id` kiểu number.
- Vị trí 1: `name` kiểu string.
- Vị trí 2: `isActive` kiểu boolean.

---

# 15. Lập trình hướng đối tượng OOP

## 15.1. OOP là gì?

OOP là viết tắt của **Object-Oriented Programming** - lập trình hướng đối tượng.

Đây là mô hình lập trình tổ chức code thành các **đối tượng** mô phỏng thực thể ngoài đời thực.

Ví dụ thực thể ngoài đời:

- User
- Product
- Student
- Teacher
- Animal
- Car

Mỗi đối tượng thường có:

| Thành phần  | Ý nghĩa            | Ví dụ với `User`                         |
|-------------|--------------------|------------------------------------------|
| Thuộc tính  | Dữ liệu/trạng thái | `name`, `email`, `age`                   |
| Phương thức | Hành vi/logic      | `login()`, `logout()`, `updateProfile()` |

Lợi ích của OOP:

- Code dễ tổ chức.
- Dễ bảo trì.
- Dễ mở rộng.
- Tái sử dụng code tốt hơn.
- Phù hợp với dự án lớn.

---

# 16. Class và Object

## 16.1. Class là gì?

`class` là bản thiết kế dùng để tạo ra object.

Ví dụ:

```ts
class Animal {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  speak(): void {
    console.log(`${this.name} makes a sound`);
  }
}

const dog = new Animal("Dog");
dog.speak();
```

Trong đó:

| Thành phần          | Ý nghĩa                                       |
|---------------------|-----------------------------------------------|
| `class Animal`      | Tạo class tên Animal                          |
| `name`              | Thuộc tính của class                          |
| `constructor`       | Hàm khởi tạo, chạy khi tạo object mới         |
| `this.name`         | Trỏ tới thuộc tính `name` của object hiện tại |
| `speak()`           | Phương thức của class                         |
| `new Animal("Dog")` | Tạo object từ class Animal                    |

---

## 16.2. Constructor

`constructor` dùng để gán giá trị ban đầu cho object.

```ts
class User {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}

const user = new User("Huy", 20);
```

Khi gọi `new User("Huy", 20)`, constructor sẽ chạy và gán:

```ts
this.name = "Huy";
this.age = 20;
```

---

# 17. Access Modifier

## 17.1. Access Modifier là gì?

Access Modifier là từ khóa kiểm soát quyền truy cập vào thuộc tính hoặc phương thức trong class.

TypeScript có 3 modifier chính:

| Modifier    | Ý nghĩa                                           |
|-------------|---------------------------------------------------|
| `public`    | Truy cập được ở mọi nơi. Đây là mặc định          |
| `private`   | Chỉ truy cập được bên trong chính class đó        |
| `protected` | Truy cập được trong class đó và class con kế thừa |

---

## 17.2. `public`

```ts
class User {
  public name: string;

  constructor(name: string) {
    this.name = name;
  }
}

const user = new User("Huy");
console.log(user.name); // OK
```

Nếu không ghi `public`, TypeScript cũng hiểu mặc định là public.

```ts
class User {
  name: string; // public mặc định
}
```

---

## 17.3. `private`

```ts
class User {
  private password: string;

  constructor(password: string) {
    this.password = password;
  }

  checkPassword(input: string): boolean {
    return this.password === input;
  }
}

const user = new User("123456");

console.log(user.password); // Error
console.log(user.checkPassword("123456")); // OK
```

`private` giúp che giấu dữ liệu nhạy cảm, không cho bên ngoài truy cập trực tiếp.

---

## 17.4. `protected`

```ts
class Animal {
  protected name: string;

  constructor(name: string) {
    this.name = name;
  }
}

class Dog extends Animal {
  bark(): void {
    console.log(`${this.name} is barking`); // OK
  }
}

const dog = new Dog("Buddy");
console.log(dog.name); // Error
```

`protected` khác `private` ở chỗ class con có thể truy cập được.

---

## 17.5. `readonly`

Ngoài 3 access modifier chính, TypeScript còn có `readonly`.

`readonly` cho phép gán giá trị lúc khởi tạo, nhưng không cho sửa sau đó.

```ts
class Person {
  readonly id: number;
  public name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}

const person = new Person(1, "Huy");
person.name = "Nam"; // OK
person.id = 2; // Error
```

---

# 18. Tính đóng gói - Encapsulation

## 18.1. Encapsulation là gì?

Tính đóng gói là việc **không cho bên ngoài truy cập trực tiếp vào dữ liệu nội bộ** của object.

Thay vào đó, mọi thao tác đọc/ghi dữ liệu phải đi qua phương thức trung gian, thường là:

- Getter: lấy dữ liệu.
- Setter: cập nhật dữ liệu sau khi kiểm tra hợp lệ.

Mục đích:

- Bảo vệ dữ liệu.
- Kiểm soát logic cập nhật.
- Tránh dữ liệu sai làm hỏng object.

---

## 18.2. Ví dụ Encapsulation với getter/setter

```ts
class User {
  private _age: number;

  constructor(age: number) {
    this._age = age;
  }

  get age(): number {
    return this._age;
  }

  set age(value: number) {
    if (value > 0 && value < 150) {
      this._age = value;
    } else {
      console.log("Tuổi không hợp lệ");
    }
  }
}

const user = new User(20);

console.log(user.age); // Gọi getter

user.age = 25;  // Gọi setter, hợp lệ
user.age = -10; // Gọi setter, không hợp lệ
```

Nếu để `_age` là public, bên ngoài có thể gán sai:

```ts
user.age = -999;
```

Nhờ setter, ta kiểm soát được dữ liệu trước khi cập nhật.

---

# 19. Tính kế thừa - Inheritance

## 19.1. Inheritance là gì?

Kế thừa cho phép một class mới được tạo dựa trên class đã có.

- Class cha: class gốc.
- Class con: class kế thừa từ class cha.

Class con tự động thừa hưởng thuộc tính và phương thức của class cha.

Ví dụ:

```ts
class Animal {
  public name: string;

  constructor(name: string) {
    this.name = name;
  }

  eat(): void {
    console.log(`${this.name} is eating`);
  }
}

class Dog extends Animal {
  bark(): void {
    console.log(`${this.name} is barking`);
  }
}

const dog = new Dog("Buddy");
dog.eat();
dog.bark();
```

`Dog` kế thừa `name` và `eat()` từ `Animal`, đồng thời có thêm `bark()` riêng.

---

## 19.2. Từ khóa `extends`

`extends` dùng để khai báo class con kế thừa class cha.

```ts
class Dog extends Animal {
  // code riêng của Dog
}
```

Ý nghĩa:

> Dog là một loại Animal.

---

## 19.3. Hàm `super()`

Khi class con có constructor riêng, bắt buộc phải gọi `super()` trước khi dùng `this`.

`super()` dùng để gọi constructor của class cha.

```ts
class Parent {
  public name: string;

  constructor(name: string) {
    this.name = name;
  }
}

class Children extends Parent {
  public age: number;

  constructor(name: string, age: number) {
    super(name); // Gọi constructor của Parent
    this.age = age;
  }
}

const child = new Children("Huy", 20);
```

Nếu quên `super(name)`, TypeScript sẽ báo lỗi.

---

# 20. Tính đa hình - Polymorphism

## 20.1. Polymorphism là gì?

Đa hình cho phép các class con dùng chung tên phương thức nhưng có cách triển khai khác nhau.

Nói đơn giản:

> Cùng một hành động, nhưng mỗi đối tượng có cách thực hiện riêng.

Ví dụ:

```ts
class Vehicle {
  move(): void {
    console.log("Vehicle is moving");
  }
}

class Car extends Vehicle {
  move(): void {
    console.log("Chiếc ô tô đang chạy");
  }
}

class Bird extends Vehicle {
  move(): void {
    console.log("Con chim đang bay");
  }
}

const car = new Car();
const bird = new Bird();

car.move();  // Chiếc ô tô đang chạy
bird.move(); // Con chim đang bay
```

Ở đây `Car` và `Bird` đều có method `move()`, nhưng hành vi khác nhau.

---

## 20.2. Method Overriding

Khi class con viết lại phương thức của class cha, đó gọi là **override**.

```ts
class Animal {
  speak(): void {
    console.log("Animal makes a sound");
  }
}

class Dog extends Animal {
  speak(): void {
    console.log("Dog barks");
  }
}
```

Lưu ý:

- Tên method giống class cha.
- Class con tự định nghĩa logic mới.
- Giúp hành vi phù hợp hơn với từng class con.

---

# 21. Abstract Class

## 21.1. Abstract Class là gì?

`abstract class` là class trừu tượng, đóng vai trò như một khuôn mẫu cấp cao.

Đặc điểm:

- Không thể tạo object trực tiếp bằng `new`.
- Có thể chứa method bình thường.
- Có thể chứa abstract method.
- Class con kế thừa phải triển khai abstract method.

Ví dụ:

```ts
abstract class Shape {
  abstract getArea(): number;

  display(): void {
    console.log(`Diện tích: ${this.getArea()}`);
  }
}
```

Không thể làm như sau:

```ts
const shape = new Shape(); // Error
```

Vì `Shape` là abstract class.

---

## 21.2. Abstract Method

Abstract Method là method chỉ khai báo tên hàm, tham số và kiểu trả về, không viết phần thân.

Cú pháp:

```ts
abstract class ClassName {
  abstract methodName(params: Type): ReturnType;
}
```

Lưu ý:

- Không có `{}`.
- Không có phần thân function.
- Class con bắt buộc phải triển khai.

Ví dụ đầy đủ:

```ts
abstract class Shape {
  abstract getArea(): number;

  display(): void {
    console.log(`Diện tích: ${this.getArea()}`);
  }
}

class Rectangle extends Shape {
  constructor(private width: number, private height: number) {
    super();
  }

  getArea(): number {
    return this.width * this.height;
  }
}

class Circle extends Shape {
  constructor(private radius: number) {
    super();
  }

  getArea(): number {
    return Math.PI * this.radius * this.radius;
  }
}

const rectangle = new Rectangle(10, 5);
rectangle.display();

const circle = new Circle(3);
circle.display();
```

---

# 22. Generic Type

## 22.1. Generic là gì?

Generic là tính năng cho phép khai báo **tham số kiểu** cho function, class hoặc interface.

Generic giúp code:

- Tái sử dụng với nhiều kiểu dữ liệu.
- Vẫn giữ được an toàn kiểu.
- Tránh phải dùng `any`.

Có thể hiểu Generic giống như “biến đại diện cho kiểu dữ liệu”.

Ví dụ ký hiệu thường gặp:

```ts
<T>
```

`T` có thể là `string`, `number`, `boolean`, object, array... tùy lúc sử dụng.

---

# 23. Generic Function

## 23.1. Vấn đề nếu không dùng Generic

Nếu dùng `any`, function có thể nhận mọi kiểu nhưng mất an toàn kiểu.

```ts
function identity(arg: any): any {
  return arg;
}

const result = identity("Hello");
// result có kiểu any, IDE không gợi ý tốt
```

---

## 23.2. Dùng Generic Function

```ts
function identity<T>(arg: T): T {
  return arg;
}

const text = identity<string>("Hello");
const numberValue = identity<number>(42);
```

Ý nghĩa:

- Nếu truyền `string`, function trả về `string`.
- Nếu truyền `number`, function trả về `number`.
- Kiểu đầu vào và kiểu đầu ra được đồng bộ.

Có thể để TypeScript tự suy luận kiểu:

```ts
const text = identity("Hello"); // string
const numberValue = identity(42); // number
```

---

## 23.3. Generic Function với Array

```ts
function getFirstElement<T>(arr: T[]): T {
  return arr[0];
}

const firstNumber = getFirstElement([1, 2, 3]);
const firstName = getFirstElement(["An", "Bình", "Chi"]);
```

Kết quả:

- `firstNumber` là `number`.
- `firstName` là `string`.

---

# 24. Generic Class

## 24.1. Generic Class là gì?

Generic Class là class có thể làm việc với nhiều kiểu dữ liệu khác nhau thông qua type parameter.

Ví dụ:

```ts
class Box<T> {
  private value: T;

  constructor(value: T) {
    this.value = value;
  }

  getValue(): T {
    return this.value;
  }
}

const numberBox = new Box<number>(123);
console.log(numberBox.getValue()); // 123

const stringBox = new Box<string>("Hello");
console.log(stringBox.getValue()); // Hello
```

`Box<number>` chỉ chứa number.

`Box<string>` chỉ chứa string.

---

# 25. Generic Interface

## 25.1. Generic Interface là gì?

Generic Interface là interface có thể làm việc với nhiều kiểu dữ liệu khác nhau bằng type parameter.

Ví dụ:

```ts
interface IBox<T> {
  value: T;
}

const numberBox: IBox<number> = {
  value: 10,
};

const stringBox: IBox<string> = {
  value: "Hello",
};
```

---

## 25.2. Generic Interface với method

```ts
interface IRepository<T> {
  data: T[];
  add(item: T): void;
  getAll(): T[];
}

interface User {
  id: number;
  name: string;
}

class UserRepository implements IRepository<User> {
  data: User[] = [];

  add(item: User): void {
    this.data.push(item);
  }

  getAll(): User[] {
    return this.data;
  }
}

const repo = new UserRepository();

repo.add({ id: 1, name: "Huy" });
console.log(repo.getAll());
```

Ví dụ này thường gặp trong backend, khi xây dựng service/repository xử lý dữ liệu.

---

# 26. Tổng kết kiến thức cần nhớ

## 26.1. TypeScript Core

- TypeScript là phiên bản mở rộng của JavaScript, có thêm hệ thống kiểu dữ liệu.
- TypeScript giúp phát hiện lỗi ở compile-time thay vì runtime.
- Code TypeScript cần được compile sang JavaScript bằng `tsc`.
- Nên bật `strict: true` để kiểm tra kiểu chặt chẽ hơn.

---

## 26.2. Kiểu dữ liệu

| Kiểu           | Ý nghĩa                | Ví dụ                           |
|----------------|------------------------|---------------------------------|
| `string`       | Chuỗi                  | `let name: string = "Huy"`      |
| `number`       | Số                     | `let age: number = 20`          |
| `boolean`      | Đúng/sai               | `let isActive: boolean = true`  |
| `array`        | Mảng cùng kiểu         | `let nums: number[] = [1, 2]`   |
| `object`       | Đối tượng              | `{ name: string; age: number }` |
| `union`        | Một trong nhiều kiểu   | `string | number`               |
| `intersection` | Gộp nhiều kiểu         | `A & B`                         |
| `enum`         | Tập hợp hằng số        | `enum Status { Pending }`       |
| `tuple`        | Mảng cố định vị trí    | `[number, string]`              |
| `void`         | Không trả về giá trị   | `function log(): void`          |
| `any`          | Bỏ qua kiểm tra kiểu   | `let value: any`                |
| `unknown`      | An toàn hơn any        | `let value: unknown`            |
| `never`        | Không bao giờ kết thúc | `throw new Error()`             |

---

## 26.3. OOP

| Khái niệm       | Ý nghĩa ngắn gọn                             |
|-----------------|----------------------------------------------|
| Class           | Bản thiết kế tạo object                      |
| Object          | Thực thể được tạo từ class                   |
| Constructor     | Hàm khởi tạo object                          |
| Access Modifier | Kiểm soát quyền truy cập                     |
| Encapsulation   | Đóng gói dữ liệu, truy cập qua getter/setter |
| Inheritance     | Class con kế thừa class cha                  |
| Polymorphism    | Cùng method, hành vi khác nhau               |
| Abstract Class  | Class khuôn mẫu, không khởi tạo trực tiếp    |
| Abstract Method | Method bắt buộc class con phải triển khai    |

---

## 26.4. Generic

Generic giúp viết code linh hoạt mà vẫn an toàn kiểu.

Dùng được với:

- Function
- Class
- Interface

Ví dụ quan trọng:

```ts
function identity<T>(arg: T): T {
  return arg;
}
```

---

# 27. Lỗi thường gặp

## 27.1. Gán sai kiểu dữ liệu

```ts
let age: number = 20;
age = "20"; // Error
```

Cách sửa:

```ts
age = 20;
```

---

## 27.2. Thêm thuộc tính không có trong object type

```ts
let user: { name: string } = {
  name: "Huy",
};

user.age = 20; // Error
```

Cách sửa:

```ts
let user: { name: string; age?: number } = {
  name: "Huy",
};

user.age = 20;
```

---

## 27.3. Quên gọi `super()` trong class con

```ts
class Parent {
  constructor(public name: string) {}
}

class Child extends Parent {
  constructor(name: string, public age: number) {
    this.age = age; // Error
  }
}
```

Cách sửa:

```ts
class Child extends Parent {
  constructor(name: string, public age: number) {
    super(name);
  }
}
```

---

## 27.4. Lạm dụng `any`

Không nên viết:

```ts
let data: any;
```

Nên ưu tiên:

```ts
let data: unknown;
```

Hoặc định nghĩa type/interface rõ ràng:

```ts
interface ApiResponse {
  status: number;
  message: string;
}

let data: ApiResponse;
```

---

# 28. Checklist ôn tập

Bạn đã hiểu bài nếu có thể tự trả lời các câu hỏi sau:

- TypeScript khác JavaScript ở điểm nào?
- Vì sao TypeScript giúp bắt lỗi sớm hơn?
- `tsc` dùng để làm gì?
- `tsconfig.json` dùng để làm gì?
- Khác nhau giữa `any` và `unknown` là gì?
- Khi nào nên dùng `interface`?
- Khi nào nên dùng `type alias`?
- `Union` khác `Intersection` như thế nào?
- `Enum` dùng để giải quyết vấn đề gì?
- `Tuple` khác Array bình thường ở đâu?
- `public`, `private`, `protected` khác nhau thế nào?
- Vì sao cần getter/setter trong Encapsulation?
- `extends` và `super()` dùng để làm gì?
- Polymorphism là gì?
- Abstract class có tạo object trực tiếp được không?
- Generic giúp giải quyết vấn đề gì?

---

# 29. Bài tập tự luyện

## Bài 1: Khai báo kiểu dữ liệu cơ bản

Tạo các biến sau bằng TypeScript:

- `username`: string
- `age`: number
- `isStudent`: boolean
- `skills`: array string

---

## Bài 2: Interface User

Tạo interface `User` gồm:

- `id`: number
- `name`: string
- `email`: string
- `isActive`: boolean

Sau đó tạo một object `user` theo interface đó.

---

## Bài 3: Union Type

Tạo type `ID` có thể là `string` hoặc `number`.

Viết function `printId(id: ID)` để in ra ID.

Nếu ID là string thì in chữ hoa.

Nếu ID là number thì chuyển thành string rồi in ra.

---

## Bài 4: Enum OrderStatus

Tạo enum `OrderStatus` gồm:

- `Pending`
- `Shipping`
- `Completed`
- `Cancelled`

Viết function nhận vào trạng thái đơn hàng và in ra message phù hợp.

---

## Bài 5: Class Product

Tạo class `Product` gồm:

- `id`: readonly number
- `name`: string
- `price`: private number

Yêu cầu:

- Dùng constructor để khởi tạo.
- Viết getter lấy price.
- Viết setter cập nhật price, chỉ cho phép price > 0.

---

## Bài 6: Inheritance

Tạo class cha `Animal` gồm:

- `name`
- method `speak()`

Tạo class con `Dog` kế thừa `Animal`, override `speak()` để in ra:

```text
Dog is barking
```

---

## Bài 7: Abstract Class

Tạo abstract class `Shape` gồm abstract method:

```ts
getArea(): number;
```

Tạo 2 class con:

- `Rectangle`
- `Circle`

Mỗi class tự triển khai `getArea()`.

---

## Bài 8: Generic Function

Viết function generic `getFirstElement<T>(arr: T[]): T` trả về phần tử đầu tiên của mảng.

Test với:

- Mảng number
- Mảng string
- Mảng object

---

# 30. Ghi nhớ nhanh

```text
TypeScript = JavaScript + Type System
```

```text
Union: A hoặc B
Intersection: A và B
```

```text
Interface: mô tả cấu trúc object/class
Type Alias: đặt tên cho kiểu dữ liệu, mạnh với union/tuple/primitive
```

```text
private: chỉ trong class
protected: trong class và class con
public: mọi nơi
```

```text
Generic: viết code tái sử dụng nhưng vẫn giữ đúng kiểu dữ liệu
```

---

# 31. Mini cheat sheet

```ts
// Basic types
let nameUser: string = "Huy";
let age: number = 20;
let isActive: boolean = true;

// Array
let numbers: number[] = [1, 2, 3];
let names: Array<string> = ["An", "Bình"];

// Object type
let user: { name: string; age: number } = {
  name: "Huy",
  age: 20,
};

// Interface
interface Person {
  name: string;
  age: number;
}

// Type Alias
type ID = string | number;

// Union
let userId: string | number = 1;

// Intersection
type HasName = { name: string };
type HasAge = { age: number };
type FullPerson = HasName & HasAge;

// Enum
enum Status {
  Pending,
  Success,
  Failed,
}

// Tuple
let point: [number, number] = [10, 20];

// Function
function sum(a: number, b: number): number {
  return a + b;
}

// Class
class Animal {
  constructor(public name: string) {}

  speak(): void {
    console.log(`${this.name} makes a sound`);
  }
}

// Generic
function identity<T>(arg: T): T {
  return arg;
}
```
