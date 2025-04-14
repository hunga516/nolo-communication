"use client"

import { trpc } from "@/trpc/client";
import { DEFAULT_LIMIT } from "@/constans";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";
import { InfiniteScroll } from "@/components/infinite-scroll";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Link from "next/link";
import { VideoThumbnail } from "@/modules/video/ui/components/video-thumbnail";
import { translateStatus, translateVisibility } from "@/lib/utils";
import moment from "@/lib/moment";
import { Globe2Icon, Lock } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const VideosSection = () => {
    return (
        <Suspense fallback={<VideoSectionSkeleton />}>
            <ErrorBoundary fallback={<p>error ...</p>}>
                <VideosSectionSuspense />
            </ErrorBoundary>
        </Suspense>
    )
}

const VideoSectionSkeleton = () => {
    return (
        <>
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
                        {Array.from({ length: 5 }).map((_, index) => (
                            <TableRow key={index}>
                                <TableCell className="flex items-center gap-x-2">
                                    <Skeleton className="w-40 h-24" />
                                    <div className="flex flex-col gap-y-2">
                                        <Skeleton className="w-20 h-4" />
                                        <Skeleton className="w-28 h-3" />
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Skeleton className="w-20 h-3 text-right" />
                                </TableCell>
                                <TableCell>
                                    <Skeleton className="w-20 h-3 text-right" />
                                </TableCell>
                                <TableCell>
                                    <Skeleton className="w-20 h-3" />
                                </TableCell>
                                <TableCell>
                                    <Skeleton className="w-20 h-3 text-right" />
                                </TableCell>
                                <TableCell>
                                    <Skeleton className="w-20 h-3 text-right" />
                                </TableCell>
                                <TableCell>
                                    <Skeleton className="w-20 h-3 pr-6 text-right" />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </>
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
                            <TableHead className="text-right">Visibility</TableHead>
                            <TableHead className="text-right">Status</TableHead>
                            <TableHead className="">Date</TableHead>
                            <TableHead className="text-right">Views</TableHead>
                            <TableHead className="text-right">Comments</TableHead>
                            <TableHead className="text-right pr-6">Likes</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {videos.pages.flatMap((page) => page.items).map((video) => (
                            <Link key={video.id} href={`/studio/videos/${video.id}`} legacyBehavior>
                                <TableRow>
                                    <TableCell className="flex items-center gap-2">
                                        <div className="relative aspect-video w-36 shrink-0">
                                            <VideoThumbnail
                                                imageUrl={video.thumbnailUrl}
                                                title={video.title}
                                                previewUrl={video.previewUrl}
                                                duration={video.duration}
                                            />
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <p className="line-clamp-1">{video.title}</p>
                                            <p className="text-xs text-muted-foreground line-clamp-1">{video.description || "Không có mô tả"}</p>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex items-center justify-end gap-x-2">
                                            {video.visibility === "private" ? (
                                                <Lock className="size-4" />
                                            ) : (
                                                <Globe2Icon className="size-4" />
                                            )}
                                            {translateVisibility(video.visibility)}
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex items-center justify-end">
                                            {translateStatus(video.muxStatus || "Đang chờ")}
                                        </div>
                                    </TableCell>
                                    <TableCell className="">
                                        {moment(video.createdAt).startOf("hour").fromNow()}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        Views
                                    </TableCell>
                                    <TableCell className="text-right">
                                        Comments
                                    </TableCell>
                                    <TableCell className="text-right pr-6">
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
