import React from 'react';

export default function Installation() {
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
    warning: {
      background: '#fef3c7',
      border: '1px solid #f59e0b',
      borderRadius: 8,
      padding: 16,
      marginBottom: 20
    },
    warningTitle: {
      fontWeight: 600,
      color: '#92400e',
      marginBottom: 8
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
    }
  };

  return (
    <main style={ui.page}>
      <div style={ui.wrap}>
        <section style={ui.hero}>
          <nav style={ui.nav}>
            <a href="/docs" style={ui.backLink}>← Back to Documentation</a>
          </nav>
          
          <h1 style={ui.h1}>Installation</h1>
          
          <div style={ui.section}>
            <h2 style={ui.h2}>Quick Start</h2>
            <p style={ui.p}>
              Get started with INDJS in seconds using our create command:
            </p>
            <div style={ui.codeBlock}>
              {`# Create a new INDJS application
npx create-indjs my-app

# Navigate to your project
cd my-app

# Install dependencies
npm install

# Start development server
npm run dev`}
            </div>
            <p style={ui.p}>
              Your app will be available at <code style={ui.code}>http://localhost:3000</code>
            </p>
          </div>

          <div style={ui.section}>
            <h2 style={ui.h2}>System Requirements</h2>
            <ul style={ui.ul}>
              <li style={ui.li}><strong>Node.js:</strong> Version 16.0.0 or higher</li>
              <li style={ui.li}><strong>npm:</strong> Version 7.0.0 or higher (or yarn/pnpm)</li>
              <li style={ui.li}><strong>Operating System:</strong> Windows, macOS, or Linux</li>
            </ul>
          </div>

          <div style={ui.section}>
            <h2 style={ui.h2}>Manual Installation</h2>
            <p style={ui.p}>
              If you prefer to set up your project manually:
            </p>
            
            <h3 style={ui.h3}>1. Initialize your project</h3>
            <div style={ui.codeBlock}>
              {`mkdir my-indjs-app
cd my-indjs-app
npm init -y`}
            </div>

            <h3 style={ui.h3}>2. Install INDJS</h3>
            <div style={ui.codeBlock}>
              {`# Install INDJS framework
npm install indjs

# Install React dependencies
npm install react react-dom

# Install development dependencies
npm install --save-dev @types/react @types/react-dom typescript`}
            </div>

            <h3 style={ui.h3}>3. Update package.json scripts</h3>
            <div style={ui.codeBlock}>
              {`{
  "scripts": {
    "dev": "indjs dev",
    "build": "indjs build",
    "start": "indjs start",
    "test": "indjs test"
  }
}`}
            </div>

            <h3 style={ui.h3}>4. Create your first page</h3>
            <p style={ui.p}>Create a <code style={ui.code}>pages</code> directory and add an <code style={ui.code}>index.jsx</code> file:</p>
            <div style={ui.codeBlock}>
              {`// pages/index.jsx
import React from 'react';

export default function Home() {
  return (
    <div>
      <h1>Welcome to INDJS!</h1>
      <p>Your app is ready to go.</p>
    </div>
  );
}`}
            </div>
          </div>

          <div style={ui.section}>
            <h2 style={ui.h2}>Project Structure</h2>
            <p style={ui.p}>
              After installation, your project will have this structure:
            </p>
            <div style={ui.codeBlock}>
              {`my-indjs-app/
├── pages/                 # File-based routing
│   ├── index.jsx         # Home page (/)
│   ├── about.jsx         # About page (/about)
│   └── api/              # API routes
│       └── hello.js      # API endpoint (/api/hello)
├── public/               # Static assets
│   ├── favicon.ico
│   └── images/
├── styles/               # CSS files
│   └── globals.css
├── components/           # Reusable components
├── .indjs/              # Build output (auto-generated)
├── package.json
└── README.md`}
            </div>
          </div>

          <div style={ui.section}>
            <h2 style={ui.h2}>Configuration</h2>
            <p style={ui.p}>
              INDJS works out of the box with zero configuration, but you can customize it with an <code style={ui.code}>indjs.config.js</code> file:
            </p>
            <div style={ui.codeBlock}>
              {`// indjs.config.js
export default {
  // Custom port for development
  port: 3000,
  
  // Custom build output directory
  outDir: 'dist',
  
  // Enable experimental features
  experimental: {
    devBundler: 'vite', // Use Vite instead of esbuild
    streaming: true,    // Enable React 18 streaming
  },
  
  // Tailwind CSS configuration
  tailwind: {
    enabled: true,
    config: './tailwind.config.js'
  },
  
  // Custom esbuild options
  esbuild: {
    target: 'es2020',
    minify: true
  }
};`}
            </div>
          </div>

          <div style={ui.info}>
            <div style={ui.infoTitle}>💡 Pro Tip</div>
            <p style={{ margin: 0, fontSize: 14, color: '#1e40af' }}>
              Use <code style={ui.code}>indjs create</code> with templates: <code style={ui.code}>npx create-indjs my-app --template blog</code>
              <br/>Available templates: basic, blog, admin, ecommerce, ai-app, desktop-electron, mobile-capacitor
            </p>
          </div>

          <div style={ui.section}>
            <h2 style={ui.h2}>Next Steps</h2>
            <ul style={ui.ul}>
              <li style={ui.li}><a href="/docs/routing" style={{ color: '#0ea5e9' }}>Learn about file-based routing</a></li>
              <li style={ui.li}><a href="/docs/api-routes" style={{ color: '#0ea5e9' }}>Create your first API route</a></li>
              <li style={ui.li}><a href="/docs/styling" style={{ color: '#0ea5e9' }}>Add styling with Tailwind CSS</a></li>
              <li style={ui.li}><a href="/docs/ssr-ssg" style={{ color: '#0ea5e9' }}>Understand SSR and SSG</a></li>
            </ul>
          </div>
        </section>
      </div>
    </main>
  );
}
