import { db } from "@/db";
import { subscriptionsTable } from "@/db/schema";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { and, eq } from "drizzle-orm";
import { z } from "zod";

export const subscriptionRouter = createTRPCRouter({
    create: protectedProcedure
        .input(z.object({ userId: z.string().uuid() }))
        .mutation(async ({ ctx, input }) => {
            const { userId } = input

            if(userId === ctx.user.id){
                throw new TRPCError({code: "BAD_REQUEST"})
            }

            const [newSubsription] = await db
                .insert(subscriptionsTable)
                .values({subscriberId: ctx.user.id, creatorId: userId})
                .returning()
            
            return newSubsription
        }),
})