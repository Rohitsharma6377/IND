// pages/index.jsx
import React, { useState, useEffect } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
function Home() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return /* @__PURE__ */ jsxs("div", { className: "relative min-h-screen overflow-hidden", children: [
    /* @__PURE__ */ jsxs("div", { className: "fixed inset-0 pointer-events-none", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute top-[-20%] left-[-10%] w-[1000px] h-[1000px] bg-indigo-600/20 blur-[120px] rounded-full mix-blend-screen animate-pulse-slow" }),
      /* @__PURE__ */ jsx("div", { className: "absolute bottom-[-20%] right-[-10%] w-[800px] h-[800px] bg-purple-600/10 blur-[100px] rounded-full mix-blend-screen" })
    ] }),
    /* @__PURE__ */ jsx("section", { className: "relative pt-32 pb-20 md:pt-48 md:pb-32 container mx-auto px-6 text-center z-10", children: /* @__PURE__ */ jsxs("div", { className: `transition-all duration-1000 transform ${mounted ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`, children: [
      /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 px-4 py-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-sm font-medium mb-8 hover:bg-indigo-500/20 transition-colors cursor-default", children: [
        /* @__PURE__ */ jsxs("span", { className: "relative flex h-2 w-2", children: [
          /* @__PURE__ */ jsx("span", { className: "animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" }),
          /* @__PURE__ */ jsx("span", { className: "relative inline-flex rounded-full h-2 w-2 bg-indigo-500" })
        ] }),
        "v3.0 Production Ready"
      ] }),
      /* @__PURE__ */ jsxs("h1", { className: "text-5xl md:text-8xl font-extrabold tracking-tight text-white mb-8 leading-[1.1]", children: [
        "One Framework. ",
        /* @__PURE__ */ jsx("br", {}),
        /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 animate-gradient-x", children: "Every Platform." })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-xl text-zinc-400 max-w-2xl mx-auto mb-12 leading-relaxed", children: "Build universal React applications for Web, Desktop (Electron), and Mobile (Native) with a single codebase." }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row items-center justify-center gap-6", children: [
        /* @__PURE__ */ jsx(
          "a",
          {
            href: "/docs",
            className: "h-14 px-8 rounded-full bg-white text-black font-bold text-lg hover:bg-zinc-200 hover:scale-105 transition-all flex items-center justify-center min-w-[180px] shadow-[0_0_20px_rgba(255,255,255,0.3)]",
            children: "Get Started"
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "h-14 px-8 rounded-full border border-white/10 bg-white/5 text-zinc-300 font-mono text-sm flex items-center gap-4 hover:bg-white/10 hover:border-white/20 transition-colors cursor-pointer group min-w-[240px] backdrop-blur-sm", children: [
          /* @__PURE__ */ jsx("span", { className: "text-indigo-400", children: "$" }),
          /* @__PURE__ */ jsx("span", { children: "npx indjs create my-app" }),
          /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 ml-auto text-zinc-500 group-hover:text-white transition-colors", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" }) })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-24 container mx-auto px-6 relative z-10", children: /* @__PURE__ */ jsxs("div", { className: "glass-panel rounded-2xl p-2 md:p-4 animate-fade-in-up animation-delay-300 shadow-2xl bg-black/40", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-white/5 rounded-t-xl", children: [
        /* @__PURE__ */ jsx("div", { className: "w-3 h-3 rounded-full bg-[#FF5F56]" }),
        /* @__PURE__ */ jsx("div", { className: "w-3 h-3 rounded-full bg-[#FFBD2E]" }),
        /* @__PURE__ */ jsx("div", { className: "w-3 h-3 rounded-full bg-[#27C93F]" }),
        /* @__PURE__ */ jsx("div", { className: "ml-auto text-xs text-zinc-500 font-mono", children: "pages/index.jsx" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "p-4 md:p-8 font-mono text-sm md:text-base overflow-x-auto bg-[#0d1117] rounded-b-xl", children: [
        /* @__PURE__ */ jsxs("div", { className: "text-purple-400", children: [
          "import ",
          /* @__PURE__ */ jsx("span", { className: "text-white", children: "React" }),
          " from ",
          /* @__PURE__ */ jsx("span", { className: "text-green-400", children: "'react'" }),
          ";"
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "text-purple-400", children: [
          "import ",
          /* @__PURE__ */ jsx("span", { className: "text-white", children: `{ Screen, Text }` }),
          " from ",
          /* @__PURE__ */ jsx("span", { className: "text-green-400", children: "'indjs'" }),
          ";"
        ] }),
        /* @__PURE__ */ jsx("br", {}),
        /* @__PURE__ */ jsxs("div", { className: "text-blue-400", children: [
          "export default ",
          /* @__PURE__ */ jsx("span", { className: "text-purple-400", children: "function" }),
          " ",
          /* @__PURE__ */ jsx("span", { className: "text-yellow-300", children: "UniversalApp" }),
          "() ",
          `{`
        ] }),
        /* @__PURE__ */ jsx("div", { className: "pl-4 text-zinc-400", children: "// This code runs on Web, Electron, and Android/iOS" }),
        /* @__PURE__ */ jsx("div", { className: "pl-4 text-purple-400", children: "return (" }),
        /* @__PURE__ */ jsx("div", { className: "pl-8 text-white", children: /* @__PURE__ */ jsx("span", { className: "text-blue-400", children: "<Screen>" }) }),
        /* @__PURE__ */ jsxs("div", { className: "pl-12 text-white", children: [
          /* @__PURE__ */ jsx("span", { className: "text-blue-400", children: "<Text" }),
          " ",
          /* @__PURE__ */ jsx("span", { className: "text-purple-300", children: "className" }),
          "=",
          /* @__PURE__ */ jsx("span", { className: "text-green-400", children: '"text-2xl font-bold"' }),
          /* @__PURE__ */ jsx("span", { className: "text-blue-400", children: ">" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "pl-16 text-white type-writer-effect", children: "Hello World \u{1F30D}" }),
        /* @__PURE__ */ jsx("div", { className: "pl-12 text-white", children: /* @__PURE__ */ jsx("span", { className: "text-blue-400", children: "</Text>" }) }),
        /* @__PURE__ */ jsx("div", { className: "pl-8 text-white", children: /* @__PURE__ */ jsx("span", { className: "text-blue-400", children: "</Screen>" }) }),
        /* @__PURE__ */ jsx("div", { className: "pl-4 text-purple-400", children: ");" }),
        /* @__PURE__ */ jsx("div", { className: "text-white" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-24 bg-gradient-to-b from-transparent to-black/50 z-10 relative", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-16 animate-fade-in-up", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-5xl font-bold mb-6", children: "Why INDJS?" }),
        /* @__PURE__ */ jsx("p", { className: "text-zinc-400 max-w-2xl mx-auto", children: "Everything you need to ship cross-platform apps at the speed of light." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: [
        /* @__PURE__ */ jsx(
          FeatureCard,
          {
            delay: "0",
            icon: "\u26A1",
            title: "Universal Engine",
            desc: "A single React runtime that adapts to DOM (Web), Electron Renderer (Desktop), and Capacitor WebView (Mobile)."
          }
        ),
        /* @__PURE__ */ jsx(
          FeatureCard,
          {
            delay: "100",
            icon: "\u{1F4C2}",
            title: "File-System Routing",
            desc: "Create files in `pages/` and let the framework handle routing, deep linking, and navigation stack."
          }
        ),
        /* @__PURE__ */ jsx(
          FeatureCard,
          {
            delay: "200",
            icon: "\u{1F3A8}",
            title: "Tailwind Native",
            desc: "Write utility classes that compile to optimized CSS for all platforms."
          }
        ),
        /* @__PURE__ */ jsx(
          FeatureCard,
          {
            delay: "300",
            icon: "\u{1F504}",
            title: "Live Reload Everywhere",
            desc: "See changes instantly on your browser, desktop window, and connected Android device."
          }
        ),
        /* @__PURE__ */ jsx(
          FeatureCard,
          {
            delay: "400",
            icon: "\u{1F4E6}",
            title: "Zero Config",
            desc: "No webpack config. No babelrc. Just install and run."
          }
        ),
        /* @__PURE__ */ jsx(
          FeatureCard,
          {
            delay: "500",
            icon: "\u{1F512}",
            title: "Enterprise Ready",
            desc: "TypeScript, ESLint, and Testing (Vitest/Playwright) pre-configured."
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-24 container mx-auto px-6 z-10 relative", children: /* @__PURE__ */ jsxs("div", { className: "glass-panel p-8 rounded-2xl text-center", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold mb-8", children: "Deploy Anywhere" }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap justify-center gap-4 font-mono text-sm", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-black/50 px-6 py-4 rounded-xl border border-white/10 flex items-center gap-3", children: [
          /* @__PURE__ */ jsx("div", { className: "bg-green-500/20 text-green-400 p-2 rounded", children: "npm run build" }),
          /* @__PURE__ */ jsx("span", { className: "text-zinc-500", children: "\u2192" }),
          /* @__PURE__ */ jsx("span", { className: "text-white", children: ".indjs/static" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-black/50 px-6 py-4 rounded-xl border border-white/10 flex items-center gap-3", children: [
          /* @__PURE__ */ jsx("div", { className: "bg-blue-500/20 text-blue-400 p-2 rounded", children: "npm run desktop:build" }),
          /* @__PURE__ */ jsx("span", { className: "text-zinc-500", children: "\u2192" }),
          /* @__PURE__ */ jsx("span", { className: "text-white", children: "MyApp.exe" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-black/50 px-6 py-4 rounded-xl border border-white/10 flex items-center gap-3", children: [
          /* @__PURE__ */ jsx("div", { className: "bg-purple-500/20 text-purple-400 p-2 rounded", children: "npm run android:dev" }),
          /* @__PURE__ */ jsx("span", { className: "text-zinc-500", children: "\u2192" }),
          /* @__PURE__ */ jsx("span", { className: "text-white", children: "APK" })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs("section", { className: "py-32 text-center z-10 relative overflow-hidden", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-indigo-900/20 to-transparent pointer-events-none" }),
      /* @__PURE__ */ jsx("h2", { className: "text-4xl md:text-5xl font-bold mb-8 relative z-10", children: "Start your journey" }),
      /* @__PURE__ */ jsx("a", { href: "/docs", className: "inline-block px-10 py-4 bg-white text-black font-bold rounded-full hover:scale-105 hover:bg-zinc-200 transition-all shadow-[0_0_40px_rgba(255,255,255,0.2)] relative z-10", children: "Read the Docs" })
    ] })
  ] });
}
function FeatureCard({ icon, title, desc, delay }) {
  return /* @__PURE__ */ jsxs("div", { className: `p-8 rounded-2xl glass-panel hover:bg-white/10 transition-all duration-300 group hover:-translate-y-2 animate-fade-in-up cursor-default`, style: { animationDelay: `${delay}ms` }, children: [
    /* @__PURE__ */ jsx("div", { className: "text-4xl mb-6 bg-white/5 w-16 h-16 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform", children: icon }),
    /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-white mb-3", children: title }),
    /* @__PURE__ */ jsx("p", { className: "text-zinc-400 leading-relaxed text-sm", children: desc })
  ] });
}
export {
  Home as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcGFnZXMvaW5kZXguanN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUsIHVzZUVmZmVjdCB9IGZyb20gXCJyZWFjdFwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBIb21lKCkge1xuICBjb25zdCBbbW91bnRlZCwgc2V0TW91bnRlZF0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIHVzZUVmZmVjdCgoKSA9PiBzZXRNb3VudGVkKHRydWUpLCBbXSk7XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cInJlbGF0aXZlIG1pbi1oLXNjcmVlbiBvdmVyZmxvdy1oaWRkZW5cIj5cbiAgICAgIHsvKiBCYWNrZ3JvdW5kIEdyYWRpZW50cyAqL31cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZml4ZWQgaW5zZXQtMCBwb2ludGVyLWV2ZW50cy1ub25lXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgdG9wLVstMjAlXSBsZWZ0LVstMTAlXSB3LVsxMDAwcHhdIGgtWzEwMDBweF0gYmctaW5kaWdvLTYwMC8yMCBibHVyLVsxMjBweF0gcm91bmRlZC1mdWxsIG1peC1ibGVuZC1zY3JlZW4gYW5pbWF0ZS1wdWxzZS1zbG93XCIgLz5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSBib3R0b20tWy0yMCVdIHJpZ2h0LVstMTAlXSB3LVs4MDBweF0gaC1bODAwcHhdIGJnLXB1cnBsZS02MDAvMTAgYmx1ci1bMTAwcHhdIHJvdW5kZWQtZnVsbCBtaXgtYmxlbmQtc2NyZWVuXCIgLz5cbiAgICAgIDwvZGl2PlxuXG4gICAgICB7LyogSGVybyBTZWN0aW9uICovfVxuICAgICAgPHNlY3Rpb24gY2xhc3NOYW1lPVwicmVsYXRpdmUgcHQtMzIgcGItMjAgbWQ6cHQtNDggbWQ6cGItMzIgY29udGFpbmVyIG14LWF1dG8gcHgtNiB0ZXh0LWNlbnRlciB6LTEwXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXtgdHJhbnNpdGlvbi1hbGwgZHVyYXRpb24tMTAwMCB0cmFuc2Zvcm0gJHttb3VudGVkID8gJ3RyYW5zbGF0ZS15LTAgb3BhY2l0eS0xMDAnIDogJ3RyYW5zbGF0ZS15LTEwIG9wYWNpdHktMCd9YH0+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJpbmxpbmUtZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgcHgtNCBweS0yIHJvdW5kZWQtZnVsbCBib3JkZXIgYm9yZGVyLWluZGlnby01MDAvMzAgYmctaW5kaWdvLTUwMC8xMCB0ZXh0LWluZGlnby0zMDAgdGV4dC1zbSBmb250LW1lZGl1bSBtYi04IGhvdmVyOmJnLWluZGlnby01MDAvMjAgdHJhbnNpdGlvbi1jb2xvcnMgY3Vyc29yLWRlZmF1bHRcIj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInJlbGF0aXZlIGZsZXggaC0yIHctMlwiPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJhbmltYXRlLXBpbmcgYWJzb2x1dGUgaW5saW5lLWZsZXggaC1mdWxsIHctZnVsbCByb3VuZGVkLWZ1bGwgYmctaW5kaWdvLTQwMCBvcGFjaXR5LTc1XCI+PC9zcGFuPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJyZWxhdGl2ZSBpbmxpbmUtZmxleCByb3VuZGVkLWZ1bGwgaC0yIHctMiBiZy1pbmRpZ28tNTAwXCI+PC9zcGFuPlxuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgdjMuMCBQcm9kdWN0aW9uIFJlYWR5XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8aDEgY2xhc3NOYW1lPVwidGV4dC01eGwgbWQ6dGV4dC04eGwgZm9udC1leHRyYWJvbGQgdHJhY2tpbmctdGlnaHQgdGV4dC13aGl0ZSBtYi04IGxlYWRpbmctWzEuMV1cIj5cbiAgICAgICAgICAgIE9uZSBGcmFtZXdvcmsuIDxiciAvPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC10cmFuc3BhcmVudCBiZy1jbGlwLXRleHQgYmctZ3JhZGllbnQtdG8tciBmcm9tLWluZGlnby00MDAgdmlhLXB1cnBsZS00MDAgdG8tcGluay00MDAgYW5pbWF0ZS1ncmFkaWVudC14XCI+XG4gICAgICAgICAgICAgIEV2ZXJ5IFBsYXRmb3JtLlxuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgIDwvaDE+XG5cbiAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXhsIHRleHQtemluYy00MDAgbWF4LXctMnhsIG14LWF1dG8gbWItMTIgbGVhZGluZy1yZWxheGVkXCI+XG4gICAgICAgICAgICBCdWlsZCB1bml2ZXJzYWwgUmVhY3QgYXBwbGljYXRpb25zIGZvciBXZWIsIERlc2t0b3AgKEVsZWN0cm9uKSwgYW5kIE1vYmlsZSAoTmF0aXZlKVxuICAgICAgICAgICAgd2l0aCBhIHNpbmdsZSBjb2RlYmFzZS5cbiAgICAgICAgICA8L3A+XG5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2wgc206ZmxleC1yb3cgaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGdhcC02XCI+XG4gICAgICAgICAgICA8YVxuICAgICAgICAgICAgICBocmVmPVwiL2RvY3NcIlxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJoLTE0IHB4LTggcm91bmRlZC1mdWxsIGJnLXdoaXRlIHRleHQtYmxhY2sgZm9udC1ib2xkIHRleHQtbGcgaG92ZXI6YmctemluYy0yMDAgaG92ZXI6c2NhbGUtMTA1IHRyYW5zaXRpb24tYWxsIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIG1pbi13LVsxODBweF0gc2hhZG93LVswXzBfMjBweF9yZ2JhKDI1NSwyNTUsMjU1LDAuMyldXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgR2V0IFN0YXJ0ZWRcbiAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaC0xNCBweC04IHJvdW5kZWQtZnVsbCBib3JkZXIgYm9yZGVyLXdoaXRlLzEwIGJnLXdoaXRlLzUgdGV4dC16aW5jLTMwMCBmb250LW1vbm8gdGV4dC1zbSBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtNCBob3ZlcjpiZy13aGl0ZS8xMCBob3Zlcjpib3JkZXItd2hpdGUvMjAgdHJhbnNpdGlvbi1jb2xvcnMgY3Vyc29yLXBvaW50ZXIgZ3JvdXAgbWluLXctWzI0MHB4XSBiYWNrZHJvcC1ibHVyLXNtXCI+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtaW5kaWdvLTQwMFwiPiQ8L3NwYW4+XG4gICAgICAgICAgICAgIDxzcGFuPm5weCBpbmRqcyBjcmVhdGUgbXktYXBwPC9zcGFuPlxuICAgICAgICAgICAgICA8c3ZnIGNsYXNzTmFtZT1cInctNSBoLTUgbWwtYXV0byB0ZXh0LXppbmMtNTAwIGdyb3VwLWhvdmVyOnRleHQtd2hpdGUgdHJhbnNpdGlvbi1jb2xvcnNcIiBmaWxsPVwibm9uZVwiIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIj48cGF0aCBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCIgc3Ryb2tlV2lkdGg9XCIyXCIgZD1cIk04IDE2SDZhMiAyIDAgMDEtMi0yVjZhMiAyIDAgMDEyLTJoOGEyIDIgMCAwMTIgMnYybS02IDEyaDhhMiAyIDAgMDAyLTJ2LThhMiAyIDAgMDAtMi0yaC04YTIgMiAwIDAwLTIgMnY4YTIgMiAwIDAwMiAyelwiPjwvcGF0aD48L3N2Zz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvc2VjdGlvbj5cblxuICAgICAgey8qIENvZGUgRGVtbyAtIFNjcm9sbCBBbmltYXRpb24gKi99XG4gICAgICA8c2VjdGlvbiBjbGFzc05hbWU9XCJweS0yNCBjb250YWluZXIgbXgtYXV0byBweC02IHJlbGF0aXZlIHotMTBcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJnbGFzcy1wYW5lbCByb3VuZGVkLTJ4bCBwLTIgbWQ6cC00IGFuaW1hdGUtZmFkZS1pbi11cCBhbmltYXRpb24tZGVsYXktMzAwIHNoYWRvdy0yeGwgYmctYmxhY2svNDBcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yIHB4LTQgcHktMyBib3JkZXItYiBib3JkZXItd2hpdGUvNSBiZy13aGl0ZS81IHJvdW5kZWQtdC14bFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3LTMgaC0zIHJvdW5kZWQtZnVsbCBiZy1bI0ZGNUY1Nl1cIiAvPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3LTMgaC0zIHJvdW5kZWQtZnVsbCBiZy1bI0ZGQkQyRV1cIiAvPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3LTMgaC0zIHJvdW5kZWQtZnVsbCBiZy1bIzI3QzkzRl1cIiAvPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtbC1hdXRvIHRleHQteHMgdGV4dC16aW5jLTUwMCBmb250LW1vbm9cIj5wYWdlcy9pbmRleC5qc3g8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtNCBtZDpwLTggZm9udC1tb25vIHRleHQtc20gbWQ6dGV4dC1iYXNlIG92ZXJmbG93LXgtYXV0byBiZy1bIzBkMTExN10gcm91bmRlZC1iLXhsXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtcHVycGxlLTQwMFwiPmltcG9ydCA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXdoaXRlXCI+UmVhY3Q8L3NwYW4+IGZyb20gPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1ncmVlbi00MDBcIj4ncmVhY3QnPC9zcGFuPjs8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1wdXJwbGUtNDAwXCI+aW1wb3J0IDxzcGFuIGNsYXNzTmFtZT1cInRleHQtd2hpdGVcIj57YHsgU2NyZWVuLCBUZXh0IH1gfTwvc3Bhbj4gZnJvbSA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LWdyZWVuLTQwMFwiPidpbmRqcyc8L3NwYW4+OzwvZGl2PlxuICAgICAgICAgICAgPGJyIC8+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtYmx1ZS00MDBcIj5leHBvcnQgZGVmYXVsdCA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXB1cnBsZS00MDBcIj5mdW5jdGlvbjwvc3Bhbj4gPHNwYW4gY2xhc3NOYW1lPVwidGV4dC15ZWxsb3ctMzAwXCI+VW5pdmVyc2FsQXBwPC9zcGFuPigpIHtge2B9PC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBsLTQgdGV4dC16aW5jLTQwMFwiPi8vIFRoaXMgY29kZSBydW5zIG9uIFdlYiwgRWxlY3Ryb24sIGFuZCBBbmRyb2lkL2lPUzwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwbC00IHRleHQtcHVycGxlLTQwMFwiPnJldHVybiAoPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBsLTggdGV4dC13aGl0ZVwiPjxzcGFuIGNsYXNzTmFtZT1cInRleHQtYmx1ZS00MDBcIj4mbHQ7U2NyZWVuJmd0Ozwvc3Bhbj48L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGwtMTIgdGV4dC13aGl0ZVwiPjxzcGFuIGNsYXNzTmFtZT1cInRleHQtYmx1ZS00MDBcIj4mbHQ7VGV4dDwvc3Bhbj4gPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1wdXJwbGUtMzAwXCI+Y2xhc3NOYW1lPC9zcGFuPj08c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LWdyZWVuLTQwMFwiPlwidGV4dC0yeGwgZm9udC1ib2xkXCI8L3NwYW4+PHNwYW4gY2xhc3NOYW1lPVwidGV4dC1ibHVlLTQwMFwiPiZndDs8L3NwYW4+PC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBsLTE2IHRleHQtd2hpdGUgdHlwZS13cml0ZXItZWZmZWN0XCI+SGVsbG8gV29ybGQgXHVEODNDXHVERjBEPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBsLTEyIHRleHQtd2hpdGVcIj48c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LWJsdWUtNDAwXCI+Jmx0Oy9UZXh0Jmd0Ozwvc3Bhbj48L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGwtOCB0ZXh0LXdoaXRlXCI+PHNwYW4gY2xhc3NOYW1lPVwidGV4dC1ibHVlLTQwMFwiPiZsdDsvU2NyZWVuJmd0Ozwvc3Bhbj48L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGwtNCB0ZXh0LXB1cnBsZS00MDBcIj4pOzwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LXdoaXRlXCI+PC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9zZWN0aW9uPlxuXG4gICAgICB7LyogR3JpZCBGZWF0dXJlcyAqL31cbiAgICAgIDxzZWN0aW9uIGNsYXNzTmFtZT1cInB5LTI0IGJnLWdyYWRpZW50LXRvLWIgZnJvbS10cmFuc3BhcmVudCB0by1ibGFjay81MCB6LTEwIHJlbGF0aXZlXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyIG14LWF1dG8gcHgtNlwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXIgbWItMTYgYW5pbWF0ZS1mYWRlLWluLXVwXCI+XG4gICAgICAgICAgICA8aDIgY2xhc3NOYW1lPVwidGV4dC0zeGwgbWQ6dGV4dC01eGwgZm9udC1ib2xkIG1iLTZcIj5XaHkgSU5ESlM/PC9oMj5cbiAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtemluYy00MDAgbWF4LXctMnhsIG14LWF1dG9cIj5FdmVyeXRoaW5nIHlvdSBuZWVkIHRvIHNoaXAgY3Jvc3MtcGxhdGZvcm0gYXBwcyBhdCB0aGUgc3BlZWQgb2YgbGlnaHQuPC9wPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMSBtZDpncmlkLWNvbHMtMiBsZzpncmlkLWNvbHMtMyBnYXAtNlwiPlxuICAgICAgICAgICAgPEZlYXR1cmVDYXJkXG4gICAgICAgICAgICAgIGRlbGF5PVwiMFwiXG4gICAgICAgICAgICAgIGljb249XCJcdTI2QTFcIlxuICAgICAgICAgICAgICB0aXRsZT1cIlVuaXZlcnNhbCBFbmdpbmVcIlxuICAgICAgICAgICAgICBkZXNjPVwiQSBzaW5nbGUgUmVhY3QgcnVudGltZSB0aGF0IGFkYXB0cyB0byBET00gKFdlYiksIEVsZWN0cm9uIFJlbmRlcmVyIChEZXNrdG9wKSwgYW5kIENhcGFjaXRvciBXZWJWaWV3IChNb2JpbGUpLlwiXG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAgPEZlYXR1cmVDYXJkXG4gICAgICAgICAgICAgIGRlbGF5PVwiMTAwXCJcbiAgICAgICAgICAgICAgaWNvbj1cIlx1RDgzRFx1RENDMlwiXG4gICAgICAgICAgICAgIHRpdGxlPVwiRmlsZS1TeXN0ZW0gUm91dGluZ1wiXG4gICAgICAgICAgICAgIGRlc2M9XCJDcmVhdGUgZmlsZXMgaW4gYHBhZ2VzL2AgYW5kIGxldCB0aGUgZnJhbWV3b3JrIGhhbmRsZSByb3V0aW5nLCBkZWVwIGxpbmtpbmcsIGFuZCBuYXZpZ2F0aW9uIHN0YWNrLlwiXG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAgPEZlYXR1cmVDYXJkXG4gICAgICAgICAgICAgIGRlbGF5PVwiMjAwXCJcbiAgICAgICAgICAgICAgaWNvbj1cIlx1RDgzQ1x1REZBOFwiXG4gICAgICAgICAgICAgIHRpdGxlPVwiVGFpbHdpbmQgTmF0aXZlXCJcbiAgICAgICAgICAgICAgZGVzYz1cIldyaXRlIHV0aWxpdHkgY2xhc3NlcyB0aGF0IGNvbXBpbGUgdG8gb3B0aW1pemVkIENTUyBmb3IgYWxsIHBsYXRmb3Jtcy5cIlxuICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDxGZWF0dXJlQ2FyZFxuICAgICAgICAgICAgICBkZWxheT1cIjMwMFwiXG4gICAgICAgICAgICAgIGljb249XCJcdUQ4M0RcdUREMDRcIlxuICAgICAgICAgICAgICB0aXRsZT1cIkxpdmUgUmVsb2FkIEV2ZXJ5d2hlcmVcIlxuICAgICAgICAgICAgICBkZXNjPVwiU2VlIGNoYW5nZXMgaW5zdGFudGx5IG9uIHlvdXIgYnJvd3NlciwgZGVza3RvcCB3aW5kb3csIGFuZCBjb25uZWN0ZWQgQW5kcm9pZCBkZXZpY2UuXCJcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8RmVhdHVyZUNhcmRcbiAgICAgICAgICAgICAgZGVsYXk9XCI0MDBcIlxuICAgICAgICAgICAgICBpY29uPVwiXHVEODNEXHVEQ0U2XCJcbiAgICAgICAgICAgICAgdGl0bGU9XCJaZXJvIENvbmZpZ1wiXG4gICAgICAgICAgICAgIGRlc2M9XCJObyB3ZWJwYWNrIGNvbmZpZy4gTm8gYmFiZWxyYy4gSnVzdCBpbnN0YWxsIGFuZCBydW4uXCJcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8RmVhdHVyZUNhcmRcbiAgICAgICAgICAgICAgZGVsYXk9XCI1MDBcIlxuICAgICAgICAgICAgICBpY29uPVwiXHVEODNEXHVERDEyXCJcbiAgICAgICAgICAgICAgdGl0bGU9XCJFbnRlcnByaXNlIFJlYWR5XCJcbiAgICAgICAgICAgICAgZGVzYz1cIlR5cGVTY3JpcHQsIEVTTGludCwgYW5kIFRlc3RpbmcgKFZpdGVzdC9QbGF5d3JpZ2h0KSBwcmUtY29uZmlndXJlZC5cIlxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L3NlY3Rpb24+XG5cbiAgICAgIHsvKiBJbnRlcmFjdGl2ZSBUZXJtaW5hbCAqL31cbiAgICAgIDxzZWN0aW9uIGNsYXNzTmFtZT1cInB5LTI0IGNvbnRhaW5lciBteC1hdXRvIHB4LTYgei0xMCByZWxhdGl2ZVwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdsYXNzLXBhbmVsIHAtOCByb3VuZGVkLTJ4bCB0ZXh0LWNlbnRlclwiPlxuICAgICAgICAgIDxoMiBjbGFzc05hbWU9XCJ0ZXh0LTN4bCBmb250LWJvbGQgbWItOFwiPkRlcGxveSBBbnl3aGVyZTwvaDI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtd3JhcCBqdXN0aWZ5LWNlbnRlciBnYXAtNCBmb250LW1vbm8gdGV4dC1zbVwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1ibGFjay81MCBweC02IHB5LTQgcm91bmRlZC14bCBib3JkZXIgYm9yZGVyLXdoaXRlLzEwIGZsZXggaXRlbXMtY2VudGVyIGdhcC0zXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctZ3JlZW4tNTAwLzIwIHRleHQtZ3JlZW4tNDAwIHAtMiByb3VuZGVkXCI+bnBtIHJ1biBidWlsZDwvZGl2PlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXppbmMtNTAwXCI+XHUyMTkyPC9zcGFuPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXdoaXRlXCI+LmluZGpzL3N0YXRpYzwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1ibGFjay81MCBweC02IHB5LTQgcm91bmRlZC14bCBib3JkZXIgYm9yZGVyLXdoaXRlLzEwIGZsZXggaXRlbXMtY2VudGVyIGdhcC0zXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctYmx1ZS01MDAvMjAgdGV4dC1ibHVlLTQwMCBwLTIgcm91bmRlZFwiPm5wbSBydW4gZGVza3RvcDpidWlsZDwvZGl2PlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXppbmMtNTAwXCI+XHUyMTkyPC9zcGFuPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXdoaXRlXCI+TXlBcHAuZXhlPC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLWJsYWNrLzUwIHB4LTYgcHktNCByb3VuZGVkLXhsIGJvcmRlciBib3JkZXItd2hpdGUvMTAgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTNcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1wdXJwbGUtNTAwLzIwIHRleHQtcHVycGxlLTQwMCBwLTIgcm91bmRlZFwiPm5wbSBydW4gYW5kcm9pZDpkZXY8L2Rpdj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC16aW5jLTUwMFwiPlx1MjE5Mjwvc3Bhbj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC13aGl0ZVwiPkFQSzwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvc2VjdGlvbj5cblxuICAgICAgey8qIEZvb3RlciBDVEEgKi99XG4gICAgICA8c2VjdGlvbiBjbGFzc05hbWU9XCJweS0zMiB0ZXh0LWNlbnRlciB6LTEwIHJlbGF0aXZlIG92ZXJmbG93LWhpZGRlblwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIGluc2V0LTAgYmctZ3JhZGllbnQtdG8tdCBmcm9tLWluZGlnby05MDAvMjAgdG8tdHJhbnNwYXJlbnQgcG9pbnRlci1ldmVudHMtbm9uZVwiIC8+XG4gICAgICAgIDxoMiBjbGFzc05hbWU9XCJ0ZXh0LTR4bCBtZDp0ZXh0LTV4bCBmb250LWJvbGQgbWItOCByZWxhdGl2ZSB6LTEwXCI+U3RhcnQgeW91ciBqb3VybmV5PC9oMj5cbiAgICAgICAgPGEgaHJlZj1cIi9kb2NzXCIgY2xhc3NOYW1lPVwiaW5saW5lLWJsb2NrIHB4LTEwIHB5LTQgYmctd2hpdGUgdGV4dC1ibGFjayBmb250LWJvbGQgcm91bmRlZC1mdWxsIGhvdmVyOnNjYWxlLTEwNSBob3ZlcjpiZy16aW5jLTIwMCB0cmFuc2l0aW9uLWFsbCBzaGFkb3ctWzBfMF80MHB4X3JnYmEoMjU1LDI1NSwyNTUsMC4yKV0gcmVsYXRpdmUgei0xMFwiPlxuICAgICAgICAgIFJlYWQgdGhlIERvY3NcbiAgICAgICAgPC9hPlxuICAgICAgPC9zZWN0aW9uPlxuICAgIDwvZGl2PlxuICApO1xufVxuXG5mdW5jdGlvbiBGZWF0dXJlQ2FyZCh7IGljb24sIHRpdGxlLCBkZXNjLCBkZWxheSB9KSB7XG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9e2BwLTggcm91bmRlZC0yeGwgZ2xhc3MtcGFuZWwgaG92ZXI6Ymctd2hpdGUvMTAgdHJhbnNpdGlvbi1hbGwgZHVyYXRpb24tMzAwIGdyb3VwIGhvdmVyOi10cmFuc2xhdGUteS0yIGFuaW1hdGUtZmFkZS1pbi11cCBjdXJzb3ItZGVmYXVsdGB9IHN0eWxlPXt7IGFuaW1hdGlvbkRlbGF5OiBgJHtkZWxheX1tc2AgfX0+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtNHhsIG1iLTYgYmctd2hpdGUvNSB3LTE2IGgtMTYgcm91bmRlZC14bCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBncm91cC1ob3ZlcjpzY2FsZS0xMTAgdHJhbnNpdGlvbi10cmFuc2Zvcm1cIj57aWNvbn08L2Rpdj5cbiAgICAgIDxoMyBjbGFzc05hbWU9XCJ0ZXh0LXhsIGZvbnQtYm9sZCB0ZXh0LXdoaXRlIG1iLTNcIj57dGl0bGV9PC9oMz5cbiAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtemluYy00MDAgbGVhZGluZy1yZWxheGVkIHRleHQtc21cIj57ZGVzY308L3A+XG4gICAgPC9kaXY+XG4gICk7XG59XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQUEsT0FBTyxTQUFTLFVBQVUsaUJBQWlCO0FBU3JDLFNBQ0UsS0FERjtBQVBTLFNBQVIsT0FBd0I7QUFDN0IsUUFBTSxDQUFDLFNBQVMsVUFBVSxJQUFJLFNBQVMsS0FBSztBQUM1QyxZ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
