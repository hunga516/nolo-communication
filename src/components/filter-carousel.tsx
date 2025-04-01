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
import {useState} from "react";

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

    return (
        <div className="relative max-w-[65vw]">
            {/*Left fade*/}
            <div className={cn(
                "absolute left-10 inset-y-0 w-12 z-10 bg-gradient-to-r from-white to-transparent",
                false && "hidden"
            )}>

            </div>

            <Carousel
                opts={{
                    align: "start",
                    dragFree: true,
                }}
                className="px-10"
            >
                <CarouselContent className="-ml-2">
                <CarouselItem
                        className="pl-6 basis-auto"
                    >
                        <Badge
                            variant={value === null ? "default" : "secondary"}
                            className="px-3 py-1 text-sm rounded-sm  select-none">
                             Tất cả
                        </Badge>
                    </CarouselItem>
                    {data.map(item => (
                        <CarouselItem
                            className="pl-2 basis-auto"
                            key={item.value}
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
                <CarouselPrevious className="left-0 z-20" />
                <CarouselNext className="right-0 z-20" />
            </Carousel>

            {/*Right fade*/}
            <div className={cn(
                "absolute right-10 inset-y-0 w-12 z-10 bg-gradient-to-l from-white to-transparent",
                false && "hidden"
            )}>
            </div>
        </div>
    )
}