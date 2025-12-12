import React from 'react';

export default function Database() {
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
          
          <h1 style={ui.h1}>Database Integration</h1>
          
          <div style={ui.section}>
            <h2 style={ui.h2}>Overview</h2>
            <p style={ui.p}>
              INDJS supports multiple database solutions including MongoDB, PostgreSQL, SQLite, and Prisma ORM. 
              Choose the database that best fits your application's needs.
            </p>
          </div>

          <div style={ui.section}>
            <h2 style={ui.h2}>MongoDB Integration</h2>
            <p style={ui.p}>
              MongoDB is a popular NoSQL database that works great with JavaScript applications.
            </p>
            
            <h3 style={ui.h3}>Setup MongoDB</h3>
            <div style={ui.codeBlock}>
              {`# Install MongoDB driver
npm install mongodb

# Environment variables (.env.local)
MONGODB_URI=mongodb://localhost:27017/myapp
# or for MongoDB Atlas
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/myapp`}
            </div>

            <h3 style={ui.h3}>Database Connection</h3>
            <div style={ui.codeBlock}>
              {`// lib/database/mongodb.js
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

let client;
let clientPromise;

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;

// Database helper functions
export async function getDatabase() {
  const client = await clientPromise;
  return client.db();
}

export async function getCollection(name) {
  const db = await getDatabase();
  return db.collection(name);
}`}
            </div>

            <h3 style={ui.h3}>MongoDB Models</h3>
            <div style={ui.codeBlock}>
              {`// lib/models/User.js
import { getCollection } from '../database/mongodb';
import { ObjectId } from 'mongodb';

export class User {
  static async create(userData) {
    const users = await getCollection('users');
    const result = await users.insertOne({
      ...userData,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    
    return { ...userData, _id: result.insertedId };
  }
  
  static async findById(id) {
    const users = await getCollection('users');
    return users.findOne({ _id: new ObjectId(id) });
  }
  
  static async findByEmail(email) {
    const users = await getCollection('users');
    return users.findOne({ email });
  }
  
  static async updateById(id, updateData) {
    const users = await getCollection('users');
    const result = await users.updateOne(
      { _id: new ObjectId(id) },
      { 
        $set: { 
          ...updateData, 
          updatedAt: new Date() 
        } 
      }
    );
    
    return result.modifiedCount > 0;
  }
  
  static async deleteById(id) {
    const users = await getCollection('users');
    const result = await users.deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount > 0;
  }
  
  static async findMany(filter = {}, options = {}) {
    const users = await getCollection('users');
    const { limit = 10, skip = 0, sort = { createdAt: -1 } } = options;
    
    return users
      .find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .toArray();
  }
}

// Usage in API routes
// pages/api/users.js
import { User } from '../../lib/models/User';

export default async function handler({ req, res }) {
  switch (req.method) {
    case 'GET':
      const users = await User.findMany();
      return res.json(users);
      
    case 'POST':
      const newUser = await User.create(req.body);
      return res.status(201).json(newUser);
      
    default:
      return res.status(405).json({ error: 'Method not allowed' });
  }
}`}
            </div>
          </div>

          <div style={ui.section}>
            <h2 style={ui.h2}>PostgreSQL Integration</h2>
            <p style={ui.p}>
              PostgreSQL is a powerful relational database with excellent performance and features.
            </p>
            
            <h3 style={ui.h3}>Setup PostgreSQL</h3>
            <div style={ui.codeBlock}>
              {`# Install PostgreSQL driver
npm install pg
npm install --save-dev @types/pg

# Environment variables (.env.local)
DATABASE_URL=postgresql://username:password@localhost:5432/myapp`}
            </div>

            <h3 style={ui.h3}>Database Connection Pool</h3>
            <div style={ui.codeBlock}>
              {`// lib/database/postgres.js
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

export async function query(text, params) {
  const start = Date.now();
  const res = await pool.query(text, params);
  const duration = Date.now() - start;
  
  if (process.env.NODE_ENV === 'development') {
    console.log('Executed query', { text, duration, rows: res.rowCount });
  }
  
  return res;
}

export async function getClient() {
  const client = await pool.connect();
  const query = client.query;
  const release = client.release;
  
  // Set a timeout of 5 seconds, after which we will log this client's last query
  const timeout = setTimeout(() => {
    console.error('A client has been checked out for more than 5 seconds!');
    console.error(\`The last executed query on this client was: \${client.lastQuery}\`);
  }, 5000);
  
  // Monkey patch the query method to keep track of the last query executed
  client.query = (...args) => {
    client.lastQuery = args;
    return query.apply(client, args);
  };
  
  client.release = () => {
    clearTimeout(timeout);
    client.query = query;
    client.release = release;
    return release.apply(client);
  };
  
  return client;
}

// Database migration helper
export async function migrate() {
  const client = await getClient();
  
  try {
    await client.query('BEGIN');
    
    // Create users table
    await client.query(\`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        role VARCHAR(50) DEFAULT 'user',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    \`);
    
    // Create posts table
    await client.query(\`
      CREATE TABLE IF NOT EXISTS posts (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        content TEXT,
        author_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        published BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    \`);
    
    await client.query('COMMIT');
    console.log('Database migration completed');
    
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}`}
            </div>

            <h3 style={ui.h3}>PostgreSQL Models</h3>
            <div style={ui.codeBlock}>
              {`// lib/models/User.js
import { query } from '../database/postgres';

export class User {
  static async create({ name, email, passwordHash, role = 'user' }) {
    const result = await query(
      'INSERT INTO users (name, email, password_hash, role) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, email, passwordHash, role]
    );
    return result.rows[0];
  }
  
  static async findById(id) {
    const result = await query('SELECT * FROM users WHERE id = $1', [id]);
    return result.rows[0];
  }
  
  static async findByEmail(email) {
    const result = await query('SELECT * FROM users WHERE email = $1', [email]);
    return result.rows[0];
  }
  
  static async update(id, updates) {
    const fields = Object.keys(updates);
    const values = Object.values(updates);
    const setClause = fields.map((field, index) => \`\${field} = $\${index + 2}\`).join(', ');
    
    const result = await query(
      \`UPDATE users SET \${setClause}, updated_at = CURRENT_TIMESTAMP WHERE id = $1 RETURNING *\`,
      [id, ...values]
    );
    return result.rows[0];
  }
  
  static async delete(id) {
    const result = await query('DELETE FROM users WHERE id = $1', [id]);
    return result.rowCount > 0;
  }
  
  static async findMany(limit = 10, offset = 0) {
    const result = await query(
      'SELECT * FROM users ORDER BY created_at DESC LIMIT $1 OFFSET $2',
      [limit, offset]
    );
    return result.rows;
  }
}`}
            </div>
          </div>

          <div style={ui.section}>
            <h2 style={ui.h2}>Prisma ORM</h2>
            <p style={ui.p}>
              Prisma is a modern ORM that provides type-safe database access and excellent developer experience.
            </p>
            
            <h3 style={ui.h3}>Setup Prisma</h3>
            <div style={ui.codeBlock}>
              {`# Install Prisma
npm install prisma @prisma/client
npx prisma init

# This creates:
# - prisma/schema.prisma
# - .env with DATABASE_URL`}
            </div>

            <h3 style={ui.h3}>Prisma Schema</h3>
            <div style={ui.codeBlock}>
              {`// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql" // or "mysql", "sqlite", "mongodb"
  url      = env("DATABASE_URL")
}

model User {
  id        Int      @id @default(autoincrement())
  name      String
  email     String   @unique
  password  String
  role      Role     @default(USER)
  posts     Post[]
  createdAt DateTime @default(now()) @map("created_at")
  updatedAt DateTime @updatedAt @map("updated_at")

  @@map("users")
}

model Post {
  id        Int      @id @default(autoincrement())
  title     String
  content   String?
  published Boolean  @default(false)
  author    User     @relation(fields: [authorId], references: [id])
  authorId  Int      @map("author_id")
  createdAt DateTime @default(now()) @map("created_at")
  updatedAt DateTime @updatedAt @map("updated_at")

  @@map("posts")
}

enum Role {
  USER
  ADMIN
}`}
            </div>

            <h3 style={ui.h3}>Prisma Client</h3>
            <div style={ui.codeBlock}>
              {`// lib/database/prisma.js
import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis;

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

// Generate Prisma client and run migrations
// npm run prisma:generate
// npm run prisma:migrate

// package.json scripts
{
  "scripts": {
    "prisma:generate": "prisma generate",
    "prisma:migrate": "prisma migrate dev",
    "prisma:studio": "prisma studio",
    "prisma:seed": "node prisma/seed.js"
  }
}`}
            </div>

            <h3 style={ui.h3}>Using Prisma in API Routes</h3>
            <div style={ui.codeBlock}>
              {`// pages/api/users.js
import { prisma } from '../../lib/database/prisma';

export default async function handler({ req, res }) {
  switch (req.method) {
    case 'GET':
      const users = await prisma.user.findMany({
        include: {
          posts: {
            where: { published: true },
            select: { id: true, title: true }
          }
        },
        orderBy: { createdAt: 'desc' },
        take: 10
      });
      return res.json(users);
      
    case 'POST':
      const { name, email, password } = req.body;
      
      try {
        const user = await prisma.user.create({
          data: {
            name,
            email,
            password: await hashPassword(password)
          }
        });
        
        return res.status(201).json(user);
      } catch (error) {
        if (error.code === 'P2002') {
          return res.status(409).json({ error: 'Email already exists' });
        }
        throw error;
      }
      
    default:
      return res.status(405).json({ error: 'Method not allowed' });
  }
}

// pages/api/posts/[id].js
import { prisma } from '../../../lib/database/prisma';

export default async function handler({ req, res, params }) {
  const { id } = params;
  const postId = parseInt(id);
  
  switch (req.method) {
    case 'GET':
      const post = await prisma.post.findUnique({
        where: { id: postId },
        include: {
          author: {
            select: { id: true, name: true, email: true }
          }
        }
      });
      
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }
      
      return res.json(post);
      
    case 'PUT':
      const updatedPost = await prisma.post.update({
        where: { id: postId },
        data: req.body,
        include: {
          author: {
            select: { id: true, name: true }
          }
        }
      });
      
      return res.json(updatedPost);
      
    case 'DELETE':
      await prisma.post.delete({
        where: { id: postId }
      });
      
      return res.status(204).end();
      
    default:
      return res.status(405).json({ error: 'Method not allowed' });
  }
}`}
            </div>
          </div>

          <div style={ui.section}>
            <h2 style={ui.h2}>SQLite (Development)</h2>
            <p style={ui.p}>
              SQLite is perfect for development and small applications that don't require a separate database server.
            </p>
            
            <div style={ui.codeBlock}>
              {`# Install SQLite driver
npm install sqlite3
npm install --save-dev @types/sqlite3

# lib/database/sqlite.js
import sqlite3 from 'sqlite3';
import { promisify } from 'util';
import path from 'path';

const dbPath = path.join(process.cwd(), 'database.sqlite');

class Database {
  constructor() {
    this.db = new sqlite3.Database(dbPath);
    this.run = promisify(this.db.run.bind(this.db));
    this.get = promisify(this.db.get.bind(this.db));
    this.all = promisify(this.db.all.bind(this.db));
  }
  
  async init() {
    await this.run(\`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        role TEXT DEFAULT 'user',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    \`);
    
    await this.run(\`
      CREATE TABLE IF NOT EXISTS posts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        content TEXT,
        author_id INTEGER,
        published BOOLEAN DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (author_id) REFERENCES users (id)
      )
    \`);
  }
  
  async createUser({ name, email, passwordHash, role = 'user' }) {
    const result = await this.run(
      'INSERT INTO users (name, email, password_hash, role) VALUES (?, ?, ?, ?)',
      [name, email, passwordHash, role]
    );
    
    return this.get('SELECT * FROM users WHERE id = ?', [result.lastID]);
  }
  
  async getUserByEmail(email) {
    return this.get('SELECT * FROM users WHERE email = ?', [email]);
  }
  
  async getAllUsers() {
    return this.all('SELECT id, name, email, role, created_at FROM users ORDER BY created_at DESC');
  }
}

export const db = new Database();

// Initialize database on startup
db.init().catch(console.error);`}
            </div>
          </div>

          <div style={ui.section}>
            <h2 style={ui.h2}>Database Best Practices</h2>
            
            <h3 style={ui.h3}>Connection Pooling</h3>
            <div style={ui.codeBlock}>
              {`// Always use connection pooling in production
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 20, // Maximum number of connections
  idleTimeoutMillis: 30000, // Close idle connections after 30 seconds
  connectionTimeoutMillis: 2000, // Timeout connection attempts after 2 seconds
});`}
            </div>

            <h3 style={ui.h3}>Error Handling</h3>
            <div style={ui.codeBlock}>
              {`// pages/api/users/[id].js
export default async function handler({ req, res, params }) {
  try {
    const { id } = params;
    
    // Validate input
    if (!id || isNaN(parseInt(id))) {
      return res.status(400).json({ error: 'Invalid user ID' });
    }
    
    const user = await User.findById(parseInt(id));
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json(user);
    
  } catch (error) {
    console.error('Database error:', error);
    
    // Handle specific database errors
    if (error.code === '23505') { // PostgreSQL unique violation
      return res.status(409).json({ error: 'Email already exists' });
    }
    
    if (error.code === 'P2002') { // Prisma unique constraint
      return res.status(409).json({ error: 'Unique constraint violation' });
    }
    
    res.status(500).json({ error: 'Internal server error' });
  }
}`}
            </div>

            <h3 style={ui.h3}>Database Seeding</h3>
            <div style={ui.codeBlock}>
              {`// prisma/seed.js
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 12);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      name: 'Admin User',
      email: 'admin@example.com',
      password: adminPassword,
      role: 'ADMIN'
    }
  });
  
  // Create sample posts
  await prisma.post.createMany({
    data: [
      {
        title: 'Getting Started with INDJS',
        content: 'Learn how to build amazing apps with INDJS...',
        published: true,
        authorId: admin.id
      },
      {
        title: 'Advanced INDJS Patterns',
        content: 'Explore advanced patterns and best practices...',
        published: true,
        authorId: admin.id
      }
    ]
  });
  
  console.log('Database seeded successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });`}
            </div>
          </div>

          <div style={ui.info}>
            <div style={ui.infoTitle}>💡 Database Tips</div>
            <ul style={{ margin: 0, fontSize: 14, color: '#1e40af' }}>
              <li>Use environment variables for database credentials</li>
              <li>Implement proper error handling and validation</li>
              <li>Use connection pooling for better performance</li>
              <li>Always sanitize user inputs to prevent SQL injection</li>
              <li>Use transactions for operations that modify multiple records</li>
              <li>Index frequently queried columns</li>
              <li>Use database migrations for schema changes</li>
              <li>Implement proper backup and recovery strategies</li>
            </ul>
          </div>
        </section>
      </div>
    </main>
  );
}
