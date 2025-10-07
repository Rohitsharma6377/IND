import React from 'react';
import DocsLayout from './_layout';

export default function Performance() {
  return (
    <DocsLayout>
      <h1>Performance & Security</h1>
      <ul>
        <li>Helmet security headers</li>
        <li>Compression (gzip)</li>
        <li>CORS configuration</li>
        <li>pino-http logging (pretty in dev)</li>
        <li>LRU cache for SSR HTML in production</li>
        <li>Rate limiting</li>
      </ul>
      <p>These defaults are wired in the server setup.</p>
    </DocsLayout>
  );
}
