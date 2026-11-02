// ShopFast Frontend Client Application
const API_BASE = '/api';

// State
let token = localStorage.getItem('sf_token') || null;
let currentUser = null;
let categories = [];
let selectedCategoryId = null;
let currentProducts = [];
let cartData = { items: [], subtotal: 0, totalItems: 0 };
let searchDebounceTimeout = null;

// Initialize
document.addEventListener('DOMContentLoaded', async () => {
  await initAuth();
  await loadCategories();
  await loadProducts();
  if (token) {
    await loadCart();
  }
});

// Format VND currency
function formatVND(amount) {
  return (amount || 0).toLocaleString('vi-VN') + ' đ';
}

// Toast notification helper
function showToast(message, type = 'success') {
  const container = document.getElementById('toastContainer');
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<span>${type === 'success' ? '✅' : '⚠️'}</span> <span>${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.remove();
  }, 3500);
}

// ----------------- Authentication -----------------
async function initAuth() {
  if (!token) {
    renderAuthUI(null);
    return;
  }
  try {
    const res = await fetch(`${API_BASE}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
      currentUser = await res.json();
      renderAuthUI(currentUser);
    } else {
      logout();
    }
  } catch (err) {
    console.error('Failed to restore session:', err);
    logout();
  }
}

function renderAuthUI(user) {
  const container = document.getElementById('authContainer');
  const ordersNavBtn = document.getElementById('ordersNavBtn');

  if (user) {
    container.innerHTML = `
      <div class="user-pill">
        <span>👤 ${user.fullName}</span>
        <button class="btn-logout" onclick="logout()">Thoát</button>
      </div>
    `;
    if (ordersNavBtn) ordersNavBtn.style.display = 'inline-flex';
  } else {
    container.innerHTML = `
      <button class="btn btn-primary" onclick="openAuthModal('login')">Đăng nhập</button>
    `;
    if (ordersNavBtn) ordersNavBtn.style.display = 'none';
  }
}

function logout() {
  token = null;
  currentUser = null;
  localStorage.removeItem('sf_token');
  renderAuthUI(null);
  updateCartBadge(0);
  cartData = { items: [], subtotal: 0, totalItems: 0 };
  showToast('Đã đăng xuất tài khoản', 'success');
}

function openAuthModal(tab = 'login') {
  document.getElementById('authModal').classList.add('active');
  switchAuthTab(tab);
}

function closeAuthModal() {
  document.getElementById('authModal').classList.remove('active');
}

function switchAuthTab(tab) {
  const tabLogin = document.getElementById('tabLogin');
  const tabRegister = document.getElementById('tabRegister');
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');
  const demoBox = document.getElementById('demoBox');

  if (tab === 'login') {
    tabLogin.classList.add('active');
    tabRegister.classList.remove('active');
    loginForm.style.display = 'block';
    registerForm.style.display = 'none';
    demoBox.style.display = 'block';
  } else {
    tabLogin.classList.remove('active');
    tabRegister.classList.add('active');
    loginForm.style.display = 'none';
    registerForm.style.display = 'block';
    demoBox.style.display = 'none';
  }
}

function fillDemoAccount(email, password) {
  document.getElementById('loginEmail').value = email;
  document.getElementById('loginPassword').value = password;
}

async function handleLogin(e) {
  e.preventDefault();
  const btn = document.getElementById('loginBtn');
  btn.disabled = true;
  btn.textContent = 'Đang đăng nhập...';

  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  try {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || 'Đăng nhập thất bại');
    }

    token = data.accessToken;
    currentUser = data.user;
    localStorage.setItem('sf_token', token);
    renderAuthUI(currentUser);
    closeAuthModal();
    showToast(`Chào mừng ${currentUser.fullName} trở lại!`, 'success');
    await loadCart();
  } catch (err) {
    showToast(err.message, 'error');
  } finally {
    btn.disabled = false;
    btn.textContent = 'Đăng nhập ngay';
  }
}

async function handleRegister(e) {
  e.preventDefault();
  const btn = document.getElementById('regBtn');
  btn.disabled = true;
  btn.textContent = 'Đang xử lý...';

  const fullName = document.getElementById('regFullName').value;
  const email = document.getElementById('regEmail').value;
  const phone = document.getElementById('regPhone').value;
  const password = document.getElementById('regPassword').value;

  try {
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fullName, email, phone, password }),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || 'Đăng ký thất bại');
    }

    token = data.accessToken;
    currentUser = data.user;
    localStorage.setItem('sf_token', token);
    renderAuthUI(currentUser);
    closeAuthModal();
    showToast('Tạo tài khoản thành công!', 'success');
    await loadCart();
  } catch (err) {
    showToast(err.message, 'error');
  } finally {
    btn.disabled = false;
    btn.textContent = 'Tạo tài khoản';
  }
}

// ----------------- Catalog & Filters -----------------
async function loadCategories() {
  try {
    const res = await fetch(`${API_BASE}/categories`);
    categories = await res.json();
    renderCategories();
  } catch (err) {
    console.error('Failed to load categories:', err);
  }
}

function renderCategories() {
  const container = document.getElementById('categoryPills');
  let html = `
    <button class="pill-btn ${selectedCategoryId === null ? 'active' : ''}" onclick="selectCategory(null, this)">
      <span>✨</span> Tất cả
    </button>
  `;

  categories.forEach((c) => {
    html += `
      <button class="pill-btn ${selectedCategoryId === c.id ? 'active' : ''}" onclick="selectCategory(${c.id}, this)">
        <span>${c.icon}</span> ${c.name}
      </button>
    `;
  });

  container.innerHTML = html;
}

function selectCategory(id, btn) {
  selectedCategoryId = id;
  const allBtns = document.querySelectorAll('.pill-btn');
  allBtns.forEach((b) => b.classList.remove('active'));
  btn.classList.add('active');
  applyFilters();
}

function debounceSearch() {
  const clearBtn = document.getElementById('clearSearchBtn');
  const input = document.getElementById('searchInput');
  clearBtn.style.display = input.value ? 'inline-block' : 'none';

  clearTimeout(searchDebounceTimeout);
  searchDebounceTimeout = setTimeout(() => {
    applyFilters();
  }, 300);
}

function clearSearch() {
  const input = document.getElementById('searchInput');
  input.value = '';
  document.getElementById('clearSearchBtn').style.display = 'none';
  applyFilters();
}

function resetFilters() {
  selectedCategoryId = null;
  document.getElementById('searchInput').value = '';
  document.getElementById('clearSearchBtn').style.display = 'none';
  document.getElementById('priceFilter').value = '';
  document.getElementById('sortFilter').value = 'newest';
  renderCategories();
  applyFilters();
}

async function applyFilters() {
  const search = document.getElementById('searchInput').value.trim();
  const priceVal = document.getElementById('priceFilter').value;
  const sort = document.getElementById('sortFilter').value;

  const params = new URLSearchParams();
  if (selectedCategoryId) params.append('categoryId', selectedCategoryId);
  if (search) params.append('search', search);

  if (priceVal) {
    const [min, max] = priceVal.split('-');
    if (min) params.append('minPrice', min);
    if (max) params.append('maxPrice', max);
  }

  if (sort) params.append('sort', sort);

  await loadProducts(params.toString());
}

async function loadProducts(queryString = '') {
  const grid = document.getElementById('productGrid');
  const countEl = document.getElementById('productCount');
  grid.innerHTML = '<div class="empty-state"><p>Đang tải danh sách sản phẩm...</p></div>';

  try {
    const url = `${API_BASE}/products${queryString ? '?' + queryString : ''}`;
    const res = await fetch(url);
    currentProducts = await res.json();
    renderProducts(currentProducts);
    countEl.textContent = `Hiển thị ${currentProducts.length} sản phẩm`;
  } catch (err) {
    grid.innerHTML = `<div class="empty-state"><p>Lỗi kết nối máy chủ: ${err.message}</p></div>`;
  }
}

function renderProducts(products) {
  const grid = document.getElementById('productGrid');
  if (!products.length) {
    grid.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">🔍</div>
        <h3>Không tìm thấy sản phẩm nào</h3>
        <p style="color:var(--text-muted); margin-top:6px;">Hãy thử tìm kiếm với từ khoá khác hoặc bỏ bớt bộ lọc.</p>
        <button class="btn btn-primary" style="margin-top:16px;" onclick="resetFilters()">Xem tất cả sản phẩm</button>
      </div>
    `;
    return;
  }

  let html = '';
  products.forEach((p) => {
    const discount = p.originalPrice && p.originalPrice > p.price
      ? Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100)
      : null;

    html += `
      <div class="product-card">
        <div class="card-thumb-wrap">
          <img src="${p.imageUrl}" alt="${p.name}" class="card-thumb" loading="lazy">
          ${discount ? `<span class="discount-badge">-${discount}%</span>` : ''}
          ${p.category ? `<span class="cat-tag">${p.category.name}</span>` : ''}
        </div>
        <div class="card-body">
          <div class="card-rating">⭐ ${p.rating.toFixed(1)}</div>
          <h3 class="card-title" title="${p.name}">${p.name}</h3>
          <p class="card-desc">${p.description}</p>
          <div class="card-price-row">
            <span class="price-current">${formatVND(p.price)}</span>
            ${p.originalPrice ? `<span class="price-original">${formatVND(p.originalPrice)}</span>` : ''}
          </div>
          <div class="card-footer">
            <span class="stock-status ${p.stock > 0 ? 'stock-in' : 'stock-out'}">
              ${p.stock > 0 ? `● Còn hàng (${p.stock})` : '● Tạm hết hàng'}
            </span>
            <button class="btn-add-cart" onclick="addToCart(${p.id})" ${p.stock <= 0 ? 'disabled' : ''}>
              <span>+ Giỏ hàng</span>
            </button>
          </div>
        </div>
      </div>
    `;
  });

  grid.innerHTML = html;
}

// ----------------- Shopping Cart -----------------
function toggleCartDrawer() {
  const drawer = document.getElementById('cartDrawer');
  const overlay = document.getElementById('cartOverlay');
  const isActive = drawer.classList.contains('active');

  if (isActive) {
    drawer.classList.remove('active');
    overlay.classList.remove('active');
  } else {
    drawer.classList.add('active');
    overlay.classList.add('active');
    if (token) {
      loadCart();
    } else {
      renderEmptyCart('Vui lòng đăng nhập để xem giỏ hàng của bạn.');
    }
  }
}

async function loadCart() {
  if (!token) return;
  try {
    const res = await fetch(`${API_BASE}/cart`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
      cartData = await res.json();
      renderCart(cartData);
    }
  } catch (err) {
    console.error('Failed to load cart:', err);
  }
}

function updateCartBadge(count) {
  document.getElementById('cartCount').textContent = count;
  document.getElementById('cartDrawerCount').textContent = count;
}

function renderCart(cart) {
  updateCartBadge(cart.totalItems || 0);
  const listEl = document.getElementById('cartItemList');
  const footerEl = document.getElementById('cartFooter');

  if (!cart.items || cart.items.length === 0) {
    renderEmptyCart('Giỏ hàng của bạn đang trống.');
    footerEl.style.display = 'none';
    return;
  }

  footerEl.style.display = 'flex';
  let html = '';
  cart.items.forEach((item) => {
    const p = item.product;
    html += `
      <div class="cart-item">
        <img src="${p.imageUrl}" alt="${p.name}" class="cart-item-thumb">
        <div class="cart-item-info">
          <div class="cart-item-name">${p.name}</div>
          <div class="cart-item-price">${formatVND(p.price)}</div>
          <div class="cart-item-actions">
            <div class="qty-control">
              <button class="qty-btn" onclick="updateItemQuantity(${item.id}, ${item.quantity - 1})">-</button>
              <span class="qty-val">${item.quantity}</span>
              <button class="qty-btn" onclick="updateItemQuantity(${item.id}, ${item.quantity + 1})">+</button>
            </div>
            <button class="btn-del-item" onclick="deleteCartItem(${item.id})">Xoá</button>
          </div>
        </div>
      </div>
    `;
  });

  listEl.innerHTML = html;

  const shippingFee = cart.subtotal >= 500000 ? 0 : 30000;
  const total = cart.subtotal + shippingFee;

  document.getElementById('cartSubtotal').textContent = formatVND(cart.subtotal);
  document.getElementById('cartShipping').textContent = shippingFee === 0 ? 'Miễn phí' : formatVND(shippingFee);
  document.getElementById('cartTotal').textContent = formatVND(total);
}

function renderEmptyCart(msg) {
  const listEl = document.getElementById('cartItemList');
  listEl.innerHTML = `
    <div style="text-align:center; padding: 40px 10px; color: var(--text-muted);">
      <div style="font-size:2.5rem; margin-bottom: 10px;">🛒</div>
      <p>${msg}</p>
    </div>
  `;
}

async function addToCart(productId) {
  if (!token) {
    openAuthModal('login');
    showToast('Vui lòng đăng nhập để thêm vào giỏ hàng', 'error');
    return;
  }

  try {
    const res = await fetch(`${API_BASE}/cart/items`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ productId, quantity: 1 }),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || 'Thêm vào giỏ hàng thất bại');
    }

    cartData = data;
    renderCart(cartData);
    showToast('Đã thêm sản phẩm vào giỏ hàng!', 'success');
  } catch (err) {
    showToast(err.message, 'error');
  }
}

async function updateItemQuantity(itemId, newQty) {
  if (newQty <= 0) {
    return deleteCartItem(itemId);
  }

  try {
    const res = await fetch(`${API_BASE}/cart/items/${itemId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ quantity: newQty }),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || 'Cập nhật số lượng thất bại');
    }

    cartData = data;
    renderCart(cartData);
  } catch (err) {
    showToast(err.message, 'error');
  }
}

async function deleteCartItem(itemId) {
  try {
    const res = await fetch(`${API_BASE}/cart/items/${itemId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await res.json();
    cartData = data;
    renderCart(cartData);
    showToast('Đã xoá sản phẩm khỏi giỏ hàng', 'success');
  } catch (err) {
    showToast(err.message, 'error');
  }
}

// ----------------- Checkout -----------------
function openCheckoutModal() {
  if (!cartData.items || !cartData.items.length) {
    showToast('Giỏ hàng đang trống!', 'error');
    return;
  }

  toggleCartDrawer(); // Close drawer
  document.getElementById('checkoutModal').classList.add('active');

  document.getElementById('checkoutName').value = currentUser?.fullName || '';
  document.getElementById('checkoutPhone').value = currentUser?.phone || '';

  const shippingFee = cartData.subtotal >= 500000 ? 0 : 30000;
  const total = cartData.subtotal + shippingFee;

  document.getElementById('checkoutTotalItems').textContent = `${cartData.totalItems} món`;
  document.getElementById('checkoutTotalAmount').textContent = formatVND(total);
}

function closeCheckoutModal() {
  document.getElementById('checkoutModal').classList.remove('active');
}

async function handleCheckout(e) {
  e.preventDefault();
  const btn = document.getElementById('checkoutSubmitBtn');
  btn.disabled = true;
  btn.textContent = 'Đang tạo đơn hàng...';

  const recipientPhone = document.getElementById('checkoutPhone').value.trim();
  const shippingAddress = document.getElementById('checkoutAddress').value.trim();

  try {
    const res = await fetch(`${API_BASE}/orders/checkout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ recipientPhone, shippingAddress }),
    });

    const order = await res.json();
    if (!res.ok) {
      throw new Error(order.message || 'Đặt hàng thất bại');
    }

    closeCheckoutModal();
    showToast(`Đặt hàng thành công! Mã đơn: ${order.code}`, 'success');
    await loadCart();
    await loadProducts(); // Refresh stock
    openOrdersModal();
  } catch (err) {
    showToast(err.message, 'error');
  } finally {
    btn.disabled = false;
    btn.textContent = 'Xác nhận thanh toán';
  }
}

// ----------------- Orders History -----------------
async function openOrdersModal() {
  if (!token) {
    openAuthModal('login');
    return;
  }

  document.getElementById('ordersModal').classList.add('active');
  const container = document.getElementById('ordersList');
  container.innerHTML = '<p>Đang tải danh sách đơn hàng...</p>';

  try {
    const res = await fetch(`${API_BASE}/orders/my`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const orders = await res.json();

    if (!orders.length) {
      container.innerHTML = `
        <div style="text-align:center; padding: 40px 10px; color:var(--text-muted);">
          <div style="font-size:2.5rem; margin-bottom:10px;">📋</div>
          <p>Bạn chưa có đơn hàng nào.</p>
        </div>
      `;
      return;
    }

    let html = '';
    orders.forEach((o) => {
      const itemsText = o.items ? o.items.map((i) => `${i.name} (x${i.quantity})`).join(', ') : '';
      const date = new Date(o.createdAt).toLocaleString('vi-VN');

      html += `
        <div class="order-card">
          <div class="order-card-header">
            <div>
              <span class="order-code">Mã đơn: ${o.code}</span>
              <div style="font-size:0.75rem; color:var(--text-muted); margin-top:2px;">Ngày đặt: ${date}</div>
            </div>
            <span class="order-status-badge">✓ ${o.status}</span>
          </div>
          <div class="order-items-list">
            <strong>Sản phẩm:</strong> ${itemsText}
          </div>
          <div style="font-size:0.85rem; color:var(--text-muted); margin-bottom:6px;">
            <strong>Địa chỉ giao:</strong> ${o.shippingAddress} (${o.recipientPhone})
          </div>
          <div style="display:flex; justify-content:space-between; align-items:baseline; margin-top:10px; padding-top:8px; border-top:1px dashed var(--border);">
            <span style="font-size:0.85rem; color:var(--text-muted);">Tổng thanh toán:</span>
            <strong style="color:#ef4444; font-size:1.1rem;">${formatVND(o.total)}</strong>
          </div>
        </div>
      `;
    });

    container.innerHTML = html;
  } catch (err) {
    container.innerHTML = `<p style="color:red;">Lỗi tải đơn hàng: ${err.message}</p>`;
  }
}

function closeOrdersModal() {
  document.getElementById('ordersModal').classList.remove('active');
}
