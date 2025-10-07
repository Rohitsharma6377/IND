import { discoverRoutes, isDynamicRoute } from './routes.mjs';
import { buildClientBundles } from './build_client.mjs';
import { buildCss } from './css.mjs';
import { renderPageModule } from './ssr.mjs';
import { loadModule } from './load.mjs';
import path from 'path';
import fs from 'fs/promises';

export async function build({ root, baseUrl, webDir }) {
  const { pages, api } = await discoverRoutes(root);
  console.log('Discovered page routes:');
  for (const r of pages) console.log(` - ${r.route} -> ${r.file}`);
  console.log('Discovered API routes:');
  for (const r of api) console.log(` - ${r.route} -> ${r.file}`);
  await buildClientBundles({ root, pages });
  await buildCss({ root });
  // Static generation
  const staticOut = path.join(root, '.indjs', 'static');
  await fs.mkdir(staticOut, { recursive: true });
  for (const p of pages) {
    const mod = await loadModule(p.file);
    const hasGSP = typeof mod.getStaticProps === 'function';
    const hasGSPa = typeof mod.getStaticPaths === 'function';
    if (!hasGSP && !hasGSPa) continue;
    const paths = hasGSPa ? await mod.getStaticPaths({}) : [{ params: {} }];
    for (const entry of paths) {
      const params = entry.params || {};
      const urlRoute = materializeRoute(p.route, params);
      const clientSrc = null; // client script still loaded by route path in prod
      const html = await renderPageModule({ mod, ctx: { req: {}, res: {}, query: {}, params, root, pageFile: p.file, route: p.route }, assets: { clientSrc } });
      const filePath = path.join(staticOut, routeToFsPath(urlRoute));
      await fs.mkdir(path.dirname(filePath), { recursive: true });
      await fs.writeFile(filePath, html, 'utf8');
      console.log(`[SSG] generated ${urlRoute} -> ${filePath}`);
    }
  }
  // Generate sitemap.xml
  try {
    const origin = (baseUrl && baseUrl.replace(/\/$/, '')) || 'http://localhost:3000';
    const staticPages = pages.filter(p => !p.route.startsWith('/api/') && !isDynamicRoute(p.route));
    const urls = staticPages.map(p => `  <url>\n    <loc>${origin}${p.route}</loc>\n  </url>`).join('\n');
    const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
    const publicDir = path.join(root, 'public');
    await fs.mkdir(publicDir, { recursive: true });
    await fs.writeFile(path.join(publicDir, 'sitemap.xml'), xml, 'utf8');
    console.log('sitemap.xml generated.');
  } catch (e) {
    console.warn('Failed to generate sitemap.xml:', e.message);
  }
  console.log('Client bundles and CSS built. Build complete.');

  // Optional: emit to custom webDir (e.g., for Capacitor)
  if (webDir) {
    try {
      const dest = path.isAbsolute(webDir) ? webDir : path.join(root, webDir);
      await copyDir(staticOut, dest);
      console.log(`[indjs] Copied static output to ${dest}`);
    } catch (e) {
      console.warn(`[indjs] Failed to copy static output to webDir (${webDir}):`, e?.message || e);
    }
  }
}

function routeToFsPath(route) {
  // map "/" -> "index.html", "/blog/hello" -> "blog/hello/index.html"
  const clean = route.replace(/^\//, '');
  const dir = clean === '' ? '' : clean + '/';
  return path.join(dir, 'index.html');
}

function materializeRoute(template, params) {
  // replace /blog/[slug] with /blog/value
  return template.replace(/\[(.+?)\]/g, (_, k) => encodeURIComponent(params[k] ?? ''));
}

async function copyDir(src, dest) {
  await fs.mkdir(dest, { recursive: true });
  const entries = await fs.readdir(src, { withFileTypes: true });
  for (const ent of entries) {
    const s = path.join(src, ent.name);
    const d = path.join(dest, ent.name);
    if (ent.isDirectory()) await copyDir(s, d);
    else await fs.copyFile(s, d);
  }
}
