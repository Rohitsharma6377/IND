import fs from "fs/promises";
import path from "path";

export async function createSQLiteAdapter(config) {
  const sqlite3 = await import("sqlite3").catch(() => null);
  let open;
  try {
    const sql = await import("sqlite");
    open = sql.open;
  } catch (e) {}

  if (!sqlite3 || !open) {
    return {
      connect: () => {
        throw new Error(
          "SQLite dependencies not found. Please install sqlite3 and sqlite.",
        );
      },
    };
  }

  let db = null;

  return {
    async connect() {
      const dbPath = config.url.replace("sqlite:", "");

      // Ensure directory exists
      const dir = path.dirname(dbPath);
      await fs.mkdir(dir, { recursive: true });

      db = await open({
        filename: dbPath,
        driver: sqlite3.Database,
      });
    },

    async disconnect() {
      if (db) {
        await db.close();
      }
    },

    async query(sql, params = []) {
      if (!db) throw new Error("SQLite not connected");

      if (sql.trim().toLowerCase().startsWith("select")) {
        return db.all(sql, params);
      } else {
        return db.run(sql, params);
      }
    },

    async transaction(callback) {
      if (!db) throw new Error("SQLite not connected");

      await db.run("BEGIN TRANSACTION");
      try {
        const result = await callback(db);
        await db.run("COMMIT");
        return result;
      } catch (error) {
        await db.run("ROLLBACK");
        throw error;
      }
    },

    // SQLite specific methods
    async insert(table, data) {
      const keys = Object.keys(data);
      const values = Object.values(data);
      const placeholders = keys.map(() => "?").join(", ");

      const sql = `INSERT INTO ${table} (${keys.join(", ")}) VALUES (${placeholders})`;
      const result = await db.run(sql, values);

      // Return the inserted row
      return db.get(`SELECT * FROM ${table} WHERE rowid = ?`, [result.lastID]);
    },

    async select(table, where = {}, options = {}) {
      let sql = `SELECT * FROM ${table}`;
      const params = [];

      if (Object.keys(where).length > 0) {
        const conditions = Object.keys(where).map((key) => {
          params.push(where[key]);
          return `${key} = ?`;
        });
        sql += ` WHERE ${conditions.join(" AND ")}`;
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
      const setClause = Object.keys(data)
        .map((key) => `${key} = ?`)
        .join(", ");
      const whereClause = Object.keys(where)
        .map((key) => `${key} = ?`)
        .join(" AND ");

      const sql = `UPDATE ${table} SET ${setClause} WHERE ${whereClause}`;
      const params = [...Object.values(data), ...Object.values(where)];

      await db.run(sql, params);

      // Return updated row
      return db.get(
        `SELECT * FROM ${table} WHERE ${whereClause}`,
        Object.values(where),
      );
    },

    async delete(table, where) {
      const whereClause = Object.keys(where)
        .map((key) => `${key} = ?`)
        .join(" AND ");
      const sql = `DELETE FROM ${table} WHERE ${whereClause}`;
      const params = Object.values(where);

      return db.run(sql, params);
    },
  };
}
