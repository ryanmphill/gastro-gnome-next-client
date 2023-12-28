import { getSingleRecipe } from "@/dataManagers/recipeManagers/recipeManager"
import RecipeContent from "./content/RecipeContent"
import { getCurrentUserId } from "@/dataManagers/authManagers/authManagers"
import { getCurrentUserFavorites } from "@/dataManagers/userManager"

interface RecipeProps {
    recipeId: number,
    loadNutrition: boolean
}

const Recipe = async ({ recipeId, loadNutrition }: RecipeProps) => {
    const recipeDetailData = getSingleRecipe(recipeId)
    const currentUserIdData = getCurrentUserId()
    const usersFavsData = getCurrentUserFavorites()
    const [
        recipeDetails,
        currentUserId,
        usersFavs
    ] = await Promise.all([
        recipeDetailData,
        currentUserIdData,
        usersFavsData
    ])

    return <>
        <RecipeContent
            recipeDetails={recipeDetails}
            currentUserId={currentUserId}
            recipeId={recipeId}
            usersFavs={usersFavs}
            loadNutrition={loadNutrition} />
    </>
}
export default Recipe