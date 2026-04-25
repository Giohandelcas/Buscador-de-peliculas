import { useState, useCallback, useRef } from 'react';
import { getMovieDetails } from '../services/tmdbApi';
import type { MovieDetails, LoadingState } from '../types/movie.types';

interface UseMovieDetailsReturn {
  movieDetails: MovieDetails | null;
  status: LoadingState;
  error: string | null;
  fetchDetails: (id: number) => void;
  clear: () => void;
}

export function useMovieDetails(): UseMovieDetailsReturn {
  const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null);
  const [status, setStatus] = useState<LoadingState>('idle');
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const fetchDetails = useCallback(async (id: number) => {
    abortRef.current?.abort();
    abortRef.current = new AbortController();

    setStatus('loading');
    setMovieDetails(null);
    setError(null);

    try {
      const data = await getMovieDetails(id, abortRef.current.signal);
      setMovieDetails(data);
      setStatus('success');
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') return;
      setError(err instanceof Error ? err.message : 'Error desconocido');
      setStatus('error');
    }
  }, []);

  const clear = useCallback(() => {
    abortRef.current?.abort();
    setMovieDetails(null);
    setStatus('idle');
    setError(null);
  }, []);

  return { movieDetails, status, error, fetchDetails, clear };
}
