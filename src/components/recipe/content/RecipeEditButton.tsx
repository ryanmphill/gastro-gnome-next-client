'use client'
import { useRouter } from "next/navigation"
import styles from "../recipe.module.css"

interface EditButtonProps {
    recipeId: number
}

export const RecipeEditButton = ({ recipeId } : EditButtonProps) => {
    const router = useRouter()
    return <>
        <button className={styles["btn-secondary"]}
            onClick={(evt) => {
                evt.preventDefault()
                router.push(`/edit-recipe/${recipeId}`)
            }}
        >Edit</button>
    </>
}