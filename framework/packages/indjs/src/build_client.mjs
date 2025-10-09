import * as esbuild from 'esbuild';
import path from 'path';
import fs from 'fs/promises';
import fsSync from 'fs';
import crypto from 'crypto';
import { getConfig } from './config.mjs';
import { createRequire } from 'module';

function routeToFileSegment(route) {
  if (route === '/') return 'index';
  return route.replace(/^\//, '').replace(/\//g, '_');
}

export function routeToClientPath(route) {
  return `/pages/${routeToFileSegment(route)}.js`;
}

export async function buildClientBundles({ root, pages }) {
  const outDir = path.join(root, '.indjs', 'client');
  await fs.mkdir(path.join(outDir, 'pages'), { recursive: true });

  const appRoot = root; // the app directory that contains pages/
  const cfg = getConfig();
  const aliasPlugin = {
    name: 'alias-app-root',
    setup(build) {
      const ensureFile = (p) => {
        if (fsSync.existsSync(p) && fsSync.statSync(p).isFile()) return p;
        const exts = ['.jsx','.js','.tsx','.ts','.mjs','.cjs'];
        for (const e of exts) { const q = p + e; if (fsSync.existsSync(q)) return q; }
        return p;
      };
      build.onResolve({ filter: /^@\// }, args => {
        const sub = args.path.replace(/^@\//, '');
        const target = ensureFile(path.join(appRoot, sub));
        return { path: target };
      });
    }
  };

  // Optional Preact aliasing to shrink client bundles
  const preactAlias = cfg?.build?.preact === true ? {
    name: 'preact-alias',
    setup(build) {
      const map = new Map([
        ['react', 'preact/compat'],
        ['react-dom', 'preact/compat'],
        ['react/jsx-runtime', 'preact/jsx-runtime']
      ]);
      build.onResolve({ filter: /^(react|react-dom|react\/jsx-runtime)$/ }, args => {
        const target = map.get(args.path);
        return target ? { path: target, external: false } : null;
      });
    }
  } : null;

  const manifest = {};
  const entries = [];
  for (const p of pages) {
    const name = routeToFileSegment(p.route);
    const entryFile = path.join(outDir, `entry_${name}.js`);
    const importUrl = p.file; // absolute file path for esbuild bundling
    // detect optional _app in the pages directory
    const pagesDir = path.dirname(p.file);
    const appJsx = path.join(pagesDir, '_app.jsx');
    const appJs = path.join(pagesDir, '_app.js');
    let appPath = null;
    try { await fs.access(appJsx); appPath = appJsx; } catch {}
    if (!appPath) { try { await fs.access(appJs); appPath = appJs; } catch {} }

    const code = `import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import Page from ${JSON.stringify(importUrl)};
${appPath ? `import App from ${JSON.stringify(appPath)};` : ''}
class ErrorBoundary extends React.Component{constructor(o){super(o);this.state={error:null}}static getDerivedStateFromError(e){return {error:e}}componentDidCatch(e,info){try{console.error('[INDJS] Hydration error:',e);window.__IND_LAST_ERROR__=e;}catch{}}render(){if(this.state.error){return React.createElement('div',{style:{padding:'12px',border:'1px solid #fecaca',background:'#fef2f2',color:'#991b1b',borderRadius:'8px',fontFamily:'system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial',margin:'10px'}},React.createElement('strong',null,'Hydration failed'),React.createElement('div',{style:{opacity:.9,marginTop:'6px'}},String(this.state.error&&this.state.error.message||'Unknown error')));}return this.props.children;}}
function __ind_boot(){
  const el = document.getElementById('__ind');
  const props = window.__IND_PROPS__ || {};
  let node = React.createElement(Page, props);
  ${appPath ? 'node = React.createElement(App, props, node);' : ''}
  node = React.createElement(ErrorBoundary, null, node);
  if (el) {
    try { hydrateRoot(el, node); }
    catch (e) { const r = createRoot(el); r.render(node); }
  }
}
// expose and run immediately
try { window.__IND_BOOT__ = __ind_boot; } catch {}
__ind_boot();
`;
    await fs.writeFile(entryFile, code, 'utf8');
    entries.push({ name, entryFile, route: p.route });
  }

  // If experimental.devBundler === 'vite', use Vite for production build
  if (cfg?.experimental?.devBundler === 'vite') {
    const appRequire = createRequire(path.join(appRoot, 'package.json'));
    const { build } = appRequire('vite');
    const input = {};
    for (const e of entries) input[e.name] = e.entryFile;
    await build({
      root: appRoot,
      build: {
        outDir,
        emptyOutDir: false,
        manifest: true,
        rollupOptions: { input },
        sourcemap: true,
      }
    });
    // Read Vite's manifest and map our routes
    try {
      const viteManifestPath = path.join(outDir, 'manifest.json');
      const viteManifest = JSON.parse(await fs.readFile(viteManifestPath, 'utf8'));
      for (const e of entries) {
        const rec = viteManifest[e.name];
        if (rec && rec.file) manifest[e.route] = `/${rec.file}`;
      }
    } catch {}
  } else {
    // esbuild bundling (previous behavior)
    for (const e of entries) {
      await esbuild.build({
        entryPoints: { [e.name]: e.entryFile },
        bundle: true,
        format: 'esm',
        sourcemap: true,
        outfile: path.join(outDir, 'pages', `${e.name}.js`),
        platform: 'browser',
        jsx: 'automatic',
        loader: { '.js': 'jsx', '.jsx': 'jsx' },
        external: [],
        plugins: preactAlias ? [aliasPlugin, preactAlias] : [aliasPlugin]
      });
      // Create a content-hashed copy for production use
      try {
        const filePath = path.join(outDir, 'pages', `${e.name}.js`);
        const buf = await fs.readFile(filePath);
        const hash = crypto.createHash('sha256').update(buf).digest('hex').slice(0, 8);
        const hashed = `pages/${e.name}.${hash}.js`;
        await fs.writeFile(path.join(outDir, hashed), buf);
        manifest[e.route] = `/${hashed}`;
      } catch {}
    }
  }

  // Write manifest for production server to consume
  try { await fs.writeFile(path.join(outDir, 'manifest.json'), JSON.stringify(manifest, null, 2), 'utf8'); } catch {}
}
