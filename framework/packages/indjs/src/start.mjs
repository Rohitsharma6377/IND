import express from 'express';
import path from 'path';
import { pathToFileURL } from 'url';
import { discoverRoutes, matchDynamic } from './routes.mjs';
import { renderPageModule } from './ssr.mjs';
import { routeToClientPath } from './build_client.mjs';
import { loadModule } from './load.mjs';
import fs from 'fs/promises';
import sharp from 'sharp';

export async function start({ root, port }) {
  const app = express();
  const publicDir = path.join(root, 'public');
  const outDir = path.join(root, '.indjs', 'client');
  const staticOut = path.join(root, '.indjs', 'static');
  app.use(express.static(publicDir, { extensions: ['html'] }));
  // Cache hashed assets aggressively
  app.use('/__indjs/client', express.static(outDir, {
    setHeaders(res, filePath) {
      if (/\.[0-9a-f]{8}\.js$/.test(filePath)) {
        res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
      } else {
        res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate');
      }
    }
  }));
  app.use(express.json());
  // Serve pre-rendered static pages
  app.use(express.static(staticOut));

  // Load manifest with hashed client bundles if available
  let manifest = {};
  try {
    const m = await fs.readFile(path.join(outDir, 'manifest.json'), 'utf8');
    manifest = JSON.parse(m);
  } catch {}

  // Global middleware
  let middleware = null;
  const middlewareCandidates = ['_middleware.ts', '_middleware.tsx', '_middleware.jsx', '_middleware.js'];
  for (const c of middlewareCandidates) {
    const f = path.join(root, 'pages', c);
    try { await fs.access(f); middleware = await loadModule(f); break; } catch {}
  }
  app.use(async (req, res, next) => {
    if (!middleware?.default) return next();
    try {
      const result = await middleware.default({ req, res, root });
      if (result === false || res.headersSent) return;
      return next();
    } catch (e) { return next(e); }
  });

  // Image optimization: /_image?src=/path&w=600&q=80
  app.get('/_image', async (req, res, next) => {
    try {
      const { src, w, q } = req.query;
      if (!src || typeof src !== 'string' || /^(https?:)?\/\//.test(src)) return res.status(400).send('Invalid src');
      const width = w ? parseInt(String(w), 10) : undefined;
      const quality = q ? parseInt(String(q), 10) : 80;
      const filePath = path.join(root, 'public', src.replace(/^\//, ''));
      const image = sharp(filePath);
      if (width) image.resize({ width, withoutEnlargement: true });
      const buf = await image.jpeg({ quality }).toBuffer();
      res.setHeader('Content-Type', 'image/jpeg');
      res.end(buf);
    } catch (e) { next(e); }
  });

  const { pages, api } = await discoverRoutes(root);

  // API routes
  app.all(/.*/, async (req, res, next) => {
    if (!req.path.startsWith('/api')) return next();
    const match = matchDynamic(req.path, api);
    if (!match) return res.status(404).json({ error: 'Not Found' });
    const mod = await loadModule(match.route.file);
    const handler = mod[req.method.toLowerCase()] || mod[req.method.toUpperCase()] || mod.default;
    if (!handler) return res.status(405).json({ error: 'Method Not Allowed' });
    try {
      const result = await handler({ req, res, params: match.params, query: req.query, body: req.body });
      if (!res.headersSent && result !== undefined) res.json(result);
    } catch (e) { next(e); }
  });

  // Page routes
  app.get(/.*/, async (req, res, next) => {
    try {
      const match = matchDynamic(req.path, pages);
      if (!match) return next();
      const mod = await loadModule(match.route.file);
      const fallback = `/__indjs/client${routeToClientPath(match.route.route)}`;
      const mapped = manifest[match.route.route];
      const clientSrc = mapped || fallback;
      const html = await renderPageModule({ mod, ctx: { req, res, query: req.query, params: match.params, root, pageFile: match.route.file, route: match.route.route }, assets: { clientSrc, manifest: JSON.stringify(manifest) } });
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      res.end(html);
    } catch (e) { next(e); }
  });

  app.use((req, res) => res.status(404).send('Not Found'));

  app.listen(port, () => console.log(`[indjs] server listening on http://localhost:${port}`));
}
