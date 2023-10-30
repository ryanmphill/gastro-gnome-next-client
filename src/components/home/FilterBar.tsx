'use client'
import { Dispatch, SetStateAction, useState } from "react";
import { SearchRecipes } from "./SearchRecipes";
import { FilterByCategories } from "./FilterByCategories";
import { SelectedCategories } from "./SelectedCategories";

interface FilterBarProps {
    queryParams: string[],
    updateQueryParams: Dispatch<SetStateAction<string[]>>,
    fetchRecipes: (queryParams: string) => Promise<void>
}

interface Category {
    id: number,
    name: string,
    category_type: number,
    category_type_label: string
}

export const FilterBar = ({ queryParams, updateQueryParams, fetchRecipes } : FilterBarProps) => {

    // State to track user input in search bar
    const [searchTerms, updateSearchTerms] = useState("")
    // State to keep track of all selected categories the user wants to use to filter recipe feed
    const [chosenCategories, updateChosenCategories] = useState<Category[]>([])


    return <section className="filterContainer"> 
        <section className="filterBar">
            <SearchRecipes 
            searchTerms={searchTerms}
            updateSearchTerms={updateSearchTerms}
            queryParams={queryParams}
            updateQueryParams={updateQueryParams} 
            fetchRecipes={fetchRecipes} />

            <FilterByCategories
            searchTerms={searchTerms}
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