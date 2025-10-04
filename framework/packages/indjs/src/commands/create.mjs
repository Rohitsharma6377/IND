import fs from 'fs/promises';
import path from 'path';
import chalk from 'chalk';
import ora from 'ora';
import inquirer from 'inquirer';

const templates = {
  basic: {
    name: 'Basic App',
    description: 'A minimal INDJS application with essential files'
  },
  blog: {
    name: 'Blog Template',
    description: 'A blog application with posts, categories, and comments'
  },
  ecommerce: {
    name: 'E-commerce Template',
    description: 'An e-commerce application with products, cart, and checkout'
  },
  dashboard: {
    name: 'Admin Dashboard',
    description: 'An admin dashboard with authentication and data visualization'
  }
};

export async function create({ name, template }) {
  const spinner = ora('Creating INDJS application...').start();
  
  try {
    // Check if directory already exists
    const appPath = path.resolve(process.cwd(), name);
    try {
      await fs.access(appPath);
      spinner.fail(chalk.red(`Directory ${name} already exists`));
      return;
    } catch {
      // Directory doesn't exist, which is good
    }

    // Select template if not provided
    if (!template) {
      spinner.stop();
      const { selectedTemplate } = await inquirer.prompt([
        {
          type: 'list',
          name: 'selectedTemplate',
          message: 'Choose a template:',
          choices: Object.entries(templates).map(([key, value]) => ({
            name: `${value.name} - ${value.description}`,
            value: key
          }))
        }
      ]);
      template = selectedTemplate;
      spinner.start('Creating INDJS application...');
    }

    // Create directory structure
    await fs.mkdir(appPath, { recursive: true });
    await createDirectoryStructure(appPath, template);
    await createPackageJson(appPath, name);
    await createConfigFiles(appPath);
    await createPages(appPath, template);
    await createComponents(appPath, template);
    await createStyles(appPath);
    await createPublicAssets(appPath);

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

async function createPackageJson(appPath, name) {
  const packageJson = {
    name: name.toLowerCase().replace(/\s+/g, '-'),
    version: '0.1.0',
    private: true,
    scripts: {
      dev: 'indjs dev',
      build: 'indjs build',
      start: 'indjs start',
      test: 'indjs test'
    },
    dependencies: {
      indjs: '^1.0.0',
      react: '^18.2.0',
      'react-dom': '^18.2.0'
    },
    devDependencies: {
      '@types/react': '^18.2.0',
      '@types/react-dom': '^18.2.0',
      typescript: '^5.0.0'
    }
  };

  await fs.writeFile(
    path.join(appPath, 'package.json'),
    JSON.stringify(packageJson, null, 2)
  );
}

async function createConfigFiles(appPath) {
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

  await fs.writeFile(
    path.join(appPath, 'tsconfig.json'),
    JSON.stringify(tsConfig, null, 2)
  );

  // Tailwind config
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

  await fs.writeFile(path.join(appPath, 'tailwind.config.js'), tailwindConfig);

  // PostCSS config
  const postCssConfig = `module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}`;

  await fs.writeFile(path.join(appPath, 'postcss.config.js'), postCssConfig);

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
}

async function createPages(appPath, template) {
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

  await fs.writeFile(path.join(appPath, 'pages', 'index.jsx'), indexPage);

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

  await fs.writeFile(path.join(appPath, 'pages', 'about.jsx'), aboutPage);

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

  await fs.writeFile(path.join(appPath, 'pages', '_layout.jsx'), layout);
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
}
