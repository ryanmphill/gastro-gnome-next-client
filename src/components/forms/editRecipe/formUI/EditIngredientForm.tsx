'use client'
import { AttachedIngredient, Ingredient } from '@/types/ingredientType';
import { validateQuantityInput } from '@/utils/helpers/validateQuantityInput';
import { Dispatch, KeyboardEvent, MouseEvent, SetStateAction, useState } from 'react';
import Select from 'react-select';
import styles from "../../recipeForm.module.css"

interface EditIngredientFormProps {
    initialIngredients: AttachedIngredient[],
    allIngredients: Ingredient[],
    ingredientsToPost: AttachedIngredient[],
    ingredientsToDelete: AttachedIngredient[],
    updateIngredientsToPost: Dispatch<SetStateAction<AttachedIngredient[]>>,
    updateIngredientsToDelete: Dispatch<SetStateAction<AttachedIngredient[]>>,
    setShowCustom: Dispatch<SetStateAction<boolean>>
}

/**Renders a user interface and display for editing ingredients in the database associated with recipe as
 * part of the `form within a form`.
 * 
 * A user can select the `ingredient` via a searchable select, enter the `quantity`, and enter a `unit` for the quantity. The added ingredients
 * are displayed to the user in a small window with the option to remove them.
 * 
 * Newly added ingredients are presented to the user with a green highlight, deleted ingredients with a red highlight,
 * and unchanged ingredients remain neutral. 
  */
export const EditIngredientForm = ({ initialIngredients, allIngredients, ingredientsToPost, ingredientsToDelete, 
    updateIngredientsToPost, updateIngredientsToDelete, setShowCustom }: EditIngredientFormProps) => {

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
        <div className={styles["addedIngredients"]}>
            { /*Initial ingredients already attached to the recipe card*/
                initialIngredients.length > 0
                && initialIngredients.map(initialIngredient => {
                    return <div key={`displayInitIng--${initialIngredient.ingredient}`}>
                        { // If user has marked for delete, display with red highlight and show 'undo' button
                            markedForDeletion(initialIngredient)
                                ?
                                <div className={`${styles["addedIngredientRow"]} ${styles["ingredientToDelete"]}`} key={`initialIngDetails1--${initialIngredient.ingredient}`}>
                                    <span className={styles["flex-column1"]}>{initialIngredient.name}</span>
                                    <span className={styles["flex-column2"]}>{initialIngredient.quantity} {initialIngredient.quantity_unit}</span>
                                    <span className={`${styles["flex-column3"]} ${styles["deleteStamp"]}`}>
                                        Marked for Deletion <button
                                            onClick={(click) => {
                                                click.preventDefault()
                                                click.target === document.activeElement && handleUndoDelete(click, initialIngredient)
                                            }}
                                            className={styles["btn--undoDelete"]}>Undo</button>
                                    </span>
                                </div>

                                : /*Else, display with neutral color and delete button */
                                <div className={styles["addedIngredientRow"]} key={`initialIngDetails2--${initialIngredient.ingredient}`}>
                                    <span className={styles["flex-column1"]}>{initialIngredient.name}</span>
                                    <span className={styles["flex-column2"]}>{initialIngredient.quantity} {initialIngredient.quantity_unit}</span>
                                    <span className={styles["flex-column3"]}>
                                        <button data-id={initialIngredient.ingredient}
                                            onClick={(click) => {
                                                click.preventDefault()
                                                click.target === document.activeElement && handleDeleteExistingIngredient(click, initialIngredient)
                                            }}
                                            key={`btn--dltIng2${initialIngredient.ingredient}`}
                                            className={styles["btn--removeItem"]}>X</button>
                                    </span>
                                </div>
                        }
                    </div>
                })
            }

            {   /*New ingredients being added to recipe card by user, displayed with green highlight*/
                ingredientsToPost.length > 0
                && ingredientsToPost.map(includedIngredient => {
                    return <div className={`${styles["addedIngredientRow"]} ${styles["addedIngredientRow--editForm"]}`} key={`addedIngDetails--${includedIngredient.ingredient}`}>
                        <span className={styles["flex-column1"]}>{includedIngredient.name}</span>
                        <span className={styles["flex-column2"]}>{includedIngredient.quantity} {includedIngredient.quantity_unit}</span>
                        <span className={styles["flex-column3"]}>
                            <button data-id={includedIngredient.ingredient}
                                onClick={(click) => {
                                    click.preventDefault()
                                    click.target === document.activeElement && handleRemoveIngredient(click, includedIngredient)
                                }}
                                key={`btnremIng--${includedIngredient.ingredient}`}
                                className={styles["btn--removeItem"]}>X</button>
                        </span>
                    </div>
                })
            }
        </div>
        <section className={styles["ingredientInputContainer"]}>
            <div className={`form-group ${styles["ingredientSelectContainer"]} ${styles["ingredientInputs"]}`}>
                <label>Choose Ingredient:
                    <Select
                        className="ingredient--control--select"
                        classNamePrefix="ingredient-select"
                        id="ingredientChoices"
                        instanceId="ingredientChoices"
                        options={allIngredients}
                        onChange={(selectedOption) => {
                            const copy = { ...ingredientToAdd }
                            copy.ingredient = selectedOption?.id ?? 0
                            copy.name = selectedOption?.name ?? ""
                            updateIngredientToAdd(copy)
                        }}
                        getOptionLabel={(option) => option.name}
                        getOptionValue={(option) => String(option.id)}
                        placeholder="Select an Ingredient"
                    />
                </label>
            </div>
            <div className={`form-group ${styles["ingredientInputs"]}`}>
                <label htmlFor="ingredientQuantity_input">Quantity:</label>
                <input
                    type="text"
                    className={styles["ingredient--control"]}
                    placeholder="Enter a quantity"
                    id="ingredientQuantity_input"
                    value={ingredientToAdd.quantity}
                    onKeyDown={(evt) => evt.key === 'Enter' && evt.target === document.activeElement && handleAddIngredient(evt)}
                    onChange={
                        (changeEvent) => {
                            const copy = { ...ingredientToAdd }
                            const inputValue = changeEvent.target.value
                            // If the typed in value is a decimal OR a fraction, update ingredientToAdd, else, value remains unchanged
                            copy.quantity = validateQuantityInput(changeEvent) ? inputValue : ingredientToAdd.quantity
                            updateIngredientToAdd(copy) // Updating ingredient quantity with value of copy
                        }
                    } />
            </div>
            <div className={`form-group ${styles["ingredientInputs"]}`}>
                <label htmlFor="quantityType_input">Unit:</label>
                <input
                    type="text"
                    className={styles["ingredient--control"]}
                    placeholder="Enter a unit of measurement"
                    id="quantityType_input"
                    value={ingredientToAdd.quantity_unit}
                    onKeyDown={(evt) => evt.key === 'Enter' && evt.target === document.activeElement && handleAddIngredient(evt)}
                    onChange={
                        (changeEvent) => {
                            const copy = { ...ingredientToAdd }
                            copy.quantity_unit = changeEvent.target.value
                            updateIngredientToAdd(copy) // Updating recipe with value of copy
                        }
                    } />
            </div>
        </section>
        <button className={styles["btn-secondary"]} id={styles["btn--addIngredient"]}
            onClick={
                (event) => {
                    event.preventDefault()
                    event.target === document.activeElement && handleAddIngredient(event)
                }
            }
        >Add Ingredient</button>

        <button id={styles["btn--showCustom"]}
            onClick={
                (e) => {
                    e.preventDefault()
                    setShowCustom(true)
                }
            }
        >Don't see the ingredient you're looking for?</button>
    </>
}