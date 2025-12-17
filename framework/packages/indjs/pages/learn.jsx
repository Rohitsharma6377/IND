import React from "react";

export default function Learn() {
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
      marginBottom: 24,
    },
    h2: {
      fontSize: 24,
      color: "#0b1220",
      marginBottom: 12,
    },
    p: {
      fontSize: 16,
      color: "#334155",
      lineHeight: 1.6,
      marginBottom: 12,
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
      whiteSpace: "pre-wrap",
    },
  };

  return (
    <main style={ui.page}>
      <div style={ui.wrap}>
        <section style={ui.hero}>
          <nav style={ui.nav}>
            <a href="/" style={ui.backLink}>
              ← Back to Home
            </a>
          </nav>

          <h1 style={ui.h1}>Getting Started with INDJS</h1>
          <p
            style={{
              fontSize: 18,
              color: "#64748b",
              marginBottom: 32,
              lineHeight: 1.6,
            }}
          >
            Build modern full-stack React applications with zero configuration.
            INDJS provides everything you need to create fast, scalable web
            applications with built-in SSR, API routes, and deployment tools.
          </p>

          <div style={ui.section}>
            <h2 style={ui.h2}>🚀 Quick Start</h2>
            <p style={ui.p}>
              Create a new INDJS application with a single command and start
              building immediately:
            </p>
            <div style={ui.codeBlock}>
              {`# Create a new INDJS app
npx create-indjs my-app

# Navigate to your project
cd my-app

# Start the development server
npm run dev

# Your app is now running at http://localhost:3000`}
            </div>
            <div
              style={{
                background: "#dbeafe",
                border: "1px solid #3b82f6",
                borderRadius: 8,
                padding: 16,
                marginTop: 16,
              }}
            >
              <div
                style={{ fontWeight: 600, color: "#1e40af", marginBottom: 8 }}
              >
                💡 Pro Tip
              </div>
              <p style={{ margin: 0, fontSize: 14, color: "#1e40af" }}>
                Use templates to get started faster:{" "}
                <code style={ui.code}>
                  npx create-indjs my-blog --template blog
                </code>
                <br />
                Available templates: basic, blog, admin, ecommerce, ai-app
              </p>
            </div>
          </div>

          <div style={ui.section}>
            <h2 style={ui.h2}>📁 Project Structure</h2>
            <p style={ui.p}>
              INDJS follows a simple, intuitive project structure that scales
              with your application:
            </p>
            <div style={ui.codeBlock}>
              {`my-app/
├── pages/                 # File-based routing
│   ├── index.jsx         # Home page (/)
│   ├── about.jsx         # About page (/about)
│   ├── blog/
│   │   ├── index.jsx     # Blog listing (/blog)
│   │   └── [slug].jsx    # Dynamic blog post (/blog/my-post)
│   └── api/              # API routes
│       ├── hello.js      # API endpoint (/api/hello)
│       └── users/
│           └── [id].js   # Dynamic API route (/api/users/123)
├── components/           # Reusable React components
├── lib/                  # Utility functions and configurations
├── public/               # Static assets (images, favicon, etc.)
├── styles/               # Global CSS and styling
├── package.json
└── indjs.config.js      # Optional configuration`}
            </div>
          </div>

          <div style={ui.section}>
            <h2 style={ui.h2}>🛣️ File-based Routing</h2>
            <p style={ui.p}>
              Pages are automatically routed based on their file structure. No
              configuration needed!
            </p>
            <div style={ui.codeBlock}>
              {`// File structure → Routes
pages/index.jsx           → /
pages/about.jsx           → /about
pages/contact.jsx         → /contact
pages/blog/index.jsx      → /blog
pages/blog/[slug].jsx     → /blog/my-post
pages/shop/[...slug].jsx  → /shop/category/product
pages/api/users.js        → /api/users
pages/api/auth/login.js   → /api/auth/login`}
            </div>

            <h3 style={ui.h3}>Creating Your First Page</h3>
            <div style={ui.codeBlock}>
              {`// pages/about.jsx
import React from 'react';

export default function About() {
  return (
    <div>
      <h1>About Us</h1>
      <p>Welcome to our amazing INDJS application!</p>
    </div>
  );
}`}
            </div>
          </div>

          <div style={ui.section}>
            <h2 style={ui.h2}>🔌 API Routes</h2>
            <p style={ui.p}>
              Build full-stack applications with serverless API endpoints. Just
              create files in <code style={ui.code}>pages/api/</code>:
            </p>
            <div style={ui.codeBlock}>
              {`// pages/api/hello.js
export default function handler({ req, res }) {
  res.json({ 
    message: 'Hello from INDJS API!',
    timestamp: new Date().toISOString()
  });
}

// pages/api/users/[id].js
export default async function handler({ req, res, params }) {
  const { id } = params;
  
  if (req.method === 'GET') {
    const user = await getUserById(id);
    res.json(user);
  } else if (req.method === 'PUT') {
    const updatedUser = await updateUser(id, req.body);
    res.json(updatedUser);
  }
}`}
            </div>
          </div>

          <div style={ui.section}>
            <h2 style={ui.h2}>⚡ Server-Side Rendering</h2>
            <p style={ui.p}>
              Get better SEO and performance with built-in SSR. Fetch data on
              the server before rendering:
            </p>
            <div style={ui.codeBlock}>
              {`// pages/blog/[slug].jsx
import React from 'react';

export default function BlogPost({ post, author }) {
  return (
    <article>
      <h1>{post.title}</h1>
      <p>By {author.name} • {post.publishedAt}</p>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  );
}

// Fetch data on each request (SSR)
export async function getServerSideProps({ params }) {
  const { slug } = params;
  const post = await fetchBlogPost(slug);
  const author = await fetchAuthor(post.authorId);
  
  return {
    props: { post, author }
  };
}

// Or generate static pages at build time (SSG)
export async function getStaticProps({ params }) {
  const { slug } = params;
  const post = await fetchBlogPost(slug);
  
  return {
    props: { post },
    revalidate: 3600 // Regenerate every hour
  };
}`}
            </div>
          </div>

          <div style={ui.section}>
            <h2 style={ui.h2}>🎨 Built-in Styling</h2>
            <p style={ui.p}>
              INDJS comes with Tailwind CSS pre-configured. Start styling
              immediately:
            </p>
            <div style={ui.codeBlock}>
              {`// pages/dashboard.jsx
export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Dashboard
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <h3 className="text-lg font-medium text-gray-900">
                  Total Users
                </h3>
                <p className="text-3xl font-bold text-blue-600">1,234</p>
              </div>
            </div>
            {/* More cards... */}
          </div>
        </div>
      </div>
    </div>
  );
}`}
            </div>
          </div>

          <div style={ui.section}>
            <h2 style={ui.h2}>🚀 Next Steps</h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: 16,
              }}
            >
              <div
                style={{
                  background: "#f8fafc",
                  borderRadius: 12,
                  padding: 20,
                  border: "1px solid #e2e8f0",
                }}
              >
                <h3
                  style={{
                    fontSize: 18,
                    fontWeight: 600,
                    color: "#0b1220",
                    marginBottom: 8,
                  }}
                >
                  📖 Learn the Basics
                </h3>
                <p style={{ fontSize: 14, color: "#475569", marginBottom: 12 }}>
                  Master routing, API routes, and SSR/SSG
                </p>
                <a
                  href="/docs/routing"
                  style={{
                    color: "#0ea5e9",
                    textDecoration: "none",
                    fontSize: 14,
                    fontWeight: 500,
                  }}
                >
                  Start Learning →
                </a>
              </div>

              <div
                style={{
                  background: "#f8fafc",
                  borderRadius: 12,
                  padding: 20,
                  border: "1px solid #e2e8f0",
                }}
              >
                <h3
                  style={{
                    fontSize: 18,
                    fontWeight: 600,
                    color: "#0b1220",
                    marginBottom: 8,
                  }}
                >
                  🔐 Add Authentication
                </h3>
                <p style={{ fontSize: 14, color: "#475569", marginBottom: 12 }}>
                  Secure your app with JWT, OAuth, and sessions
                </p>
                <a
                  href="/docs/authentication"
                  style={{
                    color: "#0ea5e9",
                    textDecoration: "none",
                    fontSize: 14,
                    fontWeight: 500,
                  }}
                >
                  Add Auth →
                </a>
              </div>

              <div
                style={{
                  background: "#f8fafc",
                  borderRadius: 12,
                  padding: 20,
                  border: "1px solid #e2e8f0",
                }}
              >
                <h3
                  style={{
                    fontSize: 18,
                    fontWeight: 600,
                    color: "#0b1220",
                    marginBottom: 8,
                  }}
                >
                  🗄️ Connect Database
                </h3>
                <p style={{ fontSize: 14, color: "#475569", marginBottom: 12 }}>
                  Integrate MongoDB, PostgreSQL, or Prisma
                </p>
                <a
                  href="/docs/database"
                  style={{
                    color: "#0ea5e9",
                    textDecoration: "none",
                    fontSize: 14,
                    fontWeight: 500,
                  }}
                >
                  Connect DB →
                </a>
              </div>

              <div
                style={{
                  background: "#f8fafc",
                  borderRadius: 12,
                  padding: 20,
                  border: "1px solid #e2e8f0",
                }}
              >
                <h3
                  style={{
                    fontSize: 18,
                    fontWeight: 600,
                    color: "#0b1220",
                    marginBottom: 8,
                  }}
                >
                  🌐 Deploy Your App
                </h3>
                <p style={{ fontSize: 14, color: "#475569", marginBottom: 12 }}>
                  Deploy to Vercel, Netlify, or AWS
                </p>
                <a
                  href="/docs/deployment"
                  style={{
                    color: "#0ea5e9",
                    textDecoration: "none",
                    fontSize: 14,
                    fontWeight: 500,
                  }}
                >
                  Deploy Now →
                </a>
              </div>
            </div>
          </div>

          <div
            style={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              borderRadius: 12,
              padding: 24,
              marginTop: 32,
              color: "white",
            }}
          >
            <h2
              style={{
                fontSize: 20,
                fontWeight: 600,
                marginBottom: 12,
                color: "white",
              }}
            >
              Ready to Build Something Amazing?
            </h2>
            <p
              style={{
                fontSize: 16,
                marginBottom: 16,
                color: "rgba(255,255,255,0.9)",
              }}
            >
              Join thousands of developers building modern web applications with
              INDJS.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <a
                href="/docs"
                style={{
                  background: "rgba(255,255,255,0.2)",
                  color: "white",
                  padding: "10px 16px",
                  borderRadius: 8,
                  textDecoration: "none",
                  fontWeight: 600,
                  fontSize: 14,
                }}
              >
                View Documentation
              </a>
              <a
                href="https://github.com/indjs/indjs"
                style={{
                  background: "transparent",
                  color: "white",
                  padding: "10px 16px",
                  borderRadius: 8,
                  textDecoration: "none",
                  fontWeight: 600,
                  fontSize: 14,
                  border: "1px solid rgba(255,255,255,0.3)",
                }}
              >
                GitHub Repository
              </a>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
