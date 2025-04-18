import CategoriesSection from "@/modules/home/ui/sections/category-section";
import { HomeVideoSection } from "../ui/sections/home-videos-section";

interface HomeViewProps {
  categoryId: string;
}

export const HomeView = ({ categoryId }: HomeViewProps) => {
  return (
    <div className="flex flex-col gap-y-6 px-4 pt-2.5 mb-20">
      <div className="sticky top-0 py-2 z-10 bg-white">
        <CategoriesSection categoryId={categoryId} />
      </div>
      <HomeVideoSection categoryId={categoryId} />
    </div>
  );
};
