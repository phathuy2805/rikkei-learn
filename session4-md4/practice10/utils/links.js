export function generateOrderLinks(order) {
  const links = {
    self: { href: `/api/v2/orders/${order.id}`, method: 'GET' },
    customer: { href: `/api/v2/users/${order.userId}`, method: 'GET' }
  };

  if (order.status === 'pending') {
    links.cancel = { href: `/api/v2/orders/${order.id}/cancellation`, method: 'POST' };
  }

  return links;
}
