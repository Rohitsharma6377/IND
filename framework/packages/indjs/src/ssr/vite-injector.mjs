import path from "path";
import fs from "fs/promises";

export async function injectDevViteScripts(ctx, pagesDir) {
  try {
    const pageRel =
      "/" + path.relative(ctx.root, ctx.pageFile).replace(/\\/g, "/");
    // Determine _app path if present
    let appRel = null;
    try {
      await fs.access(path.join(pagesDir, "_app.jsx"));
      appRel = "/pages/_app.jsx";
    } catch {}
    if (!appRel) {
      try {
        await fs.access(path.join(pagesDir, "_app.js"));
        appRel = "/pages/_app.js";
      } catch {}
    }
    // Write a temporary entry module that Vite can transform (so bare imports resolve)
    const entryPath = path.join(ctx.root, "__indjs_dev_entry.jsx");
    const entryCode = `import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import Page from ${JSON.stringify(pageRel)};
import '/styles/globals.css';
${appRel ? `import App from ${JSON.stringify(appRel)};` : ""}
function __ind_boot(){
  const el = document.getElementById('__ind');
  const props = window.__IND_PROPS__ || {};
  let node = React.createElement(Page, props);
  ${appRel ? "node = React.createElement(App, props, node);" : ""}
  if (el) { try { hydrateRoot(el, node); } catch (e) { const r = createRoot(el); r.render(node); } }
}
try { window.__IND_BOOT__ = __ind_boot; } catch {}
__ind_boot();
`;
    try {
      await fs.writeFile(entryPath, entryCode, "utf8");
      if (ctx.dev) {
        try {
          console.log("[INDJS][DEV] wrote Vite entry:", entryPath);
        } catch {}
      }
    } catch (e) {
      try {
        console.error(
          "[INDJS][DEV] failed to write Vite entry",
          e?.message || e,
        );
      } catch {}
    }
    const buster = Date.now();
    // Inject React Refresh preamble required by @vitejs/plugin-react
    const reactRefreshPreamble = `\n  <script type="module">\n    import RefreshRuntime from '/@react-refresh';\n    RefreshRuntime.injectIntoGlobalHook(window);\n    window.$RefreshReg$ = () => {};\n    window.$RefreshSig$ = () => (type) => type;\n    window.__vite_plugin_react_preamble_installed__ = true;\n  </script>`;
    return `${reactRefreshPreamble}\n  <script type="module" src="/@vite/client"></script>\n  <script type="module" src="/__indjs_dev_entry.jsx?t=${buster}"></script>`;
  } catch {
    return "";
  }
}
