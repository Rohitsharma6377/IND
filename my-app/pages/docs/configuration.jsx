import React from 'react';
import DocsLayout from './_layout';

export default function Configuration() {
  return (
    <DocsLayout>
      <h1>Configuration</h1>
      <pre><code>{`// indjs.config.js
export default {
  auth: { secret: process.env.JWT_SECRET },
  database: { type: 'postgresql', url: process.env.DATABASE_URL },
  experimental: { devBundler: 'vite' },
  caching: { secret: process.env.REVALIDATE_SECRET }
};`}</code></pre>
      <p>Environment variables are read from <code>.env</code> via <code>dotenv</code>.</p>
    </DocsLayout>
  );
}
