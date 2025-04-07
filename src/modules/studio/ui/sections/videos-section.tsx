"use client"

import { trpc } from "@/trpc/client";
import { DEFAULT_LIMIT } from "@/constans";
import {ErrorBoundary} from "react-error-boundary";
import {Suspense} from "react";
import {InfiniteScroll} from "@/components/infinite-scroll";


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
  const [data, query] = trpc.studio.getMany.useSuspenseInfiniteQuery(
    {
      limit: DEFAULT_LIMIT,
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    },
  );

  return (
      <div>
          {JSON.stringify(data)}
          <InfiniteScroll isManual hasNextPage={query.hasNextPage} isFetchingNextPage={query.isFetchingNextPage} fetchNextPage={query.fetchNextPage} />
      </div>
  );
};

export default VideosSection;
