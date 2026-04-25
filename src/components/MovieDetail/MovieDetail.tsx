import { useEffect } from 'react';
import { getImageUrl } from '../../services/tmdbApi';
import type { MovieDetails } from '../../types/movie.types';
import { LoadingSpinner } from '../LoadingSpinner/LoadingSpinner';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import './MovieDetail.css';

interface MovieDetailProps {
  movie: MovieDetails | null;
  isLoading: boolean;
  error: string | null;
  onClose: () => void;
}

export function MovieDetail({
  movie,
  isLoading,
  error,
  onClose,
}: MovieDetailProps) {
  // Cierra el modal al presionar Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  // Bloquea el scroll del body mientras el modal está abierto
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div
      className="detail-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Detalle de película"
    >
      {/* stopPropagation evita cerrar el modal al hacer clic dentro del panel */}
      <div className="detail-panel" onClick={(e) => e.stopPropagation()}>
        <button
          className="detail-close"
          onClick={onClose}
          aria-label="Cerrar"
        >
          ✕
        </button>

        {isLoading && <LoadingSpinner />}
        {error && <ErrorMessage message={error} />}

        {movie && !isLoading && (
          <>
            <div
              className="detail-backdrop"
              style={{
                backgroundImage: `url(${getImageUrl(movie.backdrop_path, 'w1280')})`,
              }}
            />
            <div className="detail-content">
              <img
                src={getImageUrl(movie.poster_path, 'w342')}
                alt={`Póster de ${movie.title}`}
                className="detail-poster"
              />
              <div className="detail-info">
                <h2 className="detail-title">{movie.title}</h2>
                {movie.tagline && (
                  <p className="detail-tagline">"{movie.tagline}"</p>
                )}

                <div className="detail-meta">
                  <span className="detail-score">
                    ★ {movie.vote_average.toFixed(1)}
                  </span>
                  {movie.release_date && (
                    <span>{movie.release_date.slice(0, 4)}</span>
                  )}
                  {movie.runtime != null && movie.runtime > 0 && (
                    <span>{movie.runtime} min</span>
                  )}
                </div>

                {movie.genres.length > 0 && (
                  <div className="detail-genres">
                    {movie.genres.map((g) => (
                      <span key={g.id} className="genre-badge">
                        {g.name}
                      </span>
                    ))}
                  </div>
                )}

                <p className="detail-overview">
                  {movie.overview || 'Sin sinopsis disponible.'}
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
