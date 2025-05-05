import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { ThumbsDownIcon, ThumbsUpIcon } from "lucide-react"
import { VideoGetOneOutput } from "../../types"
import { useClerk } from "@clerk/nextjs"
import { trpc } from "@/trpc/client"
import { toast } from "sonner"

interface VideoReactionsProps {
    videoId: string,
    likeCount: number,
    dislikeCount: number,
    viewerReaction: VideoGetOneOutput["viewerReaction"]
}

export const VideoReactions = ({
    videoId,
    likeCount,
    dislikeCount,
    viewerReaction,
}: VideoReactionsProps) => {
    const clerk = useClerk()
    const utils = trpc.useUtils()

    const like = trpc.videoReactions.like.useMutation({
        onSuccess: () => {
            utils.videos.getOne.invalidate({ id: videoId })
        },
        onError: (error) => {
            toast.error("Có lỗi xảy ra", { description: "Vui lòng thử lại sau" })
            if (error.data?.code === "UNAUTHORIZED") {
                clerk.openSignIn()
            }
        }
    })
    const dislike = trpc.videoReactions.dislike.useMutation({
        onSuccess: () => {
            utils.videos.getOne.invalidate({ id: videoId })
        },
        onError: (error) => {
            toast.error("Có lỗi xảy ra", { description: "Vui lòng thử lại sau" })
            if (error.data?.code === "UNAUTHORIZED") {
                clerk.openSignIn()
            }
        }
    })

    return (
        <div className="flex items-center gap-2 flex-none">
            <Button
                onClick={() => like.mutate({ videoId })}
                disabled={like.isPending || dislike.isPending}
                className="gap-2 pr-4"
                variant={viewerReaction === "like" ? "default" : "secondary"}
            >
                <ThumbsUpIcon className="size-5" />
                {likeCount}
            </Button>
            <Separator orientation="vertical" className="h-7" />
            <Button
                onClick={() => dislike.mutate({ videoId })}
                disabled={like.isPending || dislike.isPending}
                className="pl-3"
                variant={viewerReaction === "dislike" ? "default" : "secondary"}
            >
                <ThumbsDownIcon className="size-5" />
                {dislikeCount}
            </Button>
        </div>
    )
}