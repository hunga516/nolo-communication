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
        <HomeView categoryId={categoryId} />
      </HydrateClient>
    </>
  );
}

export default Page;