'use server'
import styles from './home.module.css'
import { getRecipes } from '@/dataManagers/recipeManagers/server/recipeManager'
import { RecipeFeed } from '@/components/Feed/RecipeFeed'
import { FeedChoice } from '@/components/home/filters/FeedChoice'
import { FilterBar } from '@/components/home/filters/FilterBar'
import { convertToQueryString, formatCategoryQueryParams } from '@/utils/helpers/formatQuery'
import { getCurrentUserId } from '@/dataManagers/authManagers/server/authManagers'
import { getCategories, getCategoryTypes } from '@/dataManagers/categoryManager'
import { Suspense } from 'react'

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

const chosenCategories = formatCategoryQueryParams(searchParams?.category)

  return <section className={styles["pageBody"]}>
    <Suspense>
        <FeedChoice 
        display={display}
        currentUserId={currentUserId} />
    </Suspense>

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
      <Suspense>
        <RecipeFeed recipes={recipes}
            currentUserId={currentUserId} />
      </Suspense>

    </div>
  </section>
}
export default Home