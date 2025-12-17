import React from "react";

export default function Docs() {
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
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
      gap: 16,
      marginTop: 24,
    },
    card: {
      background: "#f8fafc",
      borderRadius: 12,
      padding: 20,
      border: "1px solid #e2e8f0",
    },
    cardTitle: {
      fontSize: 18,
      fontWeight: 600,
      color: "#0b1220",
      marginBottom: 8,
    },
    cardDesc: {
      fontSize: 14,
      color: "#475569",
      marginBottom: 12,
    },
    cardLink: {
      color: "#0ea5e9",
      textDecoration: "none",
      fontSize: 14,
      fontWeight: 500,
    },
  };

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

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Beginner":
        return "#10b981";
      case "Intermediate":
        return "#f59e0b";
      case "Advanced":
        return "#ef4444";
      default:
        return "#6b7280";
    }
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

          <h1 style={ui.h1}>INDJS Documentation</h1>
          <p
            style={{
              fontSize: 18,
              color: "#64748b",
              marginBottom: 32,
              lineHeight: 1.6,
            }}
          >
            Complete guide to building modern full-stack React applications with
            INDJS. From basic concepts to advanced patterns and production
            deployment.
          </p>

          {Object.entries(categories).map(
            ([categoryName, categoryDocs]) =>
              categoryDocs.length > 0 && (
                <div key={categoryName} style={{ marginBottom: 40 }}>
                  <h2
                    style={{
                      fontSize: 20,
                      fontWeight: 600,
                      color: "#0b1220",
                      marginBottom: 16,
                      borderLeft: "4px solid #0ea5e9",
                      paddingLeft: 12,
                    }}
                  >
                    {categoryName}
                  </h2>
                  <div style={ui.grid}>
                    {categoryDocs.map((doc, i) => (
                      <div key={i} style={ui.card}>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "flex-start",
                            marginBottom: 8,
                          }}
                        >
                          <h3 style={ui.cardTitle}>{doc.title}</h3>
                          <span
                            style={{
                              fontSize: 11,
                              fontWeight: 600,
                              color: getDifficultyColor(doc.difficulty),
                              background: `${getDifficultyColor(doc.difficulty)}15`,
                              padding: "2px 6px",
                              borderRadius: 4,
                              textTransform: "uppercase",
                              letterSpacing: 0.5,
                            }}
                          >
                            {doc.difficulty}
                          </span>
                        </div>
                        <p style={ui.cardDesc}>{doc.desc}</p>
                        <a href={doc.link} style={ui.cardLink}>
                          Read more →
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              ),
          )}

          <div
            style={{
              background: "#f8fafc",
              borderRadius: 12,
              padding: 24,
              marginTop: 32,
              border: "1px solid #e2e8f0",
            }}
          >
            <h2
              style={{
                fontSize: 18,
                fontWeight: 600,
                color: "#0b1220",
                marginBottom: 12,
              }}
            >
              Quick Links
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: 16,
              }}
            >
              <a href="/learn" style={{ ...ui.cardLink, display: "block" }}>
                🚀 Getting Started Guide
              </a>
              <a
                href="/docs/installation"
                style={{ ...ui.cardLink, display: "block" }}
              >
                📦 Installation
              </a>
              <a
                href="/docs/api-routes"
                style={{ ...ui.cardLink, display: "block" }}
              >
                🔌 API Development
              </a>
              <a
                href="/docs/deployment"
                style={{ ...ui.cardLink, display: "block" }}
              >
                🌐 Deploy Your App
              </a>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
