"use client";

import { cn } from "@/lib/utils";
import { trpc } from "@/trpc/client";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import VideoPlayer, { VideoPlayerSkeleton } from "../components/video-player";
import { VideoBanner } from "../components/video-banner";
import { VideoHeader, VideoHeaderSkeleton } from "../components/video-header";
import { useAuth } from "@clerk/nextjs";

interface VideoSectionProps {
    videoId: string;
}

export const VideoSection = ({ videoId }: VideoSectionProps) => {
    return (
        <Suspense fallback={<VideoSectionSkeleton />}>
            <ErrorBoundary fallback={<p>error</p>}>
                <VideoSectionSuspense videoId={videoId} />
            </ErrorBoundary>
        </Suspense>
    )
}

const VideoSectionSkeleton = () => {
    return (
        <>
            <VideoPlayerSkeleton />
            <VideoHeaderSkeleton />
        </>
    )
}

const VideoSectionSuspense = ({ videoId }: VideoSectionProps) => {
    const { isSignedIn } = useAuth()
    const utils = trpc.useUtils()
    const [video] = trpc.videos.getOne.useSuspenseQuery({ id: videoId });

    const createdView = trpc.videoViews.create.useMutation({
        onSuccess: () => {
            utils.videos.getOne.invalidate({ id: videoId })
        }
    })

    const handlePlay = () => {
        if (!isSignedIn) return;

        createdView.mutate({ videoId })
    }

    return (
        <>
            <div className={cn(
                "aspect-video bg-black rounded-xl overflow-hidden relative",
                video.muxStatus !== "ready" && "bg-gray-200 dark:bg-gray-700"
            )}>
                <VideoPlayer
                    autoPLay
                    onPlay={handlePlay}
                    playbackId={video.muxPlaybackId}
                    // playbackId={"UcKpdv01ofYqnnjRLDj3PZFqUqfcliksWidePUPVuDQ00"}
                    thumbnailUrl={video.thumbnailUrl}
                />
            </div>
            <VideoBanner status={video.muxStatus} />
            <VideoHeader video={video} />
        </>
    )
}