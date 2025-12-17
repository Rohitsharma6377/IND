/**
 * Platform detection utilities for INDJS
 *
 * Usage:
 * import { isWeb, isDesktop, isMobile, isAndroid, isIOS, platform } from 'indjs';
 *
 * if (isMobile) { ... }
 */

// Check if running in a browser environment
const isBrowser = typeof window !== "undefined";

// Electron detection (renderer process)
export const isDesktop =
  isBrowser &&
  (window.process?.type === "renderer" ||
    !!window.electron ||
    navigator.userAgent.includes("Electron"));

// Capacitor detection
export const isMobile =
  isBrowser &&
  (!!window.Capacitor ||
    !!window.androidBridge ||
    !!window.webkit?.messageHandlers?.bridge ||
    navigator.userAgent.includes("Capacitor"));

// Specific mobile platforms
export const isAndroid = isMobile && /android/i.test(navigator.userAgent);
export const isIOS = isMobile && /iphone|ipad|ipod/i.test(navigator.userAgent);

// Web fallback (if not desktop or mobile app)
export const isWeb = !isDesktop && !isMobile;

// Get current platform name
export const platform = (() => {
  if (isDesktop) return "desktop";
  if (isAndroid) return "android";
  if (isIOS) return "ios";
  if (isMobile) return "mobile"; // fallback
  return "web";
})();

// React Native compatible API
export const OS = platform;

export const select = (obj) => {
  if (obj.hasOwnProperty(OS)) return obj[OS];
  if (obj.hasOwnProperty("native") && isMobile) return obj["native"];
  if (obj.hasOwnProperty("default")) return obj["default"];
  return undefined;
};

export default {
  isWeb,
  isDesktop,
  isMobile,
  isAndroid,
  isIOS,
  platform,
  OS,
  select,
};
