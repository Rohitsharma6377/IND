/**
 * useRouter()
 *
 * Minimal router hook inspired by Next.js.
 * Provides pathname, query, asPath and navigation helpers.
 *
 * API:
 * - pathname: string
 * - query: Record<string, string | string[]>
 * - asPath: string
 * - push(url: string): void
 * - replace(url: string): void
 * - back(): void
 * - reload(): void
 */
import React from 'react';

// Minimal Router utilities inspired by Next.js useRouter
// Provides: useRouter() with push, replace, pathname, search, hash and query

function parseQuery(search) {
  const q = {};
  const usp = new URLSearchParams(search || '');
  for (const [k, v] of usp.entries()) {
    if (q[k] === undefined) q[k] = v; else if (Array.isArray(q[k])) q[k].push(v); else q[k] = [q[k], v];
  }
  return q;
}

export function useRouter() {
  const [state, setState] = React.useState(() => ({
    pathname: typeof window !== 'undefined' ? window.location.pathname : '/',
    search: typeof window !== 'undefined' ? window.location.search : '',
    hash: typeof window !== 'undefined' ? window.location.hash : '',
  }));

  React.useEffect(() => {
    function onPop() {
      setState({ pathname: window.location.pathname, search: window.location.search, hash: window.location.hash });
    }
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const hrefFrom = (url) => (typeof url === 'string' ? url : String(url || ''));

  const navigate = React.useCallback((url, { replace = false } = {}) => {
    const base = window.location.origin;
    let u;
    try { u = new URL(hrefFrom(url), base); } catch { return; }
    const next = u.pathname + u.search + u.hash;
    if (replace) window.history.replaceState({}, '', next); else window.history.pushState({}, '', next);
    try { window.dispatchEvent(new CustomEvent('ind:navigate', { detail: { href: next } })); } catch {}
    setState({ pathname: u.pathname, search: u.search, hash: u.hash });
  }, []);

  const push = React.useCallback((url) => navigate(url, { replace: false }), [navigate]);
  const rep = React.useCallback((url) => navigate(url, { replace: true }), [navigate]);

  return {
    pathname: state.pathname,
    query: parseQuery(state.search),
    asPath: state.pathname + state.search + state.hash,
    push,
    replace: rep,
    back: () => window.history.back(),
    reload: () => window.location.reload(),
  };
}

export const Router = { useRouter };
