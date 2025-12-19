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
      /* @__PURE__ */ jsx("h3", { className: "font-bold text-slate-900 dark:text-white mb-4 uppercase tracking-wider text-xs", children: "Getting Started" }),
      /* @__PURE__ */ jsxs("ul", { className: "space-y-3 mb-8", children: [
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "/docs/installation", className: "text-indigo-600 dark:text-indigo-400 font-medium hover:underline", children: "Installation" }) }),
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "/docs/structure", className: "text-slate-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-white transition-colors", children: "Project Structure" }) }),
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "/docs/cli", className: "text-slate-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-white transition-colors", children: "CLI Reference" }) })
      ] }),
      /* @__PURE__ */ jsx("h3", { className: "font-bold text-slate-900 dark:text-white mb-4 uppercase tracking-wider text-xs", children: "Core Concepts" }),
      /* @__PURE__ */ jsxs("ul", { className: "space-y-3 mb-8", children: [
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "/docs/routing", className: "text-slate-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-white transition-colors", children: "Routing" }) }),
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "/docs/ssr-ssg", className: "text-slate-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-white transition-colors", children: "SSR & SSG" }) }),
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "/docs/universal-ui", className: "text-slate-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-white transition-colors", children: "Universal UI" }) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-4xl font-extrabold text-slate-900 dark:text-white mb-6", children: "Documentation" }),
      /* @__PURE__ */ jsx("p", { className: "text-xl text-slate-600 dark:text-zinc-400 mb-12 leading-relaxed max-w-3xl", children: "Welcome to the INDJS documentation. Here you'll find everything you need to build production-ready universal applications." }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: docs.map((doc, i) => /* @__PURE__ */ jsxs(
        "a",
        {
          href: doc.link,
          className: "block p-6 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 hover:border-indigo-500/50 hover:bg-slate-50 dark:hover:bg-white/10 transition-all group shadow-sm dark:shadow-none",
          children: [
            /* @__PURE__ */ jsx("div", { className: "text-xs font-bold text-indigo-600 dark:text-indigo-400 mb-2 uppercase tracking-wide", children: doc.category }),
            /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors", children: doc.title }),
            /* @__PURE__ */ jsx("p", { className: "text-slate-600 dark:text-zinc-400 text-sm leading-relaxed", children: doc.desc })
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcGFnZXMvZG9jcy5qc3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gRG9jcygpIHtcbiAgY29uc3QgZG9jcyA9IFtcbiAgICB7XG4gICAgICB0aXRsZTogXCJJbnN0YWxsYXRpb25cIixcbiAgICAgIGRlc2M6IFwiR2V0IHN0YXJ0ZWQgd2l0aCBJTkRKUyBieSBpbnN0YWxsaW5nIHRoZSBmcmFtZXdvcmsgYW5kIGNyZWF0aW5nIHlvdXIgZmlyc3QgYXBwLlwiLFxuICAgICAgbGluazogXCIvZG9jcy9pbnN0YWxsYXRpb25cIixcbiAgICAgIGNhdGVnb3J5OiBcIkdldHRpbmcgU3RhcnRlZFwiLFxuICAgIH0sXG4gICAge1xuICAgICAgdGl0bGU6IFwiUm91dGluZ1wiLFxuICAgICAgZGVzYzogXCJNYXN0ZXIgZmlsZS1iYXNlZCByb3V0aW5nLCBkeW5hbWljIHJvdXRlcywgYW5kIGFkdmFuY2VkIG5hdmlnYXRpb24gcGF0dGVybnMuXCIsXG4gICAgICBsaW5rOiBcIi9kb2NzL3JvdXRpbmdcIixcbiAgICAgIGNhdGVnb3J5OiBcIkNvcmUgQ29uY2VwdHNcIixcbiAgICB9LFxuICAgIHtcbiAgICAgIHRpdGxlOiBcIlVuaXZlcnNhbCBVSVwiLFxuICAgICAgZGVzYzogXCJCdWlsZCBjb21wb25lbnRzIHRoYXQgYWRhcHQgdG8gV2ViLCBpT1MsIGFuZCBBbmRyb2lkIGF1dG9tYXRpY2FsbHkuXCIsXG4gICAgICBsaW5rOiBcIi9kb2NzL3VuaXZlcnNhbC11aVwiLFxuICAgICAgY2F0ZWdvcnk6IFwiQ29yZSBDb25jZXB0c1wiLFxuICAgIH0sXG4gICAge1xuICAgICAgdGl0bGU6IFwiQVBJIFJvdXRlc1wiLFxuICAgICAgZGVzYzogXCJCdWlsZCBzZXJ2ZXJsZXNzIEFQSSBlbmRwb2ludHMgd2l0aCBidWlsdC1pbiB2YWxpZGF0aW9uIGFuZCBkYXRhYmFzZSBpbnRlZ3JhdGlvbi5cIixcbiAgICAgIGxpbms6IFwiL2RvY3MvYXBpLXJvdXRlc1wiLFxuICAgICAgY2F0ZWdvcnk6IFwiQmFja2VuZFwiLFxuICAgIH0sXG4gICAge1xuICAgICAgdGl0bGU6IFwiRGVwbG95bWVudFwiLFxuICAgICAgZGVzYzogXCJEZXBsb3kgdG8gVmVyY2VsLCBOZXRsaWZ5LCBQbGF5IFN0b3JlLCBhbmQgQXBwIFN0b3JlIGZyb20gb25lIGNvZGViYXNlLlwiLFxuICAgICAgbGluazogXCIvZG9jcy9kZXBsb3ltZW50XCIsXG4gICAgICBjYXRlZ29yeTogXCJHdWlkZXNcIixcbiAgICB9LFxuICBdO1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJtYXgtdy03eGwgbXgtYXV0byBweC02IHB5LTI0XCI+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2wgbWQ6ZmxleC1yb3cgZ2FwLTE2XCI+XG4gICAgICAgIHsvKiBTaWRlYmFyICovfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInctZnVsbCBtZDp3LTY0IGZsZXgtc2hyaW5rLTBcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN0aWNreSB0b3AtMjRcIj5cbiAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9XCJmb250LWJvbGQgdGV4dC1zbGF0ZS05MDAgZGFyazp0ZXh0LXdoaXRlIG1iLTQgdXBwZXJjYXNlIHRyYWNraW5nLXdpZGVyIHRleHQteHNcIj5HZXR0aW5nIFN0YXJ0ZWQ8L2gzPlxuICAgICAgICAgICAgPHVsIGNsYXNzTmFtZT1cInNwYWNlLXktMyBtYi04XCI+XG4gICAgICAgICAgICAgIDxsaT48YSBocmVmPVwiL2RvY3MvaW5zdGFsbGF0aW9uXCIgY2xhc3NOYW1lPVwidGV4dC1pbmRpZ28tNjAwIGRhcms6dGV4dC1pbmRpZ28tNDAwIGZvbnQtbWVkaXVtIGhvdmVyOnVuZGVybGluZVwiPkluc3RhbGxhdGlvbjwvYT48L2xpPlxuICAgICAgICAgICAgICA8bGk+PGEgaHJlZj1cIi9kb2NzL3N0cnVjdHVyZVwiIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtNjAwIGRhcms6dGV4dC16aW5jLTQwMCBob3Zlcjp0ZXh0LWluZGlnby02MDAgZGFyazpob3Zlcjp0ZXh0LXdoaXRlIHRyYW5zaXRpb24tY29sb3JzXCI+UHJvamVjdCBTdHJ1Y3R1cmU8L2E+PC9saT5cbiAgICAgICAgICAgICAgPGxpPjxhIGhyZWY9XCIvZG9jcy9jbGlcIiBjbGFzc05hbWU9XCJ0ZXh0LXNsYXRlLTYwMCBkYXJrOnRleHQtemluYy00MDAgaG92ZXI6dGV4dC1pbmRpZ28tNjAwIGRhcms6aG92ZXI6dGV4dC13aGl0ZSB0cmFuc2l0aW9uLWNvbG9yc1wiPkNMSSBSZWZlcmVuY2U8L2E+PC9saT5cbiAgICAgICAgICAgIDwvdWw+XG5cbiAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9XCJmb250LWJvbGQgdGV4dC1zbGF0ZS05MDAgZGFyazp0ZXh0LXdoaXRlIG1iLTQgdXBwZXJjYXNlIHRyYWNraW5nLXdpZGVyIHRleHQteHNcIj5Db3JlIENvbmNlcHRzPC9oMz5cbiAgICAgICAgICAgIDx1bCBjbGFzc05hbWU9XCJzcGFjZS15LTMgbWItOFwiPlxuICAgICAgICAgICAgICA8bGk+PGEgaHJlZj1cIi9kb2NzL3JvdXRpbmdcIiBjbGFzc05hbWU9XCJ0ZXh0LXNsYXRlLTYwMCBkYXJrOnRleHQtemluYy00MDAgaG92ZXI6dGV4dC1pbmRpZ28tNjAwIGRhcms6aG92ZXI6dGV4dC13aGl0ZSB0cmFuc2l0aW9uLWNvbG9yc1wiPlJvdXRpbmc8L2E+PC9saT5cbiAgICAgICAgICAgICAgPGxpPjxhIGhyZWY9XCIvZG9jcy9zc3Itc3NnXCIgY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS02MDAgZGFyazp0ZXh0LXppbmMtNDAwIGhvdmVyOnRleHQtaW5kaWdvLTYwMCBkYXJrOmhvdmVyOnRleHQtd2hpdGUgdHJhbnNpdGlvbi1jb2xvcnNcIj5TU1IgJiBTU0c8L2E+PC9saT5cbiAgICAgICAgICAgICAgPGxpPjxhIGhyZWY9XCIvZG9jcy91bml2ZXJzYWwtdWlcIiBjbGFzc05hbWU9XCJ0ZXh0LXNsYXRlLTYwMCBkYXJrOnRleHQtemluYy00MDAgaG92ZXI6dGV4dC1pbmRpZ28tNjAwIGRhcms6aG92ZXI6dGV4dC13aGl0ZSB0cmFuc2l0aW9uLWNvbG9yc1wiPlVuaXZlcnNhbCBVSTwvYT48L2xpPlxuICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgey8qIENvbnRlbnQgKi99XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleC0xXCI+XG4gICAgICAgICAgPGgxIGNsYXNzTmFtZT1cInRleHQtNHhsIGZvbnQtZXh0cmFib2xkIHRleHQtc2xhdGUtOTAwIGRhcms6dGV4dC13aGl0ZSBtYi02XCI+RG9jdW1lbnRhdGlvbjwvaDE+XG4gICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC14bCB0ZXh0LXNsYXRlLTYwMCBkYXJrOnRleHQtemluYy00MDAgbWItMTIgbGVhZGluZy1yZWxheGVkIG1heC13LTN4bFwiPlxuICAgICAgICAgICAgV2VsY29tZSB0byB0aGUgSU5ESlMgZG9jdW1lbnRhdGlvbi4gSGVyZSB5b3UnbGwgZmluZCBldmVyeXRoaW5nIHlvdSBuZWVkIHRvIGJ1aWxkXG4gICAgICAgICAgICBwcm9kdWN0aW9uLXJlYWR5IHVuaXZlcnNhbCBhcHBsaWNhdGlvbnMuXG4gICAgICAgICAgPC9wPlxuXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0xIG1kOmdyaWQtY29scy0yIGdhcC02XCI+XG4gICAgICAgICAgICB7ZG9jcy5tYXAoKGRvYywgaSkgPT4gKFxuICAgICAgICAgICAgICA8YVxuICAgICAgICAgICAgICAgIGhyZWY9e2RvYy5saW5rfVxuICAgICAgICAgICAgICAgIGtleT17aX1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJibG9jayBwLTYgcm91bmRlZC14bCBiZy13aGl0ZSBkYXJrOmJnLXdoaXRlLzUgYm9yZGVyIGJvcmRlci1zbGF0ZS0yMDAgZGFyazpib3JkZXItd2hpdGUvNSBob3Zlcjpib3JkZXItaW5kaWdvLTUwMC81MCBob3ZlcjpiZy1zbGF0ZS01MCBkYXJrOmhvdmVyOmJnLXdoaXRlLzEwIHRyYW5zaXRpb24tYWxsIGdyb3VwIHNoYWRvdy1zbSBkYXJrOnNoYWRvdy1ub25lXCJcbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC14cyBmb250LWJvbGQgdGV4dC1pbmRpZ28tNjAwIGRhcms6dGV4dC1pbmRpZ28tNDAwIG1iLTIgdXBwZXJjYXNlIHRyYWNraW5nLXdpZGVcIj57ZG9jLmNhdGVnb3J5fTwvZGl2PlxuICAgICAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9XCJ0ZXh0LXhsIGZvbnQtYm9sZCB0ZXh0LXNsYXRlLTkwMCBkYXJrOnRleHQtd2hpdGUgbWItMyBncm91cC1ob3Zlcjp0ZXh0LWluZGlnby02MDAgZGFyazpncm91cC1ob3Zlcjp0ZXh0LWluZGlnby0zMDAgdHJhbnNpdGlvbi1jb2xvcnNcIj57ZG9jLnRpdGxlfTwvaDM+XG4gICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS02MDAgZGFyazp0ZXh0LXppbmMtNDAwIHRleHQtc20gbGVhZGluZy1yZWxheGVkXCI+e2RvYy5kZXNjfTwvcD5cbiAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgKSl9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICk7XG59XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQUEsT0FBTyxXQUFXO0FBMENOLGNBQ0EsWUFEQTtBQXhDRyxTQUFSLE9BQXdCO0FBQzdCLFFBQU0sT0FBTztBQUFBLElBQ1g7QUFBQSxNQUNFLE9BQU87QUFBQSxNQUNQLE1BQU07QUFBQSxNQUNOLE1BQU07QUFBQSxNQUNOLFVBQVU7QUFBQSxJQUNaO0FBQUEsSUFDQTtBQUFBLE1BQ0UsT0FBTztBQUFBLE1BQ1AsTUFBTTtBQUFBLE1BQ04sTUFBTTtBQUFBLE1BQ04sVUFBVTtBQUFBLElBQ1o7QUFBQSxJQUNBO0FBQUEsTUFDRSxPQUFPO0FBQUEsTUFDUCxNQUFNO0FBQUEsTUFDTixNQUFNO0FBQUEsTUFDTixVQUFVO0FBQUEsSUFDWjtBQUFBLElBQ0E7QUFBQSxNQUNFLE9BQU87QUFBQSxNQUNQLE1BQU07QUFBQSxNQUNOLE1BQU07QUFBQSxNQUNOLFVBQVU7QUFBQSxJQUNaO0FBQUEsSUFDQTtBQUFBLE1BQ0UsT0FBTztBQUFBLE1BQ1AsTUFBTTtBQUFBLE1BQ04sTUFBTTtBQUFBLE1BQ04sVUFBVTtBQUFBLElBQ1o7QUFBQSxFQUNGO0FBRUEsU0FDRSxvQkFBQyxTQUFJLFdBQVUsZ0NBQ2IsK0JBQUMsU0FBSSxXQUFVLG9DQUViO0FBQUEsd0JBQUMsU0FBSSxXQUFVLGdDQUNiLCtCQUFDLFNBQUksV0FBVSxpQkFDYjtBQUFBLDBCQUFDLFFBQUcsV0FBVSxrRkFBaUYsNkJBQWU7QUFBQSxNQUM5RyxxQkFBQyxRQUFHLFdBQVUsa0JBQ1o7QUFBQSw0QkFBQyxRQUFHLDhCQUFDLE9BQUUsTUFBSyxzQkFBcUIsV0FBVSxvRUFBbUUsMEJBQVksR0FBSTtBQUFBLFFBQzlILG9CQUFDLFFBQUcsOEJBQUMsT0FBRSxNQUFLLG1CQUFrQixXQUFVLG1HQUFrRywrQkFBaUIsR0FBSTtBQUFBLFFBQy9KLG9CQUFDLFFBQUcsOEJBQUMsT0FBRSxNQUFLLGFBQVksV0FBVSxtR0FBa0csMkJBQWEsR0FBSTtBQUFBLFNBQ3ZKO0FBQUEsTUFFQSxvQkFBQyxRQUFHLFdBQVUsa0ZBQWlGLDJCQUFhO0FBQUEsTUFDNUcscUJBQUMsUUFBRyxXQUFVLGtCQUNaO0FBQUEsNEJBQUMsUUFBRyw4QkFBQyxPQUFFLE1BQUssaUJBQWdCLFdBQVUsbUdBQWtHLHFCQUFPLEdBQUk7QUFBQSxRQUNuSixvQkFBQyxRQUFHLDhCQUFDLE9BQUUsTUFBSyxpQkFBZ0IsV0FBVSxtR0FBa0csdUJBQVMsR0FBSTtBQUFBLFFBQ3JKLG9CQUFDLFFBQUcsOEJBQUMsT0FBRSxNQUFLLHNCQUFxQixXQUFVLG1HQUFrRywwQkFBWSxHQUFJO0FBQUEsU0FDL0o7QUFBQSxPQUNGLEdBQ0Y7QUFBQSxJQUdBLHFCQUFDLFNBQUksV0FBVSxVQUNiO0FBQUEsMEJBQUMsUUFBRyxXQUFVLCtEQUE4RCwyQkFBYTtBQUFBLE1BQ3pGLG9CQUFDLE9BQUUsV0FBVSw2RUFBNEUsd0lBR3pGO0FBQUEsTUFFQSxvQkFBQyxTQUFJLFdBQVUseUNBQ1osZUFBSyxJQUFJLENBQUMsS0FBSyxNQUNkO0FBQUEsUUFBQztBQUFBO0FBQUEsVUFDQyxNQUFNLElBQUk7QUFBQSxVQUVWLFdBQVU7QUFBQSxVQUVWO0FBQUEsZ0NBQUMsU0FBSSxXQUFVLHVGQUF1RixjQUFJLFVBQVM7QUFBQSxZQUNuSCxvQkFBQyxRQUFHLFdBQVUsd0lBQXdJLGNBQUksT0FBTTtBQUFBLFlBQ2hLLG9CQUFDLE9BQUUsV0FBVSw2REFBNkQsY0FBSSxNQUFLO0FBQUE7QUFBQTtBQUFBLFFBTDlFO0FBQUEsTUFNUCxDQUNELEdBQ0g7QUFBQSxPQUNGO0FBQUEsS0FDRixHQUNGO0FBRUo7IiwKICAibmFtZXMiOiBbXQp9Cg==
