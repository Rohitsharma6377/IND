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
          <div style={ui.tag}>Full‑stack React • SSR • SSG • API</div>
          <h1 style={ui.h1}>Welcome to INDJS</h1>
          <p style={ui.lead}>A modern, fast, and lightweight framework with file‑based routing, SSR/SSG, API routes, Tailwind integration and more.</p>
          <nav style={ui.ctas}>
            <a href="/learn" style={ui.btnPrimary}>Get Started</a>
            <a href="/api/test" style={ui.btnSecondary}>Test API</a>
            <a href="/docs" style={ui.btnSecondary}>Docs</a>
          </nav>

          <div style={ui.grid}>
            <article style={ui.card}>
              <div style={{ fontSize: 12, color: '#0369a1' }}>Server‑Side Rendering</div>
              <h3 style={ui.cardTitle}>React 18 SSR + SSG</h3>
              <p style={ui.cardDesc}>Render on the server for SEO and speed, with static generation for blazing fast pages.</p>
            </article>
            <article style={ui.card}>
              <div style={{ fontSize: 12, color: '#0369a1' }}>Routing</div>
              <h3 style={ui.cardTitle}>File‑based Routes</h3>
              <p style={ui.cardDesc}>Drop a file in <code>pages/</code> and it’s instantly available. Dynamic routes supported.</p>
            </article>
            <article style={ui.card}>
              <div style={{ fontSize: 12, color: '#0369a1' }}>Assets</div>
              <h3 style={ui.cardTitle}>Image Optimization</h3>
              <p style={ui.cardDesc}>Built‑in on‑the‑fly resizing and quality control with sharp for fast, crisp media.</p>
            </article>
            <article style={ui.card}>
              <div style={{ fontSize: 12, color: '#0369a1' }}>DX</div>
              <h3 style={ui.cardTitle}>TypeScript Ready</h3>
              <p style={ui.cardDesc}>Shipped with rich type definitions for components, router, and utilities.</p>
            </article>
          </div>
        </section>

        <p style={ui.footer}>
          Deployed with <strong>INDJS</strong>. Edit <code>pages/index.jsx</code> to customize this page.
        </p>
      </div>
    </main>
  );
}
