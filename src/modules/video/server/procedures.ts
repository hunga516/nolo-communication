import { createTRPCRouter, protectedProcedure, baseProcedure } from "@/trpc/init";
import { db } from "@/db";
import { subscriptionsTable, usersTable, videoReactions, videosTable, videoUpdateSchema, videoViews } from "@/db/schema";
import { mux } from "@/lib/mux";
import { and, desc, eq, getTableColumns, inArray, isNotNull, lt, or } from "drizzle-orm";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { workflow } from "@/lib/workflow";

export const videoRouter = createTRPCRouter({
    generateDescription: protectedProcedure
        .input(z.object({ id: z.string().uuid() }))
        .mutation(async ({ctx, input}) => {
            const { id: userId } = ctx.user
            
            const { workflowRunId } = await workflow.trigger({
                url: `${process.env.UPSTASH_WORKFLOW_URL}/api/videos/workflow/description`,
                body: { userId, videoId: input.id  },
            });
            
            return workflowRunId
        }),
    generateTitle: protectedProcedure
        .input(z.object({ id: z.string().uuid() }))
        .mutation(async ({ctx, input}) => {
            const { id: userId } = ctx.user
            
            const { workflowRunId } = await workflow.trigger({
                url: `${process.env.UPSTASH_WORKFLOW_URL}/api/videos/workflow/title`,
                body: { userId, videoId: input.id  },
            });
            
            return workflowRunId
        }),
    generateThumbnail: protectedProcedure
        .input(z.object({ id: z.string().uuid() }))
        .mutation(async ({ctx, input}) => {
            const { id: userId } = ctx.user
            
            const { workflowRunId } = await workflow.trigger({
                url: `${process.env.UPSTASH_WORKFLOW_URL}/api/videos/workflow/thumbnail`,
                body: { userId, videoId: input.id  },
            });
            
            return workflowRunId
        }),
    restoreThumbnail: protectedProcedure
        .input(z.object({ id: z.string().uuid() }))
        .mutation(async ({ input, ctx }) => {
            const { id: userId } = ctx.user
            
            const [existingVideo] = await db
                .select()
                .from(videosTable)
                .where(and(
                    eq(videosTable.id, input.id),
                    eq(videosTable.userId, userId)
                ))
            
            if (!existingVideo) {
                throw new TRPCError({ code: 'NOT_FOUND', message: 'Video not found for you dont have permisson to update it' });
            }

            if (!existingVideo.muxPlaybackId) {
                throw new TRPCError({ code: 'NOT_FOUND', message: 'muxPlaybackId not found' }); 
            }

            const thumbnailUrl = `https://image.mux.com/${existingVideo.muxPlaybackId}/thumbnail.jpg`

            const [updatedVideo] = await db
                .update(videosTable)
                .set({
                    thumbnailUrl: thumbnailUrl,
                })
                .where(and(
                    eq(videosTable.id, input.id),
                    eq(videosTable.userId, userId)
                ))
                .returning()
            
            return updatedVideo
        }),
    getMany: baseProcedure
        .input(z.object({
            categoryId: z.string().uuid().nullish(),
            cursor: z.object({
                id: z.string().uuid(),
                createdAt: z.date(),
            })
                .nullish(),
            limit: z.number().min(1).max(100),
        }))
        .query(async ({ input, ctx }) => { 
            const { cursor, limit, categoryId } = input
            const { clerkUserId } = ctx

            let userId;

            const [user] = await db
                .select()
                .from(usersTable)
                .where(inArray(usersTable.clerkId, clerkUserId ? [clerkUserId] : []))
            
            if (user) {
                userId = user.id   
            }

            const viewerReactionTemp = db.$with("viewer_reactions").as(
                db
                    .select({
                        type: videoReactions.type,
                        videoId: videoReactions.videoId, //for left join
                    })
                    .from(videoReactions)
                    .where(inArray(videoReactions.userId, userId ? [userId] : []))
            )
            
            const data = await db
                .with(viewerReactionTemp)
                .select({
                    ...getTableColumns(videosTable),
                    user: {
                        ...getTableColumns(usersTable),
                    },
                    viewCounts: db.$count(videoViews, eq(videoViews.videoId, videosTable.id)),
                    likeCounts: db.$count(videoReactions,
                        and(
                            eq(videoReactions.videoId, videosTable.id),
                            eq(videoReactions.type, "like")
                        )),
                    dislikeCounts: db.$count(videoReactions,
                        and(
                            eq(videoReactions.videoId, videosTable.id),
                            eq(videoReactions.type, "dislike")
                        )),
                    viewerReaction: viewerReactionTemp.type,
                })
                .from(videosTable)
                .innerJoin(usersTable, eq(usersTable.id, videosTable.userId))
                .leftJoin(viewerReactionTemp, eq(videosTable.id, viewerReactionTemp.videoId))
                .where(and(
                    eq(videosTable.visibility, "public"),
                    categoryId ? eq(videosTable.categoryId, categoryId) : undefined,
                    cursor
                        ? or(
                            lt(videosTable.createdAt, cursor.createdAt),    
                            and(
                                eq(videosTable.createdAt, cursor.createdAt),
                                lt(videosTable.id, cursor.id)
                            )
                    ) : undefined
                )).orderBy(desc(videosTable.createdAt), desc(videosTable.id))
                .limit(limit + 1)
            
            const hasMore = data.length > limit
            const items = hasMore ? data.slice(0, -1) : data
            const lastItem = items[items.length - 1]
            const nextCursor = lastItem ? {
                id: lastItem.id,
                createdAt: lastItem.createdAt,
            } : null

            return {
                items,
                nextCursor,
            }
        }),
    getOne: baseProcedure
        .input(z.object({ id: z.string().uuid() }))
        .query(async ({ input, ctx }) => {
            const { clerkUserId } = ctx

            let userId;

            const [user] = await db
                .select()
                .from(usersTable)
                .where(inArray(usersTable.clerkId, clerkUserId ? [clerkUserId] : []))
            
            if (user) {
                userId = user.id   
            }
            const viewerReactionTemp = db.$with("viewer_reactions").as(
                db
                    .select({
                        type: videoReactions.type,
                        videoId: videoReactions.videoId, //for left join
                    })
                    .from(videoReactions)
                    .where(inArray(videoReactions.userId, userId ? [userId] : []))
            )

            const viewerSubscriptionTemp = db.$with("viewer_subsriptions").as(
                db
                    .select()
                    .from(subscriptionsTable)
                    .where(inArray(subscriptionsTable.subscriberId, userId ? [userId] : []))
            )
            
            const [existingVdieo] = await db
                .with(viewerReactionTemp, viewerSubscriptionTemp)
                .select({
                    ...getTableColumns(videosTable),
                    user: {
                        ...getTableColumns(usersTable),
                        subscriberCount: db.$count(subscriptionsTable, eq(subscriptionsTable.creatorId, usersTable.id)),
                        isSubscriberSubscribed: isNotNull(viewerSubscriptionTemp.subscriberId).mapWith(Boolean), //check if subscriber is subscribed to creator
                    },
                    viewCounts: db.$count(videoViews, eq(videoViews.videoId, videosTable.id)),
                    likeCounts: db.$count(videoReactions, 
                        and(
                            eq(videoReactions.videoId, videosTable.id),
                            eq(videoReactions.type, "like")
                        )),
                    dislikeCounts: db.$count(videoReactions,
                        and(
                            eq(videoReactions.videoId, videosTable.id),
                            eq(videoReactions.type, "dislike")
                        )),
                    viewerReaction: viewerReactionTemp.type,
                })
                .from(videosTable)
                .innerJoin(usersTable, eq(usersTable.id, videosTable.userId))
                .leftJoin(viewerReactionTemp, eq(videosTable.id, viewerReactionTemp.videoId))
                .leftJoin(viewerSubscriptionTemp, eq(viewerSubscriptionTemp.creatorId,usersTable.id))
                .where(eq(videosTable.id, input.id))
                // .groupBy(
                //     videosTable.id,
                //     usersTable.id,
                //     viewerReactionTemp.type,
                // )

            if (!existingVdieo) {
                throw new TRPCError({ code: 'NOT_FOUND', message: 'Video not found' });
            }

            return existingVdieo
        }),
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
        const { id: userId } = ctx.user

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
                title: "Tiêu đề mặc định",
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