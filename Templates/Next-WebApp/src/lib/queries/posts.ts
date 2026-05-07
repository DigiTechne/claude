import { db } from "@/lib/db";
import { posts } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getPostById(id: string) {
  const result = await db.select().from(posts).where(eq(posts.id, id)).limit(1);
  return result[0] ?? null;
}

export async function getAllPosts() {
  return db.select().from(posts);
}
