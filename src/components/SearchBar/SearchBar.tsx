import { useRef, useEffect } from 'react';
import './SearchBar.css';

interface SearchBarProps {
  query: string;
  onQueryChange: (value: string) => void;
  placeholder?: string;
}

export function SearchBar({
  query,
  onQueryChange,
  placeholder = 'Buscar películas...',
}: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  // Autofocus al montar el componente
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="search-bar">
      <span className="search-icon" aria-hidden="true">🔍</span>
      <input
        ref={inputRef}
        type="search"
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        placeholder={placeholder}
        className="search-input"
        aria-label="Buscar películas"
        autoComplete="off"
      />
      {query && (
        <button
          className="search-clear"
          onClick={() => onQueryChange('')}
          aria-label="Limpiar búsqueda"
        >
          ✕
        </button>
      )}
    </div>
  );
}
