import { db } from "@/db"
import { videosTable } from "@/db/schema"
import { serve } from "@upstash/workflow/nextjs"
import { and, eq } from "drizzle-orm"
import OpenAI from "openai";



interface InputType {
  userId: string
  videoId: string
}


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

    await context.run("generate-thumbnail", async () => {
      const openai = new OpenAI();

     const result = await openai.images.generate({
          model: "dall-e-2",
          prompt: "a white siamese cat",
          response_format: "url",
          size: "1024x1024",
      });

      if (!result.data || result.data.length === 0) {
        throw new Error("OpenAI không trả về data");
      }

      // Lấy URL của ảnh
      const imageUrl = result.data[0].url;
      console.log("Image URL:", imageUrl);
    })

    await context.run("update-video", async () => {
      await db
        .update(videosTable)
        .set({
          title: existingVideo.title
        })
        .where(and(
          eq(videosTable.id, existingVideo.id),
          eq(videosTable.userId, existingVideo.userId)
        ))
    })
  }
)