import type { Category, Product, CartItem, Order, FilterParams, User } from './types';

const API_BASE = '/api';

export function getAuthToken(): string | null {
  return localStorage.getItem('shopfast_token');
}

export function setAuthToken(token: string | null) {
  if (token) {
    localStorage.setItem('shopfast_token', token);
  } else {
    localStorage.removeItem('shopfast_token');
  }
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const headers = new Headers(options.headers || {});
  headers.set('Content-Type', 'application/json');

  const token = getAuthToken();
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    const message = data?.message || data?.error || 'Đã có lỗi xảy ra';
    throw new Error(Array.isArray(message) ? message.join(', ') : message);
  }

  return data as T;
}

// Auth API
export const api = {
  async login(email: string, password: string): Promise<{ accessToken: string; user: User }> {
    return request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },

  async register(email: string, password: string, fullName: string, phone?: string): Promise<{ accessToken: string; user: User }> {
    return request('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, fullName, phone }),
    });
  },

  async getMe(): Promise<User> {
    return request('/auth/me');
  },

  // Categories & Products
  async getCategories(): Promise<Category[]> {
    return request('/categories');
  },

  async getProducts(params: FilterParams = {}): Promise<Product[]> {
    const query = new URLSearchParams();
    if (params.categoryId) query.set('categoryId', params.categoryId);
    if (params.search) query.set('search', params.search);
    if (params.minPrice !== undefined) query.set('minPrice', params.minPrice.toString());
    if (params.maxPrice !== undefined) query.set('maxPrice', params.maxPrice.toString());
    if (params.sort) query.set('sort', params.sort);

    const queryString = query.toString();
    return request(`/products${queryString ? `?${queryString}` : ''}`);
  },

  async getProductById(id: string): Promise<Product> {
    return request(`/products/${id}`);
  },

  // Cart
  async getCart(): Promise<{ items: CartItem[]; totalAmount: number }> {
    return request('/cart');
  },

  async addToCart(productId: string, quantity = 1): Promise<{ success: boolean; item: CartItem }> {
    return request('/cart/items', {
      method: 'POST',
      body: JSON.stringify({ productId, quantity }),
    });
  },

  async updateCartItem(itemId: string, quantity: number): Promise<CartItem> {
    return request(`/cart/items/${itemId}`, {
      method: 'PUT',
      body: JSON.stringify({ quantity }),
    });
  },

  async removeCartItem(itemId: string): Promise<{ success: boolean }> {
    return request(`/cart/items/${itemId}`, {
      method: 'DELETE',
    });
  },

  async clearCart(): Promise<{ success: boolean }> {
    return request('/cart', {
      method: 'DELETE',
    });
  },

  // Orders
  async checkout(payload: {
    recipientName: string;
    recipientPhone: string;
    shippingAddress: string;
    note?: string;
  }): Promise<Order> {
    return request('/orders/checkout', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  async getMyOrders(): Promise<Order[]> {
    return request('/orders/my');
  },
};
