// pages/docs/routing.jsx
import React from "react";
import { jsx, jsxs } from "react/jsx-runtime";
function Routing() {
  return /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto px-6 py-24 text-slate-600 dark:text-zinc-300", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-12", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-4xl font-bold text-slate-900 dark:text-white mb-4", children: "Routing" }),
      /* @__PURE__ */ jsx("p", { className: "text-xl text-slate-600 dark:text-zinc-400", children: "File-system based routing for universal apps." })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "prose prose-invert max-w-none", children: [
      /* @__PURE__ */ jsxs("section", { className: "mb-12", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-slate-900 dark:text-white mb-4", children: "How it works" }),
        /* @__PURE__ */ jsxs("p", { className: "mb-4", children: [
          "INDJS uses the ",
          /* @__PURE__ */ jsx("code", { className: "text-indigo-600 dark:text-indigo-400", children: "pages/" }),
          " directory to define routes. The file structure maps directly to URL paths."
        ] }),
        /* @__PURE__ */ jsx("div", { className: "bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl overflow-hidden mb-8 shadow-sm", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-left text-sm", children: [
          /* @__PURE__ */ jsx("thead", { className: "bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white font-bold", children: /* @__PURE__ */ jsxs("tr", { children: [
            /* @__PURE__ */ jsx("th", { className: "p-4", children: "File Path" }),
            /* @__PURE__ */ jsx("th", { className: "p-4", children: "URL Path" })
          ] }) }),
          /* @__PURE__ */ jsxs("tbody", { className: "divide-y divide-slate-200 dark:divide-white/5", children: [
            /* @__PURE__ */ jsxs("tr", { children: [
              /* @__PURE__ */ jsx("td", { className: "p-4 font-mono text-indigo-600 dark:text-indigo-300", children: "pages/index.jsx" }),
              /* @__PURE__ */ jsx("td", { className: "p-4 text-slate-700 dark:text-white", children: "/" })
            ] }),
            /* @__PURE__ */ jsxs("tr", { children: [
              /* @__PURE__ */ jsx("td", { className: "p-4 font-mono text-indigo-600 dark:text-indigo-300", children: "pages/about.jsx" }),
              /* @__PURE__ */ jsx("td", { className: "p-4 text-slate-700 dark:text-white", children: "/about" })
            ] }),
            /* @__PURE__ */ jsxs("tr", { children: [
              /* @__PURE__ */ jsx("td", { className: "p-4 font-mono text-indigo-600 dark:text-indigo-300", children: "pages/blog/first.jsx" }),
              /* @__PURE__ */ jsx("td", { className: "p-4 text-slate-700 dark:text-white", children: "/blog/first" })
            ] })
          ] })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "mb-12", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-slate-900 dark:text-white mb-4", children: "Dynamic Routes" }),
        /* @__PURE__ */ jsx("p", { className: "mb-4", children: "Use square brackets to create dynamic route segments." }),
        /* @__PURE__ */ jsx("div", { className: "bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl overflow-hidden mb-6 shadow-sm", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-left text-sm", children: [
          /* @__PURE__ */ jsx("thead", { className: "bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white font-bold", children: /* @__PURE__ */ jsxs("tr", { children: [
            /* @__PURE__ */ jsx("th", { className: "p-4", children: "File Path" }),
            /* @__PURE__ */ jsx("th", { className: "p-4", children: "URL Path" }),
            /* @__PURE__ */ jsx("th", { className: "p-4", children: "Params" })
          ] }) }),
          /* @__PURE__ */ jsxs("tbody", { className: "divide-y divide-slate-200 dark:divide-white/5", children: [
            /* @__PURE__ */ jsxs("tr", { children: [
              /* @__PURE__ */ jsx("td", { className: "p-4 font-mono text-indigo-600 dark:text-indigo-300", children: "pages/blog/[slug].jsx" }),
              /* @__PURE__ */ jsx("td", { className: "p-4 text-slate-700 dark:text-white", children: "/blog/hello-world" }),
              /* @__PURE__ */ jsx("td", { className: "p-4 font-mono text-slate-600 dark:text-zinc-400", children: `{ slug: "hello-world" }` })
            ] }),
            /* @__PURE__ */ jsxs("tr", { children: [
              /* @__PURE__ */ jsx("td", { className: "p-4 font-mono text-indigo-600 dark:text-indigo-300", children: "pages/shop/[cat]/[id].jsx" }),
              /* @__PURE__ */ jsx("td", { className: "p-4 text-slate-700 dark:text-white", children: "/shop/shoes/123" }),
              /* @__PURE__ */ jsx("td", { className: "p-4 font-mono text-slate-600 dark:text-zinc-400", children: `{ cat: "shoes", id: "123" }` })
            ] })
          ] })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "mb-12", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-slate-900 dark:text-white mb-4", children: "Layouts" }),
        /* @__PURE__ */ jsxs("p", { className: "mb-4", children: [
          "Create a ",
          /* @__PURE__ */ jsx("code", { className: "text-indigo-600 dark:text-indigo-400", children: "_layout.jsx" }),
          " file to wrap all pages in that directory. This is perfect for persistent navigation, headers, and footers."
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-slate-900 dark:bg-black/50 border border-slate-200 dark:border-white/10 rounded-xl p-4 font-mono text-sm overflow-x-auto shadow-sm", children: [
          /* @__PURE__ */ jsxs("div", { className: "text-purple-400", children: [
            "export default ",
            /* @__PURE__ */ jsx("span", { className: "text-blue-400", children: "function" }),
            " ",
            /* @__PURE__ */ jsx("span", { className: "text-yellow-300", children: "Layout" }),
            "(",
            `{ children }`,
            ") ",
            `{`
          ] }),
          /* @__PURE__ */ jsx("div", { className: "pl-4 text-purple-400", children: "return (" }),
          /* @__PURE__ */ jsx("div", { className: "pl-8 text-white", children: /* @__PURE__ */ jsx("span", { className: "text-blue-400", children: "<div>" }) }),
          /* @__PURE__ */ jsx("div", { className: "pl-12 text-white", children: /* @__PURE__ */ jsx("span", { className: "text-blue-400", children: "<Navbar />" }) }),
          /* @__PURE__ */ jsx("div", { className: "pl-12 text-white", children: `{children}` }),
          /* @__PURE__ */ jsx("div", { className: "pl-12 text-white", children: /* @__PURE__ */ jsx("span", { className: "text-blue-400", children: "<Footer />" }) }),
          /* @__PURE__ */ jsx("div", { className: "pl-8 text-white", children: /* @__PURE__ */ jsx("span", { className: "text-blue-400", children: "</div>" }) }),
          /* @__PURE__ */ jsx("div", { className: "pl-4 text-purple-400", children: ");" }),
          /* @__PURE__ */ jsx("div", { className: "text-white" })
        ] })
      ] })
    ] })
  ] });
}
export {
  Routing as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcGFnZXMvZG9jcy9yb3V0aW5nLmpzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBSb3V0aW5nKCkge1xuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwibWF4LXctNHhsIG14LWF1dG8gcHgtNiBweS0yNCB0ZXh0LXNsYXRlLTYwMCBkYXJrOnRleHQtemluYy0zMDBcIj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWItMTJcIj5cbiAgICAgICAgPGgxIGNsYXNzTmFtZT1cInRleHQtNHhsIGZvbnQtYm9sZCB0ZXh0LXNsYXRlLTkwMCBkYXJrOnRleHQtd2hpdGUgbWItNFwiPlJvdXRpbmc8L2gxPlxuICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXhsIHRleHQtc2xhdGUtNjAwIGRhcms6dGV4dC16aW5jLTQwMFwiPkZpbGUtc3lzdGVtIGJhc2VkIHJvdXRpbmcgZm9yIHVuaXZlcnNhbCBhcHBzLjwvcD5cbiAgICAgIDwvZGl2PlxuXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInByb3NlIHByb3NlLWludmVydCBtYXgtdy1ub25lXCI+XG4gICAgICAgIDxzZWN0aW9uIGNsYXNzTmFtZT1cIm1iLTEyXCI+XG4gICAgICAgICAgPGgyIGNsYXNzTmFtZT1cInRleHQtMnhsIGZvbnQtYm9sZCB0ZXh0LXNsYXRlLTkwMCBkYXJrOnRleHQtd2hpdGUgbWItNFwiPkhvdyBpdCB3b3JrczwvaDI+XG4gICAgICAgICAgPHAgY2xhc3NOYW1lPVwibWItNFwiPlxuICAgICAgICAgICAgSU5ESlMgdXNlcyB0aGUgPGNvZGUgY2xhc3NOYW1lPVwidGV4dC1pbmRpZ28tNjAwIGRhcms6dGV4dC1pbmRpZ28tNDAwXCI+cGFnZXMvPC9jb2RlPiBkaXJlY3RvcnkgdG8gZGVmaW5lIHJvdXRlcy5cbiAgICAgICAgICAgIFRoZSBmaWxlIHN0cnVjdHVyZSBtYXBzIGRpcmVjdGx5IHRvIFVSTCBwYXRocy5cbiAgICAgICAgICA8L3A+XG5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLXdoaXRlIGRhcms6Ymctd2hpdGUvNSBib3JkZXIgYm9yZGVyLXNsYXRlLTIwMCBkYXJrOmJvcmRlci13aGl0ZS8xMCByb3VuZGVkLXhsIG92ZXJmbG93LWhpZGRlbiBtYi04IHNoYWRvdy1zbVwiPlxuICAgICAgICAgICAgPHRhYmxlIGNsYXNzTmFtZT1cInctZnVsbCB0ZXh0LWxlZnQgdGV4dC1zbVwiPlxuICAgICAgICAgICAgICA8dGhlYWQgY2xhc3NOYW1lPVwiYmctc2xhdGUtNTAgZGFyazpiZy13aGl0ZS81IHRleHQtc2xhdGUtOTAwIGRhcms6dGV4dC13aGl0ZSBmb250LWJvbGRcIj5cbiAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICA8dGggY2xhc3NOYW1lPVwicC00XCI+RmlsZSBQYXRoPC90aD5cbiAgICAgICAgICAgICAgICAgIDx0aCBjbGFzc05hbWU9XCJwLTRcIj5VUkwgUGF0aDwvdGg+XG4gICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgPC90aGVhZD5cbiAgICAgICAgICAgICAgPHRib2R5IGNsYXNzTmFtZT1cImRpdmlkZS15IGRpdmlkZS1zbGF0ZS0yMDAgZGFyazpkaXZpZGUtd2hpdGUvNVwiPlxuICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJwLTQgZm9udC1tb25vIHRleHQtaW5kaWdvLTYwMCBkYXJrOnRleHQtaW5kaWdvLTMwMFwiPnBhZ2VzL2luZGV4LmpzeDwvdGQ+XG4gICAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwicC00IHRleHQtc2xhdGUtNzAwIGRhcms6dGV4dC13aGl0ZVwiPi88L3RkPlxuICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInAtNCBmb250LW1vbm8gdGV4dC1pbmRpZ28tNjAwIGRhcms6dGV4dC1pbmRpZ28tMzAwXCI+cGFnZXMvYWJvdXQuanN4PC90ZD5cbiAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJwLTQgdGV4dC1zbGF0ZS03MDAgZGFyazp0ZXh0LXdoaXRlXCI+L2Fib3V0PC90ZD5cbiAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJwLTQgZm9udC1tb25vIHRleHQtaW5kaWdvLTYwMCBkYXJrOnRleHQtaW5kaWdvLTMwMFwiPnBhZ2VzL2Jsb2cvZmlyc3QuanN4PC90ZD5cbiAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJwLTQgdGV4dC1zbGF0ZS03MDAgZGFyazp0ZXh0LXdoaXRlXCI+L2Jsb2cvZmlyc3Q8L3RkPlxuICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgIDwvdGJvZHk+XG4gICAgICAgICAgICA8L3RhYmxlPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L3NlY3Rpb24+XG5cbiAgICAgICAgPHNlY3Rpb24gY2xhc3NOYW1lPVwibWItMTJcIj5cbiAgICAgICAgICA8aDIgY2xhc3NOYW1lPVwidGV4dC0yeGwgZm9udC1ib2xkIHRleHQtc2xhdGUtOTAwIGRhcms6dGV4dC13aGl0ZSBtYi00XCI+RHluYW1pYyBSb3V0ZXM8L2gyPlxuICAgICAgICAgIDxwIGNsYXNzTmFtZT1cIm1iLTRcIj5cbiAgICAgICAgICAgIFVzZSBzcXVhcmUgYnJhY2tldHMgdG8gY3JlYXRlIGR5bmFtaWMgcm91dGUgc2VnbWVudHMuXG4gICAgICAgICAgPC9wPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctd2hpdGUgZGFyazpiZy13aGl0ZS81IGJvcmRlciBib3JkZXItc2xhdGUtMjAwIGRhcms6Ym9yZGVyLXdoaXRlLzEwIHJvdW5kZWQteGwgb3ZlcmZsb3ctaGlkZGVuIG1iLTYgc2hhZG93LXNtXCI+XG4gICAgICAgICAgICA8dGFibGUgY2xhc3NOYW1lPVwidy1mdWxsIHRleHQtbGVmdCB0ZXh0LXNtXCI+XG4gICAgICAgICAgICAgIDx0aGVhZCBjbGFzc05hbWU9XCJiZy1zbGF0ZS01MCBkYXJrOmJnLXdoaXRlLzUgdGV4dC1zbGF0ZS05MDAgZGFyazp0ZXh0LXdoaXRlIGZvbnQtYm9sZFwiPlxuICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgIDx0aCBjbGFzc05hbWU9XCJwLTRcIj5GaWxlIFBhdGg8L3RoPlxuICAgICAgICAgICAgICAgICAgPHRoIGNsYXNzTmFtZT1cInAtNFwiPlVSTCBQYXRoPC90aD5cbiAgICAgICAgICAgICAgICAgIDx0aCBjbGFzc05hbWU9XCJwLTRcIj5QYXJhbXM8L3RoPlxuICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgIDwvdGhlYWQ+XG4gICAgICAgICAgICAgIDx0Ym9keSBjbGFzc05hbWU9XCJkaXZpZGUteSBkaXZpZGUtc2xhdGUtMjAwIGRhcms6ZGl2aWRlLXdoaXRlLzVcIj5cbiAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwicC00IGZvbnQtbW9ubyB0ZXh0LWluZGlnby02MDAgZGFyazp0ZXh0LWluZGlnby0zMDBcIj5wYWdlcy9ibG9nL1tzbHVnXS5qc3g8L3RkPlxuICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInAtNCB0ZXh0LXNsYXRlLTcwMCBkYXJrOnRleHQtd2hpdGVcIj4vYmxvZy9oZWxsby13b3JsZDwvdGQ+XG4gICAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwicC00IGZvbnQtbW9ubyB0ZXh0LXNsYXRlLTYwMCBkYXJrOnRleHQtemluYy00MDBcIj57YHsgc2x1ZzogXCJoZWxsby13b3JsZFwiIH1gfTwvdGQ+XG4gICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwicC00IGZvbnQtbW9ubyB0ZXh0LWluZGlnby02MDAgZGFyazp0ZXh0LWluZGlnby0zMDBcIj5wYWdlcy9zaG9wL1tjYXRdL1tpZF0uanN4PC90ZD5cbiAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJwLTQgdGV4dC1zbGF0ZS03MDAgZGFyazp0ZXh0LXdoaXRlXCI+L3Nob3Avc2hvZXMvMTIzPC90ZD5cbiAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJwLTQgZm9udC1tb25vIHRleHQtc2xhdGUtNjAwIGRhcms6dGV4dC16aW5jLTQwMFwiPntgeyBjYXQ6IFwic2hvZXNcIiwgaWQ6IFwiMTIzXCIgfWB9PC90ZD5cbiAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICA8L3Rib2R5PlxuICAgICAgICAgICAgPC90YWJsZT5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9zZWN0aW9uPlxuXG4gICAgICAgIDxzZWN0aW9uIGNsYXNzTmFtZT1cIm1iLTEyXCI+XG4gICAgICAgICAgPGgyIGNsYXNzTmFtZT1cInRleHQtMnhsIGZvbnQtYm9sZCB0ZXh0LXNsYXRlLTkwMCBkYXJrOnRleHQtd2hpdGUgbWItNFwiPkxheW91dHM8L2gyPlxuICAgICAgICAgIDxwIGNsYXNzTmFtZT1cIm1iLTRcIj5cbiAgICAgICAgICAgIENyZWF0ZSBhIDxjb2RlIGNsYXNzTmFtZT1cInRleHQtaW5kaWdvLTYwMCBkYXJrOnRleHQtaW5kaWdvLTQwMFwiPl9sYXlvdXQuanN4PC9jb2RlPiBmaWxlIHRvIHdyYXAgYWxsIHBhZ2VzIGluIHRoYXQgZGlyZWN0b3J5LlxuICAgICAgICAgICAgVGhpcyBpcyBwZXJmZWN0IGZvciBwZXJzaXN0ZW50IG5hdmlnYXRpb24sIGhlYWRlcnMsIGFuZCBmb290ZXJzLlxuICAgICAgICAgIDwvcD5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLXNsYXRlLTkwMCBkYXJrOmJnLWJsYWNrLzUwIGJvcmRlciBib3JkZXItc2xhdGUtMjAwIGRhcms6Ym9yZGVyLXdoaXRlLzEwIHJvdW5kZWQteGwgcC00IGZvbnQtbW9ubyB0ZXh0LXNtIG92ZXJmbG93LXgtYXV0byBzaGFkb3ctc21cIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1wdXJwbGUtNDAwXCI+ZXhwb3J0IGRlZmF1bHQgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1ibHVlLTQwMFwiPmZ1bmN0aW9uPC9zcGFuPiA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXllbGxvdy0zMDBcIj5MYXlvdXQ8L3NwYW4+KHtgeyBjaGlsZHJlbiB9YH0pIHtge2B9PC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBsLTQgdGV4dC1wdXJwbGUtNDAwXCI+cmV0dXJuICg8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGwtOCB0ZXh0LXdoaXRlXCI+PHNwYW4gY2xhc3NOYW1lPVwidGV4dC1ibHVlLTQwMFwiPiZsdDtkaXYmZ3Q7PC9zcGFuPjwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwbC0xMiB0ZXh0LXdoaXRlXCI+PHNwYW4gY2xhc3NOYW1lPVwidGV4dC1ibHVlLTQwMFwiPiZsdDtOYXZiYXIgLyZndDs8L3NwYW4+PC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBsLTEyIHRleHQtd2hpdGVcIj57YHtjaGlsZHJlbn1gfTwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwbC0xMiB0ZXh0LXdoaXRlXCI+PHNwYW4gY2xhc3NOYW1lPVwidGV4dC1ibHVlLTQwMFwiPiZsdDtGb290ZXIgLyZndDs8L3NwYW4+PC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBsLTggdGV4dC13aGl0ZVwiPjxzcGFuIGNsYXNzTmFtZT1cInRleHQtYmx1ZS00MDBcIj4mbHQ7L2RpdiZndDs8L3NwYW4+PC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBsLTQgdGV4dC1wdXJwbGUtNDAwXCI+KTs8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC13aGl0ZVwiPjwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L3NlY3Rpb24+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKTtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBQSxPQUFPLFdBQVc7QUFLWixTQUNFLEtBREY7QUFIUyxTQUFSLFVBQTJCO0FBQ2hDLFNBQ0UscUJBQUMsU0FBSSxXQUFVLGtFQUNiO0FBQUEseUJBQUMsU0FBSSxXQUFVLFNBQ2I7QUFBQSwwQkFBQyxRQUFHLFdBQVUsMERBQXlELHFCQUFPO0FBQUEsTUFDOUUsb0JBQUMsT0FBRSxXQUFVLDZDQUE0QywyREFBNkM7QUFBQSxPQUN4RztBQUFBLElBRUEscUJBQUMsU0FBSSxXQUFVLGlDQUNiO0FBQUEsMkJBQUMsYUFBUSxXQUFVLFNBQ2pCO0FBQUEsNEJBQUMsUUFBRyxXQUFVLDBEQUF5RCwwQkFBWTtBQUFBLFFBQ25GLHFCQUFDLE9BQUUsV0FBVSxRQUFPO0FBQUE7QUFBQSxVQUNILG9CQUFDLFVBQUssV0FBVSx3Q0FBdUMsb0JBQU07QUFBQSxVQUFPO0FBQUEsV0FFckY7QUFBQSxRQUVBLG9CQUFDLFNBQUksV0FBVSxtSEFDYiwrQkFBQyxXQUFNLFdBQVUsNEJBQ2Y7QUFBQSw4QkFBQyxXQUFNLFdBQVUsd0VBQ2YsK0JBQUMsUUFDQztBQUFBLGdDQUFDLFFBQUcsV0FBVSxPQUFNLHVCQUFTO0FBQUEsWUFDN0Isb0JBQUMsUUFBRyxXQUFVLE9BQU0sc0JBQVE7QUFBQSxhQUM5QixHQUNGO0FBQUEsVUFDQSxxQkFBQyxXQUFNLFdBQVUsaURBQ2Y7QUFBQSxpQ0FBQyxRQUNDO0FBQUEsa0NBQUMsUUFBRyxXQUFVLHNEQUFxRCw2QkFBZTtBQUFBLGNBQ2xGLG9CQUFDLFFBQUcsV0FBVSxzQ0FBcUMsZUFBQztBQUFBLGVBQ3REO0FB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
