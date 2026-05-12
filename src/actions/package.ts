"use server";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { PackageStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function createPackage(data: {
  title: string;
  slug: string;
  description: string;
  price: number;
  duration: number;
  images: string[];
  destinationId: string;
}) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  // Basic check for admin role could be added here
  // const user = await db.user.findUnique({ where: { id: userId } });
  // if (user?.role !== "ADMIN") throw new Error("Forbidden");

  const pkg = await db.package.create({
    data: {
      ...data,
      status: PackageStatus.DRAFT,
      availability: 20, // Default availability
    },
  });

  revalidatePath("/admin/packages");
  revalidatePath("/packages");
  revalidatePath("/destinations");

  return pkg;
}

export async function getDestinations() {
  return await db.destination.findMany({
    orderBy: {
      name: "asc",
    },
  });
}

export async function getPackages() {
  return await db.package.findMany({
    include: {
      destination: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getPackageBySlug(slug: string) {
  return await db.package.findUnique({
    where: { slug },
    include: {
      destination: true,
    },
  });
}


