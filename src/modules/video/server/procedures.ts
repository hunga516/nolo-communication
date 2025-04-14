import {createTRPCRouter, protectedProcedure} from "@/trpc/init";
import {db} from "@/db";
import {videosTable, videoUpdateSchema} from "@/db/schema";
import {mux} from "@/lib/mux";
import { and, eq } from "drizzle-orm";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const videoRouter = createTRPCRouter({
    delete: protectedProcedure
        .input(z.object({ id: z.string().uuid() }))
        .mutation(async ({ input, ctx }) => { 
            const { id: userId } = ctx.user
            const [removedVideo] = await db
                .delete(videosTable)
                .where(and(
                    eq(videosTable.id, input.id),
                    eq(videosTable.userId, userId)
                ))
                .returning()
            
            if (!removedVideo) {
                throw new TRPCError({ code: 'NOT_FOUND', message: 'Video not found for you dont have permisson to delete it' });
            }   

            return removedVideo
        }),
    update: protectedProcedure
        .input(videoUpdateSchema)
        .mutation(async ({ input, ctx }) => { 
            const { id: userId } = ctx.user

            if (!input.id) {
                throw new TRPCError({ code: 'BAD_REQUEST', message: 'Video id is required' });
            }
            
            const [updatedVideo] = await db
                .update(videosTable)
                .set({
                    title: input.title,
                    description: input.description,
                    categoryId: input.categoryId,
                    visibility: input.visibility,
                    updatedAt: new Date(),
                })
                .where(and(
                    eq(videosTable.id, input.id),
                    eq(videosTable.userId, userId)
                ))
                .returning()
            
            if (!updatedVideo) {
                throw new TRPCError({ code: 'NOT_FOUND', message: 'Video not found for you dont have permisson to update it' });
            }

            return updatedVideo
        }),
    create: protectedProcedure.mutation(async ({
        ctx
    }) => {
        const {id: userId} = ctx.user

        const upload = await mux.video.uploads.create({
            cors_origin: '*', //set url production
            new_asset_settings: {
                passthrough: JSON.stringify(userId),
                playback_policy: ['public'],
                input: [
                    {
                        generated_subtitles: [
                            {
                                language_code: 'en',
                                name: 'English',
                            }
                        ]
                    }
                ]
            },
        })

        const [video] = await db
            .insert(videosTable)
            .values({
                userId,
                title: "test1",
                muxStatus: "waiting",
                muxUploadId: upload.id,
            })
            .returning()

        return {
            video: video,
            url: upload.url,
        }
    })
})