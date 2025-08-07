'use client';

import React, { useState } from 'react';
import { useMovies } from '@/contexts/MovieContext';
import MovieCard from './MovieCard';
import MovieModal from './MovieModal';
import { Movie } from '@/types/movie';

export default function MovieGrid() {
  const { state } = useMovies();
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleMovieClick = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  if (!state.hasSearched) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500">
          <svg
            className="w-24 h-24 mx-auto mb-4 text-gray-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <h3 className="text-xl font-medium text-gray-900 mb-2">
            Search for Movies & TV Series
          </h3>
          <p className="text-gray-600">
            Enter a title in the search bar above to discover amazing content
          </p>
        </div>
      </div>
    );
  }

  if (state.loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {Array.from({ length: 10 }).map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="bg-gray-300 aspect-[2/3] rounded-t-lg"></div>
            <div className="bg-white p-4 rounded-b-lg">
              <div className="h-4 bg-gray-300 rounded mb-2"></div>
              <div className="h-3 bg-gray-300 rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (state.error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-500">
          <svg
            className="w-24 h-24 mx-auto mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
          <h3 className="text-xl font-medium text-gray-900 mb-2">
            Oops! Something went wrong
          </h3>
          <p className="text-gray-600 mb-4">{state.error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (state.movies.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500">
          <svg
            className="w-24 h-24 mx-auto mb-4 text-gray-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.563M15 9.34c0-1.521-.63-2.895-1.652-3.84A7.966 7.966 0 0112 5c-2.633 0-4.928 1.27-6.364 3.234C4.756 8.798 4.5 9.867 4.5 11c0 .367.015.73.045 1.09M19.5 13.09c.03-.36.045-.723.045-1.09 0-4.418-3.582-8-8-8s-8 3.582-8 8c0 1.748.563 3.365 1.516 4.674"
            />
          </svg>
          <h3 className="text-xl font-medium text-gray-900 mb-2">
            No Results Found
          </h3>
          <p className="text-gray-600">
            Try adjusting your search terms or filters
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="mb-4">
        <p className="text-gray-600">
          Found {state.totalResults.toLocaleString()} results
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {state.movies.map((movie) => (
          <MovieCard
            key={movie.imdbID}
            movie={movie}
            onClick={handleMovieClick}
          />
        ))}
      </div>

      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
}
