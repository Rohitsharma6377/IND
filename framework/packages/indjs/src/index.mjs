// Core framework functions
export { dev } from './dev.mjs';
export { start } from './start.mjs';
export { build } from './build.mjs';

// Routing utilities
export { discoverRoutes, matchDynamic, isDynamicRoute, fileToRoute } from './routes.mjs';

// SSR utilities
export { renderPageModule } from './ssr.mjs';

// Build utilities
export { buildClientBundles, routeToClientPath } from './build_client.mjs';

// CSS utilities
export { buildCss, watchCss, cssHref } from './css.mjs';

// Module loading
export { loadModule } from './load.mjs';

// Platform detection
export * as Platform from './platform.mjs';
export { isWeb, isDesktop, isMobile, isAndroid, isIOS, platform } from './platform.mjs';

// Components
export { default as Image } from './components/image.mjs';
export { default as Link } from './components/link.mjs';

// CLI runner
export { run as runCLI } from './cli.mjs';

// Re-export all modules for convenience
export * as Auth from './auth/index.mjs';
export * as Database from './database/index.mjs';
export * as Testing from './testing/index.mjs';
export * as Deployment from './deployment/index.mjs';

// Default export with all utilities
export default {
  // Core functions
  dev,
  start,
  build,

  // Routing
  discoverRoutes,
  matchDynamic,
  isDynamicRoute,
  fileToRoute,

  // SSR
  renderPageModule,

  // Build
  buildClientBundles,
  routeToClientPath,

  // CSS
  buildCss,
  watchCss,
  cssHref,

  // Module loading
  loadModule,

  // Platform
  isWeb,
  isDesktop,
  isMobile,
  isAndroid,
  isIOS,
  platform,

  // CLI
  runCLI
};
