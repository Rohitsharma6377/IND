import React, { useState } from 'react';
import { Link } from 'indjs';

// SVG Icon Components
const BookIcon = ({ className = "w-6 h-6" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
);

const RocketIcon = ({ className = "w-6 h-6" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
        <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
        <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
        <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
);

const LayersIcon = ({ className = "w-6 h-6" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 2 7 12 12 22 7 12 2" />
        <polyline points="2 17 12 22 22 17" />
        <polyline points="2 12 12 17 22 12" />
    </svg>
);

const ZapIcon = ({ className = "w-6 h-6" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
);

const CloudIcon = ({ className = "w-6 h-6" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
    </svg>
);

const SearchIcon = ({ className = "w-5 h-5" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
);

const CopyIcon = ({ className = "w-4 h-4" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
);

const CheckIcon = ({ className = "w-4 h-4" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
    </svg>
);

const ArrowRightIcon = ({ className = "w-4 h-4" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="5" y1="12" x2="19" y2="12" />
        <polyline points="12 5 19 12 12 19" />
    </svg>
);

const GithubIcon = ({ className = "w-6 h-6" }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
    </svg>
);

const LightbulbIcon = ({ className = "w-6 h-6" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
        <path d="M9 18h6" />
        <path d="M10 22h4" />
    </svg>
);

const UsersIcon = ({ className = "w-6 h-6" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
);

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
            icon: RocketIcon,
            color: "from-blue-500 to-indigo-600",
            topics: ["Installation", "Project Structure", "First Page", "Routing Basics"]
        },
        {
            title: "Core Concepts",
            description: "Understand the fundamental concepts of INDJS",
            icon: LayersIcon,
            color: "from-purple-500 to-pink-600",
            topics: ["File-Based Routing", "API Routes", "Data Fetching", "Middleware"]
        },
        {
            title: "Features",
            description: "Explore all the powerful features INDJS offers",
            icon: ZapIcon,
            color: "from-amber-500 to-orange-600",
            topics: ["Authentication", "Database", "SSR", "Static Export"]
        },
        {
            title: "Deployment",
            description: "Deploy your INDJS app to production",
            icon: CloudIcon,
            color: "from-green-500 to-teal-600",
            topics: ["Vercel", "Cloudflare", "Docker", "Custom Server"]
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white py-20">
                <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]"></div>
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-300/20 rounded-full blur-3xl"></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6 border border-white/20">
                            <BookIcon className="w-5 h-5 mr-2" />
                            <span className="text-sm font-semibold">Documentation</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black mb-6">
                            Learn INDJS
                        </h1>
                        <p className="text-xl text-indigo-100 max-w-3xl mx-auto mb-8">
                            Everything you need to know to build amazing applications with INDJS
                        </p>
                        <div className="flex justify-center">
                            <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-3 rounded-xl border border-white/20">
                                <input
                                    type="text"
                                    placeholder="Search documentation..."
                                    className="bg-transparent border-none outline-none text-white placeholder-indigo-200 w-64"
                                />
                                <SearchIcon className="w-5 h-5 text-indigo-200" />
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
                                                className="flex items-center gap-1 text-gray-400 hover:text-white transition-colors"
                                            >
                                                {copiedCommand === 'cmd1' ? <><CheckIcon className="w-4 h-4 text-green-400" /> Copied!</> : <><CopyIcon className="w-4 h-4" /> Copy</>}
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
                                                className="flex items-center gap-1 text-gray-400 hover:text-white transition-colors"
                                            >
                                                {copiedCommand === 'cmd2' ? <><CheckIcon className="w-4 h-4 text-green-400" /> Copied!</> : <><CopyIcon className="w-4 h-4" /> Copy</>}
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
                                                className="flex items-center gap-1 text-gray-400 hover:text-white transition-colors"
                                            >
                                                {copiedCommand === 'cmd3' ? <><CheckIcon className="w-4 h-4 text-green-400" /> Copied!</> : <><CopyIcon className="w-4 h-4" /> Copy</>}
                                            </button>
                                        </div>
                                        <div className="text-green-400">
                                            <span className="text-gray-500">$</span> npm run dev
                                        </div>
                                    </div>
                                    <p className="text-gray-600 mt-4 flex items-center gap-2">
                                        Open <span className="font-mono bg-gray-100 px-2 py-1 rounded">http://localhost:3000</span> in your browser
                                        <span className="text-green-500"><CheckIcon className="w-5 h-5" /></span>
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
                                    <div className={`w-14 h-14 bg-gradient-to-br ${section.color} rounded-2xl flex items-center justify-center text-white mb-4 shadow-lg`}>
                                    <section.icon className="w-7 h-7" />
                                </div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{section.title}</h3>
                                    <p className="text-gray-600 mb-6">{section.description}</p>
                                    <ul className="space-y-2">
                                        {section.topics.map((topic, topicIdx) => (
                                            <li key={topicIdx} className="flex items-center text-gray-700">
                                                <ArrowRightIcon className="w-4 h-4 text-indigo-600 mr-2" />
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
                                <h1 className="text-4xl font-bold text-gray-900">Hello, World!</h1>
                            </div>
                            <div className="mt-6 p-4 bg-green-50 border-l-4 border-green-500 rounded flex items-center gap-2">
                                <CheckIcon className="w-5 h-5 text-green-600" />
                                <p className="text-green-800 font-semibold">That's it! No routing configuration needed.</p>
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
                            <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-4">
                                <GithubIcon className="w-7 h-7" />
                            </div>
                            <h3 className="text-2xl font-bold mb-3">GitHub Repository</h3>
                            <p className="text-gray-300">View source code, report issues, and contribute</p>
                        </a>

                        <Link href="/examples">
                            <div className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-xl p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer">
                                <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-4">
                                <LightbulbIcon className="w-7 h-7" />
                            </div>
                                <h3 className="text-2xl font-bold mb-3">Examples</h3>
                                <p className="text-indigo-100">Explore real-world examples and templates</p>
                            </div>
                        </Link>

                        <div className="bg-gradient-to-br from-green-500 to-teal-600 text-white rounded-xl p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer">
                            <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-4">
                                <UsersIcon className="w-7 h-7" />
                            </div>
                            <h3 className="text-2xl font-bold mb-3">Community</h3>
                            <p className="text-green-100">Join discussions and get help from the community</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
