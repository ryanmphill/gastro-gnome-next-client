'use client'
import { getCategories, getCategoryTypes } from "@/dataManagers/categoryManager";
import { formatQuery } from "@/utils/helpers/formatQuery";
import { ChangeEvent, Dispatch, SetStateAction, useCallback, useEffect, useState } from "react"
import Select, { ActionMeta } from 'react-select';
import styles from "./HomeFilters.module.css"

interface Category {
    id: number,
    name: string,
    category_type: number,
    category_type_label: string
}

interface FilterByCategoriesProps {
    queryParams: string[],
    updateQueryParams: Dispatch<SetStateAction<string[]>>,
    fetchRecipes: (queryParams: string) => Promise<void>,
    chosenCategories: Category[],
    updateChosenCategories: Dispatch<SetStateAction<any[]>>
}

export const FilterByCategories = ({ queryParams, updateQueryParams, fetchRecipes, chosenCategories, updateChosenCategories} : FilterByCategoriesProps) => {
    
    interface CategoryType {
        id: number,
        label: string
    }
    // Define a state variable for fetched categories
    const [categories, setCategories] = useState<Category[]>([])
    // State variable for different types of categories 
    const [categoryTypes, setCategoryTypes] = useState<CategoryType[]>([])
    // State variable for the type of category selected by user in the 'filter by' dropdown
    const [chosenCategoryType, updateChosenCategoryType] = useState("")
    // State variable for which category options to display based on chosenCategoryType
    const [filteredCategories, setFilteredCategories] = useState<Category[]>([])
    

    // Fetch the list of categories
    const fetchCategories = useCallback(async () => {
        const allCategories = await getCategories()
        setCategories(allCategories)
    },[])

    // Fetch the list of category types
    const fetchCategoryTypes = useCallback(async () => {
        const allCategoryTypes = await getCategoryTypes()
        setCategoryTypes(allCategoryTypes)
    },[])

    useEffect(
        () => {
            // Get categories upon initial render
            fetchCategories()
        },
        [fetchCategories] 
    )

    useEffect(
        () => {
            // Get category types upon initial render
            fetchCategoryTypes()
        },
        [fetchCategoryTypes] 
    )

    // Filter the categories based on chosen category type
    const handleCategoryTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const selectedType = e.target.value
        updateChosenCategoryType(selectedType)

        if (selectedType !== "" && selectedType !== "View All") {
            const newCatList = categories.filter(category => category.category_type_label === selectedType)
            setFilteredCategories(newCatList)
        }

        if (selectedType === "View All") {
            setFilteredCategories(categories)
        }
    }

    /* Update filtered recipes when a category tag is chosen so that only recipes that match
       ALL chosen categories are displayed. On initial render and if no categories or search entered,
       set recipe list to default. */
    

    // Handle the selected category
    const handleSelectedCategory = (chosenCategory: Category | null) => {
        if (chosenCategory === null) {
            return;
        }
        // Get a copy of the current array of categories that are being used to filter
        const updatedCategories = [ ...chosenCategories ]
        // Check if the category has already been added
        const alreadyAdded = updatedCategories.some(category => category.id === chosenCategory.id)
        if (!alreadyAdded) {
            updatedCategories.push(chosenCategory)
            updateChosenCategories(updatedCategories)

            let updatedParams = [ ...queryParams, `category=${chosenCategory.id}` ]
            // Add new category query if exists
            
            updateQueryParams([ ...updatedParams ])
            const formattedQuery = formatQuery(updatedParams)
            fetchRecipes(formattedQuery)
        }
    }

    return <>
        <div className={styles["filterBar__categories"]}>
            <select
                className={styles["filterBar__categoryType"]}
                id="categoryTypeSelect"
                onChange={(e) => {
                    handleCategoryTypeChange(e)
                }}
            >   {/*Add options for filtering*/}
                <option value="0">Filter by:</option>
                {
                    categoryTypes.map(catType => <option value={catType.label} key={`catType--${catType.id}`}>{catType.label}</option>)
                }
                <option value="View All">-Search all-</option>
            </select>

            <Select
                className="filterBar__categorySelect"
                id="filterByCategories"
                instanceId="filterByCategories"
                classNamePrefix="categorySelect"
                options={filteredCategories}
                onChange={(selectedOption: Category | null, actionMeta: ActionMeta<Category>) => {
                    handleSelectedCategory(selectedOption)
                }}
                getOptionLabel={(option: Category) => option.name}
                getOptionValue={(option: Category) => option.id.toString()}
                placeholder="Select a Category"
            />
        </div>
    </>

}