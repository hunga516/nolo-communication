import CategoriesSection from "@/modules/home/ui/sections/category-section";

interface HomeViewProps {
    categoryId: string;
}

export const HomeView = ({categoryId} : HomeViewProps) => {
    return (
        <div className="max-w flex flex-col gap-y-6 bg-red-400 px-4 pt-2.5 mb-20">
            <CategoriesSection categoryId={categoryId} />
        </div>
    )
}