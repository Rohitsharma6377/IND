import React from "react";

export default function Footer() {
    return (
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
    );
}
