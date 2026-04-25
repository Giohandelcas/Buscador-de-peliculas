export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  vote_count: number;
  release_date: string;
  genre_ids: number[];
  popularity: number;
  adult: boolean;
  original_language: string;
  original_title: string;
  video: boolean;
}

export interface Genre {
  id: number;
  name: string;
}

export interface ProductionCompany {
  id: number;
  name: string;
  logo_path: string | null;
  origin_country: string;
}

export interface MovieDetails extends Movie {
  runtime: number | null;
  genres: Genre[];
  budget: number;
  revenue: number;
  homepage: string;
  status: string;
  tagline: string;
  production_companies: ProductionCompany[];
}

// T es un tipo genérico: permite reutilizar esta interfaz para Movie, Genre, etc.
export interface TMDBListResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export type LoadingState = 'idle' | 'loading' | 'success' | 'error';
