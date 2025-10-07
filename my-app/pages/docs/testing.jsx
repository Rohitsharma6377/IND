import React from 'react';
import DocsLayout from './_layout';

export default function Testing() {
  return (
    <DocsLayout>
      <h1>Testing</h1>
      <h2>Unit (Vitest)</h2>
      <pre><code>{`indjs test
indjs test --watch`}</code></pre>
      <h2>E2E (Playwright)</h2>
      <pre><code>{`npm run e2e        # inside the framework CLI package
npx playwright install`}</code></pre>
    </DocsLayout>
  );
}
