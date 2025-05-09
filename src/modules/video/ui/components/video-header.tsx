import { useMemo } from "react";
import { VideoGetOneOutput } from "../../types";
import { VideoDescription } from "./video-description";
import { VideoMenu } from "./video-menu";
import { VideoOwner } from "./video-owner";
import { VideoReactions } from "./video-reactions";
import { format, formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";
import { Skeleton } from "@/components/ui/skeleton";

interface VideoHeaderProps {
    video: VideoGetOneOutput
}

export const VideoHeaderSkeleton = () => {
    return (
        <div className="flex flex-col gap-4 mt-4">
            <div className="flex flex-col gap-2">
                <Skeleton className="h-6 w-4/5 md:w-2/5" />
            </div>
            <div className="flex itemc justify-between w-full">
                <div className="flex items-center gap-3 w-[70%]">
                    <Skeleton className="w-10 h-10 rounded-full shrink-0" />
                    <div className="flex flex-col gap-2 w-full">
                        <Skeleton className="h-5 w-4/5 md:w-2/6" />
                        <Skeleton className="h-5 w-3/5 md:w-1/5" />
                    </div>
                </div>
                <Skeleton className="h-9 w-2/6 md:h-1/6 rounded-full" />
            </div>
            <div className="h-[120px] w-full">
            </div>
        </div>
    )
}

export const VideoHeader = ({ video }: VideoHeaderProps) => {
    const compactViews = useMemo(() => {
        return Intl.NumberFormat("vi-VN", {
            notation: "compact",
        }).format(video.viewCounts)
    }, [video.viewCounts])

    const expandedViews = useMemo(() => {
        return Intl.NumberFormat("vi-VN", {
            notation: "standard",
        }).format(video.viewCounts)
    }, [video.viewCounts])

    const compactDate = useMemo(() => {
        return formatDistanceToNow(video.createdAt, {
            addSuffix: true,
            locale: vi,
        });
    }, [video.createdAt]);

    const expandedDate = useMemo(() => {
        return format(video.createdAt, "dd/MM/yyyy")
    }, [video.createdAt])
    return (
        <div className="flex flex-col gap-4 mt-4">
            <h1 className="text-xl font-semibold">{video.title}</h1>
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <VideoOwner subscriberCount={video.user.subscriberCount} user={video.user} videoId={video.id} />
                <div className="flex overflow-x-auto sm:miw-w-[calc(50%-6px)] sm:justify-end sm:overflow-visible pb-2 -mb-2 sm:pb-0 gap-2">
                    <VideoReactions
                        videoId={video.id}
                        likeCount={video.likeCounts}
                        dislikeCount={video.dislikeCounts}
                        viewerReaction={video.viewerReaction}
                    />
                    <VideoMenu videoId={video.id} variant="secondary" />
                </div>
            </div>
            <VideoDescription
                description={video.description}
                compactViews={compactViews}
                expandedViews={expandedViews}
                compactDate={compactDate}
                expandedDate={expandedDate}
            />
        </div>
    )
}