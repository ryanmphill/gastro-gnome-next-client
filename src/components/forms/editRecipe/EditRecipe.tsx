import { authorizedToEditRecipe } from "@/dataManagers/authManagers/server/authManagers"
import { getCategories } from "@/dataManagers/categoryManager"
import { getGenres } from "@/dataManagers/genreManager"
import { getIngredients } from "@/dataManagers/ingredientManager"
import { getSingleRecipe } from "@/dataManagers/recipeManagers/server/recipeManager"
import { notFound } from "next/navigation"

/**Fetches data while running on the server and renders `EditRecipeForm`. 
 * 
 * If logged in user is not authorized to edit recipe, redirects to 404 page.
 * 
 * If user is not logged in, redirects to login page
 */
export const EditRecipe = async ({recipeId} : {recipeId: number}) => {
    const genreData = getGenres()
    const ingredientData = getIngredients()
    const categoryData = getCategories()
    const recipeDetailData = getSingleRecipe(recipeId)
    const authorizedToEditData = authorizedToEditRecipe(recipeId)
    
    const [
        genres, 
        allIngredients, 
        allCategories,
        recipeDetails,
        isAuthorizedToEdit
    ] = await Promise.all([
        genreData, 
        ingredientData, 
        categoryData,
        recipeDetailData,
        authorizedToEditData
    ])
    if (isAuthorizedToEdit) {
        return <>
        <div>Authorized to edit recipe with title: {recipeDetails.title}</div>
        {/* <EditRecipeForm
            recipeId={recipeId}
            genres={genres}
            allIngredients={allIngredients}
            allCategories={allCategories} /> */}
        </>
    } else {
        notFound()
    }
}