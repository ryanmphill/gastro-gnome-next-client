'use client'
import { Category } from "@/types/categoryType"
import { Genre } from "@/types/genreType"
import { Ingredient } from "@/types/ingredientType"
import { Recipe } from "@/types/recipeType"
import { useState } from "react"
import { EditIngredients } from "./EditIngredients"
import { EditCategories } from "./EditCategories"
import styles from "../../recipeForm.module.css"
import { editRecipe } from "@/dataManagers/recipeManagers/recipeManager"
import { useEditedIngredientContext } from "@/context/EditedIngredientContext"
import { useEditedCategoryContext } from "@/context/EditedCategoryContext"

interface EditRecipeFormProps {
    recipeId: number,
    genres: Genre[],
    allIngredients: Ingredient[],
    allCategories: Category[],
    recipeDetails: Recipe
}

/**Renders form elements and maintains state related to editing a recipe. 
 * When a user is ready to submit, performs server mutation and makes PUT request to API.
 */
export const EditRecipeForm = ({ recipeId, genres, allIngredients, allCategories, recipeDetails }: EditRecipeFormProps) => {

    /* Define and set state variable for the recipe object to be edited,
       the initial ingredient and category relationships, ingredient and category relationships 
       to be posted, and the ingredient and category relationships to be deleted */
    const [recipe, updateRecipe] = useState(
        {
            "title": recipeDetails.title,
            "genreId": recipeDetails.genre.id,
            "description": recipeDetails.description,
            "prepInstructions": recipeDetails.prep_instructions,
            "cookInstructions": recipeDetails.cook_instructions,
            "prepTime": recipeDetails.prep_time,
            "cookTime": recipeDetails.cook_time,
            "servingSize": recipeDetails.serving_size,
            "note": recipeDetails.note,
            "image": recipeDetails.image
        }
    )
    const { ingredientsToDelete, ingredientsToPost } = useEditedIngredientContext()
    const { categoriesToDelete, categoriesToPost } = useEditedCategoryContext()
    const initialCategories = [...recipeDetails.categories]
    const initialIngredients = [...recipeDetails.included_ingredients]

    const relationshipData = {
        initialIngredients,
        ingredientsToPost,
        ingredientsToDelete,
        initialCategories,
        categoriesToPost,
        categoriesToDelete
    }

    // The server action that makes the PUT request will take the formData object as an argument by default,
    // but the formData does not contain the data for ingredients, categories, or recipeId since the values aren't
    // being stored in a form field.
    // The `bind` method is being used here to add additional preset arguments to the function call, with
    // `null` being provided for the `this` parameter.
    const editAction = editRecipe.bind(null, recipeId, relationshipData)

    return <>
        <main>
            <form action={editAction} className={`${styles["postRecipeForm"]} ${styles["fadeIn"]}`}>
                <h2 className={styles["postRecipeForm__title"]}>Edit Your Recipe</h2>
                <fieldset>
                    <label htmlFor="recipeTitle__input">Recipe Title:</label>
                    <input
                        required autoFocus
                        type="text"
                        className={styles["recipeForm--control"]}
                        name="title"
                        placeholder="Add a title"
                        id="recipeTitle__input"
                        value={recipe.title}
                        onChange={
                            (changeEvent) => {
                                const copy = { ...recipe }
                                copy.title = changeEvent.target.value
                                updateRecipe(copy) // Updating recipe title with value of copy
                            }
                        } />
                </fieldset>

                <fieldset>
                    <label htmlFor="genre_dropdown">What course is this recipe?:</label>
                    <select
                        className={styles["recipeForm--control"]}
                        name="genre"
                        id="genre_dropdown"
                        value={recipe.genreId}
                        onChange={(changeEvent) => {
                            const copy = { ...recipe };
                            copy.genreId = parseInt(changeEvent.target.value);
                            updateRecipe(copy); // Updating recipe with value of copy
                        }}
                    >   {/*Add options for choosing a genre*/}
                        <option value="0">Select a course</option>
                        {
                            genres.map(genre => <option value={genre.id} key={`genre--${genre.id}`}>{genre.name}</option>)
                        }
                    </select>
                </fieldset>

                <fieldset>
                    <label htmlFor="recipeDescription_input">Description:</label>
                    <textarea
                        required
                        className={`${styles["recipeForm--control"]} ${styles["recipe--textarea"]}`}
                        name="description"
                        placeholder="Add a description for your recipe"
                        id="recipeDescription_input"
                        value={recipe.description}
                        onChange={
                            (changeEvent) => {
                                const copy = { ...recipe }
                                copy.description = changeEvent.target.value
                                updateRecipe(copy) // Updating recipe with value of copy
                            }
                        } />
                </fieldset>

                <section id={styles["addIngredients"]}>
                    <EditIngredients
                        allIngredients={allIngredients}
                        initialIngredients={initialIngredients} />
                </section>

                <fieldset>
                    <label htmlFor="recipePrep_input">Preparation:</label>
                    <textarea
                        required
                        className={`${styles["recipeForm--control"]} ${styles["recipe--textarea"]}`}
                        name="prepInstructions"
                        placeholder="Add preparation instructions for your recipe"
                        id="recipePrep_input"
                        value={recipe.prepInstructions}
                        onChange={
                            (changeEvent) => {
                                const copy = { ...recipe }
                                copy.prepInstructions = changeEvent.target.value
                                updateRecipe(copy) // Updating recipe with value of copy
                            }
                        } />
                </fieldset>

                <fieldset>
                    <label htmlFor="recipeCook_input">Cooking Instructions:</label>
                    <textarea
                        required
                        className={`${styles["recipeForm--control"]} ${styles["recipe--textarea"]}`}
                        name="cookInstructions"
                        placeholder="Add cooking instructions for your recipe"
                        id="recipeCook_input"
                        value={recipe.cookInstructions}
                        onChange={
                            (changeEvent) => {
                                const copy = { ...recipe }
                                copy.cookInstructions = changeEvent.target.value
                                updateRecipe(copy) // Updating recipe with value of copy
                            }
                        } />
                </fieldset>

                <fieldset className={styles["recipeTimes"]}>
                    <div className={`form-group ${styles["recipeTime--div"]}`}>
                        <label htmlFor="prepTime_input">Prep Time:</label>
                        <input
                            required
                            type="number"
                            className={`${styles["recipeForm--control"]} ${styles["recipeTime--input"]}`}
                            name="prepTime"
                            placeholder="Enter a time"
                            id="prepTime_input"
                            value={recipe.prepTime > 0 ? recipe.prepTime : ""} // If value is is zero, change to empty string to display placeholder text by default instead of zero
                            onWheel={(event) => event.currentTarget.blur()} // Remove focus from the input on wheel event
                            onChange={
                                (changeEvent) => {
                                    const copy = { ...recipe }
                                    copy.prepTime = changeEvent.target.value !== "" ? Math.round(parseFloat(changeEvent.target.value) * 100) / 100 : 0
                                    updateRecipe(copy) // Updating time with value of copy
                                }
                            } />
                    </div>
                    <div className={`form-group ${styles["recipeTime--div"]}`}>
                        <label htmlFor="cookTime_input">Cooking Time:</label>
                        <input
                            required
                            type="number"
                            className={`${styles["recipeForm--control"]} ${styles["recipeTime--input"]}`}
                            name="cookTime"
                            placeholder="Enter a time"
                            id="cookTime_input"
                            value={recipe.cookTime > 0 ? recipe.cookTime : ""} // If value is is zero, change to empty string to display placeholder text by default instead of zero
                            onWheel={(event) => event.currentTarget.blur()} // Remove focus from the input on wheel event
                            onChange={
                                (changeEvent) => {
                                    const copy = { ...recipe }
                                    copy.cookTime = changeEvent.target.value !== "" ? Math.round(parseFloat(changeEvent.target.value) * 100) / 100 : 0
                                    updateRecipe(copy) // Updating time with value of copy
                                }
                            } />
                    </div>
                </fieldset>

                <fieldset>
                    <label htmlFor="recipeServings_input">Serving Size:</label>
                    <input
                        required
                        type="number"
                        className={styles["recipeForm--control"]}
                        name="servingSize"
                        placeholder="How many people will this meal feed?"
                        id="recipeServings_input"
                        value={recipe.servingSize > 0 ? recipe.servingSize : ""} // If value is is zero, change to empty string to display placeholder text by default instead of zero
                        onWheel={(event) => event.currentTarget.blur()} // Remove focus from the input on wheel event
                        onChange={
                            (changeEvent) => {
                                const copy = { ...recipe }
                                copy.servingSize = changeEvent.target.value !== "" ? Math.round(parseInt(changeEvent.target.value) * 100) / 100 : 0
                                updateRecipe(copy) // Updating serving size with value of copy
                            }
                        } />
                </fieldset>

                <fieldset className="addCategories">
                    <EditCategories
                        allCategories={allCategories}
                        initialCategories={initialCategories} />
                </fieldset>

                <fieldset>
                    <label htmlFor="recipeNotes_input">Additional Notes and Tips:</label>
                    <textarea
                        className={`${styles["recipeForm--control"]} ${styles["recipe--textarea"]}`}
                        name="notes"
                        placeholder="Optional"
                        id="recipeNotes_input"
                        value={recipe.note}
                        onChange={
                            (changeEvent) => {
                                const copy = { ...recipe }
                                copy.note = changeEvent.target.value
                                updateRecipe(copy) // Updating recipe with value of copy
                            }
                        } />
                </fieldset>

                <fieldset>
                    <label htmlFor="recipeImage__input">Image url:</label>
                    <input
                        type="text"
                        className={styles["recipeForm--control"]}
                        name="image"
                        placeholder="Paste image url here"
                        id="recipeImage__input"
                        value={recipe.image}
                        onChange={
                            (changeEvent) => {
                                const copy = { ...recipe }
                                copy.image = changeEvent.target.value
                                updateRecipe(copy) // Updating recipe with value of copy
                            }
                        } />
                </fieldset>

                <button type="submit"
                    className={`${styles["btn-primary"]} ${styles["submitRecipe"]}`}>
                    Submit Changes
                </button>
            </form>
        </main>
    </>
}