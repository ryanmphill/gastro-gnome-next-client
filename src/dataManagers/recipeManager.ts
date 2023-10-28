const apiUrl: string = 'http://localhost:8000'

export const getRecipes = async (queryParams: string): Promise<any> => {
    const res = await fetch(`${apiUrl}/recipes${queryParams}`)
    if (!res.ok) {
        throw Error("Unable to fetch Recipes") 
    }
    return res.json
}