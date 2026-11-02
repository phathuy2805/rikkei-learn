import React, { useState } from 'react';
import { CloseIcon, ZapIcon, UserIcon } from './Icons';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (email: string, pass: string) => Promise<void>;
  onRegister: (email: string, pass: string, name: string, phone?: string) => Promise<void>;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLogin,
  onRegister,
}) => {
  const [tab, setTab] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleDemoLogin = () => {
    setEmail('customer@shopfast.vn');
    setPassword('Customer@123');
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      if (tab === 'login') {
        await onLogin(email, password);
      } else {
        await onRegister(email, password, fullName, phone);
      }
      onClose();
    } catch (err: any) {
      setError(err?.message || 'Đăng nhập/Đăng ký không thành công');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title">
            {tab === 'login' ? 'Đăng nhập tài khoản' : 'Đăng ký tài khoản mới'}
          </div>
          <button className="drawer-close" onClick={onClose} title="Đóng">
            <CloseIcon size={20} />
          </button>
        </div>

        <div className="modal-body">
          <div className="auth-tabs">
            <div
              className={`auth-tab ${tab === 'login' ? 'active' : ''}`}
              onClick={() => { setTab('login'); setError(null); }}
            >
              Đăng nhập
            </div>
            <div
              className={`auth-tab ${tab === 'register' ? 'active' : ''}`}
              onClick={() => { setTab('register'); setError(null); }}
            >
              Đăng ký
            </div>
          </div>

          {tab === 'login' && (
            <button
              type="button"
              className="btn-demo-account"
              onClick={handleDemoLogin}
              title="Điền tự động tài khoản mẫu để test nhanh"
            >
              <ZapIcon size={16} color="#4f46e5" />
              <span>⚡ Đăng nhập bằng tài khoản mẫu (Demo)</span>
            </button>
          )}

          {error && (
            <div style={{ background: '#fee2e2', color: '#dc2626', padding: '10px 14px', borderRadius: 8, fontSize: '0.88rem', marginBottom: 16 }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {tab === 'register' && (
              <>
                <div className="form-group">
                  <label className="form-label">Họ và tên *</label>
                  <input
                    type="text"
                    className="form-input"
                    required
                    placeholder="Nguyễn Văn A"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Số điện thoại</label>
                  <input
                    type="tel"
                    className="form-input"
                    placeholder="0912345678"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </>
            )}

            <div className="form-group">
              <label className="form-label">Email *</label>
              <input
                type="email"
                className="form-input"
                required
                placeholder="email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Mật khẩu *</label>
              <input
                type="password"
                className="form-input"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="btn-checkout"
              disabled={isLoading}
              style={{ marginTop: 12 }}
            >
              <UserIcon size={18} />
              <span>
                {isLoading
                  ? 'Đang xử lý...'
                  : tab === 'login'
                  ? 'Đăng nhập ngay'
                  : 'Tạo tài khoản'}
              </span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
