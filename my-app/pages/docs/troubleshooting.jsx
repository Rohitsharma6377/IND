import React from 'react';
import DocsLayout from './_layout';

export default function Troubleshooting() {
  return (
    <DocsLayout>
      <h1>Troubleshooting</h1>
      <h2>npx: could not determine executable to run</h2>
      <p>Ensure the latest <code>indjs</code> is published from the CLI package with a <code>bin</code> field. Then:</p>
      <pre><code>{`npx --clear-cache
npx indjs@latest --help`}</code></pre>
      <h2>Windows: 'indjs' is not recognized</h2>
      <p>Add <code>%AppData%\npm</code> to PATH or use <code>npx indjs</code>.</p>
      <h2>Unterminated regular expression</h2>
      <p>Check the referenced JSX for stray <code>/</code> or unclosed strings/JSX. Fix and save.</p>
    </DocsLayout>
  );
}
