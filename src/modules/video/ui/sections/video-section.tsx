"use client";

import { cn } from "@/lib/utils";
import { trpc } from "@/trpc/client";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import VideoPlayer from "../components/video-player";
import { VideoBanner } from "../components/video-banner";
import { VideoHeader } from "../components/video-header";

interface VideoSectionProps {
    videoId: string;
}

export const VideoSection = ({ videoId }: VideoSectionProps) => {
    return (
        <Suspense fallback={<VideoSectionSuspense videoId={videoId} />}>
            <ErrorBoundary fallback={<p>error</p>}>
                <VideoSectionSuspense videoId={videoId} />
            </ErrorBoundary>
        </Suspense>
    )
}

const VideoSectionSuspense = ({ videoId }: VideoSectionProps) => {
    const [video] = trpc.videos.getOne.useSuspenseQuery({ id: videoId });


    return (
        <>
            <div className={cn(
                "aspect-video bg-black rounded-xl overflow-hidden relative",
                video.muxStatus !== "ready" && "bg-gray-200 dark:bg-gray-700"
            )}>
                <VideoPlayer
                    autoPLay
                    onPlay={() => { }}
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