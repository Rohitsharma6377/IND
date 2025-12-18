import React from "react";

export default function Docs() {
  const docs = [
    {
      title: "Installation",
      desc: "Get started with INDJS by installing the framework and creating your first app with zero configuration.",
      link: "/docs/installation",
      category: "Getting Started",
      difficulty: "Beginner",
    },
    {
      title: "Routing",
      desc: "Master file-based routing, dynamic routes, layouts, middleware, and advanced navigation patterns.",
      link: "/docs/routing",
      category: "Core Features",
      difficulty: "Beginner",
    },
    {
      title: "API Routes",
      desc: "Build powerful serverless API endpoints with middleware, validation, caching, and real-time features.",
      link: "/docs/api-routes",
      category: "Backend",
      difficulty: "Intermediate",
    },
    {
      title: "SSR & SSG",
      desc: "Optimize performance with server-side rendering, static generation, and incremental regeneration.",
      link: "/docs/ssr-ssg",
      category: "Performance",
      difficulty: "Intermediate",
    },
    {
      title: "Styling",
      desc: "Style your app with Tailwind CSS, CSS Modules, Sass, styled-components, and theming.",
      link: "/docs/styling",
      category: "Frontend",
      difficulty: "Beginner",
    },
    {
      title: "Authentication",
      desc: "Implement secure authentication with JWT, OAuth providers, sessions, and role-based access.",
      link: "/docs/authentication",
      category: "Security",
      difficulty: "Advanced",
    },
    {
      title: "Database",
      desc: "Connect to MongoDB, PostgreSQL, SQLite with Prisma ORM, connection pooling, and migrations.",
      link: "/docs/database",
      category: "Backend",
      difficulty: "Intermediate",
    },
    {
      title: "Deployment",
      desc: "Deploy to Vercel, Netlify, AWS, Docker with CI/CD pipelines and production optimizations.",
      link: "/docs/deployment",
      category: "DevOps",
      difficulty: "Advanced",
    },
    {
      title: "Testing",
      desc: "Write comprehensive tests with Vitest, Playwright, mocking, and test-driven development.",
      link: "/docs/testing",
      category: "Quality",
      difficulty: "Intermediate",
    },
  ];

  const categories = {
    "Getting Started": docs.filter((doc) => doc.category === "Getting Started"),
    "Core Features": docs.filter((doc) => doc.category === "Core Features"),
    Frontend: docs.filter((doc) => doc.category === "Frontend"),
    Backend: docs.filter((doc) => doc.category === "Backend"),
    Security: docs.filter((doc) => doc.category === "Security"),
    Performance: docs.filter((doc) => doc.category === "Performance"),
    Quality: docs.filter((doc) => doc.category === "Quality"),
    DevOps: docs.filter((doc) => doc.category === "DevOps"),
  };

  const getDifficultyStyles = (difficulty) => {
    switch (difficulty) {
      case "Beginner":
        return "text-emerald-500 bg-emerald-50";
      case "Intermediate":
        return "text-amber-500 bg-amber-50";
      case "Advanced":
        return "text-red-500 bg-red-50";
      default:
        return "text-slate-500 bg-slate-50";
    }
  };

  return (
    <main className="min-h-screen bg-slate-900 bg-gradient-to-b from-sky-500 via-sky-500 to-gray-900 text-slate-900 font-sans">
      <div className="max-w-[980px] mx-auto px-5 py-12">
        <section className="bg-white rounded-2xl p-7 shadow-[0_10px_30px_rgba(0,0,0,0.12)]">
          <nav className="mb-5">
            <a href="/" className="text-sky-500 hover:text-sky-600 no-underline text-sm font-medium transition-colors">
              ← Back to Home
            </a>
          </nav>

          <h1 className="text-3xl font-extrabold leading-tight m-0 text-[#0b1220]">INDJS Documentation</h1>
          <p className="text-lg text-slate-500 mb-8 mt-3 font-medium max-w-2xl leading-relaxed">
            Complete guide to building modern full-stack React applications with
            INDJS. From basic concepts to advanced patterns and production
            deployment.
          </p>

          {Object.entries(categories).map(
            ([categoryName, categoryDocs]) =>
              categoryDocs.length > 0 && (
                <div key={categoryName} className="mb-10">
                  <h2 className="text-xl font-bold text-[#0b1220] mb-4 border-l-4 border-sky-500 pl-3">
                    {categoryName}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                    {categoryDocs.map((doc, i) => (
                      <div key={i} className="bg-slate-50 border border-slate-100 rounded-xl p-5 hover:border-sky-100 hover:bg-sky-50/30 transition-all flex flex-col">
                        <div className="flex justify-between items-start mb-2 gap-2">
                          <h3 className="text-lg font-bold text-[#0b1220]">{doc.title}</h3>
                          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider whitespace-nowrap ${getDifficultyStyles(doc.difficulty)}`}>
                            {doc.difficulty}
                          </span>
                        </div>
                        <p className="text-sm text-slate-500 mb-4 leading-relaxed flex-grow">
                          {doc.desc}
                        </p>
                        <a href={doc.link} className="text-sky-500 hover:text-sky-600 no-underline text-sm font-semibold transition-colors mt-auto flex items-center gap-1 group">
                          Read more <span className="group-hover:translate-x-1 transition-transform">→</span>
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              ),
          )}

          <div className="bg-slate-50 border border-slate-100 rounded-xl p-6 mt-8">
            <h2 className="text-lg font-bold text-[#0b1220] mb-4">
              Quick Links
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <a href="/learn" className="text-sky-500 hover:text-sky-600 no-underline text-sm font-semibold transition-colors flex items-center gap-2">
                🚀 Getting Started Guide
              </a>
              <a href="/docs/installation" className="text-sky-500 hover:text-sky-600 no-underline text-sm font-semibold transition-colors flex items-center gap-2">
                📦 Installation
              </a>
              <a href="/docs/api-routes" className="text-sky-500 hover:text-sky-600 no-underline text-sm font-semibold transition-colors flex items-center gap-2">
                🔌 API Development
              </a>
              <a href="/docs/deployment" className="text-sky-500 hover:text-sky-600 no-underline text-sm font-semibold transition-colors flex items-center gap-2">
                🌐 Deploy Your App
              </a>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
