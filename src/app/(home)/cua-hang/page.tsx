import { readAllItems } from "@/app/api/items/items.api";
import { ItemStore } from "@/modules/cua-hang/ui/components/item-cua-hang";
import Link from "next/link";

const Page = async () => {

    const { items, message } = await readAllItems();
    console.log(message);

    return (
        <>
            <h2 className="text-xl font-medium">
                Đang khuyến mãi
            </h2>
            <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-x-6 gap-y-8">
                {items.map((item, index) => (
                    <Link href={`/cua-hang/items/${item._id}`} key={index}>
                        <ItemStore item={item} />
                    </Link>
                ))
                }
            </div>
        </>
    );
}

export default Page;