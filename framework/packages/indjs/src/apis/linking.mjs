import { EventEmitter } from "events";

const eventEmitter = new EventEmitter();

export const Linking = {
  openURL: (url) => {
    if (typeof window !== "undefined") {
      window.open(url, "_blank", "noopener,noreferrer");
    }
    return Promise.resolve();
  },
  canOpenURL: (url) => Promise.resolve(true),
  getInitialURL: () => {
    if (typeof window !== "undefined") {
      return Promise.resolve(window.location.href);
    }
    return Promise.resolve(null);
  },
  addEventListener: (type, handler) => {
    if (type === "url") {
      // In a real web app, we might listen to popstate or hashchange
      // ensuring we return a subscription-like object
      const listener = (e) => handler({ url: window.location.href });
      window.addEventListener("popstate", listener);
      return {
        remove: () => window.removeEventListener("popstate", listener),
      };
    }
    return { remove: () => {} };
  },
  removeEventListener: (type, handler) => {
    // Deprecated in RN but good to have signature
  },
  sendIntent: (action, extras) => Promise.resolve(),
};

export default Linking;
