'use client'
import { AttachedCategory, Category } from '@/types/categoryType';
import { Dispatch, MouseEvent, SetStateAction, useState } from 'react';
import Select from 'react-select';
import styles from "../../recipeForm.module.css"

interface EditCategoryProps {
    categoriesToPost: AttachedCategory[],
    allCategories: Category[],
    updateCategoriesToPost: Dispatch<SetStateAction<AttachedCategory[]>>,
    initialCategories: AttachedCategory[],
    categoriesToDelete: AttachedCategory[],
    updateCategoriesToDelete: Dispatch<SetStateAction<AttachedCategory[]>>
}

export const EditCategories = ({ categoriesToPost, allCategories, updateCategoriesToPost,
    initialCategories, categoriesToDelete, updateCategoriesToDelete
}: EditCategoryProps) => {

    const [categoryToAdd, updateCategoryToAdd] = useState<AttachedCategory>(
        {
            "id": 0,
            "name": ""
        }
    )

    const handleAddCategory = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        // Check if category has been selected
        if (categoryToAdd.id > 0) {
            // Get a copy of the current array of categories that are staged to be added
            const copy = [...categoriesToPost]
            // Check if the category has already been added
            const alreadyAdded = copy.some(category => category.id === categoryToAdd.id)
            const inInitialRecipe = initialCategories.some(category => category.id === categoryToAdd.id)
            if (!alreadyAdded && !inInitialRecipe) {
                copy.push(categoryToAdd)
                updateCategoriesToPost(copy)
            } else {
                window.alert("That tag has already been added")
            }
        } else {
            window.alert("Please select a category tag")
        }
    }

    const handleRemoveCategory = (event: MouseEvent<HTMLButtonElement>, objectToRemove: AttachedCategory) => {
        event.preventDefault()
        const updatedCategories = categoriesToPost.filter(category => category.id !== objectToRemove.id)
        updateCategoriesToPost(updatedCategories)

    }

    const handleDeleteExistingCategory = (event: MouseEvent<HTMLButtonElement>, objectToDelete: AttachedCategory) => {
        event.preventDefault()

        // Get a copy of the current array of categories that are staged to be deleted
        const copy = [...categoriesToDelete]

        // Check if the category has already been added
        const alreadyStaged = copy.some(category => category.id === objectToDelete.id)

        if (!alreadyStaged) {
            copy.push(objectToDelete)
            updateCategoriesToDelete(copy)
        } else {
            window.alert("Category tag already marked for deletion")
        }
    }

    const handleUndoDeleteCat = (event: MouseEvent<HTMLButtonElement>, objectToUndo: AttachedCategory) => {
        event.preventDefault()
        const updatedCategories = categoriesToDelete.filter(category => category.id !== objectToUndo.id)
        updateCategoriesToDelete(updatedCategories)
    }

    // Define function to check if an ingredient has been marked for deletion
    const markedForDeletion = (categoryObject: AttachedCategory) => {
        const alreadyStaged = categoriesToDelete.some(category => category.id === categoryObject.id)
        return alreadyStaged
    }

    return <>
        <div className={styles["addedCategories"]}>
            { // Display Categories already on recipe card with interface for deleting
                initialCategories.length > 0
                && initialCategories.map(initialCategory => {
                    return <div key={`displayInitCat--${initialCategory.id}`}>
                        {   /*If marked for deletion, display undo button*/
                            markedForDeletion(initialCategory)
                                ? <div className={`${styles["addedCategory"]} ${styles["categoryToDelete"]}`} key={`addededCat--${initialCategory.id}`}>
                                    <section>
                                        <div>{initialCategory.name}</div>
                                        <div className={styles["deleteStamp"]}>Marked for deletion</div>
                                    </section>
                                    <button
                                        onClick={(click) => handleUndoDeleteCat(click, initialCategory)}
                                        key={`undoDeletCat--${initialCategory.id}`}
                                        className={styles["btn--undoRemoveCat"]}
                                    >Undo</button>
                                </div>
                                : <div className={styles["addedCategory"]} key={`addededCat--${initialCategory.id}`}>
                                    {initialCategory.name}
                                    <button
                                        onClick={(click) => handleDeleteExistingCategory(click, initialCategory)}
                                        key={`deletCat2--${initialCategory.id}`}
                                        className={styles["btn--removeCat"]}
                                    >X</button>
                                </div>
                        }
                    </div>
                })
            }

            { // Display newly added categories
                categoriesToPost.length > 0
                && categoriesToPost.map(includedCategory => {
                    const matchedCategory = allCategories.find(
                        category => category.id === includedCategory.id
                    )
                    return <div className={`${styles["addedCategory"]} ${styles["addedCategory--editForm"]}`} key={`addededCat2--${includedCategory.id}`}>
                        {matchedCategory?.name}
                        <button
                            onClick={(click) => handleRemoveCategory(click, includedCategory)}
                            className={`${styles["btn--removeItem"]} ${styles["btn--removeCat"]}`}
                        >X</button>
                    </div>
                })
            }
        </div>
        <section className="selectCategoryContainer">
            <div className={`form-group ${styles["selectCategories"]}`}>
                <label>Add a category tag:
                    <Select
                        className="category--select"
                        id="categoryChoices"
                        instanceId="categoryChoices"
                        options={allCategories}
                        onChange={(selectedOption) => {
                            const copy = { ...categoryToAdd }
                            copy.id = selectedOption?.id ?? 0
                            copy.name = selectedOption?.name ?? ""
                            updateCategoryToAdd(copy)
                        }}
                        getOptionLabel={(option) => option.name}
                        getOptionValue={(option) => String(option.id)}
                        placeholder="Select a Category"
                    />
                </label>
            </div>
        </section>
        <button className={styles["btn-secondary"]}
            onClick={
                (event) => { handleAddCategory(event) }
            }
        >Add Category Tag</button>
    </>
}