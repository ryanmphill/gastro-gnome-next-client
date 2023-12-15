import { EditRecipe } from "@/components/forms/editRecipe/EditRecipe"

interface ParamsProp {
    params?: {
        id?: string
    }
}

const EditRecipePage = ({ params }: ParamsProp) => {
    let recipeId = null

    try {
        recipeId = parseInt(params?.id ?? "0")
    } catch {
        recipeId = 0
    }
    
    return <>
        <EditRecipe recipeId={recipeId} />
    </>
}
export default EditRecipePage