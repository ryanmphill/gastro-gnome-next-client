'use client'
import { MouseEvent, startTransition, useEffect, useOptimistic, useState } from "react"
import followImg from "../../../../public/assets/follow.png"
import followingImg from "../../../../public/assets/following.png"
import styles from "./PostInteraction.module.css"
import { followUser, unFollowUser } from "@/dataManagers/userManager"
import Image from "next/image"

interface FollowButtonProps {
    userToFollowId: number,
    usersFollows: number[]
}


export const FollowButton = ({ userToFollowId, usersFollows } 
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
                ? <button className={styles["btn--follow"]} onClick={click => handleFollow(click)}><Image src={followImg} alt="follow" className={styles["followIcon"]}></Image></button>
                : <button className={styles["btn--follow"]} onClick={click => handleUndoFollow(click)}><Image src={followingImg} alt="following" className={`${styles["followIcon"]} ${styles["following"]}`}></Image></button>
        }
    </>
}