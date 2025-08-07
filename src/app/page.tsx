'use client';

import SearchBar from '@/components/SearchBar';
import FilterPanel from '@/components/FilterPanel';
import MovieGrid from '@/components/MovieGrid';
import Pagination from '@/components/Pagination';
import { MovieProvider } from '@/contexts/MovieContext';
import { Film } from 'lucide-react';

export default function HomePage() {
  return (
    <MovieProvider>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-center mb-8">
              <Film className="w-8 h-8 text-blue-600 mr-3" />
              <h1 className="text-3xl font-bold text-gray-900">
                Movie Explorer
              </h1>
            </div>
            <SearchBar />
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <FilterPanel />
          <MovieGrid />
          <Pagination />
        </main>

        {/* Footer */}
        <footer className="bg-white border-t">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="text-center text-gray-600">
              <p>
                Powered by{' '}
                <a
                  href="http://www.omdbapi.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
                >
                  OMDb API
                </a>
              </p>
              <p className="mt-2 text-sm">
                Built with Next.js, TypeScript, and Tailwind CSS
              </p>
            </div>
          </div>
        </footer>
      </div>
    </MovieProvider>
  );
}
