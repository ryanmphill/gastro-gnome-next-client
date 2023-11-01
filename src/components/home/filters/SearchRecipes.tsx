'use client'
import { ChangeEvent, Dispatch, KeyboardEvent, MouseEvent, SetStateAction } from "react"
import searchIcon from "../../../../public/assets/skillet-search-small.svg"
import { formatQuery } from "@/utils/helpers/formatQuery"
import styles from "./HomeFilters.module.css"

interface SearchRecipesProps {
    searchTerms: string,
    updateSearchTerms: Dispatch<SetStateAction<string>>,
    queryParams: string[],
    updateQueryParams: Dispatch<SetStateAction<string[]>>,
    fetchRecipes: (queryParams: string) => Promise<void>
}

export const SearchRecipes = (
    { searchTerms, updateSearchTerms, queryParams, updateQueryParams, fetchRecipes } 
    : SearchRecipesProps) => {

    // Handle the search click
    const handleSearchClick = (evt: KeyboardEvent<HTMLInputElement> | MouseEvent<HTMLButtonElement>) => {
        evt.preventDefault()
        const copy = [ ...queryParams ]
        // Clear any existing search queries
        let updatedParams = copy.filter(param => !param.includes("search"))
        // Add new search query if exists
        if (searchTerms !== "") {
            updatedParams = [ ...updatedParams, `search=${searchTerms}`]
        }
        console.log("updatedParams", updatedParams)
        updateQueryParams([ ...updatedParams ])
        const formattedQuery = formatQuery(updatedParams)
        fetchRecipes(formattedQuery)
    }

    const handleSearchChange = (e : ChangeEvent<HTMLInputElement>) => {
        updateSearchTerms(e.target.value)
        if (e.target.value === "") {
            const copy = [ ...queryParams ]
            // Clear any existing search queries
            let updatedParams = copy.filter(param => !param.includes("search"))
            updateQueryParams( [...updatedParams ])
            const formattedQuery = formatQuery(updatedParams)
            fetchRecipes(formattedQuery)
        }
    }

    return <div className={styles["searchBarContainer"]}>
        <input id={styles["RecipeSearchBar"]}
            onChange={
                (changeEvent) => {
                    handleSearchChange(changeEvent)
                }
            }
            onKeyDown={(evt) => evt.key === 'Enter' && evt.target === document.activeElement && handleSearchClick(evt)}
            type="text" placeholder="Find a Recipe" />
        <button className={styles["btn--search"]}
            onClick={(evt) => handleSearchClick(evt)}
        ><img className={styles["searchIcon"]} src={searchIcon.src} alt="search"></img></button>
    </div>
}