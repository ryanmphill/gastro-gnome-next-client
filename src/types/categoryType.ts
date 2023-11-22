export type Category = {
    id: number,
    name: string,
    category_type: number,
    category_type_label: string
}

export type CategoryType = {
    id: number,
    label: string
}

export type AttachedCategory = {
    id: number,
    name: string
}