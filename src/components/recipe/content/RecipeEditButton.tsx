'use client'
import { useRouter } from "next/navigation"

interface EditButtonProps {
    recipeId: number,
    authorId: number
}

export const RecipeEditButton = ({ recipeId, authorId } : EditButtonProps) => {
    const router = useRouter()
    return <>
        <button className="btn-secondary"
            onClick={(evt) => {
                evt.preventDefault()
                router.push(`/recipe/${recipeId}/edit/${authorId}`) //TODO: Add path to edit page
            }}
        >Edit</button>
    </>
}