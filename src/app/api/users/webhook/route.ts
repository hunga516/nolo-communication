import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import axiosInstance from "../../axios";
import { clerkClient } from "@/lib/clerk";

export async function POST(req: Request) {
  const SIGNING_SECRET = process.env.CLERK_SIGNING_SECRET;

  if (!SIGNING_SECRET) {
    throw new Error(
      "Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env",
    );
  }

  // Create new Svix instance with secret
  const wh = new Webhook(SIGNING_SECRET);

  // Get headers
  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error: Missing Svix headers", {
      status: 400,
    });
  }

  // Get body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  let evt: WebhookEvent;

  // Verify payload with headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error: Could not verify webhook:", err);
    return new Response("Error: Verification error", {
      status: 400,
    });
  }

  // Do something with payload
  // For this guide, log payload to console
  const eventType = evt.type;

  if (eventType === "user.created") {
    const { data } = evt;

    try {
      await db.insert(usersTable).values({
        clerkId: data.id,
        name: `${data.first_name} ${data.last_name}`,
        imageUrl: data.image_url,
        email: data.email_addresses[0].email_address ?? "",
        age: 18,
      });

      const response = await axiosInstance.post('/auth/register', {
        clerkId: data.id,
        name: `${data.first_name} ${data.last_name}`,
        imageUrl: data.image_url,
        email: data.email_addresses[0].email_address ?? "default email",
        username: data.email_addresses[0].email_address ?? "default username",
        password: "123456"
      });

      console.log("Register API response:", response.data);
      console.log("Updating metadata for Clerk user:", data.id);

      await clerkClient.users.updateUserMetadata(data.id, {
        publicMetadata: {
          userId: response.data._id
        }
      });
    } catch (err) {
      console.log("Error when register", err);
    }
  }

  if (eventType === "user.deleted") {
    const { data } = evt;

    if (!data.id) {
      return new Response("missing userid", { status: 400 });
    }

    await db.delete(usersTable).where(eq(usersTable.clerkId, data.id));
  }

  if (eventType === "user.updated") {
    const { data } = evt;

    await db
      .update(usersTable)
      .set({
        name: `${data.first_name} ${data.last_name}`,
        imageUrl: data.image_url,
      })
      .where(eq(usersTable.clerkId, data.id));
  }

  return new Response("Webhook received", { status: 200 });
}
