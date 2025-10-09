import React from 'react';

export default function SsrSsg() {
  const ui = {
    page: {
      fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial',
      minHeight: '100vh',
      margin: 0,
      background: 'linear-gradient(180deg, #0ea5e9 0%, #111827 60%)',
      color: '#0f172a'
    },
    wrap: {
      maxWidth: 980,
      margin: '0 auto',
      padding: '48px 20px'
    },
    hero: {
      background: 'white',
      borderRadius: 16,
      padding: 28,
      boxShadow: '0 10px 30px rgba(0,0,0,0.12)'
    },
    h1: {
      fontSize: 32,
      lineHeight: 1.1,
      margin: 0,
      color: '#0b1220'
    },
    nav: {
      marginBottom: 20
    },
    backLink: {
      color: '#0ea5e9',
      textDecoration: 'none',
      fontSize: 14
    },
    section: {
      marginBottom: 32
    },
    h2: {
      fontSize: 24,
      color: '#0b1220',
      marginBottom: 16,
      borderBottom: '2px solid #e2e8f0',
      paddingBottom: 8
    },
    h3: {
      fontSize: 20,
      color: '#0b1220',
      marginBottom: 12,
      marginTop: 24
    },
    p: {
      fontSize: 16,
      color: '#334155',
      lineHeight: 1.6,
      marginBottom: 16
    },
    ul: {
      fontSize: 16,
      color: '#334155',
      lineHeight: 1.6,
      marginBottom: 16,
      paddingLeft: 20
    },
    li: {
      marginBottom: 8
    },
    code: {
      background: '#f1f5f9',
      padding: '2px 6px',
      borderRadius: 4,
      fontSize: 14,
      fontFamily: 'monospace'
    },
    codeBlock: {
      background: '#1e293b',
      color: '#e2e8f0',
      padding: 20,
      borderRadius: 8,
      fontSize: 14,
      fontFamily: 'monospace',
      overflow: 'auto',
      marginBottom: 20,
      lineHeight: 1.5
    },
    info: {
      background: '#dbeafe',
      border: '1px solid #3b82f6',
      borderRadius: 8,
      padding: 16,
      marginBottom: 20
    },
    infoTitle: {
      fontWeight: 600,
      color: '#1e40af',
      marginBottom: 8
    },
    success: {
      background: '#dcfce7',
      border: '1px solid #16a34a',
      borderRadius: 8,
      padding: 16,
      marginBottom: 20
    },
    successTitle: {
      fontWeight: 600,
      color: '#15803d',
      marginBottom: 8
    }
  };

  return (
    <main style={ui.page}>
      <div style={ui.wrap}>
        <section style={ui.hero}>
          <nav style={ui.nav}>
            <a href="/docs" style={ui.backLink}>← Back to Documentation</a>
          </nav>
          
          <h1 style={ui.h1}>SSR & SSG</h1>
          
          <div style={ui.section}>
            <h2 style={ui.h2}>Overview</h2>
            <p style={ui.p}>
              INDJS supports both Server-Side Rendering (SSR) and Static Site Generation (SSG) out of the box. 
              This gives you the flexibility to choose the best rendering strategy for each page in your application.
            </p>
            
            <div style={ui.info}>
              <div style={ui.infoTitle}>💡 Key Benefits</div>
              <ul style={{ margin: 0, fontSize: 14, color: '#1e40af' }}>
                <li>Better SEO with pre-rendered HTML</li>
                <li>Faster initial page loads</li>
                <li>Improved Core Web Vitals</li>
                <li>Better performance on slow networks</li>
              </ul>
            </div>
          </div>

          <div style={ui.section}>
            <h2 style={ui.h2}>Server-Side Rendering (SSR)</h2>
            <p style={ui.p}>
              SSR generates HTML on the server for each request. This is perfect for dynamic content that changes frequently.
            </p>
            
            <h3 style={ui.h3}>Basic SSR with getServerSideProps</h3>
            <div style={ui.codeBlock}>
              {`// pages/blog/[slug].jsx
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
}`}
            </div>

            <h3 style={ui.h3}>Context Object</h3>
            <p style={ui.p}>The context object passed to <code style={ui.code}>getServerSideProps</code> contains:</p>
            <div style={ui.codeBlock}>
              {`export async function getServerSideProps(context) {
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
}`}
            </div>
          </div>

          <div style={ui.section}>
            <h2 style={ui.h2}>Static Site Generation (SSG)</h2>
            <p style={ui.p}>
              SSG pre-renders pages at build time. This is ideal for content that doesn't change often, 
              providing the fastest possible loading times.
            </p>
            
            <h3 style={ui.h3}>Basic SSG with getStaticProps</h3>
            <div style={ui.codeBlock}>
              {`// pages/about.jsx
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
}`}
            </div>

            <h3 style={ui.h3}>Dynamic SSG with getStaticPaths</h3>
            <div style={ui.codeBlock}>
              {`// pages/products/[id].jsx
import React from 'react';

export default function Product({ product }) {
  return (
    <div>
      <h1>{product.name}</h1>
      <p>Price: $\{product.price}</p>
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
}`}
            </div>
          </div>

          <div style={ui.section}>
            <h2 style={ui.h2}>Incremental Static Regeneration (ISR)</h2>
            <p style={ui.p}>
              ISR allows you to update static content after you've built your site. You get the benefits of static generation 
              with the flexibility of server-side rendering.
            </p>
            
            <div style={ui.codeBlock}>
              {`// pages/news/[slug].jsx
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
}`}
            </div>

            <h3 style={ui.h3}>Fallback Options</h3>
            <ul style={ui.ul}>
              <li style={ui.li}><strong>false:</strong> Any paths not returned by getStaticPaths will result in a 404 page</li>
              <li style={ui.li}><strong>true:</strong> Show a loading state, then render the page after getStaticProps completes</li>
              <li style={ui.li}><strong>'blocking':</strong> Wait for getStaticProps to complete before showing the page</li>
            </ul>
          </div>

          <div style={ui.section}>
            <h2 style={ui.h2}>Client-Side Rendering (CSR)</h2>
            <p style={ui.p}>
              For highly dynamic content, you can use client-side rendering with React hooks:
            </p>
            
            <div style={ui.codeBlock}>
              {`// pages/dashboard.jsx
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
}`}
            </div>
          </div>

          <div style={ui.section}>
            <h2 style={ui.h2}>Hybrid Rendering</h2>
            <p style={ui.p}>
              Combine different rendering strategies in the same application:
            </p>
            
            <div style={ui.codeBlock}>
              {`// pages/hybrid-page.jsx
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
}`}
            </div>
          </div>

          <div style={ui.section}>
            <h2 style={ui.h2}>Performance Optimization</h2>
            
            <h3 style={ui.h3}>Caching Strategies</h3>
            <div style={ui.codeBlock}>
              {`// pages/api/cached-data.js
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
}`}
            </div>

            <h3 style={ui.h3}>Streaming SSR (React 18)</h3>
            <div style={ui.codeBlock}>
              {`// indjs.config.js
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
}`}
            </div>
          </div>

          <div style={ui.success}>
            <div style={ui.successTitle}>✅ Best Practices</div>
            <ul style={{ margin: 0, fontSize: 14, color: '#15803d' }}>
              <li>Use SSG for static content (marketing pages, blogs)</li>
              <li>Use SSR for dynamic, user-specific content</li>
              <li>Use ISR for content that changes occasionally</li>
              <li>Use CSR for highly interactive dashboards</li>
              <li>Combine strategies for optimal performance</li>
            </ul>
          </div>
        </section>
      </div>
    </main>
  );
}
