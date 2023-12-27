import { fetchNutrition } from "@/dataManagers/nutritionManager"
import { AttachedIngredient } from "@/types/ingredientType"
import styles from "../recipe.module.css"


interface NutritionProps {
    recipeTitle: string,
    attachedIngredients: AttachedIngredient[],
    servingSize: number
}

export const Nutrition = async ({ recipeTitle, attachedIngredients, servingSize }: NutritionProps) => {

    // Define function to build ingredient array to send to nutrition api
    const buildIngredientsArray = () => {
        let ingredientsToSend: string[] = []
        attachedIngredients.forEach(ingr => {
            ingredientsToSend.push(`${ingr.quantity} ${ingr.quantity_unit} ${ingr.name}`)
        })
        return ingredientsToSend
    }

    const nutritionIngr = buildIngredientsArray()

    const nutrition = await fetchNutrition(recipeTitle, nutritionIngr)

    // Define a function to format the numbers in the results
    const formatNum = (num: number | undefined) => {
        if (typeof num === 'number') {
            const oneServing = num / servingSize
            const roundedNum = Math.round(oneServing)
            return roundedNum
        } else {
            return "-"
        }
    }
    return <section className={styles["nutriFactsContainer"]}>
        {
            nutritionIngr.length > 0 && recipeTitle.length > 0 &&
            <section className={styles["nutriFactsWrapper"]}>

                <table className={styles["nutriFacts"]}>
                    <thead>
                        <tr>
                            <th><h2>Nutrition Facts</h2></th>
                        </tr>
                        <tr>
                            <th>Makes {servingSize} servings</th>
                        </tr>
                        <tr className={styles["heavyTableBorder"]}>
                            <th><h5>serving size: {formatNum(nutrition?.totalWeight)}g</h5></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>Amount Per Serving</th>
                        </tr>
                        <tr className={styles["mediumTableBorder"]}>
                            <th><h3>Calories</h3></th>
                            <td><h3>{formatNum(nutrition?.calories)}</h3></td>
                        </tr>
                        <tr className={styles["lightTableBorder"]}>
                            <td> </td>
                            <th>% Daily Value</th>
                        </tr>
                        <tr className={styles["lightTableBorder"]}>
                            <th>Total fat {formatNum(nutrition?.totalNutrients?.FAT?.quantity)} {nutrition?.totalNutrients?.FAT?.unit ?? "-"}</th>
                            <td>{formatNum(nutrition?.totalDaily?.FAT?.quantity)}{nutrition?.totalDaily?.FAT?.unit ?? "-"}</td>
                        </tr>
                        <tr className={styles["lightTableBorder"]}>
                            <td>Saturated fat {formatNum(nutrition?.totalNutrients?.FASAT?.quantity)} {nutrition?.totalNutrients?.FASAT?.unit ?? "-"}</td>
                            <td>{formatNum(nutrition?.totalDaily?.FASAT?.quantity)}{nutrition?.totalDaily?.FASAT?.unit ?? "-"}</td>
                        </tr>
                        <tr className={styles["lightTableBorder"]}>
                            <td>Trans fat {formatNum(nutrition?.totalNutrients?.FATRN?.quantity)} {nutrition?.totalNutrients?.FATRN?.unit ?? "-"}</td>
                            <td>{formatNum(nutrition?.totalDaily?.FATRN?.quantity)}{nutrition?.totalDaily?.FATRN?.unit ?? "-"}</td>
                        </tr>
                        <tr className={styles["lightTableBorder"]}>
                            <th>Cholesterol {formatNum(nutrition?.totalNutrients?.CHOLE?.quantity)} {nutrition?.totalNutrients?.CHOLE?.unit ?? "-"}</th>
                            <td>{formatNum(nutrition?.totalDaily?.CHOLE?.quantity)}{nutrition?.totalDaily?.CHOLE?.unit ?? "-"}</td>
                        </tr>
                        <tr className={styles["lightTableBorder"]}>
                            <th>Sodium {formatNum(nutrition?.totalNutrients?.NA?.quantity)} {nutrition?.totalNutrients?.NA?.unit ?? "-"}</th>
                            <td>{formatNum(nutrition?.totalDaily?.NA?.quantity)}{nutrition?.totalDaily?.NA?.unit ?? "-"}</td>
                        </tr>
                        <tr className={styles["lightTableBorder"]}>
                            <th>Total Carbohydrates {formatNum(nutrition?.totalNutrients?.CHOCDF?.quantity)} {nutrition?.totalNutrients?.CHOCDF?.unit ?? "-"}</th>
                            <td>{formatNum(nutrition?.totalDaily?.CHOCDF?.quantity)}{nutrition?.totalDaily?.CHOCDF?.unit ?? "-"}</td>
                        </tr>
                        <tr className={styles["lightTableBorder"]}>
                            <th>Dietary Fiber {formatNum(nutrition?.totalNutrients?.FIBTG?.quantity)} {nutrition?.totalNutrients?.FIBTG?.unit ?? "-"}</th>
                            <td>{formatNum(nutrition?.totalDaily?.FIBTG?.quantity)}{nutrition?.totalDaily?.FIBTG?.unit ?? "-"}</td>
                        </tr>
                        <tr className={styles["lightTableBorder"]}>
                            <th>Total Sugars {formatNum(nutrition?.totalNutrients?.SUGAR?.quantity)} {nutrition?.totalNutrients?.SUGAR?.unit ?? "-"}</th>
                            <td>{formatNum(nutrition?.totalDaily?.SUGAR?.quantity)}{nutrition?.totalDaily?.SUGAR?.unit ?? "-"}</td>
                        </tr>
                        <tr>
                            <td>Including added sugars {formatNum(nutrition?.totalNutrients?.[`SUGAR.added`]?.quantity)} {nutrition?.totalNutrients?.[`SUGAR.added`]?.unit ?? "-"}</td>
                            <td>{formatNum(nutrition?.totalDaily?.[`SUGAR.added`]?.quantity)}{nutrition?.totalDaily?.[`SUGAR.added`]?.unit ?? "-"}</td>
                        </tr>
                        <tr className={styles["heavyTableBorder"]}>
                            <th>Protein {formatNum(nutrition?.totalNutrients?.PROCNT?.quantity)} {nutrition?.totalNutrients?.PROCNT?.unit ?? "-"}</th>
                            <td>{formatNum(nutrition?.totalDaily?.PROCNT?.quantity)}{nutrition?.totalDaily?.PROCNT?.unit ?? "-"}</td>
                        </tr>
                        <tr className={styles["lightTableBorder"]}>
                            <td>Vitamin D {formatNum(nutrition?.totalNutrients?.VITD?.quantity)} {nutrition?.totalNutrients?.VITD?.unit ?? "-"}</td>
                            <td>{formatNum(nutrition?.totalDaily?.VITD?.quantity)}{nutrition?.totalDaily?.VITD?.unit ?? "-"}</td>
                        </tr>
                        <tr className={styles["lightTableBorder"]}>
                            <td>Calcium {formatNum(nutrition?.totalNutrients?.CA?.quantity)} {nutrition?.totalNutrients?.CA?.unit ?? "-"}</td>
                            <td>{formatNum(nutrition?.totalDaily?.CA?.quantity)}{nutrition?.totalDaily?.CA?.unit ?? "-"}</td>
                        </tr>
                        <tr className={styles["lightTableBorder"]}>
                            <td>Iron {formatNum(nutrition?.totalNutrients?.FE?.quantity)} {nutrition?.totalNutrients?.FE?.unit ?? "-"}</td>
                            <td>{formatNum(nutrition?.totalDaily?.FE?.quantity)}{nutrition?.totalDaily?.FE?.unit ?? "-"}</td>
                        </tr>
                        <tr className={styles["mediumTableBorder"]}>
                            <td>Potassium {formatNum(nutrition?.totalNutrients?.K?.quantity)} {nutrition?.totalNutrients?.K?.unit ?? "-"}</td>
                            <td>{formatNum(nutrition?.totalDaily?.K?.quantity)}{nutrition?.totalDaily?.K?.unit ?? "-"}</td>
                        </tr>
                    </tbody>
                </table>
                <footer className={styles["attributionContainer"]}>
                    <img src="https://developer.edamam.com/images/badge.svg" alt="Edamam Logo" className={styles["nutriAttribution"]}></img>
                </footer>
            </section>
        }
    </section>
}