import React from 'react';

export default function Layout({ children }) {
    return (
        <div className="min-h-screen bg-[#030712] text-white selection:bg-indigo-500 selection:text-white overflow-x-hidden font-sans antialiased">
            {/* Navbar */}
            <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-[#030712]/80 backdrop-blur-xl">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <a href="/" className="flex items-center gap-2 group">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg group-hover:scale-105 transition-transform shadow-lg shadow-indigo-500/20">
                            I
                        </div>
                        <span className="font-bold text-lg tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
                            INDJS
                        </span>
                    </a>

                    <div className="hidden md:flex items-center gap-8">
                        <a href="/docs" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">Documentation</a>
                        <a href="/learn" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">Learn</a>
                        <a href="/blog" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">Blog</a>
                    </div>

                    <div className="flex items-center gap-4">
                        <a
                            href="https://github.com/Rohitsharma6377/IND"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hidden sm:flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                            </svg>
                        </a>
                        <a
                            href="/docs/installation"
                            className="text-xs font-semibold bg-white text-black px-4 py-2 rounded-full hover:bg-zinc-200 transition-colors"
                        >
                            Get Started
                        </a>
                    </div>
                </div>
            </nav>

            <main className="pt-16">
                {children}
            </main>

            {/* Footer */}
            <footer className="border-t border-white/5 bg-[#030712] mt-32">
                <div className="max-w-7xl mx-auto px-6 py-12">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
                        <div>
                            <h3 className="font-bold text-white mb-4">Framework</h3>
                            <ul className="space-y-2 text-sm text-zinc-400">
                                <li><a href="/docs" className="hover:text-indigo-400 transition-colors">Documentation</a></li>
                                <li><a href="/learn" className="hover:text-indigo-400 transition-colors">Guides</a></li>
                                <li><a href="/docs/api-routes" className="hover:text-indigo-400 transition-colors">API Reference</a></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-bold text-white mb-4">Resources</h3>
                            <ul className="space-y-2 text-sm text-zinc-400">
                                <li><a href="https://github.com/Rohitsharma6377/IND" className="hover:text-indigo-400 transition-colors">GitHub</a></li>
                                <li><a href="#" className="hover:text-indigo-400 transition-colors">Examples</a></li>
                                <li><a href="#" className="hover:text-indigo-400 transition-colors">Showcase</a></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-bold text-white mb-4">Community</h3>
                            <ul className="space-y-2 text-sm text-zinc-400">
                                <li><a href="#" className="hover:text-indigo-400 transition-colors">Discord</a></li>
                                <li><a href="#" className="hover:text-indigo-400 transition-colors">Twitter</a></li>
                                <li><a href="#" className="hover:text-indigo-400 transition-colors">Contributing</a></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-bold text-white mb-4">Legal</h3>
                            <ul className="space-y-2 text-sm text-zinc-400">
                                <li><a href="#" className="hover:text-indigo-400 transition-colors">Privacy</a></li>
                                <li><a href="#" className="hover:text-indigo-400 transition-colors">Terms</a></li>
                                <li><a href="#" className="hover:text-indigo-400 transition-colors">License</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="flex items-center justify-between pt-8 border-t border-white/5">
                        <p className="text-zinc-500 text-sm">© {new Date().getFullYear()} INDJS Framework. All rights reserved.</p>
                        <div className="text-zinc-500 text-sm">
                            Universal React Framework
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
