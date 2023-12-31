export type Category = {
    id: number,
    name: string,
    category_type: number,
    category_type_label: string,
    public: boolean,
    created_by: number
}

export type CategoryType = {
    id: number,
    label: string
}

export type AttachedCategory = {
    id: number,
    name: string
}

export type CategoryToAdd = {
    categoryId: number,
    name: string
}