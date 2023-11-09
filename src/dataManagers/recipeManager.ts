const apiUrl: string = 'http://localhost:8000'

export const getRecipes = async (queryParams: string): Promise<any> => {
    const reqHeaders: HeadersInit = queryParams.includes("following=true") 
    ? {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": `Token ${localStorage.getItem("gastro_token")}`
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

  export const addRecipeToFavorites = async (id: number) => {
    const res = await fetch(`${apiUrl}/recipes/${id}/add_favorite`, {
    method: "POST",
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

  export const removeRecipeFromFavorites = async (id: number) => {
    const res = await fetch(`${apiUrl}/recipes/${id}/remove_favorite`, {
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