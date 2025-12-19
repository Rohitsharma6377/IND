// pages/docs/routing.jsx
import React from "react";
import { jsx, jsxs } from "react/jsx-runtime";
function Routing() {
  return /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto px-6 py-24 text-zinc-300", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-12", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-4xl font-bold text-white mb-4", children: "Routing" }),
      /* @__PURE__ */ jsx("p", { className: "text-xl text-zinc-400", children: "File-system based routing for universal apps." })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "prose prose-invert max-w-none", children: [
      /* @__PURE__ */ jsxs("section", { className: "mb-12", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-white mb-4", children: "How it works" }),
        /* @__PURE__ */ jsxs("p", { className: "mb-4", children: [
          "INDJS uses the ",
          /* @__PURE__ */ jsx("code", { className: "text-indigo-400", children: "pages/" }),
          " directory to define routes. The file structure maps directly to URL paths."
        ] }),
        /* @__PURE__ */ jsx("div", { className: "bg-white/5 border border-white/10 rounded-xl overflow-hidden mb-8", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-left text-sm", children: [
          /* @__PURE__ */ jsx("thead", { className: "bg-white/5 text-white font-bold", children: /* @__PURE__ */ jsxs("tr", { children: [
            /* @__PURE__ */ jsx("th", { className: "p-4", children: "File Path" }),
            /* @__PURE__ */ jsx("th", { className: "p-4", children: "URL Path" })
          ] }) }),
          /* @__PURE__ */ jsxs("tbody", { className: "divide-y divide-white/5", children: [
            /* @__PURE__ */ jsxs("tr", { children: [
              /* @__PURE__ */ jsx("td", { className: "p-4 font-mono text-indigo-300", children: "pages/index.jsx" }),
              /* @__PURE__ */ jsx("td", { className: "p-4 text-white", children: "/" })
            ] }),
            /* @__PURE__ */ jsxs("tr", { children: [
              /* @__PURE__ */ jsx("td", { className: "p-4 font-mono text-indigo-300", children: "pages/about.jsx" }),
              /* @__PURE__ */ jsx("td", { className: "p-4 text-white", children: "/about" })
            ] }),
            /* @__PURE__ */ jsxs("tr", { children: [
              /* @__PURE__ */ jsx("td", { className: "p-4 font-mono text-indigo-300", children: "pages/blog/first.jsx" }),
              /* @__PURE__ */ jsx("td", { className: "p-4 text-white", children: "/blog/first" })
            ] })
          ] })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "mb-12", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-white mb-4", children: "Dynamic Routes" }),
        /* @__PURE__ */ jsx("p", { className: "mb-4", children: "Use square brackets to create dynamic route segments." }),
        /* @__PURE__ */ jsx("div", { className: "bg-white/5 border border-white/10 rounded-xl overflow-hidden mb-6", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-left text-sm", children: [
          /* @__PURE__ */ jsx("thead", { className: "bg-white/5 text-white font-bold", children: /* @__PURE__ */ jsxs("tr", { children: [
            /* @__PURE__ */ jsx("th", { className: "p-4", children: "File Path" }),
            /* @__PURE__ */ jsx("th", { className: "p-4", children: "URL Path" }),
            /* @__PURE__ */ jsx("th", { className: "p-4", children: "Params" })
          ] }) }),
          /* @__PURE__ */ jsxs("tbody", { className: "divide-y divide-white/5", children: [
            /* @__PURE__ */ jsxs("tr", { children: [
              /* @__PURE__ */ jsx("td", { className: "p-4 font-mono text-indigo-300", children: "pages/blog/[slug].jsx" }),
              /* @__PURE__ */ jsx("td", { className: "p-4 text-white", children: "/blog/hello-world" }),
              /* @__PURE__ */ jsx("td", { className: "p-4 font-mono", children: `{ slug: "hello-world" }` })
            ] }),
            /* @__PURE__ */ jsxs("tr", { children: [
              /* @__PURE__ */ jsx("td", { className: "p-4 font-mono text-indigo-300", children: "pages/shop/[cat]/[id].jsx" }),
              /* @__PURE__ */ jsx("td", { className: "p-4 text-white", children: "/shop/shoes/123" }),
              /* @__PURE__ */ jsx("td", { className: "p-4 font-mono", children: `{ cat: "shoes", id: "123" }` })
            ] })
          ] })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "mb-12", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-white mb-4", children: "Layouts" }),
        /* @__PURE__ */ jsxs("p", { className: "mb-4", children: [
          "Create a ",
          /* @__PURE__ */ jsx("code", { className: "text-indigo-400", children: "_layout.jsx" }),
          " file to wrap all pages in that directory. This is perfect for persistent navigation, headers, and footers."
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-black/50 border border-white/10 rounded-xl p-4 font-mono text-sm overflow-x-auto", children: [
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcGFnZXMvZG9jcy9yb3V0aW5nLmpzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBSb3V0aW5nKCkge1xuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwibWF4LXctNHhsIG14LWF1dG8gcHgtNiBweS0yNCB0ZXh0LXppbmMtMzAwXCI+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1iLTEyXCI+XG4gICAgICAgIDxoMSBjbGFzc05hbWU9XCJ0ZXh0LTR4bCBmb250LWJvbGQgdGV4dC13aGl0ZSBtYi00XCI+Um91dGluZzwvaDE+XG4gICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQteGwgdGV4dC16aW5jLTQwMFwiPkZpbGUtc3lzdGVtIGJhc2VkIHJvdXRpbmcgZm9yIHVuaXZlcnNhbCBhcHBzLjwvcD5cbiAgICAgIDwvZGl2PlxuXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInByb3NlIHByb3NlLWludmVydCBtYXgtdy1ub25lXCI+XG4gICAgICAgIDxzZWN0aW9uIGNsYXNzTmFtZT1cIm1iLTEyXCI+XG4gICAgICAgICAgPGgyIGNsYXNzTmFtZT1cInRleHQtMnhsIGZvbnQtYm9sZCB0ZXh0LXdoaXRlIG1iLTRcIj5Ib3cgaXQgd29ya3M8L2gyPlxuICAgICAgICAgIDxwIGNsYXNzTmFtZT1cIm1iLTRcIj5cbiAgICAgICAgICAgIElOREpTIHVzZXMgdGhlIDxjb2RlIGNsYXNzTmFtZT1cInRleHQtaW5kaWdvLTQwMFwiPnBhZ2VzLzwvY29kZT4gZGlyZWN0b3J5IHRvIGRlZmluZSByb3V0ZXMuXG4gICAgICAgICAgICBUaGUgZmlsZSBzdHJ1Y3R1cmUgbWFwcyBkaXJlY3RseSB0byBVUkwgcGF0aHMuXG4gICAgICAgICAgPC9wPlxuXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy13aGl0ZS81IGJvcmRlciBib3JkZXItd2hpdGUvMTAgcm91bmRlZC14bCBvdmVyZmxvdy1oaWRkZW4gbWItOFwiPlxuICAgICAgICAgICAgPHRhYmxlIGNsYXNzTmFtZT1cInctZnVsbCB0ZXh0LWxlZnQgdGV4dC1zbVwiPlxuICAgICAgICAgICAgICA8dGhlYWQgY2xhc3NOYW1lPVwiYmctd2hpdGUvNSB0ZXh0LXdoaXRlIGZvbnQtYm9sZFwiPlxuICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgIDx0aCBjbGFzc05hbWU9XCJwLTRcIj5GaWxlIFBhdGg8L3RoPlxuICAgICAgICAgICAgICAgICAgPHRoIGNsYXNzTmFtZT1cInAtNFwiPlVSTCBQYXRoPC90aD5cbiAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICA8L3RoZWFkPlxuICAgICAgICAgICAgICA8dGJvZHkgY2xhc3NOYW1lPVwiZGl2aWRlLXkgZGl2aWRlLXdoaXRlLzVcIj5cbiAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwicC00IGZvbnQtbW9ubyB0ZXh0LWluZGlnby0zMDBcIj5wYWdlcy9pbmRleC5qc3g8L3RkPlxuICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInAtNCB0ZXh0LXdoaXRlXCI+LzwvdGQ+XG4gICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwicC00IGZvbnQtbW9ubyB0ZXh0LWluZGlnby0zMDBcIj5wYWdlcy9hYm91dC5qc3g8L3RkPlxuICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInAtNCB0ZXh0LXdoaXRlXCI+L2Fib3V0PC90ZD5cbiAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJwLTQgZm9udC1tb25vIHRleHQtaW5kaWdvLTMwMFwiPnBhZ2VzL2Jsb2cvZmlyc3QuanN4PC90ZD5cbiAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJwLTQgdGV4dC13aGl0ZVwiPi9ibG9nL2ZpcnN0PC90ZD5cbiAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICA8L3Rib2R5PlxuICAgICAgICAgICAgPC90YWJsZT5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9zZWN0aW9uPlxuXG4gICAgICAgIDxzZWN0aW9uIGNsYXNzTmFtZT1cIm1iLTEyXCI+XG4gICAgICAgICAgPGgyIGNsYXNzTmFtZT1cInRleHQtMnhsIGZvbnQtYm9sZCB0ZXh0LXdoaXRlIG1iLTRcIj5EeW5hbWljIFJvdXRlczwvaDI+XG4gICAgICAgICAgPHAgY2xhc3NOYW1lPVwibWItNFwiPlxuICAgICAgICAgICAgVXNlIHNxdWFyZSBicmFja2V0cyB0byBjcmVhdGUgZHluYW1pYyByb3V0ZSBzZWdtZW50cy5cbiAgICAgICAgICA8L3A+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy13aGl0ZS81IGJvcmRlciBib3JkZXItd2hpdGUvMTAgcm91bmRlZC14bCBvdmVyZmxvdy1oaWRkZW4gbWItNlwiPlxuICAgICAgICAgICAgPHRhYmxlIGNsYXNzTmFtZT1cInctZnVsbCB0ZXh0LWxlZnQgdGV4dC1zbVwiPlxuICAgICAgICAgICAgICA8dGhlYWQgY2xhc3NOYW1lPVwiYmctd2hpdGUvNSB0ZXh0LXdoaXRlIGZvbnQtYm9sZFwiPlxuICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgIDx0aCBjbGFzc05hbWU9XCJwLTRcIj5GaWxlIFBhdGg8L3RoPlxuICAgICAgICAgICAgICAgICAgPHRoIGNsYXNzTmFtZT1cInAtNFwiPlVSTCBQYXRoPC90aD5cbiAgICAgICAgICAgICAgICAgIDx0aCBjbGFzc05hbWU9XCJwLTRcIj5QYXJhbXM8L3RoPlxuICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgIDwvdGhlYWQ+XG4gICAgICAgICAgICAgIDx0Ym9keSBjbGFzc05hbWU9XCJkaXZpZGUteSBkaXZpZGUtd2hpdGUvNVwiPlxuICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJwLTQgZm9udC1tb25vIHRleHQtaW5kaWdvLTMwMFwiPnBhZ2VzL2Jsb2cvW3NsdWddLmpzeDwvdGQ+XG4gICAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwicC00IHRleHQtd2hpdGVcIj4vYmxvZy9oZWxsby13b3JsZDwvdGQ+XG4gICAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwicC00IGZvbnQtbW9ub1wiPntgeyBzbHVnOiBcImhlbGxvLXdvcmxkXCIgfWB9PC90ZD5cbiAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJwLTQgZm9udC1tb25vIHRleHQtaW5kaWdvLTMwMFwiPnBhZ2VzL3Nob3AvW2NhdF0vW2lkXS5qc3g8L3RkPlxuICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInAtNCB0ZXh0LXdoaXRlXCI+L3Nob3Avc2hvZXMvMTIzPC90ZD5cbiAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJwLTQgZm9udC1tb25vXCI+e2B7IGNhdDogXCJzaG9lc1wiLCBpZDogXCIxMjNcIiB9YH08L3RkPlxuICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgIDwvdGJvZHk+XG4gICAgICAgICAgICA8L3RhYmxlPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L3NlY3Rpb24+XG5cbiAgICAgICAgPHNlY3Rpb24gY2xhc3NOYW1lPVwibWItMTJcIj5cbiAgICAgICAgICA8aDIgY2xhc3NOYW1lPVwidGV4dC0yeGwgZm9udC1ib2xkIHRleHQtd2hpdGUgbWItNFwiPkxheW91dHM8L2gyPlxuICAgICAgICAgIDxwIGNsYXNzTmFtZT1cIm1iLTRcIj5cbiAgICAgICAgICAgIENyZWF0ZSBhIDxjb2RlIGNsYXNzTmFtZT1cInRleHQtaW5kaWdvLTQwMFwiPl9sYXlvdXQuanN4PC9jb2RlPiBmaWxlIHRvIHdyYXAgYWxsIHBhZ2VzIGluIHRoYXQgZGlyZWN0b3J5LlxuICAgICAgICAgICAgVGhpcyBpcyBwZXJmZWN0IGZvciBwZXJzaXN0ZW50IG5hdmlnYXRpb24sIGhlYWRlcnMsIGFuZCBmb290ZXJzLlxuICAgICAgICAgIDwvcD5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLWJsYWNrLzUwIGJvcmRlciBib3JkZXItd2hpdGUvMTAgcm91bmRlZC14bCBwLTQgZm9udC1tb25vIHRleHQtc20gb3ZlcmZsb3cteC1hdXRvXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtcHVycGxlLTQwMFwiPmV4cG9ydCBkZWZhdWx0IDxzcGFuIGNsYXNzTmFtZT1cInRleHQtYmx1ZS00MDBcIj5mdW5jdGlvbjwvc3Bhbj4gPHNwYW4gY2xhc3NOYW1lPVwidGV4dC15ZWxsb3ctMzAwXCI+TGF5b3V0PC9zcGFuPih7YHsgY2hpbGRyZW4gfWB9KSB7YHtgfTwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwbC00IHRleHQtcHVycGxlLTQwMFwiPnJldHVybiAoPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBsLTggdGV4dC13aGl0ZVwiPjxzcGFuIGNsYXNzTmFtZT1cInRleHQtYmx1ZS00MDBcIj4mbHQ7ZGl2Jmd0Ozwvc3Bhbj48L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGwtMTIgdGV4dC13aGl0ZVwiPjxzcGFuIGNsYXNzTmFtZT1cInRleHQtYmx1ZS00MDBcIj4mbHQ7TmF2YmFyIC8mZ3Q7PC9zcGFuPjwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwbC0xMiB0ZXh0LXdoaXRlXCI+e2B7Y2hpbGRyZW59YH08L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGwtMTIgdGV4dC13aGl0ZVwiPjxzcGFuIGNsYXNzTmFtZT1cInRleHQtYmx1ZS00MDBcIj4mbHQ7Rm9vdGVyIC8mZ3Q7PC9zcGFuPjwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwbC04IHRleHQtd2hpdGVcIj48c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LWJsdWUtNDAwXCI+Jmx0Oy9kaXYmZ3Q7PC9zcGFuPjwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwbC00IHRleHQtcHVycGxlLTQwMFwiPik7PC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtd2hpdGVcIj48L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9zZWN0aW9uPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICk7XG59XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQUEsT0FBTyxXQUFXO0FBS1osU0FDRSxLQURGO0FBSFMsU0FBUixVQUEyQjtBQUNoQyxTQUNFLHFCQUFDLFNBQUksV0FBVSw4Q0FDYjtBQUFBLHlCQUFDLFNBQUksV0FBVSxTQUNiO0FBQUEsMEJBQUMsUUFBRyxXQUFVLHNDQUFxQyxxQkFBTztBQUFBLE1BQzFELG9CQUFDLE9BQUUsV0FBVSx5QkFBd0IsMkRBQTZDO0FBQUEsT0FDcEY7QUFBQSxJQUVBLHFCQUFDLFNBQUksV0FBVSxpQ0FDYjtBQUFBLDJCQUFDLGFBQVEsV0FBVSxTQUNqQjtBQUFBLDRCQUFDLFFBQUcsV0FBVSxzQ0FBcUMsMEJBQVk7QUFBQSxRQUMvRCxxQkFBQyxPQUFFLFdBQVUsUUFBTztBQUFBO0FBQUEsVUFDSCxvQkFBQyxVQUFLLFdBQVUsbUJBQWtCLG9CQUFNO0FBQUEsVUFBTztBQUFBLFdBRWhFO0FBQUEsUUFFQSxvQkFBQyxTQUFJLFdBQVUscUVBQ2IsK0JBQUMsV0FBTSxXQUFVLDRCQUNmO0FBQUEsOEJBQUMsV0FBTSxXQUFVLG1DQUNmLCtCQUFDLFFBQ0M7QUFBQSxnQ0FBQyxRQUFHLFdBQVUsT0FBTSx1QkFBUztBQUFBLFlBQzdCLG9CQUFDLFFBQUcsV0FBVSxPQUFNLHNCQUFRO0FBQUEsYUFDOUIsR0FDRjtBQUFBLFVBQ0EscUJBQUMsV0FBTSxXQUFVLDJCQUNmO0FBQUEsaUNBQUMsUUFDQztBQUFBLGtDQUFDLFFBQUcsV0FBVSxpQ0FBZ0MsNkJBQWU7QUFBQSxjQUM3RCxvQkFBQyxRQUFHLFdBQVUsa0JBQWlCLGVBQUM7QUFBQSxlQUNsQztBQUFBLFlBQ0EscUJBQUMsUUFDQztBQUFBLGtDQUFDLFFBQUcsV0FBVSxpQ0FBZ0MsNkJBQWU7QUFBQSxjQUM3RCxvQkFBQyxRQUFHLFdBQVUsa0JBQWlCLG9CQUFNO0FBQUEsZUFDdkM7QUFBQSxZQUNBLHFCQUFDLFFBQ0M7QUFBQSxrQ0FBQyxRQUFHLFdBQVUsaUNBQWdDLGtDQUFvQjtBQUFBLGNBQ2xFLG9CQUFDLFFBQUcsV0FBVSxrQkFBaUIseUJBQVc7QUFBQSxlQUM1QztBQUFBLGFBQ0Y7QUFBQSxXQUNGLEdBQ0Y7QUFBQSxTQUNGO0FBQUEsTUFFQSxxQkFBQyxhQUFRLFdBQVUsU0FDakI7QUFBQSw0QkFBQyxRQUFHLFdBQVUsc0NBQXFDLDRCQUFjO0FBQUEsUUFDakUsb0JBQUMsT0FBRSxXQUFVLFFBQU8sbUVBRXBCO0FBQUEsUUFDQSxvQkFBQyxTQUFJLFdBQVUscUVBQ2IsK0JBQUMsV0FBTSxXQUFVLDRCQUNmO0FBQUEsOEJBQUMsV0FBTSxXQUFVLG1DQUNmLCtCQUFDLFFBQ0M7QUFBQSxnQ0FBQyxRQUFHLFdBQVUsT0FBTSx1QkFBUztBQUFBLFlBQzdCLG9CQUFDLFFBQUcsV0FBVSxPQUFNLHNCQUFRO0FBQUEsWUFDNUIsb0JBQUMsUUFBRyxXQUFVLE9BQU0sb0JBQU07QUFBQSxhQUM1QixHQUNGO0FBQUEsVUFDQSxxQkFBQyxXQUFNLFdBQVUsMkJBQ2Y7QUFBQSxpQ0FBQyxRQUNDO0FBQUEsa0NBQUMsUUFBRyxXQUFVLGlDQUFnQyxtQ0FBcUI7QUFBQSxjQUNuRSxvQkFBQyxRQUFHLFdBQVUsa0JBQWlCLCtCQUFpQjtBQUFBLGNBQ2hELG9CQUFDLFFBQUcsV0FBVSxpQkFBaUIscUNBQTBCO0FBQUEsZUFDM0Q7QUFBQSxZQUNBLHFCQUFDLFFBQ0M7QUFBQSxrQ0FBQyxRQUFHLFdBQVUsaUNBQWdDLHVDQUF5QjtBQUFBLGNBQ3ZFLG9CQUFDLFFBQUcsV0FBVSxrQkFBaUIsNkJBQWU7QUFBQSxjQUM5QyxvQkFBQyxRQUFHLFdBQVUsaUJBQWlCLHlDQUE4QjtBQUFBLGVBQy9EO0FBQUEsYUFDRjtBQUFBLFdBQ0YsR0FDRjtBQUFBLFNBQ0Y7QUFBQSxNQUVBLHFCQUFDLGFBQVEsV0FBVSxTQUNqQjtBQUFBLDRCQUFDLFFBQUcsV0FBVSxzQ0FBcUMscUJBQU87QUFBQSxRQUMxRCxxQkFBQyxPQUFFLFdBQVUsUUFBTztBQUFBO0FBQUEsVUFDVCxvQkFBQyxVQUFLLFdBQVUsbUJBQWtCLHlCQUFXO0FBQUEsVUFBTztBQUFBLFdBRS9EO0FBQUEsUUFDQSxxQkFBQyxTQUFJLFdBQVUsdUZBQ2I7QUFBQSwrQkFBQyxTQUFJLFdBQVUsbUJBQWtCO0FBQUE7QUFBQSxZQUFlLG9CQUFDLFVBQUssV0FBVSxpQkFBZ0Isc0JBQVE7QUFBQSxZQUFPO0FBQUEsWUFBQyxvQkFBQyxVQUFLLFdBQVUsbUJBQWtCLG9CQUFNO0FBQUEsWUFBTztBQUFBLFlBQUU7QUFBQSxZQUFlO0FBQUEsWUFBRztBQUFBLGFBQUk7QUFBQSxVQUN2SyxvQkFBQyxTQUFJLFdBQVUsd0JBQXVCLHNCQUFRO0FBQUEsVUFDOUMsb0JBQUMsU0FBSSxXQUFVLG1CQUFrQiw4QkFBQyxVQUFLLFdBQVUsaUJBQWdCLG1CQUFXLEdBQU87QUFBQSxVQUNuRixvQkFBQyxTQUFJLFdBQVUsb0JBQW1CLDhCQUFDLFVBQUssV0FBVSxpQkFBZ0Isd0JBQWdCLEdBQU87QUFBQSxVQUN6RixvQkFBQyxTQUFJLFdBQVUsb0JBQW9CLHdCQUFhO0FBQUEsVUFDaEQsb0JBQUMsU0FBSSxXQUFVLG9CQUFtQiw4QkFBQyxVQUFLLFdBQVUsaUJBQWdCLHdCQUFnQixHQUFPO0FBQUEsVUFDekYsb0JBQUMsU0FBSSxXQUFVLG1CQUFrQiw4QkFBQyxVQUFLLFdBQVUsaUJBQWdCLG9CQUFZLEdBQU87QUFBQSxVQUNwRixvQkFBQyxTQUFJLFdBQVUsd0JBQXVCLGdCQUFFO0FBQUEsVUFDeEMsb0JBQUMsU0FBSSxXQUFVLGNBQWE7QUFBQSxXQUM5QjtBQUFBLFNBQ0Y7QUFBQSxPQUNGO0FBQUEsS0FDRjtBQUVKOyIsCiAgIm5hbWVzIjogW10KfQo=
