import React, { useState } from 'react';
import { CloseIcon, CheckCircleIcon } from './Icons';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  totalAmount: number;
  itemCount: number;
  onSubmit: (data: {
    recipientName: string;
    recipientPhone: string;
    shippingAddress: string;
    note?: string;
  }) => Promise<void>;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  totalAmount,
  itemCount,
  onSubmit,
}) => {
  const [name, setName] = useState('Nguyễn Văn An');
  const [phone, setPhone] = useState('0987654321');
  const [address, setAddress] = useState('123 Đường Cầu Giấy, Hà Nội');
  const [note, setNote] = useState('Giao giờ hành chính giúp tôi');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !address.trim()) {
      alert('Vui lòng điền đầy đủ họ tên, số điện thoại và địa chỉ nhận hàng');
      return;
    }

    try {
      setIsSubmitting(true);
      await onSubmit({
        recipientName: name,
        recipientPhone: phone,
        shippingAddress: address,
        note,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title">Thông Tin Giao Hàng</div>
          <button className="drawer-close" onClick={onClose} title="Đóng">
            <CloseIcon size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-body">
          <div style={{ background: '#f8fafc', padding: 14, borderRadius: 10, marginBottom: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: 4 }}>
              <span style={{ color: '#64748b' }}>Đơn hàng:</span>
              <strong>{itemCount} sản phẩm</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.05rem' }}>
              <span>Tổng thanh toán (COD):</span>
              <strong style={{ color: '#4f46e5' }}>{formatPrice(totalAmount)}</strong>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Họ và tên người nhận *</label>
            <input
              type="text"
              className="form-input"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Số điện thoại *</label>
            <input
              type="tel"
              className="form-input"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Địa chỉ nhận hàng chi tiết *</label>
            <input
              type="text"
              className="form-input"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Ghi chú giao hàng (tuỳ chọn)</label>
            <textarea
              className="form-input"
              rows={2}
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="btn-checkout"
            disabled={isSubmitting}
            style={{ marginTop: 12 }}
          >
            <CheckCircleIcon size={18} />
            <span>{isSubmitting ? 'Đang tạo đơn hàng...' : 'Xác nhận đặt hàng'}</span>
          </button>
        </form>
      </div>
    </div>
  );
};
