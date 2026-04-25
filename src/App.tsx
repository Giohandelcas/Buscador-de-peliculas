import { useState, useEffect, useCallback } from 'react';
import { SearchBar } from './components/SearchBar/SearchBar';
import { MovieGrid } from './components/MovieGrid/MovieGrid';
import { MovieDetail } from './components/MovieDetail/MovieDetail';
import { Pagination } from './components/Pagination/Pagination';
import { LoadingSpinner } from './components/LoadingSpinner/LoadingSpinner';
import { ErrorMessage } from './components/ErrorMessage/ErrorMessage';
import { FavoritesProvider, useFavorites } from './context/FavoritesContext';
import { useMovieSearch } from './hooks/useMovieSearch';
import { useMovieDetails } from './hooks/useMovieDetails';
import type { Movie } from './types/movie.types';
import './App.css';

// MovieApp contiene la lógica; está separado de App para poder envolver con el Provider
function MovieApp() {
  const [query, setQuery] = useState('');

  const { movies, totalPages, currentPage, status, error, search, goToPage } =
    useMovieSearch();

  const {
    movieDetails,
    status: detailStatus,
    error: detailError,
    fetchDetails,
    clear: closeDetail,
  } = useMovieDetails();

  const { favoriteIds, toggleFavorite } = useFavorites();

  // Debounce: espera 400ms después de que el usuario deja de escribir.
  // Si el query está vacío (pantalla de inicio), no espera.
  useEffect(() => {
    const delay = query.trim() ? 400 : 0;
    const timer = setTimeout(() => search(query, 1), delay);
    return () => clearTimeout(timer);
  }, [query, search]);

  const handleMovieSelect = useCallback(
    (movie: Movie) => {
      fetchDetails(movie.id);
    },
    [fetchDetails],
  );

  const isDetailOpen =
    detailStatus === 'loading' ||
    detailStatus === 'success' ||
    detailStatus === 'error';

  const resultsLabel = status === 'success'
    ? query.trim()
      ? `Resultados para "${query}"`
      : 'Películas populares'
    : null;

  return (
    <div className="app">
      <header className="app-header">
        <span className="app-logo">🎬 CineSearch</span>
        <SearchBar query={query} onQueryChange={setQuery} />
      </header>

      <main className="app-main">
        {resultsLabel && <p className="results-label">{resultsLabel}</p>}

        {status === 'loading' && <LoadingSpinner />}

        {status === 'error' && (
          <ErrorMessage message={error!} onRetry={() => search(query, 1)} />
        )}

        {status === 'success' && (
          <>
            <MovieGrid
              movies={movies}
              onMovieSelect={handleMovieSelect}
              favoriteIds={favoriteIds}
              onToggleFavorite={toggleFavorite}
              emptyMessage={
                query.trim()
                  ? `No hay resultados para "${query}".`
                  : 'Sin películas disponibles.'
              }
            />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={goToPage}
            />
          </>
        )}
      </main>

      {isDetailOpen && (
        <MovieDetail
          movie={movieDetails}
          isLoading={detailStatus === 'loading'}
          error={detailError}
          onClose={closeDetail}
        />
      )}
    </div>
  );
}

export default function App() {
  return (
    <FavoritesProvider>
      <MovieApp />
    </FavoritesProvider>
  );
}
