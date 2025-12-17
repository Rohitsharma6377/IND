// Dimensions API for Web
import { EventEmitter } from "events";

const listeners = new EventEmitter();

if (typeof window !== "undefined") {
  window.addEventListener("resize", () => {
    listeners.emit("change", { window: getWindow(), screen: getScreen() });
  });
}

function getWindow() {
  if (typeof window === "undefined")
    return { width: 0, height: 0, scale: 1, fontScale: 1 };
  return {
    width: window.innerWidth,
    height: window.innerHeight,
    scale: window.devicePixelRatio || 1,
    fontScale: 1,
  };
}

function getScreen() {
  if (typeof window === "undefined")
    return { width: 0, height: 0, scale: 1, fontScale: 1 };
  return {
    width: window.screen.width,
    height: window.screen.height,
    scale: window.devicePixelRatio || 1,
    fontScale: 1,
  };
}

export const Dimensions = {
  get: (dim) => {
    if (dim === "window") return getWindow();
    if (dim === "screen") return getScreen();
    return getWindow();
  },
  addEventListener: (type, handler) => {
    if (type === "change") {
      listeners.on("change", handler);
      return {
        remove: () => listeners.off("change", handler),
      };
    }
    return { remove: () => {} };
  },
  removeEventListener: (type, handler) => {
    if (type === "change") {
      listeners.off("change", handler);
    }
  },
};

export default Dimensions;
