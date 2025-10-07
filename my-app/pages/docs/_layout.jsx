import React from 'react';
import { Link } from 'indjs';

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
  { href: '/docs/contact', title: 'Contact' },
];

export default function DocsLayout({ children }) {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur sticky top-0 z-20">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-indigo-600">INDJS Docs</Link>
          <nav className="hidden md:flex items-center gap-6 text-gray-700">
            <Link href="/docs" className="hover:text-indigo-600">Docs</Link>
            <Link href="/about" className="hover:text-indigo-600">About</Link>
            <Link href="/" className="hover:text-indigo-600">Home</Link>
          </nav>
        </div>
      </header>

      {/* Body */}
      <div className="container mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-12 gap-8 flex-1 w-full">
        <aside className="md:col-span-3 border-r pr-4">
          <nav className="space-y-2">
            {sections.map((s) => (
              <Link key={s.href} href={s.href} className="block text-gray-700 hover:text-indigo-600">
                {s.title}
              </Link>
            ))}
          </nav>
        </aside>
        <article className="md:col-span-9 prose max-w-none">
          {children}
        </article>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300">
        <div className="container mx-auto px-4 py-10 grid md:grid-cols-3 gap-8">
          <div>
            <h4 className="text-white font-semibold mb-3">INDJS</h4>
            <p className="text-sm opacity-80">Modern full‑stack React framework with SSR/SSG, API routes, Tailwind, and great DX.</p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link className="hover:text-white" href="/docs">Documentation</Link></li>
              <li><Link className="hover:text-white" href="/docs/getting-started">Getting Started</Link></li>
              <li><Link className="hover:text-white" href="/docs/troubleshooting">Troubleshooting</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">Contact</h4>
            <p className="text-sm opacity-80">Questions or feedback?</p>
            <Link className="text-indigo-400 hover:text-white text-sm" href="/docs/contact">Contact us →</Link>
          </div>
        </div>
        <div className="border-t border-white/10 text-center py-4 text-xs opacity-75">© 2025 INDJS</div>
      </footer>
    </div>
  );
}
