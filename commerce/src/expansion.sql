CREATE TABLE IF NOT EXISTS gateway_versions (
 id TEXT PRIMARY KEY, store_id TEXT NOT NULL REFERENCES stores(id), key_id TEXT NOT NULL,
 key_secret TEXT NOT NULL, webhook_secret TEXT NOT NULL, mode TEXT NOT NULL, created_at TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS gateway_accounts (
 store_id TEXT PRIMARY KEY REFERENCES stores(id), version_id TEXT NOT NULL REFERENCES gateway_versions(id),
 enabled INTEGER NOT NULL DEFAULT 1, updated_at TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS payment_intents (
 id TEXT PRIMARY KEY, store_id TEXT NOT NULL REFERENCES stores(id), order_id TEXT UNIQUE NOT NULL REFERENCES orders(id),
 gateway_version TEXT NOT NULL REFERENCES gateway_versions(id), provider_order_id TEXT UNIQUE, provider_payment_id TEXT UNIQUE,
 token_hash TEXT NOT NULL, status TEXT NOT NULL, amount INTEGER NOT NULL, currency TEXT NOT NULL DEFAULT 'INR',
 last_error TEXT NOT NULL DEFAULT '', created_at TEXT NOT NULL, updated_at TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS webhook_receipts (
 store_id TEXT NOT NULL REFERENCES stores(id), event_id TEXT NOT NULL, digest TEXT NOT NULL, topic TEXT NOT NULL,
 created_at TEXT NOT NULL, PRIMARY KEY(store_id,event_id)
);
CREATE TABLE IF NOT EXISTS store_domains (
 id TEXT PRIMARY KEY, store_id TEXT NOT NULL REFERENCES stores(id), hostname TEXT NOT NULL, challenge TEXT NOT NULL,
 status TEXT NOT NULL DEFAULT 'pending', last_error TEXT NOT NULL DEFAULT '', verified_at TEXT, created_at TEXT NOT NULL,
 UNIQUE(store_id,hostname)
);
CREATE UNIQUE INDEX IF NOT EXISTS one_domain_owner ON store_domains(hostname) WHERE status IN ('dns_verified','active');
CREATE TABLE IF NOT EXISTS pilot_requests (
 id TEXT PRIMARY KEY, name TEXT NOT NULL, email TEXT NOT NULL, company TEXT NOT NULL, interest TEXT NOT NULL,
 message TEXT NOT NULL, consent_at TEXT NOT NULL, status TEXT NOT NULL DEFAULT 'new'
);
