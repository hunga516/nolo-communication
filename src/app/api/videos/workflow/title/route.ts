import { db } from "@/db"
import { videosTable } from "@/db/schema"
import { serve } from "@upstash/workflow/nextjs"
import { and, eq } from "drizzle-orm"

interface InputType { 
  userId: string
  videoId: string
}

const TITLE_PROMT = "Bạn hãy trả lời lại người dùng 1 cách ngắn gọn, tối ưu quá cho seo và focus người dùng vào tiêu đề. Hãy trả lời một cách ngắn gọn súc tích và tiếng việt nhé"

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

    const { body } = await context.api.openai.call(
      "generate-title",
      {
        baseURL: "https://api.deepseek.com",
        token: process.env.DEEPSEEK_API_KEY!,
        operation: "chat.completions.create",
        body: {
          model: "deepseek-chat",
          messages: [
            {
              role: "system",
              content: TITLE_PROMT,
            },
            {
              role: "user",
              content: "Trong clip nay toi se huong dan ban nghe tai nghe sony xm5 mot cach hay nhat, toi se huong dan ban chi tiet ve cac dai am thanh va EQ cho tai nghe sony wh-xm5"
            }
          ],
        },
      }
    );

    // get text:
    console.log(body)

    await context.run("update-video", async () => {
      await db
        .update(videosTable)
        .set({
          title: "Day la noi dung duoc tao background"
        })
        .where(and(
          eq(videosTable.id, existingVideo.id),
          eq(videosTable.userId, existingVideo.userId)
        ))

    })
  }
)