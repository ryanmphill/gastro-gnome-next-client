import { ProfileFollowers } from "@/components/profile/nested/ProfileFollowers";

interface ParamsProp {
    params: {
        id: string
    }
}

const ProfileFollowersTab = ({params} : ParamsProp) => {
    let profileId: number;

    try {
        profileId = parseInt(params.id)
    } catch (err) {
        profileId = 0 // Redirects to 'not found' page
    }

    return <>
        <ProfileFollowers profileId={profileId} />
    </>
}
export default ProfileFollowersTab