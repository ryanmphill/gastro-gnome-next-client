import { ProfileFollowing } from "@/components/profile/nested/ProfileFollowing";

interface ParamsProp {
    params: {
        id: string
    }
}

const ProfileFollowingTab = ({params} : ParamsProp) => {
    let profileId: number;

    try {
        profileId = parseInt(params.id)
    } catch (err) {
        profileId = 0 // Redirects to 'not found' page
    }

    return <>
        <ProfileFollowing profileId={profileId} />
    </>
}
export default ProfileFollowingTab