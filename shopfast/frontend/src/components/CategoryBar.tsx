import React from 'react';
import type { Category } from '../types';

interface CategoryBarProps {
  categories: Category[];
  selectedCategoryId: string;
  onSelectCategory: (id: string) => void;
}

export const CategoryBar: React.FC<CategoryBarProps> = ({
  categories,
  selectedCategoryId,
  onSelectCategory,
}) => {
  return (
    <div className="category-bar">
      <div className="container">
        <div className="category-scroll">
          <button
            className={`cat-pill ${selectedCategoryId === '' ? 'active' : ''}`}
            onClick={() => onSelectCategory('')}
          >
            🔥 Tất cả sản phẩm
          </button>

          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`cat-pill ${selectedCategoryId === cat.id ? 'active' : ''}`}
              onClick={() => onSelectCategory(cat.id)}
            >
              {cat.icon || '📦'} {cat.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
