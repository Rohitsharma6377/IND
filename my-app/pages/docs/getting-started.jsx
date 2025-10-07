import React from 'react';
import DocsLayout from './_layout';

export default function GettingStarted() {
  return (
    <DocsLayout>
      <h1>Getting Started</h1>
      <h2>Create a project (npx)</h2>
      <pre><code>{`npx indjs@latest create my-app
cd my-app
npm install
npm run dev`}</code></pre>
      <h2>Install locally</h2>
      <pre><code>{`npm i indjs react react-dom
# package.json scripts
{
  "scripts": {
    "dev": "indjs dev",
    "build": "indjs build",
    "start": "indjs start"
  }
}`}</code></pre>
      <h2>Global (optional)</h2>
      <pre><code>{`npm i -g indjs
indjs --help`}</code></pre>
    </DocsLayout>
  );
}
