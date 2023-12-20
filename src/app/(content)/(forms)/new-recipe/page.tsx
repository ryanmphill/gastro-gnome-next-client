import { NewRecipe } from "@/components/forms/newRecipe/NewRecipe"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"


const NewRecipePage = () => {
    const userIsAuthenticated = cookies().get('gastro_token') ? true : false
    if (userIsAuthenticated) {
        return <>
            <NewRecipe />
        </>
    } else {
        redirect("/login")
    }
}
export default NewRecipePage