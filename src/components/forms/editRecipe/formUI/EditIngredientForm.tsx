'use client'
import { AttachedIngredient, Ingredient, IngredientToAdd } from '@/types/ingredientType';
import { validateQuantityInput } from '@/utils/helpers/validateQuantityInput';
import { Dispatch, KeyboardEvent, MouseEvent, SetStateAction } from 'react';
import Select from 'react-select';
import styles from "../../recipeForm.module.css"

interface EditIngredientFormProps {
    initialIngredients: IngredientToAdd[],
    allIngredients: Ingredient[],
    markedForDeletion: (ingredientObject: IngredientToAdd) => boolean,
    handleUndoDelete: (event: MouseEvent<HTMLButtonElement>, objectToUndo: IngredientToAdd) => void,
    handleDeleteExistingIngredient: (event: MouseEvent<HTMLButtonElement>, objectToDelete: IngredientToAdd) => void,
    handleRemoveIngredient: (event: MouseEvent<HTMLButtonElement>, objectToRemove: IngredientToAdd) => void,
    ingredientsToPost: IngredientToAdd[],
    ingredientToAdd: IngredientToAdd,
    updateIngredientToAdd: Dispatch<SetStateAction<IngredientToAdd>>,
    handleAddIngredient: (event: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLInputElement>) => void,
    setShowCustom: Dispatch<SetStateAction<boolean>>
}

export const EditIngredientForm = ({ initialIngredients, allIngredients, markedForDeletion, handleUndoDelete,
    handleDeleteExistingIngredient, handleRemoveIngredient, ingredientsToPost, ingredientToAdd,
    updateIngredientToAdd, handleAddIngredient, setShowCustom }: EditIngredientFormProps) => {

    return <>
        <div className={styles["addedIngredients"]}>
            { /*Initial ingredients already attached to the recipe card*/
                initialIngredients.length > 0
                && initialIngredients.map(initialIngredient => {
                    return <div key={`displayInitIng--${initialIngredient.ingredient}`}>
                        { // If user has marked for delete, show 'undo' button
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

                                :
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

            {   /*New ingredients being added to recipe card by user*/
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
                    required
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
                    required
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