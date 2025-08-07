'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { X, Calendar, Clock, Star, Globe, Award, Users, Film, Tv } from 'lucide-react';
import { Movie, MovieDetails } from '@/types/movie';
import { getMovieDetails } from '@/lib/api';

interface MovieModalProps {
  movie: Movie;
  onClose: () => void;
}

export default function MovieModal({ movie, onClose }: MovieModalProps) {
  const [details, setDetails] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const movieDetails = await getMovieDetails(movie.imdbID);
        if (movieDetails) {
          setDetails(movieDetails);
        } else {
          setError('Failed to load movie details');
        }
      } catch (err) {
        setError('Failed to load movie details');
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [movie.imdbID]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const TypeIcon = movie.Type === 'movie' ? Film : Tv;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm bg-opacity-75"
      onClick={handleBackdropClick}
    >
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-lg shadow-2xl overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          title="Close modal"
          aria-label="Close movie details modal"
          className="absolute top-4 right-6 z-10 p-1 bg-gra bg-opacity-50 text-gray-400 rounded-full hover:text-gray-500 transition-all duration-200"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="overflow-y-auto max-h-[90vh]">
          {loading ? (
            <div className="flex items-center justify-center h-96">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center h-96">
              <div className="text-center text-red-500">
                <p className="text-lg font-medium mb-2">Error Loading Details</p>
                <p className="text-gray-600">{error}</p>
              </div>
            </div>
          ) : details ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
              {/* Poster */}
              <div className="md:col-span-1">
                <div className="aspect-[2/3] relative rounded-lg overflow-hidden">
                  {details.Poster && details.Poster !== 'N/A' ? (
                    <Image
                      src={details.Poster}
                      alt={details.Title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <Film className="w-16 h-16 text-gray-400" />
                    </div>
                  )}
                </div>
              </div>

              {/* Details */}
              <div className="md:col-span-2 space-y-6">
                {/* Title and Basic Info */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <TypeIcon className="w-5 h-5 text-gray-600" />
                    <span className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                      {details.Type === 'movie' ? 'Movie' : 'TV Series'}
                    </span>
                  </div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {details.Title}
                  </h1>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {details.Released}
                    </div>
                    {details.Runtime !== 'N/A' && (
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {details.Runtime}
                      </div>
                    )}
                    {details.imdbRating !== 'N/A' && (
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500" />
                        {details.imdbRating}/10
                      </div>
                    )}
                    {details.Rated !== 'N/A' && (
                      <span className="px-2 py-1 bg-gray-100 rounded text-xs font-medium">
                        {details.Rated}
                      </span>
                    )}
                  </div>
                </div>

                {/* Plot */}
                {details.Plot !== 'N/A' && (
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900 mb-2">Plot</h2>
                    <p className="text-gray-700 leading-relaxed">{details.Plot}</p>
                  </div>
                )}

                {/* Genres */}
                {details.Genre !== 'N/A' && (
                  <div>
                    <h3 className="text-md font-semibold text-gray-900 mb-2">Genres</h3>
                    <div className="flex flex-wrap gap-2">
                      {details.Genre.split(', ').map((genre) => (
                        <span
                          key={genre}
                          className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                        >
                          {genre}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Cast and Crew */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {details.Director !== 'N/A' && (
                    <div>
                      <h3 className="text-md font-semibold text-gray-900 mb-1">Director</h3>
                      <p className="text-gray-700">{details.Director}</p>
                    </div>
                  )}
                  {details.Actors !== 'N/A' && (
                    <div>
                      <h3 className="text-md font-semibold text-gray-900 mb-1">Cast</h3>
                      <p className="text-gray-700">{details.Actors}</p>
                    </div>
                  )}
                </div>

                {/* Additional Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  {details.Language !== 'N/A' && (
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-700">{details.Language}</span>
                    </div>
                  )}
                  {details.Country !== 'N/A' && (
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-700">{details.Country}</span>
                    </div>
                  )}
                  {details.Awards !== 'N/A' && (
                    <div className="sm:col-span-2 flex items-start gap-2">
                      <Award className="w-4 h-4 text-gray-500 mt-0.5" />
                      <span className="text-gray-700">{details.Awards}</span>
                    </div>
                  )}
                </div>

                {/* Ratings */}
                {details.Ratings && details.Ratings.length > 0 && (
                  <div>
                    <h3 className="text-md font-semibold text-gray-900 mb-2">Ratings</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {details.Ratings.map((rating) => (
                        <div
                          key={rating.Source}
                          className="bg-gray-50 p-3 rounded-lg text-center"
                        >
                          <div className="text-sm font-medium text-gray-600">
                            {rating.Source}
                          </div>
                          <div className="text-lg font-bold text-gray-900">
                            {rating.Value}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
