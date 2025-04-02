"use client"

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    type CarouselApi,
} from "@/components/ui/carousel"
import {Badge} from "@/components/ui/badge";
import {cn} from "@/lib/utils";
import {useEffect, useState} from "react";
import {Skeleton} from "@/components/ui/skeleton";

interface FilterCarouselProps {
    value?: string | null
    isLoading?: boolean
    onSelect?: (value?:string | null) => void
    data: {
        value: string
        label: string
    }[]
}

export const FilterCarousel = ({
    value,
    onSelect,
    data,
    isLoading,
}: FilterCarouselProps) => {
    const [api, setApi] = useState<CarouselApi>()
    const [current, setCurrent] = useState(0)
    const [count, setCount] = useState(0)

    useEffect(() => {
        if(!api) return;

        setCount(api.scrollSnapList().length)
        setCurrent(api.selectedScrollSnap() + 1)

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap() + 1)
        })
    }, [api])

    return (
        <div className="relative -mx-4 px-4 md:max-w-[calc(100vw-var(--sidebar-width))] ">

            {/*Left fade*/}
            <div className={cn(
                "left-12 inset-y-0 w-12 z-10 bg-gradient-to-r from-white to-transparent",
                current === 1 && "hidden",
                current === 0 ? "hidden" : "absolute",
            )}>

            </div>

            <Carousel
                opts={{
                    align: "start",
                    dragFree: true,
                }}
                setApi={setApi}
                className="px-10"
            >
                <CarouselContent className="-ml-2 -mx-4">
                    {!isLoading && (
                        <CarouselItem
                            onClick={() => onSelect?.(null)}
                            className="pl-6 basis-auto"
                        >
                            <Badge
                                variant={!value ? "default" : "secondary"}
                                className="px-3 py-1 text-sm rounded-sm  select-none">
                                Tất cả
                            </Badge>
                        </CarouselItem>
                    )}
                    {isLoading &&
                        Array.from({length: 12}).map((item, i) => (
                            <CarouselItem
                                className={`${i === 0 && "ml-4"} pl-2 basis-auto`}
                                key={i}
                            >
                                <Skeleton className="rounded-lg px-3 py-4 h-full w-[100px]"  />
                            </CarouselItem>
                        ))
                    }
                    {!isLoading && data.map(item => (
                        <CarouselItem
                            className="pl-2 basis-auto"
                            key={item.value}
                            onClick={() => onSelect?.(item.value)}
                        >
                            <Badge
                                variant={value === item.value ? "default" : "secondary"}
                                className="px-3 py-1 text-sm rounded-sm cursor-pointer select-none"
                            >
                                {item.label}
                            </Badge>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="left-0 z-20"/>
                <CarouselNext className="right-0 z-20"/>
            </Carousel>

            {/*Right fade*/}
            <div className={cn(
                "absolute right-12 inset-y-0 w-16 z-10 bg-gradient-to-l from-white to-transparent",
                current === count && "hidden"
            )}>
            </div>
        </div>
    )
}