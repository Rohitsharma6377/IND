import fs from 'fs/promises';
import path from 'path';
import chalk from 'chalk';
import ora from 'ora';

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

export async function generate({ type, name, root }) {
  const spinner = ora(`Generating ${type}: ${name}...`).start();
  
  try {
    if (!generators[type]) {
      spinner.fail(chalk.red(`Unknown generator type: ${type}`));
      console.log('Available types: page, component, api, layout, hook, util, worker, test');
      return;
    }

    await generators[type](name, root);
    spinner.succeed(chalk.green(`✅ Generated ${type}: ${name}`));
    
  } catch (error) {
    spinner.fail(chalk.red(`Failed to generate ${type}`));
    console.error(error.message);
    process.exit(1);
  }
}

async function generatePage(name, root) {
  const pagePath = path.join(root, 'pages', `${name}.jsx`);
  
  // Check if page already exists
  try {
    await fs.access(pagePath);
    throw new Error(`Page ${name} already exists`);
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
  }

  const componentName = toPascalCase(name);
  const pageContent = `import React from 'react';

export default function ${componentName}() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          ${componentName}
        </h1>
        <p className="text-lg text-gray-600">
          This is the ${name} page. Edit this file to customize the content.
        </p>
      </div>
    </div>
  );
}

export async function getServerSideProps({ req, res, params, query }) {
  // Fetch data here if needed
  return {
    props: {
      // Pass data to the component
    }
  };
}

// Optional: Add metadata
export const metadata = {
  title: '${componentName}',
  description: 'Description for ${name} page'
};`;

  await fs.writeFile(pagePath, pageContent);
  console.log(chalk.blue(`📄 Created page: pages/${name}.jsx`));
}

async function generateComponent(name, root) {
  const componentDir = path.join(root, 'components');
  const componentPath = path.join(componentDir, `${toPascalCase(name)}.jsx`);
  
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
  const componentContent = `import React from 'react';

interface ${componentName}Props {
  // Define your props here
  className?: string;
  children?: React.ReactNode;
}

export default function ${componentName}({ 
  className = '',
  children,
  ...props 
}: ${componentName}Props) {
  return (
    <div className={\`${componentName.toLowerCase()} \${className}\`} {...props}>
      <h2 className="text-2xl font-semibold mb-4">${componentName}</h2>
      {children}
    </div>
  );
}

// Optional: Add default props
${componentName}.defaultProps = {
  className: ''
};`;

  await fs.writeFile(componentPath, componentContent);
  console.log(chalk.blue(`🧩 Created component: components/${toPascalCase(name)}.jsx`));
}

async function generateAPI(name, root) {
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

  const apiContent = `// API route: /api/${name}

export async function get({ req, res, query, params }) {
  try {
    // Handle GET request
    return {
      message: 'GET request successful',
      data: {
        // Your data here
      },
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    res.status(500);
    return {
      error: 'Internal server error',
      message: error.message
    };
  }
}

export async function post({ req, res, body, query, params }) {
  try {
    // Handle POST request
    console.log('Received data:', body);
    
    return {
      message: 'POST request successful',
      data: body,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    res.status(500);
    return {
      error: 'Internal server error',
      message: error.message
    };
  }
}

export async function put({ req, res, body, query, params }) {
  try {
    // Handle PUT request
    return {
      message: 'PUT request successful',
      data: body,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    res.status(500);
    return {
      error: 'Internal server error',
      message: error.message
    };
  }
}

export async function del({ req, res, query, params }) {
  try {
    // Handle DELETE request
    return {
      message: 'DELETE request successful',
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    res.status(500);
    return {
      error: 'Internal server error',
      message: error.message
    };
  }
}`;

  await fs.writeFile(apiPath, apiContent);
  console.log(chalk.blue(`🔌 Created API route: pages/api/${name}.js`));
}

async function generateLayout(name, root) {
  const layoutPath = path.join(root, 'pages', `_${name}.jsx`);
  
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
  console.log(chalk.blue(`🎨 Created layout: pages/_${name}.jsx`));
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

// Helper functions
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
