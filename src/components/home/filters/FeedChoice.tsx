'use client'
import { formatQuery } from "@/utils/helpers/formatQuery"
import { Dispatch, SetStateAction } from "react"
import styles from "./HomeFilters.module.css"
import { useAuthContext } from "@/context/AuthContext"

interface FeedChoiceProps {
    queryParams: string[],
    updateQueryParams: Dispatch<SetStateAction<string[]>>,
    fetchRecipes: (queryParams: string) => Promise<void>,
    display: "allPosts" | "postsFollowed",
    setDisplay: Dispatch<SetStateAction<"allPosts" | "postsFollowed">>
}


export const FeedChoice = ({ queryParams, updateQueryParams, fetchRecipes, display, setDisplay } : FeedChoiceProps) => { 
    const { currentUserId } = useAuthContext()

    return <>
        <div className={styles["recipeDisplayTab"]}>
            <button className={`${styles["recipeDisplayTabLink"]} ${styles["recipeDisplayTab--hoverEffect"]} ${styles["underline-effect"]} ${display === "allPosts" ? styles["active"] : ''}`}
            onClick={(e) => {
                e.preventDefault()
                const copy = [...queryParams]
                const updatedParams = copy.filter(param => param !== "following=true")
                updateQueryParams([ ...updatedParams ])
                const formattedQuery = formatQuery(updatedParams)
                fetchRecipes(formattedQuery)
                setDisplay("allPosts")
            }}>Discover</button>

            <button className={currentUserId !== 0 ? `${styles["recipeDisplayTabLink"]} ${styles["recipeDisplayTab--hoverEffect"]} ${styles["underline-effect"]} ${display === "postsFollowed" ? styles["active"] : ''}` : styles['disabledTabLink']}
            disabled={currentUserId === 0 ? true : false}
            onClick={(e) => {
                e.preventDefault()
                const copy = [...queryParams]
                copy.push("following=true")
                updateQueryParams([ ...copy ])
                const formattedQuery = formatQuery(copy)
                fetchRecipes(formattedQuery)
                setDisplay("postsFollowed")
            }}>My Feed</button>
        </div>
    </>
}