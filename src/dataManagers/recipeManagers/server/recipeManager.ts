'use server'

import { Recipe } from "@/types/recipeType"
import { cookies } from "next/headers"
import { notFound } from "next/navigation"

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

export const getSingleRecipe = async (recipeId: number): Promise<Recipe> => {
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