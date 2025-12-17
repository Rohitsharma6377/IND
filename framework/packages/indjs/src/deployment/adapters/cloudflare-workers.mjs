// Cloudflare Workers adapter stub
// Export a fetch handler compatible with Workers runtime

import { discoverRoutes, matchDynamic } from "../routes.mjs";
import { renderPageModule } from "../ssr.mjs";
import { routeToClientPath } from "../build_client.mjs";

export default {
  async fetch(request, env, ctx) {
    try {
      const url = new URL(request.url);
      const root = "/"; // adjust if bundling with Wrangler includes assets
      const { pages, api } = await discoverRoutes(root);

      // Helper to build Response
      const json = (obj, status = 200) =>
        new Response(JSON.stringify(obj), {
          status,
          headers: { "Content-Type": "application/json" },
        });

      // API
      if (url.pathname.startsWith("/api")) {
        const match = matchDynamic(url.pathname, api);
        if (!match) return json({ error: "Not Found" }, 404);
        const mod = await import(match.route.file);
        const method = (request.method || "GET").toLowerCase();
        const body = await safeJson(request);
        const resShim = {
          _status: 200,
          _headers: new Headers(),
          status(code) {
            this._status = code;
          },
          setHeader(k, v) {
            this._headers.set(k, v);
          },
          json(obj) {
            return new Response(JSON.stringify(obj), {
              status: this._status,
              headers: this._headers,
            });
          },
          end(text) {
            return new Response(text, {
              status: this._status,
              headers: this._headers,
            });
          },
          get headersSent() {
            return false;
          },
        };
        const fn = mod[method] || mod.default;
        if (!fn) return json({ error: "Method Not Allowed" }, 405);
        const result = await fn({
          req: request,
          res: resShim,
          params: match.params,
          query: Object.fromEntries(url.searchParams),
          body,
        });
        if (result !== undefined) return resShim.json(result);
        return json({ ok: true });
      }

      // Page
      const match = matchDynamic(url.pathname, pages);
      if (!match) return new Response("Not Found", { status: 404 });
      const mod = await import(match.route.file);
      const clientSrc = `/__indjs/client${routeToClientPath(match.route.route)}`;
      const resShim = {
        _status: 200,
        _headers: new Headers({ "Content-Type": "text/html; charset=utf-8" }),
        status(code) {
          this._status = code;
        },
        setHeader(k, v) {
          this._headers.set(k, v);
        },
        end(html) {
          return new Response(html, {
            status: this._status,
            headers: this._headers,
          });
        },
        get headersSent() {
          return false;
        },
      };
      const rendered = await renderPageModule({
        mod,
        ctx: {
          req: request,
          res: resShim,
          query: Object.fromEntries(url.searchParams),
          params: match.params,
          root,
          pageFile: match.route.file,
          route: match.route.route,
        },
        assets: { clientSrc },
      });
      if (typeof rendered === "function") return rendered(resShim);
      return resShim.end(rendered);
    } catch (e) {
      return new Response("Internal Server Error", { status: 500 });
    }
  },
};

async function safeJson(request) {
  try {
    return await request.json();
  } catch {
    return {};
  }
}
