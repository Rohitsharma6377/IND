import fs from 'fs/promises';
import path from 'path';
import chalk from 'chalk';
import ora from 'ora';
import inquirer from 'inquirer';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const templates = {
  universal: {
    name: 'Universal App (Recommended)',
    description: 'Unified Fullstack App for Web, Mobile, and Desktop'
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
      message: 'What template do you want to use?',
      choices: [
        { name: '🌍 Universal App (Web + Desktop + Mobile)', value: 'universal' }
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
    type: 'universal', // Force universal type
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
    if (config.type === 'universal') {
      console.log(chalk.cyan('  npm run dev:mobile  (for App)'));
      console.log(chalk.cyan('  npm run dev:desktop (for Desktop)'));
      console.log(chalk.cyan('  npm run dev:web     (for Web)'));
      console.log(chalk.cyan('  npm run dev         (Default: Web)'));
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

  const pkg = {
    name: config.name.toLowerCase().replace(/\s+/g, '-'),
    version: '0.1.0',
    private: true,
    type: 'module',
    scripts: {},
    dependencies: {},
    devDependencies: {}
  };

  // Base Dependencies (Universal)
  pkg.dependencies = {
    "indjs": "^2.0.29",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "electron-serve": "^1.3.0",
    "@capacitor/core": "^6.0.0",
    "@capacitor/app": "^6.0.0",
    "@capacitor/preferences": "^6.0.0",
    "@capacitor/android": "^6.0.0",
    "@capacitor/ios": "^6.0.0"
  };

  pkg.devDependencies = {
    "vite": "^5.4.0",
    "@vitejs/plugin-react": "^4.3.0",
    "tailwindcss": "^3.4.1",
    "autoprefixer": "^10.4.17",
    "postcss": "^8.4.35",
    "electron": "^28.0.0",
    "electron-builder": "^24.9.1",
    "concurrently": "^8.2.2",
    "wait-on": "^7.2.0",
    "@capacitor/cli": "^6.0.0"
  };

  pkg.main = "electron/main.cjs";

  if (isTS) {
    Object.assign(pkg.devDependencies, {
      "@types/react": "^18.2.0",
      "@types/react-dom": "^18.2.0",
      "typescript": "^5.0.0"
    });
  }

  // Scripts Generation
  pkg.scripts = {
    "dev": "indjs dev",
    "dev:web": "indjs dev",
    "dev:desktop": "concurrently -k \"indjs dev\" \"wait-on http://localhost:3000 && electron .\"",
    "dev:mobile": "indjs mobile dev",
    "open:android": "npx cap open android",
    "open:ios": "npx cap open ios",
    "setup:mobile": "node scripts/setup-android.cjs",
    "build": "indjs build",
    "build:desktop": "indjs build && electron-builder",
    "build:mobile": "indjs build && npx cap sync",
    "build:all": "npm run build && npm run build:desktop && npm run build:mobile",
    "start": "indjs start",
    "test": "indjs test"
  };

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

  // Platform specific
  dirs.push('electron');
  dirs.push('scripts');


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

  // Universal Layout
  const layoutContent = `import React from 'react';
import { SafeAreaView, View, Text } from 'indjs';

export default function Layout({ children }) {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-row items-center justify-between px-6 py-4 bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50">
        <Text className="text-xl font-bold text-indigo-600">Universal App</Text>
        <View className="hidden md:flex flex-row gap-4">
           <Text className="text-gray-600 hover:text-indigo-600 cursor-pointer">Start</Text>
           <Text className="text-gray-600 hover:text-indigo-600 cursor-pointer">About</Text>
        </View>
      </View>
      <View className="flex-1 max-w-7xl mx-auto w-full p-4 md:p-6 lg:p-8">
        {children}
      </View>
      {/* Mobile Tab Bar (Visible only on small screens) */}
      <View className="md:hidden flex-row justify-around p-4 border-t border-gray-100 bg-white pb-safe">
         <Text className="text-sm font-medium text-indigo-600">Home</Text>
         <Text className="text-sm font-medium text-gray-500">Settings</Text>
      </View>
    </SafeAreaView>
  );
}`;

  await fs.writeFile(path.join(appPath, 'pages', `_layout.${ext}`), layoutContent);


  // Home Page
  const homeContent = `import React from 'react';
import { View, Text, Button } from 'indjs';

export default function Home() {
  return (
    <View className="space-y-4 p-4">
      <View className="bg-indigo-600 rounded-xl p-6 shadow-lg">
        <Text className="text-2xl font-bold text-white">Welcome</Text>
        <Text className="text-white opacity-90 mt-2">This is your new Universal App.</Text>
      </View>
      <View className="bg-white p-6 rounded-xl border border-gray-200">
         <Text className="text-gray-800 text-lg font-semibold">Get Started</Text>
         <Text className="text-gray-600 mt-2">Edit pages/index.js to change this screen.</Text>
         <Button className="mt-4" onClick={() => alert('Hello!')}>Click Me</Button>
      </View>
    </View>
  );
}`;

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
