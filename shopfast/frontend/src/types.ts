export interface User {
  id: string;
  email: string;
  fullName: string;
  phone?: string;
  role: 'customer' | 'admin';
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
}

export interface Product {
  id: string;
  categoryId: string;
  sku: string;
  name: string;
  description?: string;
  price: number;
  originalPrice?: number;
  stock: number;
  imageUrl?: string;
  rating: number;
  ratingCount: number;
  category?: Category;
}

export interface CartItem {
  id: string;
  productId: string;
  quantity: number;
  product: Product;
}

export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  productSku: string;
  unitPrice: number;
  quantity: number;
  totalPrice: number;
}

export interface Order {
  id: string;
  orderCode: string;
  status: 'PENDING' | 'CONFIRMED' | 'SHIPPING' | 'COMPLETED' | 'CANCELLED';
  subtotal: number;
  shippingFee: number;
  discount: number;
  totalAmount: number;
  recipientName: string;
  recipientPhone: string;
  shippingAddress: string;
  note?: string;
  items: OrderItem[];
  createdAt: string;
}

export interface FilterParams {
  categoryId?: string;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: 'price_asc' | 'price_desc' | 'newest';
}
