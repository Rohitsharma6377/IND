// Core framework functions
import { dev } from './dev.mjs';
import { start } from './start.mjs';
import { build } from './build/index.mjs';

// Routing utilities
import { discoverRoutes, matchDynamic, isDynamicRoute, fileToRoute } from './routing/routes.mjs';

// SSR utilities
import { renderPageModule } from './ssr.mjs';

// Build utilities
import { buildClientBundles, routeToClientPath } from './build/client.mjs';

// CSS utilities
import { buildCss, watchCss, cssHref } from './css.mjs';

// Module loading
import { loadModule } from './load.mjs';

// Platform detection
import * as Platform from './platform.mjs';
import { isWeb, isDesktop, isMobile, isAndroid, isIOS, platform } from './platform.mjs';

// CLI runner
import { run as runCLI } from './cli.mjs';

// Re-export specific named exports
export { dev, start, build };
export { discoverRoutes, matchDynamic, isDynamicRoute, fileToRoute };
export { renderPageModule };
export { buildClientBundles, routeToClientPath };
export { buildCss, watchCss, cssHref };
export { loadModule };
export { Platform };
export { isWeb, isDesktop, isMobile, isAndroid, isIOS, platform };
export { runCLI };

// Components
export { default as Image } from './components/image.jsx';
export { default as Link } from './components/link.jsx';
export { default as View } from './components/view.jsx';
export { default as Text } from './components/text.jsx';
export { default as ScrollView } from './components/scroll-view.jsx';
export { default as TextInput } from './components/text-input.jsx';
export { default as Button } from './components/button.jsx';
export { default as ActivityIndicator } from './components/activity-indicator.jsx';
export { default as Switch } from './components/switch.jsx';
export { default as FlatList } from './components/flat-list.jsx';
export { default as TouchableOpacity } from './components/touchable-opacity.jsx';
export { default as Pressable } from './components/pressable.jsx';
export { default as ImageBackground } from './components/image-background.jsx';
export { default as Modal } from './components/modal.jsx';
export { default as SafeAreaView } from './components/safe-area-view.jsx';
export { default as StatusBar } from './components/status-bar.jsx';
export { default as SectionList } from './components/section-list.jsx';
export { default as KeyboardAvoidingView } from './components/keyboard-avoiding-view.jsx';
export { default as RefreshControl } from './components/refresh-control.jsx';
export { default as TouchableHighlight } from './components/touchable-highlight.jsx';
export { default as TouchableWithoutFeedback } from './components/touchable-without-feedback.jsx';
export { default as StyleSheet } from './apis/style-sheet.mjs';
export { default as Alert } from './apis/alert.mjs';
export { default as Dimensions } from './apis/dimensions.mjs';
export { default as PixelRatio } from './apis/pixel-ratio.mjs';
export { default as Linking } from './apis/linking.mjs';

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
