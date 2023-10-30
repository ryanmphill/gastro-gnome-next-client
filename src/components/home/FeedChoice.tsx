'use client'
import { formatQuery } from "@/utils/helpers/formatQuery"
import { Dispatch, SetStateAction } from "react"

interface FeedChoiceProps {
    queryParams: string[],
    updateQueryParams: Dispatch<SetStateAction<string[]>>,
    fetchRecipes: (queryParams: string) => Promise<void>,
    display: "allPosts" | "postsFollowed",
    setDisplay: Dispatch<SetStateAction<"allPosts" | "postsFollowed">>
}


export const FeedChoice = ({ queryParams, updateQueryParams, fetchRecipes, display, setDisplay } : FeedChoiceProps) => { 

    return <>
        <div className="recipeDisplayTab">
            <button className={`recipeDisplayTabLink recipeDisplayTab--hoverEffect underline-effect ${display === "allPosts" ? 'active' : ''}`}
            onClick={(e) => {
                e.preventDefault()
                const copy = [...queryParams]
                const updatedParams = copy.filter(param => param !== "following=true")
                updateQueryParams(updatedParams)
                const formattedQuery = formatQuery(updatedParams)
                fetchRecipes(formattedQuery)
                setDisplay("allPosts")
            }}>Discover</button>

            <button className={`recipeDisplayTabLink recipeDisplayTab--hoverEffect underline-effect ${display === "postsFollowed" ? 'active' : ''}`}
            onClick={(e) => {
                e.preventDefault()
                const copy = [...queryParams]
                copy.push("following=true")
                updateQueryParams(copy)
                const formattedQuery = formatQuery(copy)
                fetchRecipes(formattedQuery)
                setDisplay("postsFollowed")
            }}>My Feed</button>
        </div>
    </>
}