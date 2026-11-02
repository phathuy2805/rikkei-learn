import React from 'react';
import type { CartItem } from '../types';
import { CloseIcon, PlusIcon, MinusIcon, TrashIcon, ShoppingBagIcon, ArrowRightIcon } from './Icons';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  totalAmount: number;
  onUpdateQty: (itemId: string, newQty: number) => void;
  onRemoveItem: (itemId: string) => void;
  onCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  totalAmount,
  onUpdateQty,
  onRemoveItem,
  onCheckout,
}) => {
  if (!isOpen) return null;

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  return (
    <>
      <div className="drawer-backdrop" onClick={onClose} />
      <div className="drawer">
        <div className="drawer-header">
          <div className="drawer-title">
            <ShoppingBagIcon size={22} />
            <span>Giỏ hàng ({items.length})</span>
          </div>
          <button className="drawer-close" onClick={onClose} title="Đóng">
            <CloseIcon size={20} />
          </button>
        </div>

        <div className="drawer-body">
          {items.length === 0 ? (
            <div className="empty-state" style={{ padding: '48px 0', border: 'none' }}>
              <div className="empty-state-icon">
                <ShoppingBagIcon size={32} />
              </div>
              <h4>Giỏ hàng đang trống</h4>
              <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginTop: 8 }}>
                Hãy chọn các sản phẩm ưng ý để thêm vào giỏ nhé!
              </p>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="cart-item-row">
                <img
                  src={item.product?.imageUrl || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200'}
                  alt={item.product?.name}
                  className="cart-item-img"
                />

                <div className="cart-item-info">
                  <h4 className="cart-item-name">{item.product?.name}</h4>
                  <div className="cart-item-price">
                    {formatPrice(item.product?.price || 0)}
                  </div>

                  <div className="cart-item-controls">
                    <div className="qty-group">
                      <button
                        className="qty-btn"
                        onClick={() => onUpdateQty(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        <MinusIcon size={12} />
                      </button>
                      <span className="qty-val">{item.quantity}</span>
                      <button
                        className="qty-btn"
                        onClick={() => onUpdateQty(item.id, item.quantity + 1)}
                        disabled={item.quantity >= (item.product?.stock || 99)}
                      >
                        <PlusIcon size={12} />
                      </button>
                    </div>

                    <button
                      className="btn-remove-item"
                      onClick={() => onRemoveItem(item.id)}
                      title="Xoá khỏi giỏ"
                    >
                      <TrashIcon size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="drawer-footer">
            <div className="subtotal-row">
              <span>Tạm tính ({items.length} món):</span>
              <span>{formatPrice(totalAmount)}</span>
            </div>
            <div className="subtotal-row">
              <span>Phí vận chuyển:</span>
              <span style={{ color: '#059669', fontWeight: 600 }}>Miễn phí</span>
            </div>
            <div className="total-row">
              <span>Tổng thanh toán:</span>
              <span className="total-amount">{formatPrice(totalAmount)}</span>
            </div>

            <button className="btn-checkout" onClick={onCheckout}>
              <span>Tiến hành đặt hàng</span>
              <ArrowRightIcon size={18} />
            </button>
          </div>
        )}
      </div>
    </>
  );
};
