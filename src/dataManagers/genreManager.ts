import { Genre } from "@/types/genreType"

const apiUrl: string = 'http://localhost:8000'


export const getGenres = async (): Promise<Genre[]> => {
    const res = await fetch(`${apiUrl}/genres`, {cache: "force-cache"})
    if (!res.ok) {
        throw Error("Unable to fetch genres") 
    }
    return res.json()
}