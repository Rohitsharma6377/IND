import React from 'react';
import { Link } from 'indjs';

export default function About() {
    const team = [
        {
            name: "Rohit Sharma",
            role: "Creator & Lead Developer",
            avatar: "👨‍💻",
            bio: "Passionate about building tools that make developers' lives easier",
            github: "https://github.com/Rohitsharma6377"
        }
    ];

    const stats = [
        { label: "GitHub Stars", value: "1K+", icon: "⭐" },
        { label: "Downloads", value: "10K+", icon: "📥" },
        { label: "Contributors", value: "50+", icon: "👥" },
        { label: "Projects Built", value: "500+", icon: "🚀" }
    ];

    const timeline = [
        {
            year: "2024",
            title: "INDJS v3.0 Launch",
            description: "Major release with enhanced performance and new features",
            icon: "🎉"
        },
        {
            year: "2023",
            title: "Community Growth",
            description: "Reached 1,000+ GitHub stars and growing community",
            icon: "🌟"
        },
        {
            year: "2023",
            title: "First Stable Release",
            description: "INDJS v1.0 released to the public",
            icon: "🚀"
        },
        {
            year: "2022",
            title: "Project Started",
            description: "Initial development of INDJS framework began",
            icon: "💡"
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white py-24">
                <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]"></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6">
                        <span className="text-2xl mr-2">ℹ️</span>
                        <span className="text-sm font-semibold">About INDJS</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black mb-6">
                        Built for Developers,
                        <span className="block bg-gradient-to-r from-yellow-200 to-pink-200 bg-clip-text text-transparent">
                            By Developers
                        </span>
                    </h1>
                    <p className="text-xl text-indigo-100 max-w-3xl mx-auto">
                        INDJS is a modern React framework designed to make web development faster, easier, and more enjoyable.
                    </p>
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
                            <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                                We believe that building web applications should be fast, intuitive, and enjoyable. INDJS was created to eliminate the complexity and boilerplate that often slows down development.
                            </p>
                            <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                                Our goal is to provide developers with a powerful, batteries-included framework that handles the hard parts so you can focus on building amazing products.
                            </p>
                            <div className="flex gap-4">
                                <Link href="/docs">
                                    <button className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors">
                                        Get Started
                                    </button>
                                </Link>
                                <a
                                    href="https://github.com/Rohitsharma6377/IND"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors"
                                >
                                    View on GitHub
                                </a>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                            {stats.map((stat, idx) => (
                                <div
                                    key={idx}
                                    className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 text-center border-2 border-indigo-100 hover:border-indigo-300 transition-all duration-300 transform hover:-translate-y-2"
                                >
                                    <div className="text-4xl mb-3">{stat.icon}</div>
                                    <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                                    <div className="text-gray-600 font-medium">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Why INDJS */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Why INDJS?</h2>
                        <p className="text-xl text-gray-600">What makes us different</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: "⚡",
                                title: "Blazing Fast",
                                description: "Built on modern tooling like esbuild and Vite for instant feedback and lightning-fast builds",
                                color: "from-yellow-400 to-orange-500"
                            },
                            {
                                icon: "🎯",
                                title: "Zero Config",
                                description: "Sensible defaults that work out of the box. No configuration files to manage unless you need them",
                                color: "from-blue-400 to-indigo-500"
                            },
                            {
                                icon: "🛠️",
                                title: "Batteries Included",
                                description: "Authentication, database support, API routes, and more - all built-in and ready to use",
                                color: "from-purple-400 to-pink-500"
                            },
                            {
                                icon: "📦",
                                title: "Production Ready",
                                description: "Optimized builds, automatic code splitting, and deployment-ready output",
                                color: "from-green-400 to-teal-500"
                            },
                            {
                                icon: "💡",
                                title: "Developer First",
                                description: "Designed with developer experience in mind. Great docs, helpful errors, and intuitive APIs",
                                color: "from-red-400 to-rose-500"
                            },
                            {
                                icon: "🌍",
                                title: "Open Source",
                                description: "Free, open-source, and community-driven. Contribute, suggest features, or fork it",
                                color: "from-indigo-400 to-purple-500"
                            }
                        ].map((feature, idx) => (
                            <div
                                key={idx}
                                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                            >
                                <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center text-3xl mb-4 shadow-lg`}>
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Timeline */}
            <section className="py-20 bg-white">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Journey</h2>
                        <p className="text-xl text-gray-600">The story of INDJS</p>
                    </div>

                    <div className="relative">
                        {/* Timeline Line */}
                        <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-indigo-500 to-purple-500"></div>

                        {timeline.map((event, idx) => (
                            <div key={idx} className={`relative mb-12 ${idx % 2 === 0 ? 'text-right pr-1/2' : 'text-left pl-1/2'}`}>
                                <div className={`flex items-center ${idx % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`w-1/2 ${idx % 2 === 0 ? 'pr-12' : 'pl-12'}`}>
                                        <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border-2 border-gray-100">
                                            <div className="text-3xl mb-3">{event.icon}</div>
                                            <div className="text-sm font-bold text-indigo-600 mb-2">{event.year}</div>
                                            <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h3>
                                            <p className="text-gray-600">{event.description}</p>
                                        </div>
                                    </div>
                                </div>
                                {/* Timeline Dot */}
                                <div className="absolute left-1/2 top-6 transform -translate-x-1/2 w-6 h-6 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full border-4 border-white shadow-lg"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet the Team</h2>
                        <p className="text-xl text-gray-600">The people behind INDJS</p>
                    </div>

                    <div className="flex justify-center">
                        {team.map((member, idx) => (
                            <div
                                key={idx}
                                className="bg-white rounded-2xl p-8 shadow-xl max-w-md text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                            >
                                <div className="text-8xl mb-4">{member.avatar}</div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">{member.name}</h3>
                                <p className="text-indigo-600 font-semibold mb-4">{member.role}</p>
                                <p className="text-gray-600 mb-6">{member.bio}</p>
                                <a
                                    href={member.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors"
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                                    </svg>
                                    GitHub Profile
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Join the INDJS Community
                    </h2>
                    <p className="text-xl text-indigo-100 mb-8">
                        Be part of something amazing. Contribute, learn, and build together.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="https://github.com/Rohitsharma6377/IND"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-8 py-4 bg-white text-indigo-600 font-bold rounded-xl hover:bg-gray-100 transform hover:scale-105 transition-all duration-200 shadow-xl"
                        >
                            Star on GitHub
                        </a>
                        <Link href="/docs">
                            <button className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-xl hover:bg-white hover:text-indigo-600 transition-all duration-200">
                                Get Started
                            </button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}