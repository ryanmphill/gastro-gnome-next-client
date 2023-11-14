'use client'
import { usePathname } from "next/navigation"
import { MouseEvent, startTransition } from "react"
import styles from "./PostInteraction.module.css"
import { addRecipeToFavorites, removeRecipeFromFavorites } from "@/dataManagers/userManager"

interface FavoriteButtonProps {
    currentUserId: number
    recipeId: number,
    updateProfileFavs?: () => Promise<void> | undefined,
    usersFavs: number[]
}

export const FavoriteButton = ( {currentUserId, recipeId, updateProfileFavs, usersFavs} : FavoriteButtonProps ) => {
    // // get the current user
    // const { currentUserId } = useAuthContext()

    // Get the current location
    const pathname = usePathname()

    // Check if the user is viewing their profile to dynamically update the profile's list of favorites
    const viewingProfile = pathname === `/userprofile/${currentUserId}`

    // // Set a state variable for the user's favorites
    // const [usersFavs, updateUsersFavs] = useState<number[]>([])

    // // Define a function to fetch the current user with their favorites embedded
    // const fetchUserFavs = useCallback(async () => {
    //     try {
    //         const userData = await getCurrentUser()
    //         const favoriteArray = userData.favorites
    //         updateUsersFavs(favoriteArray)
    //     } catch(err) {
    //         console.error(err)
    //     }
    // },[])

    // // Get the data for the current user's favorites
    // useEffect(
    //     () => {
    //         fetchUserFavs()
    //     },
    //     [fetchUserFavs] // When this array is empty, you are observing initial component state
    // )

    // Handle the click to favorite a post
    const handleFavorite = async (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()

        startTransition(() => {
            addRecipeToFavorites(recipeId)
        })
        
        // // POST favorite object to API ///////////////////////////////////
        // try {
        //     await addRecipeToFavorites(recipeId)
        //     fetchUserFavs()
        // } catch (err) {
        //     console.error(err)
        // }
    }

    // Handle the click to unfavorite a post
    const handleUndoFavorite = async (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()

        startTransition(() => {
            removeRecipeFromFavorites(recipeId)
        })

        // //DELETE the favorite
        // try {
        //     await removeRecipeFromFavorites(recipeId)
        //     // Update the user's list of favorites state
        //     if (viewingProfile && updateProfileFavs) { // If the user is on their profile, remove the recipe from view
        //         updateProfileFavs()
        //     } else { // else, change the button from 'favorited ⭐' to 'favorite ☆'
        //         fetchUserFavs()
        //     }
        // } catch (err) {
        //     console.error(err)
        // }    
    }

    /*Define a variable with a value of true if the user has already favorited this post, and false 
    if they haven't favorited this post yet*/
    const alreadyFavorited = usersFavs.some(userFav => userFav === recipeId)

    // // Original click events
    // onClick={click => handleFavorite(click)}
    // onClick={click => handleUndoFavorite(click)}

    // const addFavAction = addRecipeToFavorites.bind(null, recipeId)
    // const removeFavAction = removeRecipeFromFavorites.bind(null, recipeId)
    // Return the UI
    return <>
        {
            !alreadyFavorited
                ? <button className={styles["btn-secondary"]} onClick={click => handleFavorite(click)}>Favorite ☆</button>
                : <button className={styles["btn-secondary"]} id={styles["btn-faved"]} onClick={click => handleUndoFavorite(click)}>Favorited <div className={`${styles["favstar"]}`}></div></button>
        }
    </>
}