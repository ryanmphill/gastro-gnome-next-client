'use client'
import { BgImageStyle } from "@/types/bgImageType"
import styles from "./PostInteraction.module.css"
import { useRouter } from "next/navigation"

interface RecipeImageProps {
    recipeId: number,
    bgImageStyle: BgImageStyle
}

export const RecipeImage = ({ recipeId, bgImageStyle } : RecipeImageProps) => {
    const router = useRouter()
    return <div className={styles["recipe--imgContainer"]}
        style={bgImageStyle}
        onClick={() => router.push(`/recipe/${recipeId}`)}>
    </div>
}