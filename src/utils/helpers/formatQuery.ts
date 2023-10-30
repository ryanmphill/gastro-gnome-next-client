export const formatQuery = (queryArray : string[]): string => {
    let query = queryArray;
    if (queryArray.length > 0) {
        const firstQuery = `?${query.shift()}`
        if (queryArray.length > 1) {
            const remainingQuery = query.join("&")
            const fullQuery = firstQuery + remainingQuery
            return fullQuery;
        } else {
            return firstQuery;
        }
    }
    return "";
};