'use client'

import { addToQuery } from "@/utils/helpers/formatQuery";
import { ChangeEvent, useState } from "react"
import Select, { ActionMeta } from 'react-select';
import styles from "./HomeFilters.module.css"
import { Category, CategoryType } from "@/types/categoryType";
import { useRouter, useSearchParams } from "next/navigation";

interface FilterByCategoriesProps {
    chosenCategories: string[],
    categories: Category[],
    categoryTypes: CategoryType[]
}

export const FilterByCategories = ({ chosenCategories, categories, categoryTypes }
    : FilterByCategoriesProps) => {

    // State variable for the type of category selected by user in the 'filter by' dropdown
    const [chosenCategoryType, updateChosenCategoryType] = useState<string>("0")
    // State variable for which category options to display based on chosenCategoryType
    const [filteredCategories, setFilteredCategories] = useState<Category[]>(categories)

    const searchParams = useSearchParams()
    const router = useRouter()

    // Filter the categories based on chosen category type
    const handleCategoryTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const selectedType = e.target.value
        updateChosenCategoryType(selectedType)

        if (selectedType !== "" && selectedType !== "View All") {
            const newCatList = categories.filter(category => category.category_type_label === selectedType)
            setFilteredCategories(newCatList)
        }

        if (selectedType === "View All" || selectedType === "0") {
            setFilteredCategories(categories)
        }
    }

    // Handle the selected category
    const handleSelectedCategory = (chosenCategory: Category | null) => {
        if (chosenCategory === null) {
            return;
        }
        // Get a copy of the current array of categories that are being used to filter
        const currentCategories = [...chosenCategories]
        // Check if the category has already been added
        const alreadyAdded = currentCategories.some(categoryName => categoryName === chosenCategory.name)
        if (!alreadyAdded) {
            const newQuery = addToQuery("category", `${chosenCategory.name}`, searchParams)
            router.push(newQuery, { scroll: false })
        }
    }

    return <>
        <div className={styles["filterBar__categories"]}>
            <select
                className={styles["filterBar__categoryType"]}
                id="categoryTypeSelect"
                value={chosenCategoryType}
                onChange={(e) => {
                    handleCategoryTypeChange(e)
                }}
            >   {/*Options for filtering*/}
                <option value="0">Filter Tags:</option>
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
                placeholder="Search Category Tags"
            />
        </div>
    </>

}