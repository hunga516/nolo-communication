import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { db } from "@/db";
import { videosTable, categoriesTable, videoViews } from "@/db/schema";
import { z } from "zod";
import { and, or, eq, lt, desc, sql } from "drizzle-orm";
import { TRPCError } from "@trpc/server";

export const studioRouter = createTRPCRouter({
  getOne: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const { id: userId } = ctx.user;
      const { id } = input;

      const [video] = await db  
        .select()
        .from(videosTable)
        .where(
          and(
            eq(videosTable.userId, userId),
            eq(videosTable.id, id),
          ))
      
      if (!video) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Video not found" });
      }

      return video;
     }),
  getMany: protectedProcedure
    .input(
      z.object({
        cursor: z
          .object({
            id: z.string(),
            updatedAt: z.date(),
          })
          .nullish(),
        limit: z.number().min(1).max(100),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { cursor, limit } = input;
      const { id: userId } = ctx.user;

      const data = await db
        .select()
        .from(videosTable)
        .where(
          and(
            eq(videosTable.userId, userId),
            cursor
              ? or(
                  lt(videosTable.updatedAt, cursor.updatedAt),
                  and(
                    eq(videosTable.updatedAt, cursor.updatedAt),
                    lt(videosTable.id, cursor.id),
                  ),
                )
              : undefined,
          ),
        )
        .orderBy(desc(videosTable.updatedAt), desc(videosTable.id))
        .limit(limit + 1);

      const hasMore = data.length > limit;

      const items = hasMore ? data.slice(0, -1) : data;

      const lastIem = items[items.length - 1];
      const nextCursor = hasMore
        ? {
            id: lastIem.id,
            updatedAt: lastIem.updatedAt,
          }
        : null;

      return {
        items,
        nextCursor,
      };
    }),
  statistics: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const userId = input.id;
      // Đếm tổng số video của user này
      const [{ count: totalVideos } = { count: 0 }] = await db
        .select({ count: sql`count(*)::int` })
        .from(videosTable)
        .where(eq(videosTable.userId, userId));
      return {
        summary: {
          totalVideos: Number(totalVideos)
        }
      };
    }),
});
