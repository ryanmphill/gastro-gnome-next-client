import Recipe from "@/components/recipe/Recipe"

interface ParamsProp {
    params?: {
        id?: string
    }
  }
  
  const RecipePage = ({ params } : ParamsProp ) => {
    console.log("params", params)
    let recipeId = null
    try {
        recipeId = parseInt(params?.id ?? "0")
    } catch {
        recipeId = 0
    }
    return <>
    <Recipe recipeId={recipeId} />
    </>
  }
  export default RecipePage