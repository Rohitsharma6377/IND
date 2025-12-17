import fs from "fs/promises";
import path from "path";
import chalk from "chalk";
import ora from "ora";
import { build } from "../build.mjs";

const platforms = {
  vercel: deployToVercel,
  netlify: deployToNetlify,
  docker: deployToDocker,
  static: deployStatic,
};

export async function deploy({ platform, root }) {
  const spinner = ora(`Deploying to ${platform}...`).start();

  try {
    if (!platforms[platform]) {
      spinner.fail(chalk.red(`Unknown platform: ${platform}`));
      console.log("Available platforms: vercel, netlify, docker, static");
      return;
    }

    // Build the application first
    spinner.text = "Building application...";
    await build({ root });

    // Deploy to the specified platform
    spinner.text = `Deploying to ${platform}...`;
    await platforms[platform](root);

    spinner.succeed(chalk.green(`✅ Successfully deployed to ${platform}`));
  } catch (error) {
    spinner.fail(chalk.red(`Failed to deploy to ${platform}`));
    console.error(error.message);
    process.exit(1);
  }
}

async function deployToVercel(root) {
  // Create vercel.json configuration
  const vercelConfig = {
    version: 2,
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
        src: "/(.*)",
        dest: "/$1",
      },
    ],
    functions: {
      "pages/api/**/*.js": {
        runtime: "nodejs18.x",
      },
    },
  };

  await fs.writeFile(
    path.join(root, "vercel.json"),
    JSON.stringify(vercelConfig, null, 2),
  );

  // Create build script for Vercel
  const buildScript = `#!/bin/bash
# Vercel build script for INDJS
npm install
npx indjs build
`;

  await fs.writeFile(path.join(root, "build.sh"), buildScript);

  console.log(chalk.blue("\n📦 Vercel configuration created!"));
  console.log("Next steps:");
  console.log("1. Install Vercel CLI: npm i -g vercel");
  console.log("2. Run: vercel --prod");
  console.log("3. Follow the deployment prompts\n");
}

async function deployToNetlify(root) {
  // Create netlify.toml configuration
  const netlifyConfig = `[build]
  command = "npx indjs build"
  publish = ".indjs/static"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/:splat"
  status = 200

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[functions]
  directory = "netlify/functions"
  node_bundler = "esbuild"
`;

  await fs.writeFile(path.join(root, "netlify.toml"), netlifyConfig);

  // Create Netlify functions directory
  const functionsDir = path.join(root, "netlify", "functions");
  await fs.mkdir(functionsDir, { recursive: true });

  // Create a sample function
  const sampleFunction = `exports.handler = async (event, context) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Hello from Netlify Functions!',
      path: event.path,
      method: event.httpMethod
    })
  };
};`;

  await fs.writeFile(path.join(functionsDir, "hello.js"), sampleFunction);

  console.log(chalk.blue("\n🌐 Netlify configuration created!"));
  console.log("Next steps:");
  console.log("1. Connect your repository to Netlify");
  console.log("2. Set build command: npx indjs build");
  console.log("3. Set publish directory: .indjs/static\n");
}

async function deployToDocker(root) {
  // Create Dockerfile
  const dockerfile = `FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Build the application
RUN npx indjs build

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \\
  CMD curl -f http://localhost:3000/api/health || exit 1

# Start the application
CMD ["npx", "indjs", "start"]
`;

  await fs.writeFile(path.join(root, "Dockerfile"), dockerfile);

  // Create docker-compose.yml
  const dockerCompose = `version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/api/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s

  # Optional: Add database service
  # postgres:
  #   image: postgres:15-alpine
  #   environment:
  #     POSTGRES_DB: myapp
  #     POSTGRES_USER: user
  #     POSTGRES_PASSWORD: password
  #   volumes:
  #     - postgres_data:/var/lib/postgresql/data
  #   ports:
  #     - "5432:5432"

# volumes:
#   postgres_data:
`;

  await fs.writeFile(path.join(root, "docker-compose.yml"), dockerCompose);

  // Create .dockerignore
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
`;

  await fs.writeFile(path.join(root, ".dockerignore"), dockerignore);

  console.log(chalk.blue("\n🐳 Docker configuration created!"));
  console.log("Next steps:");
  console.log("1. Build image: docker build -t my-indjs-app .");
  console.log("2. Run container: docker run -p 3000:3000 my-indjs-app");
  console.log("3. Or use docker-compose: docker-compose up\n");
}

async function deployStatic(root) {
  const staticDir = path.join(root, ".indjs", "static");
  const distDir = path.join(root, "dist");

  try {
    // Copy static files to dist directory
    await fs.mkdir(distDir, { recursive: true });
    await copyDirectory(staticDir, distDir);

    // Copy public assets
    const publicDir = path.join(root, "public");
    try {
      await copyDirectory(publicDir, distDir);
    } catch (error) {
      // Public directory might not exist
    }

    console.log(chalk.blue("\n📁 Static files prepared!"));
    console.log(`Files are ready in: ${distDir}`);
    console.log(
      "You can now upload these files to any static hosting service.\n",
    );
  } catch (error) {
    throw new Error(`Failed to prepare static files: ${error.message}`);
  }
}

async function copyDirectory(src, dest) {
  try {
    await fs.access(src);
  } catch {
    return; // Source doesn't exist
  }

  await fs.mkdir(dest, { recursive: true });
  const entries = await fs.readdir(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      await copyDirectory(srcPath, destPath);
    } else {
      await fs.copyFile(srcPath, destPath);
    }
  }
}
