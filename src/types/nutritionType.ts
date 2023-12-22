type Nutrient = {
    label: string,
    quantity: number,
    unit: string
}

type PercentDailyNutrient = {
    label: string,
    quantity: number,
    unit: '%'
}

type ParsedIngredient = {
    "quantity": number,
    "measure": string,
    "foodMatch": string,
    "food": string,
    "foodId": string,
    "weight": number,
    "retainedWeight": number,
    "nutrients": {
        "RIBF": Nutrient,
        "VITD": Nutrient,
        "THIA": Nutrient,
        "FAPU": Nutrient,
        "NIA": Nutrient,
        "ENERC_KCAL": Nutrient,
        "FASAT": Nutrient,
        "VITC": Nutrient,
        "PROCNT": Nutrient,
        "CHOLE": Nutrient,
        "FAMS": Nutrient,
        "CHOCDF": Nutrient,
        "FAT": Nutrient,
        "VITB6A": Nutrient,
        "VITB12": Nutrient,
        "WATER": Nutrient,
        "K": Nutrient,
        "P": Nutrient,
        "NA": Nutrient,
        "ZN": Nutrient,
        "CA": Nutrient,
        "MG": Nutrient,
        "FE": Nutrient,
        "FOLFD": Nutrient,
        "FOLAC": Nutrient,
        "FOLDFE": Nutrient
    },
    "measureURI": string,
    "status": string
}

type NutritionIngredient = {
    text: string,
    parsed: ParsedIngredient[]
}

export type NutritionSchema = {
    uri?: string,
    yield?: number,
    calories?: number,
    totalCO2Emissions?: number,
    co2EmissionsClass?: string,
    totalWeight?: number,
    dietLabels?: string[],
    healthLabels?: string[],
    cautions?: string[],
    totalNutrients?: {
        ENERC_KCAL: Nutrient,
        FAT: Nutrient,
        FASAT: Nutrient,
        FATRN: Nutrient,
        FAMS: Nutrient,
        FAPU: Nutrient,
        CHOCDF: Nutrient,
        'CHOCDF.net'?: Nutrient,
        FIBTG: Nutrient,
        SUGAR: Nutrient,
        'SUGAR.added'?: Nutrient,
        PROCNT: Nutrient,
        CHOLE: Nutrient,
        NA: Nutrient,
        CA: Nutrient,
        MG: Nutrient,
        K: Nutrient,
        FE: Nutrient,
        ZN: Nutrient,
        P: Nutrient,
        VITA_RAE: Nutrient,
        VITC: Nutrient,
        THIA: Nutrient,
        RIBF: Nutrient,
        NIA: Nutrient,
        VITB6A: Nutrient,
        FOLDFE: Nutrient,
        FOLFD: Nutrient,
        FOLAC: Nutrient,
        VITB12: Nutrient,
        VITD: Nutrient,
        TOCPHA: Nutrient,
        VITK1: Nutrient,
        WATER: Nutrient
    },
    totalDaily?: {
        ENERC_KCAL: PercentDailyNutrient,
        FAT: PercentDailyNutrient,
        FASAT: PercentDailyNutrient,
        FATRN?: PercentDailyNutrient,
        CHOCDF: PercentDailyNutrient,
        FIBTG: PercentDailyNutrient,
        PROCNT: PercentDailyNutrient,
        CHOLE: PercentDailyNutrient,
        NA: PercentDailyNutrient,
        CA: PercentDailyNutrient,
        MG: PercentDailyNutrient,
        K: PercentDailyNutrient,
        FE: PercentDailyNutrient,
        ZN: PercentDailyNutrient,
        P: PercentDailyNutrient,
        VITA_RAE: PercentDailyNutrient,
        VITC: PercentDailyNutrient,
        THIA: PercentDailyNutrient,
        RIBF: PercentDailyNutrient,
        SUGAR?: PercentDailyNutrient,
        'SUGAR.added'?: PercentDailyNutrient,
        NIA: PercentDailyNutrient,
        VITB6A: PercentDailyNutrient,
        FOLDFE: PercentDailyNutrient,
        VITB12: PercentDailyNutrient,
        VITD: PercentDailyNutrient,
        TOCPHA: PercentDailyNutrient,
        VITK1: PercentDailyNutrient
    },
    ingredients?: NutritionIngredient[],
    cuisineType?: string[],
    mealType?: string[],
    dishType?: string[],
    totalNutrientsKCal?: {
        ENERC_KCAL: Nutrient,
        PROCNT_KCAL: Nutrient,
        FAT_KCAL: Nutrient,
        CHOCDF_KCAL: Nutrient
    }
}