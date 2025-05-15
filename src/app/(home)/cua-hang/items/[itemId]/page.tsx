import { readItemById } from "@/app/api/items/items.api";
import { DetailItem } from "./detail-item";

interface PageProps {
    params: Promise<{ itemId: string }>
}

const Page = async ({ params }: PageProps) => {
    const { itemId } = await params

    const { item } = await readItemById(itemId)

    return (
        <DetailItem item={item} />
    );
}

export default Page;