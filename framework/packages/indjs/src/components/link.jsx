import React from "react";

// INDJS Link component - lightweight client-side navigation helper
// Performs SPA-like navigation for same-origin internal links.
// Props: href, prefetch, replace, scroll (default true), onClick, target, rel, className, style
export default function Link({
  href,
  children,
  prefetch = false,
  replace = false,
  scroll = true,
  onClick,
  className,
  style,
  target,
  rel,
  ...rest
}) {
  // Basic prefetch: hint the browser via <link rel="prefetch">
  React.useEffect(() => {
    if (!prefetch || !href) return;
    try {
      const l = document.createElement("link");
      l.rel = "prefetch";
      l.href = href;
      document.head.appendChild(l);
      return () => {
        try {
          document.head.removeChild(l);
        } catch {}
      };
    } catch {}
  }, [href, prefetch]);

  const handleClick = (e) => {
    if (onClick) onClick(e);
    if (e.defaultPrevented) return;
    // Only intercept simple left-clicks without modifier keys
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey)
      return;
    if (!href) return;
    if (target && target !== "_self") return;
    let url;
    try {
      url = new URL(href, window.location.origin);
    } catch {
      // Invalid URL, let browser handle
      return;
    }
    // Skip non-http(s) protocols and special schemes
    const proto = url.protocol;
    if (proto && proto !== "http:" && proto !== "https:") return;
    // External
    if (url.origin !== window.location.origin) return;
    // Respect download links
    if (rest.download) return;
    // Hash-only navigation optimization
    const current =
      window.location.pathname + window.location.search + window.location.hash;
    const next = url.pathname + url.search + url.hash;
    if (next === current) {
      e.preventDefault();
      if (scroll) {
        if (url.hash) {
          const el = document.getElementById(url.hash.slice(1));
          if (el) el.scrollIntoView();
          else window.scrollTo(0, 0);
        } else {
          window.scrollTo(0, 0);
        }
      }
      return;
    }
    e.preventDefault();
    // Do push/replace state
    if (replace) window.history.replaceState({}, "", next);
    else window.history.pushState({}, "", next);
    // Emit a custom navigation event so the app can load the target module
    try {
      window.dispatchEvent(
        new CustomEvent("ind:navigate", { detail: { href: next } }),
      );
    } catch {}
    // Scroll behavior
    if (scroll) {
      if (url.hash) {
        const el = document.getElementById(url.hash.slice(1));
        if (el) el.scrollIntoView();
        else window.scrollTo(0, 0);
      } else {
        window.scrollTo(0, 0);
      }
    }
  };

  const relFinal =
    target === "_blank"
      ? [rel, "noopener", "noreferrer"].filter(Boolean).join(" ")
      : rel;
  return React.createElement(
    "a",
    {
      href,
      className,
      style,
      target,
      rel: relFinal,
      onClick: handleClick,
      ...rest,
    },
    children,
  );
}
