import React from 'react';
import { renderToString } from 'react-dom/server';
import path from 'path';
import fs from 'fs/promises';
import { pathToFileURL } from 'url';
import { loadModule } from './load.mjs';

async function tryImport(file) {
  try { await fs.access(file); return await loadModule(file); } catch { return null; }
}

export async function renderPageModule({ mod, ctx, assets }) {
  const getProps = typeof mod.getServerSideProps === 'function' ? mod.getServerSideProps : async () => ({ props: {} });
  const { props } = await getProps(ctx);
  const Component = mod.default || (() => React.createElement('div', null, 'No default export'));

  // Resolve nested layouts and heads walking up from the page directory
  const pagesDir = path.join(ctx.root, 'pages');
  const pageDir = path.dirname(ctx.pageFile || '');

  async function collectUp(fileName) {
    const items = [];
    let d = pageDir;
    while (d && d.startsWith(pagesDir)) {
      const jsx = path.join(d, `${fileName}.jsx`);
      const js = path.join(d, `${fileName}.js`);
      const mod = (await tryImport(jsx)) || (await tryImport(js));
      if (mod?.default) items.push(mod.default);
      if (d === pagesDir) break;
      d = path.dirname(d);
    }
    // add root-level fallback if not yet included
    if (!items.length) {
      const rootJx = await tryImport(path.join(pagesDir, `${fileName}.jsx`));
      const rootJs = await tryImport(path.join(pagesDir, `${fileName}.js`));
      const rootMod = rootJx || rootJs;
      if (rootMod?.default) items.push(rootMod.default);
    }
    return items; // from deepest to shallowest
  }

  const layoutComponents = await collectUp('_layout');
  const headComponents = await collectUp('_head');
  const appMod = (await tryImport(path.join(pagesDir, '_app.jsx'))) || (await tryImport(path.join(pagesDir, '_app.js')));

  // Compose content: page -> nested layouts (deepest first) -> _app outermost
  let content = React.createElement(Component, props);
  for (const L of layoutComponents) content = React.createElement(L, props, content);
  if (appMod?.default) content = React.createElement(appMod.default, props, content);

  const body = renderToString(content);
  const head = headComponents.length
    ? headComponents.map(H => renderToString(React.createElement(H, props))).join('\n')
    : '';

  // Page metadata
  let meta = mod.metadata || {};
  if (typeof mod.getMetadata === 'function') {
    try { meta = await mod.getMetadata(ctx) || meta; } catch {}
  }
  const title = meta.title || props?.title || 'INDJS App';
  const description = meta.description || '';

  // Include client CSS (built by Tailwind/PostCSS watcher)
  const cssHref = '/__indjs/client/styles.css';

  return htmlDoc({
    body,
    head,
    title,
    description,
    props,
    clientSrc: assets?.clientSrc,
    cssHref,
    dev: !!ctx.dev,
    manifest: assets?.manifest
  });
}

function htmlDoc({ body, title, description, head, props, clientSrc, cssHref, dev, manifest }) {
  const serialized = serializeProps(props || {});
  const client = clientSrc ? `<script src="${clientSrc}" defer></script>` : '';
  const css = cssHref ? `<link rel="stylesheet" href="${cssHref}" />` : '';
  const manifestScript = manifest ? `<script>window.__IND_MANIFEST__ = ${manifest};</script>` : '';
  const overlay = dev ? `
  <script>
  (function(){
    try{
      var es = new EventSource('/__indjs/events');
      var overlay = null; var timer = null;
      function ensure(){
        if(overlay) return overlay;
        overlay = document.createElement('div');
        overlay.id = '__indjs_overlay';
        overlay.style.position='fixed';overlay.style.zIndex='99999';overlay.style.right='12px';overlay.style.bottom='12px';
        overlay.style.maxWidth='480px';overlay.style.background='rgba(0,0,0,0.85)';overlay.style.color='#fff';overlay.style.padding='12px 14px';overlay.style.borderRadius='12px';overlay.style.boxShadow='0 10px 30px rgba(0,0,0,.5)';overlay.style.font='13px/1.4 system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial';
        overlay.innerHTML = '<strong>INDJS</strong> <span style="opacity:.7">is watching…</span>';
        document.body.appendChild(overlay);return overlay;
      }
      function show(type, payload){
        var el = ensure();
        if(type==='rebuild'){
          el.innerHTML = '<strong>Rebuilt</strong> <span style="opacity:.7">'+(payload.type||'app')+'</span>';
          clearTimeout(timer); timer=setTimeout(()=>{ if(el&&el.parentNode) el.parentNode.removeChild(el); overlay=null; }, 1200);
        }
        if(type==='error'){
          el.innerHTML = '<strong style="color:#fca5a5">Error</strong><pre style="white-space:pre-wrap;margin:6px 0 0;opacity:.9">'+(payload.message||'Unknown')+'</pre>';
        }
      }
      es.addEventListener('rebuild', function(ev){ try{ show('rebuild', JSON.parse(ev.data||'{}')); }catch(e){} });
      es.addEventListener('error', function(ev){ try{ show('error', JSON.parse(ev.data||'{}')); }catch(e){} });
    }catch(e){ /* ignore */ }
  })();
  </script>
  ` : '';
  return `<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${escapeHtml(title)}</title>
  ${description ? `<meta name="description" content="${escapeHtml(description)}" />` : ''}
  ${css}
  ${head || ''}
  <script>window.__IND_PROPS__ = ${serialized};</script>
  ${manifestScript}
  ${client}
</head>
<body>
  <div id="__ind">${body}</div>
  ${overlay}
</body>
</html>`;
}

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, s => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[s]));
}

function serializeProps(obj) {
  return JSON.stringify(obj)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029');
}
