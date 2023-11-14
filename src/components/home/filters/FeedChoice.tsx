'use client'
import { addToQuery, removeFromQuery } from "@/utils/helpers/formatQuery"
import styles from "./HomeFilters.module.css"
import { useRouter, useSearchParams } from "next/navigation"

interface FeedChoiceProps {
    display: "allPosts" | "postsFollowed",
    currentUserId: number
}

export const FeedChoice = ({ display, currentUserId } : FeedChoiceProps) => { 
    const searchParams = useSearchParams()
    const router = useRouter()

    return <>
        <div className={styles["recipeDisplayTab"]}>
            <button className={`${styles["recipeDisplayTabLink"]} ${styles["recipeDisplayTab--hoverEffect"]} ${styles["underline-effect"]} ${display === "allPosts" ? styles["active"] : ''}`}
            onClick={(e) => {
                e.preventDefault()
                const newQuery = removeFromQuery("following", "true", searchParams)
                router.push(newQuery, {scroll: false})
            }}>Discover</button>

            <button className={currentUserId !== 0 ? `${styles["recipeDisplayTabLink"]} ${styles["recipeDisplayTab--hoverEffect"]} ${styles["underline-effect"]} ${display === "postsFollowed" ? styles["active"] : ''}` : styles['disabledTabLink']}
            disabled={currentUserId === 0 ? true : false}
            onClick={(e) => {
                e.preventDefault()
                const newQuery = addToQuery("following", "true", searchParams)
                router.push(newQuery, {scroll: false})
            }}>My Feed</button>
        </div>
    </>
}