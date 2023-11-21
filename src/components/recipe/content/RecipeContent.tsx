import placeholderImg from "../../../../public/assets/food-placeholder-medium.svg"
import { Recipe } from "@/types/recipeType"
import { FavoriteButton } from "@/components/Feed/PostInteraction/FavoriteButton"
import Link from "next/link"
import { Nutrition } from "./Nutrition"
import { RecipeEditButton } from "./RecipeEditButton"

interface RecipeContentProps {
    recipeId: number,
    currentUserId: number,
    recipeDetails: Recipe,
    usersFavs: number[]
}

const RecipeContent = ( { recipeId, currentUserId, recipeDetails, usersFavs } : RecipeContentProps) => {
    const attachedIngredients = [ ...recipeDetails.included_ingredients ]
    const attachedCategories = [ ...recipeDetails.categories ]
    
    
    return <article className="recipeDetails">
        <header className="recipeDetails--header">
            <h1 className="recipeDetails--title">{recipeDetails.title}</h1>
        </header>

        <section className="recipeDetails--topContainer">
            {
                currentUserId !== 0 && recipeDetails?.user?.id !== currentUserId
                && <div className="recipeDetails_fav">
                    <FavoriteButton currentUserId={currentUserId} 
                    recipeId={recipeId}
                    usersFavs={usersFavs} />
                    </div>
            }
            {
                currentUserId !== 0 && recipeDetails?.user?.id === currentUserId
                    && <div className="recipeDetails_fav">
                        <RecipeEditButton recipeId={recipeId} authorId={recipeDetails.user.id} />
                    </div>
            }
        </section>

        <section className="recipeDetails__userInfo">
            <div><b>{recipeDetails?.genre?.name}</b></div>
            <div>Posted by: <Link href={""}>{recipeDetails?.user?.full_name}</Link></div>
        </section>
        <div className="recipeDetails__imageAndTimesContainer">
            <section className="recipeDetails__imgContainer">
                <div className="recipeDetails__imgWrapper">
                    {
                        recipeDetails?.image?.length > 0
                        ? <img className="recipeDetails--img" src={recipeDetails.image} alt="recipe" />
                        : <img className="recipeDetails--img" src={placeholderImg.src} alt="recipe" />
                    }
                </div>
            </section>
            <div className="recipeDetails__timesServingsDescription">
                <section className="recipeDetails_times">
                    <div className="recipeDetails_time"><div><b>Prep Time:</b></div>  <div>{recipeDetails.prep_time} minutes</div></div>
                    <div className="recipeDetails_time"><div><b>Cooking Time:</b></div>  <div>{recipeDetails.cook_time} minutes</div></div>
                    <div className="recipeDetails_time"><div><b>Total Time:</b></div>  <div>{recipeDetails.prep_time + recipeDetails.cook_time} minutes</div></div>
                </section>

                <section className="recipeDetails__servings">
                    <div><b>Servings:</b> {recipeDetails.serving_size}</div>
                </section>

                <section>
                    <div>
                        <h4>Description</h4>
                        <div className="recipeDetails--textblock" id="recipeDetails--desc" >{recipeDetails.description}</div>
                    </div>
                </section>
            </div>
        </div>
        
        <section className="IngrNutritionContainer">
            <div className="recipeDetails__ingredientContainer">
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

            <Nutrition
            recipeTitle={recipeDetails.title}
            attachedIngredients={attachedIngredients}
            servingSize={recipeDetails.serving_size} />
        </section>

        <section>
            <h4>Preparation</h4>
            <div className="recipeDetails--textblock" >{recipeDetails.prep_instructions}</div>
        </section>

        <section>
            <h4>Cooking Instructions</h4>
            <div className="recipeDetails--textblock" >{recipeDetails.cook_instructions}</div>
        </section>

        {
            recipeDetails.note
            && <section>
                <h4>Additional Notes and Tips</h4>
                <div className="recipeDetails--textblock" >{recipeDetails.note}</div>
            </section>
        }

        <section className="recipeDetails__categories">
            {
                attachedCategories.length > 0 &&
                attachedCategories.map(cat => {
                    return <div className="recipeDetails__category" key={`categorydetails--${cat.id}`}>
                        # {cat.name}
                    </div>
                })
            }
        </section>

    </article>
}
export default RecipeContent