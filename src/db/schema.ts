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
  primaryKey,
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

export const subscriptionsTable = pgTable("subscriptions", {
  creatorId: uuid("creator_id").references(() => usersTable.id, { onDelete: "cascade" }).notNull(),
  subscriberId: uuid("subscriber_id").references(() => usersTable.id, { onDelete: "cascade" }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
}, (t) => [
  primaryKey({
    name: "subscriptions_pk",
    columns: [t.creatorId, t.subscriberId],
  })
])

export const subscriptionsRelations = relations(subscriptionsTable, ({ one }) => ({
  creator: one(usersTable, {
    fields: [subscriptionsTable.creatorId],
    references: [usersTable.id],
    relationName: "creator",
  }),
  subscriber: one(usersTable, {
    fields: [subscriptionsTable.subscriberId],
    references: [usersTable.id],
    relationName: "subscriber",
  })
}))

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

export const usersRelations = relations(usersTable, ({ many }) => ({
  videos: many(videosTable),
  videoViews: many(videoViews),
  videoReactions: many(videoReactions),
  comments: many(commentsTable),
  subscriptions: many(subscriptionsTable, {
    relationName: "creator",
  }),
  subscribers: many(subscriptionsTable, {
    relationName: "subscriber",
  })
}));

export const videoViews = pgTable("video_views", {
  userId: uuid("user_id").references(() => usersTable.id, { onDelete: "cascade" }).notNull(),
  videoId: uuid("video_id").references(() => videosTable.id, { onDelete: "cascade" }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
}, (t) => [
  primaryKey({
    name: "video_views_pk",
    columns: [t.userId, t.videoId],
  })
])

export const videoViewsRelations = relations(videoViews, ({ one }) => ({
  users: one(usersTable, {
    fields: [videoViews.userId],
    references: [usersTable.id]
  }),
  videos: one(videosTable, {
    fields: [videoViews.videoId],
    references: [videosTable.id]
  })
}))

export const videoViewsInsertSchema = createInsertSchema(videoViews)
export const videoViewsUpdateSchema = createUpdateSchema(videoViews)
export const videoViewsSelectSchema = createSelectSchema(videoViews)

export const reactionType = pgEnum("reaction_type", ["like", "dislike"])

export const videoReactions = pgTable("video_reactions", {
  userId: uuid("user_id").references(() => usersTable.id, { onDelete: "cascade" }).notNull(),
  videoId: uuid("video_id").references(() => videosTable.id, { onDelete: "cascade" }).notNull(),
  type: reactionType("type").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
}, (t) => [
  primaryKey({
    name: "video_reactions_pk",
    columns: [t.userId, t.videoId],
  })
])

export const videoReactionRelations = relations(videoReactions, ({ one }) => ({
  users: one(usersTable, { //should be one => user
    fields: [videoReactions.userId],
    references: [usersTable.id]
  }),
  videos: one(videosTable, { //should be one => video
    fields: [videoReactions.videoId],
    references: [videosTable.id]
  })
}))

export const videoReactionsInsertSchema = createInsertSchema(videoReactions)
export const videoReactionsUpdateSchema = createUpdateSchema(videoReactions)
export const videoReactionsSelectSchema = createSelectSchema(videoReactions)


export const categoryRelations = relations(categoriesTable, ({ many }) => ({
  videos: many(videosTable),
}));

export const videoRelations = relations(videosTable, ({ one, many }) => ({
  users: one(usersTable, {
    fields: [videosTable.userId],
    references: [usersTable.id],
  }),
  category: one(categoriesTable, {
    fields: [videosTable.categoryId],
    references: [categoriesTable.id],
  }),
  views: many(videoViews),
  reactions: many(videoReactions),
  comments: many(commentsTable),
}));

export const commentsTable = pgTable("comments", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").references(() => usersTable.id, { onDelete: "cascade" }).notNull(),
  videoId: uuid("video_id").references(() => videosTable.id, { onDelete: "cascade" }).notNull(),
  value: text("value").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
})

export const commentRelations = relations(commentsTable, ({ one }) => ({
  videos: one(videosTable, {
    fields: [commentsTable.videoId],
    references: [videosTable.id]
  }),
  users: one(usersTable, {
      fields: [commentsTable.userId],
      references: [usersTable.id]
  })
}))  

export const commentInsertSchema = createInsertSchema(commentsTable)
export const commentUpdateSchema = createUpdateSchema(commentsTable)
export const commentSelectSchema = createSelectSchema(commentsTable)