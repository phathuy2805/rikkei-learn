export interface Order {
  id: string
  customer: string
  items: string
  total: number
  status: 'Pending' | 'Shipped' | 'Delivered'
  date: string
}

const MOCK_ORDERS: Order[] = [
  { id: 'ORD-1001', customer: 'Nguyễn Văn A', items: 'MacBook Pro M3 x 1', total: 2499, status: 'Pending', date: '2026-07-16' },
  { id: 'ORD-1002', customer: 'Trần Thị B', items: 'Keychron K2 Mechanical Keyboard x 1', total: 99, status: 'Shipped', date: '2026-07-15' },
  { id: 'ORD-1003', customer: 'Lê Hoàng C', items: 'Dell UltraSharp 27 Monitor x 2', total: 798, status: 'Delivered', date: '2026-07-14' },
  { id: 'ORD-1004', customer: 'Phạm Minh D', items: 'Sony WH-1000XM5 Headphones x 1', total: 349, status: 'Pending', date: '2026-07-13' },
  { id: 'ORD-1005', customer: 'Đỗ Thùy E', items: 'iPad Pro 11-inch M4 x 1', total: 999, status: 'Delivered', date: '2026-07-12' },
  { id: 'ORD-1006', customer: 'Vũ Quốc F', items: 'iPhone 15 Pro Max 256GB x 1', total: 1199, status: 'Shipped', date: '2026-07-11' },
  { id: 'ORD-1007', customer: 'Hoàng Lan G', items: 'Logitech MX Master 3S x 2', total: 198, status: 'Pending', date: '2026-07-10' },
  { id: 'ORD-1008', customer: 'Ngô Quang H', items: 'Anker Prime 20000mAh Power Bank x 1', total: 129, status: 'Delivered', date: '2026-07-09' },
  { id: 'ORD-1009', customer: 'Lý Cường I', items: 'ASUS ROG Ally Handheld Console x 1', total: 699, status: 'Shipped', date: '2026-07-08' },
  { id: 'ORD-1010', customer: 'Mai Phương K', items: 'Apple Watch Ultra 2 x 1', total: 799, status: 'Delivered', date: '2026-07-07' },
]

export const fetchOrders = async (status: string, search: string): Promise<Order[]> => {
  // Simulate network latency (500ms)
  await new Promise((resolve) => setTimeout(resolve, 500))

  return MOCK_ORDERS.filter((order) => {
    const matchesStatus = status === 'all' || order.status === status
    const matchesSearch =
      order.customer.toLowerCase().includes(search.toLowerCase()) ||
      order.id.toLowerCase().includes(search.toLowerCase()) ||
      order.items.toLowerCase().includes(search.toLowerCase())
    return matchesStatus && matchesSearch
  })
}
