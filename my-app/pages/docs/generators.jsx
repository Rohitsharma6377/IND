import React from 'react';
import DocsLayout from './_layout';

export default function Generators() {
  return (
    <DocsLayout>
      <h1>Generators</h1>
      <p>Use interactive prompts or skip with <code>--noPrompt</code> / <code>--quick</code>.</p>
      <pre><code>{`indjs g page about
indjs g component Button --noPrompt
indjs g api users`}</code></pre>
      <p>API generators can add validation and auth boilerplate.</p>
    </DocsLayout>
  );
}
