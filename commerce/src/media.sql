CREATE TABLE IF NOT EXISTS media_assets (
 id TEXT PRIMARY KEY, store_id TEXT NOT NULL REFERENCES stores(id), name TEXT NOT NULL,
 alt TEXT NOT NULL, mime TEXT NOT NULL, original BLOB NOT NULL, hash TEXT NOT NULL,
 width INTEGER NOT NULL, height INTEGER NOT NULL, bytes INTEGER NOT NULL, created_at TEXT NOT NULL,
 UNIQUE(store_id,hash), UNIQUE(store_id,id)
);
CREATE TABLE IF NOT EXISTS media_variants (
 store_id TEXT NOT NULL, asset_id TEXT NOT NULL, size INTEGER NOT NULL,
 width INTEGER NOT NULL, height INTEGER NOT NULL, data BLOB NOT NULL,
 PRIMARY KEY(store_id,asset_id,size), FOREIGN KEY(store_id,asset_id) REFERENCES media_assets(store_id,id) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS product_media (
 store_id TEXT NOT NULL, product_id TEXT NOT NULL REFERENCES products(id), asset_id TEXT NOT NULL,
 position INTEGER NOT NULL,
 PRIMARY KEY(store_id,product_id,asset_id), UNIQUE(store_id,product_id,position),
 FOREIGN KEY(store_id,asset_id) REFERENCES media_assets(store_id,id)
);
