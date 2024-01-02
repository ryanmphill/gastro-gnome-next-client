'use client'
import { ChangeEvent, KeyboardEvent, MouseEvent, useState } from "react"
import searchIcon from "../../../../public/assets/skillet-search-small.svg"
import { clearSearchFromQuery, updateSearchInQuery } from "@/utils/helpers/formatQuery"
import styles from "./HomeFilters.module.css"
import { useRouter, useSearchParams } from "next/navigation"
import Image from "next/image"

export const SearchRecipes = () => {
    // State to track user input in search bar
    const [searchTerms, updateSearchTerms] = useState("")
    const searchParams = useSearchParams()
    const router = useRouter()

    // Handle the search click
    const handleSearchClick = (evt: KeyboardEvent<HTMLInputElement> | MouseEvent<HTMLButtonElement>) => {
        evt.preventDefault()
        const newQuery = updateSearchInQuery(searchTerms, searchParams)
        router.push(newQuery, { scroll: false })
    }

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        updateSearchTerms(e.target.value)
        if (e.target.value === "") {
            const newQuery = clearSearchFromQuery(searchParams)
            router.push(newQuery, { scroll: false })
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
        ><Image className={styles["searchIcon"]} src={searchIcon} alt="search"></Image></button>
    </div>
}