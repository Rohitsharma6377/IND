import React from 'react';

export default function Home() {
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
      fontSize: 40,
      lineHeight: 1.1,
      margin: 0,
      color: '#0b1220'
    },
    tag: {
      display: 'inline-block',
      fontSize: 12,
      letterSpacing: 1,
      textTransform: 'uppercase',
      color: '#0369a1',
      background: '#e0f2fe',
      padding: '6px 10px',
      borderRadius: 999,
      marginBottom: 10
    },
    lead: { marginTop: 12, fontSize: 16, color: '#334155' },
    ctas: { display: 'flex', gap: 12, marginTop: 18, flexWrap: 'wrap' },
    btnPrimary: {
      background: '#0ea5e9',
      color: 'white',
      padding: '10px 16px',
      borderRadius: 10,
      textDecoration: 'none',
      fontWeight: 600
    },
    btnSecondary: {
      background: '#e2e8f0',
      color: '#0b1220',
      padding: '10px 16px',
      borderRadius: 10,
      textDecoration: 'none',
      fontWeight: 600
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
      gap: 16,
      marginTop: 26
    },
    card: {
      background: 'white',
      borderRadius: 12,
      padding: 16,
      boxShadow: '0 6px 20px rgba(0,0,0,0.08)'
    },
    cardTitle: { margin: '4px 0 6px', fontSize: 18, color: '#0b1220' },
    cardDesc: { margin: 0, fontSize: 14, color: '#475569' },
    footer: { marginTop: 28, color: '#cbd5e1', fontSize: 12, textAlign: 'center' }
  };

  return (
    <main style={ui.page}>
      <div style={ui.wrap}>
        <section style={ui.hero}>
          <div style={ui.tag}>Full‑stack React • SSR • SSG • API • TypeScript</div>
          <h1 style={ui.h1}>Welcome to INDJS</h1>
          <p style={ui.lead}>The modern full-stack React framework that combines the best of Next.js simplicity with powerful built-in features. Build, deploy, and scale web applications with zero configuration.</p>
          <nav style={ui.ctas}>
            <a href="/learn" style={ui.btnPrimary}>Get Started</a>
            <a href="/docs" style={ui.btnSecondary}>Documentation</a>
            <a href="https://github.com/indjs/indjs" style={ui.btnSecondary}>GitHub</a>
          </nav>
          
          <div style={{ 
            display: 'flex', 
            gap: 24, 
            marginTop: 20, 
            fontSize: 14, 
            color: '#64748b',
            flexWrap: 'wrap',
            justifyContent: 'center'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ color: '#10b981' }}>✓</span> Zero Configuration
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ color: '#10b981' }}>✓</span> Built-in Authentication
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ color: '#10b981' }}>✓</span> Database Integration
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ color: '#10b981' }}>✓</span> One-Click Deploy
            </div>
          </div>

          <div style={ui.grid}>
            <article style={ui.card}>
              <div style={{ fontSize: 12, color: '#0369a1', fontWeight: 600 }}>🚀 PERFORMANCE</div>
              <h3 style={ui.cardTitle}>React 18 SSR + SSG</h3>
              <p style={ui.cardDesc}>Lightning-fast server-side rendering with static generation, streaming, and incremental regeneration for optimal performance.</p>
            </article>
            <article style={ui.card}>
              <div style={{ fontSize: 12, color: '#0369a1', fontWeight: 600 }}>🛣️ ROUTING</div>
              <h3 style={ui.cardTitle}>File‑based Routes</h3>
              <p style={ui.cardDesc}>Intuitive file-based routing with dynamic routes, layouts, middleware, and advanced patterns. No configuration needed.</p>
            </article>
            <article style={ui.card}>
              <div style={{ fontSize: 12, color: '#0369a1', fontWeight: 600 }}>🔌 FULL-STACK</div>
              <h3 style={ui.cardTitle}>API Routes + Database</h3>
              <p style={ui.cardDesc}>Built-in serverless API routes with database integration, authentication, and real-time features out of the box.</p>
            </article>
            <article style={ui.card}>
              <div style={{ fontSize: 12, color: '#0369a1', fontWeight: 600 }}>🎨 STYLING</div>
              <h3 style={ui.cardTitle}>Tailwind CSS Built-in</h3>
              <p style={ui.cardDesc}>Pre-configured Tailwind CSS with support for CSS Modules, Sass, styled-components, and custom theming.</p>
            </article>
            <article style={ui.card}>
              <div style={{ fontSize: 12, color: '#0369a1', fontWeight: 600 }}>🔐 SECURITY</div>
              <h3 style={ui.cardTitle}>Authentication Ready</h3>
              <p style={ui.cardDesc}>JWT, OAuth, session-based auth with role-based access control, middleware, and security best practices.</p>
            </article>
            <article style={ui.card}>
              <div style={{ fontSize: 12, color: '#0369a1', fontWeight: 600 }}>🌐 DEPLOYMENT</div>
              <h3 style={ui.cardTitle}>Deploy Anywhere</h3>
              <p style={ui.cardDesc}>One-click deployment to Vercel, Netlify, AWS, Docker with CI/CD pipelines and production optimizations.</p>
            </article>
            <article style={ui.card}>
              <div style={{ fontSize: 12, color: '#0369a1', fontWeight: 600 }}>🧪 TESTING</div>
              <h3 style={ui.cardTitle}>Testing Suite</h3>
              <p style={ui.cardDesc}>Comprehensive testing with Vitest, Playwright, mocking utilities, and test-driven development patterns.</p>
            </article>
            <article style={ui.card}>
              <div style={{ fontSize: 12, color: '#0369a1', fontWeight: 600 }}>⚡ DEVELOPER EXPERIENCE</div>
              <h3 style={ui.cardTitle}>TypeScript + CLI</h3>
              <p style={ui.cardDesc}>Full TypeScript support, powerful CLI tools, hot reload, and rich development experience with zero configuration.</p>
            </article>
          </div>
          
          <div style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: 16,
            padding: 32,
            marginTop: 40,
            color: 'white',
            textAlign: 'center'
          }}>
            <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 16, color: 'white' }}>Ready to Build the Future?</h2>
            <p style={{ fontSize: 18, marginBottom: 24, color: 'rgba(255,255,255,0.9)', maxWidth: 600, margin: '0 auto 24px' }}>
              Join thousands of developers who are building modern, scalable web applications with INDJS. 
              From startups to enterprise, INDJS powers the next generation of web experiences.
            </p>
            <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="/learn" style={{
                background: 'rgba(255,255,255,0.2)',
                color: 'white',
                padding: '12px 24px',
                borderRadius: 10,
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: 16,
                backdropFilter: 'blur(10px)'
              }}>Start Building Now</a>
              <a href="/docs" style={{
                background: 'transparent',
                color: 'white',
                padding: '12px 24px',
                borderRadius: 10,
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: 16,
                border: '2px solid rgba(255,255,255,0.3)'
              }}>View Documentation</a>
            </div>
          </div>
        </section>

        <div style={{
          ...ui.footer,
          borderTop: '1px solid rgba(255,255,255,0.1)',
          paddingTop: 20,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 16
        }}>
          <p style={{ margin: 0, fontSize: 14 }}>
            Powered by <strong>INDJS</strong> v1.0.0 • Edit <code>pages/index.jsx</code> to customize
          </p>
          <div style={{ display: 'flex', gap: 16, fontSize: 14 }}>
            <a href="/docs" style={{ color: '#cbd5e1', textDecoration: 'none' }}>Documentation</a>
            <a href="https://github.com/indjs/indjs" style={{ color: '#cbd5e1', textDecoration: 'none' }}>GitHub</a>
            <a href="https://twitter.com/indjs" style={{ color: '#cbd5e1', textDecoration: 'none' }}>Twitter</a>
          </div>
        </div>
      </div>
    </main>
  );
}
