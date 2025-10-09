import React from 'react';

export default function Learn() {
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
      marginBottom: 24
    },
    h2: {
      fontSize: 24,
      color: '#0b1220',
      marginBottom: 12
    },
    p: {
      fontSize: 16,
      color: '#334155',
      lineHeight: 1.6,
      marginBottom: 12
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
      padding: 16,
      borderRadius: 8,
      fontSize: 14,
      fontFamily: 'monospace',
      overflow: 'auto',
      marginBottom: 16
    }
  };

  return (
    <main style={ui.page}>
      <div style={ui.wrap}>
        <section style={ui.hero}>
          <nav style={ui.nav}>
            <a href="/" style={ui.backLink}>← Back to Home</a>
          </nav>
          
          <h1 style={ui.h1}>Getting Started with INDJS</h1>
          
          <div style={ui.section}>
            <h2 style={ui.h2}>Quick Start</h2>
            <p style={ui.p}>
              Create a new INDJS application with a single command:
            </p>
            <div style={ui.codeBlock}>
              npx create-indjs my-app<br/>
              cd my-app<br/>
              npm run dev
            </div>
          </div>

          <div style={ui.section}>
            <h2 style={ui.h2}>File-based Routing</h2>
            <p style={ui.p}>
              Pages are automatically routed based on their file structure in the <code style={ui.code}>pages/</code> directory:
            </p>
            <div style={ui.codeBlock}>
              pages/index.jsx → /<br/>
              pages/about.jsx → /about<br/>
              pages/blog/[slug].jsx → /blog/my-post<br/>
              pages/api/users.js → /api/users
            </div>
          </div>

          <div style={ui.section}>
            <h2 style={ui.h2}>API Routes</h2>
            <p style={ui.p}>
              Create API endpoints by adding files to <code style={ui.code}>pages/api/</code>:
            </p>
            <div style={ui.codeBlock}>
              export default function handler(req, res) {`{`}<br/>
              &nbsp;&nbsp;res.json({`{`} message: 'Hello from INDJS API!' {`}`});<br/>
              {`}`}
            </div>
          </div>

          <div style={ui.section}>
            <h2 style={ui.h2}>Server-Side Rendering</h2>
            <p style={ui.p}>
              All pages are server-side rendered by default. Add <code style={ui.code}>getServerSideProps</code> for dynamic data:
            </p>
            <div style={ui.codeBlock}>
              export async function getServerSideProps(context) {`{`}<br/>
              &nbsp;&nbsp;return {`{`} props: {`{`} data: 'server data' {`}`} {`}`};<br/>
              {`}`}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
