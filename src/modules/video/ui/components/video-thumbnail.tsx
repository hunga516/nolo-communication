import Image from "next/image"

export const VideoThumbnail = () => {
    return (
        <div className="relative">
            {/* For wrapper */}
            <div className="relative w-full overflow-hidden rounded-lg aspect-video">
                <Image src="/img/error-thumbnail.png" alt="thumbnail" fill className="size-full" />
            </div>

            {/* Video detail wrapper */}
            <div></div>
        </div>
    )

}
