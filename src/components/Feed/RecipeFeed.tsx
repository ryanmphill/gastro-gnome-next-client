import { useRouter } from "next/navigation"
import placeholderImg from "../../../public/assets/food-placeholder-medium.svg"
import Link from "next/link"
import { useAuthContext } from "@/context/AuthContext"
import { FollowButton } from "./PostInteraction/FollowButton"
import { DeleteRecipe } from "./PostInteraction/DeleteRecipe"
import { FavoriteButton } from "./PostInteraction/FavoriteButton"
import styles from "./RecipeFeed.module.css"
import { Recipe } from "@/types/recipeType"

interface RecipeFeedProps {
    recipes: Recipe[],
    updateMainFeed: (queryParams: string) => Promise<void>,
    usersFollows: number[],
    fetchUsersFollows: () => Promise<void>,
    queryParams: string[]
}

export const RecipeFeed = ({recipes, updateMainFeed, usersFollows, fetchUsersFollows, queryParams } : RecipeFeedProps) => {
    const { currentUserId } = useAuthContext()
    const router = useRouter()

    return <article className="recipeFeed">
    {
        recipes.map(
            (recipe) => {
                const recipeCardImg = recipe.image.length > 0 ? recipe.image : placeholderImg

                interface BgImageStyle extends React.CSSProperties {
                    '--bg-image': string
                } 
                
                const bgImageStyle: BgImageStyle = { /*Dynamically set recipe image as background for div element*/
                    '--bg-image': `url(${recipeCardImg})`,
                }
                

                return <section className={styles["recipe"]} key={`recipe--${recipe.id}`}>
                    <div className={styles["recipe--imgContainer"]} style={bgImageStyle} onClick={() => router.push(`/recipe/${recipe.id}`)}></div>
                    <div className={styles["recipe--content"]}>
                        <div className={styles["recipe--headerContainer"]}><h3><Link className={styles["recipe--header"]} href={`/recipe/${recipe.id}`}>{recipe.title}</Link></h3></div>
                        <div>{recipe.description}</div>
                        <div className={styles["recipe__userContainer"]}>
                            <div>Posted by: <Link href={`/userprofile/${recipe?.user?.id}`}>{recipe?.user?.full_name}</Link></div>
                            {
                                currentUserId !== recipe?.user?.id && currentUserId !== 0
                                && <FollowButton
                                    userToFollowId={recipe.user.id}
                                    usersFollows={usersFollows}
                                    fetchUsersFollows={fetchUsersFollows} />
                            }
                        </div>
                        <footer className={styles["recipe--footer"]}>
                            {
                                currentUserId === recipe?.user?.id
                                    && <div className="recipe__button-group">
                                        <button className={`${styles["btn-secondary"]} ${styles["btn-group-left"]}`}
                                            onClick={(evt) => {
                                                evt.preventDefault()
                                                router.push(`/recipe/${recipe.id}/edit/${recipe.user.id}`)
                                            }}
                                        >Edit</button>

                                        <DeleteRecipe recipeId={recipe.id}
                                            updateMainFeed={updateMainFeed}
                                            queryParams={queryParams} />
                                    </div>
                            }
                            {
                                currentUserId !== recipe?.user?.id && currentUserId !== 0
                                && <FavoriteButton recipeId={recipe.id} />
                            }
                        </footer>
                    </div>
                    
                </section>
            }
        )
    }
</article>
}