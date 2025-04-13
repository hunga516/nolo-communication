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
        case "video.asset.ready": {
            console.log("video.asset.ready", payload)
            const data = payload.data as VideoAssetReadyWebhookEvent["data"]

            if (!data.upload_id) {
                return new Response('Missing upload_id', { status: 400 });
            }

            if (!data.playback_ids?.[0].id) {
                return new Response('Missing playback_id', { status: 400 });
            }

            const thumbnailUrl = `https://image.mux.com/${data.playback_ids?.[0].id}/thumbnail.jpg`
            const previewUrl = `https://image.mux.com/${data.playback_ids?.[0].id}/animated.gif`
            const duration = data.duration ? Math.round(data.duration) : 0
            await db
                .update(videosTable)
                .set({
                    muxStatus: data.status,
                    muxUploadId: data.playback_ids?.[0].id,
                    muxAssetId: data.id,
                    previewUrl: previewUrl,
                    thumbnailUrl: thumbnailUrl,
                    duration: duration,
                })
                .where(eq(videosTable.muxUploadId, data.upload_id))
            break;
        }
    }
    return new Response("Webhook recived", { status: 200 });
}