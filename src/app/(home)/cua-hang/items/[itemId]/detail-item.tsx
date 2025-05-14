import { Item } from "@/app/api/items/items.api";
import Image from "next/image";

interface DetailItemProps {
    item: Item;
    isMobile?: boolean;
}

export const DetailItem = ({ item, isMobile = false }: DetailItemProps) => {
    return (
        <div
            className={`p-4 mx-auto bg-white ${isMobile ? "w-[300px] h-[700px] overflow-auto" : "max-w-screen-2xl"}`}
        >
            <h1 className="text-2xl font-bold">Cửa hàng</h1>

            <div className={`${isMobile ? "" : "md:grid md:grid-cols-5 gap-4"} mt-4`}>
                <div className={isMobile ? "" : "md:col-span-3"}>
                    <Image
                        src={item.imageUrl}
                        alt={item.name}
                        width={300}
                        height={300}
                        className="w-full aspect-video object-cover rounded-md"
                    />
                    <h2 className="text-md font-semibold mt-2">{item.name}</h2>
                    <p className="text-gray-600 text-sm line-clamp-4">{item.description}</p>
                    <p className="text-md font-bold mt-1">{item.price} VNĐ</p>
                </div>

                <div className={`relative ${isMobile ? "mt-4 h-64" : "md:col-span-2 w-full h-[400px] md:h-auto"}`}>
                    <Image
                        src={`https://img.vietqr.io/image/970416-28307897-print.png?amount=${item.price}&addInfo=${item.name}&accountName=LE%20NGOC%20LOC`}
                        alt="qrcode"
                        fill
                        className="object-contain"
                    />
                </div>
            </div>
        </div>
    );
};
