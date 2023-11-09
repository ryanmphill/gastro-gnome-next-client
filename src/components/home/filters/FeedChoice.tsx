'use client'
import { addToQuery, formatQuery, removeFromQuery } from "@/utils/helpers/formatQuery"
import { Dispatch, SetStateAction, Suspense } from "react"
import styles from "./HomeFilters.module.css"
import { useAuthContext } from "@/context/AuthContext"
import { useRouter, useSearchParams } from "next/navigation"

interface FeedChoiceProps {
    display: "allPosts" | "postsFollowed",
    currentUserId: number
}

export const FeedChoice = ({ display, currentUserId } : FeedChoiceProps) => { 
    const searchParams = useSearchParams()
    const router = useRouter()

    return <>
        <Suspense>
        <div className={styles["recipeDisplayTab"]}>
            <button className={`${styles["recipeDisplayTabLink"]} ${styles["recipeDisplayTab--hoverEffect"]} ${styles["underline-effect"]} ${display === "allPosts" ? styles["active"] : ''}`}
            onClick={(e) => {
                e.preventDefault()
                // const copy = [...queryParams]
                // const updatedParams = copy.filter(param => param !== "following=true")
                // updateQueryParams([ ...updatedParams ])
                // const formattedQuery = formatQuery(updatedParams)
                // fetchRecipes(formattedQuery)
                // setDisplay("allPosts")
                /*----------------------------------------------------------------*/
                const newQuery = removeFromQuery("following", "true", searchParams)
                router.push(newQuery, {scroll: false})
                /*----------------------------------------------------------------*/
            }}>Discover</button>

            <button className={currentUserId !== 0 ? `${styles["recipeDisplayTabLink"]} ${styles["recipeDisplayTab--hoverEffect"]} ${styles["underline-effect"]} ${display === "postsFollowed" ? styles["active"] : ''}` : styles['disabledTabLink']}
            disabled={currentUserId === 0 ? true : false}
            onClick={(e) => {
                e.preventDefault()
                // const copy = [...queryParams]
                // copy.push("following=true")
                // updateQueryParams([ ...copy ])
                // const formattedQuery = formatQuery(copy)
                // fetchRecipes(formattedQuery)
                // setDisplay("postsFollowed")
                /*----------------------------------------------------------------*/
                const newQuery = addToQuery("following", "true", searchParams)
                router.push(newQuery, {scroll: false})
                /*----------------------------------------------------------------*/
            }}>My Feed</button>
        </div>
        </Suspense>
    </>
}