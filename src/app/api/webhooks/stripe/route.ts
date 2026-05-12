import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  const body = await req.text();
  const headerList = await headers();
  const signature = headerList.get("Stripe-Signature") as string;

  let event: any;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error: any) {
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
  }

  const session = event.data.object;

  if (event.type === "checkout.session.completed") {
    const metadata = session.metadata;

    if (!metadata?.userId || !metadata?.packageId) {
      return new NextResponse("Webhook Error: Missing metadata", { status: 400 });
    }

    // Create booking in database
    await db.booking.create({
      data: {
        userId: metadata.userId,
        packageId: metadata.packageId,
        guests: parseInt(metadata.guests),
        startDate: new Date(metadata.startDate),
        totalPrice: session.amount_total / 100,
        status: "PAID",
        stripeSessionId: session.id,
      },
    });

    // Update package availability
    await db.package.update({
      where: { id: metadata.packageId },
      data: {
        availability: {
          decrement: parseInt(metadata.guests),
        },
      },
    });
  }

  return new NextResponse(null, { status: 200 });
}
