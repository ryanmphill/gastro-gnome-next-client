'use client'

import { EditedCategoryProvider } from "./EditedCategoryContext"
import { EditedIngredientProvider } from "./EditedIngredientContext"

/**Wraps the `EditedIngredientProvider` and `EditedCategoryProvider` into a single provider. */
export const EditRecipeProvider = ({ children }: { children: React.ReactNode }) => {

    return (
        <EditedIngredientProvider>
            <EditedCategoryProvider>
                {children}
            </EditedCategoryProvider>
        </EditedIngredientProvider>
    )
}