"use server";

import { db } from "@/lib/db";
import { createClerkClient } from "@clerk/nextjs/server";
import { UserRole } from "@prisma/client";

const clerkClient = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY,
});

export async function promoteToAdmin(email: string) {
  try {
    // 1. Find user in database
    const user = await db.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error("User not found in database");
    }

    // 2. Find user in Clerk (to get Clerk ID if different)
    const clerkUsers = await clerkClient.users.getUserList({
      emailAddress: [email],
    });

    if (clerkUsers.data.length === 0) {
      throw new Error("User not found in Clerk");
    }

    const clerkUser = clerkUsers.data[0];

    // 3. Update Clerk publicMetadata
    await clerkClient.users.updateUser(clerkUser.id, {
      publicMetadata: {
        role: "ADMIN",
      },
    });

    // 4. Update Database role
    await db.user.update({
      where: { email },
      data: {
        role: UserRole.ADMIN,
      },
    });

    return { success: true, message: `Successfully promoted ${email} to ADMIN` };
  } catch (error: any) {
    console.error("Promotion error:", error);
    return { success: false, message: error.message };
  }
}
