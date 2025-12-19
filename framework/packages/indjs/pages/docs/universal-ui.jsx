import React from "react";

export default function UniversalUI() {
    return (
        <div className="max-w-4xl mx-auto px-6 py-24 text-slate-600 dark:text-zinc-300">
            <div className="mb-12">
                <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Universal UI</h1>
                <p className="text-xl text-slate-600 dark:text-zinc-400">Components that render natively on every platform.</p>
            </div>

            <div className="prose prose-invert max-w-none">
                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Philosophy</h2>
                    <p className="mb-4">
                        To achieve true "Write Once, Run Everywhere", INDJS provides a set of primitives
                        that abstract the underlying platform differences.
                    </p>
                    <p className="mb-4">
                        On the Web, <code className="text-indigo-600 dark:text-indigo-400">&lt;View /&gt;</code> renders as a <code className="text-slate-500 dark:text-zinc-500">&lt;div&gt;</code>.<br />
                        On Native (if using RN rendering), it renders as a native <code className="text-slate-500 dark:text-zinc-500">&lt;View&gt;</code>.
                    </p>
                </section>

                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Core Components</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-white dark:bg-white/5 rounded-xl border border-slate-200 dark:border-white/10 shadow-sm">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">&lt;Screen&gt;</h3>
                            <p className="text-sm">Full-height container that handles safe areas on mobile devices automatically.</p>
                        </div>
                        <div className="p-4 bg-white dark:bg-white/5 rounded-xl border border-slate-200 dark:border-white/10 shadow-sm">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">&lt;Text&gt;</h3>
                            <p className="text-sm">Universal text component with consistent typography handling.</p>
                        </div>
                        <div className="p-4 bg-white dark:bg-white/5 rounded-xl border border-slate-200 dark:border-white/10 shadow-sm">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">&lt;Stack&gt;</h3>
                            <p className="text-sm">Flexbox container for vertical or horizontal layouts with easy gap control.</p>
                        </div>
                        <div className="p-4 bg-white dark:bg-white/5 rounded-xl border border-slate-200 dark:border-white/10 shadow-sm">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">&lt;Image&gt;</h3>
                            <p className="text-sm">Optimized image component that handles local assets and remote URLs.</p>
                        </div>
                    </div>
                </section>

                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Usage</h2>
                    <div className="bg-slate-900 dark:bg-black/50 border border-slate-200 dark:border-white/10 rounded-xl p-4 font-mono text-sm overflow-x-auto shadow-sm">
                        <div className="text-purple-400">import <span className="text-white">{`{ Screen, Stack, Text, Button }`}</span> from <span className="text-green-400">'indjs'</span>;</div>
                        <br />
                        <div className="text-blue-400">export default <span className="text-purple-400">function</span> <span className="text-yellow-300">App</span>() {`{`}</div>
                        <div className="pl-4 text-purple-400">return (</div>
                        <div className="pl-8 text-white"><span className="text-blue-400">&lt;Screen&gt;</span></div>
                        <div className="pl-12 text-white"><span className="text-blue-400">&lt;Stack</span> <span className="text-purple-300">spacing</span>=<span className="text-green-400">{4}</span> <span className="text-purple-300">align</span>=<span className="text-green-400">"center"</span><span className="text-blue-400">&gt;</span></div>
                        <div className="pl-16 text-white"><span className="text-blue-400">&lt;Text</span> <span className="text-purple-300">className</span>=<span className="text-green-400">"text-xl"</span><span className="text-blue-400">&gt;</span>Welcome<span className="text-blue-400">&lt;/Text&gt;</span></div>
                        <div className="pl-16 text-white"><span className="text-blue-400">&lt;Button</span> <span className="text-purple-300">onPress</span>=<span className="text-white">{`{handlePress}`}</span><span className="text-blue-400">&gt;</span>First Component<span className="text-blue-400">&lt;/Button&gt;</span></div>
                        <div className="pl-12 text-white"><span className="text-blue-400">&lt;/Stack&gt;</span></div>
                        <div className="pl-8 text-white"><span className="text-blue-400">&lt;/Screen&gt;</span></div>
                        <div className="pl-4 text-purple-400">);</div>
                        <div className="text-white"></div>
                    </div>
                </section>
            </div>
        </div>
    );
}
