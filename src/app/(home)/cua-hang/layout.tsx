import { FilterCarousel } from "@/components/filter-carousel";
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
  { icon: <Swords size={24} />, url: "/img/wp.png", label: "Phương tiện", bg: "bg-red-200" },
  { icon: <Swords size={24} />, url: "/img/wp.png", label: "Vũ khí", bg: "bg-red-200" },
  { icon: <Shield size={24} />, url: "/img/armor.png", label: "Giáp", bg: "bg-blue-200" },
  { icon: <Flame size={24} />, url: "/img/magic.png", label: "Phép thuật", bg: "bg-orange-200" },
  { icon: <Heart size={24} />, url: "/img/heal.png", label: "Hồi máu", bg: "bg-pink-200" },
  { icon: <Gem size={24} />, url: "/img/accessory.png", label: "Trang sức", bg: "bg-purple-200" },
  { icon: <Skull size={24} />, url: "/img/skill.png", label: "Kỹ năng", bg: "bg-green-200" },
]

const carouselData = items.map((item) => ({
  value: item.label,
  label: item.label
}))

export default function RootLayout(props: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <div className="p-4">
      <div className="relative overflow-hidden rounded-lg w-full h-[140px]">
        <div className="absolute inset-0 bg-[url('/img/neon.jpg')] bg-cover bg-center blur-[2px]"></div>
        <div className="absolute p-6 flex items-center justify-between w-full h-full">
          <div className="flex flex-col justify-between h-full">
            <h1 className="text-white font-semibold text-4xl">Cửa hàng vật phẩm</h1>
            <Button className="text-white max-w-fit text-sm">Xem sản phẩm đang khuyến mãi</Button>
          </div>
          <div>
            <Image
              src="/img/shopping-png.png"
              alt="shopping"
              width={70}
              height={70}
              className=""
            />
          </div>
        </div>
      </div>
      {/* <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2 mt-4">
        {items.map((item, idx) => (
          <div
            key={idx}
            className={`border rounded-lg p-4 flex justify-center items-center gap-2`}
          >
            {item.icon}
            <Image
              src={`${item.url}`}
              alt={item.label}
              width={24}
              height={24}
              className="object-cover"
            />
            <p>{item.label}</p>
          </div>
        ))}
      </div> */}
      <div className="py-4 sticky z-10 bg-white top-26">
        <FilterCarousel
          value={carouselData[0].value}
          data={carouselData}
        />
      </div>
      <div>
        {props.children}
      </div>
      {props.modal}
      <div id="modal-root" />
    </div>
  );
}
