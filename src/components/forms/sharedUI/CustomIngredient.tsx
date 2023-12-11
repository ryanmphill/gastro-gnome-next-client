'use client'
import { createNewIngredient } from "@/dataManagers/ingredientManager"
import { Ingredient } from "@/types/ingredientType"
import { Dispatch, MouseEvent, SetStateAction, startTransition, useState } from "react"
import styles from "../recipeForm.module.css"

interface CustomIngredientProps {
    allIngredients: Ingredient[],
    setShowCustom: Dispatch<SetStateAction<boolean>>
}

/**Renders an input and submit button for adding new ingredients to the database as part of
 * the `form within a form`. Once an ingredient is successfully added, it can then be associated 
 * with the recipe  that is either being created or updated.
 */
export const CustomIngredient = ({ allIngredients, setShowCustom } : CustomIngredientProps) => {
    // Set state variable for ingredient to be added
    const [newIngredient, updateNewIngredient] = useState({
        name: ""
    })

    // POST new ingredient to API when user clicks button
    const handleCreateCustom = (evt: MouseEvent<HTMLButtonElement>) => {
        evt.preventDefault()

        // Check if the ingredient is already in database
        const alreadyAdded = allIngredients.some(ingredient => ingredient.name === newIngredient.name)

        if (!alreadyAdded && newIngredient.name.length > 0) {
            // // POST ingredient to API ////////////////////////////////////////////
            // fetch("http://localhost:8088/ingredients", {
            //     method: "POST",
            //     headers: {
            //         "Content-Type": "application/json"
            //     },
            //     body: JSON.stringify(newIngredient)
            // })
            //     .then(response => {
            //         if (response.ok) {
            //             return response.json(); // Await the response.json() Promise
            //         } else {
            //             throw new Error("Unable to create new recipe");
            //         }
            //     })
            //     .then(postedIngredient => {
            //         console.log("New ingredient successfully created", postedIngredient)
            //         // update the allIngredients state with new posted ingredient
            //         fetchList("ingredients", setAllIngredients)
            //     })
            //     .then(() => {
            //         setShowCustom(false)
            //     })
            //     .catch(error => {
            //         console.error("An error occurred:", error);
            //         window.alert("Something went wrong");
            //     });
            const createNew = async () => {
                const res = await createNewIngredient(newIngredient)
                setShowCustom(false)
            }
            startTransition(() => {createNew()})
        } else if (alreadyAdded) {
            window.alert("Ingredient already in database")
        } else {
            window.alert("Please enter an ingredient name")
        }
    }

    return <>
        <div className={`form-group ${styles["ingredientInputs"]} ${styles["fadeIn"]}`}>
            <label htmlFor="CustomIngredient_input">Create New Custome Ingredient:</label>
            <input
                type="text"
                className={styles["ingredient--control"]}
                placeholder="Enter your ingredient"
                id="CustomIngredient_input"
                value={newIngredient.name}
                onChange={
                    (changeEvent) => {
                        const copy = { ...newIngredient }
                        copy.name = changeEvent.target.value
                        updateNewIngredient(copy) // Updating custom ingredient with value of copy
                    }
                } />
        </div>
        <button className={`${styles["btn-secondary"]} ${styles["btn-group-left"]}`}
        onClick={(click) => handleCreateCustom(click)}
        >Create Custom Ingredient</button>

        <button className={`${styles["btn-secondary"]} ${styles["btn-group-right"]}`}
        onClick={(e) => {
            e.preventDefault()
            setShowCustom(false)
        }}
        >Cancel</button>
        <div><p>After adding your custom ingredient, you'll be able to find it in the search bar and add it to your recipe.</p></div>
    </>
}