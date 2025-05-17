"use client"

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Image from "next/image";
import AutoplayScroll from "embla-carousel-auto-scroll"


const ImagesCarousel = () => {
    return (
        <Carousel
            opts={{
                align: "start",
            }}
            className="w-full"
            plugins={[
                AutoplayScroll({
                    speed: 1,
                    startDelay: 0,
                    stopOnMouseEnter: true
                }),
            ]}
        >
            <CarouselContent className="mt-2">
                <CarouselItem className="basis-1/3">
                    <div className="relative h-60 rounded-sm overflow-hidden">
                        <Image fill alt="svj1" src="/img/svj/svj3.avif" className="object-cover" />
                    </div>
                </CarouselItem>
                <CarouselItem className="basis-1/3">
                    <div className="relative h-60 rounded-sm overflow-hidden">
                        <Image fill alt="svj1" src="/img/svj/svj4.jpg" className="object-cover" />
                    </div>
                </CarouselItem>
                <CarouselItem className="basis-1/3">
                    <div className="relative h-60 rounded-sm overflow-hidden">
                        <Image fill alt="svj1" src="/img/svj/svj5.jpg" className="object-cover" />
                    </div>
                </CarouselItem>
                <CarouselItem className="basis-1/3">
                    <div className="relative h-60 rounded-sm overflow-hidden">
                        <Image fill alt="svj1" src="/img/svj/svj6.jpeg" className="object-cover" />
                    </div>
                </CarouselItem>
                <CarouselItem className="basis-1/3">
                    <div className="relative h-60 rounded-sm overflow-hidden">
                        <Image fill alt="svj1" src="/img/svj/svj7.jpeg" className="object-cover" />
                    </div>
                </CarouselItem>
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    )
}

export default ImagesCarousel