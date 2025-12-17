import fs from "fs/promises";
import path from "path";
import chalk from "chalk";
import ora from "ora";

// Deployment configurations for different platforms
const deploymentConfigs = {
  vercel: {
    name: "Vercel",
    configFile: "vercel.json",
    buildCommand: "npx indjs build",
    outputDirectory: ".indjs/static",
  },
  netlify: {
    name: "Netlify",
    configFile: "netlify.toml",
    buildCommand: "npx indjs build",
    outputDirectory: ".indjs/static",
  },
  docker: {
    name: "Docker",
    configFile: "Dockerfile",
    buildCommand: "docker build",
    outputDirectory: null,
  },
  aws: {
    name: "AWS",
    configFile: "aws-config.json",
    buildCommand: "npx indjs build",
    outputDirectory: ".indjs/static",
  },
  gcp: {
    name: "Google Cloud Platform",
    configFile: "app.yaml",
    buildCommand: "npx indjs build",
    outputDirectory: ".indjs/static",
  },
};

// Generate Vercel configuration
export async function generateVercelConfig(root, options = {}) {
  const config = {
    version: 2,
    name: options.name || path.basename(root),
    builds: [
      {
        src: "package.json",
        use: "@vercel/node",
      },
    ],
    routes: [
      {
        src: "/api/(.*)",
        dest: "/api/$1",
      },
      {
        src: "/_image",
        dest: "/_image",
      },
      {
        src: "/(.*)",
        dest: "/$1",
      },
    ],
    functions: {
      "pages/api/**/*.js": {
        runtime: "nodejs18.x",
      },
    },
    env: options.env || {},
    ...options.vercelConfig,
  };

  await fs.writeFile(
    path.join(root, "vercel.json"),
    JSON.stringify(config, null, 2),
  );

  return config;
}

// Generate Netlify configuration
export async function generateNetlifyConfig(root, options = {}) {
  const config = `[build]
  command = "${options.buildCommand || "npx indjs build"}"
  publish = "${options.outputDirectory || ".indjs/static"}"

[build.environment]
  NODE_VERSION = "18"
  NPM_FLAGS = "--production=false"

[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/:splat"
  status = 200

[[redirects]]
  from = "/_image"
  to = "/.netlify/functions/image-optimizer"
  status = 200

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[functions]
  directory = "netlify/functions"
  node_bundler = "esbuild"

${
  options.headers
    ? `
[[headers]]
  for = "/*"
  [headers.values]
${Object.entries(options.headers)
  .map(([key, value]) => `    ${key} = "${value}"`)
  .join("\n")}
`
    : ""
}

${
  options.redirects
    ? options.redirects
        .map(
          (redirect) => `
[[redirects]]
  from = "${redirect.from}"
  to = "${redirect.to}"
  status = ${redirect.status || 301}
`,
        )
        .join("")
    : ""
}
`;

  await fs.writeFile(path.join(root, "netlify.toml"), config);

  // Create Netlify functions directory
  const functionsDir = path.join(root, "netlify", "functions");
  await fs.mkdir(functionsDir, { recursive: true });

  // Create image optimizer function
  const imageOptimizer = `const sharp = require('sharp');

exports.handler = async (event, context) => {
  try {
    const { src, w, q } = event.queryStringParameters || {};
    
    if (!src) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing src parameter' })
      };
    }

    const width = w ? parseInt(w, 10) : undefined;
    const quality = q ? parseInt(q, 10) : 80;

    // In a real implementation, you would fetch the image from your storage
    // and process it with Sharp
    
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'image/jpeg',
        'Cache-Control': 'public, max-age=31536000'
      },
      body: 'Image optimization not implemented',
      isBase64Encoded: false
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};`;

  await fs.writeFile(
    path.join(functionsDir, "image-optimizer.js"),
    imageOptimizer,
  );

  return config;
}

// Generate Docker configuration
export async function generateDockerConfig(root, options = {}) {
  const dockerfile = `# Use Node.js ${options.nodeVersion || "18"} Alpine image
FROM node:${options.nodeVersion || "18"}-alpine

# Set working directory
WORKDIR /app

# Install system dependencies
RUN apk add --no-cache libc6-compat

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production && npm cache clean --force

# Copy source code
COPY . .

# Build the application
RUN npx indjs build

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S indjs -u 1001

# Change ownership of the app directory
RUN chown -R indjs:nodejs /app
USER indjs

# Expose port
EXPOSE ${options.port || 3000}

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \\
  CMD wget --no-verbose --tries=1 --spider http://localhost:${options.port || 3000}/api/health || exit 1

# Start the application
CMD ["npx", "indjs", "start"]
`;

  await fs.writeFile(path.join(root, "Dockerfile"), dockerfile);

  // Generate docker-compose.yml
  const dockerCompose = `version: '3.8'

services:
  app:
    build: .
    ports:
      - "${options.port || 3000}:${options.port || 3000}"
    environment:
      - NODE_ENV=production
      - PORT=${options.port || 3000}
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "wget", "--no-verbose", "--tries=1", "--spider", "http://localhost:${options.port || 3000}/api/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s
    depends_on:
      - db

  db:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: \${DATABASE_NAME:-myapp}
      POSTGRES_USER: \${DATABASE_USER:-user}
      POSTGRES_PASSWORD: \${DATABASE_PASSWORD:-password}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"
    restart: unless-stopped

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    restart: unless-stopped

volumes:
  postgres_data:
  redis_data:
`;

  await fs.writeFile(path.join(root, "docker-compose.yml"), dockerCompose);

  // Generate .dockerignore
  const dockerignore = `node_modules
.indjs
.git
.gitignore
README.md
.env
.env.local
.env.*.local
npm-debug.log*
yarn-debug.log*
yarn-error.log*
.DS_Store
*.tsbuildinfo
.nyc_output
coverage
.vscode
.idea
*.swp
*.swo
*~
`;

  await fs.writeFile(path.join(root, ".dockerignore"), dockerignore);

  return { dockerfile, dockerCompose, dockerignore };
}

// Generate AWS configuration
export async function generateAWSConfig(root, options = {}) {
  // Generate AWS Lambda configuration
  const lambdaConfig = {
    name: options.name || path.basename(root),
    runtime: "nodejs18.x",
    handler: "lambda.handler",
    timeout: options.timeout || 30,
    memorySize: options.memorySize || 512,
    environment: options.env || {},
    layers: options.layers || [],
  };

  await fs.writeFile(
    path.join(root, "aws-config.json"),
    JSON.stringify(lambdaConfig, null, 2),
  );

  // Generate Lambda handler
  const lambdaHandler = `const { start } = require('indjs');

let server;

exports.handler = async (event, context) => {
  if (!server) {
    server = await start({
      root: __dirname,
      port: 3000
    });
  }

  // Convert AWS Lambda event to Express-compatible request
  const req = {
    method: event.httpMethod,
    url: event.path,
    headers: event.headers || {},
    query: event.queryStringParameters || {},
    body: event.body ? JSON.parse(event.body) : {}
  };

  return new Promise((resolve, reject) => {
    const res = {
      statusCode: 200,
      headers: {},
      body: '',
      status: function(code) {
        this.statusCode = code;
        return this;
      },
      json: function(data) {
        this.headers['Content-Type'] = 'application/json';
        this.body = JSON.stringify(data);
        resolve(this);
      },
      send: function(data) {
        this.body = data;
        resolve(this);
      },
      setHeader: function(name, value) {
        this.headers[name] = value;
      }
    };

    // Process request with INDJS
    server.handle(req, res);
  });
};`;

  await fs.writeFile(path.join(root, "lambda.js"), lambdaHandler);

  // Generate CloudFormation template
  const cloudFormationTemplate = {
    AWSTemplateFormatVersion: "2010-09-09",
    Transform: "AWS::Serverless-2016-10-31",
    Description: `INDJS application: ${options.name || path.basename(root)}`,
    Resources: {
      INDJSFunction: {
        Type: "AWS::Serverless::Function",
        Properties: {
          CodeUri: ".",
          Handler: "lambda.handler",
          Runtime: "nodejs18.x",
          Timeout: options.timeout || 30,
          MemorySize: options.memorySize || 512,
          Environment: {
            Variables: options.env || {},
          },
          Events: {
            Api: {
              Type: "Api",
              Properties: {
                Path: "/{proxy+}",
                Method: "ANY",
              },
            },
          },
        },
      },
    },
    Outputs: {
      ApiUrl: {
        Description: "API Gateway endpoint URL",
        Value: {
          "Fn::Sub":
            "https://${ServerlessRestApi}.execute-api.${AWS::Region}.amazonaws.com/Prod/",
        },
      },
    },
  };

  await fs.writeFile(
    path.join(root, "template.yaml"),
    JSON.stringify(cloudFormationTemplate, null, 2),
  );

  return { lambdaConfig, lambdaHandler, cloudFormationTemplate };
}

// Generate Google Cloud Platform configuration
export async function generateGCPConfig(root, options = {}) {
  const appYaml = `runtime: nodejs18

env_variables:
  NODE_ENV: production
${Object.entries(options.env || {})
  .map(([key, value]) => `  ${key}: "${value}"`)
  .join("\n")}

automatic_scaling:
  min_instances: ${options.minInstances || 1}
  max_instances: ${options.maxInstances || 10}
  target_cpu_utilization: ${options.targetCpu || 0.6}

resources:
  cpu: ${options.cpu || 1}
  memory_gb: ${options.memory || 1}
  disk_size_gb: ${options.diskSize || 10}

handlers:
- url: /.*
  script: auto
  secure: always
`;

  await fs.writeFile(path.join(root, "app.yaml"), appYaml);

  // Generate Cloud Build configuration
  const cloudBuildConfig = {
    steps: [
      {
        name: "node:18",
        entrypoint: "npm",
        args: ["install"],
      },
      {
        name: "node:18",
        entrypoint: "npm",
        args: ["run", "build"],
      },
      {
        name: "gcr.io/cloud-builders/gcloud",
        args: ["app", "deploy"],
      },
    ],
  };

  await fs.writeFile(
    path.join(root, "cloudbuild.yaml"),
    JSON.stringify(cloudBuildConfig, null, 2),
  );

  return { appYaml, cloudBuildConfig };
}

// Health check endpoint generator
export async function generateHealthCheck(root) {
  const healthCheckAPI = `// Health check endpoint
export async function get({ req, res }) {
  const health = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    version: process.env.npm_package_version || '1.0.0'
  };

  // Add database health check if connected
  try {
    const { getAdapter } = await import('indjs/database');
    const adapter = getAdapter();
    await adapter.query('SELECT 1');
    health.database = 'connected';
  } catch (error) {
    health.database = 'disconnected';
    health.status = 'degraded';
  }

  const statusCode = health.status === 'ok' ? 200 : 503;
  res.status(statusCode);
  
  return health;
}`;

  const apiDir = path.join(root, "pages", "api");
  await fs.mkdir(apiDir, { recursive: true });
  await fs.writeFile(path.join(apiDir, "health.js"), healthCheckAPI);
}

// Environment configuration generator
export async function generateEnvConfig(root, platform, options = {}) {
  const envVars = {
    NODE_ENV: "production",
    PORT: options.port || 3000,
    DATABASE_URL: options.databaseUrl || "",
    JWT_SECRET: options.jwtSecret || "your-secret-key",
    ...options.env,
  };

  // Platform-specific environment files
  const envFiles = {
    vercel: ".env.production",
    netlify: ".env.production",
    docker: ".env.production",
    aws: ".env.production",
    gcp: ".env.yaml",
  };

  const envFile = envFiles[platform] || ".env.production";

  if (platform === "gcp" && envFile.endsWith(".yaml")) {
    // GCP uses YAML format
    const yamlContent = Object.entries(envVars)
      .map(([key, value]) => `${key}: "${value}"`)
      .join("\n");

    await fs.writeFile(path.join(root, envFile), yamlContent);
  } else {
    // Standard .env format
    const envContent = Object.entries(envVars)
      .map(([key, value]) => `${key}=${value}`)
      .join("\n");

    await fs.writeFile(path.join(root, envFile), envContent);
  }

  return envVars;
}

// Deployment validator
export async function validateDeployment(root, platform) {
  const config = deploymentConfigs[platform];
  if (!config) {
    throw new Error(`Unsupported platform: ${platform}`);
  }

  const issues = [];

  // Check if required files exist
  try {
    await fs.access(path.join(root, "package.json"));
  } catch {
    issues.push("Missing package.json");
  }

  try {
    await fs.access(path.join(root, "pages"));
  } catch {
    issues.push("Missing pages directory");
  }

  // Platform-specific validations
  if (platform === "vercel") {
    try {
      const packageJson = JSON.parse(
        await fs.readFile(path.join(root, "package.json"), "utf8"),
      );
      if (!packageJson.scripts?.build) {
        issues.push("Missing build script in package.json");
      }
    } catch {
      issues.push("Invalid package.json");
    }
  }

  if (platform === "docker") {
    try {
      await fs.access(path.join(root, "Dockerfile"));
    } catch {
      issues.push("Missing Dockerfile");
    }
  }

  return {
    valid: issues.length === 0,
    issues,
  };
}

// Deployment status checker
export class DeploymentStatus {
  constructor(platform, deploymentId) {
    this.platform = platform;
    this.deploymentId = deploymentId;
    this.status = "pending";
    this.logs = [];
  }

  addLog(message, level = "info") {
    this.logs.push({
      message,
      level,
      timestamp: new Date().toISOString(),
    });
  }

  setStatus(status) {
    this.status = status;
    this.addLog(`Status changed to: ${status}`);
  }

  getStatus() {
    return {
      platform: this.platform,
      deploymentId: this.deploymentId,
      status: this.status,
      logs: this.logs,
      lastUpdated: new Date().toISOString(),
    };
  }
}

// Export all utilities
export default {
  deploymentConfigs,
  generateVercelConfig,
  generateNetlifyConfig,
  generateDockerConfig,
  generateAWSConfig,
  generateGCPConfig,
  generateHealthCheck,
  generateEnvConfig,
  validateDeployment,
  DeploymentStatus,
};
