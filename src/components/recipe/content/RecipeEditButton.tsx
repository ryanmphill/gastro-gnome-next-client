'use client'
import { useRouter } from "next/navigation"
import styles from "../recipe.module.css"

interface EditButtonProps {
    recipeId: number,
    authorId: number
}

export const RecipeEditButton = ({ recipeId, authorId } : EditButtonProps) => {
    const router = useRouter()
    return <>
        <button className={styles["btn-secondary"]}
            onClick={(evt) => {
                evt.preventDefault()
                router.push(`/recipe/${recipeId}/edit/${authorId}`) //TODO: Add path to edit page
            }}
        >Edit</button>
    </>
}