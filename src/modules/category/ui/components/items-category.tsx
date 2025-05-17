"use client"

import { Card, CardContent } from "@/components/ui/card";
import { useCallback, useEffect, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";

const ItemsCategory = () => {
    const [emblaRef, emblaApi] = useEmblaCarousel({ axis: "y", loop: true });
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    useEffect(() => {
        intervalRef.current = setInterval(scrollNext, 4000);
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [scrollNext]);

    return (
        <div className="overflow-hidden w-full mt-2 h-[400px]" ref={emblaRef}>
            <div className="flex flex-col h-full">
                {Array.from({ length: 5 }).map((_, index) => (
                    <div key={index} className="embla__slide shrink-0 min-h-[200px] p-2">
                        <Card>
                            <CardContent className="p-6 space-y-4">
                                <div className="flex items-center gap-4">
                                    <Image
                                        src={`/img/user_placeholder.png`}
                                        alt="Avatar"
                                        width={40}
                                        height={40}
                                        className="rounded-full object-cover"
                                    />
                                    <div>
                                        <p className="font-semibold text-base">Nguyễn Văn A</p>
                                        <p className="text-sm text-muted-foreground">2 ngày trước</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <svg
                                            key={i}
                                            className={`w-5 h-5 ${i < 4 ? 'text-yellow-400' : 'text-gray-300'}`}
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.112 3.424a1 1 0 00.95.69h3.6c.969 0 1.371 1.24.588 1.81l-2.916 2.12a1 1 0 00-.364 1.118l1.112 3.424c.3.921-.755 1.688-1.538 1.118l-2.916-2.12a1 1 0 00-1.176 0l-2.916 2.12c-.783.57-1.838-.197-1.538-1.118l1.112-3.424a1 1 0 00-.364-1.118L2.8 8.851c-.783-.57-.38-1.81.588-1.81h3.6a1 1 0 00.95-.69l1.112-3.424z" />
                                        </svg>
                                    ))}
                                </div>
                                <p className="text-sm text-muted-foreground">
                                    Dịch vụ rất tuyệt vời, tôi hoàn toàn hài lòng với chuyến đi vừa qua.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ItemsCategory;
