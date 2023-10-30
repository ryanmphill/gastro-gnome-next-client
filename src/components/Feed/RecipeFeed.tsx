import { useRouter } from "next/navigation"
import placeholderImg from "../../../public/assets/food-placeholder-medium.svg"
import Link from "next/link"
import { useAuthContext } from "@/context/AuthContext"
import { FollowButton } from "./PostInteraction/FollowButton"
import { DeleteRecipe } from "./PostInteraction/DeleteRecipe"
import { FavoriteButton } from "./PostInteraction/FavoriteButton"

interface Recipe {
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

interface RecipeFeedProps {
    recipes: Recipe[],
    updateMainFeed: (queryParams: string) => Promise<void>,
    usersFollows: number[],
    fetchUsersFollows: () => Promise<void>,
    queryParams: string[]
}

export const RecipeFeed = ({recipes, updateMainFeed, usersFollows, fetchUsersFollows, queryParams } : RecipeFeedProps) => {
    const { currentUserId, fetchCurrentUserId } = useAuthContext()
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
                

                return <section className="recipe" key={`recipe--${recipe.id}`}>
                    <div className="recipe--imgContainer" style={bgImageStyle} onClick={() => router.push(`/recipe/${recipe.id}`)}></div>
                    <div className="recipe--content">
                        <div className="recipe--headerContainer"><h3><Link className="recipe--header" href={`/recipe/${recipe.id}`}>{recipe.title}</Link></h3></div>
                        <div>{recipe.description}</div>
                        <div className="recipe__userContainer">
                            <div>Posted by: <Link href={`/userprofile/${recipe?.user?.id}`}>{recipe?.user?.full_name}</Link></div>
                            {
                                currentUserId !== recipe?.user?.id
                                && <FollowButton
                                    userToFollowId={recipe.user.id}
                                    usersFollows={usersFollows}
                                    fetchUsersFollows={fetchUsersFollows} />
                            }
                        </div>
                        <footer className="recipe--footer">
                            {
                                currentUserId === recipe?.user?.id
                                    ? <div className="recipe__button-group">
                                        <button className="btn-secondary btn-group-left"
                                            onClick={(evt) => {
                                                evt.preventDefault()
                                                router.push(`/recipe/${recipe.id}/edit/${recipe.user.id}`)
                                            }}
                                        >Edit</button>

                                        <DeleteRecipe recipeId={recipe.id}
                                            updateMainFeed={updateMainFeed}
                                            queryParams={queryParams} />
                                    </div>
                                    : <FavoriteButton recipeId={recipe.id} />
                            }
                        </footer>
                    </div>
                    
                </section>
            }
        )
    }
</article>
}