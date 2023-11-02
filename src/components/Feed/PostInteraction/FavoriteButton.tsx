import { useAuthContext } from "@/context/AuthContext"
import { getCurrentUser } from "@/dataManagers/authManager"
import { addRecipeToFavorites, removeRecipeFromFavorites } from "@/dataManagers/recipeManager"
import { usePathname } from "next/navigation"
import { MouseEvent, useCallback, useEffect, useState } from "react"
import styles from "./PostInteraction.module.css"

interface FavoriteButtonProps {
    recipeId: number,
    updateProfileFavs?: () => Promise<void> | undefined
}

export const FavoriteButton = ( {recipeId, updateProfileFavs} : FavoriteButtonProps ) => {
    // get the current user
    const { currentUserId } = useAuthContext()

    // Get the current location
    const pathname = usePathname()

    // Check if the user is viewing their profile to dynamically update the profile's list of favorites
    const viewingProfile = pathname === `/userprofile/${currentUserId}`

    // Set a state variable for the user's favorites
    const [usersFavs, updateUsersFavs] = useState<number[]>([])

    // Define a function to fetch the current user with their favorites embedded
    const fetchUserFavs = useCallback(async () => {
        try {
            const userData = await getCurrentUser()
            const favoriteArray = userData.favorites
            updateUsersFavs(favoriteArray)
        } catch(err) {
            console.error(err)
        }
    },[])

    // Get the data for the current user's favorites
    useEffect(
        () => {
            fetchUserFavs()
        },
        [fetchUserFavs] // When this array is empty, you are observing initial component state
    )

    // Handle the click to favorite a post
    const handleFavorite = async (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        
        // POST favorite object to API ///////////////////////////////////
        try {
            await addRecipeToFavorites(recipeId)
            fetchUserFavs()
        } catch (err) {
            console.error(err)
        }
    }

    // Handle the click to unfavorite a post
    const handleUndoFavorite = async (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()

        //DELETE the favorite
        try {
            await removeRecipeFromFavorites(recipeId)
            // Update the user's list of favorites state
            if (viewingProfile && updateProfileFavs) { // If the user is on their profile, remove the recipe from view
                updateProfileFavs()
            } else { // else, change the button from 'favorited ⭐' to 'favorite ☆'
                fetchUserFavs()
            }
        } catch (err) {
            console.error(err)
        }    
    }

    /*Define a variable with a value of true if the user has already favorited this post, and false 
    if they haven't favorited this post yet*/
    const alreadyFavorited = usersFavs.some(userFav => userFav === recipeId)

    // Return the UI
    return <>
        {
            !alreadyFavorited
                ? <button className={styles["btn-secondary"]} onClick={click => handleFavorite(click)}>Favorite ☆</button>
                : <button className={styles["btn-secondary"]} id={styles["btn-faved"]} onClick={click => handleUndoFavorite(click)}>Favorited <div className={`${styles["favstar"]}`}></div></button>
        }
    </>
}