import React from "react";

export default function Routing() {
  const ui = {
    page: {
      fontFamily:
        "system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial",
      minHeight: "100vh",
      margin: 0,
      background: "linear-gradient(180deg, #0ea5e9 0%, #111827 60%)",
      color: "#0f172a",
    },
    wrap: {
      maxWidth: 980,
      margin: "0 auto",
      padding: "48px 20px",
    },
    hero: {
      background: "white",
      borderRadius: 16,
      padding: 28,
      boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
    },
    h1: {
      fontSize: 32,
      lineHeight: 1.1,
      margin: 0,
      color: "#0b1220",
    },
    nav: {
      marginBottom: 20,
    },
    backLink: {
      color: "#0ea5e9",
      textDecoration: "none",
      fontSize: 14,
    },
    section: {
      marginBottom: 32,
    },
    h2: {
      fontSize: 24,
      color: "#0b1220",
      marginBottom: 16,
      borderBottom: "2px solid #e2e8f0",
      paddingBottom: 8,
    },
    h3: {
      fontSize: 20,
      color: "#0b1220",
      marginBottom: 12,
      marginTop: 24,
    },
    p: {
      fontSize: 16,
      color: "#334155",
      lineHeight: 1.6,
      marginBottom: 16,
    },
    ul: {
      fontSize: 16,
      color: "#334155",
      lineHeight: 1.6,
      marginBottom: 16,
      paddingLeft: 20,
    },
    li: {
      marginBottom: 8,
    },
    code: {
      background: "#f1f5f9",
      padding: "2px 6px",
      borderRadius: 4,
      fontSize: 14,
      fontFamily: "monospace",
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
      lineHeight: 1.5,
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      marginBottom: 20,
    },
    th: {
      background: "#f8fafc",
      padding: 12,
      textAlign: "left",
      borderBottom: "2px solid #e2e8f0",
      fontWeight: 600,
    },
    td: {
      padding: 12,
      borderBottom: "1px solid #e2e8f0",
    },
  };

  return (
    <main style={ui.page}>
      <div style={ui.wrap}>
        <section style={ui.hero}>
          <nav style={ui.nav}>
            <a href="/docs" style={ui.backLink}>
              ← Back to Documentation
            </a>
          </nav>

          <h1 style={ui.h1}>Routing</h1>

          <div style={ui.section}>
            <h2 style={ui.h2}>File-based Routing</h2>
            <p style={ui.p}>
              INDJS uses file-based routing, which means the file structure in
              your <code style={ui.code}>pages</code> directory automatically
              becomes your application's routes. This approach is intuitive and
              requires zero configuration.
            </p>

            <table style={ui.table}>
              <thead>
                <tr>
                  <th style={ui.th}>File Path</th>
                  <th style={ui.th}>Route</th>
                  <th style={ui.th}>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={ui.td}>
                    <code style={ui.code}>pages/index.jsx</code>
                  </td>
                  <td style={ui.td}>
                    <code style={ui.code}>/</code>
                  </td>
                  <td style={ui.td}>Home page</td>
                </tr>
                <tr>
                  <td style={ui.td}>
                    <code style={ui.code}>pages/about.jsx</code>
                  </td>
                  <td style={ui.td}>
                    <code style={ui.code}>/about</code>
                  </td>
                  <td style={ui.td}>About page</td>
                </tr>
                <tr>
                  <td style={ui.td}>
                    <code style={ui.code}>pages/blog/index.jsx</code>
                  </td>
                  <td style={ui.td}>
                    <code style={ui.code}>/blog</code>
                  </td>
                  <td style={ui.td}>Blog listing page</td>
                </tr>
                <tr>
                  <td style={ui.td}>
                    <code style={ui.code}>pages/blog/post.jsx</code>
                  </td>
                  <td style={ui.td}>
                    <code style={ui.code}>/blog/post</code>
                  </td>
                  <td style={ui.td}>Static blog post page</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div style={ui.section}>
            <h2 style={ui.h2}>Dynamic Routes</h2>
            <p style={ui.p}>
              Dynamic routes allow you to create pages that match multiple URLs
              with parameters. Use square brackets{" "}
              <code style={ui.code}>[param]</code> in your filename to create
              dynamic segments.
            </p>

            <h3 style={ui.h3}>Single Dynamic Route</h3>
            <div style={ui.codeBlock}>
              {`// pages/blog/[slug].jsx
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
}`}
            </div>

            <h3 style={ui.h3}>Multiple Dynamic Segments</h3>
            <div style={ui.codeBlock}>
              {`// pages/shop/[category]/[product].jsx
export default function Product({ params }) {
  const { category, product } = params;
  
  return (
    <div>
      <h1>Category: {category}</h1>
      <h2>Product: {product}</h2>
    </div>
  );
}

// Matches: /shop/electronics/laptop, /shop/clothing/shirt, etc.`}
            </div>

            <h3 style={ui.h3}>Catch-all Routes</h3>
            <p style={ui.p}>
              Use <code style={ui.code}>[...slug]</code> to catch all remaining
              path segments:
            </p>
            <div style={ui.codeBlock}>
              {`// pages/docs/[...slug].jsx
export default function DocsPage({ params }) {
  const { slug } = params; // slug is an array
  
  return (
    <div>
      <h1>Docs Path: {slug.join('/')}</h1>
    </div>
  );
}

// Matches: /docs/getting-started, /docs/api/authentication, etc.`}
            </div>
          </div>

          <div style={ui.section}>
            <h2 style={ui.h2}>Navigation</h2>
            <p style={ui.p}>
              INDJS provides a built-in <code style={ui.code}>Link</code>{" "}
              component for client-side navigation:
            </p>

            <div style={ui.codeBlock}>
              {`import React from 'react';
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
}`}
            </div>

            <h3 style={ui.h3}>Router Hook</h3>
            <div style={ui.codeBlock}>
              {`import { useRouter } from 'indjs';

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
}`}
            </div>
          </div>

          <div style={ui.section}>
            <h2 style={ui.h2}>Route Groups</h2>
            <p style={ui.p}>
              Organize your routes without affecting the URL structure using
              parentheses <code style={ui.code}>(group)</code>:
            </p>

            <div style={ui.codeBlock}>
              {`pages/
├── (marketing)/
│   ├── about.jsx      → /about
│   └── contact.jsx    → /contact
├── (dashboard)/
│   ├── analytics.jsx  → /analytics
│   └── settings.jsx   → /settings
└── index.jsx          → /`}
            </div>
          </div>

          <div style={ui.section}>
            <h2 style={ui.h2}>Layouts</h2>
            <p style={ui.p}>Create shared layouts that wrap multiple pages:</p>

            <h3 style={ui.h3}>Root Layout</h3>
            <div style={ui.codeBlock}>
              {`// pages/_layout.jsx
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
}`}
            </div>

            <h3 style={ui.h3}>Nested Layouts</h3>
            <div style={ui.codeBlock}>
              {`// pages/dashboard/_layout.jsx
export default function DashboardLayout({ children }) {
  return (
    <div className="dashboard">
      <aside>/* Sidebar */</aside>
      <div className="content">{children}</div>
    </div>
  );
}

// pages/dashboard/analytics.jsx will be wrapped by both layouts`}
            </div>
          </div>

          <div style={ui.section}>
            <h2 style={ui.h2}>Middleware</h2>
            <p style={ui.p}>
              Add global middleware that runs before every request:
            </p>

            <div style={ui.codeBlock}>
              {`// pages/_middleware.js
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
}`}
            </div>
          </div>

          <div style={ui.section}>
            <h2 style={ui.h2}>Advanced Routing Features</h2>

            <h3 style={ui.h3}>Route Priorities</h3>
            <p style={ui.p}>
              Static routes take precedence over dynamic routes:
            </p>
            <ul style={ui.ul}>
              <li style={ui.li}>
                <code style={ui.code}>pages/blog/featured.jsx</code> →{" "}
                <code style={ui.code}>/blog/featured</code>
              </li>
              <li style={ui.li}>
                <code style={ui.code}>pages/blog/[slug].jsx</code> →{" "}
                <code style={ui.code}>/blog/other-posts</code>
              </li>
            </ul>

            <h3 style={ui.h3}>Optional Catch-all Routes</h3>
            <div style={ui.codeBlock}>
              {`// pages/shop/[[...slug]].jsx
// Matches: /shop, /shop/category, /shop/category/product

export default function Shop({ params }) {
  const { slug = [] } = params;
  
  if (slug.length === 0) return <ShopHome />;
  if (slug.length === 1) return <Category category={slug[0]} />;
  if (slug.length === 2) return <Product category={slug[0]} product={slug[1]} />;
}`}
            </div>

            <h3 style={ui.h3}>Route Validation</h3>
            <div style={ui.codeBlock}>
              {`// pages/user/[id].jsx
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
}`}
            </div>

            <h3 style={ui.h3}>Parallel Routes</h3>
            <p style={ui.p}>
              Render multiple pages simultaneously in the same layout:
            </p>
            <div style={ui.codeBlock}>
              {`// pages/dashboard/@analytics/page.jsx
export default function Analytics() {
  return (
    <div>
      <h2>Analytics Dashboard</h2>
      <AnalyticsCharts />
    </div>
  );
}

// pages/dashboard/@team/page.jsx
export default function Team() {
  return (
    <div>
      <h2>Team Overview</h2>
      <TeamMembers />
    </div>
  );
}

// pages/dashboard/layout.jsx
export default function DashboardLayout({ children, analytics, team }) {
  return (
    <div className="dashboard-layout">
      <main>{children}</main>
      <aside className="analytics-panel">{analytics}</aside>
      <aside className="team-panel">{team}</aside>
    </div>
  );
}`}
            </div>

            <h3 style={ui.h3}>Intercepting Routes</h3>
            <p style={ui.p}>Intercept routes to show modals or overlays:</p>
            <div style={ui.codeBlock}>
              {`// pages/gallery/(..)photo/[id].jsx - Intercepts /photo/[id]
import { useRouter } from 'indjs';
import Modal from '../../../components/Modal';

export default function PhotoModal({ params }) {
  const router = useRouter();
  const { id } = params;
  
  return (
    <Modal onClose={() => router.back()}>
      <PhotoViewer id={id} />
    </Modal>
  );
}

// pages/photo/[id].jsx - Regular photo page
export default function PhotoPage({ params }) {
  const { id } = params;
  
  return (
    <div>
      <PhotoViewer id={id} />
      <PhotoComments id={id} />
    </div>
  );
}`}
            </div>
          </div>

          <div style={ui.section}>
            <h2 style={ui.h2}>Route Performance Optimization</h2>

            <h3 style={ui.h3}>Route Prefetching</h3>
            <div style={ui.codeBlock}>
              {`// Automatic prefetching with Link component
import { Link } from 'indjs';

export default function Navigation() {
  return (
    <nav>
      {/* Prefetches on hover by default */}
      <Link href="/about" prefetch>About</Link>
      
      {/* Disable prefetching */}
      <Link href="/heavy-page" prefetch={false}>Heavy Page</Link>
      
      {/* Prefetch only in viewport */}
      <Link href="/blog" prefetch="viewport">Blog</Link>
    </nav>
  );
}

// Manual prefetching
import { useRouter } from 'indjs';

export default function MyComponent() {
  const router = useRouter();
  
  useEffect(() => {
    // Prefetch critical routes
    router.prefetch('/dashboard');
    router.prefetch('/profile');
  }, [router]);
  
  return <div>Content</div>;
}`}
            </div>

            <h3 style={ui.h3}>Route-based Code Splitting</h3>
            <div style={ui.codeBlock}>
              {`// Dynamic imports for code splitting
import dynamic from 'indjs/dynamic';
import { Suspense } from 'react';

// Lazy load heavy components
const HeavyChart = dynamic(() => import('../components/HeavyChart'), {
  loading: () => <div>Loading chart...</div>,
  ssr: false // Don't render on server
});

const AdminPanel = dynamic(() => import('../components/AdminPanel'), {
  loading: () => <div>Loading admin panel...</div>
});

export default function Dashboard({ user }) {
  return (
    <div>
      <h1>Dashboard</h1>
      
      <Suspense fallback={<div>Loading...</div>}>
        <HeavyChart />
      </Suspense>
      
      {user.role === 'admin' && (
        <Suspense fallback={<div>Loading admin features...</div>}>
          <AdminPanel />
        </Suspense>
      )}
    </div>
  );
}`}
            </div>

            <h3 style={ui.h3}>Route Caching Strategies</h3>
            <div style={ui.codeBlock}>
              {`// pages/blog/[slug].jsx
export async function getStaticProps({ params }) {
  const { slug } = params;
  const post = await fetchPost(slug);
  
  return {
    props: { post },
    revalidate: 3600, // Cache for 1 hour
    // Cache tags for fine-grained invalidation
    tags: ['posts', \`post-\${slug}\`]
  };
}

export async function getStaticPaths() {
  const posts = await fetchPopularPosts();
  
  return {
    paths: posts.map(post => ({ params: { slug: post.slug } })),
    fallback: 'blocking' // Generate other pages on-demand
  };
}

// Programmatic cache invalidation
// pages/api/revalidate.js
export default async function handler({ req, res }) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  const { slug, tags } = req.body;
  
  try {
    // Revalidate specific page
    if (slug) {
      await res.revalidate(\`/blog/\${slug}\`);
    }
    
    // Revalidate by tags
    if (tags) {
      await res.revalidateTag(tags);
    }
    
    return res.json({ revalidated: true });
  } catch (err) {
    return res.status(500).json({ error: 'Error revalidating' });
  }
}`}
            </div>
          </div>

          <div style={ui.section}>
            <h2 style={ui.h2}>Advanced Layout Patterns</h2>

            <h3 style={ui.h3}>Conditional Layouts</h3>
            <div style={ui.codeBlock}>
              {`// pages/admin/users.jsx
import AdminLayout from '../../layouts/AdminLayout';
import PublicLayout from '../../layouts/PublicLayout';

export default function UsersPage({ user, users }) {
  // Choose layout based on user role
  const Layout = user?.role === 'admin' ? AdminLayout : PublicLayout;
  
  return (
    <Layout>
      <h1>Users</h1>
      {user?.role === 'admin' ? (
        <AdminUsersList users={users} />
      ) : (
        <PublicUsersList users={users.filter(u => u.public)} />
      )}
    </Layout>
  );
}

// Alternative: Layout selection in getLayout
UsersPage.getLayout = function getLayout(page, { user }) {
  if (user?.role === 'admin') {
    return <AdminLayout>{page}</AdminLayout>;
  }
  return <PublicLayout>{page}</PublicLayout>;
};`}
            </div>

            <h3 style={ui.h3}>Nested Layout Composition</h3>
            <div style={ui.codeBlock}>
              {`// layouts/AppLayout.jsx
export default function AppLayout({ children }) {
  return (
    <div className="app">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

// layouts/DashboardLayout.jsx
export default function DashboardLayout({ children }) {
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="content">{children}</div>
    </div>
  );
}

// pages/dashboard/analytics.jsx
import AppLayout from '../../layouts/AppLayout';
import DashboardLayout from '../../layouts/DashboardLayout';

export default function Analytics() {
  return <div>Analytics content</div>;
}

// Compose multiple layouts
Analytics.getLayout = function getLayout(page) {
  return (
    <AppLayout>
      <DashboardLayout>
        {page}
      </DashboardLayout>
    </AppLayout>
  );
};`}
            </div>

            <h3 style={ui.h3}>Layout with Data Fetching</h3>
            <div style={ui.codeBlock}>
              {`// layouts/BlogLayout.jsx
import { useState, useEffect } from 'react';

export default function BlogLayout({ children }) {
  const [categories, setCategories] = useState([]);
  const [recentPosts, setRecentPosts] = useState([]);
  
  useEffect(() => {
    // Fetch layout-specific data
    Promise.all([
      fetch('/api/categories').then(r => r.json()),
      fetch('/api/posts/recent').then(r => r.json())
    ]).then(([cats, posts]) => {
      setCategories(cats);
      setRecentPosts(posts);
    });
  }, []);
  
  return (
    <div className="blog-layout">
      <aside className="sidebar">
        <div className="categories">
          <h3>Categories</h3>
          {categories.map(cat => (
            <Link key={cat.id} href={\`/blog/category/\${cat.slug}\`}>
              {cat.name}
            </Link>
          ))}
        </div>
        
        <div className="recent-posts">
          <h3>Recent Posts</h3>
          {recentPosts.map(post => (
            <Link key={post.id} href={\`/blog/\${post.slug}\`}>
              {post.title}
            </Link>
          ))}
        </div>
      </aside>
      
      <main className="content">
        {children}
      </main>
    </div>
  );
}`}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
