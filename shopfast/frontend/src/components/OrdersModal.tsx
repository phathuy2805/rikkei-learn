import React from 'react';
import type { Order } from '../types';
import { CloseIcon, PackageIcon } from './Icons';

interface OrdersModalProps {
  isOpen: boolean;
  onClose: () => void;
  orders: Order[];
}

export const OrdersModal: React.FC<OrdersModalProps> = ({
  isOpen,
  onClose,
  orders,
}) => {
  if (!isOpen) return null;

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  const getStatusLabel = (status: Order['status']) => {
    switch (status) {
      case 'COMPLETED':
        return 'Hoàn thành';
      case 'SHIPPING':
        return 'Đang giao hàng';
      case 'PENDING':
        return 'Chờ xác nhận';
      case 'CONFIRMED':
        return 'Đã xác nhận';
      case 'CANCELLED':
        return 'Đã hủy';
      default:
        return status;
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" style={{ maxWidth: 600 }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <PackageIcon size={22} />
            <span>Lịch sử đơn hàng ({orders.length})</span>
          </div>
          <button className="drawer-close" onClick={onClose} title="Đóng">
            <CloseIcon size={20} />
          </button>
        </div>

        <div className="modal-body">
          {orders.length === 0 ? (
            <div className="empty-state" style={{ border: 'none', padding: '36px 0' }}>
              <div className="empty-state-icon">
                <PackageIcon size={32} />
              </div>
              <h4>Chưa có đơn hàng nào</h4>
              <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginTop: 6 }}>
                Khi bạn đặt hàng, danh sách đơn hàng sẽ xuất hiện ở đây.
              </p>
            </div>
          ) : (
            orders.map((order) => (
              <div key={order.id} className="order-card-item">
                <div className="order-top-row">
                  <div>
                    <span className="order-code-text">#{order.orderCode}</span>
                    <div style={{ fontSize: '0.78rem', color: '#94a3b8', marginTop: 2 }}>
                      {new Date(order.createdAt).toLocaleString('vi-VN')}
                    </div>
                  </div>
                  <span className={`order-status-tag ${order.status}`}>
                    {getStatusLabel(order.status)}
                  </span>
                </div>

                <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: 10, marginBottom: 10 }}>
                  {order.items?.map((it) => (
                    <div
                      key={it.id}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        fontSize: '0.88rem',
                        marginBottom: 6,
                      }}
                    >
                      <span style={{ color: '#334155' }}>
                        {it.productName} × {it.quantity}
                      </span>
                      <strong>{formatPrice(it.totalPrice)}</strong>
                    </div>
                  ))}
                </div>

                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                    borderTop: '1px dashed #cbd5e1',
                    paddingTop: 8,
                  }}
                >
                  <span style={{ fontSize: '0.82rem', color: '#64748b' }}>
                    Người nhận: {order.recipientName} ({order.recipientPhone})
                  </span>
                  <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#4f46e5' }}>
                    {formatPrice(order.totalAmount)}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
