'use client';

import React from 'react';
import { Filter } from 'lucide-react';
import { useMovies } from '@/contexts/MovieContext';
import { SearchFilters } from '@/types/movie';

export default function FilterPanel() {
  const { state, setFilters, searchMoviesAction } = useMovies();

  const handleFilterChange = async (newFilters: SearchFilters) => {
    setFilters(newFilters);
    
    // Re-search with new filters if there's an active search
    if (state.searchQuery && state.hasSearched) {
      await searchMoviesAction(state.searchQuery, 1);
    }
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newType = e.target.value === '' ? undefined : e.target.value as 'movie' | 'series';
    handleFilterChange({ ...state.filters, type: newType });
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newYear = e.target.value;
    handleFilterChange({ ...state.filters, year: newYear });
  };

  const clearFilters = () => {
    const clearedFilters = { type: undefined, year: '' } as SearchFilters;
    handleFilterChange(clearedFilters);
  };

  const currentYear = new Date().getFullYear();
  const hasActiveFilters = state.filters.type !== undefined || state.filters.year !== '';

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="w-5 h-5 text-gray-600" />
        <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="ml-auto text-sm text-blue-600 hover:text-blue-800 transition-colors duration-200"
          >
            Clear All
          </button>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Type Filter */}
        <div>
          <label htmlFor="type-filter" className="block text-sm font-medium text-gray-700 mb-2">
            Type
          </label>
          <select
            id="type-filter"
            value={state.filters.type || ''}
            onChange={handleTypeChange}
            className="w-full px-3 py-2 border border-gray-300 text-black rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          >
            <option value="">All Types</option>
            <option value="movie">Movie</option>
            <option value="series">TV Series</option>
          </select>
        </div>

        {/* Year Filter */}
        <div>
          <label htmlFor="year-filter" className="block text-sm font-medium text-gray-700 mb-2">
            Year
          </label>
          <input
            id="year-filter"
            type="number"
            value={state.filters.year || ''}
            onChange={handleYearChange}
            placeholder="e.g., 2023"
            min="1900"
            max={currentYear}
            className="w-full px-3 py-1.5 border text-black border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          />
        </div>
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex flex-wrap gap-2">
            {state.filters.type && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                Type: {state.filters.type === 'movie' ? 'Movie' : 'TV Series'}
              </span>
            )}
            {state.filters.year && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                Year: {state.filters.year}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
