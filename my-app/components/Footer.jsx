import React from 'react';
import { Link } from 'indjs';

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="col-span-1 sm:col-span-2 lg:col-span-1">
                        <div className="flex items-center mb-4">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center mr-2 sm:mr-3">
                                <span className="text-white font-bold text-lg sm:text-xl">I</span>
                            </div>
                            <span className="text-xl sm:text-2xl font-bold">INDJS</span>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            The modern React framework for building blazing-fast web applications.
                        </p>
                    </div>

                    {/* Links - Product */}
                    <div>
                        <h4 className="font-bold mb-3 sm:mb-4 text-base sm:text-lg">Product</h4>
                        <div className="space-y-2 text-gray-400 text-sm sm:text-base">
                            <Link href="/features">
                                <div className="hover:text-white cursor-pointer transition-colors">Features</div>
                            </Link>
                            <Link href="/docs">
                                <div className="hover:text-white cursor-pointer transition-colors">Documentation</div>
                            </Link>
                            <Link href="/examples">
                                <div className="hover:text-white cursor-pointer transition-colors">Examples</div>
                            </Link>
                        </div>
                    </div>

                    {/* Links - Company */}
                    <div>
                        <h4 className="font-bold mb-3 sm:mb-4 text-base sm:text-lg">Company</h4>
                        <div className="space-y-2 text-gray-400 text-sm sm:text-base">
                            <Link href="/about">
                                <div className="hover:text-white cursor-pointer transition-colors">About</div>
                            </Link>
                            <a
                                href="https://github.com/Rohitsharma6377/IND"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block hover:text-white transition-colors"
                            >
                                GitHub
                            </a>
                        </div>
                    </div>

                    {/* Links - Community */}
                    <div>
                        <h4 className="font-bold mb-3 sm:mb-4 text-base sm:text-lg">Community</h4>
                        <div className="space-y-2 text-gray-400 text-sm sm:text-base">
                            <a
                                href="https://github.com/Rohitsharma6377/IND/discussions"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block hover:text-white transition-colors"
                            >
                                Discussions
                            </a>
                            <a
                                href="https://github.com/Rohitsharma6377/IND/issues"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block hover:text-white transition-colors"
                            >
                                Issues
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-8 sm:mt-12 pt-6 sm:pt-8 text-center text-gray-400 text-xs sm:text-sm">
                    <p>© 2024 INDJS. Built with ❤️ by the INDJS Team.</p>
                </div>
            </div>
        </footer>
    );
}
