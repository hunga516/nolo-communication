import { formatDuration } from "@/lib/utils"
import Image from "next/image"

interface VideoThumbnailProps {
    imageUrl?: string | null
    title: string
    duration: number | null
    previewUrl?: string | null
}

export const VideoThumbnail = ({
    imageUrl,
    previewUrl,
    duration,
    title
}: VideoThumbnailProps) => {
    return (
        <div className="relative group">
            {/* For wrapper */}
            <div className="relative w-full overflow-hidden rounded-lg aspect-video">
                <Image
                    src={imageUrl ?? "/img/error-thumbnail.png"}
                    alt={title}
                    fill
                    unoptimized={!!imageUrl}
                    className="size-full group-hover:opacity-0" />
                <Image
                    src={previewUrl ?? "/img/error-thumbnail.png"}
                    alt={title}
                    fill
                    unoptimized={!!previewUrl}
                    className="size-full opacity-0 group-hover:opacity-100" />

                {/* Duration video */}
                <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                    {duration ? formatDuration(duration) : "0:00"}
                </div>
            </div>

            {/* Video detail wrapper */}
            <div></div>
        </div>
    )

}
