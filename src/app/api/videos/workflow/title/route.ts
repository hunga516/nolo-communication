import { db } from "@/db"
import { videosTable } from "@/db/schema"
import { serve } from "@upstash/workflow/nextjs"
import { and, eq } from "drizzle-orm"

interface InputType {
  userId: string
  videoId: string
}

const TITLE_PROMT = "Bạn hãy trả lời lại người dùng 1 cách ngắn gọn, tối ưu quá cho seo và focus người dùng vào mô tả. Hãy trả lời một cách ngắn gọn súc tích và tiếng việt nhé. Bạn chỉ nên trả lời lại tôi trong khoảng từ 200 từ trở xuống."

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

    const transcript = await context.run("get-transcript", async () => {
      const trackUrl = `https://stream.mux.com/${existingVideo.muxPlaybackId}/text/${existingVideo.muxTrackId}.txt`
      const response = await fetch(trackUrl)
      const text = response.text()

      if (!text) {
        throw new Error('Bad request')
      }

      return text
    })

    const { body } = await context.api.openai.call(
      "generate-description",
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
              content: transcript
            }
          ],
        },
      }
    );

    const newDescription = body.choices[0].message.content

    await context.run("update-video", async () => {
      await db
        .update(videosTable)
        .set({
          description: newDescription || existingVideo.description
        })
        .where(and(
          eq(videosTable.id, existingVideo.id),
          eq(videosTable.userId, existingVideo.userId)
        ))
    })
  }
)