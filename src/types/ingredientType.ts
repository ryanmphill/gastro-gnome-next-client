export type AttachedIngredient = {
    id: number,
    ingredient: number,
    recipe: number,
    quantity: string,
    quantity_unit: string,
    name: string
}

export type Ingredient = {
    id: number,
    name: string
}

export type IngredientToAdd = {
    ingredient: number,
    name: string,
    quantity: string,
    quantity_unit: string
}