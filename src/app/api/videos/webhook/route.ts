import { db } from "@/db";
import { videosTable } from "@/db/schema";
import { mux } from "@/lib/mux";
import { VideoAssetCreatedWebhookEvent, VideoAssetErroredWebhookEvent, VideoAssetReadyWebhookEvent, VideoAssetTrackReadyWebhookEvent } from "@mux/mux-node/resources/webhooks.mjs";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";


type WebhookEvent =
    | VideoAssetCreatedWebhookEvent
    | VideoAssetReadyWebhookEvent
    | VideoAssetErroredWebhookEvent
    | VideoAssetTrackReadyWebhookEvent

export const POST = async (request: Request) => {
    if (!process.env.MUX_WEBHOOK_SECRET) {
        return new Response('Webhook secret not set', { status: 500 });
    }

    const headerPayload = await headers()
    const muxSignature = headerPayload.get('mux-signature')

    if (!muxSignature) {
        return new Response('Missing mux-signature header', { status: 401 });
    }

    const payload = await request.json()
    const body = JSON.stringify(payload)

    mux.webhooks.verifySignature(
        body,
        {
            "mux-signature": muxSignature
        },
        process.env.MUX_WEBHOOK_SECRET
    )

    switch (payload.type as WebhookEvent["type"]) {
        case "video.asset.created": {
            const data = payload.data as VideoAssetCreatedWebhookEvent["data"]

            if (!data.upload_id) {
                return new Response('Missing upload_id', { status: 400 });
            }

            await db
                .update(videosTable)
                .set({
                    muxAssetId: data.id,
                    muxStatus: data.status,
                })
                .where(eq(videosTable.muxUploadId, data.upload_id))
            break;
        }
    }
    return new Response("Webhook recived", { status: 200 });
}