// db.sql: dynamic driver loader and thin helpers
// Supports: postgres (pg), mysql (mysql2), sqlite (better-sqlite3) when installed.
// This is a minimal facade; real implementation should add query builders and migrations.

async function loadDriver(kind, url) {
  if (kind === 'postgres') return (await import('pg')).Client;
  if (kind === 'mysql') return (await import('mysql2/promise')).createConnection;
  if (kind === 'sqlite') return (await import('better-sqlite3')).default;
  throw new Error(`db.sql: unknown driver kind: ${kind}`);
}

export async function connect(url) {
  // url examples:
  // postgres://user:pass@host:5432/db
  // mysql://user:pass@host:3306/db
  // sqlite://./file.db or sqlite://:memory:
  const u = new URL(url);
  const kind = u.protocol.replace(':','');
  if (kind === 'postgres') {
    const Client = await loadDriver('postgres');
    const client = new Client({ connectionString: url });
    await client.connect();
    return {
      async query(q, params=[]) { const r = await client.query(q, params); return r.rows; },
      async close() { await client.end(); }
    };
  }
  if (kind === 'mysql') {
    const createConnection = await loadDriver('mysql');
    const conn = await createConnection(url);
    return {
      async query(q, params=[]) { const [rows] = await conn.execute(q, params); return rows; },
      async close() { await conn.end(); }
    };
  }
  if (kind === 'sqlite') {
    const Sqlite = await loadDriver('sqlite');
    const file = u.pathname === ':memory:' ? ':memory:' : decodeURIComponent(u.pathname);
    const db = new Sqlite(file);
    return {
      async query(q, params=[]) { const stmt = db.prepare(q); return stmt.all(...params); },
      async exec(q) { db.exec(q); },
      async close() { db.close(); }
    };
  }
  throw new Error(`db.sql: unsupported url ${url}`);
}

export const user = {
  // Example shape; real implementation would be generated
  async findMany(db, table='users') { return db.query(`SELECT * FROM ${table}`); }
};
