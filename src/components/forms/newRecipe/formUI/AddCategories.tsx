'use client'
import { Category, CategoryToAdd } from '@/types/categoryType';
import { Dispatch, MouseEvent, SetStateAction, useState } from 'react';
import Select from 'react-select';
import styles from "../../recipeForm.module.css"

interface AddCategoriesProps {
    includedCategories: CategoryToAdd[],
    allCategories: Category[],
    updateIncludedCategories: Dispatch<SetStateAction<CategoryToAdd[]>>
}

/**Renders a searchable select with a button for adding multiple category 'tags' to a recipe
 * 
 * Added categories are displayed above the searchable select
 */
export const AddCategories = ({
    includedCategories, allCategories, updateIncludedCategories
}: AddCategoriesProps) => {

    const [categoryToAdd, updateCategoryToAdd] = useState<CategoryToAdd>(
        {
            "categoryId": 0,
            "name": ""
        }
    )

    const handleAddCategory = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        // Check if a category has been selected
        if (categoryToAdd.categoryId > 0) {
            // Get a copy of the current array of categories that are staged to be added
            const copy = [...includedCategories]
            // Check if the category has already been added
            const alreadyAdded = copy.some(category => category.categoryId === categoryToAdd.categoryId)
            if (!alreadyAdded) {
                copy.push(categoryToAdd)
                updateIncludedCategories(copy)
            } else {
                window.alert("That tag has already been added")
            }
        } else {
            window.alert("Please select a category tag")
        }
    }

    const handleRemoveCategory = (event: MouseEvent<HTMLButtonElement>, objectToRemove: CategoryToAdd) => {
        event.preventDefault()
        const updatedCategories = includedCategories.filter(category => category.categoryId !== objectToRemove.categoryId)
        updateIncludedCategories(updatedCategories)

    }

    return <>
        <div className={styles["addedCategories"]}>
            {
                includedCategories.length > 0
                && includedCategories.map(includedCategory =>
                    <div className={styles["addedCategory"]} key={`addededCat--${includedCategory.categoryId}`}>
                        {includedCategory.name}
                        <button
                            onClick={(click) => handleRemoveCategory(click, includedCategory)}
                            className={`${styles["btn--removeItem"]} ${styles["btn--removeCat"]}`}
                        >X</button>
                    </div>
                )
            }
        </div>

        <div className={`form-group ${styles["selectCategories"]}`}>
            <label>Add a category tag:
                <Select
                    className="category--select"
                    id="categoryChoices"
                    instanceId="categoryChoices"
                    options={allCategories}
                    onChange={(selectedOption) => {
                        const copy = { ...categoryToAdd }
                        copy.categoryId = selectedOption?.id ?? 0
                        copy.name = selectedOption?.name ?? ""
                        updateCategoryToAdd(copy)
                    }}
                    getOptionLabel={(option) => option.name}
                    getOptionValue={(option) => String(option.id)}
                    placeholder="Select a Category"
                />
            </label>
        </div>

        <button className={styles["btn-secondary"]}
            onClick={
                (event) => { handleAddCategory(event) }
            }
        >Add Category Tag</button>
    </>
}