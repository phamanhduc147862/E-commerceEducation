import React from 'react';

export function ProductSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Image skeleton */}
      <div className="w-full h-48 bg-gray-200 animate-pulse"></div>
      
      {/* Content skeleton */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
        </div>
        
        <div className="h-6 w-full bg-gray-200 rounded animate-pulse mb-2"></div>
        <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse mb-3"></div>
        
        <div className="h-4 w-full bg-gray-200 rounded animate-pulse mb-1"></div>
        <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse mb-4"></div>
        
        <div className="flex items-center space-x-4 mb-4">
          <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="h-8 w-24 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-10 w-28 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}