import React from 'react';
import { Filter, Star, Globe, BarChart3, X } from 'lucide-react';
import { SearchFilters } from '../../types';

interface SidebarProps {
  filters: SearchFilters;
  onFiltersChange: (filters: SearchFilters) => void;
  isVisible: boolean;
  onClose?: () => void;
}

export function Sidebar({ filters, onFiltersChange, isVisible, onClose }: SidebarProps) {
  const categories = [
    'Programming',
    'Language',
    'Marketing',
    'Design',
    'Data Science',
    'Finance'
  ];

  const levels = ['Beginner', 'Intermediate', 'Advanced'];
  const languages = ['English', 'Vietnamese'];

  const handleFilterChange = (key: keyof SearchFilters, value: string) => {
    onFiltersChange({
      ...filters,
      [key]: filters[key] === value ? '' : value
    });
  };


  return (
    <>
      {/* Mobile overlay */}
      {isVisible && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onClose}
        />
      )}
      
      <div className={`fixed lg:sticky top-0 lg:top-20 left-0 z-50 lg:z-auto w-80 lg:w-64 h-full lg:h-fit bg-white border-r border-gray-200 p-4 lg:p-6 overflow-y-auto lg:overflow-visible transition-transform duration-300 ${
        isVisible ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      } max-h-screen lg:max-h-[calc(100vh-5rem)]`}>
        {/* Mobile close button */}
        {isVisible && (
          <div className="lg:hidden flex justify-between items-center mb-4 pb-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Bộ lọc</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        )}

        <div className="flex-1 overflow-y-auto">
          <div className="flex items-center space-x-2 mb-6">
            <Filter className="h-5 w-5 text-gray-600" />
            <h3 className="hidden lg:block text-lg font-semibold text-gray-900">Bộ lọc</h3>
          </div>

          {/* Category Filter */}
          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-900 mb-3">Danh mục</h4>
            <div className="space-y-2">
              {categories.map(category => (
                <label key={category} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.category === category}
                    onChange={() => handleFilterChange('category', category)}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">{category}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Price Range Filter */}
          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-900 mb-3">Khoảng giá</h4>
            <div className="space-y-2">
              {[
                { value: 'under-500k', label: 'Dưới 500.000đ' },
                { value: '500k-1m', label: '500.000đ - 1.000.000đ' },
                { value: 'over-1m', label: 'Trên 1.000.000đ' }
              ].map(option => (
                <label key={option.value} className="flex items-center">
                  <input
                    type="radio"
                    name="priceRange"
                    checked={filters.priceRange === option.value}
                    onChange={() => handleFilterChange('priceRange', option.value)}
                    className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Level Filter */}
          <div className="mb-6">
            <div className="flex items-center space-x-1 mb-3">
              <BarChart3 className="h-4 w-4 text-gray-600" />
              <h4 className="text-sm font-medium text-gray-900">Trình độ</h4>
            </div>
            <div className="space-y-2">
              {levels.map(level => (
                <label key={level} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.level === level}
                    onChange={() => handleFilterChange('level', level)}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">{level}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Rating Filter */}
          <div className="mb-6">
            <div className="flex items-center space-x-1 mb-3">
              <Star className="h-4 w-4 text-gray-600" />
              <h4 className="text-sm font-medium text-gray-900">Đánh giá</h4>
            </div>
            <div className="space-y-2">
              {[4.5, 4.0, 3.5].map(rating => (
                <label key={rating} className="flex items-center">
                  <input
                    type="radio"
                    name="rating"
                    checked={filters.rating === rating}
                    onChange={() => handleFilterChange('rating', rating)}
                    className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700 flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                    {rating}+ sao
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Clear Filters */}
          <button
            onClick={() => onFiltersChange({ query: filters.query })}
            className="w-full py-2 px-4 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Xóa bộ lọc
          </button>
        </div>
    </div>
    </>
  );
}