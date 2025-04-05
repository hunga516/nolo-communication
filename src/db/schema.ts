import { relations } from "drizzle-orm"
import {integer,text, pgTable, timestamp, uniqueIndex, varchar} from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    clerkId: varchar({length: 255}).unique().notNull(),
    name: varchar({ length: 255 }).notNull(),
    age: integer().notNull(),
    email: varchar({ length: 255 }).notNull().unique(),
    imageUrl: varchar({ length: 255 }).notNull(),
    createdAt: timestamp().defaultNow().notNull(),
    updatedAt: timestamp().defaultNow().notNull(),
}, (t) => [uniqueIndex("clerk_id_idx").on(t.clerkId)]); //index for clerkId

export const categoriesTable = pgTable("categories", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 255 }).notNull(),
    description: text(),
    createdAt: timestamp().defaultNow().notNull(),
    updatedAt: timestamp().defaultNow().notNull(),
}, (t) => [uniqueIndex("name_idx").on(t.name)]);

export const videosTable = pgTable("videos", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    title: varchar({ length: 255 }).notNull(),
    description: text(),
    userId: integer("user_id").references(() => usersTable.id, {
        onDelete: "cascade",
    }).notNull(),
    createdAt: timestamp().defaultNow().notNull(),
    updatedAt: timestamp().defaultNow().notNull(),
})

export const videoRelations = relations(videosTable, ({ one }) => ({
    user: one(usersTable, {
        fields: [videosTable.userId],
        references: [usersTable.id],
    })
}))