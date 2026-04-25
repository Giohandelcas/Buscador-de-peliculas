import { useState, useCallback, useRef } from 'react';
import { searchMovies, getPopularMovies } from '../services/tmdbApi';
import type { Movie, LoadingState } from '../types/movie.types';

interface UseMovieSearchReturn {
  movies: Movie[];
  totalPages: number;
  currentPage: number;
  status: LoadingState;
  error: string | null;
  search: (query: string, page?: number) => void;
  goToPage: (page: number) => void;
}

export function useMovieSearch(): UseMovieSearchReturn {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [status, setStatus] = useState<LoadingState>('idle');
  const [error, setError] = useState<string | null>(null);

  // useRef persiste un valor entre renders sin causar re-renders
  // lastQueryRef guarda el último query para que goToPage sepa qué buscar
  const lastQueryRef = useRef('');
  // abortRef permite cancelar una request en vuelo cuando llega una nueva
  const abortRef = useRef<AbortController | null>(null);

  const search = useCallback(async (query: string, page = 1) => {
    // Cancela la request anterior si todavía está en curso
    abortRef.current?.abort();
    abortRef.current = new AbortController();
    const signal = abortRef.current.signal;

    lastQueryRef.current = query;
    setStatus('loading');
    setError(null);

    try {
      const data = query.trim()
        ? await searchMovies(query, page, signal)
        : await getPopularMovies(page, signal);

      // TMDB limita la paginación a 500 páginas
      setMovies(data.results);
      setTotalPages(Math.min(data.total_pages, 500));
      setCurrentPage(data.page);
      setStatus('success');
    } catch (err) {
      // Si la request fue abortada (por llegar una nueva), no actualizamos el estado
      if (err instanceof Error && err.name === 'AbortError') return;
      setError(err instanceof Error ? err.message : 'Error desconocido');
      setStatus('error');
    }
  }, []);

  const goToPage = useCallback(
    (page: number) => {
      search(lastQueryRef.current, page);
    },
    [search],
  );

  return { movies, totalPages, currentPage, status, error, search, goToPage };
}
