import { trpc } from "@/trpc/client";
import { DEFAULT_LIMIT } from "@/constans";

const VideosSection = () => {
  const [data] = trpc.studio.getMany.useSuspenseInfiniteQuery(
    {
      limit: DEFAULT_LIMIT,
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    },
  );

  return <div>videos section</div>;
};

export default VideosSection;
