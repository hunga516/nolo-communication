import { useMemo } from "react";
import { VideoGetOneOutput } from "../../types";
import { VideoDescription } from "./video-description";
import { VideoMenu } from "./video-menu";
import { VideoOwner } from "./video-owner";
import { VideoReactions } from "./video-reactions";
import { format, formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";

interface VideoHeaderProps {
    video: VideoGetOneOutput
}

export const VideoHeader = ({ video }: VideoHeaderProps) => {
    const compactViews = useMemo(() => {
        return Intl.NumberFormat("vi-VN", {
            notation: "compact",
        }).format(122)
    }, [])

    const expandedViews = useMemo(() => {
        return Intl.NumberFormat("vi-VN", {
            notation: "standard",
        }).format(122)
    }, [])

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
                <VideoOwner user={video.user} videoId={video.id} />
                <div className="flex overflow-x-auto sm:miw-w-[calc(50%-6px)] sm:justify-end sm:overflow-visible pb-2 -mb-2 sm:pb-0 gap-2">
                    <VideoReactions />
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