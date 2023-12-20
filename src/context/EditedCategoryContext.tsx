'use client'
import { AttachedCategory } from "@/types/categoryType";
import { Dispatch, SetStateAction, createContext, useContext, useState } from "react";

type CategoryContextType = {
    categoriesToDelete: AttachedCategory[];
    updateCategoriesToDelete: Dispatch<SetStateAction<AttachedCategory[]>>;
    categoriesToPost: AttachedCategory[];
    updateCategoriesToPost: Dispatch<SetStateAction<AttachedCategory[]>>;
};

export const EditedCategoryContext = createContext<CategoryContextType | null>(null);

/**Returns stateful values and update functions for categories being added
 * and removed from a recipe when using the Edit Recipe Form.
 */
export const useEditedCategoryContext = () => {
    const obj = useContext(EditedCategoryContext)
    if (!obj) {
        throw new Error("EditedCategoryContext must be used within a provider")
    }
    return obj;
}

/**Provides access to stateful values and update functions for categories being added
 * and removed from a recipe to all children components */
export const EditedCategoryProvider = ({ children } : {children: React.ReactNode}) => {
    const [categoriesToDelete, updateCategoriesToDelete] = useState<AttachedCategory[]>([])
    const [categoriesToPost, updateCategoriesToPost] = useState<AttachedCategory[]>([])
    
    return (
        <EditedCategoryContext.Provider
            value={{ categoriesToDelete, updateCategoriesToDelete, categoriesToPost, updateCategoriesToPost }}
        >
            {children}
        </EditedCategoryContext.Provider>
    )
}