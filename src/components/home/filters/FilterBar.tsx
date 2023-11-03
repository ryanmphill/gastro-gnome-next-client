'use client'
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { SearchRecipes } from "./SearchRecipes";
import { FilterByCategories } from "./FilterByCategories";
import { SelectedCategories } from "./SelectedCategories";
import styles from "./HomeFilters.module.css"
import { Category } from "@/types/categoryType";

interface FilterBarProps {
    queryParams: string[],
    updateQueryParams: Dispatch<SetStateAction<string[]>>,
    fetchRecipes: (queryParams: string) => Promise<void>
}

export const FilterBar = ({ queryParams, updateQueryParams, fetchRecipes } : FilterBarProps) => {

    // State to track user input in search bar
    const [searchTerms, updateSearchTerms] = useState("")
    // State to keep track of all selected categories the user wants to use to filter recipe feed
    const [chosenCategories, updateChosenCategories] = useState<Category[]>([])

    useEffect(
        () => {
            console.log(chosenCategories)
        },[chosenCategories]
    )


    return <section className="filterContainer"> 
        <section className={styles["filterBar"]}>
            <SearchRecipes 
            searchTerms={searchTerms}
            updateSearchTerms={updateSearchTerms}
            queryParams={queryParams}
            updateQueryParams={updateQueryParams} 
            fetchRecipes={fetchRecipes} />

            <FilterByCategories
            chosenCategories={chosenCategories}
            updateChosenCategories={updateChosenCategories}
            queryParams={queryParams}
            updateQueryParams={updateQueryParams} 
            fetchRecipes={fetchRecipes} />
        </section>
        <SelectedCategories
        chosenCategories={chosenCategories}
        updateChosenCategories={updateChosenCategories}
        queryParams={queryParams}
        updateQueryParams={updateQueryParams} 
        fetchRecipes={fetchRecipes} />
    </section>
}