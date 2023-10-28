import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import followImg from "../../assets/follow.png"
import followingImg from "../../assets/following.png"
import "./PostInteraction.css"


export const FollowButton = ({ gastroUserObject, userToFollowId, usersFollows, fetchUsersFollows, updateProfileFollowList }) => {
    
    // Get the current location
    const location = useLocation()

    // Check if the user is viewing their profile to dynamically update the profile's list of follows
    const viewingProfile = location.pathname === `/userprofile/${gastroUserObject.id}`

    // Set a state varialbe for if the user is following
    const [alreadyFollowed, updateAlreadyFollowed] = useState(false)

    // Define a variable for the follow object to be POSTed
    const followObjectToPost = {
        userId: gastroUserObject.id,
        whoIsFollowed: userToFollowId
    }

    

    // Use the array of follows and update the alreadyFollowed state
    useEffect(
        () => {
            const isFollowing = usersFollows.some(userFollow => userFollow.whoIsFollowed === userToFollowId)
            if (isFollowing) {
                updateAlreadyFollowed(true)
            } else {
                updateAlreadyFollowed(false)
            }
        },
        [usersFollows, userToFollowId]
    )

    // Handle the click to follow a user
    const handleFollow = (event) => {
        event.preventDefault()
        
        // POST follow object to API ///////////////////////////////////
        fetch("http://localhost:8088/follows", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(followObjectToPost)
        })
            .then(response => {
                if (response.ok) {
                    return response.json() // Await the response.json() Promise
                } else {
                    throw new Error("Unable to follow user");
                }
            })
            .then(() => {
                // Update the user's list of follows state
                fetchUsersFollows()
                if (viewingProfile && updateProfileFollowList) {
                    updateProfileFollowList()
                }
            })
            .catch(error => {
                console.error("An error occurred:", error);
                window.alert("Something went wrong");
            })
        
    }

    // Handle the click to unfollow a user
    const handleUndoFollow = (event) => {
        event.preventDefault()
        // Find the favorite relationship between the user and recipeCard
        const followToDelete = usersFollows.find(usersFollow => usersFollow.whoIsFollowed === userToFollowId)

        //DELETE the follow object
        fetch(`http://localhost:8088/follows/${followToDelete.id}`, {
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
                // Update the user's list of follows state
                fetchUsersFollows()
                if (viewingProfile && updateProfileFollowList) {
                    updateProfileFollowList()
                }
            })
            .catch((error) => {
                console.error('An error occurred:', error)
                window.alert('Something went wrong')
            })
            
    }

    // Return the UI
    return <>
        {
            !alreadyFollowed
                ? <button className="btn--follow" onClick={click => handleFollow(click)}><img src={followImg} alt="follow" className="followIcon"></img></button>
                : <button className="btn--follow" onClick={click => handleUndoFollow(click)}><img src={followingImg} alt="following" className="followIcon following"></img></button>
        }
    </>
}