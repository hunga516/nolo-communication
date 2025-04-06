import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { db } from "@/db";
import { videosTable } from "@/db/schema";
import { z } from "zod";
import { and, or, eq, lt, desc } from "drizzle-orm";

export const studioRouter = createTRPCRouter({
  getMany: protectedProcedure
    .input(
      z.object({
        cursor: z
          .object({
            id: z.number(),
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
});
