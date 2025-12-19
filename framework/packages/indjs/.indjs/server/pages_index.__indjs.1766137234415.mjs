// pages/index.jsx
import React, { useState, useEffect } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
function Home() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return /* @__PURE__ */ jsxs("div", { className: "relative min-h-screen overflow-hidden", children: [
    /* @__PURE__ */ jsxs("div", { className: "fixed inset-0 pointer-events-none hidden dark:block", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute top-[-20%] left-[-10%] w-[1000px] h-[1000px] bg-indigo-600/20 blur-[120px] rounded-full mix-blend-screen animate-pulse-slow" }),
      /* @__PURE__ */ jsx("div", { className: "absolute bottom-[-20%] right-[-10%] w-[800px] h-[800px] bg-purple-600/10 blur-[100px] rounded-full mix-blend-screen" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "fixed inset-0 pointer-events-none block dark:hidden", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute top-[-20%] left-[-10%] w-[1000px] h-[1000px] bg-indigo-200/40 blur-[120px] rounded-full mix-blend-multiply" }),
      /* @__PURE__ */ jsx("div", { className: "absolute bottom-[-20%] right-[-10%] w-[800px] h-[800px] bg-purple-200/40 blur-[100px] rounded-full mix-blend-multiply" })
    ] }),
    /* @__PURE__ */ jsx("section", { className: "relative pt-32 pb-20 md:pt-48 md:pb-32 container mx-auto px-6 text-center z-10", children: /* @__PURE__ */ jsxs("div", { className: `transition-all duration-1000 transform ${mounted ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`, children: [
      /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 px-4 py-2 rounded-full border border-indigo-500/30 bg-indigo-50/50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-300 text-sm font-medium mb-8 hover:bg-indigo-100 dark:hover:bg-indigo-500/20 transition-colors cursor-default backdrop-blur-sm", children: [
        /* @__PURE__ */ jsxs("span", { className: "relative flex h-2 w-2", children: [
          /* @__PURE__ */ jsx("span", { className: "animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" }),
          /* @__PURE__ */ jsx("span", { className: "relative inline-flex rounded-full h-2 w-2 bg-indigo-500" })
        ] }),
        "v3.0 Production Ready"
      ] }),
      /* @__PURE__ */ jsxs("h1", { className: "text-5xl md:text-8xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-8 leading-[1.1]", children: [
        "One Framework. ",
        /* @__PURE__ */ jsx("br", {}),
        /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 animate-gradient-x", children: "Every Platform." })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-xl text-slate-600 dark:text-zinc-400 max-w-2xl mx-auto mb-12 leading-relaxed", children: "Build universal React applications for Web, Desktop (Electron), and Mobile (Native) with a single codebase." }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row items-center justify-center gap-6", children: [
        /* @__PURE__ */ jsx(
          "a",
          {
            href: "/docs",
            className: "h-14 px-8 rounded-full bg-slate-900 dark:bg-white text-white dark:text-black font-bold text-lg hover:bg-slate-700 dark:hover:bg-zinc-200 hover:scale-105 transition-all flex items-center justify-center min-w-[180px] shadow-[0_0_20px_rgba(0,0,0,0.1)] dark:shadow-[0_0_20px_rgba(255,255,255,0.3)]",
            children: "Get Started"
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "h-14 px-8 rounded-full border border-slate-200 dark:border-white/10 bg-white/50 dark:bg-white/5 text-slate-600 dark:text-zinc-300 font-mono text-sm flex items-center gap-4 hover:bg-white dark:hover:bg-white/10 transition-colors cursor-pointer group min-w-[240px] backdrop-blur-sm shadow-sm", children: [
          /* @__PURE__ */ jsx("span", { className: "text-indigo-500 dark:text-indigo-400", children: "$" }),
          /* @__PURE__ */ jsx("span", { children: "npx indjs create my-app" }),
          /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 ml-auto text-slate-400 dark:text-zinc-500 group-hover:text-slate-900 dark:group-hover:text-white transition-colors", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" }) })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-24 container mx-auto px-6 relative z-10", children: /* @__PURE__ */ jsxs("div", { className: "glass-panel rounded-2xl p-2 md:p-4 animate-fade-in-up animation-delay-300 shadow-2xl bg-slate-900 dark:bg-black/40", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-white/5 rounded-t-xl", children: [
        /* @__PURE__ */ jsx("div", { className: "w-3 h-3 rounded-full bg-[#FF5F56]" }),
        /* @__PURE__ */ jsx("div", { className: "w-3 h-3 rounded-full bg-[#FFBD2E]" }),
        /* @__PURE__ */ jsx("div", { className: "w-3 h-3 rounded-full bg-[#27C93F]" }),
        /* @__PURE__ */ jsx("div", { className: "ml-auto text-xs text-zinc-500 font-mono", children: "pages/index.jsx" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "p-4 md:p-8 font-mono text-sm md:text-base overflow-x-auto bg-[#0d1117] rounded-b-xl text-white", children: [
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
    /* @__PURE__ */ jsx("section", { className: "py-24 bg-slate-50/50 dark:bg-gradient-to-b dark:from-transparent dark:to-black/50 z-10 relative", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-16 animate-fade-in-up", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white", children: "Why INDJS?" }),
        /* @__PURE__ */ jsx("p", { className: "text-slate-600 dark:text-zinc-400 max-w-2xl mx-auto", children: "Everything you need to ship cross-platform apps at the speed of light." })
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
    /* @__PURE__ */ jsx("section", { className: "py-24 container mx-auto px-6 z-10 relative", children: /* @__PURE__ */ jsxs("div", { className: "glass-panel p-8 rounded-2xl text-center bg-white/50 dark:bg-transparent shadow-xl dark:shadow-none", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold mb-8 text-slate-900 dark:text-white", children: "Deploy Anywhere" }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap justify-center gap-4 font-mono text-sm", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-slate-900 dark:bg-black/50 px-6 py-4 rounded-xl border border-white/10 flex items-center gap-3 text-white", children: [
          /* @__PURE__ */ jsx("div", { className: "bg-green-500/20 text-green-400 p-2 rounded", children: "npm run build" }),
          /* @__PURE__ */ jsx("span", { className: "text-zinc-500", children: "\u2192" }),
          /* @__PURE__ */ jsx("span", { className: "text-white", children: ".indjs/static" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-slate-900 dark:bg-black/50 px-6 py-4 rounded-xl border border-white/10 flex items-center gap-3 text-white", children: [
          /* @__PURE__ */ jsx("div", { className: "bg-blue-500/20 text-blue-400 p-2 rounded", children: "npm run desktop:build" }),
          /* @__PURE__ */ jsx("span", { className: "text-zinc-500", children: "\u2192" }),
          /* @__PURE__ */ jsx("span", { className: "text-white", children: "MyApp.exe" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-slate-900 dark:bg-black/50 px-6 py-4 rounded-xl border border-white/10 flex items-center gap-3 text-white", children: [
          /* @__PURE__ */ jsx("div", { className: "bg-purple-500/20 text-purple-400 p-2 rounded", children: "npm run android:dev" }),
          /* @__PURE__ */ jsx("span", { className: "text-zinc-500", children: "\u2192" }),
          /* @__PURE__ */ jsx("span", { className: "text-white", children: "APK" })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs("section", { className: "py-32 text-center z-10 relative overflow-hidden", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-indigo-100/40 dark:from-indigo-900/20 to-transparent pointer-events-none" }),
      /* @__PURE__ */ jsx("h2", { className: "text-4xl md:text-5xl font-bold mb-8 relative z-10 text-slate-900 dark:text-white", children: "Start your journey" }),
      /* @__PURE__ */ jsx("a", { href: "/docs", className: "inline-block px-10 py-4 bg-slate-900 dark:bg-white text-white dark:text-black font-bold rounded-full hover:scale-105 hover:bg-slate-800 dark:hover:bg-zinc-200 transition-all shadow-lg shadow-indigo-500/20 relative z-10", children: "Read the Docs" })
    ] })
  ] });
}
function FeatureCard({ icon, title, desc, delay }) {
  return /* @__PURE__ */ jsxs("div", { className: `p-8 rounded-2xl bg-white/60 dark:bg-white/5 border border-slate-200 dark:border-white/5 backdrop-blur-lg hover:bg-white dark:hover:bg-white/10 transition-all duration-300 group hover:-translate-y-2 animate-fade-in-up cursor-default shadow-sm dark:shadow-none`, style: { animationDelay: `${delay}ms` }, children: [
    /* @__PURE__ */ jsx("div", { className: "text-4xl mb-6 bg-slate-100 dark:bg-white/5 w-16 h-16 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform", children: icon }),
    /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-slate-900 dark:text-white mb-3", children: title }),
    /* @__PURE__ */ jsx("p", { className: "text-slate-600 dark:text-zinc-400 leading-relaxed text-sm", children: desc })
  ] });
}
export {
  Home as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcGFnZXMvaW5kZXguanN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUsIHVzZUVmZmVjdCB9IGZyb20gXCJyZWFjdFwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBIb21lKCkge1xuICBjb25zdCBbbW91bnRlZCwgc2V0TW91bnRlZF0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIHVzZUVmZmVjdCgoKSA9PiBzZXRNb3VudGVkKHRydWUpLCBbXSk7XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cInJlbGF0aXZlIG1pbi1oLXNjcmVlbiBvdmVyZmxvdy1oaWRkZW5cIj5cbiAgICAgIHsvKiBCYWNrZ3JvdW5kIEdyYWRpZW50cyAoRGFyayBNb2RlIE9ubHkpICovfVxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJmaXhlZCBpbnNldC0wIHBvaW50ZXItZXZlbnRzLW5vbmUgaGlkZGVuIGRhcms6YmxvY2tcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSB0b3AtWy0yMCVdIGxlZnQtWy0xMCVdIHctWzEwMDBweF0gaC1bMTAwMHB4XSBiZy1pbmRpZ28tNjAwLzIwIGJsdXItWzEyMHB4XSByb3VuZGVkLWZ1bGwgbWl4LWJsZW5kLXNjcmVlbiBhbmltYXRlLXB1bHNlLXNsb3dcIiAvPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIGJvdHRvbS1bLTIwJV0gcmlnaHQtWy0xMCVdIHctWzgwMHB4XSBoLVs4MDBweF0gYmctcHVycGxlLTYwMC8xMCBibHVyLVsxMDBweF0gcm91bmRlZC1mdWxsIG1peC1ibGVuZC1zY3JlZW5cIiAvPlxuICAgICAgPC9kaXY+XG5cbiAgICAgIHsvKiBCYWNrZ3JvdW5kIEdyYWRpZW50cyAoTGlnaHQgTW9kZSBPbmx5KSAqL31cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZml4ZWQgaW5zZXQtMCBwb2ludGVyLWV2ZW50cy1ub25lIGJsb2NrIGRhcms6aGlkZGVuXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgdG9wLVstMjAlXSBsZWZ0LVstMTAlXSB3LVsxMDAwcHhdIGgtWzEwMDBweF0gYmctaW5kaWdvLTIwMC80MCBibHVyLVsxMjBweF0gcm91bmRlZC1mdWxsIG1peC1ibGVuZC1tdWx0aXBseVwiIC8+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgYm90dG9tLVstMjAlXSByaWdodC1bLTEwJV0gdy1bODAwcHhdIGgtWzgwMHB4XSBiZy1wdXJwbGUtMjAwLzQwIGJsdXItWzEwMHB4XSByb3VuZGVkLWZ1bGwgbWl4LWJsZW5kLW11bHRpcGx5XCIgLz5cbiAgICAgIDwvZGl2PlxuXG5cbiAgICAgIHsvKiBIZXJvIFNlY3Rpb24gKi99XG4gICAgICA8c2VjdGlvbiBjbGFzc05hbWU9XCJyZWxhdGl2ZSBwdC0zMiBwYi0yMCBtZDpwdC00OCBtZDpwYi0zMiBjb250YWluZXIgbXgtYXV0byBweC02IHRleHQtY2VudGVyIHotMTBcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9e2B0cmFuc2l0aW9uLWFsbCBkdXJhdGlvbi0xMDAwIHRyYW5zZm9ybSAke21vdW50ZWQgPyAndHJhbnNsYXRlLXktMCBvcGFjaXR5LTEwMCcgOiAndHJhbnNsYXRlLXktMTAgb3BhY2l0eS0wJ31gfT5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImlubGluZS1mbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiBweC00IHB5LTIgcm91bmRlZC1mdWxsIGJvcmRlciBib3JkZXItaW5kaWdvLTUwMC8zMCBiZy1pbmRpZ28tNTAvNTAgZGFyazpiZy1pbmRpZ28tNTAwLzEwIHRleHQtaW5kaWdvLTYwMCBkYXJrOnRleHQtaW5kaWdvLTMwMCB0ZXh0LXNtIGZvbnQtbWVkaXVtIG1iLTggaG92ZXI6YmctaW5kaWdvLTEwMCBkYXJrOmhvdmVyOmJnLWluZGlnby01MDAvMjAgdHJhbnNpdGlvbi1jb2xvcnMgY3Vyc29yLWRlZmF1bHQgYmFja2Ryb3AtYmx1ci1zbVwiPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicmVsYXRpdmUgZmxleCBoLTIgdy0yXCI+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImFuaW1hdGUtcGluZyBhYnNvbHV0ZSBpbmxpbmUtZmxleCBoLWZ1bGwgdy1mdWxsIHJvdW5kZWQtZnVsbCBiZy1pbmRpZ28tNDAwIG9wYWNpdHktNzVcIj48L3NwYW4+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInJlbGF0aXZlIGlubGluZS1mbGV4IHJvdW5kZWQtZnVsbCBoLTIgdy0yIGJnLWluZGlnby01MDBcIj48L3NwYW4+XG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICB2My4wIFByb2R1Y3Rpb24gUmVhZHlcbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIDxoMSBjbGFzc05hbWU9XCJ0ZXh0LTV4bCBtZDp0ZXh0LTh4bCBmb250LWV4dHJhYm9sZCB0cmFja2luZy10aWdodCB0ZXh0LXNsYXRlLTkwMCBkYXJrOnRleHQtd2hpdGUgbWItOCBsZWFkaW5nLVsxLjFdXCI+XG4gICAgICAgICAgICBPbmUgRnJhbWV3b3JrLiA8YnIgLz5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtdHJhbnNwYXJlbnQgYmctY2xpcC10ZXh0IGJnLWdyYWRpZW50LXRvLXIgZnJvbS1pbmRpZ28tNTAwIHZpYS1wdXJwbGUtNTAwIHRvLXBpbmstNTAwIGRhcms6ZnJvbS1pbmRpZ28tNDAwIGRhcms6dmlhLXB1cnBsZS00MDAgZGFyazp0by1waW5rLTQwMCBhbmltYXRlLWdyYWRpZW50LXhcIj5cbiAgICAgICAgICAgICAgRXZlcnkgUGxhdGZvcm0uXG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgPC9oMT5cblxuICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQteGwgdGV4dC1zbGF0ZS02MDAgZGFyazp0ZXh0LXppbmMtNDAwIG1heC13LTJ4bCBteC1hdXRvIG1iLTEyIGxlYWRpbmctcmVsYXhlZFwiPlxuICAgICAgICAgICAgQnVpbGQgdW5pdmVyc2FsIFJlYWN0IGFwcGxpY2F0aW9ucyBmb3IgV2ViLCBEZXNrdG9wIChFbGVjdHJvbiksIGFuZCBNb2JpbGUgKE5hdGl2ZSlcbiAgICAgICAgICAgIHdpdGggYSBzaW5nbGUgY29kZWJhc2UuXG4gICAgICAgICAgPC9wPlxuXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtY29sIHNtOmZsZXgtcm93IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBnYXAtNlwiPlxuICAgICAgICAgICAgPGFcbiAgICAgICAgICAgICAgaHJlZj1cIi9kb2NzXCJcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiaC0xNCBweC04IHJvdW5kZWQtZnVsbCBiZy1zbGF0ZS05MDAgZGFyazpiZy13aGl0ZSB0ZXh0LXdoaXRlIGRhcms6dGV4dC1ibGFjayBmb250LWJvbGQgdGV4dC1sZyBob3ZlcjpiZy1zbGF0ZS03MDAgZGFyazpob3ZlcjpiZy16aW5jLTIwMCBob3ZlcjpzY2FsZS0xMDUgdHJhbnNpdGlvbi1hbGwgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgbWluLXctWzE4MHB4XSBzaGFkb3ctWzBfMF8yMHB4X3JnYmEoMCwwLDAsMC4xKV0gZGFyazpzaGFkb3ctWzBfMF8yMHB4X3JnYmEoMjU1LDI1NSwyNTUsMC4zKV1cIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICBHZXQgU3RhcnRlZFxuICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJoLTE0IHB4LTggcm91bmRlZC1mdWxsIGJvcmRlciBib3JkZXItc2xhdGUtMjAwIGRhcms6Ym9yZGVyLXdoaXRlLzEwIGJnLXdoaXRlLzUwIGRhcms6Ymctd2hpdGUvNSB0ZXh0LXNsYXRlLTYwMCBkYXJrOnRleHQtemluYy0zMDAgZm9udC1tb25vIHRleHQtc20gZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTQgaG92ZXI6Ymctd2hpdGUgZGFyazpob3ZlcjpiZy13aGl0ZS8xMCB0cmFuc2l0aW9uLWNvbG9ycyBjdXJzb3ItcG9pbnRlciBncm91cCBtaW4tdy1bMjQwcHhdIGJhY2tkcm9wLWJsdXItc20gc2hhZG93LXNtXCI+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtaW5kaWdvLTUwMCBkYXJrOnRleHQtaW5kaWdvLTQwMFwiPiQ8L3NwYW4+XG4gICAgICAgICAgICAgIDxzcGFuPm5weCBpbmRqcyBjcmVhdGUgbXktYXBwPC9zcGFuPlxuICAgICAgICAgICAgICA8c3ZnIGNsYXNzTmFtZT1cInctNSBoLTUgbWwtYXV0byB0ZXh0LXNsYXRlLTQwMCBkYXJrOnRleHQtemluYy01MDAgZ3JvdXAtaG92ZXI6dGV4dC1zbGF0ZS05MDAgZGFyazpncm91cC1ob3Zlcjp0ZXh0LXdoaXRlIHRyYW5zaXRpb24tY29sb3JzXCIgZmlsbD1cIm5vbmVcIiBzdHJva2U9XCJjdXJyZW50Q29sb3JcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCI+PHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIHN0cm9rZVdpZHRoPVwiMlwiIGQ9XCJNOCAxNkg2YTIgMiAwIDAxLTItMlY2YTIgMiAwIDAxMi0yaDhhMiAyIDAgMDEyIDJ2Mm0tNiAxMmg4YTIgMiAwIDAwMi0ydi04YTIgMiAwIDAwLTItMmgtOGEyIDIgMCAwMC0yIDJ2OGEyIDIgMCAwMDIgMnpcIj48L3BhdGg+PC9zdmc+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L3NlY3Rpb24+XG5cbiAgICAgIHsvKiBDb2RlIERlbW8gLSBTY3JvbGwgQW5pbWF0aW9uICovfVxuICAgICAgPHNlY3Rpb24gY2xhc3NOYW1lPVwicHktMjQgY29udGFpbmVyIG14LWF1dG8gcHgtNiByZWxhdGl2ZSB6LTEwXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ2xhc3MtcGFuZWwgcm91bmRlZC0yeGwgcC0yIG1kOnAtNCBhbmltYXRlLWZhZGUtaW4tdXAgYW5pbWF0aW9uLWRlbGF5LTMwMCBzaGFkb3ctMnhsIGJnLXNsYXRlLTkwMCBkYXJrOmJnLWJsYWNrLzQwXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiBweC00IHB5LTMgYm9yZGVyLWIgYm9yZGVyLXdoaXRlLzEwIGJnLXdoaXRlLzUgcm91bmRlZC10LXhsXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInctMyBoLTMgcm91bmRlZC1mdWxsIGJnLVsjRkY1RjU2XVwiIC8+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInctMyBoLTMgcm91bmRlZC1mdWxsIGJnLVsjRkZCRDJFXVwiIC8+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInctMyBoLTMgcm91bmRlZC1mdWxsIGJnLVsjMjdDOTNGXVwiIC8+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1sLWF1dG8gdGV4dC14cyB0ZXh0LXppbmMtNTAwIGZvbnQtbW9ub1wiPnBhZ2VzL2luZGV4LmpzeDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC00IG1kOnAtOCBmb250LW1vbm8gdGV4dC1zbSBtZDp0ZXh0LWJhc2Ugb3ZlcmZsb3cteC1hdXRvIGJnLVsjMGQxMTE3XSByb3VuZGVkLWIteGwgdGV4dC13aGl0ZVwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LXB1cnBsZS00MDBcIj5pbXBvcnQgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC13aGl0ZVwiPlJlYWN0PC9zcGFuPiBmcm9tIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtZ3JlZW4tNDAwXCI+J3JlYWN0Jzwvc3Bhbj47PC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtcHVycGxlLTQwMFwiPmltcG9ydCA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXdoaXRlXCI+e2B7IFNjcmVlbiwgVGV4dCB9YH08L3NwYW4+IGZyb20gPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1ncmVlbi00MDBcIj4naW5kanMnPC9zcGFuPjs8L2Rpdj5cbiAgICAgICAgICAgIDxiciAvPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LWJsdWUtNDAwXCI+ZXhwb3J0IGRlZmF1bHQgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1wdXJwbGUtNDAwXCI+ZnVuY3Rpb248L3NwYW4+IDxzcGFuIGNsYXNzTmFtZT1cInRleHQteWVsbG93LTMwMFwiPlVuaXZlcnNhbEFwcDwvc3Bhbj4oKSB7YHtgfTwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwbC00IHRleHQtemluYy00MDBcIj4vLyBUaGlzIGNvZGUgcnVucyBvbiBXZWIsIEVsZWN0cm9uLCBhbmQgQW5kcm9pZC9pT1M8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGwtNCB0ZXh0LXB1cnBsZS00MDBcIj5yZXR1cm4gKDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwbC04IHRleHQtd2hpdGVcIj48c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LWJsdWUtNDAwXCI+Jmx0O1NjcmVlbiZndDs8L3NwYW4+PC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBsLTEyIHRleHQtd2hpdGVcIj48c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LWJsdWUtNDAwXCI+Jmx0O1RleHQ8L3NwYW4+IDxzcGFuIGNsYXNzTmFtZT1cInRleHQtcHVycGxlLTMwMFwiPmNsYXNzTmFtZTwvc3Bhbj49PHNwYW4gY2xhc3NOYW1lPVwidGV4dC1ncmVlbi00MDBcIj5cInRleHQtMnhsIGZvbnQtYm9sZFwiPC9zcGFuPjxzcGFuIGNsYXNzTmFtZT1cInRleHQtYmx1ZS00MDBcIj4mZ3Q7PC9zcGFuPjwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwbC0xNiB0ZXh0LXdoaXRlIHR5cGUtd3JpdGVyLWVmZmVjdFwiPkhlbGxvIFdvcmxkIFx1RDgzQ1x1REYwRDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwbC0xMiB0ZXh0LXdoaXRlXCI+PHNwYW4gY2xhc3NOYW1lPVwidGV4dC1ibHVlLTQwMFwiPiZsdDsvVGV4dCZndDs8L3NwYW4+PC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBsLTggdGV4dC13aGl0ZVwiPjxzcGFuIGNsYXNzTmFtZT1cInRleHQtYmx1ZS00MDBcIj4mbHQ7L1NjcmVlbiZndDs8L3NwYW4+PC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBsLTQgdGV4dC1wdXJwbGUtNDAwXCI+KTs8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC13aGl0ZVwiPjwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvc2VjdGlvbj5cblxuICAgICAgey8qIEdyaWQgRmVhdHVyZXMgKi99XG4gICAgICA8c2VjdGlvbiBjbGFzc05hbWU9XCJweS0yNCBiZy1zbGF0ZS01MC81MCBkYXJrOmJnLWdyYWRpZW50LXRvLWIgZGFyazpmcm9tLXRyYW5zcGFyZW50IGRhcms6dG8tYmxhY2svNTAgei0xMCByZWxhdGl2ZVwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lciBteC1hdXRvIHB4LTZcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtY2VudGVyIG1iLTE2IGFuaW1hdGUtZmFkZS1pbi11cFwiPlxuICAgICAgICAgICAgPGgyIGNsYXNzTmFtZT1cInRleHQtM3hsIG1kOnRleHQtNXhsIGZvbnQtYm9sZCBtYi02IHRleHQtc2xhdGUtOTAwIGRhcms6dGV4dC13aGl0ZVwiPldoeSBJTkRKUz88L2gyPlxuICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS02MDAgZGFyazp0ZXh0LXppbmMtNDAwIG1heC13LTJ4bCBteC1hdXRvXCI+RXZlcnl0aGluZyB5b3UgbmVlZCB0byBzaGlwIGNyb3NzLXBsYXRmb3JtIGFwcHMgYXQgdGhlIHNwZWVkIG9mIGxpZ2h0LjwvcD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTEgbWQ6Z3JpZC1jb2xzLTIgbGc6Z3JpZC1jb2xzLTMgZ2FwLTZcIj5cbiAgICAgICAgICAgIDxGZWF0dXJlQ2FyZFxuICAgICAgICAgICAgICBkZWxheT1cIjBcIlxuICAgICAgICAgICAgICBpY29uPVwiXHUyNkExXCJcbiAgICAgICAgICAgICAgdGl0bGU9XCJVbml2ZXJzYWwgRW5naW5lXCJcbiAgICAgICAgICAgICAgZGVzYz1cIkEgc2luZ2xlIFJlYWN0IHJ1bnRpbWUgdGhhdCBhZGFwdHMgdG8gRE9NIChXZWIpLCBFbGVjdHJvbiBSZW5kZXJlciAoRGVza3RvcCksIGFuZCBDYXBhY2l0b3IgV2ViVmlldyAoTW9iaWxlKS5cIlxuICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDxGZWF0dXJlQ2FyZFxuICAgICAgICAgICAgICBkZWxheT1cIjEwMFwiXG4gICAgICAgICAgICAgIGljb249XCJcdUQ4M0RcdURDQzJcIlxuICAgICAgICAgICAgICB0aXRsZT1cIkZpbGUtU3lzdGVtIFJvdXRpbmdcIlxuICAgICAgICAgICAgICBkZXNjPVwiQ3JlYXRlIGZpbGVzIGluIGBwYWdlcy9gIGFuZCBsZXQgdGhlIGZyYW1ld29yayBoYW5kbGUgcm91dGluZywgZGVlcCBsaW5raW5nLCBhbmQgbmF2aWdhdGlvbiBzdGFjay5cIlxuICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDxGZWF0dXJlQ2FyZFxuICAgICAgICAgICAgICBkZWxheT1cIjIwMFwiXG4gICAgICAgICAgICAgIGljb249XCJcdUQ4M0NcdURGQThcIlxuICAgICAgICAgICAgICB0aXRsZT1cIlRhaWx3aW5kIE5hdGl2ZVwiXG4gICAgICAgICAgICAgIGRlc2M9XCJXcml0ZSB1dGlsaXR5IGNsYXNzZXMgdGhhdCBjb21waWxlIHRvIG9wdGltaXplZCBDU1MgZm9yIGFsbCBwbGF0Zm9ybXMuXCJcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8RmVhdHVyZUNhcmRcbiAgICAgICAgICAgICAgZGVsYXk9XCIzMDBcIlxuICAgICAgICAgICAgICBpY29uPVwiXHVEODNEXHVERDA0XCJcbiAgICAgICAgICAgICAgdGl0bGU9XCJMaXZlIFJlbG9hZCBFdmVyeXdoZXJlXCJcbiAgICAgICAgICAgICAgZGVzYz1cIlNlZSBjaGFuZ2VzIGluc3RhbnRseSBvbiB5b3VyIGJyb3dzZXIsIGRlc2t0b3Agd2luZG93LCBhbmQgY29ubmVjdGVkIEFuZHJvaWQgZGV2aWNlLlwiXG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAgPEZlYXR1cmVDYXJkXG4gICAgICAgICAgICAgIGRlbGF5PVwiNDAwXCJcbiAgICAgICAgICAgICAgaWNvbj1cIlx1RDgzRFx1RENFNlwiXG4gICAgICAgICAgICAgIHRpdGxlPVwiWmVybyBDb25maWdcIlxuICAgICAgICAgICAgICBkZXNjPVwiTm8gd2VicGFjayBjb25maWcuIE5vIGJhYmVscmMuIEp1c3QgaW5zdGFsbCBhbmQgcnVuLlwiXG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAgPEZlYXR1cmVDYXJkXG4gICAgICAgICAgICAgIGRlbGF5PVwiNTAwXCJcbiAgICAgICAgICAgICAgaWNvbj1cIlx1RDgzRFx1REQxMlwiXG4gICAgICAgICAgICAgIHRpdGxlPVwiRW50ZXJwcmlzZSBSZWFkeVwiXG4gICAgICAgICAgICAgIGRlc2M9XCJUeXBlU2NyaXB0LCBFU0xpbnQsIGFuZCBUZXN0aW5nIChWaXRlc3QvUGxheXdyaWdodCkgcHJlLWNvbmZpZ3VyZWQuXCJcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9zZWN0aW9uPlxuXG4gICAgICB7LyogSW50ZXJhY3RpdmUgVGVybWluYWwgKi99XG4gICAgICA8c2VjdGlvbiBjbGFzc05hbWU9XCJweS0yNCBjb250YWluZXIgbXgtYXV0byBweC02IHotMTAgcmVsYXRpdmVcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJnbGFzcy1wYW5lbCBwLTggcm91bmRlZC0yeGwgdGV4dC1jZW50ZXIgYmctd2hpdGUvNTAgZGFyazpiZy10cmFuc3BhcmVudCBzaGFkb3cteGwgZGFyazpzaGFkb3ctbm9uZVwiPlxuICAgICAgICAgIDxoMiBjbGFzc05hbWU9XCJ0ZXh0LTN4bCBmb250LWJvbGQgbWItOCB0ZXh0LXNsYXRlLTkwMCBkYXJrOnRleHQtd2hpdGVcIj5EZXBsb3kgQW55d2hlcmU8L2gyPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LXdyYXAganVzdGlmeS1jZW50ZXIgZ2FwLTQgZm9udC1tb25vIHRleHQtc21cIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctc2xhdGUtOTAwIGRhcms6YmctYmxhY2svNTAgcHgtNiBweS00IHJvdW5kZWQteGwgYm9yZGVyIGJvcmRlci13aGl0ZS8xMCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMyB0ZXh0LXdoaXRlXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctZ3JlZW4tNTAwLzIwIHRleHQtZ3JlZW4tNDAwIHAtMiByb3VuZGVkXCI+bnBtIHJ1biBidWlsZDwvZGl2PlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXppbmMtNTAwXCI+XHUyMTkyPC9zcGFuPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXdoaXRlXCI+LmluZGpzL3N0YXRpYzwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1zbGF0ZS05MDAgZGFyazpiZy1ibGFjay81MCBweC02IHB5LTQgcm91bmRlZC14bCBib3JkZXIgYm9yZGVyLXdoaXRlLzEwIGZsZXggaXRlbXMtY2VudGVyIGdhcC0zIHRleHQtd2hpdGVcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1ibHVlLTUwMC8yMCB0ZXh0LWJsdWUtNDAwIHAtMiByb3VuZGVkXCI+bnBtIHJ1biBkZXNrdG9wOmJ1aWxkPC9kaXY+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtemluYy01MDBcIj5cdTIxOTI8L3NwYW4+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtd2hpdGVcIj5NeUFwcC5leGU8L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctc2xhdGUtOTAwIGRhcms6YmctYmxhY2svNTAgcHgtNiBweS00IHJvdW5kZWQteGwgYm9yZGVyIGJvcmRlci13aGl0ZS8xMCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMyB0ZXh0LXdoaXRlXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctcHVycGxlLTUwMC8yMCB0ZXh0LXB1cnBsZS00MDAgcC0yIHJvdW5kZWRcIj5ucG0gcnVuIGFuZHJvaWQ6ZGV2PC9kaXY+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtemluYy01MDBcIj5cdTIxOTI8L3NwYW4+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtd2hpdGVcIj5BUEs8L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L3NlY3Rpb24+XG5cbiAgICAgIHsvKiBGb290ZXIgQ1RBICovfVxuICAgICAgPHNlY3Rpb24gY2xhc3NOYW1lPVwicHktMzIgdGV4dC1jZW50ZXIgei0xMCByZWxhdGl2ZSBvdmVyZmxvdy1oaWRkZW5cIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSBpbnNldC0wIGJnLWdyYWRpZW50LXRvLXQgZnJvbS1pbmRpZ28tMTAwLzQwIGRhcms6ZnJvbS1pbmRpZ28tOTAwLzIwIHRvLXRyYW5zcGFyZW50IHBvaW50ZXItZXZlbnRzLW5vbmVcIiAvPlxuICAgICAgICA8aDIgY2xhc3NOYW1lPVwidGV4dC00eGwgbWQ6dGV4dC01eGwgZm9udC1ib2xkIG1iLTggcmVsYXRpdmUgei0xMCB0ZXh0LXNsYXRlLTkwMCBkYXJrOnRleHQtd2hpdGVcIj5TdGFydCB5b3VyIGpvdXJuZXk8L2gyPlxuICAgICAgICA8YSBocmVmPVwiL2RvY3NcIiBjbGFzc05hbWU9XCJpbmxpbmUtYmxvY2sgcHgtMTAgcHktNCBiZy1zbGF0ZS05MDAgZGFyazpiZy13aGl0ZSB0ZXh0LXdoaXRlIGRhcms6dGV4dC1ibGFjayBmb250LWJvbGQgcm91bmRlZC1mdWxsIGhvdmVyOnNjYWxlLTEwNSBob3ZlcjpiZy1zbGF0ZS04MDAgZGFyazpob3ZlcjpiZy16aW5jLTIwMCB0cmFuc2l0aW9uLWFsbCBzaGFkb3ctbGcgc2hhZG93LWluZGlnby01MDAvMjAgcmVsYXRpdmUgei0xMFwiPlxuICAgICAgICAgIFJlYWQgdGhlIERvY3NcbiAgICAgICAgPC9hPlxuICAgICAgPC9zZWN0aW9uPlxuICAgIDwvZGl2PlxuICApO1xufVxuXG5mdW5jdGlvbiBGZWF0dXJlQ2FyZCh7IGljb24sIHRpdGxlLCBkZXNjLCBkZWxheSB9KSB7XG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9e2BwLTggcm91bmRlZC0yeGwgYmctd2hpdGUvNjAgZGFyazpiZy13aGl0ZS81IGJvcmRlciBib3JkZXItc2xhdGUtMjAwIGRhcms6Ym9yZGVyLXdoaXRlLzUgYmFja2Ryb3AtYmx1ci1sZyBob3ZlcjpiZy13aGl0ZSBkYXJrOmhvdmVyOmJnLXdoaXRlLzEwIHRyYW5zaXRpb24tYWxsIGR1cmF0aW9uLTMwMCBncm91cCBob3ZlcjotdHJhbnNsYXRlLXktMiBhbmltYXRlLWZhZGUtaW4tdXAgY3Vyc29yLWRlZmF1bHQgc2hhZG93LXNtIGRhcms6c2hhZG93LW5vbmVgfSBzdHlsZT17eyBhbmltYXRpb25EZWxheTogYCR7ZGVsYXl9bXNgIH19PlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LTR4bCBtYi02IGJnLXNsYXRlLTEwMCBkYXJrOmJnLXdoaXRlLzUgdy0xNiBoLTE2IHJvdW5kZWQteGwgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgZ3JvdXAtaG92ZXI6c2NhbGUtMTEwIHRyYW5zaXRpb24tdHJhbnNmb3JtXCI+e2ljb259PC9kaXY+XG4gICAgICA8aDMgY2xhc3NOYW1lPVwidGV4dC14bCBmb250LWJvbGQgdGV4dC1zbGF0ZS05MDAgZGFyazp0ZXh0LXdoaXRlIG1iLTNcIj57dGl0bGV9PC9oMz5cbiAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtNjAwIGRhcms6dGV4dC16aW5jLTQwMCBsZWFkaW5nLXJlbGF4ZWQgdGV4dC1zbVwiPntkZXNjfTwvcD5cbiAgICA8L2Rpdj5cbiAgKTtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBQSxPQUFPLFNBQVMsVUFBVSxpQkFBaUI7QUFTckMsU0FDRSxLQURGO0FBUFMsU0FBUixPQUF3QjtBQUM3QixRQUFNLENBQUMsU0FBUyxVQUFVLElBQUksU0FBUyxLQUFLO0FBQzVDLFlBQVUsTUFBTSxXQUFXLElBQUksR0FBRyxDQUFDLENBQUM7QUFFcEMsU0FDRSxxQkFBQyxTQUFJLFdBQVUseUNBRWI7QUFBQSx5QkFBQyxTQUFJLFdBQVUsdURBQ2I7QUFBQSwwQkFBQyxTQUFJLFdBQVUsd0lBQXVJO0FBQUEsTUFDdEosb0JBQUMsU0FBSSxXQUFVLHVIQUFzSDtBQUFBLE9BQ3ZJO0FBQUEsSUFHQSxxQkFBQyxTQUFJLFdBQVUsdURBQ2I7QUFBQSwwQkFBQyxTQUFJLFdBQVUsdUhBQXNIO0FBQUEsTUFDckksb0JBQUMsU0FBSSxXQUFVLHlIQUF3SDtBQUFBLE9BQ3pJO0FBQUEsSUFJQSxvQkFBQyxhQUFRLFdBQVUsa0ZBQ2pCLCtCQUFDLFNBQUksV0FBVywwQ0FB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
