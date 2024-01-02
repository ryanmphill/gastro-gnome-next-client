import { RecipeFeed } from "@/components/Feed/RecipeFeed"
import { getCurrentUserId } from "@/dataManagers/authManagers/authManagers"
import { getAuthoredRecipes } from "@/dataManagers/recipeManagers/recipeManager"
import { getProfileInfo } from "@/dataManagers/userManager"
import styles from "../profile.module.css"

interface ProfilePostsProps {
    profileId: number
}

export const ProfileAuthoredPosts = async ({profileId} : ProfilePostsProps) => {
    const currentUserIdData = getCurrentUserId()
    const profileOwnerData = getProfileInfo(profileId)
    const authoredRecipeData = getAuthoredRecipes(profileId)

    const [
        currentUserId, 
        ownerOfProfile,
        authoredRecipes 
        ] = await Promise.all([
            currentUserIdData, 
            profileOwnerData,
            authoredRecipeData 
        ])
    
    return <>
        {
            profileId === currentUserId
                ? <h3 className={`${styles["myFeedFade"]} ${styles["feedHeader"]}`}>Recipes I&apos;ve Posted</h3>
                : <h3 className={`${styles["myFeedFade"]} ${styles["feedHeader"]}`}>Recipes {ownerOfProfile.full_name.split(" ")[0]} Has Posted</h3>
        }
        <RecipeFeed
            recipes={authoredRecipes}
            currentUserId={currentUserId} />
    </>
}