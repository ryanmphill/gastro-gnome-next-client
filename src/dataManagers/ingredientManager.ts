'use server'
import { Ingredient } from "@/types/ingredientType"
import { revalidateTag } from "next/cache"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

const apiUrl: string = 'http://localhost:8000'

/**Retrieves all public ingredients + any custom ingredients created by the authenticated user
 * making the request.
 * 
 * If no authentication credentials provided, redirects to login page.
*/
export const getIngredients = async (): Promise<Ingredient[] | never> => {
    const token = cookies().get('gastro_token')
    if (token && token.value.length > 0) {
    const res = await fetch(`${apiUrl}/ingredients/custom_list`, {
        cache: "force-cache",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Token ${token.value}`
        },
        next: { tags: ['allIngredients'] }
    })
    if (!res.ok) {
        throw Error("Unable to fetch Ingredients") 
    }
    return res.json()
    } else {
        redirect('/login')
    }
}

export const createNewIngredient = async (newIngredient: {name: string}): Promise<Ingredient> => {
    const cookieStore = cookies()
    const token = cookieStore.get('gastro_token')
    const res = await fetch(`${apiUrl}/ingredients`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Token ${token?.value}`
        },
        body: JSON.stringify(newIngredient)
    })
    console.log(res.status, res.statusText)
    if (!res.ok) {
        throw Error("Unable to post ingredient") 
    }
    revalidateTag('allIngredients')
    return res.json()
}