'use server'
import { Ingredient } from "@/types/ingredientType"
import { revalidateTag } from "next/cache"
import { cookies } from "next/headers"

const apiUrl: string = 'http://localhost:8000'


export const getIngredients = async (): Promise<Ingredient[]> => {
    const res = await fetch(`${apiUrl}/ingredients`, {
        cache: "force-cache",
        next: { tags: ['allIngredients'] }
    })
    if (!res.ok) {
        throw Error("Unable to fetch Ingredients") 
    }
    return res.json()
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