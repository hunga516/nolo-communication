import { relations } from "drizzle-orm";
import {
  integer,
  text,
  pgTable,
  timestamp,
  uniqueIndex,
  varchar,
  pgEnum,
  uuid,
} from "drizzle-orm/pg-core";

import { createInsertSchema, createSelectSchema, createUpdateSchema } from 'drizzle-zod';

export const usersTable = pgTable(
  "users",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    clerkId: varchar({ length: 255 }).unique().notNull(),
    name: varchar({ length: 255 }).notNull(),
    age: integer().notNull(),
    email: varchar({ length: 255 }).notNull().unique(),
    imageUrl: varchar({ length: 255 }).notNull(),
    createdAt: timestamp().defaultNow().notNull(),
    updatedAt: timestamp().defaultNow().notNull(),
  },
  (t) => [uniqueIndex("clerk_id_idx").on(t.clerkId)]
); //index for clerkId

export const categoriesTable = pgTable(
  "categories",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    name: varchar({ length: 255 }).notNull(),
    description: text(),
    createdAt: timestamp().defaultNow().notNull(),
    updatedAt: timestamp().defaultNow().notNull(),
  },
  (t) => [uniqueIndex("name_idx").on(t.name)]
);

export const videoVisibility = pgEnum("video_visibility", [
  "public",
  "private",
  "unlisted",
]);

export const videosTable = pgTable("videos", {
  id: uuid("id").primaryKey().defaultRandom(),  
  title: varchar({ length: 255 }).notNull(),
  description: text("description"),
  muxStatus: text("mux_status"),
  muxAssetId: text("mux_asset_id").unique(),
  muxUploadId: text("mux_upload_id").unique(),
  muxTrackId: text("mux_track_id").unique(),
  muxTrackStatus: text("mux_track_status"),
  muxPlaybackId: text("mux_playback_id").unique(),
  thumbnailUrl: text("thumbnail_url"),
  previewUrl: text("preview_url"),
  duration: integer("duration"),
  visibility: videoVisibility("visibility").default("private").notNull(),
  userId: uuid("user_id")
    .references(() => usersTable.id, {
      onDelete: "cascade",
    })
    .notNull(),
  categoryId: uuid("category_id").references(() => categoriesTable.id, {
    onDelete: "set null",
  }),
  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp().defaultNow().notNull(),
});

export const videoInsertSchema = createInsertSchema(videosTable)
export const videoUpdateSchema = createUpdateSchema(videosTable)
export const videoSelectSchema = createSelectSchema(videosTable)

export const userRelations = relations(usersTable, ({ many }) => ({
  videos: many(videosTable),
}));

export const categoryRelations = relations(categoriesTable, ({ many }) => ({
  videos: many(videosTable),
}));

export const videoRelations = relations(videosTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [videosTable.userId],
    references: [usersTable.id],
  }),
  category: one(categoriesTable, {
    fields: [videosTable.categoryId],
    references: [categoriesTable.id],
  }),
}));
