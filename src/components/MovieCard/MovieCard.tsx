import { getImageUrl } from '../../services/tmdbApi';
import type { Movie } from '../../types/movie.types';
import './MovieCard.css';

interface MovieCardProps {
  movie: Movie;
  onSelect: (movie: Movie) => void;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
}

function getScoreClass(score: number): string {
  if (score >= 7) return 'score-green';
  if (score >= 5) return 'score-yellow';
  return 'score-red';
}

export function MovieCard({
  movie,
  onSelect,
  isFavorite,
  onToggleFavorite,
}: MovieCardProps) {
  const year = movie.release_date?.slice(0, 4) ?? '—';

  return (
    <article className="movie-card" onClick={() => onSelect(movie)}>
      <div className="card-poster-wrapper">
        <img
          src={getImageUrl(movie.poster_path)}
          alt={`Póster de ${movie.title}`}
          className="card-poster"
          loading="lazy"
        />
        <div className="card-overlay" aria-hidden="true" />
        <button
          className={`favorite-btn ${isFavorite ? 'is-favorite' : ''}`}
          onClick={(e) => {
            e.stopPropagation(); // evita abrir el detalle al hacer clic en el corazón
            onToggleFavorite(movie.id);
          }}
          aria-label={isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
        >
          {isFavorite ? '♥' : '♡'}
        </button>
        <span className={`card-score ${getScoreClass(movie.vote_average)}`}>
          ★ {movie.vote_average.toFixed(1)}
        </span>
      </div>
      <div className="card-info">
        <h3 className="card-title">{movie.title}</h3>
        <span className="card-year">{year}</span>
      </div>
    </article>
  );
}
