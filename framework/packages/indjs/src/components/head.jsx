/**
 * Head component (client helper)
 *
 * Updates document head on the client. For SSR head, prefer `pages/_head.jsx`.
 *
 * Props:
 * - title?: string
 * - metas?: Array<Record<string, string>> (e.g., [{ name: 'description', content: '...' }])
 * - links?: Array<Record<string, string>> (e.g., [{ rel: 'preconnect', href: '...' }])
 */
import React from 'react';

// Minimal Next.js-like <Head> helper.
// Server: no-op (we recommend using pages/_head.jsx for SSR head).
// Client: injects title/meta/link into document.head on mount/update.
export default function Head({ title, metas = [], links = [] }) {
  React.useEffect(() => {
    try {
      const disposers = [];
      if (title) {
        const prev = document.title;
        document.title = title;
        disposers.push(() => { /* keep last title */ });
      }
      for (const m of metas) {
        const el = document.createElement('meta');
        Object.keys(m || {}).forEach((k) => { el.setAttribute(k, String(m[k])); });
        document.head.appendChild(el);
        disposers.push(() => { try { document.head.removeChild(el); } catch {} });
      }
      for (const l of links) {
        const el = document.createElement('link');
        Object.keys(l || {}).forEach((k) => { el.setAttribute(k, String(l[k])); });
        document.head.appendChild(el);
        disposers.push(() => { try { document.head.removeChild(el); } catch {} });
      }
      return () => { disposers.forEach((f) => { try { f(); } catch {} }); };
    } catch {}
  }, [title, JSON.stringify(metas), JSON.stringify(links)]);

  return null;
}
