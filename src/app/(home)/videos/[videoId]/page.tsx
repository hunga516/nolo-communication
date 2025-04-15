import VideoView from "@/modules/video/ui/views/video-view";
import { HydrateClient, trpc } from "@/trpc/server";

interface VideoPageProps {
    params: {
        videoId: string;
    };
}

const Page = async ({ params }: VideoPageProps) => {
    const { videoId } = await params;
    void trpc.videos.getOne.prefetch({ id: videoId });

    return (
        <HydrateClient>
            <VideoView videoId={videoId} />
        </HydrateClient>
    )
}

export default Page;