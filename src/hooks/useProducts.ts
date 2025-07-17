import { useState, useEffect } from 'react';
import { Product, SearchFilters } from '../types';
import { mockProducts } from '../data/mockData';

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async (filters?: SearchFilters): Promise<Product[]> => {
    setLoading(true);
    setError(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));

      let filteredProducts = [...mockProducts];

      if (filters) {
        if (filters.query) {
          filteredProducts = filteredProducts.filter(product =>
            product.name.toLowerCase().includes(filters.query.toLowerCase()) ||
            product.description.toLowerCase().includes(filters.query.toLowerCase()) ||
            product.tags.some(tag => tag.toLowerCase().includes(filters.query.toLowerCase()))
          );
        }

        if (filters.category) {
          filteredProducts = filteredProducts.filter(product => product.category === filters.category);
        }

        if (filters.priceRange) {
          filteredProducts = filteredProducts.filter(product => {
            const price = product.price;
            switch (filters.priceRange) {
              case 'under-500k':
                return price < 500000;
              case '500k-1m':
                return price >= 500000 && price <= 1000000;
              case 'over-1m':
                return price > 1000000;
              default:
                return true;
            }
          });
        }

        if (filters.level) {
          filteredProducts = filteredProducts.filter(product => product.level === filters.level);
        }

        if (filters.language) {
          filteredProducts = filteredProducts.filter(product => product.language === filters.language);
        }

        if (filters.rating) {
          filteredProducts = filteredProducts.filter(product => product.rating >= filters.rating);
        }
      }

      setProducts(filteredProducts);
      return filteredProducts;
    } catch (err) {
      setError('Failed to fetch products');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getProductById = (id: string): Product | undefined => {
    return mockProducts.find(product => product.id === id);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return {
    products,
    loading,
    error,
    fetchProducts,
    getProductById
  };
}