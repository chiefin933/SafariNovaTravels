"use server";

import { stripe } from "@/lib/stripe";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

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

  const checkoutSession = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: pkg.title,
            description: `Booking for ${guests} guests on ${new Date(startDate).toLocaleDateString()}`,
            images: pkg.images.length > 0 ? [pkg.images[0]] : [],
          },
          unit_amount: Math.round(pkg.price * 100),
        },
        quantity: guests,
      },
    ],
    mode: "payment",
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/bookings?success=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/packages/${pkg.slug}?cancelled=true`,
    metadata: {
      userId: userId,
      packageId: packageId,
      guests: guests.toString(),
      startDate: startDate,
    },
  });

  return { url: checkoutSession.url };
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

