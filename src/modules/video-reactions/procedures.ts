import { db } from "@/db";
import { videoReactions } from "@/db/schema";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { and, eq } from "drizzle-orm";
import { z } from "zod";

export const videoReactionsRouter = createTRPCRouter({
    like: protectedProcedure
        .input(z.object({ videoId: z.string().uuid() }))
        .mutation(async ({ ctx, input }) => {
            const { videoId } = input
            const { id: userId } = ctx.user
            
            const [existingVideoReactionLike] = await db
                .select()
                .from(videoReactions)
                .where(and(
                    eq(videoReactions.userId, userId),
                    eq(videoReactions.videoId, videoId),
                    eq(videoReactions.type, "like")
                ))
            
            if (existingVideoReactionLike) {
               const [deletedVideoReaction] = await db
                    .delete(videoReactions)
                    .where(and(
                        eq(videoReactions.userId, userId),
                        eq(videoReactions.videoId, videoId),
                    ))
                    .returning()
                return deletedVideoReaction
            }

            const [createdVideoReactions] = await db
                .insert(videoReactions)
                .values({ userId, videoId, type: "like" })
                .onConflictDoUpdate({
                    target: [
                        videoReactions.userId,
                        videoReactions.videoId,
                    ],
                    set: {
                        type: "like",
                        updatedAt: new Date()
                    }
                })
                .returning()
            
            return createdVideoReactions
        }),
    dislike: protectedProcedure
        .input(z.object({ videoId: z.string().uuid() }))
        .mutation(async ({ ctx, input }) => {
            const { videoId } = input
            const { id: userId } = ctx.user
            
            const [existingVideoReactionDislike] = await db
                .select()
                .from(videoReactions)
                .where(and(
                    eq(videoReactions.userId, userId),
                    eq(videoReactions.videoId, videoId),
                    eq(videoReactions.type, "dislike")
                ))
            
            if (existingVideoReactionDislike) {
               const [deletedVideoReaction] = await db
                    .delete(videoReactions)
                    .where(and(
                        eq(videoReactions.userId, userId),
                        eq(videoReactions.videoId, videoId),
                    ))
                    .returning()
                return deletedVideoReaction
            }

            const [createdVideoReactions] = await db
                .insert(videoReactions)
                .values({ userId, videoId, type: "dislike" })
                .onConflictDoUpdate({
                    target: [
                        videoReactions.userId,
                        videoReactions.videoId,
                    ],
                    set: {
                        type: "dislike",
                        updatedAt: new Date()
                    }
                })
                .returning()
            
            return createdVideoReactions
        })
})