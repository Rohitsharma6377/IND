import React from 'react';
import DocsLayout from './_layout';

export default function Deployment() {
  return (
    <DocsLayout>
      <h1>Deployment</h1>
      <ul>
        <li>Vercel: <code>indjs deploy vercel</code></li>
        <li>Netlify: <code>indjs deploy netlify</code></li>
        <li>Docker: <code>indjs deploy docker</code></li>
        <li>AWS/GCP: adapters available under <code>src/adapters/</code></li>
      </ul>
      <p>For edge/serverless, use the provided adapter stubs and route config.</p>
    </DocsLayout>
  );
}
