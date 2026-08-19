import { EventEmitter } from 'events';

class NotificationCenter extends EventEmitter {}

const center = new NotificationCenter();

center.on('error', (err) => {
  console.log(`[SYSTEM ERROR] Đã bắt lỗi: ${err.message}`);
});

center.on('user:registered', (user) => {
  console.log(`[EMAIL] Gửi email chào mừng thành viên ${user.username}`);
});

center.on('user:registered', (user) => {
  console.log(`[DATABASE] Lưu thông tin người dùng ${user.username} vào database`);
});

center.on('order:created', (order) => {
  console.log(`[EMAIL] Gửi xác nhận đơn #${order.id}`);
});

center.on('order:created', (order) => {
  console.log(`[STATS] Cập nhật doanh thu: +${order.total}`);
});

center.on('order:cancelled', (order) => {
  console.log(`[EMAIL] Gửi thông báo hủy đơn #${order.id}`);
});

center.on('order:cancelled', (order) => {
  if (order.total > 1000000) {
    throw new Error(`Hủy đơn hàng thất bại: Đơn hàng #${order.id} có giá trị quá lớn (${order.total})`);
  }
  console.log(`[STATS] Giảm doanh thu: -${order.total}`);
});

function safeEmit(eventName, data) {
  try {
    center.emit(eventName, data);
  } catch (err) {
    center.emit('error', err);
  }
}

safeEmit('user:registered', { username: 'nguyenvana' });
safeEmit('order:created', { id: 1, total: 500000 });
safeEmit('order:cancelled', { id: 2, total: 300000 });
safeEmit('order:cancelled', { id: 3, total: 1500000 });
safeEmit('order:created', { id: 4, total: 200000 });
