// Browser-friendly INDJS entry for Vite dev
// Exposes only modules that are safe on the client without optional server deps.

// Components
export { default as Image } from './components/image.mjs';
export { default as Link } from './components/link.mjs';
export { default as Script } from './components/script.mjs';
export { default as Head } from './components/head.mjs';
export { default as ErrorBoundary } from './components/error-boundary.mjs';

// Routing utilities (pure)
export { discoverRoutes, matchDynamic, isDynamicRoute, fileToRoute } from './routes.mjs';

// Code splitting
export { default as dynamic } from './dynamic.mjs';

// Router hooks/utilities
export { useRouter, Router } from './router.mjs';
