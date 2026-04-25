/// <reference types="vite/client" />

// Tipamos las variables de entorno del archivo .env
// Vite solo expone variables que empiecen con VITE_
interface ImportMetaEnv {
  readonly VITE_TMDB_API_KEY: string;
  readonly VITE_TMDB_BASE_URL: string;
  readonly VITE_TMDB_IMAGE_BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
