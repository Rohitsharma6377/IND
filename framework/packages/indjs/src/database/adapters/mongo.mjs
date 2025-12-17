export async function createMongoAdapter(config) {
  const { MongoClient } = await import("mongodb");

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
      if (!db) throw new Error("MongoDB not connected");
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
      if (!db) throw new Error("MongoDB not connected");
      return db.collection(name);
    },

    async insertOne(collection, doc) {
      return this.query(collection, "insertOne", doc);
    },

    async insertMany(collection, docs) {
      return this.query(collection, "insertMany", docs);
    },

    async findOne(collection, filter, options = {}) {
      return this.query(collection, "findOne", filter, options);
    },

    async find(collection, filter = {}, options = {}) {
      const cursor = await this.query(collection, "find", filter, options);
      return cursor.toArray();
    },

    async updateOne(collection, filter, update, options = {}) {
      return this.query(collection, "updateOne", filter, update, options);
    },

    async updateMany(collection, filter, update, options = {}) {
      return this.query(collection, "updateMany", filter, update, options);
    },

    async deleteOne(collection, filter) {
      return this.query(collection, "deleteOne", filter);
    },

    async deleteMany(collection, filter) {
      return this.query(collection, "deleteMany", filter);
    },

    async countDocuments(collection, filter = {}) {
      return this.query(collection, "countDocuments", filter);
    },
  };
}
