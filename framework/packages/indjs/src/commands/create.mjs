import fs from "fs/promises";
import path from "path";
import chalk from "chalk";
import ora from "ora";
import inquirer from "inquirer";
import { fileURLToPath } from "url";

const templates = {
  website: {
    name: "Website",
    description: "Modern web application with beautiful UI",
  },
  mobile: {
    name: "Mobile App",
    description: "Mobile application with Capacitor",
  },
  desktop: {
    name: "Desktop App",
    description: "Cross-platform desktop application with Electron",
  },
};

export async function create({
  name,
  template,
  root,
  language,
  state,
  useTailwind,
} = {}) {
  // Interactive Wizard
  console.log(chalk.blue.bold("\n🚀 INDJS Project Setup Wizard\n"));

  // If a template is passed via terminal but is one of our types, map it
  let initialType = template;
  if (["web", "desktop", "mobile"].includes(template)) {
    initialType = template;
  } else if (template === "universal") {
    initialType = "universal";
  }

  const answers = await inquirer.prompt([
    {
      type: "list",
      name: "template",
      message: "Select a template:",
      choices: [
        { name: "🌐 Website - Modern web application", value: "website" },
        { name: "📱 Mobile App - Mobile application with Capacitor", value: "mobile" },
        { name: "💻 Desktop App - Electron desktop application", value: "desktop" },
      ],
      default: "website",
      when: !template,
    },
    {
      type: "list",
      name: "language",
      message: "Language:",
      choices: [
        { name: "JavaScript", value: "js" },
        { name: "TypeScript", value: "ts" },
      ],
      default: "js",
      when: !language,
    },
    {
      type: "confirm",
      name: "useRedux",
      message: "State management:",
      choices: [
        { name: "Redux Toolkit", value: true },
        { name: "None", value: false },
      ],
      default: true,
      when: !state,
    },
    {
      type: "confirm",
      name: "useTailwind",
      message: "Include Tailwind CSS?",
      default: true,
      when: useTailwind === undefined,
    },
    {
      type: "input",
      name: "name",
      message: "Enter project name:",
      default: "my-indjs-app",
      validate: (v) => (v.trim() ? true : "Name is required"),
      when: !name,
    },
  ]);

  // Merge CLI args with answers
  const config = {
    name: name || answers.name,
    template: template || answers.template || "website",
    language: language || answers.language || "js",
    useRedux: state !== undefined ? state : (answers.useRedux !== undefined ? answers.useRedux : true),
    useTailwind: useTailwind !== undefined ? useTailwind : (answers.useTailwind !== undefined ? answers.useTailwind : true),
    root: root || process.cwd(),
  };

  const appPath = path.resolve(config.root, config.name);
  const spinner = ora(
    `Creating ${templates[config.template]?.name || config.template} application: ${config.name}...`,
  ).start();

  try {
    // 1. Create Directory
    if (await fs.stat(appPath).catch(() => false)) {
      throw new Error(`Directory ${config.name} already exists.`);
    }
    await fs.mkdir(appPath, { recursive: true });

    // 2. Generate Structure
    await createDirectoryStructure(appPath, config.template);

    // 3. Generate package.json
    await createPackageJson(appPath, config);

    // 4. Generate Configurations
    await createConfigFiles(appPath, config);

    // 5. Generate Pages & Components
    await createUI(appPath, config);
    await createComponents(appPath, config);

    // 6. Platform Specifics
    if (config.template === "desktop") {
      await createElectronSetup(appPath);
    }
    if (config.template === "mobile") {
      await createCapacitorSetup(appPath, config);
    }

    // 7. Styles & Assets
    await createStyles(appPath);
    await createPublicAssets(appPath);

    // 8. Gitignore
    await createGitignore(appPath);

    spinner.succeed(chalk.green(`✅ Project created successfully`));

    console.log(chalk.bold("\n✅ Successfully created " + config.name));
    console.log("");
    console.log(chalk.bold("Project Details:"));
    console.log(`  Template: ${templates[config.template]?.name || config.template}`);
    console.log(`  Language: ${config.language === "ts" ? "TypeScript" : "JavaScript"}`);
    console.log(`  Redux: ${config.useRedux ? "Yes" : "No"}`);
    console.log(`  Tailwind CSS: ${config.useTailwind ? "Yes" : "No"}`);
    console.log(`  Location: ${appPath}`);

    console.log("\n" + chalk.bold("Next steps:"));
    console.log(chalk.cyan(`  cd ${config.name}`));
    console.log(chalk.cyan("  npm install"));
    console.log(chalk.cyan("  npm run dev"));
    console.log("");
    console.log(chalk.green("Happy coding! 🚀"));
    console.log("");
  } catch (error) {
    spinner.fail(chalk.red("Failed to create application"));
    console.error(chalk.red(error.message));
    process.exit(1);
  }
}

async function createPackageJson(appPath, config) {
  const isTS = config.language === "ts";

  const pkg = {
    name: config.name.toLowerCase().replace(/\s+/g, "-"),
    version: "0.1.0",
    private: true,
    type: "module",
    scripts: {},
    dependencies: {},
    devDependencies: {},
  };

  // Base Dependencies
  pkg.dependencies = {
    indjs: "^3.0.0",
    react: "^18.3.1",
    "react-dom": "^18.3.1",
  };

  // Add Redux if selected
  if (config.useRedux) {
    pkg.dependencies["@reduxjs/toolkit"] = "^2.3.0";
    pkg.dependencies["react-redux"] = "^9.1.2";
  }

  // Desktop-specific dependencies
  if (config.template === "desktop") {
    pkg.dependencies["electron-serve"] = "^1.3.0";
    pkg.main = "electron/main.cjs";
  }

  // Mobile-specific dependencies
  if (config.template === "mobile") {
    pkg.dependencies["@capacitor/core"] = "^6.0.0";
    pkg.dependencies["@capacitor/app"] = "^6.0.0";
    pkg.dependencies["@capacitor/android"] = "^6.0.0";
    pkg.dependencies["@capacitor/ios"] = "^6.0.0";
  }

  pkg.devDependencies = {
    vite: "^5.4.0",
    "@vitejs/plugin-react": "^4.3.0",
  };

  // Add Tailwind if selected
  if (config.useTailwind) {
    pkg.devDependencies.tailwindcss = "^3.4.18";
    pkg.devDependencies.autoprefixer = "^10.4.21";
    pkg.devDependencies.postcss = "^8.4.47";
  }

  // Desktop-specific dev dependencies
  if (config.template === "desktop") {
    pkg.devDependencies.electron = "^28.0.0";
    pkg.devDependencies["electron-builder"] = "^24.9.1";
    pkg.devDependencies.concurrently = "^8.2.2";
    pkg.devDependencies["wait-on"] = "^7.2.0";
  }

  // Mobile-specific dev dependencies
  if (config.template === "mobile") {
    pkg.devDependencies["@capacitor/cli"] = "^6.0.0";
  }

  if (isTS) {
    Object.assign(pkg.devDependencies, {
      "@types/react": "^18.3.1",
      "@types/react-dom": "^18.3.1",
      typescript: "^5.3.3",
    });
  }

  // Scripts Generation
  pkg.scripts = {
    dev: "indjs dev",
    build: "indjs build",
    start: "indjs start",
    test: "indjs test",
  };

  // Desktop-specific scripts
  if (config.template === "desktop") {
    pkg.scripts["dev:desktop"] =
      'concurrently -k "indjs dev" "wait-on http://localhost:3000 && electron ."';
    pkg.scripts["build:desktop"] = "indjs build && electron-builder";
  }

  // Mobile-specific scripts
  if (config.template === "mobile") {
    pkg.scripts["android:setup"] = "npx cap add android";
    pkg.scripts["android:sync"] = "npx cap sync android";
    pkg.scripts["android:open"] = "npx cap open android";
    pkg.scripts["ios:setup"] = "npx cap add ios";
    pkg.scripts["ios:sync"] = "npx cap sync ios";
    pkg.scripts["ios:open"] = "npx cap open ios";
  }

  await fs.writeFile(
    path.join(appPath, "package.json"),
    JSON.stringify(pkg, null, 2),
  );
}

async function createDirectoryStructure(appPath, template) {
  const dirs = [
    "pages",
    "pages/api",
    "components",
    "styles",
    "public",
    "utils",
  ];

  // Platform specific
  if (template === "desktop") {
    dirs.push("electron");
  }
  if (template === "mobile") {
    dirs.push("scripts");
  }

  for (const dir of dirs) {
    await fs.mkdir(path.join(appPath, dir), { recursive: true });
  }
}

async function createConfigFiles(appPath, config) {
  const isTS = config.language === "ts";

  // indjs.config.js
  await fs.writeFile(
    path.join(appPath, "indjs.config.js"),
    `export default {
  experimental: { devBundler: 'vite' }
};`,
  );

  // Tailwind
  await fs.writeFile(
    path.join(appPath, "tailwind.config.cjs"),
    `/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}', './layouts/**/*.{js,ts,jsx,tsx}'],
  theme: { extend: {} },
  plugins: [],
}`,
  );
  await fs.writeFile(
    path.join(appPath, "postcss.config.cjs"),
    `module.exports = { plugins: { tailwindcss: {}, autoprefixer: {} } }`,
  );

  // TSConfig
  if (isTS) {
    await fs.writeFile(
      path.join(appPath, "tsconfig.json"),
      JSON.stringify(
        {
          compilerOptions: {
            target: "es5",
            lib: ["dom", "dom.iterable", "es6"],
            allowJs: true,
            skipLibCheck: true,
            strict: true,
            jsx: "preserve",
            module: "esnext",
            moduleResolution: "node",
            resolveJsonModule: true,
            isolatedModules: true,
            noEmit: true,
          },
          include: ["**/*.ts", "**/*.tsx"],
          exclude: ["node_modules"],
        },
        null,
        2,
      ),
    );
  }

  // Env example
  await fs.writeFile(
    path.join(appPath, ".env.example"),
    "DATABASE_URL=\nJWT_SECRET=secret\n",
  );
}

async function createUI(appPath, config) {
  const ext = config.language === "ts" ? "tsx" : "jsx";

  // Universal Layout
  const layoutContent = `import React from 'react';
import { SafeAreaView, View, Text } from 'indjs';
import '../styles/globals.css';

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

  await fs.writeFile(
    path.join(appPath, "pages", `_layout.${ext}`),
    layoutContent,
  );

  // Home Page - Different for each template
  let homeContent;

  if (config.template === "website") {
    homeContent = `import React from 'react';
import FeatureCard from '../components/FeatureCard';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Welcome to <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">INDJS</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            The modern React framework for building blazing-fast web applications
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <FeatureCard
            icon="⚡"
            title="Lightning Fast"
            description="Built on esbuild and Vite for instant hot module replacement"
          />
          <FeatureCard
            icon="🎨"
            title="Beautiful UI"
            description="Pre-styled with Tailwind CSS for stunning designs"
          />
          <FeatureCard
            icon="🚀"
            title="Easy Deploy"
            description="Deploy anywhere with zero configuration"
          />
        </div>

        <div className="text-center">
          <p className="text-gray-600 mb-4">
            Edit <code className="bg-gray-100 px-2 py-1 rounded">pages/index.jsx</code> to get started
          </p>
        </div>
      </div>
    </div>
  );
}`;
  } else {
    // Mobile/Desktop template
    homeContent = `import React from 'react';
import PlatformInfo from '../components/PlatformInfo';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl p-8 shadow-xl mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to INDJS
          </h1>
          <p className="text-xl text-gray-600">
            ${config.template === "mobile" ? "Mobile" : "Desktop"} App Framework
          </p>
        </div>

        <PlatformInfo />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Get Started</h3>
            <p className="text-gray-600">Edit pages/index.jsx to change this screen.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Documentation</h3>
            <p className="text-gray-600">Check out the docs to learn more.</p>
          </div>
        </div>
      </div>
    </div>
  );
}`;
  }

  await fs.writeFile(path.join(appPath, "pages", `index.${ext}`), homeContent);
  await fs.writeFile(
    path.join(appPath, "pages", `about.${ext}`),
    `export default function About() { return <div className="p-10"><h1>About</h1></div> }`,
  );
}

async function createComponents(appPath, config) {
  const ext = config.language === "ts" ? "tsx" : "jsx";

  // Button Component (for all templates)
  const btn = `import React from 'react';

export default function CustomButton({ children, className = '', ...props }) {
  return (
    <button
      className={\`px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors \${className}\`}
      {...props}
    >
      {children}
    </button>
  );
}`;
  await fs.writeFile(path.join(appPath, "components", `Button.${ext}`), btn);

  // Create different components based on template
  if (config.template === "website") {
    // Simple FeatureCard for website
    const featureCard = `import React from 'react';

export default function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}`;
    await fs.writeFile(path.join(appPath, "components", `FeatureCard.${ext}`), featureCard);
  } else {
    // PlatformInfo Component for mobile/desktop
    const platformInfo = `import React from 'react';

export default function PlatformInfo() {
  const [platform, setPlatform] = React.useState('Loading...');
  const [info, setInfo] = React.useState({});

  React.useEffect(() => {
    detectPlatform();
  }, []);

  const detectPlatform = async () => {
    if (typeof window !== 'undefined' && window.process && window.process.type) {
      setPlatform('Desktop (Electron)');
      setInfo({ type: 'Electron', version: window.process.versions.electron });
      return;
    }
    if (typeof window !== 'undefined' && window.Capacitor) {
      try {
        const { Capacitor } = await import('@capacitor/core');
        setPlatform(Capacitor.getPlatform() === 'web' ? 'Web' : 'Mobile (' + Capacitor.getPlatform() + ')');
        setInfo({ type: 'Capacitor', native: Capacitor.isNativePlatform() });
      } catch (e) {
        setPlatform('Web');
      }
    } else {
      setPlatform('Web Browser');
      setInfo({ type: 'Web', agent: navigator.userAgent });
    }
  };

  return (
    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 rounded-xl shadow-xl">
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-white">🎯 Platform: {platform}</h3>
        <div className="bg-white/10 p-3 rounded-lg">
          <pre className="text-sm font-mono text-white opacity-80 overflow-auto">
            {JSON.stringify(info, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
}`;
    await fs.writeFile(path.join(appPath, "components", `PlatformInfo.${ext}`), platformInfo);
  }
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
  await fs.writeFile(path.join(appPath, "electron", "main.cjs"), mainCjs);
  await fs.writeFile(
    path.join(appPath, "electron", "preload.cjs"),
    `const { contextBridge, ipcRenderer } = require('electron'); \ncontextBridge.exposeInMainWorld('electron', {}); `,
  );
}

async function createCapacitorSetup(appPath, config) {
  const appId = `com.indjs.${config.name.toLowerCase().replace(/[^a-z0-9]/g, "")} `;
  const capConfig = {
    appId,
    appName: config.name,
    webDir: ".indjs/static",
    server: { androidScheme: "https" },
  };
  await fs.writeFile(
    path.join(appPath, "capacitor.config.json"),
    JSON.stringify(capConfig, null, 2),
  );

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
  await fs.writeFile(
    path.join(appPath, "scripts", "setup-android.cjs"),
    setupAndroid,
  );
}

async function createStyles(appPath) {
  await fs.writeFile(
    path.join(appPath, "styles", "globals.css"),
    `@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  margin: 0;
  padding: 0;
  -webkit-font-smoothing: antialiased;
}`,
  );
}

async function createPublicAssets(appPath) {
  await fs.writeFile(
    path.join(appPath, "public", "robots.txt"),
    "User-agent: *\nAllow: /",
  );

  // Try to copy default assets from framework if possible
  try {
    const thisFile = fileURLToPath(import.meta.url);
    const pkgRoot = path.resolve(path.dirname(thisFile), "..", ".."); // indjs/src/commands/create.mjs -> indjs/
    const assetsDir = path.join(pkgRoot, "assets");
    // We ignore if it fails, just best effort
    await fs
      .copyFile(
        path.join(assetsDir, "indjs2.png"),
        path.join(appPath, "public", "favicon.png"),
      )
      .catch(() => { });
  } catch { }
}

async function createGitignore(appPath) {
  await fs.writeFile(
    path.join(appPath, ".gitignore"),
    `node_modules
    .indjs
  dist
    .env
  android
  ios
    `,
  );
}
