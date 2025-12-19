import React from 'react';
import { Link } from 'indjs';
import FeatureCard from '../components/FeatureCard';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
          <div className="text-center">
            <div className="inline-flex items-center px-3 py-2 sm:px-4 bg-white/10 backdrop-blur-sm rounded-full mb-6 sm:mb-8 animate-bounce">
              <span className="text-xl sm:text-2xl mr-2">⚡</span>
              <span className="text-xs sm:text-sm font-semibold">v3.0.7 Now Available</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black mb-4 sm:mb-6 tracking-tight px-4">
              Build Faster with
              <span className="block bg-gradient-to-r from-yellow-200 to-pink-200 bg-clip-text text-transparent">
                INDJS
              </span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-indigo-100 max-w-3xl mx-auto mb-8 sm:mb-12 leading-relaxed px-4">
              The modern React framework that's blazing fast, incredibly powerful, and ridiculously easy to use.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4">
              <Link href="/docs">
                <button className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-white text-indigo-600 font-bold rounded-xl hover:bg-gray-100 transform hover:scale-105 transition-all duration-200 shadow-2xl text-sm sm:text-base">
                  Get Started →
                </button>
              </Link>

              <div className="w-full sm:w-auto bg-gray-900/50 backdrop-blur-sm px-4 sm:px-6 py-3 sm:py-4 rounded-xl font-mono text-xs sm:text-sm flex items-center gap-2 sm:gap-3">
                <span className="text-gray-300 hidden sm:inline">$</span>
                <span className="flex-1 truncate">npx indjs@latest create my-app</span>
                <button
                  onClick={() => navigator.clipboard.writeText('npx indjs@latest create my-app')}
                  className="text-gray-400 hover:text-white transition-colors flex-shrink-0"
                  aria-label="Copy command"
                >
                  📋
                </button>
              </div>
            </div>

            <div className="mt-12 sm:mt-16 grid grid-cols-3 gap-4 sm:gap-8 max-w-2xl mx-auto px-4">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold">10x</div>
                <div className="text-indigo-200 text-xs sm:text-sm mt-1">Faster Builds</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold">100%</div>
                <div className="text-indigo-200 text-xs sm:text-sm mt-1">Type Safe</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold">Zero</div>
                <div className="text-indigo-200 text-xs sm:text-sm mt-1">Config</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
              Everything You Need
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto px-4">
              Built-in features that make development a breeze
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <FeatureCard
              icon="⚡"
              title="Lightning Fast"
              description="Built on esbuild and Vite for instant hot module replacement and blazing-fast builds"
            />
            <FeatureCard
              icon="🗂️"
              title="File-Based Routing"
              description="Intuitive routing system based on your file structure. No configuration needed"
            />
            <FeatureCard
              icon="🎨"
              title="Beautiful UI"
              description="Pre-styled components with Tailwind CSS for stunning, responsive designs"
            />
            <FeatureCard
              icon="🔒"
              title="Built-in Auth"
              description="JWT-based authentication with bcrypt hashing, ready to use out of the box"
            />
            <FeatureCard
              icon="💾"
              title="Database Support"
              description="Multiple database adapters: PostgreSQL, MongoDB, SQLite, and Prisma"
            />
            <FeatureCard
              icon="🚀"
              title="Easy Deploy"
              description="Deploy to Vercel, Cloudflare Workers, or any Node.js hosting with one command"
            />
          </div>
        </div>
      </section>

      {/* Code Example Section */}
      <section className="py-12 sm:py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
                Simple. Powerful. Elegant.
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8">
                Build full-stack applications with minimal boilerplate. INDJS handles the complexity so you can focus on building great products.
              </p>
              <Link href="/examples">
                <button className="w-full sm:w-auto px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors text-sm sm:text-base">
                  View More Examples →
                </button>
              </Link>
            </div>

            <div className="order-1 lg:order-2 bg-gray-900 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-2xl overflow-hidden">
              <div className="flex items-center gap-2 mb-3 sm:mb-4">
                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-red-500"></div>
                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-yellow-500"></div>
                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-500"></div>
                <span className="ml-auto text-gray-400 text-xs sm:text-sm">pages/index.jsx</span>
              </div>
              <pre className="text-xs sm:text-sm text-gray-300 overflow-x-auto">
                <code>{`import React from 'react';

export default function Home() {
  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold">
        Hello, INDJS!
      </h1>
      <p className="text-gray-600 mt-4">
        Start building amazing apps
      </p>
    </div>
  );
}`}</code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 lg:py-24 bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
            Ready to Build Something Amazing?
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-indigo-100 mb-6 sm:mb-8 px-4">
            Join thousands of developers building with INDJS
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
            <Link href="/docs">
              <button className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-white text-indigo-600 font-bold rounded-xl hover:bg-gray-100 transform hover:scale-105 transition-all duration-200 shadow-xl text-sm sm:text-base">
                Get Started Now
              </button>
            </Link>
            <a
              href="https://github.com/Rohitsharma6377/IND"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-transparent border-2 border-white text-white font-bold rounded-xl hover:bg-white hover:text-indigo-600 transition-all duration-200 text-center text-sm sm:text-base"
            >
              View on GitHub
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}