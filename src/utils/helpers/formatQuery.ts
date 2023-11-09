import { ReadonlyURLSearchParams } from "next/navigation";

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

export const addToQuery = (name: string, value: string, searchParams: ReadonlyURLSearchParams) => {
    const params = new URLSearchParams(searchParams)
    params.append(name, value)

    return "?" + params.toString()
}

export const removeFromQuery = (name: string, value: string, searchParams: ReadonlyURLSearchParams) => {
    const params = new URLSearchParams(searchParams)
    params.delete(name, value)

    return "?" + params.toString()
}

export const clearSearchFromQuery = (searchParams: ReadonlyURLSearchParams) => {
    const params = new URLSearchParams(searchParams)
    params.delete("search")
    return "?" + params.toString()
}

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