# 🎬 Buscador de Películas — Proyecto de práctica con React + TypeScript + TMDB API

> **Para programadores junior:** Este proyecto está diseñado para que aprendas a consumir una API real, manejar estado en React y tipar correctamente con TypeScript. Lee este README de principio a fin antes de tocar el código.

---

## Tabla de contenidos

1. [¿Qué vas a construir?](#1-qué-vas-a-construir)
2. [¿Qué vas a aprender?](#2-qué-vas-a-aprender)
3. [Tecnologías y por qué las usamos](#3-tecnologías-y-por-qué-las-usamos)
4. [Prerrequisitos](#4-prerrequisitos)
5. [Obtener tu API Key de TMDB](#5-obtener-tu-api-key-de-tmdb)
6. [Instalación y configuración](#6-instalación-y-configuración)
7. [Estructura del proyecto](#7-estructura-del-proyecto)
8. [Arquitectura: cómo fluyen los datos](#8-arquitectura-cómo-fluyen-los-datos)
9. [Guía de componentes](#9-guía-de-componentes)
10. [TypeScript: conceptos usados en este proyecto](#10-typescript-conceptos-usados-en-este-proyecto)
11. [Manejo de estado](#11-manejo-de-estado)
12. [Consumo de la API](#12-consumo-de-la-api)
13. [Variables de entorno](#13-variables-de-entorno)
14. [Scripts disponibles](#14-scripts-disponibles)
15. [Cómo extender el proyecto (ejercicios)](#15-cómo-extender-el-proyecto-ejercicios)
16. [Errores frecuentes y cómo resolverlos](#16-errores-frecuentes-y-cómo-resolverlos)
17. [Recursos de aprendizaje](#17-recursos-de-aprendizaje)

---

## 1. ¿Qué vas a construir?

Una aplicación web que permite:

- **Buscar películas** por título usando la API de The Movie Database (TMDB)
- **Ver tarjetas** de resultados con póster, título, puntuación y año
- **Ver el detalle** de una película al hacer clic (sinopsis, géneros, duración)
- **Guardar favoritos** con estado persistido en `localStorage`
- **Paginar resultados** cuando hay muchas coincidencias
- **Ver películas populares** en la pantalla de inicio

La app maneja correctamente estados de carga, error y resultados vacíos.

---

## 2. ¿Qué vas a aprender?

| Concepto | Dónde lo ves en este proyecto |
| --- | --- |
| Props tipadas con interfaces | Todos los componentes en `src/components/` |
| `useState` | `App.tsx`, `SearchBar`, `Pagination` |
| `useEffect` | `useMovieSearch.ts`, `useMovieDetails.ts` |
| Custom Hooks | `src/hooks/useMovieSearch.ts` |
| Context API | `src/context/FavoritesContext.tsx` |
| Fetch / async-await | `src/services/tmdbApi.ts` |
| Manejo de errores | `ErrorMessage.tsx` + try/catch en los hooks |
| Variables de entorno (`.env`) | Configuración de la API key |
| Tipos genéricos en TypeScript | `src/types/movie.types.ts` |

---

## 3. Tecnologías y por qué las usamos

### Vite

Herramienta de build ultrarrápida. Reemplaza a Create React App. Cuando guardas un archivo, el navegador se actualiza al instante (HMR — Hot Module Replacement). Lo usamos porque acelera el desarrollo.

### React 19

Librería para construir interfaces de usuario mediante **componentes**. Cada componente es una función que recibe datos (props) y devuelve HTML (JSX).

### TypeScript

JavaScript con tipos. Nos permite declarar exactamente qué forma tiene cada dato:

```typescript
// Sin TypeScript — JavaScript puro
function mostrarPelicula(pelicula) { ... }

// Con TypeScript — sabes exactamente qué espera la función
function mostrarPelicula(pelicula: Movie) { ... }
```

Si le pasas el tipo incorrecto, el editor te avisa **antes** de ejecutar el código. Eso evita bugs.

### TMDB API (The Movie Database)

API gratuita con información de más de 1 millón de películas. Documentación oficial: https://developer.themoviedb.org/docs

---

## 4. Prerrequisitos

Antes de empezar, asegúrate de tener instalado:

- **Node.js 18 o superior** — [Descargar aquí](https://nodejs.org/)
  ```bash
  node --version   # Debe mostrar v18.x.x o superior
  ```
- **npm 9 o superior** (viene con Node.js)
  ```bash
  npm --version
  ```
- **Git** — [Descargar aquí](https://git-scm.com/)
- Un editor de código. Se recomienda **VS Code** con las extensiones:
  - ESLint
  - Prettier
  - TypeScript (extensión oficial de Microsoft)

---

## 5. Obtener tu API Key de TMDB

La API Key es como una contraseña que identifica tu aplicación ante TMDB. Es gratuita.

**Pasos:**

1. Ve a [https://www.themoviedb.org/](https://www.themoviedb.org/) y crea una cuenta gratuita.
2. Una vez dentro, ve a **Ajustes de cuenta** (tu avatar → Settings).
3. En el menú lateral, haz clic en **API**.
4. Haz clic en **Create** y selecciona **Developer**.
5. Acepta los términos y completa el formulario (puedes poner datos ficticios para uso personal).
6. Copia el valor de **API Key (v3 auth)** — es una cadena larga de caracteres.

> **Importante:** Nunca compartas tu API Key públicamente ni la subas a GitHub. El siguiente paso explica cómo protegerla.

---

## 6. Instalación y configuración

### Paso 1: Clonar el repositorio

```bash
git clone <url-del-repositorio>
cd buscadorDe-peliculas
```

### Paso 2: Instalar dependencias

```bash
npm install
```

Esto descarga todas las librerías definidas en `package.json` dentro de la carpeta `node_modules/`.

### Paso 3: Crear el archivo de variables de entorno

En la raíz del proyecto, crea un archivo llamado `.env`:

```bash
# En Mac/Linux:
touch .env

# En Windows (PowerShell):
New-Item .env
```

Dentro de `.env`, escribe:

```env
VITE_TMDB_API_KEY=aqui_pega_tu_api_key
VITE_TMDB_BASE_URL=https://api.themoviedb.org/3
VITE_TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p
```

> **¿Por qué el prefijo `VITE_`?** Vite solo expone al navegador las variables de entorno que empiezan con `VITE_`. Es una medida de seguridad para que no filtre accidentalmente variables del servidor.

### Paso 4: Iniciar el servidor de desarrollo

```bash
npm run dev
```

Abre tu navegador en `http://localhost:5173` y deberías ver la app funcionando.

---

## 7. Estructura del proyecto

```
buscadorDe-peliculas/
├── public/                     # Archivos estáticos (favicon, etc.)
├── src/
│   ├── assets/                 # Imágenes y recursos estáticos
│   ├── components/             # Componentes de UI reutilizables
│   │   ├── SearchBar/
│   │   │   ├── SearchBar.tsx   # Input de búsqueda con debounce
│   │   │   └── SearchBar.css
│   │   ├── MovieCard/
│   │   │   ├── MovieCard.tsx   # Tarjeta individual de película
│   │   │   └── MovieCard.css
│   │   ├── MovieGrid/
│   │   │   └── MovieGrid.tsx   # Grilla que renderiza varias MovieCard
│   │   ├── MovieDetail/
│   │   │   ├── MovieDetail.tsx # Vista detallada de una película
│   │   │   └── MovieDetail.css
│   │   ├── Pagination/
│   │   │   └── Pagination.tsx  # Botones de paginación
│   │   ├── LoadingSpinner/
│   │   │   └── LoadingSpinner.tsx
│   │   └── ErrorMessage/
│   │       └── ErrorMessage.tsx
│   ├── context/
│   │   └── FavoritesContext.tsx # Estado global de favoritos
│   ├── hooks/
│   │   ├── useMovieSearch.ts   # Hook para búsqueda de películas
│   │   └── useMovieDetails.ts  # Hook para detalle de una película
│   ├── services/
│   │   └── tmdbApi.ts          # Capa de comunicación con la API
│   ├── types/
│   │   └── movie.types.ts      # Interfaces TypeScript para los datos de TMDB
│   ├── App.tsx                 # Componente raíz, maneja el estado principal
│   ├── App.css
│   ├── main.tsx                # Punto de entrada de la app
│   └── index.css               # Estilos globales
├── .env                        # Variables de entorno (NO subir a Git)
├── .gitignore
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

### ¿Por qué esta estructura?

- **`components/`** — Cada componente tiene su propia carpeta con su CSS. Facilita encontrar y modificar cada pieza visual.
- **`hooks/`** — La lógica de negocio (llamadas a la API, transformación de datos) vive separada de los componentes. Los componentes solo se preocupan por mostrar datos.
- **`services/`** — Toda la comunicación con la API está centralizada. Si la URL de la API cambia, solo modificas un archivo.
- **`types/`** — Las interfaces TypeScript en un solo lugar. Si la respuesta de la API cambia su estructura, actualizas los tipos y TypeScript te señala todos los lugares que necesitan ajuste.
- **`context/`** — El estado que múltiples componentes necesitan compartir (favoritos) vive aquí.

---

## 8. Arquitectura: cómo fluyen los datos

```
TMDB API
    │
    ▼
tmdbApi.ts (service)        ← Solo hace fetch, no sabe nada de React
    │
    ▼
useMovieSearch.ts (hook)    ← Llama al service, maneja loading/error/data
    │
    ▼
App.tsx                     ← Recibe los datos del hook, distribuye a componentes
    │
    ├──▶ SearchBar           ← Emite el query de búsqueda hacia arriba (callback)
    ├──▶ MovieGrid           ← Recibe array de películas, renderiza MovieCards
    │        └──▶ MovieCard  ← Recibe una película, la muestra
    ├──▶ MovieDetail         ← Recibe una película seleccionada
    └──▶ Pagination          ← Recibe página actual y total, emite cambios
```

**Concepto clave — Flujo unidireccional de datos:**
Los datos bajan (de padre a hijo vía props). Los eventos suben (de hijo a padre vía callbacks). Esto hace que la app sea predecible: siempre sabes de dónde viene un dato.

---

## 9. Guía de componentes

### SearchBar

**Responsabilidad:** Mostrar un campo de texto y notificar al padre cuando el usuario escribe.

```tsx
// src/components/SearchBar/SearchBar.tsx

interface SearchBarProps {
  query: string;                          // valor actual del input (controlado por el padre)
  onQueryChange: (value: string) => void; // callback que se llama al escribir
  placeholder?: string;                   // opcional, tiene valor por defecto
}
```

> **Para practicar:** Agrega un botón "Limpiar" que llame a `onQueryChange('')`.

---

### MovieCard

**Responsabilidad:** Mostrar la información resumida de una película (póster, título, puntuación, año).

```tsx
// src/components/MovieCard/MovieCard.tsx

interface MovieCardProps {
  movie: Movie;                            // el objeto de película con todos sus datos
  onSelect: (movie: Movie) => void;        // al hacer clic, notifica al padre
  isFavorite: boolean;                     // si está en favoritos, muestra un icono de corazón
  onToggleFavorite: (id: number) => void;
}
```

> **Para practicar:** Agrega un badge de color según la puntuación (rojo < 5, amarillo < 7, verde >= 7).

---

### MovieGrid

**Responsabilidad:** Recibir un array de películas y renderizar una `MovieCard` por cada una.

```tsx
// src/components/MovieGrid/MovieGrid.tsx

interface MovieGridProps {
  movies: Movie[];
  onMovieSelect: (movie: Movie) => void;
  favoriteIds: number[];
  onToggleFavorite: (id: number) => void;
}
```

> **Para practicar:** Agrega un prop `emptyMessage: string` que se muestre cuando `movies` está vacío.

---

### MovieDetail

**Responsabilidad:** Mostrar todos los datos de una película seleccionada en un modal o panel lateral.

```tsx
// src/components/MovieDetail/MovieDetail.tsx

interface MovieDetailProps {
  movie: MovieDetails | null; // puede ser null si ninguna está seleccionada
  onClose: () => void;        // cierra el detalle
}
```

> **Para practicar:** Agrega un botón para ver el tráiler (TMDB tiene endpoint de videos).

---

### Pagination

**Responsabilidad:** Mostrar botones de "Anterior" / "Siguiente" y los números de página.

```tsx
// src/components/Pagination/Pagination.tsx

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}
```

> **Para practicar:** Limita la cantidad de páginas mostradas a 5 (con puntos suspensivos para el resto).

---

### LoadingSpinner y ErrorMessage

Componentes simples de UI para los estados de carga y error.

```tsx
interface ErrorMessageProps {
  message: string;
  onRetry?: () => void; // opcional: botón para reintentar
}
```

---

## 10. TypeScript: conceptos usados en este proyecto

### Interfaces vs Types

En este proyecto usamos `interface` para describir la forma de los objetos:

```typescript
// src/types/movie.types.ts

// Película tal como la devuelve la API en listados
export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;  // puede ser null si no hay imagen
  backdrop_path: string | null;
  vote_average: number;        // puntuación del 0 al 10
  vote_count: number;
  release_date: string;        // formato "YYYY-MM-DD"
  genre_ids: number[];         // solo IDs en el listado
  popularity: number;
  adult: boolean;
  original_language: string;
  original_title: string;
  video: boolean;
}

// Película con detalle completo (endpoint diferente)
export interface MovieDetails extends Movie {
  runtime: number | null;      // duración en minutos
  genres: Genre[];             // aquí ya vienen los objetos, no solo IDs
  budget: number;
  revenue: number;
  homepage: string;
  status: string;
  tagline: string;
  production_companies: ProductionCompany[];
}

export interface Genre {
  id: number;
  name: string;
}

// Respuesta estándar de TMDB para endpoints de lista
export interface TMDBListResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}
```

### Union types

```typescript
type LoadingState = 'idle' | 'loading' | 'success' | 'error';
```

Más claro que usar un `boolean` de `isLoading` y otro de `hasError`.

### Props opcionales

```typescript
interface Props {
  title: string;          // requerido
  subtitle?: string;      // opcional (puede no pasarse)
}
```

### Tipos de funciones en props

```typescript
interface Props {
  onClick: () => void;                    // función sin argumentos, sin retorno
  onChange: (value: string) => void;      // función con un argumento
  onSelect: (movie: Movie) => void;       // función con tipo personalizado
  renderItem?: (item: Movie) => JSX.Element; // función que devuelve JSX (opcional)
}
```

---

## 11. Manejo de estado

### Estado local con `useState`

Para estado que solo usa un componente:

```typescript
// En App.tsx
const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
const [currentPage, setCurrentPage] = useState<number>(1);
const [searchQuery, setSearchQuery] = useState<string>('');
```

### Estado global con Context API

Para el estado de favoritos (que varios componentes necesitan leer y modificar):

```typescript
// src/context/FavoritesContext.tsx

interface FavoritesContextValue {
  favoriteIds: number[];
  addFavorite: (id: number) => void;
  removeFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;
}
```

Los favoritos se sincronizan con `localStorage` para que persistan al recargar la página.

### Estado derivado del servidor con custom hooks

```typescript
// src/hooks/useMovieSearch.ts

interface UseMovieSearchReturn {
  movies: Movie[];
  totalPages: number;
  currentPage: number;
  status: LoadingState;
  error: string | null;
  search: (query: string, page?: number) => void;
}

export function useMovieSearch(): UseMovieSearchReturn { ... }
```

El hook encapsula: el fetch, el estado de loading, el manejo de errores, y los datos. El componente solo llama al hook y usa lo que devuelve.

---

## 12. Consumo de la API

### Endpoints que usa esta app

| Endpoint | Para qué |
| --- | --- |
| `GET /movie/popular` | Películas populares (pantalla de inicio) |
| `GET /search/movie?query=...` | Buscar por título |
| `GET /movie/{id}` | Detalle de una película |
| `GET /genre/movie/list` | Lista de géneros |

### Ejemplo de respuesta de TMDB (`/search/movie`)

```json
{
  "page": 1,
  "results": [
    {
      "id": 550,
      "title": "Fight Club",
      "overview": "A ticking-time-bomb insomniac...",
      "poster_path": "/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
      "vote_average": 8.4,
      "release_date": "1999-10-15"
    }
  ],
  "total_pages": 1,
  "total_results": 1
}
```

Para construir la URL de la imagen:
```
https://image.tmdb.org/t/p/w500{poster_path}
```

### La capa de servicio

```typescript
// src/services/tmdbApi.ts

const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export async function searchMovies(
  query: string,
  page: number = 1
): Promise<TMDBListResponse<Movie>> {
  const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&page=${page}&language=es-ES`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Error de API: ${response.status}`);
  }

  return response.json();
}
```

> **¿Por qué `encodeURIComponent`?** Si el usuario busca "El señor de los anillos", el espacio y la "ñ" romperían la URL. Esta función las convierte a su equivalente seguro para URLs.

---

## 13. Variables de entorno

```
VITE_TMDB_API_KEY=tu_api_key_aqui
VITE_TMDB_BASE_URL=https://api.themoviedb.org/3
VITE_TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p
```

**En el código se acceden así:**

```typescript
import.meta.env.VITE_TMDB_API_KEY
import.meta.env.VITE_TMDB_BASE_URL
```

**Archivos de entorno reconocidos por Vite:**

| Archivo | Cuándo se usa |
| --- | --- |
| `.env` | Siempre |
| `.env.local` | Siempre, pero ignorado por Git (ideal para secrets) |
| `.env.development` | Solo en `npm run dev` |
| `.env.production` | Solo en `npm run build` |

> **Nunca subas `.env` a Git si contiene tu API key.** Confirma que `.env` está en `.gitignore`.

---

## 14. Scripts disponibles

```bash
npm run dev       # Inicia el servidor de desarrollo en localhost:5173
npm run build     # Compila TypeScript y genera la carpeta dist/ para producción
npm run preview   # Sirve la carpeta dist/ localmente para probar el build
npm run lint      # Analiza el código con ESLint y muestra advertencias/errores
```

---

## 15. Cómo extender el proyecto (ejercicios)

Estos ejercicios están ordenados de menor a mayor dificultad:

### Nivel 1 — Fácil
- [ ] Agregar un spinner de carga mientras se obtienen los datos
- [ ] Mostrar un mensaje cuando la búsqueda no devuelve resultados
- [ ] Agregar el año de lanzamiento en cada `MovieCard`
- [ ] Hacer que el input de búsqueda tenga autofocus al cargar la página

### Nivel 2 — Intermedio
- [ ] Implementar **debounce** en el `SearchBar` (esperar 500ms después de que el usuario deja de escribir para buscar, evitando un fetch por cada tecla)
- [ ] Agregar un **selector de idioma** (TMDB soporta `es-ES`, `en-US`, etc.)
- [ ] Implementar la **vista de favoritos** en una pestaña separada
- [ ] Agregar filtros por **género** usando el endpoint `/genre/movie/list`

### Nivel 3 — Avanzado
- [ ] Implementar **infinite scroll** en lugar de paginación
- [ ] Agregar un **modo oscuro** con Context API y persistencia en `localStorage`
- [ ] Crear una página de **"Películas similares"** usando `GET /movie/{id}/similar`
- [ ] Mostrar el **tráiler** de una película en un modal (endpoint: `GET /movie/{id}/videos`)
- [ ] Agregar **React Router** para que cada película tenga su propia URL (`/movie/550`)

---

## 16. Errores frecuentes y cómo resolverlos

### `401 Unauthorized` al llamar a la API

Tu API key es incorrecta o no está cargada. Verifica:
1. Que el archivo `.env` existe en la raíz del proyecto (no dentro de `src/`)
2. Que el nombre de la variable empieza con `VITE_`
3. **Reinicia el servidor** (`Ctrl+C` y `npm run dev` de nuevo). Vite solo carga las variables de entorno al iniciar.

### `Type error: Property 'X' does not exist on type 'Y'`

TypeScript te está diciendo que estás accediendo a una propiedad que no declaraste en la interfaz. Busca la interfaz correspondiente en `src/types/movie.types.ts` y agrega la propiedad.

### La imagen del póster no carga

`poster_path` puede ser `null` para películas sin imagen. Siempre verifica antes de construir la URL:

```tsx
// Mal — rompe si poster_path es null
<img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />

// Bien — usa una imagen de fallback
<img
  src={movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : '/placeholder.png'
  }
  alt={movie.title}
/>
```

### `Cannot read properties of undefined (reading 'map')`

Estás intentando hacer `.map()` en un array que todavía es `undefined` (los datos no llegaron aún). Inicializa el estado con un array vacío:

```typescript
const [movies, setMovies] = useState<Movie[]>([]); // [] no undefined
```

### El componente se re-renderiza infinitamente

Probablemente tienes un `useEffect` con una dependencia que cambia en cada render. Revisa el array de dependencias del `useEffect`.

---

## 17. Recursos de aprendizaje

### Documentación oficial
- [React Docs](https://react.dev/) — La documentación oficial, con ejemplos interactivos
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html) — Guía completa de TypeScript
- [Vite Docs](https://vite.dev/) — Variables de entorno, configuración
- [TMDB API Docs](https://developer.themoviedb.org/docs) — Todos los endpoints disponibles

### Para entender los conceptos de este proyecto
- [React useState](https://react.dev/reference/react/useState)
- [React useEffect](https://react.dev/reference/react/useEffect)
- [Custom Hooks](https://react.dev/learn/reusing-logic-with-custom-hooks)
- [Context API](https://react.dev/learn/passing-data-deeply-with-context)
- [TypeScript con React](https://react.dev/learn/typescript)

---

## Licencia

MIT — úsalo, modifícalo y compártelo libremente.

---

*¿Encontraste un bug o quieres sugerir una mejora? Abre un Issue o un Pull Request.*
