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
  blog: {
    name: 'Blog Starter',
    description: 'Blog structure with content folder'
  },
  'desktop-electron': {
    name: 'Desktop (Electron)',
    description: 'Run your INDJS app as a desktop app with Electron'
  },
  'mobile-capacitor': {
    name: 'Mobile (Capacitor)',
    description: 'Build iOS/Android apps wrapping your INDJS web build'
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
    await createComponents(appPath, template);
    if (opts.useTailwind !== false) {
      await createStyles(appPath);
    }
    await createAppShell(appPath, opts);
    await createGitignore(appPath);
    await createPublicAssets(appPath);

    if (template === 'desktop-electron') {
      const mainCjs = `const { app, BrowserWindow } = require('electron');
function createWindow() {
  const win = new BrowserWindow({ width: 1200, height: 800 });
  const port = process.env.PORT || 3005;
  win.loadURL('http://localhost:' + port);
}
app.whenReady().then(createWindow);
app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });
`;
      await fs.writeFile(path.join(appPath, 'main.cjs'), mainCjs);
    }

    if (template === 'mobile-capacitor') {
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

  if (template === 'dashboard') {
    dirs.push('components/charts', 'components/tables', 'lib/auth');
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
      indjs: '^1.0.13',
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
      electron: '^31.0.2',
      concurrently: '^9.0.1',
      'wait-on': '^7.2.0',
      'cross-env': '^7.0.3'
    };
    packageJson.scripts = {
      ...packageJson.scripts,
      'desktop:dev': 'cross-env PORT=3005 concurrently "indjs dev --port %PORT%" "wait-on http://localhost:%PORT% && electron ."',
      'desktop:start': 'cross-env PORT=3005 concurrently "indjs start --port %PORT%" "electron ."'
    };
  }
  if (template === 'mobile-capacitor') {
    packageJson.devDependencies = {
      ...packageJson.devDependencies,
      '@capacitor/cli': '^6.1.2'
    };
    packageJson.dependencies = {
      ...packageJson.dependencies,
      '@capacitor/core': '^6.1.2'
    };
    // optional native platforms are added by user later
    packageJson.scripts = {
      ...packageJson.scripts,
      'mobile:build': 'indjs build && npx cap copy',
      'mobile:sync': 'npx cap sync',
      'mobile:android': 'npx cap open android',
      'mobile:ios': 'npx cap open ios'
    };
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
}

async function createAppShell(appPath, opts) {
  const ext = opts?.language === 'ts' ? 'tsx' : 'jsx';
  const app = `import React from 'react';

export default function App(props) {
  return <>` + '{' + `props.children` + '}' + `</>;
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

async function createComponents(appPath, template) {
  // Button component
  const button = `import React from 'react';

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
}`;

  await fs.writeFile(path.join(appPath, 'components', 'Button.jsx'), button);
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
    try { await fs.copyFile(logoJpg, path.join(appPath, 'public', 'indjs.jpeg')); } catch {}
    try { await fs.copyFile(logoPng, path.join(appPath, 'public', 'indjs2.png')); } catch {}

    // Generate standard favicons from PNG if available
    try {
      const srcPng = path.join(appPath, 'public', 'indjs2.png');
      const hasPng = await fs.stat(srcPng).then(()=>true).catch(()=>false);
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
    } catch {}
  } catch {}
}

// Extra platform configs
async function createMobileConfigs(appPath, opts) {
  const isTS = opts?.language === 'ts';
  // Capacitor config
  if (isTS) {
    const capTs = `import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.indjsapp',
  appName: 'INDJS App',
  webDir: '.indjs/static',
  server: {
    androidScheme: 'https'
  }
};

export default config;
`;
    await fs.writeFile(path.join(appPath, 'capacitor.config.ts'), capTs);
  } else {
    const capJson = {
      appId: 'com.example.indjsapp',
      appName: 'INDJS App',
      webDir: '.indjs/static',
      server: { androidScheme: 'https' }
    };
    await fs.writeFile(path.join(appPath, 'capacitor.config.json'), JSON.stringify(capJson, null, 2));
  }

  // Quickstart README for Capacitor
  const readme = `# Mobile (Capacitor) Quickstart

This project is scaffolded for Capacitor mobile builds.

Steps:
1. Build web assets: \`npm run build\`
2. Copy to native platforms: \`npm run mobile:build\` (runs build + \`npx cap copy\`)
3. Add a platform (once): \`npx cap add android\` or \`npx cap add ios\`
4. Open in IDE: \`npm run mobile:android\` or \`npm run mobile:ios\`

Notes:
- Web assets are output to \`.indjs/static\`.
- Update appId/appName in capacitor.config.* before publishing.
`;
  await fs.writeFile(path.join(appPath, 'CAPACITOR.md'), readme);
}
