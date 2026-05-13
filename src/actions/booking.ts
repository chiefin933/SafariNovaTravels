"use server";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { BookingStatus } from "@prisma/client";

export async function createBookingSession(packageId: string, guests: number, startDate: string) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const pkg = await db.package.findUnique({
    where: { id: packageId },
  });

  if (!pkg) {
    throw new Error("Package not found");
  }

  // Create booking directly in the database
  await db.booking.create({
    data: {
      userId,
      packageId,
      guests,
      startDate: new Date(startDate),
      totalPrice: pkg.price * guests,
      status: BookingStatus.PAID, // Auto-mark as paid for simulation
    },
  });

  return { url: `/dashboard/bookings?success=true` };
}


export async function getBookings() {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  return await db.booking.findMany({
    include: {
      package: true,
      user: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

