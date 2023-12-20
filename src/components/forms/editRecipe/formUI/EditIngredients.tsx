'use client'
import { AttachedIngredient, Ingredient } from "@/types/ingredientType"
import { Dispatch, SetStateAction, useState } from "react"
import { CustomIngredient } from "../../sharedUI/CustomIngredient"
import { EditIngredientForm } from "./EditIngredientForm"

interface EditIngredientsProps {
    ingredientsToPost: AttachedIngredient[],
    allIngredients: Ingredient[],
    updateIngredientsToPost: Dispatch<SetStateAction<AttachedIngredient[]>>,
    initialIngredients: AttachedIngredient[],
    ingredientsToDelete: AttachedIngredient[],
    updateIngredientsToDelete: Dispatch<SetStateAction<AttachedIngredient[]>>
}

/** By default, renders `EditIngredientsForm` for editing ingredients related to recipe.
 * Essentially, a `form` within a `form`.
 * 
 * If the user clicks the `Don't see the ingredient you're looking for?` link, this component
 * will render the form for adding a new ingredient to the database, which will then be available
 * to be added to the user's recipe.
 */
export const EditIngredients = ({ ingredientsToPost, allIngredients, updateIngredientsToPost,
    initialIngredients, ingredientsToDelete, updateIngredientsToDelete
}: EditIngredientsProps) => {
    // Set state variable for tracking if the create custom ingredient view should be shown
    const [showCustom, setShowCustom] = useState(false)

    return <>
        {
            !showCustom
                ? <EditIngredientForm
                    initialIngredients={initialIngredients}
                    allIngredients={allIngredients}
                    ingredientsToPost={ingredientsToPost}
                    ingredientsToDelete={ingredientsToDelete}
                    updateIngredientsToPost={updateIngredientsToPost}
                    updateIngredientsToDelete={updateIngredientsToDelete}
                    setShowCustom={setShowCustom} />

                : <CustomIngredient
                    allIngredients={allIngredients}
                    setShowCustom={setShowCustom} />
        }

    </>
}