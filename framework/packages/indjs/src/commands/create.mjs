import fs from 'fs/promises';
import path from 'path';
import chalk from 'chalk';
import ora from 'ora';
import inquirer from 'inquirer';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const templates = {
  basic: {
    name: 'Basic App',
    description: 'A minimal INDJS application with essential files'
  },
  universal: {
    name: 'Universal App',
    description: 'Web + Mobile (iOS/Android) + Desktop (Electron) from one codebase'
  },
  'todo-app': {
    name: 'Todo App Template',
    description: 'Complete cross-platform Todo app with beautiful UI'
  },
  'fullstack-saas': {
    name: 'Fullstack SaaS',
    description: 'SaaS starter with Authentication and Database setup'
  }
};

export async function create({ name, template, root, language, state, useTailwind } = {}) {
  // Prompt for missing inputs
  const answers = await inquirer.prompt([
    ...(name ? [] : [{
      type: 'input',
      name: 'name',
      message: 'Project name:',
      default: 'my-indjs-app',
      validate: (v) => v.trim() ? true : 'Name is required'
    }]),
    ...(template ? [] : [{
      type: 'list',
      name: 'template',
      message: 'Select a template:',
      choices: Object.keys(templates)
    }]),
    ...(language ? [] : [{
      type: 'list',
      name: 'language',
      message: 'Language:',
      choices: [
        { name: 'JavaScript', value: 'js' },
        { name: 'TypeScript', value: 'ts' }
      ],
      default: 'js'
    }]),
    ...(state ? [] : [{
      type: 'list',
      name: 'state',
      message: 'State management:',
      choices: [
        { name: 'None', value: 'none' },
        { name: 'Redux Toolkit', value: 'rtk' }
      ],
      default: 'none'
    }]),
    ...(useTailwind !== undefined ? [] : [{
      type: 'confirm',
      name: 'useTailwind',
      message: 'Include Tailwind CSS?',
      default: true
    }])
  ]);

  name = name ?? answers.name;
  template = template ?? answers.template;
  const opts = {
    language: language ?? answers.language,
    state: state ?? answers.state,
    useTailwind: useTailwind ?? answers.useTailwind
  };
  const projectRoot = root ?? process.cwd();
  const appPath = path.resolve(projectRoot, name);

  const spinner = ora(`Creating ${templates[template]?.name || template}: ${name}...`).start();
  try {
    // Create root dir
    await fs.mkdir(appPath, { recursive: true });

    // Basic structure and files
    await createDirectoryStructure(appPath, template);
    await createPackageJson(appPath, name, opts, template);
    await createConfigFiles(appPath, opts);
    await createPages(appPath, template, opts);
    await createComponents(appPath, template, opts);
    if (opts.useTailwind !== false) {
      await createStyles(appPath);
    }
    await createAppShell(appPath, opts);
    await createGitignore(appPath);
    await createPublicAssets(appPath);

    if (template === 'desktop-electron' || template === 'universal' || template === 'todo-app') {
      // Robust Electron Setup
      const mainCjs = `const { app, BrowserWindow, screen } = require('electron');
const serve = require('electron-serve');
const path = require('path');

const isDev = !app.isPackaged;
const loadURL = serve({ directory: '.indjs/static' });

let mainWindow;

function createWindow() {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;
  mainWindow = new BrowserWindow({
    width: Math.min(1280, width),
    height: Math.min(800, height),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.cjs')
    }
  });

  if (isDev) {
    mainWindow.loadURL('http://localhost:3000');
    mainWindow.webContents.openDevTools();
  } else {
    loadURL(mainWindow);
  }
  
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (mainWindow === null) createWindow();
});
`;

      const preloadCjs = `const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  send: (channel, data) => {
    // whitelist channels
    let validChannels = ['toMain'];
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel, data);
    }
  },
  receive: (channel, func) => {
    let validChannels = ['fromMain'];
    if (validChannels.includes(channel)) {
      // Deliberately strip event as it includes sender 
      ipcRenderer.on(channel, (event, ...args) => func(...args));
    }
  }
});
`;
      // Ensure directory exists
      await fs.mkdir(path.join(appPath, 'electron'), { recursive: true });
      await fs.writeFile(path.join(appPath, 'electron', 'main.cjs'), mainCjs);
      await fs.writeFile(path.join(appPath, 'electron', 'preload.cjs'), preloadCjs);
    }

    if (template === 'mobile-capacitor' || template === 'universal' || template === 'todo-app') {
      await createMobileConfigs(appPath, opts);
    }

    spinner.succeed(chalk.green(`✅ Successfully created ${name}`));
    console.log('\n' + chalk.blue.bold('🎉 Your INDJS application is ready!'));
    console.log('\nNext steps:');
    console.log(chalk.cyan(`  cd ${name}`));
    console.log(chalk.cyan('  npm install'));
    console.log(chalk.cyan('  npm run dev'));
    console.log('\nHappy coding! 🚀\n');
  } catch (error) {
    spinner.fail(chalk.red('Failed to create application'));
    console.error(error.message);
    process.exit(1);
  }
}

async function createMobileConfigs(appPath, opts) {
  // Capacitor config
  const appId = `com.indjs.${path.basename(appPath).toLowerCase().replace(/[^a-z0-9]/g, '')}`;
  const appName = path.basename(appPath);

  const capConfig = {
    appId: appId,
    appName: appName,
    webDir: '.indjs/static',
    server: {
      androidScheme: 'https'
    }
  };

  await fs.writeFile(
    path.join(appPath, 'capacitor.config.json'),
    JSON.stringify(capConfig, null, 2)
  );

  // Setup scripts for android
  const scriptsDir = path.join(appPath, 'scripts');
  await fs.mkdir(scriptsDir, { recursive: true });

  // Robust setup-android.js script
  const setupAndroid = `const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🤖 Setting up Android environment...');

try {
  // 1. Initialize capacitor if not done (usually done by create-indjs, but safe to retry)
  // We assume 'npx cap init' was run or config exists.
  
  // 2. Add android platform if missing
  if (!fs.existsSync(path.join(__dirname, '../android'))) {
    console.log('📦 Adding Android platform...');
    execSync('npx cap add android', { stdio: 'inherit', cwd: path.join(__dirname, '..') });
  }

  // 3. Patch build.gradle for Java 17
  const buildGradlePath = path.join(__dirname, '../android/app/build.gradle');
  if (fs.existsSync(buildGradlePath)) {
    console.log('🔧 Patching build.gradle for Java 17...');
    let content = fs.readFileSync(buildGradlePath, 'utf8');
    
    if (!content.includes('sourceCompatibility JavaVersion.VERSION_17')) {
      content = content.replace(
        /sourceCompatibility JavaVersion.VERSION_1_8/g,
        'sourceCompatibility JavaVersion.VERSION_17'
      ).replace(
        /targetCompatibility JavaVersion.VERSION_1_8/g,
        'targetCompatibility JavaVersion.VERSION_17'
      );
      
      // If it wasn't valid 1_8, try to find the block and force it
      if (!content.includes('JavaVersion.VERSION_17')) {
         // Fallback replacement if 1_8 regex didn't match
         content = content.replace(/compileOptions \\{([\\s\\S]*?)\\}/, 
           'compileOptions {\\n        sourceCompatibility JavaVersion.VERSION_17\\n        targetCompatibility JavaVersion.VERSION_17\\n    }');
      }
      
      fs.writeFileSync(buildGradlePath, content, 'utf8');
      console.log('✅ build.gradle patched.');
    } else {
      console.log('✨ build.gradle already uses Java 17');
    }
  }

  // 4. Update variables.gradle to ensure compatibility
  const varGradlePath = path.join(__dirname, '../android/variables.gradle');
  if (fs.existsSync(varGradlePath)) {
     // Ensure minSdk is high enough if needed, currently 22 is default in Cap 5/6
  }

  console.log('✅ Android setup complete! Run "npm run android:dev" to start.');

} catch (e) {
  console.error('❌ Android setup failed:', e.message);
  process.exit(1);
}
`;

  await fs.writeFile(path.join(scriptsDir, 'setup-android.cjs'), setupAndroid);
}


async function createDirectoryStructure(appPath, template) {
  const dirs = [
    'pages',
    'pages/api',
    'components',
    'styles',
    'public',
    'data',
    'utils',
    'hooks',
    'store'
  ];

  if (template === 'blog') {
    dirs.push('content', 'content/posts');
  }

  if (template === 'ecommerce') {
    dirs.push('lib', 'lib/stripe', 'components/ui', 'components/product');
  }

  if (template === 'admin') {
    dirs.push('components/charts', 'components/tables', 'lib/auth');
  }

  if (template === 'ai-app') {
    dirs.push('ai', 'pages/api/ai');
  }

  if (template === 'fullstack-saas') {
    dirs.push('pages/api/auth', 'lib/db');
  }

  if (template === 'universal' || template === 'todo-app') {
    dirs.push('electron', 'lib');
  }

  for (const dir of dirs) {
    await fs.mkdir(path.join(appPath, dir), { recursive: true });
  }
}

async function createPackageJson(appPath, name, opts, template) {
  const isTS = opts?.language === 'ts';
  const useTailwind = opts?.useTailwind !== false;
  const useRTK = opts?.state === 'rtk';
  const packageJson = {
    name: name.toLowerCase().replace(/\s+/g, '-'),
    version: '0.1.0',
    private: true,
    type: 'module',
    scripts: {
      dev: 'indjs dev',
      build: 'indjs build',
      start: 'indjs start',
      test: 'indjs test'
    },
    dependencies: {
      indjs: '^2.0.24',
      react: '^18.2.0',
      'react-dom': '^18.2.0',
      ...(useRTK ? { '@reduxjs/toolkit': '^2.3.0', 'react-redux': '^9.1.2' } : {})
    },
    devDependencies: {
      ...(isTS ? { '@types/react': '^18.2.0', '@types/react-dom': '^18.2.0', typescript: '^5.0.0' } : {}),
      vite: '^5.4.0',
      '@vitejs/plugin-react': '^4.3.0',
      ...(useTailwind ? { tailwindcss: '^3.4.18', autoprefixer: '^10.4.21' } : {})
    }
  };

  // Extend scripts/deps for cross-platform targets
  if (template === 'desktop-electron') {
    packageJson.main = 'main.cjs';
    packageJson.devDependencies = {
      ...packageJson.devDependencies,
      electron: '^28.0.0',
      concurrently: '^8.2.2',
      'wait-on': '^7.2.0',
      'cross-env': '^7.0.3'
    };
    packageJson.scripts = {
      ...packageJson.scripts,
      'desktop:dev': 'cross-env PORT=3005 concurrently "indjs dev --port %PORT%" "wait-on http://localhost:%PORT% && electron ."',
      'desktop:start': 'cross-env PORT=3005 concurrently "indjs start --port %PORT%" "electron ."'
    };
  }

  // Mobile / Universal / Todo-App Scripts & Deps
  const isMobile = template === 'mobile-capacitor' || template === 'universal' || template === 'todo-app';
  const isDesktop = template === 'desktop-electron' || template === 'universal' || template === 'todo-app';

  if (isDesktop && template !== 'desktop-electron') {
    packageJson.main = 'electron/main.cjs';
    packageJson.devDependencies = {
      ...packageJson.devDependencies,
      electron: '^28.0.0',
      'electron-builder': '^24.9.1',
      concurrently: '^8.2.2',
      'wait-on': '^7.2.0',
      'cross-env': '^7.0.3'
    };
    packageJson.dependencies = {
      ...packageJson.dependencies,
      'electron-serve': '^1.3.0'
    };

    // Add desktop scripts
    Object.assign(packageJson.scripts, {
      'desktop:dev': 'concurrently -k "indjs dev" "wait-on http://localhost:3000 && electron ."',
      'desktop:build': 'indjs build && electron-builder',
      'desktop:build:all': 'indjs build && electron-builder -mwl',
      'desktop:build:win': 'indjs build && electron-builder --win',
      'desktop:build:mac': 'indjs build && electron-builder --mac',
      'desktop:build:linux': 'indjs build && electron-builder --linux',
    });

    // Add build config
    packageJson.build = {
      appId: `com.indjs.${name.replace(/-/g, '')}`,
      productName: name,
      directories: { output: 'dist/electron' },
      files: [
        '.indjs/static/**/*',
        'electron/**/*',
        'package.json'
      ],
      win: { target: ['nsis'], icon: 'assets/icon.ico' },
      mac: { target: ['dmg'], icon: 'assets/icon.icns' },
      linux: { target: ['AppImage', 'deb'], icon: 'assets/icon.png' }
    };
  }

  if (isMobile) {
    packageJson.dependencies = {
      ...packageJson.dependencies,
      '@capacitor/core': '^6.0.0',
      '@capacitor/app': '^6.0.0',
      '@capacitor/preferences': '^6.0.0',
      '@capacitor/android': '^6.0.0',
      '@capacitor/ios': '^6.0.0'
    };
    packageJson.devDependencies = {
      ...packageJson.devDependencies,
      '@capacitor/cli': '^6.0.0'
    };

    Object.assign(packageJson.scripts, {
      'android:setup': 'node scripts/setup-android.cjs',
      'android:build': 'npm run build && npx cap sync android',
      'android:sync': 'npx cap sync android',
      'android:open': 'npx cap open android',
      'android:run': 'npx cap run android',
      'android:dev': 'npm run build && npx cap sync android && npx cap run android',
      'android:logs': 'adb logcat',
      'ios:setup': `npx cap init "${name}" "com.indjs.${name.replace(/-/g, '')}" --web-dir=.indjs/static && npx cap add ios`,
      'ios:open': 'npx cap open ios',
      'mobile:setup': 'npm run android:setup',
      'mobile:dev': 'npm run android:dev',
      'mobile:build': 'npm run android:build',
      'mobile:run': 'npm run android:run'
    });
  }

  if (template === 'universal' || template === 'todo-app') {
    packageJson.scripts['build:all'] = 'npm run build && npm run desktop:build:all && npm run mobile:build';
  }

  await fs.writeFile(
    path.join(appPath, 'package.json'),
    JSON.stringify(packageJson, null, 2)
  );
}

async function createConfigFiles(appPath, opts) {
  const isTS = opts?.language === 'ts';
  // TypeScript config
  const tsConfig = {
    compilerOptions: {
      target: 'es5',
      lib: ['dom', 'dom.iterable', 'es6'],
      allowJs: true,
      skipLibCheck: true,
      strict: true,
      forceConsistentCasingInFileNames: true,
      noEmit: true,
      esModuleInterop: true,
      module: 'esnext',
      moduleResolution: 'node',
      resolveJsonModule: true,
      isolatedModules: true,
      jsx: 'preserve',
      incremental: true,
      baseUrl: '.',
      paths: {
        '@/*': ['./*']
      }
    },
    include: ['**/*.ts', '**/*.tsx'],
    exclude: ['node_modules', '.indjs']
  };
  if (isTS) {
    await fs.writeFile(
      path.join(appPath, 'tsconfig.json'),
      JSON.stringify(tsConfig, null, 2)
    );
  }

  // Tailwind config
  if (opts?.useTailwind !== false) {
    const tailwindConfig = `/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}`;

    await fs.writeFile(path.join(appPath, 'tailwind.config.cjs'), tailwindConfig);

    // PostCSS config
    const postCssConfig = `module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}`;
    await fs.writeFile(path.join(appPath, 'postcss.config.cjs'), postCssConfig);
  }

  // Environment variables
  const envExample = `# Database
DATABASE_URL=

# Authentication
JWT_SECRET=your-secret-key
NEXTAUTH_SECRET=your-nextauth-secret

# External APIs
STRIPE_SECRET_KEY=
STRIPE_PUBLISHABLE_KEY=

# Email
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=
`;

  await fs.writeFile(path.join(appPath, '.env.example'), envExample);

  // INDJS config - enable Vite by default
  const indjsConfig = `export default {
  experimental: { devBundler: 'vite' }
};
`;
  await fs.writeFile(path.join(appPath, 'indjs.config.js'), indjsConfig);
}

async function createPages(appPath, template, opts) {
  const ext = opts?.language === 'ts' ? 'tsx' : 'jsx';
  // Index page
  const indexPage = `import React from 'react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-gray-900 mb-4">
            Welcome to <span className="text-indigo-600">INDJS</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            The modern full-stack React framework
          </p>
          <div className="space-x-4">
            <a
              href="/about"
              className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Learn More
            </a>
            <a
              href="/api/hello"
              className="inline-block bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Test API
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  return {
    props: {
      timestamp: new Date().toISOString()
    }
  };
}`;

  await fs.writeFile(path.join(appPath, 'pages', `index.${ext}`), indexPage);

  // About page
  const aboutPage = `import React from 'react';

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">About INDJS</h1>
        <div className="prose max-w-none">
          <p className="text-lg text-gray-600 mb-6">
            INDJS is a modern, fast, and lightweight full-stack React framework
            that provides everything you need to build production-ready web applications.
          </p>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Features</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            <li>File-based routing</li>
            <li>Server-side rendering (SSR)</li>
            <li>Static site generation (SSG)</li>
            <li>API routes</li>
            <li>Built-in TypeScript support</li>
            <li>Tailwind CSS integration</li>
            <li>Hot module replacement</li>
            <li>Image optimization</li>
          </ul>
        </div>
      </div>
    </div>
  );
}`;

  await fs.writeFile(path.join(appPath, 'pages', `about.${ext}`), aboutPage);

  // API route
  const apiHello = `export async function get({ req, res }) {
  return {
    message: 'Hello from INDJS API!',
    timestamp: new Date().toISOString(),
    method: req.method,
    userAgent: req.headers['user-agent']
  };
}

export async function post({ req, res, body }) {
  return {
    message: 'Data received!',
    data: body,
    timestamp: new Date().toISOString()
  };
}`;

  await fs.writeFile(path.join(appPath, 'pages', 'api', 'hello.js'), apiHello);

  // Layout
  const layout = `import React from 'react';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <a href="/" className="text-xl font-bold text-indigo-600">
              INDJS App
            </a>
            <div className="space-x-4">
              <a href="/" className="text-gray-600 hover:text-gray-900">
                Home
              </a>
              <a href="/about" className="text-gray-600 hover:text-gray-900">
                About
              </a>
            </div>
          </div>
        </div>
      </nav>
      <main>{children}</main>
      <footer className="bg-gray-800 text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 INDJS App. Built with INDJS Framework.</p>
        </div>
      </footer>
    </div>
  );
}`;

  await fs.writeFile(path.join(appPath, 'pages', `_layout.${ext}`), layout);

  // Template-specific additions
  if (template === 'admin') {
    const adminPage = `import React, { useEffect, useState } from 'react';

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch('/api/users').then(r => r.json()).then(j => setUsers(j.users || [])).catch(() => { });
  }, []);
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <a href="/" className="btn btn-secondary">Back to site</a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border rounded-lg p-4 bg-white shadow-sm">
            <h2 className="font-semibold mb-2">Traffic (Last 7 days)</h2>
            <svg viewBox="0 0 300 120" className="w-full h-40">
              <polyline fill="none" stroke="#4F46E5" strokeWidth="3" points="0,90 40,80 80,60 120,70 160,50 200,40 240,45 280,30" />
              <line x1="0" y1="100" x2="300" y2="100" stroke="#e5e7eb" />
              <line x1="0" y1="60" x2="300" y2="60" stroke="#f3f4f6" />
            </svg>
          </div>
          <div className="border rounded-lg p-4 bg-white shadow-sm overflow-x-auto">
            <div className="flex items-center justify-between mb-2">
              <h2 className="font-semibold">Recent Users</h2>
              <a href="/api/users" className="text-indigo-600 text-sm">API</a>
            </div>
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500">
                  <th className="py-2 pr-4">Name</th>
                  <th className="py-2 pr-4">Email</th>
                  <th className="py-2">Role</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={String(u.id)} className="border-t">
                    <td className="py-2 pr-4">{u.name}</td>
                    <td className="py-2 pr-4">{u.email}</td>
                    <td className="py-2">{u.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}`;
    await fs.writeFile(path.join(appPath, 'pages', `admin.${ext}`), adminPage);
    // Users API stub to complement table
    const apiUsers = `export async function get() {
  return {
    users: [
      { id: 1, name: 'Alice', email: 'alice@example.com', role: 'Admin' },
      { id: 2, name: 'Bob', email: 'bob@example.com', role: 'Editor' }
    ]
  };
}`;
    await fs.writeFile(path.join(appPath, 'pages', 'api', 'users.js'), apiUsers);
  }

  if (template === 'ecommerce') {
    const productsPage = `import React, { useEffect, useState } from 'react';

export default function Products() {
  const items = [
    { id: 1, name: 'Product A', price: 19.99 },
    { id: 2, name: 'Product B', price: 29.99 }
  ];
  const [cart, setCart] = useState([]);
  useEffect(() => {
    try { const saved = JSON.parse(localStorage.getItem('cart') || '[]'); setCart(saved); } catch { }
  }, []);
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);
  function addToCart(item) {
    setCart(prev => [...prev, { ...item, qty: 1 }]);
  }
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Products</h1>
          <a href="/cart" className="inline-flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">View Cart ({cart.length})</a>
        </div>
        <ul className="space-y-2">
          {items.map(i => (
            <li key={i.id} className="flex items-center justify-between">
              <div>
                <a className="text-indigo-600" href={'/product/' + i.id}>{i.name}</a>
                <span className="ml-2 text-gray-600">\${i.price.toFixed(2)}</span>
              </div>
              <button className="btn btn-primary" onClick={() => addToCart(i)}>Add to cart</button>
            </li>
          ))}
        </ul>
        <div className="mt-8 border rounded-lg p-4 bg-white shadow-sm">
          <h2 className="font-semibold mb-2">Cart ({cart.length})</h2>
          {cart.length === 0 ? (
            <p className="text-gray-600">Your cart is empty.</p>
          ) : (
            <>
              <ul className="space-y-1">
                {cart.map((c, idx) => (
                  <li key={idx} className="flex justify-between">
                    <span>{c.name}</span>
                    <span>\${c.price.toFixed(2)}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-2 font-semibold">Total: \${total.toFixed(2)}</div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}`;
    const productDynamic = `export default function Product({params}) {
  return (
      <div className="container mx-auto px-4 py-16">
        Product ID: {params?.id}
      </div>
      );
}`;
    await fs.writeFile(path.join(appPath, 'pages', `products.${ext}`), productsPage);
    await fs.writeFile(path.join(appPath, 'pages', 'product', `[id].${ext}`), productDynamic);
    // Cart page reading from localStorage
    const cartPage = `import React, {useEffect, useState} from 'react';

      export default function Cart(){
  const [cart, setCart] = useState([]);
  useEffect(() => {
    try { const saved = JSON.parse(localStorage.getItem('cart') || '[]'); setCart(saved); } catch { }
  }, []);
  const total = cart.reduce((s, i) => s + i.price * (i.qty||1), 0);
      return (
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
        {cart.length === 0 ? (
          <p className="text-gray-600">Your cart is empty.</p>
        ) : (
          <>
            <ul className="space-y-1">
              {cart.map((c, idx) => (
                <li key={idx} className="flex justify-between">
                  <span>{c.name}</span>
                  <span>\${(c.price * (c.qty||1)).toFixed(2)}</span>
                </li>
              ))}
            </ul>
            <div className="mt-2 font-semibold">Total: \${total.toFixed(2)}</div>
          </>
        )}
      </div>
      );
}`;
    await fs.writeFile(path.join(appPath, 'pages', `cart.${ext}`), cartPage);
  }

  if (template === 'ai-app') {
    const aiPage = `import React, {useState} from 'react';

      export default function AIPlayground(){
  const [text, setText] = useState('');
      const [out, setOut] = useState('');
      async function suggest(){
    const res = await fetch('/__indjs/ai/suggest', {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({text}) });
      const j = await res.json(); setOut(JSON.stringify(j, null, 2));
  }
      return (
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold mb-6">AI Playground</h1>
        <textarea className="w-full border rounded p-2" rows={6} value={text} onChange={e => setText(e.target.value)} />
        <div className="mt-4 flex gap-2">
          <button className="btn btn-primary" onClick={suggest}>Suggest</button>
        </div>
        <pre className="mt-4 bg-gray-100 p-3 rounded">{out}</pre>
      </div>
      );
}`;
    const aiApi = `export async function post({body}) { return {ok: true, echo: body||{ } }; }`;
    await fs.mkdir(path.join(appPath, 'pages', 'api', 'ai'), { recursive: true });
    await fs.writeFile(path.join(appPath, 'pages', `ai.${ext}`), aiPage);
    await fs.writeFile(path.join(appPath, 'pages', 'api', 'ai', 'echo.js'), aiApi);
  }

  if (template === 'todo-app') {
    const todoPage = `import React, {useState, useEffect} from 'react';

      export default function TodoApp() {
  const [todos, setTodos] = useState([]);
      const [input, setInput] = useState('');
      const [filter, setFilter] = useState('all');

  useEffect(() => {
    const saved = localStorage.getItem('todos');
      if (saved) setTodos(JSON.parse(saved));
  }, []);

  useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const add = (e) => {
        e.preventDefault();
      if (!input.trim()) return;
      setTodos([...todos, {id: Date.now(), text: input, done: false }]);
      setInput('');
  };

  const toggle = (id) => setTodos(todos.map(t => t.id === id ? {...t, done: !t.done } : t));
  const del = (id) => setTodos(todos.filter(t => t.id !== id));
  
  const filtered = todos.filter(t =>
      filter === 'active' ? !t.done : filter === 'completed' ? t.done : true
      );

      return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 p-8">
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">My Tasks</h1>

          <form onSubmit={add} className="flex gap-4 mb-8">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              className="flex-1 px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="What needs to be done?"
            />
            <button className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition">
              Add
            </button>
          </form>

          <div className="flex gap-2 mb-6">
            {['all', 'active', 'completed'].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={\`px-4 py-2 rounded-lg font-medium transition \${
              filter === f ? 'bg-indigo-100 text-indigo-700' : 'text-gray-500 hover:bg-gray-50'
            }\`}
            >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
          ))}
        </div>

        <div className="space-y-3">
          {filtered.map(t => (
            <div key={t.id} className="group flex items-center gap-4 p-4 hover:bg-gray-50 rounded-xl transition">
              <button 
                onClick={() => toggle(t.id)}
                className={\`w-6 h-6 rounded-full border-2 flex items-center justify-center transition \${
                  t.done ? 'bg-green-500 border-green-500' : 'border-gray-300'
                }\`}
              >
                {t.done && <span className="text-white text-sm">✓</span>}
              </button>
              <span className={\`flex-1 text-lg transition \${t.done ? 'line-through text-gray-400' : 'text-gray-700'}\`}>
          {t.text}
        </span>
        <button
          onClick={() => del(t.id)}
          className="opacity-0 group-hover:opacity-100 text-red-500 hover:bg-red-50 p-2 rounded-lg transition"
        >
          🗑️
        </button>
      </div>
          ))}
      {filtered.length === 0 && (
        <div className="text-center py-12 text-gray-400">No tasks found</div>
      )}
    </div>
      </div >
    </div >
  );
}
`;
    await fs.writeFile(path.join(appPath, 'pages', `index.${ext}`), todoPage);

    // Platform lib
    const platformLib = `export const getPlatform = () => {
  if (typeof window === 'undefined') return 'Server';
  if (window.Capacitor) return window.Capacitor.getPlatform();
  if (window.process && window.process.type === 'renderer') return 'Desktop (Electron)';
  return 'Web';
};
export const storage = {
  get: async (key) => {
    if (typeof window !== 'undefined' && window.Capacitor) {
      const { Preferences } = await import('@capacitor/preferences');
      const { value } = await Preferences.get({ key });
      return value;
    }
    return localStorage.getItem(key);
  },
  set: async (key, value) => {
    if (typeof window !== 'undefined' && window.Capacitor) {
      const { Preferences } = await import('@capacitor/preferences');
      return Preferences.set({ key, value });
    }
    return localStorage.setItem(key, value);
  }
};
`;
    await fs.writeFile(path.join(appPath, 'lib', 'platform.js'), platformLib);
  }

  if (template === 'universal') {
    const uniPage = `import React from 'react';
import { getPlatform } from '../lib/platform';

export default function UniversalApp() {
  const [platform, setPlatform] = React.useState('Loading...');

  React.useEffect(() => {
    setPlatform(getPlatform());
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-indigo-700 text-white flex items-center justify-center">
      <div className="text-center space-y-8 p-8">
        <h1 className="text-6xl font-bold">Universal App</h1>
        <div className="text-2xl bg-white/20 backdrop-blur-lg rounded-2xl p-8 border border-white/30">
          Running on: <span className="font-bold text-yellow-300">{platform}</span>
        </div>
        <p className="text-xl opacity-80 max-w-md mx-auto">
          This single codebase runs on Web, iOS, Android, Windows, macOS, and Linux!
        </p>
      </div>
    </div>
  );
}
`;
    await fs.writeFile(path.join(appPath, 'pages', `index.${ext}`), uniPage);

    const platformLib = `export const getPlatform = () => {
  if (typeof window === 'undefined') return 'Server';
  if (window.Capacitor) return window.Capacitor.getPlatform(); // 'web', 'ios', 'android'
  if (window.process && window.process.type === 'renderer') return 'Desktop (Electron)';
  return 'Web';
}; `;
    await fs.writeFile(path.join(appPath, 'lib', 'platform.js'), platformLib);
  }

  if (template === 'fullstack-saas') {
    // Basic Fullstack SaaS setup
    const saasPage = `import React from 'react';
export default function SaaS() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-lg text-center max-w-md">
        <h1 className="text-3xl font-bold mb-4">SaaS Starter</h1>
        <p className="mb-6 text-gray-600">Complete authentication and database setup ready.</p>
        <div className="space-x-4">
          <button className="bg-indigo-600 text-white px-4 py-2 rounded">Login</button>
          <button className="border border-gray-300 px-4 py-2 rounded">Sign Up</button>
        </div>
      </div>
    </div>
  );
}
`;
    await fs.writeFile(path.join(appPath, 'pages', `index.${ext}`), saasPage);
  }
}

async function createAppShell(appPath, opts) {
  const ext = opts?.language === 'ts' ? 'tsx' : 'jsx';
  const app = `import React from 'react';

export default function App({ children }) {
  return <>{children}</>;
}
`;
  await fs.writeFile(path.join(appPath, 'pages', `_app.${ext}`), app);
}

async function createGitignore(appPath) {
  const gitignore = `# Dependencies
node_modules/

# Build output
.indjs/
dist/

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*

# Env
.env
.env.local

# OS
.DS_Store
Thumbs.db
`;
  await fs.writeFile(path.join(appPath, '.gitignore'), gitignore);
}

async function createComponents(appPath, template, opts) {
  const isTS = opts?.language === 'ts';
  const ext = isTS ? 'tsx' : 'jsx';
  // Button component
  const button = isTS ? `import React from 'react';

type Variant = 'primary' | 'secondary' | 'outline';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  className?: string;
  children?: React.ReactNode;
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}: ButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';

  const variants: Record<Variant, string> = {
    primary: 'bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500',
    outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-indigo-500'
  };

  const sizes: Record<Size, string> = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  };

  const classes = \`\${baseClasses} \${variants[variant]} \${sizes[size]} \${className}\`;
  
  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
` : `import React from 'react';

export default function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '',
  ...props 
}) {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variants = {
    primary: 'bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500',
    outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-indigo-500'
  };
  
  const sizes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  };
  
  const classes = \`\${baseClasses} \${variants[variant]} \${sizes[size]} \${className}\`;
  
  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
`;

  await fs.writeFile(path.join(appPath, 'components', `Button.${ext}`), button);
}

async function createStyles(appPath) {
  const globalStyles = `@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    font-family: system-ui, sans-serif;
  }
}

@layer components {
  .btn {
    @apply px-4 py-2 rounded-lg font-medium transition-colors;
  }
  
  .btn-primary {
    @apply bg-indigo-600 text-white hover:bg-indigo-700;
  }
  
  .btn-secondary {
    @apply bg-gray-200 text-gray-900 hover:bg-gray-300;
  }
}`;

  await fs.writeFile(path.join(appPath, 'styles', 'globals.css'), globalStyles);
}

async function createPublicAssets(appPath) {
  // Create a simple favicon placeholder
  const favicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <rect width="100" height="100" fill="#4F46E5"/>
  <text x="50" y="65" text-anchor="middle" fill="white" font-size="60" font-family="Arial, sans-serif" font-weight="bold">I</text>
</svg>`;

  await fs.writeFile(path.join(appPath, 'public', 'favicon.svg'), favicon);

  // Create robots.txt
  const robots = `User-agent: *
Allow: /

Sitemap: https://yoursite.com/sitemap.xml`;

  await fs.writeFile(path.join(appPath, 'public', 'robots.txt'), robots);

  // Copy INDJS logos to public/
  try {
    const thisFile = fileURLToPath(import.meta.url);
    const pkgRoot = path.resolve(path.dirname(thisFile), '..', '..');
    const assetsDir = path.join(pkgRoot, 'assets');
    const logoJpg = path.join(assetsDir, 'indjs.jpeg');
    const logoPng = path.join(assetsDir, 'indjs2.png');
    // Copy if exists
    try { await fs.copyFile(logoJpg, path.join(appPath, 'public', 'indjs.jpeg')); } catch { }
    try { await fs.copyFile(logoPng, path.join(appPath, 'public', 'indjs2.png')); } catch { }

    // Generate standard favicons from PNG if available
    try {
      const srcPng = path.join(appPath, 'public', 'indjs2.png');
      const hasPng = await fs.stat(srcPng).then(() => true).catch(() => false);
      if (hasPng) {
        await sharp(srcPng).resize(32, 32).png().toFile(path.join(appPath, 'public', 'favicon-32x32.png'));
        await sharp(srcPng).resize(16, 16).png().toFile(path.join(appPath, 'public', 'favicon-16x16.png'));
        await sharp(srcPng).resize(180, 180).png().toFile(path.join(appPath, 'public', 'apple-touch-icon.png'));
        const manifest = {
          name: 'INDJS App',
          short_name: 'INDJS',
          icons: [
            { src: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
            { src: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
            { src: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }
          ],
          start_url: '/',
          display: 'standalone',
          background_color: '#ffffff',
          theme_color: '#4F46E5'
        };
        await fs.writeFile(path.join(appPath, 'public', 'site.webmanifest'), JSON.stringify(manifest, null, 2));
      }
    } catch { }
  } catch { }
}
