# INDJS Framework

🚀 **A modern, fast, and lightweight full-stack React framework with file-based routing, SSR, and built-in optimizations**

[![npm version](https://badge.fury.io/js/indjs.svg)](https://badge.fury.io/js/indjs)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D16.0.0-brightgreen)](https://nodejs.org/)

## 🎯 What is INDJS?

INDJS is a modern full-stack React framework that provides everything you need to build production-ready web applications. Inspired by Next.js but designed to be more lightweight and flexible.

## ✨ Key Features

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

## 🚀 Quick Start

### Global Installation

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

## 📁 Project Structure

```
my-app/
├── pages/              # File-based routing
│   ├── index.jsx      # → /
│   ├── about.jsx      # → /about
│   └── api/           # API routes
│       └── hello.js   # → /api/hello
├── components/        # React components
├── styles/           # CSS and Tailwind styles
├── public/           # Static assets
└── package.json
```

## 🛠️ Development Workspace

This repository contains:

- `packages/indjs`: Core CLI and server framework
- `apps/hello`: Example application demonstrating features

## Features

- File-based routing: `pages/index.jsx` -> `/`, `pages/about.jsx` -> `/about`
- Dynamic routes: `pages/blog/[slug].jsx` -> `/blog/:slug`
- API routes: handlers in `pages/api/*` returning JSON
- SSR using React 18 and `renderToString`
- Optional layout and head: `pages/_layout.jsx`, `pages/_head.jsx`
- Client hydration: per-page client bundles generated to `/.indjs/client/pages/*`
- Static assets from `public/`

## App scripts

From repo root:

- `npm run dev`: Run example app in dev mode
- `npm run start`: Start built server
- `npm run build`: Build all workspaces (no-op for now)

## Conventions

- Page component default export is rendered on the server. Optional `export async function getServerSideProps(ctx)` returns `{ props }`.
- API route exports a function matching the HTTP method name: `export async function get(ctx)`, `post`, etc. `ctx` includes `{ req, res, params, query, body }`.
- Layout (`_layout.jsx`) wraps the page body. Head (`_head.jsx`) renders into `<head>`.
- Hydration: props are serialized into `window.__IND_PROPS__` and a per-route client bundle is injected automatically.

## 🚀 CLI Usage

From the `packages/indjs` directory:

```bash
# Show help
node bin/indjs.js --help

# Create a new project
node bin/indjs.js create my-app

# Generate code
node bin/indjs.js generate page about
node bin/indjs.js generate component Button
node bin/indjs.js generate api users

# Start development server (from project directory)
cd my-app
npm install
node ../bin/indjs.js dev --port 3000
```

## 📦 NPM Publication

The framework is ready for NPM publication:

```bash
cd packages/indjs
npm publish
```

After publication, users can install globally:

```bash
npm install -g indjs
indjs create my-app
indjs dev
```