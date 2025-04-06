import { trpc } from "@/trpc/server";
import StudioView from "@/modules/studio/view/studio-view";
import { DEFAULT_LIMIT } from "@/constans";

const Page = async () => {
  void trpc.studio.getMany.prefetchInfinite({
    limit: DEFAULT_LIMIT,
  });

  return <StudioView />;
};

export default Page;
