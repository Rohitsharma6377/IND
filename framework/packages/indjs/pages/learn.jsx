import React from "react";

export default function Learn() {
  return (
    <main className="min-h-screen bg-slate-900 bg-gradient-to-b from-sky-500 via-sky-500 to-gray-900 text-slate-900 font-sans">
      <div className="max-w-[980px] mx-auto px-5 py-12">
        <section className="bg-white rounded-2xl p-7 shadow-[0_10px_30px_rgba(0,0,0,0.12)]">
          <nav className="mb-5">
            <a href="/" className="text-sky-500 hover:text-sky-600 no-underline text-sm font-medium transition-colors">
              ← Back to Home
            </a>
          </nav>

          <h1 className="text-3xl font-extrabold leading-tight m-0 text-[#0b1220]">Getting Started with INDJS</h1>
          <p className="text-lg text-slate-500 mb-8 mt-3 font-medium max-w-2xl leading-relaxed">
            Build modern full-stack React applications with zero configuration.
            INDJS provides everything you need to create fast, scalable web
            applications with built-in SSR, API routes, and deployment tools.
          </p>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-[#0b1220] mb-3 flex items-center gap-2">🚀 Quick Start</h2>
            <p className="text-base text-slate-600 leading-relaxed mb-4">
              Create a new INDJS application with a single command and start
              building immediately:
            </p>
            <div className="bg-slate-900 text-slate-200 p-5 rounded-xl font-mono text-sm overflow-auto mb-5 leading-relaxed whitespace-pre-wrap">
              {`# Create a new INDJS app
npx create-indjs my-app

# Navigate to your project
cd my-app

# Start the development server
npm run dev

# Your app is now running at http://localhost:3000`}
            </div>
            <div className="bg-sky-50 border border-sky-200 rounded-xl p-5 mt-4">
              <div className="font-bold text-sky-800 mb-2 flex items-center gap-1.5">
                <span className="text-sky-600">💡</span> Pro Tip
              </div>
              <p className="m-0 text-sm text-sky-800 leading-relaxed">
                Use templates to get started faster:{" "}
                <code className="bg-white/50 px-1.5 py-0.5 rounded font-mono text-xs">
                  npx create-indjs my-blog --template blog
                </code>
                <br />
                <span className="mt-1 block text-sky-600">Available templates: basic, blog, admin, ecommerce, ai-app</span>
              </p>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-[#0b1220] mb-3 flex items-center gap-2">📁 Project Structure</h2>
            <p className="text-base text-slate-600 leading-relaxed mb-4">
              INDJS follows a simple, intuitive project structure that scales
              with your application:
            </p>
            <div className="bg-slate-900 text-slate-200 p-5 rounded-xl font-mono text-sm overflow-auto mb-5 leading-relaxed whitespace-pre-wrap">
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

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-[#0b1220] mb-3 flex items-center gap-2">🛣️ File-based Routing</h2>
            <p className="text-base text-slate-600 leading-relaxed mb-4">
              Pages are automatically routed based on their file structure. No
              configuration needed!
            </p>
            <div className="bg-slate-900 text-slate-200 p-5 rounded-xl font-mono text-sm overflow-auto mb-5 leading-relaxed whitespace-pre-wrap">
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

            <h3 className="text-lg font-bold text-[#0b1220] mb-3">Creating Your First Page</h3>
            <div className="bg-slate-900 text-slate-200 p-5 rounded-xl font-mono text-sm overflow-auto mb-5 leading-relaxed whitespace-pre-wrap">
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

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-[#0b1220] mb-3 flex items-center gap-2">🔌 API Routes</h2>
            <p className="text-base text-slate-600 leading-relaxed mb-4">
              Build full-stack applications with serverless API endpoints. Just
              create files in <code className="bg-slate-100 px-1.5 py-0.5 rounded font-mono text-xs">pages/api/</code>:
            </p>
            <div className="bg-slate-900 text-slate-200 p-5 rounded-xl font-mono text-sm overflow-auto mb-5 leading-relaxed whitespace-pre-wrap">
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

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-[#0b1220] mb-3 flex items-center gap-2">⚡ Server-Side Rendering</h2>
            <p className="text-base text-slate-600 leading-relaxed mb-4">
              Get better SEO and performance with built-in SSR. Fetch data on
              the server before rendering:
            </p>
            <div className="bg-slate-900 text-slate-200 p-5 rounded-xl font-mono text-sm overflow-auto mb-5 leading-relaxed whitespace-pre-wrap">
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

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-[#0b1220] mb-3 flex items-center gap-2">🎨 Built-in Styling</h2>
            <p className="text-base text-slate-600 leading-relaxed mb-4">
              INDJS comes with Tailwind CSS pre-configured. Start styling
              immediately:
            </p>
            <div className="bg-slate-900 text-slate-200 p-5 rounded-xl font-mono text-sm overflow-auto mb-5 leading-relaxed whitespace-pre-wrap">
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

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-[#0b1220] mb-6 flex items-center gap-2">🚀 Next Steps</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
              <div className="bg-slate-50 border border-slate-100 rounded-xl p-6 hover:border-sky-100 hover:bg-sky-50/30 transition-all">
                <h3 className="text-lg font-bold text-[#0b1220] mb-2 flex items-center gap-2">
                  📖 Learn the Basics
                </h3>
                <p className="text-sm text-slate-500 mb-4 leading-relaxed">
                  Master routing, API routes, and SSR/SSG patterns.
                </p>
                <a href="/docs/routing" className="text-sky-500 hover:text-sky-600 no-underline text-sm font-semibold transition-colors flex items-center gap-1 group">
                  Start Learning <span className="group-hover:translate-x-1 transition-transform">→</span>
                </a>
              </div>

              <div className="bg-slate-50 border border-slate-100 rounded-xl p-6 hover:border-sky-100 hover:bg-sky-50/30 transition-all">
                <h3 className="text-lg font-bold text-[#0b1220] mb-2 flex items-center gap-2">
                  🔐 Add Authentication
                </h3>
                <p className="text-sm text-slate-500 mb-4 leading-relaxed">
                  Secure your app with JWT, OAuth, and role-based access.
                </p>
                <a href="/docs/authentication" className="text-sky-500 hover:text-sky-600 no-underline text-sm font-semibold transition-colors flex items-center gap-1 group">
                  Add Auth <span className="group-hover:translate-x-1 transition-transform">→</span>
                </a>
              </div>

              <div className="bg-slate-50 border border-slate-100 rounded-xl p-6 hover:border-sky-100 hover:bg-sky-50/30 transition-all">
                <h3 className="text-lg font-bold text-[#0b1220] mb-2 flex items-center gap-2">
                  🗄️ Connect Database
                </h3>
                <p className="text-sm text-slate-500 mb-4 leading-relaxed">
                  Integrate MongoDB, PostgreSQL, or Prisma ORM.
                </p>
                <a href="/docs/database" className="text-sky-500 hover:text-sky-600 no-underline text-sm font-semibold transition-colors flex items-center gap-1 group">
                  Connect DB <span className="group-hover:translate-x-1 transition-transform">→</span>
                </a>
              </div>

              <div className="bg-slate-50 border border-slate-100 rounded-xl p-6 hover:border-sky-100 hover:bg-sky-50/30 transition-all">
                <h3 className="text-lg font-bold text-[#0b1220] mb-2 flex items-center gap-2">
                  🌐 Deploy Your App
                </h3>
                <p className="text-sm text-slate-500 mb-4 leading-relaxed">
                  Deploy to Vercel, Netlify, or AWS with one-click.
                </p>
                <a href="/docs/deployment" className="text-sky-500 hover:text-sky-600 no-underline text-sm font-semibold transition-colors flex items-center gap-1 group">
                  Deploy Now <span className="group-hover:translate-x-1 transition-transform">→</span>
                </a>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl p-8 mt-10 text-white shadow-lg">
            <h2 className="text-xl font-bold mb-4">
              Ready to Build Something Amazing?
            </h2>
            <p className="text-base mb-6 text-indigo-100 max-w-2xl leading-relaxed">
              Join thousands of developers building modern web applications with
              INDJS.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="/docs" className="bg-white/20 hover:bg-white/30 text-white px-5 py-2.5 rounded-xl no-underline font-bold text-sm backdrop-blur-md transition-all">
                View Documentation
              </a>
              <a href="https://github.com/indjs/indjs" className="bg-transparent hover:bg-white/10 text-white px-5 py-2.5 rounded-xl no-underline font-bold text-sm border-2 border-white/30 transition-all">
                GitHub Repository
              </a>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
