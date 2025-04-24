import { db } from "@/db"
import { videosTable } from "@/db/schema"
import { serve } from "@upstash/workflow/nextjs"
import { and, eq } from "drizzle-orm"
import fs from "fs";
import OpenAI from "openai";

const openai = new OpenAI();


interface InputType {
  userId: string
  videoId: string
}

const TITLE_PROMT = "Tạo ra hình ảnh cho tiêu đề của tôi nhé, hãy tạo sao cho đẹp và có hiệu ứng 3d nội bật theo nội dung tôi sẽ gửi nhé"

export const { POST } = serve(
  async (context) => {
    const input = context.requestPayload as InputType
    const { userId, videoId } = input

    const existingVideo = await context.run("get-video", async () => {
      const [existingVideo] = await db
        .select()
        .from(videosTable)
        .where(and(
          eq(videosTable.id, videoId),
          eq(videosTable.userId, userId)
        ))

      if (!existingVideo) {
        throw new Error("Video not found")
      }
      return existingVideo
    })

    // const thumbnailUrl = await context.run("get-thumbnail", async () => {
    //   const thumbnailUrl = await openai.audio.transcriptions.create({
    //     file: fs.createReadStream("/Users/lengocloc/Documents/cloud-cache/vi-frontend/public/music/justin.mp4"),
    //     model: "gpt-4o-transcribe",
    //   });

    //   return thumbnailUrl
    // })

    const { body } = await context.api.openai.call(
      "generate-thumbnail",
      {
        token: process.env.OPENAI_API_KEY!,
        operation: "chat.completions.create",
        body: {
          model: "gpt-4o",
          messages: [
            {
              role: "system",
              content: TITLE_PROMT,
            },
            {
              role: "user",
              content: existingVideo.title
            }
          ],
        },
      }
    );

    const newTitle = body.choices[0].message.content

    await context.run("update-video", async () => {
      await db
        .update(videosTable)
        .set({
          title: newTitle || existingVideo.title
        })
        .where(and(
          eq(videosTable.id, existingVideo.id),
          eq(videosTable.userId, existingVideo.userId)
        ))
    })
  }
)