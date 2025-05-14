import { Item } from "@/app/api/items/items.api"
import { Button } from "@/components/ui/button"
import { DollarSign, ShoppingCart } from "lucide-react"
import Image from "next/image"

interface ItemStoreProps {
    item: Item
}

export const ItemStore = ({ item }: ItemStoreProps) => {
    return (
        <div className="bg-white">
            <div className="relative w-full h-[170px] overflow-hidden rounded-md">
                <Image
                    src={item.imageUrl}
                    alt={item.name}
                    fill
                    className="object-cover"
                    sizes="100vw"
                />
            </div>
            <div className="">
                <h2 className="text-md mt-1">{item.name}</h2>
                <p className="text-md font-semibold mt-1 flex items-center">{item.price} <DollarSign size={15} /></p>
                <Button variant="secondary" className="mt-2">
                    <ShoppingCart /> Mua ngay
                </Button>
            </div>
        </div>
    )
}
