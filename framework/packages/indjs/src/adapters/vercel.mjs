// Vercel Edge/Functions adapter stub
// Usage (Edge): export default handler
// Usage (Node Function): export default handler

import { discoverRoutes, matchDynamic } from '../routes.mjs';
import { renderPageModule } from '../ssr.mjs';
import { routeToClientPath } from '../build_client.mjs';

export default async function handler(req, res) {
  try {
    const url = new URL(req.url);
    const root = process.cwd();
    const { pages, api } = await discoverRoutes(root);

    // API routes
    if (url.pathname.startsWith('/api')) {
      const match = matchDynamic(url.pathname, api);
      if (!match) return res.status(404).json({ error: 'Not Found' });
      const mod = await import(match.route.file);
      const method = (req.method || 'GET').toLowerCase();
      const fn = mod[method] || mod.default;
      if (!fn) return res.status(405).json({ error: 'Method Not Allowed' });
      const body = await readBody(req);
      const result = await fn({ req, res, params: match.params, query: Object.fromEntries(url.searchParams), body });
      if (!res.headersSent && result !== undefined) return res.json(result);
      return;
    }

    // Pages
    const match = matchDynamic(url.pathname, pages);
    if (!match) return res.status(404).end('Not Found');
    const mod = await import(match.route.file);
    const clientSrc = `/__indjs/client${routeToClientPath(match.route.route)}`;
    const rendered = await renderPageModule({ mod, ctx: { req, res, query: Object.fromEntries(url.searchParams), params: match.params, root, pageFile: match.route.file, route: match.route.route }, assets: { clientSrc } });
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    if (typeof rendered === 'function') return rendered(res);
    return res.end(rendered);
  } catch (e) {
    res.status(500).end('Internal Server Error');
  }
}

async function readBody(req) {
  return await new Promise((resolve) => {
    let data = '';
    req.on('data', chunk => data += chunk);
    req.on('end', () => {
      try { resolve(JSON.parse(data || '{}')); } catch { resolve({ raw: data }); }
    });
  });
}
