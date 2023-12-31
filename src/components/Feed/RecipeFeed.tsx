import placeholderImg from "../../../public/assets/food-placeholder-medium.svg"
import Link from "next/link"
import { FollowButton } from "./PostInteraction/FollowButton"
import { DeleteRecipe } from "./PostInteraction/DeleteRecipe"
import { FavoriteButton } from "./PostInteraction/FavoriteButton"
import styles from "./RecipeFeed.module.css"
import { Recipe } from "@/types/recipeType"
import { RecipeImage } from "./PostInteraction/RecipeImage"
import { BgImageStyle } from "@/types/bgImageType"
import { EditButton } from "./PostInteraction/EditButton"
import { getCurrentUserFavorites, getCurrentUserFollows } from "@/dataManagers/userManager"
import { Suspense } from "react"

interface RecipeFeedProps {
    recipes: Recipe[],
    currentUserId: number
}

export const RecipeFeed = async ({ recipes, currentUserId }: RecipeFeedProps) => {
    const usersFollowsData = getCurrentUserFollows()
    const usersFavsData = getCurrentUserFavorites()
    const [usersFollows, usersFavs] = await Promise.all([usersFollowsData, usersFavsData])

    return <section className="recipeFeed">
        {
            recipes.map(
                (recipe) => {
                    const recipeCardImg = recipe.image.length > 0 ? recipe.image : placeholderImg.src

                    const bgImageStyle: BgImageStyle = { /*Dynamically set recipe image as background for div element*/
                        '--bg-image': `url(${recipeCardImg})`,
                    }


                    return <article className={styles["recipe"]} key={`recipe--${recipe.id}`}>
                        <RecipeImage recipeId={recipe.id} bgImageStyle={bgImageStyle} />
                        <section className={styles["recipe--content"]}>
                            <header className={styles["recipe--headerContainer"]}>
                                <h3>
                                    <Link className={styles["recipe--header"]} href={`/recipe/${recipe.id}`}>
                                        {recipe.title}
                                    </Link>
                                </h3>
                            </header>
                            <p>{recipe.description}</p>
                            <section className={styles["recipe__userContainer"]}>
                                <p>Posted by: <Link href={`/profile/${recipe?.user?.id}#top`}>{recipe?.user?.full_name}</Link></p>
                                {
                                    currentUserId !== recipe?.user?.id && currentUserId !== 0
                                    && <Suspense>
                                        <FollowButton
                                            userToFollowId={recipe.user.id}
                                            usersFollows={usersFollows} />
                                    </Suspense>
                                }
                            </section>
                            <footer className={styles["recipe--footer"]}>
                                {
                                    currentUserId === recipe?.user?.id
                                    && <div className="recipe__button-group">
                                        <EditButton recipeId={recipe.id} />
                                        <DeleteRecipe recipeId={recipe.id} />
                                    </div>
                                }
                                {
                                    currentUserId !== recipe?.user?.id && currentUserId !== 0
                                    && <Suspense>
                                        <FavoriteButton
                                            currentUserId={currentUserId}
                                            recipeId={recipe.id}
                                            usersFavs={usersFavs} />
                                    </Suspense>
                                }
                            </footer>
                        </section>

                    </article>
                }
            )
        }
    </section>
}