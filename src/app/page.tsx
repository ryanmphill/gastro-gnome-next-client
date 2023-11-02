'use client'
import styles from './page.module.css'
import { useCallback, useEffect, useState } from 'react'
import { getRecipes } from '@/dataManagers/recipeManager'
import { useAuthContext } from '@/context/AuthContext'
import { getCurrentUser } from '@/dataManagers/authManager'
import { useRouter } from 'next/navigation'
import { RecipeFeed } from '@/components/Feed/RecipeFeed'
import { FeedChoice } from '@/components/home/filters/FeedChoice'
import { FilterBar } from '@/components/home/filters/FilterBar'
import { Recipe } from '@/types/recipeType'

const Home = () => {
  const { currentUserId } = useAuthContext()
  const [recipes, setRecipes] = useState<Recipe[]>([])
  type Display = "allPosts" | "postsFollowed"
  const [display, setDisplay] = useState<Display>("allPosts")
  // State for query params that affect which recipes are displayed
  const [queryParams, updateQueryParams] = useState<string[]>([])
  const [usersFollows, updateUsersFollows] = useState<number[]>([])
  /*-------------------------------------------------------------------------------------------*/

  /*-FETCH CALLS-------------------------------------------------------------------------------*/
  // Fetch the list of recipes with user info expanded and ingredients and categories embedded
  const fetchRecipes = useCallback(async (queryParams: string) => {
    const recipeData = await getRecipes(queryParams)
    setRecipes(recipeData)
  }, [])

  // Function to retrieve users followed from the current user's data
  const fetchUsersFollows = useCallback(async () => {
    const userData = await getCurrentUser()
    const followArray = userData?.following
    updateUsersFollows(followArray)
  }, [])

  useEffect(
    () => {
      fetchRecipes("")
    },
    [fetchRecipes] // When this array is empty, you are observing initial component state
  )

  // Get the data for the current user with their follows embedded on initial render
  useEffect(
    () => {
      if (currentUserId !== 0) {
        fetchUsersFollows()
      }
    },
    [fetchUsersFollows, currentUserId]
  )
  /*-----------------------------------------------------------------------------------------------------*/

  // Assign a variable to useRouter()
  const router = useRouter()

  return <section className={styles["pageBody"]}>
    <FeedChoice queryParams={queryParams}
      updateQueryParams={updateQueryParams}
      fetchRecipes={fetchRecipes}
      display={display}
      setDisplay={setDisplay} />

    <div className="feedControl">

      <FilterBar queryParams={queryParams}
        updateQueryParams={updateQueryParams}
        fetchRecipes={fetchRecipes} />

      {
        display === "allPosts"
          ? <h2 className={`${styles["discoverFade"]} ${styles["feedHeader"]}`}>Discover New Recipes</h2>
          : <h2 className={`${styles["myFeedFade"]} ${styles["feedHeader"]}`}>Recipes From People You're Following</h2>
      }

      <button className={styles["btn-primary"]} onClick={() => router.push("/postrecipe")}>Post a Recipe</button>
      <RecipeFeed recipes={recipes}
        updateMainFeed={fetchRecipes}
        usersFollows={usersFollows}
        fetchUsersFollows={fetchUsersFollows}
        queryParams={queryParams} />

    </div>
  </section>
}
export default Home