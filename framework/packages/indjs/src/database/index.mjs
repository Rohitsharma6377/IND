import { createSQLiteAdapter } from './adapters/sqlite.mjs';
import { createPostgresAdapter } from './adapters/postgres.mjs';
import { createMongoAdapter } from './adapters/mongo.mjs';
import { createPrismaAdapter } from './adapters/prisma.mjs';
import { Migration, addMigration, runMigrations, rollbackMigration } from './migrations.mjs';
import { Model } from './model.mjs';
import { isMobile } from '../platform.mjs';

// Database adapters
let currentAdapter = null;
let isConnected = false;

// Database configuration
const config = {
  type: process.env.DATABASE_TYPE || 'sqlite',
  url: process.env.DATABASE_URL || 'sqlite:./data/app.db',
  options: {}
};

export class Database {
  constructor(initialConfig) {
    this.config = {
      type: process.env.DATABASE_TYPE || 'sqlite',
      url: process.env.DATABASE_URL || 'sqlite:./data/app.db',
      options: {},
      ...initialConfig
    };
    this.adapter = null;
    this.connected = false;
  }

  // Configure database
  configure(newConfig) {
    Object.assign(this.config, newConfig);
  }

  // Connect to database
  async connect(customConfig = null) {
    // Mobile check - no direct DB access
    if (isMobile) {
      console.warn('Database access is not available in mobile environment directly. Use API calls.');
      return;
    }

    const dbConfig = customConfig || this.config;
    const type = dbConfig.type || process.env.DATABASE_TYPE || 'memory';

    try {
      switch (type) {
        case 'mongodb':
          this.adapter = await createMongoAdapter(dbConfig);
          break;
        case 'postgresql':
        case 'postgres':
          this.adapter = await createPostgresAdapter(dbConfig);
          break;
        case 'sqlite':
          this.adapter = await createSQLiteAdapter(dbConfig);
          break;
        case 'prisma':
          this.adapter = await createPrismaAdapter(dbConfig);
          break;
        case 'mysql':
        case 'redis':
        case 'firebase':
          throw new Error(`Database type ${type} is not currently supported.`);
        default:
          throw new Error(`Unsupported database type: ${type}`);
      }

      // Optional retries
      const retries = Number(dbConfig.options?.retries || 1);
      const delayMs = Number(dbConfig.options?.retryDelayMs || 500);
      let lastErr = null;
      for (let attempt = 1; attempt <= Math.max(1, retries); attempt++) {
        try {
          await this.adapter.connect();
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

      this.connected = true;
      console.log(`✅ Connected to ${type} database`);

      // Update global singleton for backward compatibility
      currentAdapter = this.adapter;
      isConnected = true;

      return this.adapter;
    } catch (error) {
      console.error('❌ Database connection failed:', error.message);
      throw error;
    }
  }

  // Minimal health check
  async healthCheck() {
    try {
      if (!this.adapter || !this.connected) return { ok: false };
      try { await this.query('SELECT 1'); return { ok: true }; } catch { }
      return { ok: true };
    } catch {
      return { ok: false };
    }
  }

  // Disconnect from database
  async disconnect() {
    if (this.adapter && this.connected) {
      await this.adapter.disconnect();
      this.connected = false;
      this.adapter = null;

      // Update global
      if (currentAdapter === this.adapter) {
        currentAdapter = null;
        isConnected = false;
      }
      console.log('✅ Database disconnected');
    }
  }

  // Get current adapter
  getAdapter() {
    if (!this.adapter || !this.connected) {
      throw new Error('Database not connected. Call connect() first.');
    }
    return this.adapter;
  }

  // Query wrapper
  async query(sql, params = []) {
    const adapter = this.getAdapter();
    return adapter.query(sql, params);
  }

  // Transaction wrapper
  async transaction(callback) {
    const adapter = this.getAdapter();
    return adapter.transaction(callback);
  }
}

// Global functions for backward compatibility
export function configure(newConfig) {
  Object.assign(config, newConfig);
}

export async function connect(customConfig = null) {
  const db = new Database(customConfig || config);
  return db.connect();
}

export async function healthCheck() {
  try {
    if (!currentAdapter || !isConnected) return { ok: false };
    try { await currentAdapter.query('SELECT 1'); return { ok: true }; } catch { }
    return { ok: true };
  } catch {
    return { ok: false };
  }
}

export async function disconnect() {
  if (currentAdapter) {
    await currentAdapter.disconnect();
    currentAdapter = null;
    isConnected = false;
    console.log('✅ Database disconnected');
  }
}

export function getAdapter() {
  if (!currentAdapter || !isConnected) {
    throw new Error('Database not connected. Call connect() first.');
  }
  return currentAdapter;
}

export async function query(sql, params = []) {
  const adapter = getAdapter();
  return adapter.query(sql, params);
}

export async function transaction(callback) {
  const adapter = getAdapter();
  return adapter.transaction(callback);
}

// Re-export Migration and Model
export { Migration, addMigration, runMigrations, rollbackMigration, Model };

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
  Model,
  Database
};
