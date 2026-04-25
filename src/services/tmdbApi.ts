import type { Movie, MovieDetails, TMDBListResponse } from '../types/movie.types';

const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const IMAGE_BASE_URL = import.meta.env.VITE_TMDB_IMAGE_BASE_URL;

// Función interna: hace el fetch y lanza error si la respuesta no es OK
// El parámetro signal permite cancelar la request con AbortController
async function apiFetch<T>(endpoint: string, signal?: AbortSignal): Promise<T> {
  const separator = endpoint.includes('?') ? '&' : '?';
  const url = `${BASE_URL}${endpoint}${separator}api_key=${API_KEY}&language=es-ES`;

  const response = await fetch(url, { signal });

  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`);
  }

  return response.json() as Promise<T>;
}

// Construye la URL completa de una imagen de TMDB
// Si path es null (película sin póster), devuelve el placeholder
export function getImageUrl(path: string | null, size = 'w500'): string {
  if (!path) return '/placeholder.svg';
  return `${IMAGE_BASE_URL}/${size}${path}`;
}

export function getPopularMovies(
  page = 1,
  signal?: AbortSignal,
): Promise<TMDBListResponse<Movie>> {
  return apiFetch(`/movie/popular?page=${page}`, signal);
}

export function searchMovies(
  query: string,
  page = 1,
  signal?: AbortSignal,
): Promise<TMDBListResponse<Movie>> {
  return apiFetch(
    `/search/movie?query=${encodeURIComponent(query)}&page=${page}`,
    signal,
  );
}

export function getMovieDetails(
  id: number,
  signal?: AbortSignal,
): Promise<MovieDetails> {
  return apiFetch(`/movie/${id}`, signal);
}
