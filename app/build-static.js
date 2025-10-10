import fs from 'fs/promises';
import path from 'path';
import React from 'react';
import { renderToString } from 'react-dom/server';

// Simple static site generator for Vercel deployment
async function buildStatic() {
  console.log('🔨 Building static site...');
  
  const outputDir = '.indjs/static';
  
  // Clean and create output directory
  try {
    await fs.rm(outputDir, { recursive: true, force: true });
  } catch (e) {
    // Directory might not exist, ignore
  }
  await fs.mkdir(outputDir, { recursive: true });
  
  // Copy public assets
  try {
    const publicFiles = await fs.readdir('public');
    for (const file of publicFiles) {
      await fs.copyFile(path.join('public', file), path.join(outputDir, file));
    }
  } catch (e) {
    console.log('No public directory found, skipping...');
  }
  
  // Generate basic HTML pages
  const pages = [
    { path: 'index.html', route: '/' },
    { path: 'about.html', route: '/about' }
  ];
  
  for (const page of pages) {
    const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>INDJS App</title>
  <script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body>
  <div id="root">
    <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div class="container mx-auto px-4 py-16">
        <div class="text-center">
          <h1 class="text-6xl font-bold text-gray-900 mb-4">
            Welcome to <span class="text-indigo-600">INDJS</span>
          </h1>
          <p class="text-xl text-gray-600 mb-8">
            The modern full-stack React framework
          </p>
          <div class="space-x-4">
            <a href="/about.html" class="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors">
              Learn More
            </a>
            <a href="/api/hello" class="inline-block bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors">
              Test API
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</body>
</html>`;
    
    await fs.writeFile(path.join(outputDir, page.path), html);
  }
  
  // Create API directory and sample endpoint
  const apiDir = path.join(outputDir, 'api');
  await fs.mkdir(apiDir, { recursive: true });
  
  const apiHello = `export default function handler(req, res) {
  res.status(200).json({
    message: 'Hello from INDJS API!',
    timestamp: new Date().toISOString()
  });
}`;
  
  await fs.writeFile(path.join(apiDir, 'hello.js'), apiHello);
  
  console.log('✅ Static build complete!');
}

buildStatic().catch(console.error);
