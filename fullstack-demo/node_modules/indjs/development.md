# INDJS Development Guide (Hinglish Deep Dive)

Ye document INDJS framework ka full inside-out explanation deta hai: architecture, build/runtime flow, SSR/SSG/ISR, hydration & SPA, telemetry/metrics, key components, TypeScript types, testing stack, security/performance, configuration/plugins, deployment aur interview Q&A. References real files under `packages/indjs/src/` taaki aap confidence ke saath codebase explain kar sako.

---

## 1) Architecture Overview

- **[App Structure]**
  - `pages/` → File-based routing. Example: `pages/index.jsx` → `/`, `pages/about.jsx` → `/about`.
  - `pages/api/*` → API routes with HTTP handlers, e.g. `get`, `post`.
  - `public/` → Static files.
  - `.indjs/` → Build outputs: `client/` (bundles, manifest), `static/` (pre-rendered pages).

- **[Framework Package]** `packages/indjs/src/`
  - Routing: `routes.mjs`, client router utilities: `router.mjs`.
  - SSR & runtime: `ssr.mjs` (server rendering), `dev.mjs` (dev server), `start.mjs` (prod server).
  - Build: `build.mjs` (orchestration), `build_client.mjs` (per-page client entry + bundling), `css.mjs`.
  - Components: `components/image.mjs`, `components/link.mjs`, `components/script.mjs`, `components/head.mjs`, `components/error-boundary.mjs`.
  - Code splitting: `dynamic.mjs`.
  - DX/CLI: `cli.mjs`, `commands/*`.
  - Types: `types.d.ts` (published via `package.json` `types`).

- **[Design Goals]**
  - Next.js-like DX but lightweight. Express servers for control and ecosystem. React 18 SSR. Optional Vite, fast esbuild. Simple caching (LRU/Redis). Strong defaults: helmet, compression, CORS, rate-limit, pino logging.

---

## 2) Build & Runtime Flow

- **Dev (`indjs dev`) — `src/dev.mjs`**
  1. Loads config via `getConfig()` from `src/config.mjs` and plugins (`src/plugins.mjs`).
  2. Creates Express server; serves `public/` and `.indjs/client`.
  3. Discovers routes via `discoverRoutes()` in `src/routes.mjs`.
  4. Optional Vite HMR via `src/dev_vite.mjs` (React refresh preamble injected in HTML by `ssr.mjs`).
  5. On page request: `renderPageModule()` from `src/ssr.mjs` performs SSR and injects a dev client entry that defines `window.__IND_BOOT__` for hydration.

- **Prod (`indjs start`) — `src/start.mjs`**
  1. Express server with security middlewares: `helmet`, `compression`, `cors`, and `express-rate-limit`.
  2. Observability: `pino-http` request logging; metrics endpoints; basic dashboard.
  3. Serves prebuilt assets from `.indjs/client`. Uses `manifest.json` to map routes to hashed page bundles.
  4. On request, matches route (via `matchDynamic()`), loads page module, then SSR through `renderPageModule()`. Uses LRU/Redis caches to store HTML and speed responses.

- **Build (`indjs build`) — `src/build.mjs` + `src/build_client.mjs`**
  - Builds per-route client entries. `build_client.mjs` writes tiny entry files that import the page and define `window.__IND_BOOT__` to hydrate.
  - Bundling via esbuild by default; optionally Vite manifest when `experimental.devBundler === 'vite'`.
  - Writes `manifest.json` with route → hashed bundle mapping; used by `start.mjs`.

---

## 3) Routing Model

- **File-based Pages**: `src/routes.mjs` discovers files under `pages/` and translates to routes. Example: `pages/blog/[slug].jsx` → `/blog/:slug`.
- **Dynamic Params**: Extracted via `matchDynamic()`; passed to page SSR/props and API handlers.
- **API Routes**: Files under `pages/api/` export HTTP method functions (`get`, `post`, etc.). In dev/prod servers, unmatched non-API requests are forwarded to page rendering; API routes return JSON or status responses.

---

## 4) SSR, SSG, ISR

- **SSR (`src/ssr.mjs`)**
  - React 18 SSR is used to render HTML string/stream on server.
  - Dev mode injects Vite client/HMR where enabled and exposes `window.__IND_BOOT__` for hydration.

- **SSG**
  - During `indjs build`, pages that can be statically rendered are emitted to `.indjs/static` for serving via `express.static` in prod.

- **ISR (Incremental Static Regeneration)** — in `src/start.mjs`
  - Time-based: page module can export `revalidateSeconds = N` to refresh cache after N seconds.
  - Tag-based: selective invalidation via `POST /__indjs/revalidate?tag=<tag>`.
  - Cache stores: in-memory `LRUCache` or Redis (`ioredis`) when configured.

---

## 5) Hydration & SPA Navigation

- **Global Boot Function**: Each client page bundle (from `src/build_client.mjs`) defines `window.__IND_BOOT__`. It grabs `#__ind`, reads `window.__IND_PROPS__`, and hydrates using `hydrateRoot()`; fallback to `createRoot().render()` if needed.
- **Error Boundary Wrap**: Hydration is wrapped in an inline `ErrorBoundary` to avoid white screens; errors are logged and optionally sent via Beacon.
- **SPA Nav Flow** (`src/ssr.mjs` client script + `components/link.mjs`):
  1. Intercept link clicks.
  2. Fetch target HTML.
  3. Swap `#__ind` content.
  4. Call `window.__IND_BOOT__()` to rehydrate new page.
- **Dev parity**: Vite dev entry exposes the same boot function, keeping SPA behavior consistent.

---

## 6) Telemetry, Metrics & Logging

- **Client Error Intake**
  - Endpoint: `POST /__indjs/client-error`.
  - Dev handler in `src/dev.mjs` (console). Prod handler in `src/start.mjs` (`req.log.error` via pino).
  - Client reporting: `components/error-boundary.mjs` may use `navigator.sendBeacon('/__indjs/client-error', ...)`.

- **Metrics & Dashboard (Prod)** — `src/start.mjs`
  - `GET /__indjs/metrics` → `{ uptimeMs, requests, errors, cacheHits, cacheMisses, avgLatencyMs }`.
  - `GET /__indjs/dashboard` → minimal HTML dashboard.

- **Request Logging**
  - Dev: optional `pino-http` to keep noise low.
  - Prod: `pino-http` enabled with basic redaction.

---

## 7) Key Components (Client)

- **`components/image.mjs`**
  - Optimized image delivery via `/_image?src=/path&w=<width>&q=<quality>` using `sharp`.
  - Props: `priority`, `sizes`, `widths`, `unoptimized` etc.

- **`components/link.mjs`**
  - SPA-friendly `<Link>` that prevents full reload, dispatches `ind:navigate`, respects `replace`, `scroll`, `prefetch`.

- **`components/script.mjs`**
  - Strategies: `beforeInteractive`, `afterInteractive`, `lazyOnload`. Inline content via children.

- **`components/head.mjs`**
  - Minimal head manager for title/meta/link.

- **`components/error-boundary.mjs`**
  - Public `ErrorBoundary` to wrap app; shows friendly error, can send telemetry.

- **`dynamic.mjs`**
  - `dynamic(() => import('./Comp'), { loading: Loader, ssr: true|false })` via `React.lazy` + `Suspense`.

---

## 8) TypeScript Types

- File: `src/types.d.ts` (exposed via `package.json` `types`).
- Includes: `ImageProps`, `LinkProps`, `ScriptProps`, `HeadProps`, `ErrorBoundary` types, `DynamicOptions`, router types (`useRouter`, `RouterLike`).

---

## 9) Testing Stack

- **Unit (Vitest)**
  - Config: `vitest.config.mjs`. Run `npm run test`. Tests under `tests/**/*.test.{js,ts}`.

- **E2E (Playwright)**
  - Config: `playwright.config.mjs` (auto-spawns `indjs start --port 3000`, or uses `E2E_BASE_URL`).
  - Run: `npx playwright install` then `npm run e2e`.
  - Example: `e2e/home.spec.mjs` checks homepage headline and CTAs.

---

## 10) Security & Performance

- **Security**
  - `helmet`, `cors`, `express-rate-limit` in dev/prod.
  - `pino-http` redacts sensitive headers.

- **Compression**
  - `compression` middleware for gzip.

- **Caching**
  - Client bundles: hashed filenames served with immutable long-term caching.
  - HTML: LRU in-memory; Redis optional for distributed environments. Time-based + tag-based invalidation.

- **Bundling**
  - esbuild default; Vite manifest optional for advanced chunking/tree-shaking.

---

## 11) Configuration & Plugins

- **Config (`src/config.mjs`)**
  - Read via `getConfig()`; user app provides `indjs.config.js`.
  - Knobs:
    - `experimental.devBundler`: `'vite' | 'builtin'`.
    - `observability`: pino level, APM transport.
    - `caching`: ttl, store (`redis`), redis URL, secret for revalidate endpoints.
    - `ai.secret`: protect `/__indjs/ai/*` endpoints.

- **Plugins (`src/plugins.mjs`)**
  - Hooks: `onRequest`, `onApiCall`, `onRouteMatch`, `onResponse`.
  - Run in dev/prod for auth, A/B flags, analytics, etc.

---

## 12) Deployment

- **Production**
  - `npm run build` → emits `.indjs/client` + `.indjs/static`.
  - `npm run start` → SSR server with metrics/dashboard.

- **Targets & Adapters**
  - Stubs under `src/adapters/*` (Vercel/Cloudflare Workers) and helpers in `src/deployment/index.mjs`.

---

## 13) Interview Q&A (Talking Points)

- **Problem & Positioning**
  - INDJS: full‑stack React with SSR/SSG/ISR + API routes + Express control. Lightweight Next.js-like DX without heavy lock-in.

- **How SSR Works?**
  - `renderPageModule()` (`src/ssr.mjs`) imports page, gathers data/props, renders to HTML/stream; dev injects HMR; prod uses manifest for correct bundles.

- **SPA Navigation & Hydration**
  - Fetch HTML → swap `#__ind` → `window.__IND_BOOT__()` hydrate → ErrorBoundary catches issues → optional telemetry.

- **Caching Strategy**
  - Immutable assets; HTML LRU/Redis; ISR time- and tag-based revalidation.

- **Security Posture**
  - `helmet`, `cors`, `rate-limit`; pino logs; compression.

- **Performance Choices**
  - esbuild speed; Vite optional; Sharp images.

- **Extensibility**
  - Plugins (`src/plugins.mjs`), app `_middleware.*`, server adapters.

- **TypeScript Support**
  - `types.d.ts` for components/router/dynamic; `package.json` `types`.

- **Telemetry & Metrics**
  - `/__indjs/client-error` intake (dev console, prod pino); `/__indjs/metrics` + `/__indjs/dashboard`.

---

## 14) Quick Code Map (Exact Files)

- Routing: `src/routes.mjs` • Client router utils: `src/router.mjs`
- SSR & Runtime: `src/ssr.mjs` • Dev: `src/dev.mjs` • Prod: `src/start.mjs`
- Build: `src/build.mjs` • Client Bundles: `src/build_client.mjs` • CSS: `src/css.mjs`
- Components: `src/components/image.mjs`, `src/components/link.mjs`, `src/components/script.mjs`, `src/components/head.mjs`, `src/components/error-boundary.mjs`
- Code Splitting: `src/dynamic.mjs`
- Types: `src/types.d.ts`
- CLI & Commands: `src/cli.mjs`, `src/commands/*`

Happy building with INDJS! 🚀
