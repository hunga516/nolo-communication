import {createTRPCRouter, protectedProcedure} from "@/trpc/init";
import {db} from "@/db";
import {videosTable} from "@/db/schema";

export const studioRouter = createTRPCRouter({
    getMany: protectedProcedure.query(async () => {
        const data = await db
            .select()
            .from(videosTable)

        return data
    })
})