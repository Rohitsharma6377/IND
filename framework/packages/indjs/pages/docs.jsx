import React from 'react';

export default function Docs() {
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
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: 16,
      marginTop: 24
    },
    card: {
      background: '#f8fafc',
      borderRadius: 12,
      padding: 20,
      border: '1px solid #e2e8f0'
    },
    cardTitle: {
      fontSize: 18,
      fontWeight: 600,
      color: '#0b1220',
      marginBottom: 8
    },
    cardDesc: {
      fontSize: 14,
      color: '#475569',
      marginBottom: 12
    },
    cardLink: {
      color: '#0ea5e9',
      textDecoration: 'none',
      fontSize: 14,
      fontWeight: 500
    }
  };

  const docs = [
    {
      title: 'Installation',
      desc: 'Get started with INDJS by installing the framework and creating your first app.',
      link: '/docs/installation'
    },
    {
      title: 'Routing',
      desc: 'Learn about file-based routing, dynamic routes, and navigation in INDJS.',
      link: '/docs/routing'
    },
    {
      title: 'API Routes',
      desc: 'Create serverless API endpoints with full HTTP method support.',
      link: '/docs/api-routes'
    },
    {
      title: 'SSR & SSG',
      desc: 'Server-side rendering and static site generation for optimal performance.',
      link: '/docs/ssr-ssg'
    },
    {
      title: 'Styling',
      desc: 'Built-in Tailwind CSS support and custom styling options.',
      link: '/docs/styling'
    },
    {
      title: 'Authentication',
      desc: 'JWT, OAuth, and session-based authentication patterns.',
      link: '/docs/auth'
    },
    {
      title: 'Database',
      desc: 'Database integration with MongoDB, PostgreSQL, and more.',
      link: '/docs/database'
    },
    {
      title: 'Deployment',
      desc: 'Deploy to Vercel, Netlify, AWS, and other platforms.',
      link: '/docs/deployment'
    },
    {
      title: 'Testing',
      desc: 'Unit testing, integration testing, and E2E testing setup.',
      link: '/docs/testing'
    }
  ];

  return (
    <main style={ui.page}>
      <div style={ui.wrap}>
        <section style={ui.hero}>
          <nav style={ui.nav}>
            <a href="/" style={ui.backLink}>← Back to Home</a>
          </nav>
          
          <h1 style={ui.h1}>INDJS Documentation</h1>
          
          <div style={ui.grid}>
            {docs.map((doc, i) => (
              <div key={i} style={ui.card}>
                <h3 style={ui.cardTitle}>{doc.title}</h3>
                <p style={ui.cardDesc}>{doc.desc}</p>
                <a href={doc.link} style={ui.cardLink}>Read more →</a>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
