import { trpc } from "@/trpc/server";
import StudioView from "@/modules/studio/views/studio-view";
import { DEFAULT_LIMIT } from "@/constans";

export const dynamic = "force-dynamic"; //khong cache

const Page = async () => {
  void trpc.studio.getMany.prefetchInfinite({
    limit: DEFAULT_LIMIT,
  });

  return <StudioView />;
};

export default Page;
