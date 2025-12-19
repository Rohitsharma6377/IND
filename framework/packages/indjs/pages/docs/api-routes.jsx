import React from "react";

export default function ApiRoutes() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-24 text-slate-600 dark:text-zinc-300">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">API Routes</h1>
        <p className="text-xl text-slate-600 dark:text-zinc-400">Serverless functions for your backend logic.</p>
      </div>

      <div className="prose prose-invert max-w-none">
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Creating an API</h2>
          <p className="mb-4">
            Any file inside <code className="text-indigo-600 dark:text-indigo-400">pages/api/*</code> is treated as an API endpoint, not a UI page.
            These functions run on the server-side only.
          </p>

          <div className="bg-slate-900 dark:bg-black/50 border border-slate-200 dark:border-white/10 rounded-xl p-4 font-mono text-sm overflow-x-auto relative shadow-sm">
            <div className="absolute top-2 right-2 text-xs text-zinc-500">pages/api/hello.js</div>
            <div className="text-blue-400">export default <span className="text-purple-400">async function</span> <span className="text-yellow-300">handler</span>(req, res) {`{`}</div>
            <div className="pl-4 text-purple-400">if (req.method === 'POST') {`{`}</div>
            <div className="pl-8 text-white">const {`{ name }`} = req.body;</div>
            <div className="pl-8 text-white">return res.status(200).json({`{ message: \`Hello \${name}\` }`});</div>
            <div className="pl-4 text-purple-400"></div>
            <div className="pl-4 text-white">res.status(200).json({`{ message: "Hello World" }`});</div>
            <div className="text-white"></div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Features</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <li className="bg-white dark:bg-white/5 p-4 rounded-xl border border-slate-200 dark:border-white/10 shadow-sm">
              <strong className="text-slate-900 dark:text-white block mb-1">Zero Config</strong>
              Automatic parsing of JSON bodies and query parameters.
            </li>
            <li className="bg-white dark:bg-white/5 p-4 rounded-xl border border-slate-200 dark:border-white/10 shadow-sm">
              <strong className="text-slate-900 dark:text-white block mb-1">Typescript Support</strong>
              Full type safety for Request and Response objects.
            </li>
            <li className="bg-white dark:bg-white/5 p-4 rounded-xl border border-slate-200 dark:border-white/10 shadow-sm">
              <strong className="text-slate-900 dark:text-white block mb-1">Middlewares</strong>
              Easily wrap handlers for Auth, CORS, or Logging.
            </li>
            <li className="bg-white dark:bg-white/5 p-4 rounded-xl border border-slate-200 dark:border-white/10 shadow-sm">
              <strong className="text-slate-900 dark:text-white block mb-1">Database Ready</strong>
              Connect to Prisma, Mongoose, or generic SQL drivers directly.
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
