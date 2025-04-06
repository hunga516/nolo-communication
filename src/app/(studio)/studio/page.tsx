import {trpc} from "@/trpc/server";
import StudioView from "@/modules/studio/view/studio-view";

const Page = async () => {
  void trpc.studio.getMany.prefetchInfinite()

  return (
     <StudioView />
  )
}

export default Page