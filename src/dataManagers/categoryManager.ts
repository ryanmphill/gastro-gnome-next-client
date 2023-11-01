const apiUrl: string = 'http://localhost:8000'

interface Category {
    id: number,
    name: string,
    category_type: number,
    category_type_label: string
}

export const getCategories = async (): Promise<Category[]> => {
    const res = await fetch(`${apiUrl}/categories`)
    if (!res.ok) {
        throw Error("Unable to fetch Categories") 
    }
    return res.json()
}

interface CategoryType {
    id: number,
    label: string
}

export const getCategoryTypes = async (): Promise<CategoryType[]> => {
    const res = await fetch(`${apiUrl}/category_types`)
    if (!res.ok) {
        throw Error("Unable to fetch Category Types") 
    }
    return res.json()
}