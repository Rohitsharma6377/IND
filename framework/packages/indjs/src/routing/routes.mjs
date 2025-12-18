import fs from "fs/promises";
import path from "path";

const PAGE_EXTS = [".jsx", ".js", ".mjs", ".tsx", ".ts"];

export function fileToRoute(pagesDir, file) {
  const rel = path.relative(pagesDir, file).replace(/\\/g, "/");
  // strip extensions and route groups like (marketing)
  const noExt = rel
    .replace(/\.(jsx|js|mjs|tsx|ts)$/i, "")
    .split("/")
    .filter((s) => !/^\(.+\)$/.test(s))
    .join("/");
  if (noExt.toLowerCase() === "index") return "/";
  if (noExt.endsWith("/index")) return "/" + noExt.slice(0, -"/index".length);
  return "/" + noExt;
}

async function walk(dir) {
  const out = [];
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(full)));
    else out.push(full);
  }
  return out;
}

function toRegex(routePath) {
  // Convert /blog/[slug]/[id] to regex and extract param names
  const parts = routePath.split("/").filter(Boolean);
  const names = [];
  const re = parts
    .map((p) => {
      const m = p.match(/^\[(.+)\]$/);
      if (m) {
        names.push(m[1]);
        return "([^/]+)";
      }
      return p.replace(/[.*+?^${}()|[\]\\]/g, (r) => `\\${r}`);
    })
    .join("/");
  const pattern = new RegExp(`^/${re}$`);
  return { pattern, names };
}

export async function discoverRoutes(root) {
  const pagesDir = path.join(root, "pages");
  try {
    await fs.access(pagesDir);
  } catch {
    return { pages: [], api: [] };
  }
  const files = (await walk(pagesDir))
    .filter((f) => PAGE_EXTS.includes(path.extname(f)))
    .filter((f) => !path.basename(f).includes("__indjs."));
  const pageFiles = files.filter(
    (f) => !fileToRoute(pagesDir, f).startsWith("/api/"),
  );
  const apiFiles = files.filter((f) =>
    fileToRoute(pagesDir, f).startsWith("/api/"),
  );

  const pages = pageFiles.map((f) => {
    const route = fileToRoute(pagesDir, f);
    const { pattern, names } = toRegex(route);
    return { type: "page", route, file: f, pattern, names };
  });

  const api = apiFiles.map((f) => {
    const route = fileToRoute(pagesDir, f);
    const { pattern, names } = toRegex(route);
    return { type: "api", route, file: f, pattern, names };
  });

  return { pages, api };
}

export * from "./matcher.mjs";
