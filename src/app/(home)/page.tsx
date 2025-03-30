import {HydrateClient, trpc} from "@/trpc/server";
import {PageClient} from "@/app/(home)/client";
import {Suspense} from "react";
import {ErrorBoundary} from "react-error-boundary";

export default async function Page() {
  void trpc.hello.prefetch({text: "Le Ngoc Loc"}) //lãng phí neu trong children khong === voi du lieu prefetch

  return (
    <>
      <HydrateClient>
        <Suspense fallback={<p>loading ...</p>}>
            <ErrorBoundary fallback={<p>LOI ROI BAN OI ...</p>}>
                <PageClient />
            </ErrorBoundary>
        </Suspense>
      </HydrateClient>
    </>
  );
}
