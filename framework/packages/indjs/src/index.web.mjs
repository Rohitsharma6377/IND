// Browser-friendly INDJS entry for Vite dev
// Exposes only modules that are safe on the client without optional server deps.

// Components
export { default as Image } from "./components/image.jsx";
export { default as Link } from "./components/link.jsx";
export { default as Script } from "./components/script.jsx";
export { default as Head } from "./components/head.jsx";
export { default as ErrorBoundary } from "./components/error-boundary.jsx";
export { default as View } from "./components/view.jsx";
export { default as Text } from "./components/text.jsx";
export { default as ScrollView } from "./components/scroll-view.jsx";
export { default as TextInput } from "./components/text-input.jsx";
export { default as Button } from "./components/button.jsx";
export { default as ActivityIndicator } from "./components/activity-indicator.jsx";
export { default as Switch } from "./components/switch.jsx";
export { default as FlatList } from "./components/flat-list.jsx";
export { default as TouchableOpacity } from "./components/touchable-opacity.jsx";
export { default as Pressable } from "./components/pressable.jsx";
export { default as ImageBackground } from "./components/image-background.jsx";
export { default as Modal } from "./components/modal.jsx";
export { default as SafeAreaView } from "./components/safe-area-view.jsx";
export { default as StatusBar } from "./components/status-bar.jsx";

// Routing utilities (pure)
// Routing utilities (pure)
export {
  matchDynamic,
  isDynamicRoute,
} from "./routing/matcher.mjs";

// Code splitting
export { default as dynamic } from "./routing/dynamic.mjs";

// Router hooks/utilities
export { useRouter, Router } from "./routing/router.mjs";
export * as Platform from "./platform.mjs";

export { default as Screen } from "./components/screen.jsx";
export { default as Container } from "./components/container.jsx";
export { default as Card } from "./components/card.jsx";
export { default as Grid } from "./components/grid.jsx";
export { default as Stack } from "./components/stack.jsx";
export { default as Icon } from "./components/icon.jsx";

// Platform detection
export { default as SectionList } from "./components/section-list.jsx";
export { default as KeyboardAvoidingView } from "./components/keyboard-avoiding-view.jsx";
export { default as RefreshControl } from "./components/refresh-control.jsx";
export { default as TouchableHighlight } from "./components/touchable-highlight.jsx";
export { default as TouchableWithoutFeedback } from "./components/touchable-without-feedback.jsx";
export { default as StyleSheet } from "./apis/style-sheet.mjs";
export { default as Alert } from "./apis/alert.mjs";
export { default as Dimensions } from "./apis/dimensions.mjs";
export { default as PixelRatio } from "./apis/pixel-ratio.mjs";
export { default as Linking } from "./apis/linking.mjs";
export {
  isWeb,
  isDesktop,
  isMobile,
  isAndroid,
  isIOS,
  platform,
} from "./platform.mjs";
