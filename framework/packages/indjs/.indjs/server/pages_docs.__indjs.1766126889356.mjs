// pages/docs.jsx
import React from "react";
import { jsx, jsxs } from "react/jsx-runtime";
function Docs() {
  const docs = [
    {
      title: "Installation",
      desc: "Get started with INDJS by installing the framework and creating your first app.",
      link: "/docs/installation",
      category: "Getting Started"
    },
    {
      title: "Routing",
      desc: "Master file-based routing, dynamic routes, and advanced navigation patterns.",
      link: "/docs/routing",
      category: "Core Concepts"
    },
    {
      title: "Universal UI",
      desc: "Build components that adapt to Web, iOS, and Android automatically.",
      link: "/docs/universal-ui",
      category: "Core Concepts"
    },
    {
      title: "API Routes",
      desc: "Build serverless API endpoints with built-in validation and database integration.",
      link: "/docs/api-routes",
      category: "Backend"
    },
    {
      title: "Deployment",
      desc: "Deploy to Vercel, Netlify, Play Store, and App Store from one codebase.",
      link: "/docs/deployment",
      category: "Guides"
    }
  ];
  return /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-6 py-24", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row gap-16", children: [
    /* @__PURE__ */ jsx("div", { className: "w-full md:w-64 flex-shrink-0", children: /* @__PURE__ */ jsxs("div", { className: "sticky top-24", children: [
      /* @__PURE__ */ jsx("h3", { className: "font-bold text-white mb-4 uppercase tracking-wider text-xs", children: "Getting Started" }),
      /* @__PURE__ */ jsxs("ul", { className: "space-y-3 mb-8", children: [
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "/docs/installation", className: "text-indigo-400 font-medium", children: "Installation" }) }),
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "/docs/structure", className: "text-zinc-400 hover:text-white transition-colors", children: "Project Structure" }) }),
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "/docs/cli", className: "text-zinc-400 hover:text-white transition-colors", children: "CLI Reference" }) })
      ] }),
      /* @__PURE__ */ jsx("h3", { className: "font-bold text-white mb-4 uppercase tracking-wider text-xs", children: "Core Concepts" }),
      /* @__PURE__ */ jsxs("ul", { className: "space-y-3 mb-8", children: [
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "/docs/routing", className: "text-zinc-400 hover:text-white transition-colors", children: "Routing" }) }),
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "/docs/ssr-ssg", className: "text-zinc-400 hover:text-white transition-colors", children: "SSR & SSG" }) }),
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "/docs/universal-ui", className: "text-zinc-400 hover:text-white transition-colors", children: "Universal UI" }) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-4xl font-extrabold text-white mb-6", children: "Documentation" }),
      /* @__PURE__ */ jsx("p", { className: "text-xl text-zinc-400 mb-12 leading-relaxed max-w-3xl", children: "Welcome to the INDJS documentation. Here you'll find everything you need to build production-ready universal applications." }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: docs.map((doc, i) => /* @__PURE__ */ jsxs(
        "a",
        {
          href: doc.link,
          className: "block p-6 rounded-xl bg-white/5 border border-white/5 hover:border-indigo-500/50 hover:bg-white/10 transition-all group",
          children: [
            /* @__PURE__ */ jsx("div", { className: "text-xs font-bold text-indigo-400 mb-2 uppercase tracking-wide", children: doc.category }),
            /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-white mb-3 group-hover:text-indigo-300 transition-colors", children: doc.title }),
            /* @__PURE__ */ jsx("p", { className: "text-zinc-400 text-sm leading-relaxed", children: doc.desc })
          ]
        },
        i
      )) })
    ] })
  ] }) });
}
export {
  Docs as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcGFnZXMvZG9jcy5qc3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gRG9jcygpIHtcbiAgY29uc3QgZG9jcyA9IFtcbiAgICB7XG4gICAgICB0aXRsZTogXCJJbnN0YWxsYXRpb25cIixcbiAgICAgIGRlc2M6IFwiR2V0IHN0YXJ0ZWQgd2l0aCBJTkRKUyBieSBpbnN0YWxsaW5nIHRoZSBmcmFtZXdvcmsgYW5kIGNyZWF0aW5nIHlvdXIgZmlyc3QgYXBwLlwiLFxuICAgICAgbGluazogXCIvZG9jcy9pbnN0YWxsYXRpb25cIixcbiAgICAgIGNhdGVnb3J5OiBcIkdldHRpbmcgU3RhcnRlZFwiLFxuICAgIH0sXG4gICAge1xuICAgICAgdGl0bGU6IFwiUm91dGluZ1wiLFxuICAgICAgZGVzYzogXCJNYXN0ZXIgZmlsZS1iYXNlZCByb3V0aW5nLCBkeW5hbWljIHJvdXRlcywgYW5kIGFkdmFuY2VkIG5hdmlnYXRpb24gcGF0dGVybnMuXCIsXG4gICAgICBsaW5rOiBcIi9kb2NzL3JvdXRpbmdcIixcbiAgICAgIGNhdGVnb3J5OiBcIkNvcmUgQ29uY2VwdHNcIixcbiAgICB9LFxuICAgIHtcbiAgICAgIHRpdGxlOiBcIlVuaXZlcnNhbCBVSVwiLFxuICAgICAgZGVzYzogXCJCdWlsZCBjb21wb25lbnRzIHRoYXQgYWRhcHQgdG8gV2ViLCBpT1MsIGFuZCBBbmRyb2lkIGF1dG9tYXRpY2FsbHkuXCIsXG4gICAgICBsaW5rOiBcIi9kb2NzL3VuaXZlcnNhbC11aVwiLFxuICAgICAgY2F0ZWdvcnk6IFwiQ29yZSBDb25jZXB0c1wiLFxuICAgIH0sXG4gICAge1xuICAgICAgdGl0bGU6IFwiQVBJIFJvdXRlc1wiLFxuICAgICAgZGVzYzogXCJCdWlsZCBzZXJ2ZXJsZXNzIEFQSSBlbmRwb2ludHMgd2l0aCBidWlsdC1pbiB2YWxpZGF0aW9uIGFuZCBkYXRhYmFzZSBpbnRlZ3JhdGlvbi5cIixcbiAgICAgIGxpbms6IFwiL2RvY3MvYXBpLXJvdXRlc1wiLFxuICAgICAgY2F0ZWdvcnk6IFwiQmFja2VuZFwiLFxuICAgIH0sXG4gICAge1xuICAgICAgdGl0bGU6IFwiRGVwbG95bWVudFwiLFxuICAgICAgZGVzYzogXCJEZXBsb3kgdG8gVmVyY2VsLCBOZXRsaWZ5LCBQbGF5IFN0b3JlLCBhbmQgQXBwIFN0b3JlIGZyb20gb25lIGNvZGViYXNlLlwiLFxuICAgICAgbGluazogXCIvZG9jcy9kZXBsb3ltZW50XCIsXG4gICAgICBjYXRlZ29yeTogXCJHdWlkZXNcIixcbiAgICB9LFxuICBdO1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJtYXgtdy03eGwgbXgtYXV0byBweC02IHB5LTI0XCI+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2wgbWQ6ZmxleC1yb3cgZ2FwLTE2XCI+XG4gICAgICAgIHsvKiBTaWRlYmFyICovfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInctZnVsbCBtZDp3LTY0IGZsZXgtc2hyaW5rLTBcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN0aWNreSB0b3AtMjRcIj5cbiAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9XCJmb250LWJvbGQgdGV4dC13aGl0ZSBtYi00IHVwcGVyY2FzZSB0cmFja2luZy13aWRlciB0ZXh0LXhzXCI+R2V0dGluZyBTdGFydGVkPC9oMz5cbiAgICAgICAgICAgIDx1bCBjbGFzc05hbWU9XCJzcGFjZS15LTMgbWItOFwiPlxuICAgICAgICAgICAgICA8bGk+PGEgaHJlZj1cIi9kb2NzL2luc3RhbGxhdGlvblwiIGNsYXNzTmFtZT1cInRleHQtaW5kaWdvLTQwMCBmb250LW1lZGl1bVwiPkluc3RhbGxhdGlvbjwvYT48L2xpPlxuICAgICAgICAgICAgICA8bGk+PGEgaHJlZj1cIi9kb2NzL3N0cnVjdHVyZVwiIGNsYXNzTmFtZT1cInRleHQtemluYy00MDAgaG92ZXI6dGV4dC13aGl0ZSB0cmFuc2l0aW9uLWNvbG9yc1wiPlByb2plY3QgU3RydWN0dXJlPC9hPjwvbGk+XG4gICAgICAgICAgICAgIDxsaT48YSBocmVmPVwiL2RvY3MvY2xpXCIgY2xhc3NOYW1lPVwidGV4dC16aW5jLTQwMCBob3Zlcjp0ZXh0LXdoaXRlIHRyYW5zaXRpb24tY29sb3JzXCI+Q0xJIFJlZmVyZW5jZTwvYT48L2xpPlxuICAgICAgICAgICAgPC91bD5cblxuICAgICAgICAgICAgPGgzIGNsYXNzTmFtZT1cImZvbnQtYm9sZCB0ZXh0LXdoaXRlIG1iLTQgdXBwZXJjYXNlIHRyYWNraW5nLXdpZGVyIHRleHQteHNcIj5Db3JlIENvbmNlcHRzPC9oMz5cbiAgICAgICAgICAgIDx1bCBjbGFzc05hbWU9XCJzcGFjZS15LTMgbWItOFwiPlxuICAgICAgICAgICAgICA8bGk+PGEgaHJlZj1cIi9kb2NzL3JvdXRpbmdcIiBjbGFzc05hbWU9XCJ0ZXh0LXppbmMtNDAwIGhvdmVyOnRleHQtd2hpdGUgdHJhbnNpdGlvbi1jb2xvcnNcIj5Sb3V0aW5nPC9hPjwvbGk+XG4gICAgICAgICAgICAgIDxsaT48YSBocmVmPVwiL2RvY3Mvc3NyLXNzZ1wiIGNsYXNzTmFtZT1cInRleHQtemluYy00MDAgaG92ZXI6dGV4dC13aGl0ZSB0cmFuc2l0aW9uLWNvbG9yc1wiPlNTUiAmIFNTRzwvYT48L2xpPlxuICAgICAgICAgICAgICA8bGk+PGEgaHJlZj1cIi9kb2NzL3VuaXZlcnNhbC11aVwiIGNsYXNzTmFtZT1cInRleHQtemluYy00MDAgaG92ZXI6dGV4dC13aGl0ZSB0cmFuc2l0aW9uLWNvbG9yc1wiPlVuaXZlcnNhbCBVSTwvYT48L2xpPlxuICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgey8qIENvbnRlbnQgKi99XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleC0xXCI+XG4gICAgICAgICAgPGgxIGNsYXNzTmFtZT1cInRleHQtNHhsIGZvbnQtZXh0cmFib2xkIHRleHQtd2hpdGUgbWItNlwiPkRvY3VtZW50YXRpb248L2gxPlxuICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQteGwgdGV4dC16aW5jLTQwMCBtYi0xMiBsZWFkaW5nLXJlbGF4ZWQgbWF4LXctM3hsXCI+XG4gICAgICAgICAgICBXZWxjb21lIHRvIHRoZSBJTkRKUyBkb2N1bWVudGF0aW9uLiBIZXJlIHlvdSdsbCBmaW5kIGV2ZXJ5dGhpbmcgeW91IG5lZWQgdG8gYnVpbGRcbiAgICAgICAgICAgIHByb2R1Y3Rpb24tcmVhZHkgdW5pdmVyc2FsIGFwcGxpY2F0aW9ucy5cbiAgICAgICAgICA8L3A+XG5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTEgbWQ6Z3JpZC1jb2xzLTIgZ2FwLTZcIj5cbiAgICAgICAgICAgIHtkb2NzLm1hcCgoZG9jLCBpKSA9PiAoXG4gICAgICAgICAgICAgIDxhXG4gICAgICAgICAgICAgICAgaHJlZj17ZG9jLmxpbmt9XG4gICAgICAgICAgICAgICAga2V5PXtpfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImJsb2NrIHAtNiByb3VuZGVkLXhsIGJnLXdoaXRlLzUgYm9yZGVyIGJvcmRlci13aGl0ZS81IGhvdmVyOmJvcmRlci1pbmRpZ28tNTAwLzUwIGhvdmVyOmJnLXdoaXRlLzEwIHRyYW5zaXRpb24tYWxsIGdyb3VwXCJcbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC14cyBmb250LWJvbGQgdGV4dC1pbmRpZ28tNDAwIG1iLTIgdXBwZXJjYXNlIHRyYWNraW5nLXdpZGVcIj57ZG9jLmNhdGVnb3J5fTwvZGl2PlxuICAgICAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9XCJ0ZXh0LXhsIGZvbnQtYm9sZCB0ZXh0LXdoaXRlIG1iLTMgZ3JvdXAtaG92ZXI6dGV4dC1pbmRpZ28tMzAwIHRyYW5zaXRpb24tY29sb3JzXCI+e2RvYy50aXRsZX08L2gzPlxuICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtemluYy00MDAgdGV4dC1zbSBsZWFkaW5nLXJlbGF4ZWRcIj57ZG9jLmRlc2N9PC9wPlxuICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICApKX1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKTtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBQSxPQUFPLFdBQVc7QUEwQ04sY0FDQSxZQURBO0FBeENHLFNBQVIsT0FBd0I7QUFDN0IsUUFBTSxPQUFPO0FBQUEsSUFDWDtBQUFBLE1BQ0UsT0FBTztBQUFBLE1BQ1AsTUFBTTtBQUFBLE1BQ04sTUFBTTtBQUFBLE1BQ04sVUFBVTtBQUFBLElBQ1o7QUFBQSxJQUNBO0FBQUEsTUFDRSxPQUFPO0FBQUEsTUFDUCxNQUFNO0FBQUEsTUFDTixNQUFNO0FBQUEsTUFDTixVQUFVO0FBQUEsSUFDWjtBQUFBLElBQ0E7QUFBQSxNQUNFLE9BQU87QUFBQSxNQUNQLE1BQU07QUFBQSxNQUNOLE1BQU07QUFBQSxNQUNOLFVBQVU7QUFBQSxJQUNaO0FBQUEsSUFDQTtBQUFBLE1BQ0UsT0FBTztBQUFBLE1BQ1AsTUFBTTtBQUFBLE1BQ04sTUFBTTtBQUFBLE1BQ04sVUFBVTtBQUFBLElBQ1o7QUFBQSxJQUNBO0FBQUEsTUFDRSxPQUFPO0FBQUEsTUFDUCxNQUFNO0FBQUEsTUFDTixNQUFNO0FBQUEsTUFDTixVQUFVO0FBQUEsSUFDWjtBQUFBLEVBQ0Y7QUFFQSxTQUNFLG9CQUFDLFNBQUksV0FBVSxnQ0FDYiwrQkFBQyxTQUFJLFdBQVUsb0NBRWI7QUFBQSx3QkFBQyxTQUFJLFdBQVUsZ0NBQ2IsK0JBQUMsU0FBSSxXQUFVLGlCQUNiO0FBQUEsMEJBQUMsUUFBRyxXQUFVLDhEQUE2RCw2QkFBZTtBQUFBLE1BQzFGLHFCQUFDLFFBQUcsV0FBVSxrQkFDWjtBQUFBLDRCQUFDLFFBQUcsOEJBQUMsT0FBRSxNQUFLLHNCQUFxQixXQUFVLCtCQUE4QiwwQkFBWSxHQUFJO0FBQUEsUUFDekYsb0JBQUMsUUFBRyw4QkFBQyxPQUFFLE1BQUssbUJBQWtCLFdBQVUsb0RBQW1ELCtCQUFpQixHQUFJO0FBQUEsUUFDaEgsb0JBQUMsUUFBRyw4QkFBQyxPQUFFLE1BQUssYUFBWSxXQUFVLG9EQUFtRCwyQkFBYSxHQUFJO0FBQUEsU0FDeEc7QUFBQSxNQUVBLG9CQUFDLFFBQUcsV0FBVSw4REFBNkQsMkJBQWE7QUFBQSxNQUN4RixxQkFBQyxRQUFHLFdBQVUsa0JBQ1o7QUFBQSw0QkFBQyxRQUFHLDhCQUFDLE9BQUUsTUFBSyxpQkFBZ0IsV0FBVSxvREFBbUQscUJBQU8sR0FBSTtBQUFBLFFBQ3BHLG9CQUFDLFFBQUcsOEJBQUMsT0FBRSxNQUFLLGlCQUFnQixXQUFVLG9EQUFtRCx1QkFBUyxHQUFJO0FBQUEsUUFDdEcsb0JBQUMsUUFBRyw4QkFBQyxPQUFFLE1BQUssc0JBQXFCLFdBQVUsb0RBQW1ELDBCQUFZLEdBQUk7QUFBQSxTQUNoSDtBQUFBLE9BQ0YsR0FDRjtBQUFBLElBR0EscUJBQUMsU0FBSSxXQUFVLFVBQ2I7QUFBQSwwQkFBQyxRQUFHLFdBQVUsMkNBQTBDLDJCQUFhO0FBQUEsTUFDckUsb0JBQUMsT0FBRSxXQUFVLHlEQUF3RCx3SUFHckU7QUFBQSxNQUVBLG9CQUFDLFNBQUksV0FBVSx5Q0FDWixlQUFLLElBQUksQ0FBQyxLQUFLLE1BQ2Q7QUFBQSxRQUFDO0FBQUE7QUFBQSxVQUNDLE1BQU0sSUFBSTtBQUFBLFVBRVYsV0FBVTtBQUFBLFVBRVY7QUFBQSxnQ0FBQyxTQUFJLFdBQVUsa0VBQWtFLGNBQUksVUFBUztBQUFBLFlBQzlGLG9CQUFDLFFBQUcsV0FBVSxtRkFBbUYsY0FBSSxPQUFNO0FBQUEsWUFDM0csb0JBQUMsT0FBRSxXQUFVLHlDQUF5QyxjQUFJLE1BQUs7QUFBQTtBQUFBO0FBQUEsUUFMMUQ7QUFBQSxNQU1QLENBQ0QsR0FDSDtBQUFBLE9BQ0Y7QUFBQSxLQUNGLEdBQ0Y7QUFFSjsiLAogICJuYW1lcyI6IFtdCn0K
