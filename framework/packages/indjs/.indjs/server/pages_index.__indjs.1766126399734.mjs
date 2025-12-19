// pages/index.jsx
import React from "react";
import { jsx, jsxs } from "react/jsx-runtime";
function Home() {
  return /* @__PURE__ */ jsxs("div", { className: "relative", children: [
    /* @__PURE__ */ jsxs("section", { className: "relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] opacity-30 pointer-events-none", children: /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 blur-[100px] rounded-full mix-blend-screen" }) }),
      /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-6 relative z-10 text-center", children: [
        /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-xs font-medium mb-8 animate-fade-in-up", children: [
          /* @__PURE__ */ jsxs("span", { className: "relative flex h-2 w-2", children: [
            /* @__PURE__ */ jsx("span", { className: "animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" }),
            /* @__PURE__ */ jsx("span", { className: "relative inline-flex rounded-full h-2 w-2 bg-indigo-500" })
          ] }),
          "v3.0 Now Available"
        ] }),
        /* @__PURE__ */ jsxs("h1", { className: "text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-8 leading-[1.1]", children: [
          "One Framework. ",
          /* @__PURE__ */ jsx("br", {}),
          /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400", children: "Every Platform." })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-12 leading-relaxed", children: "Build universal React applications for Web, Desktop (Electron), and Mobile (Native) with a single codebase. Zero config, maximum performance." }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row items-center justify-center gap-4", children: [
          /* @__PURE__ */ jsx(
            "a",
            {
              href: "/docs/installation",
              className: "h-12 px-8 rounded-full bg-white text-black font-semibold text-sm hover:bg-zinc-200 transition-all flex items-center justify-center min-w-[160px]",
              children: "Get Started"
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "h-12 px-8 rounded-full border border-white/10 bg-white/5 text-white font-mono text-sm flex items-center gap-4 hover:bg-white/10 transition-colors cursor-pointer group min-w-[200px]", children: [
            /* @__PURE__ */ jsx("span", { className: "text-zinc-400", children: "$" }),
            /* @__PURE__ */ jsx("span", { children: "npx indjs create my-app" }),
            /* @__PURE__ */ jsx("span", { className: "ml-auto text-zinc-500 group-hover:text-white transition-colors", children: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" }) }) })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("section", { className: "py-24 bg-[#030712]", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-6", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-8", children: [
      /* @__PURE__ */ jsx(
        FeatureCard,
        {
          icon: "\u26A1",
          title: "Universal Build",
          desc: "Target Web (SSR), Desktop (Electron), and Mobile (Capacitor) from one project."
        }
      ),
      /* @__PURE__ */ jsx(
        FeatureCard,
        {
          icon: "\u{1F6E3}\uFE0F",
          title: "File Routing",
          desc: "Intuitive file-system routing for pages and API endpoints. Just create a file."
        }
      ),
      /* @__PURE__ */ jsx(
        FeatureCard,
        {
          icon: "\u{1F3A8}",
          title: "Tailwind Built-in",
          desc: "Zero-config styling with Tailwind CSS. Automatic post-processing included."
        }
      ),
      /* @__PURE__ */ jsx(
        FeatureCard,
        {
          icon: "\u{1F525}",
          title: "Hot Reload",
          desc: "Instant HMR for Web, Desktop, and even Mobile simulators via Metro-like server."
        }
      ),
      /* @__PURE__ */ jsx(
        FeatureCard,
        {
          icon: "\u{1F512}",
          title: "Type Safe",
          desc: "Built for TypeScript first. Strict type checking and huge developer experience."
        }
      ),
      /* @__PURE__ */ jsx(
        FeatureCard,
        {
          icon: "\u{1F680}",
          title: "Deploy Ready",
          desc: "Build static assets ready for Vercel, Netlify, or any static host."
        }
      )
    ] }) }) }),
    /* @__PURE__ */ jsx("section", { className: "py-24 border-t border-white/5", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-16", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold text-white mb-6", children: "Write Once, Run Everywhere" }),
        /* @__PURE__ */ jsx("p", { className: "text-zinc-400 text-lg mb-8 leading-relaxed", children: "Stop maintaining three separate codebases. With INDJS, your React components compile to native Android/iOS views, Electron desktop apps, and performant web pages." }),
        /* @__PURE__ */ jsxs("ul", { className: "space-y-4", children: [
          /* @__PURE__ */ jsx(CheckItem, { text: "Unified API for navigation and data fetching" }),
          /* @__PURE__ */ jsx(CheckItem, { text: "Platform-specific extensions (.web.js, .native.js)" }),
          /* @__PURE__ */ jsx(CheckItem, { text: "Shared state and business logic" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex-1 w-full max-w-lg", children: /* @__PURE__ */ jsxs("div", { className: "rounded-xl overflow-hidden border border-white/10 bg-[#0B0F19] shadow-2xl", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-white/5", children: [
          /* @__PURE__ */ jsx("div", { className: "w-3 h-3 rounded-full bg-red-500" }),
          /* @__PURE__ */ jsx("div", { className: "w-3 h-3 rounded-full bg-yellow-500" }),
          /* @__PURE__ */ jsx("div", { className: "w-3 h-3 rounded-full bg-green-500" }),
          /* @__PURE__ */ jsx("div", { className: "ml-auto text-xs text-zinc-500 font-mono", children: "pages/index.jsx" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "p-6 font-mono text-sm overflow-x-auto", children: [
          /* @__PURE__ */ jsxs("div", { className: "text-pink-500", children: [
            "import ",
            /* @__PURE__ */ jsx("span", { className: "text-white", children: "React" }),
            " from ",
            /* @__PURE__ */ jsx("span", { className: "text-green-400", children: "'react'" }),
            ";"
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "text-pink-500", children: [
            "import ",
            /* @__PURE__ */ jsx("span", { className: "text-white", children: `{ Screen, Text }` }),
            " from ",
            /* @__PURE__ */ jsx("span", { className: "text-green-400", children: "'indjs'" }),
            ";"
          ] }),
          /* @__PURE__ */ jsx("br", {}),
          /* @__PURE__ */ jsxs("div", { className: "text-blue-400", children: [
            "export default ",
            /* @__PURE__ */ jsx("span", { className: "text-pink-500", children: "function" }),
            " ",
            /* @__PURE__ */ jsx("span", { className: "text-yellow-300", children: "Home" }),
            "() ",
            `{`
          ] }),
          /* @__PURE__ */ jsx("div", { className: "pl-4 text-white", children: "return (" }),
          /* @__PURE__ */ jsx("div", { className: "pl-8 text-white", children: /* @__PURE__ */ jsx("span", { className: "text-cyan-400", children: "<Screen>" }) }),
          /* @__PURE__ */ jsxs("div", { className: "pl-12 text-white", children: [
            /* @__PURE__ */ jsx("span", { className: "text-cyan-400", children: "<Text" }),
            " ",
            /* @__PURE__ */ jsx("span", { className: "text-purple-400", children: "className" }),
            "=",
            /* @__PURE__ */ jsx("span", { className: "text-green-400", children: '"text-xl"' }),
            /* @__PURE__ */ jsx("span", { className: "text-cyan-400", children: ">" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "pl-16 text-white", children: "Hello Universal World \u{1F30D}" }),
          /* @__PURE__ */ jsx("div", { className: "pl-12 text-white", children: /* @__PURE__ */ jsx("span", { className: "text-cyan-400", children: "</Text>" }) }),
          /* @__PURE__ */ jsx("div", { className: "pl-8 text-white", children: /* @__PURE__ */ jsx("span", { className: "text-cyan-400", children: "</Screen>" }) }),
          /* @__PURE__ */ jsx("div", { className: "pl-4 text-white", children: ");" }),
          /* @__PURE__ */ jsx("div", { className: "text-white" })
        ] })
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsxs("section", { className: "py-32 relative overflow-hidden", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-[#030712] to-indigo-950/20" }),
      /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto px-6 relative z-10 text-center", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-4xl font-bold text-white mb-6", children: "Ready to start?" }),
        /* @__PURE__ */ jsx("p", { className: "text-zinc-400 text-lg mb-10", children: "Create your first universal application in seconds." }),
        /* @__PURE__ */ jsx("a", { href: "/docs/installation", className: "inline-flex h-14 px-8 items-center justify-center rounded-full bg-white text-black font-bold text-lg hover:scale-105 transition-transform", children: "Build Your App" })
      ] })
    ] })
  ] });
}
function FeatureCard({ icon, title, desc }) {
  return /* @__PURE__ */ jsxs("div", { className: "p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-indigo-500/50 hover:bg-white/10 transition-all group", children: [
    /* @__PURE__ */ jsx("div", { className: "text-4xl mb-4 group-hover:scale-110 transition-transform duration-300", children: icon }),
    /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-white mb-2", children: title }),
    /* @__PURE__ */ jsx("p", { className: "text-zinc-400 leading-relaxed text-sm", children: desc })
  ] });
}
function CheckItem({ text }) {
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 text-zinc-300", children: [
    /* @__PURE__ */ jsx("div", { className: "w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center text-green-500 text-xs", children: "\u2713" }),
    text
  ] });
}
export {
  Home as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcGFnZXMvaW5kZXguanN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEhvbWUoKSB7XG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJyZWxhdGl2ZVwiPlxuICAgICAgey8qIEhlcm8gU2VjdGlvbiAqL31cbiAgICAgIDxzZWN0aW9uIGNsYXNzTmFtZT1cInJlbGF0aXZlIHB0LTMyIHBiLTIwIG1kOnB0LTQ4IG1kOnBiLTMyIG92ZXJmbG93LWhpZGRlblwiPlxuICAgICAgICB7LyogQW1iaWVudCBiYWNrZ3JvdW5kIGVmZmVjdHMgKi99XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgdG9wLTAgbGVmdC0xLzIgLXRyYW5zbGF0ZS14LTEvMiB3LVsxMDAwcHhdIGgtWzUwMHB4XSBvcGFjaXR5LTMwIHBvaW50ZXItZXZlbnRzLW5vbmVcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIGluc2V0LTAgYmctZ3JhZGllbnQtdG8tciBmcm9tLWluZGlnby01MDAgdG8tcHVycGxlLTUwMCBibHVyLVsxMDBweF0gcm91bmRlZC1mdWxsIG1peC1ibGVuZC1zY3JlZW5cIiAvPlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1heC13LTd4bCBteC1hdXRvIHB4LTYgcmVsYXRpdmUgei0xMCB0ZXh0LWNlbnRlclwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaW5saW5lLWZsZXggaXRlbXMtY2VudGVyIGdhcC0yIHB4LTMgcHktMSByb3VuZGVkLWZ1bGwgYm9yZGVyIGJvcmRlci1pbmRpZ28tNTAwLzMwIGJnLWluZGlnby01MDAvMTAgdGV4dC1pbmRpZ28tMzAwIHRleHQteHMgZm9udC1tZWRpdW0gbWItOCBhbmltYXRlLWZhZGUtaW4tdXBcIj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInJlbGF0aXZlIGZsZXggaC0yIHctMlwiPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJhbmltYXRlLXBpbmcgYWJzb2x1dGUgaW5saW5lLWZsZXggaC1mdWxsIHctZnVsbCByb3VuZGVkLWZ1bGwgYmctaW5kaWdvLTQwMCBvcGFjaXR5LTc1XCI+PC9zcGFuPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJyZWxhdGl2ZSBpbmxpbmUtZmxleCByb3VuZGVkLWZ1bGwgaC0yIHctMiBiZy1pbmRpZ28tNTAwXCI+PC9zcGFuPlxuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgdjMuMCBOb3cgQXZhaWxhYmxlXG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8aDEgY2xhc3NOYW1lPVwidGV4dC01eGwgbWQ6dGV4dC03eGwgZm9udC1leHRyYWJvbGQgdHJhY2tpbmctdGlnaHQgdGV4dC13aGl0ZSBtYi04IGxlYWRpbmctWzEuMV1cIj5cbiAgICAgICAgICAgIE9uZSBGcmFtZXdvcmsuIDxiciAvPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC10cmFuc3BhcmVudCBiZy1jbGlwLXRleHQgYmctZ3JhZGllbnQtdG8tciBmcm9tLWluZGlnby00MDAgdmlhLXB1cnBsZS00MDAgdG8tcGluay00MDBcIj5cbiAgICAgICAgICAgICAgRXZlcnkgUGxhdGZvcm0uXG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgPC9oMT5cblxuICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtbGcgbWQ6dGV4dC14bCB0ZXh0LXppbmMtNDAwIG1heC13LTJ4bCBteC1hdXRvIG1iLTEyIGxlYWRpbmctcmVsYXhlZFwiPlxuICAgICAgICAgICAgQnVpbGQgdW5pdmVyc2FsIFJlYWN0IGFwcGxpY2F0aW9ucyBmb3IgV2ViLCBEZXNrdG9wIChFbGVjdHJvbiksIGFuZCBNb2JpbGUgKE5hdGl2ZSlcbiAgICAgICAgICAgIHdpdGggYSBzaW5nbGUgY29kZWJhc2UuIFplcm8gY29uZmlnLCBtYXhpbXVtIHBlcmZvcm1hbmNlLlxuICAgICAgICAgIDwvcD5cblxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbCBzbTpmbGV4LXJvdyBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgZ2FwLTRcIj5cbiAgICAgICAgICAgIDxhXG4gICAgICAgICAgICAgIGhyZWY9XCIvZG9jcy9pbnN0YWxsYXRpb25cIlxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJoLTEyIHB4LTggcm91bmRlZC1mdWxsIGJnLXdoaXRlIHRleHQtYmxhY2sgZm9udC1zZW1pYm9sZCB0ZXh0LXNtIGhvdmVyOmJnLXppbmMtMjAwIHRyYW5zaXRpb24tYWxsIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIG1pbi13LVsxNjBweF1cIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICBHZXQgU3RhcnRlZFxuICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJoLTEyIHB4LTggcm91bmRlZC1mdWxsIGJvcmRlciBib3JkZXItd2hpdGUvMTAgYmctd2hpdGUvNSB0ZXh0LXdoaXRlIGZvbnQtbW9ubyB0ZXh0LXNtIGZsZXggaXRlbXMtY2VudGVyIGdhcC00IGhvdmVyOmJnLXdoaXRlLzEwIHRyYW5zaXRpb24tY29sb3JzIGN1cnNvci1wb2ludGVyIGdyb3VwIG1pbi13LVsyMDBweF1cIj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC16aW5jLTQwMFwiPiQ8L3NwYW4+XG4gICAgICAgICAgICAgIDxzcGFuPm5weCBpbmRqcyBjcmVhdGUgbXktYXBwPC9zcGFuPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJtbC1hdXRvIHRleHQtemluYy01MDAgZ3JvdXAtaG92ZXI6dGV4dC13aGl0ZSB0cmFuc2l0aW9uLWNvbG9yc1wiPlxuICAgICAgICAgICAgICAgIDxzdmcgY2xhc3NOYW1lPVwidy00IGgtNFwiIGZpbGw9XCJub25lXCIgc3Ryb2tlPVwiY3VycmVudENvbG9yXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiPjxwYXRoIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIiBzdHJva2VXaWR0aD1cIjJcIiBkPVwiTTggMTZINmEyIDIgMCAwMS0yLTJWNmEyIDIgMCAwMTItMmg4YTIgMiAwIDAxMiAydjJtLTYgMTJoOGEyIDIgMCAwMDItMnYtOGEyIDIgMCAwMC0yLTJoLThhMiAyIDAgMDAtMiAydjhhMiAyIDAgMDAyIDJ6XCI+PC9wYXRoPjwvc3ZnPlxuICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L3NlY3Rpb24+XG5cbiAgICAgIHsvKiBGZWF0dXJlcyBHcmlkICovfVxuICAgICAgPHNlY3Rpb24gY2xhc3NOYW1lPVwicHktMjQgYmctWyMwMzA3MTJdXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWF4LXctN3hsIG14LWF1dG8gcHgtNlwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMSBtZDpncmlkLWNvbHMtMyBnYXAtOFwiPlxuICAgICAgICAgICAgPEZlYXR1cmVDYXJkXG4gICAgICAgICAgICAgIGljb249XCJcdTI2QTFcIlxuICAgICAgICAgICAgICB0aXRsZT1cIlVuaXZlcnNhbCBCdWlsZFwiXG4gICAgICAgICAgICAgIGRlc2M9XCJUYXJnZXQgV2ViIChTU1IpLCBEZXNrdG9wIChFbGVjdHJvbiksIGFuZCBNb2JpbGUgKENhcGFjaXRvcikgZnJvbSBvbmUgcHJvamVjdC5cIlxuICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDxGZWF0dXJlQ2FyZFxuICAgICAgICAgICAgICBpY29uPVwiXHVEODNEXHVERUUzXHVGRTBGXCJcbiAgICAgICAgICAgICAgdGl0bGU9XCJGaWxlIFJvdXRpbmdcIlxuICAgICAgICAgICAgICBkZXNjPVwiSW50dWl0aXZlIGZpbGUtc3lzdGVtIHJvdXRpbmcgZm9yIHBhZ2VzIGFuZCBBUEkgZW5kcG9pbnRzLiBKdXN0IGNyZWF0ZSBhIGZpbGUuXCJcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8RmVhdHVyZUNhcmRcbiAgICAgICAgICAgICAgaWNvbj1cIlx1RDgzQ1x1REZBOFwiXG4gICAgICAgICAgICAgIHRpdGxlPVwiVGFpbHdpbmQgQnVpbHQtaW5cIlxuICAgICAgICAgICAgICBkZXNjPVwiWmVyby1jb25maWcgc3R5bGluZyB3aXRoIFRhaWx3aW5kIENTUy4gQXV0b21hdGljIHBvc3QtcHJvY2Vzc2luZyBpbmNsdWRlZC5cIlxuICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDxGZWF0dXJlQ2FyZFxuICAgICAgICAgICAgICBpY29uPVwiXHVEODNEXHVERDI1XCJcbiAgICAgICAgICAgICAgdGl0bGU9XCJIb3QgUmVsb2FkXCJcbiAgICAgICAgICAgICAgZGVzYz1cIkluc3RhbnQgSE1SIGZvciBXZWIsIERlc2t0b3AsIGFuZCBldmVuIE1vYmlsZSBzaW11bGF0b3JzIHZpYSBNZXRyby1saWtlIHNlcnZlci5cIlxuICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDxGZWF0dXJlQ2FyZFxuICAgICAgICAgICAgICBpY29uPVwiXHVEODNEXHVERDEyXCJcbiAgICAgICAgICAgICAgdGl0bGU9XCJUeXBlIFNhZmVcIlxuICAgICAgICAgICAgICBkZXNjPVwiQnVpbHQgZm9yIFR5cGVTY3JpcHQgZmlyc3QuIFN0cmljdCB0eXBlIGNoZWNraW5nIGFuZCBodWdlIGRldmVsb3BlciBleHBlcmllbmNlLlwiXG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAgPEZlYXR1cmVDYXJkXG4gICAgICAgICAgICAgIGljb249XCJcdUQ4M0RcdURFODBcIlxuICAgICAgICAgICAgICB0aXRsZT1cIkRlcGxveSBSZWFkeVwiXG4gICAgICAgICAgICAgIGRlc2M9XCJCdWlsZCBzdGF0aWMgYXNzZXRzIHJlYWR5IGZvciBWZXJjZWwsIE5ldGxpZnksIG9yIGFueSBzdGF0aWMgaG9zdC5cIlxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L3NlY3Rpb24+XG5cbiAgICAgIHsvKiBDb2RlIFByZXZpZXcgU2VjdGlvbiAqL31cbiAgICAgIDxzZWN0aW9uIGNsYXNzTmFtZT1cInB5LTI0IGJvcmRlci10IGJvcmRlci13aGl0ZS81XCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWF4LXctN3hsIG14LWF1dG8gcHgtNiBmbGV4IGZsZXgtY29sIG1kOmZsZXgtcm93IGl0ZW1zLWNlbnRlciBnYXAtMTZcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgtMVwiPlxuICAgICAgICAgICAgPGgyIGNsYXNzTmFtZT1cInRleHQtM3hsIGZvbnQtYm9sZCB0ZXh0LXdoaXRlIG1iLTZcIj5Xcml0ZSBPbmNlLCBSdW4gRXZlcnl3aGVyZTwvaDI+XG4gICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXppbmMtNDAwIHRleHQtbGcgbWItOCBsZWFkaW5nLXJlbGF4ZWRcIj5cbiAgICAgICAgICAgICAgU3RvcCBtYWludGFpbmluZyB0aHJlZSBzZXBhcmF0ZSBjb2RlYmFzZXMuIFdpdGggSU5ESlMsIHlvdXIgUmVhY3QgY29tcG9uZW50c1xuICAgICAgICAgICAgICBjb21waWxlIHRvIG5hdGl2ZSBBbmRyb2lkL2lPUyB2aWV3cywgRWxlY3Ryb24gZGVza3RvcCBhcHBzLCBhbmQgcGVyZm9ybWFudCB3ZWIgcGFnZXMuXG4gICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICA8dWwgY2xhc3NOYW1lPVwic3BhY2UteS00XCI+XG4gICAgICAgICAgICAgIDxDaGVja0l0ZW0gdGV4dD1cIlVuaWZpZWQgQVBJIGZvciBuYXZpZ2F0aW9uIGFuZCBkYXRhIGZldGNoaW5nXCIgLz5cbiAgICAgICAgICAgICAgPENoZWNrSXRlbSB0ZXh0PVwiUGxhdGZvcm0tc3BlY2lmaWMgZXh0ZW5zaW9ucyAoLndlYi5qcywgLm5hdGl2ZS5qcylcIiAvPlxuICAgICAgICAgICAgICA8Q2hlY2tJdGVtIHRleHQ9XCJTaGFyZWQgc3RhdGUgYW5kIGJ1c2luZXNzIGxvZ2ljXCIgLz5cbiAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgtMSB3LWZ1bGwgbWF4LXctbGdcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm91bmRlZC14bCBvdmVyZmxvdy1oaWRkZW4gYm9yZGVyIGJvcmRlci13aGl0ZS8xMCBiZy1bIzBCMEYxOV0gc2hhZG93LTJ4bFwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yIHB4LTQgcHktMyBib3JkZXItYiBib3JkZXItd2hpdGUvNSBiZy13aGl0ZS81XCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3LTMgaC0zIHJvdW5kZWQtZnVsbCBiZy1yZWQtNTAwXCIgLz5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInctMyBoLTMgcm91bmRlZC1mdWxsIGJnLXllbGxvdy01MDBcIiAvPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidy0zIGgtMyByb3VuZGVkLWZ1bGwgYmctZ3JlZW4tNTAwXCIgLz5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1sLWF1dG8gdGV4dC14cyB0ZXh0LXppbmMtNTAwIGZvbnQtbW9ub1wiPnBhZ2VzL2luZGV4LmpzeDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTYgZm9udC1tb25vIHRleHQtc20gb3ZlcmZsb3cteC1hdXRvXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LXBpbmstNTAwXCI+aW1wb3J0IDxzcGFuIGNsYXNzTmFtZT1cInRleHQtd2hpdGVcIj5SZWFjdDwvc3Bhbj4gZnJvbSA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LWdyZWVuLTQwMFwiPidyZWFjdCc8L3NwYW4+OzwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1waW5rLTUwMFwiPmltcG9ydCA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXdoaXRlXCI+e2B7IFNjcmVlbiwgVGV4dCB9YH08L3NwYW4+IGZyb20gPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1ncmVlbi00MDBcIj4naW5kanMnPC9zcGFuPjs8L2Rpdj5cbiAgICAgICAgICAgICAgICA8YnIgLz5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtYmx1ZS00MDBcIj5leHBvcnQgZGVmYXVsdCA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXBpbmstNTAwXCI+ZnVuY3Rpb248L3NwYW4+IDxzcGFuIGNsYXNzTmFtZT1cInRleHQteWVsbG93LTMwMFwiPkhvbWU8L3NwYW4+KCkge2B7YH08L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBsLTQgdGV4dC13aGl0ZVwiPnJldHVybiAoPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwbC04IHRleHQtd2hpdGVcIj48c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LWN5YW4tNDAwXCI+Jmx0O1NjcmVlbiZndDs8L3NwYW4+PC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwbC0xMiB0ZXh0LXdoaXRlXCI+PHNwYW4gY2xhc3NOYW1lPVwidGV4dC1jeWFuLTQwMFwiPiZsdDtUZXh0PC9zcGFuPiA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXB1cnBsZS00MDBcIj5jbGFzc05hbWU8L3NwYW4+PTxzcGFuIGNsYXNzTmFtZT1cInRleHQtZ3JlZW4tNDAwXCI+XCJ0ZXh0LXhsXCI8L3NwYW4+PHNwYW4gY2xhc3NOYW1lPVwidGV4dC1jeWFuLTQwMFwiPiZndDs8L3NwYW4+PC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwbC0xNiB0ZXh0LXdoaXRlXCI+SGVsbG8gVW5pdmVyc2FsIFdvcmxkIFx1RDgzQ1x1REYwRDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGwtMTIgdGV4dC13aGl0ZVwiPjxzcGFuIGNsYXNzTmFtZT1cInRleHQtY3lhbi00MDBcIj4mbHQ7L1RleHQmZ3Q7PC9zcGFuPjwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGwtOCB0ZXh0LXdoaXRlXCI+PHNwYW4gY2xhc3NOYW1lPVwidGV4dC1jeWFuLTQwMFwiPiZsdDsvU2NyZWVuJmd0Ozwvc3Bhbj48L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBsLTQgdGV4dC13aGl0ZVwiPik7PC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LXdoaXRlXCI+PC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9zZWN0aW9uPlxuXG4gICAgICB7LyogQ1RBIFNlY3Rpb24gKi99XG4gICAgICA8c2VjdGlvbiBjbGFzc05hbWU9XCJweS0zMiByZWxhdGl2ZSBvdmVyZmxvdy1oaWRkZW5cIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSBpbnNldC0wIGJnLWdyYWRpZW50LXRvLWIgZnJvbS1bIzAzMDcxMl0gdG8taW5kaWdvLTk1MC8yMFwiIC8+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWF4LXctNHhsIG14LWF1dG8gcHgtNiByZWxhdGl2ZSB6LTEwIHRleHQtY2VudGVyXCI+XG4gICAgICAgICAgPGgyIGNsYXNzTmFtZT1cInRleHQtNHhsIGZvbnQtYm9sZCB0ZXh0LXdoaXRlIG1iLTZcIj5SZWFkeSB0byBzdGFydD88L2gyPlxuICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtemluYy00MDAgdGV4dC1sZyBtYi0xMFwiPlxuICAgICAgICAgICAgQ3JlYXRlIHlvdXIgZmlyc3QgdW5pdmVyc2FsIGFwcGxpY2F0aW9uIGluIHNlY29uZHMuXG4gICAgICAgICAgPC9wPlxuICAgICAgICAgIDxhIGhyZWY9XCIvZG9jcy9pbnN0YWxsYXRpb25cIiBjbGFzc05hbWU9XCJpbmxpbmUtZmxleCBoLTE0IHB4LTggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHJvdW5kZWQtZnVsbCBiZy13aGl0ZSB0ZXh0LWJsYWNrIGZvbnQtYm9sZCB0ZXh0LWxnIGhvdmVyOnNjYWxlLTEwNSB0cmFuc2l0aW9uLXRyYW5zZm9ybVwiPlxuICAgICAgICAgICAgQnVpbGQgWW91ciBBcHBcbiAgICAgICAgICA8L2E+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9zZWN0aW9uPlxuICAgIDwvZGl2PlxuICApO1xufVxuXG5mdW5jdGlvbiBGZWF0dXJlQ2FyZCh7IGljb24sIHRpdGxlLCBkZXNjIH0pIHtcbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cInAtNiByb3VuZGVkLTJ4bCBiZy13aGl0ZS81IGJvcmRlciBib3JkZXItd2hpdGUvNSBob3Zlcjpib3JkZXItaW5kaWdvLTUwMC81MCBob3ZlcjpiZy13aGl0ZS8xMCB0cmFuc2l0aW9uLWFsbCBncm91cFwiPlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LTR4bCBtYi00IGdyb3VwLWhvdmVyOnNjYWxlLTExMCB0cmFuc2l0aW9uLXRyYW5zZm9ybSBkdXJhdGlvbi0zMDBcIj57aWNvbn08L2Rpdj5cbiAgICAgIDxoMyBjbGFzc05hbWU9XCJ0ZXh0LXhsIGZvbnQtYm9sZCB0ZXh0LXdoaXRlIG1iLTJcIj57dGl0bGV9PC9oMz5cbiAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtemluYy00MDAgbGVhZGluZy1yZWxheGVkIHRleHQtc21cIj57ZGVzY308L3A+XG4gICAgPC9kaXY+XG4gICk7XG59XG5cbmZ1bmN0aW9uIENoZWNrSXRlbSh7IHRleHQgfSkge1xuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTMgdGV4dC16aW5jLTMwMFwiPlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3LTUgaC01IHJvdW5kZWQtZnVsbCBiZy1ncmVlbi01MDAvMjAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgdGV4dC1ncmVlbi01MDAgdGV4dC14c1wiPlx1MjcxMzwvZGl2PlxuICAgICAge3RleHR9XG4gICAgPC9kaXY+XG4gICk7XG59XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQUEsT0FBTyxXQUFXO0FBU1IsY0FLRSxZQUxGO0FBUEssU0FBUixPQUF3QjtBQUM3QixTQUNFLHFCQUFDLFNBQUksV0FBVSxZQUViO0FBQUEseUJBQUMsYUFBUSxXQUFVLDBEQUVqQjtBQUFBLDBCQUFDLFNBQUksV0FBVSxnR0FDYiw4QkFBQyxTQUFJLFdBQVUsOEdBQTZHLEdBQzlIO0FBQUEsTUFFQSxxQkFBQyxTQUFJLFdBQVUsb0RBQ2I7QUFBQSw2QkFBQyxTQUFJLFdBQVUsa0tBQ2I7QUFBQSwrQkFBQyxVQUFLLFdBQVUseUJBQ2Q7QUFBQSxnQ0FBQyxVQUFLLFdBQVUseUZBQXdGO0FBQUEsWUFDeEcsb0JBQUMsVUFBSyxXQUFVLDJEQUEwRDtBQUFBLGFBQzVFO0FBQUEsVUFBTztBQUFBLFdBRVQ7QUFBQSxRQUVBLHFCQUFDLFFBQUcsV0FBVSxvRkFBbUY7QUFBQTtBQUFBLFVBQ2hGLG9CQUFDLFFBQUc7QUFBQSxVQUNuQixvQkFBQyxVQUFLLFdBQVUsNkZBQTRGLDZCQUU1RztBQUFBLFdBQ0Y7QUFBQSxRQUVBLG9CQUFDLE9BQUUsV0FBVSw0RUFBMkUsMkpBR3hGO0FBQUEsUUFFQSxxQkFBQyxTQUFJLFdBQVUsK0RBQ2I7QUFBQTtBQUFBLFlBQUM7QUFBQTtBQUFBLGNBQ0MsTUFBSztBQUFBLGNBQ0wsV0FBVTtBQUFBLGNBQ1g7QUFBQTtBQUFBLFVBRUQ7QUFBQSxVQUNBLHFCQUFDLFNBQUksV0FBVSx3TEFDYjtBQUFBLGdDQUFDLFVBQUssV0FBVSxpQkFBZ0IsZUFBQztBQUFBLFlBQ2pDLG9CQUFDLFVBQUsscUNBQXVCO0FBQUEsWUFDN0Isb0JBQUMsVUFBSyxXQUFVLGtFQUNkLDhCQUFDLFNBQUksV0FBVSxXQUFVLE1BQUssUUFBTyxRQUFPLGdCQUFlLFNBQVEsYUFBWSw4QkFBQyxVQUFLLGVBQWMsU0FBUSxnQkFBZSxTQUFRLGFBQVksS0FBSSxHQUFFLHlIQUF3SCxHQUFPLEdBQ3JSO0FBQUEsYUFDRjtBQUFBLFdBQ0Y7QUFBQSxTQUNGO0FBQUEsT0FDRjtBQUFBLElBR0Esb0JBQUMsYUFBUSxXQUFVLHNCQUNqQiw4QkFBQyxTQUFJLFdBQVUsMEJBQ2IsK0JBQUMsU0FBSSxXQUFVLHlDQUNiO0FBQUE7QUFBQSxRQUFDO0FBQUE7QUFBQSxVQUNDLE1BQUs7QUFBQSxVQUNMLE9BQU07QUFBQSxVQUNOLE1BQUs7QUFBQTtBQUFBLE1BQ1A7QUFBQSxNQUNBO0FBQUEsUUFBQztBQUFBO0FBQUEsVUFDQyxNQUFLO0FBQUEsVUFDTCxPQUFNO0FBQUEsVUFDTixNQUFLO0FBQUE7QUFBQSxNQUNQO0FBQUEsTUFDQTtBQUFBLFFBQUM7QUFBQTtBQUFBLFVBQ0MsTUFBSztBQUFBLFVBQ0wsT0FBTTtBQUFBLFVBQ04sTUFBSztBQUFBO0FBQUEsTUFDUDtBQUFBLE1BQ0E7QUFBQSxRQUFDO0FBQUE7QUFBQSxVQUNDLE1BQUs7QUFBQSxVQUNMLE9BQU07QUFBQSxVQUNOLE1BQUs7QUFBQTtBQUFBLE1BQ1A7QUFBQSxNQUNBO0FBQUEsUUFBQztBQUFBO0FBQUEsVUFDQyxNQUFLO0FBQUEsVUFDTCxPQUFNO0FBQUEsVUFDTixNQUFLO0FBQUE7QUFBQSxNQUNQO0FBQUEsTUFDQTtBQUFBLFFBQUM7QUFBQTtBQUFBLFVBQ0MsTUFBSztBQUFBLFVBQ0wsT0FBTTtBQUFBLFVBQ04sTUFBSztBQUFBO0FBQUEsTUFDUDtBQUFBLE9BQ0YsR0FDRixHQUNGO0FBQUEsSUFHQSxvQkFBQyxhQUFRLFdBQVUsaUNBQ2pCLCtCQUFDLFNBQUksV0FBVSx3RUFDYjtBQUFBLDJCQUFDLFNBQUksV0FBVSxVQUNiO0FBQUEsNEJBQUMsUUFBRyxXQUFVLHNDQUFxQyx3Q0FBMEI7QUFBQSxRQUM3RSxvQkFBQyxPQUFFLFdBQVUsOENBQTZDLGdMQUcxRDtBQUFBLFFBQ0EscUJBQUMsUUFBRyxXQUFVLGFBQ1o7QUFBQSw4QkFBQyxhQUFVLE1BQUssZ0RBQStDO0FBQUEsVUFDL0Qsb0JBQUMsYUFBVSxNQUFLLHNEQUFxRDtBQUFBLFVBQ3JFLG9CQUFDLGFBQVUsTUFBSyxtQ0FBa0M7QUFBQSxXQUNwRDtBQUFBLFNBQ0Y7QUFBQSxNQUVBLG9CQUFDLFNBQUksV0FBVSwwQkFDYiwrQkFBQyxTQUFJLFdBQVUsNkVBQ2I7QUFBQSw2QkFBQyxTQUFJLFdBQVUsd0VBQ2I7QUFBQSw4QkFBQyxTQUFJLFdBQVUsbUNBQWtDO0FBQUEsVUFDakQsb0JBQUMsU0FBSSxXQUFVLHNDQUFxQztBQUFBLFVBQ3BELG9CQUFDLFNBQUksV0FBVSxxQ0FBb0M7QUFBQSxVQUNuRCxvQkFBQyxTQUFJLFdBQVUsMkNBQTBDLDZCQUFlO0FBQUEsV0FDMUU7QUFBQSxRQUNBLHFCQUFDLFNBQUksV0FBVSx5Q0FDYjtBQUFBLCtCQUFDLFNBQUksV0FBVSxpQkFBZ0I7QUFBQTtBQUFBLFlBQU8sb0JBQUMsVUFBSyxXQUFVLGNBQWEsbUJBQUs7QUFBQSxZQUFPO0FBQUEsWUFBTSxvQkFBQyxVQUFLLFdBQVUsa0JBQWlCLHFCQUFPO0FBQUEsWUFBTztBQUFBLGFBQUM7QUFBQSxVQUNySSxxQkFBQyxTQUFJLFdBQVUsaUJBQWdCO0FBQUE7QUFBQSxZQUFPLG9CQUFDLFVBQUssV0FBVSxjQUFjLDhCQUFtQjtBQUFBLFlBQU87QUFBQSxZQUFNLG9CQUFDLFVBQUssV0FBVSxrQkFBaUIscUJBQU87QUFBQSxZQUFPO0FBQUEsYUFBQztBQUFBLFVBQ3BKLG9CQUFDLFFBQUc7QUFBQSxVQUNKLHFCQUFDLFNBQUksV0FBVSxpQkFBZ0I7QUFBQTtBQUFBLFlBQWUsb0JBQUMsVUFBSyxXQUFVLGlCQUFnQixzQkFBUTtBQUFBLFlBQU87QUFBQSxZQUFDLG9CQUFDLFVBQUssV0FBVSxtQkFBa0Isa0JBQUk7QUFBQSxZQUFPO0FBQUEsWUFBSTtBQUFBLGFBQUk7QUFBQSxVQUNuSixvQkFBQyxTQUFJLFdBQVUsbUJBQWtCLHNCQUFRO0FBQUEsVUFDekMsb0JBQUMsU0FBSSxXQUFVLG1CQUFrQiw4QkFBQyxVQUFLLFdBQVUsaUJBQWdCLHNCQUFjLEdBQU87QUFBQSxVQUN0RixxQkFBQyxTQUFJLFdBQVUsb0JBQW1CO0FBQUEsZ0NBQUMsVUFBSyxXQUFVLGlCQUFnQixtQkFBUTtBQUFBLFlBQU87QUFBQSxZQUFDLG9CQUFDLFVBQUssV0FBVSxtQkFBa0IsdUJBQVM7QUFBQSxZQUFPO0FBQUEsWUFBQyxvQkFBQyxVQUFLLFdBQVUsa0JBQWlCLHVCQUFTO0FBQUEsWUFBTyxvQkFBQyxVQUFLLFdBQVUsaUJBQWdCLGVBQUk7QUFBQSxhQUFPO0FBQUEsVUFDak8sb0JBQUMsU0FBSSxXQUFVLG9CQUFtQiw2Q0FBd0I7QUFBQSxVQUMxRCxvQkFBQyxTQUFJLFdBQVUsb0JBQW1CLDhCQUFDLFVBQUssV0FBVSxpQkFBZ0IscUJBQWEsR0FBTztBQUFBLFVBQ3RGLG9CQUFDLFNBQUksV0FBVSxtQkFBa0IsOEJBQUMsVUFBSyxXQUFVLGlCQUFnQix1QkFBZSxHQUFPO0FBQUEsVUFDdkYsb0JBQUMsU0FBSSxXQUFVLG1CQUFrQixnQkFBRTtBQUFBLFVBQ25DLG9CQUFDLFNBQUksV0FBVSxjQUFhO0FBQUEsV0FDOUI7QUFBQSxTQUNGLEdBQ0Y7QUFBQSxPQUNGLEdBQ0Y7QUFBQSxJQUdBLHFCQUFDLGFBQVEsV0FBVSxrQ0FDakI7QUFBQSwwQkFBQyxTQUFJLFdBQVUscUVBQW9FO0FBQUEsTUFDbkYscUJBQUMsU0FBSSxXQUFVLG9EQUNiO0FBQUEsNEJBQUMsUUFBRyxXQUFVLHNDQUFxQyw2QkFBZTtBQUFBLFFBQ2xFLG9CQUFDLE9BQUUsV0FBVSwrQkFBOEIsaUVBRTNDO0FBQUEsUUFDQSxvQkFBQyxPQUFFLE1BQUssc0JBQXFCLFdBQVUsNklBQTRJLDRCQUVuTDtBQUFBLFNBQ0Y7QUFBQSxPQUNGO0FBQUEsS0FDRjtBQUVKO0FBRUEsU0FBUyxZQUFZLEVBQUUsTUFBTSxPQUFPLEtBQUssR0FBRztBQUMxQyxTQUNFLHFCQUFDLFNBQUksV0FBVSxzSEFDYjtBQUFBLHdCQUFDLFNBQUksV0FBVSx5RUFBeUUsZ0JBQUs7QUFBQSxJQUM3RixvQkFBQyxRQUFHLFdBQVUscUNBQXFDLGlCQUFNO0FBQUEsSUFDekQsb0JBQUMsT0FBRSxXQUFVLHlDQUF5QyxnQkFBSztBQUFBLEtBQzdEO0FBRUo7QUFFQSxTQUFTLFVBQVUsRUFBRSxLQUFLLEdBQUc7QUFDM0IsU0FDRSxxQkFBQyxTQUFJLFdBQVUseUNBQ2I7QUFBQSx3QkFBQyxTQUFJLFdBQVUsZ0dBQStGLG9CQUFDO0FBQUEsSUFDOUc7QUFBQSxLQUNIO0FBRUo7IiwKICAibmFtZXMiOiBbXQp9Cg==
