import { useState } from 'react';
import { Product } from '../types';
import { mockProducts } from '../data/mockData';

export function useAISuggestions() {
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSuggestions = async (userId: string, favorites: string[], viewHistory: string[]): Promise<Product[]> => {
    setLoading(true);
    setError(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Enhanced AI logic: prioritize products user has interacted with
      let suggestedProducts: Product[] = [];

      if (favorites.length > 0 || viewHistory.length > 0) {
        // Get products user has interacted with
        const interactedProducts = mockProducts.filter(p => 
          favorites.includes(p.id) || viewHistory.includes(p.id)
        );
        
        // Priority 1: Include favorited products (highest priority)
        const favoritedProducts = mockProducts.filter(p => favorites.includes(p.id));
        
        // Priority 2: Include recently viewed products
        const recentlyViewedProducts = mockProducts.filter(p => 
          viewHistory.includes(p.id) && !favorites.includes(p.id)
        );
        
        // Priority 3: Similar products based on categories and levels
        const preferredCategories = [...new Set(interactedProducts.map(p => p.category))];
        const preferredLevels = [...new Set(interactedProducts.map(p => p.level))];
        const preferredInstructors = [...new Set(interactedProducts.map(p => p.instructor))];

        const similarProducts = mockProducts.filter(product => 
          !favorites.includes(product.id) && 
          !viewHistory.includes(product.id) &&
          (preferredCategories.includes(product.category) || 
           preferredLevels.includes(product.level) ||
           preferredInstructors.includes(product.instructor))
        );
        
        // Combine all suggestions with priority order
        suggestedProducts = [
          ...favoritedProducts,
          ...recentlyViewedProducts,
          ...similarProducts
        ];
        
        // Sort by rating for better recommendations
        suggestedProducts.sort((a, b) => b.rating - a.rating);
      } else {
        // For new users, suggest top-rated products
        suggestedProducts = mockProducts
          .filter(product => product.rating >= 4.7)
          .sort((a, b) => b.rating - a.rating);
      }

      // Limit to 6 suggestions for better variety
      const limitedSuggestions = suggestedProducts.slice(0, 6);
      setSuggestions(limitedSuggestions);
      return limitedSuggestions;
    } catch (err) {
      setError('Không thể lấy gợi ý lúc này. Vui lòng thử lại sau.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    suggestions,
    loading,
    error,
    fetchSuggestions
  };
}