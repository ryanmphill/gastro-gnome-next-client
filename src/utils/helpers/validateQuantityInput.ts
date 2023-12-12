import { ChangeEvent } from "react"

/**Takes user input and returns true if the entered value is a whole 
     * number OR a 'valid' fraction OR a decimal
     * 
     * NOTE: A valid fraction can be a mixed fraction (with one space), ie: `1 3/4`
     * 
     * Returns false if the argument contains non-numerical values, more than one space, or both `.` and
     * `/` characters within the same argument
*/
export const validateQuantityInput = (changeEvent : ChangeEvent<HTMLInputElement>) => {
    const inputValue = changeEvent.target.value
    const isFractionOrDecimal = /^(?!.*\/.*\/)(?!.*\..*\.)(?!.* .* )[0-9\/. ]*$/
    const containsDot = inputValue.includes('.')
    const containsSlash = inputValue.includes('/')
    const containsDotAndSlash = containsDot && containsSlash ? true : false

    if (isFractionOrDecimal.test(inputValue) && !containsDotAndSlash) {
        return true
    } else {
        return false
    }
}