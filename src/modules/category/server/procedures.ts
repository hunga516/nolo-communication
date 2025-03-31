import {baseProcedure, createTRPCRouter} from "@/trpc/init";
import {db} from "@/db";
import {categoriesTable} from "@/db/schema";
import {TRPCError} from "@trpc/server";


export const categoriesRouter = createTRPCRouter({
    getMany: baseProcedure.query(async () => {
        throw new TRPCError({code: "BAD_REQUEST"})

        const data = await db.select().from(categoriesTable)
        return data
    })
})