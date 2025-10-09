import React from 'react';

export default function ApiRoutes() {
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
    warning: {
      background: '#fef3c7',
      border: '1px solid #f59e0b',
      borderRadius: 8,
      padding: 16,
      marginBottom: 20
    },
    warningTitle: {
      fontWeight: 600,
      color: '#92400e',
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
          
          <h1 style={ui.h1}>API Routes</h1>
          
          <div style={ui.section}>
            <h2 style={ui.h2}>Introduction</h2>
            <p style={ui.p}>
              API routes provide a solution to build your API with INDJS. Any file inside the folder 
              <code style={ui.code}>pages/api</code> is mapped to <code style={ui.code}>/api/{'*'}</code> and will be treated as an API endpoint instead of a page.
            </p>
          </div>

          <div style={ui.section}>
            <h2 style={ui.h2}>Basic API Route</h2>
            <p style={ui.p}>
              Create your first API endpoint by adding a file to <code style={ui.code}>pages/api</code>:
            </p>
            
            <div style={ui.codeBlock}>
              {`// pages/api/hello.js
export default function handler({ req, res }) {
  res.json({ message: 'Hello from INDJS API!' });
}`}
            </div>
            
            <p style={ui.p}>
              This creates an endpoint at <code style={ui.code}>/api/hello</code> that responds with JSON.
            </p>
          </div>

          <div style={ui.section}>
            <h2 style={ui.h2}>HTTP Methods</h2>
            <p style={ui.p}>
              Handle different HTTP methods by exporting named functions or using a switch statement:
            </p>
            
            <h3 style={ui.h3}>Named Exports Method</h3>
            <div style={ui.codeBlock}>
              {`// pages/api/users.js
export async function get({ req, res }) {
  const users = await fetchUsers();
  res.json(users);
}

export async function post({ req, res }) {
  const newUser = await createUser(req.body);
  res.status(201).json(newUser);
}

export async function put({ req, res, params }) {
  const { id } = params;
  const updatedUser = await updateUser(id, req.body);
  res.json(updatedUser);
}

export async function del({ req, res, params }) {
  const { id } = params;
  await deleteUser(id);
  res.status(204).end();
}`}
            </div>

            <h3 style={ui.h3}>Switch Statement Method</h3>
            <div style={ui.codeBlock}>
              {`// pages/api/products.js
export default async function handler({ req, res }) {
  const { method } = req;
  
  switch (method) {
    case 'GET':
      const products = await getProducts();
      return res.json(products);
      
    case 'POST':
      const product = await createProduct(req.body);
      return res.status(201).json(product);
      
    case 'PUT':
      const updated = await updateProduct(req.body);
      return res.json(updated);
      
    case 'DELETE':
      await deleteProduct(req.query.id);
      return res.status(204).end();
      
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      return res.status(405).end(\`Method \${method} Not Allowed\`);
  }
}`}
            </div>
          </div>

          <div style={ui.section}>
            <h2 style={ui.h2}>Dynamic API Routes</h2>
            <p style={ui.p}>
              API routes support dynamic parameters just like pages:
            </p>
            
            <div style={ui.codeBlock}>
              {`// pages/api/users/[id].js
export default async function handler({ req, res, params }) {
  const { id } = params;
  const { method } = req;
  
  switch (method) {
    case 'GET':
      const user = await getUserById(id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      return res.json(user);
      
    case 'PUT':
      const updatedUser = await updateUser(id, req.body);
      return res.json(updatedUser);
      
    case 'DELETE':
      await deleteUser(id);
      return res.status(204).end();
      
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      return res.status(405).end(\`Method \${method} Not Allowed\`);
  }
}`}
            </div>

            <h3 style={ui.h3}>Catch-all API Routes</h3>
            <div style={ui.codeBlock}>
              {`// pages/api/[...slug].js
export default function handler({ req, res, params }) {
  const { slug } = params; // slug is an array
  
  // Handle different API paths
  if (slug[0] === 'v1') {
    return handleV1API(req, res, slug.slice(1));
  }
  
  if (slug[0] === 'v2') {
    return handleV2API(req, res, slug.slice(1));
  }
  
  return res.status(404).json({ error: 'API endpoint not found' });
}`}
            </div>
          </div>

          <div style={ui.section}>
            <h2 style={ui.h2}>Request and Response</h2>
            
            <h3 style={ui.h3}>Request Object</h3>
            <div style={ui.codeBlock}>
              {`export default function handler({ req, res, params, query, body }) {
  // HTTP method
  console.log(req.method); // GET, POST, PUT, DELETE, etc.
  
  // Request headers
  console.log(req.headers['content-type']);
  console.log(req.headers.authorization);
  
  // URL parameters (from dynamic routes)
  console.log(params); // { id: '123' } from [id].js
  
  // Query parameters
  console.log(query); // { search: 'term', page: '1' }
  
  // Request body (automatically parsed)
  console.log(body); // Parsed JSON, form data, etc.
  
  // Raw request URL
  console.log(req.url); // /api/users?page=1
  
  // Request path
  console.log(req.path); // /api/users
}`}
            </div>

            <h3 style={ui.h3}>Response Methods</h3>
            <div style={ui.codeBlock}>
              {`export default function handler({ req, res }) {
  // Send JSON response
  res.json({ message: 'Success', data: [] });
  
  // Set status code
  res.status(201).json({ created: true });
  
  // Send plain text
  res.send('Hello World');
  
  // Send with custom headers
  res.setHeader('Cache-Control', 'max-age=3600');
  res.json({ cached: true });
  
  // Redirect
  res.redirect('/api/v2/users');
  
  // End response without body
  res.status(204).end();
  
  // Send file
  res.sendFile('/path/to/file.pdf');
  
  // Set cookies
  res.cookie('sessionId', '123', { 
    httpOnly: true, 
    secure: true,
    maxAge: 86400000 // 24 hours
  });
}`}
            </div>
          </div>

          <div style={ui.section}>
            <h2 style={ui.h2}>Middleware</h2>
            <p style={ui.p}>
              Add middleware to your API routes for authentication, logging, validation, etc:
            </p>
            
            <div style={ui.codeBlock}>
              {`// lib/middleware/auth.js
export function requireAuth(handler) {
  return async ({ req, res, ...rest }) => {
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }
    
    try {
      const user = await verifyToken(token);
      req.user = user;
      return handler({ req, res, ...rest });
    } catch (error) {
      return res.status(401).json({ error: 'Invalid token' });
    }
  };
}

// pages/api/protected.js
import { requireAuth } from '../../lib/middleware/auth';

async function handler({ req, res }) {
  res.json({ 
    message: 'This is protected',
    user: req.user 
  });
}

export default requireAuth(handler);`}
            </div>

            <h3 style={ui.h3}>Validation Middleware</h3>
            <div style={ui.codeBlock}>
              {`// lib/middleware/validate.js
export function validate(schema) {
  return (handler) => {
    return async ({ req, res, ...rest }) => {
      try {
        const validatedData = await schema.parseAsync(req.body);
        req.body = validatedData;
        return handler({ req, res, ...rest });
      } catch (error) {
        return res.status(400).json({ 
          error: 'Validation failed',
          details: error.errors 
        });
      }
    };
  };
}

// pages/api/users.js
import { z } from 'zod';
import { validate } from '../../lib/middleware/validate';

const userSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  age: z.number().min(18)
});

async function createUser({ req, res }) {
  const user = await saveUser(req.body);
  res.status(201).json(user);
}

export const post = validate(userSchema)(createUser);`}
            </div>
          </div>

          <div style={ui.section}>
            <h2 style={ui.h2}>Error Handling</h2>
            <div style={ui.codeBlock}>
              {`// lib/api-error.js
export class ApiError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
  }
}

// pages/api/users/[id].js
import { ApiError } from '../../../lib/api-error';

export default async function handler({ req, res, params }) {
  try {
    const { id } = params;
    
    if (!id || isNaN(id)) {
      throw new ApiError('Invalid user ID', 400);
    }
    
    const user = await getUserById(id);
    
    if (!user) {
      throw new ApiError('User not found', 404);
    }
    
    res.json(user);
    
  } catch (error) {
    if (error instanceof ApiError) {
      return res.status(error.statusCode).json({ 
        error: error.message 
      });
    }
    
    console.error('Unexpected error:', error);
    res.status(500).json({ 
      error: 'Internal server error' 
    });
  }
}`}
            </div>
          </div>

          <div style={ui.section}>
            <h2 style={ui.h2}>File Uploads</h2>
            <div style={ui.codeBlock}>
              {`// pages/api/upload.js
import formidable from 'formidable';
import fs from 'fs/promises';
import path from 'path';

export default async function handler({ req, res }) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  const form = formidable({
    uploadDir: './uploads',
    keepExtensions: true,
    maxFileSize: 10 * 1024 * 1024 // 10MB
  });
  
  try {
    const [fields, files] = await form.parse(req);
    const file = files.file[0];
    
    // Process the uploaded file
    const newPath = path.join('./uploads', \`\${Date.now()}-\${file.originalFilename}\`);
    await fs.rename(file.filepath, newPath);
    
    res.json({
      message: 'File uploaded successfully',
      filename: file.originalFilename,
      size: file.size,
      path: newPath
    });
    
  } catch (error) {
    res.status(500).json({ error: 'Upload failed' });
  }
}

// Disable body parsing for file uploads
export const config = {
  api: {
    bodyParser: false,
  },
};`}
            </div>
          </div>

          <div style={ui.section}>
            <h2 style={ui.h2}>CORS Configuration</h2>
            <div style={ui.codeBlock}>
              {`// lib/middleware/cors.js
export function cors(options = {}) {
  const {
    origin = '*',
    methods = ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders = ['Content-Type', 'Authorization']
  } = options;
  
  return (handler) => {
    return async ({ req, res, ...rest }) => {
      // Set CORS headers
      res.setHeader('Access-Control-Allow-Origin', origin);
      res.setHeader('Access-Control-Allow-Methods', methods.join(', '));
      res.setHeader('Access-Control-Allow-Headers', allowedHeaders.join(', '));
      
      // Handle preflight requests
      if (req.method === 'OPTIONS') {
        return res.status(200).end();
      }
      
      return handler({ req, res, ...rest });
    };
  };
}

// pages/api/public-data.js
import { cors } from '../../lib/middleware/cors';

async function handler({ req, res }) {
  res.json({ data: 'This API allows cross-origin requests' });
}

export default cors({
  origin: ['https://myapp.com', 'https://admin.myapp.com'],
  methods: ['GET', 'POST']
})(handler);`}
            </div>
          </div>

          <div style={ui.warning}>
            <div style={ui.warningTitle}>⚠️ Security Note</div>
            <p style={{ margin: 0, fontSize: 14, color: '#92400e' }}>
              Always validate and sanitize input data. Never trust client-side data. 
              Use proper authentication and authorization for protected endpoints.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
