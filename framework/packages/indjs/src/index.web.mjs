// Browser-friendly INDJS entry for Vite dev
// Exposes only modules that are safe on the client without optional server deps.

// Components
export { default as Image } from './components/image.mjs';
export { default as Link } from './components/link.mjs';
export { default as Script } from './components/script.mjs';
export { default as Head } from './components/head.mjs';
export { default as ErrorBoundary } from './components/error-boundary.mjs';
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

// Routing utilities (pure)
export { discoverRoutes, matchDynamic, isDynamicRoute, fileToRoute } from './routes.mjs';

// Code splitting
export { default as dynamic } from './dynamic.mjs';

// Router hooks/utilities
export { useRouter, Router } from './router.mjs';
export * as Platform from './platform.mjs';

// Platform detection
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
export { isWeb, isDesktop, isMobile, isAndroid, isIOS, platform } from './platform.mjs';
