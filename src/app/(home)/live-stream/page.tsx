import { readAllVideos } from "@/app/api/videos/videos.api"
import CreateLiveStream from "@/components/video/create-live-stream"

import { VideoThumbnail } from "@/components/video/video-thumbnail"
import Link from "next/link"



const Page = async () => {
    const { videos } = await readAllVideos()

    return (
        <div className="px-4">
            <div>
                <CreateLiveStream />
            </div>
            <h1 className="text-xl font-bold mt-8">
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