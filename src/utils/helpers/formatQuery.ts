import { ReadonlyURLSearchParams } from "next/navigation";

/**  Takes an array of separate query strings (ex. ["search=example", ...]) and returns a single query string
 * with '?' at the beginning of the query and '&' joining the remaining queries
*/
export const formatQuery = (queryArray : string[]): string => {
    let query = [ ...queryArray ];
    if (queryArray.length > 0) {
        const firstQuery = `?${query.shift()}`
        if (queryArray.length === 2) {
            const fullQuery = firstQuery + '&' + queryArray[1]
            console.log(fullQuery)
            return fullQuery
        } else if (queryArray.length > 2) {
            const remainingQuery = query.join("&")
            const fullQuery = firstQuery + '&' + remainingQuery
            console.log(fullQuery)
            return fullQuery;
        } else {
            console.log(firstQuery)
            return firstQuery;
        }
    }
    return "";
};

/**  Adds a specified query (name, value) to URLSearchParams */
export const addToQuery = (name: string, value: string, searchParams: ReadonlyURLSearchParams) => {
    const params = new URLSearchParams(searchParams)
    params.append(name, value)

    return "?" + params.toString()
}

/**  Removes a specified query (name, value) from URLSearchParams */
export const removeFromQuery = (name: string, value: string, searchParams: ReadonlyURLSearchParams) => {
    const params = new URLSearchParams(searchParams)
    params.delete(name, value)

    return "?" + params.toString()
}

/**  Clears the search terms from the URLSearchParams */
export const clearSearchFromQuery = (searchParams: ReadonlyURLSearchParams) => {
    const params = new URLSearchParams(searchParams)
    params.delete("search")
    return "?" + params.toString()
}

/**  Updates the URLSearchParams with the current search terms */
export const updateSearchInQuery = (value: string, searchParams: ReadonlyURLSearchParams) => {
    const params = new URLSearchParams(searchParams)
    params.delete("search")
    if (value !== "") {
        params.append("search", value)
    }
    return "?" + params.toString()
}

interface searchParamsObj {
    search?: string,
    category?: string[] | string,
    following?: string
}

/**  Takes the searchParams object and converts to a string to be sent to API */
export const convertToQueryString = (paramObj : searchParamsObj) => {
    const queryStringArray: string[] = []
    if (paramObj.search) {
        queryStringArray.push(`search=${paramObj.search}`)
    }
    if (paramObj.following) {
        queryStringArray.push(`following=true`)
    }
    if (paramObj.category && typeof paramObj.category === "string") {
        queryStringArray.push(`category=${paramObj.category}`)
    }
    if (paramObj.category && Array.isArray(paramObj.category)) {
        paramObj.category.forEach((param) => queryStringArray.push(`category=${param}`))
    }
    return formatQuery(queryStringArray)
}

/**  Ensures selected categories from query are stored as an array for consistant use as state
 * 
 * Inputs:
 * 
 * Single category from the searchParams object: (string) => ['string']
 * 
 * Multiple category searchParams are already in an array: (['string', 'string']) => ['string', 'string']
 * 
 * No category searchParams are entered: (undefined) => [ ]
 */
export const formatCategoryQueryParams = (categoryQuery: string | string[] | undefined) => {
    
    if (Array.isArray(categoryQuery)) {
        return categoryQuery
    } else if (typeof categoryQuery === 'string') {
        return [`${categoryQuery}`]
    } else {
        return []
    }
}