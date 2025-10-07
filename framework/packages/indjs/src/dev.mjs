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
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import pinoHttp from 'pino-http';
import rateLimit from 'express-rate-limit';
import sourceMapSupport from 'source-map-support';
import { loadConfig, getConfig } from './config.mjs';
import { loadPlugins, applyHook } from './plugins.mjs';

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
  sourceMapSupport.install();
  await loadConfig(root);
  const cfg = getConfig();
  const plugins = await loadPlugins(cfg, { root, mode: 'dev' });
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

  // Security and performance middlewares (dev-friendly)
  app.use(helmet({ contentSecurityPolicy: false }));
  app.use(compression());
  app.use(cors());
  // Request logging is noisy in dev; keep disabled by default.
  // Opt-in via INDJS_DEV_REQUEST_LOGS=1 or config.observability.devRequestLogging=true
  const enableDevReqLogs = process.env.INDJS_DEV_REQUEST_LOGS === '1' || cfg?.observability?.devRequestLogging === true;
  if (enableDevReqLogs) {
    app.use(pinoHttp({
      transport: process.env.NODE_ENV !== 'production' ? { target: 'pino-pretty' } : undefined,
      redact: [
        'req.headers.authorization',
        'req.headers.cookie',
        'res.headers["set-cookie"]'
      ]
    }));
  }
  const limiter = rateLimit({ windowMs: 30 * 1000, max: 600 });
  app.use(limiter);

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
    const onBuildStart = (info) => send('build-start', info || {});
    const onBuildEnd = (info) => send('build-end', info || {});
    bus.on('error', onError);
    bus.on('rebuild', onRebuild);
    bus.on('build-start', onBuildStart);
    bus.on('build-end', onBuildEnd);
    req.on('close', () => {
      bus.off('error', onError);
      bus.off('rebuild', onRebuild);
      bus.off('build-start', onBuildStart);
      bus.off('build-end', onBuildEnd);
    });
  });

  let { pages, api } = await discoverRoutes(root);
  let viteServer = null;
  if (cfg?.experimental?.devBundler === 'vite') {
    try {
      const { startVite } = await import('./dev_vite.mjs');
      viteServer = await startVite({ app, root, bus });
      console.log('[indjs] Vite dev server mounted');
    } catch (e) {
      console.warn('[indjs] Failed to start Vite dev server, falling back to esbuild:', e?.message || e);
    }
  }

  if (!viteServer) {
    try { bus.emit('build-start', { type: 'client' }); } catch {}
    await safeBuildClient({ root, pages, onSuccess: () => { try { bus.emit('build-end', { type: 'client' }); } catch {} } });
  }
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
    try { await applyHook(plugins, 'onRequest', { req, res, root }); } catch {}
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
      await applyHook(plugins, 'onApiCall', { req, res, route: match.route, params: match.params });
      const result = await handler({ req, res, params: match.params, query: req.query, body: req.body });
      if (!res.headersSent && result !== undefined) res.json(result);
      await applyHook(plugins, 'onResponse', { req, res });
    } catch (e) { bus.emit('error', e); next(e); }
  });

  // Page routes
  app.get(/.*/, async (req, res, next) => {
    try {
      const match = matchDynamic(req.path, pages);
      if (!match) return next();
      const mod = await loadModule(match.route.file);
      const clientSrc = `/__indjs/client${routeToClientPath(match.route.route)}`;
      await applyHook(plugins, 'onRouteMatch', { req, res, route: match.route, params: match.params });
      const rendered = await renderPageModule({ mod, ctx: { req, res, query: req.query, params: match.params, root, pageFile: match.route.file, route: match.route.route, dev: true }, assets: { clientSrc } });
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      if (typeof rendered === 'function') return rendered(res);
      res.end(rendered);
      try { await applyHook(plugins, 'onResponse', { req, res }); } catch {}
    } catch (e) { bus.emit('error', e); next(e); }
  });

  // 404 fallback
  app.use((req, res) => res.status(404).send('Not Found'));

  // Error handler: emit to SSE and respond
  app.use((err, req, res, next) => {
    try {
      const msg = String(err && err.message || err || '');
      const parsed = parseErrorLocation(err);
      const frame = makeCodeFrame(parsed?.file, parsed?.line, parsed?.column, 3);
      bus.emit('error', {
        message: msg,
        stack: String(err && err.stack || ''),
        file: parsed?.file || null,
        line: parsed?.line || null,
        column: parsed?.column || null,
        frame
      });
      const lower = msg.toLowerCase();
      let suggestion = null;
      if (lower.includes('cannot find module') || lower.includes('module not found')) {
        suggestion = {
          title: 'Module not found',
          detail: 'Check import path and that the dependency is installed. If it\'s a local file, ensure the file extension and casing match. For packages, run `npm install <name>`.'
        };
      } else if (lower.includes('unexpected token') || lower.includes('syntaxerror')) {
        suggestion = {
          title: 'Syntax error',
          detail: 'Look near the file and line in the stack trace. Common causes: missing closing tag/brace, stray comma, or mixing ESM/CJS syntax.'
        };
      } else if (lower.includes('jsx') && lower.includes('not enabled')) {
        suggestion = {
          title: 'JSX not enabled',
          detail: 'Ensure the file uses .jsx or .tsx extension. INDJS configures JSX automatically for those extensions.'
        };
      } else if (lower.includes('react') && lower.includes('invalid hook call')) {
        suggestion = {
          title: 'Invalid React hook call',
          detail: 'Hooks must run at the top level of React components and not inside conditions or loops. Ensure a single React copy is used.'
        };
      }
      if (suggestion) bus.emit('suggestion', suggestion);
    } catch {}
    if (res.headersSent) return next(err);
    res.status(500).send('Internal Server Error');
  });

  function parseErrorLocation(e){
    try {
      const s = String(e && e.stack || '');
      // Match C:\path\file.tsx:82:1 or /path/file.tsx:82:1
      const m = s.match(/\(?([A-Za-z]:\\[^):]+|\/[^):]+):(\d+):(\d+)\)?/);
      if (m) return { file: m[1].replace(/\\/g,'/'), line: parseInt(m[2],10), column: parseInt(m[3],10) };
      return null;
    } catch { return null; }
  }

  function makeCodeFrame(file, line, column, pad=3){
    try {
      if (!file || !fsSync.existsSync(file)) return null;
      const txt = fsSync.readFileSync(file, 'utf8').split(/\r?\n/);
      const start = Math.max(1, (line||1) - pad);
      const end = Math.min(txt.length, (line||1) + pad);
      const lines = [];
      for (let i=start;i<=end;i++){
        lines.push({ n: i, code: txt[i-1], highlight: i === line, column: i===line ? (column||0) : 0 });
      }
      return { file, line, column, lines };
    } catch { return null; }
  }

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
      try { bus.emit('build-start', { type: 'client' }); } catch {}
      ({ pages, api } = await discoverRoutes(root));
      if (!viteServer) {
        await safeBuildClient({ root, pages, onSuccess: async () => {
          await loadMiddleware();
          console.log('[indjs] routes updated and client rebuilt');
          bus.emit('rebuild', { type: 'routes' });
          try { bus.emit('build-end', { type: 'client' }); } catch {}
        } });
      } else {
        await loadMiddleware();
        console.log('[indjs] routes updated');
        bus.emit('rebuild', { type: 'routes' });
        try { bus.emit('build-end', { type: 'client' }); } catch {}
      }
    }, 100);
  });

  async function safeBuildClient({ root, pages, onSuccess }) {
    try {
      await buildClientBundles({ root, pages });
      if (typeof onSuccess === 'function') await onSuccess();
    } catch (e) {
      // Do not crash dev server; emit structured error
      try {
        const payload = { message: String(e && e.message || e || 'Build failed') };
        if (e && e.errors && Array.isArray(e.errors) && e.errors[0] && e.errors[0].location) {
          const loc = e.errors[0].location; // esbuild primary error
          payload.file = loc.file || null;
          payload.line = loc.line || null;
          payload.column = loc.column || null;
        }
        bus.emit('error', payload);
      } catch {}
      console.error('[indjs] client build error:', e?.message || e);
    }
  }

  // Graceful shutdown on CTRL+C
  process.on('SIGINT', () => { watcher.close(); cssWatcher?.close(); server.close(() => process.exit(0)); });
}
