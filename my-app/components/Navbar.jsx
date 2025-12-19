import React, { useState } from 'react';
import { Link } from 'indjs';

export default function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link href="/">
                        <div className="flex items-center cursor-pointer group">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center mr-2 sm:mr-3 group-hover:scale-110 transition-transform">
                                <span className="text-white font-bold text-lg sm:text-xl">I</span>
                            </div>
                            <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                INDJS
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
                        <Link href="/features">
                            <span className="text-gray-700 hover:text-indigo-600 font-medium cursor-pointer transition-colors text-sm lg:text-base">
                                Features
                            </span>
                        </Link>
                        <Link href="/docs">
                            <span className="text-gray-700 hover:text-indigo-600 font-medium cursor-pointer transition-colors text-sm lg:text-base">
                                Docs
                            </span>
                        </Link>
                        <Link href="/examples">
                            <span className="text-gray-700 hover:text-indigo-600 font-medium cursor-pointer transition-colors text-sm lg:text-base">
                                Examples
                            </span>
                        </Link>
                        <Link href="/about">
                            <span className="text-gray-700 hover:text-indigo-600 font-medium cursor-pointer transition-colors text-sm lg:text-base">
                                About
                            </span>
                        </Link>
                        <a
                            href="https://github.com/Rohitsharma6377/IND"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-3 py-2 lg:px-4 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm lg:text-base"
                        >
                            <svg className="w-4 h-4 lg:w-5 lg:h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                            </svg>
                            <span className="hidden lg:inline">GitHub</span>
                        </a>
                    </div>

                    {/* Mobile menu button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                        aria-label="Toggle menu"
                    >
                        <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {mobileMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Mobile Navigation */}
                {mobileMenuOpen && (
                    <div className="md:hidden py-4 border-t border-gray-200 bg-white">
                        <div className="flex flex-col space-y-3">
                            <Link href="/features">
                                <span className="block text-gray-700 hover:text-indigo-600 font-medium cursor-pointer py-2 px-2 rounded hover:bg-gray-50 transition-colors">
                                    Features
                                </span>
                            </Link>
                            <Link href="/docs">
                                <span className="block text-gray-700 hover:text-indigo-600 font-medium cursor-pointer py-2 px-2 rounded hover:bg-gray-50 transition-colors">
                                    Docs
                                </span>
                            </Link>
                            <Link href="/examples">
                                <span className="block text-gray-700 hover:text-indigo-600 font-medium cursor-pointer py-2 px-2 rounded hover:bg-gray-50 transition-colors">
                                    Examples
                                </span>
                            </Link>
                            <Link href="/about">
                                <span className="block text-gray-700 hover:text-indigo-600 font-medium cursor-pointer py-2 px-2 rounded hover:bg-gray-50 transition-colors">
                                    About
                                </span>
                            </Link>
                            <a
                                href="https://github.com/Rohitsharma6377/IND"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-gray-700 hover:text-indigo-600 font-medium py-2 px-2 rounded hover:bg-gray-50 transition-colors"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                                </svg>
                                GitHub
                            </a>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}
