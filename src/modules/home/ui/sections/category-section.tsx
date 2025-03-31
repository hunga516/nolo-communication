"use client"

import {trpc} from "@/trpc/client";
import {Suspense} from "react";
import {ErrorBoundary} from "react-error-boundary";

interface CategorySectionProps {
    categoryId: string;
}

const CategoriesSection = ({categoryId} : CategorySectionProps) => {
    return (
        <Suspense fallback={<p>loading ...</p>}>
            <ErrorBoundary fallback={<p>loi roi ban oi ...</p>}>
                <CategoriesSectionSuspense categoryId={categoryId} />
            </ErrorBoundary>
        </Suspense>
    )
}

const CategoriesSectionSuspense = ({categoryId}: CategorySectionProps) => {
    const [categories] = trpc.categories.getMany.useSuspenseQuery()

    return (
        <div>
            {JSON.stringify(categories)}
        </div>
    )
}

export default CategoriesSection;