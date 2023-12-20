'use client'

import { AttachedIngredient } from "@/types/ingredientType";
import { Dispatch, SetStateAction, createContext, useContext, useState } from "react";

type IngredientContextType = {
    ingredientsToDelete: AttachedIngredient[];
    updateIngredientsToDelete: Dispatch<SetStateAction<AttachedIngredient[]>>;
    ingredientsToPost: AttachedIngredient[];
    updateIngredientsToPost: Dispatch<SetStateAction<AttachedIngredient[]>>;
};

export const EditedIngredientContext = createContext<IngredientContextType | null>(null);

/**Returns stateful values and update functions for ingredients being added
 * and removed from a recipe when using the Edit Recipe Form.
 */
export const useEditedIngredientContext = () => {
    const obj = useContext(EditedIngredientContext)
    if (!obj) {
        throw new Error("EditedIngredientContext must be used within a provider")
    }
    return obj;
}

/**Provides access to stateful values and update functions for ingredients being added
 * and removed from a recipe to all children components */
export const EditedIngredientProvider = ({ children } : {children: React.ReactNode}) => {
    const [ingredientsToDelete, updateIngredientsToDelete] = useState<AttachedIngredient[]>([])
    const [ingredientsToPost, updateIngredientsToPost] = useState<AttachedIngredient[]>([])
    
    return (
        <EditedIngredientContext.Provider
            value={{ ingredientsToDelete, updateIngredientsToDelete, ingredientsToPost, updateIngredientsToPost }}
        >
            {children}
        </EditedIngredientContext.Provider>
    )
}