"use server";

import { createClerkClient } from "@clerk/nextjs/server";
import { auth } from "@clerk/nextjs/server";

const clerk = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY,
});

export async function getUsers() {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  // Fetch users from Clerk
  const response = await clerk.users.getUserList({
    limit: 100,
    orderBy: "-created_at",
  });

  return response.data.map((user) => ({
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.emailAddresses[0]?.emailAddress,
    imageUrl: user.imageUrl,
    role: (user.publicMetadata?.role as string) || "USER",
    createdAt: new Date(user.createdAt).toLocaleDateString(),
  }));
}
