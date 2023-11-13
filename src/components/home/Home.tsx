'use server'
import styles from './home.module.css'
import { getRecipes } from '@/dataManagers/recipeManagers/server/recipeManager'
import { RecipeFeed } from '@/components/Feed/RecipeFeed'
import { FeedChoice } from '@/components/home/filters/FeedChoice'
import { FilterBar } from '@/components/home/filters/FilterBar'
import { convertToQueryString, formatCategoryQueryParams } from '@/utils/helpers/formatQuery'
import { getCurrentUserId } from '@/dataManagers/authManagers/server/authManagers'
import { getCategories, getCategoryTypes } from '@/dataManagers/categoryManager'

interface searchParamsProp {
    searchParams?: {
        search?: string,
        category?: string[] | string,
        following?: string
    }
}

const Home = async ({ searchParams } : searchParamsProp ) => {
console.log("query", searchParams)
const queryString = searchParams ? convertToQueryString(searchParams) : ""
const display = searchParams && searchParams.following === "true" ? "postsFollowed" : "allPosts"
const recipeData = getRecipes(queryString)
const currentUserIdData = getCurrentUserId()
const categoryData = getCategories()
const categoryTypeData = getCategoryTypes()
const [
    recipes, 
    currentUserId, 
    categories, 
    categoryTypes
] = await Promise.all([
    recipeData, 
    currentUserIdData, 
    categoryData, 
    categoryTypeData
])

console.log("selectedCategories:", searchParams?.category)
const chosenCategories = formatCategoryQueryParams(searchParams?.category)
console.log("formatted categories:", chosenCategories)
//   const [recipes, setRecipes] = useState<Recipe[]>([])
//   type Display = "allPosts" | "postsFollowed"
//   const [display, setDisplay] = useState<Display>("allPosts")
//   // State for query params that affect which recipes are displayed
//   const [queryParams, updateQueryParams] = useState<string[]>([])
  /*-------------------------------------------------------------------------------------------*/

  /*-FETCH CALLS-------------------------------------------------------------------------------*/
  // Fetch the list of recipes with user info expanded and ingredients and categories embedded
//   const fetchRecipes = useCallback(async (queryParams: string) => {
//     const recipeData = await getRecipes(queryParams)
//     setRecipes(recipeData)
//   }, [])

//   useEffect(
//     () => {
//       fetchRecipes("")
//     },
//     [fetchRecipes] 
//   )

  /*-----------------------------------------------------------------------------------------------------*/


  return <section className={styles["pageBody"]}>
    <FeedChoice 
      display={display}
      currentUserId={currentUserId} />

    <div className="feedControl">

      <FilterBar
        categories={categories}
        categoryTypes={categoryTypes} 
        chosenCategories={chosenCategories}/>

      {
        display === "allPosts"
          ? <h2 className={`${styles["discoverFade"]} ${styles["feedHeader"]}`}>Discover New Recipes</h2>
          : <h2 className={`${styles["myFeedFade"]} ${styles["feedHeader"]}`}>Recipes From People You're Following</h2>
      }

      <button className={styles["btn-primary"]}>Post a Recipe</button>
      <RecipeFeed recipes={recipes} />

    </div>
  </section>
}
export default Home