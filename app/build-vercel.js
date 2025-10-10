import fs from 'fs/promises';
import path from 'path';
import React from 'react';
import { renderToString } from 'react-dom/server';

// Custom build script for Vercel deployment
async function buildForVercel() {
  console.log('🔨 Building INDJS application for Vercel...\n');
  
  const outputDir = '.indjs/static';
  const pagesDir = 'pages';
  
  // Clean and create output directory
  try {
    await fs.rm(outputDir, { recursive: true, force: true });
  } catch (e) {
    // Directory might not exist, ignore
  }
  await fs.mkdir(outputDir, { recursive: true });
  
  // Copy public assets
  console.log('📦 Copying public assets...');
  try {
    const publicFiles = await fs.readdir('public');
    let assetCount = 0;
    
    for (const file of publicFiles) {
      const srcPath = path.join('public', file);
      const destPath = path.join(outputDir, file);
      const stat = await fs.stat(srcPath);
      
      if (stat.isDirectory()) {
        await copyDirectory(srcPath, destPath);
      } else {
        await fs.copyFile(srcPath, destPath);
      }
      assetCount++;
    }
    
    console.log(`   ✓ Copied ${assetCount} public assets`);
  } catch (error) {
    console.log('   ℹ No public directory found');
  }
  
  // Define pages to build with static HTML content
  const pagesToBuild = [
    { 
      route: '/', 
      output: 'index.html',
      title: 'Welcome to INDJS - Modern Full-Stack React Framework',
      content: generateIndexContent()
    },
    { 
      route: '/about', 
      output: 'about.html',
      title: 'About INDJS - Modern React Framework',
      content: generateAboutContent()
    },
    { 
      route: '/learn', 
      output: 'learn.html',
      title: 'Learn INDJS - Getting Started Guide',
      content: generateLearnContent()
    },
    { 
      route: '/docs', 
      output: 'docs.html',
      title: 'INDJS Documentation - Complete Guide',
      content: generateDocsContent()
    }
  ];
  
  console.log('\n📄 Generating static pages...');
  
  // Build each page
  for (const page of pagesToBuild) {
    try {
      const html = createHtmlDocument(page.content, page.title, page.route);
      await fs.writeFile(path.join(outputDir, page.output), html);
      
      const size = (html.length / 1024).toFixed(1);
      console.log(`   ✓ ${page.route.padEnd(20)} ${size}kB`);
      
    } catch (error) {
      console.log(`   ✗ ${page.route.padEnd(20)} Error: ${error.message}`);
    }
  }
  
  // Create API directory and copy API routes
  console.log('\n🔌 Setting up API routes...');
  const apiDir = path.join(outputDir, 'api');
  await fs.mkdir(apiDir, { recursive: true });
  
  // Create default API endpoint
  const apiHello = `export default function handler(req, res) {
  res.status(200).json({
    message: 'Hello from INDJS API!',
    timestamp: new Date().toISOString(),
    method: req.method,
    framework: 'INDJS v1.0.0'
  });
}`;
  
  await fs.writeFile(path.join(apiDir, 'hello.js'), apiHello);
  console.log('   ✓ /api/hello');
  
  // Generate SEO files
  console.log('\n🗺️ Generating SEO files...');
  
  // Generate sitemap.xml
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://your-domain.com/</loc></url>
  <url><loc>https://your-domain.com/about</loc></url>
  <url><loc>https://your-domain.com/learn</loc></url>
  <url><loc>https://your-domain.com/docs</loc></url>
</urlset>`;
  
  await fs.writeFile(path.join(outputDir, 'sitemap.xml'), sitemap);
  console.log('   ✓ sitemap.xml generated');
  
  // Generate robots.txt
  const robotsTxt = `User-agent: *
Allow: /

Sitemap: https://your-domain.com/sitemap.xml`;
  
  await fs.writeFile(path.join(outputDir, 'robots.txt'), robotsTxt);
  console.log('   ✓ robots.txt generated');
  
  // Create _redirects for SPA fallback
  const redirects = `/*    /index.html   200`;
  await fs.writeFile(path.join(outputDir, '_redirects'), redirects);
  console.log('   ✓ _redirects generated');
  
  console.log('\n✅ Build completed successfully!');
  console.log(`📁 Output directory: ${outputDir}`);
  console.log('🚀 Ready for Vercel deployment!\n');
}

// Helper functions
async function copyDirectory(src, dest) {
  await fs.mkdir(dest, { recursive: true });
  const entries = await fs.readdir(src, { withFileTypes: true });
  
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    
    if (entry.isDirectory()) {
      await copyDirectory(srcPath, destPath);
    } else {
      await fs.copyFile(srcPath, destPath);
    }
  }
}

function createHtmlDocument(content, title, route) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${title}</title>
  <meta name="description" content="INDJS - Modern full-stack React framework with SSR, SSG, API routes, and zero configuration">
  <meta name="keywords" content="React, framework, SSR, SSG, full-stack, JavaScript, TypeScript">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="Modern full-stack React framework with SSR, SSG, API routes, and zero configuration">
  <meta property="og:type" content="website">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${title}">
  <meta name="twitter:description" content="Modern full-stack React framework with SSR, SSG, API routes, and zero configuration">
  
  <link rel="icon" type="image/x-icon" href="/favicon.ico">
  <script src="https://cdn.tailwindcss.com"></script>
  
  <style>
    body { 
      font-family: system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      margin: 0;
      padding: 0;
    }
    html { scroll-behavior: smooth; }
    .loading { opacity: 0; animation: fadeIn 0.3s ease-in-out forwards; }
    @keyframes fadeIn { to { opacity: 1; } }
  </style>
</head>
<body>
  <div id="root" class="loading">
    ${content}
  </div>
  
  <script>
    console.log('INDJS Static Site - Route: ${route}');
  </script>
</body>
</html>`;
}

function generateIndexContent() {
  return `
    <main style="font-family: system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial; min-height: 100vh; margin: 0; background: linear-gradient(180deg, #0ea5e9 0%, #111827 60%); color: #0f172a;">
      <div style="max-width: 980px; margin: 0 auto; padding: 48px 20px;">
        <section style="background: white; border-radius: 16px; padding: 28px; box-shadow: 0 10px 30px rgba(0,0,0,0.12);">
          <div style="display: inline-block; font-size: 12px; letter-spacing: 1px; text-transform: uppercase; color: #0369a1; background: #e0f2fe; padding: 6px 10px; border-radius: 999px; margin-bottom: 10px;">Full‑stack React • SSR • SSG • API • TypeScript</div>
          <h1 style="font-size: 40px; line-height: 1.1; margin: 0; color: #0b1220;">Welcome to INDJS</h1>
          <p style="margin-top: 12px; font-size: 16px; color: #334155;">The modern full-stack React framework that combines the best of Next.js simplicity with powerful built-in features. Build, deploy, and scale web applications with zero configuration.</p>
          <nav style="display: flex; gap: 12px; margin-top: 18px; flex-wrap: wrap;">
            <a href="/learn" style="background: #0ea5e9; color: white; padding: 10px 16px; border-radius: 10px; text-decoration: none; font-weight: 600;">Get Started</a>
            <a href="/docs" style="background: #e2e8f0; color: #0b1220; padding: 10px 16px; border-radius: 10px; text-decoration: none; font-weight: 600;">Documentation</a>
            <a href="https://github.com/indjs/indjs" style="background: #e2e8f0; color: #0b1220; padding: 10px 16px; border-radius: 10px; text-decoration: none; font-weight: 600;">GitHub</a>
          </nav>
          
          <div style="display: flex; gap: 24px; margin-top: 20px; font-size: 14px; color: #64748b; flex-wrap: wrap; justify-content: center;">
            <div style="display: flex; align-items: center; gap: 6px;"><span style="color: #10b981;">✓</span> Zero Configuration</div>
            <div style="display: flex; align-items: center; gap: 6px;"><span style="color: #10b981;">✓</span> Built-in Authentication</div>
            <div style="display: flex; align-items: center; gap: 6px;"><span style="color: #10b981;">✓</span> Database Integration</div>
            <div style="display: flex; align-items: center; gap: 6px;"><span style="color: #10b981;">✓</span> One-Click Deploy</div>
          </div>

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px; margin-top: 26px;">
            <article style="background: white; border-radius: 12px; padding: 16px; box-shadow: 0 6px 20px rgba(0,0,0,0.08);">
              <div style="font-size: 12px; color: #0369a1; font-weight: 600;">🚀 PERFORMANCE</div>
              <h3 style="margin: 4px 0 6px; font-size: 18px; color: #0b1220;">React 18 SSR + SSG</h3>
              <p style="margin: 0; font-size: 14px; color: #475569;">Lightning-fast server-side rendering with static generation, streaming, and incremental regeneration for optimal performance.</p>
            </article>
            <article style="background: white; border-radius: 12px; padding: 16px; box-shadow: 0 6px 20px rgba(0,0,0,0.08);">
              <div style="font-size: 12px; color: #0369a1; font-weight: 600;">🛣️ ROUTING</div>
              <h3 style="margin: 4px 0 6px; font-size: 18px; color: #0b1220;">File‑based Routes</h3>
              <p style="margin: 0; font-size: 14px; color: #475569;">Intuitive file-based routing with dynamic routes, layouts, middleware, and advanced patterns. No configuration needed.</p>
            </article>
            <article style="background: white; border-radius: 12px; padding: 16px; box-shadow: 0 6px 20px rgba(0,0,0,0.08);">
              <div style="font-size: 12px; color: #0369a1; font-weight: 600;">🔌 FULL-STACK</div>
              <h3 style="margin: 4px 0 6px; font-size: 18px; color: #0b1220;">API Routes + Database</h3>
              <p style="margin: 0; font-size: 14px; color: #475569;">Built-in serverless API routes with database integration, authentication, and real-time features out of the box.</p>
            </article>
          </div>
          
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 16px; padding: 32px; margin-top: 40px; color: white; text-align: center;">
            <h2 style="font-size: 28px; font-weight: 700; margin-bottom: 16px; color: white;">Ready to Build the Future?</h2>
            <p style="font-size: 18px; margin-bottom: 24px; color: rgba(255,255,255,0.9); max-width: 600px; margin: 0 auto 24px;">
              Join thousands of developers who are building modern, scalable web applications with INDJS. 
              From startups to enterprise, INDJS powers the next generation of web experiences.
            </p>
            <div style="display: flex; gap: 16px; justify-content: center; flex-wrap: wrap;">
              <a href="/learn" style="background: rgba(255,255,255,0.2); color: white; padding: 12px 24px; border-radius: 10px; text-decoration: none; font-weight: 600; font-size: 16px;">Start Building Now</a>
              <a href="/docs" style="background: transparent; color: white; padding: 12px 24px; border-radius: 10px; text-decoration: none; font-weight: 600; font-size: 16px; border: 2px solid rgba(255,255,255,0.3);">View Documentation</a>
            </div>
          </div>
        </section>
      </div>
    </main>
  `;
}

function generateAboutContent() {
  return `
    <div style="min-height: 100vh; background: white;">
      <div style="max-width: 1200px; margin: 0 auto; padding: 64px 16px;">
        <nav style="margin-bottom: 32px;">
          <a href="/" style="color: #0ea5e9; text-decoration: none; font-size: 14px;">← Back to Home</a>
        </nav>
        <h1 style="font-size: 48px; font-weight: bold; color: #111827; margin-bottom: 32px;">About INDJS</h1>
        <div style="max-width: none;">
          <p style="font-size: 18px; color: #6b7280; margin-bottom: 24px; line-height: 1.7;">
            INDJS is a modern, fast, and lightweight full-stack React framework
            that provides everything you need to build production-ready web applications.
          </p>
          <h2 style="font-size: 32px; font-weight: 600; color: #111827; margin-bottom: 16px;">Features</h2>
          <ul style="list-style-type: disc; list-style-position: inside; color: #6b7280; line-height: 1.8; font-size: 16px;">
            <li style="margin-bottom: 8px;">File-based routing</li>
            <li style="margin-bottom: 8px;">Server-side rendering (SSR)</li>
            <li style="margin-bottom: 8px;">Static site generation (SSG)</li>
            <li style="margin-bottom: 8px;">API routes</li>
            <li style="margin-bottom: 8px;">Built-in TypeScript support</li>
            <li style="margin-bottom: 8px;">Tailwind CSS integration</li>
            <li style="margin-bottom: 8px;">Hot module replacement</li>
            <li style="margin-bottom: 8px;">Image optimization</li>
          </ul>
        </div>
      </div>
    </div>
  `;
}

function generateLearnContent() {
  return `
    <main style="font-family: system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial; min-height: 100vh; margin: 0; background: linear-gradient(180deg, #0ea5e9 0%, #111827 60%); color: #0f172a;">
      <div style="max-width: 980px; margin: 0 auto; padding: 48px 20px;">
        <section style="background: white; border-radius: 16px; padding: 28px; box-shadow: 0 10px 30px rgba(0,0,0,0.12);">
          <nav style="margin-bottom: 20px;">
            <a href="/" style="color: #0ea5e9; text-decoration: none; font-size: 14px;">← Back to Home</a>
          </nav>
          
          <h1 style="font-size: 32px; line-height: 1.1; margin: 0; color: #0b1220;">Getting Started with INDJS</h1>
          <p style="font-size: 18px; color: #64748b; margin-bottom: 32px; line-height: 1.6;">
            Build modern full-stack React applications with zero configuration. INDJS provides everything you need 
            to create fast, scalable web applications with built-in SSR, API routes, and deployment tools.
          </p>
          
          <div style="margin-bottom: 24px;">
            <h2 style="font-size: 24px; color: #0b1220; margin-bottom: 12px;">🚀 Quick Start</h2>
            <p style="font-size: 16px; color: #334155; line-height: 1.6; margin-bottom: 12px;">
              Create a new INDJS application with a single command and start building immediately:
            </p>
            <div style="background: #1e293b; color: #e2e8f0; padding: 20px; border-radius: 8px; font-size: 14px; font-family: monospace; overflow: auto; margin-bottom: 20px; line-height: 1.5; white-space: pre-wrap;"># Create a new INDJS app
npx create-indjs my-app

# Navigate to your project
cd my-app

# Start the development server
npm run dev

# Your app is now running at http://localhost:3000</div>
          </div>
        </section>
      </div>
    </main>
  `;
}

function generateDocsContent() {
  return `
    <main style="font-family: system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial; min-height: 100vh; margin: 0; background: linear-gradient(180deg, #0ea5e9 0%, #111827 60%); color: #0f172a;">
      <div style="max-width: 980px; margin: 0 auto; padding: 48px 20px;">
        <section style="background: white; border-radius: 16px; padding: 28px; box-shadow: 0 10px 30px rgba(0,0,0,0.12);">
          <nav style="margin-bottom: 20px;">
            <a href="/" style="color: #0ea5e9; text-decoration: none; font-size: 14px;">← Back to Home</a>
          </nav>
          
          <h1 style="font-size: 32px; line-height: 1.1; margin: 0; color: #0b1220;">INDJS Documentation</h1>
          <p style="font-size: 18px; color: #64748b; margin-bottom: 32px; line-height: 1.6;">
            Complete guide to building modern full-stack React applications with INDJS. 
            From basic concepts to advanced patterns and production deployment.
          </p>
          
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px;">
            <div style="background: #f8fafc; border-radius: 12px; padding: 20px; border: 1px solid #e2e8f0;">
              <h3 style="font-size: 18px; font-weight: 600; color: #0b1220; margin-bottom: 8px;">Installation</h3>
              <p style="font-size: 14px; color: #475569; margin-bottom: 12px;">Get started with INDJS by installing the framework and creating your first app with zero configuration.</p>
              <a href="/docs/installation" style="color: #0ea5e9; text-decoration: none; font-size: 14px; font-weight: 500;">Read more →</a>
            </div>
            <div style="background: #f8fafc; border-radius: 12px; padding: 20px; border: 1px solid #e2e8f0;">
              <h3 style="font-size: 18px; font-weight: 600; color: #0b1220; margin-bottom: 8px;">API Routes</h3>
              <p style="font-size: 14px; color: #475569; margin-bottom: 12px;">Build powerful serverless API endpoints with middleware, validation, caching, and real-time features.</p>
              <a href="/docs/api-routes" style="color: #0ea5e9; text-decoration: none; font-size: 14px; font-weight: 500;">Read more →</a>
            </div>
          </div>
        </section>
      </div>
    </main>
  `;
}

// Run the build
buildForVercel().catch(console.error);
