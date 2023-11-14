import { Suspense } from "react";
import { SearchRecipes } from "./SearchRecipes";
import { FilterByCategories } from "./FilterByCategories";
import { SelectedCategories } from "./SelectedCategories";
import styles from "./HomeFilters.module.css"
import { Category, CategoryType } from "@/types/categoryType";

interface FilterBarProps {
    categories: Category[],
    categoryTypes: CategoryType[],
    chosenCategories: string[]
}

export const FilterBar = ({ categories, categoryTypes, chosenCategories } : FilterBarProps) => {

    return <section className="filterContainer"> 
    <Suspense>
        <section className={styles["filterBar"]}>
            <SearchRecipes />

            <FilterByCategories
            chosenCategories={chosenCategories}
            categories={categories}
            categoryTypes={categoryTypes} />
        </section>
        <SelectedCategories
        chosenCategories={chosenCategories} />
    </Suspense>
    </section>
}