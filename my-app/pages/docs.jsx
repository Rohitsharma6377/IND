import React, { useState } from 'react';
import { Link } from 'indjs';

export default function Docs() {
    const [copiedCommand, setCopiedCommand] = useState('');

    const copyToClipboard = (text, id) => {
        navigator.clipboard.writeText(text);
        setCopiedCommand(id);
        setTimeout(() => setCopiedCommand(''), 2000);
    };

    const quickLinks = [
        {
            title: "Getting Started",
            description: "Learn the basics and create your first INDJS app",
            icon: "🚀",
            color: "from-blue-500 to-indigo-600",
            topics: ["Installation", "Project Structure", "First Page", "Routing Basics"]
        },
        {
            title: "Core Concepts",
            description: "Understand the fundamental concepts of INDJS",
            icon: "📚",
            color: "from-purple-500 to-pink-600",
            topics: ["File-Based Routing", "API Routes", "Data Fetching", "Middleware"]
        },
        {
            title: "Features",
            description: "Explore all the powerful features INDJS offers",
            icon: "⚡",
            color: "from-yellow-500 to-orange-600",
            topics: ["Authentication", "Database", "SSR", "Static Export"]
        },
        {
            title: "Deployment",
            description: "Deploy your INDJS app to production",
            icon: "☁️",
            color: "from-green-500 to-teal-600",
            topics: ["Vercel", "Cloudflare", "Docker", "Custom Server"]
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white py-20">
                <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]"></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6">
                            <span className="text-2xl mr-2">📖</span>
                            <span className="text-sm font-semibold">Documentation</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black mb-6">
                            Learn INDJS
                        </h1>
                        <p className="text-xl text-indigo-100 max-w-3xl mx-auto mb-8">
                            Everything you need to know to build amazing applications with INDJS
                        </p>
                        <div className="flex justify-center">
                            <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                                <input
                                    type="text"
                                    placeholder="Search documentation..."
                                    className="bg-transparent border-none outline-none text-white placeholder-indigo-200 w-64"
                                />
                                <span className="text-indigo-200">🔍</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Quick Start */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
                        <h2 className="text-4xl font-bold text-gray-900 mb-8">Quick Start</h2>

                        <div className="space-y-8">
                            {/* Step 1 */}
                            <div className="flex gap-6">
                                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                                    1
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-3">Install INDJS</h3>
                                    <p className="text-gray-600 mb-4">Create a new INDJS project with a single command:</p>
                                    <div className="bg-gray-900 rounded-xl p-4 font-mono text-sm">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-gray-400">Terminal</span>
                                            <button
                                                onClick={() => copyToClipboard('npx indjs@latest create my-app', 'cmd1')}
                                                className="text-gray-400 hover:text-white transition-colors"
                                            >
                                                {copiedCommand === 'cmd1' ? '✅ Copied!' : '📋 Copy'}
                                            </button>
                                        </div>
                                        <div className="text-green-400">
                                            <span className="text-gray-500">$</span> npx indjs@latest create my-app
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Step 2 */}
                            <div className="flex gap-6">
                                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                                    2
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-3">Navigate to Your Project</h3>
                                    <div className="bg-gray-900 rounded-xl p-4 font-mono text-sm">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-gray-400">Terminal</span>
                                            <button
                                                onClick={() => copyToClipboard('cd my-app', 'cmd2')}
                                                className="text-gray-400 hover:text-white transition-colors"
                                            >
                                                {copiedCommand === 'cmd2' ? '✅ Copied!' : '📋 Copy'}
                                            </button>
                                        </div>
                                        <div className="text-green-400">
                                            <span className="text-gray-500">$</span> cd my-app
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Step 3 */}
                            <div className="flex gap-6">
                                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-pink-500 to-red-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                                    3
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-3">Start Development Server</h3>
                                    <div className="bg-gray-900 rounded-xl p-4 font-mono text-sm">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-gray-400">Terminal</span>
                                            <button
                                                onClick={() => copyToClipboard('npm run dev', 'cmd3')}
                                                className="text-gray-400 hover:text-white transition-colors"
                                            >
                                                {copiedCommand === 'cmd3' ? '✅ Copied!' : '📋 Copy'}
                                            </button>
                                        </div>
                                        <div className="text-green-400">
                                            <span className="text-gray-500">$</span> npm run dev
                                        </div>
                                    </div>
                                    <p className="text-gray-600 mt-4">
                                        Open <span className="font-mono bg-gray-100 px-2 py-1 rounded">http://localhost:3000</span> in your browser 🎉
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Documentation Sections */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Documentation Sections</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {quickLinks.map((section, idx) => (
                            <div
                                key={idx}
                                className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-gray-100"
                            >
                                <div className={`h-2 bg-gradient-to-r ${section.color}`}></div>
                                <div className="p-8">
                                    <div className="text-5xl mb-4">{section.icon}</div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{section.title}</h3>
                                    <p className="text-gray-600 mb-6">{section.description}</p>
                                    <ul className="space-y-2">
                                        {section.topics.map((topic, topicIdx) => (
                                            <li key={topicIdx} className="flex items-center text-gray-700">
                                                <span className="text-indigo-600 mr-2">→</span>
                                                {topic}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Code Example */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Your First Page</h2>
                        <p className="text-xl text-gray-600">Create a new page in seconds</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="bg-white rounded-xl p-8 shadow-lg">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">1. Create a File</h3>
                            <p className="text-gray-600 mb-4">
                                Create <span className="font-mono bg-gray-100 px-2 py-1 rounded">pages/hello.jsx</span>
                            </p>
                            <div className="bg-gray-900 rounded-xl p-6">
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                    <span className="ml-auto text-gray-400 text-sm">pages/hello.jsx</span>
                                </div>
                                <pre className="text-sm text-gray-300 overflow-x-auto">
                                    <code>{`import React from 'react';

export default function Hello() {
  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold">
        Hello, World! 👋
      </h1>
    </div>
  );
}`}</code>
                                </pre>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl p-8 shadow-lg">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">2. Access Your Page</h3>
                            <p className="text-gray-600 mb-4">
                                Visit <span className="font-mono bg-gray-100 px-2 py-1 rounded">/hello</span> in your browser
                            </p>
                            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-8 border-2 border-indigo-200">
                                <h1 className="text-4xl font-bold text-gray-900">Hello, World! 👋</h1>
                            </div>
                            <div className="mt-6 p-4 bg-green-50 border-l-4 border-green-500 rounded">
                                <p className="text-green-800 font-semibold">✅ That's it! No routing configuration needed.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Resources */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Additional Resources</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <a
                            href="https://github.com/Rohitsharma6377/IND"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-xl p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                        >
                            <div className="text-4xl mb-4">📚</div>
                            <h3 className="text-2xl font-bold mb-3">GitHub Repository</h3>
                            <p className="text-gray-300">View source code, report issues, and contribute</p>
                        </a>

                        <Link href="/examples">
                            <div className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-xl p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer">
                                <div className="text-4xl mb-4">💡</div>
                                <h3 className="text-2xl font-bold mb-3">Examples</h3>
                                <p className="text-indigo-100">Explore real-world examples and templates</p>
                            </div>
                        </Link>

                        <div className="bg-gradient-to-br from-green-500 to-teal-600 text-white rounded-xl p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer">
                            <div className="text-4xl mb-4">💬</div>
                            <h3 className="text-2xl font-bold mb-3">Community</h3>
                            <p className="text-green-100">Join discussions and get help from the community</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
