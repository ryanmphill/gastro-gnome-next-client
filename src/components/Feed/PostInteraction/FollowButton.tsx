'use client'

import { MouseEvent, useEffect, useState } from "react"
import followImg from "../../../../public/assets/follow.png"
import followingImg from "../../../../public/assets/following.png"
import styles from "./PostInteraction.module.css"
import { usePathname } from "next/navigation"
import { useAuthContext } from "@/context/AuthContext"
import { followUser, unFollowUser } from "@/dataManagers/userManager"

interface FollowButtonProps {
    userToFollowId: number,
    usersFollows: number[],
    fetchUsersFollows: () => Promise<void>,
    updateProfileFollowList?: () => Promise<void> | undefined
}


export const FollowButton = ({ userToFollowId, usersFollows, fetchUsersFollows, updateProfileFollowList } : FollowButtonProps) => {
    const { currentUserId } = useAuthContext()
    
    // Get the current location
    const pathname = usePathname()

    // Check if the user is viewing their profile to dynamically update the profile's list of follows
    const viewingProfile = pathname === `/userprofile/${currentUserId}`

    // Set a state varialbe for if the user is following
    const [alreadyFollowed, updateAlreadyFollowed] = useState(false)

    // Define a variable for the follow object to be POSTed
    const followObjectToPost = {
        userId: currentUserId,
        whoIsFollowed: userToFollowId
    }

    

    // Use the array of follows and update the alreadyFollowed state
    useEffect(
        () => {
            const isFollowing = usersFollows.some(userFollow => userFollow === userToFollowId)
            if (isFollowing) {
                updateAlreadyFollowed(true)
            } else {
                updateAlreadyFollowed(false)
            }
        },
        [usersFollows, userToFollowId]
    )

    // Handle the click to follow a user
    const handleFollow = async (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        
        // POST follow object to API ///////////////////////////////////
        try {
            await followUser(userToFollowId)
            // Update the user's list of follows state
            fetchUsersFollows()
            if (viewingProfile && updateProfileFollowList) {
                updateProfileFollowList()
            }
        } catch (err) {
            console.error(err)
            window.alert("Something went wrong")
        }
    }

    // Handle the click to unfollow a user
    const handleUndoFollow = async (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        
        //DELETE the follow object
        try {
            await unFollowUser(userToFollowId)
            // Update the user's list of follows state
            fetchUsersFollows()
            if (viewingProfile && updateProfileFollowList) {
                updateProfileFollowList()
            }
        } catch (err) {
            console.error(err)
            window.alert("Something went wrong")
        }    
    }

    // Return the UI
    return <>
        {
            !alreadyFollowed
                ? <button className={`${styles["btn--follow"]}`} onClick={click => handleFollow(click)}><img src={followImg.src} alt="follow" className={`${styles["followIcon"]}`}></img></button>
                : <button className={`${styles["btn--follow"]}`} onClick={click => handleUndoFollow(click)}><img src={followingImg.src} alt="following" className={`${styles["followIcon"]} ${styles["following"]}`}></img></button>
        }
    </>
}