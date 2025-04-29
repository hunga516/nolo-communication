import { db } from "@/db";
import { commentsTable, usersTable } from "@/db/schema";
import { baseProcedure, createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { eq, getTableColumns } from "drizzle-orm";
import { z } from "zod";

export const commentsRouter = createTRPCRouter({
    create: protectedProcedure
        .input(z.object({
            videoId: z.string().uuid(),
            value: z.string()
        }))
        .mutation(async ({ ctx, input }) => {
            const { videoId, value } = input
            const { id: userId } = ctx.user
            
            const [createdVideoComment] = await db
                .insert(commentsTable)
                .values({ userId, videoId, value })
                .returning()
            
            return createdVideoComment
        }),
    getMany: baseProcedure
        .input(z.object({ videoId: z.string().uuid() }))
        .query(async ({input}) => {
            const { videoId } = input
            
            const data = await db
                .select({
                    ...getTableColumns(commentsTable),
                    user: getTableColumns(usersTable)
                })
                .from(commentsTable)
                .where(eq(commentsTable.videoId, videoId))
                .innerJoin(usersTable, eq(commentsTable.userId, usersTable.id))
            
            return data
        })
})