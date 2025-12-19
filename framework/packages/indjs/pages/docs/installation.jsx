import React from "react";

export default function Installation() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-24 text-slate-600 dark:text-zinc-300">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Installation</h1>
        <p className="text-xl text-slate-600 dark:text-zinc-400">Get up and running with INDJS in seconds.</p>
      </div>

      <div className="prose prose-invert max-w-none">
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Prerequisites</h2>
          <ul className="list-disc pl-6 space-y-2 mb-6">
            <li>Node.js 18.0.0 or later</li>
            <li>npm, pnpm, or yarn</li>
            <li>Git (optional)</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Quick Start</h2>
          <p className="mb-4">Create a new project using the interactive CLI:</p>
          <div className="bg-slate-900 dark:bg-black/50 border border-slate-200 dark:border-white/10 rounded-xl p-4 font-mono text-sm text-indigo-300 mb-6 shadow-sm">
            npx indjs create my-app
          </div>
          <p className="mb-4">This will guide you through setting up:</p>
          <ul className="list-disc pl-6 space-y-2 mb-6">
            <li>Project Name</li>
            <li>Template (Starter, Blog, Store)</li>
            <li>TypeScript / JavaScript</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Running Locally</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Web Development</h3>
              <div className="bg-slate-900 dark:bg-black/50 border border-slate-200 dark:border-white/10 rounded-xl p-4 font-mono text-sm text-white mb-2 shadow-sm">
                npm run dev
              </div>
              <p className="text-sm">Starts server at <code className="text-indigo-600 dark:text-indigo-400">http://localhost:3000</code></p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Mobile Development</h3>
              <div className="bg-slate-900 dark:bg-black/50 border border-slate-200 dark:border-white/10 rounded-xl p-4 font-mono text-sm text-white mb-2 shadow-sm">
                npm run mobile:dev
              </div>
              <p className="text-sm">Starts Metro-like server/tunnel for iOS & Android.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Desktop Development</h3>
              <div className="bg-slate-900 dark:bg-black/50 border border-slate-200 dark:border-white/10 rounded-xl p-4 font-mono text-sm text-white mb-2 shadow-sm">
                npm run desktop:dev
              </div>
              <p className="text-sm">Launches Electron window with Hot Module Replacement.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
