import { FollowButton } from "@/components/Feed/PostInteraction/FollowButton"
import { getCurrentUserId } from "@/dataManagers/authManagers/authManagers"
import { getCurrentUserFollows, getProfileFollowing } from "@/dataManagers/userManager"
import Link from "next/link"
import styles from "../profile.module.css"
import { Suspense } from "react"

interface ProfileFollowingProps {
    profileId: number
}

export const ProfileFollowing = async ({ profileId } : ProfileFollowingProps) => {

    const usersFollowedData = getProfileFollowing(profileId)
    const currentUsersFollowsData = getCurrentUserFollows()
    const currentUserIdData = getCurrentUserId()

    const [usersFollowed, currentUsersFollows, currentUserId] = await Promise.all([
        usersFollowedData,
        currentUsersFollowsData,
        currentUserIdData
    ])

    return <>
        <h3 className={`${styles["myFeedFade"]} ${styles["feedHeader"]}`}>Following</h3>
        {
            usersFollowed.length > 0
                ? usersFollowed.map((user) => {
                    return <div key={`beingFollowed--${user.id}`} className={styles["followingListItem"]}>
                        <div><Link href={`/profile/${user?.id}`}>{user?.full_name}</Link></div>
                        {
                            currentUserId !== user?.id && currentUserId !== 0
                            && <Suspense>
                                <FollowButton
                                    userToFollowId={user?.id}
                                    usersFollows={currentUsersFollows} />
                            </Suspense>
                        }
                    </div>
                })
                : <div>Currently not following any users</div>
        }
    </>
}