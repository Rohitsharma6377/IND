import React, { useState } from 'react';
import { Link } from 'indjs';

export default function Examples() {
    const [selectedCategory, setSelectedCategory] = useState('all');

    const examples = [
        {
            title: "Blog with Authentication",
            description: "A full-featured blog with user authentication, post creation, and comments",
            category: "full-stack",
            icon: "📝",
            color: "from-blue-500 to-indigo-600",
            features: ["JWT Auth", "Database", "API Routes", "SSR"],
            code: `// pages/api/posts.js
export async function GET(req) {
  const posts = await db.posts.findAll();
  return { posts };
}

export async function POST(req) {
  const { title, content } = await req.json();
  const post = await db.posts.create({
    title,
    content,
    userId: req.user.id
  });
  return { post };
}`
        },
        {
            title: "E-Commerce Store",
            description: "Complete online store with product catalog, cart, and checkout",
            category: "full-stack",
            icon: "🛒",
            color: "from-green-500 to-teal-600",
            features: ["Shopping Cart", "Payment", "Inventory", "Orders"],
            code: `// pages/products/[id].jsx
export async function getServerSideProps({ params }) {
  const product = await db.products.findById(params.id);
  return { props: { product } };
}

export default function Product({ product }) {
  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.price}</p>
      <button>Add to Cart</button>
    </div>
  );
}`
        },
        {
            title: "Real-Time Chat",
            description: "WebSocket-powered chat application with rooms and direct messages",
            category: "real-time",
            icon: "💬",
            color: "from-purple-500 to-pink-600",
            features: ["WebSockets", "Real-time", "Rooms", "Notifications"],
            code: `// pages/api/chat.js
import { WebSocketServer } from 'ws';

export function websocket(ws, req) {
  ws.on('message', (data) => {
    // Broadcast to all clients
    wss.clients.forEach((client) => {
      client.send(data);
    });
  });
}`
        },
        {
            title: "Dashboard with Charts",
            description: "Analytics dashboard with interactive charts and data visualization",
            category: "ui",
            icon: "📊",
            color: "from-yellow-500 to-orange-600",
            features: ["Charts", "Analytics", "Responsive", "Dark Mode"],
            code: `// pages/dashboard.jsx
import { Chart } from '@/components/Chart';

export default function Dashboard() {
  return (
    <div className="grid grid-cols-3 gap-4">
      <Chart type="line" data={salesData} />
      <Chart type="bar" data={revenueData} />
      <Chart type="pie" data={categoryData} />
    </div>
  );
}`
        },
        {
            title: "API with Database",
            description: "RESTful API with PostgreSQL database and authentication",
            category: "api",
            icon: "🔌",
            color: "from-red-500 to-rose-600",
            features: ["REST API", "PostgreSQL", "Auth", "Validation"],
            code: `// pages/api/users/[id].js
export async function GET(req, { params }) {
  const user = await db.users.findById(params.id);
  return { user };
}

export async function PUT(req, { params }) {
  const data = await req.json();
  const user = await db.users.update(params.id, data);
  return { user };
}`
        },
        {
            title: "Image Gallery",
            description: "Beautiful image gallery with upload, filters, and lightbox",
            category: "ui",
            icon: "🖼️",
            color: "from-pink-500 to-purple-600",
            features: ["Upload", "Filters", "Lightbox", "Grid Layout"],
            code: `// pages/gallery.jsx
export default function Gallery() {
  const [images, setImages] = useState([]);
  
  const handleUpload = async (file) => {
    const formData = new FormData();
    formData.append('image', file);
    await fetch('/api/upload', {
      method: 'POST',
      body: formData
    });
  };
  
  return <ImageGrid images={images} />;
}`
        },
        {
            title: "Todo App with SSR",
            description: "Server-side rendered todo application with real-time updates",
            category: "basic",
            icon: "✅",
            color: "from-indigo-500 to-blue-600",
            features: ["SSR", "CRUD", "Real-time", "Filters"],
            code: `// pages/todos.jsx
export async function getServerSideProps() {
  const todos = await db.todos.findAll();
  return { props: { todos } };
}

export default function Todos({ todos }) {
  return (
    <div>
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
}`
        },
        {
            title: "Social Media Feed",
            description: "Instagram-like feed with infinite scroll and likes",
            category: "full-stack",
            icon: "📱",
            color: "from-teal-500 to-green-600",
            features: ["Infinite Scroll", "Likes", "Comments", "Follow"],
            code: `// pages/feed.jsx
export default function Feed() {
  const { data, fetchMore } = usePosts();
  
  return (
    <InfiniteScroll
      loadMore={fetchMore}
      hasMore={data.hasNextPage}
    >
      {data.posts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </InfiniteScroll>
  );
}`
        },
        {
            title: "Static Blog",
            description: "Markdown-based static blog with syntax highlighting",
            category: "basic",
            icon: "📰",
            color: "from-orange-500 to-red-600",
            features: ["Markdown", "Static", "SEO", "RSS"],
            code: `// pages/blog/[slug].jsx
import { getPostBySlug } from '@/lib/posts';

export async function getStaticProps({ params }) {
  const post = getPostBySlug(params.slug);
  return { props: { post } };
}

export default function Post({ post }) {
  return (
    <article>
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
    </article>
  );
}`
        }
    ];

    const categories = [
        { id: 'all', name: 'All Examples', icon: '🎯' },
        { id: 'basic', name: 'Basic', icon: '🌱' },
        { id: 'full-stack', name: 'Full-Stack', icon: '🚀' },
        { id: 'api', name: 'API', icon: '🔌' },
        { id: 'ui', name: 'UI/UX', icon: '🎨' },
        { id: 'real-time', name: 'Real-Time', icon: '⚡' }
    ];

    const filteredExamples = selectedCategory === 'all'
        ? examples
        : examples.filter(ex => ex.category === selectedCategory);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white py-20">
                <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]"></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6">
                        <span className="text-2xl mr-2">💡</span>
                        <span className="text-sm font-semibold">Code Examples</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black mb-6">
                        Learn by Example
                    </h1>
                    <p className="text-xl text-indigo-100 max-w-3xl mx-auto">
                        Explore real-world examples and templates to jumpstart your INDJS projects
                    </p>
                </div>
            </section>

            {/* Category Filter */}
            <section className="py-12 bg-white border-b border-gray-200 sticky top-16 z-40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-wrap gap-3 justify-center">
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => setSelectedCategory(category.id)}
                                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${selectedCategory === category.id
                                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg scale-105'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                <span className="mr-2">{category.icon}</span>
                                {category.name}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Examples Grid */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {filteredExamples.map((example, idx) => (
                            <div
                                key={idx}
                                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
                            >
                                {/* Header */}
                                <div className={`h-2 bg-gradient-to-r ${example.color}`}></div>
                                <div className="p-8">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center gap-4">
                                            <div className={`w-16 h-16 bg-gradient-to-br ${example.color} rounded-2xl flex items-center justify-center text-3xl shadow-lg`}>
                                                {example.icon}
                                            </div>
                                            <div>
                                                <h3 className="text-2xl font-bold text-gray-900">{example.title}</h3>
                                                <p className="text-gray-600 mt-1">{example.description}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Features */}
                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {example.features.map((feature, featureIdx) => (
                                            <span
                                                key={featureIdx}
                                                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium"
                                            >
                                                {feature}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Code Preview */}
                                    <div className="bg-gray-900 rounded-xl overflow-hidden">
                                        <div className="flex items-center gap-2 px-4 py-3 bg-gray-800">
                                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                            <span className="ml-auto text-gray-400 text-xs">Example Code</span>
                                        </div>
                                        <pre className="p-4 text-sm text-gray-300 overflow-x-auto max-h-64">
                                            <code>{example.code}</code>
                                        </pre>
                                    </div>

                                    {/* Actions */}
                                    <div className="mt-6 flex gap-3">
                                        <button className={`flex-1 px-4 py-3 bg-gradient-to-r ${example.color} text-white font-semibold rounded-lg hover:opacity-90 transition-opacity`}>
                                            View Full Code
                                        </button>
                                        <button className="px-4 py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors">
                                            Live Demo
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Starter Templates */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Starter Templates</h2>
                        <p className="text-xl text-gray-600">Clone and start building immediately</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                name: "Minimal Starter",
                                description: "Clean slate with just the essentials",
                                command: "npx indjs@latest create my-app --template minimal",
                                icon: "🌱"
                            },
                            {
                                name: "Full-Stack Template",
                                description: "Complete setup with auth and database",
                                command: "npx indjs@latest create my-app --template full-stack",
                                icon: "🚀"
                            },
                            {
                                name: "SaaS Boilerplate",
                                description: "Production-ready SaaS starter",
                                command: "npx indjs@latest create my-app --template saas",
                                icon: "💼"
                            }
                        ].map((template, idx) => (
                            <div key={idx} className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border-2 border-gray-200 hover:border-indigo-500 transition-all duration-300">
                                <div className="text-4xl mb-4">{template.icon}</div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">{template.name}</h3>
                                <p className="text-gray-600 mb-4">{template.description}</p>
                                <div className="bg-gray-900 rounded-lg p-3 font-mono text-xs text-green-400">
                                    $ {template.command}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Ready to Build Your Own?
                    </h2>
                    <p className="text-xl text-indigo-100 mb-8">
                        Start with a template or create from scratch
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/docs">
                            <button className="px-8 py-4 bg-white text-indigo-600 font-bold rounded-xl hover:bg-gray-100 transform hover:scale-105 transition-all duration-200 shadow-xl">
                                Read the Docs
                            </button>
                        </Link>
                        <a
                            href="https://github.com/Rohitsharma6377/IND"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-xl hover:bg-white hover:text-indigo-600 transition-all duration-200"
                        >
                            View on GitHub
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
}
