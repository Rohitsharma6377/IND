import React, { useState, useEffect } from 'react';

export default function Layout({ children }) {
    const [darkMode, setDarkMode] = useState(true);

    useEffect(() => {
        // Check local storage or system preference
        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            setDarkMode(true);
            document.documentElement.classList.add('dark');
        } else {
            setDarkMode(false);
            document.documentElement.classList.remove('dark');
        }
    }, []);

    const toggleTheme = () => {
        if (darkMode) {
            document.documentElement.classList.remove('dark');
            localStorage.theme = 'light';
            setDarkMode(false);
        } else {
            document.documentElement.classList.add('dark');
            localStorage.theme = 'dark';
            setDarkMode(true);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#030712] text-slate-900 dark:text-white selection:bg-indigo-500 selection:text-white overflow-x-hidden font-sans antialiased transition-colors duration-300">
            {/* Navbar */}
            <nav className="fixed top-0 left-0 right-0 z-50 border-b border-slate-200 dark:border-white/5 bg-white/80 dark:bg-[#030712]/80 backdrop-blur-xl transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <a href="/" className="flex items-center gap-2 group">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg group-hover:scale-105 transition-transform shadow-lg shadow-indigo-500/20">
                            I
                        </div>
                        <span className="font-bold text-lg tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-white/70">
                            INDJS
                        </span>
                    </a>

                    <div className="hidden md:flex items-center gap-8">
                        <a href="/docs" className="text-sm font-medium text-slate-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-white transition-colors">Documentation</a>
                        <a href="/learn" className="text-sm font-medium text-slate-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-white transition-colors">Learn</a>
                        <a href="/showcase" className="text-sm font-medium text-slate-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-white transition-colors">Showcase</a>
                        <a href="/blog" className="text-sm font-medium text-slate-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-white transition-colors">Blog</a>
                    </div>

                    <div className="flex items-center gap-4">
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full text-slate-600 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
                            aria-label="Toggle Theme"
                        >
                            {darkMode ? (
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                            ) : (
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                </svg>
                            )}
                        </button>

                        <a
                            href="https://github.com/Rohitsharma6377/IND"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hidden sm:flex items-center gap-2 text-slate-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-white transition-colors"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                            </svg>
                        </a>
                        <a
                            href="/docs/installation"
                            className="text-xs font-semibold bg-slate-900 dark:bg-white text-white dark:text-black px-4 py-2 rounded-full hover:bg-slate-700 dark:hover:bg-zinc-200 transition-colors shadow-lg shadow-indigo-500/20"
                        >
                            Get Started
                        </a>
                    </div>
                </div>
            </nav>

            <main className="pt-16 min-h-screen">
                {children}
            </main>

            {/* Footer */}
            <footer className="border-t border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-[#030712] mt-32 transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-6 py-12">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
                        <div>
                            <h3 className="font-bold text-slate-900 dark:text-white mb-4">Framework</h3>
                            <ul className="space-y-2 text-sm text-slate-600 dark:text-zinc-400">
                                <li><a href="/docs" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Documentation</a></li>
                                <li><a href="/learn" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Guides</a></li>
                                <li><a href="/docs/api-routes" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">API Reference</a></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-bold text-slate-900 dark:text-white mb-4">Resources</h3>
                            <ul className="space-y-2 text-sm text-slate-600 dark:text-zinc-400">
                                <li><a href="https://github.com/Rohitsharma6377/IND" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">GitHub</a></li>
                                <li><a href="/showcase" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Showcase</a></li>
                                <li><a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Roadmap</a></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-bold text-slate-900 dark:text-white mb-4">Community</h3>
                            <ul className="space-y-2 text-sm text-slate-600 dark:text-zinc-400">
                                <li><a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Discord</a></li>
                                <li><a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Twitter</a></li>
                                <li><a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Contributing</a></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-bold text-slate-900 dark:text-white mb-4">Legal</h3>
                            <ul className="space-y-2 text-sm text-slate-600 dark:text-zinc-400">
                                <li><a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Privacy</a></li>
                                <li><a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Terms</a></li>
                                <li><a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">License</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="flex items-center justify-between pt-8 border-t border-slate-200 dark:border-white/5">
                        <p className="text-slate-500 dark:text-zinc-500 text-sm">© {new Date().getFullYear()} INDJS Framework. All rights reserved.</p>
                        <div className="text-slate-500 dark:text-zinc-500 text-sm">
                            Universal React Framework
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
