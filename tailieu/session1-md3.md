# Session 01 - React Fundamentals, Components, Props, State

> Tài liệu tổng hợp chi tiết từ PDF **Session 01: React Fundamentals, Components, Props, State** của Rikkei Academy.
>
> Nội dung được hệ thống lại theo hướng dễ học, bổ sung giải thích và viết lại các ví dụ mã nguồn cho rõ ràng. Một số API cũ xuất hiện trong slide được ghi chú riêng để tránh áp dụng nhầm vào dự án React hiện đại.

---

## Mục lục

1. [Mục tiêu bài học](#1-mục-tiêu-bài-học)
2. [Tổng quan về ReactJS](#2-tổng-quan-về-reactjs)
3. [Khởi tạo dự án React với Vite](#3-khởi-tạo-dự-án-react-với-vite)
4. [Các tính năng cốt lõi của ReactJS](#4-các-tính-năng-cốt-lõi-của-reactjs)
5. [JSX](#5-jsx)
6. [React Element](#6-react-element)
7. [Render React Element](#7-render-react-element)
8. [React Component](#8-react-component)
9. [Functional Component và Class Component](#9-functional-component-và-class-component)
10. [Props](#10-props)
11. [State](#11-state)
12. [So sánh Props và State](#12-so-sánh-props-và-state)
13. [Component Life Cycle](#13-component-life-cycle)
14. [Luồng hoạt động tổng thể](#14-luồng-hoạt-động-tổng-thể)
15. [Các lưu ý quan trọng khi học React hiện đại](#15-các-lưu-ý-quan-trọng-khi-học-react-hiện-đại)
16. [Tổng kết kiến thức](#16-tổng-kết-kiến-thức)
17. [Câu hỏi ôn tập](#17-câu-hỏi-ôn-tập)

---

# 1. Mục tiêu bài học

Sau khi hoàn thành bài học, người học cần:

- Biết được tổng quan về ReactJS.
- Hiểu các tính năng quan trọng của ReactJS.
- Hiểu cú pháp của React Element và JSX.
- Hiểu React Component là gì.
- Phân biệt Functional Component và Class Component.
- Biết cách sử dụng Props để truyền dữ liệu.
- Biết cách sử dụng State để quản lý dữ liệu nội bộ.
- Hiểu vòng đời của một Component.

---

# 2. Tổng quan về ReactJS

## 2.1. ReactJS là gì?

ReactJS là một **thư viện JavaScript** được sử dụng để xây dựng giao diện người dùng, đặc biệt là các giao diện có nhiều thành phần tương tác.

React tập trung vào việc chia giao diện thành các **Component** nhỏ, độc lập và có thể tái sử dụng.

Ví dụ, một trang web có thể được tách thành:

```text
App
├── Header
├── Sidebar
├── MainContent
│   ├── ProductList
│   └── Pagination
└── Footer
```

Mỗi phần trong cấu trúc trên có thể được xây dựng thành một Component riêng.

## 2.2. Mục đích sử dụng React

React thường được sử dụng để phát triển:

- Single Page Application - SPA.
- Website có nhiều tương tác.
- Dashboard quản trị.
- Hệ thống thương mại điện tử.
- Ứng dụng quản lý nội bộ.
- Giao diện ứng dụng di động thông qua React Native.

## 2.3. Single Page Application là gì?

Single Page Application là ứng dụng web thường chỉ tải một trang HTML chính. Khi người dùng thao tác, JavaScript sẽ cập nhật nội dung cần thiết mà không phải tải lại toàn bộ trang.

Lợi ích:

- Trải nghiệm người dùng mượt hơn.
- Hạn chế việc tải lại toàn bộ trang.
- Dễ xây dựng giao diện tương tác cao.

## 2.4. React là thư viện, không phải framework hoàn chỉnh

React chủ yếu xử lý phần giao diện.

Trong một dự án thực tế, React thường được kết hợp với các thư viện khác như:

- React Router để điều hướng.
- Axios hoặc Fetch API để gọi API.
- Redux, Zustand hoặc Context API để quản lý trạng thái toàn cục.
- React Hook Form để quản lý biểu mẫu.
- Vite để khởi tạo và build dự án.

---

# 3. Khởi tạo dự án React với Vite

## 3.1. Công cụ cần cài đặt

### Node.js

Node.js cung cấp môi trường thực thi JavaScript và đi kèm trình quản lý package npm.

Kiểm tra phiên bản:

```bash
node -v
npm -v
```

### Visual Studio Code

Visual Studio Code là trình soạn thảo mã nguồn thường được sử dụng để phát triển ứng dụng React.

## 3.2. Tạo dự án React với JavaScript

```bash
npm create vite@latest my-react-app -- --template react
```

Di chuyển vào thư mục dự án:

```bash
cd my-react-app
```

Cài đặt thư viện:

```bash
npm install
```

Khởi chạy dự án:

```bash
npm run dev
```

## 3.3. Tạo dự án React với TypeScript

```bash
npm create vite@latest my-react-app -- --template react-ts
```

Sau đó:

```bash
cd my-react-app
npm install
npm run dev
```

## 3.4. Ý nghĩa các lệnh

| Lệnh | Ý nghĩa |
|---|---|
| `npm create vite@latest` | Chạy công cụ tạo dự án Vite mới |
| `my-react-app` | Tên thư mục dự án |
| `--template react` | Dùng template React + JavaScript |
| `--template react-ts` | Dùng template React + TypeScript |
| `npm install` | Cài các package được khai báo trong `package.json` |
| `npm run dev` | Khởi động development server |

---

# 4. Các tính năng cốt lõi của ReactJS

Theo nội dung bài học, React có các đặc điểm quan trọng sau:

1. JSX.
2. Component.
3. One-way Data Binding.
4. Virtual DOM.
5. Simplicity.
6. Performance.

---

## 4.1. JSX

JSX cho phép viết cấu trúc giống HTML bên trong JavaScript.

Ví dụ:

```tsx
const element = <h1>Hello React</h1>;
```

JSX giúp:

- Dễ đọc cấu trúc giao diện.
- Dễ hình dung UI sẽ được hiển thị như thế nào.
- Cho phép đặt logic hiển thị gần phần giao diện liên quan.
- Nhúng biểu thức JavaScript bằng cặp dấu ngoặc nhọn `{}`.

Ví dụ:

```tsx
const username = "Huy";

const element = <h1>Hello, {username}</h1>;
```

---

## 4.2. Component-Based

React xây dựng giao diện theo mô hình Component.

Mỗi Component:

- Quản lý một phần giao diện cụ thể.
- Có thể chứa logic riêng.
- Có thể nhận dữ liệu từ Component cha.
- Có thể tái sử dụng ở nhiều vị trí.
- Có thể kết hợp với các Component khác để tạo UI lớn.

Ví dụ:

```tsx
function Button() {
  return <button>Submit</button>;
}
```

Có thể sử dụng lại Component nhiều lần:

```tsx
function App() {
  return (
    <div>
      <Button />
      <Button />
      <Button />
    </div>
  );
}
```

---

## 4.3. One-way Data Binding

One-way Data Binding nghĩa là dữ liệu thường được truyền theo một chiều:

```text
Component cha → Component con
```

Dữ liệu được truyền qua `props`.

Ví dụ:

```tsx
function Parent() {
  const username = "Huy";

  return <Child name={username} />;
}

function Child(props: { name: string }) {
  return <h1>Hello {props.name}</h1>;
}
```

Component con không nên trực tiếp thay đổi dữ liệu thuộc quyền quản lý của Component cha.

### Lợi ích của dữ liệu một chiều

- Dễ xác định dữ liệu bắt nguồn từ đâu.
- Dễ debug.
- Luồng cập nhật rõ ràng.
- Hạn chế các thay đổi ngoài ý muốn.
- Dễ mở rộng ứng dụng lớn.

Một nguyên tắc quan trọng:

> State được quản lý ở đâu thì nơi đó chịu trách nhiệm cập nhật State.

Nếu Component con cần yêu cầu Component cha thay đổi dữ liệu, Component cha có thể truyền xuống một hàm callback.

```tsx
function Parent() {
  const handleDelete = () => {
    console.log("Delete item");
  };

  return <Child onDelete={handleDelete} />;
}

function Child(props: { onDelete: () => void }) {
  return <button onClick={props.onDelete}>Delete</button>;
}
```

---

## 4.4. Virtual DOM

Virtual DOM là một biểu diễn JavaScript của giao diện DOM.

Có thể hiểu đơn giản:

```text
UI được mô tả bằng JavaScript Object
              ↓
React so sánh phiên bản trước và phiên bản mới
              ↓
Chỉ cập nhật phần DOM thật cần thay đổi
```

### Lợi ích

- Giảm thao tác trực tiếp lên DOM thật.
- Hạn chế cập nhật dư thừa.
- Chỉ cập nhật phần giao diện đã thay đổi.
- Giúp mã giao diện có tính khai báo rõ ràng.

### Ví dụ tư duy

Giả sử giao diện ban đầu là:

```html
<h1>Count: 0</h1>
<button>Increase</button>
```

Sau khi tăng giá trị:

```html
<h1>Count: 1</h1>
<button>Increase</button>
```

React xác định rằng chỉ nội dung của thẻ `h1` thay đổi. Phần `button` không cần được tạo lại trong DOM thật.

---

## 4.5. Simplicity

React hướng tới việc đơn giản hóa quá trình xây dựng và quản lý giao diện.

Tính đơn giản được tạo nên bởi:

- Component-Based Architecture.
- JSX.
- One-way Data Flow.
- Hooks.
- Virtual DOM.

React cho phép người học bắt đầu từ những khái niệm nhỏ:

```text
React Element → Component → Props → State → Life Cycle
```

Sau đó mới mở rộng sang:

```text
Hooks → Routing → API → Global State → Testing
```

---

## 4.6. Performance

Theo bài học, React tập trung vào ba cơ chế chính:

- Virtual DOM.
- Diffing Algorithm.
- Selective Rendering.

### Diffing Algorithm

Diffing là quá trình React so sánh cây giao diện cũ với cây giao diện mới để tìm ra sự khác biệt.

### Selective Rendering

React chỉ cập nhật các phần giao diện cần thay đổi thay vì thay lại toàn bộ trang.

Lưu ý: Virtual DOM không tự động bảo đảm mọi ứng dụng React đều nhanh. Hiệu suất còn phụ thuộc vào:

- Cách chia Component.
- Cách quản lý State.
- Số lần render.
- Cách xử lý danh sách và thuộc tính `key`.
- Các phép tính nặng trong quá trình render.

---

# 5. JSX

## 5.1. JSX là gì?

JSX là cú pháp mở rộng của JavaScript, thường được mô tả là sự kết hợp giữa JavaScript và XML.

JSX không phải HTML thật. JSX được công cụ build chuyển đổi thành các lệnh tạo React Element.

```tsx
const element = <h1>Hello React</h1>;
```

Có thể được chuyển thành dạng tương đương:

```tsx
const element = React.createElement("h1", null, "Hello React");
```

## 5.2. Nhúng biểu thức JavaScript

Sử dụng `{}` để nhúng biểu thức JavaScript.

```tsx
const price = 100;
const quantity = 2;

const element = <p>Total: {price * quantity}</p>;
```

Có thể nhúng:

- Biến.
- Phép toán.
- Lời gọi hàm trả về giá trị.
- Toán tử ba ngôi.
- Phương thức mảng như `map()`.

Ví dụ:

```tsx
const isLoggedIn = true;

const element = (
  <div>{isLoggedIn ? <h1>Welcome</h1> : <h1>Please login</h1>}</div>
);
```

## 5.3. Thuộc tính JSX sử dụng camelCase

Một số thuộc tính JSX khác với HTML:

| HTML | JSX |
|---|---|
| `class` | `className` |
| `for` | `htmlFor` |
| `onclick` | `onClick` |
| `tabindex` | `tabIndex` |

Ví dụ:

```tsx
<label htmlFor="email">Email</label>
<input id="email" className="form-control" />
```

## 5.4. JSX cần một phần tử cha

Sai:

```tsx
return (
  <h1>Title</h1>
  <p>Description</p>
);
```

Đúng:

```tsx
return (
  <div>
    <h1>Title</h1>
    <p>Description</p>
  </div>
);
```

Hoặc dùng Fragment:

```tsx
return (
  <>
    <h1>Title</h1>
    <p>Description</p>
  </>
);
```

## 5.5. Đóng tất cả thẻ

Trong JSX, các thẻ phải được đóng đầy đủ.

```tsx
<img src="/logo.png" alt="Logo" />
<input type="text" />
<br />
```

## 5.6. Comment trong JSX

```tsx
return (
  <div>
    {/* Đây là comment trong JSX */}
    <h1>Hello React</h1>
  </div>
);
```

---

# 6. React Element

## 6.1. React Element là gì?

React Element là một đối tượng mô tả giao diện mà React cần hiển thị.

React Element:

- Không phải DOM thật.
- Không phải React Component.
- Không tự chứa State.
- Không có logic vòng đời.
- Là kết quả của JSX hoặc `React.createElement()`.

Ví dụ JSX:

```tsx
const element = <h1>Hello React</h1>;
```

Ví dụ bằng `React.createElement()`:

```tsx
const element = React.createElement("h1", null, "Hello React");
```

## 6.2. Cấu trúc khái niệm

Một React Element có thể được hình dung gần giống:

```ts
{
  type: "h1",
  props: {
    children: "Hello React"
  }
}
```

Trong slide, cấu trúc được minh họa bằng các thành phần:

- `type`: loại thẻ hoặc Component.
- `props`: các thuộc tính truyền vào.
- `children`: nội dung hoặc các phần tử con.

Trong triển khai thực tế của React, `children` nằm trong `props.children` và object có thêm một số trường nội bộ. Không nên phụ thuộc trực tiếp vào cấu trúc nội bộ đó.

## 6.3. React Element có tính immutable

Sau khi được tạo, một React Element không được chỉnh sửa trực tiếp.

Không nên làm:

```tsx
const element = <h1>Hello</h1>;
// Không sửa trực tiếp object element.
```

Khi giao diện cần thay đổi, React tạo mô tả UI mới dựa trên Props hoặc State mới.

```text
State cũ → Element cũ
State mới → Element mới
```

## 6.4. Cú pháp React.createElement

```tsx
React.createElement(type, props, ...children);
```

Trong đó:

- `type`: tên thẻ HTML hoặc Component.
- `props`: object chứa thuộc tính; có thể là `null`.
- `children`: một hoặc nhiều phần tử con.

Ví dụ:

```tsx
const element = React.createElement(
  "section",
  { id: "technologies" },
  "React"
);
```

Biểu diễn JSX tương đương:

```tsx
const element = <section id="technologies">React</section>;
```

## 6.5. React Element và DOM Element

| React Element | DOM Element |
|---|---|
| Là object JavaScript mô tả UI | Là node thật trong trình duyệt |
| Nhẹ và không trực tiếp hiển thị | Được trình duyệt hiển thị |
| Do React tạo và quản lý | Do DOM API quản lý |
| Có thể được tạo bằng JSX | Có thể lấy bằng `document.querySelector()` |

---

# 7. Render React Element

## 7.1. Mục đích của render

Render là quá trình React biến mô tả giao diện thành nội dung được hiển thị trong DOM.

Luồng cơ bản:

```text
JSX
 ↓
React Element
 ↓
React render
 ↓
DOM thật
```

## 7.2. Cách render cũ xuất hiện trong slide

Slide sử dụng cú pháp:

```tsx
ReactDOM.render(element, container);
```

Ví dụ kiểu cũ:

```tsx
ReactDOM.render(element, document.getElementById("root"));
```

## 7.3. Cách render thường dùng với React 18+

```tsx
import React from "react";
import ReactDOM from "react-dom/client";

const element = <h1>Hello React</h1>;

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found");
}

ReactDOM.createRoot(rootElement).render(element);
```

Trong dự án Vite, file `main.tsx` thường có dạng:

```tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found");
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

## 7.4. Ví dụ tạo danh sách bằng React.createElement

```tsx
const items = ["JavaScript", "ES6", "TypeScript"];

const elements = React.createElement(
  "section",
  { id: "technologies" },
  React.createElement("h1", null, "Programming Languages"),
  React.createElement(
    "ul",
    { className: "technologies" },
    items.map((technology, index) =>
      React.createElement("li", { key: index }, technology)
    )
  )
);
```

Dạng JSX dễ đọc hơn:

```tsx
const items = ["JavaScript", "ES6", "TypeScript"];

const elements = (
  <section id="technologies">
    <h1>Programming Languages</h1>

    <ul className="technologies">
      {items.map((technology) => (
        <li key={technology}>{technology}</li>
      ))}
    </ul>
  </section>
);
```

### Lưu ý về `key`

`key` giúp React xác định từng phần tử trong danh sách khi danh sách thay đổi.

Nên dùng giá trị duy nhất và ổn định:

```tsx
<li key={technology.id}>{technology.name}</li>
```

Chỉ nên dùng `index` khi danh sách tĩnh, không thay đổi thứ tự và không thêm/xóa phần tử theo cách có thể gây nhầm lẫn.

---

# 8. React Component

## 8.1. Component là gì?

Component là một khối mã độc lập mô tả một phần giao diện.

Một Component có thể:

- Trả về React Element.
- Nhận dữ liệu qua Props.
- Quản lý State.
- Xử lý sự kiện.
- Chứa hoặc gọi Component khác.
- Được tái sử dụng.

## 8.2. Tại sao cần chia Component?

Khi ứng dụng lớn dần, viết toàn bộ UI trong một file sẽ gây ra:

- Khó đọc.
- Khó tìm lỗi.
- Khó tái sử dụng.
- Khó kiểm thử.
- Khó làm việc nhóm.

Chia Component giúp:

- Tách trách nhiệm.
- Dễ bảo trì.
- Dễ test.
- Dễ mở rộng.
- Dễ tái sử dụng.

## 8.3. Nguyên tắc chia Component

Có thể tách Component khi một phần UI:

- Có trách nhiệm riêng.
- Được sử dụng lặp lại.
- Có logic riêng.
- Quá lớn hoặc khó đọc.
- Cần kiểm thử độc lập.

Ví dụ:

```tsx
function ProductCard() {
  return (
    <article>
      <h2>Laptop</h2>
      <p>20.000.000đ</p>
      <button>Add to cart</button>
    </article>
  );
}
```

## 8.4. Quy tắc đặt tên

Tên Component phải bắt đầu bằng chữ cái viết hoa.

Đúng:

```tsx
function Header() {
  return <header>Header</header>;
}
```

Sai:

```tsx
function header() {
  return <header>Header</header>;
}
```

Trong JSX:

```tsx
<Header />
```

React xem tên viết thường như `header`, `section`, `button` là thẻ HTML. Tên viết hoa được hiểu là Component do lập trình viên định nghĩa.

---

# 9. Functional Component và Class Component

Bài học trình bày hai loại Component:

1. Functional Component.
2. Class Component.

---

## 9.1. Functional Component

Functional Component là một hàm JavaScript trả về React Element.

```tsx
function App() {
  return <h1>Hello React</h1>;
}

export default App;
```

Dạng arrow function:

```tsx
const App = () => {
  return <h1>Hello React</h1>;
};

export default App;
```

### Nhận Props

```tsx
interface WelcomeProps {
  name: string;
}

function Welcome(props: WelcomeProps) {
  return <h1>Hello {props.name}</h1>;
}
```

Có thể destructuring:

```tsx
interface WelcomeProps {
  name: string;
}

function Welcome({ name }: WelcomeProps) {
  return <h1>Hello {name}</h1>;
}
```

### Ghi chú quan trọng

Slide mô tả Functional Component là **Stateless** và không thể cập nhật State. Điều này phản ánh cách phân loại React cũ.

Trong React hiện đại, Functional Component có thể quản lý State và xử lý vòng đời bằng Hooks:

```tsx
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}
```

---

## 9.2. Class Component

Class Component là một class JavaScript kế thừa từ `React.Component`.

```tsx
import React, { Component } from "react";

interface AppProps {}
interface AppState {}

class App extends Component<AppProps, AppState> {
  render() {
    return <h1>Hello React</h1>;
  }
}

export default App;
```

### Các thành phần thường gặp

- `constructor()` để khởi tạo.
- `this.props` để đọc Props.
- `this.state` để đọc State.
- `this.setState()` để cập nhật State.
- `render()` để trả về giao diện.
- Các lifecycle methods để xử lý vòng đời.

## 9.3. So sánh

| Tiêu chí | Functional Component | Class Component |
|---|---|---|
| Bản chất | Hàm JavaScript | Class JavaScript |
| Trả về UI | Trả về JSX/React Element | `render()` trả về JSX |
| Props | Nhận qua tham số | Đọc bằng `this.props` |
| State | Dùng Hooks | Dùng `this.state` |
| Cập nhật State | Hàm setter của Hook | `this.setState()` |
| Life cycle | `useEffect()` và Hooks khác | Lifecycle methods |
| Cú pháp | Gọn hơn | Dài hơn |
| Cách dùng hiện đại | Phổ biến | Chủ yếu gặp trong code cũ |

---

# 10. Props

## 10.1. Props là gì?

`props` là viết tắt của `properties`.

Props được dùng để truyền dữ liệu từ Component cha xuống Component con.

```text
Parent Component
      ↓ props
Child Component
```

Props được truyền tương tự thuộc tính HTML:

```tsx
<Header title="Dashboard" />
```

Trong ví dụ trên:

- `Header` là Component con.
- `title` là tên prop.
- `"Dashboard"` là giá trị prop.

## 10.2. Props là read-only

Component con không được trực tiếp sửa Props.

Không nên:

```tsx
function Child(props: { name: string }) {
  props.name = "New name";

  return <h1>{props.name}</h1>;
}
```

Đúng:

```tsx
function Child(props: { name: string }) {
  return <h1>{props.name}</h1>;
}
```

Nếu cần thay đổi dữ liệu, Component cha phải quản lý việc thay đổi đó.

## 10.3. Truyền Props từ Component cha

Ví dụ dựa trên slide:

```tsx
import React, { Component } from "react";
import Header from "./Header";

interface MyComponentProps {}
interface MyComponentState {}

class MyComponent extends Component<
  MyComponentProps,
  MyComponentState
> {
  render() {
    return (
      <div>
        <h1>Hello</h1>
        <Header id="123" name="Alice" />
      </div>
    );
  }
}

export default MyComponent;
```

## 10.4. Nhận Props trong Class Component

```tsx
import React, { Component } from "react";
import Footer from "./Footer";

interface HeaderProps {
  id: string;
  name: string;
}

interface HeaderState {}

class Header extends Component<HeaderProps, HeaderState> {
  render() {
    return (
      <div>
        <Footer
          id={this.props.id}
          name={this.props.name}
        />
      </div>
    );
  }
}

export default Header;
```

Giá trị `this.props.id` và `this.props.name` được lấy từ dữ liệu mà Component cha truyền vào `Header`.

## 10.5. Đọc Props trong Component con

Ví dụ `Footer` trong slide:

```tsx
import React, { Component } from "react";

interface FooterProps {
  id: string;
  name: string;
}

class Footer extends Component<FooterProps> {
  render() {
    return (
      <div>
        <h1>Welcome: {this.props.name}</h1>
        <h1>Id is: {this.props.id}</h1>
      </div>
    );
  }
}

export default Footer;
```

## 10.6. Phiên bản Functional Component tương đương

```tsx
interface FooterProps {
  id: string;
  name: string;
}

function Footer({ id, name }: FooterProps) {
  return (
    <div>
      <h1>Welcome: {name}</h1>
      <h1>Id is: {id}</h1>
    </div>
  );
}

export default Footer;
```

## 10.7. Truyền nhiều loại dữ liệu qua Props

### Chuỗi

```tsx
<Profile name="Huy" />
```

### Số

```tsx
<Product price={100000} />
```

### Boolean

```tsx
<Button disabled={true} />
```

Có thể viết ngắn:

```tsx
<Button disabled />
```

### Object

```tsx
const user = {
  id: 1,
  name: "Huy",
};

<Profile user={user} />
```

### Mảng

```tsx
const skills = ["JavaScript", "TypeScript", "React"];

<SkillList skills={skills} />
```

### Hàm callback

```tsx
function Parent() {
  const handleClick = () => {
    console.log("Clicked");
  };

  return <Button onClick={handleClick} />;
}
```

## 10.8. `children` là một Prop đặc biệt

```tsx
function Card({ children }: { children: React.ReactNode }) {
  return <div className="card">{children}</div>;
}
```

Sử dụng:

```tsx
<Card>
  <h2>Title</h2>
  <p>Description</p>
</Card>
```

Nội dung nằm giữa thẻ mở và thẻ đóng được truyền vào prop `children`.

---

# 11. State

## 11.1. State là gì?

State là dữ liệu được quản lý bên trong Component.

State thường được sử dụng cho dữ liệu có thể thay đổi trong quá trình người dùng tương tác, ví dụ:

- Số lần nhấn nút.
- Giá trị input.
- Trạng thái mở/đóng modal.
- Danh sách sản phẩm.
- Trạng thái loading.
- Thông báo lỗi.

## 11.2. Đặc điểm của State

- State có thể thay đổi.
- Khi State thay đổi, React render lại Component.
- Mỗi Component có thể có State riêng.
- Không nên cập nhật State trực tiếp.
- Việc cập nhật State cần sử dụng API của React.

## 11.3. State trong Class Component

Ví dụ dựa trên slide:

```tsx
import React, { Component } from "react";

interface MyComponentProps {}

interface MyComponentState {
  id: string;
  name: string;
}

class MyComponent extends Component<
  MyComponentProps,
  MyComponentState
> {
  constructor(props: MyComponentProps) {
    super(props);

    this.state = {
      id: "",
      name: "",
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        id: "456",
        name: "Bob",
      });
    }, 3000);
  }

  render() {
    return (
      <div>
        <h1>Hello {this.state.name}</h1>
        <h2>Your id is: {this.state.id}</h2>
      </div>
    );
  }
}

export default MyComponent;
```

### Quá trình hoạt động

1. Component được khởi tạo.
2. State ban đầu là chuỗi rỗng.
3. `render()` chạy lần đầu.
4. `componentDidMount()` chạy sau khi Component được gắn vào DOM.
5. Sau 3 giây, `this.setState()` cập nhật State.
6. React chạy lại `render()`.
7. Giao diện hiển thị `Bob` và `456`.

## 11.4. Không cập nhật State trực tiếp

Sai:

```tsx
this.state.name = "Bob";
```

Đúng:

```tsx
this.setState({ name: "Bob" });
```

Lý do:

- React cần biết khi nào dữ liệu thay đổi.
- `setState()` đưa thay đổi vào cơ chế cập nhật của React.
- Gán trực tiếp có thể không làm giao diện render lại đúng cách.

## 11.5. State trong Functional Component

```tsx
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  const handleIncrease = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={handleIncrease}>Increase</button>
    </div>
  );
}
```

Trong đó:

```tsx
const [count, setCount] = useState(0);
```

- `count`: giá trị State hiện tại.
- `setCount`: hàm cập nhật State.
- `0`: giá trị ban đầu.

## 11.6. State làm giao diện thay đổi

```tsx
function Toggle() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsOpen(!isOpen)}>
        Toggle
      </button>

      {isOpen && <p>Content is open</p>}
    </div>
  );
}
```

Khi `isOpen` thay đổi, React tính lại JSX và cập nhật UI.

## 11.7. State phải được xem là immutable

Không nên sửa trực tiếp object hoặc array trong State.

Sai:

```tsx
user.name = "Bob";
setUser(user);
```

Đúng:

```tsx
setUser({
  ...user,
  name: "Bob",
});
```

Với mảng:

```tsx
setItems([...items, newItem]);
```

---

# 12. So sánh Props và State

| Tiêu chí | Props | State |
|---|---|---|
| Ý nghĩa | Dữ liệu được truyền vào Component | Dữ liệu nội bộ của Component |
| Nguồn dữ liệu | Thường do Component cha cung cấp | Do Component sở hữu khởi tạo |
| Component hiện tại có sửa trực tiếp không? | Không | Có thể cập nhật qua API của React |
| Cách đọc trong Class Component | `this.props` | `this.state` |
| Cách cập nhật trong Class Component | Cha truyền Props mới | `this.setState()` |
| Cách dùng trong Function Component | Tham số hàm | `useState()` |
| Làm UI render lại không? | Có, khi Props thay đổi | Có, khi State thay đổi |
| Có thể truyền xuống Component con không? | Có | Có, bằng cách truyền State dưới dạng Props |

## 12.1. Mối quan hệ giữa Props và State

Một State của Component cha có thể trở thành Props của Component con.

```tsx
function Parent() {
  const [name, setName] = useState("Alice");

  return <Child name={name} />;
}
```

Trong ví dụ này:

- `name` là State của `Parent`.
- `name` là Props đối với `Child`.

## 12.2. Cách xác định nên dùng Props hay State

Dùng Props khi:

- Dữ liệu do Component khác cung cấp.
- Component chỉ cần hiển thị hoặc sử dụng dữ liệu.
- Muốn tái sử dụng Component với nhiều dữ liệu khác nhau.

Dùng State khi:

- Dữ liệu thay đổi theo tương tác.
- Component là nơi chịu trách nhiệm quản lý dữ liệu.
- Thay đổi dữ liệu cần làm giao diện cập nhật.

## 12.3. Ví dụ kết hợp Props và State

```tsx
interface CounterDisplayProps {
  count: number;
}

function CounterDisplay({ count }: CounterDisplayProps) {
  return <p>Count: {count}</p>;
}

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <CounterDisplay count={count} />
      <button onClick={() => setCount(count + 1)}>
        Increase
      </button>
    </div>
  );
}
```

- `count` là State của `Counter`.
- `count` được truyền thành Props cho `CounterDisplay`.

---

# 13. Component Life Cycle

## 13.1. Life Cycle là gì?

Mỗi Component có một vòng đời từ lúc được tạo, xuất hiện trên giao diện, cập nhật, cho đến khi bị loại bỏ.

Bài học chia vòng đời thành bốn giai đoạn:

1. Initialization.
2. Mounting.
3. Updating.
4. Unmounting.

---

## 13.2. Initialization

Initialization là giai đoạn khởi tạo:

- Props.
- State.
- Các giá trị ban đầu của Component.

Với Class Component, State thường được khởi tạo trong `constructor()`.

```tsx
constructor(props: MyComponentProps) {
  super(props);

  this.state = {
    count: 0,
  };
}
```

---

## 13.3. Mounting

Mounting là giai đoạn Component được tạo và gắn vào DOM.

Sơ đồ trong slide trình bày:

```text
componentWillMount
        ↓
      render
        ↓
componentDidMount
```

Trong đó:

### `render()`

Trả về React Element mô tả giao diện.

```tsx
render() {
  return <h1>Hello React</h1>;
}
```

### `componentDidMount()`

Chạy sau khi Component đã xuất hiện trong DOM.

Thường dùng để:

- Gọi API.
- Khởi tạo timer.
- Đăng ký event listener.
- Tương tác với DOM khi thật sự cần thiết.

```tsx
componentDidMount() {
  console.log("Component mounted");
}
```

### Ghi chú về `componentWillMount()`

`componentWillMount()` là lifecycle cũ và không nên dùng trong code React hiện đại. Trong nhiều tài liệu cũ, nó vẫn xuất hiện trong sơ đồ vòng đời.

---

## 13.4. Updating

Updating xảy ra khi:

- Props thay đổi.
- State thay đổi.
- Component cha render lại và truyền dữ liệu mới.

Sơ đồ slide cho thấy các phương thức cũ như:

- `componentWillReceiveProps()`.
- `shouldComponentUpdate()`.
- `componentWillUpdate()`.
- `render()`.
- `componentDidUpdate()`.

### `shouldComponentUpdate()`

Cho phép quyết định Component có cần render lại hay không.

```tsx
shouldComponentUpdate(
  nextProps: MyProps,
  nextState: MyState
) {
  return nextState.count !== this.state.count;
}
```

Nếu trả về `false`, React bỏ qua quá trình render cho lần cập nhật đó.

### `componentDidUpdate()`

Chạy sau khi Component đã cập nhật.

```tsx
componentDidUpdate(
  prevProps: MyProps,
  prevState: MyState
) {
  if (prevState.count !== this.state.count) {
    console.log("Count changed");
  }
}
```

Phải kiểm tra giá trị cũ và mới trước khi gọi `setState()` trong `componentDidUpdate()`, nếu không có thể gây vòng lặp cập nhật vô hạn.

### Các lifecycle cũ

Các phương thức sau thuộc nhóm lifecycle cũ và không nên dùng trong code mới:

```text
componentWillReceiveProps
componentWillUpdate
componentWillMount
```

---

## 13.5. Unmounting

Unmounting là giai đoạn Component bị loại khỏi DOM.

Class Component sử dụng:

```tsx
componentWillUnmount() {
  console.log("Component will unmount");
}
```

Thường dùng để dọn dẹp:

- Timer.
- Event listener.
- Subscription.
- WebSocket.
- Request hoặc tác vụ không còn cần thiết.

Ví dụ:

```tsx
class Clock extends Component {
  private timerId?: number;

  componentDidMount() {
    this.timerId = window.setInterval(() => {
      console.log("Tick");
    }, 1000);
  }

  componentWillUnmount() {
    if (this.timerId !== undefined) {
      window.clearInterval(this.timerId);
    }
  }

  render() {
    return <h1>Clock</h1>;
  }
}
```

---

## 13.6. Life Cycle trong Functional Component

Functional Component dùng `useEffect()` để xử lý các side effect liên quan đến vòng đời.

### Chạy sau lần render đầu tiên

```tsx
import { useEffect } from "react";

function App() {
  useEffect(() => {
    console.log("Mounted");
  }, []);

  return <h1>Hello</h1>;
}
```

### Chạy khi dependency thay đổi

```tsx
useEffect(() => {
  console.log("Count changed");
}, [count]);
```

### Cleanup khi unmount

```tsx
useEffect(() => {
  const timerId = window.setInterval(() => {
    console.log("Tick");
  }, 1000);

  return () => {
    window.clearInterval(timerId);
  };
}, []);
```

Có thể liên hệ khái niệm:

| Class Component | Functional Component |
|---|---|
| `componentDidMount()` | `useEffect(..., [])` |
| `componentDidUpdate()` | `useEffect(..., [dependencies])` |
| `componentWillUnmount()` | Cleanup function của `useEffect()` |

Đây chỉ là cách liên hệ để dễ học; `useEffect()` không phải bản sao hoàn toàn của từng lifecycle method.

---

# 14. Luồng hoạt động tổng thể

Một ứng dụng React cơ bản hoạt động theo luồng:

```text
1. Vite tải entry file, thường là main.tsx
2. React tạo root
3. React render Component App
4. App gọi các Component con
5. Mỗi Component trả về JSX
6. JSX được chuyển thành React Element
7. React xây dựng cây giao diện
8. React cập nhật DOM thật
9. Người dùng tương tác
10. Event handler cập nhật State
11. Component render lại
12. React so sánh giao diện cũ và mới
13. React cập nhật phần DOM cần thiết
```

Ví dụ hoàn chỉnh:

```tsx
import { useState } from "react";

interface CounterDisplayProps {
  value: number;
}

function CounterDisplay({ value }: CounterDisplayProps) {
  return <h2>Count: {value}</h2>;
}

function App() {
  const [count, setCount] = useState(0);

  const handleIncrease = () => {
    setCount((currentCount) => currentCount + 1);
  };

  return (
    <main>
      <h1>React Counter</h1>
      <CounterDisplay value={count} />
      <button onClick={handleIncrease}>Increase</button>
    </main>
  );
}

export default App;
```

Phân tích:

- `App` là Functional Component.
- `count` là State của `App`.
- `setCount` cập nhật State.
- `CounterDisplay` nhận `value` qua Props.
- Khi nhấn nút, State thay đổi.
- `App` render lại.
- Props mới được truyền cho `CounterDisplay`.
- React cập nhật nội dung `Count` trên giao diện.

---

# 15. Các lưu ý quan trọng khi học React hiện đại

## 15.1. Functional Component không còn đồng nghĩa với Stateless

Slide sử dụng cách phân loại cũ:

```text
Functional Component = Stateless
Class Component = Stateful
```

Sau khi Hooks được giới thiệu, Functional Component có thể quản lý State bằng `useState()` và xử lý side effect bằng `useEffect()`.

Cách hiểu phù hợp hơn:

```text
Functional Component = Component dạng hàm
Class Component = Component dạng class
```

Cả hai đều có thể làm việc với State, nhưng cách viết khác nhau.

## 15.2. `ReactDOM.render()` là API cũ

Slide dùng:

```tsx
ReactDOM.render(element, container);
```

Dự án React hiện đại thường dùng:

```tsx
createRoot(container).render(element);
```

## 15.3. Một số lifecycle methods trong sơ đồ đã lỗi thời

Không nên dùng trong code mới:

- `componentWillMount()`.
- `componentWillReceiveProps()`.
- `componentWillUpdate()`.

Nên tập trung học:

- `componentDidMount()`.
- `componentDidUpdate()`.
- `componentWillUnmount()`.
- `shouldComponentUpdate()` khi làm việc với Class Component.
- `useEffect()` khi làm việc với Functional Component.

## 15.4. React Element không có State

State thuộc về Component, không thuộc về React Element.

```text
Component + Props + State
          ↓ render
     React Element
          ↓
          UI
```

## 15.5. Không gọi cập nhật State trực tiếp trong `render()`

Sai:

```tsx
render() {
  this.setState({ count: 1 });
  return <h1>{this.state.count}</h1>;
}
```

Điều này có thể tạo vòng lặp:

```text
render → setState → render → setState → ...
```

## 15.6. Render nên gần với pure function

Giao diện nên được xác định dựa trên Props và State hiện tại.

```text
UI = f(props, state)
```

Không nên thực hiện tác vụ side effect trực tiếp trong phần render, như:

- Gọi API.
- Thiết lập timer.
- Thêm event listener.
- Ghi dữ liệu vào Local Storage không có kiểm soát.

Các tác vụ đó nên đặt trong lifecycle phù hợp hoặc `useEffect()`.

---

# 16. Tổng kết kiến thức

## 16.1. ReactJS

- Là thư viện JavaScript để xây dựng UI.
- Xây dựng giao diện từ các Component có thể tái sử dụng.
- Thường được dùng cho SPA và giao diện tương tác.

## 16.2. JSX

- Là cú pháp mở rộng của JavaScript.
- Cho phép viết cấu trúc giống HTML trong JavaScript.
- Có thể nhúng biểu thức bằng `{}`.
- Thuộc tính thường viết theo camelCase.

## 16.3. React Element

- Là object mô tả UI.
- Không phải DOM thật.
- Không phải Component.
- Không có State.
- Có thể được tạo từ JSX hoặc `React.createElement()`.

## 16.4. Component

- Là khối mã độc lập, có thể tái sử dụng.
- Có hai cách viết chính: Function và Class.
- Component có thể nhận Props và quản lý State.

## 16.5. Props

- Truyền dữ liệu từ cha xuống con.
- Có tính read-only đối với Component nhận.
- Có thể truyền chuỗi, số, boolean, object, array, hàm và JSX.

## 16.6. State

- Lưu dữ liệu thay đổi bên trong Component.
- State thay đổi làm Component render lại.
- Class Component cập nhật bằng `setState()`.
- Functional Component thường cập nhật bằng hàm setter của `useState()`.

## 16.7. Life Cycle

Bốn giai đoạn chính:

```text
Initialization → Mounting → Updating → Unmounting
```

Các phương thức quan trọng trong Class Component:

```text
componentDidMount
componentDidUpdate
componentWillUnmount
```

Functional Component thường sử dụng `useEffect()` cho side effect và cleanup.

---

# 17. Câu hỏi ôn tập

## Câu 1

ReactJS là gì?

**Trả lời:** ReactJS là một thư viện JavaScript dùng để xây dựng giao diện người dùng từ các Component có thể tái sử dụng.

## Câu 2

Bản chất của React Element là gì?

**Trả lời:** React Element là một object JavaScript mô tả cấu trúc UI, không phải thẻ DOM thật và không phải Component.

## Câu 3

JSX được chuyển thành gì?

**Trả lời:** JSX được chuyển thành lời gọi tạo React Element, chẳng hạn `React.createElement()` hoặc dạng runtime tương đương do công cụ build xử lý.

## Câu 4

Kết quả khái niệm của đoạn code sau là gì?

```tsx
const element = React.createElement(
  "section",
  { id: "technologies" },
  "React"
);
```

**Trả lời:** Một React Element có `type` là `section`, props chứa `id: "technologies"` và nội dung con là `"React"`.

## Câu 5

Props được lấy từ đâu?

**Trả lời:** Props được Component cha truyền xuống Component con giống như truyền thuộc tính cho một thẻ JSX.

## Câu 6

Component con có được sửa trực tiếp Props không?

**Trả lời:** Không. Props là read-only đối với Component nhận.

## Câu 7

State khác Props ở điểm nào?

**Trả lời:** Props đến từ bên ngoài Component, còn State là dữ liệu do Component sở hữu và cập nhật.

## Câu 8

Điều gì xảy ra khi State thay đổi?

**Trả lời:** React lên lịch cập nhật và render lại Component để giao diện phản ánh State mới.

## Câu 9

Tại sao cần `super(props)` trong constructor của Class Component?

**Trả lời:** Vì class con kế thừa từ `React.Component`; `super(props)` gọi constructor của class cha và giúp `this.props` sẵn sàng trong constructor.

## Câu 10

Bốn giai đoạn vòng đời Component là gì?

**Trả lời:** Initialization, Mounting, Updating và Unmounting.

## Câu 11

Nên gọi API ở đâu trong Class Component?

**Trả lời:** Thường gọi trong `componentDidMount()` cho lần tải ban đầu, hoặc trong `componentDidUpdate()` nếu cần gọi lại khi dữ liệu phụ thuộc thay đổi.

## Câu 12

Nên dọn timer ở đâu?

**Trả lời:** Trong `componentWillUnmount()` với Class Component hoặc cleanup function của `useEffect()` với Functional Component.

## Câu 13

Functional Component có sử dụng State được không?

**Trả lời:** Có. Functional Component hiện đại sử dụng Hooks như `useState()`.

## Câu 14

One-way Data Flow mang lại lợi ích gì?

**Trả lời:** Giúp luồng dữ liệu rõ ràng, dễ kiểm soát, dễ debug và hạn chế thay đổi dữ liệu ngoài ý muốn.

## Câu 15

Tại sao không nên dùng `index` làm `key` trong mọi trường hợp?

**Trả lời:** Khi danh sách thay đổi thứ tự, thêm hoặc xóa phần tử, `index` có thể khiến React gắn nhầm trạng thái của phần tử cũ sang phần tử mới.

---

# Sơ đồ ghi nhớ nhanh

```text
React
├── JSX
│   └── Cú pháp mô tả UI
├── React Element
│   └── Object mô tả UI
├── Component
│   ├── Functional Component
│   └── Class Component
├── Props
│   └── Dữ liệu từ cha xuống con
├── State
│   └── Dữ liệu thay đổi bên trong Component
├── One-way Data Flow
│   └── Parent → Child
├── Virtual DOM
│   └── So sánh và cập nhật UI cần thiết
└── Life Cycle
    ├── Initialization
    ├── Mounting
    ├── Updating
    └── Unmounting
```

---

# Checklist sau bài học

- [ ] Tôi giải thích được ReactJS là gì.
- [ ] Tôi tạo được dự án React bằng Vite.
- [ ] Tôi viết được JSX hợp lệ.
- [ ] Tôi phân biệt được React Element và Component.
- [ ] Tôi tạo được Functional Component.
- [ ] Tôi đọc và truyền được Props.
- [ ] Tôi quản lý được State cơ bản.
- [ ] Tôi hiểu tại sao cập nhật State làm UI render lại.
- [ ] Tôi phân biệt được Props và State.
- [ ] Tôi mô tả được bốn giai đoạn vòng đời Component.
- [ ] Tôi nhận biết được các API cũ trong slide và cách viết React hiện đại tương ứng.
