/**
 * src/lib/db.ts
 *
 * MongoDB connection utility for Next.js 16 Server Actions.
 * Uses a module-level cached promise to avoid re-connecting on
 * every hot-reload in development and every invocation in production.
 *
 * Pattern: singleton promise cached on `global` to survive Next.js
 * module reloads in dev without opening multiple connections.
 */

import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable in .env.local'
  );
}

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// Extend globalThis so TypeScript is happy
declare global {
  // eslint-disable-next-line no-var
  var __mongoose: MongooseCache | undefined;
}

const cached: MongooseCache = global.__mongoose ?? { conn: null, promise: null };

if (!global.__mongoose) {
  global.__mongoose = cached;
}

export async function connectDB(): Promise<typeof mongoose> {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
      // Connection pool tuned for serverless (Vercel)
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5_000,
      socketTimeoutMS: 45_000,
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

/**
 * Gracefully closes the connection (useful in tests / scripts).
 */
export async function disconnectDB(): Promise<void> {
  if (cached.conn) {
    await mongoose.disconnect();
    cached.conn = null;
    cached.promise = null;
  }
}
