"use client"

import {trpc} from "@/trpc/client";
import {Suspense} from "react";
import {ErrorBoundary} from "react-error-boundary";
import {FilterCarousel} from "@/components/filter-carousel";

interface CategorySectionProps {
    categoryId: string;
}

const CategoriesSection = ({categoryId} : CategorySectionProps) => {
    return (
        <Suspense  fallback={<p>loading ...</p>}>
            <ErrorBoundary fallback={<p>loi roi ban oi ...</p>}>
                <CategoriesSectionSuspense categoryId={categoryId} />
            </ErrorBoundary>
        </Suspense>
    )
}

const CategoriesSectionSuspense = ({categoryId}: CategorySectionProps) => {
    const [categories] = trpc.categories.getMany.useSuspenseQuery()

    const newCategories = categories.map(category => ({
        label: category.name,
        value: JSON.stringify(category.id),
    }))

    return <FilterCarousel value={categoryId} data={newCategories} />
}

export default CategoriesSection;