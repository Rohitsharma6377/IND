// Migration utilities
import { getAdapter } from './index.mjs';

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
