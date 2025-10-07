import fs from 'fs/promises';
import path from 'path';

// Database adapters
let currentAdapter = null;
let isConnected = false;

// Database configuration
const config = {
  type: process.env.DATABASE_TYPE || 'sqlite',
  url: process.env.DATABASE_URL || 'sqlite:./data/app.db',
  options: {}
};

// Configure database
export function configure(newConfig) {
  Object.assign(config, newConfig);
}

// Connect to database
export async function connect(customConfig = null) {
  const dbConfig = customConfig || config;
  
  try {
    switch (dbConfig.type) {
      case 'mongodb':
        currentAdapter = await createMongoAdapter(dbConfig);
        break;
      case 'postgresql':
      case 'postgres':
        currentAdapter = await createPostgresAdapter(dbConfig);
        break;
      case 'mysql':
        currentAdapter = await createMySQLAdapter(dbConfig);
        break;
      case 'redis':
        currentAdapter = await createRedisAdapter(dbConfig);
        break;
      case 'firebase':
        currentAdapter = await createFirebaseAdapter(dbConfig);
        break;
      case 'sqlite':
        currentAdapter = await createSQLiteAdapter(dbConfig);
        break;
      case 'prisma':
        currentAdapter = await createPrismaAdapter(dbConfig);
        break;
      default:
        throw new Error(`Unsupported database type: ${dbConfig.type}`);
    }
    // Optional retries
    const retries = Number(dbConfig.options?.retries || 1);
    const delayMs = Number(dbConfig.options?.retryDelayMs || 500);
    let lastErr = null;
    for (let attempt = 1; attempt <= Math.max(1, retries); attempt++) {
      try {
        await currentAdapter.connect();
        lastErr = null;
        break;
      } catch (e) {
        lastErr = e;
        if (attempt < Math.max(1, retries)) {
          await new Promise(r => setTimeout(r, delayMs));
        }
      }
    }
    if (lastErr) throw lastErr;
    isConnected = true;
    console.log(`✅ Connected to ${dbConfig.type} database`);
    
    return currentAdapter;
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    throw error;
  }
}

// Minimal health check
export async function healthCheck() {
  try {
    if (!currentAdapter || !isConnected) return { ok: false };
    try { await query('SELECT 1'); return { ok: true }; } catch {}
    return { ok: true };
  } catch {
    return { ok: false };
  }
}

// Disconnect from database
export async function disconnect() {
  if (currentAdapter && isConnected) {
    await currentAdapter.disconnect();
    isConnected = false;
    currentAdapter = null;
    console.log('✅ Database disconnected');
  }
}

// Get current adapter
export function getAdapter() {
  if (!currentAdapter || !isConnected) {
    throw new Error('Database not connected. Call connect() first.');
  }
  return currentAdapter;
}

// Query wrapper
export async function query(sql, params = []) {
  const adapter = getAdapter();
  return adapter.query(sql, params);
}

// Transaction wrapper
export async function transaction(callback) {
  const adapter = getAdapter();
  return adapter.transaction(callback);
}

// MongoDB Adapter
async function createMongoAdapter(config) {
  const { MongoClient } = await import('mongodb');
  
  let client = null;
  let db = null;
  
  return {
    async connect() {
      client = new MongoClient(config.url, config.options);
      await client.connect();
      db = client.db();
    },
    
    async disconnect() {
      if (client) {
        await client.close();
      }
    },
    
    async query(collection, operation, ...args) {
      if (!db) throw new Error('MongoDB not connected');
      return db.collection(collection)[operation](...args);
    },
    
    async transaction(callback) {
      const session = client.startSession();
      try {
        return await session.withTransaction(callback);
      } finally {
        await session.endSession();
      }
    },
    
    // MongoDB specific methods
    collection(name) {
      if (!db) throw new Error('MongoDB not connected');
      return db.collection(name);
    },
    
    async insertOne(collection, doc) {
      return this.query(collection, 'insertOne', doc);
    },
    
    async insertMany(collection, docs) {
      return this.query(collection, 'insertMany', docs);
    },
    
    async findOne(collection, filter, options = {}) {
      return this.query(collection, 'findOne', filter, options);
    },
    
    async find(collection, filter = {}, options = {}) {
      const cursor = await this.query(collection, 'find', filter, options);
      return cursor.toArray();
    },
    
    async updateOne(collection, filter, update, options = {}) {
      return this.query(collection, 'updateOne', filter, update, options);
    },
    
    async updateMany(collection, filter, update, options = {}) {
      return this.query(collection, 'updateMany', filter, update, options);
    },
    
    async deleteOne(collection, filter) {
      return this.query(collection, 'deleteOne', filter);
    },
    
    async deleteMany(collection, filter) {
      return this.query(collection, 'deleteMany', filter);
    },
    
    async countDocuments(collection, filter = {}) {
      return this.query(collection, 'countDocuments', filter);
    }
  };
}

// PostgreSQL Adapter
async function createPostgresAdapter(config) {
  const { Pool } = await import('pg');
  
  let pool = null;
  
  return {
    async connect() {
      pool = new Pool({
        connectionString: config.url,
        ...config.options
      });
      
      // Test connection
      const client = await pool.connect();
      client.release();
    },
    
    async disconnect() {
      if (pool) {
        await pool.end();
      }
    },
    
    async query(sql, params = []) {
      if (!pool) throw new Error('PostgreSQL not connected');
      const result = await pool.query(sql, params);
      return result.rows;
    },
    
    async transaction(callback) {
      const client = await pool.connect();
      try {
        await client.query('BEGIN');
        const result = await callback(client);
        await client.query('COMMIT');
        return result;
      } catch (error) {
        await client.query('ROLLBACK');
        throw error;
      } finally {
        client.release();
      }
    },
    
    // PostgreSQL specific methods
    async insert(table, data) {
      const keys = Object.keys(data);
      const values = Object.values(data);
      const placeholders = keys.map((_, i) => `$${i + 1}`).join(', ');
      
      const sql = `INSERT INTO ${table} (${keys.join(', ')}) VALUES (${placeholders}) RETURNING *`;
      const result = await this.query(sql, values);
      return result[0];
    },
    
    async select(table, where = {}, options = {}) {
      let sql = `SELECT * FROM ${table}`;
      const params = [];
      
      if (Object.keys(where).length > 0) {
        const conditions = Object.keys(where).map((key, i) => {
          params.push(where[key]);
          return `${key} = $${i + 1}`;
        });
        sql += ` WHERE ${conditions.join(' AND ')}`;
      }
      
      if (options.orderBy) {
        sql += ` ORDER BY ${options.orderBy}`;
      }
      
      if (options.limit) {
        sql += ` LIMIT ${options.limit}`;
      }
      
      if (options.offset) {
        sql += ` OFFSET ${options.offset}`;
      }
      
      return this.query(sql, params);
    },
    
    async update(table, data, where) {
      const setClause = Object.keys(data).map((key, i) => `${key} = $${i + 1}`).join(', ');
      const whereClause = Object.keys(where).map((key, i) => `${key} = $${i + 1 + Object.keys(data).length}`).join(' AND ');
      
      const sql = `UPDATE ${table} SET ${setClause} WHERE ${whereClause} RETURNING *`;
      const params = [...Object.values(data), ...Object.values(where)];
      
      const result = await this.query(sql, params);
      return result[0];
    },
    
    async delete(table, where) {
      const whereClause = Object.keys(where).map((key, i) => `${key} = $${i + 1}`).join(' AND ');
      const sql = `DELETE FROM ${table} WHERE ${whereClause} RETURNING *`;
      const params = Object.values(where);
      
      return this.query(sql, params);
    }
  };
}

// SQLite Adapter
async function createSQLiteAdapter(config) {
  const sqlite3 = await import('sqlite3');
  const { open } = await import('sqlite');
  
  let db = null;
  
  return {
    async connect() {
      const dbPath = config.url.replace('sqlite:', '');
      
      // Ensure directory exists
      const dir = path.dirname(dbPath);
      await fs.mkdir(dir, { recursive: true });
      
      db = await open({
        filename: dbPath,
        driver: sqlite3.Database
      });
    },
    
    async disconnect() {
      if (db) {
        await db.close();
      }
    },
    
    async query(sql, params = []) {
      if (!db) throw new Error('SQLite not connected');
      
      if (sql.trim().toLowerCase().startsWith('select')) {
        return db.all(sql, params);
      } else {
        return db.run(sql, params);
      }
    },
    
    async transaction(callback) {
      if (!db) throw new Error('SQLite not connected');
      
      await db.run('BEGIN TRANSACTION');
      try {
        const result = await callback(db);
        await db.run('COMMIT');
        return result;
      } catch (error) {
        await db.run('ROLLBACK');
        throw error;
      }
    },
    
    // SQLite specific methods
    async insert(table, data) {
      const keys = Object.keys(data);
      const values = Object.values(data);
      const placeholders = keys.map(() => '?').join(', ');
      
      const sql = `INSERT INTO ${table} (${keys.join(', ')}) VALUES (${placeholders})`;
      const result = await db.run(sql, values);
      
      // Return the inserted row
      return db.get(`SELECT * FROM ${table} WHERE rowid = ?`, [result.lastID]);
    },
    
    async select(table, where = {}, options = {}) {
      let sql = `SELECT * FROM ${table}`;
      const params = [];
      
      if (Object.keys(where).length > 0) {
        const conditions = Object.keys(where).map(key => {
          params.push(where[key]);
          return `${key} = ?`;
        });
        sql += ` WHERE ${conditions.join(' AND ')}`;
      }
      
      if (options.orderBy) {
        sql += ` ORDER BY ${options.orderBy}`;
      }
      
      if (options.limit) {
        sql += ` LIMIT ${options.limit}`;
      }
      
      if (options.offset) {
        sql += ` OFFSET ${options.offset}`;
      }
      
      return db.all(sql, params);
    },
    
    async update(table, data, where) {
      const setClause = Object.keys(data).map(key => `${key} = ?`).join(', ');
      const whereClause = Object.keys(where).map(key => `${key} = ?`).join(' AND ');
      
      const sql = `UPDATE ${table} SET ${setClause} WHERE ${whereClause}`;
      const params = [...Object.values(data), ...Object.values(where)];
      
      await db.run(sql, params);
      
      // Return updated row
      return db.get(`SELECT * FROM ${table} WHERE ${whereClause}`, Object.values(where));
    },
    
    async delete(table, where) {
      const whereClause = Object.keys(where).map(key => `${key} = ?`).join(' AND ');
      const sql = `DELETE FROM ${table} WHERE ${whereClause}`;
      const params = Object.values(where);
      
      return db.run(sql, params);
    }
  };
}

// Prisma Adapter
async function createPrismaAdapter(config) {
  const { PrismaClient } = await import('@prisma/client');
  
  let prisma = null;
  
  return {
    async connect() {
      prisma = new PrismaClient(config.options);
      await prisma.$connect();
    },
    
    async disconnect() {
      if (prisma) {
        await prisma.$disconnect();
      }
    },
    
    async query(sql, params = []) {
      if (!prisma) throw new Error('Prisma not connected');
      return prisma.$queryRaw`${sql}`;
    },
    
    async transaction(callback) {
      if (!prisma) throw new Error('Prisma not connected');
      return prisma.$transaction(callback);
    },
    
    // Direct Prisma client access
    get client() {
      if (!prisma) throw new Error('Prisma not connected');
      return prisma;
    }
  };
}

// Migration utilities
export class Migration {
  constructor(name, up, down) {
    this.name = name;
    this.up = up;
    this.down = down;
    this.timestamp = new Date().toISOString();
  }
}

const migrations = [];

export function addMigration(name, up, down) {
  migrations.push(new Migration(name, up, down));
}

export async function runMigrations() {
  const adapter = getAdapter();
  
  // Create migrations table if it doesn't exist
  try {
    await adapter.query(`
      CREATE TABLE IF NOT EXISTS migrations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT UNIQUE NOT NULL,
        timestamp TEXT NOT NULL,
        executed_at TEXT DEFAULT CURRENT_TIMESTAMP
      )
    `);
  } catch (error) {
    // Handle different SQL dialects
    console.warn('Migration table creation warning:', error.message);
  }
  
  // Get executed migrations
  const executedMigrations = await adapter.query('SELECT name FROM migrations');
  const executedNames = executedMigrations.map(m => m.name);
  
  // Run pending migrations
  for (const migration of migrations) {
    if (!executedNames.includes(migration.name)) {
      console.log(`Running migration: ${migration.name}`);
      
      try {
        await adapter.transaction(async () => {
          await migration.up(adapter);
          await adapter.query(
            'INSERT INTO migrations (name, timestamp) VALUES (?, ?)',
            [migration.name, migration.timestamp]
          );
        });
        
        console.log(`✅ Migration completed: ${migration.name}`);
      } catch (error) {
        console.error(`❌ Migration failed: ${migration.name}`, error);
        throw error;
      }
    }
  }
}

export async function rollbackMigration(name) {
  const adapter = getAdapter();
  const migration = migrations.find(m => m.name === name);
  
  if (!migration) {
    throw new Error(`Migration not found: ${name}`);
  }
  
  console.log(`Rolling back migration: ${name}`);
  
  try {
    await adapter.transaction(async () => {
      await migration.down(adapter);
      await adapter.query('DELETE FROM migrations WHERE name = ?', [name]);
    });
    
    console.log(`✅ Migration rolled back: ${name}`);
  } catch (error) {
    console.error(`❌ Rollback failed: ${name}`, error);
    throw error;
  }
}

// Model utilities
export class Model {
  constructor(tableName, schema = {}) {
    this.tableName = tableName;
    this.schema = schema;
  }
  
  async create(data) {
    const adapter = getAdapter();
    return adapter.insert(this.tableName, data);
  }
  
  async findById(id) {
    const adapter = getAdapter();
    const results = await adapter.select(this.tableName, { id });
    return results[0] || null;
  }
  
  async findOne(where) {
    const adapter = getAdapter();
    const results = await adapter.select(this.tableName, where);
    return results[0] || null;
  }
  
  async findMany(where = {}, options = {}) {
    const adapter = getAdapter();
    return adapter.select(this.tableName, where, options);
  }
  
  async update(id, data) {
    const adapter = getAdapter();
    return adapter.update(this.tableName, data, { id });
  }
  
  async delete(id) {
    const adapter = getAdapter();
    return adapter.delete(this.tableName, { id });
  }
  
  async count(where = {}) {
    const adapter = getAdapter();
    const result = await adapter.query(
      `SELECT COUNT(*) as count FROM ${this.tableName}${
        Object.keys(where).length > 0 
          ? ` WHERE ${Object.keys(where).map(k => `${k} = ?`).join(' AND ')}`
          : ''
      }`,
      Object.values(where)
    );
    return result[0].count;
  }
}

// Export everything
export default {
  configure,
  connect,
  disconnect,
  getAdapter,
  query,
  transaction,
  Migration,
  addMigration,
  runMigrations,
  rollbackMigration,
  Model
};
