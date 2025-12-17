import path from "path";
import fs from "fs/promises";
import { pathToFileURL } from "url";

export async function loadPlugins(cfg, ctx) {
  try {
    const entries = Array.isArray(cfg?.plugins) ? cfg.plugins : [];
    const loaded = [];
    for (const p of entries) {
      if (typeof p === "function") {
        loaded.push(p);
        continue;
      }
      if (typeof p === "string") {
        const abs = path.isAbsolute(p) ? p : path.join(process.cwd(), p);
        try {
          await fs.access(abs);
          const mod = await import(pathToFileURL(abs));
          if (typeof mod.default === "function") loaded.push(mod.default);
          else if (typeof mod.plugin === "function") loaded.push(mod.plugin);
        } catch {}
      }
    }
    return loaded;
  } catch {
    return [];
  }
}

export async function applyHook(plugins, hookName, payload) {
  if (!Array.isArray(plugins) || !plugins.length) return;
  for (const fn of plugins) {
    try {
      const hook = await fn(hookName);
      if (typeof hook === "function") {
        await hook(payload);
      } else if (hook && typeof hook[hookName] === "function") {
        await hook[hookName](payload);
      }
    } catch {}
  }
}
