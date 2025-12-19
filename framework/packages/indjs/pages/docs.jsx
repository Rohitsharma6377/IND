import React from "react";

export default function Docs() {
  const docs = [
    {
      title: "Installation",
      desc: "Get started with INDJS by installing the framework and creating your first app.",
      link: "/docs/installation",
      category: "Getting Started",
    },
    {
      title: "Routing",
      desc: "Master file-based routing, dynamic routes, and advanced navigation patterns.",
      link: "/docs/routing",
      category: "Core Concepts",
    },
    {
      title: "Universal UI",
      desc: "Build components that adapt to Web, iOS, and Android automatically.",
      link: "/docs/universal-ui",
      category: "Core Concepts",
    },
    {
      title: "API Routes",
      desc: "Build serverless API endpoints with built-in validation and database integration.",
      link: "/docs/api-routes",
      category: "Backend",
    },
    {
      title: "Deployment",
      desc: "Deploy to Vercel, Netlify, Play Store, and App Store from one codebase.",
      link: "/docs/deployment",
      category: "Guides",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-24">
      <div className="flex flex-col md:flex-row gap-16">
        {/* Sidebar */}
        <div className="w-full md:w-64 flex-shrink-0">
          <div className="sticky top-24">
            <h3 className="font-bold text-slate-900 dark:text-white mb-4 uppercase tracking-wider text-xs">Getting Started</h3>
            <ul className="space-y-3 mb-8">
              <li><a href="/docs/installation" className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline">Installation</a></li>
              <li><a href="/docs/structure" className="text-slate-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-white transition-colors">Project Structure</a></li>
              <li><a href="/docs/cli" className="text-slate-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-white transition-colors">CLI Reference</a></li>
            </ul>

            <h3 className="font-bold text-slate-900 dark:text-white mb-4 uppercase tracking-wider text-xs">Core Concepts</h3>
            <ul className="space-y-3 mb-8">
              <li><a href="/docs/routing" className="text-slate-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-white transition-colors">Routing</a></li>
              <li><a href="/docs/ssr-ssg" className="text-slate-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-white transition-colors">SSR & SSG</a></li>
              <li><a href="/docs/universal-ui" className="text-slate-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-white transition-colors">Universal UI</a></li>
            </ul>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">
          <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-6">Documentation</h1>
          <p className="text-xl text-slate-600 dark:text-zinc-400 mb-12 leading-relaxed max-w-3xl">
            Welcome to the INDJS documentation. Here you'll find everything you need to build
            production-ready universal applications.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {docs.map((doc, i) => (
              <a
                href={doc.link}
                key={i}
                className="block p-6 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 hover:border-indigo-500/50 hover:bg-slate-50 dark:hover:bg-white/10 transition-all group shadow-sm dark:shadow-none"
              >
                <div className="text-xs font-bold text-indigo-600 dark:text-indigo-400 mb-2 uppercase tracking-wide">{doc.category}</div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors">{doc.title}</h3>
                <p className="text-slate-600 dark:text-zinc-400 text-sm leading-relaxed">{doc.desc}</p>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
