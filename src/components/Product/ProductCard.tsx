import React from 'react';
import { Heart, Star, Clock, User, Eye } from 'lucide-react';
import { Product } from '../../types';

interface ProductCardProps {
  product: Product;
  isFavorite: boolean;
  onToggleFavorite: (productId: string) => void;
  onViewDetails: (product: Product) => void;
}

export function ProductCard({ product, isFavorite, onToggleFavorite, onViewDetails }: ProductCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const formatRating = (rating: number) => {
    return rating.toFixed(1);
  };

  return (
    <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-300 group relative">
      {/* Image */}
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-40 sm:h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3">
          <button
            onClick={() => onToggleFavorite(product.id)}
            className={`p-2 rounded-full transition-colors ${
              isFavorite
                ? 'bg-red-500 text-white shadow-lg'
                : 'bg-white/90 text-gray-600 hover:bg-red-50 hover:text-red-500'
            }`}
          >
            <Heart className={`h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} />
          </button>
        </div>
        <div className="absolute bottom-3 left-3">
          <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
            {product.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs sm:text-sm text-gray-500">{product.level}</span>
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="text-xs sm:text-sm font-medium">{formatRating(product.rating)}</span>
            <span className="text-xs sm:text-sm text-gray-500">({product.reviews})</span>
          </div>
        </div>

        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {product.name}
        </h3>

        <p className="text-xs sm:text-sm text-gray-600 mb-3 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center space-x-2 sm:space-x-4 text-xs sm:text-sm text-gray-500 mb-4">
          <div className="flex items-center space-x-1">
            <User className="h-4 w-4" />
            <span className="truncate">{product.instructor}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="h-4 w-4" />
            <span>{product.duration}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-lg sm:text-2xl font-bold text-blue-600">
            {formatPrice(product.price)}
          </div>
          <button
            onClick={() => onViewDetails(product)}
            className="flex items-center justify-center space-x-1 sm:space-x-2 bg-blue-600 text-white px-2 sm:px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors text-xs sm:text-sm font-medium min-w-[100px] sm:min-w-[120px]"
          >
            <Eye className="h-4 w-4" />
            <span className="hidden sm:inline">Xem chi tiết</span>
            <span className="sm:hidden">Chi tiết</span>
          </button>
        </div>
      </div>
    </div>
  );
}