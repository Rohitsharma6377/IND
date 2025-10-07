import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import Page from "/pages/docs/configuration.jsx";
import '/styles/globals.css';
import App from "/pages/_app.jsx";
const el = document.getElementById('__ind');
const props = window.__IND_PROPS__ || {};
let node = React.createElement(Page, props);
node = React.createElement(App, props, node);
if (el) { try { hydrateRoot(el, node); } catch (e) { const r = createRoot(el); r.render(node); } }
