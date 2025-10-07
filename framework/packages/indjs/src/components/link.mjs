import React from 'react';

// INDJS Link component - lightweight client-side navigation helper
// It renders an <a> and relies on browser navigation for now, but preserves
// future room for client-side router enhancements.
export default function Link({ href, children, prefetch = false, className, style, ...rest }) {
  // Basic prefetch: hint the browser via <link rel="prefetch">
  React.useEffect(() => {
    if (!prefetch || !href) return;
    try {
      const l = document.createElement('link');
      l.rel = 'prefetch';
      l.href = href;
      document.head.appendChild(l);
      return () => { try { document.head.removeChild(l); } catch {} };
    } catch {}
  }, [href, prefetch]);

  return React.createElement(
    'a',
    { href, className, style, ...rest },
    children
  );
}
