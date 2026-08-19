import express from 'express';
import orders from './data/orders.js';
import { generateOrderLinks } from './utils/links.js';

const app = express();
app.use(express.json());

app.get('/api/v2/orders/:id', (req, res) => {
  const id = Number(req.params.id);
  const order = orders.find(o => o.id === id);

  if (!order) {
    return res.status(404).json({
      success: false,
      message: 'Order not found'
    });
  }

  const links = generateOrderLinks(order);

  res.status(200).json({
    success: true,
    data: {
      id: order.id,
      userId: order.userId,
      status: order.status,
      total: order.total
    },
    _links: links
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
