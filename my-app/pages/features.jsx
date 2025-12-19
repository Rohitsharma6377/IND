import React from 'react';
import { Link } from 'indjs';

export default function Features() {
    const features = [
        {
            category: "Performance",
            icon: "⚡",
            color: "from-yellow-400 to-orange-500",
            items: [
                {
                    title: "Lightning Fast Builds",
                    description: "Powered by esbuild and Vite for instant hot module replacement and sub-second builds",
                    icon: "🚀"
                },
                {
                    title: "Optimized Production",
                    description: "Automatic code splitting, tree shaking, and minification for optimal bundle sizes",
                    icon: "📦"
                },
                {
                    title: "Smart Caching",
                    description: "Intelligent caching strategies to speed up subsequent builds and deployments",
                    icon: "💨"
                }
            ]
        },
        {
            category: "Developer Experience",
            icon: "💻",
            color: "from-blue-400 to-indigo-500",
            items: [
                {
                    title: "File-Based Routing",
                    description: "Intuitive routing based on your file structure. Create a file, get a route automatically",
                    icon: "🗂️"
                },
                {
                    title: "Hot Module Replacement",
                    description: "See your changes instantly without losing application state",
                    icon: "🔥"
                },
                {
                    title: "TypeScript Support",
                    description: "First-class TypeScript support with automatic type checking and IntelliSense",
                    icon: "📘"
                },
                {
                    title: "Zero Config",
                    description: "Sensible defaults that work out of the box. Configure only when you need to",
                    icon: "⚙️"
                }
            ]
        },
        {
            category: "Full-Stack Features",
            icon: "🛠️",
            color: "from-purple-400 to-pink-500",
            items: [
                {
                    title: "API Routes",
                    description: "Build serverless API endpoints right alongside your pages",
                    icon: "🌐"
                },
                {
                    title: "Built-in Authentication",
                    description: "JWT-based auth with bcrypt hashing, sessions, and middleware support",
                    icon: "🔒"
                },
                {
                    title: "Database Adapters",
                    description: "Connect to PostgreSQL, MongoDB, SQLite, or use Prisma ORM",
                    icon: "💾"
                },
                {
                    title: "Server-Side Rendering",
                    description: "Render pages on the server for better SEO and initial load performance",
                    icon: "🖥️"
                }
            ]
        },
        {
            category: "Styling & UI",
            icon: "🎨",
            color: "from-green-400 to-teal-500",
            items: [
                {
                    title: "Tailwind CSS",
                    description: "Pre-configured Tailwind CSS for rapid UI development",
                    icon: "🌈"
                },
                {
                    title: "CSS Modules",
                    description: "Scoped CSS with CSS Modules support built-in",
                    icon: "📝"
                },
                {
                    title: "Responsive Design",
                    description: "Mobile-first utilities and responsive design patterns",
                    icon: "📱"
                }
            ]
        },
        {
            category: "Deployment",
            icon: "🚀",
            color: "from-red-400 to-rose-500",
            items: [
                {
                    title: "Deploy Anywhere",
                    description: "Deploy to Vercel, Cloudflare Workers, AWS, or any Node.js hosting",
                    icon: "☁️"
                },
                {
                    title: "Static Export",
                    description: "Export your app as static HTML for hosting on CDNs",
                    icon: "📄"
                },
                {
                    title: "Docker Support",
                    description: "Containerize your application with included Dockerfile",
                    icon: "🐳"
                }
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white py-16 sm:py-20 lg:py-24">
                <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]"></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="inline-flex items-center px-3 py-2 sm:px-4 bg-white/10 backdrop-blur-sm rounded-full mb-4 sm:mb-6">
                        <span className="text-xl sm:text-2xl mr-2">✨</span>
                        <span className="text-xs sm:text-sm font-semibold">Powerful Features</span>
                    </div>
                    <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black mb-4 sm:mb-6 px-4">
                        Everything You Need
                        <span className="block bg-gradient-to-r from-yellow-200 to-pink-200 bg-clip-text text-transparent">
                            To Build Amazing Apps
                        </span>
                    </h1>
                    <p className="text-base sm:text-lg lg:text-xl text-indigo-100 max-w-3xl mx-auto px-4">
                        INDJS comes packed with features that make building modern web applications fast, fun, and incredibly productive.
                    </p>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-12 sm:py-16 lg:py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {features.map((category, idx) => (
                        <div key={idx} className="mb-12 sm:mb-16 lg:mb-20">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-6 sm:mb-10">
                                <div className={`w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br ${category.color} rounded-xl sm:rounded-2xl flex items-center justify-center text-2xl sm:text-3xl shadow-lg flex-shrink-0`}>
                                    {category.icon}
                                </div>
                                <div>
                                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">{category.category}</h2>
                                    <div className={`h-1 w-16 sm:w-20 bg-gradient-to-r ${category.color} rounded-full mt-2`}></div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                                {category.items.map((item, itemIdx) => (
                                    <div
                                        key={itemIdx}
                                        className="bg-white rounded-xl p-5 sm:p-6 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
                                    >
                                        <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">{item.icon}</div>
                                        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">{item.title}</h3>
                                        <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{item.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Comparison Section */}
            <section className="py-12 sm:py-16 lg:py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-10 sm:mb-16">
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">Why Choose INDJS?</h2>
                        <p className="text-lg sm:text-xl text-gray-600">See how we compare to other frameworks</p>
                    </div>

                    <div className="overflow-x-auto -mx-4 sm:mx-0">
                        <div className="inline-block min-w-full align-middle px-4 sm:px-0">
                            <table className="min-w-full bg-white rounded-xl shadow-lg overflow-hidden">
                                <thead className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                                    <tr>
                                        <th className="px-3 sm:px-6 py-3 sm:py-4 text-left font-bold text-sm sm:text-base">Feature</th>
                                        <th className="px-3 sm:px-6 py-3 sm:py-4 text-center font-bold text-sm sm:text-base">INDJS</th>
                                        <th className="px-3 sm:px-6 py-3 sm:py-4 text-center font-bold text-sm sm:text-base">Next.js</th>
                                        <th className="px-3 sm:px-6 py-3 sm:py-4 text-center font-bold text-sm sm:text-base">Remix</th>
                                        <th className="px-3 sm:px-6 py-3 sm:py-4 text-center font-bold text-sm sm:text-base">Vite</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {[
                                        { feature: "File-Based Routing", indjs: "✅", next: "✅", remix: "✅", vite: "❌" },
                                        { feature: "Built-in Auth", indjs: "✅", next: "❌", remix: "❌", vite: "❌" },
                                        { feature: "Database Adapters", indjs: "✅", next: "❌", remix: "❌", vite: "❌" },
                                        { feature: "Zero Config", indjs: "✅", next: "⚠️", remix: "⚠️", vite: "✅" },
                                        { feature: "SSR Support", indjs: "✅", next: "✅", remix: "✅", vite: "⚠️" },
                                        { feature: "API Routes", indjs: "✅", next: "✅", remix: "✅", vite: "❌" },
                                        { feature: "Fast HMR", indjs: "✅", next: "⚠️", remix: "⚠️", vite: "✅" },
                                    ].map((row, idx) => (
                                        <tr key={idx} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-3 sm:px-6 py-3 sm:py-4 font-semibold text-gray-900 text-sm sm:text-base">{row.feature}</td>
                                            <td className="px-3 sm:px-6 py-3 sm:py-4 text-center text-lg sm:text-2xl">{row.indjs}</td>
                                            <td className="px-3 sm:px-6 py-3 sm:py-4 text-center text-lg sm:text-2xl">{row.next}</td>
                                            <td className="px-3 sm:px-6 py-3 sm:py-4 text-center text-lg sm:text-2xl">{row.remix}</td>
                                            <td className="px-3 sm:px-6 py-3 sm:py-4 text-center text-lg sm:text-2xl">{row.vite}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-r from-indigo-600 to-purple-600">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
                        Ready to Experience These Features?
                    </h2>
                    <p className="text-base sm:text-lg lg:text-xl text-indigo-100 mb-6 sm:mb-8 px-4">
                        Get started with INDJS in less than a minute
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
                        <Link href="/docs">
                            <button className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-white text-indigo-600 font-bold rounded-xl hover:bg-gray-100 transform hover:scale-105 transition-all duration-200 shadow-xl text-sm sm:text-base">
                                Read the Docs
                            </button>
                        </Link>
                        <Link href="/examples">
                            <button className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-transparent border-2 border-white text-white font-bold rounded-xl hover:bg-white hover:text-indigo-600 transition-all duration-200 text-sm sm:text-base">
                                View Examples
                            </button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
