import fs from 'fs/promises';
import path from 'path';
import { pathToFileURL } from 'url';
import * as esbuild from 'esbuild';
import fsSync from 'fs';

export async function loadModule(file) {
  const ext = path.extname(file).toLowerCase();
  if (ext === '.jsx' || ext === '.tsx' || ext === '.ts' || ext === '.js' || ext === '.mjs') {
    const appRoot = findAppRoot(path.dirname(file));
    const outDir = path.join(appRoot, '.indjs', 'server');
    await fs.mkdir(outDir, { recursive: true });
    const rel = path.relative(appRoot, file).replace(/[\\/]/g, '_').replace(/\.(jsx|tsx|ts|js)$/i, '');
    const outFile = path.join(outDir, `${rel}.__indjs.${Date.now()}.mjs`);

    const aliasPlugin = {
      name: 'alias-app-root-ssr',
      setup(build) {
        const ensureFile = (p) => {
          if (fsSync.existsSync(p) && fsSync.statSync(p).isFile()) return p;
          const exts = ['.jsx', '.js', '.tsx', '.ts', '.mjs', '.cjs'];
          for (const e of exts) { const q = p + e; if (fsSync.existsSync(q)) return q; }
          return p;
        };
        build.onResolve({ filter: /^@\// }, args => {
          const sub = args.path.replace(/^@\//, '');
          return { path: ensureFile(path.join(appRoot, sub)) };
        });
      }
    };

    await esbuild.build({
      entryPoints: [file],
      bundle: true,
      format: 'esm',
      platform: 'node',
      jsx: 'automatic',
      sourcemap: 'inline',
      outfile: outFile,
      loader: { '.js': 'jsx', '.jsx': 'jsx', '.ts': 'ts', '.tsx': 'tsx', '.mjs': 'jsx' },
      external: ['react', 'react-dom', 'react/jsx-runtime', 'react-redux', '@reduxjs/toolkit', 'sharp'],
      plugins: [aliasPlugin]
    });
    return import(pathToFileURL(outFile));
  }
  return import(pathToFileURL(file));
}

function rewriteDirectoryImports(src, basedir) {
  const tryResolveDir = (spec) => {
    const full = path.resolve(basedir, spec);
    try {
      if (fsSync.existsSync(full) && fsSync.statSync(full).isDirectory()) {
        const candidates = ['index.jsx', 'index.js', 'index.tsx', 'index.ts', 'index.mjs'];
        for (const c of candidates) {
          const p = path.join(full, c);
          if (fsSync.existsSync(p)) return spec.replace(/\/$/, '') + (spec.endsWith('/') ? c : '/' + c);
        }
      }
    } catch { }
    return spec;
  };

  src = src.replace(/(from\s+["'])(\.\.?\/[^"']+)(["'])/g, (m, a, spec, b) => {
    return a + tryResolveDir(spec) + b;
  });
  src = src.replace(/(import\(\s*["'])(\.\.?\/[^"']+)(["']\s*\))/g, (m, a, spec, b) => {
    return a + tryResolveDir(spec) + b;
  });
  return src;
}

function rewriteRelativeToAbsolute(src, basedir) {
  const ensureFile = (p) => {
    if (fsSync.existsSync(p) && fsSync.statSync(p).isFile()) return p;
    // try with common extensions
    const exts = ['.jsx', '.js', '.tsx', '.ts', '.mjs', '.cjs'];
    for (const e of exts) { const q = p + e; if (fsSync.existsSync(q)) return q; }
    return p;
  };
  const toAbs = (spec) => {
    if (!spec.startsWith('./') && !spec.startsWith('../')) return spec;
    const abs = ensureFile(path.resolve(basedir, spec));
    // Convert to file URL specifier for ESM compatibility on Windows
    return pathToFileURL(abs).href;
  };
  src = src.replace(/(from\s+["'])(\.\.?\/[^"']+)(["'])/g, (m, a, spec, b) => a + toAbs(spec) + b);
  src = src.replace(/(import\(\s*["'])(\.\.?\/[^"']+)(["']\s*\))/g, (m, a, spec, b) => a + toAbs(spec) + b);
  return src;
}

function findAppRoot(dir) {
  // app root is the directory that contains 'pages' folder up the tree
  let d = dir;
  while (d && d !== path.dirname(d)) {
    try { if (fsSync.existsSync(path.join(d, 'pages'))) return d; } catch { }
    d = path.dirname(d);
  }
  return dir;
}
