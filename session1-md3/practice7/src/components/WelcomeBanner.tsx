import React from 'react';
import './WelcomeBanner.css';

interface WelcomeBannerProps {
  isLoggedIn: boolean;
  onLogin: () => void;
  onLogout: () => void;
}

const WelcomeBanner: React.FC<WelcomeBannerProps> = ({ isLoggedIn, onLogin, onLogout }) => {
  return (
    <div className="welcome-card">
      {isLoggedIn ? (
        <div className="logged-in-container">
          <h2 className="welcome-text">Chào mừng trở lại!</h2>
          <p className="welcome-desc">Bạn đã đăng nhập thành công vào hệ thống.</p>
          <button onClick={onLogout} className="btn btn-logout">
            Đăng xuất
          </button>
        </div>
      ) : (
        <div className="logged-out-container">
          <h2 className="welcome-text">Xin chào, Khách hàng!</h2>
          <p className="welcome-desc">Vui lòng đăng nhập để trải nghiệm đầy đủ các tính năng.</p>
          <button onClick={onLogin} className="btn btn-login">
            Đăng nhập ngay
          </button>
        </div>
      )}
    </div>
  );
};

export default WelcomeBanner;
