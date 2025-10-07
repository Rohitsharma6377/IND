import React from 'react';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-blue-50">
      <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-indigo-200 blur-3xl opacity-40 animate-fade-in" />
      <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-blue-200 blur-3xl opacity-40 animate-fade-in [animation-delay:150ms]" />

      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900 animate-fade-in-up">
          Build faster with <span className="text-indigo-600">INDJS</span>
        </h1>
        <p className="mt-6 text-xl text-gray-600 max-w-2xl mx-auto animate-fade-in-up [animation-delay:120ms]">
          A modern full‑stack React framework with file‑based routing, SSR/SSG, API routes, Tailwind, and Vite‑powered HMR.
        </p>
        <div className="mt-10 flex items-center justify-center gap-4 animate-fade-in-up [animation-delay:200ms]">
          <a href="/about" className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors">
            Learn More
          </a>
          <a href="/api/hello" className="inline-block bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors">
            Test API
          </a>
        </div>
      </div>
    </section>
  );
}
