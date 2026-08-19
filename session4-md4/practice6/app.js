import express from 'express';
import orders from './data/orders.js';

const app = express();
app.use(express.json());

const validUserIds = [1, 2, 3];

app.get('/api/v1/users/:userId/orders', (req, res) => {
  const userId = Number(req.params.userId);
  if (!validUserIds.includes(userId)) {
    return res.status(404).json({
      success: false,
      code: 'USER_NOT_FOUND',
      message: 'User not found'
    });
  }

  const { status, limit } = req.query;

  if (limit !== undefined) {
    const parsedLimit = Number(limit);
    if (isNaN(parsedLimit) || parsedLimit <= 0) {
      return res.status(400).json({
        success: false,
        code: 'LIMIT_INVALID',
        message: 'Limit must be a positive number'
      });
    }
    if (parsedLimit > 10) {
      return res.status(400).json({
        success: false,
        code: 'LIMIT_EXCEEDED',
        message: 'Limit cannot exceed 10 records'
      });
    }
  }

  let userOrders = orders.filter(o => o.userId === userId);

  if (status) {
    userOrders = userOrders.filter(o => o.status === status);
  }

  const maxLimit = limit ? parseInt(limit, 10) : 5;
  const total = userOrders.length;
  const slicedOrders = userOrders.slice(0, maxLimit);

  res.status(200).json({
    success: true,
    data: slicedOrders,
    meta: {
      total
    }
  });
});

app.post('/api/v1/users/:userId/orders', (req, res) => {
  const userId = Number(req.params.userId);
  if (!validUserIds.includes(userId)) {
    return res.status(404).json({
      success: false,
      code: 'USER_NOT_FOUND',
      message: 'User not found'
    });
  }

  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({
      success: false,
      code: 'EMPTY_BODY',
      message: 'Request body cannot be empty'
    });
  }

  const { status, total } = req.body;
  if (!status || total === undefined) {
    return res.status(400).json({
      success: false,
      code: 'MISSING_FIELDS',
      message: 'Status and total are required'
    });
  }

  const newOrder = {
    id: orders.length + 1,
    userId,
    status,
    total: Number(total)
  };
  orders.push(newOrder);

  res.status(201).json({
    success: true,
    data: newOrder
  });
});

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({
      success: false,
      code: 'INVALID_JSON',
      message: 'Invalid JSON payload'
    });
  }
  next();
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
