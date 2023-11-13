import { Category, CategoryType } from "@/types/categoryType"

const apiUrl: string = 'http://localhost:8000'


export const getCategories = async (): Promise<Category[]> => {
    const res = await fetch(`${apiUrl}/categories`)
    if (!res.ok) {
        throw Error("Unable to fetch Categories") 
    }
    return res.json()
}

export const getCategoryTypes = async (): Promise<CategoryType[]> => {
    const res = await fetch(`${apiUrl}/category_types`)
    if (!res.ok) {
        throw Error("Unable to fetch Category Types") 
    }
    return res.json()
}