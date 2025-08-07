'use client';

import React from 'react';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import { useMovies } from '@/contexts/MovieContext';

const ITEMS_PER_PAGE = 10;

export default function Pagination() {
  const { state, setPage, searchMoviesAction } = useMovies();

  const totalPages = Math.ceil(state.totalResults / ITEMS_PER_PAGE);
  const currentPage = state.currentPage;

  if (!state.hasSearched || state.totalResults <= ITEMS_PER_PAGE) {
    return null;
  }

  const handlePageChange = async (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) return;
    
    setPage(page);
    await searchMoviesAction(state.searchQuery, page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getPageNumbers = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else {
      if (totalPages > 1) {
        rangeWithDots.push(totalPages);
      }
    }

    return rangeWithDots;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex items-center justify-center space-x-2 mt-8 mb-8">
      {/* Previous Button */}
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1 || state.loading}
        className="flex items-center px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
      >
        <ChevronLeft className="w-4 h-4 mr-1" />
        Previous
      </button>

      {/* Page Numbers */}
      <div className="flex items-center space-x-1">
        {pageNumbers.map((page, index) => {
          if (page === '...') {
            return (
              <span key={`dots-${index}`} className="px-3 py-2 text-gray-500">
                <MoreHorizontal className="w-4 h-4" />
              </span>
            );
          }

          const pageNum = page as number;
          const isCurrentPage = pageNum === currentPage;

          return (
            <button
              key={pageNum}
              onClick={() => handlePageChange(pageNum)}
              disabled={state.loading}
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                isCurrentPage
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {pageNum}
            </button>
          );
        })}
      </div>

      {/* Next Button */}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages || state.loading}
        className="flex items-center px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
      >
        Next
        <ChevronRight className="w-4 h-4 ml-1" />
      </button>

      {/* Page Info */}
      <div className="hidden md:flex items-center ml-4 text-sm text-gray-700">
        Page {currentPage} of {totalPages} ({state.totalResults.toLocaleString()} results)
      </div>
    </div>
  );
}
