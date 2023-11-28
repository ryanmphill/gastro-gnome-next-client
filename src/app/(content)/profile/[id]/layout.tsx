import { ProfileHeader } from "@/components/profile/SharedHeader/ProfileHeader"
import styles from "../../../../components/profile/profile.module.css"

export default function ProfileLayout({
    children,
    params
  }: {
    children: React.ReactNode
    params: {
        id: string
    }
  }) {
    let profileId: number;

    try {
        profileId = parseInt(params.id)
    } catch (err) {
        profileId = 0
    }

    return (
      <section className={styles["pageBody"]}>
        <ProfileHeader profileId={profileId} />
          {children}
      </section>
    )
  }