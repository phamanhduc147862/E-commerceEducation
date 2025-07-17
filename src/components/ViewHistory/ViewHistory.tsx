import React from 'react';
import { Clock, Eye } from 'lucide-react';
import { Product } from '../../types';

interface ViewHistoryProps {
  viewHistory: string[];
  getProductById: (id: string) => Product | undefined;
  onViewDetails: (product: Product) => void;
}

export function ViewHistory({ viewHistory, getProductById, onViewDetails }: ViewHistoryProps) {
  if (viewHistory.length === 0) {
    return null;
  }

  const recentProducts = viewHistory
    .slice(-5)
    .reverse()
    .map(id => getProductById(id))
    .filter(Boolean) as Product[];

  return (
    <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 mb-6 sm:mb-8">
      <div className="flex items-center space-x-2 mb-4">
        <Clock className="h-5 w-5 text-gray-600" />
        <h3 className="text-base sm:text-lg font-semibold text-gray-900">Đã xem gần đây</h3>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
        {recentProducts.map((product) => (
          <div
            key={product.id}
            className="group cursor-pointer"
            onClick={() => onViewDetails(product)}
          >
            <div className="relative overflow-hidden rounded-lg mb-2">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-20 sm:h-24 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                <Eye className="h-5 w-5 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>
            <h4 className="text-xs sm:text-sm font-medium text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
              {product.name}
            </h4>
            <p className="text-xs text-gray-500 mt-1 truncate">{product.instructor}</p>
          </div>
        ))}
      </div>
    </div>
  );
}