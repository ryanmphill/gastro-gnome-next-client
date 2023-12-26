'use client'
import { MouseEvent, startTransition, useOptimistic } from "react"
import styles from "./PostInteraction.module.css"
import { addRecipeToFavorites, removeRecipeFromFavorites } from "@/dataManagers/userManager"

interface FavoriteButtonProps {
    currentUserId: number
    recipeId: number,
    usersFavs: number[]
}

export const FavoriteButton = ( {currentUserId, recipeId, usersFavs} : FavoriteButtonProps ) => {
    
    const [optimisticFavs, updateOptimisticFavs] = useOptimistic(
        usersFavs,
        (_currentState, updatedFavs: number[]) => updatedFavs   
        )

    // Handle the click to favorite a post
    const handleFavorite = async (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()

        startTransition(() => {
            const optimisticCopy = [ ...usersFavs ]
            optimisticCopy.push(recipeId)
            updateOptimisticFavs([ ...optimisticCopy ])
            addRecipeToFavorites(recipeId)
        })
    }

    // Handle the click to unfavorite a post
    const handleUndoFavorite = async (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()

        startTransition(() => {
            const optimisticCopy = [ ...usersFavs ]
            optimisticCopy.filter((favId) => favId != recipeId)
            updateOptimisticFavs([ ...optimisticCopy ])
            removeRecipeFromFavorites(recipeId)
        })
    }

    /*Define a variable with a value of true if the user has already favorited this post, and false 
    if they haven't favorited this post yet*/
    const alreadyFavorited = optimisticFavs.some(userFav => userFav === recipeId)

    return <>
        {
            !alreadyFavorited
                ? <button className={styles["btn-secondary"]} onClick={click => handleFavorite(click)}>Favorite ☆</button>
                : <button className={styles["btn-secondary"]} id={styles["btn-faved"]} onClick={click => handleUndoFavorite(click)}>Favorited <div className={`${styles["favstar"]}`}></div></button>
        }
    </>
}