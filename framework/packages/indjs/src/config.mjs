import fs from 'fs/promises';
import path from 'path';
import { pathToFileURL } from 'url';

// Default configuration
const defaultConfig = {
  // Server configuration
  server: {
    port: 3000,
    host: 'localhost',
    compression: true,
    cors: {
      enabled: false,
      origin: '*',
      credentials: true
    },
    helmet: {
      enabled: true,
      contentSecurityPolicy: false
    }
  },

  // Build configuration
  build: {
    target: 'es2020',
    minify: true,
    sourcemap: true,
    splitting: true,
    outDir: '.indjs',
    publicPath: '/',
    analyze: false
  },

  // Development configuration
  dev: {
    hmr: true,
    overlay: true,
    open: false,
    https: false,
    proxy: {}
  },

  // CSS configuration
  css: {
    tailwind: {
      enabled: true,
      config: './tailwind.config.js'
    },
    postcss: {
      enabled: true,
      config: './postcss.config.js'
    },
    modules: false,
    extract: true
  },

  // Image optimization
  images: {
    enabled: true,
    formats: ['webp', 'avif', 'jpeg', 'png'],
    quality: 80,
    sizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    domains: [],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384]
  },

  // Authentication configuration
  auth: {
    enabled: false,
    secret: process.env.JWT_SECRET,
    expiresIn: '7d',
    cookieName: 'indjs-token',
    providers: []
  },

  // Database configuration
  database: {
    enabled: false,
    type: 'sqlite',
    url: process.env.DATABASE_URL || 'sqlite:./data/app.db',
    migrations: {
      enabled: true,
      directory: './migrations'
    }
  },

  // Middleware configuration
  middleware: {
    enabled: [],
    custom: []
  },

  // SEO configuration
  seo: {
    sitemap: {
      enabled: true,
      changefreq: 'daily',
      priority: 0.7
    },
    robots: {
      enabled: true,
      rules: [
        {
          userAgent: '*',
          allow: '/',
          disallow: ['/admin', '/api']
        }
      ]
    }
  },

  // Analytics configuration
  analytics: {
    enabled: false,
    providers: []
  },

  // Deployment configuration
  deployment: {
    platform: 'vercel',
    env: {},
    domains: []
  },

  // Experimental features
  experimental: {
    appDir: false,
    serverComponents: false,
    streaming: false
  }
};

let currentConfig = { ...defaultConfig };

// Load configuration from file
export async function loadConfig(root = process.cwd()) {
  const configFiles = [
    'indjs.config.js',
    'indjs.config.mjs',
    'indjs.config.ts'
  ];

  for (const configFile of configFiles) {
    const configPath = path.join(root, configFile);
    
    try {
      await fs.access(configPath);
      
      // Import the config file
      const configModule = await import(pathToFileURL(configPath).href);
      const userConfig = configModule.default || configModule;
      
      // Merge with default config
      currentConfig = mergeConfig(defaultConfig, userConfig);
      
      console.log(`✅ Loaded configuration from ${configFile}`);
      break;
    } catch (error) {
      // Config file doesn't exist, continue
      continue;
    }
  }

  // Override with environment variables
  applyEnvOverrides();
  
  return currentConfig;
}

// Get current configuration
export function getConfig() {
  return currentConfig;
}

// Update configuration
export function updateConfig(updates) {
  currentConfig = mergeConfig(currentConfig, updates);
  return currentConfig;
}

// Deep merge configuration objects
function mergeConfig(target, source) {
  const result = { ...target };
  
  for (const key in source) {
    if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
      result[key] = mergeConfig(target[key] || {}, source[key]);
    } else {
      result[key] = source[key];
    }
  }
  
  return result;
}

// Apply environment variable overrides
function applyEnvOverrides() {
  // Server configuration
  if (process.env.PORT) {
    currentConfig.server.port = parseInt(process.env.PORT, 10);
  }
  
  if (process.env.HOST) {
    currentConfig.server.host = process.env.HOST;
  }

  // Database configuration
  if (process.env.DATABASE_URL) {
    currentConfig.database.url = process.env.DATABASE_URL;
    currentConfig.database.enabled = true;
  }

  if (process.env.DATABASE_TYPE) {
    currentConfig.database.type = process.env.DATABASE_TYPE;
  }

  // Authentication configuration
  if (process.env.JWT_SECRET) {
    currentConfig.auth.secret = process.env.JWT_SECRET;
    currentConfig.auth.enabled = true;
  }

  // Build configuration
  if (process.env.NODE_ENV === 'production') {
    currentConfig.build.minify = true;
    currentConfig.build.sourcemap = false;
    currentConfig.dev.hmr = false;
    currentConfig.dev.overlay = false;
  }

  if (process.env.NODE_ENV === 'development') {
    currentConfig.build.minify = false;
    currentConfig.build.sourcemap = true;
    currentConfig.dev.hmr = true;
    currentConfig.dev.overlay = true;
  }
}

// Validate configuration
export function validateConfig(config = currentConfig) {
  const errors = [];

  // Validate server configuration
  if (config.server.port < 1 || config.server.port > 65535) {
    errors.push('Server port must be between 1 and 65535');
  }

  // Validate database configuration
  if (config.database.enabled && !config.database.url) {
    errors.push('Database URL is required when database is enabled');
  }

  // Validate authentication configuration
  if (config.auth.enabled && !config.auth.secret) {
    errors.push('JWT secret is required when authentication is enabled');
  }

  // Validate image configuration
  if (config.images.quality < 1 || config.images.quality > 100) {
    errors.push('Image quality must be between 1 and 100');
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

// Generate configuration file
export async function generateConfig(root, options = {}) {
  const configTemplate = `// INDJS Configuration
// https://indjs.dev/docs/configuration

export default {
  // Server configuration
  server: {
    port: ${options.port || 3000},
    compression: true,
    cors: {
      enabled: ${options.cors || false},
      origin: '*'
    }
  },

  // Build configuration
  build: {
    target: 'es2020',
    minify: true,
    sourcemap: true
  },

  // CSS configuration
  css: {
    tailwind: {
      enabled: true
    }
  },

  // Image optimization
  images: {
    enabled: true,
    quality: 80
  },

  // Authentication (optional)
  auth: {
    enabled: ${options.auth || false},
    secret: process.env.JWT_SECRET,
    providers: ${JSON.stringify(options.authProviders || [])}
  },

  // Database (optional)
  database: {
    enabled: ${options.database || false},
    type: '${options.databaseType || 'sqlite'}',
    url: process.env.DATABASE_URL
  },

  // SEO configuration
  seo: {
    sitemap: {
      enabled: true
    },
    robots: {
      enabled: true
    }
  }
};`;

  const configPath = path.join(root, 'indjs.config.js');
  await fs.writeFile(configPath, configTemplate);
  
  return configPath;
}

// Configuration presets
export const presets = {
  minimal: {
    css: { tailwind: { enabled: false } },
    images: { enabled: false },
    seo: { sitemap: { enabled: false }, robots: { enabled: false } }
  },

  blog: {
    seo: {
      sitemap: { enabled: true, changefreq: 'weekly' },
      robots: { enabled: true }
    },
    images: { enabled: true, quality: 85 }
  },

  ecommerce: {
    auth: { enabled: true },
    database: { enabled: true },
    images: { enabled: true, quality: 90 },
    server: { compression: true }
  },

  api: {
    css: { tailwind: { enabled: false } },
    images: { enabled: false },
    server: { cors: { enabled: true } }
  },

  static: {
    build: { splitting: false },
    server: { compression: true },
    seo: { sitemap: { enabled: true } }
  }
};

// Apply preset
export function applyPreset(presetName) {
  const preset = presets[presetName];
  if (!preset) {
    throw new Error(`Unknown preset: ${presetName}`);
  }
  
  currentConfig = mergeConfig(currentConfig, preset);
  return currentConfig;
}

// Export configuration utilities
export default {
  loadConfig,
  getConfig,
  updateConfig,
  validateConfig,
  generateConfig,
  presets,
  applyPreset,
  defaultConfig
};
