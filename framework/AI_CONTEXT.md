# Project Context: INDJS Framework

**Context for AI Agent**:
You are assisting with **INDJS**, a custom-built, full-stack React meta-framework designed for **Universal Deployment**. It allows a single codebase to run as a **Web App** (SSR/SSG), **Desktop App** (Electron), and **Mobile App** (Capacitor), similar to Next.js or Expo but with a unified, opinionated core.

## 🎯 Project Goals
1.  **One Codebase, Everywhere**: Write React code once; deploy to Vercel (Web), Windows/macOS (Electron), and Play Store/App Store (Android/iOS).
2.  **Next.js-like Experience**: File-based routing (`pages/`), API routes (`pages/api/`), and SSR/SSG support.
3.  **Zero-Config Bundle**: Uses `esbuild` for speed and `Vite` for detailed dev experience (experimental).
4.  **Native Integration**: Built-in CLI commands to bridge the web app with Electron and Capacitor without manual boilerplate.

## 🏗 Architecture Overview

### 1. The Core Framework (`packages/indjs`)
This is the heart of the project. It operates as a CLI tool (`indjs`) that manages the lifecycle of the application.

*   **CLI (`src/cli.mjs`)**: Handles commands like `dev`, `build`, `start`, `desktop:dev`, `mobile:dev`.
*   **Build System (`src/build/index.mjs`)**:
    *   Uses **esbuild** to bundle server-side code.
    *   Generates a static build (`.indjs/static`) for distribution.
    *   Supports **Static Site Generation (SSG)** by rendering pages to HTML during build.
*   **Routing (`src/routing/routes.mjs`)**:
    *   Scans `pages/` directory.
    *   Supports dynamic routes (e.g., `pages/blog/[slug].jsx`).
    *   Separates UI pages from API routes (`pages/api/*`).
*   **Server-Side Rendering (`src/ssr/render.mjs`)**:
    *   Handles React streaming and string rendering.
    *   Supports nested layouts (`_layout.jsx`) and custom app wrappers (`_app.jsx`).
    *   Injects styles and scripts automatically.

### 2. The Universal App Structure
A typical app (like `apps/universal-demo`) looks like this:

```text
/
├── pages/                  # File-based routes
│   ├── index.jsx           # Home page
│   ├── about.jsx           # /about
│   ├── _layout.jsx         # Root layout (Web/Native wrapper)
│   └── api/                # Backend API routes
├── electron/               # Electron main process
│   └── main.cjs            # Window creation & protocol handling
├── android/                # Native Android (Capacitor)
├── capacitor.config.json   # Mobile config
└── indjs.config.js         # Framework config
```

### 3. Key Workflows

#### A. Web Development
*   **Command**: `indjs dev`
*   **Mechanism**: Starts a Node.js server with hot-reloading. Requests are processed via `ssr.mjs`, rendering React components on the fly.

#### B. Desktop (Electron)
*   **Command**: `indjs desktop:dev`
*   **Mechanism**:
    1.  Starts the Web Dev Server (localhost:3000).
    2.  Launches an Electron window (`electron/main.cjs`) pointing to localhost.
    3.  **Production**: `indjs desktop:build` builds static assets (`.indjs/static`) and bundles them into an executable.

#### C. Mobile (Android/iOS)
*   **Command**: `indjs mobile:dev` (or `android:dev`)
*   **Mechanism**:
    1.  Runs a "Metro-like" dev server on your LAN IP.
    2.  Updates `capacitor.config.json` to point the native app to this live server.
    3.  Syncs changes instantly without rebuilding the native binary.

## 💻 Tech Stack & Dependencies

*   **Runtime**: Node.js
*   **Frontend**: React 18, Tailwind CSS
*   **Bundler**: esbuild (Server), Vite (Client/Dev)
*   **Native**: Electron (Desktop), Capacitor (Mobile)
*   **Routing**: Custom file-system router
*   **Styling**: PostCSS + Tailwind (Built-in support)

## 🧩 Key Code Snippets for Context

**1. SSR Rendering (`src/ssr/render.mjs`):**
The framework walks up the directory tree to find `_layout.jsx` files and wraps the page component in them before rendering.

```javascript
// Simplified Logic
let content = <Component {...props} />;
for (const Layout of layoutComponents) {
  content = <Layout>{content}</Layout>;
}
return renderToString(content);
```

**2. Universal CLI (`src/cli.mjs`):**
The CLI detects the target platform and adjusts the build pipeline.

```javascript
case "mobile":
  // Starts a dev server accessible on LAN
  // Updates Capacitor config to point to http://<lan-ip>:3000
  // Launches Native Run
```

## 🚀 How to Help Me
When you analyze this project or write code for it:
1.  **Respect the "Universal" constraint**: UI components must use standard HTML/CSS (or Tailwind) that works in a WebView. Avoid browser-only APIs (like `window`) in SSR code without checks.
2.  **File-based Routing**: If I ask for a new page, create it in `pages/` and explain how it maps to a URL.
3.  **Native Awareness**: If adding a feature like "Camera", suggest using Capacitor plugins so it works on Mobile, not just Web APIs.
