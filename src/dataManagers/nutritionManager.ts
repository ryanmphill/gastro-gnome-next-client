'use server'

// Define function to send recipe to Edamam API
export const fetchNutrition = async (recipeTitle: string, ingredients: string[]) => {
    const title = recipeTitle
    const ingr = ingredients
    const appId = process.env.EDAMAM_ID
    const apiKey = process.env.EDAMAM_KEY

    const response = await fetch(`https://api.edamam.com/api/nutrition-details?app_id=${appId}&app_key=${apiKey}`, {
        method: "POST",
        cache: "no-cache",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ title, ingr })
    })
    return await response.json()
}