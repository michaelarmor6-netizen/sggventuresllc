import { PrismaClient } from "@prisma/client";

/**
 * Prisma client singleton — prevents connection exhaustion in dev
 * (hot-reload recreates the module otherwise).
 *
 * Instantiation is lazy so `next build` on Vercel can compile server
 * actions without a live DATABASE_URL. SQLite is for local development
 * only; production must use a hosted Postgres URL.
 */
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

function createPrismaClient() {
  return new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });
}

function getClient(): PrismaClient {
  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = createPrismaClient();
  }
  return globalForPrisma.prisma;
}

export const prisma = new Proxy({} as PrismaClient, {
  get(_target, prop, receiver) {
    const client = getClient();
    const value = Reflect.get(client, prop, receiver);
    return typeof value === "function" ? value.bind(client) : value;
  },
});
