import React from 'react';
import DocsLayout from './_layout';
import DocsSlider from '../components/DocsSlider';

export default function DocsHome() {
  return (
    <DocsLayout>
      <section className="not-prose text-center py-6">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">INDJS Documentation</h1>
        <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
          INDJS is a modern, fast, and lightweight full‑stack React framework that brings file‑based routing, SSR/SSG,
          API routes, Tailwind, and a powerful CLI with a great developer experience.
        </p>
      </section>

      <h2>What you get</h2>
      <ul>
        <li>File-based routing with dynamic params</li>
        <li>SSR and SSG with optional revalidation</li>
        <li>API routes with full HTTP method support</li>
        <li>Vite-powered HMR in development</li>
        <li>Performance & security defaults (helmet, compression, CORS, logging, cache)</li>
      </ul>

      <h2>Gallery</h2>
      <p>Here are some screenshots of the framework and CLI in action.</p>
      <div className="not-prose my-6">
        <DocsSlider
          images={[
            '/images/Screenshot 2025-10-07 174853.png',
            '/images/Screenshot 2025-10-07 174859.png',
            '/images/Screenshot 2025-10-07 174905.png',
            '/images/Screenshot 2025-10-07 174909.png',
            '/images/Screenshot 2025-10-07 174916.png',
            '/images/Screenshot 2025-10-07 175352.png',
            '/images/Screenshot 2025-10-07 175428.png',
            '/images/Screenshot 2025-10-07 175444.png',
            '/images/Screenshot 2025-10-07 175509.png',
            '/images/Screenshot 2025-10-07 175604.png',
            '/images/Screenshot 2025-10-07 175612.png',
            '/images/Screenshot 2025-10-07 175626.png',
            '/images/Screenshot 2025-10-07 175637.png',
            '/images/Screenshot 2025-10-07 175646.png',
            '/images/Screenshot 2025-10-07 175656.png',
            '/images/Screenshot 2025-10-07 175721.png',
            '/images/Screenshot 2025-10-07 175732.png',
            '/images/Screenshot 2025-10-07 175747.png',
            '/images/Screenshot 2025-10-07 175752.png',
            '/images/Screenshot 2025-10-07 175804.png',
            '/images/Screenshot 2025-10-07 180020.png',
            '/images/Screenshot 2025-10-07 180031.png',
          ]}
        />
      </div>

      <p>Use the sidebar to navigate chapters, or start with Getting Started.</p>
    </DocsLayout>
  );
}
