import Recipe from "@/components/recipe/Recipe"

interface ParamsProp {
    params?: {
        id?: string
    },
    searchParams?: {
        nutrition?: string
    }
}

const RecipePage = ({ params, searchParams }: ParamsProp) => {
    const loadNutrition = searchParams?.nutrition === "true" ? true : false
    console.log("loadNutrition", loadNutrition)
    let recipeId = null
    try {
        recipeId = parseInt(params?.id ?? "0")
    } catch {
        recipeId = 0
    }
    return <>
        <Recipe recipeId={recipeId} loadNutrition={loadNutrition} />
    </>
}
export default RecipePage