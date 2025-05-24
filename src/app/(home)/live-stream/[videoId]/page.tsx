import { readUserByClerkId } from "@/app/api/users/users.api"
import { readVideoById } from "@/app/api/videos/videos.api"
import { VideoOwner } from "@/modules/video/ui/components/video-owner"
import VideoPlayer from "@/modules/video/ui/components/video-player"


interface PageProps {
    params: Promise<{ videoId: string }>
}

const Page = async ({ params }: PageProps) => {
    const { videoId } = await params

    const { video } = await readVideoById(videoId)
    console.log(video);

    const { user } = await readUserByClerkId(video.clerkId)
    console.log(user);


    return (
        <div className="px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <div className="sm:col-span-2">
                <VideoPlayer
                    playbackId={video.muxPlayBackId}
                    autoPLay
                    thumbnailUrl={video.muxThumbnailUrl}
                />
                <div className="mt-2">
                    <h2 className="text-lg text-black/80 font-semibold">
                        {video.name}
                    </h2>
                    <div>
                        <VideoOwner
                            user={user}
                        />
                    </div>
                </div>
            </div>
            <div>
                test doanh muc
            </div>
        </div>
    )
}

export default Page;