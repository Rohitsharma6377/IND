import React from 'react';

const sections = [
  { href: '/docs', title: 'Overview' },
  { href: '/docs/getting-started', title: 'Getting Started' },
  { href: '/docs/routing', title: 'Routing' },
  { href: '/docs/cli', title: 'CLI' },
  { href: '/docs/generators', title: 'Generators' },
  { href: '/docs/configuration', title: 'Configuration' },
  { href: '/docs/testing', title: 'Testing' },
  { href: '/docs/deployment', title: 'Deployment' },
  { href: '/docs/performance', title: 'Performance & Security' },
  { href: '/docs/troubleshooting', title: 'Troubleshooting' },
];

export default function DocsLayout({ children }) {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-12 gap-8">
        <aside className="md:col-span-3 border-r pr-4">
          <nav className="space-y-2">
            {sections.map((s) => (
              <a key={s.href} href={s.href} className="block text-gray-700 hover:text-indigo-600">
                {s.title}
              </a>
            ))}
          </nav>
        </aside>
        <article className="md:col-span-9 prose max-w-none">
          {children}
        </article>
      </div>
    </div>
  );
}
