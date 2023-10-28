import { useState } from "react"
import "./PostInteraction.css"
import { useLocation } from "react-router-dom"

export const DeleteRecipe = ({ recipeId, recipeIngredients, recipeCategories, updateMainFeed, updateProfileFeed }) => {
    // Define state variable for if delete button was clicked
    const [showPrompt, setShowPrompt] = useState(false)

    const handleInitialDeleteClick = (event) => {
        event.preventDefault()
        setShowPrompt(true)
    }

    const handleCancelDelete = (event) => {
        event.preventDefault()
        setShowPrompt(false)
    }
    // Make copy of arrays to delete
    const ingredientsToDelete = [ ...recipeIngredients ]
    const categoriesToDelete = [ ...recipeCategories ]

    // Get the user's current location
    const location = useLocation()

    // Check if the user is viewing their profile to dynamically update the correct feed after deletion
    const viewingProfile = location.pathname.startsWith("/userprofile")

    const handleDeleteRecipe = (event) => {
      event.preventDefault();
    
      // Define function to DELETE the relationship objects
      const deleteRelationships = (arrayOfObjects, endpoint) => {
        const promises = arrayOfObjects.map((dataObject) => {
          return fetch(`http://localhost:8088/${endpoint}/${dataObject.id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
          }).then((response) => response.json());
        });
    
        return Promise.all(promises)
          .catch((error) => {
            console.error(error);
            throw error;
          });
      };
    
      // If there are ingredients to delete, make the fetch call, else, set variable equal to immediately resolved promise
      let deleteIngredientsPromise;
      if (ingredientsToDelete.length > 0) {
        deleteIngredientsPromise = deleteRelationships(ingredientsToDelete, "ingredientsInRecipes");
      } else {
        deleteIngredientsPromise = Promise.resolve();
      }
    
      // If there are categories to delete, make the fetch call, else, set variable equal to immediately resolved promise
      let deleteCategoriesPromise;
      if (categoriesToDelete.length > 0) {
        deleteCategoriesPromise = deleteRelationships(categoriesToDelete, "categoriesOfRecipes");
      } else {
        deleteCategoriesPromise = Promise.resolve();
      }
    
      // Wait for the ingredient and category deletions to complete
      Promise.all([deleteIngredientsPromise, deleteCategoriesPromise])
        .then(() => {
          // DELETE recipeCard
          fetch(`http://localhost:8088/recipeCards/${recipeId}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error('Unable to delete recipe');
              }
            })
            .then(() => {
              console.log('Recipe successfully deleted');
              // Update the user's recipe state for the feed they are currently viewing
              if (viewingProfile) { // If the user is on a profile, update profile feed
                updateProfileFeed()
              } else { // else, update main feed
                updateMainFeed()
              }
            })
            .catch((error) => {
              console.error('An error occurred:', error);
              window.alert('Something went wrong');
            });
        })
        .catch((error) => {
          console.error('An error occurred during ingredient or category deletion:', error);
          window.alert('Something went wrong');
        });
    };
    
    return <>
    
    

        {showPrompt
            ? 
                <div className="confirmation-prompt">
                    <p>Are you sure you want to delete?</p>
                    <button className="btn-secondary btn-group-left" onClick={(click) => handleDeleteRecipe(click)}>Delete</button>
                    <button className="btn-secondary btn-group-right" id="btn-cancel-dlt" onClick={(click) => handleCancelDelete(click)}>Cancel</button>
                </div>
            
            : 
                <button className="btn-secondary btn-group-right"
                    onClick={(click) => handleInitialDeleteClick(click)}
                >Delete</button>
            
        }
    </>
}