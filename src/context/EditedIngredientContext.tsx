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

export const useEditedIngredientContext = () => {
    const obj = useContext(EditedIngredientContext)
    if (!obj) {
        throw new Error("EditedIngredientContext must be used within a provider")
    }
    return obj;
}

export const EditedIngredientProvider = ({ children } : {children: React.ReactNode}) => {
    // All your data goes here
    const [ingredientsToDelete, updateIngredientsToDelete] = useState<AttachedIngredient[]>([])
    const [ingredientsToPost, updateIngredientsToPost] = useState<AttachedIngredient[]>([])
    
    // Return this context provider wrapping, it passes down the value prop to its children
    return (
        <EditedIngredientContext.Provider
            value={{ ingredientsToDelete, updateIngredientsToDelete, ingredientsToPost, updateIngredientsToPost }}
        >
            {children}
        </EditedIngredientContext.Provider>
    )
}