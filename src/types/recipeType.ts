export interface Recipe {
    id: number,
    title: string,
    description: string,
    genre: {
      id: number,
      name: string
    },
    prep_instructions: string,
    cook_instructions: string,
    prep_time: number,
    cook_time: number,
    serving_size: number,
    user: {
      id: number,
      full_name: string
    },
    note: string,
    image: string,
    created_on: string,
    included_ingredients: any[],
    categories: any[]
}