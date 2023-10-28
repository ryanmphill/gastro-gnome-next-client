export const formatQuery = (queryArray : string[]): string => {
    let query = queryArray;
    const firstQuery = `?${queryArray.shift()}`
    const remainingQuery = query.join("&")
    const fullQuery = firstQuery + remainingQuery
    return fullQuery
}