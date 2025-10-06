import express from 'express';
import path from 'path';
import { pathToFileURL } from 'url';
import { discoverRoutes, matchDynamic } from './routes.mjs';
import { renderPageModule } from './ssr.mjs';
import { routeToClientPath } from './build_client.mjs';
import { loadModule } from './load.mjs';
import fs from 'fs/promises';
import sharp from 'sharp';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import pinoHttp from 'pino-http';
import { LRUCache } from 'lru-cache';
import rateLimit from 'express-rate-limit';
import sourceMapSupport from 'source-map-support';
import { loadConfig, getConfig } from './config.mjs';
import pino from 'pino';
import IORedis from 'ioredis';

export async function start({ root, port }) {
  sourceMapSupport.install();
  await loadConfig(root);
  const cfg = getConfig();

  const app = express();
  const publicDir = path.join(root, 'public');
  const outDir = path.join(root, '.indjs', 'client');
  const staticOut = path.join(root, '.indjs', 'static');
  
  // Security and performance middleware
  app.use(helmet());
  app.use(compression());
  app.use(cors());
  // Observability: pino logger
  const pinoOpts = { level: cfg?.observability?.pinoLevel || 'info' };
  let transport;
  if (cfg?.observability?.apm?.enabled && cfg?.observability?.apm?.transport) {
    transport = { target: cfg.observability.apm.transport };
  } else if (cfg?.observability?.logToFile) {
    transport = { target: 'pino/file', options: { destination: cfg.observability.filePath || './.indjs/server.log' } };
  }
  const httpLogger = pino(transport ? { ...pinoOpts, transport } : pinoOpts);
  app.use(pinoHttp({ logger: httpLogger, redact: ['req.headers.authorization'] }));
  const limiter = rateLimit({ windowMs: 60 * 1000, max: 1200 });
  app.use(limiter);
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

  // Page routes & caching
  // Memory cache by default; optional Redis
  const ttlMs = (cfg?.caching?.ttl || 30) * 1000;
  const htmlCache = new LRUCache({ max: 500, ttl: ttlMs });
  const tagMap = new Map(); // tag -> Set(keys)
  let redis = null;
  if (cfg?.caching?.store === 'redis' && cfg?.caching?.redisUrl) {
    try { redis = new IORedis(cfg.caching.redisUrl); } catch {}
  }

  async function cacheGet(key) {
    if (redis) {
      const v = await redis.get(`indjs:html:${key}`);
      return v;
    }
    return htmlCache.get(key);
  }
  async function cacheSet(key, value, tags = []) {
    if (redis) {
      await redis.set(`indjs:html:${key}`, value, 'EX', Math.max(1, Math.floor(ttlMs / 1000)));
      for (const t of tags) { await redis.sadd(`indjs:tag:${t}`, key); }
      return;
    }
    htmlCache.set(key, value);
    for (const t of tags) {
      if (!tagMap.has(t)) tagMap.set(t, new Set());
      tagMap.get(t).add(key);
    }
  }
  async function revalidateTag(tag) {
    if (redis) {
      const keys = await redis.smembers(`indjs:tag:${tag}`);
      if (keys?.length) {
        const delKeys = keys.map(k => `indjs:html:${k}`);
        await redis.del(...delKeys);
      }
      await redis.del(`indjs:tag:${tag}`);
      return keys?.length || 0;
    }
    const set = tagMap.get(tag);
    let count = 0;
    if (set) {
      for (const k of set) { htmlCache.delete(k); count++; }
      tagMap.delete(tag);
    }
    return count;
  }

  app.get(/.*/, async (req, res, next) => {
    try {
      const cacheKey = req.originalUrl || req.url;
      const cached = await cacheGet(cacheKey);
      if (cached) {
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        return res.end(cached);
      }
      const match = matchDynamic(req.path, pages);
      if (!match) return next();
      const mod = await loadModule(match.route.file);
      const fallback = `/__indjs/client${routeToClientPath(match.route.route)}`;
      const mapped = manifest[match.route.route];
      const clientSrc = mapped || fallback;
      const rendered = await renderPageModule({ mod, ctx: { req, res, query: req.query, params: match.params, root, pageFile: match.route.file, route: match.route.route }, assets: { clientSrc, manifest: JSON.stringify(manifest) } });
      // Support streaming: if a function is returned, stream and skip caching
      if (typeof rendered === 'function') {
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        return rendered(res);
      }
      const html = rendered;
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      // collect tags if provided by page module
      let tags = [];
      if (Array.isArray(mod.revalidate)) tags = mod.revalidate;
      else if (typeof mod.revalidate === 'function') {
        try { const t = await mod.revalidate({ params: match.params, query: req.query }); if (Array.isArray(t)) tags = t; } catch {}
      }
      await cacheSet(cacheKey, html, tags);
      res.end(html);
    } catch (e) { next(e); }
  });

  // Revalidate endpoint (tag-based)
  app.post('/__indjs/revalidate', express.json(), async (req, res) => {
    try {
      const secret = req.query.secret || req.body?.secret;
      if ((cfg?.caching?.secret || '') && secret !== cfg.caching.secret) return res.status(401).json({ error: 'Unauthorized' });
      const tag = req.query.tag || req.body?.tag;
      if (!tag) return res.status(400).json({ error: 'Missing tag' });
      const count = await revalidateTag(String(tag));
      return res.json({ revalidated: true, tag, count });
    } catch (e) {
      return res.status(500).json({ error: 'Revalidation failed' });
    }
  });

  app.use((req, res) => res.status(404).send('Not Found'));

  app.listen(port, () => console.log(`[indjs] server listening on http://localhost:${port}`));
}
