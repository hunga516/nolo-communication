import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { ThumbsDownIcon, ThumbsUpIcon } from "lucide-react"

export const VideoReactions = () => {
    const viewerReaction = "like"
    return (
        <div className="flex items-center gap-2 flex-none">
            <Button
                className="gap-2 pr-4"
            >
                <ThumbsUpIcon className={cn(
                    "size-5",
                    viewerReaction === "like" && "fill-black"
                )}
                />
                {1}
            </Button>
            <Separator orientation="vertical" className="h-7" />
            <Button
                className="pl-3"
                variant="secondary"
            >
                <ThumbsDownIcon className={cn(
                    "size-5",
                    viewerReaction !== "like" && "fill-black"
                )}
                />
                {1}
            </Button>
        </div>
    )
}