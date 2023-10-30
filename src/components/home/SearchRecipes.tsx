import { ChangeEvent, Dispatch, KeyboardEvent, MouseEvent, SetStateAction, useEffect } from "react"
import searchIcon from "../../assets/skillet-search-small.svg"
import { formatQuery } from "@/utils/helpers/formatQuery"

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
    const handleSearchClick = (evt: any) => {
        evt.preventDefault()
        const copy = [ ...queryParams ]
        // Clear any existing search queries
        let updatedParams = copy.filter(param => !param.includes("search"))
        // Add new search query if exists
        if (searchTerms !== "") {
            updatedParams.push(`search=${searchTerms}`)
        }
        updateQueryParams(updatedParams)
        const formattedQuery = formatQuery(updatedParams)
        fetchRecipes(formattedQuery)
    }

    const handleSearchChange = (e : ChangeEvent<HTMLInputElement>) => {
        updateSearchTerms(e.target.value)
        if (e.target.value === "") {
            const copy = [ ...queryParams ]
            // Clear any existing search queries
            let updatedParams = copy.filter(param => !param.includes("search"))
            updateQueryParams(updatedParams)
            const formattedQuery = formatQuery(updatedParams)
            fetchRecipes(formattedQuery)
        }
    }

    return <div className="searchBarContainer">
        <input id="RecipeSearchBar"
            onChange={
                (changeEvent) => {
                    handleSearchChange(changeEvent)
                }
            }
            onKeyDown={(evt) => evt.key === 'Enter' && evt.target === document.activeElement && handleSearchClick(evt)}
            type="text" placeholder="Find a Recipe" />
        <button className="btn--search"
            onClick={(evt) => handleSearchClick(evt)}
        ><img className="searchIcon" src={searchIcon} alt="search"></img></button>
    </div>
}