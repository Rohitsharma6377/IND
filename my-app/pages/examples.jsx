import React, { useState } from 'react';
import { Link } from 'indjs';

// SVG Icon Components
const EditIcon = ({ className = "w-6 h-6" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
);

const ShoppingCartIcon = ({ className = "w-6 h-6" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="21" r="1" />
        <circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
);

const MessageIcon = ({ className = "w-6 h-6" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
);

const ChartIcon = ({ className = "w-6 h-6" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
    </svg>
);

const PlugIcon = ({ className = "w-6 h-6" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
        <path d="m9 12 2 2 4-4" />
    </svg>
);

const ImageIcon = ({ className = "w-6 h-6" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <polyline points="21 15 16 10 5 21" />
    </svg>
);

const CheckSquareIcon = ({ className = "w-6 h-6" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="9 11 12 14 22 4" />
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
    </svg>
);

const SmartphoneIcon = ({ className = "w-6 h-6" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
        <line x1="12" y1="18" x2="12.01" y2="18" />
    </svg>
);

const NewspaperIcon = ({ className = "w-6 h-6" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" />
        <path d="M18 14h-8" />
        <path d="M15 18h-5" />
        <path d="M10 6h8v4h-8V6Z" />
    </svg>
);

const TargetIcon = ({ className = "w-6 h-6" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="2" />
    </svg>
);

const SeedlingIcon = ({ className = "w-6 h-6" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 20h10" />
        <path d="M10 20c5.5-2.5.8-6.4 3-10" />
        <path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z" />
        <path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z" />
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

const ApiIcon = ({ className = "w-6 h-6" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
);

const PaletteIcon = ({ className = "w-6 h-6" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="13.5" cy="6.5" r=".5" />
        <circle cx="17.5" cy="10.5" r=".5" />
        <circle cx="8.5" cy="7.5" r=".5" />
        <circle cx="6.5" cy="12.5" r=".5" />
        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.555C21.965 6.012 17.461 2 12 2z" />
    </svg>
);

const ZapIcon = ({ className = "w-6 h-6" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
);

const LightbulbIcon = ({ className = "w-6 h-6" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
        <path d="M9 18h6" />
        <path d="M10 22h4" />
    </svg>
);

const BriefcaseIcon = ({ className = "w-6 h-6" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
);

export default function Examples() {
    const [selectedCategory, setSelectedCategory] = useState('all');

    const examples = [
        {
            title: "Blog with Authentication",
            description: "A full-featured blog with user authentication, post creation, and comments",
            category: "full-stack",
            icon: EditIcon,
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
            icon: ShoppingCartIcon,
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
            icon: MessageIcon,
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
            icon: ChartIcon,
            color: "from-amber-500 to-orange-600",
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
            icon: PlugIcon,
            color: "from-rose-500 to-red-600",
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
            icon: ImageIcon,
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
            icon: CheckSquareIcon,
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
            icon: SmartphoneIcon,
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
            icon: NewspaperIcon,
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
        { id: 'all', name: 'All Examples', icon: TargetIcon },
        { id: 'basic', name: 'Basic', icon: SeedlingIcon },
        { id: 'full-stack', name: 'Full-Stack', icon: RocketIcon },
        { id: 'api', name: 'API', icon: ApiIcon },
        { id: 'ui', name: 'UI/UX', icon: PaletteIcon },
        { id: 'real-time', name: 'Real-Time', icon: ZapIcon }
    ];

    const templates = [
        { name: "Minimal Starter", description: "Clean slate with just the essentials", command: "npx indjs@latest create my-app --template minimal", icon: SeedlingIcon },
        { name: "Full-Stack Template", description: "Complete setup with auth and database", command: "npx indjs@latest create my-app --template full-stack", icon: RocketIcon },
        { name: "SaaS Boilerplate", description: "Production-ready SaaS starter", command: "npx indjs@latest create my-app --template saas", icon: BriefcaseIcon }
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
                        <LightbulbIcon className="w-5 h-5 mr-2" />
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
                        {categories.map((category) => {
                            const IconComponent = category.icon;
                            return (
                                <button
                                    key={category.id}
                                    onClick={() => setSelectedCategory(category.id)}
                                    className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center ${selectedCategory === category.id
                                            ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg scale-105'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                >
                                    <IconComponent className="w-5 h-5 mr-2" />
                                    {category.name}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Examples Grid */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {filteredExamples.map((example, idx) => {
                            const IconComponent = example.icon;
                            return (
                                <div
                                    key={idx}
                                    className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
                                >
                                    {/* Header */}
                                    <div className={`h-2 bg-gradient-to-r ${example.color}`}></div>
                                    <div className="p-8">
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="flex items-center gap-4">
                                                <div className={`w-16 h-16 bg-gradient-to-br ${example.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                                                    <IconComponent className="w-8 h-8 text-white" />
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
                            );
                        })}
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
                        {templates.map((template, idx) => {
                            const TemplateIcon = template.icon;
                            return (
                                <div key={idx} className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border-2 border-gray-200 hover:border-indigo-500 transition-all duration-300">
                                    <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 shadow-lg">
                                        <TemplateIcon className="w-7 h-7 text-white" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">{template.name}</h3>
                                    <p className="text-gray-600 mb-4">{template.description}</p>
                                    <div className="bg-gray-900 rounded-lg p-3 font-mono text-xs text-green-400">
                                        $ {template.command}
                                    </div>
                                </div>
                            );
                        })}
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
