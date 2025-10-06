import React from 'react';
import { renderToString, renderToPipeableStream } from 'react-dom/server';
import path from 'path';
import fs from 'fs/promises';
import { pathToFileURL } from 'url';
import { loadModule } from './load.mjs';
import { getConfig } from './config.mjs';

async function tryImport(file) {
  try { await fs.access(file); return await loadModule(file); } catch { return null; }
}

function splitHtml(html) {
  const marker = '<div id="__ind">';
  const i = html.indexOf(marker);
  if (i === -1) return [html, ''];
  const before = html.slice(0, i + marker.length);
  const after = html.slice(i + marker.length) || '';
  return [before, after];
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

  const cfg = getConfig();
  const enableStreaming = !!cfg?.experimental?.streaming;
  const body = enableStreaming ? null : renderToString(content);
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

  if (!enableStreaming) {
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
  // Streaming: return a function that writes head and streams body
  return function stream(res) {
    const shell = htmlDoc({
      body: '',
      head,
      title,
      description,
      props,
      clientSrc: assets?.clientSrc,
      cssHref,
      dev: !!ctx.dev,
      manifest: assets?.manifest
    });
    const [prefix, suffix] = splitHtml(shell);
    res.write(prefix);
    const { pipe } = renderToPipeableStream(content, {
      onShellReady() {
        pipe(res);
      },
      onAllReady() {
        res.write(suffix);
      },
      onError() {
        // best-effort close
      }
    });
  };
}

function htmlDoc({ body, title, description, head, props, clientSrc, cssHref, dev, manifest }) {
  const serialized = serializeProps(props || {});
  const client = clientSrc ? `<script src="${clientSrc}" defer></script>` : '';
  const css = cssHref ? `<link rel="stylesheet" href="${cssHref}" />` : '';
  const manifestScript = manifest ? `<script>window.__IND_MANIFEST__ = ${manifest};</script>` : '';
  const security = securityHeadTags();
  const overlay = dev ? `
  <script>
  (function(){
    try{
      var es = new EventSource('/__indjs/events');
      var panel = null; var badge = null; var badgeCount = null; var issueCount = 0; var timer = null; var building = false;
      var tip = null;
      var errors = []; var idx = -1;
      function ensureBadge(){
        if(badge) return badge;
        badge = document.createElement('div');
        badge.id='__indjs_badge';
        badge.style.position='fixed';badge.style.zIndex='99998';badge.style.right='12px';badge.style.bottom='12px';
        badge.style.display='inline-flex';badge.style.alignItems='center';badge.style.gap='8px';
        badge.style.background='rgba(15, 23, 42, 0.9)';badge.style.color='#fff';badge.style.padding='8px 10px';
        badge.style.borderRadius='999px';badge.style.boxShadow='0 8px 20px rgba(0,0,0,.35)';badge.style.font='12px/1.2 system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial';
        badge.style.pointerEvents='none';
        badge.innerHTML = '<span style="display:inline-flex;align-items:center;justify-content:center;width:18px;height:18px;background:#4F46E5;border-radius:50%;font-weight:700;letter-spacing:.2px;font-size:10px">I</span><span id="__indjs_badge_text" style="opacity:.85">Ready</span>';
        // count bubble
        badgeCount = document.createElement('span');
        badgeCount.id='__indjs_badge_count';
        badgeCount.style.marginLeft='6px';
        badgeCount.style.display='none';
        badgeCount.style.background='#DC2626';
        badgeCount.style.color='#fff';
        badgeCount.style.borderRadius='999px';
        badgeCount.style.fontSize='11px';
        badgeCount.style.padding='2px 6px';
        badge.appendChild(badgeCount);
        document.body.appendChild(badge);return badge;
      }
      function ensurePanel(){
        if(panel) return panel;
        panel = document.createElement('div');
        panel.id = '__indjs_overlay';
        panel.style.position='fixed';panel.style.zIndex='99999';panel.style.right='12px';panel.style.bottom='48px';
        panel.style.maxWidth='520px';panel.style.background='rgba(0,0,0,0.85)';panel.style.color='#fff';panel.style.padding='12px 14px';panel.style.borderRadius='12px';panel.style.boxShadow='0 10px 30px rgba(0,0,0,.5)';panel.style.font='13px/1.4 system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial';
        panel.style.display='none';
        // controls
        var controls = document.createElement('div');
        controls.style.display='flex'; controls.style.alignItems='center'; controls.style.gap='6px'; controls.style.marginBottom='8px';
        var prev = document.createElement('button'); prev.textContent='◀'; prev.style.cssText='background:#111827;color:#fff;border:1px solid #374151;border-radius:6px;padding:2px 6px;cursor:pointer';
        var next = document.createElement('button'); next.textContent='▶'; next.style.cssText='background:#111827;color:#fff;border:1px solid #374151;border-radius:6px;padding:2px 6px;cursor:pointer';
        var count = document.createElement('span'); count.id='__indjs_err_count'; count.style.opacity='.8'; count.style.fontSize='12px'; count.textContent='0/0';
        var copy = document.createElement('button'); copy.textContent='Copy'; copy.style.cssText='margin-left:auto;background:#1F2937;color:#fff;border:1px solid #374151;border-radius:6px;padding:2px 8px;cursor:pointer';
        controls.appendChild(prev); controls.appendChild(next); controls.appendChild(count); controls.appendChild(copy);
        var content = document.createElement('div'); content.id='__indjs_err_body';
        panel.appendChild(controls); panel.appendChild(content);
        // handlers
        function render(){
          var body = document.getElementById('__indjs_err_body');
          var cspan = document.getElementById('__indjs_err_count');
          if (!errors.length){ body.innerHTML=''; cspan.textContent='0/0'; panel.style.display='none'; return; }
          if (idx<0) idx=0; if (idx>=errors.length) idx=errors.length-1;
          var e = errors[idx];
          cspan.textContent = (idx+1)+'/'+errors.length;
          var file = e && e.file ? e.file : '';
          var loc = (e && e.line) ? (':' + e.line + (e.column?(':'+e.column):'')) : '';
          var frame = e && e.frame ? e.frame : null;
          var frameHtml='';
          if (frame && Array.isArray(frame.lines)){
            frameHtml = '<div style="font-family:ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;background:#0b1020;border-radius:8px;margin-top:8px;overflow:hidden">' +
              frame.lines.map(function(l){
                var ln = String(l.n).padStart(4,' ');
                var code = (l.code||'').replace(/[&<>]/g,function(s){return ({'&':'&amp;','<':'&lt;','>':'&gt;'}[s])});
                var hl = l.highlight ? 'background:rgba(252,165,165,.15);color:#fff;' : 'color:#cbd5e1;';
                return '<div style="display:flex"><div style="width:3.5em;padding:.25em .5em;color:#94a3b8;background:#0a0f1e;border-right:1px solid #1f2937">'+ln+'</div><pre style="margin:0;padding:.25em .5em;'+hl+'">'+code+'</pre></div>';
              }).join('') + '</div>';
          }
          body.innerHTML = '<div style="display:flex;align-items:center;gap:8px;margin-bottom:6px">'+
            '<strong style="color:#fca5a5">Build Error</strong><span style="opacity:.8;font-size:12px">'+(file?file:'')+loc+'</span></div>'+
            '<div><pre style="white-space:pre-wrap;margin:6px 0 0;opacity:.95">'+(e.message||'Unknown')+'</pre></div>' + frameHtml;
          panel.style.display='block';
        }
        prev.addEventListener('click', function(){ if(errors.length){ idx=(idx-1+errors.length)%errors.length; render(); }});
        next.addEventListener('click', function(){ if(errors.length){ idx=(idx+1)%errors.length; render(); }});
        copy.addEventListener('click', function(){ if(!errors.length) return; try { navigator.clipboard.writeText(formatCopy(errors[idx])); } catch {} });
        panel.render = render;
        document.body.appendChild(panel);return panel;
      }
      function setIssueCount(n){
        issueCount = n;
        ensureBadge();
        if (!badgeCount) return;
        if (n>0){ badgeCount.textContent = n + ' Issue'; badgeCount.style.display='inline-block'; }
        else { badgeCount.style.display='none'; }
      }
      function ensureTip(){
        if(tip) return tip;
        tip = document.createElement('div');
        tip.id='__indjs_tip';
        tip.style.position='fixed';tip.style.zIndex='99997';tip.style.right='12px';tip.style.bottom='84px';
        tip.style.maxWidth='520px';tip.style.background='rgba(30, 64, 175, 0.92)';tip.style.color='#fff';
        tip.style.padding='10px 12px';tip.style.borderRadius='10px';tip.style.boxShadow='0 10px 30px rgba(0,0,0,.45)';
        tip.style.font='12px/1.4 system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial';
        tip.style.display='none';
        document.body.appendChild(tip);return tip;
      }
      function setBadge(text, spinning){
        var b = ensureBadge(); var t = b.querySelector('#__indjs_badge_text'); if(t) t.textContent = text;
        if(spinning){
          b.style.opacity='1';
          b.style.transition='opacity .15s ease';
          b.style.setProperty('--spin','spin 800ms linear infinite');
          if(!b.querySelector('style[data-indjs]')){
            var s=document.createElement('style'); s.setAttribute('data-indjs',''); s.textContent='@keyframes spin{to{transform:rotate(360deg)}} #__indjs_badge span:first-child{animation:var(--spin);}'; document.head.appendChild(s);
          }
        } else {
          b.style.setProperty('--spin','');
          clearTimeout(timer); timer=setTimeout(()=>{ if(b&&!building){ b.style.opacity='.85'; } }, 1200);
        }
      }
      function show(type, payload){
        if(type==='build-start'){
          building = true; setBadge('Building…', true); setIssueCount(0); if(panel) panel.style.display='none'; return;
        }
        if(type==='build-end'){
          building = false; setBadge('Ready', false); return;
        }
        if(type==='rebuild'){
          setBadge('Rebuilt', false);
          return;
        }
        if(type==='error'){
          var el = ensurePanel();
          errors.push(payload||{ message:'Unknown error' });
          setIssueCount(errors.length);
          idx = errors.length-1;
          el.render();
          setBadge('Error', false);
          return;
        }
        if(type==='suggestion'){
          var s = ensureTip();
          s.style.display='block';
          var title = payload && payload.title ? payload.title : 'Suggestion';
          var detail = payload && payload.detail ? payload.detail : '';
          s.innerHTML = '<strong>'+title+'</strong><div style="opacity:.9;margin-top:4px">'+detail+'</div>';
          clearTimeout(timer); timer=setTimeout(()=>{ if(s){ s.style.display='none'; } }, 4000);
          return;
        }
      }
      es.addEventListener('build-start', function(ev){ try{ show('build-start', JSON.parse(ev.data||'{}')); }catch(e){} });
      es.addEventListener('build-end', function(ev){ try{ show('build-end', JSON.parse(ev.data||'{}')); }catch(e){} });
      es.addEventListener('rebuild', function(ev){ try{ show('rebuild', JSON.parse(ev.data||'{}')); }catch(e){} });
      es.addEventListener('error', function(ev){ try{ show('error', JSON.parse(ev.data||'{}')); }catch(e){} });
      es.addEventListener('suggestion', function(ev){ try{ show('suggestion', JSON.parse(ev.data||'{}')); }catch(e){} });
      // Initial state
      setBadge('Ready', false);
    }catch(e){ /* ignore */ }
    function formatCopy(e){
      try {
        var out = [];
        out.push('[INDJS Build Error]');
        if (e.file) out.push(e.file + (e.line?(':'+e.line+(e.column?(':'+e.column):'')) : ''));
        if (e.message) out.push(e.message);
        if (e.frame && Array.isArray(e.frame.lines)){
          out.push(''); out.push('Code frame:');
          out = out.concat(e.frame.lines.map(function(l){ return (l.highlight?'> ':'  ') + String(l.n).padStart(4,' ') + ' | ' + l.code; }));
        }
        return out.join('\n');
      } catch { return String(e && e.message || ''); }
    }
  })();
  </script>
  ` : '';
  return `<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  ${description ? `<meta name="description" content="${escapeHtml(description)}" />` : ''}
  ${css}
  ${security}
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
function serializeProps(obj) {
  return JSON.stringify(obj)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029');
}

function securityHeadTags() {
  try {
    const cfg = getConfig();
    const s = cfg?.securityMeta || {};
    const tags = [];
    if (s.referrerPolicy) tags.push(`<meta name="referrer" content="${escapeHtml(s.referrerPolicy)}" />`);
    if (s.csp?.enabled && s.csp.policy) {
      // Note: Best practice is header via helmet; this meta is supplemental for development/static.
      tags.push(`<meta http-equiv="Content-Security-Policy" content="${escapeHtml(s.csp.policy)}" />`);
    }
    if (s.crossOriginOpenerPolicy) tags.push(`<meta http-equiv="Cross-Origin-Opener-Policy" content="${escapeHtml(s.crossOriginOpenerPolicy)}" />`);
    if (s.crossOriginEmbedderPolicy) tags.push(`<meta http-equiv="Cross-Origin-Embedder-Policy" content="${escapeHtml(s.crossOriginEmbedderPolicy)}" />`);
    if (s.dnsPrefetch) tags.push('<meta http-equiv="x-dns-prefetch-control" content="on" />');
    if (Array.isArray(s.preconnect)) {
      for (const url of s.preconnect) {
        tags.push(`<link rel="preconnect" href="${escapeHtml(url)}" crossorigin>`);
      }
    }
    return tags.join('\n');
  } catch {
    return '';
  }
}
