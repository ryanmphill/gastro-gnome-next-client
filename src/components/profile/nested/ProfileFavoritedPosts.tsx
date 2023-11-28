import { RecipeFeed } from "@/components/Feed/RecipeFeed"
import { getCurrentUserId } from "@/dataManagers/authManagers/server/authManagers"
import { getFavoritedRecipes } from "@/dataManagers/recipeManagers/server/recipeManager"
import { getProfileInfo } from "@/dataManagers/userManager"
import styles from "../profile.module.css"

interface FavoritePostsProps {
    profileId: number
}

export const ProfileFavoritedPosts = async ({profileId} : FavoritePostsProps) => {
    const currentUserIdData = getCurrentUserId()
    const profileOwnerData = getProfileInfo(profileId)
    const favoritedRecipeData = getFavoritedRecipes(profileId)

    const [
        currentUserId, 
        ownerOfProfile,
        favoritedRecipes 
        ] = await Promise.all([
            currentUserIdData, 
            profileOwnerData,
            favoritedRecipeData 
        ])
    
    return <>
        {
            profileId === currentUserId
                ? <h2 className={`${styles["myFeedFade"]} ${styles["feedHeader"]}`}>My Favorite Recipes</h2>
                : <h2 className={`${styles["myFeedFade"]} ${styles["feedHeader"]}`}>Recipes {ownerOfProfile.full_name.split(" ")[0]} Has Favorited</h2>
        }
        <RecipeFeed
            recipes={favoritedRecipes}
            currentUserId={currentUserId} />
    </>
}