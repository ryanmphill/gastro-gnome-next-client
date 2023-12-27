import { FollowButton } from "@/components/Feed/PostInteraction/FollowButton"
import { getCurrentUserId } from "@/dataManagers/authManagers/authManagers"
import { getCurrentUserFollows, getProfileFollowers } from "@/dataManagers/userManager"
import Link from "next/link"
import styles from "../profile.module.css"
import { Suspense } from "react"

interface ProfileFollowersProps {
    profileId: number
}

export const ProfileFollowers = async ({ profileId } : ProfileFollowersProps) => {
    const profileOwnersFollowersData = getProfileFollowers(profileId)
    const currentUsersFollowsData = getCurrentUserFollows()
    const currentUserIdData = getCurrentUserId()

    const [profileOwnersFollowers, currentUsersFollows, currentUserId] = await Promise.all([
        profileOwnersFollowersData,
        currentUsersFollowsData,
        currentUserIdData
    ])

    return <>
        <h3 className={`${styles["myFeedFade"]} ${styles["feedHeader"]}`}>Followers</h3>
        {
            profileOwnersFollowers.length > 0
                ? profileOwnersFollowers.map((follower) => {
                    return <div key={`follower--${follower.id}`} className={styles["followedByListItem"]}>
                        <div><Link href={`/profile/${follower?.id}`}>{follower?.full_name}</Link></div>
                        {
                            currentUserId !== follower?.id
                            && <Suspense>
                                <FollowButton
                                    userToFollowId={follower.id}
                                    usersFollows={currentUsersFollows} />
                            </Suspense>
                        }
                    </div>
                })
                : <div>No followers currently</div>
        }
    </>
}