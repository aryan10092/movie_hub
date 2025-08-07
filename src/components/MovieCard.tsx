'use client';

import React from 'react';
import Image from 'next/image';
import { Calendar, Film, Tv } from 'lucide-react';
import { Movie } from '@/types/movie';

interface MovieCardProps {
  movie: Movie;
  onClick: (movie: Movie) => void;
}

export default function MovieCard({ movie, onClick }: MovieCardProps) {
  const handleClick = () => {
    onClick(movie);
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    target.src = '/placeholder-movie.svg';
  };

  const TypeIcon = movie.Type === 'movie' ? Film : Tv;

  return (
    <div
      onClick={handleClick}
      className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 group"
    >
      <div className="relative overflow-hidden rounded-t-lg">
        <div className="aspect-[2/3] relative">
          {movie.Poster && movie.Poster !== 'N/A' ? (
            <Image
              src={movie.Poster}
              alt={movie.Title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              onError={handleImageError}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <div className="text-center text-gray-500">
                <Film className="w-12 h-12 mx-auto mb-2" />
                <p className="text-sm">No Image</p>
              </div>
            </div>
          )}
        </div>
        
        {/* Type Badge */}
        <div className="absolute top-2 right-2">
          <div className="bg-black bg-opacity-75 text-white px-2 py-1 rounded-full flex items-center gap-1 text-xs">
            <TypeIcon className="w-3 h-3" />
            {movie.Type === 'movie' ? 'Movie' : 'TV Series'}
          </div>
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
          {movie.Title}
        </h3>
        
        <div className="flex items-center text-gray-600 text-sm">
          <Calendar className="w-4 h-4 mr-1" />
          <span>{movie.Year}</span>
        </div>
      </div>
    </div>
  );
}
