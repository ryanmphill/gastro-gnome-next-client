'use client'
import { formatQuery } from "@/utils/helpers/formatQuery"
import { Dispatch, MouseEvent, SetStateAction } from "react"
import styles from "./HomeFilters.module.css"
import { Category } from "@/types/categoryType"

interface SelectedCategoryProps {
    chosenCategories: Category[],
    updateChosenCategories: Dispatch<SetStateAction<Category[]>>,
    queryParams: string[],
    updateQueryParams: Dispatch<SetStateAction<string[]>>,
    fetchRecipes: (queryParams: string) => Promise<void>
}

export const SelectedCategories = ({ chosenCategories, updateChosenCategories, queryParams, updateQueryParams, fetchRecipes }
     : SelectedCategoryProps ) => {

    // Handle removing a category
    const handleRemoveSelected = (evt: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>, objectToRemove: Category) => {
        evt.preventDefault()

        const updatedCategories = chosenCategories.filter(category => category.id !== objectToRemove.id)
        updateChosenCategories(updatedCategories)

        const copy = [ ...queryParams ]
        // Clear any existing category queries
        let updatedParams = copy.filter(param => !param.includes("category"))
        // Add updated list of categories again if any exist
        if (updatedCategories.length > 0) {
            updatedCategories.forEach((category) => {
                updatedParams.push(`category=${category.id}`)
            })
        }
        updateQueryParams( [...updatedParams ])
        const formattedQuery = formatQuery(updatedParams)
        fetchRecipes(formattedQuery)
    }

    return <>
        <div className={styles["chosenCategories"]}>
            {
                chosenCategories.length > 0
                && chosenCategories.map(category => {
                    return <div className={styles["chosenCategory"]} key={`chosenCat--${category.id}`}>
                        {category.name}
                        <button
                            onClick={(click) => handleRemoveSelected(click, category)}
                            className={styles["btn--removeFilterCat"]}
                        >X</button>
                    </div>
                })
            }
        </div>
    </>
}