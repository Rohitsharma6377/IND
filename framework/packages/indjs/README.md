# INDJS - Modern Full-Stack React Framework

<div align="center">

![INDJS Logo](https://via.placeholder.com/200x100/4F46E5/FFFFFF?text=INDJS)

**A modern, fast, and lightweight full-stack React framework with file-based routing, SSR, and built-in optimizations**

[![npm version](https://badge.fury.io/js/indjs.svg)](https://badge.fury.io/js/indjs)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D16.0.0-brightgreen)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue)](https://www.typescriptlang.org/)

[Documentation](https://netcurion.vercel.app) • [Examples](https://github.com/Rohitsharma6377/IND/tree/main/examples) • [Community](https://discord.gg/indjs)

</div>

## ✨ Features

- 🚀 **File-based Routing** - Automatic routing based on file structure
- ⚡ **Server-Side Rendering (SSR)** - Built-in SSR with React 18
- 🎯 **Static Site Generation (SSG)** - Pre-render pages at build time
- 🔥 **Hot Module Replacement** - Instant updates during development
- 📱 **API Routes** - Full-stack development with built-in API support
- 🎨 **Tailwind CSS Integration** - Utility-first CSS framework included
- 🔒 **Authentication System** - Built-in auth with JWT and OAuth support
- 🗄️ **Database Integration** - Support for MongoDB, PostgreSQL, SQLite, and Prisma
- 🧪 **Testing Utilities** - Comprehensive testing tools included
- 🐳 **Deployment Ready** - One-click deployment to Vercel, Netlify, AWS, and more
- 📦 **TypeScript Support** - Full TypeScript support out of the box
- 🖼️ **Image Optimization** - Automatic image optimization and resizing
- 🔧 **Zero Configuration** - Works out of the box with sensible defaults

## 🚀 Quick Start

### Installation

```bash
npm install -g indjs
```

### Create a New Project

```bash
indjs create my-app
cd my-app
npm install
npm run dev
```

Your app will be running at `http://localhost:3000` 🎉

### Manual Installation

```bash
npm install indjs react react-dom
```

Create a `pages/index.jsx` file:

```jsx
export default function Home() {
  return (
    <div>
      <h1>Welcome to INDJS!</h1>
      <p>The modern full-stack React framework</p>
    </div>
  );
}
```

Add scripts to your `package.json`:

```json
{
  "scripts": {
    "dev": "indjs dev",
    "build": "indjs build",
    "start": "indjs start"
  }
}
```

## 📖 Documentation

### File-based Routing

INDJS uses file-based routing similar to Next.js:

```
pages/
├── index.jsx          → /
├── about.jsx          → /about
├── blog/
│   ├── index.jsx      → /blog
│   └── [slug].jsx     → /blog/:slug
└── api/
    └── users.js       → /api/users
```

### Dynamic Routes

Create dynamic routes using square brackets:

```jsx
// pages/blog/[slug].jsx
export default function BlogPost({ slug }) {
  return <h1>Post: {slug}</h1>;
}

export async function getServerSideProps({ params }) {
  return {
    props: {
      slug: params.slug
    }
  };
}
```

### API Routes

Create API endpoints in the `pages/api` directory:

```javascript
// pages/api/users.js
export async function get({ req, res }) {
  return { users: [] };
}

export async function post({ req, res, body }) {
  // Create user logic
  return { success: true };
}
```

### Layouts

Create reusable layouts:

```jsx
// pages/_layout.jsx
export default function Layout({ children }) {
  return (
    <div>
      <nav>Navigation</nav>
      <main>{children}</main>
      <footer>Footer</footer>
    </div>
  );
}
```

### Authentication

Built-in authentication system:

```javascript
import { Auth } from 'indjs';

// Hash password
const hashedPassword = await Auth.hashPassword('password123');

// Generate JWT token
const token = Auth.generateToken({ userId: 1, email: 'user@example.com' });

// Protect routes
export const middleware = Auth.requireAuth({
  roles: ['admin'],
  redirect: '/login'
});
```

### Database Integration

Support for multiple databases:

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
const users = await Database.query('SELECT * FROM users');

// Using models
class User extends Database.Model {
  constructor() {
    super('users');
  }
}

const user = await User.create({ name: 'John', email: 'john@example.com' });
```

## 🛠️ CLI Commands

### Development

```bash
indjs dev                    # Start development server
indjs dev --port 4000       # Custom port
```

### Building

```bash
indjs build                  # Build for production
indjs build --baseUrl https://mysite.com
```

### Production

```bash
indjs start                  # Start production server
indjs start --port 8080     # Custom port
```

### Code Generation

```bash
indjs create my-app          # Create new app
indjs generate page about    # Generate page
indjs generate component Button  # Generate component
indjs generate api users     # Generate API route
```

### Deployment

```bash
indjs deploy vercel          # Deploy to Vercel
indjs deploy netlify         # Deploy to Netlify
indjs deploy docker          # Generate Docker config
```

### Testing

```bash
indjs test                   # Run tests
indjs test --watch          # Watch mode
```

## 🎨 Styling

INDJS comes with Tailwind CSS pre-configured:

```jsx
export default function Button({ children }) {
  return (
    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
      {children}
    </button>
  );
}
```

Create a `styles/globals.css` file:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer components {
  .btn-primary {
    @apply bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded;
  }
}
```

## 🧪 Testing

INDJS includes comprehensive testing utilities:

```javascript
import { Testing } from 'indjs';

// Test API handlers
const { result, context } = await Testing.testAPIHandler(handler, {
  method: 'POST',
  body: { name: 'John' }
});

// Mock authentication
const mockUser = Testing.TestAuth.createMockUser();
const authMiddleware = Testing.TestAuth.mockAuthMiddleware(mockUser);

// Test database
const testDb = new Testing.TestDatabase(adapter);
await testDb.seed('users', Testing.factories.user());
```

## 🚢 Deployment

### Vercel

```bash
indjs deploy vercel
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

## 📦 TypeScript Support

INDJS has full TypeScript support:

```typescript
import { INDJSPage, GetServerSideProps } from 'indjs';

interface Props {
  user: {
    id: string;
    name: string;
  };
}

const UserPage: INDJSPage<Props> = ({ user }) => {
  return <h1>Hello, {user.name}!</h1>;
};

export const getServerSideProps: GetServerSideProps<Props> = async ({ params }) => {
  const user = await fetchUser(params.id);
  
  return {
    props: { user }
  };
};

export default UserPage;
```

## 🔧 Configuration

Create an `indjs.config.js` file:

```javascript
export default {
  // Custom configuration
  auth: {
    secret: process.env.JWT_SECRET,
    providers: ['google', 'github']
  },
  database: {
    type: 'postgresql',
    url: process.env.DATABASE_URL
  },
  deployment: {
    platform: 'vercel',
    env: {
      NODE_ENV: 'production'
    }
  },
  experimental: {
    devBundler: 'vite'
  }
};

### Vite Integration (Experimental)

Enable Vite for a Turbopack-like dev experience and optimized client builds.

Add to `indjs.config.js`:
// pages/blog/[slug].jsx
export default function BlogPost({ post }) {
  return (
    <article>
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  );
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
    revalidate: 60 // Regenerate every minute
  };
}
```

### E-commerce API

```javascript
// pages/api/products/[id].js
import { Database, Auth } from 'indjs';

export async function get({ params }) {
  const product = await Database.query(
    'SELECT * FROM products WHERE id = ?',
    [params.id]
  );
  
  return product[0] || null;
}

export async function put({ params, body, req }) {
  // Require authentication
  if (!await Auth.requireAuth({ req })) {
    return { error: 'Unauthorized' };
  }
  
  const updated = await Database.query(
    'UPDATE products SET name = ?, price = ? WHERE id = ?',
    [body.name, body.price, params.id]
  );
  
  return { success: true };
}
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by [Next.js](https://nextjs.org/) for the file-based routing concept
- Built with [React](https://reactjs.org/) and [Express](https://expressjs.com/)
- Powered by [esbuild](https://esbuild.github.io/) for fast builds
- Styled with [Tailwind CSS](https://tailwindcss.com/)

## 📞 Support

- 📖 [Documentation](https://netcurion.vercel.app)
<!-- - 💬 [Discord Community](https://discord.gg/indjs) -->
- 🐛 [Issue Tracker](https://github.com/Rohitsharma6377/IND/issues)
- 📧 [Email Support](mailto:netcurion@outlook.com)

---

<div align="center">

**Made with ❤️ by the INDJS Team || Rohit sharma**

[Website](https://netcurion.vercel.app) • [GitHub](https://github.com/Rohitsharma6377/IND) • [Instagram](https://instagram.com/Netcurion)

</div>
