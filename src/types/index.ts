export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  fullDescription: string;
  category: string;
  rating: number;
  reviews: number;
  instructor: string;
  duration: string;
  level: string;
  language: string;
  tags: string[];
  features: string[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  favorites: string[];
  viewHistory: string[];
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface FilterOptions {
  category?: string;
  priceRange?: string;
  level?: string;
  language?: string;
  rating?: number;
}

export interface SearchFilters extends FilterOptions {
  query: string;
}