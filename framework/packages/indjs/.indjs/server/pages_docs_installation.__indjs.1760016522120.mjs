// pages/docs/installation.jsx
import React from "react";
import { jsx, jsxs } from "react/jsx-runtime";
function Installation() {
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
    section: {
      marginBottom: 32
    },
    h2: {
      fontSize: 24,
      color: "#0b1220",
      marginBottom: 16,
      borderBottom: "2px solid #e2e8f0",
      paddingBottom: 8
    },
    h3: {
      fontSize: 20,
      color: "#0b1220",
      marginBottom: 12,
      marginTop: 24
    },
    p: {
      fontSize: 16,
      color: "#334155",
      lineHeight: 1.6,
      marginBottom: 16
    },
    ul: {
      fontSize: 16,
      color: "#334155",
      lineHeight: 1.6,
      marginBottom: 16,
      paddingLeft: 20
    },
    li: {
      marginBottom: 8
    },
    code: {
      background: "#f1f5f9",
      padding: "2px 6px",
      borderRadius: 4,
      fontSize: 14,
      fontFamily: "monospace"
    },
    codeBlock: {
      background: "#1e293b",
      color: "#e2e8f0",
      padding: 20,
      borderRadius: 8,
      fontSize: 14,
      fontFamily: "monospace",
      overflow: "auto",
      marginBottom: 20,
      lineHeight: 1.5
    },
    warning: {
      background: "#fef3c7",
      border: "1px solid #f59e0b",
      borderRadius: 8,
      padding: 16,
      marginBottom: 20
    },
    warningTitle: {
      fontWeight: 600,
      color: "#92400e",
      marginBottom: 8
    },
    info: {
      background: "#dbeafe",
      border: "1px solid #3b82f6",
      borderRadius: 8,
      padding: 16,
      marginBottom: 20
    },
    infoTitle: {
      fontWeight: 600,
      color: "#1e40af",
      marginBottom: 8
    }
  };
  return /* @__PURE__ */ jsx("main", { style: ui.page, children: /* @__PURE__ */ jsx("div", { style: ui.wrap, children: /* @__PURE__ */ jsxs("section", { style: ui.hero, children: [
    /* @__PURE__ */ jsx("nav", { style: ui.nav, children: /* @__PURE__ */ jsx("a", { href: "/docs", style: ui.backLink, children: "\u2190 Back to Documentation" }) }),
    /* @__PURE__ */ jsx("h1", { style: ui.h1, children: "Installation" }),
    /* @__PURE__ */ jsxs("div", { style: ui.section, children: [
      /* @__PURE__ */ jsx("h2", { style: ui.h2, children: "Quick Start" }),
      /* @__PURE__ */ jsx("p", { style: ui.p, children: "Get started with INDJS in seconds using our create command:" }),
      /* @__PURE__ */ jsx("div", { style: ui.codeBlock, children: `# Create a new INDJS application
npx create-indjs my-app

# Navigate to your project
cd my-app

# Install dependencies
npm install

# Start development server
npm run dev` }),
      /* @__PURE__ */ jsxs("p", { style: ui.p, children: [
        "Your app will be available at ",
        /* @__PURE__ */ jsx("code", { style: ui.code, children: "http://localhost:3000" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { style: ui.section, children: [
      /* @__PURE__ */ jsx("h2", { style: ui.h2, children: "System Requirements" }),
      /* @__PURE__ */ jsxs("ul", { style: ui.ul, children: [
        /* @__PURE__ */ jsxs("li", { style: ui.li, children: [
          /* @__PURE__ */ jsx("strong", { children: "Node.js:" }),
          " Version 16.0.0 or higher"
        ] }),
        /* @__PURE__ */ jsxs("li", { style: ui.li, children: [
          /* @__PURE__ */ jsx("strong", { children: "npm:" }),
          " Version 7.0.0 or higher (or yarn/pnpm)"
        ] }),
        /* @__PURE__ */ jsxs("li", { style: ui.li, children: [
          /* @__PURE__ */ jsx("strong", { children: "Operating System:" }),
          " Windows, macOS, or Linux"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { style: ui.section, children: [
      /* @__PURE__ */ jsx("h2", { style: ui.h2, children: "Manual Installation" }),
      /* @__PURE__ */ jsx("p", { style: ui.p, children: "If you prefer to set up your project manually:" }),
      /* @__PURE__ */ jsx("h3", { style: ui.h3, children: "1. Initialize your project" }),
      /* @__PURE__ */ jsx("div", { style: ui.codeBlock, children: `mkdir my-indjs-app
cd my-indjs-app
npm init -y` }),
      /* @__PURE__ */ jsx("h3", { style: ui.h3, children: "2. Install INDJS" }),
      /* @__PURE__ */ jsx("div", { style: ui.codeBlock, children: `# Install INDJS framework
npm install indjs

# Install React dependencies
npm install react react-dom

# Install development dependencies
npm install --save-dev @types/react @types/react-dom typescript` }),
      /* @__PURE__ */ jsx("h3", { style: ui.h3, children: "3. Update package.json scripts" }),
      /* @__PURE__ */ jsx("div", { style: ui.codeBlock, children: `{
  "scripts": {
    "dev": "indjs dev",
    "build": "indjs build",
    "start": "indjs start",
    "test": "indjs test"
  }
}` }),
      /* @__PURE__ */ jsx("h3", { style: ui.h3, children: "4. Create your first page" }),
      /* @__PURE__ */ jsxs("p", { style: ui.p, children: [
        "Create a ",
        /* @__PURE__ */ jsx("code", { style: ui.code, children: "pages" }),
        " directory and add an ",
        /* @__PURE__ */ jsx("code", { style: ui.code, children: "index.jsx" }),
        " file:"
      ] }),
      /* @__PURE__ */ jsx("div", { style: ui.codeBlock, children: `// pages/index.jsx
import React from 'react';

export default function Home() {
  return (
    <div>
      <h1>Welcome to INDJS!</h1>
      <p>Your app is ready to go.</p>
    </div>
  );
}` })
    ] }),
    /* @__PURE__ */ jsxs("div", { style: ui.section, children: [
      /* @__PURE__ */ jsx("h2", { style: ui.h2, children: "Project Structure" }),
      /* @__PURE__ */ jsx("p", { style: ui.p, children: "After installation, your project will have this structure:" }),
      /* @__PURE__ */ jsx("div", { style: ui.codeBlock, children: `my-indjs-app/
\u251C\u2500\u2500 pages/                 # File-based routing
\u2502   \u251C\u2500\u2500 index.jsx         # Home page (/)
\u2502   \u251C\u2500\u2500 about.jsx         # About page (/about)
\u2502   \u2514\u2500\u2500 api/              # API routes
\u2502       \u2514\u2500\u2500 hello.js      # API endpoint (/api/hello)
\u251C\u2500\u2500 public/               # Static assets
\u2502   \u251C\u2500\u2500 favicon.ico
\u2502   \u2514\u2500\u2500 images/
\u251C\u2500\u2500 styles/               # CSS files
\u2502   \u2514\u2500\u2500 globals.css
\u251C\u2500\u2500 components/           # Reusable components
\u251C\u2500\u2500 .indjs/              # Build output (auto-generated)
\u251C\u2500\u2500 package.json
\u2514\u2500\u2500 README.md` })
    ] }),
    /* @__PURE__ */ jsxs("div", { style: ui.section, children: [
      /* @__PURE__ */ jsx("h2", { style: ui.h2, children: "Configuration" }),
      /* @__PURE__ */ jsxs("p", { style: ui.p, children: [
        "INDJS works out of the box with zero configuration, but you can customize it with an ",
        /* @__PURE__ */ jsx("code", { style: ui.code, children: "indjs.config.js" }),
        " file:"
      ] }),
      /* @__PURE__ */ jsx("div", { style: ui.codeBlock, children: `// indjs.config.js
export default {
  // Custom port for development
  port: 3000,
  
  // Custom build output directory
  outDir: 'dist',
  
  // Enable experimental features
  experimental: {
    devBundler: 'vite', // Use Vite instead of esbuild
    streaming: true,    // Enable React 18 streaming
  },
  
  // Tailwind CSS configuration
  tailwind: {
    enabled: true,
    config: './tailwind.config.js'
  },
  
  // Custom esbuild options
  esbuild: {
    target: 'es2020',
    minify: true
  }
};` })
    ] }),
    /* @__PURE__ */ jsxs("div", { style: ui.info, children: [
      /* @__PURE__ */ jsx("div", { style: ui.infoTitle, children: "\u{1F4A1} Pro Tip" }),
      /* @__PURE__ */ jsxs("p", { style: { margin: 0, fontSize: 14, color: "#1e40af" }, children: [
        "Use ",
        /* @__PURE__ */ jsx("code", { style: ui.code, children: "indjs create" }),
        " with templates: ",
        /* @__PURE__ */ jsx("code", { style: ui.code, children: "npx create-indjs my-app --template blog" }),
        /* @__PURE__ */ jsx("br", {}),
        "Available templates: basic, blog, admin, ecommerce, ai-app, desktop-electron, mobile-capacitor"
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { style: ui.section, children: [
      /* @__PURE__ */ jsx("h2", { style: ui.h2, children: "Next Steps" }),
      /* @__PURE__ */ jsxs("ul", { style: ui.ul, children: [
        /* @__PURE__ */ jsx("li", { style: ui.li, children: /* @__PURE__ */ jsx("a", { href: "/docs/routing", style: { color: "#0ea5e9" }, children: "Learn about file-based routing" }) }),
        /* @__PURE__ */ jsx("li", { style: ui.li, children: /* @__PURE__ */ jsx("a", { href: "/docs/api-routes", style: { color: "#0ea5e9" }, children: "Create your first API route" }) }),
        /* @__PURE__ */ jsx("li", { style: ui.li, children: /* @__PURE__ */ jsx("a", { href: "/docs/styling", style: { color: "#0ea5e9" }, children: "Add styling with Tailwind CSS" }) }),
        /* @__PURE__ */ jsx("li", { style: ui.li, children: /* @__PURE__ */ jsx("a", { href: "/docs/ssr-ssg", style: { color: "#0ea5e9" }, children: "Understand SSR and SSG" }) })
      ] })
    ] })
  ] }) }) });
}
export {
  Installation as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcGFnZXMvZG9jcy9pbnN0YWxsYXRpb24uanN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBJbnN0YWxsYXRpb24oKSB7XG4gIGNvbnN0IHVpID0ge1xuICAgIHBhZ2U6IHtcbiAgICAgIGZvbnRGYW1pbHk6ICdzeXN0ZW0tdWksIC1hcHBsZS1zeXN0ZW0sIFNlZ29lIFVJLCBSb2JvdG8sIEhlbHZldGljYSwgQXJpYWwnLFxuICAgICAgbWluSGVpZ2h0OiAnMTAwdmgnLFxuICAgICAgbWFyZ2luOiAwLFxuICAgICAgYmFja2dyb3VuZDogJ2xpbmVhci1ncmFkaWVudCgxODBkZWcsICMwZWE1ZTkgMCUsICMxMTE4MjcgNjAlKScsXG4gICAgICBjb2xvcjogJyMwZjE3MmEnXG4gICAgfSxcbiAgICB3cmFwOiB7XG4gICAgICBtYXhXaWR0aDogOTgwLFxuICAgICAgbWFyZ2luOiAnMCBhdXRvJyxcbiAgICAgIHBhZGRpbmc6ICc0OHB4IDIwcHgnXG4gICAgfSxcbiAgICBoZXJvOiB7XG4gICAgICBiYWNrZ3JvdW5kOiAnd2hpdGUnLFxuICAgICAgYm9yZGVyUmFkaXVzOiAxNixcbiAgICAgIHBhZGRpbmc6IDI4LFxuICAgICAgYm94U2hhZG93OiAnMCAxMHB4IDMwcHggcmdiYSgwLDAsMCwwLjEyKSdcbiAgICB9LFxuICAgIGgxOiB7XG4gICAgICBmb250U2l6ZTogMzIsXG4gICAgICBsaW5lSGVpZ2h0OiAxLjEsXG4gICAgICBtYXJnaW46IDAsXG4gICAgICBjb2xvcjogJyMwYjEyMjAnXG4gICAgfSxcbiAgICBuYXY6IHtcbiAgICAgIG1hcmdpbkJvdHRvbTogMjBcbiAgICB9LFxuICAgIGJhY2tMaW5rOiB7XG4gICAgICBjb2xvcjogJyMwZWE1ZTknLFxuICAgICAgdGV4dERlY29yYXRpb246ICdub25lJyxcbiAgICAgIGZvbnRTaXplOiAxNFxuICAgIH0sXG4gICAgc2VjdGlvbjoge1xuICAgICAgbWFyZ2luQm90dG9tOiAzMlxuICAgIH0sXG4gICAgaDI6IHtcbiAgICAgIGZvbnRTaXplOiAyNCxcbiAgICAgIGNvbG9yOiAnIzBiMTIyMCcsXG4gICAgICBtYXJnaW5Cb3R0b206IDE2LFxuICAgICAgYm9yZGVyQm90dG9tOiAnMnB4IHNvbGlkICNlMmU4ZjAnLFxuICAgICAgcGFkZGluZ0JvdHRvbTogOFxuICAgIH0sXG4gICAgaDM6IHtcbiAgICAgIGZvbnRTaXplOiAyMCxcbiAgICAgIGNvbG9yOiAnIzBiMTIyMCcsXG4gICAgICBtYXJnaW5Cb3R0b206IDEyLFxuICAgICAgbWFyZ2luVG9wOiAyNFxuICAgIH0sXG4gICAgcDoge1xuICAgICAgZm9udFNpemU6IDE2LFxuICAgICAgY29sb3I6ICcjMzM0MTU1JyxcbiAgICAgIGxpbmVIZWlnaHQ6IDEuNixcbiAgICAgIG1hcmdpbkJvdHRvbTogMTZcbiAgICB9LFxuICAgIHVsOiB7XG4gICAgICBmb250U2l6ZTogMTYsXG4gICAgICBjb2xvcjogJyMzMzQxNTUnLFxuICAgICAgbGluZUhlaWdodDogMS42LFxuICAgICAgbWFyZ2luQm90dG9tOiAxNixcbiAgICAgIHBhZGRpbmdMZWZ0OiAyMFxuICAgIH0sXG4gICAgbGk6IHtcbiAgICAgIG1hcmdpbkJvdHRvbTogOFxuICAgIH0sXG4gICAgY29kZToge1xuICAgICAgYmFja2dyb3VuZDogJyNmMWY1ZjknLFxuICAgICAgcGFkZGluZzogJzJweCA2cHgnLFxuICAgICAgYm9yZGVyUmFkaXVzOiA0LFxuICAgICAgZm9udFNpemU6IDE0LFxuICAgICAgZm9udEZhbWlseTogJ21vbm9zcGFjZSdcbiAgICB9LFxuICAgIGNvZGVCbG9jazoge1xuICAgICAgYmFja2dyb3VuZDogJyMxZTI5M2InLFxuICAgICAgY29sb3I6ICcjZTJlOGYwJyxcbiAgICAgIHBhZGRpbmc6IDIwLFxuICAgICAgYm9yZGVyUmFkaXVzOiA4LFxuICAgICAgZm9udFNpemU6IDE0LFxuICAgICAgZm9udEZhbWlseTogJ21vbm9zcGFjZScsXG4gICAgICBvdmVyZmxvdzogJ2F1dG8nLFxuICAgICAgbWFyZ2luQm90dG9tOiAyMCxcbiAgICAgIGxpbmVIZWlnaHQ6IDEuNVxuICAgIH0sXG4gICAgd2FybmluZzoge1xuICAgICAgYmFja2dyb3VuZDogJyNmZWYzYzcnLFxuICAgICAgYm9yZGVyOiAnMXB4IHNvbGlkICNmNTllMGInLFxuICAgICAgYm9yZGVyUmFkaXVzOiA4LFxuICAgICAgcGFkZGluZzogMTYsXG4gICAgICBtYXJnaW5Cb3R0b206IDIwXG4gICAgfSxcbiAgICB3YXJuaW5nVGl0bGU6IHtcbiAgICAgIGZvbnRXZWlnaHQ6IDYwMCxcbiAgICAgIGNvbG9yOiAnIzkyNDAwZScsXG4gICAgICBtYXJnaW5Cb3R0b206IDhcbiAgICB9LFxuICAgIGluZm86IHtcbiAgICAgIGJhY2tncm91bmQ6ICcjZGJlYWZlJyxcbiAgICAgIGJvcmRlcjogJzFweCBzb2xpZCAjM2I4MmY2JyxcbiAgICAgIGJvcmRlclJhZGl1czogOCxcbiAgICAgIHBhZGRpbmc6IDE2LFxuICAgICAgbWFyZ2luQm90dG9tOiAyMFxuICAgIH0sXG4gICAgaW5mb1RpdGxlOiB7XG4gICAgICBmb250V2VpZ2h0OiA2MDAsXG4gICAgICBjb2xvcjogJyMxZTQwYWYnLFxuICAgICAgbWFyZ2luQm90dG9tOiA4XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiAoXG4gICAgPG1haW4gc3R5bGU9e3VpLnBhZ2V9PlxuICAgICAgPGRpdiBzdHlsZT17dWkud3JhcH0+XG4gICAgICAgIDxzZWN0aW9uIHN0eWxlPXt1aS5oZXJvfT5cbiAgICAgICAgICA8bmF2IHN0eWxlPXt1aS5uYXZ9PlxuICAgICAgICAgICAgPGEgaHJlZj1cIi9kb2NzXCIgc3R5bGU9e3VpLmJhY2tMaW5rfT5cdTIxOTAgQmFjayB0byBEb2N1bWVudGF0aW9uPC9hPlxuICAgICAgICAgIDwvbmF2PlxuICAgICAgICAgIFxuICAgICAgICAgIDxoMSBzdHlsZT17dWkuaDF9Pkluc3RhbGxhdGlvbjwvaDE+XG4gICAgICAgICAgXG4gICAgICAgICAgPGRpdiBzdHlsZT17dWkuc2VjdGlvbn0+XG4gICAgICAgICAgICA8aDIgc3R5bGU9e3VpLmgyfT5RdWljayBTdGFydDwvaDI+XG4gICAgICAgICAgICA8cCBzdHlsZT17dWkucH0+XG4gICAgICAgICAgICAgIEdldCBzdGFydGVkIHdpdGggSU5ESlMgaW4gc2Vjb25kcyB1c2luZyBvdXIgY3JlYXRlIGNvbW1hbmQ6XG4gICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICA8ZGl2IHN0eWxlPXt1aS5jb2RlQmxvY2t9PlxuICAgICAgICAgICAgICB7YCMgQ3JlYXRlIGEgbmV3IElOREpTIGFwcGxpY2F0aW9uXG5ucHggY3JlYXRlLWluZGpzIG15LWFwcFxuXG4jIE5hdmlnYXRlIHRvIHlvdXIgcHJvamVjdFxuY2QgbXktYXBwXG5cbiMgSW5zdGFsbCBkZXBlbmRlbmNpZXNcbm5wbSBpbnN0YWxsXG5cbiMgU3RhcnQgZGV2ZWxvcG1lbnQgc2VydmVyXG5ucG0gcnVuIGRldmB9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxwIHN0eWxlPXt1aS5wfT5cbiAgICAgICAgICAgICAgWW91ciBhcHAgd2lsbCBiZSBhdmFpbGFibGUgYXQgPGNvZGUgc3R5bGU9e3VpLmNvZGV9Pmh0dHA6Ly9sb2NhbGhvc3Q6MzAwMDwvY29kZT5cbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIDxkaXYgc3R5bGU9e3VpLnNlY3Rpb259PlxuICAgICAgICAgICAgPGgyIHN0eWxlPXt1aS5oMn0+U3lzdGVtIFJlcXVpcmVtZW50czwvaDI+XG4gICAgICAgICAgICA8dWwgc3R5bGU9e3VpLnVsfT5cbiAgICAgICAgICAgICAgPGxpIHN0eWxlPXt1aS5saX0+PHN0cm9uZz5Ob2RlLmpzOjwvc3Ryb25nPiBWZXJzaW9uIDE2LjAuMCBvciBoaWdoZXI8L2xpPlxuICAgICAgICAgICAgICA8bGkgc3R5bGU9e3VpLmxpfT48c3Ryb25nPm5wbTo8L3N0cm9uZz4gVmVyc2lvbiA3LjAuMCBvciBoaWdoZXIgKG9yIHlhcm4vcG5wbSk8L2xpPlxuICAgICAgICAgICAgICA8bGkgc3R5bGU9e3VpLmxpfT48c3Ryb25nPk9wZXJhdGluZyBTeXN0ZW06PC9zdHJvbmc+IFdpbmRvd3MsIG1hY09TLCBvciBMaW51eDwvbGk+XG4gICAgICAgICAgICA8L3VsPlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPGRpdiBzdHlsZT17dWkuc2VjdGlvbn0+XG4gICAgICAgICAgICA8aDIgc3R5bGU9e3VpLmgyfT5NYW51YWwgSW5zdGFsbGF0aW9uPC9oMj5cbiAgICAgICAgICAgIDxwIHN0eWxlPXt1aS5wfT5cbiAgICAgICAgICAgICAgSWYgeW91IHByZWZlciB0byBzZXQgdXAgeW91ciBwcm9qZWN0IG1hbnVhbGx5OlxuICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgXG4gICAgICAgICAgICA8aDMgc3R5bGU9e3VpLmgzfT4xLiBJbml0aWFsaXplIHlvdXIgcHJvamVjdDwvaDM+XG4gICAgICAgICAgICA8ZGl2IHN0eWxlPXt1aS5jb2RlQmxvY2t9PlxuICAgICAgICAgICAgICB7YG1rZGlyIG15LWluZGpzLWFwcFxuY2QgbXktaW5kanMtYXBwXG5ucG0gaW5pdCAteWB9XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgPGgzIHN0eWxlPXt1aS5oM30+Mi4gSW5zdGFsbCBJTkRKUzwvaDM+XG4gICAgICAgICAgICA8ZGl2IHN0eWxlPXt1aS5jb2RlQmxvY2t9PlxuICAgICAgICAgICAgICB7YCMgSW5zdGFsbCBJTkRKUyBmcmFtZXdvcmtcbm5wbSBpbnN0YWxsIGluZGpzXG5cbiMgSW5zdGFsbCBSZWFjdCBkZXBlbmRlbmNpZXNcbm5wbSBpbnN0YWxsIHJlYWN0IHJlYWN0LWRvbVxuXG4jIEluc3RhbGwgZGV2ZWxvcG1lbnQgZGVwZW5kZW5jaWVzXG5ucG0gaW5zdGFsbCAtLXNhdmUtZGV2IEB0eXBlcy9yZWFjdCBAdHlwZXMvcmVhY3QtZG9tIHR5cGVzY3JpcHRgfVxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIDxoMyBzdHlsZT17dWkuaDN9PjMuIFVwZGF0ZSBwYWNrYWdlLmpzb24gc2NyaXB0czwvaDM+XG4gICAgICAgICAgICA8ZGl2IHN0eWxlPXt1aS5jb2RlQmxvY2t9PlxuICAgICAgICAgICAgICB7YHtcbiAgXCJzY3JpcHRzXCI6IHtcbiAgICBcImRldlwiOiBcImluZGpzIGRldlwiLFxuICAgIFwiYnVpbGRcIjogXCJpbmRqcyBidWlsZFwiLFxuICAgIFwic3RhcnRcIjogXCJpbmRqcyBzdGFydFwiLFxuICAgIFwidGVzdFwiOiBcImluZGpzIHRlc3RcIlxuICB9XG59YH1cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICA8aDMgc3R5bGU9e3VpLmgzfT40LiBDcmVhdGUgeW91ciBmaXJzdCBwYWdlPC9oMz5cbiAgICAgICAgICAgIDxwIHN0eWxlPXt1aS5wfT5DcmVhdGUgYSA8Y29kZSBzdHlsZT17dWkuY29kZX0+cGFnZXM8L2NvZGU+IGRpcmVjdG9yeSBhbmQgYWRkIGFuIDxjb2RlIHN0eWxlPXt1aS5jb2RlfT5pbmRleC5qc3g8L2NvZGU+IGZpbGU6PC9wPlxuICAgICAgICAgICAgPGRpdiBzdHlsZT17dWkuY29kZUJsb2NrfT5cbiAgICAgICAgICAgICAge2AvLyBwYWdlcy9pbmRleC5qc3hcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEhvbWUoKSB7XG4gIHJldHVybiAoXG4gICAgPGRpdj5cbiAgICAgIDxoMT5XZWxjb21lIHRvIElOREpTITwvaDE+XG4gICAgICA8cD5Zb3VyIGFwcCBpcyByZWFkeSB0byBnby48L3A+XG4gICAgPC9kaXY+XG4gICk7XG59YH1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPGRpdiBzdHlsZT17dWkuc2VjdGlvbn0+XG4gICAgICAgICAgICA8aDIgc3R5bGU9e3VpLmgyfT5Qcm9qZWN0IFN0cnVjdHVyZTwvaDI+XG4gICAgICAgICAgICA8cCBzdHlsZT17dWkucH0+XG4gICAgICAgICAgICAgIEFmdGVyIGluc3RhbGxhdGlvbiwgeW91ciBwcm9qZWN0IHdpbGwgaGF2ZSB0aGlzIHN0cnVjdHVyZTpcbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3VpLmNvZGVCbG9ja30+XG4gICAgICAgICAgICAgIHtgbXktaW5kanMtYXBwL1xuXHUyNTFDXHUyNTAwXHUyNTAwIHBhZ2VzLyAgICAgICAgICAgICAgICAgIyBGaWxlLWJhc2VkIHJvdXRpbmdcblx1MjUwMiAgIFx1MjUxQ1x1MjUwMFx1MjUwMCBpbmRleC5qc3ggICAgICAgICAjIEhvbWUgcGFnZSAoLylcblx1MjUwMiAgIFx1MjUxQ1x1MjUwMFx1MjUwMCBhYm91dC5qc3ggICAgICAgICAjIEFib3V0IHBhZ2UgKC9hYm91dClcblx1MjUwMiAgIFx1MjUxNFx1MjUwMFx1MjUwMCBhcGkvICAgICAgICAgICAgICAjIEFQSSByb3V0ZXNcblx1MjUwMiAgICAgICBcdTI1MTRcdTI1MDBcdTI1MDAgaGVsbG8uanMgICAgICAjIEFQSSBlbmRwb2ludCAoL2FwaS9oZWxsbylcblx1MjUxQ1x1MjUwMFx1MjUwMCBwdWJsaWMvICAgICAgICAgICAgICAgIyBTdGF0aWMgYXNzZXRzXG5cdTI1MDIgICBcdTI1MUNcdTI1MDBcdTI1MDAgZmF2aWNvbi5pY29cblx1MjUwMiAgIFx1MjUxNFx1MjUwMFx1MjUwMCBpbWFnZXMvXG5cdTI1MUNcdTI1MDBcdTI1MDAgc3R5bGVzLyAgICAgICAgICAgICAgICMgQ1NTIGZpbGVzXG5cdTI1MDIgICBcdTI1MTRcdTI1MDBcdTI1MDAgZ2xvYmFscy5jc3Ncblx1MjUxQ1x1MjUwMFx1MjUwMCBjb21wb25lbnRzLyAgICAgICAgICAgIyBSZXVzYWJsZSBjb21wb25lbnRzXG5cdTI1MUNcdTI1MDBcdTI1MDAgLmluZGpzLyAgICAgICAgICAgICAgIyBCdWlsZCBvdXRwdXQgKGF1dG8tZ2VuZXJhdGVkKVxuXHUyNTFDXHUyNTAwXHUyNTAwIHBhY2thZ2UuanNvblxuXHUyNTE0XHUyNTAwXHUyNTAwIFJFQURNRS5tZGB9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIDxkaXYgc3R5bGU9e3VpLnNlY3Rpb259PlxuICAgICAgICAgICAgPGgyIHN0eWxlPXt1aS5oMn0+Q29uZmlndXJhdGlvbjwvaDI+XG4gICAgICAgICAgICA8cCBzdHlsZT17dWkucH0+XG4gICAgICAgICAgICAgIElOREpTIHdvcmtzIG91dCBvZiB0aGUgYm94IHdpdGggemVybyBjb25maWd1cmF0aW9uLCBidXQgeW91IGNhbiBjdXN0b21pemUgaXQgd2l0aCBhbiA8Y29kZSBzdHlsZT17dWkuY29kZX0+aW5kanMuY29uZmlnLmpzPC9jb2RlPiBmaWxlOlxuICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgPGRpdiBzdHlsZT17dWkuY29kZUJsb2NrfT5cbiAgICAgICAgICAgICAge2AvLyBpbmRqcy5jb25maWcuanNcbmV4cG9ydCBkZWZhdWx0IHtcbiAgLy8gQ3VzdG9tIHBvcnQgZm9yIGRldmVsb3BtZW50XG4gIHBvcnQ6IDMwMDAsXG4gIFxuICAvLyBDdXN0b20gYnVpbGQgb3V0cHV0IGRpcmVjdG9yeVxuICBvdXREaXI6ICdkaXN0JyxcbiAgXG4gIC8vIEVuYWJsZSBleHBlcmltZW50YWwgZmVhdHVyZXNcbiAgZXhwZXJpbWVudGFsOiB7XG4gICAgZGV2QnVuZGxlcjogJ3ZpdGUnLCAvLyBVc2UgVml0ZSBpbnN0ZWFkIG9mIGVzYnVpbGRcbiAgICBzdHJlYW1pbmc6IHRydWUsICAgIC8vIEVuYWJsZSBSZWFjdCAxOCBzdHJlYW1pbmdcbiAgfSxcbiAgXG4gIC8vIFRhaWx3aW5kIENTUyBjb25maWd1cmF0aW9uXG4gIHRhaWx3aW5kOiB7XG4gICAgZW5hYmxlZDogdHJ1ZSxcbiAgICBjb25maWc6ICcuL3RhaWx3aW5kLmNvbmZpZy5qcydcbiAgfSxcbiAgXG4gIC8vIEN1c3RvbSBlc2J1aWxkIG9wdGlvbnNcbiAgZXNidWlsZDoge1xuICAgIHRhcmdldDogJ2VzMjAyMCcsXG4gICAgbWluaWZ5OiB0cnVlXG4gIH1cbn07YH1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPGRpdiBzdHlsZT17dWkuaW5mb30+XG4gICAgICAgICAgICA8ZGl2IHN0eWxlPXt1aS5pbmZvVGl0bGV9Plx1RDgzRFx1RENBMSBQcm8gVGlwPC9kaXY+XG4gICAgICAgICAgICA8cCBzdHlsZT17eyBtYXJnaW46IDAsIGZvbnRTaXplOiAxNCwgY29sb3I6ICcjMWU0MGFmJyB9fT5cbiAgICAgICAgICAgICAgVXNlIDxjb2RlIHN0eWxlPXt1aS5jb2RlfT5pbmRqcyBjcmVhdGU8L2NvZGU+IHdpdGggdGVtcGxhdGVzOiA8Y29kZSBzdHlsZT17dWkuY29kZX0+bnB4IGNyZWF0ZS1pbmRqcyBteS1hcHAgLS10ZW1wbGF0ZSBibG9nPC9jb2RlPlxuICAgICAgICAgICAgICA8YnIvPkF2YWlsYWJsZSB0ZW1wbGF0ZXM6IGJhc2ljLCBibG9nLCBhZG1pbiwgZWNvbW1lcmNlLCBhaS1hcHAsIGRlc2t0b3AtZWxlY3Ryb24sIG1vYmlsZS1jYXBhY2l0b3JcbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIDxkaXYgc3R5bGU9e3VpLnNlY3Rpb259PlxuICAgICAgICAgICAgPGgyIHN0eWxlPXt1aS5oMn0+TmV4dCBTdGVwczwvaDI+XG4gICAgICAgICAgICA8dWwgc3R5bGU9e3VpLnVsfT5cbiAgICAgICAgICAgICAgPGxpIHN0eWxlPXt1aS5saX0+PGEgaHJlZj1cIi9kb2NzL3JvdXRpbmdcIiBzdHlsZT17eyBjb2xvcjogJyMwZWE1ZTknIH19PkxlYXJuIGFib3V0IGZpbGUtYmFzZWQgcm91dGluZzwvYT48L2xpPlxuICAgICAgICAgICAgICA8bGkgc3R5bGU9e3VpLmxpfT48YSBocmVmPVwiL2RvY3MvYXBpLXJvdXRlc1wiIHN0eWxlPXt7IGNvbG9yOiAnIzBlYTVlOScgfX0+Q3JlYXRlIHlvdXIgZmlyc3QgQVBJIHJvdXRlPC9hPjwvbGk+XG4gICAgICAgICAgICAgIDxsaSBzdHlsZT17dWkubGl9PjxhIGhyZWY9XCIvZG9jcy9zdHlsaW5nXCIgc3R5bGU9e3sgY29sb3I6ICcjMGVhNWU5JyB9fT5BZGQgc3R5bGluZyB3aXRoIFRhaWx3aW5kIENTUzwvYT48L2xpPlxuICAgICAgICAgICAgICA8bGkgc3R5bGU9e3VpLmxpfT48YSBocmVmPVwiL2RvY3Mvc3NyLXNzZ1wiIHN0eWxlPXt7IGNvbG9yOiAnIzBlYTVlOScgfX0+VW5kZXJzdGFuZCBTU1IgYW5kIFNTRzwvYT48L2xpPlxuICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9zZWN0aW9uPlxuICAgICAgPC9kaXY+XG4gICAgPC9tYWluPlxuICApO1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFBLE9BQU8sV0FBVztBQXFITixjQXVCQSxZQXZCQTtBQW5IRyxTQUFSLGVBQWdDO0FBQ3JDLFFBQU0sS0FBSztBQUFBLElBQ1QsTUFBTTtBQUFBLE1BQ0osWUFBWTtBQUFBLE1BQ1osV0FBVztBQUFBLE1BQ1gsUUFBUTtBQUFBLE1BQ1IsWUFBWTtBQUFBLE1BQ1osT0FBTztBQUFBLElBQ1Q7QUFBQSxJQUNBLE1BQU07QUFBQSxNQUNKLFVBQVU7QUFBQSxNQUNWLFFBQVE7QUFBQSxNQUNSLFNBQVM7QUFBQSxJQUNYO0FBQUEsSUFDQSxNQUFNO0FBQUEsTUFDSixZQUFZO0FBQUEsTUFDWixjQUFjO0FBQUEsTUFDZCxTQUFTO0FBQUEsTUFDVCxXQUFXO0FBQUEsSUFDYjtBQUFBLElBQ0EsSUFBSTtBQUFBLE1BQ0YsVUFBVTtBQUFBLE1BQ1YsWUFBWTtBQUFBLE1BQ1osUUFBUTtBQUFBLE1BQ1IsT0FBTztBQUFBLElBQ1Q7QUFB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
