# BÁO CÁO PHÂN TÍCH HIỆU NĂNG HỆ THỐNG
## Tối Ưu Hóa Ma Trận Hiệu Năng Với `useMemo`, `useCallback` và `React.memo`

---

### 1. Tại Sao Hiện Tượng Re-render Lại Xảy Ra?

Trong React, một component sẽ tự động re-render (kích hoạt lại tiến trình thực thi hàm component) bất cứ khi nào:
1. **State thay đổi** (ví dụ: `useState` updater function được gọi).
2. **Props thay đổi**.
3. **Component cha re-render**, kéo theo tất cả các component con nằm trong nhánh cây đó re-render theo mặc định.

Khi một tiến trình re-render xảy ra trên `App` component, toàn bộ mã nguồn nằm trong thân của hàm `App` sẽ chạy lại từ đầu đến cuối:
* Tất cả biến cục bộ sẽ được khai báo mới.
* Tất cả các hàm sự kiện (event handlers) sẽ được khởi tạo lại với địa chỉ tham chiếu vùng nhớ mới (new referential identity).
* Mọi biểu thức tính toán hoặc lọc mảng sẽ bị thực thi lại, bất kể dữ liệu đầu vào có thực sự biến đổi hay không.

#### Phân tích nút thắt cổ chai (Bottleneck Analysis):
* **Tính toán lọc mảng trên 5.000 phần tử**: Hàm lọc mảng học viên `filterStudentsExpensive` chứa một vòng lặp nặng nề (giả lập mất 150ms). Khi người dùng thao tác một nút độc lập bên ngoài danh sách (ví dụ: nút *"Mark Audited"* kích hoạt state `isGlobalAuditMarked`), React buộc phải chạy lại toàn bộ thân hàm `App`.
* **Kết quả**: Nếu không có cơ chế lưu vết (cache), hàm lọc nặng nề 150ms sẽ tiếp tục chạy vô ích, trực tiếp chặn luồng xử lý chính (Main Thread), làm đơ toàn bộ giao diện người dùng (UI freeze) trong khoảng thời gian đó.

---

### 2. Cơ Chế Bypass của Bộ Nhớ Đệm (`useMemo` & `useCallback`)

Để loại bỏ các tính toán dư thừa và ngăn chặn re-render dây chuyền, chúng ta sử dụng cơ chế so sánh nghiêm ngặt (Strict Equality) kết hợp lưu trữ đệm:

#### A. Tối ưu hóa tính toán lọc mảng với `useMemo`
```typescript
const memoizedFilteredStudents = useMemo(() => {
  return filterStudentsExpensive(ALL_STUDENTS, searchTerm, courseFilter)
}, [searchTerm, courseFilter])
```
* **Cơ chế hoạt động**: `useMemo` nhận vào một hàm tính toán và một mảng phụ thuộc (dependency array). Khi `App` re-render, React thực hiện so sánh nông (`Object.is` hay Strict Equality `===`) từng phần tử trong mảng phụ thuộc của render hiện tại với render trước đó:
  * Nếu `searchTerm` và `courseFilter` **không thay đổi**, React sẽ **bypass** hoàn toàn việc thực thi hàm `filterStudentsExpensive` và trả về ngay tham chiếu của kết quả đã lưu trong bộ nhớ đệm trước đó.
  * Nếu một trong hai giá trị thay đổi, React sẽ chạy lại hàm và lưu kết quả mới vào đệm.
* **Giải quyết bẫy dữ liệu**: Khi người dùng nhấn nút *"Mark Audited"* để thay đổi state `isGlobalAuditMarked`, mảng dependency `[searchTerm, courseFilter]` hoàn toàn không thay đổi. Vì vậy, tiến trình tính toán lại 5.000 học viên được bypass hoàn toàn, giao diện phản hồi lập tức (< 0.1ms).

#### B. Khóa địa chỉ tham chiếu hàm với `useCallback`
```typescript
const handleToggleStudent = useCallback((id: number) => {
  setCheckedStudents((prev) => ({
    ...prev,
    [id]: !prev[id],
  }))
}, [])
```
* **Vấn đề**: Ở mỗi lượt render, nếu khai báo hàm theo cách thông thường, tham chiếu của hàm `handleToggleStudent` sẽ bị thay đổi (tạo hàm mới). Khi truyền hàm này xuống component con qua prop, component con sẽ hiểu rằng prop đã thay đổi và buộc phải re-render.
* **Cơ chế**: `useCallback` khóa chặt địa chỉ tham chiếu của hàm `handleToggleStudent` xuyên suốt vòng đời của component (vì mảng phụ thuộc là `[]`). 

#### C. Ngăn chặn re-render component con với `React.memo`
```typescript
const StudentRow = React.memo(({ student, isChecked, onToggle, onIncrementRender }) => {
  ...
})
```
* **Cơ chế**: `React.memo` là một Higher-Order Component (HOC) thực hiện so sánh nông các props của component con trước khi render.
* **Kết hợp hoàn hảo**: Nhờ `useCallback` khóa chặt tham chiếu hàm `onToggle` và mảng dữ liệu học viên `ALL_STUDENTS` có tham chiếu tĩnh, khi một học viên được chọn (checked/unchecked):
  1. Chỉ có `isChecked` của học viên đó thay đổi.
  2. Các dòng `StudentRow` khác nhận các props hoàn toàn giống hệt lần render trước (`student` giống, `onToggle` giống, `isChecked` giống).
  3. `React.memo` sẽ **bypass** render cho 4.999 dòng còn lại. Chỉ duy nhất dòng được click là thực sự re-render. Số lượt render của các phần tử con giảm từ **50 lượt** xuống chỉ còn **1 lượt**, tiết kiệm tài nguyên DOM tối đa.

---

### 3. Đối Chiếu Kết Quả Thực Nghiệm

| Trạng thái | Thao tác | Số lần chạy bộ lọc | Thời gian xử lý | Số dòng Table re-render | Cảm giác UI |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Không Tối Ưu Hóa** | Click "Mark Audited" | **1 lần** | ~150ms | 50 dòng | Lag nhẹ / Đơ |
| **Tối Ưu Hóa (ON)** | Click "Mark Audited" | **0 lần** (Bypass) | 0.0ms | 0 dòng | Mượt mà tức thì |
| **Không Tối Ưu Hóa** | Chọn 1 học viên | **1 lần** | ~150ms | 50 dòng | Lag nhẹ / Đơ |
| **Tối Ưu Hóa (ON)** | Chọn 1 học viên | **0 lần** (Bypass) | 0.0ms | 1 dòng duy nhất | Mượt mà tức thì |
