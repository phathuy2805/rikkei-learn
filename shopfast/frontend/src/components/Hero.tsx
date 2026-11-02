import React from 'react';
import { ZapIcon, ShieldCheckIcon, TruckIcon } from './Icons';

export const Hero: React.FC = () => {
  return (
    <section className="hero">
      <div className="hero-glow" />
      <div className="container">
        <div className="hero-tag">
          <ZapIcon size={16} />
          <span>Sàn Công Nghệ Thế Hệ Mới 2026</span>
        </div>

        <h1 className="hero-title">
          Thiết Bị Đỉnh Cao, <br />
          <span>Giao Hàng Siêu Tốc</span>
        </h1>

        <p className="hero-subtitle">
          Trải nghiệm mua sắm thiết bị công nghệ chính hãng với bộ lọc thông minh,
          xử lý đơn hàng tức thì trên nền tảng React & NestJS tối tân.
        </p>

        <div className="hero-features">
          <div className="hero-feature-item">
            <span className="feature-icon-badge">
              <TruckIcon size={20} />
            </span>
            <span>Giao siêu tốc 2H</span>
          </div>

          <div className="hero-feature-item">
            <span className="feature-icon-badge">
              <ShieldCheckIcon size={20} />
            </span>
            <span>100% Chính hãng</span>
          </div>

          <div className="hero-feature-item">
            <span className="feature-icon-badge">
              <ZapIcon size={20} />
            </span>
            <span>Bảo hành 24 tháng</span>
          </div>
        </div>
      </div>
    </section>
  );
};
