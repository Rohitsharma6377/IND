export async function createPostgresAdapter(config) {
    let Pool;
    try {
        const pg = await import('pg');
        Pool = pg.Pool;
    } catch (e) { }

    if (!Pool) {
        return {
            connect: () => { throw new Error('PostgreSQL dependencies not found. Please install pg.'); },
        };
    }

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
