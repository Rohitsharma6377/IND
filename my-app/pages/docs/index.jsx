import React from 'react';
import DocsLayout from './_layout';

export default function DocsHome() {
  return (
    <DocsLayout>
      <h1>INDJS Documentation</h1>
      <p>
        INDJS is a modern, fast, and lightweight full‑stack React framework that brings
        file‑based routing, SSR/SSG, API routes, Tailwind, and a powerful CLI with a great DX.
      </p>
      <h2>What you get</h2>
      <ul>
        <li>File-based routing with dynamic params</li>
        <li>SSR and SSG with optional revalidation</li>
        <li>API routes with full HTTP method support</li>
        <li>Vite-powered HMR in development</li>
        <li>Performance & security defaults (helmet, compression, CORS, logging, cache)</li>
      </ul>
      <p>
        Use the sidebar to navigate chapters, or start with Getting Started.
      </p>
    </DocsLayout>
  );
}
