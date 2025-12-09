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
export { default as View } from './components/view.mjs';
export { default as Text } from './components/text.mjs';
export { default as ScrollView } from './components/scroll-view.mjs';
export { default as TextInput } from './components/text-input.mjs';
export { default as Button } from './components/button.mjs';
export { default as ActivityIndicator } from './components/activity-indicator.mjs';
export { default as Switch } from './components/switch.mjs';
export { default as FlatList } from './components/flat-list.mjs';
export { default as TouchableOpacity } from './components/touchable-opacity.mjs';
export { default as Pressable } from './components/pressable.mjs';
export { default as ImageBackground } from './components/image-background.mjs';
export { default as Modal } from './components/modal.mjs';
export { default as SafeAreaView } from './components/safe-area-view.mjs';
export { default as StatusBar } from './components/status-bar.mjs';
export { default as SectionList } from './components/section-list.mjs';
export { default as KeyboardAvoidingView } from './components/keyboard-avoiding-view.mjs';
export { default as RefreshControl } from './components/refresh-control.mjs';
export { default as TouchableHighlight } from './components/touchable-highlight.mjs';
export { default as TouchableWithoutFeedback } from './components/touchable-without-feedback.mjs';
export { default as StyleSheet } from './apis/style-sheet.mjs';
export { default as Alert } from './apis/alert.mjs';
export { default as Dimensions } from './apis/dimensions.mjs';
export { default as PixelRatio } from './apis/pixel-ratio.mjs';
export { default as Linking } from './apis/linking.mjs';

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
