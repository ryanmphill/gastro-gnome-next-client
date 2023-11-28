'use client'
import { MouseEvent, startTransition, useEffect, useOptimistic, useState } from "react"
import followImg from "../../../../public/assets/follow.png"
import followingImg from "../../../../public/assets/following.png"
import styles from "./PostInteraction.module.css"
import { usePathname, useRouter } from "next/navigation"
import { followUser, unFollowUser } from "@/dataManagers/userManager"

interface FollowButtonProps {
    currentUserId: number,
    userToFollowId: number,
    usersFollows: number[]
}


export const FollowButton = ({ currentUserId, userToFollowId, usersFollows } 
    : FollowButtonProps) => {

    const [optimisticFollows, updateOptimisticFollows] = useOptimistic(
        usersFollows,
        (_currentState, updatedFollows: number[]) => updatedFollows   
        )
    
    useEffect(
        () => {
            startTransition(() => updateOptimisticFollows(usersFollows))
        },[usersFollows, updateOptimisticFollows]
    )
    
    // Get the current location
    const pathname = usePathname()
    const router = useRouter()

    // Check if the user is viewing their profile to dynamically update the profile's list of follows
    const viewingProfile = pathname === `/userprofile/${currentUserId}`

    // Handle the click to follow a user
    const handleFollow = async (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        
        // POST follow object to API ///////////////////////////////////
        startTransition(() => {
            const optimisticCopy = [ ...usersFollows ]
            optimisticCopy.push(userToFollowId)
            updateOptimisticFollows([ ...optimisticCopy ])
            followUser(userToFollowId)
        })
    }

    // Handle the click to unfollow a user
    const handleUndoFollow = async (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()

        //DELETE the follow object
        startTransition(() => {
            const optimisticCopy = [ ...usersFollows ]
            optimisticCopy.filter((userId) => userId != userToFollowId)
            updateOptimisticFollows([ ...optimisticCopy ])
            unFollowUser(userToFollowId)
        })
    }

    const alreadyFollowed = optimisticFollows.some(userFollow => userFollow === userToFollowId)

    return <>
        {
            !alreadyFollowed
                ? <button className={styles["btn--follow"]} onClick={click => handleFollow(click)}><img src={followImg.src} alt="follow" className={styles["followIcon"]}></img></button>
                : <button className={styles["btn--follow"]} onClick={click => handleUndoFollow(click)}><img src={followingImg.src} alt="following" className={`${styles["followIcon"]} ${styles["following"]}`}></img></button>
        }
    </>
}