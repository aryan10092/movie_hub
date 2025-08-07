'use client';

import React, { createContext, useContext, useReducer, useCallback } from 'react';
import { Movie, SearchFilters, SearchParams } from '@/types/movie';
import { searchMovies } from '@/lib/api';

interface MovieState {
  movies: Movie[];
  loading: boolean;
  error: string | null;
  totalResults: number;
  currentPage: number;
  searchQuery: string;
  filters: SearchFilters;
  hasSearched: boolean;
}

type MovieAction =
  | { type: 'SEARCH_START' }
  | { type: 'SEARCH_SUCCESS'; payload: { movies: Movie[]; totalResults: number; page: number } }
  | { type: 'SEARCH_ERROR'; payload: string }
  | { type: 'SET_SEARCH_QUERY'; payload: string }
  | { type: 'SET_FILTERS'; payload: SearchFilters }
  | { type: 'SET_PAGE'; payload: number }
  | { type: 'RESET_SEARCH' };

const initialState: MovieState = {
  movies: [],
  loading: false,
  error: null,
  totalResults: 0,
  currentPage: 1,
  searchQuery: '',
  filters: { type: undefined, year: '' },
  hasSearched: false,
};

function movieReducer(state: MovieState, action: MovieAction): MovieState {
  switch (action.type) {
    case 'SEARCH_START':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'SEARCH_SUCCESS':
      return {
        ...state,
        loading: false,
        movies: action.payload.movies,
        totalResults: action.payload.totalResults,
        currentPage: action.payload.page,
        hasSearched: true,
        error: null,
      };
    case 'SEARCH_ERROR':
      return {
        ...state,
        loading: false,
        error: action.payload,
        movies: [],
        totalResults: 0,
        hasSearched: true,
      };
    case 'SET_SEARCH_QUERY':
      return {
        ...state,
        searchQuery: action.payload,
      };
    case 'SET_FILTERS':
      return {
        ...state,
        filters: action.payload,
        currentPage: 1, 
      };
    case 'SET_PAGE':
      return {
        ...state,
        currentPage: action.payload,
      };
    case 'RESET_SEARCH':
      return {
        ...initialState,
      };
    default:
      return state;
  }
}

interface MovieContextType {
  state: MovieState;
  searchMoviesAction: (query: string, page?: number) => Promise<void>;
  setSearchQuery: (query: string) => void;
  setFilters: (filters: SearchFilters) => void;
  setPage: (page: number) => void;
  resetSearch: () => void;
}

const MovieContext = createContext<MovieContextType | undefined>(undefined);

export function MovieProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(movieReducer, initialState);

  const searchMoviesAction = useCallback(async (query: string, page: number = 1) => {
    if (!query.trim()) {
      dispatch({ type: 'SEARCH_ERROR', payload: 'Please enter a search term' });
      return;
    }

    dispatch({ type: 'SEARCH_START' });

    const searchParams: SearchParams = {
      search: query,
      page,
      ...state.filters,
    };

    try {
      const result = await searchMovies(searchParams);
      
      if (result.Response === 'False') {
        dispatch({ type: 'SEARCH_ERROR', payload: result.Error || 'No movies found' });
      } else {
        dispatch({
          type: 'SEARCH_SUCCESS',
          payload: {
            movies: result.Search,
            totalResults: parseInt(result.totalResults),
            page,
          },
        });
      }
    } catch (error) {
      dispatch({ type: 'SEARCH_ERROR', payload: 'Failed to search movies. Please try again.' });
    }
  }, [state.filters]);

  const setSearchQuery = useCallback((query: string) => {
    dispatch({ type: 'SET_SEARCH_QUERY', payload: query });
  }, []);

  const setFilters = useCallback((filters: SearchFilters) => {
    dispatch({ type: 'SET_FILTERS', payload: filters });
  }, []);

  const setPage = useCallback((page: number) => {
    dispatch({ type: 'SET_PAGE', payload: page });
  }, []);

  const resetSearch = useCallback(() => {
    dispatch({ type: 'RESET_SEARCH' });
  }, []);

  return (
    <MovieContext.Provider
      value={{
        state,
        searchMoviesAction,
        setSearchQuery,
        setFilters,
        setPage,
        resetSearch,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
}

export function useMovies() {
  const context = useContext(MovieContext);
  if (context === undefined) {
    throw new Error('useMovies must be used within a MovieProvider');
  }
  return context;
}
