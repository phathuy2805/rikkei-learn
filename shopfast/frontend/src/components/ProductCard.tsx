import React from 'react';
import type { Product } from '../types';
import { StarIcon, ShoppingBagIcon } from './Icons';

interface ProductCardProps {
  product: Product;
  onAddToCart: (p: Product) => void;
  isAdding?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  isAdding = false,
}) => {
  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  const discountPercent =
    product.originalPrice && product.originalPrice > product.price
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : null;

  return (
    <div className="product-card">
      <div className="card-img-wrapper">
        <img
          src={product.imageUrl || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80'}
          alt={product.name}
          className="product-img"
          loading="lazy"
        />

        {discountPercent && (
          <span className="badge-discount">-{discountPercent}%</span>
        )}

        {product.category && (
          <span className="badge-cat-tag">{product.category.name}</span>
        )}
      </div>

      <div className="card-body">
        <div className="card-rating">
          <div className="stars">
            {[1, 2, 3, 4, 5].map((star) => (
              <StarIcon
                key={star}
                size={14}
                filled={star <= Math.round(product.rating)}
              />
            ))}
          </div>
          <span className="rating-num">{product.rating.toFixed(1)}</span>
          <span className="rating-count">({product.ratingCount})</span>
        </div>

        <h3 className="product-title" title={product.name}>
          {product.name}
        </h3>

        <div className="product-sku">SKU: {product.sku}</div>

        <div className="price-row">
          <div className="current-price">{formatPrice(product.price)}</div>
          {product.originalPrice && (
            <div className="original-price">{formatPrice(product.originalPrice)}</div>
          )}
        </div>

        <div className="card-footer">
          <span className={`stock-tag ${product.stock > 0 ? 'in-stock' : 'out-stock'}`}>
            {product.stock > 0 ? `Còn ${product.stock} máy` : 'Hết hàng'}
          </span>

          <button
            className="btn-add-cart"
            onClick={() => onAddToCart(product)}
            disabled={product.stock <= 0 || isAdding}
          >
            <ShoppingBagIcon size={16} />
            <span>{isAdding ? 'Đang thêm...' : 'Thêm giỏ'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
