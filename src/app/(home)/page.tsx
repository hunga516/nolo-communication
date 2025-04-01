import {HydrateClient, trpc} from "@/trpc/server";
import {HomeView} from "@/modules/home/views/home-view";

export const dynamic = "force-dynamic"; //khong cache

interface PageProps {
    searchParams: Promise<{
        categoryId: string;
    }>
}

const Page = async ({searchParams} : PageProps) => {
    const {categoryId} = await searchParams;

  void trpc.categories.getMany.prefetch() //lãng phí neu trong children khong === voi du lieu prefetch

  return (
    <>
      <HydrateClient>
        {/*<div className="grid grid-cols-1 md:grid-cols-3 gap-4">*/}
            {/*<div className="md:col-span-2">*/}
                <HomeView categoryId={categoryId} />
            {/*</div>*/}
            {/*<div className="h-1.5 bg-red-400"></div>*/}
        {/*</div>*/}
      </HydrateClient>
    </>
  );
}

export default Page;