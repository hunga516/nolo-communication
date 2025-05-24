import { readAllVideos } from "@/app/api/videos/videos.api"
import { VideoThumbnail } from "@/modules/video/ui/components/video-thumbnail"



const Page = async () => {
    const { message, videos } = await readAllVideos()

    return (
        <div>
            <h1 className="text-xl font-bold">
                Đang trực tuyến
            </h1>

            <div className="grid grid-cols-4 gap-4">
                {videos.map((video, index) => (
                    <VideoThumbnail
                        key={index}
                        imageUrl={video.muxThumbnailUrl}
                        previewUrl={video.muxPreviewUrl}
                        title={video.name}
                    />
                ))}
            </div>
        </div>
    )
}

export default Page