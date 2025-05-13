import { readAllItems } from "@/app/api/items/items.api";
import Link from "next/link";

const Page = async () => {

    const {items, message} = await readAllItems();
    console.log(message);

    return (
        <div className="p-4">
            <h1 className="text-4xl font-bold">Cửa hàng</h1>
            <p className="mt-4 text-lg">Chào mừng bạn đến với cửa hàng của chúng tôi!</p>
            <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {items.map((item,index) => (
                    <Link href={`/cua-hang/${item._id}`} key={index}>
                        <div className="bg-white shadow-sm rounded-lg p-2">
                            <img src={item.imageUrl} alt={item.name} className="w-full h-32 object-cover rounded-t-lg" />
                            <h2 className="text-md font-semibold mt-2">{item.name}</h2>
                            <p className="text-gray-600 text-sm">{item.description}</p>
                            <p className="text-md font-bold mt-1">{item.price} VNĐ</p>
                        </div>
                    </Link>
                ))
                }
            </div>
        </div>
    );
}

export default Page;