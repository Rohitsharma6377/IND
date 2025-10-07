import React from 'react';
import DocsLayout from './_layout';

export default function Routing() {
  return (
    <DocsLayout>
      <h1>Routing</h1>
      <p>INDJS uses file‑based routing similar to Next.js.</p>
      <pre><code>{`pages/
├─ index.jsx            → /
├─ about.jsx            → /about
├─ blog/
│  ├─ index.jsx         → /blog
│  └─ [slug].jsx        → /blog/:slug
└─ api/
   └─ users.js          → /api/users`}</code></pre>
      <h2>Dynamic routes</h2>
      <pre><code>{`// pages/blog/[slug].jsx
export default function BlogPost({ slug }) {
  return <h1>Post: {slug}</h1>;
}
export async function getServerSideProps({ params }) {
  return { props: { slug: params.slug } };
}`}</code></pre>
      <h2>Layouts</h2>
      <pre><code>{`// pages/_layout.jsx
export default function Layout({ children }) { return <main>{children}</main>; }`}</code></pre>
    </DocsLayout>
  );
}
