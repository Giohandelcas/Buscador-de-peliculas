import type { Movie } from '../../types/movie.types';
import { MovieCard } from '../MovieCard/MovieCard';
import './MovieGrid.css';

interface MovieGridProps {
  movies: Movie[];
  onMovieSelect: (movie: Movie) => void;
  favoriteIds: number[];
  onToggleFavorite: (id: number) => void;
  emptyMessage?: string;
}

export function MovieGrid({
  movies,
  onMovieSelect,
  favoriteIds,
  onToggleFavorite,
  emptyMessage = 'No se encontraron películas.',
}: MovieGridProps) {
  if (movies.length === 0) {
    return (
      <div className="grid-empty">
        <span className="grid-empty-icon" aria-hidden="true">🎬</span>
        <p>{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="movie-grid">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onSelect={onMovieSelect}
          isFavorite={favoriteIds.includes(movie.id)}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  );
}
