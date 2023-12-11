import { getCategories } from "@/dataManagers/categoryManager"
import { getGenres } from "@/dataManagers/genreManager"
import { getIngredients } from "@/dataManagers/ingredientManager"
import { NewRecipeForm } from "./formUI/NewRecipeForm"

/**Fetches data while running on the server and renders `NewRecipeForm` */
export const NewRecipe = async () => {
    const genreData = getGenres()
    const ingredientData = getIngredients()
    const categoryData = getCategories()
    const [
        genres, 
        allIngredients, 
        allCategories
    ] = await Promise.all([
        genreData, 
        ingredientData, 
        categoryData
    ])

    return <>
    <NewRecipeForm
        genres={genres}
        allIngredients={allIngredients}
        allCategories={allCategories} />
    </>
}