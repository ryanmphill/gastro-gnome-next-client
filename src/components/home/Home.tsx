import styles from './home.module.css'
import { getRecipes } from '@/dataManagers/recipeManagers/recipeManager'
import { RecipeFeed } from '@/components/Feed/RecipeFeed'
import { FeedChoice } from '@/components/home/filters/FeedChoice'
import { FilterBar } from '@/components/home/filters/FilterBar'
import { convertObjectToQueryString, formatCategoryParamsAsArray } from '@/utils/helpers/formatQuery'
import { getCurrentUserId } from '@/dataManagers/authManagers/authManagers'
import { getCategories, getCategoryTypes } from '@/dataManagers/categoryManager'
import { Suspense } from 'react'
import Link from 'next/link'

interface searchParamsProp {
  searchParams?: {
    search?: string,
    category?: string[] | string,
    following?: string
  }
}

const Home = async ({ searchParams }: searchParamsProp) => {
  const queryString = searchParams ? convertObjectToQueryString(searchParams) : ""
  const display = searchParams && searchParams.following === "true" ? "postsFollowed" : "allPosts"
  const chosenCategoryArray = formatCategoryParamsAsArray(searchParams?.category)

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

  return <main className={styles["pageBody"]}>
    <Suspense>
      <FeedChoice
        display={display}
        currentUserId={currentUserId} />
    </Suspense>
    <FilterBar
      categories={categories}
      categoryTypes={categoryTypes}
      chosenCategories={chosenCategoryArray} />
    {
      display === "allPosts"
        ? <h2 className={`${styles["discoverFade"]} ${styles["feedHeader"]}`}>Discover New Recipes</h2>
        : <h2 className={`${styles["myFeedFade"]} ${styles["feedHeader"]}`}>Recipes From People You&apos;re Following</h2>
    }
    <Link className={styles["newRecipeLink"]} href={"/new-recipe"}>
      <button className={styles["btn-primary"]}>Post a Recipe</button>
    </Link>
    <Suspense>
      <RecipeFeed recipes={recipes}
        currentUserId={currentUserId} />
    </Suspense>
  </main>
}
export default Home