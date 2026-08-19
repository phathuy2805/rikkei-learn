import { EventEmitter } from 'events';

class OrderService extends EventEmitter {}

const service = new OrderService();

service.on('order:created', (order) => {
  console.log(`[EMAIL] Đã gửi email xác nhận cho đơn hàng #${order.id}`);
});

service.once('order:created', () => {
  console.log('[SYSTEM] Đơn hàng đầu tiên đã được khởi tạo trong hệ thống');
});

const orders = [
  { id: 1, total: 100000 },
  { id: 2, total: 250000 },
  { id: 3, total: 75000 }
];

orders.forEach(order => {
  service.emit('order:created', order);
});
