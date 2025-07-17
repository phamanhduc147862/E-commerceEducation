import React from 'react';
import { Brain, Sparkles, RefreshCw } from 'lucide-react';
import { Product } from '../../types';
import { ProductCard } from '../Product/ProductCard';

interface AISuggestionsProps {
  suggestions: Product[];
  loading: boolean;
  error: string | null;
  onGetSuggestions: () => void;
  favorites: string[];
  onToggleFavorite: (productId: string) => void;
  onViewDetails: (product: Product) => void;
}

export function AISuggestions({ 
  suggestions, 
  loading, 
  error, 
  onGetSuggestions, 
  favorites, 
  onToggleFavorite, 
  onViewDetails 
}: AISuggestionsProps) {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg sm:rounded-xl p-4 sm:p-6 mb-6 sm:mb-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center space-x-3">
          <div className="bg-blue-100 p-2 rounded-lg">
            <Brain className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900">Gợi ý thông minh</h2>
            <p className="text-xs sm:text-sm text-gray-600">Khóa học được AI đề xuất dành riêng cho bạn</p>
          </div>
        </div>
        <button
          onClick={onGetSuggestions}
          disabled={loading}
          className="flex items-center space-x-2 bg-blue-600 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base w-full sm:w-auto justify-center"
        >
          {loading ? (
            <RefreshCw className="h-4 w-4 animate-spin" />
          ) : (
            <Sparkles className="h-4 w-4" />
          )}
          <span>{loading ? 'Đang tải...' : 'Lấy gợi ý'}</span>
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      {suggestions.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
          {suggestions.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isFavorite={favorites.includes(product.id)}
              onToggleFavorite={onToggleFavorite}
              onViewDetails={onViewDetails}
            />
          ))}
        </div>
      ) : !loading && !error && (
        <div className="text-center py-8">
          <div className="text-gray-400 text-4xl mb-3">🤖</div>
          <p className="text-gray-500">
            Nhấn "Lấy gợi ý" để nhận được khóa học phù hợp với bạn
          </p>
        </div>
      )}
    </div>
  );
}