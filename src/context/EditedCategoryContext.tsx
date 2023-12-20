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

export const useEditedCategoryContext = () => {
    const obj = useContext(EditedCategoryContext)
    if (!obj) {
        throw new Error("EditedCategoryContext must be used within a provider")
    }
    return obj;
}

export const EditedCategoryProvider = ({ children } : {children: React.ReactNode}) => {
    // All your data goes here
    const [categoriesToDelete, updateCategoriesToDelete] = useState<AttachedCategory[]>([])
    const [categoriesToPost, updateCategoriesToPost] = useState<AttachedCategory[]>([])
    
    // Return this context provider wrapping, it passes down the value prop to its children
    return (
        <EditedCategoryContext.Provider
            value={{ categoriesToDelete, updateCategoriesToDelete, categoriesToPost, updateCategoriesToPost }}
        >
            {children}
        </EditedCategoryContext.Provider>
    )
}