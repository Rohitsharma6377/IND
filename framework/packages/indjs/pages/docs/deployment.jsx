import React from "react";

export default function Deployment() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-24 text-slate-600 dark:text-zinc-300">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Deployment</h1>
        <p className="text-xl text-slate-600 dark:text-zinc-400">Ship your app to the world via Web, App Store, and Play Store.</p>
      </div>

      <div className="prose prose-invert max-w-none">
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Web Deployment</h2>
          <p className="mb-4">INDJS produces a static output that can be hosted anywhere.</p>
          <div className="flex gap-4 mb-6">
            <div className="bg-slate-900 dark:bg-black px-4 py-2 rounded-lg border border-slate-200 dark:border-white/10 flex items-center gap-2 shadow-sm">
              <div className="w-3 h-3 rounded-full bg-white"></div> <span className="text-white">Vercel</span>
            </div>
            <div className="bg-slate-900 dark:bg-black px-4 py-2 rounded-lg border border-slate-200 dark:border-white/10 flex items-center gap-2 shadow-sm">
              <div className="w-3 h-3 rounded-full bg-teal-400"></div> <span className="text-white">Netlify</span>
            </div>
            <div className="bg-slate-900 dark:bg-black px-4 py-2 rounded-lg border border-slate-200 dark:border-white/10 flex items-center gap-2 shadow-sm">
              <div className="w-3 h-3 rounded-full bg-orange-400"></div> <span className="text-white">AWS S3</span>
            </div>
          </div>
          <p className="text-sm bg-slate-100 dark:bg-white/5 p-4 rounded-lg">
            Output Directory: <code className="text-indigo-600 dark:text-indigo-400">.indjs/static</code>
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Mobile Deployment</h2>
          <p className="mb-4">
            Use Capacitor to bundle your web assets into native binaries.
          </p>

          <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-6 mb-2">Android (Play Store)</h3>
          <div className="bg-slate-900 dark:bg-black/50 border border-slate-200 dark:border-white/10 rounded-xl p-4 font-mono text-sm mb-4 text-white shadow-sm">
            npm run mobile:build
            <br />
            npx cap open android
          </div>
          <p className="text-sm mb-6">Opens Android Studio. From 'Build' menu, select 'Generate Signed Bundle / APK'.</p>

          <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-6 mb-2">iOS (App Store)</h3>
          <div className="bg-slate-900 dark:bg-black/50 border border-slate-200 dark:border-white/10 rounded-xl p-4 font-mono text-sm mb-4 text-white shadow-sm">
            npm run mobile:build
            <br />
            npx cap open ios
          </div>
          <p className="text-sm">Opens Xcode. Select your Team and 'Archive' project for upload to TestFlight.</p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Desktop Deployment</h2>
          <p className="mb-4">
            Package your app for Windows (.exe), macOS (.dmg), and Linux (.AppImage).
          </p>
          <div className="bg-slate-900 dark:bg-black/50 border border-slate-200 dark:border-white/10 rounded-xl p-4 font-mono text-sm text-white shadow-sm">
            npm run desktop:build
          </div>
          <p className="mt-4 text-sm">
            Artifacts will be available in the <code className="text-indigo-600 dark:text-indigo-400">dist-electron/</code> folder.
          </p>
        </section>
      </div>
    </div>
  );
}
