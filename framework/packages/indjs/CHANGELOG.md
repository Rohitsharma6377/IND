# Changelog

All notable changes to the INDJS framework will be documented in this file.

## [3.1.1] - 2025-12-20

### Fixed
- **useRouter Export**: Added missing `useRouter` and `Router` exports to main entry point.

## [3.1.0] - 2025-12-20

### Added
- **Universal SPA Routing**: New `buildUniversalBundle` logic for high-performance Mobile/Capacitor apps.
- **Tailwind Interop**: Added `className` support to all core UI components (`View`, `Text`, `Pressable`, etc.).
- **Native-like Web Primitives**: Improved `ActivityIndicator` (animated spinner) and `SafeAreaView` (safe-area-inset support).
- **CLI Auto-Detection**: `indjs build` now automatically finds `webDir` from `capacitor.config.json`.

### Fixed
- **Type Definitions**: Added missing `className` and `style` props to TypeScript interfaces.
- **TextInput Stability**: Fixed missing `StyleSheet` import in `TextInput`.
- **Navigation Persistence**: Improved `_layout.jsx` detection in universal bundles.

## [3.0.1] - 2025-12-19

### Added
- **Mobile Live Reload**: `indjs mobile:dev` now supports Metro-like hot reloading with auto-detection of LAN IP.
- **Universal Layouts**: Support for `_layout.jsx` wrapping for persistent UI across routes.
- **Strict TypeScript Support**: Framework now includes full type definitions and strict `tsconfig.json`.

### Fixed
- **CLI Robustness**: Fixed various issues with `indjs create` and platform detection.
- **Build Output**: Streamlined `.indjs/static` generation for easier deployment to Vercel/Netlify.
- **Dependencies**: Removed unused and heavy dependencies to keep the core package light.

### Changed
- **Package Structure**: Optimized `package.json` for cleaner NPM publishing.
- **Routing**: Improved file-based routing matcher for dynamic parameters.

## [3.0.0] - 2025-12-01

- Initial V3 release with Universal Architecture (Web + Electron + Capacitor).
