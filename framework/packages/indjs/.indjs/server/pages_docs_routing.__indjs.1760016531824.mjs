// pages/docs/routing.jsx
import React from "react";
import { jsx, jsxs } from "react/jsx-runtime";
function Routing() {
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
    table: {
      width: "100%",
      borderCollapse: "collapse",
      marginBottom: 20
    },
    th: {
      background: "#f8fafc",
      padding: 12,
      textAlign: "left",
      borderBottom: "2px solid #e2e8f0",
      fontWeight: 600
    },
    td: {
      padding: 12,
      borderBottom: "1px solid #e2e8f0"
    }
  };
  return /* @__PURE__ */ jsx("main", { style: ui.page, children: /* @__PURE__ */ jsx("div", { style: ui.wrap, children: /* @__PURE__ */ jsxs("section", { style: ui.hero, children: [
    /* @__PURE__ */ jsx("nav", { style: ui.nav, children: /* @__PURE__ */ jsx("a", { href: "/docs", style: ui.backLink, children: "\u2190 Back to Documentation" }) }),
    /* @__PURE__ */ jsx("h1", { style: ui.h1, children: "Routing" }),
    /* @__PURE__ */ jsxs("div", { style: ui.section, children: [
      /* @__PURE__ */ jsx("h2", { style: ui.h2, children: "File-based Routing" }),
      /* @__PURE__ */ jsxs("p", { style: ui.p, children: [
        "INDJS uses file-based routing, which means the file structure in your ",
        /* @__PURE__ */ jsx("code", { style: ui.code, children: "pages" }),
        " directory automatically becomes your application's routes. This approach is intuitive and requires zero configuration."
      ] }),
      /* @__PURE__ */ jsxs("table", { style: ui.table, children: [
        /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { children: [
          /* @__PURE__ */ jsx("th", { style: ui.th, children: "File Path" }),
          /* @__PURE__ */ jsx("th", { style: ui.th, children: "Route" }),
          /* @__PURE__ */ jsx("th", { style: ui.th, children: "Description" })
        ] }) }),
        /* @__PURE__ */ jsxs("tbody", { children: [
          /* @__PURE__ */ jsxs("tr", { children: [
            /* @__PURE__ */ jsx("td", { style: ui.td, children: /* @__PURE__ */ jsx("code", { style: ui.code, children: "pages/index.jsx" }) }),
            /* @__PURE__ */ jsx("td", { style: ui.td, children: /* @__PURE__ */ jsx("code", { style: ui.code, children: "/" }) }),
            /* @__PURE__ */ jsx("td", { style: ui.td, children: "Home page" })
          ] }),
          /* @__PURE__ */ jsxs("tr", { children: [
            /* @__PURE__ */ jsx("td", { style: ui.td, children: /* @__PURE__ */ jsx("code", { style: ui.code, children: "pages/about.jsx" }) }),
            /* @__PURE__ */ jsx("td", { style: ui.td, children: /* @__PURE__ */ jsx("code", { style: ui.code, children: "/about" }) }),
            /* @__PURE__ */ jsx("td", { style: ui.td, children: "About page" })
          ] }),
          /* @__PURE__ */ jsxs("tr", { children: [
            /* @__PURE__ */ jsx("td", { style: ui.td, children: /* @__PURE__ */ jsx("code", { style: ui.code, children: "pages/blog/index.jsx" }) }),
            /* @__PURE__ */ jsx("td", { style: ui.td, children: /* @__PURE__ */ jsx("code", { style: ui.code, children: "/blog" }) }),
            /* @__PURE__ */ jsx("td", { style: ui.td, children: "Blog listing page" })
          ] }),
          /* @__PURE__ */ jsxs("tr", { children: [
            /* @__PURE__ */ jsx("td", { style: ui.td, children: /* @__PURE__ */ jsx("code", { style: ui.code, children: "pages/blog/post.jsx" }) }),
            /* @__PURE__ */ jsx("td", { style: ui.td, children: /* @__PURE__ */ jsx("code", { style: ui.code, children: "/blog/post" }) }),
            /* @__PURE__ */ jsx("td", { style: ui.td, children: "Static blog post page" })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { style: ui.section, children: [
      /* @__PURE__ */ jsx("h2", { style: ui.h2, children: "Dynamic Routes" }),
      /* @__PURE__ */ jsxs("p", { style: ui.p, children: [
        "Dynamic routes allow you to create pages that match multiple URLs with parameters. Use square brackets ",
        /* @__PURE__ */ jsx("code", { style: ui.code, children: "[param]" }),
        " in your filename to create dynamic segments."
      ] }),
      /* @__PURE__ */ jsx("h3", { style: ui.h3, children: "Single Dynamic Route" }),
      /* @__PURE__ */ jsx("div", { style: ui.codeBlock, children: `// pages/blog/[slug].jsx
import React from 'react';

export default function BlogPost({ params }) {
  const { slug } = params;
  
  return (
    <div>
      <h1>Blog Post: {slug}</h1>
      <p>This page matches /blog/any-slug-here</p>
    </div>
  );
}

export async function getServerSideProps({ params }) {
  const { slug } = params;
  
  // Fetch data based on the slug
  const post = await fetchBlogPost(slug);
  
  return {
    props: { post }
  };
}` }),
      /* @__PURE__ */ jsx("h3", { style: ui.h3, children: "Multiple Dynamic Segments" }),
      /* @__PURE__ */ jsx("div", { style: ui.codeBlock, children: `// pages/shop/[category]/[product].jsx
export default function Product({ params }) {
  const { category, product } = params;
  
  return (
    <div>
      <h1>Category: {category}</h1>
      <h2>Product: {product}</h2>
    </div>
  );
}

// Matches: /shop/electronics/laptop, /shop/clothing/shirt, etc.` }),
      /* @__PURE__ */ jsx("h3", { style: ui.h3, children: "Catch-all Routes" }),
      /* @__PURE__ */ jsxs("p", { style: ui.p, children: [
        "Use ",
        /* @__PURE__ */ jsx("code", { style: ui.code, children: "[...slug]" }),
        " to catch all remaining path segments:"
      ] }),
      /* @__PURE__ */ jsx("div", { style: ui.codeBlock, children: `// pages/docs/[...slug].jsx
export default function DocsPage({ params }) {
  const { slug } = params; // slug is an array
  
  return (
    <div>
      <h1>Docs Path: {slug.join('/')}</h1>
    </div>
  );
}

// Matches: /docs/getting-started, /docs/api/authentication, etc.` })
    ] }),
    /* @__PURE__ */ jsxs("div", { style: ui.section, children: [
      /* @__PURE__ */ jsx("h2", { style: ui.h2, children: "Navigation" }),
      /* @__PURE__ */ jsxs("p", { style: ui.p, children: [
        "INDJS provides a built-in ",
        /* @__PURE__ */ jsx("code", { style: ui.code, children: "Link" }),
        " component for client-side navigation:"
      ] }),
      /* @__PURE__ */ jsx("div", { style: ui.codeBlock, children: `import React from 'react';
import { Link } from 'indjs';

export default function Navigation() {
  return (
    <nav>
      <Link href="/">Home</Link>
      <Link href="/about">About</Link>
      <Link href="/blog">Blog</Link>
      
      {/* With custom styling */}
      <Link href="/contact" className="btn btn-primary">
        Contact Us
      </Link>
      
      {/* Programmatic navigation */}
      <button onClick={() => router.push('/dashboard')}>
        Go to Dashboard
      </button>
    </nav>
  );
}` }),
      /* @__PURE__ */ jsx("h3", { style: ui.h3, children: "Router Hook" }),
      /* @__PURE__ */ jsx("div", { style: ui.codeBlock, children: `import { useRouter } from 'indjs';

export default function MyComponent() {
  const router = useRouter();
  
  const handleSubmit = async (data) => {
    await saveData(data);
    router.push('/success');
  };
  
  return (
    <div>
      <p>Current path: {router.pathname}</p>
      <p>Query params: {JSON.stringify(router.query)}</p>
      <button onClick={() => router.back()}>Go Back</button>
    </div>
  );
}` })
    ] }),
    /* @__PURE__ */ jsxs("div", { style: ui.section, children: [
      /* @__PURE__ */ jsx("h2", { style: ui.h2, children: "Route Groups" }),
      /* @__PURE__ */ jsxs("p", { style: ui.p, children: [
        "Organize your routes without affecting the URL structure using parentheses ",
        /* @__PURE__ */ jsx("code", { style: ui.code, children: "(group)" }),
        ":"
      ] }),
      /* @__PURE__ */ jsx("div", { style: ui.codeBlock, children: `pages/
\u251C\u2500\u2500 (marketing)/
\u2502   \u251C\u2500\u2500 about.jsx      \u2192 /about
\u2502   \u2514\u2500\u2500 contact.jsx    \u2192 /contact
\u251C\u2500\u2500 (dashboard)/
\u2502   \u251C\u2500\u2500 analytics.jsx  \u2192 /analytics
\u2502   \u2514\u2500\u2500 settings.jsx   \u2192 /settings
\u2514\u2500\u2500 index.jsx          \u2192 /` })
    ] }),
    /* @__PURE__ */ jsxs("div", { style: ui.section, children: [
      /* @__PURE__ */ jsx("h2", { style: ui.h2, children: "Layouts" }),
      /* @__PURE__ */ jsx("p", { style: ui.p, children: "Create shared layouts that wrap multiple pages:" }),
      /* @__PURE__ */ jsx("h3", { style: ui.h3, children: "Root Layout" }),
      /* @__PURE__ */ jsx("div", { style: ui.codeBlock, children: `// pages/_layout.jsx
import React from 'react';

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <title>My INDJS App</title>
      </head>
      <body>
        <header>
          <nav>/* Navigation */</nav>
        </header>
        <main>{children}</main>
        <footer>/* Footer */</footer>
      </body>
    </html>
  );
}` }),
      /* @__PURE__ */ jsx("h3", { style: ui.h3, children: "Nested Layouts" }),
      /* @__PURE__ */ jsx("div", { style: ui.codeBlock, children: `// pages/dashboard/_layout.jsx
export default function DashboardLayout({ children }) {
  return (
    <div className="dashboard">
      <aside>/* Sidebar */</aside>
      <div className="content">{children}</div>
    </div>
  );
}

// pages/dashboard/analytics.jsx will be wrapped by both layouts` })
    ] }),
    /* @__PURE__ */ jsxs("div", { style: ui.section, children: [
      /* @__PURE__ */ jsx("h2", { style: ui.h2, children: "Middleware" }),
      /* @__PURE__ */ jsx("p", { style: ui.p, children: "Add global middleware that runs before every request:" }),
      /* @__PURE__ */ jsx("div", { style: ui.codeBlock, children: `// pages/_middleware.js
export default async function middleware({ req, res, root }) {
  // Authentication check
  if (req.path.startsWith('/dashboard') && !req.user) {
    res.redirect('/login');
    return false; // Stop processing
  }
  
  // Add custom headers
  res.setHeader('X-Custom-Header', 'INDJS');
  
  // Log requests
  console.log(\`\${req.method} \${req.path}\`);
  
  return true; // Continue to page
}` })
    ] }),
    /* @__PURE__ */ jsxs("div", { style: ui.section, children: [
      /* @__PURE__ */ jsx("h2", { style: ui.h2, children: "Advanced Routing Features" }),
      /* @__PURE__ */ jsx("h3", { style: ui.h3, children: "Route Priorities" }),
      /* @__PURE__ */ jsx("p", { style: ui.p, children: "Static routes take precedence over dynamic routes:" }),
      /* @__PURE__ */ jsxs("ul", { style: ui.ul, children: [
        /* @__PURE__ */ jsxs("li", { style: ui.li, children: [
          /* @__PURE__ */ jsx("code", { style: ui.code, children: "pages/blog/featured.jsx" }),
          " \u2192 ",
          /* @__PURE__ */ jsx("code", { style: ui.code, children: "/blog/featured" })
        ] }),
        /* @__PURE__ */ jsxs("li", { style: ui.li, children: [
          /* @__PURE__ */ jsx("code", { style: ui.code, children: "pages/blog/[slug].jsx" }),
          " \u2192 ",
          /* @__PURE__ */ jsx("code", { style: ui.code, children: "/blog/other-posts" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("h3", { style: ui.h3, children: "Optional Catch-all Routes" }),
      /* @__PURE__ */ jsx("div", { style: ui.codeBlock, children: `// pages/shop/[[...slug]].jsx
// Matches: /shop, /shop/category, /shop/category/product

export default function Shop({ params }) {
  const { slug = [] } = params;
  
  if (slug.length === 0) return <ShopHome />;
  if (slug.length === 1) return <Category category={slug[0]} />;
  if (slug.length === 2) return <Product category={slug[0]} product={slug[1]} />;
}` }),
      /* @__PURE__ */ jsx("h3", { style: ui.h3, children: "Route Validation" }),
      /* @__PURE__ */ jsx("div", { style: ui.codeBlock, children: `// pages/user/[id].jsx
export async function getServerSideProps({ params }) {
  const { id } = params;
  
  // Validate ID format
  if (!/^\\d+$/.test(id)) {
    return {
      notFound: true
    };
  }
  
  const user = await fetchUser(id);
  
  if (!user) {
    return {
      notFound: true
    };
  }
  
  return {
    props: { user }
  };
}` })
    ] })
  ] }) }) });
}
export {
  Routing as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcGFnZXMvZG9jcy9yb3V0aW5nLmpzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gUm91dGluZygpIHtcbiAgY29uc3QgdWkgPSB7XG4gICAgcGFnZToge1xuICAgICAgZm9udEZhbWlseTogJ3N5c3RlbS11aSwgLWFwcGxlLXN5c3RlbSwgU2Vnb2UgVUksIFJvYm90bywgSGVsdmV0aWNhLCBBcmlhbCcsXG4gICAgICBtaW5IZWlnaHQ6ICcxMDB2aCcsXG4gICAgICBtYXJnaW46IDAsXG4gICAgICBiYWNrZ3JvdW5kOiAnbGluZWFyLWdyYWRpZW50KDE4MGRlZywgIzBlYTVlOSAwJSwgIzExMTgyNyA2MCUpJyxcbiAgICAgIGNvbG9yOiAnIzBmMTcyYSdcbiAgICB9LFxuICAgIHdyYXA6IHtcbiAgICAgIG1heFdpZHRoOiA5ODAsXG4gICAgICBtYXJnaW46ICcwIGF1dG8nLFxuICAgICAgcGFkZGluZzogJzQ4cHggMjBweCdcbiAgICB9LFxuICAgIGhlcm86IHtcbiAgICAgIGJhY2tncm91bmQ6ICd3aGl0ZScsXG4gICAgICBib3JkZXJSYWRpdXM6IDE2LFxuICAgICAgcGFkZGluZzogMjgsXG4gICAgICBib3hTaGFkb3c6ICcwIDEwcHggMzBweCByZ2JhKDAsMCwwLDAuMTIpJ1xuICAgIH0sXG4gICAgaDE6IHtcbiAgICAgIGZvbnRTaXplOiAzMixcbiAgICAgIGxpbmVIZWlnaHQ6IDEuMSxcbiAgICAgIG1hcmdpbjogMCxcbiAgICAgIGNvbG9yOiAnIzBiMTIyMCdcbiAgICB9LFxuICAgIG5hdjoge1xuICAgICAgbWFyZ2luQm90dG9tOiAyMFxuICAgIH0sXG4gICAgYmFja0xpbms6IHtcbiAgICAgIGNvbG9yOiAnIzBlYTVlOScsXG4gICAgICB0ZXh0RGVjb3JhdGlvbjogJ25vbmUnLFxuICAgICAgZm9udFNpemU6IDE0XG4gICAgfSxcbiAgICBzZWN0aW9uOiB7XG4gICAgICBtYXJnaW5Cb3R0b206IDMyXG4gICAgfSxcbiAgICBoMjoge1xuICAgICAgZm9udFNpemU6IDI0LFxuICAgICAgY29sb3I6ICcjMGIxMjIwJyxcbiAgICAgIG1hcmdpbkJvdHRvbTogMTYsXG4gICAgICBib3JkZXJCb3R0b206ICcycHggc29saWQgI2UyZThmMCcsXG4gICAgICBwYWRkaW5nQm90dG9tOiA4XG4gICAgfSxcbiAgICBoMzoge1xuICAgICAgZm9udFNpemU6IDIwLFxuICAgICAgY29sb3I6ICcjMGIxMjIwJyxcbiAgICAgIG1hcmdpbkJvdHRvbTogMTIsXG4gICAgICBtYXJnaW5Ub3A6IDI0XG4gICAgfSxcbiAgICBwOiB7XG4gICAgICBmb250U2l6ZTogMTYsXG4gICAgICBjb2xvcjogJyMzMzQxNTUnLFxuICAgICAgbGluZUhlaWdodDogMS42LFxuICAgICAgbWFyZ2luQm90dG9tOiAxNlxuICAgIH0sXG4gICAgdWw6IHtcbiAgICAgIGZvbnRTaXplOiAxNixcbiAgICAgIGNvbG9yOiAnIzMzNDE1NScsXG4gICAgICBsaW5lSGVpZ2h0OiAxLjYsXG4gICAgICBtYXJnaW5Cb3R0b206IDE2LFxuICAgICAgcGFkZGluZ0xlZnQ6IDIwXG4gICAgfSxcbiAgICBsaToge1xuICAgICAgbWFyZ2luQm90dG9tOiA4XG4gICAgfSxcbiAgICBjb2RlOiB7XG4gICAgICBiYWNrZ3JvdW5kOiAnI2YxZjVmOScsXG4gICAgICBwYWRkaW5nOiAnMnB4IDZweCcsXG4gICAgICBib3JkZXJSYWRpdXM6IDQsXG4gICAgICBmb250U2l6ZTogMTQsXG4gICAgICBmb250RmFtaWx5OiAnbW9ub3NwYWNlJ1xuICAgIH0sXG4gICAgY29kZUJsb2NrOiB7XG4gICAgICBiYWNrZ3JvdW5kOiAnIzFlMjkzYicsXG4gICAgICBjb2xvcjogJyNlMmU4ZjAnLFxuICAgICAgcGFkZGluZzogMjAsXG4gICAgICBib3JkZXJSYWRpdXM6IDgsXG4gICAgICBmb250U2l6ZTogMTQsXG4gICAgICBmb250RmFtaWx5OiAnbW9ub3NwYWNlJyxcbiAgICAgIG92ZXJmbG93OiAnYXV0bycsXG4gICAgICBtYXJnaW5Cb3R0b206IDIwLFxuICAgICAgbGluZUhlaWdodDogMS41XG4gICAgfSxcbiAgICB0YWJsZToge1xuICAgICAgd2lkdGg6ICcxMDAlJyxcbiAgICAgIGJvcmRlckNvbGxhcHNlOiAnY29sbGFwc2UnLFxuICAgICAgbWFyZ2luQm90dG9tOiAyMFxuICAgIH0sXG4gICAgdGg6IHtcbiAgICAgIGJhY2tncm91bmQ6ICcjZjhmYWZjJyxcbiAgICAgIHBhZGRpbmc6IDEyLFxuICAgICAgdGV4dEFsaWduOiAnbGVmdCcsXG4gICAgICBib3JkZXJCb3R0b206ICcycHggc29saWQgI2UyZThmMCcsXG4gICAgICBmb250V2VpZ2h0OiA2MDBcbiAgICB9LFxuICAgIHRkOiB7XG4gICAgICBwYWRkaW5nOiAxMixcbiAgICAgIGJvcmRlckJvdHRvbTogJzFweCBzb2xpZCAjZTJlOGYwJ1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gKFxuICAgIDxtYWluIHN0eWxlPXt1aS5wYWdlfT5cbiAgICAgIDxkaXYgc3R5bGU9e3VpLndyYXB9PlxuICAgICAgICA8c2VjdGlvbiBzdHlsZT17dWkuaGVyb30+XG4gICAgICAgICAgPG5hdiBzdHlsZT17dWkubmF2fT5cbiAgICAgICAgICAgIDxhIGhyZWY9XCIvZG9jc1wiIHN0eWxlPXt1aS5iYWNrTGlua30+XHUyMTkwIEJhY2sgdG8gRG9jdW1lbnRhdGlvbjwvYT5cbiAgICAgICAgICA8L25hdj5cbiAgICAgICAgICBcbiAgICAgICAgICA8aDEgc3R5bGU9e3VpLmgxfT5Sb3V0aW5nPC9oMT5cbiAgICAgICAgICBcbiAgICAgICAgICA8ZGl2IHN0eWxlPXt1aS5zZWN0aW9ufT5cbiAgICAgICAgICAgIDxoMiBzdHlsZT17dWkuaDJ9PkZpbGUtYmFzZWQgUm91dGluZzwvaDI+XG4gICAgICAgICAgICA8cCBzdHlsZT17dWkucH0+XG4gICAgICAgICAgICAgIElOREpTIHVzZXMgZmlsZS1iYXNlZCByb3V0aW5nLCB3aGljaCBtZWFucyB0aGUgZmlsZSBzdHJ1Y3R1cmUgaW4geW91ciA8Y29kZSBzdHlsZT17dWkuY29kZX0+cGFnZXM8L2NvZGU+IGRpcmVjdG9yeSBcbiAgICAgICAgICAgICAgYXV0b21hdGljYWxseSBiZWNvbWVzIHlvdXIgYXBwbGljYXRpb24ncyByb3V0ZXMuIFRoaXMgYXBwcm9hY2ggaXMgaW50dWl0aXZlIGFuZCByZXF1aXJlcyB6ZXJvIGNvbmZpZ3VyYXRpb24uXG4gICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIDx0YWJsZSBzdHlsZT17dWkudGFibGV9PlxuICAgICAgICAgICAgICA8dGhlYWQ+XG4gICAgICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgICAgPHRoIHN0eWxlPXt1aS50aH0+RmlsZSBQYXRoPC90aD5cbiAgICAgICAgICAgICAgICAgIDx0aCBzdHlsZT17dWkudGh9PlJvdXRlPC90aD5cbiAgICAgICAgICAgICAgICAgIDx0aCBzdHlsZT17dWkudGh9PkRlc2NyaXB0aW9uPC90aD5cbiAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICA8L3RoZWFkPlxuICAgICAgICAgICAgICA8dGJvZHk+XG4gICAgICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXt1aS50ZH0+PGNvZGUgc3R5bGU9e3VpLmNvZGV9PnBhZ2VzL2luZGV4LmpzeDwvY29kZT48L3RkPlxuICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXt1aS50ZH0+PGNvZGUgc3R5bGU9e3VpLmNvZGV9Pi88L2NvZGU+PC90ZD5cbiAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17dWkudGR9PkhvbWUgcGFnZTwvdGQ+XG4gICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3VpLnRkfT48Y29kZSBzdHlsZT17dWkuY29kZX0+cGFnZXMvYWJvdXQuanN4PC9jb2RlPjwvdGQ+XG4gICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3VpLnRkfT48Y29kZSBzdHlsZT17dWkuY29kZX0+L2Fib3V0PC9jb2RlPjwvdGQ+XG4gICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3VpLnRkfT5BYm91dCBwYWdlPC90ZD5cbiAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17dWkudGR9Pjxjb2RlIHN0eWxlPXt1aS5jb2RlfT5wYWdlcy9ibG9nL2luZGV4LmpzeDwvY29kZT48L3RkPlxuICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXt1aS50ZH0+PGNvZGUgc3R5bGU9e3VpLmNvZGV9Pi9ibG9nPC9jb2RlPjwvdGQ+XG4gICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3VpLnRkfT5CbG9nIGxpc3RpbmcgcGFnZTwvdGQ+XG4gICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3VpLnRkfT48Y29kZSBzdHlsZT17dWkuY29kZX0+cGFnZXMvYmxvZy9wb3N0LmpzeDwvY29kZT48L3RkPlxuICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXt1aS50ZH0+PGNvZGUgc3R5bGU9e3VpLmNvZGV9Pi9ibG9nL3Bvc3Q8L2NvZGU+PC90ZD5cbiAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17dWkudGR9PlN0YXRpYyBibG9nIHBvc3QgcGFnZTwvdGQ+XG4gICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgPC90Ym9keT5cbiAgICAgICAgICAgIDwvdGFibGU+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8ZGl2IHN0eWxlPXt1aS5zZWN0aW9ufT5cbiAgICAgICAgICAgIDxoMiBzdHlsZT17dWkuaDJ9PkR5bmFtaWMgUm91dGVzPC9oMj5cbiAgICAgICAgICAgIDxwIHN0eWxlPXt1aS5wfT5cbiAgICAgICAgICAgICAgRHluYW1pYyByb3V0ZXMgYWxsb3cgeW91IHRvIGNyZWF0ZSBwYWdlcyB0aGF0IG1hdGNoIG11bHRpcGxlIFVSTHMgd2l0aCBwYXJhbWV0ZXJzLiBcbiAgICAgICAgICAgICAgVXNlIHNxdWFyZSBicmFja2V0cyA8Y29kZSBzdHlsZT17dWkuY29kZX0+W3BhcmFtXTwvY29kZT4gaW4geW91ciBmaWxlbmFtZSB0byBjcmVhdGUgZHluYW1pYyBzZWdtZW50cy5cbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgPGgzIHN0eWxlPXt1aS5oM30+U2luZ2xlIER5bmFtaWMgUm91dGU8L2gzPlxuICAgICAgICAgICAgPGRpdiBzdHlsZT17dWkuY29kZUJsb2NrfT5cbiAgICAgICAgICAgICAge2AvLyBwYWdlcy9ibG9nL1tzbHVnXS5qc3hcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEJsb2dQb3N0KHsgcGFyYW1zIH0pIHtcbiAgY29uc3QgeyBzbHVnIH0gPSBwYXJhbXM7XG4gIFxuICByZXR1cm4gKFxuICAgIDxkaXY+XG4gICAgICA8aDE+QmxvZyBQb3N0OiB7c2x1Z308L2gxPlxuICAgICAgPHA+VGhpcyBwYWdlIG1hdGNoZXMgL2Jsb2cvYW55LXNsdWctaGVyZTwvcD5cbiAgICA8L2Rpdj5cbiAgKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFNlcnZlclNpZGVQcm9wcyh7IHBhcmFtcyB9KSB7XG4gIGNvbnN0IHsgc2x1ZyB9ID0gcGFyYW1zO1xuICBcbiAgLy8gRmV0Y2ggZGF0YSBiYXNlZCBvbiB0aGUgc2x1Z1xuICBjb25zdCBwb3N0ID0gYXdhaXQgZmV0Y2hCbG9nUG9zdChzbHVnKTtcbiAgXG4gIHJldHVybiB7XG4gICAgcHJvcHM6IHsgcG9zdCB9XG4gIH07XG59YH1cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICA8aDMgc3R5bGU9e3VpLmgzfT5NdWx0aXBsZSBEeW5hbWljIFNlZ21lbnRzPC9oMz5cbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3VpLmNvZGVCbG9ja30+XG4gICAgICAgICAgICAgIHtgLy8gcGFnZXMvc2hvcC9bY2F0ZWdvcnldL1twcm9kdWN0XS5qc3hcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFByb2R1Y3QoeyBwYXJhbXMgfSkge1xuICBjb25zdCB7IGNhdGVnb3J5LCBwcm9kdWN0IH0gPSBwYXJhbXM7XG4gIFxuICByZXR1cm4gKFxuICAgIDxkaXY+XG4gICAgICA8aDE+Q2F0ZWdvcnk6IHtjYXRlZ29yeX08L2gxPlxuICAgICAgPGgyPlByb2R1Y3Q6IHtwcm9kdWN0fTwvaDI+XG4gICAgPC9kaXY+XG4gICk7XG59XG5cbi8vIE1hdGNoZXM6IC9zaG9wL2VsZWN0cm9uaWNzL2xhcHRvcCwgL3Nob3AvY2xvdGhpbmcvc2hpcnQsIGV0Yy5gfVxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIDxoMyBzdHlsZT17dWkuaDN9PkNhdGNoLWFsbCBSb3V0ZXM8L2gzPlxuICAgICAgICAgICAgPHAgc3R5bGU9e3VpLnB9PlVzZSA8Y29kZSBzdHlsZT17dWkuY29kZX0+Wy4uLnNsdWddPC9jb2RlPiB0byBjYXRjaCBhbGwgcmVtYWluaW5nIHBhdGggc2VnbWVudHM6PC9wPlxuICAgICAgICAgICAgPGRpdiBzdHlsZT17dWkuY29kZUJsb2NrfT5cbiAgICAgICAgICAgICAge2AvLyBwYWdlcy9kb2NzL1suLi5zbHVnXS5qc3hcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIERvY3NQYWdlKHsgcGFyYW1zIH0pIHtcbiAgY29uc3QgeyBzbHVnIH0gPSBwYXJhbXM7IC8vIHNsdWcgaXMgYW4gYXJyYXlcbiAgXG4gIHJldHVybiAoXG4gICAgPGRpdj5cbiAgICAgIDxoMT5Eb2NzIFBhdGg6IHtzbHVnLmpvaW4oJy8nKX08L2gxPlxuICAgIDwvZGl2PlxuICApO1xufVxuXG4vLyBNYXRjaGVzOiAvZG9jcy9nZXR0aW5nLXN0YXJ0ZWQsIC9kb2NzL2FwaS9hdXRoZW50aWNhdGlvbiwgZXRjLmB9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIDxkaXYgc3R5bGU9e3VpLnNlY3Rpb259PlxuICAgICAgICAgICAgPGgyIHN0eWxlPXt1aS5oMn0+TmF2aWdhdGlvbjwvaDI+XG4gICAgICAgICAgICA8cCBzdHlsZT17dWkucH0+XG4gICAgICAgICAgICAgIElOREpTIHByb3ZpZGVzIGEgYnVpbHQtaW4gPGNvZGUgc3R5bGU9e3VpLmNvZGV9Pkxpbms8L2NvZGU+IGNvbXBvbmVudCBmb3IgY2xpZW50LXNpZGUgbmF2aWdhdGlvbjpcbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgPGRpdiBzdHlsZT17dWkuY29kZUJsb2NrfT5cbiAgICAgICAgICAgICAge2BpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgTGluayB9IGZyb20gJ2luZGpzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gTmF2aWdhdGlvbigpIHtcbiAgcmV0dXJuIChcbiAgICA8bmF2PlxuICAgICAgPExpbmsgaHJlZj1cIi9cIj5Ib21lPC9MaW5rPlxuICAgICAgPExpbmsgaHJlZj1cIi9hYm91dFwiPkFib3V0PC9MaW5rPlxuICAgICAgPExpbmsgaHJlZj1cIi9ibG9nXCI+QmxvZzwvTGluaz5cbiAgICAgIFxuICAgICAgey8qIFdpdGggY3VzdG9tIHN0eWxpbmcgKi99XG4gICAgICA8TGluayBocmVmPVwiL2NvbnRhY3RcIiBjbGFzc05hbWU9XCJidG4gYnRuLXByaW1hcnlcIj5cbiAgICAgICAgQ29udGFjdCBVc1xuICAgICAgPC9MaW5rPlxuICAgICAgXG4gICAgICB7LyogUHJvZ3JhbW1hdGljIG5hdmlnYXRpb24gKi99XG4gICAgICA8YnV0dG9uIG9uQ2xpY2s9eygpID0+IHJvdXRlci5wdXNoKCcvZGFzaGJvYXJkJyl9PlxuICAgICAgICBHbyB0byBEYXNoYm9hcmRcbiAgICAgIDwvYnV0dG9uPlxuICAgIDwvbmF2PlxuICApO1xufWB9XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgPGgzIHN0eWxlPXt1aS5oM30+Um91dGVyIEhvb2s8L2gzPlxuICAgICAgICAgICAgPGRpdiBzdHlsZT17dWkuY29kZUJsb2NrfT5cbiAgICAgICAgICAgICAge2BpbXBvcnQgeyB1c2VSb3V0ZXIgfSBmcm9tICdpbmRqcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIE15Q29tcG9uZW50KCkge1xuICBjb25zdCByb3V0ZXIgPSB1c2VSb3V0ZXIoKTtcbiAgXG4gIGNvbnN0IGhhbmRsZVN1Ym1pdCA9IGFzeW5jIChkYXRhKSA9PiB7XG4gICAgYXdhaXQgc2F2ZURhdGEoZGF0YSk7XG4gICAgcm91dGVyLnB1c2goJy9zdWNjZXNzJyk7XG4gIH07XG4gIFxuICByZXR1cm4gKFxuICAgIDxkaXY+XG4gICAgICA8cD5DdXJyZW50IHBhdGg6IHtyb3V0ZXIucGF0aG5hbWV9PC9wPlxuICAgICAgPHA+UXVlcnkgcGFyYW1zOiB7SlNPTi5zdHJpbmdpZnkocm91dGVyLnF1ZXJ5KX08L3A+XG4gICAgICA8YnV0dG9uIG9uQ2xpY2s9eygpID0+IHJvdXRlci5iYWNrKCl9PkdvIEJhY2s8L2J1dHRvbj5cbiAgICA8L2Rpdj5cbiAgKTtcbn1gfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8ZGl2IHN0eWxlPXt1aS5zZWN0aW9ufT5cbiAgICAgICAgICAgIDxoMiBzdHlsZT17dWkuaDJ9PlJvdXRlIEdyb3VwczwvaDI+XG4gICAgICAgICAgICA8cCBzdHlsZT17dWkucH0+XG4gICAgICAgICAgICAgIE9yZ2FuaXplIHlvdXIgcm91dGVzIHdpdGhvdXQgYWZmZWN0aW5nIHRoZSBVUkwgc3RydWN0dXJlIHVzaW5nIHBhcmVudGhlc2VzIDxjb2RlIHN0eWxlPXt1aS5jb2RlfT4oZ3JvdXApPC9jb2RlPjpcbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgPGRpdiBzdHlsZT17dWkuY29kZUJsb2NrfT5cbiAgICAgICAgICAgICAge2BwYWdlcy9cblx1MjUxQ1x1MjUwMFx1MjUwMCAobWFya2V0aW5nKS9cblx1MjUwMiAgIFx1MjUxQ1x1MjUwMFx1MjUwMCBhYm91dC5qc3ggICAgICBcdTIxOTIgL2Fib3V0XG5cdTI1MDIgICBcdTI1MTRcdTI1MDBcdTI1MDAgY29udGFjdC5qc3ggICAgXHUyMTkyIC9jb250YWN0XG5cdTI1MUNcdTI1MDBcdTI1MDAgKGRhc2hib2FyZCkvXG5cdTI1MDIgICBcdTI1MUNcdTI1MDBcdTI1MDAgYW5hbHl0aWNzLmpzeCAgXHUyMTkyIC9hbmFseXRpY3Ncblx1MjUwMiAgIFx1MjUxNFx1MjUwMFx1MjUwMCBzZXR0aW5ncy5qc3ggICBcdTIxOTIgL3NldHRpbmdzXG5cdTI1MTRcdTI1MDBcdTI1MDAgaW5kZXguanN4ICAgICAgICAgIFx1MjE5MiAvYH1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPGRpdiBzdHlsZT17dWkuc2VjdGlvbn0+XG4gICAgICAgICAgICA8aDIgc3R5bGU9e3VpLmgyfT5MYXlvdXRzPC9oMj5cbiAgICAgICAgICAgIDxwIHN0eWxlPXt1aS5wfT5cbiAgICAgICAgICAgICAgQ3JlYXRlIHNoYXJlZCBsYXlvdXRzIHRoYXQgd3JhcCBtdWx0aXBsZSBwYWdlczpcbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgPGgzIHN0eWxlPXt1aS5oM30+Um9vdCBMYXlvdXQ8L2gzPlxuICAgICAgICAgICAgPGRpdiBzdHlsZT17dWkuY29kZUJsb2NrfT5cbiAgICAgICAgICAgICAge2AvLyBwYWdlcy9fbGF5b3V0LmpzeFxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gUm9vdExheW91dCh7IGNoaWxkcmVuIH0pIHtcbiAgcmV0dXJuIChcbiAgICA8aHRtbD5cbiAgICAgIDxoZWFkPlxuICAgICAgICA8dGl0bGU+TXkgSU5ESlMgQXBwPC90aXRsZT5cbiAgICAgIDwvaGVhZD5cbiAgICAgIDxib2R5PlxuICAgICAgICA8aGVhZGVyPlxuICAgICAgICAgIDxuYXY+LyogTmF2aWdhdGlvbiAqLzwvbmF2PlxuICAgICAgICA8L2hlYWRlcj5cbiAgICAgICAgPG1haW4+e2NoaWxkcmVufTwvbWFpbj5cbiAgICAgICAgPGZvb3Rlcj4vKiBGb290ZXIgKi88L2Zvb3Rlcj5cbiAgICAgIDwvYm9keT5cbiAgICA8L2h0bWw+XG4gICk7XG59YH1cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICA8aDMgc3R5bGU9e3VpLmgzfT5OZXN0ZWQgTGF5b3V0czwvaDM+XG4gICAgICAgICAgICA8ZGl2IHN0eWxlPXt1aS5jb2RlQmxvY2t9PlxuICAgICAgICAgICAgICB7YC8vIHBhZ2VzL2Rhc2hib2FyZC9fbGF5b3V0LmpzeFxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gRGFzaGJvYXJkTGF5b3V0KHsgY2hpbGRyZW4gfSkge1xuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwiZGFzaGJvYXJkXCI+XG4gICAgICA8YXNpZGU+LyogU2lkZWJhciAqLzwvYXNpZGU+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRlbnRcIj57Y2hpbGRyZW59PC9kaXY+XG4gICAgPC9kaXY+XG4gICk7XG59XG5cbi8vIHBhZ2VzL2Rhc2hib2FyZC9hbmFseXRpY3MuanN4IHdpbGwgYmUgd3JhcHBlZCBieSBib3RoIGxheW91dHNgfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8ZGl2IHN0eWxlPXt1aS5zZWN0aW9ufT5cbiAgICAgICAgICAgIDxoMiBzdHlsZT17dWkuaDJ9Pk1pZGRsZXdhcmU8L2gyPlxuICAgICAgICAgICAgPHAgc3R5bGU9e3VpLnB9PlxuICAgICAgICAgICAgICBBZGQgZ2xvYmFsIG1pZGRsZXdhcmUgdGhhdCBydW5zIGJlZm9yZSBldmVyeSByZXF1ZXN0OlxuICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgXG4gICAgICAgICAgICA8ZGl2IHN0eWxlPXt1aS5jb2RlQmxvY2t9PlxuICAgICAgICAgICAgICB7YC8vIHBhZ2VzL19taWRkbGV3YXJlLmpzXG5leHBvcnQgZGVmYXVsdCBhc3luYyBmdW5jdGlvbiBtaWRkbGV3YXJlKHsgcmVxLCByZXMsIHJvb3QgfSkge1xuICAvLyBBdXRoZW50aWNhdGlvbiBjaGVja1xuICBpZiAocmVxLnBhdGguc3RhcnRzV2l0aCgnL2Rhc2hib2FyZCcpICYmICFyZXEudXNlcikge1xuICAgIHJlcy5yZWRpcmVjdCgnL2xvZ2luJyk7XG4gICAgcmV0dXJuIGZhbHNlOyAvLyBTdG9wIHByb2Nlc3NpbmdcbiAgfVxuICBcbiAgLy8gQWRkIGN1c3RvbSBoZWFkZXJzXG4gIHJlcy5zZXRIZWFkZXIoJ1gtQ3VzdG9tLUhlYWRlcicsICdJTkRKUycpO1xuICBcbiAgLy8gTG9nIHJlcXVlc3RzXG4gIGNvbnNvbGUubG9nKFxcYFxcJHtyZXEubWV0aG9kfSBcXCR7cmVxLnBhdGh9XFxgKTtcbiAgXG4gIHJldHVybiB0cnVlOyAvLyBDb250aW51ZSB0byBwYWdlXG59YH1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPGRpdiBzdHlsZT17dWkuc2VjdGlvbn0+XG4gICAgICAgICAgICA8aDIgc3R5bGU9e3VpLmgyfT5BZHZhbmNlZCBSb3V0aW5nIEZlYXR1cmVzPC9oMj5cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgPGgzIHN0eWxlPXt1aS5oM30+Um91dGUgUHJpb3JpdGllczwvaDM+XG4gICAgICAgICAgICA8cCBzdHlsZT17dWkucH0+U3RhdGljIHJvdXRlcyB0YWtlIHByZWNlZGVuY2Ugb3ZlciBkeW5hbWljIHJvdXRlczo8L3A+XG4gICAgICAgICAgICA8dWwgc3R5bGU9e3VpLnVsfT5cbiAgICAgICAgICAgICAgPGxpIHN0eWxlPXt1aS5saX0+PGNvZGUgc3R5bGU9e3VpLmNvZGV9PnBhZ2VzL2Jsb2cvZmVhdHVyZWQuanN4PC9jb2RlPiBcdTIxOTIgPGNvZGUgc3R5bGU9e3VpLmNvZGV9Pi9ibG9nL2ZlYXR1cmVkPC9jb2RlPjwvbGk+XG4gICAgICAgICAgICAgIDxsaSBzdHlsZT17dWkubGl9Pjxjb2RlIHN0eWxlPXt1aS5jb2RlfT5wYWdlcy9ibG9nL1tzbHVnXS5qc3g8L2NvZGU+IFx1MjE5MiA8Y29kZSBzdHlsZT17dWkuY29kZX0+L2Jsb2cvb3RoZXItcG9zdHM8L2NvZGU+PC9saT5cbiAgICAgICAgICAgIDwvdWw+XG5cbiAgICAgICAgICAgIDxoMyBzdHlsZT17dWkuaDN9Pk9wdGlvbmFsIENhdGNoLWFsbCBSb3V0ZXM8L2gzPlxuICAgICAgICAgICAgPGRpdiBzdHlsZT17dWkuY29kZUJsb2NrfT5cbiAgICAgICAgICAgICAge2AvLyBwYWdlcy9zaG9wL1tbLi4uc2x1Z11dLmpzeFxuLy8gTWF0Y2hlczogL3Nob3AsIC9zaG9wL2NhdGVnb3J5LCAvc2hvcC9jYXRlZ29yeS9wcm9kdWN0XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFNob3AoeyBwYXJhbXMgfSkge1xuICBjb25zdCB7IHNsdWcgPSBbXSB9ID0gcGFyYW1zO1xuICBcbiAgaWYgKHNsdWcubGVuZ3RoID09PSAwKSByZXR1cm4gPFNob3BIb21lIC8+O1xuICBpZiAoc2x1Zy5sZW5ndGggPT09IDEpIHJldHVybiA8Q2F0ZWdvcnkgY2F0ZWdvcnk9e3NsdWdbMF19IC8+O1xuICBpZiAoc2x1Zy5sZW5ndGggPT09IDIpIHJldHVybiA8UHJvZHVjdCBjYXRlZ29yeT17c2x1Z1swXX0gcHJvZHVjdD17c2x1Z1sxXX0gLz47XG59YH1cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICA8aDMgc3R5bGU9e3VpLmgzfT5Sb3V0ZSBWYWxpZGF0aW9uPC9oMz5cbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3VpLmNvZGVCbG9ja30+XG4gICAgICAgICAgICAgIHtgLy8gcGFnZXMvdXNlci9baWRdLmpzeFxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFNlcnZlclNpZGVQcm9wcyh7IHBhcmFtcyB9KSB7XG4gIGNvbnN0IHsgaWQgfSA9IHBhcmFtcztcbiAgXG4gIC8vIFZhbGlkYXRlIElEIGZvcm1hdFxuICBpZiAoIS9eXFxcXGQrJC8udGVzdChpZCkpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbm90Rm91bmQ6IHRydWVcbiAgICB9O1xuICB9XG4gIFxuICBjb25zdCB1c2VyID0gYXdhaXQgZmV0Y2hVc2VyKGlkKTtcbiAgXG4gIGlmICghdXNlcikge1xuICAgIHJldHVybiB7XG4gICAgICBub3RGb3VuZDogdHJ1ZVxuICAgIH07XG4gIH1cbiAgXG4gIHJldHVybiB7XG4gICAgcHJvcHM6IHsgdXNlciB9XG4gIH07XG59YH1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L3NlY3Rpb24+XG4gICAgICA8L2Rpdj5cbiAgICA8L21haW4+XG4gICk7XG59XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQUEsT0FBTyxXQUFXO0FBNkdOLGNBT0EsWUFQQTtBQTNHRyxTQUFSLFVBQTJCO0FBQ2hDLFFBQU0sS0FBSztBQUFBLElBQ1QsTUFBTTtBQUFBLE1BQ0osWUFBWTtBQUFBLE1BQ1osV0FBVztBQUFBLE1BQ1gsUUFBUTtBQUFBLE1BQ1IsWUFBWTtBQUFBLE1BQ1osT0FBTztBQUFBLElBQ1Q7QUFBQSxJQUNBLE1BQU07QUFBQSxNQUNKLFVBQVU7QUFBQSxNQUNWLFFBQVE7QUFBQSxNQUNSLFNBQVM7QUFBQSxJQUNYO0FBQUEsSUFDQSxNQUFNO0FBQUEsTUFDSixZQUFZO0FBQUEsTUFDWixjQUFjO0FBQUEsTUFDZCxTQUFTO0FBQUEsTUFDVCxXQUFXO0FBQUEsSUFDYjtBQUFBLElBQ0EsSUFBSTtBQUFBLE1BQ0Ys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
