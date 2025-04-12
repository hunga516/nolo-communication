import Image from "next/image"

interface VideoThumbnailProps {
    imageUrl?: string | null
    title: string
    previewUrl?: string | null
}

export const VideoThumbnail = ({ imageUrl, previewUrl }: VideoThumbnailProps) => {
    return (
        <div className="relative group">
            {/* For wrapper */}
            <div className="relative w-full overflow-hidden rounded-lg aspect-video">
                <Image
                    src={imageUrl ?? "/img/error-thumbnail.png"}
                    alt="thumbnail"
                    fill
                    className="size-full group-hover:opacity-0" />
                <Image
                    src={previewUrl ?? "/img/error-thumbnail.png"}
                    alt="thumbnail"
                    fill
                    className="size-full opacity-0 group-hover:opacity-100" />
            </div>

            {/* Video detail wrapper */}
            <div></div>
        </div>
    )

}
