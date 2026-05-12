import { createClerkClient } from "@clerk/backend";
import * as dotenv from "dotenv";
dotenv.config({ path: ".env" });

const clerk = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });

async function promote(email: string) {
  console.log(`Promoting ${email} in Clerk...`);
  try {
    const users = await clerk.users.getUserList({ emailAddress: [email] });
    if (users.data.length > 0) {
      await clerk.users.updateUser(users.data[0].id, {
        publicMetadata: { role: "ADMIN" }
      });
      console.log("✅ Clerk metadata updated.");
    } else {
      console.log("⚠️ User not found in Clerk. Make sure they have signed up first.");
    }
  } catch (error) {
    console.error("❌ Error:", error);
  }
}

const email = process.argv[2];
promote(email);
