import { Item } from "@/app/api/items/items.api";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Landmark, ShoppingCart } from "lucide-react";
import Image from "next/image";

interface DetailItemProps {
    item: Item;
    isMobile?: boolean;
}

export const DetailItem = ({ item, isMobile = false }: DetailItemProps) => {
    return (
        <div
            className={`mt-12 mx-auto bg-white ${isMobile ? "w-[300px] h-[700px] overflow-auto" : "max-w-screen-2xl"}`}
        >
            <div className={`${isMobile ? "" : "grid sm:grid-cols-2 md:grid-cols-3 gap-4"} mt-4`}>
                <div className="w-full">
                    <div className="relative h-[300px]">
                        <Image
                            src={item.imageUrl}
                            alt={item.name}
                            fill
                            className="w-full aspect-video object-cover rounded-md"
                        />
                    </div>
                </div>
                <div className="md:col-span-2 col-span-1">
                    <h2 className="text-3xl font-semibold">{item.name}</h2>
                    <p className="text-muted-foreground text-sm line-clamp-4 mt-1">{item.description}</p>

                    <div>
                        <ul className="list-disc list-inside mt-4">
                            <li className="tracking-tight leading-6">Chất liệu cao cấp</li>
                            <li className="tracking-tight leading-6">Thiết kế tinh tế</li>
                            <li className="tracking-tight leading-6">Độ bền cao</li>
                            <li className="tracking-tight leading-6">Giá cả hợp lý</li>
                            <li className="tracking-tight leading-6">Phù hợp với mọi lứa tuổi</li>
                            <li className="tracking-tight leading-6">Giao hàng nhanh chóng</li>
                        </ul>
                    </div>
                    <p className="pt-4">Chiếc xe được đại đa số người chơi ưa chuộng vì ngoại hình đẹp, tốc độ cao. Có một mẹo khi lái xe nhấn X sẽ có thể focus on field.</p>

                    <div className="grid grid-cols-2 gap-2 mt-4">
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
        </div>
    );
};
