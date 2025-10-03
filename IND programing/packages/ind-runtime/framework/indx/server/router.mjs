import path from 'path';
import fs from 'fs';
import { pathToFileURL } from 'url';
import * as http from '../../../std/net/http.mjs';
import { renderToString } from '../../../std/ui.mjs';

function findRoute(distRoot, urlPath) {
  // Minimal: only handle '/'
  if (urlPath === '/' || urlPath === '') {
    const page = path.join(distRoot, 'app', 'page.js');
    const loader = path.join(distRoot, 'app', 'loader.js');
    return { page, loader: fs.existsSync(loader) ? loader : null, params: {} };
  }
  return null;
}

async function loadModule(filePath) {
  return await import(pathToFileURL(filePath).href);
}

function htmlShell({ title = 'IND App', body = '' }) {
  return `<!doctype html>
<html>
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${title}</title>
</head>
<body>
<div id="root">${body}</div>
</body>
</html>`;
}

export function serveApp({ distRoot, port = 3000, title = 'IND App' }) {
  return http.serve(async (req) => {
    const route = findRoute(distRoot, new URL(req.url, 'http://localhost').pathname);
    if (!route) return { status: 404, body: 'Not Found' };

    let props = {};
    if (route.loader) {
      const mod = await loadModule(route.loader);
      if (typeof mod.loader === 'function') {
        props = await mod.loader({ params: route.params, url: req.url });
      }
    }

    const pageMod = await loadModule(route.page);
    const Page = pageMod.default || pageMod.Page || pageMod.page || pageMod;
    if (!Page) return { status: 500, body: 'Page module missing default export' };

    // Try to render: if component has render() returning string, use it; otherwise render h() tree
    let html = '';
    try {
      const inst = typeof Page === 'function' ? Page(props) : Page;
      if (inst && typeof inst.render === 'function') {
        const out = inst.render();
        if (typeof out === 'string') html = out;
        else html = renderToString(out);
      } else {
        html = renderToString(Page(props));
      }
    } catch (e) {
      console.error('render error', e);
      return { status: 500, body: 'Render error' };
    }

    return { status: 200, headers: { 'content-type': 'text/html; charset=utf-8' }, body: htmlShell({ title, body: html }) };
  }, { port });
}
