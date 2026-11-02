import { useState, useEffect, useCallback } from 'react';
import { api, setAuthToken, getAuthToken } from './api';
import type { User, Category, Product, CartItem, Order } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CategoryBar } from './components/CategoryBar';
import { ProductCard } from './components/ProductCard';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { AuthModal } from './components/AuthModal';
import { OrdersModal } from './components/OrdersModal';
import { ShoppingBagIcon, CheckCircleIcon, ZapIcon } from './components/Icons';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

export function App() {
  // State
  const [user, setUser] = useState<User | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<{ items: CartItem[]; totalAmount: number }>({
    items: [],
    totalAmount: 0,
  });
  const [orders, setOrders] = useState<Order[]>([]);

  // Filter States
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [search, setSearch] = useState<string>('');
  const [priceFilter, setPriceFilter] = useState<string>('all');
  const [sortOption, setSortOption] = useState<'newest' | 'price_asc' | 'price_desc'>('newest');

  // Modals & Drawers
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isOrdersOpen, setIsOrdersOpen] = useState(false);
  const [addingId, setAddingId] = useState<string | null>(null);

  // Toast notifications
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  }, []);

  // Check auth on start
  useEffect(() => {
    const token = getAuthToken();
    if (token) {
      api.getMe()
        .then((u) => {
          setUser(u);
          loadCart();
        })
        .catch(() => {
          setAuthToken(null);
          setUser(null);
        });
    }
    loadCategories();
  }, []);

  // Load Products when filters change
  useEffect(() => {
    loadProducts();
  }, [selectedCategory, search, priceFilter, sortOption]);

  const loadCategories = async () => {
    try {
      const data = await api.getCategories();
      setCategories(data);
    } catch (err) {
      console.error('Failed to load categories', err);
    }
  };

  const loadCart = async () => {
    try {
      const data = await api.getCart();
      setCart(data);
    } catch {
      setCart({ items: [], totalAmount: 0 });
    }
  };

  const loadProducts = async () => {
    try {
      let minPrice: number | undefined;
      let maxPrice: number | undefined;

      if (priceFilter === 'under10') {
        maxPrice = 10000000;
      } else if (priceFilter === '10to25') {
        minPrice = 10000000;
        maxPrice = 25000000;
      } else if (priceFilter === 'above25') {
        minPrice = 25000000;
      }

      const data = await api.getProducts({
        categoryId: selectedCategory || undefined,
        search: search.trim() || undefined,
        minPrice,
        maxPrice,
        sort: sortOption,
      });
      setProducts(data);
    } catch (err) {
      console.error('Failed to load products', err);
    }
  };

  // Auth actions
  const handleLogin = async (email: string, pass: string) => {
    const res = await api.login(email, pass);
    setAuthToken(res.accessToken);
    setUser(res.user);
    showToast(`Chào mừng trở lại, ${res.user.fullName}!`, 'success');
    loadCart();
  };

  const handleRegister = async (email: string, pass: string, name: string, phone?: string) => {
    const res = await api.register(email, pass, name, phone);
    setAuthToken(res.accessToken);
    setUser(res.user);
    showToast(`Tạo tài khoản thành công!`, 'success');
    loadCart();
  };

  const handleLogout = () => {
    setAuthToken(null);
    setUser(null);
    setCart({ items: [], totalAmount: 0 });
    showToast('Đã đăng xuất', 'info');
  };

  // Cart actions
  const handleAddToCart = async (product: Product) => {
    if (!user) {
      setIsAuthOpen(true);
      showToast('Vui lòng đăng nhập để thêm vào giỏ hàng', 'info');
      return;
    }

    try {
      setAddingId(product.id);
      await api.addToCart(product.id, 1);
      await loadCart();
      showToast(`Đã thêm "${product.name}" vào giỏ hàng!`, 'success');
    } catch (err: any) {
      showToast(err?.message || 'Không thể thêm vào giỏ hàng', 'error');
    } finally {
      setAddingId(null);
    }
  };

  const handleUpdateQty = async (itemId: string, newQty: number) => {
    try {
      await api.updateCartItem(itemId, newQty);
      await loadCart();
    } catch (err: any) {
      showToast(err?.message || 'Lỗi cập nhật số lượng', 'error');
    }
  };

  const handleRemoveItem = async (itemId: string) => {
    try {
      await api.removeCartItem(itemId);
      await loadCart();
      showToast('Đã xoá sản phẩm khỏi giỏ', 'info');
    } catch (err: any) {
      showToast(err?.message || 'Lỗi xoá sản phẩm', 'error');
    }
  };

  // Checkout & Orders
  const handleOpenCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleSubmitCheckout = async (data: {
    recipientName: string;
    recipientPhone: string;
    shippingAddress: string;
    note?: string;
  }) => {
    try {
      const order = await api.checkout(data);
      setIsCheckoutOpen(false);
      await loadCart();
      await loadProducts(); // Refresh stock
      showToast(`🎉 Đặt hàng thành công! Mã đơn: #${order.orderCode}`, 'success');
    } catch (err: any) {
      showToast(err?.message || 'Đặt hàng thất bại', 'error');
    }
  };

  const handleOpenOrders = async () => {
    try {
      const data = await api.getMyOrders();
      setOrders(data);
      setIsOrdersOpen(true);
    } catch (err: any) {
      showToast(err?.message || 'Không thể tải đơn hàng', 'error');
    }
  };

  const totalCartCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="app-root">
      {/* Navbar */}
      <Navbar
        user={user}
        cartCount={totalCartCount}
        searchTerm={search}
        onSearchChange={setSearch}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenOrders={handleOpenOrders}
        onLogout={handleLogout}
      />

      {/* Hero Banner */}
      <Hero />

      {/* Category Pills */}
      <CategoryBar
        categories={categories}
        selectedCategoryId={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {/* Main Content Area */}
      <main className="container">
        {/* Filter Controls Row */}
        <div className="filter-controls-row">
          <div className="filter-left">
            <span style={{ fontSize: '0.88rem', fontWeight: 700, color: '#475569' }}>
              Khoảng giá:
            </span>
            <button
              className={`filter-chip ${priceFilter === 'all' ? 'active' : ''}`}
              onClick={() => setPriceFilter('all')}
            >
              Tất cả mức giá
            </button>
            <button
              className={`filter-chip ${priceFilter === 'under10' ? 'active' : ''}`}
              onClick={() => setPriceFilter('under10')}
            >
              Dưới 10 triệu
            </button>
            <button
              className={`filter-chip ${priceFilter === '10to25' ? 'active' : ''}`}
              onClick={() => setPriceFilter('10to25')}
            >
              10 - 25 triệu
            </button>
            <button
              className={`filter-chip ${priceFilter === 'above25' ? 'active' : ''}`}
              onClick={() => setPriceFilter('above25')}
            >
              Trên 25 triệu
            </button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <span className="product-count-badge">
              Hiển thị <strong>{products.length}</strong> sản phẩm
            </span>

            <select
              className="sort-select"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value as any)}
            >
              <option value="newest">✨ Mới nhất</option>
              <option value="price_asc">💵 Giá tăng dần</option>
              <option value="price_desc">💎 Giá giảm dần</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        <div className="products-grid">
          {products.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">
                <ShoppingBagIcon size={32} />
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: 8 }}>
                Không tìm thấy sản phẩm nào
              </h3>
              <p style={{ color: '#64748b' }}>
                Vui lòng thử từ khoá tìm kiếm khác hoặc điều chỉnh lại bộ lọc mức giá.
              </p>
            </div>
          ) : (
            products.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onAddToCart={handleAddToCart}
                isAdding={addingId === p.id}
              />
            ))
          )}
        </div>
      </main>

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart.items}
        totalAmount={cart.totalAmount}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleOpenCheckout}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        totalAmount={cart.totalAmount}
        itemCount={totalCartCount}
        onSubmit={handleSubmitCheckout}
      />

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLogin={handleLogin}
        onRegister={handleRegister}
      />

      {/* Orders History Modal */}
      <OrdersModal
        isOpen={isOrdersOpen}
        onClose={() => setIsOrdersOpen(false)}
        orders={orders}
      />

      {/* Toast Notification Container */}
      <div className="toast-container">
        {toasts.map((t) => (
          <div key={t.id} className={`toast ${t.type}`}>
            <CheckCircleIcon size={18} />
            <span>{t.message}</span>
          </div>
        ))}
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="container footer-inner">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div className="brand-icon" style={{ width: 30, height: 30 }}>
              <ZapIcon size={16} color="#fff" />
            </div>
            <strong style={{ color: '#fff' }}>ShopFast E-Commerce</strong>
            <span style={{ fontSize: '0.85rem' }}>— React 19 & NestJS 10</span>
          </div>
          <div style={{ fontSize: '0.85rem' }}>
            © 2026 ShopFast Inc. Sẵn sàng cho triển khai hạ tầng đám mây AWS.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
