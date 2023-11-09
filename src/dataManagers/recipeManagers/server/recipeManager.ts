'use server'

import { cookies } from "next/headers"

const apiUrl: string = 'http://localhost:8000'

export const getRecipes = async (queryParams: string): Promise<any> => {
    const cookieStore = cookies()
    const token = cookieStore.get('gastro_token')
    const reqHeaders: HeadersInit = queryParams.includes("following=true") && token
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
      headers: reqHeaders
    })
    if (!res.ok) {
        throw Error("Unable to fetch Recipes") 
    }
    return res.json()
}