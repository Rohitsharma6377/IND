/**
 * dynamic(loader, options)
 *
 * Next.js-like dynamic import helper using React.lazy and Suspense.
 *
 * @param {() => Promise<any>} loader - Promise returning a component module (default export preferred)
 * @param {{ loading?: React.ComponentType<any>, ssr?: boolean }} options
 *   loading: optional fallback component while loading
 *   ssr: whether to render on server (default true). If false, returns null on server
 * @returns {React.ComponentType<any>} A lazy component
 */
import React from "react";

// Next.js-like dynamic import helper
// Usage: const Comp = dynamic(() => import('./Comp'), { loading: Loader, ssr: true })
export default function dynamic(loader, options = {}) {
  const { loading: Loading = null, ssr = true } = options;

  // Wrap loader to default export if necessary
  function wrap(p) {
    return p.then((m) => (m && m.default ? m.default : m));
  }

  const Lazy = React.lazy(() => wrap(loader()));

  function DynamicComponent(props) {
    // If SSR is disabled and we're on server, render nothing (best-effort: no window)
    if (!ssr && typeof window === "undefined") {
      return null;
    }
    const fallback = Loading ? React.createElement(Loading, props) : null;
    return React.createElement(
      React.Suspense,
      { fallback },
      React.createElement(Lazy, props),
    );
  }

  return DynamicComponent;
}
