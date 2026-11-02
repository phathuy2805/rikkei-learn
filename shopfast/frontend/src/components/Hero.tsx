import React from 'react';
import { ZapIcon, ShieldCheckIcon, TruckIcon, StarIcon, ArrowRightIcon } from './Icons';

export const Hero: React.FC = () => {
  return (
    <section className="hero">
      <div className="container hero-grid-layout">
        {/* Left Column: Headline & Value Proposition */}
        <div className="hero-content">
          <div className="hero-tag">
            <ZapIcon size={16} />
            <span>Sàn Công Nghệ Đỉnh Cao 2026</span>
          </div>

          <h1 className="hero-title">
            Thiết Bị Đỉnh Cao, <br />
            <span>Trải Nghiệm Tương Lai</span>
          </h1>

          <p className="hero-subtitle">
            Hệ sinh thái thiết bị thông minh chính hãng: Laptop cao cấp, flagship smartphone, 
            tai nghe studio và phụ kiện đỉnh cao với chế độ bảo hành 24 tháng siêu tốc.
          </p>

          <div className="hero-cta-group">
            <a href="#products-grid" className="hero-btn-primary">
              <span>Khám Phá Ngay</span>
              <ArrowRightIcon size={18} />
            </a>

            <div className="hero-rating-badge">
              <div className="hero-stars">
                {[1, 2, 3, 4, 5].map((s) => (
                  <StarIcon key={s} size={15} filled />
                ))}
              </div>
              <span><strong>4.9/5</strong> từ hơn 10.000+ tín đồ công nghệ</span>
            </div>
          </div>

          <div className="hero-features">
            <div className="hero-feature-item">
              <span className="feature-icon-badge">
                <TruckIcon size={18} />
              </span>
              <span>Giao siêu tốc 2H</span>
            </div>

            <div className="hero-feature-item">
              <span className="feature-icon-badge">
                <ShieldCheckIcon size={18} />
              </span>
              <span>100% Chính hãng</span>
            </div>

            <div className="hero-feature-item">
              <span className="feature-icon-badge">
                <ZapIcon size={18} />
              </span>
              <span>Bảo hành 24T</span>
            </div>
          </div>
        </div>

        {/* Right Column: High-Impact Visual Banner */}
        <div className="hero-visual-wrapper">
          <div className="hero-image-card">
            <img
              src="/hero-banner.jpg"
              alt="Thiết bị công nghệ đỉnh cao ShopFast"
              className="hero-banner-img"
            />
            {/* Floating High-Contrast Badges */}
            <div className="floating-badge badge-top-right">
              <span className="badge-pulse" />
              <span>⚡ Flash Sale Hôm Nay</span>
            </div>
            <div className="floating-badge badge-bottom-left">
              <span>🔥 Giảm đến <strong>-25%</strong></span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
