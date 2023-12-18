'use client'
import { Ingredient, IngredientToAdd } from '@/types/ingredientType';
import { Dispatch, KeyboardEvent, MouseEvent, SetStateAction } from 'react';
import Select from 'react-select';
import styles from "../../recipeForm.module.css"
import { validateQuantityInput } from '@/utils/helpers/validateQuantityInput';

interface AddIngredientFormProps {
    includedIngredients: IngredientToAdd[],
    handleRemoveIngredient: (event: MouseEvent<HTMLButtonElement>, objectToRemove: IngredientToAdd) => void,
    allIngredients: Ingredient[],
    ingredientToAdd: IngredientToAdd,
    updateIngredientToAdd: Dispatch<SetStateAction<IngredientToAdd>>,
    handleAddIngredient: (event: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLInputElement>) => void,
    setShowCustom: Dispatch<SetStateAction<boolean>>
}

/**Renders a user interface and display for associating ingredients in the database with a newly created recipe as
 * part of the `form within a form`.
 * 
 * A user can select the `ingredient` via a searchable select, enter the `quantity`, and enter a `unit` for the quantity. The added ingredients
 * are displayed to the user in a small window with the option to remove them. 
  */
export const AddIngredientForm = ({
    includedIngredients, handleRemoveIngredient, allIngredients, 
    ingredientToAdd, updateIngredientToAdd, handleAddIngredient, setShowCustom 
}: AddIngredientFormProps) => {
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
                                    click.target === document.activeElement && handleRemoveIngredient(click, includedIngredient)}
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