function logOrder(order, status) {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] Đơn hàng #${order.id} - ${status}`);
}

export function initLogger(orderService) {
  orderService.on('order:created', (order) => {
    logOrder(order, 'created');
  });

  orderService.on('order:processed', (order) => {
    logOrder(order, 'processed');
  });
}
