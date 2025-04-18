import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

interface InfiniteScrollProps {
    isManual?: boolean;
    hasNextPage: boolean;
    isFetchingNextPage: boolean;
    fetchNextPage: () => void;
}

export const InfiniteScroll = ({
    isManual = false,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
}: InfiniteScrollProps) => {
    const { targetRef, isIntersecting } = useIntersectionObserver({
        threshold: 0.5,
        rootMargin: "100px"
    })

    useEffect(() => {
        const timer = setTimeout(() => {
            if (isIntersecting && hasNextPage && !isFetchingNextPage && !isManual) {
                fetchNextPage();
            }
        }, 100); // delay một chút

        return () => clearTimeout(timer);
    }, [isIntersecting, hasNextPage, isFetchingNextPage, isManual, fetchNextPage]);

    return (
        <div className="flex flex-col items-center gap-4 p-4">
            <div ref={targetRef} className="h-1"></div>
            {hasNextPage ? (
                <Button
                    variant="secondary"
                    disabled={!hasNextPage || isFetchingNextPage}
                    onClick={() => fetchNextPage()}
                >
                    {isFetchingNextPage ? "Đang tải ..." : "Xem thêm"}
                </Button>
            ) : (
                <p>
                    Bạn đã xem hết nội dung.
                </p>
            )}
        </div>
    )
}