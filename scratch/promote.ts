import * as dotenv from "dotenv";
dotenv.config({ path: ".env" });

import { PrismaClient } from "@prisma/client";
import { createClerkClient } from "@clerk/backend";

const prisma = new PrismaClient();
const clerk = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });

async function promote(email: string) {
  console.log(`Promoting ${email} to ADMIN...`);

  try {
    // Update DB
    await prisma.user.update({
      where: { email },
      data: { role: "ADMIN" },
    });
    console.log("✅ Database updated.");

    // Update Clerk
    const users = await clerk.users.getUserList({ emailAddress: [email] });
    if (users.data.length > 0) {
      await clerk.users.updateUser(users.data[0].id, {
        publicMetadata: { role: "ADMIN" }
      });
      console.log("✅ Clerk metadata updated.");
    } else {
      console.log("⚠️ User not found in Clerk. Make sure they have signed up first.");
    }

    console.log("🚀 Promotion complete! Please sign out and sign back in to see changes.");
  } catch (error) {
    console.error("❌ Error:", error);
  } finally {
    await prisma.$disconnect();
  }
}

const email = process.argv[2];
if (!email) {
  console.log("Usage: npx tsx scratch/promote.ts your-email@example.com");
} else {
  promote(email);
}
