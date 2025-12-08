# 🚀 INDJS - The Next Generation React Framework

<div align="center">

**A modern, blazing-fast, and feature-rich full-stack React framework that's better than Next.js**

[![npm version](https://badge.fury.io/js/indjs.svg)](https://www.npmjs.com/package/indjs)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/node-%3E%3D16.0.0-brightgreen)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue)](https://www.typescriptlang.org/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/Rohitsharma6377/IND/pulls)

[Documentation](https://netcurion.vercel.app) • [Quick Start](#-quick-start) • [Examples](#-examples) • [CLI Reference](#-cli-commands)

</div>

---

## 🎯 Why INDJS is Better Than Next.js

| Feature | INDJS | Next.js |
|---------|-------|---------|
| **Zero Configuration** | ✅ Works out of the box | ⚠️ Requires setup |
| **Built-in Authentication** | ✅ JWT, OAuth, Sessions | ❌ Requires external libs |
| **Database Integration** | ✅ MongoDB, PostgreSQL, SQLite, Prisma | ❌ Manual setup |
| **Testing Suite** | ✅ Vitest + Playwright included | ❌ Manual setup |
| **Deployment Tools** | ✅ One-click to 10+ platforms | ⚠️ Limited options |
| **CLI Code Generation** | ✅ Pages, Components, APIs, Tests | ⚠️ Basic |
| **Real-time Support** | ✅ WebSocket built-in | ❌ Requires external libs |
| **AI-Powered CLI** | ✅ Ollama integration | ❌ Not available |
| **Bundle Size** | ✅ Lightweight (~2MB) | ⚠️ Heavy (~10MB+) |
| **Learning Curve** | ✅ Easy | ⚠️ Moderate |

---

## ✨ Features That Make INDJS Exceptional

### 🚀 **Core Features**
- **File-based Routing** - Automatic routing based on file structure (like Next.js, but better)
- **Server-Side Rendering (SSR)** - Built-in SSR with React 18 and streaming support
- **Static Site Generation (SSG)** - Pre-render pages at build time with ISR
- **Hot Module Replacement** - Instant updates with Vite integration
- **API Routes** - Full-stack development with built-in serverless API support
- **TypeScript First** - Full TypeScript support with auto-generated types

### 🎨 **Styling & UI**
- **Tailwind CSS** - Pre-configured with JIT mode
- **CSS Modules** - Scoped CSS support
- **Sass/SCSS** - Built-in preprocessor support
- **Image Optimization** - Automatic image resizing and optimization with Sharp

### 🔒 **Security & Auth**
- **JWT Authentication** - Built-in token-based auth
- **OAuth Providers** - Google, GitHub, Facebook, Twitter
- **Session Management** - Secure session handling
- **RBAC** - Role-based access control
- **Security Headers** - Helmet integration for security best practices

### 🗄️ **Database & ORM**
- **Multiple Databases** - MongoDB, PostgreSQL, MySQL, SQLite
- **Prisma Integration** - Type-safe database client
- **Migrations** - Built-in migration system
- **Seeding** - Database seeding utilities
- **Query Builder** - Intuitive query API

### 🧪 **Testing & Quality**
- **Unit Testing** - Vitest with React Testing Library
- **E2E Testing** - Playwright for end-to-end tests
- **API Testing** - Built-in API testing utilities
- **Mock Utilities** - Comprehensive mocking tools
- **Coverage Reports** - Automatic test coverage

### 🚢 **Deployment & DevOps**
- **Vercel** - One-click deployment
- **Netlify** - Automatic deployment
- **Docker** - Container support with auto-generated Dockerfile
- **AWS Lambda** - Serverless deployment
- **Google Cloud** - Cloud Run support
- **Azure** - Azure Functions support
- **Static Export** - Export to static HTML
- **CI/CD** - GitHub Actions templates

### 🛠️ **Developer Experience**
- **Powerful CLI** - Generate pages, components, APIs, tests
- **AI-Powered** - Ollama integration for code generation
- **Hot Reload** - Instant feedback during development
- **Error Overlay** - Beautiful error messages with stack traces
- **Source Maps** - Full source map support
- **Debugging** - VS Code debugging configuration

### ⚡ **Performance**
- **Fast Builds** - esbuild for lightning-fast builds
- **Code Splitting** - Automatic code splitting per route
- **Lazy Loading** - Dynamic imports for components
- **Caching** - LRU cache for SSR, Redis support
- **Compression** - Gzip and Brotli compression
- **CDN Ready** - Optimized for CDN delivery

### 🌐 **Advanced Features**
- **WebSocket Support** - Real-time communication built-in
- **GraphQL** - Optional GraphQL server
- **Middleware** - Express-style middleware
- **Plugins** - Extensible plugin system
- **Internationalization** - i18n support
- **PWA** - Progressive Web App support
- **Electron** - Desktop app support
- **Capacitor** - Mobile app support (iOS/Android)

---

## 🚀 Quick Start

### Installation

Choose your preferred method:

#### 1️⃣ NPX (Recommended - No Installation Required)
```bash
npx indjs@latest create my-app
cd my-app
npm install
npm run dev
```

#### 2️⃣ Global Installation
```bash
npm install -g indjs
indjs create my-app
cd my-app
npm install
npm run dev
```

#### 3️⃣ From Source (Development)
```bash
git clone https://github.com/Rohitsharma6377/IND.git
cd IND/framework
npm install
node packages/indjs/bin/indjs.js create my-app
```

Your app will be running at **http://localhost:3000** 🎉

---

## 📁 Project Structure

```
my-app/
├── pages/                  # File-based routing
│   ├── index.jsx          # → / (Home page)
│   ├── about.jsx          # → /about
│   ├── blog/
│   │   ├── index.jsx      # → /blog
│   │   └── [slug].jsx     # → /blog/:slug (Dynamic route)
│   ├── api/               # API routes
│   │   ├── hello.js       # → /api/hello
│   │   └── users/
│   │       ├── index.js   # → /api/users
│   │       └── [id].js    # → /api/users/:id
│   ├── _layout.jsx        # Global layout wrapper
│   └── _head.jsx          # Custom head tags
├── components/            # React components
│   ├── Button.jsx
│   ├── Card.jsx
│   └── Navbar.jsx
├── styles/               # Stylesheets
│   ├── globals.css       # Global styles
│   └── tailwind.css      # Tailwind configuration
├── public/               # Static assets
│   ├── favicon.ico
│   └── images/
├── hooks/                # Custom React hooks
├── utils/                # Utility functions
├── lib/                  # Libraries and helpers
├── tests/                # Test files
├── indjs.config.js       # INDJS configuration
├── tailwind.config.js    # Tailwind configuration
├── tsconfig.json         # TypeScript configuration
└── package.json
```

---

## 🛠️ CLI Commands

### Project Creation
```bash
# Create new project with template selection
indjs create my-app

# Available templates:
# - basic (default)
# - blog
# - ecommerce
# - dashboard
# - saas
# - portfolio
```

### Development
```bash
indjs dev                    # Start dev server (default: port 3000)
indjs dev --port 4000       # Custom port
indjs dev --host 0.0.0.0    # Expose to network
```

### Production
```bash
indjs build                  # Build for production
indjs start                  # Start production server
indjs start --port 8080     # Custom port
```

### Code Generation
```bash
# Generate page
indjs generate page about
indjs g page blog/[slug]     # Dynamic route

# Generate component
indjs generate component Button
indjs g component Card --quick  # Skip prompts

# Generate API route
indjs generate api users
indjs g api products/[id]    # Dynamic API route

# Generate layout
indjs g layout dashboard

# Generate custom hook
indjs g hook useAuth

# Generate utility
indjs g util formatDate

# Generate test
indjs g test Button
```

### AI-Powered Generation (Experimental)
```bash
# AI scaffold (requires Ollama)
indjs ai scaffold component LoginForm
indjs ai scaffold api authentication

# Generate documentation
indjs ai docs

# Code refactoring suggestions
indjs ai refactor
```

### Testing
```bash
indjs test                   # Run unit tests
indjs test --watch          # Watch mode
indjs test --coverage       # With coverage

# E2E tests
npm run e2e                 # Run Playwright tests
```

### Deployment
```bash
indjs deploy vercel          # Deploy to Vercel
indjs deploy netlify         # Deploy to Netlify
indjs deploy docker          # Generate Docker config
indjs deploy aws             # Deploy to AWS Lambda
indjs deploy static          # Export static site
```

### Desktop & Mobile
```bash
indjs desktop dev            # Run as Electron app
indjs mobile build           # Build for Capacitor
indjs mobile android         # Open Android Studio
indjs mobile ios             # Open Xcode
```

---

## 📖 Core Concepts

### File-based Routing

INDJS uses an intuitive file-based routing system:

```jsx
// pages/index.jsx → /
export default function Home() {
  return <h1>Welcome to INDJS!</h1>;
}

// pages/about.jsx → /about
export default function About() {
  return <h1>About Us</h1>;
}

// pages/blog/[slug].jsx → /blog/:slug
export default function BlogPost({ slug }) {
  return <h1>Post: {slug}</h1>;
}

export async function getServerSideProps({ params }) {
  return {
    props: { slug: params.slug }
  };
}
```

### API Routes

Create serverless API endpoints:

```javascript
// pages/api/users.js → /api/users

// GET /api/users
export async function get({ req, res }) {
  const users = await db.users.findMany();
  return { users };
}

// POST /api/users
export async function post({ req, res, body }) {
  const user = await db.users.create({ data: body });
  return { user };
}

// PUT /api/users/[id].js → /api/users/:id
export async function put({ params, body }) {
  const user = await db.users.update({
    where: { id: params.id },
    data: body
  });
  return { user };
}
```

### Server-Side Rendering (SSR)

```jsx
export default function Page({ data }) {
  return <div>{data.title}</div>;
}

export async function getServerSideProps({ req, res, params, query }) {
  const data = await fetchData();
  
  return {
    props: { data }
  };
}
```

### Static Site Generation (SSG)

```jsx
export default function BlogPost({ post }) {
  return <article>{post.content}</article>;
}

export async function getStaticPaths() {
  const posts = await fetchAllPosts();
  
  return {
    paths: posts.map(post => ({ params: { slug: post.slug } })),
    fallback: false
  };
}

export async function getStaticProps({ params }) {
  const post = await fetchPost(params.slug);
  
  return {
    props: { post },
    revalidate: 60 // ISR: Regenerate every 60 seconds
  };
}
```

### Authentication

```javascript
import { Auth } from 'indjs';

// Hash password
const hashedPassword = await Auth.hashPassword('password123');

// Verify password
const isValid = await Auth.verifyPassword('password123', hashedPassword);

// Generate JWT token
const token = Auth.generateToken({ 
  userId: 1, 
  email: 'user@example.com' 
});

// Verify token
const decoded = Auth.verifyToken(token);

// Protect routes with middleware
export const middleware = Auth.requireAuth({
  roles: ['admin'],
  redirect: '/login'
});
```

### Database Integration

```javascript
import { Database } from 'indjs';

// Configure database
Database.configure({
  type: 'postgresql',
  url: process.env.DATABASE_URL
});

// Connect
await Database.connect();

// Query
const users = await Database.query('SELECT * FROM users WHERE active = ?', [true]);

// Using models
class User extends Database.Model {
  constructor() {
    super('users');
  }
}

const user = await User.create({ 
  name: 'John Doe', 
  email: 'john@example.com' 
});

const allUsers = await User.findAll();
const oneUser = await User.findById(1);
```

---

## 🎨 Styling

### Tailwind CSS (Pre-configured)

```jsx
export default function Button({ children }) {
  return (
    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
      {children}
    </button>
  );
}
```

### CSS Modules

```jsx
// Button.module.css
.button {
  background: blue;
  color: white;
}

// Button.jsx
import styles from './Button.module.css';

export default function Button() {
  return <button className={styles.button}>Click me</button>;
}
```

---

## 🧪 Testing

### Unit Tests (Vitest)

```javascript
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Button from './Button';

describe('Button', () => {
  it('renders correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });
});
```

### E2E Tests (Playwright)

```javascript
import { test, expect } from '@playwright/test';

test('homepage loads correctly', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await expect(page.locator('h1')).toContainText('Welcome to INDJS');
});
```

---

## ⚙️ Configuration

### indjs.config.js

```javascript
export default {
  // Experimental features
  experimental: {
    devBundler: 'vite',      // Use Vite for dev (faster HMR)
    streaming: true,          // Enable streaming SSR
  },
  
  // Authentication
  auth: {
    secret: process.env.JWT_SECRET,
    providers: ['google', 'github'],
    session: {
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    }
  },
  
  // Database
  database: {
    type: 'postgresql',
    url: process.env.DATABASE_URL,
    migrations: './migrations',
    seeds: './seeds'
  },
  
  // Caching
  caching: {
    type: 'redis',           // 'lru' or 'redis'
    url: process.env.REDIS_URL,
    ttl: 3600,
    secret: process.env.REVALIDATE_SECRET
  },
  
  // Deployment
  deployment: {
    platform: 'vercel',
    env: {
      NODE_ENV: 'production'
    }
  },
  
  // Plugins
  plugins: [
    async (hook) => ({
      onRequest: async ({ req }) => {
        console.log('Request:', req.url);
      }
    })
  ],
  
  // Observability
  observability: {
    enabled: true,
    metrics: true,
    tracing: false
  }
};
```

---

## 📚 Examples

### Blog Application

```bash
indjs create my-blog --template blog
cd my-blog
npm install
npm run dev
```

### E-commerce Store

```bash
indjs create my-store --template ecommerce
cd my-store
npm install
npm run dev
```

### Admin Dashboard

```bash
indjs create my-dashboard --template dashboard
cd my-dashboard
npm install
npm run dev
```

---

## 🚢 Deployment

### Vercel (Recommended)

```bash
indjs deploy vercel
# or
vercel --prod
```

### Netlify

```bash
indjs deploy netlify
# Connect your repository to Netlify
```

### Docker

```bash
indjs deploy docker
docker build -t my-app .
docker run -p 3000:3000 my-app
```

### AWS Lambda

```bash
indjs deploy aws
sam deploy --guided
```

### Static Export

```bash
indjs build --static
# Output: .indjs/static/
```

---

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md).

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

MIT © INDJS Team || Rohit Sharma

---

## 🙏 Acknowledgments

- Inspired by [Next.js](https://nextjs.org/) but designed to be better
- Built with [React](https://reactjs.org/) and [Express](https://expressjs.com/)
- Powered by [esbuild](https://esbuild.github.io/) and [Vite](https://vitejs.dev/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)

---

## 📞 Support & Community

- 📖 [Documentation](https://netcurion.vercel.app)
- 🐛 [Issue Tracker](https://github.com/Rohitsharma6377/IND/issues)
- 💬 [Discussions](https://github.com/Rohitsharma6377/IND/discussions)
- 📧 [Email Support](mailto:netcurion@outlook.com)
- 🐦 [Twitter](https://twitter.com/Netcurion)
- 📷 [Instagram](https://instagram.com/Netcurion)

---

<div align="center">

**Made with ❤️ by the INDJS Team**

⭐ Star us on [GitHub](https://github.com/Rohitsharma6377/IND) if you like INDJS!

</div>