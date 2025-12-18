import React from "react";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-900 bg-gradient-to-b from-sky-500 via-sky-500 to-gray-900 text-slate-900 font-sans">
      <div className="max-w-[980px] mx-auto px-5 py-12">
        <section className="bg-white rounded-2xl p-7 shadow-[0_10px_30px_rgba(0,0,0,0.12)]">
          <div className="inline-block text-[10px] tracking-widest uppercase text-sky-700 bg-sky-100 px-2.5 py-1.5 rounded-full mb-2.5 font-bold">
            Full-stack React • SSR • SSG • API • TypeScript
          </div>
          <h1 className="text-4xl xs:text-5xl font-extrabold leading-tight m-0 text-[#0b1220]">
            Welcome to INDJS
          </h1>
          <p className="mt-3 text-lg text-slate-600 max-w-2xl">
            The modern full-stack React framework that combines the best of
            Next.js simplicity with powerful built-in features. Build, deploy,
            and scale web applications with zero configuration.
          </p>
          <nav className="flex flex-wrap gap-3 mt-6">
            <a href="/learn" className="bg-sky-500 hover:bg-sky-600 text-white px-5 py-2.5 rounded-xl no-underline font-semibold transition-colors">
              Get Started
            </a>
            <a href="/docs" className="bg-slate-100 hover:bg-slate-200 text-[#0b1220] px-5 py-2.5 rounded-xl no-underline font-semibold transition-colors border border-slate-200">
              Documentation
            </a>
            <a href="https://github.com/indjs/indjs" className="bg-slate-100 hover:bg-slate-200 text-[#0b1220] px-5 py-2.5 rounded-xl no-underline font-semibold transition-colors border border-slate-200">
              GitHub
            </a>
          </nav>

          <div className="flex flex-wrap gap-6 mt-8 text-sm text-slate-500 font-medium justify-center border-t border-slate-50 pt-8">
            <div className="flex items-center gap-1.5">
              <span className="text-emerald-500 font-bold">✓</span> Zero Configuration
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-emerald-500 font-bold">✓</span> Built-in Authentication
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-emerald-500 font-bold">✓</span> Database Integration
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-emerald-500 font-bold">✓</span> One-Click Deploy
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
            <article className="bg-slate-50 border border-slate-100 rounded-xl p-5 hover:border-sky-100 hover:bg-sky-50/30 transition-all">
              <div className="text-[10px] text-sky-600 font-bold tracking-wider uppercase mb-2">
                🚀 PERFORMANCE
              </div>
              <h3 className="text-lg font-bold text-[#0b1220] mb-2">React 18 SSR + SSG</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Lightning-fast server-side rendering with static generation,
                streaming, and incremental regeneration.
              </p>
            </article>
            <article className="bg-slate-50 border border-slate-100 rounded-xl p-5 hover:border-sky-100 hover:bg-sky-50/30 transition-all">
              <div className="text-[10px] text-sky-600 font-bold tracking-wider uppercase mb-2">
                🛣️ ROUTING
              </div>
              <h3 className="text-lg font-bold text-[#0b1220] mb-2">File‑based Routes</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Intuitive file-based routing with dynamic routes, layouts,
                middleware, and advanced patterns.
              </p>
            </article>
            <article className="bg-slate-50 border border-slate-100 rounded-xl p-5 hover:border-sky-100 hover:bg-sky-50/30 transition-all">
              <div className="text-[10px] text-sky-600 font-bold tracking-wider uppercase mb-2">
                🔌 FULL-STACK
              </div>
              <h3 className="text-lg font-bold text-[#0b1220] mb-2">API Routes + Database</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Built-in serverless API routes with database integration,
                authentication, and real-time features.
              </p>
            </article>
            <article className="bg-slate-50 border border-slate-100 rounded-xl p-5 hover:border-sky-100 hover:bg-sky-50/30 transition-all">
              <div className="text-[10px] text-sky-600 font-bold tracking-wider uppercase mb-2">
                🎨 STYLING
              </div>
              <h3 className="text-lg font-bold text-[#0b1220] mb-2">Tailwind CSS Built-in</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Pre-configured Tailwind CSS with support for CSS Modules, Sass,
                and custom theming.
              </p>
            </article>
          </div>

          <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl p-8 mt-10 text-white text-center shadow-lg">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Build the Future?
            </h2>
            <p className="text-lg mb-8 text-indigo-100 max-w-2xl mx-auto">
              Join thousands of developers who are building modern, scalable web
              applications with INDJS. From startups to enterprise, INDJS powers
              the next generation of web experiences.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href="/learn" className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-xl no-underline font-bold text-lg backdrop-blur-md transition-all">
                Start Building Now
              </a>
              <a href="/docs" className="bg-transparent hover:bg-white/10 text-white px-6 py-3 rounded-xl no-underline font-bold text-lg border-2 border-white/30 transition-all">
                View Documentation
              </a>
            </div>
          </div>
        </section>

        <footer className="mt-12 pt-8 border-t border-white/10 flex flex-wrap justify-between items-center gap-6 text-slate-400">
          <p className="m-0 text-sm">
            Powered by <strong className="text-white">INDJS</strong> v1.0.0 • Edit{" "}
            <code className="bg-slate-800 text-sky-400 px-1.5 py-0.5 rounded text-xs font-mono">pages/index.jsx</code>
          </p>
          <div className="flex gap-6 text-sm">
            <a href="/docs" className="hover:text-white transition-colors no-underline">
              Documentation
            </a>
            <a href="https://github.com/indjs/indjs" className="hover:text-white transition-colors no-underline">
              GitHub
            </a>
            <a href="https://twitter.com/indjs" className="hover:text-white transition-colors no-underline">
              Twitter
            </a>
          </div>
        </footer>
      </div>
    </main>
  );
}
