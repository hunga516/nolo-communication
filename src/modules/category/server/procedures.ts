import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { db } from "@/db";
import { categoriesTable } from "@/db/schema";

export const categoriesRouter = createTRPCRouter({
  getMany: baseProcedure.query(async () => {
    const data = await db.select().from(categoriesTable);
    return data;
  }),
});
