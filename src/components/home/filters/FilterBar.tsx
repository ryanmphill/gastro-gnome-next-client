'use client'
import { Dispatch, SetStateAction, Suspense, useEffect, useState } from "react";
import { SearchRecipes } from "./SearchRecipes";
import { FilterByCategories } from "./FilterByCategories";
import { SelectedCategories } from "./SelectedCategories";
import styles from "./HomeFilters.module.css"
import { Category } from "@/types/categoryType";

export const FilterBar = () => {

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
    <Suspense>
        <section className={styles["filterBar"]}>
            <SearchRecipes 
            searchTerms={searchTerms}
            updateSearchTerms={updateSearchTerms} />

            <FilterByCategories
            chosenCategories={chosenCategories}
            updateChosenCategories={updateChosenCategories} />
        </section>
        <SelectedCategories
        chosenCategories={chosenCategories}
        updateChosenCategories={updateChosenCategories} />
    </Suspense>
    </section>
}