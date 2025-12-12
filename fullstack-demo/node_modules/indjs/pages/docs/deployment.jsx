import React from 'react';

export default function Deployment() {
  const ui = {
    page: {
      fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial',
      minHeight: '100vh',
      margin: 0,
      background: 'linear-gradient(180deg, #0ea5e9 0%, #111827 60%)',
      color: '#0f172a'
    },
    wrap: {
      maxWidth: 980,
      margin: '0 auto',
      padding: '48px 20px'
    },
    hero: {
      background: 'white',
      borderRadius: 16,
      padding: 28,
      boxShadow: '0 10px 30px rgba(0,0,0,0.12)'
    },
    h1: {
      fontSize: 32,
      lineHeight: 1.1,
      margin: 0,
      color: '#0b1220'
    },
    nav: {
      marginBottom: 20
    },
    backLink: {
      color: '#0ea5e9',
      textDecoration: 'none',
      fontSize: 14
    },
    section: {
      marginBottom: 32
    },
    h2: {
      fontSize: 24,
      color: '#0b1220',
      marginBottom: 16,
      borderBottom: '2px solid #e2e8f0',
      paddingBottom: 8
    },
    h3: {
      fontSize: 20,
      color: '#0b1220',
      marginBottom: 12,
      marginTop: 24
    },
    p: {
      fontSize: 16,
      color: '#334155',
      lineHeight: 1.6,
      marginBottom: 16
    },
    ul: {
      fontSize: 16,
      color: '#334155',
      lineHeight: 1.6,
      marginBottom: 16,
      paddingLeft: 20
    },
    li: {
      marginBottom: 8
    },
    code: {
      background: '#f1f5f9',
      padding: '2px 6px',
      borderRadius: 4,
      fontSize: 14,
      fontFamily: 'monospace'
    },
    codeBlock: {
      background: '#1e293b',
      color: '#e2e8f0',
      padding: 20,
      borderRadius: 8,
      fontSize: 14,
      fontFamily: 'monospace',
      overflow: 'auto',
      marginBottom: 20,
      lineHeight: 1.5
    },
    success: {
      background: '#dcfce7',
      border: '1px solid #16a34a',
      borderRadius: 8,
      padding: 16,
      marginBottom: 20
    },
    successTitle: {
      fontWeight: 600,
      color: '#15803d',
      marginBottom: 8
    },
    info: {
      background: '#dbeafe',
      border: '1px solid #3b82f6',
      borderRadius: 8,
      padding: 16,
      marginBottom: 20
    },
    infoTitle: {
      fontWeight: 600,
      color: '#1e40af',
      marginBottom: 8
    }
  };

  return (
    <main style={ui.page}>
      <div style={ui.wrap}>
        <section style={ui.hero}>
          <nav style={ui.nav}>
            <a href="/docs" style={ui.backLink}>← Back to Documentation</a>
          </nav>
          
          <h1 style={ui.h1}>Deployment</h1>
          
          <div style={ui.section}>
            <h2 style={ui.h2}>Overview</h2>
            <p style={ui.p}>
              INDJS applications can be deployed to various platforms including Vercel, Netlify, AWS, Google Cloud, 
              and traditional servers. The framework includes built-in deployment helpers to make the process seamless.
            </p>
          </div>

          <div style={ui.section}>
            <h2 style={ui.h2}>Vercel Deployment</h2>
            <p style={ui.p}>
              Vercel provides the easiest deployment experience for INDJS applications with zero configuration.
            </p>
            
            <h3 style={ui.h3}>Quick Deploy</h3>
            <div style={ui.codeBlock}>
              {`# Install Vercel CLI
npm install -g vercel

# Deploy your app
vercel

# Or use the INDJS CLI
indjs deploy vercel`}
            </div>

            <h3 style={ui.h3}>Vercel Configuration</h3>
            <div style={ui.codeBlock}>
              {`// vercel.json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/node",
      "config": {
        "includeFiles": [
          "pages/**",
          "public/**",
          ".indjs/**"
        ]
      }
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/api/$1"
    },
    {
      "src": "/(.*)",
      "dest": "/$1"
    }
  ],
  "env": {
    "NODE_ENV": "production"
  }
}`}
            </div>

            <h3 style={ui.h3}>Environment Variables</h3>
            <div style={ui.codeBlock}>
              {`# Add environment variables in Vercel dashboard or via CLI
vercel env add DATABASE_URL
vercel env add JWT_SECRET
vercel env add GOOGLE_CLIENT_ID

# Or create .env.production
DATABASE_URL=postgresql://...
JWT_SECRET=your-secret-key
GOOGLE_CLIENT_ID=your-client-id`}
            </div>
          </div>

          <div style={ui.section}>
            <h2 style={ui.h2}>Netlify Deployment</h2>
            <p style={ui.p}>
              Deploy to Netlify with built-in CI/CD and edge functions support.
            </p>
            
            <h3 style={ui.h3}>Netlify Configuration</h3>
            <div style={ui.codeBlock}>
              {`# netlify.toml
[build]
  command = "npm run build"
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
  directory = ".indjs/functions"
  node_bundler = "esbuild"`}
            </div>

            <h3 style={ui.h3}>Deploy with CLI</h3>
            <div style={ui.codeBlock}>
              {`# Install Netlify CLI
npm install -g netlify-cli

# Build and deploy
npm run build
netlify deploy --prod

# Or use INDJS CLI
indjs deploy netlify`}
            </div>
          </div>

          <div style={ui.section}>
            <h2 style={ui.h2}>AWS Deployment</h2>
            <p style={ui.p}>
              Deploy to AWS using Lambda functions, S3, and CloudFront for a scalable solution.
            </p>
            
            <h3 style={ui.h3}>AWS Lambda + API Gateway</h3>
            <div style={ui.codeBlock}>
              {`# Install AWS CLI and configure
aws configure

# Install Serverless Framework
npm install -g serverless

# Create serverless.yml
service: indjs-app

provider:
  name: aws
  runtime: nodejs18.x
  region: us-east-1
  environment:
    NODE_ENV: production
    DATABASE_URL: \${env:DATABASE_URL}

functions:
  app:
    handler: .indjs/lambda/handler.handler
    events:
      - http:
          path: /{proxy+}
          method: ANY
          cors: true
      - http:
          path: /
          method: ANY
          cors: true

plugins:
  - serverless-offline

# Deploy
sls deploy`}
            </div>

            <h3 style={ui.h3}>AWS Amplify</h3>
            <div style={ui.codeBlock}>
              {`# amplify.yml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm install
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: .indjs/static
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*`}
            </div>
          </div>

          <div style={ui.section}>
            <h2 style={ui.h2}>Google Cloud Platform</h2>
            <p style={ui.p}>
              Deploy to Google Cloud using Cloud Run, App Engine, or Cloud Functions.
            </p>
            
            <h3 style={ui.h3}>Cloud Run Deployment</h3>
            <div style={ui.codeBlock}>
              {`# Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]

# Build and deploy
gcloud builds submit --tag gcr.io/PROJECT_ID/indjs-app
gcloud run deploy --image gcr.io/PROJECT_ID/indjs-app --platform managed`}
            </div>

            <h3 style={ui.h3}>App Engine Configuration</h3>
            <div style={ui.codeBlock}>
              {`# app.yaml
runtime: nodejs18

env_variables:
  NODE_ENV: production
  DATABASE_URL: your-database-url

automatic_scaling:
  min_instances: 0
  max_instances: 10

# Deploy
gcloud app deploy`}
            </div>
          </div>

          <div style={ui.section}>
            <h2 style={ui.h2}>Docker Deployment</h2>
            <p style={ui.p}>
              Containerize your INDJS application for deployment anywhere.
            </p>
            
            <h3 style={ui.h3}>Production Dockerfile</h3>
            <div style={ui.codeBlock}>
              {`# Multi-stage build for smaller image
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

FROM node:18-alpine AS runner

# Create app user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 indjs

WORKDIR /app

# Copy built application
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY . .

# Build the application
RUN npm run build

# Change ownership
RUN chown -R indjs:nodejs /app
USER indjs

EXPOSE 3000

ENV NODE_ENV=production
ENV PORT=3000

CMD ["npm", "start"]`}
            </div>

            <h3 style={ui.h3}>Docker Compose</h3>
            <div style={ui.codeBlock}>
              {`# docker-compose.yml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgresql://user:password@db:5432/myapp
    depends_on:
      - db
    restart: unless-stopped

  db:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: myapp
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
    volumes:
      - postgres_data:/var/lib/postgresql/data
    restart: unless-stopped

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl
    depends_on:
      - app
    restart: unless-stopped

volumes:
  postgres_data:`}
            </div>
          </div>

          <div style={ui.section}>
            <h2 style={ui.h2}>Traditional Server Deployment</h2>
            <p style={ui.p}>
              Deploy to traditional servers using PM2 or systemd for process management.
            </p>
            
            <h3 style={ui.h3}>PM2 Deployment</h3>
            <div style={ui.codeBlock}>
              {`# Install PM2
npm install -g pm2

# ecosystem.config.js
module.exports = {
  apps: [{
    name: 'indjs-app',
    script: 'npm',
    args: 'start',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'development',
      PORT: 3000
    },
    env_production: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_file: './logs/combined.log',
    time: true
  }]
};

# Deploy
npm run build
pm2 start ecosystem.config.js --env production
pm2 save
pm2 startup`}
            </div>

            <h3 style={ui.h3}>Nginx Configuration</h3>
            <div style={ui.codeBlock}>
              {`# /etc/nginx/sites-available/indjs-app
server {
    listen 80;
    server_name yourdomain.com;
    
    # Redirect HTTP to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name yourdomain.com;
    
    ssl_certificate /path/to/certificate.crt;
    ssl_certificate_key /path/to/private.key;
    
    # Security headers
    add_header X-Frame-Options DENY;
    add_header X-Content-Type-Options nosniff;
    add_header X-XSS-Protection "1; mode=block";
    
    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
    
    # Static files
    location /_next/static/ {
        alias /var/www/indjs-app/.indjs/static/;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    # API routes
    location /api/ {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
    
    # All other routes
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}`}
            </div>
          </div>

          <div style={ui.section}>
            <h2 style={ui.h2}>Environment Configuration</h2>
            <p style={ui.p}>
              Manage environment variables and configuration across different deployment environments.
            </p>
            
            <div style={ui.codeBlock}>
              {`# .env.local (development)
NODE_ENV=development
DATABASE_URL=postgresql://localhost:5432/myapp_dev
JWT_SECRET=dev-secret-key
REDIS_URL=redis://localhost:6379

# .env.staging
NODE_ENV=staging
DATABASE_URL=postgresql://staging-db:5432/myapp_staging
JWT_SECRET=staging-secret-key
REDIS_URL=redis://staging-redis:6379

# .env.production
NODE_ENV=production
DATABASE_URL=postgresql://prod-db:5432/myapp_prod
JWT_SECRET=super-secure-production-key
REDIS_URL=redis://prod-redis:6379

# Load environment variables in your app
// lib/config.js
export const config = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT || '3000'),
  databaseUrl: process.env.DATABASE_URL,
  jwtSecret: process.env.JWT_SECRET,
  redisUrl: process.env.REDIS_URL,
  
  // Feature flags
  features: {
    analytics: process.env.ENABLE_ANALYTICS === 'true',
    debugging: process.env.NODE_ENV === 'development',
    rateLimiting: process.env.ENABLE_RATE_LIMITING !== 'false'
  }
};`}
            </div>
          </div>

          <div style={ui.section}>
            <h2 style={ui.h2}>CI/CD Pipeline</h2>
            <p style={ui.p}>
              Set up continuous integration and deployment with GitHub Actions.
            </p>
            
            <div style={ui.codeBlock}>
              {`# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run tests
      run: npm test
    
    - name: Run linting
      run: npm run lint
    
    - name: Build application
      run: npm run build

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Build application
      run: npm run build
    
    - name: Deploy to Vercel
      uses: amondnet/vercel-action@v20
      with:
        vercel-token: \${{ secrets.VERCEL_TOKEN }}
        vercel-org-id: \${{ secrets.ORG_ID }}
        vercel-project-id: \${{ secrets.PROJECT_ID }}
        vercel-args: '--prod'`}
            </div>
          </div>

          <div style={ui.success}>
            <div style={ui.successTitle}>✅ Deployment Checklist</div>
            <ul style={{ margin: 0, fontSize: 14, color: '#15803d' }}>
              <li>Build and test your application locally</li>
              <li>Set up environment variables for production</li>
              <li>Configure database connections and migrations</li>
              <li>Set up SSL certificates for HTTPS</li>
              <li>Configure monitoring and logging</li>
              <li>Set up backup and disaster recovery</li>
              <li>Test deployment in staging environment</li>
              <li>Monitor application performance after deployment</li>
            </ul>
          </div>

          <div style={ui.info}>
            <div style={ui.infoTitle}>💡 Pro Tips</div>
            <ul style={{ margin: 0, fontSize: 14, color: '#1e40af' }}>
              <li>Use the INDJS CLI for quick deployments: <code style={ui.code}>indjs deploy</code></li>
              <li>Always test your deployment in a staging environment first</li>
              <li>Use environment variables for sensitive configuration</li>
              <li>Set up health checks and monitoring</li>
              <li>Keep your dependencies up to date</li>
              <li>Use CDN for static assets in production</li>
            </ul>
          </div>
        </section>
      </div>
    </main>
  );
}
