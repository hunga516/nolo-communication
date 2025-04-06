import CategoriesSection from "@/modules/home/ui/sections/category-section";

interface HomeViewProps {
  categoryId: string;
}

export const HomeView = ({ categoryId }: HomeViewProps) => {
  return (
    <div className="flex flex-col gap-y-6 px-4 pt-2.5 mb-20">
      <CategoriesSection categoryId={categoryId} />
    </div>
  );
};
