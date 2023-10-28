import placeholderImg from "../../assets/food-placeholder-medium.svg"

export const RecipeFeed = ({recipes, gastroUserObject, updateMainFeed, usersFollows, fetchUsersFollows }) => {
    const navigate = useNavigate()

    return <article className="recipeFeed">
    {
        recipes.map(
            (recipe) => {
                const recipeCardImg = recipe.image.length > 0 ? recipe.image : placeholderImg
                const bgImageStyle = { /*Dynamically set recipe image as background for div element*/
                    '--bg-image': `url(${recipeCardImg})`,
                }
                

                return <section className="recipe" key={`recipe--${recipe.id}`}>
                    <div className="recipe--imgContainer" style={bgImageStyle} onClick={() => navigate(`/recipe/${recipe.id}`)}></div>
                    <div className="recipe--content">
                        <div className="recipe--headerContainer"><h3><Link className="recipe--header" to={`/recipe/${recipe.id}`}>{recipe.title}</Link></h3></div>
                        <div>{recipe.description}</div>
                        <div className="recipe__userContainer">
                            <div>Posted by: <Link to={`/userprofile/${recipe?.user?.id}`}>{recipe?.user?.name}</Link></div>
                            {
                                gastroUserObject.id !== recipe.userId
                                && <FollowButton
                                    gastroUserObject={gastroUserObject}
                                    userToFollowId={recipe.userId}
                                    usersFollows={usersFollows}
                                    fetchUsersFollows={fetchUsersFollows} />
                            }
                        </div>
                        <footer className="recipe--footer">
                            {
                                gastroUserObject.id === recipe.userId
                                    ? <div className="recipe__button-group">
                                        <button className="btn-secondary btn-group-left"
                                            onClick={(evt) => {
                                                evt.preventDefault()
                                                navigate(`/recipe/${recipe.id}/edit/${recipe.userId}`)
                                            }}
                                        >Edit</button>

                                        <DeleteRecipe recipeId={recipe.id}
                                            recipeIngredients={recipe.ingredientsInRecipes}
                                            recipeCategories={recipe.categoriesOfRecipes}
                                            updateMainFeed={updateMainFeed} />
                                    </div>
                                    : <FavoriteButton recipe={recipe} />
                            }
                        </footer>
                    </div>
                    
                </section>
            }
        )
    }
</article>
}