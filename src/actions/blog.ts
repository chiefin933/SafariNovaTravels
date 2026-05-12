"use server";

import { db } from "@/lib/db";

export async function getBlogPosts() {
  return await db.blogPost.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
  });
}

export async function getBlogPostBySlug(slug: string) {
  return await db.blogPost.findUnique({
    where: { slug },
  });
}
