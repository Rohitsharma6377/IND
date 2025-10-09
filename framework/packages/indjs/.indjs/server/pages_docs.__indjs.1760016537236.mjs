// pages/docs.jsx
import React from "react";
import { jsx, jsxs } from "react/jsx-runtime";
function Docs() {
  const ui = {
    page: {
      fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial",
      minHeight: "100vh",
      margin: 0,
      background: "linear-gradient(180deg, #0ea5e9 0%, #111827 60%)",
      color: "#0f172a"
    },
    wrap: {
      maxWidth: 980,
      margin: "0 auto",
      padding: "48px 20px"
    },
    hero: {
      background: "white",
      borderRadius: 16,
      padding: 28,
      boxShadow: "0 10px 30px rgba(0,0,0,0.12)"
    },
    h1: {
      fontSize: 32,
      lineHeight: 1.1,
      margin: 0,
      color: "#0b1220"
    },
    nav: {
      marginBottom: 20
    },
    backLink: {
      color: "#0ea5e9",
      textDecoration: "none",
      fontSize: 14
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
      gap: 16,
      marginTop: 24
    },
    card: {
      background: "#f8fafc",
      borderRadius: 12,
      padding: 20,
      border: "1px solid #e2e8f0"
    },
    cardTitle: {
      fontSize: 18,
      fontWeight: 600,
      color: "#0b1220",
      marginBottom: 8
    },
    cardDesc: {
      fontSize: 14,
      color: "#475569",
      marginBottom: 12
    },
    cardLink: {
      color: "#0ea5e9",
      textDecoration: "none",
      fontSize: 14,
      fontWeight: 500
    }
  };
  const docs = [
    {
      title: "Installation",
      desc: "Get started with INDJS by installing the framework and creating your first app.",
      link: "/docs/installation"
    },
    {
      title: "Routing",
      desc: "Learn about file-based routing, dynamic routes, and navigation in INDJS.",
      link: "/docs/routing"
    },
    {
      title: "API Routes",
      desc: "Create serverless API endpoints with full HTTP method support.",
      link: "/docs/api-routes"
    },
    {
      title: "SSR & SSG",
      desc: "Server-side rendering and static site generation for optimal performance.",
      link: "/docs/ssr-ssg"
    },
    {
      title: "Styling",
      desc: "Built-in Tailwind CSS support and custom styling options.",
      link: "/docs/styling"
    },
    {
      title: "Authentication",
      desc: "JWT, OAuth, and session-based authentication patterns.",
      link: "/docs/auth"
    },
    {
      title: "Database",
      desc: "Database integration with MongoDB, PostgreSQL, and more.",
      link: "/docs/database"
    },
    {
      title: "Deployment",
      desc: "Deploy to Vercel, Netlify, AWS, and other platforms.",
      link: "/docs/deployment"
    },
    {
      title: "Testing",
      desc: "Unit testing, integration testing, and E2E testing setup.",
      link: "/docs/testing"
    }
  ];
  return /* @__PURE__ */ jsx("main", { style: ui.page, children: /* @__PURE__ */ jsx("div", { style: ui.wrap, children: /* @__PURE__ */ jsxs("section", { style: ui.hero, children: [
    /* @__PURE__ */ jsx("nav", { style: ui.nav, children: /* @__PURE__ */ jsx("a", { href: "/", style: ui.backLink, children: "\u2190 Back to Home" }) }),
    /* @__PURE__ */ jsx("h1", { style: ui.h1, children: "INDJS Documentation" }),
    /* @__PURE__ */ jsx("div", { style: ui.grid, children: docs.map((doc, i) => /* @__PURE__ */ jsxs("div", { style: ui.card, children: [
      /* @__PURE__ */ jsx("h3", { style: ui.cardTitle, children: doc.title }),
      /* @__PURE__ */ jsx("p", { style: ui.cardDesc, children: doc.desc }),
      /* @__PURE__ */ jsx("a", { href: doc.link, style: ui.cardLink, children: "Read more \u2192" })
    ] }, i)) })
  ] }) }) });
}
export {
  Docs as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcGFnZXMvZG9jcy5qc3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIERvY3MoKSB7XG4gIGNvbnN0IHVpID0ge1xuICAgIHBhZ2U6IHtcbiAgICAgIGZvbnRGYW1pbHk6ICdzeXN0ZW0tdWksIC1hcHBsZS1zeXN0ZW0sIFNlZ29lIFVJLCBSb2JvdG8sIEhlbHZldGljYSwgQXJpYWwnLFxuICAgICAgbWluSGVpZ2h0OiAnMTAwdmgnLFxuICAgICAgbWFyZ2luOiAwLFxuICAgICAgYmFja2dyb3VuZDogJ2xpbmVhci1ncmFkaWVudCgxODBkZWcsICMwZWE1ZTkgMCUsICMxMTE4MjcgNjAlKScsXG4gICAgICBjb2xvcjogJyMwZjE3MmEnXG4gICAgfSxcbiAgICB3cmFwOiB7XG4gICAgICBtYXhXaWR0aDogOTgwLFxuICAgICAgbWFyZ2luOiAnMCBhdXRvJyxcbiAgICAgIHBhZGRpbmc6ICc0OHB4IDIwcHgnXG4gICAgfSxcbiAgICBoZXJvOiB7XG4gICAgICBiYWNrZ3JvdW5kOiAnd2hpdGUnLFxuICAgICAgYm9yZGVyUmFkaXVzOiAxNixcbiAgICAgIHBhZGRpbmc6IDI4LFxuICAgICAgYm94U2hhZG93OiAnMCAxMHB4IDMwcHggcmdiYSgwLDAsMCwwLjEyKSdcbiAgICB9LFxuICAgIGgxOiB7XG4gICAgICBmb250U2l6ZTogMzIsXG4gICAgICBsaW5lSGVpZ2h0OiAxLjEsXG4gICAgICBtYXJnaW46IDAsXG4gICAgICBjb2xvcjogJyMwYjEyMjAnXG4gICAgfSxcbiAgICBuYXY6IHtcbiAgICAgIG1hcmdpbkJvdHRvbTogMjBcbiAgICB9LFxuICAgIGJhY2tMaW5rOiB7XG4gICAgICBjb2xvcjogJyMwZWE1ZTknLFxuICAgICAgdGV4dERlY29yYXRpb246ICdub25lJyxcbiAgICAgIGZvbnRTaXplOiAxNFxuICAgIH0sXG4gICAgZ3JpZDoge1xuICAgICAgZGlzcGxheTogJ2dyaWQnLFxuICAgICAgZ3JpZFRlbXBsYXRlQ29sdW1uczogJ3JlcGVhdChhdXRvLWZpdCwgbWlubWF4KDI4MHB4LCAxZnIpKScsXG4gICAgICBnYXA6IDE2LFxuICAgICAgbWFyZ2luVG9wOiAyNFxuICAgIH0sXG4gICAgY2FyZDoge1xuICAgICAgYmFja2dyb3VuZDogJyNmOGZhZmMnLFxuICAgICAgYm9yZGVyUmFkaXVzOiAxMixcbiAgICAgIHBhZGRpbmc6IDIwLFxuICAgICAgYm9yZGVyOiAnMXB4IHNvbGlkICNlMmU4ZjAnXG4gICAgfSxcbiAgICBjYXJkVGl0bGU6IHtcbiAgICAgIGZvbnRTaXplOiAxOCxcbiAgICAgIGZvbnRXZWlnaHQ6IDYwMCxcbiAgICAgIGNvbG9yOiAnIzBiMTIyMCcsXG4gICAgICBtYXJnaW5Cb3R0b206IDhcbiAgICB9LFxuICAgIGNhcmREZXNjOiB7XG4gICAgICBmb250U2l6ZTogMTQsXG4gICAgICBjb2xvcjogJyM0NzU1NjknLFxuICAgICAgbWFyZ2luQm90dG9tOiAxMlxuICAgIH0sXG4gICAgY2FyZExpbms6IHtcbiAgICAgIGNvbG9yOiAnIzBlYTVlOScsXG4gICAgICB0ZXh0RGVjb3JhdGlvbjogJ25vbmUnLFxuICAgICAgZm9udFNpemU6IDE0LFxuICAgICAgZm9udFdlaWdodDogNTAwXG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGRvY3MgPSBbXG4gICAge1xuICAgICAgdGl0bGU6ICdJbnN0YWxsYXRpb24nLFxuICAgICAgZGVzYzogJ0dldCBzdGFydGVkIHdpdGggSU5ESlMgYnkgaW5zdGFsbGluZyB0aGUgZnJhbWV3b3JrIGFuZCBjcmVhdGluZyB5b3VyIGZpcnN0IGFwcC4nLFxuICAgICAgbGluazogJy9kb2NzL2luc3RhbGxhdGlvbidcbiAgICB9LFxuICAgIHtcbiAgICAgIHRpdGxlOiAnUm91dGluZycsXG4gICAgICBkZXNjOiAnTGVhcm4gYWJvdXQgZmlsZS1iYXNlZCByb3V0aW5nLCBkeW5hbWljIHJvdXRlcywgYW5kIG5hdmlnYXRpb24gaW4gSU5ESlMuJyxcbiAgICAgIGxpbms6ICcvZG9jcy9yb3V0aW5nJ1xuICAgIH0sXG4gICAge1xuICAgICAgdGl0bGU6ICdBUEkgUm91dGVzJyxcbiAgICAgIGRlc2M6ICdDcmVhdGUgc2VydmVybGVzcyBBUEkgZW5kcG9pbnRzIHdpdGggZnVsbCBIVFRQIG1ldGhvZCBzdXBwb3J0LicsXG4gICAgICBsaW5rOiAnL2RvY3MvYXBpLXJvdXRlcydcbiAgICB9LFxuICAgIHtcbiAgICAgIHRpdGxlOiAnU1NSICYgU1NHJyxcbiAgICAgIGRlc2M6ICdTZXJ2ZXItc2lkZSByZW5kZXJpbmcgYW5kIHN0YXRpYyBzaXRlIGdlbmVyYXRpb24gZm9yIG9wdGltYWwgcGVyZm9ybWFuY2UuJyxcbiAgICAgIGxpbms6ICcvZG9jcy9zc3Itc3NnJ1xuICAgIH0sXG4gICAge1xuICAgICAgdGl0bGU6ICdTdHlsaW5nJyxcbiAgICAgIGRlc2M6ICdCdWlsdC1pbiBUYWlsd2luZCBDU1Mgc3VwcG9ydCBhbmQgY3VzdG9tIHN0eWxpbmcgb3B0aW9ucy4nLFxuICAgICAgbGluazogJy9kb2NzL3N0eWxpbmcnXG4gICAgfSxcbiAgICB7XG4gICAgICB0aXRsZTogJ0F1dGhlbnRpY2F0aW9uJyxcbiAgICAgIGRlc2M6ICdKV1QsIE9BdXRoLCBhbmQgc2Vzc2lvbi1iYXNlZCBhdXRoZW50aWNhdGlvbiBwYXR0ZXJucy4nLFxuICAgICAgbGluazogJy9kb2NzL2F1dGgnXG4gICAgfSxcbiAgICB7XG4gICAgICB0aXRsZTogJ0RhdGFiYXNlJyxcbiAgICAgIGRlc2M6ICdEYXRhYmFzZSBpbnRlZ3JhdGlvbiB3aXRoIE1vbmdvREIsIFBvc3RncmVTUUwsIGFuZCBtb3JlLicsXG4gICAgICBsaW5rOiAnL2RvY3MvZGF0YWJhc2UnXG4gICAgfSxcbiAgICB7XG4gICAgICB0aXRsZTogJ0RlcGxveW1lbnQnLFxuICAgICAgZGVzYzogJ0RlcGxveSB0byBWZXJjZWwsIE5ldGxpZnksIEFXUywgYW5kIG90aGVyIHBsYXRmb3Jtcy4nLFxuICAgICAgbGluazogJy9kb2NzL2RlcGxveW1lbnQnXG4gICAgfSxcbiAgICB7XG4gICAgICB0aXRsZTogJ1Rlc3RpbmcnLFxuICAgICAgZGVzYzogJ1VuaXQgdGVzdGluZywgaW50ZWdyYXRpb24gdGVzdGluZywgYW5kIEUyRSB0ZXN0aW5nIHNldHVwLicsXG4gICAgICBsaW5rOiAnL2RvY3MvdGVzdGluZydcbiAgICB9XG4gIF07XG5cbiAgcmV0dXJuIChcbiAgICA8bWFpbiBzdHlsZT17dWkucGFnZX0+XG4gICAgICA8ZGl2IHN0eWxlPXt1aS53cmFwfT5cbiAgICAgICAgPHNlY3Rpb24gc3R5bGU9e3VpLmhlcm99PlxuICAgICAgICAgIDxuYXYgc3R5bGU9e3VpLm5hdn0+XG4gICAgICAgICAgICA8YSBocmVmPVwiL1wiIHN0eWxlPXt1aS5iYWNrTGlua30+XHUyMTkwIEJhY2sgdG8gSG9tZTwvYT5cbiAgICAgICAgICA8L25hdj5cbiAgICAgICAgICBcbiAgICAgICAgICA8aDEgc3R5bGU9e3VpLmgxfT5JTkRKUyBEb2N1bWVudGF0aW9uPC9oMT5cbiAgICAgICAgICBcbiAgICAgICAgICA8ZGl2IHN0eWxlPXt1aS5ncmlkfT5cbiAgICAgICAgICAgIHtkb2NzLm1hcCgoZG9jLCBpKSA9PiAoXG4gICAgICAgICAgICAgIDxkaXYga2V5PXtpfSBzdHlsZT17dWkuY2FyZH0+XG4gICAgICAgICAgICAgICAgPGgzIHN0eWxlPXt1aS5jYXJkVGl0bGV9Pntkb2MudGl0bGV9PC9oMz5cbiAgICAgICAgICAgICAgICA8cCBzdHlsZT17dWkuY2FyZERlc2N9Pntkb2MuZGVzY308L3A+XG4gICAgICAgICAgICAgICAgPGEgaHJlZj17ZG9jLmxpbmt9IHN0eWxlPXt1aS5jYXJkTGlua30+UmVhZCBtb3JlIFx1MjE5MjwvYT5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApKX1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9zZWN0aW9uPlxuICAg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
