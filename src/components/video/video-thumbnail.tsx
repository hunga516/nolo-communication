"use client"

import { useState } from "react"
import { formatDuration } from "@/lib/utils"
import Image from "next/image"
import { THUMBNAIL_FALLBACK } from "@/constants/assets"

interface VideoThumbnailProps {
    imageUrl?: string | null
    title: string
    duration?: number | null
    previewUrl?: string | null
}

export const VideoThumbnail = ({
    imageUrl,
    previewUrl,
    duration,
    title
}: VideoThumbnailProps) => {
    const [mainSrc, setMainSrc] = useState(imageUrl ?? THUMBNAIL_FALLBACK);
    const [previewSrc, setPreviewSrc] = useState(previewUrl ?? THUMBNAIL_FALLBACK);

    return (
        <div className="relative group">
            <div className="relative w-full overflow-hidden rounded-lg aspect-video">
                <Image
                    src={mainSrc}
                    alt={title}
                    fill
                    unoptimized
                    className="size-full group-hover:opacity-0 object-cover bg-black"
                    onError={() => setMainSrc("/img/only-audio-thumbnail.png")}
                />
                <Image
                    src={previewSrc}
                    alt={title}
                    fill
                    unoptimized
                    className="size-full opacity-0 group-hover:opacity-100 object-cover bg-black"
                    onError={() => setPreviewSrc("/img/only-audio-thumbnail.png")}
                />

                <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                    {duration ? formatDuration(duration) : "0:00"}
                </div>
            </div>
        </div>
    )
}
