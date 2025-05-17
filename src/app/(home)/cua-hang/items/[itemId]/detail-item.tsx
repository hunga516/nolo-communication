import { Item, readAllItems } from "@/app/api/items/items.api";
import ImagesCarousel from "@/components/images-carousel";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import AuthButton from "@/modules/auth/ui/components/auth-button";
import ItemsCategory from "@/modules/category/ui/components/items-category";
import { Landmark, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface DetailItemProps {
    item: Item;
    isMobile?: boolean;
}

export const DetailItem = async ({ item, isMobile = false }: DetailItemProps) => {

    const { items } = await readAllItems()

    return (
        <div
            className={`mx-auto md:px-12 bg-white ${isMobile ? "w-[300px] h-[700px] overflow-auto" : "max-w-screen-2xl"}`}
        >
            <div className={`${isMobile ? "" : "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"} mt-4`}>
                <div className="">
                    <div className="relative h-[300px]">
                        <Image
                            src={item.imageUrl}
                            alt={item.name}
                            fill
                            className="object-cover rounded-md"
                        />
                    </div>
                </div>
                <div className="">
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
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 mt-8">
                        <Button variant="default">
                            <ShoppingCart className="mr-2" />
                            Thêm vào giỏ hàng
                        </Button>
                        <Button variant="outline" >
                            <Landmark className="mr-2" />
                            Chuyển khoản
                        </Button>
                    </div>
                    {/* <div className="relative w-full h-[400px] mt-12">
                        <Image
                            src={`https://img.vietqr.io/image/970416-28307897-print.png?amount=${Number(item.price + 0)}&addInfo=${item.name}&accountName=LE%20NGOC%20LOC`}
                            alt="qrcode"
                            fill
                            className="object-contain"
                        />
                    </div> */}
                </div>
                <div className="col-span-2 xl:col-span-1 xl:ml-20">
                    <Tabs defaultValue="tat-ca">
                        <TabsList className="w-full">
                            <TabsTrigger value="tat-ca">Tất cả</TabsTrigger>
                            <TabsTrigger value="best-seller-24h">Bán chạy nhất 24h</TabsTrigger>
                        </TabsList>
                        <TabsContent value="tat-ca">
                            <ScrollArea className="h-[400px]">
                                <Carousel
                                    orientation="vertical"
                                >
                                    <CarouselContent className="mt-[1px]">
                                        {items.map((item, index) => (
                                            <CarouselItem key={index} className="p-2 mt-1 flex items-center justify-between">
                                                <Link href={`/cua-hang/items/${item._id}`}>
                                                    <div className="flex gap-4">
                                                        <div className="relative w-20 h-20 rounded-sm overflow-hidden">
                                                            <Image src={item.imageUrl} alt={item.description} fill className="object-cover" />
                                                        </div>
                                                        <div className="my-2">
                                                            <p className="text-sm font-medium">{item.name}</p>
                                                            <p className="text-xs text-muted-foreground mt-1">{item.description}</p>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </CarouselItem>
                                        ))}
                                    </CarouselContent>
                                </Carousel>
                            </ScrollArea>
                        </TabsContent>
                        <TabsContent value="best-seller-24h">

                        </TabsContent>
                    </Tabs>
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
                        <div className="flex items-start gap-2">
                            <AuthButton />
                            <Textarea />
                        </div>
                        <Button size="sm" className="mt-2 float-right">Gửi đánh giá</Button>
                    </div>
                </div>
                <div>
                    <ItemsCategory />
                </div>
            </div>
        </div>
    );
};
