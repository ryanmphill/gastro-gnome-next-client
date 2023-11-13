'use client'
import { Dispatch, SetStateAction, Suspense, useEffect, useState } from "react";
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

    // State to track user input in search bar
    const [searchTerms, updateSearchTerms] = useState("")
    // State to keep track of all selected categories the user wants to use to filter recipe feed
    // const [chosenCategories, updateChosenCategories] = useState<Category[]>([])

    useEffect(
        () => {
            console.log(chosenCategories)
        },[chosenCategories]
    )


    return <section className="filterContainer"> 
    <Suspense>
        <section className={styles["filterBar"]}>
            <SearchRecipes 
            searchTerms={searchTerms}
            updateSearchTerms={updateSearchTerms} />

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