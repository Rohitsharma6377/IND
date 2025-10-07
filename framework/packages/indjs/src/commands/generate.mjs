import fs from 'fs/promises';
import path from 'path';
import chalk from 'chalk';
import ora from 'ora';
import inquirer from 'inquirer';

const generators = {
  page: generatePage,
  component: generateComponent,
  api: generateAPI,
  layout: generateLayout,
  hook: generateHook,
  util: generateUtil,
  worker: generateWorker,
  test: generateTest
};

async function promptIfInteractive(spinner, questions, defaults, noPrompt) {
  if (noPrompt) return defaults;
  if (!process.stdout.isTTY) return defaults;
  // Pause spinner to avoid prompt rendering conflicts
  const wasSpinning = spinner && spinner.isSpinning;
  if (wasSpinning) spinner.stop();
  try {
    const ans = await inquirer.prompt(questions);
    return ans;
  } finally {
    if (wasSpinning) spinner.start();
  }
}

export async function generate({ type, name, root, noPrompt = false }) {
  const spinner = ora(`Generating ${type}: ${name}...`).start();
  
  try {
    if (!generators[type]) {
      spinner.fail(chalk.red(`Unknown generator type: ${type}`));
      console.log('Available types: page, component, api, layout, hook, util, worker, test');
      return;
    }

    await generators[type](name, root, spinner, noPrompt);
    spinner.succeed(chalk.green(`✅ Generated ${type}: ${name}`));
    
  } catch (error) {
    spinner.fail(chalk.red(`Failed to generate ${type}`));
    console.error(error.message);
    process.exit(1);
  }
}

async function generatePage(name, root, spinner, noPrompt) {
  const isTS = await detectTypescript(root);
  const ext = isTS ? 'tsx' : 'jsx';
  const pagePath = path.join(root, 'pages', `${name}.${ext}`);
  
  // Check if page already exists
  try {
    await fs.access(pagePath);
    throw new Error(`Page ${name} already exists`);
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
  }

  const componentName = toPascalCase(name);
  // Ask for details when interactive
  let answers = {
    title: componentName,
    description: `Description for ${name} page`,
    dataStrategy: 'none',
    addSeo: true,
    wrapLayout: false
  };
  answers = await promptIfInteractive(
    spinner,
    [
      { name: 'title', message: 'Page title', default: componentName },
      { name: 'description', message: 'SEO description', default: `Description for ${name} page` },
      {
        type: 'list',
        name: 'dataStrategy',
        message: 'Data fetching strategy',
        choices: [
          { name: 'None', value: 'none' },
          { name: 'SSR (getServerSideProps)', value: 'ssr' },
          { name: 'SSG (getStaticProps)', value: 'ssg' }
        ],
        default: 'none'
      },
      { type: 'confirm', name: 'addSeo', message: 'Include SEO metadata export?', default: true },
      { type: 'confirm', name: 'wrapLayout', message: 'Wrap with layout placeholder?', default: false }
    ],
    answers,
    noPrompt
  );

  const seoBlock = answers.addSeo
    ? `\nexport const metadata = {\n  title: '${answers.title}',\n  description: '${answers.description.replace(/'/g, "\\'")}'\n};\n`
    : '';

  const dataBlocks = {
    none: '',
    ssr: `\nexport async function getServerSideProps({ req, res, params, query }) {\n  // Fetch data for SSR here\n  return { props: {} };\n}\n`,
    ssg: `\nexport async function getStaticProps({ params }) {\n  // Fetch data for SSG here\n  return { props: {} };\n}\n`
  };

  const layoutOpen = answers.wrapLayout ? `\n      {/* Layout wrapper start */}\n      <div className=\"container mx-auto px-4\">` : '';
  const layoutClose = answers.wrapLayout ? `\n      </div>\n      {/* Layout wrapper end */}` : '';

  const pageContent = `import React from 'react';\n\nexport default function ${componentName}() {\n  return (\n    <div className=\"min-h-screen bg-white\">${layoutOpen}\n        <div className=\"py-16\">\n          <h1 className=\"text-4xl font-bold text-gray-900 mb-8\">${answers.title}</h1>\n          <p className=\"text-lg text-gray-600\">${answers.description}</p>\n        </div>${layoutClose}\n    </div>\n  );\n}\n${dataBlocks[answers.dataStrategy]}${seoBlock}`;

  await fs.writeFile(pagePath, pageContent);
  console.log(chalk.blue(`📄 Created page: pages/${name}.${ext}`));
}

async function generateComponent(name, root, spinner, noPrompt) {
  const isTS = await detectTypescript(root);
  const ext = isTS ? 'tsx' : 'jsx';
  const componentDir = path.join(root, 'components');
  const componentPath = path.join(componentDir, `${toPascalCase(name)}.${ext}`);
  
  // Ensure components directory exists
  await fs.mkdir(componentDir, { recursive: true });
  
  // Check if component already exists
  try {
    await fs.access(componentPath);
    throw new Error(`Component ${name} already exists`);
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
  }

  const componentName = toPascalCase(name);
  // Ask for details when interactive
  let compAnswers = {
    variants: ['default'],
    sizes: ['md'],
    withTest: false,
    withAria: true
  };
  compAnswers = await promptIfInteractive(
    spinner,
    [
      { type: 'checkbox', name: 'variants', message: 'Variants', choices: ['default','primary','secondary','ghost'], default: ['default'] },
      { type: 'checkbox', name: 'sizes', message: 'Sizes', choices: ['sm','md','lg'], default: ['md'] },
      { type: 'confirm', name: 'withAria', message: 'Include ARIA role/props?', default: true },
      { type: 'confirm', name: 'withTest', message: 'Generate basic test file?', default: false }
    ],
    compAnswers,
    noPrompt
  );

  const variantUnion = compAnswers.variants.map(v=>`'${v}'`).join(' | ') || `'default'`;
  const sizeUnion = compAnswers.sizes.map(v=>`'${v}'`).join(' | ') || `'md'`;

  const componentContent = isTS
    ? `import React from 'react';

interface ${componentName}Props {
  // Define your props here
  className?: string;
  variant?: ${variantUnion};
  size?: ${sizeUnion};
  children?: React.ReactNode;
}

export default function ${componentName}({ 
  className = '',
  variant = '${compAnswers.variants[0] || 'default'}',
  size = '${compAnswers.sizes[0] || 'md'}',
  children,
  ...props 
}: ${componentName}Props) {
  const base = '${componentName.toLowerCase()}';
  const variantClass = variant === 'primary' ? 'bg-blue-600 text-white' : variant === 'secondary' ? 'bg-gray-100' : '';
  const sizeClass = size === 'sm' ? 'text-sm px-2 py-1' : size === 'lg' ? 'text-lg px-4 py-3' : 'text-base px-3 py-2';
  return (
    <div className={\`${'${base}'} \${variantClass} \${sizeClass} \${className}\`} ${compAnswers.withAria ? "role=\"group\"" : ''} {...props}>
      <h2 className="text-2xl font-semibold mb-4">${componentName}</h2>
      {children}
    </div>
  );
}

// Optional: Add default props
(${componentName} as any).defaultProps = {
  className: ''
};
`
    : `import React from 'react';

export default function ${componentName}({ 
  className = '',
  variant = '${(compAnswers.variants && compAnswers.variants[0]) || 'default'}',
  size = '${(compAnswers.sizes && compAnswers.sizes[0]) || 'md'}',
  children,
  ...props 
}) {
  const base = '${componentName.toLowerCase()}';
  const variantClass = variant === 'primary' ? 'bg-blue-600 text-white' : variant === 'secondary' ? 'bg-gray-100' : '';
  const sizeClass = size === 'sm' ? 'text-sm px-2 py-1' : size === 'lg' ? 'text-lg px-4 py-3' : 'text-base px-3 py-2';
  return (
    <div className={\`${'${base}'} \${variantClass} \${sizeClass} \${className}\`} ${compAnswers.withAria ? "role=\"group\"" : ''} {...props}>
      <h2 className="text-2xl font-semibold mb-4">${componentName}</h2>
      {children}
    </div>
  );
}

// Optional: Add default props
${componentName}.defaultProps = {
  className: ''
};
`;

  await fs.writeFile(componentPath, componentContent);
  console.log(chalk.blue(`🧩 Created component: components/${toPascalCase(name)}.${ext}`));

  // Optional: test file
  if (compAnswers.withTest) {
    const testsDir = path.join(root, 'tests');
    await fs.mkdir(testsDir, { recursive: true });
    const testBody = `import { describe, it, expect } from 'vitest';\nimport React from 'react';\nimport { render } from '@testing-library/react';\nimport ${componentName} from '../components/${componentName}.jsx';\n\ndescribe('${componentName}', () => {\n  it('renders children', () => {\n    const { getByText } = render(<${componentName}>Hello</${componentName}>);\n    expect(getByText('Hello')).toBeTruthy();\n  });\n});\n`;
    const testPath = path.join(testsDir, `${componentName}.test.js`);
    try { await fs.access(testPath); } catch { await fs.writeFile(testPath, testBody); }
    console.log(chalk.blue(`✅ Created test: tests/${componentName}.test.js`));
  }
}

async function generateAPI(name, root, spinner, noPrompt) {
  const apiDir = path.join(root, 'pages', 'api');
  const apiPath = path.join(apiDir, `${name}.js`);
  
  // Ensure api directory exists
  await fs.mkdir(apiDir, { recursive: true });
  
  // Check if API route already exists
  try {
    await fs.access(apiPath);
    throw new Error(`API route ${name} already exists`);
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
  }

  // Ask for details when interactive
  let apiAnswers = {
    methods: ['GET','POST'],
    validate: true,
    auth: false
  };
  apiAnswers = await promptIfInteractive(
    spinner,
    [
      { type: 'checkbox', name: 'methods', message: 'HTTP methods', choices: ['GET','POST','PUT','DELETE'], default: ['GET','POST'] },
      { type: 'confirm', name: 'validate', message: 'Include basic input validation?', default: true },
      { type: 'confirm', name: 'auth', message: 'Require auth header (Bearer ...)?', default: false }
    ],
    apiAnswers,
    noPrompt
  );

  const maybeAuth = apiAnswers.auth
    ? `\n  // Simple auth check\n  if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) {\n    res.status(401);\n    return { error: 'Unauthorized' };\n  }\n`
    : '';

  const maybeValidate = apiAnswers.validate
    ? `\n  // Basic validation example\n  if (body && typeof body !== 'object') {\n    res.status(400);\n    return { error: 'Invalid JSON body' };\n  }\n`
    : '';

  const has = (m) => apiAnswers.methods.includes(m);
  const apiContent = `// API route: /api/${name}\n\n${has('GET') ? `export async function get({ req, res, query, params }) {\n  try {${maybeAuth}\n    // Handle GET request\n    return { message: 'GET ${name} ok', query, params, timestamp: new Date().toISOString() };\n  } catch (error) {\n    res.status(500);\n    return { error: 'Internal server error', message: error.message };\n  }\n}\n\n` : ''}${has('POST') ? `export async function post({ req, res, body, query, params }) {\n  try {${maybeAuth}${maybeValidate}\n    // Handle POST request\n    return { message: 'POST ${name} ok', data: body || {}, timestamp: new Date().toISOString() };\n  } catch (error) {\n    res.status(500);\n    return { error: 'Internal server error', message: error.message };\n  }\n}\n\n` : ''}${has('PUT') ? `export async function put({ req, res, body, query, params }) {\n  try {${maybeAuth}${maybeValidate}\n    // Handle PUT request\n    return { message: 'PUT ${name} ok', data: body || {}, timestamp: new Date().toISOString() };\n  } catch (error) {\n    res.status(500);\n    return { error: 'Internal server error', message: error.message };\n  }\n}\n\n` : ''}${has('DELETE') ? `export async function del({ req, res, query, params }) {\n  try {${maybeAuth}\n    // Handle DELETE request\n    return { message: 'DELETE ${name} ok', timestamp: new Date().toISOString() };\n  } catch (error) {\n    res.status(500);\n    return { error: 'Internal server error', message: error.message };\n  }\n}\n` : ''}`;

  await fs.writeFile(apiPath, apiContent);
  console.log(chalk.blue(`🔌 Created API route: pages/api/${name}.js`));
}

async function generateLayout(name, root) {
  const isTS = await detectTypescript(root);
  const ext = isTS ? 'tsx' : 'jsx';
  const layoutPath = path.join(root, 'pages', `_${name}.${ext}`);
  
  // Check if layout already exists
  try {
    await fs.access(layoutPath);
    throw new Error(`Layout ${name} already exists`);
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
  }

  const componentName = toPascalCase(name);
  const layoutContent = `import React from 'react';

export default function ${componentName}Layout({ children, ...props }) {
  return (
    <div className="${name}-layout">
      {/* Add your layout structure here */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-xl font-semibold">${componentName} Layout</h1>
        </div>
      </header>
      
      <main className="flex-1">
        {children}
      </main>
      
      <footer className="bg-gray-50 py-8">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>&copy; 2024 Your App. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}`;

  await fs.writeFile(layoutPath, layoutContent);
  console.log(chalk.blue(`🎨 Created layout: pages/_${name}.${ext}`));
}

async function generateHook(name, root) {
  const hooksDir = path.join(root, 'hooks');
  const hookPath = path.join(hooksDir, `use${toPascalCase(name)}.js`);
  
  // Ensure hooks directory exists
  await fs.mkdir(hooksDir, { recursive: true });
  
  // Check if hook already exists
  try {
    await fs.access(hookPath);
    throw new Error(`Hook ${name} already exists`);
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
  }

  const hookName = `use${toPascalCase(name)}`;
  const hookContent = `import { useState, useEffect } from 'react';

export default function ${hookName}(initialValue) {
  const [value, setValue] = useState(initialValue);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Add your effect logic here
    console.log('${hookName} mounted');
    
    return () => {
      // Cleanup if needed
      console.log('${hookName} unmounted');
    };
  }, []);

  const updateValue = (newValue) => {
    setLoading(true);
    setError(null);
    
    try {
      // Add your update logic here
      setValue(newValue);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    value,
    setValue: updateValue,
    loading,
    error
  };
}`;

  await fs.writeFile(hookPath, hookContent);
  console.log(chalk.blue(`🪝 Created hook: hooks/use${toPascalCase(name)}.js`));
}

async function generateUtil(name, root) {
  const utilsDir = path.join(root, 'utils');
  const utilPath = path.join(utilsDir, `${name}.js`);
  
  // Ensure utils directory exists
  await fs.mkdir(utilsDir, { recursive: true });
  
  // Check if util already exists
  try {
    await fs.access(utilPath);
    throw new Error(`Utility ${name} already exists`);
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
  }

  const utilContent = `/**
 * ${toPascalCase(name)} utility functions
 */

export function ${toCamelCase(name)}(input) {
  // Add your utility function logic here
  console.log('${name} utility called with:', input);
  return input;
}

export function format${toPascalCase(name)}(data) {
  // Add formatting logic here
  return data;
}

export function validate${toPascalCase(name)}(value) {
  // Add validation logic here
  if (!value) {
    throw new Error('Value is required');
  }
  return true;
}

// Export default object with all functions
export default {
  ${toCamelCase(name)},
  format${toPascalCase(name)},
  validate${toPascalCase(name)}
};`;

  await fs.writeFile(utilPath, utilContent);
  console.log(chalk.blue(`🔧 Created utility: utils/${name}.js`));
}

async function generateWorker(name, root) {
  const workersDir = path.join(root, 'workers');
  const pagesApiDir = path.join(root, 'pages', 'api');
  await fs.mkdir(workersDir, { recursive: true });
  await fs.mkdir(pagesApiDir, { recursive: true });

  const workerPath = path.join(workersDir, `${name}.js`);
  const enqueueApiPath = path.join(pagesApiDir, `${name}-enqueue.js`);

  // Worker file
  const workerContent = `// Worker: ${name}
export async function run(payload) {
  // Do background work here
  console.log('[worker:${name}] payload:', payload);
  return { ok: true };
}
`;
  // Simple enqueue API stub
  const apiContent = `// POST /api/${name}-enqueue
export async function post({ body }) {
  // In a real app, push to a queue or trigger a background job
  return { ok: true, queued: true, received: body || {} };
}
`;

  // Write files if not exist
  try { await fs.access(workerPath); } catch { await fs.writeFile(workerPath, workerContent); }
  try { await fs.access(enqueueApiPath); } catch { await fs.writeFile(enqueueApiPath, apiContent); }

  console.log(chalk.blue(`🛠️  Created worker: workers/${name}.js`));
  console.log(chalk.blue(`🔔 Created enqueue API: pages/api/${name}-enqueue.js`));
}

async function generateTest(name, root) {
  const testsDir = path.join(root, 'tests');
  await fs.mkdir(testsDir, { recursive: true });
  const testPath = path.join(testsDir, `${name}.test.js`);
  const body = `import { describe, it, expect } from 'vitest';

describe('${name} generator test', () => {
  it('runs', () => {
    expect(true).toBe(true);
  });
});
`;
  try { await fs.access(testPath); } catch { await fs.writeFile(testPath, body); }
  console.log(chalk.blue(`✅ Created test: tests/${name}.test.js`));
}

// Helper functions
async function detectTypescript(root) {
  try {
    // Heuristic 1: tsconfig.json exists
    await fs.access(path.join(root, 'tsconfig.json'));
    return true;
  } catch {}
  try {
    // Heuristic 2: package.json has typescript dependency
    const pkgRaw = await fs.readFile(path.join(root, 'package.json'), 'utf8');
    const pkg = JSON.parse(pkgRaw);
    const deps = { ...(pkg.dependencies||{}), ...(pkg.devDependencies||{}) };
    return !!deps.typescript;
  } catch {}
  return false;
}
function toPascalCase(str) {
  return str
    .split(/[-_\s]+/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('');
}

function toCamelCase(str) {
  const pascal = toPascalCase(str);
  return pascal.charAt(0).toLowerCase() + pascal.slice(1);
}
