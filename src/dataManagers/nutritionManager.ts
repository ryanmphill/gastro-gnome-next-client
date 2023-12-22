'use server'

import { NutritionSchema } from "@/types/nutritionType"

// Define function to send recipe to Edamam API
export const fetchNutrition = async (recipeTitle: string, ingredients: string[]): Promise<NutritionSchema> => {

    /*Temporarily halt nutrition API call --------------- */
    return await Promise.resolve({});
    /*----------------------------------------------------*/

    const title = recipeTitle
    const ingr = ingredients
    const appId = process.env.EDAMAM_ID
    const apiKey = process.env.EDAMAM_KEY

    try {
        const response = await fetch(`https://api.edamam.com/api/nutrition-details?app_id=${appId}&app_key=${apiKey}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ title, ingr })
        })
        if (!response.ok) {
            return {};
        }
        return await response.json()
    } catch (err) {
        console.error("Falied to fetch Nutrition from Edamam API, ", err)
        return {};
    }
}