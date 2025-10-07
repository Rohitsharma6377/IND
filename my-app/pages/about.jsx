import React from 'react';

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 animate-fade-in-up">About INDJS</h1>
        <div className="prose max-w-none animate-fade-in-up [animation-delay:120ms]">
          <p className="text-lg text-gray-600 mb-6">
            INDJS is a modern, fast, and lightweight full-stack React framework
            that provides everything you need to build production-ready web applications.
          </p>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Features</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            <li>File-based routing</li>
            <li>Server-side rendering (SSR)</li>
            <li>Static site generation (SSG)</li>
            <li>API routes</li>
            <li>Built-in TypeScript support</li>
            <li>Tailwind CSS integration</li>
            <li>Hot module replacement</li>
            <li>Image optimization</li>
          </ul>
        </div>
      </div>
    </div>
  );
}