"use client"

import { InfiniteScroll } from "@/components/infinite-scroll";
import { Skeleton } from "@/components/ui/skeleton";
import { VideoGridCard } from "@/components/video-grid-card";
import { DEFAULT_LIMIT } from "@/constans";
import { trpc } from "@/trpc/client";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

interface HomeVideoSectionProps {
    categoryId: string;
}

export const HomeVideoSection = ({ categoryId }: HomeVideoSectionProps) => {
    return (
        <Suspense key={categoryId} fallback={<HomeVideoSectionSkeleton />}>
            <ErrorBoundary fallback={<p>error</p>}>
                <HomeVideoSectionSuspense categoryId={categoryId} />
            </ErrorBoundary>
        </Suspense>
    )
}

const HomeVideoSectionSkeleton = () => {
    return (
        <div className="w-full gap-4 gap-y-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
            {Array.from({ length: 18 }).map((_, index) =>
                <Skeleton className="w-full aspect-video rounded-2xl" key={index} />
            )}
        </div>
    )
}

const HomeVideoSectionSuspense = ({ categoryId }: HomeVideoSectionProps) => {
    const [videos, query] = trpc.videos.getMany.useSuspenseInfiniteQuery({
        categoryId,
        limit: DEFAULT_LIMIT,
    }, {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
    })

    return (
        <>
            <div className="gap-4 gap-y-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
                {videos.pages
                    .flatMap((page) => page.items)
                    .map((video) => (
                        <VideoGridCard key={video.id} video={video} />
                    ))
                }
            </div>
            <InfiniteScroll
                hasNextPage={query.hasNextPage}
                isFetchingNextPage={query.isFetchingNextPage}
                fetchNextPage={query.fetchNextPage}
            />
        </>
    )
}