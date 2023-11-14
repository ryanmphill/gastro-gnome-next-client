'use client'
import { usePathname } from "next/navigation"
import { MouseEvent, startTransition, useOptimistic } from "react"
import styles from "./PostInteraction.module.css"
import { addRecipeToFavorites, removeRecipeFromFavorites } from "@/dataManagers/userManager"

interface FavoriteButtonProps {
    currentUserId: number
    recipeId: number,
    updateProfileFavs?: () => Promise<void> | undefined,
    usersFavs: number[]
}

export const FavoriteButton = ( {currentUserId, recipeId, updateProfileFavs, usersFavs} : FavoriteButtonProps ) => {
    
    const [optimisticFavs, updateOptimisticFavs] = useOptimistic(
        usersFavs,
        (_currentState, updatedFavs: number[]) => updatedFavs   
        )

    // Get the current location
    const pathname = usePathname()

    // Check if the user is viewing their profile to dynamically update the profile's list of favorites
    const viewingProfile = pathname === `/userprofile/${currentUserId}`

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