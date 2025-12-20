import { discoverRoutes, isDynamicRoute } from "../routing/routes.mjs";
import { buildClientBundles, buildUniversalBundle } from "./client.mjs";
import { buildCss, cssHref } from "../css.mjs";
import { renderPageModule } from "../ssr.mjs";
import { loadModule } from "../load.mjs";
import path from "path";
import fs from "fs/promises";

export async function build({ root, baseUrl, webDir }) {
  console.log("\n🔨 Building INDJS application...\n");

  const { pages, api } = await discoverRoutes(root);

  console.log("📄 Page Routes:");
  for (const r of pages)
    console.log(`   /${r.route.replace(/^\//, "")} → ${r.file}`);

  console.log("\n🔌 API Routes:");
  for (const r of api) console.log(`   ${r.route} → ${r.file}`);

  console.log("\n⚡ Building client bundles...");
  await buildClientBundles({ root, pages });

  console.log("🎨 Building CSS...");
  await buildCss({ root });

  // Static generation for ALL pages (like Next.js)
  console.log("\n📦 Generating static pages...");
  const staticOut = path.join(root, ".indjs", "static");
  await fs.mkdir(staticOut, { recursive: true });

  // Copy public assets first
  await copyPublicAssets(root, staticOut);

  // Generate all pages as static HTML
  for (const p of pages) {
    try {
      const mod = await loadModule(p.file);
      const hasGSP = typeof mod.getStaticProps === "function";
      const hasGSPa = typeof mod.getStaticPaths === "function";

      // Generate static pages for all routes, not just those with getStaticProps
      const paths = hasGSPa ? await mod.getStaticPaths({}) : [{ params: {} }];

      for (const entry of paths) {
        const params = entry.params || {};
        const urlRoute = materializeRoute(p.route, params);
        // Resolve client source from manifest for hydration
        let clientSrc = null;
        try {
          const manifestPath = path.join(
            root,
            ".indjs",
            "client",
            "manifest.json",
          );
          const manifest = JSON.parse(await fs.readFile(manifestPath, "utf8"));
          clientSrc = manifest[p.route] || null;
        } catch { }

        // Fetch props if getStaticProps is defined
        let props = {};
        if (hasGSP) {
          const result = await mod.getStaticProps({ params });
          props = result.props || {};
        }

        const html = await renderPageModule({
          mod,
          ctx: {
            req: {},
            res: {},
            query: {},
            params,
            root,
            pageFile: p.file,
            route: p.route,
            dev: false,
          },
          assets: { clientSrc },
          props,
        });

        const filePath = path.join(staticOut, routeToStaticPath(urlRoute));
        await fs.mkdir(path.dirname(filePath), { recursive: true });
        await fs.writeFile(filePath, html, "utf8");

        const size = (html.length / 1024).toFixed(1);
        console.log(`   ✓ ${urlRoute.padEnd(20)} ${size}kB`);
      }
    } catch (error) {
      console.log(`   ✗ ${p.route.padEnd(20)} Error: ${error.message}`);
    }
  }

  // Copy API routes for serverless functions
  console.log("\n🔌 Copying API routes...");
  await copyApiRoutes(root, staticOut, api);

  // Generate sitemap.xml
  console.log("\n🗺️ Generating sitemap...");
  try {
    const origin =
      (baseUrl && baseUrl.replace(/\/$/, "")) || "http://localhost:3000";
    const staticPages = pages.filter(
      (p) => !p.route.startsWith("/api/") && !isDynamicRoute(p.route),
    );
    const urls = staticPages
      .map((p) => `  <url>\n    <loc>${origin}${p.route}</loc>\n  </url>`)
      .join("\n");
    const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;

    await fs.writeFile(path.join(staticOut, "sitemap.xml"), xml, "utf8");
    console.log("   ✓ sitemap.xml generated");
  } catch (e) {
    console.log("   ✗ Failed to generate sitemap.xml:", e.message);
  }

  // Generate robots.txt
  try {
    const robotsTxt = `User-agent: *\nAllow: /\n\nSitemap: ${(baseUrl || "http://localhost:3000").replace(/\/$/, "")}/sitemap.xml\n`;
    await fs.writeFile(path.join(staticOut, "robots.txt"), robotsTxt, "utf8");
    console.log("   ✓ robots.txt generated");
  } catch (e) {
    console.log("   ✗ Failed to generate robots.txt:", e.message);
  }

  // Create _redirects for SPA fallback
  try {
    const redirects = `/*    /index.html   200`;
    await fs.writeFile(path.join(staticOut, "_redirects"), redirects, "utf8");
    console.log("   ✓ _redirects generated");
  } catch (e) {
    console.log("   ✗ Failed to generate _redirects:", e.message);
  }

  console.log("\n✅ Build completed successfully!");
  console.log(`📁 Output directory: ${staticOut}`);
  console.log("\n🚀 Ready for deployment to Vercel, Netlify, or any static host\n");

  // Mobile/Native SPA support
  if (webDir) {
    console.log("\n📱 Generating Universal SPA for Mobile...");
    const universalSrc = await buildUniversalBundle({ root, pages });
    const cssPath = await cssHref({ root });

    // Copy universal bundle to static output
    const clientDir = path.join(root, ".indjs", "client");
    await fs.copyFile(
      path.join(clientDir, "universal.js"),
      path.join(staticOut, "universal.js")
    );
    try {
      await fs.copyFile(
        path.join(clientDir, "styles.css"),
        path.join(staticOut, "styles.css")
      );
    } catch { }

    // Generate a clean index.html for Capacitor
    const html = `<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
  <link rel="stylesheet" href="styles.css" />
  <script src="universal.js" defer></script>
</head>
<body class="bg-white">
  <div id="__ind"></div>
</body>
</html>`;

    const indexFile = path.join(staticOut, "index.html");
    await fs.writeFile(indexFile, html, "utf8");
    console.log("   ✓ Universal index.html generated for Capacitor");
  }

  // Optional: emit to custom webDir (e.g., for Capacitor)
  if (webDir) {
    try {
      const dest = path.isAbsolute(webDir) ? webDir : path.join(root, webDir);
      await copyDir(staticOut, dest);
      console.log(`[indjs] Copied static output to ${dest}`);
    } catch (e) {
      console.warn(
        `[indjs] Failed to copy static output to webDir (${webDir}):`,
        e?.message || e,
      );
    }
  }
}

function routeToStaticPath(route) {
  // map "/" -> "index.html", "/about" -> "about.html", "/blog/hello" -> "blog/hello.html"
  if (route === "/") return "index.html";
  const clean = route.replace(/^\//, "").replace(/\/$/, "");
  return clean + ".html";
}

function routeToFsPath(route) {
  // map "/" -> "index.html", "/blog/hello" -> "blog/hello/index.html"
  const clean = route.replace(/^\//, "");
  const dir = clean === "" ? "" : clean + "/";
  return path.join(dir, "index.html");
}

async function copyPublicAssets(root, staticOut) {
  const publicDir = path.join(root, "public");
  try {
    const files = await fs.readdir(publicDir, { withFileTypes: true });
    let assetCount = 0;

    for (const file of files) {
      const srcPath = path.join(publicDir, file.name);
      const destPath = path.join(staticOut, file.name);

      if (file.isDirectory()) {
        await copyDir(srcPath, destPath);
      } else {
        await fs.copyFile(srcPath, destPath);
      }
      assetCount++;
    }

    console.log(`   ✓ Copied ${assetCount} public assets`);
  } catch (error) {
    console.log("   ℹ No public directory found");
  }
}

async function copyApiRoutes(root, staticOut, apiRoutes) {
  const apiDir = path.join(staticOut, "api");
  await fs.mkdir(apiDir, { recursive: true });

  for (const route of apiRoutes) {
    try {
      // route.file is already an absolute path from discoverRoutes
      const srcPath = route.file;
      const routePath = route.route.replace("/api/", "");
      const destPath = path.join(apiDir, routePath + ".js");

      await fs.mkdir(path.dirname(destPath), { recursive: true });
      await fs.copyFile(srcPath, destPath);
      console.log(`   ✓ ${route.route}`);
    } catch (error) {
      console.log(`   ✗ ${route.route} Error: ${error.message}`);
    }
  }
}

function materializeRoute(template, params) {
  // replace /blog/[slug] with /blog/value
  return template.replace(/\[(.+?)\]/g, (_, k) =>
    encodeURIComponent(params[k] ?? ""),
  );
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
