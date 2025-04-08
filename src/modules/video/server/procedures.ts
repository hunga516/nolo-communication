import {createTRPCRouter, protectedProcedure} from "@/trpc/init";
import {db} from "@/db";
import {videosTable} from "@/db/schema";
import {mux} from "@/lib/mux";

export const videoRouter = createTRPCRouter({
    create: protectedProcedure.mutation(async ({
        ctx
    }) => {
        const {id: userId} = ctx.user

        const upload = await mux.video.uploads.create({
            cors_origin: '*', //set url production
            new_asset_settings: {
                passthrough: JSON.stringify(userId),
                playback_policy: ['public'],
            },
        })

        const [video] = await db
            .insert(videosTable)
            .values({
                userId,
                title: "test1",
            })
            .returning()

        return {
            video: video,
            url: upload.url,
        }
    })
})