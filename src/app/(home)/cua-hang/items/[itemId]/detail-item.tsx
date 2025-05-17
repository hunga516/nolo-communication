import { Item } from "@/app/api/items/items.api";
import ImagesCarousel from "@/components/images-carousel";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Landmark, ShoppingCart } from "lucide-react";
import Image from "next/image";

interface DetailItemProps {
    item: Item;
    isMobile?: boolean;
}

export const DetailItem = ({ item, isMobile = false }: DetailItemProps) => {
    return (
        <div
            className={`mx-auto md:px-12 bg-white ${isMobile ? "w-[300px] h-[700px] overflow-auto" : "max-w-screen-2xl"}`}
        >
            <div className={`${isMobile ? "" : "grid grid-cols-1 md:grid-cols-4 gap-6"} mt-4`}>
                <div className="md:col-span-2">
                    <div className="relative h-[300px]">
                        <Image
                            src={item.imageUrl}
                            alt={item.name}
                            fill
                            className="object-cover rounded-md"
                        />
                    </div>
                </div>
                <div className="md:col-span-2">
                    <h2 className="text-3xl font-semibold">{item.name}</h2>
                    <p className="text-muted-foreground text-sm line-clamp-4 mt-1">{item.description}</p>
                    <p className="text-2xl font-medium text-red-500 mt-4">{item.price} VNĐ</p>
                    <div>
                        <ul className="list-disc list-inside mt-4 text-sm">
                            <li className="tracking-tight leading-6">Chất liệu cao cấp</li>
                            <li className="tracking-tight leading-6">Thiết kế tinh tế</li>
                            <li className="tracking-tight leading-6">Độ bền cao</li>
                            <li className="tracking-tight leading-6">Giá cả hợp lý</li>
                            <li className="tracking-tight leading-6">Phù hợp với mọi lứa tuổi</li>
                            <li className="tracking-tight leading-6">Giao hàng nhanh chóng</li>
                        </ul>
                    </div>
                    <p className="pt-4 text-sm">Chiếc xe được đại đa số người chơi ưa chuộng vì ngoại hình đẹp, tốc độ cao. Có một mẹo khi lái xe nhấn X sẽ có thể focus on field.</p>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 mt-4">
                        <Button variant="default">
                            <ShoppingCart className="mr-2" />
                            Thêm vào giỏ hàng
                        </Button>
                        <Button variant="outline" >
                            <Landmark className="mr-2" />
                            Chuyển khoản
                        </Button>
                    </div>
                </div>
            </div>

            <div className="mt-20">
                <p className="text-sm font-medium text-muted-foreground">Hình minh họa</p>
                <ImagesCarousel />
            </div>

            <Tabs defaultValue="mo-ta-chi-tiet" className="mt-12">
                <TabsList className="grid grid-cols-2 w-full">
                    <TabsTrigger value="mo-ta-chi-tiet">
                        Mô tả chi tiết
                    </TabsTrigger>
                    <TabsTrigger value="thong-so-ky-thuat">
                        Thông số kỹ thuật
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="mo-ta-chi-tiet">
                    <div className="p-4">
                        <h3 className="text-lg font-semibold">Mô tả chi tiết</h3>
                        <p className="text-sm text-muted-foreground mt-2">
                            {item.description}
                        </p>
                    </div>
                </TabsContent>
                <TabsContent value="mo-ta-chi-tiet">
                    <div className="p-4">
                        <h3 className="text-lg font-semibold">Mô tả chi tiết</h3>
                        <p className="text-sm text-muted-foreground mt-2">
                            {item.description}
                        </p>
                    </div>
                </TabsContent>
                <TabsContent value="thong-so-ky-thuat">
                    <div className="p-4">
                        <h3 className="text-lg font-semibold">Thông số kỹ thuật</h3>
                        <ul className="list-disc list-inside mt-2">
                            <li className="text-sm text-muted-foreground">Kích thước: </li>
                            <li className="text-sm text-muted-foreground">Trọng lượng:</li>
                            <li className="text-sm text-muted-foreground">Chất liệu:</li>
                            <li className="text-sm text-muted-foreground">Màu sắc: </li>
                        </ul>
                    </div>
                </TabsContent>
            </Tabs>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
                <div>
                    <p className="text-md font-medium leading-6">
                        Hãy để lại đánh giá của bạn nhé
                    </p>
                    <div className="mt-4">
                        <Textarea />
                        <Button size="sm" className="mt-2">Gửi</Button>
                    </div>
                </div>
                <div>
                    <p className="text-md font-medium leading-6">Đánh giá của người chơi khác</p>
                    <Carousel
                        opts={{
                            align: "start",
                        }}
                        orientation="vertical"
                        className="w-full max-w-xs mt-2"
                    >
                        <CarouselContent className="-mt-1 h-[200px]">
                            {Array.from({ length: 5 }).map((_, index) => (
                                <CarouselItem key={index} className="pt-1 md:basis-1/2">
                                    <div className="p-1">
                                        <Card>
                                            <CardContent className="flex items-center justify-center p-6">
                                                <span className="text-3xl font-semibold">{index + 1}</span>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                    </Carousel>
                </div>
            </div>
        </div>
    );
};
