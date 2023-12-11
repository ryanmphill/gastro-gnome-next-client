import { Dispatch, KeyboardEvent, MouseEvent, SetStateAction, useState } from 'react';
import { AddIngredientForm } from './AddIngredientForm';
import { CustomIngredient } from '../../sharedUI/CustomIngredient';
import { Ingredient, IngredientToAdd } from '@/types/ingredientType';

interface AddIngredientsProps {
    includedIngredients: IngredientToAdd[],
    allIngredients: Ingredient[],
    updateIncludedIngredients: Dispatch<SetStateAction<IngredientToAdd[]>>
}

/** By default, renders `AddIngredientsForm` for adding existing ingredients in database to recipe.
 * Essentially, a `form` within a `form`.
 * 
 * If the user clicks the `Don't see the ingredient you're looking for?` link, this component
 * will render the form for adding a new ingredient to the database, which will then be available
 * to be added to the user's recipe.
 */
export const AddIngredients = ({includedIngredients, allIngredients, updateIncludedIngredients} : AddIngredientsProps) => {
    // Set state variable for tracking if the create custom ingredient view should be shown
    const [showCustom, setShowCustom] = useState(false)
    const [ingredientToAdd, updateIngredientToAdd] = useState<IngredientToAdd>(
        {
            "ingredient": 0,
            "name": "",
            "quantity": "",
            "quantity_unit": ""
        }
    )
    
    const handleAddIngredient = (event: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLInputElement>) => {
        event.preventDefault()
        // Check if required fields are entered
        if (ingredientToAdd.ingredient > 0 && ingredientToAdd.quantity.length > 0) {
            // Get a copy of the ingredientToAdd
            const copyIngToAdd = { ...ingredientToAdd }
            // Trim any whitespace on the quantity
            copyIngToAdd.quantity = ingredientToAdd.quantity.trim()
            updateIngredientToAdd(copyIngToAdd)

            // Get a copy of the current array of ingredients that are staged to be added
            const copy = [...includedIngredients]
            // Check if the ingredient has already been added
            const alreadyAdded = copy.some(ingredient => ingredient.ingredient === copyIngToAdd.ingredient)
            if (!alreadyAdded) {
                copy.push(copyIngToAdd)
                updateIncludedIngredients(copy)
            } else {
                window.alert("That ingredient has already been added")
            }
        } else {
            window.alert("Please enter an ingredient and a quantity")
        }
    }

    const handleRemoveIngredient = (event: MouseEvent<HTMLButtonElement>, objectToRemove: IngredientToAdd) => {
        event.preventDefault()
        const updatedIngredients = includedIngredients.filter(ingredient => ingredient.ingredient !== objectToRemove.ingredient)
        updateIncludedIngredients(updatedIngredients)
    }
    
    return <>
        {
            !showCustom
                ? <AddIngredientForm 
                includedIngredients={includedIngredients}
                handleRemoveIngredient={handleRemoveIngredient}
                allIngredients={allIngredients}
                ingredientToAdd={ingredientToAdd}
                updateIngredientToAdd={updateIngredientToAdd}
                handleAddIngredient={handleAddIngredient}
                setShowCustom={setShowCustom}
                />

                : <CustomIngredient
                allIngredients={allIngredients}
                setShowCustom={setShowCustom} />
        }
        
    </>
}