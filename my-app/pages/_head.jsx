import React from 'react';

export default function Head({ title, description, image }) {
  const defaultTitle = 'INDJS - The Universal React Meta-Framework';
  const defaultDescription = 'Build web, desktop, and mobile apps with a single React codebase. Zero config, 10x faster builds, 30+ universal components.';
  const defaultImage = '/og-image.png';
  
  const pageTitle = title ? `${title} | INDJS` : defaultTitle;
  const pageDescription = description || defaultDescription;
  const pageImage = image || defaultImage;

  return (
    <>
      {/* Primary Meta Tags */}
      <title>{pageTitle}</title>
      <meta name="title" content={pageTitle} />
      <meta name="description" content={pageDescription} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
      
      {/* Favicon */}
      <link rel="icon" type="image/png" href="/favicon.png" />
      <link rel="apple-touch-icon" href="/favicon.png" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://indjs.vercel.app/" />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:image" content={pageImage} />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://indjs.vercel.app/" />
      <meta property="twitter:title" content={pageTitle} />
      <meta property="twitter:description" content={pageDescription} />
      <meta property="twitter:image" content={pageImage} />
      
      {/* Theme Color */}
      <meta name="theme-color" content="#6366f1" />
      
      {/* Fonts */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
      
      {/* Keywords */}
      <meta name="keywords" content="INDJS, React framework, universal framework, Next.js alternative, React meta-framework, SSR, SSG, ISR, Electron, Capacitor, mobile app development, desktop app development" />
      
      {/* Author */}
      <meta name="author" content="Rohit Sharma" />
      
      {/* Robots */}
      <meta name="robots" content="index, follow" />
    </>
  );
}
