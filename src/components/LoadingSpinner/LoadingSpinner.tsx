import './LoadingSpinner.css';

export function LoadingSpinner() {
  return (
    <div className="spinner-wrapper" role="status" aria-label="Cargando">
      <div className="spinner" />
    </div>
  );
}
