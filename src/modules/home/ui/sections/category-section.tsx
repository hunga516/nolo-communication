"use client"

import {trpc} from "@/trpc/client";
import {Suspense} from "react";
import {ErrorBoundary} from "react-error-boundary";
import {FilterCarousel} from "@/components/filter-carousel";
import {useRouter} from "next/navigation";

interface CategorySectionProps {
    categoryId: string;
}

const CategoriesSection = ({categoryId} : CategorySectionProps) => {
    return (
        <Suspense  fallback={<FilterCarousel isLoading data={[]} value={null} />}>
            <ErrorBoundary fallback={<p>loi roi ban oi ...</p>}>
                <CategoriesSectionSuspense categoryId={categoryId} />
            </ErrorBoundary>
        </Suspense>
    )
}

const CategoriesSectionSuspense = ({categoryId}: CategorySectionProps) => {
    const router = useRouter()
    const [categories] = trpc.categories.getMany.useSuspenseQuery() //useSuspenseQuery phai duoc boc o trong Suspen tag

    const newCategories = categories.map(category => ({
        label: category.name,
        value: JSON.stringify(category.id),
    }))

    const onSelect = (value?: string | null) => {
        const url = new URL(window.location.href)

        console.log(window.location.href)

        if (value) {
            url.searchParams.set("categoryId", value)
        }
        else {
            url.searchParams.delete("categoryId")
        }

        router.push(url.href)
    }

    return <FilterCarousel onSelect={onSelect} value={categoryId} data={newCategories} />
}

export default CategoriesSection;