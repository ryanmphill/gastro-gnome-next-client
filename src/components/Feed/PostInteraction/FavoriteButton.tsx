import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"


export const FavoriteButton = ( {recipe, updateProfileFavs} ) => {
    // get the current user
    const localGastroUser = localStorage.getItem("gastro_user")
    const gastroUserObject = JSON.parse(localGastroUser)

    // Get the current location
    const location = useLocation()

    // Check if the user is viewing their profile to dynamically update the profile's list of favorites
    const viewingProfile = location.pathname === `/userprofile/${gastroUserObject.id}`

    // Set a state variable for the user's favorites
    const [usersFavs, updateUsersFavs] = useState([])

    // Define a variable for the favorite object to be POSTed
    const favoriteObjectToPost = {
        userId: gastroUserObject.id,
        recipeCardId: recipe.id
    }

    // Define a function to fetch the current user with their favorites embedded
    const fetchUserFavs = () => {
        fetch(`http://localhost:8088/users/${gastroUserObject.id}?_embed=favorites`)
                .then(response => response.json())
                .then((userObject) => {
                    const favoriteArray = userObject.favorites
                    updateUsersFavs(favoriteArray)
                })
    }

    // Get the data for the current user with their favorites embedded on initial render
    useEffect(
        () => {
            fetchUserFavs()
        },
        [] // When this array is empty, you are observing initial component state
    )

    // Handle the click to favorite a post
    const handleFavorite = (event) => {
        event.preventDefault()
        
        // POST favorite object to API ///////////////////////////////////
        fetch("http://localhost:8088/favorites", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(favoriteObjectToPost)
        })
            .then(response => {
                if (response.ok) {
                    return response.json() // Await the response.json() Promise
                } else {
                    throw new Error("Unable to favorite recipe");
                }
            })
            .then(() => {
                // Update the user's list of favorites state
                fetchUserFavs()
            })
            .catch(error => {
                console.error("An error occurred:", error);
                window.alert("Something went wrong");
            })
        
    }

    // Handle the click to unfavorite a post
    const handleUndoFavorite = (event) => {
        event.preventDefault()
        // Find the favorite relationship between the user and recipeCard
        const favToDelete = usersFavs.find(userFav => userFav.recipeCardId === recipe.id)

        //DELETE the favorite object
        fetch(`http://localhost:8088/favorites/${favToDelete.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then((response) => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error('Unable to undo favorite')
                }
            })
            .then(() => {
                // Update the user's list of favorites state
                if (viewingProfile) { // If the user is on their profile, remove the recipe from view
                    updateProfileFavs()
                } else { // else, change the button from 'favorited ⭐' to 'favorite ☆'
                    fetchUserFavs()
                }
            })
            .catch((error) => {
                console.error('An error occurred:', error)
                window.alert('Something went wrong')
            })
            
    }

    /*Define a variable with a value of true if the user has already favorited this post, and false 
    if they haven't favorited this post yet*/
    const alreadyFavorited = usersFavs.some(userFav => userFav.recipeCardId === recipe.id)

    // Return the UI
    return <>
        {
            !alreadyFavorited
                ? <button className="btn-secondary" onClick={click => handleFavorite(click)}>Favorite ☆</button>
                : <button className="btn-secondary" id="btn-faved" onClick={click => handleUndoFavorite(click)}>Favorited <div className="favstar"></div></button>
        }
    </>
}