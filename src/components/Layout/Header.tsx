import React from 'react';
import { Heart, BookOpen, User, Search, Menu } from 'lucide-react';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onFavoritesClick: () => void;
  favoritesCount: number;
  currentView: 'home' | 'favorites';
  onHomeClick: () => void;
  onMenuToggle?: () => void;
}

export function Header({ 
  searchQuery, 
  onSearchChange, 
  onFavoritesClick, 
  favoritesCount,
  currentView,
  onHomeClick,
  onMenuToggle
}: HeaderProps) {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={onMenuToggle}
              className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>

          {/* Logo */}
          <div 
            className="flex items-center space-x-2 cursor-pointer flex-shrink-0"
            onClick={onHomeClick}
          >
            <BookOpen className="h-8 w-8 text-blue-600" />
            <span className="text-lg sm:text-xl font-bold text-gray-900 hidden xs:block">EcomEdu</span>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-2 sm:mx-4 lg:mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Tìm kiếm khóa học..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden lg:flex items-center space-x-4">
            <button
              onClick={onHomeClick}
              className={`px-4 py-2 rounded-lg transition-colors ${
                currentView === 'home' 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Trang chủ
            </button>
            <button
              onClick={onFavoritesClick}
              className={`relative px-4 py-2 rounded-lg transition-colors ${
                currentView === 'favorites' 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Heart className="h-5 w-5 inline mr-1" />
              Yêu thích
              {favoritesCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {favoritesCount}
                </span>
              )}
            </button>
            <div className="hidden xl:flex items-center space-x-2 text-gray-700">
              <User className="h-5 w-5" />
              <span>Anh Duc</span>
            </div>
          </nav>

          {/* Mobile Navigation */}
          <div className="lg:hidden flex items-center space-x-2">
            <button
              onClick={onFavoritesClick}
              className={`relative p-2 rounded-lg transition-colors ${
                currentView === 'favorites' 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Heart className="h-5 w-5" />
              {favoritesCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {favoritesCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}