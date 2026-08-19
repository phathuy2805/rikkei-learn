# Dự đoán và kiểm chứng thứ tự Event Loop

## Dự đoán
1. A: Bắt đầu
2. B: Kết thúc đồng bộ
3. nextTick
4. Promise
5. setTimeout
6. setImmediate

## Kết quả thực tế
```text
A: Bắt đầu
B: Kết thúc đồng bộ
nextTick
Promise
setTimeout
setImmediate
```

## Giải thích
1. `A: Bắt đầu` và `B: Kết thúc đồng bộ` được in ra đầu tiên vì đây là các câu lệnh đồng bộ (synchronous) chạy trực tiếp trên Call Stack.
2. `nextTick` và `Promise` thuộc hàng đợi microtask; trong đó `process.nextTick` có độ ưu tiên cao hơn và luôn chạy trước các microtask khác như Promise.
3. `setTimeout` và `setImmediate` thuộc hàng đợi macrotask, trong đó `setTimeout(..., 0)` nằm trong Timer phase được kiểm tra và thực thi trước khi Event Loop chuyển đến Check phase của `setImmediate`.
