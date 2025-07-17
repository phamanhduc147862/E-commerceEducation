import React from 'react';
import { Product } from '../../types';
import { ProductCard } from './ProductCard';
import { ProductSkeleton } from './ProductSkeleton';

interface ProductGridProps {
  products: Product[];
  loading: boolean;
  favorites: string[];
  onToggleFavorite: (productId: string) => void;
  onViewDetails: (product: Product) => void;
}

export function ProductGrid({ 
  products, 
  loading, 
  favorites, 
  onToggleFavorite, 
  onViewDetails 
}: ProductGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <ProductSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-6xl mb-4">📚</div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Không tìm thấy khóa học nào
        </h3>
        <p className="text-gray-500">
          Hãy thử tìm kiếm với từ khóa khác hoặc điều chỉnh bộ lọc
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          isFavorite={favorites.includes(product.id)}
          onToggleFavorite={onToggleFavorite}
          onViewDetails={onViewDetails}
        />
      ))}
    </div>
  );
}