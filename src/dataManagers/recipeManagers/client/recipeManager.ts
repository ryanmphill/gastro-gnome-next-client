import { cookies } from "next/headers"

const apiUrl: string = 'http://localhost:8000'


export const deleteRecipe = async (id: number) => {
    const res = await fetch(`${apiUrl}/recipes/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": `Token ${localStorage.getItem("gastro_token")}`
    }
  })
  if (!res.ok) {
    throw new Error("Failed to delete recipe")
  }
  return await res.json()
  };