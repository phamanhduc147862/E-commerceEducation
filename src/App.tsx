import React, { useState, useEffect } from 'react';
import { Header } from './components/Layout/Header';
import { Sidebar } from './components/Layout/Sidebar';
import { ProductGrid } from './components/Product/ProductGrid';
import { ProductModal } from './components/Product/ProductModal';
import { AISuggestions } from './components/AI/AISuggestions';
import { ViewHistory } from './components/ViewHistory/ViewHistory';
import { Toast } from './components/Toast/Toast';
import { useProducts } from './hooks/useProducts';
import { useAISuggestions } from './hooks/useAISuggestions';
import { useLocalStorage } from './hooks/useLocalStorage';
import { Product, SearchFilters } from './types';
import { Filter } from 'lucide-react';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<SearchFilters>({ query: '' });
  const [currentView, setCurrentView] = useState<'home' | 'favorites'>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [favorites, setFavorites] = useLocalStorage<string[]>('favorites', []);
  const [viewHistory, setViewHistory] = useLocalStorage<string[]>('viewHistory', []);
  const [toast, setToast] = useState<{
    message: string;
    type: 'success' | 'error';
    isVisible: boolean;
  }>({
    message: '',
    type: 'success',
    isVisible: false
  });

  const { products, loading, error, fetchProducts, getProductById } = useProducts();
  const { suggestions, loading: suggestionsLoading, error: suggestionsError, fetchSuggestions } = useAISuggestions();

  // Update filters when search query changes
  useEffect(() => {
    setFilters(prev => ({ ...prev, query: searchQuery }));
  }, [searchQuery]);

  // Fetch products when filters change
  useEffect(() => {
    fetchProducts(filters);
  }, [filters]);

  const handleToggleFavorite = (productId: string) => {
    const newFavorites = favorites.includes(productId)
      ? favorites.filter(id => id !== productId)
      : [...favorites, productId];
    
    setFavorites(newFavorites);
    
    const product = getProductById(productId);
    if (product) {
      setToast({
        message: favorites.includes(productId) 
          ? `Đã xóa "${product.name}" khỏi danh sách yêu thích`
          : `Đã thêm "${product.name}" vào danh sách yêu thích`,
        type: 'success',
        isVisible: true
      });
    }
  };

  const handleViewDetails = (product: Product) => {
    setSelectedProduct(product);
    
    // Add to view history
    const newHistory = viewHistory.filter(id => id !== product.id);
    newHistory.push(product.id);
    setViewHistory(newHistory);
  };

  const handleGetSuggestions = async () => {
    try {
      await fetchSuggestions('user-1', favorites, viewHistory);
    } catch (error) {
      console.error('Failed to fetch suggestions:', error);
    }
  };

  const handleFiltersChange = (newFilters: SearchFilters) => {
    setFilters(newFilters);
  };

  const displayedProducts = currentView === 'favorites' 
    ? products.filter(product => favorites.includes(product.id))
    : products;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onFavoritesClick={() => setCurrentView('favorites')}
        favoritesCount={favorites.length}
        currentView={currentView}
        onHomeClick={() => setCurrentView('home')}
        onMenuToggle={() => setSidebarVisible(!sidebarVisible)}
      />

      <div className="flex relative">
        <Sidebar
          filters={filters}
          onFiltersChange={handleFiltersChange}
          isVisible={sidebarVisible}
          onClose={() => setSidebarVisible(false)}
        />

        <div className="flex-1 p-3 sm:p-4 lg:p-6">
          <div className="max-w-7xl mx-auto">
            {/* Mobile filter toggle */}
            <div className="lg:hidden mb-4 sm:mb-6">
              <button
                onClick={() => setSidebarVisible(!sidebarVisible)}
                className="flex items-center space-x-2 bg-white px-3 sm:px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors text-sm sm:text-base"
              >
                <Filter className="h-4 w-4" />
                <span>Bộ lọc</span>
              </button>
            </div>

            {/* Page Title */}
            <div className="mb-4 sm:mb-6">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                {currentView === 'favorites' ? 'Khóa học yêu thích' : 'Khóa học nổi bật'}
              </h1>
              <p className="text-sm sm:text-base text-gray-600">
                {currentView === 'favorites' 
                  ? `Bạn có ${favorites.length} khóa học yêu thích`
                  : 'Khám phá các khóa học chất lượng cao từ những chuyên gia hàng đầu'
                }
              </p>
            </div>

            {/* Home View Content */}
            {currentView === 'home' && (
              <>
                <AISuggestions
                  suggestions={suggestions}
                  loading={suggestionsLoading}
                  error={suggestionsError}
                  onGetSuggestions={handleGetSuggestions}
                  favorites={favorites}
                  onToggleFavorite={handleToggleFavorite}
                  onViewDetails={handleViewDetails}
                />

                <ViewHistory
                  viewHistory={viewHistory}
                  getProductById={getProductById}
                  onViewDetails={handleViewDetails}
                />
              </>
            )}

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
                <p className="text-sm sm:text-base text-red-600">{error}</p>
              </div>
            )}

            {/* Products Grid */}
            <ProductGrid
              products={displayedProducts}
              loading={loading}
              favorites={favorites}
              onToggleFavorite={handleToggleFavorite}
              onViewDetails={handleViewDetails}
            />
          </div>
        </div>
      </div>

      {/* Product Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        isFavorite={selectedProduct ? favorites.includes(selectedProduct.id) : false}
        onToggleFavorite={handleToggleFavorite}
      />

      {/* Toast Notification */}
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={() => setToast(prev => ({ ...prev, isVisible: false }))}
      />
    </div>
  );
}

export default App;