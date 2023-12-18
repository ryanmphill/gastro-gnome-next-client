'use server'

import { CategoryToAdd } from "@/types/categoryType"
import { AttachedIngredient } from "@/types/ingredientType"
import { Recipe } from "@/types/recipeType"
import { revalidateTag } from "next/cache"
import { cookies } from "next/headers"
import { notFound, redirect } from "next/navigation"

const apiUrl: string = 'http://localhost:8000'

export const getRecipes = async (queryParams: string): Promise<Recipe[]> => {
    const cookieStore = cookies()
    const token = cookieStore.get('gastro_token')
    const reqHeaders: HeadersInit = queryParams.includes("following=true") && token && token.value.length > 0
    ? {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": `Token ${token.value}`
      }
    : {
      "Content-Type": "application/json",
      "Accept": "application/json"
      }
    
    const res = await fetch(`${apiUrl}/recipes${queryParams}`, {
      method: "GET",
      headers: reqHeaders,
      cache: "force-cache",
      next: { tags: ['recipes'] }
    })
    if (!res.ok) {
        throw Error("Unable to fetch Recipes") 
    }
    return res.json()
}

/**Fetches data for single recipe. If API responds with 404, user is redirected to 404 not found page */
export const getSingleRecipe = async (recipeId: number): Promise<Recipe | never> => {
  const res = await fetch(`${apiUrl}/recipes/${recipeId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
      },
    next: { tags: ['singleRecipe'] }
  })
  if (!res.ok) {
    if (res.status === 404) {
      return notFound()
    } else {
      throw Error("Unable to fetch Recipes")
    } 
  }
  return res.json()
}

export const getAuthoredRecipes = async (userId: number): Promise<Recipe[]> => {
  const res = await fetch(`${apiUrl}/users/${userId}/authored_recipes`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
      },
    next: { tags: ['authoredRecipes'] }
  })
  if (!res.ok) {
    throw Error("Unable to fetch Recipes")
  }
  return res.json()
}

export const getFavoritedRecipes = async (userId: number): Promise<Recipe[]> => {
  const res = await fetch(`${apiUrl}/users/${userId}/favorited_recipes`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
      },
    next: { tags: ['favoritedRecipes'] }
  })
  if (!res.ok) {
    throw Error("Unable to fetch Recipes")
  }
  return res.json()
}

export const createNewRecipe = async (ingredientData: AttachedIngredient[], categoryData: CategoryToAdd[], formData: FormData) => {
  const cookieStore = cookies()
  const token = cookieStore.get('gastro_token')

  const categoryIdArray = categoryData.map(category => category.categoryId)

  const data = {
    "title": formData.get("title"),
    "genre": formData.get("genre"),
    "description": formData.get("description"),
    "prep_instructions": formData.get("prepInstructions"),
    "cook_instructions": formData.get("cookInstructions"),
    "prep_time": formData.get("prepTime"),
    "cook_time": formData.get("cookTime"),
    "serving_size": formData.get("servingSize"),
    "note": formData.get("notes"),
    "image": formData.get("image"),
    "ingredients": ingredientData,
    "categories": categoryIdArray
  }

  const res = await fetch(`${apiUrl}/recipes`, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": `Token ${token?.value}`
      },
      body: JSON.stringify(data)
  })

  if (res && res.ok) {
    console.log(res.status, res.statusText)
    revalidateTag("recipes")
    revalidateTag("authoredRecipes")
    redirect('/')
  } else if (res && !res.ok) {
    console.error(res)
    throw Error(`Unable to POST recipe. Server responed with: ${res.status} ${res.statusText}`)
  } else {
    throw Error("Server is unresponsive... unable to POST recipe")
  }
};