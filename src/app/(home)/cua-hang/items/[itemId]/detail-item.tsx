import { Item } from "@/app/api/items/items.api";
import { Button } from "@/components/ui/button";
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
            <div className={`${isMobile ? "" : "md:grid md:grid-cols-5 gap-4"} mt-4`}>
                <div className={isMobile ? "" : "col-span-3 flex h-screen gap-8"}>
                    <div className="w-1/2">
                        <div className="relative h-[300px]">
                            <Image
                                src={item.imageUrl}
                                alt={item.name}
                                fill
                                className="w-full aspect-video object-cover rounded-md"
                            />
                        </div>
                    </div>
                    <div className="w-1/2 flex-shrink-1">
                        <h2 className="text-3xl font-semibold">{item.name}</h2>
                        <p className="text-gray-600 text-sm line-clamp-4 mt-1">{item.description}</p>

                        <div>
                            <ul className="list-disc list-inside mt-4 text-gray-700">
                                <li>Chất liệu cao cấp</li>
                                <li>Thiết kế tinh tế</li>
                                <li>Độ bền cao</li>
                                <li>Giá cả hợp lý</li>
                                <li>Phù hợp với mọi lứa tuổi</li>
                                <li>Giao hàng nhanh chóng</li>
                            </ul>
                        </div>
                        <p className="pt-4">Chiếc xe được đại đa số người chơi ưa chuộng vì ngoại hình đẹp, tốc độ cao. Có một mẹo khi lái xe nhấn X sẽ có thể focus on field.</p>

                        <div className="grid grid-cols-2 gap-2 mt-4">
                            <Button variant="default">
                                <ShoppingCart className="mr-2" />
                                Thêm vào giỏ hàng
                            </Button>
                            <Button variant="secondary">
                                <Landmark className="mr-2" />
                                Chuyển khoản
                            </Button>
                        </div>
                    </div>
                </div>

                {/* <div className={`relative ${isMobile ? "mt-4 h-64" : "md:col-span-2 w-full h-[400px] md:h-auto"}`}>
                    <Image
                        src={`https://img.vietqr.io/image/970416-28307897-print.png?amount=${item.price}&addInfo=${item.name}&accountName=LE%20NGOC%20LOC`}
                        alt="qrcode"
                        fill
                        className="object-contain"
                    />
                </div> */}
            </div>
        </div>
    );
};
