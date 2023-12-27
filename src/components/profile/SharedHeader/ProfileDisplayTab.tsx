'use client'
import { useSelectedLayoutSegment } from "next/navigation"
import styles from "../profile.module.css"
import Link from "next/link"

interface DisplayTabProps {
    profileId: number,
    currentUserId: number
}

export const ProfileDisplayTab = ({ profileId, currentUserId }: DisplayTabProps) => {
    const segment = useSelectedLayoutSegment()

    return <>
        <nav className={styles["profileDisplayTab"]}>
            <Link href={`/profile/${profileId}`} scroll={false} className={styles['profileLinkWrapper']}>
                <button className={`${styles["profileDisplayTabLink"]} ${styles["profileDisplayTab--hoverEffect"]} ${styles["underline-effect"]} ${segment === '(index)' ? styles['active'] : ''}`}
                >
                    {
                        profileId === currentUserId
                            ? <>My Posts</>
                            : <>Posts</>
                    }
                </button>
            </Link>
            <Link href={`/profile/${profileId}/favorites`} scroll={false} className={styles['profileLinkWrapper']}>
                <button className={`${styles["profileDisplayTabLink"]} ${styles["profileDisplayTab--hoverEffect"]} ${styles["underline-effect"]} ${segment === 'favorites' ? styles['active'] : ''}`}
                >Favorites</button>
            </Link>

            <Link href={`/profile/${profileId}/followers`} scroll={false} className={styles['profileLinkWrapper']}>
                <button className={`${styles["profileDisplayTabLink"]} ${styles["profileDisplayTab--hoverEffect"]} ${styles["underline-effect"]} ${segment === 'followers' ? styles['active'] : ''}`}
                >Followers</button>
            </Link>
            <Link href={`/profile/${profileId}/following`} scroll={false} className={styles['profileLinkWrapper']}>
                <button className={`${styles["profileDisplayTabLink"]} ${styles["profileDisplayTab--hoverEffect"]} ${styles["underline-effect"]} ${segment === 'following' ? styles['active'] : ''}`}
                >Following</button>
            </Link>
        </nav>
    </>
}