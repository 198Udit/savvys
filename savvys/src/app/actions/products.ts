'use server';

/**
 * src/app/actions/products.ts
 *
 * Next.js 16 Server Actions — replaces Express routes for MERN.
 * These run server-side only and never ship to the client bundle.
 */

import { connectDB } from '@/lib/db';
import type { Product } from '@/types';

// ── Mongoose model (lazy — defined inside Server Action file) ─────────
// In production, split into src/models/Product.ts
import mongoose, { Schema, model, models } from 'mongoose';

const ProductSchema = new Schema({
  name: { type: String, required: true, trim: true },
  price: { type: Number, required: true, min: 0 },
  category: { type: String, required: true },
  description: String,
  image: { type: String, default: '' },
  badge: String,
}, { timestamps: true });

const ProductModel =
  models.Product ?? model('Product', ProductSchema);

/* ─── Server Actions ───────────────────────────────────────────────── */

/**
 * Fetch all products — safe to call from Server Components or client
 * components via `import` (Next.js proxies through the server boundary).
 */
export async function getProducts(): Promise<Product[]> {
  try {
    await connectDB();
    const docs = await ProductModel.find({}).lean().limit(20).sort({ createdAt: -1 });
    return JSON.parse(JSON.stringify(docs)) as Product[];
  } catch (err) {
    console.error('[getProducts]', err);
    return [];
  }
}

/**
 * Get a single product by ID.
 */
export async function getProduct(id: string): Promise<Product | null> {
  try {
    await connectDB();
    const doc = await ProductModel.findById(id).lean();
    return doc ? (JSON.parse(JSON.stringify(doc)) as Product) : null;
  } catch (err) {
    console.error('[getProduct]', err);
    return null;
  }
}

/**
 * Create a product (admin use — protect with auth in production).
 */
export async function createProduct(
  data: Omit<Product, '_id'>
): Promise<{ success: boolean; id?: string; error?: string }> {
  try {
    await connectDB();
    const doc = await ProductModel.create(data);
    return { success: true, id: doc._id.toString() };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return { success: false, error: message };
  }
}

/**
 * Seed the DB with mock data (dev only — guard with env check).
 */
export async function seedProducts(): Promise<{ count: number }> {
  if (process.env.NODE_ENV === 'production') {
    throw new Error('Seeding is disabled in production.');
  }

  await connectDB();
  await ProductModel.deleteMany({});

  const seed = [
    { name: 'Selvedge Trouser', price: 340, category: 'Elevated', description: 'Japanese selvedge denim', badge: 'New' },
    { name: 'Supima Tee', price: 95, category: 'Essentials', description: 'Clean white, impeccable cut' },
    { name: 'Overshirt', price: 275, category: 'Statement', description: 'Heavyweight Belgian linen', badge: 'Limited' },
    { name: 'Derby Boot', price: 580, category: 'Heritage', description: 'Goodyear welted, tan calf' },
    { name: 'Coach Jacket', price: 420, category: 'Archive', description: 'Deadstock nylon, 1990s cut', badge: '2 left' },
    { name: 'Knit Polo', price: 195, category: 'Essentials', description: 'Merino, ribbed collar' },
  ];

  await ProductModel.insertMany(seed);
  return { count: seed.length };
}
