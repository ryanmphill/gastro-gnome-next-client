import { Dispatch, KeyboardEvent, MouseEvent, SetStateAction, useState } from 'react';
import { AddIngredientForm } from './AddIngredientForm';
import { CustomIngredient } from '../../sharedUI/CustomIngredient';
import { Ingredient, AttachedIngredient } from '@/types/ingredientType';

interface AddIngredientsProps {
    includedIngredients: AttachedIngredient[],
    allIngredients: Ingredient[],
    updateIncludedIngredients: Dispatch<SetStateAction<AttachedIngredient[]>>
}

/** By default, renders `AddIngredientsForm` for adding existing ingredients in database to recipe.
 * Essentially, a `form` within a `form`.
 * 
 * If the user clicks the `Don't see the ingredient you're looking for?` link, this component
 * will render the form for adding a new ingredient to the database, which will then be available
 * to be added to the user's recipe.
 */
export const AddIngredients = ({ includedIngredients, allIngredients, updateIncludedIngredients }
    : AddIngredientsProps) => {
    // Set state variable for tracking if the create custom ingredient view should be shown
    const [showCustom, setShowCustom] = useState(false)

    return <>
        {
            !showCustom
                ? <AddIngredientForm
                    includedIngredients={includedIngredients}
                    updateIncludedIngredients={updateIncludedIngredients}
                    allIngredients={allIngredients}
                    setShowCustom={setShowCustom}
                />

                : <CustomIngredient
                    allIngredients={allIngredients}
                    setShowCustom={setShowCustom} />
        }
    </>
}