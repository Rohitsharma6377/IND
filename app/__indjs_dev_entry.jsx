import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import Page from "/pages/index.jsx";
import '/styles/globals.css';
import App from "/pages/_app.jsx";
function __ind_boot(){
  const el = document.getElementById('__ind');
  const props = window.__IND_PROPS__ || {};
  let node = React.createElement(Page, props);
  node = React.createElement(App, props, node);
  if (el) { try { hydrateRoot(el, node); } catch (e) { const r = createRoot(el); r.render(node); } }
}
try { window.__IND_BOOT__ = __ind_boot; } catch {}
__ind_boot();
