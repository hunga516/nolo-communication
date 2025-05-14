import { readItemById } from "@/app/api/items/items.api";
import { DetailItem } from "../../../items/[itemId]/detail-item";
import Modal from "./modal";

interface PageProps {
  params: { itemId: string }
}

const Page = async ({ params }: PageProps) => {
  const { itemId } = await params

  const { item } = await readItemById(itemId)

  return (
    <Modal>
      <DetailItem item={item} />
    </Modal>
  );
}

export default Page;