'use client'

import { useRouter, useSelectedLayoutSegment } from "next/navigation"
import styles from "../profile.module.css"

interface DisplayTabProps {
    profileId: number,
    currentUserId: number
}

export const ProfileDisplayTab = ({profileId, currentUserId} : DisplayTabProps) => {
    const router = useRouter()
    const segment = useSelectedLayoutSegment()

    return <>
        <div className={styles["profileDisplayTab"]}>
            <button className={`${styles["profileDisplayTabLink"]} ${styles["profileDisplayTab--hoverEffect"]} ${styles["underline-effect"]} ${segment === '(index)' ? styles['active'] : ''}`}
                onClick={(e) => {
                    e.preventDefault()
                    router.push(`/profile/${profileId}`, {scroll: false})
                }}>
                {
                    profileId === currentUserId
                        ? <>My Posts</>
                        : <>Posts</>
                }
            </button>

            <button className={`${styles["profileDisplayTabLink"]} ${styles["profileDisplayTab--hoverEffect"]} ${styles["underline-effect"]} ${segment === 'favorites' ? styles['active'] : ''}`}
                onClick={(e) => {
                    e.preventDefault()
                    router.push(`/profile/${profileId}/favorites`, {scroll: false})
                }}>Favorites</button>

            <button className={`${styles["profileDisplayTabLink"]} ${styles["profileDisplayTab--hoverEffect"]} ${styles["underline-effect"]} ${segment === 'followers' ? styles['active'] : ''}`}
                onClick={(e) => {
                    e.preventDefault()
                    router.push(`/profile/${profileId}/followers`, {scroll: false})
                }}>Followers</button>

            <button className={`${styles["profileDisplayTabLink"]} ${styles["profileDisplayTab--hoverEffect"]} ${styles["underline-effect"]} ${segment === 'following' ? styles['active'] : ''}`}
                onClick={(e) => {
                    e.preventDefault()
                    router.push(`/profile/${profileId}/following`, {scroll: false})
                }}>Following</button>
        </div>
    </>
}