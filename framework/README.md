<div align="center">

<img src="https://raw.githubusercontent.com/Rohitsharma6377/IND/main/docs/assets/logo.svg" alt="INDJS Logo" width="120" height="120" />

# 🚀 INDJS

### **The Ultimate Universal React Meta-Framework**

<h4><em>One Codebase. Every Platform. Zero Compromise.</em></h4>

<br />

[![npm version](https://img.shields.io/npm/v/indjs?style=for-the-badge&logo=npm&logoColor=white&color=CB3837)](https://www.npmjs.com/package/indjs)
[![License: MIT](https://img.shields.io/badge/License-MIT-22c55e.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-≥18-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18+-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Downloads](https://img.shields.io/npm/dm/indjs?style=for-the-badge&color=blue)](https://www.npmjs.com/package/indjs)

<br />

[📖 **Docs**](https://netcurion.vercel.app) &nbsp;•&nbsp; [🚀 **Quick Start**](#-quick-start) &nbsp;•&nbsp; [📱 **Universal Apps**](#-universal-deployment) &nbsp;•&nbsp; [🛠️ **CLI**](#-cli-commands) &nbsp;•&nbsp; [💬 **Discord**](https://discord.gg/indjs)

<br />

---

**Build for Web, Desktop & Mobile with a single React codebase**

<br />

| 🌐 **Web** | 💻 **Desktop** | 📱 **Mobile** |
|:----------:|:--------------:|:-------------:|
| SSR/SSG/ISR | Electron | Capacitor |
| Vercel, Netlify | Windows, macOS, Linux | iOS & Android |

<br />

</div>

---

<br />

## 🌟 Why Choose INDJS?

<table>
<tr>
<th width="50%">Feature</th>
<th width="25%">🚀 INDJS</th>
<th width="25%">Next.js</th>
</tr>
<tr>
<td><b>⚡ Zero Config Setup</b></td>
<td align="center">✅ Instant</td>
<td align="center">⚠️ Manual</td>
</tr>
<tr>
<td><b>📱 Universal Platform (Web + Desktop + Mobile)</b></td>
<td align="center">✅ Built-in</td>
<td align="center">❌ Not Available</td>
</tr>
<tr>
<td><b>🔐 Authentication System</b></td>
<td align="center">✅ JWT, OAuth, Sessions</td>
<td align="center">❌ External libs</td>
</tr>
<tr>
<td><b>🗄️ Database Integration</b></td>
<td align="center">✅ Multi-DB + Prisma</td>
<td align="center">❌ Manual setup</td>
</tr>
<tr>
<td><b>🧪 Testing Framework</b></td>
<td align="center">✅ Vitest + Playwright</td>
<td align="center">❌ Manual setup</td>
</tr>
<tr>
<td><b>🌐 WebSocket Support</b></td>
<td align="center">✅ Native</td>
<td align="center">❌ External libs</td>
</tr>
<tr>
<td><b>🤖 AI-Powered CLI</b></td>
<td align="center">✅ Ollama</td>
<td align="center">❌ None</td>
</tr>
<tr>
<td><b>📦 Bundle Size</b></td>
<td align="center">✅ ~2MB</td>
<td align="center">⚠️ ~10MB+</td>
</tr>
<tr>
<td><b>⚡ Build Speed</b></td>
<td align="center">✅ esbuild</td>
<td align="center">⚠️ Webpack</td>
</tr>
</table>

<br />

---

<br />

## ✨ Feature Highlights

<div align="center">

<table>
<tr>
<td align="center" width="25%">

### 🎯 Core
**File-based Routing**<br/>
**SSR / SSG / ISR**<br/>
**React 18 Streaming**<br/>
**API Routes**<br/>
**TypeScript First**

</td>
<td align="center" width="25%">

### 🎨 Styling
**Tailwind CSS**<br/>
**CSS Modules**<br/>
**Sass/SCSS**<br/>
**Image Optimization**<br/>
**Dark Mode**

</td>
<td align="center" width="25%">

### 🔐 Security
**JWT Auth**<br/>
**OAuth (Google, GitHub)**<br/>
**Session Management**<br/>
**RBAC**<br/>
**Helmet Headers**

</td>
<td align="center" width="25%">

### 🗄️ Database
**PostgreSQL**<br/>
**MongoDB**<br/>
**SQLite**<br/>
**Prisma ORM**<br/>
**Migrations**

</td>
</tr>
<tr>
<td align="center" width="25%">

### 🧪 Testing
**Vitest**<br/>
**Playwright E2E**<br/>
**React Testing Lib**<br/>
**Coverage Reports**<br/>
**Mock Utilities**

</td>
<td align="center" width="25%">

### 🚀 Deploy
**Vercel**<br/>
**Netlify**<br/>
**Docker**<br/>
**AWS Lambda**<br/>
**Static Export**

</td>
<td align="center" width="25%">

### ⚡ Performance
**esbuild Bundler**<br/>
**Code Splitting**<br/>
**Lazy Loading**<br/>
**Redis Caching**<br/>
**Gzip/Brotli**

</td>
<td align="center" width="25%">

### 🌐 Advanced
**WebSocket**<br/>
**GraphQL**<br/>
**Middleware**<br/>
**Plugins**<br/>
**PWA Support**

</td>
</tr>
</table>

</div>

<br />

### 📦 30+ Universal Components

```jsx
import { 
  View, Text, Button, TextInput, ScrollView, FlatList, Modal,
  Image, TouchableOpacity, SafeAreaView, ActivityIndicator, Switch,
  Pressable, KeyboardAvoidingView, TouchableHighlight, StatusBar
} from 'indjs';
```

<br />

---

<br />

## 🚀 Quick Start

<table>
<tr>
<td width="50%">

### Using npx (Recommended)

```bash
# Create a new project
npx indjs create my-app

# Navigate and start
cd my-app
npm run dev
```

</td>
<td width="50%">

### Using Global Install

```bash
# Install INDJS globally
npm install -g indjs

# Create a new project
indjs create my-app
cd my-app
npm run dev
```

</td>
</tr>
</table>

<div align="center">

Your app is running at **http://localhost:3000** 🎉

</div>

<br />

---

## 📁 Project Structure

```
my-app/
├── 📄 indjs.config.js         # Framework configuration
├── 📄 tailwind.config.cjs     # Tailwind CSS config
├── 📄 package.json
│
├── 📂 pages/                   # 🔀 File-based routing
│   ├── 📄 _app.jsx            # App wrapper
│   ├── 📄 _layout.jsx         # Persistent layout
│   ├── 📄 index.jsx           # → /
│   ├── 📄 about.jsx           # → /about
│   ├── 📂 blog/
│   │   ├── 📄 index.jsx       # → /blog
│   │   └── 📄 [slug].jsx      # → /blog/:slug (dynamic)
│   └── 📂 api/
│       ├── 📄 hello.js        # → /api/hello
│       └── 📄 users.js        # → /api/users
│
├── 📂 components/              # ♻️ Reusable components
├── 📂 styles/                  # 🎨 Global styles
│   └── 📄 globals.css
└── 📂 public/                  # 📦 Static assets
```

<br />

---

## 🛠️ CLI Commands

<table>
<tr>
<th>Command</th>
<th>Description</th>
</tr>
<tr>
<td><code>indjs dev</code></td>
<td>🔥 Start development server with HMR</td>
</tr>
<tr>
<td><code>indjs build</code></td>
<td>📦 Build for production</td>
</tr>
<tr>
<td><code>indjs start</code></td>
<td>🚀 Start production server</td>
</tr>
<tr>
<td><code>indjs create &lt;name&gt;</code></td>
<td>✨ Create a new project</td>
</tr>
<tr>
<td><code>indjs generate page &lt;name&gt;</code></td>
<td>📄 Generate a new page</td>
</tr>
<tr>
<td><code>indjs generate component &lt;name&gt;</code></td>
<td>🧩 Generate a component</td>
</tr>
<tr>
<td><code>indjs generate api &lt;name&gt;</code></td>
<td>🔌 Generate API route</td>
</tr>
<tr>
<td><code>indjs deploy vercel</code></td>
<td>☁️ Deploy to Vercel</td>
</tr>
<tr>
<td><code>indjs desktop dev</code></td>
<td>💻 Run Electron dev mode</td>
</tr>
<tr>
<td><code>indjs mobile dev</code></td>
<td>📱 Run Capacitor live reload</td>
</tr>
<tr>
<td><code>indjs ai scaffold &lt;type&gt; &lt;name&gt;</code></td>
<td>🤖 AI-powered code generation</td>
</tr>
<tr>
<td><code>indjs test</code></td>
<td>🧪 Run tests with Vitest</td>
</tr>
</table>

<br />

---

## 📖 Code Examples

<details>
<summary><b>📄 Page with Data Fetching (SSR)</b></summary>

```jsx
// pages/posts.jsx
export default function Posts({ posts }) {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Blog Posts</h1>
      <div className="grid gap-4">
        {posts.map(post => (
          <article key={post.id} className="p-4 border rounded-lg hover:shadow-lg">
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p className="text-gray-600">{post.excerpt}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

// Server-Side Rendering
export async function getServerSideProps({ params }) {
  const posts = await fetch('https://api.example.com/posts').then(r => r.json());
  return { props: { posts } };
}
```

</details>

<details>
<summary><b>🔄 Static Generation with ISR</b></summary>

```jsx
// pages/blog/[slug].jsx
export default function BlogPost({ post }) {
  return (
    <article className="prose lg:prose-xl mx-auto">
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  );
}

export async function getStaticPaths() {
  const posts = await fetchAllPosts();
  return {
    paths: posts.map(post => ({ params: { slug: post.slug } })),
    fallback: 'blocking'
  };
}

export async function getStaticProps({ params }) {
  const post = await fetchPost(params.slug);
  return {
    props: { post },
    revalidate: 60 // Regenerate every 60 seconds
  };
}
```

</details>

<details>
<summary><b>🔌 API Routes</b></summary>

```javascript
// pages/api/users.js

export async function GET({ req, res }) {
  const users = await db.users.findMany();
  return { users };
}

export async function POST({ req, body }) {
  const user = await db.users.create({ data: body });
  return { user, status: 201 };
}

export async function PUT({ params, body }) {
  const user = await db.users.update({
    where: { id: params.id },
    data: body
  });
  return { user };
}

export async function DELETE({ params }) {
  await db.users.delete({ where: { id: params.id } });
  return { success: true };
}
```

</details>

<details>
<summary><b>🔐 Authentication</b></summary>

```javascript
import { hashPassword, verifyPassword, generateToken, requireAuth } from 'indjs/auth';

// Register user
export async function POST({ body }) {
  const hash = await hashPassword(body.password);
  const user = await db.users.create({
    data: { email: body.email, password: hash }
  });
  const token = generateToken({ userId: user.id });
  return { user, token };
}

// Protected route middleware
export const middleware = requireAuth({ roles: ['admin'] });
```

</details>

<details>
<summary><b>🗄️ Database Integration</b></summary>

```javascript
import { Database } from 'indjs/database';

const db = new Database({ 
  type: 'postgresql', 
  url: process.env.DATABASE_URL 
});

await db.connect();

// Query
const users = await db.query('users')
  .where({ active: true })
  .orderBy('createdAt', 'desc')
  .limit(10);

// Insert
const newUser = await db.insert('users', { 
  name: 'John Doe',
  email: 'john@example.com' 
});
```

</details>

<details>
<summary><b>📱 Universal Component</b></summary>

```jsx
import { 
  View, Text, Button, TextInput, 
  ScrollView, SafeAreaView 
} from 'indjs';

export default function ContactForm() {
  const [name, setName] = useState('');
  
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="p-6">
        <Text className="text-2xl font-bold mb-6">Contact Us</Text>
        
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="Your name"
          className="border border-gray-300 p-3 rounded-lg mb-4"
        />
        
        <Button 
          title="Submit" 
          onPress={() => console.log('Submitted:', name)}
          className="bg-blue-500 py-3 rounded-lg"
        />
      </ScrollView>
    </SafeAreaView>
  );
}
```

</details>

<br />

---

## 📱 Universal Deployment

<div align="center">

<table>
<tr>
<td align="center" width="33%">

### 🌐 Web

```bash
# Build and deploy to Vercel
indjs build
indjs deploy vercel
```

**Platforms:** Vercel, Netlify, AWS, Docker

</td>
<td align="center" width="33%">

### 💻 Desktop

```bash
# Development
indjs desktop dev

# Production build
indjs desktop build
```

**Platforms:** Windows, macOS, Linux

</td>
<td align="center" width="33%">

### 📱 Mobile

```bash
# Initialize Capacitor
npx cap init

# Build and run
indjs mobile build
indjs mobile android
```

**Platforms:** iOS, Android

</td>
</tr>
</table>

</div>

<br />

---

## ⚙️ Configuration

```javascript
// indjs.config.js
export default {
  // Server Configuration
  server: {
    port: 3000,
    cors: { enabled: true, origin: '*' },
  },
  
  // Build Options
  build: {
    target: 'es2020',
    minify: true,
    sourcemap: true,
  },
  
  // Experimental Features
  experimental: {
    streaming: true,       // SSR streaming
    devBundler: 'vite',    // Use Vite in dev
  },
  
  // Caching (Memory or Redis)
  caching: {
    store: 'memory',       // 'memory' | 'redis'
    ttl: 30,               // seconds
  },
  
  // Authentication
  auth: {
    secret: process.env.JWT_SECRET,
    expiresIn: '7d',
  },
  
  // Database
  database: {
    type: 'postgresql',
    url: process.env.DATABASE_URL,
  },
};
```

<br />

---

## � Performance Dashboard

Access built-in metrics at `/__indjs/dashboard`:

<table>
<tr>
<td>📈 Request Count & Latency</td>
<td>💾 Cache Hit/Miss Ratio</td>
<td>⚠️ Error Tracking</td>
<td>🕐 Server Uptime</td>
</tr>
</table>

<br />

---

## 🤝 Contributing

We welcome contributions! See our [Contributing Guide](./docs/reports/CONTRIBUTING.md).

```bash
# Clone the repo
git clone https://github.com/Rohitsharma6377/IND.git

# Install dependencies  
cd IND/framework && npm install

# Run development
npm run dev
```

<br />

---

## 📄 License

<div align="center">

**MIT License © 2025-2026**

[Rohit Sharma](https://github.com/Rohitsharma6377) & INDJS Team

</div>

<br />

---

<div align="center">

<br />

## 🌟 Give us a Star!

If **INDJS** helped you, please consider giving us a star on GitHub ⭐

<br />

[![GitHub stars](https://img.shields.io/github/stars/Rohitsharma6377/IND?style=for-the-badge&logo=github&color=yellow)](https://github.com/Rohitsharma6377/IND)
[![GitHub forks](https://img.shields.io/github/forks/Rohitsharma6377/IND?style=for-the-badge&logo=github&color=blue)](https://github.com/Rohitsharma6377/IND/fork)

<br />

---

<br />

**Built with ❤️ by the INDJS Team**

<br />

[🌐 Website](https://netcurion.vercel.app) &nbsp;•&nbsp; [📦 NPM](https://www.npmjs.com/package/indjs) &nbsp;•&nbsp; [💬 Discord](https://discord.gg/indjs) &nbsp;•&nbsp; [🐦 Twitter](https://twitter.com/Netcurion) &nbsp;•&nbsp; [📧 Contact](mailto:netcurion@outlook.com)

<br />

<sub>Made in 🇮🇳 India</sub>

</div>