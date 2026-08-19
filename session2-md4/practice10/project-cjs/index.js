const OrderService = require('./orderService');
const { initLogger } = require('./logger');

const orderService = new OrderService();
initLogger(orderService);

orderService.createOrder({ id: 101, total: 150000 });
orderService.createOrder({ id: 102, total: 300000 });
