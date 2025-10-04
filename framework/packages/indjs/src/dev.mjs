import express from 'express';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import { discoverRoutes, matchDynamic } from './routes.mjs';
import { renderPageModule } from './ssr.mjs';
import chokidar from 'chokidar';
import fs from 'fs/promises';
import { buildClientBundles, routeToClientPath } from './build_client.mjs';
import { loadModule } from './load.mjs';
import { watchCss } from './css.mjs';
import sharp from 'sharp';
import net from 'net';
import fsSync from 'fs';
import { EventEmitter } from 'events';

async function findAvailablePort(startPort, tries = 20) {
  let p = startPort;
  for (let i = 0; i < tries; i++, p++) {
    const free = await new Promise(resolve => {
      const srv = net.createServer();
      srv.once('error', () => resolve(false));
      srv.once('listening', () => srv.close(() => resolve(true)));
      srv.listen(p, '0.0.0.0');
    });
    if (free) return p;
  }
  throw new Error(`No free port found starting at ${startPort}`);
}

export async function dev({ root, port }) {
  const app = express();
  const bus = new EventEmitter();
  const pagesDir = path.join(root, 'pages');
  const publicDir = path.join(root, 'public');
  const outDir = path.join(root, '.indjs', 'client');
  const serverCacheDir = path.join(root, '.indjs', 'server');

  // Clean temp caches on startup
  try {
    if (fsSync.existsSync(serverCacheDir)) {
      for (const f of fsSync.readdirSync(serverCacheDir)) {
        try { fsSync.unlinkSync(path.join(serverCacheDir, f)); } catch {}
      }
    }
    const cleanPages = (dir) => {
      for (const name of fsSync.readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, name.name);
        if (name.isDirectory()) cleanPages(full);
        else if (name.name.includes('__indjs.') && name.name.endsWith('.mjs')) {
          try { fsSync.unlinkSync(full); } catch {}
        }
      }
    };
    if (fsSync.existsSync(pagesDir)) cleanPages(pagesDir);
  } catch {}

  // Static assets
  app.use(express.static(publicDir, { extensions: ['html'] }));
  app.use('/__indjs/client', express.static(outDir));
  app.use(express.json());

  // SSE endpoint for dev events (errors, rebuilds)
  app.get('/__indjs/events', (req, res) => {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
      'Access-Control-Allow-Origin': '*',
    });
    const send = (type, data) => {
      res.write(`event: ${type}\n`);
      res.write(`data: ${JSON.stringify(data)}\n\n`);
    };
    const onError = (e) => send('error', { message: e?.message || String(e), stack: e?.stack || '' });
    const onRebuild = (info) => send('rebuild', info || {});
    bus.on('error', onError);
    bus.on('rebuild', onRebuild);
    req.on('close', () => { bus.off('error', onError); bus.off('rebuild', onRebuild); });
  });

  let { pages, api } = await discoverRoutes(root);
  await buildClientBundles({ root, pages });
  const cssWatcher = await watchCss({ root, onRebuild: () => { console.log('[indjs] css rebuilt'); bus.emit('rebuild', { type: 'css' }); } });

  // Global middleware
  let middleware = null;
  async function loadMiddleware() {
    const candidates = ['_middleware.ts', '_middleware.tsx', '_middleware.jsx', '_middleware.js'];
    for (const c of candidates) {
      const f = path.join(root, 'pages', c);
      try { await fs.access(f); middleware = await loadModule(f); return; } catch {}
    }
    middleware = null;
  }
  await loadMiddleware();

  app.use(async (req, res, next) => {
    if (!middleware?.default) return next();
    try {
      const result = await middleware.default({ req, res, root });
      if (result === false || res.headersSent) return; // blocked or responded
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
    } catch (e) { bus.emit('error', e); next(e); }
  });

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
    } catch (e) { bus.emit('error', e); next(e); }
  });

  // Page routes
  app.get(/.*/, async (req, res, next) => {
    try {
      const match = matchDynamic(req.path, pages);
      if (!match) return next();
      const mod = await loadModule(match.route.file);
      const clientSrc = `/__indjs/client${routeToClientPath(match.route.route)}`;
      const html = await renderPageModule({ mod, ctx: { req, res, query: req.query, params: match.params, root, pageFile: match.route.file, route: match.route.route, dev: true }, assets: { clientSrc } });
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      res.end(html);
    } catch (e) { bus.emit('error', e); next(e); }
  });

  // 404 fallback
  app.use((req, res) => res.status(404).send('Not Found'));

  // Error handler: emit to SSE and respond
  app.use((err, req, res, next) => {
    try { bus.emit('error', err); } catch {}
    if (res.headersSent) return next(err);
    res.status(500).send('Internal Server Error');
  });

  // Start server with auto port fallback if needed (try binding directly)
  let listenPort = port;
  let server;
  for (let i = 0; i < 30; i++) {
    try {
      server = await new Promise((resolve, reject) => {
        const s = app.listen(listenPort, () => resolve(s));
        s.on('error', reject);
      });
      break;
    } catch (e) {
      if (e && e.code === 'EADDRINUSE') {
        const old = listenPort;
        listenPort = old + 1;
        if (i === 0) console.warn(`[indjs] Port ${old} in use, trying ${listenPort}`);
        else console.warn(`[indjs] Port ${old} in use, trying ${listenPort}`);
        continue;
      }
      throw e;
    }
  }
  if (!server) throw new Error('Failed to bind any port');
  console.log(`[indjs] dev server running at http://localhost:${listenPort}`);

  // Watch pages for changes and hot-reload routes list (basic)
  const watcher = chokidar.watch(pagesDir, { ignoreInitial: true });
  let debounceTimer = null;
  watcher.on('all', async () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(async () => {
      ({ pages, api } = await discoverRoutes(root));
      await buildClientBundles({ root, pages });
      await loadMiddleware();
      console.log('[indjs] routes updated and client rebuilt');
      bus.emit('rebuild', { type: 'routes' });
    }, 100);
  });

  // Graceful shutdown on CTRL+C
  process.on('SIGINT', () => { watcher.close(); cssWatcher?.close(); server.close(() => process.exit(0)); });
}
