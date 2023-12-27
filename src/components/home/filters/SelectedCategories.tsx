'use client'
import { removeFromQuery } from "@/utils/helpers/formatQuery"
import { MouseEvent } from "react"
import styles from "./HomeFilters.module.css"
import { useRouter, useSearchParams } from "next/navigation"

interface SelectedCategoryProps {
    chosenCategories: string[]
}

export const SelectedCategories = ({ chosenCategories }
    : SelectedCategoryProps) => {

    const searchParams = useSearchParams()
    const router = useRouter()

    // Handle removing a category
    const handleRemoveSelected = (evt: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>, queryToRemove: string) => {
        evt.preventDefault()
        const newQuery = removeFromQuery("category", `${queryToRemove}`, searchParams)
        router.push(newQuery, { scroll: false })
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