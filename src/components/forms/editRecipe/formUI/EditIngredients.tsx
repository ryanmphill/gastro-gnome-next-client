'use client'
import { AttachedIngredient, Ingredient } from "@/types/ingredientType"
import { Dispatch, KeyboardEvent, MouseEvent, SetStateAction, useState } from "react"
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

export const EditIngredients = ({ ingredientsToPost, allIngredients, updateIngredientsToPost,
    initialIngredients, ingredientsToDelete, updateIngredientsToDelete
}: EditIngredientsProps) => {
    // Set state variable for tracking if the create custom ingredient view should be shown
    const [showCustom, setShowCustom] = useState(false)
    const [ingredientToAdd, updateIngredientToAdd] = useState<AttachedIngredient>(
        {
            "ingredient": 0,
            "name": "",
            "quantity": "",
            "quantity_unit": ""
        }
    )

    const handleAddIngredient = (event: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLInputElement>) => {
        event.preventDefault()
        // Check if required fields have been entered
        if (ingredientToAdd.ingredient > 0 && ingredientToAdd.quantity.length > 0) {
            // Get a copy of the ingredientToAdd
            const copyIngToAdd = { ...ingredientToAdd }
            // Trim any whitespace on the quantity
            copyIngToAdd.quantity = ingredientToAdd.quantity.trim()
            updateIngredientToAdd(copyIngToAdd)

            // Get a copy of the current array of ingredients that are staged to be added
            const copy = [...ingredientsToPost]
            // Check if the ingredient has already been added
            const alreadyAdded = copy.some(ingredient => ingredient.ingredient === copyIngToAdd.ingredient)
            const stagedFordeletion = ingredientsToDelete.some(ingredient => ingredient.ingredient === copyIngToAdd.ingredient)
            const inInitialRecipe = initialIngredients.some(ingredient => ingredient.ingredient === copyIngToAdd.ingredient)
            if (!alreadyAdded && !inInitialRecipe) { // If not already staged to post and not in initial recipe, add to array to post
                copy.push(copyIngToAdd)
                updateIngredientsToPost(copy)
            } else if (inInitialRecipe && stagedFordeletion && !alreadyAdded) { // If in initial recipe but staged for deletion, allow user to add new ingredient to edit quantity/measure
                copy.push(copyIngToAdd)
                updateIngredientsToPost(copy)
            } else {
                window.alert("That ingredient has already been added")
            }
        } else {
            window.alert("Please enter an ingredient and a quantity")
        }
    }

    /**Removes a recently added ingredient that was not originally on recipe */
    const handleRemoveIngredient = (event: MouseEvent<HTMLButtonElement>, objectToRemove: AttachedIngredient) => {
        event.preventDefault()
        const updatedIngredients = ingredientsToPost.filter(ingredient => ingredient.ingredient !== objectToRemove.ingredient)
        updateIngredientsToPost(updatedIngredients)
    }

    /**Stages ingredient originally on recipe for deletion */
    const handleDeleteExistingIngredient = (event: MouseEvent<HTMLButtonElement>, objectToDelete: AttachedIngredient) => {
        event.preventDefault()

        // Get a copy of the current array of ingredients that are staged to be deleted
        const copy = [...ingredientsToDelete]

        // Check if the ingredient has already been staged for deletion
        const alreadyStaged = copy.some(ingredient => ingredient.ingredient === objectToDelete.ingredient)

        if (!alreadyStaged) {
            copy.push(objectToDelete)
            updateIngredientsToDelete(copy)
        } else {
            window.alert("Ingredient already marked for deletion")
        }

    }

    /**Unstages ingredient that was originally on recipe and has been staged for deletion */
    const handleUndoDelete = (event: MouseEvent<HTMLButtonElement>, objectToUndo: AttachedIngredient) => {
        event.preventDefault()
        // Get a copy of the current array of ingredients that are staged to be added and deleted
        const addedIngCopy = [...ingredientsToPost]
        const IngToDeleteCopy = [...ingredientsToDelete]
        // Check if the same ingredient has been added since being staged for deletion
        const changesMadeToIngredient = addedIngCopy.some(ingredient => ingredient.ingredient === objectToUndo.ingredient)

        if (changesMadeToIngredient) { // If changes for this ingredient have been added
            // Remove the new ingredient object with the changes
            const updatedIngredientsToPost = addedIngCopy.filter(ingredient => ingredient.ingredient !== objectToUndo.ingredient)
            updateIngredientsToPost(updatedIngredientsToPost)
            // Then, remove the ingredient object from the ingredients array staged for deletion
            const updatedIngredientsToRemove = IngToDeleteCopy.filter(ingredient => ingredient.ingredient !== objectToUndo.ingredient)
            updateIngredientsToDelete(updatedIngredientsToRemove)
        } else { // else, only remove the ingredient object from the ingredients array staged for deletion
            const updatedIngredientsToRemove = IngToDeleteCopy.filter(ingredient => ingredient.ingredient !== objectToUndo.ingredient)
            updateIngredientsToDelete(updatedIngredientsToRemove)
        }

    }

    /**Checks if an ingredient has been marked for deletion. Returns true or false */ 
    const markedForDeletion = (ingredientObject: AttachedIngredient) => {
        const alreadyStaged = ingredientsToDelete.some(ingredient => ingredient.ingredient === ingredientObject.ingredient)
        return alreadyStaged
    }

    return <>
        {
            !showCustom
                ? <EditIngredientForm
                    initialIngredients={initialIngredients}
                    allIngredients={allIngredients}
                    markedForDeletion={markedForDeletion}
                    handleUndoDelete={handleUndoDelete}
                    handleDeleteExistingIngredient={handleDeleteExistingIngredient}
                    handleRemoveIngredient={handleRemoveIngredient}
                    ingredientsToPost={ingredientsToPost}
                    ingredientToAdd={ingredientToAdd}
                    updateIngredientToAdd={updateIngredientToAdd}
                    handleAddIngredient={handleAddIngredient}
                    setShowCustom={setShowCustom} />

                : <CustomIngredient
                    allIngredients={allIngredients}
                    setShowCustom={setShowCustom} />
        }

    </>
}