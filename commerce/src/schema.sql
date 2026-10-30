PRAGMA foreign_keys = ON;
PRAGMA journal_mode = WAL;
PRAGMA busy_timeout = 5000;
CREATE TABLE IF NOT EXISTS users (
 id TEXT PRIMARY KEY, email TEXT UNIQUE NOT NULL, name TEXT NOT NULL,
 password_hash TEXT NOT NULL, kind TEXT NOT NULL CHECK(kind IN ('merchant','partner','support'))
);
CREATE TABLE IF NOT EXISTS stores (
 id TEXT PRIMARY KEY, slug TEXT UNIQUE NOT NULL, name TEXT NOT NULL, owner_id TEXT NOT NULL REFERENCES users(id),
 mode TEXT NOT NULL CHECK(mode IN ('development','demo','active')), plan TEXT NOT NULL DEFAULT 'launch',
 created_by TEXT REFERENCES users(id), created_at TEXT NOT NULL,
 draft TEXT NOT NULL, published TEXT NOT NULL, theme_revision INTEGER NOT NULL DEFAULT 1
);
CREATE TABLE IF NOT EXISTS memberships (
 store_id TEXT NOT NULL REFERENCES stores(id), user_id TEXT NOT NULL REFERENCES users(id),
 role TEXT NOT NULL CHECK(role IN ('owner','admin','staff','collaborator','viewer')), PRIMARY KEY(store_id,user_id)
);
CREATE TABLE IF NOT EXISTS sessions (
 token_hash TEXT PRIMARY KEY, user_id TEXT NOT NULL REFERENCES users(id), csrf TEXT NOT NULL, expires INTEGER NOT NULL
);
CREATE TABLE IF NOT EXISTS products (
 id TEXT PRIMARY KEY, store_id TEXT NOT NULL REFERENCES stores(id), name TEXT NOT NULL, sku TEXT NOT NULL,
 category TEXT NOT NULL, description TEXT NOT NULL, price INTEGER NOT NULL CHECK(price >= 0),
 tax_bps INTEGER NOT NULL CHECK(tax_bps BETWEEN 0 AND 4000), stock INTEGER NOT NULL CHECK(stock >= 0),
 active INTEGER NOT NULL DEFAULT 1 CHECK(active IN (0,1)), colour TEXT NOT NULL, created_at TEXT NOT NULL, UNIQUE(store_id,sku)
);
CREATE INDEX IF NOT EXISTS product_store ON products(store_id,created_at);
CREATE TABLE IF NOT EXISTS orders (
 id TEXT PRIMARY KEY, number TEXT NOT NULL, store_id TEXT NOT NULL REFERENCES stores(id),
 customer TEXT NOT NULL, email TEXT NOT NULL, phone TEXT NOT NULL, address TEXT NOT NULL,
 items TEXT NOT NULL, total INTEGER NOT NULL, tax INTEGER NOT NULL, currency TEXT NOT NULL DEFAULT 'INR',
 payment TEXT NOT NULL DEFAULT 'unpaid' CHECK(payment IN ('unpaid','paid')),
 fulfilment TEXT NOT NULL DEFAULT 'unfulfilled' CHECK(fulfilment IN ('unfulfilled','shipped','delivered','cancelled')),
 method TEXT NOT NULL DEFAULT 'cod', idempotency_key TEXT NOT NULL, request_hash TEXT NOT NULL,
 created_at TEXT NOT NULL, UNIQUE(store_id,idempotency_key)
);
CREATE INDEX IF NOT EXISTS order_store ON orders(store_id,created_at);
CREATE TABLE IF NOT EXISTS ledger (
 id TEXT PRIMARY KEY, store_id TEXT NOT NULL REFERENCES stores(id), product_id TEXT NOT NULL REFERENCES products(id),
 delta INTEGER NOT NULL, reason TEXT NOT NULL, reference TEXT NOT NULL, created_at TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS audit (
 id TEXT PRIMARY KEY, store_id TEXT NOT NULL REFERENCES stores(id), actor TEXT NOT NULL, action TEXT NOT NULL, detail TEXT NOT NULL, created_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS audit_store ON audit(store_id,created_at);
CREATE TABLE IF NOT EXISTS theme_versions (
 id TEXT PRIMARY KEY, store_id TEXT NOT NULL REFERENCES stores(id), revision INTEGER NOT NULL, config TEXT NOT NULL, created_at TEXT NOT NULL, UNIQUE(store_id,revision)
);
CREATE TABLE IF NOT EXISTS installations (
 store_id TEXT NOT NULL REFERENCES stores(id), plugin_id TEXT NOT NULL, installed_at TEXT NOT NULL, PRIMARY KEY(store_id,plugin_id)
);
CREATE TABLE IF NOT EXISTS apps (
 id TEXT PRIMARY KEY, store_id TEXT NOT NULL REFERENCES stores(id), name TEXT NOT NULL, scopes TEXT NOT NULL,
 token_hash TEXT UNIQUE NOT NULL, created_at TEXT NOT NULL, revoked INTEGER NOT NULL DEFAULT 0
);
CREATE TABLE IF NOT EXISTS events (
 id TEXT PRIMARY KEY, store_id TEXT NOT NULL REFERENCES stores(id), topic TEXT NOT NULL, payload TEXT NOT NULL, created_at TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS tasks (
 id TEXT PRIMARY KEY, store_id TEXT NOT NULL REFERENCES stores(id), title TEXT NOT NULL, detail TEXT NOT NULL, done INTEGER NOT NULL DEFAULT 0, created_at TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS tickets (
 id TEXT PRIMARY KEY, store_id TEXT NOT NULL REFERENCES stores(id), subject TEXT NOT NULL, body TEXT NOT NULL,
 priority TEXT NOT NULL CHECK(priority IN ('normal','urgent')), status TEXT NOT NULL DEFAULT 'open',
 response TEXT NOT NULL DEFAULT '', created_at TEXT NOT NULL, updated_at TEXT NOT NULL
);
PRAGMA user_version = 1;
