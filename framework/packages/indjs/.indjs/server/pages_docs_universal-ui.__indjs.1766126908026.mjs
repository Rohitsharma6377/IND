// pages/docs/universal-ui.jsx
import React from "react";
import { jsx, jsxs } from "react/jsx-runtime";
function UniversalUI() {
  return /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto px-6 py-24 text-zinc-300", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-12", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-4xl font-bold text-white mb-4", children: "Universal UI" }),
      /* @__PURE__ */ jsx("p", { className: "text-xl text-zinc-400", children: "Components that render natively on every platform." })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "prose prose-invert max-w-none", children: [
      /* @__PURE__ */ jsxs("section", { className: "mb-12", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-white mb-4", children: "Philosophy" }),
        /* @__PURE__ */ jsx("p", { className: "mb-4", children: 'To achieve true "Write Once, Run Everywhere", INDJS provides a set of primitives that abstract the underlying platform differences.' }),
        /* @__PURE__ */ jsxs("p", { className: "mb-4", children: [
          "On the Web, ",
          /* @__PURE__ */ jsx("code", { className: "text-indigo-400", children: "<View />" }),
          " renders as a ",
          /* @__PURE__ */ jsx("code", { className: "text-zinc-500", children: "<div>" }),
          ".",
          /* @__PURE__ */ jsx("br", {}),
          "On Native (if using RN rendering), it renders as a native ",
          /* @__PURE__ */ jsx("code", { className: "text-zinc-500", children: "<View>" }),
          "."
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "mb-12", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-white mb-4", children: "Core Components" }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "p-4 bg-white/5 rounded-xl border border-white/10", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-white mb-2", children: "<Screen>" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm", children: "Full-height container that handles safe areas on mobile devices automatically." })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "p-4 bg-white/5 rounded-xl border border-white/10", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-white mb-2", children: "<Text>" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm", children: "Universal text component with consistent typography handling." })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "p-4 bg-white/5 rounded-xl border border-white/10", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-white mb-2", children: "<Stack>" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm", children: "Flexbox container for vertical or horizontal layouts with easy gap control." })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "p-4 bg-white/5 rounded-xl border border-white/10", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-white mb-2", children: "<Image>" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm", children: "Optimized image component that handles local assets and remote URLs." })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "mb-12", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-white mb-4", children: "Usage" }),
        /* @__PURE__ */ jsxs("div", { className: "bg-black/50 border border-white/10 rounded-xl p-4 font-mono text-sm overflow-x-auto", children: [
          /* @__PURE__ */ jsxs("div", { className: "text-purple-400", children: [
            "import ",
            /* @__PURE__ */ jsx("span", { className: "text-white", children: `{ Screen, Stack, Text, Button }` }),
            " from ",
            /* @__PURE__ */ jsx("span", { className: "text-green-400", children: "'indjs'" }),
            ";"
          ] }),
          /* @__PURE__ */ jsx("br", {}),
          /* @__PURE__ */ jsxs("div", { className: "text-blue-400", children: [
            "export default ",
            /* @__PURE__ */ jsx("span", { className: "text-purple-400", children: "function" }),
            " ",
            /* @__PURE__ */ jsx("span", { className: "text-yellow-300", children: "App" }),
            "() ",
            `{`
          ] }),
          /* @__PURE__ */ jsx("div", { className: "pl-4 text-purple-400", children: "return (" }),
          /* @__PURE__ */ jsx("div", { className: "pl-8 text-white", children: /* @__PURE__ */ jsx("span", { className: "text-blue-400", children: "<Screen>" }) }),
          /* @__PURE__ */ jsxs("div", { className: "pl-12 text-white", children: [
            /* @__PURE__ */ jsx("span", { className: "text-blue-400", children: "<Stack" }),
            " ",
            /* @__PURE__ */ jsx("span", { className: "text-purple-300", children: "spacing" }),
            "=",
            /* @__PURE__ */ jsx("span", { className: "text-green-400", children: 4 }),
            " ",
            /* @__PURE__ */ jsx("span", { className: "text-purple-300", children: "align" }),
            "=",
            /* @__PURE__ */ jsx("span", { className: "text-green-400", children: '"center"' }),
            /* @__PURE__ */ jsx("span", { className: "text-blue-400", children: ">" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "pl-16 text-white", children: [
            /* @__PURE__ */ jsx("span", { className: "text-blue-400", children: "<Text" }),
            " ",
            /* @__PURE__ */ jsx("span", { className: "text-purple-300", children: "className" }),
            "=",
            /* @__PURE__ */ jsx("span", { className: "text-green-400", children: '"text-xl"' }),
            /* @__PURE__ */ jsx("span", { className: "text-blue-400", children: ">" }),
            "Welcome",
            /* @__PURE__ */ jsx("span", { className: "text-blue-400", children: "</Text>" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "pl-16 text-white", children: [
            /* @__PURE__ */ jsx("span", { className: "text-blue-400", children: "<Button" }),
            " ",
            /* @__PURE__ */ jsx("span", { className: "text-purple-300", children: "onPress" }),
            "=",
            /* @__PURE__ */ jsx("span", { className: "text-white", children: `{handlePress}` }),
            /* @__PURE__ */ jsx("span", { className: "text-blue-400", children: ">" }),
            "First Component",
            /* @__PURE__ */ jsx("span", { className: "text-blue-400", children: "</Button>" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "pl-12 text-white", children: /* @__PURE__ */ jsx("span", { className: "text-blue-400", children: "</Stack>" }) }),
          /* @__PURE__ */ jsx("div", { className: "pl-8 text-white", children: /* @__PURE__ */ jsx("span", { className: "text-blue-400", children: "</Screen>" }) }),
          /* @__PURE__ */ jsx("div", { className: "pl-4 text-purple-400", children: ");" }),
          /* @__PURE__ */ jsx("div", { className: "text-white" })
        ] })
      ] })
    ] })
  ] });
}
export {
  UniversalUI as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcGFnZXMvZG9jcy91bml2ZXJzYWwtdWkuanN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBVbml2ZXJzYWxVSSgpIHtcclxuICAgIHJldHVybiAoXHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtYXgtdy00eGwgbXgtYXV0byBweC02IHB5LTI0IHRleHQtemluYy0zMDBcIj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtYi0xMlwiPlxyXG4gICAgICAgICAgICAgICAgPGgxIGNsYXNzTmFtZT1cInRleHQtNHhsIGZvbnQtYm9sZCB0ZXh0LXdoaXRlIG1iLTRcIj5Vbml2ZXJzYWwgVUk8L2gxPlxyXG4gICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC14bCB0ZXh0LXppbmMtNDAwXCI+Q29tcG9uZW50cyB0aGF0IHJlbmRlciBuYXRpdmVseSBvbiBldmVyeSBwbGF0Zm9ybS48L3A+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwcm9zZSBwcm9zZS1pbnZlcnQgbWF4LXctbm9uZVwiPlxyXG4gICAgICAgICAgICAgICAgPHNlY3Rpb24gY2xhc3NOYW1lPVwibWItMTJcIj5cclxuICAgICAgICAgICAgICAgICAgICA8aDIgY2xhc3NOYW1lPVwidGV4dC0yeGwgZm9udC1ib2xkIHRleHQtd2hpdGUgbWItNFwiPlBoaWxvc29waHk8L2gyPlxyXG4gICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cIm1iLTRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgVG8gYWNoaWV2ZSB0cnVlIFwiV3JpdGUgT25jZSwgUnVuIEV2ZXJ5d2hlcmVcIiwgSU5ESlMgcHJvdmlkZXMgYSBzZXQgb2YgcHJpbWl0aXZlc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0IGFic3RyYWN0IHRoZSB1bmRlcmx5aW5nIHBsYXRmb3JtIGRpZmZlcmVuY2VzLlxyXG4gICAgICAgICAgICAgICAgICAgIDwvcD5cclxuICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJtYi00XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIE9uIHRoZSBXZWIsIDxjb2RlIGNsYXNzTmFtZT1cInRleHQtaW5kaWdvLTQwMFwiPiZsdDtWaWV3IC8mZ3Q7PC9jb2RlPiByZW5kZXJzIGFzIGEgPGNvZGUgY2xhc3NOYW1lPVwidGV4dC16aW5jLTUwMFwiPiZsdDtkaXYmZ3Q7PC9jb2RlPi48YnIgLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgT24gTmF0aXZlIChpZiB1c2luZyBSTiByZW5kZXJpbmcpLCBpdCByZW5kZXJzIGFzIGEgbmF0aXZlIDxjb2RlIGNsYXNzTmFtZT1cInRleHQtemluYy01MDBcIj4mbHQ7VmlldyZndDs8L2NvZGU+LlxyXG4gICAgICAgICAgICAgICAgICAgIDwvcD5cclxuICAgICAgICAgICAgICAgIDwvc2VjdGlvbj5cclxuXHJcbiAgICAgICAgICAgICAgICA8c2VjdGlvbiBjbGFzc05hbWU9XCJtYi0xMlwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxoMiBjbGFzc05hbWU9XCJ0ZXh0LTJ4bCBmb250LWJvbGQgdGV4dC13aGl0ZSBtYi00XCI+Q29yZSBDb21wb25lbnRzPC9oMj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTEgbWQ6Z3JpZC1jb2xzLTIgZ2FwLTRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTQgYmctd2hpdGUvNSByb3VuZGVkLXhsIGJvcmRlciBib3JkZXItd2hpdGUvMTBcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9XCJ0ZXh0LWxnIGZvbnQtYm9sZCB0ZXh0LXdoaXRlIG1iLTJcIj4mbHQ7U2NyZWVuJmd0OzwvaDM+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXNtXCI+RnVsbC1oZWlnaHQgY29udGFpbmVyIHRoYXQgaGFuZGxlcyBzYWZlIGFyZWFzIG9uIG1vYmlsZSBkZXZpY2VzIGF1dG9tYXRpY2FsbHkuPC9wPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTQgYmctd2hpdGUvNSByb3VuZGVkLXhsIGJvcmRlciBib3JkZXItd2hpdGUvMTBcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9XCJ0ZXh0LWxnIGZvbnQtYm9sZCB0ZXh0LXdoaXRlIG1iLTJcIj4mbHQ7VGV4dCZndDs8L2gzPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1zbVwiPlVuaXZlcnNhbCB0ZXh0IGNvbXBvbmVudCB3aXRoIGNvbnNpc3RlbnQgdHlwb2dyYXBoeSBoYW5kbGluZy48L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtNCBiZy13aGl0ZS81IHJvdW5kZWQteGwgYm9yZGVyIGJvcmRlci13aGl0ZS8xMFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGgzIGNsYXNzTmFtZT1cInRleHQtbGcgZm9udC1ib2xkIHRleHQtd2hpdGUgbWItMlwiPiZsdDtTdGFjayZndDs8L2gzPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1zbVwiPkZsZXhib3ggY29udGFpbmVyIGZvciB2ZXJ0aWNhbCBvciBob3Jpem9udGFsIGxheW91dHMgd2l0aCBlYXN5IGdhcCBjb250cm9sLjwvcD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC00IGJnLXdoaXRlLzUgcm91bmRlZC14bCBib3JkZXIgYm9yZGVyLXdoaXRlLzEwXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDMgY2xhc3NOYW1lPVwidGV4dC1sZyBmb250LWJvbGQgdGV4dC13aGl0ZSBtYi0yXCI+Jmx0O0ltYWdlJmd0OzwvaDM+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXNtXCI+T3B0aW1pemVkIGltYWdlIGNvbXBvbmVudCB0aGF0IGhhbmRsZXMgbG9jYWwgYXNzZXRzIGFuZCByZW1vdGUgVVJMcy48L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9zZWN0aW9uPlxyXG5cclxuICAgICAgICAgICAgICAgIDxzZWN0aW9uIGNsYXNzTmFtZT1cIm1iLTEyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGgyIGNsYXNzTmFtZT1cInRleHQtMnhsIGZvbnQtYm9sZCB0ZXh0LXdoaXRlIG1iLTRcIj5Vc2FnZTwvaDI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1ibGFjay81MCBib3JkZXIgYm9yZGVyLXdoaXRlLzEwIHJvdW5kZWQteGwgcC00IGZvbnQtbW9ubyB0ZXh0LXNtIG92ZXJmbG93LXgtYXV0b1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtcHVycGxlLTQwMFwiPmltcG9ydCA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXdoaXRlXCI+e2B7IFNjcmVlbiwgU3RhY2ssIFRleHQsIEJ1dHRvbiB9YH08L3NwYW4+IGZyb20gPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1ncmVlbi00MDBcIj4naW5kanMnPC9zcGFuPjs8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGJyIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1ibHVlLTQwMFwiPmV4cG9ydCBkZWZhdWx0IDxzcGFuIGNsYXNzTmFtZT1cInRleHQtcHVycGxlLTQwMFwiPmZ1bmN0aW9uPC9zcGFuPiA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXllbGxvdy0zMDBcIj5BcHA8L3NwYW4+KCkge2B7YH08L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwbC00IHRleHQtcHVycGxlLTQwMFwiPnJldHVybiAoPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGwtOCB0ZXh0LXdoaXRlXCI+PHNwYW4gY2xhc3NOYW1lPVwidGV4dC1ibHVlLTQwMFwiPiZsdDtTY3JlZW4mZ3Q7PC9zcGFuPjwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBsLTEyIHRleHQtd2hpdGVcIj48c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LWJsdWUtNDAwXCI+Jmx0O1N0YWNrPC9zcGFuPiA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXB1cnBsZS0zMDBcIj5zcGFjaW5nPC9zcGFuPj08c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LWdyZWVuLTQwMFwiPns0fTwvc3Bhbj4gPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1wdXJwbGUtMzAwXCI+YWxpZ248L3NwYW4+PTxzcGFuIGNsYXNzTmFtZT1cInRleHQtZ3JlZW4tNDAwXCI+XCJjZW50ZXJcIjwvc3Bhbj48c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LWJsdWUtNDAwXCI+Jmd0Ozwvc3Bhbj48L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwbC0xNiB0ZXh0LXdoaXRlXCI+PHNwYW4gY2xhc3NOYW1lPVwidGV4dC1ibHVlLTQwMFwiPiZsdDtUZXh0PC9zcGFuPiA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXB1cnBsZS0zMDBcIj5jbGFzc05hbWU8L3NwYW4+PTxzcGFuIGNsYXNzTmFtZT1cInRleHQtZ3JlZW4tNDAwXCI+XCJ0ZXh0LXhsXCI8L3NwYW4+PHNwYW4gY2xhc3NOYW1lPVwidGV4dC1ibHVlLTQwMFwiPiZndDs8L3NwYW4+V2VsY29tZTxzcGFuIGNsYXNzTmFtZT1cInRleHQtYmx1ZS00MDBcIj4mbHQ7L1RleHQmZ3Q7PC9zcGFuPjwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBsLTE2IHRleHQtd2hpdGVcIj48c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LWJsdWUtNDAwXCI+Jmx0O0J1dHRvbjwvc3Bhbj4gPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1wdXJwbGUtMzAwXCI+b25QcmVzczwvc3Bhbj49PHNwYW4gY2xhc3NOYW1lPVwidGV4dC13aGl0ZVwiPntge2hhbmRsZVByZXNzfWB9PC9zcGFuPjxzcGFuIGNsYXNzTmFtZT1cInRleHQtYmx1ZS00MDBcIj4mZ3Q7PC9zcGFuPkZpcnN0IENvbXBvbmVudDxzcGFuIGNsYXNzTmFtZT1cInRleHQtYmx1ZS00MDBcIj4mbHQ7L0J1dHRvbiZndDs8L3NwYW4+PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGwtMTIgdGV4dC13aGl0ZVwiPjxzcGFuIGNsYXNzTmFtZT1cInRleHQtYmx1ZS00MDBcIj4mbHQ7L1N0YWNrJmd0Ozwvc3Bhbj48L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwbC04IHRleHQtd2hpdGVcIj48c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LWJsdWUtNDAwXCI+Jmx0Oy9TY3JlZW4mZ3Q7PC9zcGFuPjwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBsLTQgdGV4dC1wdXJwbGUtNDAwXCI+KTs8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LXdoaXRlXCI+PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L3NlY3Rpb24+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgKTtcclxufVxyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQUEsT0FBTyxXQUFXO0FBS04sU0FDSSxLQURKO0FBSEcsU0FBUixjQUErQjtBQUNsQyxTQUNJLHFCQUFDLFNBQUksV0FBVSw4Q0FDWDtBQUFBLHlCQUFDLFNBQUksV0FBVSxTQUNYO0FBQUEsMEJBQUMsUUFBRyxXQUFVLHNDQUFxQywwQkFBWTtBQUFBLE1BQy9ELG9CQUFDLE9BQUUsV0FBVSx5QkFBd0IsZ0VBQWtEO0FBQUEsT0FDM0Y7QUFBQSxJQUVBLHFCQUFDLFNBQUksV0FBVSxpQ0FDWDtBQUFBLDJCQUFDLGFBQVEsV0FBVSxTQUNmO0FBQUEsNEJBQUMsUUFBRyxXQUFVLHNDQUFxQyx3QkFBVTtBQUFBLFFBQzdELG9CQUFDLE9BQUUsV0FBVSxRQUFPLGlKQUdwQjtBQUFBLFFBQ0EscUJBQUMsT0FBRSxXQUFVLFFBQU87QUFBQTtBQUFBLFVBQ0osb0JBQUMsVUFBSyxXQUFVLG1CQUFrQixzQkFBYztBQUFBLFVBQU87QUFBQSxVQUFjLG9CQUFDLFVBQUssV0FBVSxpQkFBZ0IsbUJBQVc7QUFBQSxVQUFPO0FBQUEsVUFBQyxvQkFBQyxRQUFHO0FBQUEsVUFBRTtBQUFBLFVBQ2hGLG9CQUFDLFVBQUssV0FBVSxpQkFBZ0Isb0JBQVk7QUFBQSxVQUFPO0FBQUEsV0FDakg7QUFBQSxTQUNKO0FBQUEsTUFFQSxxQkFBQyxhQUFRLFdBQVUsU0FDZjtBQUFBLDRCQUFDLFFBQUcsV0FBVSxzQ0FBcUMsNkJBQWU7QUFBQSxRQUNsRSxxQkFBQyxTQUFJLFdBQVUseUNBQ1g7QUFBQSwrQkFBQyxTQUFJLFdBQVUsb0RBQ1g7QUFBQSxnQ0FBQyxRQUFHLFdBQVUscUNBQW9DLHNCQUFjO0FBQUEsWUFDaEUsb0JBQUMsT0FBRSxXQUFVLFdBQVUsNEZBQThFO0FBQUEsYUFDekc7QUFBQSxVQUNBLHFCQUFDLFNBQUksV0FBVSxvREFDWDtBQUFBLGdDQUFDLFFBQUcsV0FBVSxxQ0FBb0Msb0JBQVk7QUFBQSxZQUM5RCxvQkFBQyxPQUFFLFdBQVUsV0FBVSwyRUFBNkQ7QUFBQSxhQUN4RjtBQUFBLFVBQ0EscUJBQUMsU0FBSSxXQUFVLG9EQUNYO0FBQUEsZ0NBQUMsUUFBRyxXQUFVLHFDQUFvQyxxQkFBYTtBQUFBLFlBQy9ELG9CQUFDLE9BQUUsV0FBVSxXQUFVLHlGQUEyRTtBQUFBLGFBQ3RHO0FBQUEsVUFDQSxxQkFBQyxTQUFJLFdBQVUsb0RBQ1g7QUFBQSxnQ0FBQyxRQUFHLFdBQVUscUNBQW9DLHFCQUFhO0FBQUEsWUFDL0Qsb0JBQUMsT0FBRSxXQUFVLFdBQVUsa0ZBQW9FO0FBQUEsYUFDL0Y7QUFBQSxXQUNKO0FBQUEsU0FDSjtBQUFBLE1BRUEscUJBQUMsYUFBUSxXQUFVLFNBQ2Y7QUFBQSw0QkFBQyxRQUFHLFdBQVUsc0NBQXFDLG1CQUFLO0FBQUEsUUFDeEQscUJBQUMsU0FBSSxXQUFVLHVGQUNYO0FBQUEsK0JBQUMsU0FBSSxXQUFVLG1CQUFrQjtBQUFBO0FBQUEsWUFBTyxvQkFBQyxVQUFLLFdBQVUsY0FBYyw2Q0FBa0M7QUFBQSxZQUFPO0FBQUEsWUFBTSxvQkFBQyxVQUFLLFdBQVUsa0JBQWlCLHFCQUFPO0FBQUEsWUFBTztBQUFBLGFBQUM7QUFBQSxVQUNySyxvQkFBQyxRQUFHO0FBQUEsVUFDSixxQkFBQyxTQUFJLFdBQVUsaUJBQWdCO0FBQUE7QUFBQSxZQUFlLG9CQUFDLFVBQUssV0FBVSxtQkFBa0Isc0JBQVE7QUFBQSxZQUFPO0FBQUEsWUFBQyxvQkFBQyxVQUFLLFdBQVUsbUJBQWtCLGlCQUFHO0FBQUEsWUFBTztBQUFBLFlBQUk7QUFBQSxhQUFJO0FBQUEsVUFDcEosb0JBQUMsU0FBSSxXQUFVLHdCQUF1QixzQkFBUTtBQUFBLFVBQzlDLG9CQUFDLFNBQUksV0FBVSxtQkFBa0IsOEJBQUMsVUFBSyxXQUFVLGlCQUFnQixzQkFBYyxHQUFPO0FBQUEsVUFDdEYscUJBQUMsU0FBSSxXQUFVLG9CQUFtQjtBQUFBLGdDQUFDLFVBQUssV0FBVSxpQkFBZ0Isb0JBQVM7QUFBQSxZQUFPO0FBQUEsWUFBQyxvQkFBQyxVQUFLLFdBQVUsbUJBQWtCLHFCQUFPO0FBQUEsWUFBTztBQUFBLFlBQUMsb0JBQUMsVUFBSyxXQUFVLGtCQUFrQixhQUFFO0FBQUEsWUFBTztBQUFBLFlBQUMsb0JBQUMsVUFBSyxXQUFVLG1CQUFrQixtQkFBSztBQUFBLFlBQU87QUFBQSxZQUFDLG9CQUFDLFVBQUssV0FBVSxrQkFBaUIsc0JBQVE7QUFBQSxZQUFPLG9CQUFDLFVBQUssV0FBVSxpQkFBZ0IsZUFBSTtBQUFBLGFBQU87QUFBQSxVQUMxVCxxQkFBQyxTQUFJLFdBQVUsb0JBQW1CO0FBQUEsZ0NBQUMsVUFBSyxXQUFVLGlCQUFnQixtQkFBUTtBQUFBLFlBQU87QUFBQSxZQUFDLG9CQUFDLFVBQUssV0FBVSxtQkFBa0IsdUJBQVM7QUFBQSxZQUFPO0FBQUEsWUFBQyxvQkFBQyxVQUFLLFdBQVUsa0JBQWlCLHVCQUFTO0FBQUEsWUFBTyxvQkFBQyxVQUFLLFdBQVUsaUJBQWdCLGVBQUk7QUFBQSxZQUFPO0FBQUEsWUFBTyxvQkFBQyxVQUFLLFdBQVUsaUJBQWdCLHFCQUFhO0FBQUEsYUFBTztBQUFBLFVBQzVSLHFCQUFDLFNBQUksV0FBVSxvQkFBbUI7QUFBQSxnQ0FBQyxVQUFLLFdBQVUsaUJBQWdCLHFCQUFVO0FBQUEsWUFBTztBQUFBLFlBQUMsb0JBQUMsVUFBSyxXQUFVLG1CQUFrQixxQkFBTztBQUFBLFlBQU87QUFBQSxZQUFDLG9CQUFDLFVBQUssV0FBVSxjQUFjLDJCQUFnQjtBQUFBLFlBQU8sb0JBQUMsVUFBSyxXQUFVLGlCQUFnQixlQUFJO0FBQUEsWUFBTztBQUFBLFlBQWUsb0JBQUMsVUFBSyxXQUFVLGlCQUFnQix1QkFBZTtBQUFBLGFBQU87QUFBQSxVQUMxUyxvQkFBQyxTQUFJLFdBQVUsb0JBQW1CLDhCQUFDLFVBQUssV0FBVSxpQkFBZ0Isc0JBQWMsR0FBTztBQUFBLFVBQ3ZGLG9CQUFDLFNBQUksV0FBVSxtQkFBa0IsOEJBQUMsVUFBSyxXQUFVLGlCQUFnQix1QkFBZSxHQUFPO0FBQUEsVUFDdkYsb0JBQUMsU0FBSSxXQUFVLHdCQUF1QixnQkFBRTtBQUFBLFVBQ3hDLG9CQUFDLFNBQUksV0FBVSxjQUFhO0FBQUEsV0FDaEM7QUFBQSxTQUNKO0FBQUEsT0FDSjtBQUFBLEtBQ0o7QUFFUjsiLAogICJuYW1lcyI6IFtdCn0K
