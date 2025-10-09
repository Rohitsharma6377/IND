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

Choose one of the following:

1) npx (recommended, no global install)
```bash
npx indjs@latest --help
npx indjs@latest create my-app
```

2) Global install
```bash
npm i -g indjs
indjs --help
indjs create my-app
```

3) Local dev (from monorepo checkout)
```bash
node framework/packages/indjs/bin/indjs.js --help
node framework/packages/indjs/bin/indjs.js create my-app
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

## 🧭 Step-by-Step Hinglish Guide (500 words)

Ye guide aapko INDJS ko jaldi aur sahi tarike se use karna sikhayega—setup se leke deploy tak.

- **1) Install & Project Setup**
  - Global ya npx se install karein: `npm i -g indjs` ya `npx indjs@latest create my-app`.
  - Project me jaake `npm install` run karein.

- **2) Dev Server (HMR enabled)**
  - `npm run dev` se development server start hota hai (default port 3000). Pages hot-reload hote rehte hain.
  - Aapke pages `pages/` folder me hote hain. Example: `pages/index.jsx` → `/` route.

- **3) File-based Routing**
  - Simple rule: file ka path hi URL ban jata hai.
  - `pages/about.jsx` → `/about`
  - Dynamic routes: `pages/blog/[slug].jsx` → `/blog/:slug`
  - API routes: `pages/api/users.js` → `/api/users` (GET/POST methods supported).

- **4) SSR, SSG & ISR**
  - SSR default hai—server par render hota hai for SEO & fast first paint.
  - SSG ke liye build time par pre-render hota hai (static pages).
  - ISR (Incremental Static Regeneration): page par `export const revalidateSeconds = 60;` laga do—60s baad page fresh render ho jayega.

- **5) Client Hydration & SPA Navigation**
  - INDJS ab client bundles me global boot function expose karta hai: `window.__IND_BOOT__`.
  - SPA-style navigation ke baad DOM swap hota hai aur boot rehydrate karta hai, taaki page bina full reload ke interactive rahe.
  - Hydration ko safe banane ke liye Error Boundary wrap kiya gaya hai (dev/prod). Agar error aaya toh ek friendly error box dikhega.

- **6) Telemetry (Client Error Intake)**
  - Client hydration errors beacon ke through `/__indjs/client-error` endpoint ko bheje ja sakte hai.
  - Dev mode me console par log hota hai, prod me `pino` logger through structured log aata hai.

- **7) Components & Types**
  - Built-ins: `Image`, `Link`, `Script`, `Head`, `ErrorBoundary`, `dynamic()`.
  - TypeScript consumers ke liye `types.d.ts` publish hota hai. `package.json` me `"types": "src/types.d.ts"` set hai.

- **8) Styling**
  - Tailwind pre-configured hai. `styles/globals.css` me Tailwind layers add karke classes use karein.

- **9) Testing (Unit + E2E)**
  - Unit: Vitest config `vitest.config.mjs`—`npm run test` use karein.
  - E2E: Playwright config `playwright.config.mjs`—`npx playwright install` aur `npm run e2e`.
  - E2E default home page par “Welcome to INDJS” aur basic links verify karta hai.

- **10) Build & Start (Production)**
  - `npm run build` se production assets ready ho jate hain.
  - `npm run start` se prod server (Express + security middlewares) run hota hai.
  - Hashed client assets cache-friendly serve hote hain; SSR HTML optional LRU/Redis cache ke sath.

- **11) Deployment**
  - CLI helpers: `indjs deploy vercel|netlify|docker` etc.
  - Observability: `/__indjs/metrics` aur `/__indjs/dashboard` se basic metrics dekh sakte hain.

- **12) Config & Plugins**
  - `indjs.config.js` me experimental features (e.g., Vite dev bundler, streaming SSR), observability, caching, auth, DB, plugins configure karein.
  - Hooks: `onRequest`, `onApiCall`, `onRouteMatch`, `onResponse` aapki needs ke hisaab se extend kiye ja sakte hain.

In short: INDJS aapko Next.js style DX deta hai, lekin lightweight aur express-style control ke sath. Start karein, pages banayein, APIs likhein, aur ek hi repo me full-stack app ship karein—fast!


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
# Create new app
indjs create my-app

# Generate page (long form and alias)
indjs generate page about
indjs g page about

# Generate component with no prompts / quick mode
indjs generate component Button --noPrompt
indjs g component Button --quick

# Generate API route (interactive)
indjs generate api users
indjs g api users
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

## 🛠️ Troubleshooting

- **npx says "could not determine executable to run"**
  - Ensure the latest `indjs` is published from the CLI package (has a `bin` field). Then run:
    ```bash
    npx --clear-cache
    npx indjs@latest --help
    ```

- **Global install not found on Windows ("indjs is not recognized")**
  - Add the global npm bin to PATH: `C:\Users\<YOU>\AppData\Roaming\npm`
  - New PowerShell:
    ```powershell
    where indjs
    indjs --help
    ```
  - For the current session:
    ```powershell
    $env:Path = "$env:AppData\npm;$env:Path"
    ```

- **Execution policy blocks PowerShell shim**
  - Use `.cmd` shim or set policy for current user:
    ```powershell
    Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
    ```

- **Path mistakes when running from a generated app**
  - Use local binary via `npx indjs` or project scripts (`npm run dev`).
  - If calling the repo binary by path from inside `my-app/`, use `..\\framework\\packages\\indjs\\bin\\indjs.js`.

- **Build error: Unterminated regular expression**
  - Check the referenced file/line for a stray `/` or unfinished regex literal.
  - In JSX, ensure attributes/strings are properly closed and no accidental `/` is interpreted as regex.

## 🖥️ Desktop (Electron)

Start Electron alongside the web server:

```bash
indjs desktop dev      # runs dev server + Electron (auto waits for port)
indjs desktop start    # runs production server + Electron
```

Ensure your Electron entry (e.g., `main.cjs`) loads the app at `http://localhost:PORT`.

## 📱 Mobile (Capacitor)

Scaffold using the mobile template or add Capacitor config manually. Build and sync:

```bash
indjs mobile build     # runs indjs build then npx cap copy
indjs mobile sync      # npx cap sync
indjs mobile android   # open Android Studio
indjs mobile ios       # open Xcode
```

Use a custom Capacitor `webDir` if desired:

```bash
indjs build --webDir www   # copies .indjs/static to ./www after build
```

## 🌊 Streaming SSR (Experimental)

Enable streaming responses from the server for ultra-fast TTFB:

```js
// indjs.config.js
export default {
  experimental: { streaming: true }
};
```

When enabled, pages render as a stream where supported. See `src/ssr.mjs` and `src/start.mjs`.

## 🔄 Incremental Static Regeneration (ISR)

- Time-based revalidation per page:

```jsx
// pages/blog/[slug].jsx
export const revalidateSeconds = 60; // re-render after 60 seconds
```

- Tag-based revalidation endpoint:

```bash
curl -X POST 'http://localhost:3000/__indjs/revalidate?tag=blog' \
  -H 'Content-Type: application/json' -d '{"secret":"<your-secret>"}'
```

- Path-based revalidation endpoint:

```bash
curl -X POST 'http://localhost:3000/__indjs/revalidatePath' \
  -H 'Content-Type: application/json' \
  -d '{"secret":"<your-secret>", "path":"/blog/hello"}'
```

Configure a secret in `indjs.config.js` under `caching.secret`.

## 🧩 Plugin System

Register plugins in `indjs.config.js`. Hooks include `onRequest`, `onApiCall`, `onRouteMatch`, `onResponse`.

```js
export default {
  plugins: [
    async (hook) => ({
      onRequest: async ({ req }) => {},
      onApiCall: async ({ route }) => {},
      onRouteMatch: async ({ route }) => {},
      onResponse: async ({ res }) => {}
    }[hook])
  ]
};
```

## ⚡ Realtime (WebSocket)

Install `ws` and attach a basic WebSocket server:

```bash
npm i ws
```

```js
// after creating the HTTP server
import { attachWebSocket } from 'indjs/src/realtime/ws.mjs';
const { wss, broadcast } = await attachWebSocket({ server });
```

## 🗄️ Database Configuration

Set database in `indjs.config.js`:

```js
export default {
  database: {
    type: 'postgresql',
    url: process.env.DATABASE_URL
  }
};
```

Use the database API from `src/database/index.mjs`:

Endpoints:
- `POST /__indjs/ai/suggest`
- `POST /__indjs/ai/debug`

## 🌐 Edge Adapters (Vercel/Cloudflare)

Use built-in adapter stubs for serverless/edge runtimes.

- Vercel (Edge/Functions): `src/adapters/vercel.mjs`
  - Export default handler in your function entry:
  ```js
  import handler from 'indjs/src/adapters/vercel.mjs';
  export default handler;
  ```
  - Configure `vercel.json` routes to point to this entry.

- Cloudflare Workers: `src/adapters/cloudflare-workers.mjs`
  - Export a `fetch` handler via default export:
  ```js
  import worker from 'indjs/src/adapters/cloudflare-workers.mjs';
  export default worker;
  ```
  - Use Wrangler to build/deploy.

Note: These are stubs intended for customization (asset paths, bundling, env integration).

## 📦 Installing Optional DB Adapters

Install packages as needed:

```bash
# MySQL
npm i mysql2

# Redis
npm i ioredis

# Firebase (Firestore)
npm i firebase

## ⚡ Development: Vite HMR (Default)

New projects scaffolded with `indjs create` default to Vite for dev HMR.

- Config file: `indjs.config.js`
  ```js
  export default {
    experimental: { devBundler: 'vite' }
  };
  ```
- To turn off Vite HMR (use built-in dev):
  ```js
  export default {
    experimental: { devBundler: 'builtin' }
  };
  ```

## 📊 Metrics & Dashboard

In production (`indjs start`), the server exposes:
- `GET /__indjs/metrics` → JSON: uptime, requests, errors, cache hits/misses, avg latency
- `GET /__indjs/dashboard` → Minimal HTML dashboard with the above metrics

Cache metrics are automatically tracked for HTML cache (LRU or Redis store when configured).

## 🤖 AI CLI with Local Ollama

The AI CLI tries a local Ollama instance first. If unavailable, it falls back to built-in stubs.

Commands:
- Scaffold from prompt preview:
  ```bash
  indjs ai scaffold component Button
  # Output written to AI-OUTPUT.md (no files are changed)
  ```
- Generate docs preview:
  ```bash
  indjs ai docs
  # Output written to AI-DOCS.md
  ```
- Refactor suggestions in console:
  ```bash
  indjs ai refactor
  ```

Local Ollama expected endpoint: `http://localhost:11434/api/generate`

Optional: set a model
```bash
set OLLAMA_MODEL=llama3.1:8b  # Windows PowerShell: $env:OLLAMA_MODEL="llama3.1:8b"
```

Security note: production AI endpoints (`/__indjs/ai/*`) should be protected via `ai.secret` in `indjs.config.js`.
