"use client"

import { trpc } from "@/trpc/client";
import { DEFAULT_LIMIT } from "@/constans";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";
import { InfiniteScroll } from "@/components/infinite-scroll";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Link from "next/link";
import { VideoThumbnail } from "@/modules/video/ui/components/video-thumbnail";


const VideosSection = () => {
    return (
        <Suspense fallback={<p>loading</p>}>
            <ErrorBoundary fallback={<p>error ...</p>}>
                <VideosSectionSuspense />
            </ErrorBoundary>
        </Suspense>
    )
}

const VideosSectionSuspense = () => {
    const [videos, query] = trpc.studio.getMany.useSuspenseInfiniteQuery(
        {
            limit: DEFAULT_LIMIT,
        },
        {
            getNextPageParam: (lastPage) => lastPage.nextCursor,
        },
    );

    return (
        <div>
            <div className="border-y">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="pl-6">Video</TableHead>
                            <TableHead>Visibility</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead className="text-right">Views</TableHead>
                            <TableHead className="text-right">Comments</TableHead>
                            <TableHead className="text-right pr-6">Likes</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {videos.pages.flatMap((page) => page.items).map((video) => (
                            <Link key={video.id} href={`/videos/${video.id}`} legacyBehavior>
                                <TableRow>
                                    <TableCell>
                                        <div className="relative aspect-video w-36 shrink-0">
                                            <VideoThumbnail />
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        visibility
                                    </TableCell>
                                    <TableCell>
                                        Status
                                    </TableCell>
                                    <TableCell>
                                        Date
                                    </TableCell>
                                    <TableCell>
                                        Views
                                    </TableCell>
                                    <TableCell>
                                        Comments
                                    </TableCell>
                                    <TableCell>
                                        Likes
                                    </TableCell>
                                </TableRow>
                            </Link>
                        ))}
                    </TableBody>
                </Table>
            </div>
            <InfiniteScroll isManual hasNextPage={query.hasNextPage} isFetchingNextPage={query.isFetchingNextPage} fetchNextPage={query.fetchNextPage} />
        </div>
    );
};

export default VideosSection;
