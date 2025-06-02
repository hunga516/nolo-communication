import { Button } from "@/components/ui/button"
import { Store } from "lucide-react"
import Link from "next/link"
import { InventoryList } from "./inventories-list"
const Page = async () => {

    return (
        <div className="mt-8 p-4">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-extrabold">
                    Túi đồ ingame
                </h1>
                <Link href="/cua-hang">
                    <Button size="sm">
                        <Store /> Mua hàng
                    </Button>
                </Link>
            </div>
            <div className="mt-4">
                <InventoryList />
            </div>
        </div>
    )
}

export default Page