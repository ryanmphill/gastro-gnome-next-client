'use client'
import { useRouter } from "next/navigation"
import styles from "../RecipeFeed.module.css"

interface EditButtonProps {
    recipeId: number,
    authorId: number
}

export const EditButton = ({ recipeId, authorId } : EditButtonProps) => {
    const router = useRouter()
    return <>
        <button className={`${styles["btn-secondary"]} ${styles["btn-group-left"]}`}
            onClick={(evt) => {
                evt.preventDefault()
                router.push(`/recipe/${recipeId}/edit/${authorId}`)
            }}
        >Edit</button>
    </>
}