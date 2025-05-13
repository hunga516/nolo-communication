import { readItemById } from "@/app/api/items/items.api";
import Image from "next/image";

interface PageProps {
    params: { itemId: string }
}

const Page = async ({ params }: PageProps) => {
    const { itemId } = await params

    const { item } = await readItemById(itemId)

    return (
        <div className="p-4 max-w-screen-2xl mx-auto">
            <h1 className="text-4xl font-bold">Cửa hàng</h1>
            <div className="md:grid md:grid-cols-5 gap-4 mt-4">
                <div className="md:col-span-3">
                    <img src={item.imageUrl} alt={item.name} className="w-full aspect-4/3 object-cover rounded-md" />
                    <h2 className="text-md font-semibold mt-2">{item.name}</h2>
                    <p className="text-gray-600 text-sm">{item.description}</p>
                    <p className="text-md font-bold mt-1">{item.price} VNĐ</p>
                </div>

                <div className="relative md:col-span-2 w-full h-[400px] md:h-auto">
                    <Image 
                        src={`https://img.vietqr.io/image/970416-28307897-print.png?amount=${Number(item.price + 0)}&addInfo=${item.name}&accountName=LE%20NGOC%20LOC`} 
                        alt="qrcode" 
                        fill 
                        className="object-contain" 
                    />
                </div>

            </div>
        </div>
    );
}

export default Page;