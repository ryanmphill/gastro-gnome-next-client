import { NewRecipe } from "@/components/forms/newRecipe/NewRecipe"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"


const NewRecipePage = () => {
    const token = cookies().get('gastro_token')
    const userIsAuthenticated = token && token?.value.length > 0 ? true : false
    if (userIsAuthenticated) {
        return <>
            <NewRecipe />
        </>
    } else {
        redirect("/login")
    }
}
export default NewRecipePage