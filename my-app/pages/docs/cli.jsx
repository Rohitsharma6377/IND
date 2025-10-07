import React from 'react';
import DocsLayout from './_layout';

export default function CLI() {
  return (
    <DocsLayout>
      <h1>CLI</h1>
      <pre><code>{`indjs --help
indjs dev --port 4000
indjs build --baseUrl https://mysite.com
indjs start --port 8080
indjs create my-app
indjs generate page about
indjs g component Button --noPrompt
indjs g api users
indjs deploy vercel
indjs test --watch`}</code></pre>
    </DocsLayout>
  );
}
