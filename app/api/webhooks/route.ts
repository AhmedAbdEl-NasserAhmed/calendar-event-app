import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const evt = await verifyWebhook(req);

    if (evt.type === "user.created") {
      const { id, first_name, last_name } = evt.data as {
        id: string;
        first_name: string;
        last_name: string;
      };

      const userBody = {
        userName: first_name + " " + last_name,
        userId: id
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_LOCALHOST}/api/v1/users`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(userBody)
        }
      );

      if (!response.ok) {
        return new Response("Error creating user", { status: 400 });
      }
    }
    return new Response("Webhook received", { status: 200 });
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error verifying webhook", { status: 400 });
  }
}
