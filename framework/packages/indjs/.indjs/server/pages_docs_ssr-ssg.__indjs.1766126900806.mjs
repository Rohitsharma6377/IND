// pages/docs/ssr-ssg.jsx
import React from "react";
import { jsx, jsxs } from "react/jsx-runtime";
function SsrSsg() {
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
    },
    success: {
      background: "#dcfce7",
      border: "1px solid #16a34a",
      borderRadius: 8,
      padding: 16,
      marginBottom: 20
    },
    successTitle: {
      fontWeight: 600,
      color: "#15803d",
      marginBottom: 8
    }
  };
  return /* @__PURE__ */ jsx("main", { style: ui.page, children: /* @__PURE__ */ jsx("div", { style: ui.wrap, children: /* @__PURE__ */ jsxs("section", { style: ui.hero, children: [
    /* @__PURE__ */ jsx("nav", { style: ui.nav, children: /* @__PURE__ */ jsx("a", { href: "/docs", style: ui.backLink, children: "\u2190 Back to Documentation" }) }),
    /* @__PURE__ */ jsx("h1", { style: ui.h1, children: "SSR & SSG" }),
    /* @__PURE__ */ jsxs("div", { style: ui.section, children: [
      /* @__PURE__ */ jsx("h2", { style: ui.h2, children: "Overview" }),
      /* @__PURE__ */ jsx("p", { style: ui.p, children: "INDJS supports both Server-Side Rendering (SSR) and Static Site Generation (SSG) out of the box. This gives you the flexibility to choose the best rendering strategy for each page in your application." }),
      /* @__PURE__ */ jsxs("div", { style: ui.info, children: [
        /* @__PURE__ */ jsx("div", { style: ui.infoTitle, children: "\u{1F4A1} Key Benefits" }),
        /* @__PURE__ */ jsxs("ul", { style: { margin: 0, fontSize: 14, color: "#1e40af" }, children: [
          /* @__PURE__ */ jsx("li", { children: "Better SEO with pre-rendered HTML" }),
          /* @__PURE__ */ jsx("li", { children: "Faster initial page loads" }),
          /* @__PURE__ */ jsx("li", { children: "Improved Core Web Vitals" }),
          /* @__PURE__ */ jsx("li", { children: "Better performance on slow networks" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { style: ui.section, children: [
      /* @__PURE__ */ jsx("h2", { style: ui.h2, children: "Server-Side Rendering (SSR)" }),
      /* @__PURE__ */ jsx("p", { style: ui.p, children: "SSR generates HTML on the server for each request. This is perfect for dynamic content that changes frequently." }),
      /* @__PURE__ */ jsx("h3", { style: ui.h3, children: "Basic SSR with getServerSideProps" }),
      /* @__PURE__ */ jsx("div", { style: ui.codeBlock, children: `// pages/blog/[slug].jsx
import React from 'react';

export default function BlogPost({ post, author }) {
  return (
    <article>
      <h1>{post.title}</h1>
      <p>By {author.name}</p>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  );
}

export async function getServerSideProps({ params, req, res }) {
  const { slug } = params;
  
  try {
    // Fetch data on every request
    const post = await fetchBlogPost(slug);
    const author = await fetchAuthor(post.authorId);
    
    if (!post) {
      return {
        notFound: true
      };
    }
    
    return {
      props: {
        post,
        author
      }
    };
  } catch (error) {
    console.error('Error fetching post:', error);
    return {
      notFound: true
    };
  }
}` }),
      /* @__PURE__ */ jsx("h3", { style: ui.h3, children: "Context Object" }),
      /* @__PURE__ */ jsxs("p", { style: ui.p, children: [
        "The context object passed to",
        " ",
        /* @__PURE__ */ jsx("code", { style: ui.code, children: "getServerSideProps" }),
        " contains:"
      ] }),
      /* @__PURE__ */ jsx("div", { style: ui.codeBlock, children: `export async function getServerSideProps(context) {
  const {
    params,    // Route parameters for dynamic routes
    req,       // HTTP request object
    res,       // HTTP response object
    query,     // Query string parameters
    preview,   // Preview mode (if enabled)
    cookies    // Request cookies
  } = context;
  
  // Access user agent
  const userAgent = req.headers['user-agent'];
  
  // Set custom headers
  res.setHeader('Cache-Control', 'public, max-age=3600');
  
  // Redirect if needed
  if (!user.isAuthenticated) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
  
  return {
    props: {
      data: 'server-rendered data'
    }
  };
}` })
    ] }),
    /* @__PURE__ */ jsxs("div", { style: ui.section, children: [
      /* @__PURE__ */ jsx("h2", { style: ui.h2, children: "Static Site Generation (SSG)" }),
      /* @__PURE__ */ jsx("p", { style: ui.p, children: "SSG pre-renders pages at build time. This is ideal for content that doesn't change often, providing the fastest possible loading times." }),
      /* @__PURE__ */ jsx("h3", { style: ui.h3, children: "Basic SSG with getStaticProps" }),
      /* @__PURE__ */ jsx("div", { style: ui.codeBlock, children: `// pages/about.jsx
import React from 'react';

export default function About({ team, stats }) {
  return (
    <div>
      <h1>About Us</h1>
      <div>
        <h2>Our Team</h2>
        {team.map(member => (
          <div key={member.id}>
            <h3>{member.name}</h3>
            <p>{member.role}</p>
          </div>
        ))}
      </div>
      <div>
        <h2>Company Stats</h2>
        <p>Founded: {stats.founded}</p>
        <p>Employees: {stats.employees}</p>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  // This runs at build time
  const team = await fetchTeamMembers();
  const stats = await fetchCompanyStats();
  
  return {
    props: {
      team,
      stats
    },
    // Regenerate the page at most once every hour
    revalidate: 3600
  };
}` }),
      /* @__PURE__ */ jsx("h3", { style: ui.h3, children: "Dynamic SSG with getStaticPaths" }),
      /* @__PURE__ */ jsx("div", { style: ui.codeBlock, children: `// pages/products/[id].jsx
import React from 'react';

export default function Product({ product }) {
  return (
    <div>
      <h1>{product.name}</h1>
      <p>Price: \${product.price}</p>
      <p>{product.description}</p>
    </div>
  );
}

export async function getStaticPaths() {
  // Get the paths we want to pre-render based on products
  const products = await fetchAllProducts();
  
  const paths = products.map((product) => ({
    params: { id: product.id.toString() }
  }));
  
  return {
    paths,
    // Enable ISR for paths not returned by getStaticPaths
    fallback: 'blocking' // or true, or false
  };
}

export async function getStaticProps({ params }) {
  const { id } = params;
  const product = await fetchProduct(id);
  
  if (!product) {
    return {
      notFound: true
    };
  }
  
  return {
    props: {
      product
    },
    // Regenerate at most once every 10 minutes
    revalidate: 600
  };
}` })
    ] }),
    /* @__PURE__ */ jsxs("div", { style: ui.section, children: [
      /* @__PURE__ */ jsx("h2", { style: ui.h2, children: "Incremental Static Regeneration (ISR)" }),
      /* @__PURE__ */ jsx("p", { style: ui.p, children: "ISR allows you to update static content after you've built your site. You get the benefits of static generation with the flexibility of server-side rendering." }),
      /* @__PURE__ */ jsx("div", { style: ui.codeBlock, children: `// pages/news/[slug].jsx
export default function NewsArticle({ article }) {
  return (
    <article>
      <h1>{article.title}</h1>
      <time>{new Date(article.publishedAt).toLocaleDateString()}</time>
      <div dangerouslySetInnerHTML={{ __html: article.content }} />
    </article>
  );
}

export async function getStaticProps({ params }) {
  const { slug } = params;
  const article = await fetchArticle(slug);
  
  return {
    props: {
      article
    },
    // Regenerate the page:
    // - At most once every 60 seconds
    // - When a request comes in (at most once every 60 seconds)
    revalidate: 60
  };
}

export async function getStaticPaths() {
  // Pre-render the most popular articles
  const popularArticles = await fetchPopularArticles();
  
  const paths = popularArticles.map(article => ({
    params: { slug: article.slug }
  }));
  
  return {
    paths,
    // Enable ISR for other articles
    fallback: 'blocking'
  };
}` }),
      /* @__PURE__ */ jsx("h3", { style: ui.h3, children: "Fallback Options" }),
      /* @__PURE__ */ jsxs("ul", { style: ui.ul, children: [
        /* @__PURE__ */ jsxs("li", { style: ui.li, children: [
          /* @__PURE__ */ jsx("strong", { children: "false:" }),
          " Any paths not returned by getStaticPaths will result in a 404 page"
        ] }),
        /* @__PURE__ */ jsxs("li", { style: ui.li, children: [
          /* @__PURE__ */ jsx("strong", { children: "true:" }),
          " Show a loading state, then render the page after getStaticProps completes"
        ] }),
        /* @__PURE__ */ jsxs("li", { style: ui.li, children: [
          /* @__PURE__ */ jsx("strong", { children: "'blocking':" }),
          " Wait for getStaticProps to complete before showing the page"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { style: ui.section, children: [
      /* @__PURE__ */ jsx("h2", { style: ui.h2, children: "Client-Side Rendering (CSR)" }),
      /* @__PURE__ */ jsx("p", { style: ui.p, children: "For highly dynamic content, you can use client-side rendering with React hooks:" }),
      /* @__PURE__ */ jsx("div", { style: ui.codeBlock, children: `// pages/dashboard.jsx
import React, { useState, useEffect } from 'react';

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/dashboard-data');
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    
    fetchData();
  }, []);
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return (
    <div>
      <h1>Dashboard</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}` })
    ] }),
    /* @__PURE__ */ jsxs("div", { style: ui.section, children: [
      /* @__PURE__ */ jsx("h2", { style: ui.h2, children: "Hybrid Rendering" }),
      /* @__PURE__ */ jsx("p", { style: ui.p, children: "Combine different rendering strategies in the same application:" }),
      /* @__PURE__ */ jsx("div", { style: ui.codeBlock, children: `// pages/hybrid-page.jsx
import React, { useState, useEffect } from 'react';

export default function HybridPage({ staticData, serverData }) {
  const [clientData, setClientData] = useState(null);
  
  useEffect(() => {
    // Fetch additional data on the client
    fetch('/api/user-specific-data')
      .then(res => res.json())
      .then(setClientData);
  }, []);
  
  return (
    <div>
      {/* Static content (built at build time) */}
      <section>
        <h2>Static Content</h2>
        <p>{staticData.description}</p>
      </section>
      
      {/* Server-rendered content (rendered on each request) */}
      <section>
        <h2>Server Data</h2>
        <p>Current time: {serverData.timestamp}</p>
      </section>
      
      {/* Client-rendered content (rendered in browser) */}
      <section>
        <h2>User-Specific Data</h2>
        {clientData ? (
          <p>Welcome, {clientData.username}!</p>
        ) : (
          <p>Loading user data...</p>
        )}
      </section>
    </div>
  );
}

// Static data (ISR with revalidation)
export async function getStaticProps() {
  const staticData = await fetchStaticContent();
  
  return {
    props: {
      staticData
    },
    revalidate: 86400 // Revalidate once per day
  };
}

// Server data (rendered on each request)
export async function getServerSideProps() {
  const serverData = {
    timestamp: new Date().toISOString()
  };
  
  return {
    props: {
      serverData
    }
  };
}` })
    ] }),
    /* @__PURE__ */ jsxs("div", { style: ui.section, children: [
      /* @__PURE__ */ jsx("h2", { style: ui.h2, children: "Performance Optimization" }),
      /* @__PURE__ */ jsx("h3", { style: ui.h3, children: "Caching Strategies" }),
      /* @__PURE__ */ jsx("div", { style: ui.codeBlock, children: `// pages/api/cached-data.js
export default async function handler({ req, res }) {
  // Set cache headers
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  );
  
  const data = await fetchExpensiveData();
  res.json(data);
}

// pages/optimized-page.jsx
export async function getStaticProps() {
  const data = await fetchData();
  
  return {
    props: { data },
    // Cache for 1 hour, revalidate in background
    revalidate: 3600
  };
}` }),
      /* @__PURE__ */ jsx("h3", { style: ui.h3, children: "Streaming SSR (React 18)" }),
      /* @__PURE__ */ jsx("div", { style: ui.codeBlock, children: `// indjs.config.js
export default {
  experimental: {
    streaming: true
  }
};

// pages/streaming-page.jsx
import { Suspense } from 'react';

function SlowComponent() {
  // This component can stream in after the initial HTML
  return <div>Slow loading content</div>;
}

export default function StreamingPage() {
  return (
    <div>
      <h1>Fast loading header</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <SlowComponent />
      </Suspense>
    </div>
  );
}` })
    ] }),
    /* @__PURE__ */ jsxs("div", { style: ui.success, children: [
      /* @__PURE__ */ jsx("div", { style: ui.successTitle, children: "\u2705 Best Practices" }),
      /* @__PURE__ */ jsxs("ul", { style: { margin: 0, fontSize: 14, color: "#15803d" }, children: [
        /* @__PURE__ */ jsx("li", { children: "Use SSG for static content (marketing pages, blogs)" }),
        /* @__PURE__ */ jsx("li", { children: "Use SSR for dynamic, user-specific content" }),
        /* @__PURE__ */ jsx("li", { children: "Use ISR for content that changes occasionally" }),
        /* @__PURE__ */ jsx("li", { children: "Use CSR for highly interactive dashboards" }),
        /* @__PURE__ */ jsx("li", { children: "Combine strategies for optimal performance" })
      ] })
    ] })
  ] }) }) });
}
export {
  SsrSsg as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcGFnZXMvZG9jcy9zc3Itc3NnLmpzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBTc3JTc2coKSB7XG4gIGNvbnN0IHVpID0ge1xuICAgIHBhZ2U6IHtcbiAgICAgIGZvbnRGYW1pbHk6XG4gICAgICAgIFwic3lzdGVtLXVpLCAtYXBwbGUtc3lzdGVtLCBTZWdvZSBVSSwgUm9ib3RvLCBIZWx2ZXRpY2EsIEFyaWFsXCIsXG4gICAgICBtaW5IZWlnaHQ6IFwiMTAwdmhcIixcbiAgICAgIG1hcmdpbjogMCxcbiAgICAgIGJhY2tncm91bmQ6IFwibGluZWFyLWdyYWRpZW50KDE4MGRlZywgIzBlYTVlOSAwJSwgIzExMTgyNyA2MCUpXCIsXG4gICAgICBjb2xvcjogXCIjMGYxNzJhXCIsXG4gICAgfSxcbiAgICB3cmFwOiB7XG4gICAgICBtYXhXaWR0aDogOTgwLFxuICAgICAgbWFyZ2luOiBcIjAgYXV0b1wiLFxuICAgICAgcGFkZGluZzogXCI0OHB4IDIwcHhcIixcbiAgICB9LFxuICAgIGhlcm86IHtcbiAgICAgIGJhY2tncm91bmQ6IFwid2hpdGVcIixcbiAgICAgIGJvcmRlclJhZGl1czogMTYsXG4gICAgICBwYWRkaW5nOiAyOCxcbiAgICAgIGJveFNoYWRvdzogXCIwIDEwcHggMzBweCByZ2JhKDAsMCwwLDAuMTIpXCIsXG4gICAgfSxcbiAgICBoMToge1xuICAgICAgZm9udFNpemU6IDMyLFxuICAgICAgbGluZUhlaWdodDogMS4xLFxuICAgICAgbWFyZ2luOiAwLFxuICAgICAgY29sb3I6IFwiIzBiMTIyMFwiLFxuICAgIH0sXG4gICAgbmF2OiB7XG4gICAgICBtYXJnaW5Cb3R0b206IDIwLFxuICAgIH0sXG4gICAgYmFja0xpbms6IHtcbiAgICAgIGNvbG9yOiBcIiMwZWE1ZTlcIixcbiAgICAgIHRleHREZWNvcmF0aW9uOiBcIm5vbmVcIixcbiAgICAgIGZvbnRTaXplOiAxNCxcbiAgICB9LFxuICAgIHNlY3Rpb246IHtcbiAgICAgIG1hcmdpbkJvdHRvbTogMzIsXG4gICAgfSxcbiAgICBoMjoge1xuICAgICAgZm9udFNpemU6IDI0LFxuICAgICAgY29sb3I6IFwiIzBiMTIyMFwiLFxuICAgICAgbWFyZ2luQm90dG9tOiAxNixcbiAgICAgIGJvcmRlckJvdHRvbTogXCIycHggc29saWQgI2UyZThmMFwiLFxuICAgICAgcGFkZGluZ0JvdHRvbTogOCxcbiAgICB9LFxuICAgIGgzOiB7XG4gICAgICBmb250U2l6ZTogMjAsXG4gICAgICBjb2xvcjogXCIjMGIxMjIwXCIsXG4gICAgICBtYXJnaW5Cb3R0b206IDEyLFxuICAgICAgbWFyZ2luVG9wOiAyNCxcbiAgICB9LFxuICAgIHA6IHtcbiAgICAgIGZvbnRTaXplOiAxNixcbiAgICAgIGNvbG9yOiBcIiMzMzQxNTVcIixcbiAgICAgIGxpbmVIZWlnaHQ6IDEuNixcbiAgICAgIG1hcmdpbkJvdHRvbTogMTYsXG4gICAgfSxcbiAgICB1bDoge1xuICAgICAgZm9udFNpemU6IDE2LFxuICAgICAgY29sb3I6IFwiIzMzNDE1NVwiLFxuICAgICAgbGluZUhlaWdodDogMS42LFxuICAgICAgbWFyZ2luQm90dG9tOiAxNixcbiAgICAgIHBhZGRpbmdMZWZ0OiAyMCxcbiAgICB9LFxuICAgIGxpOiB7XG4gICAgICBtYXJnaW5Cb3R0b206IDgsXG4gICAgfSxcbiAgICBjb2RlOiB7XG4gICAgICBiYWNrZ3JvdW5kOiBcIiNmMWY1ZjlcIixcbiAgICAgIHBhZGRpbmc6IFwiMnB4IDZweFwiLFxuICAgICAgYm9yZGVyUmFkaXVzOiA0LFxuICAgICAgZm9udFNpemU6IDE0LFxuICAgICAgZm9udEZhbWlseTogXCJtb25vc3BhY2VcIixcbiAgICB9LFxuICAgIGNvZGVCbG9jazoge1xuICAgICAgYmFja2dyb3VuZDogXCIjMWUyOTNiXCIsXG4gICAgICBjb2xvcjogXCIjZTJlOGYwXCIsXG4gICAgICBwYWRkaW5nOiAyMCxcbiAgICAgIGJvcmRlclJhZGl1czogOCxcbiAgICAgIGZvbnRTaXplOiAxNCxcbiAgICAgIGZvbnRGYW1pbHk6IFwibW9ub3NwYWNlXCIsXG4gICAgICBvdmVyZmxvdzogXCJhdXRvXCIsXG4gICAgICBtYXJnaW5Cb3R0b206IDIwLFxuICAgICAgbGluZUhlaWdodDogMS41LFxuICAgIH0sXG4gICAgaW5mbzoge1xuICAgICAgYmFja2dyb3VuZDogXCIjZGJlYWZlXCIsXG4gICAgICBib3JkZXI6IFwiMXB4IHNvbGlkICMzYjgyZjZcIixcbiAgICAgIGJvcmRlclJhZGl1czogOCxcbiAgICAgIHBhZGRpbmc6IDE2LFxuICAgICAgbWFyZ2luQm90dG9tOiAyMCxcbiAgICB9LFxuICAgIGluZm9UaXRsZToge1xuICAgICAgZm9udFdlaWdodDogNjAwLFxuICAgICAgY29sb3I6IFwiIzFlNDBhZlwiLFxuICAgICAgbWFyZ2luQm90dG9tOiA4LFxuICAgIH0sXG4gICAgc3VjY2Vzczoge1xuICAgICAgYmFja2dyb3VuZDogXCIjZGNmY2U3XCIsXG4gICAgICBib3JkZXI6IFwiMXB4IHNvbGlkICMxNmEzNGFcIixcbiAgICAgIGJvcmRlclJhZGl1czogOCxcbiAgICAgIHBhZGRpbmc6IDE2LFxuICAgICAgbWFyZ2luQm90dG9tOiAyMCxcbiAgICB9LFxuICAgIHN1Y2Nlc3NUaXRsZToge1xuICAgICAgZm9udFdlaWdodDogNjAwLFxuICAgICAgY29sb3I6IFwiIzE1ODAzZFwiLFxuICAgICAgbWFyZ2luQm90dG9tOiA4LFxuICAgIH0sXG4gIH07XG5cbiAgcmV0dXJuIChcbiAgICA8bWFpbiBzdHlsZT17dWkucGFnZX0+XG4gICAgICA8ZGl2IHN0eWxlPXt1aS53cmFwfT5cbiAgICAgICAgPHNlY3Rpb24gc3R5bGU9e3VpLmhlcm99PlxuICAgICAgICAgIDxuYXYgc3R5bGU9e3VpLm5hdn0+XG4gICAgICAgICAgICA8YSBocmVmPVwiL2RvY3NcIiBzdHlsZT17dWkuYmFja0xpbmt9PlxuICAgICAgICAgICAgICBcdTIxOTAgQmFjayB0byBEb2N1bWVudGF0aW9uXG4gICAgICAgICAgICA8L2E+XG4gICAgICAgICAgPC9uYXY+XG5cbiAgICAgICAgICA8aDEgc3R5bGU9e3VpLmgxfT5TU1IgJiBTU0c8L2gxPlxuXG4gICAgICAgICAgPGRpdiBzdHlsZT17dWkuc2VjdGlvbn0+XG4gICAgICAgICAgICA8aDIgc3R5bGU9e3VpLmgyfT5PdmVydmlldzwvaDI+XG4gICAgICAgICAgICA8cCBzdHlsZT17dWkucH0+XG4gICAgICAgICAgICAgIElOREpTIHN1cHBvcnRzIGJvdGggU2VydmVyLVNpZGUgUmVuZGVyaW5nIChTU1IpIGFuZCBTdGF0aWMgU2l0ZVxuICAgICAgICAgICAgICBHZW5lcmF0aW9uIChTU0cpIG91dCBvZiB0aGUgYm94LiBUaGlzIGdpdmVzIHlvdSB0aGUgZmxleGliaWxpdHkgdG9cbiAgICAgICAgICAgICAgY2hvb3NlIHRoZSBiZXN0IHJlbmRlcmluZyBzdHJhdGVneSBmb3IgZWFjaCBwYWdlIGluIHlvdXJcbiAgICAgICAgICAgICAgYXBwbGljYXRpb24uXG4gICAgICAgICAgICA8L3A+XG5cbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3VpLmluZm99PlxuICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt1aS5pbmZvVGl0bGV9Plx1RDgzRFx1RENBMSBLZXkgQmVuZWZpdHM8L2Rpdj5cbiAgICAgICAgICAgICAgPHVsIHN0eWxlPXt7IG1hcmdpbjogMCwgZm9udFNpemU6IDE0LCBjb2xvcjogXCIjMWU0MGFmXCIgfX0+XG4gICAgICAgICAgICAgICAgPGxpPkJldHRlciBTRU8gd2l0aCBwcmUtcmVuZGVyZWQgSFRNTDwvbGk+XG4gICAgICAgICAgICAgICAgPGxpPkZhc3RlciBpbml0aWFsIHBhZ2UgbG9hZHM8L2xpPlxuICAgICAgICAgICAgICAgIDxsaT5JbXByb3ZlZCBDb3JlIFdlYiBWaXRhbHM8L2xpPlxuICAgICAgICAgICAgICAgIDxsaT5CZXR0ZXIgcGVyZm9ybWFuY2Ugb24gc2xvdyBuZXR3b3JrczwvbGk+XG4gICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIDxkaXYgc3R5bGU9e3VpLnNlY3Rpb259PlxuICAgICAgICAgICAgPGgyIHN0eWxlPXt1aS5oMn0+U2VydmVyLVNpZGUgUmVuZGVyaW5nIChTU1IpPC9oMj5cbiAgICAgICAgICAgIDxwIHN0eWxlPXt1aS5wfT5cbiAgICAgICAgICAgICAgU1NSIGdlbmVyYXRlcyBIVE1MIG9uIHRoZSBzZXJ2ZXIgZm9yIGVhY2ggcmVxdWVzdC4gVGhpcyBpcyBwZXJmZWN0XG4gICAgICAgICAgICAgIGZvciBkeW5hbWljIGNvbnRlbnQgdGhhdCBjaGFuZ2VzIGZyZXF1ZW50bHkuXG4gICAgICAgICAgICA8L3A+XG5cbiAgICAgICAgICAgIDxoMyBzdHlsZT17dWkuaDN9PkJhc2ljIFNTUiB3aXRoIGdldFNlcnZlclNpZGVQcm9wczwvaDM+XG4gICAgICAgICAgICA8ZGl2IHN0eWxlPXt1aS5jb2RlQmxvY2t9PlxuICAgICAgICAgICAgICB7YC8vIHBhZ2VzL2Jsb2cvW3NsdWddLmpzeFxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gQmxvZ1Bvc3QoeyBwb3N0LCBhdXRob3IgfSkge1xuICByZXR1cm4gKFxuICAgIDxhcnRpY2xlPlxuICAgICAgPGgxPntwb3N0LnRpdGxlfTwvaDE+XG4gICAgICA8cD5CeSB7YXV0aG9yLm5hbWV9PC9wPlxuICAgICAgPGRpdiBkYW5nZXJvdXNseVNldElubmVySFRNTD17eyBfX2h0bWw6IHBvc3QuY29udGVudCB9fSAvPlxuICAgIDwvYXJ0aWNsZT5cbiAgKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFNlcnZlclNpZGVQcm9wcyh7IHBhcmFtcywgcmVxLCByZXMgfSkge1xuICBjb25zdCB7IHNsdWcgfSA9IHBhcmFtcztcbiAgXG4gIHRyeSB7XG4gICAgLy8gRmV0Y2ggZGF0YSBvbiBldmVyeSByZXF1ZXN0XG4gICAgY29uc3QgcG9zdCA9IGF3YWl0IGZldGNoQmxvZ1Bvc3Qoc2x1Zyk7XG4gICAgY29uc3QgYXV0aG9yID0gYXdhaXQgZmV0Y2hBdXRob3IocG9zdC5hdXRob3JJZCk7XG4gICAgXG4gICAgaWYgKCFwb3N0KSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBub3RGb3VuZDogdHJ1ZVxuICAgICAgfTtcbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIHtcbiAgICAgIHByb3BzOiB7XG4gICAgICAgIHBvc3QsXG4gICAgICAgIGF1dGhvclxuICAgICAgfVxuICAgIH07XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcignRXJyb3IgZmV0Y2hpbmcgcG9zdDonLCBlcnJvcik7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5vdEZvdW5kOiB0cnVlXG4gICAgfTtcbiAgfVxufWB9XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgPGgzIHN0eWxlPXt1aS5oM30+Q29udGV4dCBPYmplY3Q8L2gzPlxuICAgICAgICAgICAgPHAgc3R5bGU9e3VpLnB9PlxuICAgICAgICAgICAgICBUaGUgY29udGV4dCBvYmplY3QgcGFzc2VkIHRve1wiIFwifVxuICAgICAgICAgICAgICA8Y29kZSBzdHlsZT17dWkuY29kZX0+Z2V0U2VydmVyU2lkZVByb3BzPC9jb2RlPiBjb250YWluczpcbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3VpLmNvZGVCbG9ja30+XG4gICAgICAgICAgICAgIHtgZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFNlcnZlclNpZGVQcm9wcyhjb250ZXh0KSB7XG4gIGNvbnN0IHtcbiAgICBwYXJhbXMsICAgIC8vIFJvdXRlIHBhcmFtZXRlcnMgZm9yIGR5bmFtaWMgcm91dGVzXG4gICAgcmVxLCAgICAgICAvLyBIVFRQIHJlcXVlc3Qgb2JqZWN0XG4gICAgcmVzLCAgICAgICAvLyBIVFRQIHJlc3BvbnNlIG9iamVjdFxuICAgIHF1ZXJ5LCAgICAgLy8gUXVlcnkgc3RyaW5nIHBhcmFtZXRlcnNcbiAgICBwcmV2aWV3LCAgIC8vIFByZXZpZXcgbW9kZSAoaWYgZW5hYmxlZClcbiAgICBjb29raWVzICAgIC8vIFJlcXVlc3QgY29va2llc1xuICB9ID0gY29udGV4dDtcbiAgXG4gIC8vIEFjY2VzcyB1c2VyIGFnZW50XG4gIGNvbnN0IHVzZXJBZ2VudCA9IHJlcS5oZWFkZXJzWyd1c2VyLWFnZW50J107XG4gIFxuICAvLyBTZXQgY3VzdG9tIGhlYWRlcnNcbiAgcmVzLnNldEhlYWRlcignQ2FjaGUtQ29udHJvbCcsICdwdWJsaWMsIG1heC1hZ2U9MzYwMCcpO1xuICBcbiAgLy8gUmVkaXJlY3QgaWYgbmVlZGVkXG4gIGlmICghdXNlci5pc0F1dGhlbnRpY2F0ZWQpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVkaXJlY3Q6IHtcbiAgICAgICAgZGVzdGluYXRpb246ICcvbG9naW4nLFxuICAgICAgICBwZXJtYW5lbnQ6IGZhbHNlLFxuICAgICAgfSxcbiAgICB9O1xuICB9XG4gIFxuICByZXR1cm4ge1xuICAgIHByb3BzOiB7XG4gICAgICBkYXRhOiAnc2VydmVyLXJlbmRlcmVkIGRhdGEnXG4gICAgfVxuICB9O1xufWB9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIDxkaXYgc3R5bGU9e3VpLnNlY3Rpb259PlxuICAgICAgICAgICAgPGgyIHN0eWxlPXt1aS5oMn0+U3RhdGljIFNpdGUgR2VuZXJhdGlvbiAoU1NHKTwvaDI+XG4gICAgICAgICAgICA8cCBzdHlsZT17dWkucH0+XG4gICAgICAgICAgICAgIFNTRyBwcmUtcmVuZGVycyBwYWdlcyBhdCBidWlsZCB0aW1lLiBUaGlzIGlzIGlkZWFsIGZvciBjb250ZW50XG4gICAgICAgICAgICAgIHRoYXQgZG9lc24ndCBjaGFuZ2Ugb2Z0ZW4sIHByb3ZpZGluZyB0aGUgZmFzdGVzdCBwb3NzaWJsZSBsb2FkaW5nXG4gICAgICAgICAgICAgIHRpbWVzLlxuICAgICAgICAgICAgPC9wPlxuXG4gICAgICAgICAgICA8aDMgc3R5bGU9e3VpLmgzfT5CYXNpYyBTU0cgd2l0aCBnZXRTdGF0aWNQcm9wczwvaDM+XG4gICAgICAgICAgICA8ZGl2IHN0eWxlPXt1aS5jb2RlQmxvY2t9PlxuICAgICAgICAgICAgICB7YC8vIHBhZ2VzL2Fib3V0LmpzeFxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gQWJvdXQoeyB0ZWFtLCBzdGF0cyB9KSB7XG4gIHJldHVybiAoXG4gICAgPGRpdj5cbiAgICAgIDxoMT5BYm91dCBVczwvaDE+XG4gICAgICA8ZGl2PlxuICAgICAgICA8aDI+T3VyIFRlYW08L2gyPlxuICAgICAgICB7dGVhbS5tYXAobWVtYmVyID0+IChcbiAgICAgICAgICA8ZGl2IGtleT17bWVtYmVyLmlkfT5cbiAgICAgICAgICAgIDxoMz57bWVtYmVyLm5hbWV9PC9oMz5cbiAgICAgICAgICAgIDxwPnttZW1iZXIucm9sZX08L3A+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICkpfVxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2PlxuICAgICAgICA8aDI+Q29tcGFueSBTdGF0czwvaDI+XG4gICAgICAgIDxwPkZvdW5kZWQ6IHtzdGF0cy5mb3VuZGVkfTwvcD5cbiAgICAgICAgPHA+RW1wbG95ZWVzOiB7c3RhdHMuZW1wbG95ZWVzfTwvcD5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICApO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0U3RhdGljUHJvcHMoKSB7XG4gIC8vIFRoaXMgcnVucyBhdCBidWlsZCB0aW1lXG4gIGNvbnN0IHRlYW0gPSBhd2FpdCBmZXRjaFRlYW1NZW1iZXJzKCk7XG4gIGNvbnN0IHN0YXRzID0gYXdhaXQgZmV0Y2hDb21wYW55U3RhdHMoKTtcbiAgXG4gIHJldHVybiB7XG4gICAgcHJvcHM6IHtcbiAgICAgIHRlYW0sXG4gICAgICBzdGF0c1xuICAgIH0sXG4gICAgLy8gUmVnZW5lcmF0ZSB0aGUgcGFnZSBhdCBtb3N0IG9uY2UgZXZlcnkgaG91clxuICAgIHJldmFsaWRhdGU6IDM2MDBcbiAgfTtcbn1gfVxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIDxoMyBzdHlsZT17dWkuaDN9PkR5bmFtaWMgU1NHIHdpdGggZ2V0U3RhdGljUGF0aHM8L2gzPlxuICAgICAgICAgICAgPGRpdiBzdHlsZT17dWkuY29kZUJsb2NrfT5cbiAgICAgICAgICAgICAge2AvLyBwYWdlcy9wcm9kdWN0cy9baWRdLmpzeFxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gUHJvZHVjdCh7IHByb2R1Y3QgfSkge1xuICByZXR1cm4gKFxuICAgIDxkaXY+XG4gICAgICA8aDE+e3Byb2R1Y3QubmFtZX08L2gxPlxuICAgICAgPHA+UHJpY2U6ICRcXHtwcm9kdWN0LnByaWNlfTwvcD5cbiAgICAgIDxwPntwcm9kdWN0LmRlc2NyaXB0aW9ufTwvcD5cbiAgICA8L2Rpdj5cbiAgKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFN0YXRpY1BhdGhzKCkge1xuICAvLyBHZXQgdGhlIHBhdGhzIHdlIHdhbnQgdG8gcHJlLXJlbmRlciBiYXNlZCBvbiBwcm9kdWN0c1xuICBjb25zdCBwcm9kdWN0cyA9IGF3YWl0IGZldGNoQWxsUHJvZHVjdHMoKTtcbiAgXG4gIGNvbnN0IHBhdGhzID0gcHJvZHVjdHMubWFwKChwcm9kdWN0KSA9PiAoe1xuICAgIHBhcmFtczogeyBpZDogcHJvZHVjdC5pZC50b1N0cmluZygpIH1cbiAgfSkpO1xuICBcbiAgcmV0dXJuIHtcbiAgICBwYXRocyxcbiAgICAvLyBFbmFibGUgSVNSIGZvciBwYXRocyBub3QgcmV0dXJuZWQgYnkgZ2V0U3RhdGljUGF0aHNcbiAgICBmYWxsYmFjazogJ2Jsb2NraW5nJyAvLyBvciB0cnVlLCBvciBmYWxzZVxuICB9O1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0U3RhdGljUHJvcHMoeyBwYXJhbXMgfSkge1xuICBjb25zdCB7IGlkIH0gPSBwYXJhbXM7XG4gIGNvbnN0IHByb2R1Y3QgPSBhd2FpdCBmZXRjaFByb2R1Y3QoaWQpO1xuICBcbiAgaWYgKCFwcm9kdWN0KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5vdEZvdW5kOiB0cnVlXG4gICAgfTtcbiAgfVxuICBcbiAgcmV0dXJuIHtcbiAgICBwcm9wczoge1xuICAgICAgcHJvZHVjdFxuICAgIH0sXG4gICAgLy8gUmVnZW5lcmF0ZSBhdCBtb3N0IG9uY2UgZXZlcnkgMTAgbWludXRlc1xuICAgIHJldmFsaWRhdGU6IDYwMFxuICB9O1xufWB9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIDxkaXYgc3R5bGU9e3VpLnNlY3Rpb259PlxuICAgICAgICAgICAgPGgyIHN0eWxlPXt1aS5oMn0+SW5jcmVtZW50YWwgU3RhdGljIFJlZ2VuZXJhdGlvbiAoSVNSKTwvaDI+XG4gICAgICAgICAgICA8cCBzdHlsZT17dWkucH0+XG4gICAgICAgICAgICAgIElTUiBhbGxvd3MgeW91IHRvIHVwZGF0ZSBzdGF0aWMgY29udGVudCBhZnRlciB5b3UndmUgYnVpbHQgeW91clxuICAgICAgICAgICAgICBzaXRlLiBZb3UgZ2V0IHRoZSBiZW5lZml0cyBvZiBzdGF0aWMgZ2VuZXJhdGlvbiB3aXRoIHRoZVxuICAgICAgICAgICAgICBmbGV4aWJpbGl0eSBvZiBzZXJ2ZXItc2lkZSByZW5kZXJpbmcuXG4gICAgICAgICAgICA8L3A+XG5cbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3VpLmNvZGVCbG9ja30+XG4gICAgICAgICAgICAgIHtgLy8gcGFnZXMvbmV3cy9bc2x1Z10uanN4XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBOZXdzQXJ0aWNsZSh7IGFydGljbGUgfSkge1xuICByZXR1cm4gKFxuICAgIDxhcnRpY2xlPlxuICAgICAgPGgxPnthcnRpY2xlLnRpdGxlfTwvaDE+XG4gICAgICA8dGltZT57bmV3IERhdGUoYXJ0aWNsZS5wdWJsaXNoZWRBdCkudG9Mb2NhbGVEYXRlU3RyaW5nKCl9PC90aW1lPlxuICAgICAgPGRpdiBkYW5nZXJvdXNseVNldElubmVySFRNTD17eyBfX2h0bWw6IGFydGljbGUuY29udGVudCB9fSAvPlxuICAgIDwvYXJ0aWNsZT5cbiAgKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFN0YXRpY1Byb3BzKHsgcGFyYW1zIH0pIHtcbiAgY29uc3QgeyBzbHVnIH0gPSBwYXJhbXM7XG4gIGNvbnN0IGFydGljbGUgPSBhd2FpdCBmZXRjaEFydGljbGUoc2x1Zyk7XG4gIFxuICByZXR1cm4ge1xuICAgIHByb3BzOiB7XG4gICAgICBhcnRpY2xlXG4gICAgfSxcbiAgICAvLyBSZWdlbmVyYXRlIHRoZSBwYWdlOlxuICAgIC8vIC0gQXQgbW9zdCBvbmNlIGV2ZXJ5IDYwIHNlY29uZHNcbiAgICAvLyAtIFdoZW4gYSByZXF1ZXN0IGNvbWVzIGluIChhdCBtb3N0IG9uY2UgZXZlcnkgNjAgc2Vjb25kcylcbiAgICByZXZhbGlkYXRlOiA2MFxuICB9O1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0U3RhdGljUGF0aHMoKSB7XG4gIC8vIFByZS1yZW5kZXIgdGhlIG1vc3QgcG9wdWxhciBhcnRpY2xlc1xuICBjb25zdCBwb3B1bGFyQXJ0aWNsZXMgPSBhd2FpdCBmZXRjaFBvcHVsYXJBcnRpY2xlcygpO1xuICBcbiAgY29uc3QgcGF0aHMgPSBwb3B1bGFyQXJ0aWNsZXMubWFwKGFydGljbGUgPT4gKHtcbiAgICBwYXJhbXM6IHsgc2x1ZzogYXJ0aWNsZS5zbHVnIH1cbiAgfSkpO1xuICBcbiAgcmV0dXJuIHtcbiAgICBwYXRocyxcbiAgICAvLyBFbmFibGUgSVNSIGZvciBvdGhlciBhcnRpY2xlc1xuICAgIGZhbGxiYWNrOiAnYmxvY2tpbmcnXG4gIH07XG59YH1cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICA8aDMgc3R5bGU9e3VpLmgzfT5GYWxsYmFjayBPcHRpb25zPC9oMz5cbiAgICAgICAgICAgIDx1bCBzdHlsZT17dWkudWx9PlxuICAgICAgICAgICAgICA8bGkgc3R5bGU9e3VpLmxpfT5cbiAgICAgICAgICAgICAgICA8c3Ryb25nPmZhbHNlOjwvc3Ryb25nPiBBbnkgcGF0aHMgbm90IHJldHVybmVkIGJ5IGdldFN0YXRpY1BhdGhzXG4gICAgICAgICAgICAgICAgd2lsbCByZXN1bHQgaW4gYSA0MDQgcGFnZVxuICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICA8bGkgc3R5bGU9e3VpLmxpfT5cbiAgICAgICAgICAgICAgICA8c3Ryb25nPnRydWU6PC9zdHJvbmc+IFNob3cgYSBsb2FkaW5nIHN0YXRlLCB0aGVuIHJlbmRlciB0aGVcbiAgICAgICAgICAgICAgICBwYWdlIGFmdGVyIGdldFN0YXRpY1Byb3BzIGNvbXBsZXRlc1xuICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICA8bGkgc3R5bGU9e3VpLmxpfT5cbiAgICAgICAgICAgICAgICA8c3Ryb25nPidibG9ja2luZyc6PC9zdHJvbmc+IFdhaXQgZm9yIGdldFN0YXRpY1Byb3BzIHRvIGNvbXBsZXRlXG4gICAgICAgICAgICAgICAgYmVmb3JlIHNob3dpbmcgdGhlIHBhZ2VcbiAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8ZGl2IHN0eWxlPXt1aS5zZWN0aW9ufT5cbiAgICAgICAgICAgIDxoMiBzdHlsZT17dWkuaDJ9PkNsaWVudC1TaWRlIFJlbmRlcmluZyAoQ1NSKTwvaDI+XG4gICAgICAgICAgICA8cCBzdHlsZT17dWkucH0+XG4gICAgICAgICAgICAgIEZvciBoaWdobHkgZHluYW1pYyBjb250ZW50LCB5b3UgY2FuIHVzZSBjbGllbnQtc2lkZSByZW5kZXJpbmcgd2l0aFxuICAgICAgICAgICAgICBSZWFjdCBob29rczpcbiAgICAgICAgICAgIDwvcD5cblxuICAgICAgICAgICAgPGRpdiBzdHlsZT17dWkuY29kZUJsb2NrfT5cbiAgICAgICAgICAgICAge2AvLyBwYWdlcy9kYXNoYm9hcmQuanN4XG5pbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUsIHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0JztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gRGFzaGJvYXJkKCkge1xuICBjb25zdCBbZGF0YSwgc2V0RGF0YV0gPSB1c2VTdGF0ZShudWxsKTtcbiAgY29uc3QgW2xvYWRpbmcsIHNldExvYWRpbmddID0gdXNlU3RhdGUodHJ1ZSk7XG4gIGNvbnN0IFtlcnJvciwgc2V0RXJyb3JdID0gdXNlU3RhdGUobnVsbCk7XG4gIFxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGFzeW5jIGZ1bmN0aW9uIGZldGNoRGF0YSgpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goJy9hcGkvZGFzaGJvYXJkLWRhdGEnKTtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgICAgICBzZXREYXRhKHJlc3VsdCk7XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgc2V0RXJyb3IoZXJyLm1lc3NhZ2UpO1xuICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgc2V0TG9hZGluZyhmYWxzZSk7XG4gICAgICB9XG4gICAgfVxuICAgIFxuICAgIGZldGNoRGF0YSgpO1xuICB9LCBbXSk7XG4gIFxuICBpZiAobG9hZGluZykgcmV0dXJuIDxkaXY+TG9hZGluZy4uLjwvZGl2PjtcbiAgaWYgKGVycm9yKSByZXR1cm4gPGRpdj5FcnJvcjoge2Vycm9yfTwvZGl2PjtcbiAgXG4gIHJldHVybiAoXG4gICAgPGRpdj5cbiAgICAgIDxoMT5EYXNoYm9hcmQ8L2gxPlxuICAgICAgPHByZT57SlNPTi5zdHJpbmdpZnkoZGF0YSwgbnVsbCwgMil9PC9wcmU+XG4gICAgPC9kaXY+XG4gICk7XG59YH1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPGRpdiBzdHlsZT17dWkuc2VjdGlvbn0+XG4gICAgICAgICAgICA8aDIgc3R5bGU9e3VpLmgyfT5IeWJyaWQgUmVuZGVyaW5nPC9oMj5cbiAgICAgICAgICAgIDxwIHN0eWxlPXt1aS5wfT5cbiAgICAgICAgICAgICAgQ29tYmluZSBkaWZmZXJlbnQgcmVuZGVyaW5nIHN0cmF0ZWdpZXMgaW4gdGhlIHNhbWUgYXBwbGljYXRpb246XG4gICAgICAgICAgICA8L3A+XG5cbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3VpLmNvZGVCbG9ja30+XG4gICAgICAgICAgICAgIHtgLy8gcGFnZXMvaHlicmlkLXBhZ2UuanN4XG5pbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUsIHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0JztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gSHlicmlkUGFnZSh7IHN0YXRpY0RhdGEsIHNlcnZlckRhdGEgfSkge1xuICBjb25zdCBbY2xpZW50RGF0YSwgc2V0Q2xpZW50RGF0YV0gPSB1c2VTdGF0ZShudWxsKTtcbiAgXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgLy8gRmV0Y2ggYWRkaXRpb25hbCBkYXRhIG9uIHRoZSBjbGllbnRcbiAgICBmZXRjaCgnL2FwaS91c2VyLXNwZWNpZmljLWRhdGEnKVxuICAgICAgLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpXG4gICAgICAudGhlbihzZXRDbGllbnREYXRhKTtcbiAgfSwgW10pO1xuICBcbiAgcmV0dXJuIChcbiAgICA8ZGl2PlxuICAgICAgey8qIFN0YXRpYyBjb250ZW50IChidWlsdCBhdCBidWlsZCB0aW1lKSAqL31cbiAgICAgIDxzZWN0aW9uPlxuICAgICAgICA8aDI+U3RhdGljIENvbnRlbnQ8L2gyPlxuICAgICAgICA8cD57c3RhdGljRGF0YS5kZXNjcmlwdGlvbn08L3A+XG4gICAgICA8L3NlY3Rpb24+XG4gICAgICBcbiAgICAgIHsvKiBTZXJ2ZXItcmVuZGVyZWQgY29udGVudCAocmVuZGVyZWQgb24gZWFjaCByZXF1ZXN0KSAqL31cbiAgICAgIDxzZWN0aW9uPlxuICAgICAgICA8aDI+U2VydmVyIERhdGE8L2gyPlxuICAgICAgICA8cD5DdXJyZW50IHRpbWU6IHtzZXJ2ZXJEYXRhLnRpbWVzdGFtcH08L3A+XG4gICAgICA8L3NlY3Rpb24+XG4gICAgICBcbiAgICAgIHsvKiBDbGllbnQtcmVuZGVyZWQgY29udGVudCAocmVuZGVyZWQgaW4gYnJvd3NlcikgKi99XG4gICAgICA8c2VjdGlvbj5cbiAgICAgICAgPGgyPlVzZXItU3BlY2lmaWMgRGF0YTwvaDI+XG4gICAgICAgIHtjbGllbnREYXRhID8gKFxuICAgICAgICAgIDxwPldlbGNvbWUsIHtjbGllbnREYXRhLnVzZXJuYW1lfSE8L3A+XG4gICAgICAgICkgOiAoXG4gICAgICAgICAgPHA+TG9hZGluZyB1c2VyIGRhdGEuLi48L3A+XG4gICAgICAgICl9XG4gICAgICA8L3NlY3Rpb24+XG4gICAgPC9kaXY+XG4gICk7XG59XG5cbi8vIFN0YXRpYyBkYXRhIChJU1Igd2l0aCByZXZhbGlkYXRpb24pXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0U3RhdGljUHJvcHMoKSB7XG4gIGNvbnN0IHN0YXRpY0RhdGEgPSBhd2FpdCBmZXRjaFN0YXRpY0NvbnRlbnQoKTtcbiAgXG4gIHJldHVybiB7XG4gICAgcHJvcHM6IHtcbiAgICAgIHN0YXRpY0RhdGFcbiAgICB9LFxuICAgIHJldmFsaWRhdGU6IDg2NDAwIC8vIFJldmFsaWRhdGUgb25jZSBwZXIgZGF5XG4gIH07XG59XG5cbi8vIFNlcnZlciBkYXRhIChyZW5kZXJlZCBvbiBlYWNoIHJlcXVlc3QpXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0U2VydmVyU2lkZVByb3BzKCkge1xuICBjb25zdCBzZXJ2ZXJEYXRhID0ge1xuICAgIHRpbWVzdGFtcDogbmV3IERhdGUoKS50b0lTT1N0cmluZygpXG4gIH07XG4gIFxuICByZXR1cm4ge1xuICAgIHByb3BzOiB7XG4gICAgICBzZXJ2ZXJEYXRhXG4gICAgfVxuICB9O1xufWB9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIDxkaXYgc3R5bGU9e3VpLnNlY3Rpb259PlxuICAgICAgICAgICAgPGgyIHN0eWxlPXt1aS5oMn0+UGVyZm9ybWFuY2UgT3B0aW1pemF0aW9uPC9oMj5cblxuICAgICAgICAgICAgPGgzIHN0eWxlPXt1aS5oM30+Q2FjaGluZyBTdHJhdGVnaWVzPC9oMz5cbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3VpLmNvZGVCbG9ja30+XG4gICAgICAgICAgICAgIHtgLy8gcGFnZXMvYXBpL2NhY2hlZC1kYXRhLmpzXG5leHBvcnQgZGVmYXVsdCBhc3luYyBmdW5jdGlvbiBoYW5kbGVyKHsgcmVxLCByZXMgfSkge1xuICAvLyBTZXQgY2FjaGUgaGVhZGVyc1xuICByZXMuc2V0SGVhZGVyKFxuICAgICdDYWNoZS1Db250cm9sJyxcbiAgICAncHVibGljLCBzLW1heGFnZT0xMCwgc3RhbGUtd2hpbGUtcmV2YWxpZGF0ZT01OSdcbiAgKTtcbiAgXG4gIGNvbnN0IGRhdGEgPSBhd2FpdCBmZXRjaEV4cGVuc2l2ZURhdGEoKTtcbiAgcmVzLmpzb24oZGF0YSk7XG59XG5cbi8vIHBhZ2VzL29wdGltaXplZC1wYWdlLmpzeFxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFN0YXRpY1Byb3BzKCkge1xuICBjb25zdCBkYXRhID0gYXdhaXQgZmV0Y2hEYXRhKCk7XG4gIFxuICByZXR1cm4ge1xuICAgIHByb3BzOiB7IGRhdGEgfSxcbiAgICAvLyBDYWNoZSBmb3IgMSBob3VyLCByZXZhbGlkYXRlIGluIGJhY2tncm91bmRcbiAgICByZXZhbGlkYXRlOiAzNjAwXG4gIH07XG59YH1cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICA8aDMgc3R5bGU9e3VpLmgzfT5TdHJlYW1pbmcgU1NSIChSZWFjdCAxOCk8L2gzPlxuICAgICAgICAgICAgPGRpdiBzdHlsZT17dWkuY29kZUJsb2NrfT5cbiAgICAgICAgICAgICAge2AvLyBpbmRqcy5jb25maWcuanNcbmV4cG9ydCBkZWZhdWx0IHtcbiAgZXhwZXJpbWVudGFsOiB7XG4gICAgc3RyZWFtaW5nOiB0cnVlXG4gIH1cbn07XG5cbi8vIHBhZ2VzL3N0cmVhbWluZy1wYWdlLmpzeFxuaW1wb3J0IHsgU3VzcGVuc2UgfSBmcm9tICdyZWFjdCc7XG5cbmZ1bmN0aW9uIFNsb3dDb21wb25lbnQoKSB7XG4gIC8vIFRoaXMgY29tcG9uZW50IGNhbiBzdHJlYW0gaW4gYWZ0ZXIgdGhlIGluaXRpYWwgSFRNTFxuICByZXR1cm4gPGRpdj5TbG93IGxvYWRpbmcgY29udGVudDwvZGl2Pjtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gU3RyZWFtaW5nUGFnZSgpIHtcbiAgcmV0dXJuIChcbiAgICA8ZGl2PlxuICAgICAgPGgxPkZhc3QgbG9hZGluZyBoZWFkZXI8L2gxPlxuICAgICAgPFN1c3BlbnNlIGZhbGxiYWNrPXs8ZGl2PkxvYWRpbmcuLi48L2Rpdj59PlxuICAgICAgICA8U2xvd0NvbXBvbmVudCAvPlxuICAgICAgPC9TdXNwZW5zZT5cbiAgICA8L2Rpdj5cbiAgKTtcbn1gfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8ZGl2IHN0eWxlPXt1aS5zdWNjZXNzfT5cbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3VpLnN1Y2Nlc3NUaXRsZX0+XHUyNzA1IEJlc3QgUHJhY3RpY2VzPC9kaXY+XG4gICAgICAgICAgICA8dWwgc3R5bGU9e3sgbWFyZ2luOiAwLCBmb250U2l6ZTogMTQsIGNvbG9yOiBcIiMxNTgwM2RcIiB9fT5cbiAgICAgICAgICAgICAgPGxpPlVzZSBTU0cgZm9yIHN0YXRpYyBjb250ZW50IChtYXJrZXRpbmcgcGFnZXMsIGJsb2dzKTwvbGk+XG4gICAgICAgICAgICAgIDxsaT5Vc2UgU1NSIGZvciBkeW5hbWljLCB1c2VyLXNwZWNpZmljIGNvbnRlbnQ8L2xpPlxuICAgICAgICAgICAgICA8bGk+VXNlIElTUiBmb3IgY29udGVudCB0aGF0IGNoYW5nZXMgb2NjYXNpb25hbGx5PC9saT5cbiAgICAgICAgICAgICAgPGxpPlVzZSBDU1IgZm9yIGhpZ2hseSBpbnRlcmFjdGl2ZSBkYXNoYm9hcmRzPC9saT5cbiAgICAgICAgICAgICAgPGxpPkNvbWJpbmUgc3RyYXRlZ2llcyBmb3Igb3B0aW1hbCBwZXJmb3JtYW5jZTwvbGk+XG4gICAgICAgICAgICA8L3VsPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L3NlY3Rpb24+XG4gICAgICA8L2Rpdj5cbiAgICA8L21haW4+XG4gICk7XG59XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQUEsT0FBTyxXQUFXO0FBc0hOLGNBa0JFLFlBbEJGO0FBcEhHLFNBQVIsU0FBMEI7QUFDL0IsUUFBTSxLQUFLO0FBQUEsSUFDVCxNQUFNO0FBQUEsTUFDSixZQUNFO0FBQUEsTUFDRixXQUFXO0FBQUEsTUFDWCxRQUFRO0FBQUEsTUFDUixZQUFZO0FBQUEsTUFDWixPQUFPO0FBQUEsSUFDVDtBQUFBLElBQ0EsTUFBTTtBQUFBLE1BQ0osVUFBVTtBQUFBLE1BQ1YsUUFBUTtBQUFBLE1BQ1IsU0FBUztBQUFBLElBQ1g7QUFBQSxJQUNBLE1BQU07QUFBQSxNQUNKLFlBQVk7QUFBQSxNQUNaLGNBQWM7QUFBQSxNQUNkLFNBQVM7QUFBQSxNQUNULFdBQVc7QUFBQSxJQUNiO0FBQUEsSUFDQSxJQUFJO0FBQUEsTUFDRixVQUFVO0FBQUEsTUFDVixZQUFZO0FBQUEsTUFDWixRQUFRO0FBQUEsTUFDUixPQUFPO0FBQUEsSUFDVDtBQUFBLElBQ0EsS0FBSztBQUFBLE1BQ0gsY0FBYztBQUFBLElBQ2hCO0FBQUEsSUFDQSxVQUFVO0FBQUEsTUFDUixPQUFPO0FBQUEsTUFDUCxnQkFBZ0I7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
