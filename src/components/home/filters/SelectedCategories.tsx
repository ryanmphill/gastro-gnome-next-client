'use client'
import { formatQuery, removeFromQuery } from "@/utils/helpers/formatQuery"
import { Dispatch, MouseEvent, SetStateAction } from "react"
import styles from "./HomeFilters.module.css"
import { Category } from "@/types/categoryType"
import { useRouter, useSearchParams } from "next/navigation"

interface SelectedCategoryProps {
    chosenCategories: string[]
}

export const SelectedCategories = ({ chosenCategories }
     : SelectedCategoryProps ) => {
    
    const searchParams = useSearchParams()
    const router = useRouter()

    // Handle removing a category
    const handleRemoveSelected = (evt: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>, queryToRemove: string) => {
        evt.preventDefault()

        // const updatedCategories = chosenCategories.filter(category => category.id !== queryToRemove.id)
        // updateChosenCategories(updatedCategories)

        // const copy = [ ...queryParams ]
        // // Clear any existing category queries
        // let updatedParams = copy.filter(param => !param.includes("category"))
        // // Add updated list of categories again if any exist
        // if (updatedCategories.length > 0) {
        //     updatedCategories.forEach((category) => {
        //         updatedParams.push(`category=${category.id}`)
        //     })
        // }
        // updateQueryParams( [...updatedParams ])
        // const formattedQuery = formatQuery(updatedParams)
        // fetchRecipes(formattedQuery)

        /*----------------------------------------------------------------*/
        const newQuery = removeFromQuery("category", `${queryToRemove}`, searchParams)
        router.push(newQuery, {scroll: false})
        /*----------------------------------------------------------------*/
    }

    return <>
        <div className={styles["chosenCategories"]}>
            {
                chosenCategories.length > 0
                && chosenCategories.map(categoryName => {
                    return <div className={styles["chosenCategory"]} key={`chosenCat--${categoryName}`}>
                        {categoryName}
                        <button
                            onClick={(click) => handleRemoveSelected(click, categoryName)}
                            className={styles["btn--removeFilterCat"]}
                        >X</button>
                    </div>
                })
            }
        </div>
    </>
}