'use client'
import { MouseEvent, useState } from "react"
import styles from "./PostInteraction.module.css"
import { deleteRecipe } from "@/dataManagers/recipeManagers/server/recipeManager"

interface DeleteRecipeProps {
  recipeId: number
}

export const DeleteRecipe = ({ recipeId }: DeleteRecipeProps) => {
  // Define state variable for if delete button was clicked
  const [showPrompt, setShowPrompt] = useState(false)

  const handleInitialDeleteClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    setShowPrompt(true)
  }

  const handleCancelDelete = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    setShowPrompt(false)
  }

  const handleDeleteRecipe = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    try {
      await deleteRecipe(recipeId)
    } catch (err) {
      console.error(err)
      window.alert("Unable to delete recipe")
    }
  };

  return <>
    {showPrompt
      ?
      <div className="confirmation-prompt">
        <p>Are you sure you want to delete?</p>
        <button className={`${styles["btn-secondary"]} ${styles["btn-group-left"]}`} onClick={(click) => handleDeleteRecipe(click)}>Delete</button>
        <button className={`${styles["btn-secondary"]} ${styles["btn-group-right"]}`} id="btn-cancel-dlt" onClick={(click) => handleCancelDelete(click)}>Cancel</button>
      </div>

      :
      <button className={`${styles["btn-secondary"]} ${styles["btn-group-right"]}`}
        onClick={(click) => handleInitialDeleteClick(click)}
      >Delete</button>
    }
  </>
}