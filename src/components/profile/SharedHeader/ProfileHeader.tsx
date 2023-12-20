import { getCurrentUserId } from "@/dataManagers/authManagers/authManagers"
import { getProfileInfo } from "@/dataManagers/userManager"
import { ProfileDisplayTab } from "./ProfileDisplayTab"
import styles from "../profile.module.css"
import { Suspense } from "react"

interface ProfileHeaderProps {
    profileId: number
}
export const ProfileHeader = async ( {profileId} : ProfileHeaderProps) => {
    const currentUserIdData = getCurrentUserId()
    const profileOwnerData = getProfileInfo(profileId)

    const [currentUserId, ownerOfProfile] = await Promise.all([currentUserIdData, profileOwnerData])
    
    return <>
        <h2 className={`${styles["myFeedFade"]} ${styles["feedHeader"]}`}>{ownerOfProfile.full_name}</h2>
        <Suspense>
            <ProfileDisplayTab
                profileId={profileId}
                currentUserId={currentUserId} />
        </Suspense>
    </>
}