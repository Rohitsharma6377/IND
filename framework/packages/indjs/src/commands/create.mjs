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
  // Interactive Wizard
  console.log(chalk.blue.bold('\n🚀 INDJS Project Setup Wizard\n'));

  // If a template is passed via terminal but is one of our types, map it
  let initialType = template;
  if (['web', 'desktop', 'mobile'].includes(template)) {
    initialType = template;
  } else if (template === 'universal') {
    initialType = 'universal';
  }

  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'type',
      message: 'What type of project do you want to create?',
      choices: [
        { name: '🌐 Web Application (SSR/SSG)', value: 'web' },
        { name: '🖥️ Desktop Application (Electron)', value: 'desktop' },
        { name: '📱 Mobile Application (Capacitor Android/iOS)', value: 'mobile' },
        { name: '🌍 Universal App (Web + Desktop + Mobile)', value: 'universal' },
        new inquirer.Separator(),
        { name: '📝 Todo App Template (Advanced)', value: 'todo-app' },
        { name: '💼 Fullstack SaaS Template (Advanced)', value: 'fullstack-saas' },
        { name: '🤖 AI App Template (Advanced)', value: 'ai-app' }
      ],
      when: !initialType
    },
    {
      type: 'list',
      name: 'language',
      message: 'Which language do you want to use?',
      choices: [
        { name: 'JavaScript', value: 'js' },
        { name: 'TypeScript', value: 'ts' }
      ],
      default: 'js',
      when: !language
    },
    {
      type: 'input',
      name: 'name',
      message: 'Enter project name:',
      default: 'my-indjs-app',
      validate: (v) => v.trim() ? true : 'Name is required',
      when: !name
    }
  ]);

  // Merge CLI args with answers
  const config = {
    name: name || answers.name,
    type: initialType || answers.type || 'web',
    language: language || answers.language || 'js',
    root: root || process.cwd()
  };

  const appPath = path.resolve(config.root, config.name);
  const spinner = ora(`Creating ${config.type} application: ${config.name}...`).start();

  try {
    // 1. Create Directory
    if ((await fs.stat(appPath).catch(() => false))) {
      throw new Error(`Directory ${config.name} already exists.`);
    }
    await fs.mkdir(appPath, { recursive: true });

    // 2. Generate Structure
    await createDirectoryStructure(appPath, config.type);

    // 3. Generate package.json
    await createPackageJson(appPath, config);

    // 4. Generate Configurations
    await createConfigFiles(appPath, config);

    // 5. Generate Pages & Components
    await createUI(appPath, config);
    await createComponents(appPath, config);

    // 6. Platform Specifics
    if (['desktop', 'universal', 'todo-app'].includes(config.type)) {
      await createElectronSetup(appPath);
    }
    if (['mobile', 'universal', 'todo-app'].includes(config.type)) {
      await createCapacitorSetup(appPath, config);
    }

    // 7. Styles & Assets
    await createStyles(appPath);
    await createPublicAssets(appPath);

    // 8. Gitignore
    await createGitignore(appPath);

    spinner.succeed(chalk.green(`✅ Project created successfully`));

    console.log(chalk.bold('\nProject Details:'));
    console.log(`✅ Type: ${config.type.charAt(0).toUpperCase() + config.type.slice(1)}`);
    console.log(`✅ Language: ${config.language === 'ts' ? 'TypeScript' : 'JavaScript'}`);
    console.log(`✅ Location: ${appPath}`);

    console.log('\nNext steps:');
    console.log(chalk.cyan(`  cd ${config.name}`));
    console.log(chalk.cyan('  npm install'));
    if (config.type === 'mobile' || config.type === 'universal' || config.type === 'todo-app') {
      console.log(chalk.cyan('  npm run android:setup  (First time only)'));
      console.log(chalk.cyan('  npm run dev'));
    } else {
      console.log(chalk.cyan('  npm run dev'));
    }
    console.log('');

  } catch (error) {
    spinner.fail(chalk.red('Failed to create application'));
    console.error(chalk.red(error.message));
    process.exit(1);
  }
}

async function createPackageJson(appPath, config) {
  const isTS = config.language === 'ts';
  const isMobile = ['mobile', 'universal', 'todo-app'].includes(config.type);
  const isDesktop = ['desktop', 'universal', 'todo-app'].includes(config.type);

  const pkg = {
    name: config.name.toLowerCase().replace(/\s+/g, '-'),
    version: '0.1.0',
    private: true,
    type: 'module',
    scripts: {},
    dependencies: {},
    devDependencies: {}
  };

  // Base Dependencies
  pkg.dependencies = {
    "indjs": "^2.0.29",
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  };

  pkg.devDependencies = {
    "vite": "^5.4.0",
    "@vitejs/plugin-react": "^4.3.0",
    "tailwindcss": "^3.4.1",
    "autoprefixer": "^10.4.17",
    "postcss": "^8.4.35"
  };

  if (isTS) {
    pkg.devDependencies = {
      ...pkg.devDependencies,
      "@types/react": "^18.2.0",
      "@types/react-dom": "^18.2.0",
      "typescript": "^5.0.0"
    };
  }

  // Scripts Generation
  const commonScripts = {
    "dev": "indjs dev",
    "build": "indjs build",
    "start": "indjs start",
    "test": "indjs test"
  };

  pkg.scripts = { ...commonScripts };

  if (isDesktop) {
    Object.assign(pkg.scripts, {
      "desktop:dev": "concurrently -k \"indjs dev\" \"wait-on http://localhost:3000 && electron .\"",
      "desktop:build": "indjs build && electron-builder"
    });
    // Desktop Deps
    Object.assign(pkg.devDependencies, {
      "electron": "^28.0.0",
      "electron-builder": "^24.9.1",
      "concurrently": "^8.2.2",
      "wait-on": "^7.2.0"
    });
    Object.assign(pkg.dependencies, {
      "electron-serve": "^1.3.0"
    });
    // If desktop only or universal, main should be electron
    if (config.type !== 'web') {
      pkg.main = "electron/main.cjs";
    }
  }

  if (isMobile) {
    Object.assign(pkg.scripts, {
      "android:setup": "node scripts/setup-android.cjs",
      "android:dev": "npm run build && npx cap sync android && npx cap run android",
      "android:open": "npx cap open android",
      "mobile:dev": "npm run android:dev", // Alias
      "mobile:android": "npm run android:dev",
      "mobile:ios": "npx cap open ios",
      "mobile:build": "indjs build && npx cap sync"
    });
    // Mobile Deps
    Object.assign(pkg.dependencies, {
      "@capacitor/core": "^6.0.0",
      "@capacitor/app": "^6.0.0",
      "@capacitor/preferences": "^6.0.0",
      "@capacitor/android": "^6.0.0",
      "@capacitor/ios": "^6.0.0"
    });
    Object.assign(pkg.devDependencies, {
      "@capacitor/cli": "^6.0.0"
    });
  }

  if (config.type === 'universal' || config.type === 'todo-app') {
    // Universal specific scripts
    pkg.scripts['build:all'] = 'npm run build && npm run desktop:build && npm run mobile:build';
  }

  if (config.type === 'fullstack-saas') {
    // Add db deps
    pkg.dependencies['pg'] = '^8.11.3';
  }

  await fs.writeFile(path.join(appPath, 'package.json'), JSON.stringify(pkg, null, 2));
}

async function createDirectoryStructure(appPath, type) {
  const dirs = [
    'pages',
    'pages/api',
    'components',
    'styles',
    'public',
    'utils'
  ];

  if (['desktop', 'universal', 'todo-app'].includes(type)) {
    dirs.push('electron');
  }
  if (['mobile', 'universal', 'todo-app'].includes(type)) {
    dirs.push('scripts');
  }
  if (type === 'universal') {
    dirs.push('layouts', 'layouts/web', 'layouts/mobile', 'layouts/desktop');
  }

  if (type === 'ai-app') {
    dirs.push('ai', 'pages/api/ai');
  }
  if (type === 'fullstack-saas') {
    dirs.push('lib/db', 'pages/api/auth');
  }

  for (const dir of dirs) {
    await fs.mkdir(path.join(appPath, dir), { recursive: true });
  }
}

async function createConfigFiles(appPath, config) {
  const isTS = config.language === 'ts';

  // indjs.config.js
  await fs.writeFile(path.join(appPath, 'indjs.config.js'), `export default {
  experimental: { devBundler: 'vite' }
};`);

  // Tailwind
  await fs.writeFile(path.join(appPath, 'tailwind.config.cjs'), `/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}', './layouts/**/*.{js,ts,jsx,tsx}'],
  theme: { extend: {} },
  plugins: [],
}`);
  await fs.writeFile(path.join(appPath, 'postcss.config.cjs'), `module.exports = { plugins: { tailwindcss: {}, autoprefixer: {} } }`);

  // TSConfig
  if (isTS) {
    await fs.writeFile(path.join(appPath, 'tsconfig.json'), JSON.stringify({
      compilerOptions: {
        target: 'es5',
        lib: ['dom', 'dom.iterable', 'es6'],
        allowJs: true,
        skipLibCheck: true,
        strict: true,
        jsx: 'preserve',
        module: 'esnext',
        moduleResolution: 'node',
        resolveJsonModule: true,
        isolatedModules: true,
        noEmit: true
      },
      include: ['**/*.ts', '**/*.tsx'],
      exclude: ['node_modules']
    }, null, 2));
  }

  // Env example
  await fs.writeFile(path.join(appPath, '.env.example'), 'DATABASE_URL=\nJWT_SECRET=secret\n');
}

async function createUI(appPath, config) {
  const ext = config.language === 'ts' ? 'tsx' : 'jsx';

  // Layout Generation
  let layoutContent = '';
  // Default Web Layout
  layoutContent = `import React from 'react';
export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <nav className="bg-white border-b px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-indigo-600">App</h1>
      </nav>
      <main className="flex-1 container mx-auto p-6">{children}</main>
    </div>
  );
}`;

  if (config.type === 'desktop') {
    layoutContent = `import React from 'react';
export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex">
      <aside className="w-64 bg-gray-900 text-white p-6">
        <div className="text-2xl font-bold mb-8">Desktop</div>
      </aside>
      <main className="flex-1 bg-gray-100 p-8 overflow-auto">{children}</main>
    </div>
  );
}`;
  } else if (config.type === 'mobile') {
    layoutContent = `import React from 'react';
export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <header className="bg-white border-b p-4 sticky top-0 z-10 text-center font-bold">Mobile App</header>
      <main className="p-4">{children}</main>
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around p-3 safe-area-pb">
        <span>Home</span>
        <span>Profile</span>
      </nav>
    </div>
  );
}`;
  } else if (config.type === 'universal') {
    layoutContent = `import React from 'react';
export default function Layout({ children }) {
  return <div className="min-h-screen bg-white">{children}</div>;
}`;
  }

  await fs.writeFile(path.join(appPath, 'pages', `_layout.${ext}`), layoutContent);

  // Home Page
  let homeContent = `import React from 'react';
export default function Home() {
  return <div className="p-10 text-center"><h1 className="text-4xl font-bold">Welcome</h1></div>;
}`;

  if (config.type === 'mobile') {
    homeContent = `import React from 'react';
export default function Home() {
  return (
    <div className="space-y-4">
      <div className="bg-indigo-600 rounded-xl p-6 text-white shadow-lg">
        <h2 className="text-2xl font-bold">Balance</h2>
        <p className="text-4xl mt-2">$12,450.00</p>
      </div>
    </div>
  );
}`;
  }

  // Advanced Templates Overrides
  if (config.type === 'todo-app') {
    const todoPage = `import React, { useState, useEffect } from 'react';

export default function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

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
    setTodos([...todos, { id: Date.now(), text: input, done: false }]);
    setInput('');
  };

  const toggle = (id) => setTodos(todos.map(t => t.id === id ? { ...t, done: !t.done } : t));

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow p-6">
        <h1 className="text-2xl font-bold mb-4">Todo App</h1>
        <form onSubmit={add} className="flex gap-2 mb-4">
          <input value={input} onChange={e => setInput(e.target.value)} className="border p-2 flex-1 rounded" placeholder="Add task..." />
          <button className="bg-indigo-600 text-white px-4 py-2 rounded">Add</button>
        </form>
        <ul className="space-y-2">
          {todos.map(t => (
            <li key={t.id} className="flex items-center gap-2 p-2 border-b cursor-pointer" onClick={() => toggle(t.id)}>
              <span className={t.done ? 'line-through text-gray-400' : ''}>{t.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}`;
    homeContent = todoPage;
  }

  if (config.type === 'ai-app') {
    homeContent = `import React from 'react';
export default function AI() { return <div className="p-8"><h1>AI Playground</h1></div>; }`;
  }

  await fs.writeFile(path.join(appPath, 'pages', `index.${ext}`), homeContent);
  await fs.writeFile(path.join(appPath, 'pages', `about.${ext}`), `export default function About() { return <div className="p-10"><h1>About</h1></div> }`);
}

async function createComponents(appPath, config) {
  const ext = config.language === 'ts' ? 'tsx' : 'jsx';
  const btn = `import React from 'react';
export default function Button({ children, ...props }) {
  return <button className="px-4 py-2 bg-indigo-600 text-white rounded" {...props}>{children}</button>;
}`;
  await fs.writeFile(path.join(appPath, 'components', `Button.${ext}`), btn);
}

async function createElectronSetup(appPath) {
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
  await fs.writeFile(path.join(appPath, 'electron', 'main.cjs'), mainCjs);
  await fs.writeFile(path.join(appPath, 'electron', 'preload.cjs'), `const { contextBridge, ipcRenderer } = require('electron');\ncontextBridge.exposeInMainWorld('electron', {});`);
}

async function createCapacitorSetup(appPath, config) {
  const appId = `com.indjs.${config.name.toLowerCase().replace(/[^a-z0-9]/g, '')}`;
  const capConfig = {
    appId,
    appName: config.name,
    webDir: '.indjs/static',
    server: { androidScheme: 'https' }
  };
  await fs.writeFile(path.join(appPath, 'capacitor.config.json'), JSON.stringify(capConfig, null, 2));

  // Android setup script
  const setupAndroid = `const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🤖 Setting up Android environment...');

try {
  if (!fs.existsSync(path.join(__dirname, '../android'))) {
    console.log('📦 Adding Android platform...');
    execSync('npx cap add android', { stdio: 'inherit', cwd: path.join(__dirname, '..') });
  }

  // Java 17 Patch logic
  const buildGradlePath = path.join(__dirname, '../android/app/build.gradle');
  if (fs.existsSync(buildGradlePath)) {
    let content = fs.readFileSync(buildGradlePath, 'utf8');
    if (!content.includes('JavaVersion.VERSION_17')) {
       content = content.replace(/JavaVersion.VERSION_1_8/g, 'JavaVersion.VERSION_17');
       fs.writeFileSync(buildGradlePath, content);
       console.log('✅ Patched build.gradle for Java 17');
    }
  }

  console.log('✅ Android setup complete! Run "npm run android:dev" to start.');
} catch (e) {
  console.error('❌ Setup failed:', e.message);
  process.exit(1);
}
`;
  await fs.writeFile(path.join(appPath, 'scripts', 'setup-android.cjs'), setupAndroid);
}

async function createStyles(appPath) {
  await fs.writeFile(path.join(appPath, 'styles', 'globals.css'), `@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  margin: 0;
  padding: 0;
  -webkit-font-smoothing: antialiased;
}`);
}

async function createPublicAssets(appPath) {
  await fs.writeFile(path.join(appPath, 'public', 'robots.txt'), 'User-agent: *\nAllow: /');

  // Try to copy default assets from framework if possible
  try {
    const thisFile = fileURLToPath(import.meta.url);
    const pkgRoot = path.resolve(path.dirname(thisFile), '..', '..'); // indjs/src/commands/create.mjs -> indjs/
    const assetsDir = path.join(pkgRoot, 'assets');
    // We ignore if it fails, just best effort
    await fs.copyFile(path.join(assetsDir, 'indjs2.png'), path.join(appPath, 'public', 'favicon.png')).catch(() => { });
  } catch { }
}

async function createGitignore(appPath) {
  await fs.writeFile(path.join(appPath, '.gitignore'), `node_modules
.indjs
dist
.env
android
ios
`);
}
