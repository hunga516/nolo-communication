import {initTRPC, TRPCError} from '@trpc/server';
import { cache } from 'react';
import superjson from 'superjson'
import {auth} from "@clerk/nextjs/server";
import {db} from "@/db";
import {usersTable} from "@/db/schema";
import {eq} from "drizzle-orm";

export const createTRPCContext = cache(async () => {
  const { userId } = await auth()

    return { clerkUserId: userId }
});

export type Context = Awaited<ReturnType<typeof createTRPCContext>>
// Avoid exporting the entire t-object
// since it's not very descriptive.
// For instance, the use of a t variable
// is common in i18n libraries.
const t = initTRPC.context<Context>().create({
    /**
     * @see https://trpc.io/docs/server/data-transformers
     */
    transformer: superjson,
});
// Base router and procedure helpers
export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
export const baseProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(async function isAuthed(opts){
    const {ctx} = opts

    if (!ctx.clerkUserId){
        throw new TRPCError({ code: "UNAUTHORIZED"})
    }

    const data = await db
        .select()
        .from(usersTable)
        .where(eq(usersTable.clerkId, ctx.clerkUserId))
        .limit(1)

    if(!data[0]){
        throw new TRPCError({ code: "UNAUTHORIZED" })
    }

    return opts.next({
        ctx: {
            ...ctx,
            user: data[0],
        }
    })
})