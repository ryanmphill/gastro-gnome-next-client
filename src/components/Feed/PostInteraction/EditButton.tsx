'use client'
import { useRouter } from "next/navigation"
import styles from "./PostInteraction.module.css"

interface EditButtonProps {
    recipeId: number
}

export const EditButton = ({ recipeId } : EditButtonProps) => {
    const router = useRouter()
    return <>
        <button className={`${styles["btn-secondary"]} ${styles["btn-group-left"]}`}
            onClick={(evt) => {
                evt.preventDefault()
                router.push(`/edit-recipe/${recipeId}`)
            }}
        >Edit</button>
    </>
}