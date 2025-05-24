import { readAllVideos } from "@/app/api/videos/videos.api"
import { VideoThumbnail } from "@/modules/video/ui/components/video-thumbnail"
import Link from "next/link"



const Page = async () => {
    const { videos } = await readAllVideos()

    return (
        <div className="px-4">
            <h1 className="text-xl font-bold">
                Đang trực tuyến
            </h1>

            <div className="grid grid-cols-4 gap-4 mt-2">
                {videos.map((video, index) => (
                    <Link key={index} href={`/live-stream/${video._id}`}>
                        <VideoThumbnail
                            imageUrl={video.muxThumbnailUrl}
                            previewUrl={video.muxPreviewUrl}
                            title={video.name}
                        />
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default Page