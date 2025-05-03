"use client"

import { InfiniteScroll } from "@/components/infinite-scroll";
import { Skeleton } from "@/components/ui/skeleton";
import { VideoGridCard } from "@/components/video-grid-card";
import { DEFAULT_LIMIT } from "@/constans";
import { trpc } from "@/trpc/client";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";



export const SuggestionSection = () => {
    return (
        <Suspense fallback={<SuggestionSectionSkeleton />}>
            <ErrorBoundary fallback={<p>error</p>}>
                <SuggestionSectionSuspense />
            </ErrorBoundary>
        </Suspense>
    )
}

const SuggestionSectionSkeleton = () => {
    return (
        <div className="w-full gap-4 gap-y-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-2">
            {Array.from({ length: 18 }).map((_, index) =>
                <Skeleton className="w-full aspect-video rounded-2xl" key={index} />
            )}
        </div>
    )
}

const SuggestionSectionSuspense = () => {
    const [videos, query] = trpc.videos.getMany.useSuspenseInfiniteQuery({
        limit: DEFAULT_LIMIT,
    }, {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
    })

    return (
        <>
            <p className="font-medium mb-2 text-gray-900 dark:text-white">
                Có thể bạn thích
            </p>
            <div className="gap-2 gap-y-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1">
                {videos.pages
                    .flatMap((page) => page.items)
                    .map((video) => (
                        <VideoGridCard key={video.id} video={video} />
                    ))}
            </div>
            <InfiniteScroll
                hasNextPage={query.hasNextPage}
                isFetchingNextPage={query.isFetchingNextPage}
                fetchNextPage={query.fetchNextPage}
            />
        </>
    )
}