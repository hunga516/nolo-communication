import { Button } from "@/components/ui/button";
import {
  Swords,
  Shield,
  Flame,
  Heart,
  Gem,
  Skull,
} from "lucide-react"
import Image from "next/image";

export const metadata = {
  title: 'NextGram',
  description:
    'A sample Next.js app showing dynamic routing with modals as a route.',
};

const items = [
  { icon: <Swords size={24} />, label: "Vũ khí", bg: "bg-red-200" },
  { icon: <Shield size={24} />, label: "Giáp", bg: "bg-blue-200" },
  { icon: <Flame size={24} />, label: "Phép thuật", bg: "bg-orange-200" },
  { icon: <Heart size={24} />, label: "Hồi máu", bg: "bg-pink-200" },
  { icon: <Gem size={24} />, label: "Trang sức", bg: "bg-purple-200" },
  { icon: <Skull size={24} />, label: "Kỹ năng", bg: "bg-green-200" },
]

export default function RootLayout(props: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <div className="p-4">
      <div className="relative overflow-hidden rounded-lg w-full h-[200px] bg-[url(/img/background-grid-white.jpg)] bg-cover bg-center">
        <div className="p-8 flex items-center justify-between h-full">
          <div className="flex flex-col justify-between h-full">
            <h1 className="text-black font-semibold text-4xl">Cửa hàng vật phẩm</h1>
            <Button className="text-white max-w-fit">Xem sản phẩm đang khuyến mãi</Button>
          </div>
          <div>
            <Image
              src="/img/shopping-png.png"
              alt="shopping"
              width={120}
              height={100}
              className="object-cover"
            />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2 mt-4">
        {items.map((item, idx) => (
          <div
            key={idx}
            className={`${item.bg} rounded-lg p-4 flex flex-col justify-center items-center gap-2`}
          >
            {item.icon}
            <p>{item.label}</p>
          </div>
        ))}
      </div>
      {props.children}
      {props.modal}
      <div id="modal-root" />
    </div>
  );
}
