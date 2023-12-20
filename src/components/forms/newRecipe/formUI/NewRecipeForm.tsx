'use client'
import { useState } from "react"
import { AddIngredients } from "./AddIngredients"
import { AddCategories } from "./AddCategories"
import { Genre } from "@/types/genreType"
import { Ingredient, AttachedIngredient } from "@/types/ingredientType"
import { Category, CategoryToAdd } from "@/types/categoryType"
import styles from "../../recipeForm.module.css"
import { createNewRecipe } from "@/dataManagers/recipeManagers/recipeManager"

interface RecipeFormProps {
    genres: Genre[],
    allIngredients: Ingredient[],
    allCategories: Category[]
}

/**Renders form elements and maintains state related to creating a new recipe. 
 * When a user is ready to submit, performs server mutation via POST request.
 */
export const NewRecipeForm = ({genres, allIngredients, allCategories} : RecipeFormProps) => {

    /* Define and set state variable for the recipe object to be posted,
       the ingredient relationships to be posted, and the category relationships
       to be posted */
    const [newRecipe, updateNewRecipe] = useState(
        {
            "title": "",
            "genreId": 0,
            "description": "",
            "prepInstructions": "",
            "cookInstructions": "",
            "prepTime": 0,
            "cookTime": 0,
            "servingSize": 0,
            "note": "",
            "image": ""
        }
    )
    const [includedIngredients, updateIncludedIngredients] = useState<AttachedIngredient[]>([])
    const [includedCategories, updateIncludedCategories] = useState<CategoryToAdd[]>([])
    
    // The server action to POST the new recipe will take the formData object as an argument by default.
    // The `bind` method is being used here to add additional preset arguments to the function call, with
    // `null` provided for the `this` parameter.
    // since these are not being stored in the formData object. An alternative would be to store
    // the values in  invisible input elements with `type` set to `hidden`
    const createNew = createNewRecipe.bind(null, includedIngredients, includedCategories)

    return <>
        <form action={createNew} className={`${styles["postRecipeForm"]} ${styles["fadeIn"]}`} id="newRecipeForm">
            <h2 className={styles["postRecipeForm__title"]}>Add Your Recipe</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="recipeTitle__input">Recipe Title:</label>
                    <input
                        required autoFocus
                        type="text"
                        name="title"
                        className={styles["recipeForm--control"]}
                        placeholder="Add a title"
                        id="recipeTitle__input"
                        value={newRecipe.title}
                        onChange={
                            (changeEvent) => {
                                const copy = {...newRecipe}
                                copy.title = changeEvent.target.value
                                updateNewRecipe(copy) // Updating recipe title with value of copy
                            }
                        } />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="genre_dropdown">What course is this recipe?:</label>
                    <select
                        className={styles["recipeForm--control"]}
                        id="genre_dropdown"
                        name="genre"
                        value={newRecipe.genreId}
                        onChange={(changeEvent) => {
                            const copy = { ...newRecipe };
                            copy.genreId = parseInt(changeEvent.target.value);
                            updateNewRecipe(copy); // Updating recipe with value of copy
                        }}
                    >   {/*Add options for choosing a genre*/}
                        <option value="0">Select a course</option>
                        {
                            genres.map(genre => <option value={genre.id} key={`genre--${genre.id}`}>{genre.name}</option> )
                        }
                    </select>
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="recipeDescription_input">Description:</label>
                    <textarea
                        required 
                        className={`${styles["recipeForm--control"]} ${styles["recipe--textarea"]}`}
                        name="description"
                        placeholder="Add a description for your recipe"
                        id = "recipeDescription_input"
                        value={newRecipe.description}
                        onChange={
                            (changeEvent) => {
                                const copy = {...newRecipe}
                                copy.description = changeEvent.target.value
                                updateNewRecipe(copy) // Updating recipe with value of copy
                            }
                        } />
                </div>
            </fieldset>

            <fieldset id={styles["addIngredients"]}>
                <AddIngredients includedIngredients={includedIngredients}
                    allIngredients={allIngredients}
                    updateIncludedIngredients={updateIncludedIngredients} />
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="recipePrep_input">Preparation:</label>
                    <textarea
                        required 
                        className={`${styles["recipeForm--control"]} ${styles["recipe--textarea"]}`}
                        name="prepInstructions"
                        placeholder="Add preparation instructions for your recipe"
                        id="recipePrep_input"
                        value={newRecipe.prepInstructions}
                        onChange={
                            (changeEvent) => {
                                const copy = {...newRecipe}
                                copy.prepInstructions = changeEvent.target.value
                                updateNewRecipe(copy) // Updating recipe with value of copy
                            }
                        } />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="recipeCook_input">Cooking Instructions:</label>
                    <textarea
                        required 
                        className={`${styles["recipeForm--control"]} ${styles["recipe--textarea"]}`}
                        name="cookInstructions"
                        placeholder="Add cooking instructions for your recipe"
                        id="recipeCook_input"
                        value={newRecipe.cookInstructions}
                        onChange={
                            (changeEvent) => {
                                const copy = {...newRecipe}
                                copy.cookInstructions = changeEvent.target.value
                                updateNewRecipe(copy) // Updating recipe with value of copy
                            }
                        } />
                </div>
            </fieldset>

            <fieldset className={styles["recipeTimes"]}>
                <div className={`form-group ${styles["recipeTime--div"]}`}>
                    <label htmlFor="prepTime_input">Prep Time:</label>
                    <input
                        required 
                        type="number"
                        className={`${styles["recipeForm--control"]} ${styles["recipeTime--input"]}`}
                        name="prepTime"
                        placeholder="Enter a time (minutes)"
                        id="prepTime_input"
                        value={newRecipe.prepTime > 0 ? newRecipe.prepTime : ""} // If value is is zero, change to empty string to display placeholder text by default instead of zero
                        onWheel={(event) => event.currentTarget.blur()} // Remove focus from the input on wheel event
                        onChange={
                            (changeEvent) => {
                                const copy = { ...newRecipe }
                                copy.prepTime = changeEvent.target.value !== "" ? Math.round(parseFloat(changeEvent.target.value) * 100) / 100 : 0
                                updateNewRecipe(copy) // Updating time with value of copy
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
                        placeholder="Enter a time (minutes)"
                        id="cookTime_input"
                        value={newRecipe.cookTime > 0 ? newRecipe.cookTime : ""} // If value is is zero, change to empty string to display placeholder text by default instead of zero
                        onWheel={(event) => event.currentTarget.blur()} // Remove focus from the input on wheel event
                        onChange={
                            (changeEvent) => {
                                const copy = { ...newRecipe }
                                copy.cookTime = changeEvent.target.value !== "" ? Math.round(parseFloat(changeEvent.target.value) * 100) / 100 : 0
                                updateNewRecipe(copy) // Updating time with value of copy
                            }
                        } />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group recipeServings--div">
                    <label htmlFor="recipeServings_input">Serving Size:</label>
                    <input
                        required 
                        type="number"
                        className={styles["recipeForm--control"]}
                        name="servingSize"
                        placeholder="How many people will this meal feed?"
                        id="recipeServings_input"
                        value={newRecipe.servingSize > 0 ? newRecipe.servingSize : ""} // If value is is zero, change to empty string to display placeholder text by default instead of zero
                        onWheel={(event) => event.currentTarget.blur()} // Remove focus from the input on wheel event
                        onChange={
                            (changeEvent) => {
                                const copy = { ...newRecipe }
                                copy.servingSize = changeEvent.target.value !== "" ? Math.round(parseInt(changeEvent.target.value) * 100) / 100 : 0
                                updateNewRecipe(copy) // Updating serving size with value of copy
                            }
                        } />
                </div>
            </fieldset>

            <fieldset className="addCategories">
                <AddCategories includedCategories={includedCategories}
                    allCategories={allCategories}
                    updateIncludedCategories={updateIncludedCategories} />
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="recipeNotes_input">Additional Notes and Tips:</label>
                    <textarea
                        className={`${styles["recipeForm--control"]} ${styles["recipe--textarea"]}`}
                        name="notes"
                        placeholder="Optional"
                        id = "recipeNotes_input"
                        value={newRecipe.note}
                        onChange={
                            (changeEvent) => {
                                const copy = {...newRecipe}
                                copy.note = changeEvent.target.value
                                updateNewRecipe(copy) // Updating recipe with value of copy
                            }
                        } />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="recipeImage__input">Image url:</label>
                    <input
                        type="text"
                        className={styles["recipeForm--control"]}
                        name="image"
                        placeholder="Paste image url here"
                        id="recipeImage__input"
                        value={newRecipe.image}
                        onChange={
                            (changeEvent) => {
                                const copy = {...newRecipe}
                                copy.image = changeEvent.target.value
                                updateNewRecipe(copy) // Updating recipe with value of copy
                            }
                        } />
                </div>
            </fieldset>
            
            <button type="submit"
                className={`${styles["btn-primary"]} ${styles["submitRecipe"]}`}>
                Submit New Recipe
            </button>
        </form>
    </>
}