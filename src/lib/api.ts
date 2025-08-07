import { SearchResponse, MovieDetails, SearchParams } from '@/types/movie';

const API_KEY = process.env.NEXT_PUBLIC_OMDB_API_KEY;
const BASE_URL = 'https://www.omdbapi.com/';

if (!API_KEY) {
  console.warn('OMDb API key not found. Please add NEXT_PUBLIC_OMDB_API_KEY to your .env.local file');
}

export async function searchMovies(params: SearchParams): Promise<SearchResponse> {
  try {
    const url = new URL(BASE_URL);
    url.searchParams.append('apikey', API_KEY || '');
    url.searchParams.append('s', params.search);
    url.searchParams.append('page', params.page.toString());
    
    if (params.type) {
      url.searchParams.append('type', params.type);
    }
    
    if (params.year && params.year.trim() !== '') {
      url.searchParams.append('y', params.year);
    }

    const response = await fetch(url.toString());
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: SearchResponse = await response.json();
    
    if (data.Response === 'False') {
      return {
        Search: [],
        totalResults: '0',
        Response: 'False',
        Error: data.Error || 'No results found'
      };
    }

    return data;
  } catch (error) {
    console.error('Error searching movies:', error);
    return {
      Search: [],
      totalResults: '0',
      Response: 'False',
      Error: 'Failed to fetch movies. Please try again.'
    };
  }
}

export async function getMovieDetails(imdbID: string): Promise<MovieDetails | null> {
  try {
    const url = new URL(BASE_URL);
    url.searchParams.append('apikey', API_KEY || '');
    url.searchParams.append('i', imdbID);
    url.searchParams.append('plot', 'full');

    const response = await fetch(url.toString());
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: MovieDetails = await response.json();
    
    if (data.Response === 'False') {
      throw new Error('Movie not found');
    }

    return data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    return null;
  }
}
