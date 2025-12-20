import React from 'react';
import { createRoot } from 'react-dom/client';
import Page_0 from "C:\\Users\\ASUS\\Desktop\\project\\IND\\mobile-app\\pages\\about.jsx";
import Page_1 from "C:\\Users\\ASUS\\Desktop\\project\\IND\\mobile-app\\pages\\categories.jsx";
import Page_2 from "C:\\Users\\ASUS\\Desktop\\project\\IND\\mobile-app\\pages\\index.jsx";
import Page_3 from "C:\\Users\\ASUS\\Desktop\\project\\IND\\mobile-app\\pages\\profile.jsx";
import Page_4 from "C:\\Users\\ASUS\\Desktop\\project\\IND\\mobile-app\\pages\\statistics.jsx";
import Page_5 from "C:\\Users\\ASUS\\Desktop\\project\\IND\\mobile-app\\pages\\_layout.jsx";

import Layout from "C:\\Users\\ASUS\\Desktop\\project\\IND\\mobile-app\\pages\\_layout.jsx";
const routes = [
  { path: "/about", component: Page_0 },
  { path: "/categories", component: Page_1 },
  { path: "/", component: Page_2 },
  { path: "/profile", component: Page_3 },
  { path: "/statistics", component: Page_4 },
  { path: "/_layout", component: Page_5 },
];

window.__IND_SPA__ = true;

function UniversalApp() {
  const [path, setPath] = React.useState(window.location.pathname);
  
  React.useEffect(() => {
    const handleNav = (e) => setPath(window.location.pathname);
    window.addEventListener('popstate', handleNav);
    window.addEventListener('ind:navigate', handleNav);
    return () => {
      window.removeEventListener('popstate', handleNav);
      window.removeEventListener('ind:navigate', handleNav);
    };
  }, []);

  const route = routes.find(r => r.path === path) || routes.find(r => r.path === '/');
  const page = React.createElement(route.component, { path });
  return React.createElement(Layout, { path }, page);
}

function __ind_boot(){
  const el = document.getElementById('__ind');
  if (el) {
    const r = createRoot(el);
    r.render(React.createElement(UniversalApp));
  }
}
window.__IND_BOOT__ = __ind_boot;
__ind_boot();
