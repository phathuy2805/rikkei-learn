import React from 'react';
import { ShoppingBagIcon, SearchIcon, UserIcon, PackageIcon, LogOutIcon, ZapIcon } from './Icons';
import type { User } from '../types';

interface NavbarProps {
  user: User | null;
  cartCount: number;
  searchTerm: string;
  onSearchChange: (val: string) => void;
  onOpenCart: () => void;
  onOpenAuth: () => void;
  onOpenOrders: () => void;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  user,
  cartCount,
  searchTerm,
  onSearchChange,
  onOpenCart,
  onOpenAuth,
  onOpenOrders,
  onLogout,
}) => {
  return (
    <header className="navbar">
      <div className="container nav-container">
        {/* Brand */}
        <div className="brand">
          <div className="brand-icon">
            <ZapIcon size={22} color="#fff" />
          </div>
          <span>ShopFast</span>
          <span className="brand-badge">React</span>
        </div>

        {/* Search */}
        <div className="search-box">
          <span className="search-icon-pos">
            <SearchIcon size={18} />
          </span>
          <input
            type="text"
            className="search-input"
            placeholder="Tìm kiếm iPhone, MacBook, phụ kiện..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        {/* Actions */}
        <div className="nav-actions">
          {user ? (
            <>
              <button className="nav-btn" onClick={onOpenOrders} title="Đơn hàng của tôi">
                <PackageIcon size={18} />
                <span>Đơn hàng</span>
              </button>

              <button className="nav-btn" onClick={onLogout} title="Đăng xuất">
                <UserIcon size={18} />
                <span>{user.fullName.split(' ')[0]}</span>
                <LogOutIcon size={15} style={{ marginLeft: 4, opacity: 0.7 }} />
              </button>
            </>
          ) : (
            <button className="nav-btn primary" onClick={onOpenAuth}>
              <UserIcon size={18} />
              <span>Đăng nhập</span>
            </button>
          )}

          {/* Cart Button */}
          <button className="nav-btn cart-btn-rel" onClick={onOpenCart} title="Giỏ hàng">
            <ShoppingBagIcon size={20} />
            <span>Giỏ hàng</span>
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </button>
        </div>
      </div>
    </header>
  );
};
