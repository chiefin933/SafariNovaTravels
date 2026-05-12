"use server";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function createDestination(data: {
  name: string;
  slug: string;
  description: string;
  mainImage: string;
  country: string;
  continent: string;
}) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const destination = await db.destination.create({
    data,
  });

  revalidatePath("/admin/destinations");
  revalidatePath("/destinations");
  revalidatePath("/");

  return destination;
}

export async function getDestinations() {
  return await db.destination.findMany({
    include: {
      _count: {
        select: { packages: true },
      },
    },
    orderBy: {
      name: "asc",
    },
  });
}

