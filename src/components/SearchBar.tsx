'use client';

import React, { useState, useEffect } from 'react';
import { SearchIcon } from 'lucide-react';
import { useMovies } from '@/contexts/MovieContext';

export default function SearchBar() {
  const { state, searchMoviesAction, setSearchQuery } = useMovies();
  const [localQuery, setLocalQuery] = useState(state.searchQuery);

  useEffect(() => {
    setLocalQuery(state.searchQuery);
  }, [state.searchQuery]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!localQuery.trim()) return;
    
    setSearchQuery(localQuery);
    await searchMoviesAction(localQuery, 1);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalQuery(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="relative">
        <input
          type="text"
          value={localQuery}
          onChange={handleInputChange}
          placeholder="Search for movies or TV series..."
          className="w-full px-4 py-3 pl-12 pr-4 text-gray-900 placeholder-gray-500 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          disabled={state.loading}
        />
        <div className="absolute inset-y-0 left-0 flex items-center pl-3">
          <SearchIcon className="w-5 h-5 text-gray-400" />
        </div>
        <button
          type="submit"
          disabled={state.loading || !localQuery.trim()}
          className="absolute inset-y-0 right-0 flex items-center pr-3"
        >
          <div className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200">
            {state.loading ? 'Searching...' : 'Search'}
          </div>
        </button>
      </div>
    </form>
  );
}
