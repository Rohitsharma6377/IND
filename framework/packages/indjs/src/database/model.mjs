// Model utilities
import { getAdapter } from "./index.mjs";

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
          ? ` WHERE ${Object.keys(where)
              .map((k) => `${k} = ?`)
              .join(" AND ")}`
          : ""
      }`,
      Object.values(where),
    );
    return result[0].count;
  }
}
