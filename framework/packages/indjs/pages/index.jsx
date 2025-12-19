import React, { useState, useEffect } from "react";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Gradients (Dark Mode Only) */}
      <div className="fixed inset-0 pointer-events-none hidden dark:block">
        <div className="absolute top-[-20%] left-[-10%] w-[1000px] h-[1000px] bg-indigo-600/20 blur-[120px] rounded-full mix-blend-screen animate-pulse-slow" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[800px] h-[800px] bg-purple-600/10 blur-[100px] rounded-full mix-blend-screen" />
      </div>

      {/* Background Gradients (Light Mode Only) */}
      <div className="fixed inset-0 pointer-events-none block dark:hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[1000px] h-[1000px] bg-indigo-200/40 blur-[120px] rounded-full mix-blend-multiply" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[800px] h-[800px] bg-purple-200/40 blur-[100px] rounded-full mix-blend-multiply" />
      </div>


      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 container mx-auto px-6 text-center z-10">
        <div className={`transition-all duration-1000 transform ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-indigo-500/30 bg-indigo-50/50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-300 text-sm font-medium mb-8 hover:bg-indigo-100 dark:hover:bg-indigo-500/20 transition-colors cursor-default backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            v3.0 Production Ready
          </div>

          <h1 className="text-5xl md:text-8xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-8 leading-[1.1]">
            One Framework. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 animate-gradient-x">
              Every Platform.
            </span>
          </h1>

          <p className="text-xl text-slate-600 dark:text-zinc-400 max-w-2xl mx-auto mb-12 leading-relaxed">
            Build universal React applications for Web, Desktop (Electron), and Mobile (Native)
            with a single codebase.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a
              href="/docs"
              className="h-14 px-8 rounded-full bg-slate-900 dark:bg-white text-white dark:text-black font-bold text-lg hover:bg-slate-700 dark:hover:bg-zinc-200 hover:scale-105 transition-all flex items-center justify-center min-w-[180px] shadow-[0_0_20px_rgba(0,0,0,0.1)] dark:shadow-[0_0_20px_rgba(255,255,255,0.3)]"
            >
              Get Started
            </a>
            <div className="h-14 px-8 rounded-full border border-slate-200 dark:border-white/10 bg-white/50 dark:bg-white/5 text-slate-600 dark:text-zinc-300 font-mono text-sm flex items-center gap-4 hover:bg-white dark:hover:bg-white/10 transition-colors cursor-pointer group min-w-[240px] backdrop-blur-sm shadow-sm">
              <span className="text-indigo-500 dark:text-indigo-400">$</span>
              <span>npx indjs create my-app</span>
              <svg className="w-5 h-5 ml-auto text-slate-400 dark:text-zinc-500 group-hover:text-slate-900 dark:group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
            </div>
          </div>
        </div>
      </section>

      {/* Code Demo - Scroll Animation */}
      <section className="py-24 container mx-auto px-6 relative z-10">
        <div className="glass-panel rounded-2xl p-2 md:p-4 animate-fade-in-up animation-delay-300 shadow-2xl bg-slate-900 dark:bg-black/40">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-white/5 rounded-t-xl">
            <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
            <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
            <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
            <div className="ml-auto text-xs text-zinc-500 font-mono">pages/index.jsx</div>
          </div>
          <div className="p-4 md:p-8 font-mono text-sm md:text-base overflow-x-auto bg-[#0d1117] rounded-b-xl text-white">
            <div className="text-purple-400">import <span className="text-white">React</span> from <span className="text-green-400">'react'</span>;</div>
            <div className="text-purple-400">import <span className="text-white">{`{ Screen, Text }`}</span> from <span className="text-green-400">'indjs'</span>;</div>
            <br />
            <div className="text-blue-400">export default <span className="text-purple-400">function</span> <span className="text-yellow-300">UniversalApp</span>() {`{`}</div>
            <div className="pl-4 text-zinc-400">// This code runs on Web, Electron, and Android/iOS</div>
            <div className="pl-4 text-purple-400">return (</div>
            <div className="pl-8 text-white"><span className="text-blue-400">&lt;Screen&gt;</span></div>
            <div className="pl-12 text-white"><span className="text-blue-400">&lt;Text</span> <span className="text-purple-300">className</span>=<span className="text-green-400">"text-2xl font-bold"</span><span className="text-blue-400">&gt;</span></div>
            <div className="pl-16 text-white type-writer-effect">Hello World 🌍</div>
            <div className="pl-12 text-white"><span className="text-blue-400">&lt;/Text&gt;</span></div>
            <div className="pl-8 text-white"><span className="text-blue-400">&lt;/Screen&gt;</span></div>
            <div className="pl-4 text-purple-400">);</div>
            <div className="text-white"></div>
          </div>
        </div>
      </section>

      {/* Grid Features */}
      <section className="py-24 bg-slate-50/50 dark:bg-gradient-to-b dark:from-transparent dark:to-black/50 z-10 relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white">Why INDJS?</h2>
            <p className="text-slate-600 dark:text-zinc-400 max-w-2xl mx-auto">Everything you need to ship cross-platform apps at the speed of light.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              delay="0"
              icon="⚡"
              title="Universal Engine"
              desc="A single React runtime that adapts to DOM (Web), Electron Renderer (Desktop), and Capacitor WebView (Mobile)."
            />
            <FeatureCard
              delay="100"
              icon="📂"
              title="File-System Routing"
              desc="Create files in `pages/` and let the framework handle routing, deep linking, and navigation stack."
            />
            <FeatureCard
              delay="200"
              icon="🎨"
              title="Tailwind Native"
              desc="Write utility classes that compile to optimized CSS for all platforms."
            />
            <FeatureCard
              delay="300"
              icon="🔄"
              title="Live Reload Everywhere"
              desc="See changes instantly on your browser, desktop window, and connected Android device."
            />
            <FeatureCard
              delay="400"
              icon="📦"
              title="Zero Config"
              desc="No webpack config. No babelrc. Just install and run."
            />
            <FeatureCard
              delay="500"
              icon="🔒"
              title="Enterprise Ready"
              desc="TypeScript, ESLint, and Testing (Vitest/Playwright) pre-configured."
            />
          </div>
        </div>
      </section>

      {/* Interactive Terminal */}
      <section className="py-24 container mx-auto px-6 z-10 relative">
        <div className="glass-panel p-8 rounded-2xl text-center bg-white/50 dark:bg-transparent shadow-xl dark:shadow-none">
          <h2 className="text-3xl font-bold mb-8 text-slate-900 dark:text-white">Deploy Anywhere</h2>
          <div className="flex flex-wrap justify-center gap-4 font-mono text-sm">
            <div className="bg-slate-900 dark:bg-black/50 px-6 py-4 rounded-xl border border-white/10 flex items-center gap-3 text-white">
              <div className="bg-green-500/20 text-green-400 p-2 rounded">npm run build</div>
              <span className="text-zinc-500">→</span>
              <span className="text-white">.indjs/static</span>
            </div>
            <div className="bg-slate-900 dark:bg-black/50 px-6 py-4 rounded-xl border border-white/10 flex items-center gap-3 text-white">
              <div className="bg-blue-500/20 text-blue-400 p-2 rounded">npm run desktop:build</div>
              <span className="text-zinc-500">→</span>
              <span className="text-white">MyApp.exe</span>
            </div>
            <div className="bg-slate-900 dark:bg-black/50 px-6 py-4 rounded-xl border border-white/10 flex items-center gap-3 text-white">
              <div className="bg-purple-500/20 text-purple-400 p-2 rounded">npm run android:dev</div>
              <span className="text-zinc-500">→</span>
              <span className="text-white">APK</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-32 text-center z-10 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-indigo-100/40 dark:from-indigo-900/20 to-transparent pointer-events-none" />
        <h2 className="text-4xl md:text-5xl font-bold mb-8 relative z-10 text-slate-900 dark:text-white">Start your journey</h2>
        <a href="/docs" className="inline-block px-10 py-4 bg-slate-900 dark:bg-white text-white dark:text-black font-bold rounded-full hover:scale-105 hover:bg-slate-800 dark:hover:bg-zinc-200 transition-all shadow-lg shadow-indigo-500/20 relative z-10">
          Read the Docs
        </a>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, desc, delay }) {
  return (
    <div className={`p-8 rounded-2xl bg-white/60 dark:bg-white/5 border border-slate-200 dark:border-white/5 backdrop-blur-lg hover:bg-white dark:hover:bg-white/10 transition-all duration-300 group hover:-translate-y-2 animate-fade-in-up cursor-default shadow-sm dark:shadow-none`} style={{ animationDelay: `${delay}ms` }}>
      <div className="text-4xl mb-6 bg-slate-100 dark:bg-white/5 w-16 h-16 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">{icon}</div>
      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{title}</h3>
      <p className="text-slate-600 dark:text-zinc-400 leading-relaxed text-sm">{desc}</p>
    </div>
  );
}
