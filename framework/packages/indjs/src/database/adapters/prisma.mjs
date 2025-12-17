export async function createPrismaAdapter(config) {
  const { PrismaClient } = await import("@prisma/client");

  let prisma = null;

  return {
    async connect() {
      prisma = new PrismaClient(config.options);
      await prisma.$connect();
    },

    async disconnect() {
      if (prisma) {
        await prisma.$disconnect();
      }
    },

    async query(sql, params = []) {
      if (!prisma) throw new Error("Prisma not connected");
      return prisma.$queryRaw`${sql}`;
    },

    async transaction(callback) {
      if (!prisma) throw new Error("Prisma not connected");
      return prisma.$transaction(callback);
    },

    // Direct Prisma client access
    get client() {
      if (!prisma) throw new Error("Prisma not connected");
      return prisma;
    },
  };
}
