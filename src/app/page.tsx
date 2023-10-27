'use client'

import Image from 'next/image'
import styles from './page.module.css'
import Link from 'next/link'
import { useCallback, useEffect, useState } from 'react'
import { getRecipes } from '@/dataManagers/recipeManager'
import { useAuthContext } from '@/context/AuthContext'
import { getCurrentUser } from '@/dataManagers/authManager'
import { useRouter } from 'next/navigation'
import { FeedChoice } from '@/components/home/FeedChoice'

const Home = () => {
  // Get the current user
  const localGastroUser:string | null = localStorage.getItem("gastro_user")
  const gastroUserObject = JSON.parse(localGastroUser)

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

  const { currentUserId, fetchCurrentUserId } = useAuthContext()
  const [recipes, setRecipes] = useState<Recipe[]>([]) // Observing initial state []


  /*--FILTER-OPTIONS--------------------------------------------------------------------------*/
  /* State for which posts to display at the broadest level. User can choose
     'discover', which shows 'allPosts', or 'my feed' which shows 'postsFollowed' - 
     posts from only users the current user is 'following' */
  type Display = "allPosts" | "postsFollowed"
  const [display, setDisplay] = useState<Display>("allPosts")
  // State for query params that affect which recipes are displayed
  const [queryParams, updateQueryParams] = useState<string[]>([])
  // State to allow recipes to be filtered by search query or by selected category tag
  const [filteredRecipes, setFilteredRecipes] = useState([])
  /*-------------------------------------------------------------------------------------------*/
  
  /*-GET RECIPES FETCH CALL-------------------------------------------------------------------------------*/
  // Fetch the list of recipes with user info expanded and ingredients and categories embedded
  const fetchRecipes = useCallback(async (queryParams: string) => {
      const recipeData = await getRecipes(queryParams)
      setRecipes(recipeData)
  },[])

  useEffect(
      () => {
          fetchRecipes("")
      },
      [fetchRecipes] // When this array is empty, you are observing initial component state
  )
  /*-----------------------------------------------------------------------------------------------------*/

  /*-GET CURRENT USER'S FOLLOW DATA-----------------------------------------------------------------------*/
  // Maintain 'follows' state here so that all listed recipes are updated when user is followed/unfollowed
  // Set a state variable for the user's follows
  const [usersFollows, updateUsersFollows] = useState([])

  // Define a function to fetch the current user with their follows embedded
  const fetchUsersFollows = useCallback(async () => {
      const userData = await getCurrentUser()
      const followArray = userData?.following
      updateUsersFollows(followArray)
  },[])

  // Get the data for the current user with their follows embedded on initial render
  useEffect(
      () => {
          fetchUsersFollows()
      },
      [] // When this array is empty, you are observing initial component state
  )
  /*-----------------------------------------------------------------------------------------------------*/
  
  // Assign a variable to useRouter()
  const router = useRouter()
  
  /* Render discover/my-feed tab, filter bar for searching/filtering by category, post recipe button,
     and recipe feed */
  return <section className="pageBody">

      <FeedChoice queryParams={queryParams}
              updateQueryParams={updateQueryParams}
              fetchRecipes={fetchRecipes} 
              display={display}
              setDisplay={setDisplay}/>
      

      <div className="feedControl">

          <FilterBar queryParams={queryParams}
              updateQueryParams={updateQueryParams}
              fetchRecipes={fetchRecipes} />


          {
              display === "allPosts"
                  ? <h2 className="discoverFade feedHeader">Discover New Recipes</h2>
                  : <h2 className="myFeedFade feedHeader">Recipes From People You're Following</h2>
          }



          <button className="btn-primary" onClick={() => router.push("/postrecipe")}>Post a Recipe</button>
          <RecipeFeed recipes={filteredRecipes}
              gastroUserObject={gastroUserObject}
              updateMainFeed={fetchRecipes}
              usersFollows={usersFollows}
              fetchUsersFollows={fetchUsersFollows} />

      </div>
  </section>
}
export default Home