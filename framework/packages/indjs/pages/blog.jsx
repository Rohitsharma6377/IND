import React from "react";

export default function Blog() {
    return (
        <div className="max-w-4xl mx-auto px-6 py-24 text-zinc-300">
            <div className="text-center mb-16">
                <h1 className="text-4xl font-bold text-white mb-4">INDJS Blog</h1>
                <p className="text-xl text-zinc-400">Latest news, updates, and tutorials.</p>
            </div>

            <div className="grid gap-8">
                <article className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-colors">
                    <div className="flex items-center gap-4 text-sm text-zinc-500 mb-4">
                        <span className="text-indigo-400 font-bold">Release</span>
                        <span>•</span>
                        <span>Dec 19, 2025</span>
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-4">Announcing INDJS v3.0</h2>
                    <p className="text-zinc-400 mb-6">
                        We are thrilled to announce the release of INDJS v3.0, bringing true universal development to the React ecosystem.
                        Build for Web, Electron, and Mobile with a single codebase.
                    </p>
                    <a href="/docs" className="text-indigo-400 font-medium hover:text-indigo-300">Read the announcement →</a>
                </article>

                <article className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-colors">
                    <div className="flex items-center gap-4 text-sm text-zinc-500 mb-4">
                        <span className="text-green-400 font-bold">Tutorial</span>
                        <span>•</span>
                        <span>Nov 10, 2025</span>
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-4">Building a Crypto App with INDJS</h2>
                    <p className="text-zinc-400 mb-6">
                        Learn how to fetch real-time data using API routes and display it on both iOS and Android using our universal UI components.
                    </p>
                    <a href="/learn" className="text-indigo-400 font-medium hover:text-indigo-300">Start the tutorial →</a>
                </article>
            </div>
        </div>
    );
}
