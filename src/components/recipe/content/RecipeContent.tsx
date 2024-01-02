import placeholderImg from "../../../../public/assets/food-placeholder-medium.svg"
import { Recipe } from "@/types/recipeType"
import { FavoriteButton } from "@/components/Feed/PostInteraction/FavoriteButton"
import Link from "next/link"
import { Nutrition } from "./Nutrition"
import { RecipeEditButton } from "./RecipeEditButton"
import styles from "../recipe.module.css"
import { Suspense } from "react"
import Image from "next/image"

interface RecipeContentProps {
    recipeId: number,
    currentUserId: number,
    recipeDetails: Recipe,
    usersFavs: number[],
    loadNutrition: boolean
}

const RecipeContent = ({ recipeId, currentUserId, recipeDetails, usersFavs, loadNutrition }: RecipeContentProps) => {
    const attachedIngredients = [...recipeDetails.included_ingredients]
    const attachedCategories = [...recipeDetails.categories]


    return <main>
        <article className={styles["recipeDetails"]}>
            <header className={styles["recipeDetails--header"]}>
                <h1 className="recipeDetails--title">{recipeDetails.title}</h1>
            </header>

            <section className={styles["recipeDetails--topContainer"]}>
                {
                    currentUserId !== 0 && recipeDetails?.user?.id !== currentUserId
                    && <div className={styles["recipeDetails_fav"]}>
                        <FavoriteButton currentUserId={currentUserId}
                            recipeId={recipeId}
                            usersFavs={usersFavs} />
                    </div>
                }
                {
                    currentUserId !== 0 && recipeDetails?.user?.id === currentUserId
                    && <div className={styles["recipeDetails_fav"]}>
                        <RecipeEditButton recipeId={recipeId} />
                    </div>
                }
            </section>

            <section className={styles["recipeDetails__userInfo"]}>
                <div><b>{recipeDetails?.genre?.name}</b></div>
                <div>Posted by: <Link href={`/profile/${recipeDetails?.user?.id}#top`}>{recipeDetails?.user?.full_name}</Link></div>
            </section>
            <div className={styles["recipeDetails__imageAndTimesContainer"]}>
                <section className={styles["recipeDetails__imgContainer"]}>
                    <div className={styles["recipeDetails__imgWrapper"]}>
                        {
                            recipeDetails?.image?.length > 0
                                ? <Image className={styles["recipeDetails--img"]} fill={true} quality={100} sizes="(max-width: 720px) 98vw, 48vw" src={recipeDetails.image} alt="recipe" />
                                : <Image className={styles["recipeDetails--img"]} fill={true} sizes="(max-width: 720px) 98vw, 48vw" src={placeholderImg} alt="recipe" />
                        }
                    </div>
                </section>
                <div className={styles["recipeDetails__timesServingsDescription"]}>
                    <section className={styles["recipeDetails_times"]}>
                        <div className={styles["recipeDetails_time"]}><div><b>Prep Time:</b></div>  <div>{recipeDetails.prep_time} minutes</div></div>
                        <div className={styles["recipeDetails_time"]}><div><b>Cooking Time:</b></div>  <div>{recipeDetails.cook_time} minutes</div></div>
                        <div className={styles["recipeDetails_time"]}><div><b>Total Time:</b></div>  <div>{recipeDetails.prep_time + recipeDetails.cook_time} minutes</div></div>
                    </section>

                    <section className={styles["recipeDetails__servings"]}>
                        <div><b>Servings:</b> {recipeDetails.serving_size}</div>
                    </section>

                    <section>
                        <h4>Description</h4>
                        <div className={styles["recipeDetails--textblock"]} id={styles["recipeDetails--desc"]} >{recipeDetails.description}</div>
                    </section>
                </div>
            </div>

            <section className={styles["IngrNutritionContainer"]}>
                <div className={styles["recipeDetails__ingredientContainer"]}>
                    <h4>Ingredients</h4>
                    <ul>
                        {
                            attachedIngredients.length > 0 &&
                            attachedIngredients.map(ingr => {
                                return <li key={`ingredientdetails--${ingr.id}`}>
                                    {ingr.quantity} {ingr.quantity_unit} {ingr.name}
                                </li>
                            })
                        }
                    </ul>
                </div>

                <Suspense>
                    <Nutrition
                        recipeTitle={recipeDetails.title}
                        attachedIngredients={attachedIngredients}
                        servingSize={recipeDetails.serving_size}
                        loadNutrition={loadNutrition}
                        recipeId={recipeId} />
                </Suspense>
            </section>

            <section>
                <h4>Preparation</h4>
                <div className={styles["recipeDetails--textblock"]} >{recipeDetails.prep_instructions}</div>
            </section>

            <section>
                <h4>Cooking Instructions</h4>
                <div className={styles["recipeDetails--textblock"]} >{recipeDetails.cook_instructions}</div>
            </section>

            {
                recipeDetails.note
                && <section>
                    <h4>Additional Notes and Tips</h4>
                    <div className={styles["recipeDetails--textblock"]} >{recipeDetails.note}</div>
                </section>
            }

            <section className={styles["recipeDetails__categories"]}>
                {
                    attachedCategories.length > 0 &&
                    attachedCategories.map(cat => {
                        return <div className={styles["recipeDetails__category"]} key={`categorydetails--${cat.id}`}>
                            # {cat.name}
                        </div>
                    })
                }
            </section>

        </article>
    </main>
}
export default RecipeContent