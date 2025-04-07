import {createTRPCRouter, protectedProcedure} from "@/trpc/init";
import {db} from "@/db";
import {videosTable} from "@/db/schema";

export const videoRouter = createTRPCRouter({
    create: protectedProcedure.mutation(async ({
        ctx
    }) => {
        const {id: userId} = ctx.user

        const [video] = await db
            .insert(videosTable)
            .values({
                userId,
                title: "test1",
            })
            .returning()

        return {
            video: video
        }
    })
})