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