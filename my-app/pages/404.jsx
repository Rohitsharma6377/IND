import React from 'react';
import { Link } from 'indjs';

export default function NotFound() {
  return (
    <div className="min-h-screen animated-gradient flex items-center justify-center relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/30 rounded-full blur-[100px]"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500/30 rounded-full blur-[120px]"></div>
      
      <div className="relative text-center px-4">
        {/* 404 Number */}
        <div className="relative">
          <h1 className="text-[150px] sm:text-[200px] md:text-[250px] font-black text-white/10 leading-none select-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-6xl sm:text-7xl md:text-8xl">🚀</span>
          </div>
        </div>
        
        {/* Message */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 -mt-8">
          Page Not Found
        </h2>
        <p className="text-lg sm:text-xl text-white/70 mb-8 max-w-md mx-auto">
          Oops! Looks like you've ventured into uncharted territory. Let's get you back on track.
        </p>
        
        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <button className="group w-full sm:w-auto px-8 py-4 bg-white text-gray-900 font-bold rounded-2xl hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-2xl flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Go Home
            </button>
          </Link>
          <Link href="/docs">
            <button className="w-full sm:w-auto px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white font-bold rounded-2xl hover:bg-white/20 transition-all duration-300 flex items-center justify-center gap-2">
              View Documentation
            </button>
          </Link>
        </div>
        
        {/* Helpful Links */}
        <div className="mt-12 flex flex-wrap gap-4 justify-center text-white/60 text-sm">
          <Link href="/features">
            <span className="hover:text-white transition-colors cursor-pointer">Features</span>
          </Link>
          <span>•</span>
          <Link href="/examples">
            <span className="hover:text-white transition-colors cursor-pointer">Examples</span>
          </Link>
          <span>•</span>
          <Link href="/about">
            <span className="hover:text-white transition-colors cursor-pointer">About</span>
          </Link>
          <span>•</span>
          <a 
            href="https://github.com/Rohitsharma6377/IND" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            GitHub
          </a>
        </div>
      </div>
    </div>
  );
}
