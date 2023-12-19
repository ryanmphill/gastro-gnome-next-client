'use client'
import { Ingredient, AttachedIngredient } from '@/types/ingredientType';
import { Dispatch, KeyboardEvent, MouseEvent, SetStateAction, useState } from 'react';
import Select from 'react-select';
import styles from "../../recipeForm.module.css"
import { validateQuantityInput } from '@/utils/helpers/validateQuantityInput';

interface AddIngredientFormProps {
    includedIngredients: AttachedIngredient[],
    updateIncludedIngredients: Dispatch<SetStateAction<AttachedIngredient[]>>,
    allIngredients: Ingredient[],
    setShowCustom: Dispatch<SetStateAction<boolean>>
}

/**Renders a user interface and display for associating ingredients in the database with a newly created recipe as
 * part of the `form within a form`.
 * 
 * A user can select the `ingredient` via a searchable select, enter the `quantity`, and enter a `unit` for the quantity. The added ingredients
 * are displayed to the user in a small window with the option to remove them. 
  */
export const AddIngredientForm = ({
    includedIngredients, updateIncludedIngredients, allIngredients, setShowCustom
}: AddIngredientFormProps) => {

    const [ingredientToAdd, updateIngredientToAdd] = useState(
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

    const handleRemoveIngredient = (event: MouseEvent<HTMLButtonElement>, objectToRemove: AttachedIngredient) => {
        event.preventDefault()
        const updatedIngredients = includedIngredients.filter(ingredient => ingredient.ingredient !== objectToRemove.ingredient)
        updateIncludedIngredients(updatedIngredients)
    }

    return <>
        <div className={`${styles["addedIngredients"]} ${styles["fadeIn"]}`}>
            {
                includedIngredients.length > 0
                && includedIngredients.map(includedIngredient => {

                    return <div className={styles["addedIngredientRow"]} key={`addedIngDetails--${includedIngredient.ingredient}`}>
                        <span className={styles["flex-column1"]}>{includedIngredient.name}</span>
                        <span className={styles["flex-column2"]}>{includedIngredient.quantity} {includedIngredient.quantity_unit}</span>
                        <span className={styles["flex-column3"]}>
                            <button data-id={includedIngredient.ingredient}
                                onClick={(click) => {
                                    click.preventDefault()
                                    click.target === document.activeElement && handleRemoveIngredient(click, includedIngredient)
                                }
                                }
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