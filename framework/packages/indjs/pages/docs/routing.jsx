import React from "react";

export default function Routing() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-24 text-slate-600 dark:text-zinc-300">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Routing</h1>
        <p className="text-xl text-slate-600 dark:text-zinc-400">File-system based routing for universal apps.</p>
      </div>

      <div className="prose prose-invert max-w-none">
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">How it works</h2>
          <p className="mb-4">
            INDJS uses the <code className="text-indigo-600 dark:text-indigo-400">pages/</code> directory to define routes.
            The file structure maps directly to URL paths.
          </p>

          <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl overflow-hidden mb-8 shadow-sm">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white font-bold">
                <tr>
                  <th className="p-4">File Path</th>
                  <th className="p-4">URL Path</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-white/5">
                <tr>
                  <td className="p-4 font-mono text-indigo-600 dark:text-indigo-300">pages/index.jsx</td>
                  <td className="p-4 text-slate-700 dark:text-white">/</td>
                </tr>
                <tr>
                  <td className="p-4 font-mono text-indigo-600 dark:text-indigo-300">pages/about.jsx</td>
                  <td className="p-4 text-slate-700 dark:text-white">/about</td>
                </tr>
                <tr>
                  <td className="p-4 font-mono text-indigo-600 dark:text-indigo-300">pages/blog/first.jsx</td>
                  <td className="p-4 text-slate-700 dark:text-white">/blog/first</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Dynamic Routes</h2>
          <p className="mb-4">
            Use square brackets to create dynamic route segments.
          </p>
          <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl overflow-hidden mb-6 shadow-sm">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white font-bold">
                <tr>
                  <th className="p-4">File Path</th>
                  <th className="p-4">URL Path</th>
                  <th className="p-4">Params</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-white/5">
                <tr>
                  <td className="p-4 font-mono text-indigo-600 dark:text-indigo-300">pages/blog/[slug].jsx</td>
                  <td className="p-4 text-slate-700 dark:text-white">/blog/hello-world</td>
                  <td className="p-4 font-mono text-slate-600 dark:text-zinc-400">{`{ slug: "hello-world" }`}</td>
                </tr>
                <tr>
                  <td className="p-4 font-mono text-indigo-600 dark:text-indigo-300">pages/shop/[cat]/[id].jsx</td>
                  <td className="p-4 text-slate-700 dark:text-white">/shop/shoes/123</td>
                  <td className="p-4 font-mono text-slate-600 dark:text-zinc-400">{`{ cat: "shoes", id: "123" }`}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Layouts</h2>
          <p className="mb-4">
            Create a <code className="text-indigo-600 dark:text-indigo-400">_layout.jsx</code> file to wrap all pages in that directory.
            This is perfect for persistent navigation, headers, and footers.
          </p>
          <div className="bg-slate-900 dark:bg-black/50 border border-slate-200 dark:border-white/10 rounded-xl p-4 font-mono text-sm overflow-x-auto shadow-sm">
            <div className="text-purple-400">export default <span className="text-blue-400">function</span> <span className="text-yellow-300">Layout</span>({`{ children }`}) {`{`}</div>
            <div className="pl-4 text-purple-400">return (</div>
            <div className="pl-8 text-white"><span className="text-blue-400">&lt;div&gt;</span></div>
            <div className="pl-12 text-white"><span className="text-blue-400">&lt;Navbar /&gt;</span></div>
            <div className="pl-12 text-white">{`{children}`}</div>
            <div className="pl-12 text-white"><span className="text-blue-400">&lt;Footer /&gt;</span></div>
            <div className="pl-8 text-white"><span className="text-blue-400">&lt;/div&gt;</span></div>
            <div className="pl-4 text-purple-400">);</div>
            <div className="text-white"></div>
          </div>
        </section>
      </div>
    </div>
  );
}
